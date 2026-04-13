"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CreditCard,
  Lock,
  ChevronRight,
  Check,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/data/products";
import Link from "next/link";

type CheckoutStep = "shipping" | "payment" | "review";

const steps: { id: CheckoutStep; label: string }[] = [
  { id: "shipping", label: "Shipping" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveCard: false,
  });

  const [shippingMethod, setShippingMethod] = useState("standard");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-48" />
            <div className="h-64 bg-muted rounded" />
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    const variant = product?.variants.find((v) => v.id === item.variantId);
    const color = product?.colors.find((c) => c.id === item.colorId);
    return { ...item, product, variant, color };
  });

  const subtotal = getCartTotal();
  const shippingCost =
    shippingMethod === "express" ? 19.99 : shippingMethod === "overnight" ? 39.99 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleSubmit = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            const variant = product?.variants.find((v) => v.id === item.variantId);
            return {
              productId: item.productId,
              variantId: item.variantId,
              colorId: item.colorId,
              quantity: item.quantity,
              price: variant?.salePrice || variant?.price || 0,
              name: product?.name || "",
            };
          }),
          shipping: shippingInfo,
          shippingMethod,
          subtotal,
          shippingCost,
          tax,
          total,
        }),
      });

      const data = await response.json();

      if (data.success) {
        clearCart();
        router.push(`/order-confirmation?orderId=${data.orderId}`);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const canProceed = () => {
    if (currentStep === "shipping") {
      return (
        shippingInfo.firstName &&
        shippingInfo.lastName &&
        shippingInfo.email &&
        shippingInfo.address &&
        shippingInfo.city &&
        shippingInfo.state &&
        shippingInfo.zipCode
      );
    }
    if (currentStep === "payment") {
      return (
        paymentInfo.cardNumber &&
        paymentInfo.expiryDate &&
        paymentInfo.cvv &&
        paymentInfo.nameOnCard
      );
    }
    return true;
  };

  const nextStep = () => {
    if (currentStep === "shipping") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("review");
    else handleSubmit();
  };

  const prevStep = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "review") setCurrentStep("payment");
  };

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Secure Checkout
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index < currentStepIndex
                        ? "bg-primary text-primary-foreground"
                        : index === currentStepIndex
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      index <= currentStepIndex
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-background rounded-2xl border border-border p-6"
            >
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Shipping Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            email: e.target.value,
                          })
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            phone: e.target.value,
                          })
                        }
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        placeholder="San Francisco"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            state: e.target.value,
                          })
                        }
                        placeholder="CA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            zipCode: e.target.value,
                          })
                        }
                        placeholder="94102"
                      />
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">
                      Shipping Method
                    </h3>
                    <RadioGroup
                      value={shippingMethod}
                      onValueChange={setShippingMethod}
                      className="space-y-3"
                    >
                      <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors has-[[data-state=checked]]:border-primary">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" />
                          <div>
                            <div className="font-medium">Standard Shipping</div>
                            <div className="text-sm text-muted-foreground">
                              5-7 business days
                            </div>
                          </div>
                        </div>
                        <span className="font-medium text-emerald-600">Free</span>
                      </label>
                      <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors has-[[data-state=checked]]:border-primary">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" />
                          <div>
                            <div className="font-medium">Express Shipping</div>
                            <div className="text-sm text-muted-foreground">
                              2-3 business days
                            </div>
                          </div>
                        </div>
                        <span className="font-medium">$19.99</span>
                      </label>
                      <label className="flex items-center justify-between p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors has-[[data-state=checked]]:border-primary">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="overnight" />
                          <div>
                            <div className="font-medium">Overnight Shipping</div>
                            <div className="text-sm text-muted-foreground">
                              Next business day
                            </div>
                          </div>
                        </div>
                        <span className="font-medium">$39.99</span>
                      </label>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Payment Information
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: e.target.value,
                          })
                        }
                        placeholder="1234 5678 9012 3456"
                        className="pl-10"
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: e.target.value,
                          })
                        }
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cvv: e.target.value,
                          })
                        }
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          nameOnCard: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="saveCard"
                      checked={paymentInfo.saveCard}
                      onCheckedChange={(checked) =>
                        setPaymentInfo({
                          ...paymentInfo,
                          saveCard: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="saveCard" className="text-sm font-normal">
                      Save card for future purchases
                    </Label>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Review Your Order
                  </h2>

                  {/* Shipping Info */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        Shipping Address
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep("shipping")}
                      >
                        Edit
                      </Button>
                    </div>
                    <p className="text-muted-foreground">
                      {shippingInfo.firstName} {shippingInfo.lastName}
                      <br />
                      {shippingInfo.address}
                      <br />
                      {shippingInfo.city}, {shippingInfo.state}{" "}
                      {shippingInfo.zipCode}
                      <br />
                      {shippingInfo.email}
                    </p>
                  </div>

                  {/* Payment Info */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        Payment Method
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentStep("payment")}
                      >
                        Edit
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      <span>
                        **** **** **** {paymentInfo.cardNumber.slice(-4)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <h3 className="font-medium text-foreground mb-4">
                      Order Items
                    </h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        if (!item.product || !item.variant || !item.color)
                          return null;
                        const price =
                          item.variant.salePrice || item.variant.price;

                        return (
                          <div
                            key={`${item.productId}-${item.variantId}-${item.colorId}`}
                            className="flex items-center gap-3"
                          >
                            <div className="relative w-16 h-16 rounded-lg bg-muted overflow-hidden">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground truncate">
                                {item.product.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.variant.storage} / {item.color.name} x{" "}
                                {item.quantity}
                              </div>
                            </div>
                            <div className="font-medium">
                              ${(price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                {currentStepIndex > 0 ? (
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                <Button onClick={nextStep} disabled={!canProceed() || isProcessing}>
                  {isProcessing ? (
                    "Processing..."
                  ) : currentStep === "review" ? (
                    <>
                      Place Order
                      <Check className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cartItems.slice(0, 3).map((item) => {
                  if (!item.product || !item.variant) return null;
                  const price = item.variant.salePrice || item.variant.price;

                  return (
                    <div
                      key={`${item.productId}-${item.variantId}-${item.colorId}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-12 h-12 rounded-lg bg-muted overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {item.product.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          x{item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
                {cartItems.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    +{cartItems.length - 3} more items
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold text-foreground">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
