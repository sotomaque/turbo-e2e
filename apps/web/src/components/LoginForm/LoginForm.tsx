import { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import useLocalStorage from '@hooks/useLocalStorage';
import { loginMutation, setAPIAuthToken } from '@api';
import { Button } from 'ui';

const LoginForm = () => {
  // State
  const [showError, setShowError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // useReducer - https://reactjs.org/docs/hooks-reference.html#usereducer

  // Hook(s)
  const router = useRouter();
  const { setValue: setAccessToken } = useLocalStorage('access_token', '');
  const { isLoading, mutateAsync, isError } = useMutation({
    mutationKey: ['login'],
    mutationFn: async () =>
      await loginMutation({
        password,
        username,
      }),
    onSuccess({ access }) {
      // reset showError
      setShowError(false);
      // Update Network instance to hold the token
      setAPIAuthToken(access);
      // Save token to local storage for persistence
      setAccessToken(access);
      router.push('/documents');
    },
    onError() {
      setShowError(true);
    },
  });

  // Computed Var(s)
  const isLoginButtonEnabled = Boolean(!isLoading && username && password);

  return (
    <div className="space-y-6" data-test-id="login-form">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ebgray-400"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            data-test-id="email-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-ebgreen-700 focus:outline-none focus:ring-ebgreen-700 sm:text-sm"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-ebgray-400"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            data-test-id="password-input"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-ebgreen-700 focus:outline-none focus:ring-ebgreen-700 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <Button
          fullWidth
          variant="primary"
          disabled={!isLoginButtonEnabled}
          onClick={() => {
            mutateAsync();
          }}
          type="submit"
          data-test-id="submit-button"
          isLoading={isLoading}
        >
          Sign in
        </Button>

        {showError ? (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            Whoops! Those credentials don`t look right.
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default LoginForm;
