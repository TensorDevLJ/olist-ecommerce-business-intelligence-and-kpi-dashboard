import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryChartProps {
  data: { category: string; sales: number }[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value);
  };

  const truncateLabel = (label: string, maxLength: number = 12) => {
    return label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Product Categories</h3>
        <p className="text-sm text-gray-600">Sales performance by category</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="category" 
              tickFormatter={truncateLabel}
              className="text-xs"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              className="text-xs"
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Sales']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar 
              dataKey="sales" 
              fill="#059669"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-80 transition-opacity duration-200"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}