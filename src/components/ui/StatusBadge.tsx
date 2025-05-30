import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  label, 
  variant = 'default' 
}) => {
  const getVariantClasses = (variant: BadgeVariant) => {
    switch (variant) {
      case 'success':
        return 'bg-green-900/30 text-green-400 border-green-700';
      case 'warning':
        return 'bg-amber-900/30 text-amber-400 border-amber-700';
      case 'error':
        return 'bg-red-900/30 text-red-400 border-red-700';
      case 'info':
        return 'bg-blue-900/30 text-blue-400 border-blue-700';
      default:
        return 'bg-gray-700/50 text-gray-300 border-gray-600';
    }
  };

  return (
    <span 
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getVariantClasses(variant)}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;