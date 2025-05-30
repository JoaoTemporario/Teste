import React, { createContext, useState, useContext, ReactNode } from 'react';
import { fetchWorkerData } from '../services/api';
import { WorkerData } from '../types/workerData';

interface WorkerDataContextType {
  workerData: WorkerData | null;
  loading: boolean;
  error: string | null;
  fetchData: (cpf: string) => Promise<void>;
  clearData: () => void;
}

const WorkerDataContext = createContext<WorkerDataContextType | undefined>(undefined);

export const useWorkerData = () => {
  const context = useContext(WorkerDataContext);
  if (!context) {
    throw new Error('useWorkerData must be used within a WorkerDataProvider');
  }
  return context;
};

interface WorkerDataProviderProps {
  children: ReactNode;
}

export const WorkerDataProvider: React.FC<WorkerDataProviderProps> = ({ children }) => {
  const [workerData, setWorkerData] = useState<WorkerData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (cpf: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWorkerData(cpf);
      setWorkerData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWorkerData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setWorkerData(null);
    setError(null);
  };

  return (
    <WorkerDataContext.Provider value={{ workerData, loading, error, fetchData, clearData }}>
      {children}
    </WorkerDataContext.Provider>
  );
};