import api from '@api/client';
import { type LoginMutationResponse } from '@types';

export const loginMutation = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  // Create Config from shared service
  const config = {
    method: 'post',
    url: '/jwt/',
    data: JSON.stringify({
      username,
      password,
    }),
  };
  const response: LoginMutationResponse = await api(config);
  const { data } = response;
  // Validate Response
  if (response.status !== 200 || !data) {
    throw new Error('Something went wrong');
  } else if (!data.refresh || !data.access) {
    throw new Error('Invalid Response');
  }

  // Return Tokens
  return {
    access: data.access,
    refresh: data.refresh,
  };
};
