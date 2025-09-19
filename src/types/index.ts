export interface Order {
  order_id: string;
  customer_id: string;
  order_status: string;
  order_purchase_timestamp: string;
  order_approved_at?: string;
  order_delivered_carrier_date?: string;
  order_delivered_customer_date?: string;
  order_estimated_delivery_date?: string;
}

export interface OrderItem {
  order_id: string;
  order_item_id: number;
  product_id: string;
  seller_id: string;
  shipping_limit_date: string;
  price: number;
  freight_value: number;
}

export interface Product {
  product_id: string;
  product_category_name: string;
  product_name_length?: number;
  product_description_length?: number;
  product_photos_qty?: number;
  product_weight_g?: number;
  product_length_cm?: number;
  product_height_cm?: number;
  product_width_cm?: number;
}

export interface Payment {
  order_id: string;
  payment_sequential: number;
  payment_type: string;
  payment_installments: number;
  payment_value: number;
}

export interface Customer {
  customer_id: string;
  customer_unique_id: string;
  customer_zip_code_prefix: string;
  customer_city: string;
  customer_state: string;
}

export interface CategoryTranslation {
  product_category_name: string;
  product_category_name_english: string;
}

export interface AnalyticsData {
  monthlyRevenue: { month: string; revenue: number }[];
  topCategories: { category: string; sales: number }[];
  customerSegmentation: { type: string; count: number }[];
  paymentMethods: { method: string; count: number; value: number }[];
  stateRevenue: { state: string; orders: number; revenue: number }[];
  kpis: {
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    repeatCustomerRate: number;
  };
}