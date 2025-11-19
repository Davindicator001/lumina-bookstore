import React from 'react';
import { LucideIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, isPositive, icon: Icon, color }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 flex items-start justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        {change && (
          <div className={`flex items-center mt-2 text-xs font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            <span className={`flex items-center px-1.5 py-0.5 rounded mr-1 ${isPositive ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              {isPositive ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {change}
            </span>
            <span className="text-gray-400 dark:text-gray-500 font-normal">vs last month</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color} shadow-sm`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default StatsCard;
