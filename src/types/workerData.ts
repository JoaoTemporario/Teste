export interface Employment {
  employerName: string;
  registrationId: string;
  status: 'active' | 'inactive' | 'leave' | 'notice' | 'terminated';
  hireDate: string;
  terminationDate?: string;
  terminationReason?: string;
  terminationCode?: string;
  baseSalary: number;
  isAuthorized: boolean;
  employerDocument: string;
  employerRegistrationType: 'cnpj' | 'cpf';
  employerRegistrationCode: string;
  contractType: string;
  ineligibilityReason?: string;
  leaveInfo?: {
    startDate: string;
    endDate: string;
    reason: string;
    description: string;
  };
  noticeInfo?: {
    startDate: string;
    endDate: string;
    reason: string;
    description: string;
  };
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
  totalEarnings: number;
  marginBase: number;
  activeLoans: number;
  suspendedLoans: number;
  legacyLoans: Array<{
    contractType: string;
    principalAmount: number;
    installmentAmount: number;
    totalInstallments: number;
    paidInstallments: number;
    remainingBalance: number;
    startDate: string;
    endDate: string;
    monthlyRate: number;
    annualRate: number;
    ineligibilityReason?: string;
  }>;
}

export interface PersonalInfo {
  fullName: string;
  cpf: string;
  birthDate: string;
  motherName: string;
  nis: string;
  birthState: string;
  birthCity: string;
  isPoliticallyExposed: boolean;
  queryStatus: 'success' | 'partial' | 'failed';
  lastUpdated: string;
}

export interface WorkerData {
  personalInfo: PersonalInfo;
  employments: Employment[];
  financialInfo: FinancialInfo;
  alerts: {
    leaves: Array<{
      startDate: string;
      endDate: string;
      reason: string;
      description: string;
    }>;
    notices: Array<{
      startDate: string;
      endDate: string;
      reason: string;
      description: string;
    }>;
    terminations: Array<{
      date: string;
      reason: string;
    }>;
  };
}