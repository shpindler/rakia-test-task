import React from 'react';
import { Button } from 'primereact/button';
import { Data } from '../types';

type DataTableProps = {
  data: Data[];
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  handleEdit: (data: Data) => void;
  handleDelete: (id: number | string) => void;
  handleSort: (key: string) => void;
};

export const DataTable: React.FC<DataTableProps> = ({ data, sortConfig, handleEdit, handleDelete, handleSort }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white rounded-lg">
        <thead className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('category')}>
              Category {sortConfig?.key === 'category' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {data?.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b border-gray-200 hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
              <td className="py-3 px-6 text-left">{item.category.join(', ')}</td>
              <td className="py-3 px-6 text-center flex justify-center space-x-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-rounded p-button-primary p-button-sm"
                  onClick={() => handleEdit(item)}
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-rounded p-button-danger p-button-sm"
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
