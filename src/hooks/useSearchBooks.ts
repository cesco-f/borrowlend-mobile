import {useQuery} from '@tanstack/react-query';
import {API_BASE_URL} from '../constants';
import {BLItem} from '../types';

const fetchBooks = async (searchTerm: string) => {
  if (!searchTerm) {
    return [];
  }
  const response = await fetch(
    `${API_BASE_URL}/books?q=${searchTerm
      .toLowerCase()
      .replace(' ', '+')}&language=es`,
  );

  return response.json() as Promise<BLItem[]>;
};

export const useSearchBooks = (searchTerm: string) => {
  return useQuery({
    queryKey: ['books', searchTerm],
    queryFn: () => fetchBooks(searchTerm),
  });
};
