import React from 'react';
import { AlertTriangle, Calendar, Info } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface AlertsCardProps {
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

const AlertsCard: React.FC<AlertsCardProps> = ({ alerts }) => {
  const hasActiveLeave = alerts.leaves.length > 0;
  const hasActiveNotice = alerts.notices.length > 0;
  const hasTermination = alerts.terminations.length > 0;
  const hasAnyAlert = hasActiveLeave || hasActiveNotice || hasTermination;

  const currentLeave = hasActiveLeave ? alerts.leaves[0] : null;
  const currentNotice = hasActiveNotice ? alerts.notices[0] : null;
  const currentTermination = hasTermination ? alerts.terminations[0] : null;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle size={20} className="text-amber-400" />
        <h2 className="text-lg font-medium text-white">Alertas</h2>
      </div>

      {!hasAnyAlert ? (
        <div className="p-4 bg-gray-700/30 rounded-lg text-center">
          <p className="text-gray-400">Nenhum alerta ativo</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Afastamento Section */}
          <div className="p-4 rounded-lg bg-gray-700/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Afastamento Ativo</h3>
              <span className={`text-sm font-medium ${hasActiveLeave ? 'text-amber-400' : 'text-gray-400'}`}>
                {hasActiveLeave ? 'SIM' : 'NÃO'}
              </span>
            </div>
            
            {currentLeave && (
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Motivo do afastamento</p>
                  <p className="text-sm text-amber-200">{currentLeave.reason}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-400">Data de início</p>
                    <p className="text-sm text-gray-300">{formatDate(currentLeave.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Data prevista de retorno</p>
                    <p className="text-sm text-gray-300">{formatDate(currentLeave.endDate)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Aviso Prévio Section */}
          <div className="p-4 rounded-lg bg-gray-700/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Aviso Prévio em Andamento</h3>
              <span className={`text-sm font-medium ${hasActiveNotice ? 'text-orange-400' : 'text-gray-400'}`}>
                {hasActiveNotice ? 'SIM' : 'NÃO'}
              </span>
            </div>
            
            {currentNotice && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-400">Data de início</p>
                  <p className="text-sm text-gray-300">{formatDate(currentNotice.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Data final</p>
                  <p className="text-sm text-gray-300">{formatDate(currentNotice.endDate)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Desligamento Section */}
          <div className="p-4 rounded-lg bg-gray-700/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-300">Processo de Desligamento</h3>
              <span className={`text-sm font-medium ${hasTermination ? 'text-red-400' : 'text-gray-400'}`}>
                {hasTermination ? 'SIM' : 'NÃO'}
              </span>
            </div>
            
            {currentTermination && (
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs text-gray-400">Motivo do desligamento</p>
                  <p className="text-sm text-red-200">{currentTermination.reason}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Data efetiva</p>
                  <p className="text-sm text-gray-300">{formatDate(currentTermination.date)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsCard;