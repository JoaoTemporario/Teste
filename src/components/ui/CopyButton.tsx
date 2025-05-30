import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  value: string;
  tooltip?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, tooltip = 'Copiar' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className={`p-1 rounded-full transition-colors duration-200 ${
          copied 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600 hover:text-gray-300'
        }`}
        aria-label={copied ? 'Copiado' : tooltip}
      >
        {copied ? (
          <Check size={14} className="text-green-400" />
        ) : (
          <Copy size={14} />
        )}
      </button>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 
                      bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                      transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {copied ? 'Copiado!' : tooltip}
      </div>
    </div>
  );
};

export default CopyButton;