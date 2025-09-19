import React, { useState, useEffect } from "react";
import { BarChart3, Database, TrendingUp } from "lucide-react";
import DataProcessor from "./utils/dataProcessor";
import KPICard from "./components/KPICard";
import RevenueChart from "./components/RevenueChart";
import CategoryChart from "./components/CategoryChart";
import CustomerSegmentChart from "./components/CustomerSegmentChart";
import PaymentMethodsTable from "./components/PaymentMethodsTable";
import StateRevenueTable from "./components/StateRevenueTable";
import LoadingSpinner from "./components/LoadingSpinner";
import { AnalyticsData } from "./types";

// ✅ ThemeToggle as an inner component
function ThemeToggle() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}

function App() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataProcessor] = useState(new DataProcessor());

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setLoading(true);
    try {
      await dataProcessor.loadSampleData();
      const data = dataProcessor.analyzeData();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading analytics data...
          </p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No Data Available
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please load your dataset to begin analysis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Olist E-Commerce Analytics
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Brazilian marketplace insights & trends
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Database className="w-4 h-4" />
                <span>Sample Dataset Loaded</span>
              </div>
              {/* ✅ Add theme toggle in header */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(analyticsData.kpis.totalRevenue)}
            trend="+12.5% from last period"
            icon="revenue"
          />
          <KPICard
            title="Total Orders"
            value={analyticsData.kpis.totalOrders.toLocaleString()}
            trend="+8.2% from last period"
            icon="orders"
          />
          <KPICard
            title="Avg Order Value"
            value={formatCurrency(analyticsData.kpis.avgOrderValue)}
            trend="+3.7% from last period"
            icon="avg"
          />
          <KPICard
            title="Repeat Customer Rate"
            value={`${analyticsData.kpis.repeatCustomerRate.toFixed(1)}%`}
            trend="+2.1% from last period"
            icon="customers"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart data={analyticsData.monthlyRevenue} />
          <CategoryChart data={analyticsData.topCategories} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CustomerSegmentChart data={analyticsData.customerSegmentation} />
          <PaymentMethodsTable data={analyticsData.paymentMethods} />
        </div>

        {/* State Revenue Table */}
        <div className="mb-8">
          <StateRevenueTable data={analyticsData.stateRevenue} />
        </div>

        {/* Insights Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Key Business Insights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Revenue Performance
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Seasonal spikes indicate strong holiday performance</li>
                    <li>• Consistent month-over-month growth trending upward</li>
                    <li>• Q4 shows highest revenue concentration</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Customer Behavior
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                      • {analyticsData.kpis.repeatCustomerRate.toFixed(1)}% repeat
                      customer rate shows strong retention
                    </li>
                    <li>• Credit cards dominate payment preferences</li>
                    <li>• Geographic concentration in major urban centers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Product Categories
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Top categories drive majority of revenue</li>
                    <li>• Diversified portfolio reduces risk</li>
                    <li>• Electronics and fashion show strongest performance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Growth Opportunities
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>• Expand into underperforming states</li>
                    <li>• Focus on converting new to repeat customers</li>
                    <li>• Optimize payment method offerings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default App;
