import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Data } from '../types';

type EditFormProps = {
  editData: Data;
  handleEdit: (data: Data) => void;
  onSubmit: (data: Data) => void;
};

export const EditForm: React.FC<EditFormProps> = ({ editData, handleEdit, onSubmit }) => {
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([
    { label: 'TPS', value: 'TPS' },
    { label: 'Adventure', value: 'Adventure' },
    { label: 'Horror', value: 'Horror' },
    { label: 'Movie', value: 'Movie' },
    { label: 'Thriller', value: 'Thriller' },
    { label: 'Spy', value: 'Spy' },
    { label: 'Batman', value: 'Batman' },
    { label: 'Philanthropist', value: 'Philanthropist' },
    { label: 'Orphan', value: 'Orphan' },
  ]);
  const [newTag, setNewTag] = useState<string>('');

  const { register, handleSubmit, setValue, getValues } = useForm<Data>({
    defaultValues: editData,
  });

  useEffect(() => {
    setValue('name', editData.name);
    setValue('category', editData.category);
  }, [editData, setValue]);

  const handleAddTag = () => {
    if (newTag && !categoryOptions.some((option) => option.value === newTag)) {
      const newOption = { label: newTag, value: newTag };
      setCategoryOptions((prevOptions) => [...prevOptions, newOption]);
      setNewTag('');
    }
  };

  const onEdit = (data: Data) => {
    handleEdit(data);
    setValue('name', data.name);
    setValue('category', data.category);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded-lg">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name')}
          defaultValue={editData.name}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">Categories</label>
        <MultiSelect
          value={getValues('category')}
          options={categoryOptions}
          onChange={(e) => onEdit({ ...editData, category: e.value })}
          placeholder="Select Categories"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1 flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">Add New Tag</label>
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center mt-6">
          <Button
            label="Add Tag"
            icon="pi pi-plus"
            type="button"
            onClick={handleAddTag}
            className="p-button-success p-button-sm"
          />
        </div>
      </div>

      <div className="flex justify-end pt-5">
        <Button label="Save" icon="pi pi-check" type="submit" className="p-button-primary p-button-sm" />
      </div>
    </form>
  );
};
