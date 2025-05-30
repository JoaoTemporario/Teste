import React from 'react';

const ResultsSkeleton: React.FC = () => {
  return (
    <div className="mt-8 space-y-6 animate-pulse">
      {/* Personal Info Card Skeleton */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <div className="flex justify-between mb-6">
          <div className="h-6 bg-gray-700 rounded w-48"></div>
          <div className="h-6 bg-gray-700 rounded w-28"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Employments Card Skeleton */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <div className="h-6 bg-gray-700 rounded w-56 mb-6"></div>
        <div className="space-y-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4 rounded-md bg-gray-700/30">
              <div className="flex justify-between mb-4">
                <div className="h-5 bg-gray-700 rounded w-48"></div>
                <div className="flex gap-2">
                  <div className="h-5 bg-gray-700 rounded w-16"></div>
                  <div className="h-5 bg-gray-700 rounded w-24"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j}>
                    <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
                    <div className="h-5 bg-gray-700 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Info Card Skeleton */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <div className="h-6 bg-gray-700 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-4 bg-gray-700 rounded w-36 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-32"></div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-700/30 rounded-md">
          <div className="flex justify-between mb-4">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
            <div className="h-6 bg-gray-700 rounded w-40"></div>
          </div>
          <div className="h-2.5 bg-gray-700 rounded-full w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSkeleton;