import { WorkerData } from '../types/workerData';

// This is a mock API service for demo purposes
// In a real application, this would connect to a real backend
export const fetchWorkerData = async (cpf: string): Promise<WorkerData> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Validate CPF format (simple validation)
  if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
    throw new Error('Invalid CPF format');
  }
  
  // For demo purposes, return mock data
  // In a real app, this would be an API call like:
  // return fetch(`/api/workers/${cpf}`).then(res => res.json());
  
  // For testing different states, you can use specific CPFs:
  if (cpf === '123.456.789-00') {
    return getMockWorkerData(cpf);
  } else if (cpf === '987.654.321-00') {
    throw new Error('Worker not found');
  } else if (cpf === '111.222.333-44') {
    return getEmptyWorkerData(cpf);
  } else {
    return getMockWorkerData(cpf);
  }
};

const getMockWorkerData = (cpf: string): WorkerData => {
  return {
    personalInfo: {
      fullName: 'Maria Silva Oliveira',
      cpf: cpf,
      queryStatus: 'success',
      lastUpdated: new Date().toISOString(),
    },
    employments: [
      {
        employerName: 'Empresa ABC Ltda',
        registrationId: '123456',
        status: 'active',
        hireDate: '2020-03-15',
        baseSalary: 4800,
        isAuthorized: true,
      },
      {
        employerName: 'Indústrias XYZ S.A.',
        registrationId: '789012',
        status: 'inactive',
        hireDate: '2018-06-10',
        baseSalary: 3500,
        isAuthorized: false,
      }
    ],
    financialInfo: {
      availableMargin: 1440,
      committedAmount: 960,
      usedPercentage: 40,
      eligibleForNewLoans: true,
      remainingInstallments: 36,
      totalInstallments: 48,
      nextInstallmentAmount: 320,
      nextInstallmentDate: '2024-04-10'
    }
  };
};

const getEmptyWorkerData = (cpf: string): WorkerData => {
  return {
    personalInfo: {
      fullName: 'João Exemplo',
      cpf: cpf,
      queryStatus: 'partial',
      lastUpdated: new Date().toISOString(),
    },
    employments: [],
    financialInfo: {
      availableMargin: 0,
      committedAmount: 0,
      usedPercentage: 0,
      eligibleForNewLoans: false,
      remainingInstallments: 0,
      totalInstallments: 0,
      nextInstallmentAmount: 0,
      nextInstallmentDate: ''
    }
  };
};