import { useQuery } from '@tanstack/react-query';
import { Data } from '../types';

export const useFetchData = () => {
  return useQuery<Data[], Error>({
    queryKey: ['fetchData'],
    queryFn: async () => {
      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    },
    initialData: [],
  });
};
