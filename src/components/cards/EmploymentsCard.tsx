import React from 'react';
import { Briefcase, Calendar, CreditCard, Copy } from 'lucide-react';
import { Employment } from '../../types/workerData';
import StatusBadge from '../ui/StatusBadge';
import { formatDate, formatCurrency } from '../../utils/formatters';
import CopyButton from '../ui/CopyButton';

interface EmploymentsCardProps {
  employments: Employment[];
}

const EmploymentsCard: React.FC<EmploymentsCardProps> = ({ employments }) => {
  if (employments.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase size={20} className="text-blue-400" />
          <h2 className="text-lg font-medium text-white">Vínculos Empregatícios</h2>
        </div>
        <div className="p-6 bg-gray-700/30 rounded-md text-center">
          <p className="text-gray-400">Nenhum vínculo empregatício encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase size={20} className="text-blue-400" />
        <h2 className="text-lg font-medium text-white">Vínculos Empregatícios</h2>
      </div>

      <div className="space-y-6">
        {employments.map((employment, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-md ${index % 2 === 0 ? 'bg-gray-700/30' : 'bg-gray-700/10'} 
                      transition-all duration-200 hover:bg-gray-700/50`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-gray-200 font-medium">{employment.employerName}</h3>
              <div className="flex gap-2">
                <StatusBadge 
                  label={employment.status === 'active' ? 'Ativo' : 'Inativo'} 
                  variant={employment.status === 'active' ? 'success' : 'default'} 
                />
                <StatusBadge 
                  label={employment.isAuthorized ? 'Autorizado' : 'Não autorizado'} 
                  variant={employment.isAuthorized ? 'info' : 'warning'} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 mt-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Matrícula</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-300 font-medium">{employment.registrationId}</p>
                  <CopyButton value={employment.registrationId} tooltip="Copiar matrícula" />
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                  <Calendar size={14} />
                  <span>Data de admissão</span>
                </p>
                <p className="text-gray-300">{formatDate(employment.hireDate)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                  <CreditCard size={14} />
                  <span>Salário base</span>
                </p>
                <p className="text-gray-300">{formatCurrency(employment.baseSalary)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmploymentsCard;