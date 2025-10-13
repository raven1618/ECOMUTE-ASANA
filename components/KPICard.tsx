'use client';

import { KPI } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  kpi: KPI;
}

export default function KPICard({ kpi }: KPICardProps) {
  const percentage = (kpi.value / kpi.target) * 100;
  const isAboveTarget = kpi.value >= kpi.target;

  const getTrendIcon = () => {
    switch (kpi.trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{kpi.name}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {kpi.value}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{kpi.unit}</span>
          </div>
        </div>
        {getTrendIcon()}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Meta: {kpi.target}{kpi.unit}</span>
          <span className={isAboveTarget ? 'text-green-600 dark:text-green-400 font-medium' : 'text-orange-600 dark:text-orange-400 font-medium'}>
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className={`h-full rounded-full transition-all ${
              isAboveTarget ? 'bg-green-500' : 'bg-orange-500'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

