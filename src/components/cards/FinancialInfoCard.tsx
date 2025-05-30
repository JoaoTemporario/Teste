import React, { useState } from 'react';
import { CurrencyDollar, Percent, Warning, CheckCircle, ChartBar, ChartPie, SquaresFour, CalendarBlank, Clock } from '@phosphor-icons/react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FinancialInfoProps {
  data: {
    availableMargin: number;
    committedAmount: number;
    usedPercentage: number;
    eligibleForNewLoans: boolean;
    remainingInstallments: number;
    totalInstallments: number;
    nextInstallmentAmount: number;
    nextInstallmentDate: string;
  };
}

const FinancialInfoCard: React.FC<FinancialInfoProps> = ({ data }) => {
  const [selectedLayout, setSelectedLayout] = useState<'modern' | 'cards' | 'chart'>('modern');
  const totalMargin = data.availableMargin + data.committedAmount;

  const pieData = [
    { name: 'Disponível', value: data.availableMargin },
    { name: 'Comprometido', value: data.committedAmount }
  ];

  const COLORS = ['#22c55e', '#f59e0b'];

  const InstallmentsInfo = () => (
    <div className="bg-gray-700/20 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-blue-400" weight="bold" />
          <span className="text-sm text-gray-300">Parcelas restantes</span>
        </div>
        <span className="text-lg font-medium text-blue-400">
          {data.remainingInstallments}/{data.totalInstallments}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CurrencyDollar size={18} className="text-green-400" weight="bold" />
          <span className="text-sm text-gray-300">Próxima parcela</span>
        </div>
        <span className="text-lg font-medium text-green-400">
          {formatCurrency(data.nextInstallmentAmount)}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarBlank size={18} className="text-purple-400" weight="bold" />
          <span className="text-sm text-gray-300">Vencimento</span>
        </div>
        <span className="text-sm text-purple-400">
          {formatDate(data.nextInstallmentDate)}
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
        <div 
          className="h-1.5 rounded-full bg-blue-500"
          style={{ width: `${(data.remainingInstallments / data.totalInstallments) * 100}%` }}
        />
      </div>
    </div>
  );

  const ModernLayout = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500/20 rounded-full">
              <CurrencyDollar size={24} className="text-green-400" weight="bold" />
            </div>
            <p className="text-sm text-gray-400">Margem disponível</p>
          </div>
          <p className="text-3xl font-semibold text-green-400">
            {formatCurrency(data.availableMargin)}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {((data.availableMargin / totalMargin) * 100).toFixed(1)}% do total
          </p>
        </div>

        <div className="bg-gray-700/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/20 rounded-full">
              <Percent size={24} className="text-amber-400" weight="bold" />
            </div>
            <p className="text-sm text-gray-400">Valor comprometido</p>
          </div>
          <p className="text-3xl font-semibold text-amber-400">
            {formatCurrency(data.committedAmount)}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            {data.usedPercentage}% utilizado
          </p>
        </div>
      </div>

      <InstallmentsInfo />

      <div className="bg-gray-700/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          {data.eligibleForNewLoans ? (
            <CheckCircle size={20} className="text-green-400" weight="bold" />
          ) : (
            <Warning size={20} className="text-amber-400" weight="bold" />
          )}
          <p className="text-sm text-gray-300">
            Status para novos empréstimos: 
            <span className={data.eligibleForNewLoans ? 'text-green-400' : 'text-amber-400'}>
              {' '}{data.eligibleForNewLoans ? 'Elegível' : 'Não elegível'}
            </span>
          </p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              data.usedPercentage <= 30 ? 'bg-green-500' : 
              data.usedPercentage <= 70 ? 'bg-amber-500' : 
              'bg-red-500'
            }`}
            style={{ width: `${data.usedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );

  const CardsLayout = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl p-6">
          <p className="text-sm text-gray-300 mb-2">Margem Total</p>
          <p className="text-4xl font-bold text-white">
            {formatCurrency(totalMargin)}
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CurrencyDollar size={18} className="text-green-400" weight="bold" />
            </div>
            <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
              Disponível
            </span>
          </div>
          <p className="text-2xl font-semibold text-green-400 mb-1">
            {formatCurrency(data.availableMargin)}
          </p>
          <p className="text-xs text-gray-400">
            {((data.availableMargin / totalMargin) * 100).toFixed(1)}% do total
          </p>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Percent size={18} className="text-amber-400" weight="bold" />
            </div>
            <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-1 rounded-full">
              Comprometido
            </span>
          </div>
          <p className="text-2xl font-semibold text-amber-400 mb-1">
            {formatCurrency(data.committedAmount)}
          </p>
          <p className="text-xs text-gray-400">
            {data.usedPercentage}% utilizado
          </p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-blue-400" weight="bold" />
            <span className="text-sm text-gray-300">Parcelas</span>
          </div>
          <span className="text-lg font-medium text-blue-400">
            {data.remainingInstallments}/{data.totalInstallments}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Próxima parcela:</span>
          <span className="text-sm text-green-400">{formatCurrency(data.nextInstallmentAmount)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">Vencimento:</span>
          <span className="text-sm text-purple-400">{formatDate(data.nextInstallmentDate)}</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-300">Status de Elegibilidade</p>
          {data.eligibleForNewLoans ? (
            <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">
              Elegível
            </span>
          ) : (
            <span className="text-xs text-amber-400 bg-amber-900/30 px-2 py-1 rounded-full">
              Não Elegível
            </span>
          )}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
          <div 
            className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-amber-500"
            style={{ width: `${data.usedPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );

  const ChartLayout = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-400">Disponível</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-400">Comprometido</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Margem Disponível</p>
            <p className="text-2xl font-semibold text-green-400">
              {formatCurrency(data.availableMargin)}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400 mb-1">Valor Comprometido</p>
            <p className="text-2xl font-semibold text-amber-400">
              {formatCurrency(data.committedAmount)}
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Parcelas Restantes</p>
              <span className="text-lg font-medium text-blue-400">
                {data.remainingInstallments}/{data.totalInstallments}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Próximo pagamento:</span>
              <span className="text-green-400">{formatCurrency(data.nextInstallmentAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-400">Vencimento:</span>
              <span className="text-purple-400">{formatDate(data.nextInstallmentDate)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CurrencyDollar size={20} className="text-blue-400" weight="bold" />
          <h2 className="text-lg font-medium text-white">Informações Financeiras</h2>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedLayout('modern')}
            className={`p-2 rounded-lg transition-colors ${
              selectedLayout === 'modern' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
            title="Layout Moderno"
          >
            <SquaresFour size={18} weight={selectedLayout === 'modern' ? 'fill' : 'regular'} />
          </button>
          <button
            onClick={() => setSelectedLayout('cards')}
            className={`p-2 rounded-lg transition-colors ${
              selectedLayout === 'cards' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
            title="Layout Cards"
          >
            <ChartBar size={18} weight={selectedLayout === 'cards' ? 'fill' : 'regular'} />
          </button>
          <button
            onClick={() => setSelectedLayout('chart')}
            className={`p-2 rounded-lg transition-colors ${
              selectedLayout === 'chart' 
                ? 'bg-blue-500/20 text-blue-400' 
                : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700'
            }`}
            title="Layout Gráfico"
          >
            <ChartPie size={18} weight={selectedLayout === 'chart' ? 'fill' : 'regular'} />
          </button>
        </div>
      </div>

      {selectedLayout === 'modern' && <ModernLayout />}
      {selectedLayout === 'cards' && <CardsLayout />}
      {selectedLayout === 'chart' && <ChartLayout />}
    </div>
  );
};

export default FinancialInfoCard;