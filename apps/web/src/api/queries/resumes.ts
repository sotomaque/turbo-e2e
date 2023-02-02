import { ParsedResumeResponse } from './../../types/index';
import api from '@api/client';
import type { ResumeListResponse } from '@types';

export const resumesQuery = async (): Promise<ParsedResumeResponse[] | []> => {
  const config = {
    method: 'get',
    url: '/resume/',
  };
  const response: ResumeListResponse = await api(config);
  const { data } = response;

  // // Validate Response
  if (response.status !== 200 || !data) {
    throw new Error('Something went wrong');
  } else if (!data.results) {
    throw new Error('Invalid Response');
  }

  return data.results || [];
};
