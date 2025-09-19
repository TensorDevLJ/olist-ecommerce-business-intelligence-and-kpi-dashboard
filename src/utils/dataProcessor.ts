import Papa from 'papaparse';
import { format, parseISO } from 'date-fns';
import { 
  Order, 
  OrderItem, 
  Product, 
  Payment, 
  Customer, 
  CategoryTranslation, 
  AnalyticsData 
} from '../types';

class DataProcessor {
  private orders: Order[] = [];
  private orderItems: OrderItem[] = [];
  private products: Product[] = [];
  private payments: Payment[] = [];
  private customers: Customer[] = [];
  private categories: CategoryTranslation[] = [];

  async loadCSV<T>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          resolve(results.data as T[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  async loadSampleData(): Promise<void> {
    // For demo purposes, we'll generate sample data
    // In production, this would load from actual CSV files
    this.generateSampleData();
  }

  private generateSampleData(): void {
    const states = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'PE', 'CE'];
    const categories = [
      'electronics', 'fashion', 'health_beauty', 'home_garden', 
      'sports_leisure', 'books', 'toys', 'automotive', 'food'
    ];
    const paymentTypes = ['credit_card', 'boleto', 'voucher', 'debit_card'];

    // Generate customers
    for (let i = 0; i < 1000; i++) {
      this.customers.push({
        customer_id: `customer_${i}`,
        customer_unique_id: `unique_${i}`,
        customer_zip_code_prefix: `${Math.floor(Math.random() * 99999)}`,
        customer_city: `City_${i % 50}`,
        customer_state: states[Math.floor(Math.random() * states.length)]
      });
    }

    // Generate products
    for (let i = 0; i < 500; i++) {
      this.products.push({
        product_id: `product_${i}`,
        product_category_name: categories[Math.floor(Math.random() * categories.length)]
      });
    }

    // Generate category translations
    categories.forEach(cat => {
      this.categories.push({
        product_category_name: cat,
        product_category_name_english: cat.replace('_', ' ').toUpperCase()
      });
    });

    // Generate orders and related data
    for (let i = 0; i < 5000; i++) {
      const orderId = `order_${i}`;
      const customerId = this.customers[Math.floor(Math.random() * this.customers.length)].customer_id;
      const orderDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
      
      this.orders.push({
        order_id: orderId,
        customer_id: customerId,
        order_status: 'delivered',
        order_purchase_timestamp: orderDate.toISOString()
      });

      // Generate order items
      const itemCount = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < itemCount; j++) {
        const productId = this.products[Math.floor(Math.random() * this.products.length)].product_id;
        const price = Math.floor(Math.random() * 500) + 10;
        const freight = Math.floor(Math.random() * 50) + 5;

        this.orderItems.push({
          order_id: orderId,
          order_item_id: j + 1,
          product_id: productId,
          seller_id: `seller_${Math.floor(Math.random() * 100)}`,
          shipping_limit_date: orderDate.toISOString(),
          price: price,
          freight_value: freight
        });

        // Generate payment
        this.payments.push({
          order_id: orderId,
          payment_sequential: j + 1,
          payment_type: paymentTypes[Math.floor(Math.random() * paymentTypes.length)],
          payment_installments: Math.floor(Math.random() * 12) + 1,
          payment_value: price + freight
        });
      }
    }
  }

  analyzeData(): AnalyticsData {
    return {
      monthlyRevenue: this.calculateMonthlyRevenue(),
      topCategories: this.getTopCategories(),
      customerSegmentation: this.analyzeCustomerSegmentation(),
      paymentMethods: this.analyzePaymentMethods(),
      stateRevenue: this.calculateStateRevenue(),
      kpis: this.calculateKPIs()
    };
  }

  private calculateMonthlyRevenue() {
    const monthlyData: { [key: string]: number } = {};
    
    this.orders.forEach(order => {
      if (order.order_status === 'delivered') {
        const month = format(parseISO(order.order_purchase_timestamp), 'yyyy-MM');
        const orderRevenue = this.orderItems
          .filter(item => item.order_id === order.order_id)
          .reduce((sum, item) => sum + item.price + item.freight_value, 0);
        
        monthlyData[month] = (monthlyData[month] || 0) + orderRevenue;
      }
    });

    return Object.entries(monthlyData)
      .map(([month, revenue]) => ({ month, revenue }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  private getTopCategories() {
    const categoryRevenue: { [key: string]: number } = {};
    
    this.orderItems.forEach(item => {
      const product = this.products.find(p => p.product_id === item.product_id);
      if (product) {
        const categoryName = this.categories.find(c => 
          c.product_category_name === product.product_category_name
        )?.product_category_name_english || product.product_category_name;
        
        categoryRevenue[categoryName] = (categoryRevenue[categoryName] || 0) + item.price;
      }
    });

    return Object.entries(categoryRevenue)
      .map(([category, sales]) => ({ category, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }

  private analyzeCustomerSegmentation() {
    const customerOrders: { [key: string]: number } = {};
    
    this.orders.forEach(order => {
      const customer = this.customers.find(c => c.customer_id === order.customer_id);
      if (customer) {
        customerOrders[customer.customer_unique_id] = 
          (customerOrders[customer.customer_unique_id] || 0) + 1;
      }
    });

    const newCustomers = Object.values(customerOrders).filter(count => count === 1).length;
    const repeatCustomers = Object.values(customerOrders).filter(count => count > 1).length;

    return [
      { type: 'New', count: newCustomers },
      { type: 'Repeat', count: repeatCustomers }
    ];
  }

  private analyzePaymentMethods() {
    const paymentData: { [key: string]: { count: number; value: number } } = {};
    
    this.payments.forEach(payment => {
      if (!paymentData[payment.payment_type]) {
        paymentData[payment.payment_type] = { count: 0, value: 0 };
      }
      paymentData[payment.payment_type].count += 1;
      paymentData[payment.payment_type].value += payment.payment_value;
    });

    return Object.entries(paymentData).map(([method, data]) => ({
      method: method.replace('_', ' ').toUpperCase(),
      count: data.count,
      value: data.value
    }));
  }

  private calculateStateRevenue() {
    const stateData: { [key: string]: { orders: Set<string>; revenue: number } } = {};
    
    this.orders.forEach(order => {
      if (order.order_status === 'delivered') {
        const customer = this.customers.find(c => c.customer_id === order.customer_id);
        if (customer) {
          if (!stateData[customer.customer_state]) {
            stateData[customer.customer_state] = { orders: new Set(), revenue: 0 };
          }
          
          stateData[customer.customer_state].orders.add(order.order_id);
          
          const orderRevenue = this.orderItems
            .filter(item => item.order_id === order.order_id)
            .reduce((sum, item) => sum + item.price, 0);
          
          stateData[customer.customer_state].revenue += orderRevenue;
        }
      }
    });

    return Object.entries(stateData)
      .map(([state, data]) => ({
        state,
        orders: data.orders.size,
        revenue: data.revenue
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
  }

  private calculateKPIs() {
    const deliveredOrders = this.orders.filter(o => o.order_status === 'delivered');
    const totalRevenue = this.orderItems.reduce((sum, item) => sum + item.price + item.freight_value, 0);
    const totalOrders = deliveredOrders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    
    const customerSegmentation = this.analyzeCustomerSegmentation();
    const totalCustomers = customerSegmentation.reduce((sum, seg) => sum + seg.count, 0);
    const repeatCustomers = customerSegmentation.find(seg => seg.type === 'Repeat')?.count || 0;
    const repeatCustomerRate = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      repeatCustomerRate
    };
  }
}

export default DataProcessor;