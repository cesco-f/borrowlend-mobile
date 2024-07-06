import {useQuery} from '@tanstack/react-query';
import {API_BASE_URL} from '../constants';
import {BLItem} from '../types';

interface SearchBooks {
  searchTerm: string;
  language: 'en' | 'es' | 'it';
}

const fetchBooks = async ({searchTerm, language}: SearchBooks) => {
  if (!searchTerm) {
    return [];
  }
  const response = await fetch(
    `${API_BASE_URL}/books?q=${searchTerm
      .toLowerCase()
      .replace(' ', '+')}&language=${language}`,
  );

  return response.json() as Promise<BLItem[]>;
};

export const useSearchBooks = ({searchTerm, language}: SearchBooks) => {
  return useQuery({
    queryKey: ['books', searchTerm, language],
    queryFn: () => fetchBooks({searchTerm, language}),
  });
};
