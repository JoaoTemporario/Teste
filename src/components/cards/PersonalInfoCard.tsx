import React from 'react';
import { User, Calendar, ClipboardCheck } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatDate, formatCPF } from '../../utils/formatters';
import CopyButton from '../ui/CopyButton';

interface PersonalInfoCardProps {
  data: {
    fullName: string;
    cpf: string;
    queryStatus: 'success' | 'partial' | 'failed';
    lastUpdated: string;
  };
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ data }) => {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success': return 'Consulta completa';
      case 'partial': return 'Consulta parcial';
      case 'failed': return 'Consulta falhou';
      default: return 'Status desconhecido';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'partial': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <User size={20} className="text-blue-400" />
          <span>Dados Pessoais</span>
        </h2>
        <StatusBadge 
          label={getStatusLabel(data.queryStatus)} 
          variant={getStatusVariant(data.queryStatus)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Nome completo</p>
          <p className="text-gray-200 font-medium">{data.fullName}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-1">CPF</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-200 font-medium">{formatCPF(data.cpf)}</p>
            <CopyButton value={data.cpf} tooltip="Copiar CPF" />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            <Calendar size={14} />
            <span>Última atualização</span>
          </p>
          <p className="text-gray-300">{formatDate(data.lastUpdated)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            <ClipboardCheck size={14} />
            <span>Fonte dos dados</span>
          </p>
          <p className="text-gray-300">Sistema Nacional de Cadastro</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;