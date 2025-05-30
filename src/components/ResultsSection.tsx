import React from 'react';
import { WorkerData } from '../types/workerData';
import PersonalInfoCard from './cards/PersonalInfoCard';
import EmploymentsCard from './cards/EmploymentsCard';
import FinancialInfoCard from './cards/FinancialInfoCard';
import { useWorkerData } from '../context/WorkerDataContext';
import ResultsSkeleton from './skeletons/ResultsSkeleton';

interface ResultsSectionProps {
  data: WorkerData;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ data }) => {
  const { loading } = useWorkerData();
  
  if (loading) {
    return <ResultsSkeleton />;
  }

  // Check if worker has no employment or financial data
  const isEmpty = data.employments.length === 0 && 
                  data.financialInfo.availableMargin === 0 && 
                  data.financialInfo.committedAmount === 0;

  if (isEmpty) {
    return (
      <div className="mt-8 bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
        <h2 className="text-lg font-medium text-gray-200 mb-3">Dados Limitados</h2>
        <p className="text-gray-400 mb-4">
          Encontramos o cadastro básico deste trabalhador, mas não há dados de vínculos empregatícios 
          ou informações financeiras disponíveis.
        </p>
        <div className="mt-6 p-4 bg-gray-700/50 rounded-md inline-block">
          <p className="text-sm text-gray-300">
            Nome: <span className="font-medium">{data.personalInfo.fullName}</span>
          </p>
          <p className="text-sm text-gray-300 mt-1">
            CPF: <span className="font-medium">{data.personalInfo.cpf}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6 pb-10 animate-fadeIn">
      <PersonalInfoCard data={data.personalInfo} />
      <EmploymentsCard employments={data.employments} />
      <FinancialInfoCard data={data.financialInfo} />
    </div>
  );
};

export default ResultsSection;