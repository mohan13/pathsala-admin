import { Status } from "./status";

export interface User {
  id: string;
  email: string;
  username: string;
  updatedAt: string;
}

export enum PaymentMethod {
  COD = "cod",
  Khalti = "khalti",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
  Pending = "pending",
}

export enum OrderStatus {
  Pending = "pending",
  Delivered = "delivered",
  Ontheway = "ontheway",
  Cancel = "cancelled",
  All = "all",
  Preparation = "preparation",
}

interface Payment {
  paymentMethod: PaymentMethod;
}
export interface ItemDetails {
  productId: string;
  quantity: number;
}

export interface OrderData {
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: Payment;
  item: ItemDetails[];
  id: string;
  orderStatus: OrderStatus;
}

export interface Category {
  id: string;
  categoryName: string;
}

export interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStockQty: number;
  productImageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  userId: string;
  categoryId: string;
  User?: User;
  Category?: Category;
}
export interface SingleOrder {
  id: string;
  quantity: number;
  orderId: string;
  createdAt: string;
  Product: {
    id: string;
    productName: string;
    productPrice: number;
    productTotalStockQty: number;
    productImageUrl: string;
    categoryId: string;
    Category: {
      categoryName?: string;
    };
  };
  Order: {
    id: string;
    phoneNumber: string;
    shippingAddress: string;
    totalAmount: number;
    orderStatus: OrderStatus;
    userId: string;
    Payment: {
      paymentMethod: string;
      paymentStatus: string;
    };
  };
}

export interface InitialState {
  products: Product[];
  users: User[];
  orders: OrderData[];
  status: Status;
  categories: Category[];
  singleProduct: Product | null;
  singleOrder: SingleOrder[];
}
