import React, { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { Data } from '../types';
import { EditForm } from './EditForm';
import { DataTable } from './DataTable';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

export const Table: React.FC = () => {
  const { data: fetchedData, error, isLoading } = useFetchData();
  const [data, setData] = useState<Data[]>([]);
  const [editData, setEditData] = useState<Data | null>(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleSubmit = (updatedData: Data) => {
    setData((prevData) => {
      return prevData.map((item) =>
        item.id === editData?.id ? { ...item, ...updatedData } : item
      );
    });
    setEditData(null);
    setIsDialogVisible(false);
  };

  const handleDelete = (id: number | string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const confirmDelete = (id: number | string) => {
    confirmDialog({
      message: 'Are you sure you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptClassName: 'p-button-danger',
      rejectClassName: 'p-button-secondary',
      accept: () => {
        handleDelete(id);
      },
      reject: () => {
        console.log('Удаление отменено');
      },
      footer: ({ accept, reject }) => (
        <div className="flex justify-end space-x-4">
          <Button label="No" icon="pi pi-times" onClick={reject} className="p-button-secondary" />
          <Button label="Yes" icon="pi pi-check" onClick={accept} className="p-button-danger" />
        </div>
      ),
    });
  };

  const handleEdit = (data: Data) => {
    setEditData(data);
    setIsDialogVisible(true);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key as keyof Data] < b[key as keyof Data]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key as keyof Data] > b[key as keyof Data]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      })
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <DataTable
        data={data}
        sortConfig={sortConfig}
        handleEdit={handleEdit}
        handleDelete={confirmDelete}
        handleSort={handleSort}
      />
      {editData && (
        <Dialog header="Edit Data" visible={isDialogVisible} style={{ width: '50vw' }} modal onHide={() => setIsDialogVisible(false)}>
          <EditForm
            editData={editData}
            handleEdit={handleEdit}
            onSubmit={handleSubmit}
          />
        </Dialog>
      )}
      <ConfirmDialog />
    </div>
  );
};
