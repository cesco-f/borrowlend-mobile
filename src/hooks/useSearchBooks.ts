import {useQuery} from '@tanstack/react-query';
import {SearchBooks} from '../types';
import {fetchBooks} from '../api';

export const useSearchBooks = ({searchTerm, language}: SearchBooks) => {
  return useQuery({
    queryKey: ['books', searchTerm, language],
    queryFn: () => fetchBooks({searchTerm, language}),
  });
};
