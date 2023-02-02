import api from '@api/client';
import type { MeQueryResponse } from '@types';

export const meQuery = async () => {
  const config = {
    method: 'get',
    url: '/me/',
  };
  const response: MeQueryResponse = await api(config);
  const { data } = response;

  // Validate Response
  if (response.status !== 200 || !data) {
    throw new Error('Something went wrong');
  } else if (!data.id) {
    throw new Error('Invalid Response');
  }

  return data;
};
