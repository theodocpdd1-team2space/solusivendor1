export type TemplateProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  previewImage?: string;
  demoUrl?: string;
  features: string[];
  status: "active" | "draft";
};

export type HostingPackage = {
  id: string;
  slug: string;
  name: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  panelType: string;
  terminalAccess: boolean;
  recommended?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  status: "active" | "suspended";
  createdAt: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "active"
  | "cancelled"
  | "expired";

export type Order = {
  id: string;
  userId?: string;
  userName: string;
  customerEmail?: string;
  productType: "template" | "hosting";
  productId: string;
  productName: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
};

export type Invoice = {
  id: string;
  orderId: string;
  amount: number;
  status: "draft" | "unpaid" | "paid" | "void";
  dueDate: string;
};

export type HostingService = {
  id: string;
  userId: string;
  packageId: string;
  domain?: string;
  status: "pending" | "provisioning" | "active" | "suspended" | "cancelled";
  panelType: "managed" | "coolify" | "cloudpanel" | "cpanel" | "custom";
  hasTerminalAccess: boolean;
  nextBillingDate?: string;
};

export type PaymentTransaction = {
  id: string;
  orderId: string;
  provider: "midtrans";
  status: "pending" | "settlement" | "expire" | "cancel" | "deny";
  token?: string;
  redirectUrl?: string;
  createdAt: string;
};
