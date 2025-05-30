import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold text-white">Consulta de Dados do Trabalhador</h1>
            <nav className="flex items-center text-sm text-gray-400 mt-1">
              <a href="#" className="hover:text-blue-400 flex items-center gap-1">
                <Home size={14} />
                <span>Início</span>
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-300">Consulta</span>
            </nav>
          </div>
          
          <button 
            className="flex items-center gap-2 text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 
                      px-4 py-2 rounded transition-colors duration-200 text-sm w-fit"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;