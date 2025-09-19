import React from 'react';
import { CreditCard, FileText, Gift, Smartphone } from 'lucide-react';

interface PaymentMethodsTableProps {
  data: { method: string; count: number; value: number }[];
}

const methodIcons: { [key: string]: React.ElementType } = {
  'CREDIT CARD': CreditCard,
  'BOLETO': FileText,
  'VOUCHER': Gift,
  'DEBIT CARD': Smartphone
};

export default function PaymentMethodsTable({ data }: PaymentMethodsTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Methods</h3>
        <p className="text-sm text-gray-600">Usage and transaction volume</p>
      </div>
      
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-900">Method</th>
              <th className="text-right py-3 px-2 font-medium text-gray-900">Transactions</th>
              <th className="text-right py-3 px-2 font-medium text-gray-900">Total Value</th>
              <th className="text-right py-3 px-2 font-medium text-gray-900">Share</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const Icon = methodIcons[item.method] || CreditCard;
              const percentage = ((item.value / totalValue) * 100).toFixed(1);
              
              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-900">{item.method}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-2 text-gray-600">
                    {item.count.toLocaleString()}
                  </td>
                  <td className="text-right py-4 px-2 font-medium text-gray-900">
                    {formatCurrency(item.value)}
                  </td>
                  <td className="text-right py-4 px-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {percentage}%
                    </span>
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