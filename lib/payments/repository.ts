import { Order, PaymentStatus, OrderStatus } from '@/lib/types';

/**
 * Order Repository
 * 
 * This is an in-memory implementation for demonstration.
 * Replace with a real database implementation (PostgreSQL, MongoDB, etc.)
 * 
 * Example with Prisma:
 * export const createOrder = async (order: Order): Promise<Order> => {
 *   return prisma.order.create({ data: order });
 * };
 */

// In-memory store (replace with database in production)
const orders = new Map<string, Order>();

export const createOrder = async (order: Order): Promise<Order> => {
  orders.set(order.id, order);
  console.log(`[Order] Created order ${order.id}`, {
    total: order.total,
    items: order.items.length,
    customer: order.customer.email,
  });
  return order;
};

export const getOrderById = async (id: string): Promise<Order | null> => {
  return orders.get(id) || null;
};

export const updateOrderPaymentStatus = async (
  orderId: string,
  paymentStatus: PaymentStatus
): Promise<Order | null> => {
  const order = orders.get(orderId);
  if (!order) {
    console.error(`[Order] Order not found: ${orderId}`);
    return null;
  }

  const updatedOrder: Order = {
    ...order,
    paymentStatus,
    orderStatus: mapPaymentToOrderStatus(paymentStatus, order.orderStatus),
  };

  orders.set(orderId, updatedOrder);
  console.log(`[Order] Updated payment status for ${orderId}:`, {
    paymentStatus,
    orderStatus: updatedOrder.orderStatus,
  });

  return updatedOrder;
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: OrderStatus
): Promise<Order | null> => {
  const order = orders.get(orderId);
  if (!order) {
    console.error(`[Order] Order not found: ${orderId}`);
    return null;
  }

  const updatedOrder: Order = {
    ...order,
    orderStatus,
  };

  orders.set(orderId, updatedOrder);
  console.log(`[Order] Updated order status for ${orderId}:`, { orderStatus });

  return updatedOrder;
};

const mapPaymentToOrderStatus = (
  paymentStatus: PaymentStatus,
  currentStatus: OrderStatus
): OrderStatus => {
  switch (paymentStatus) {
    case 'completed':
      return 'confirmed';
    case 'failed':
    case 'canceled':
      return 'canceled';
    case 'pending':
    case 'processing':
      return currentStatus;
    default:
      return currentStatus;
  }
};

// For development/testing
export const getAllOrders = async (): Promise<Order[]> => {
  return Array.from(orders.values());
};

export const clearOrders = async (): Promise<void> => {
  orders.clear();
};
