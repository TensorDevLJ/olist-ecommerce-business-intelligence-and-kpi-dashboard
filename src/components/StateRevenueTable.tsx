import React from 'react';
import { MapPin } from 'lucide-react';

interface StateRevenueTableProps {
  data: { state: string; orders: number; revenue: number }[];
}

export default function StateRevenueTable({ data }: StateRevenueTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Sales by State</h3>
        <p className="text-sm text-gray-600">Geographic performance breakdown</p>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-900">State</th>
              <th className="text-right py-3 px-2 font-medium text-gray-900">Orders</th>
              <th className="text-right py-3 px-2 font-medium text-gray-900">Revenue</th>
              <th className="text-right py-3 px-2 font-medium text-gray-900">Avg Order</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const avgOrder = item.orders > 0 ? item.revenue / item.orders : 0;
              
              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900">{item.state}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-2 text-gray-600">
                    {item.orders.toLocaleString()}
                  </td>
                  <td className="text-right py-4 px-2 font-medium text-gray-900">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="text-right py-4 px-2 text-gray-600">
                    {formatCurrency(avgOrder)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}