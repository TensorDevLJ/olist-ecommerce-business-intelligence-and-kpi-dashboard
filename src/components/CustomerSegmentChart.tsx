import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CustomerSegmentChartProps {
  data: { type: string; count: number }[];
}

const COLORS = ['#2563eb', '#059669'];

export default function CustomerSegmentChart({ data }: CustomerSegmentChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.count / total) * 100).toFixed(1)
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Segmentation</h3>
        <p className="text-sm text-gray-600">New vs Repeat customers</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithPercentage}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="count"
            >
              {dataWithPercentage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} customers`,
                name === 'New' ? 'New Customers' : 'Repeat Customers'
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              formatter={(value, entry) => `${value}: ${entry.payload?.percentage}%`}
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}