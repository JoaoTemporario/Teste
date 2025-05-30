export interface Employment {
  employerName: string;
  registrationId: string;
  status: 'active' | 'inactive';
  hireDate: string;
  baseSalary: number;
  isAuthorized: boolean;
}

export interface FinancialInfo {
  availableMargin: number;
  committedAmount: number;
  usedPercentage: number;
  eligibleForNewLoans: boolean;
  remainingInstallments: number;
  totalInstallments: number;
  nextInstallmentAmount: number;
  nextInstallmentDate: string;
}

export interface WorkerData {
  personalInfo: {
    fullName: string;
    cpf: string;
    queryStatus: 'success' | 'partial' | 'failed';
    lastUpdated: string;
  };
  employments: Employment[];
  financialInfo: FinancialInfo;
}