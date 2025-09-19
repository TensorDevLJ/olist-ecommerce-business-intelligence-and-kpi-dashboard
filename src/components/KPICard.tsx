import React from 'react';
import { TrendingUp, ShoppingCart, DollarSign, Users } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  trend?: string;
  icon: 'revenue' | 'orders' | 'avg' | 'customers';
}
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-2xl shadow">
  <h2 className="text-lg font-semibold">Total Revenue</h2>
  <p className="text-2xl">$123,456</p>
</div>


const iconMap = {
  revenue: DollarSign,
  orders: ShoppingCart,
  avg: TrendingUp,
  customers: Users
};

const colorMap = {
  revenue: 'text-green-600 bg-green-100',
  orders: 'text-blue-600 bg-blue-100',
  avg: 'text-purple-600 bg-purple-100',
  customers: 'text-orange-600 bg-orange-100'
};

export default function KPICard({ title, value, trend, icon }: KPICardProps) {
  const Icon = iconMap[icon];
  const colorClasses = colorMap[icon];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-1 font-medium">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}