import {useQuery} from '@tanstack/react-query';
import {fetchUsers} from '../api';

export const useSearchUsers = ({searchTerm}: {searchTerm: string}) => {
  return useQuery({
    queryKey: ['users', searchTerm],
    queryFn: () => fetchUsers({searchTerm}),
  });
};
