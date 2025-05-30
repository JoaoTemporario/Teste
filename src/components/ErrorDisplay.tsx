import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="mt-8 p-6 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-4 animate-fadeIn">
      <div className="bg-red-500/20 p-2 rounded-full flex-shrink-0">
        <AlertTriangle className="text-red-500" size={24} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-red-300 mb-1">Erro na consulta</h3>
        <p className="text-red-200">{message}</p>
        <p className="mt-3 text-sm text-red-300">
          Verifique o CPF informado e tente novamente. Se o problema persistir, 
          entre em contato com o suporte.
        </p>
      </div>
    </div>
  );
};

export default ErrorDisplay;