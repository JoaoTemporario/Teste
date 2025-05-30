import React from 'react';
import { Briefcase, Calendar, CreditCard, Building, FileText, AlertTriangle } from 'lucide-react';
import { Employment } from '../../types/workerData';
import StatusBadge from '../ui/StatusBadge';
import { formatDate, formatCurrency, formatCNPJ } from '../../utils/formatters';
import CopyButton from '../ui/CopyButton';

interface EmploymentsCardProps {
  employments: Employment[];
}

const EmploymentsCard: React.FC<EmploymentsCardProps> = ({ employments }) => {
  const getStatusInfo = (employment: Employment) => {
    if (employment.status === 'leave') {
      return { label: 'Afastado', variant: 'warning' as const };
    }
    if (employment.status === 'notice') {
      return { label: 'Aviso Prévio', variant: 'warning' as const };
    }
    if (employment.status === 'terminated') {
      return { label: 'Desligado', variant: 'error' as const };
    }
    return {
      label: employment.status === 'active' ? 'Ativo' : 'Inativo',
      variant: employment.status === 'active' ? 'success' as const : 'default' as const
    };
  };

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
        {employments.map((employment, index) => {
          const statusInfo = getStatusInfo(employment);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-md ${index % 2 === 0 ? 'bg-gray-700/30' : 'bg-gray-700/10'} 
                        transition-all duration-200 hover:bg-gray-700/50`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-gray-200 font-medium">{employment.employerName}</h3>
                  {employment.ineligibilityReason && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
                      <AlertTriangle size={14} className="text-red-400" />
                      <span className="text-xs text-red-400">{employment.ineligibilityReason}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <StatusBadge 
                    label={statusInfo.label}
                    variant={statusInfo.variant}
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
                  <p className="text-sm text-gray-400 mb-1">CNPJ/CPF do Empregador</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-300">{formatCNPJ(employment.employerDocument)}</p>
                    <CopyButton value={employment.employerDocument} tooltip="Copiar documento" />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Código de Inscrição do Empregador</p>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-300">
                      {employment.employerRegistrationType.toUpperCase()} - {employment.employerRegistrationCode}
                    </p>
                    <CopyButton value={employment.employerRegistrationCode} tooltip="Copiar código" />
                  </div>
                </div>


                <div>
                  <p className="text-sm text-gray-400 mb-1">Tipo de Contrato</p>
                  <p className="text-gray-300">{employment.contractType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Data de admissão</span>
                  </p>
                  <p className="text-gray-300">{formatDate(employment.hireDate)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Início da atividade do empregador</p>
                  <p className="text-gray-300">{formatDate(employment.employerStartDate)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                    <CreditCard size={14} />
                    <span>Salário base</span>
                  </p>
                  <p className="text-gray-300">{formatCurrency(employment.baseSalary)}</p>
                </div>

                {employment.terminationDate && (
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Data de Desligamento</p>
                    <p className="text-red-300">{formatDate(employment.terminationDate)}</p>
                    {employment.terminationReason && (
                      <p className="text-xs text-red-400 mt-1">
                        {employment.terminationCode && `[${employment.terminationCode}] `}
                        {employment.terminationReason}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {(employment.leaves.length > 0 || employment.notices.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  
                  {employment.leaves.map((leave, idx) => (
                    <div key={`leave-${idx}`} className="flex items-start gap-2 text-sm">
                      <AlertTriangle size={16} className="text-amber-400 mt-1" />
                      <div>
                        <span className="text-amber-400">Afastamento: </span>
                        <span className="text-gray-300">{leave.description}</span>
                        <p className="text-gray-400 mt-1">
                          {formatDate(leave.startDate)} até {formatDate(leave.endDate)}
                        </p>
                      </div>
                    </div>
                  ))}
              
                  {employment.notices.map((notice, idx) => (
                    <div key={`notice-${idx}`} className="flex items-start gap-2 text-sm mt-3">
                      <AlertTriangle size={16} className="text-orange-400 mt-1" />
                      <div>
                        <span className="text-orange-400">Aviso Prévio: </span>
                        <span className="text-gray-300">{notice.description}</span>
                        <p className="text-gray-400 mt-1">
                          {formatDate(notice.startDate)} até {formatDate(notice.endDate)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmploymentsCard;