# 📊 E-Commerce Sales Analytics Dashboard (Olist Dataset)

A comprehensive ** E-Commerce Analytics Dashboard** built with **React + TypeScript** that analyzes the Olist dataset to extract business insights from 100k+ e-commerce orders. This project demonstrates advanced data analytics, business intelligence, and modern web development skills.

![Dashboard Preview](https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🎯 Project Overview

This project analyzes the ** E-Commerce Dataset** focusing on:
- **Revenue trends** and seasonal patterns
- **Customer behavior** and segmentation analysis  
- **Product performance** by categories
- **Payment method** preferences and usage
- **Geographic distribution** of sales
- **Key Performance Indicators** (KPIs) for business insights

> 💡 **Perfect for Data/Analytics roles** like PhonePe Graduate Trainee, demonstrating SQL-like analytics, business problem solving, and data visualization skills.

## ✨ Features

### 📈 Analytics & Insights
- **Monthly Revenue Trends** - Track revenue patterns over time
- **Top Product Categories** - Identify best-performing product segments
- **Customer Segmentation** - New vs Repeat customer analysis
- **Payment Analytics** - Payment method usage and transaction volumes
- **Geographic Analysis** - Sales performance by Brazilian states
- **KPI Dashboard** - Total revenue, orders, AOV, and retention metrics

### 🎨 User Experience
- **Interactive Charts** - Built with Recharts for dynamic data exploration
- **Responsive Design** - Optimized for desktop analytics workflows
- **Real-time Processing** - Instant data analysis and visualization
- **Professional UI** - Clean, modern dashboard with intuitive navigation
- **Loading States** - Smooth user experience with proper feedback

### 🛠️ Technical Features
- **TypeScript** - Full type safety and better developer experience
- **Modular Architecture** - Clean separation of concerns
- **Data Processing Engine** - Advanced analytics calculations
- **Component Library** - Reusable UI components
- **Performance Optimized** - Efficient data handling and rendering

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-analytics-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── KPICard.tsx      # Key performance indicator cards
│   ├── RevenueChart.tsx # Monthly revenue line chart
│   ├── CategoryChart.tsx # Product category bar chart
│   ├── CustomerSegmentChart.tsx # Customer pie chart
│   ├── PaymentMethodsTable.tsx # Payment analysis table
│   ├── StateRevenueTable.tsx   # Geographic revenue table
│   └── LoadingSpinner.tsx      # Loading state component
├── utils/
│   └── dataProcessor.ts # Core analytics engine
├── types/
│   └── index.ts        # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 📊 Data Analysis

### Key SQL-Equivalent Queries Implemented

#### 1. Monthly Revenue Trend
```typescript
// Equivalent to: SELECT month, SUM(revenue) FROM orders GROUP BY month
calculateMonthlyRevenue(): { month: string; revenue: number }[]
```

#### 2. Top Product Categories
```typescript
// Equivalent to: SELECT category, SUM(sales) FROM products GROUP BY category
getTopCategories(): { category: string; sales: number }[]
```

#### 3. Customer Segmentation
```typescript
// Equivalent to: SELECT customer_type, COUNT(*) FROM customer_analysis
analyzeCustomerSegmentation(): { type: string; count: number }[]
```

#### 4. Payment Method Analysis
```typescript
// Equivalent to: SELECT payment_type, COUNT(*), SUM(value) FROM payments
analyzePaymentMethods(): { method: string; count: number; value: number }[]
```

#### 5. Geographic Revenue Distribution
```typescript
// Equivalent to: SELECT state, COUNT(orders), SUM(revenue) FROM sales_by_state
calculateStateRevenue(): { state: string; orders: number; revenue: number }[]
```

## 📈 Business Insights Generated

### Revenue Performance
- **Seasonal Analysis**: Identifies peak sales periods and trends
- **Growth Tracking**: Month-over-month revenue progression
- **Performance Metrics**: Total revenue, order volume, and average order value

### Customer Behavior
- **Retention Analysis**: New vs repeat customer ratios
- **Segmentation**: Customer lifetime value patterns
- **Geographic Preferences**: Regional buying behavior

### Product Intelligence
- **Category Performance**: Top-selling product categories
- **Revenue Contribution**: Category-wise revenue distribution
- **Market Opportunities**: Underperforming segments

### Payment Insights
- **Method Preferences**: Credit card vs other payment types
- **Transaction Patterns**: Payment value distributions
- **Regional Variations**: Payment preferences by location

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful icon library

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization

### Data Processing
- **Papa Parse** - CSV parsing and processing
- **Date-fns** - Date manipulation and formatting
- **Custom Analytics Engine** - Business logic implementation

## 📊 Sample Data

The application uses a comprehensive sample dataset that simulates the Olist Brazilian E-Commerce dataset:

- **1,000 customers** across 10 Brazilian states
- **500 products** in 9 major categories
- **5,000 orders** with realistic transaction data
- **Multiple payment methods** and geographic distribution
- **Time-series data** spanning 12 months

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Main brand color
- **Success Green**: `#059669` - Positive metrics
- **Warning Amber**: `#d97706` - Attention items
- **Accent Purple**: `#7c3aed` - Highlights

### Typography
- **Headings**: Inter font family, multiple weights
- **Body Text**: Optimized line spacing (150%)
- **Data Tables**: Monospace for numbers

### Layout
- **8px Grid System** - Consistent spacing
- **Responsive Breakpoints** - Mobile-first approach
- **Card-based Design** - Clean information hierarchy

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Olist Dataset** - Brazilian E-Commerce Public Dataset by Olist
- **Kaggle Community** - For providing the comprehensive dataset
- **React Community** - For the amazing ecosystem and tools

## the website looks like 
![alt text](<WhatsApp Image 2025-09-19 at 17.23.23_1616e9dd.jpg>)
![alt text](<WhatsApp Image 2025-09-19 at 17.23.45_aa759fb1.jpg>)
![alt text](<WhatsApp Image 2025-09-19 at 17.24.04_94ca6d02.jpg>)
![alt text](<WhatsApp Image 2025-09-19 at 17.24.19_34444a60.jpg>)
---

**⭐ Star this repository if you found it helpful!**

Built with ❤️ By Likhithajagadeesh