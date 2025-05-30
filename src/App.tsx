import React from 'react';
import ConsultationScreen from './components/ConsultationScreen';
import { WorkerDataProvider } from './context/WorkerDataContext';
import './index.css';

function App() {
  return (
    <WorkerDataProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200">
        <ConsultationScreen />
      </div>
    </WorkerDataProvider>
  );
}

export default App;