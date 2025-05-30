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
      birthDate: '1985-03-15',
      motherName: 'Ana Maria Silva',
      nis: '12345678901',
      birthState: 'SP',
      birthCity: 'São Paulo',
      isPoliticallyExposed: false
    },
    employments: [
      {
        employerName: 'Empresa ABC Ltda',
        registrationId: '123456',
        status: 'active',
        hireDate: '2020-03-15',
        baseSalary: 4800,
        isAuthorized: true,
        employerDocument: '12.345.678/0001-90',
        employerRegistrationType: 'cnpj',
        employerRegistrationCode: '12345678000190',
        contractType: 'CLT'
      },
      {
        employerName: 'Indústrias XYZ S.A.',
        registrationId: '789012',
        status: 'inactive',
        hireDate: '2018-06-10',
        baseSalary: 3500,
        isAuthorized: false,
        employerDocument: '98.765.432/0001-10',
        employerRegistrationType: 'cnpj',
        employerRegistrationCode: '98765432000110',
        contractType: 'CLT'
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
      nextInstallmentDate: '2024-04-10',
      totalEarnings: 4800,
      marginBase: 2400,
      activeLoans: 1,
      suspendedLoans: 0,
      legacyLoans: []
    },
    alerts: {
      leaves: [],
      notices: [],
      terminations: []
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
      birthDate: '1990-01-01',
      motherName: 'Maria Exemplo',
      nis: '98765432109',
      birthState: 'RJ',
      birthCity: 'Rio de Janeiro',
      isPoliticallyExposed: false
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
      nextInstallmentDate: '',
      totalEarnings: 0,
      marginBase: 0,
      activeLoans: 0,
      suspendedLoans: 0,
      legacyLoans: []
    },
    alerts: {
      leaves: [
    {
      startDate: "2025-02-10",
      endDate: "2025-03-15",
      reason: "3",
      description: "Afastamento por motivo de doença",
    },
    {
      startDate: "2024-11-05",
      endDate: "2024-11-20",
      reason: "5",
      description: "Licença maternidade",
    },
  ],
      notices: [
    {
      startDate: "2024-09-01",
      endDate: "2024-10-01",
      reason: "1",
      description: "Aviso prévio trabalhado - Pedido de demissão",
    },
    {
      startDate: "2023-12-10",
      endDate: "2024-01-10",
      reason: "2",
      description: "Aviso prévio indenizado - Dispensa sem justa causa",
    },
  ],
      terminations: [
    {
      date: "2024-10-02",
      reason: "1",
    },
    {
      date: "2023-01-11",
      reason: "2",
    },
  ],
    }
  };
};