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
  const hasAlerts = alerts.leaves.length > 0 || alerts.notices.length > 0 || alerts.terminations.length > 0;

  if (!hasAlerts) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <AlertTriangle size={20} className="text-amber-400" />
        <h2 className="text-lg font-medium text-white">Alertas</h2>
      </div>

      <div className="space-y-6">
        {alerts.leaves.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-amber-400 mb-3">Afastamentos</h3>
            <div className="space-y-4">
              {alerts.leaves.map((leave, index) => (
                <div key={index} className="p-4 bg-amber-400/10 rounded-lg border border-amber-400/20">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-amber-400 mt-1" />
                    <div>
                      <p className="text-amber-200 font-medium mb-1">{leave.reason}</p>
                      <p className="text-sm text-gray-300">{leave.description}</p>
                      <div className="mt-2 text-sm text-amber-300/70">
                        {formatDate(leave.startDate)} até {formatDate(leave.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.notices.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-orange-400 mb-3">Avisos Prévios</h3>
            <div className="space-y-4">
              {alerts.notices.map((notice, index) => (
                <div key={index} className="p-4 bg-orange-400/10 rounded-lg border border-orange-400/20">
                  <div className="flex items-start gap-3">
                    <Info size={16} className="text-orange-400 mt-1" />
                    <div>
                      <p className="text-orange-200 font-medium mb-1">{notice.reason}</p>
                      <p className="text-sm text-gray-300">{notice.description}</p>
                      <div className="mt-2 text-sm text-orange-300/70">
                        {formatDate(notice.startDate)} até {formatDate(notice.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.terminations.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-red-400 mb-3">Desligamentos</h3>
            <div className="space-y-4">
              {alerts.terminations.map((termination, index) => (
                <div key={index} className="p-4 bg-red-400/10 rounded-lg border border-red-400/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={16} className="text-red-400 mt-1" />
                    <div>
                      <p className="text-red-200 font-medium mb-1">{termination.reason}</p>
                      <div className="mt-2 text-sm text-red-300/70">
                        Data: {formatDate(termination.date)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsCard;