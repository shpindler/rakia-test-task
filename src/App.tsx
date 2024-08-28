import React from 'react';
import { Table } from './components/Table';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Data Table</h1>
        <Table />
      </div>
    </div>
  );
};
