import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useWorkerData } from '../context/WorkerDataContext';
import { formatCPF, validateCPF } from '../utils/formatters';

const SearchForm: React.FC = () => {
  const [cpf, setCpf] = useState('');
  const [validationError, setValidationError] = useState('');
  const { fetchData, loading } = useWorkerData();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatCPF(rawValue);
    setCpf(formattedValue);
    
    // Clear validation error when user types
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cpf) {
      setValidationError('CPF é obrigatório');
      return;
    }
    
    if (!validateCPF(cpf)) {
      setValidationError('CPF inválido');
      return;
    }
    
    fetchData(cpf);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700"
    >
      <div className="sm:flex items-end gap-4">
        <div className="flex-1 mb-4 sm:mb-0">
          <label htmlFor="cpf" className="block text-sm font-medium text-gray-300 mb-2">
            CPF do Trabalhador
          </label>
          <input
            id="cpf"
            type="text"
            value={cpf}
            onChange={handleInputChange}
            placeholder="000.000.000-00"
            maxLength={14}
            className={`w-full bg-gray-700 border ${
              validationError ? 'border-red-500' : 'border-gray-600'
            } rounded-md px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            disabled={loading}
          />
          {validationError && (
            <p className="mt-1 text-sm text-red-500">{validationError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded-md flex items-center justify-center gap-2 text-white transition-colors duration-200
                     ${loading 
                       ? 'bg-gray-600 cursor-not-allowed' 
                       : 'bg-blue-600 hover:bg-blue-700'} 
                     sm:w-auto w-full`}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Consultando...</span>
            </>
          ) : (
            <>
              <Search size={18} />
              <span>Consultar</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;