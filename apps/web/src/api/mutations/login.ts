import api from '../client';

export const loginMutation = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
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

// TODO: Move to types?
interface LoginMutationResponse extends Response {
  data?: {
    access: string;
    refresh: string;
  };
}
