import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@api/client';
import type { ParsedResumeResponse } from '@types';

type ApiResponse = null;
type Variables = { id: number };

const useDeleteResume = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, unknown, Variables>({
    mutationFn: async ({ id }) => {
      const response = await api({
        method: 'DELETE',
        url: `/resume/${id}/`,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success('Resume deleted');
      const previous = queryClient.getQueryData([
        'resume-list',
      ]) as ParsedResumeResponse[];
      const updated = previous.filter((item) => item.id !== variables.id);
      queryClient.setQueryData(['resume-list'], updated);
    },
    onError: () => {
      toast.error('Deleting resume did not work, please try again');
    },
  });
};

export default useDeleteResume;
