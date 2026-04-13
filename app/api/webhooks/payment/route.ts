import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/provider";
import { orderRepository } from "@/lib/payments/repository";
import { paymentConfig } from "@/lib/payments/config";
import crypto from "crypto";

// Verify webhook signature
function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-webhook-signature") || "";

    // Verify webhook signature in production
    if (paymentConfig.webhookSecret && paymentConfig.mode === "live") {
      if (!verifySignature(body, signature, paymentConfig.webhookSecret)) {
        console.error("Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        );
      }
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.type) {
      case "payment.completed": {
        const { orderId, transactionId } = event.data;
        await orderRepository.updateOrder(orderId, {
          status: "confirmed",
          paymentStatus: "paid",
          paymentId: transactionId,
        });
        console.log(`Payment completed for order ${orderId}`);
        break;
      }

      case "payment.failed": {
        const { orderId, error } = event.data;
        await orderRepository.updateOrder(orderId, {
          status: "cancelled",
          paymentStatus: "failed",
        });
        console.log(`Payment failed for order ${orderId}: ${error}`);
        break;
      }

      case "payment.refunded": {
        const { orderId, refundId, amount } = event.data;
        await orderRepository.updateOrder(orderId, {
          status: "refunded",
          paymentStatus: "refunded",
        });
        console.log(`Order ${orderId} refunded: ${amount}`);
        break;
      }

      case "shipping.updated": {
        const { orderId, trackingNumber, carrier } = event.data;
        await orderRepository.updateOrder(orderId, {
          status: "shipped",
          trackingNumber,
          carrier,
        });
        console.log(`Order ${orderId} shipped via ${carrier}`);
        break;
      }

      case "delivery.completed": {
        const { orderId } = event.data;
        await orderRepository.updateOrder(orderId, {
          status: "delivered",
        });
        console.log(`Order ${orderId} delivered`);
        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
