import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments/provider";
import { orderRepository } from "@/lib/payments/repository";
import { CheckoutRequest, OrderStatus } from "@/lib/payments/types";

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();

    // Validate request
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items in cart" },
        { status: 400 }
      );
    }

    if (!body.shipping || !body.shipping.email) {
      return NextResponse.json(
        { success: false, error: "Shipping information required" },
        { status: 400 }
      );
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order in repository
    const order = await orderRepository.createOrder({
      id: orderId,
      items: body.items,
      shipping: body.shipping,
      shippingMethod: body.shippingMethod,
      subtotal: body.subtotal,
      shippingCost: body.shippingCost,
      tax: body.tax,
      total: body.total,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    });

    // Process payment
    const paymentProvider = getPaymentProvider();
    const paymentResult = await paymentProvider.processPayment({
      orderId,
      amount: body.total,
      currency: "USD",
      customerEmail: body.shipping.email,
      customerName: `${body.shipping.firstName} ${body.shipping.lastName}`,
      metadata: {
        items: body.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    });

    if (paymentResult.success) {
      // Update order status
      await orderRepository.updateOrder(orderId, {
        status: "confirmed",
        paymentStatus: "paid",
        paymentId: paymentResult.transactionId,
      });

      return NextResponse.json({
        success: true,
        orderId,
        transactionId: paymentResult.transactionId,
        message: "Order placed successfully",
      });
    } else {
      // Update order status to failed
      await orderRepository.updateOrder(orderId, {
        status: "cancelled",
        paymentStatus: "failed",
      });

      return NextResponse.json(
        {
          success: false,
          error: paymentResult.error || "Payment failed",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { success: false, error: "Order ID required" },
      { status: 400 }
    );
  }

  try {
    const order = await orderRepository.getOrder(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
