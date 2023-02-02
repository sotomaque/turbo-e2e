import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@api/client';
import type { ParsedResumeResponse } from '@types';

type ApiResponse = ParsedResumeResponse;
type Variables = { id: number; label: string };

const useRenameResume = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, unknown, Variables>({
    mutationFn: async ({ id, label }) => {
      const response = await api({
        method: 'PATCH',
        url: `/resume/${id}/`,
        data: {
          label,
        },
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success('Resume renamed');
      const previous = queryClient.getQueryData([
        'resume-list',
      ]) as ParsedResumeResponse[];
      const updated = previous.map((item) => {
        if (item.id === variables.id) {
          return data;
        }
        return item;
      });
      queryClient.setQueryData(['resume-list'], updated);
    },
    onError: () => {
      toast.error('Resume renaming did not work, please try again');
    },
  });
};

export default useRenameResume;
