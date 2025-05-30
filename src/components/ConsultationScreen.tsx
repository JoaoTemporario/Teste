import React from 'react';
import Header from './Header';
import SearchForm from './SearchForm';
import ResultsSection from './ResultsSection';
import { useWorkerData } from '../context/WorkerDataContext';
import ErrorDisplay from './ErrorDisplay';

const ConsultationScreen: React.FC = () => {
  const { workerData, loading, error } = useWorkerData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <SearchForm />
        
        {error && <ErrorDisplay message={error} />}
        
        {!error && workerData && (
          <ResultsSection data={workerData} />
        )}
        
        {!error && !loading && !workerData && (
          <div className="mt-12 text-center">
            <div className="p-8 bg-gray-800 rounded-lg shadow-md inline-block">
              <p className="text-gray-400 mb-4">
                Digite um CPF válido e clique em Consultar para ver os dados do trabalhador.
              </p>
              <p className="text-sm text-gray-500">
                Dica: Use 123.456.789-00 para ver dados de exemplo.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsultationScreen;