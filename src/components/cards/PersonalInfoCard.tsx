import React from 'react';
import { User, Calendar, ClipboardCheck, MapPin, Users, AlertCircle } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import { formatDate, formatCPF, formatNIS } from '../../utils/formatters';
import CopyButton from '../ui/CopyButton';
import { PersonalInfo } from '../../types/workerData';

interface PersonalInfoCardProps {
  data: PersonalInfo;
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
      <div className="flex items-center justify-between mb-6">
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
          <p className="text-sm text-gray-400 mb-1">Nome da mãe</p>
          <p className="text-gray-200">{data.motherName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1">NIS/PIS/PASEP</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-200 font-medium">{formatNIS(data.nis)}</p>
            <CopyButton value={data.nis} tooltip="Copiar NIS" />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            <Calendar size={14} />
            <span>Data de nascimento</span>
          </p>
          <p className="text-gray-300">{formatDate(data.birthDate)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400 mb-1 flex items-center gap-2">
            <MapPin size={14} />
            <span>Local de nascimento</span>
          </p>
          <p className="text-gray-300">{data.birthCity} - {data.birthState}</p>
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

        <div className="col-span-2">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-700/30">
            <AlertCircle size={20} className={data.isPoliticallyExposed ? "text-amber-400" : "text-gray-400"} />
            <span className="text-sm">
              Pessoa Exposta Politicamente: 
              <span className={`font-medium ml-1 ${data.isPoliticallyExposed ? "text-amber-400" : "text-gray-400"}`}>
                {data.isPoliticallyExposed ? "Sim" : "Não"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoCard;