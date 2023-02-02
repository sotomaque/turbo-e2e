import Head from 'next/head';

import LoginForm from '@components/LoginForm/LoginForm';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jwt-decode';
import isPast from 'date-fns/isPast';

const LoginPage = () => {
  // Hook(s)
  const router = useRouter();
  const isAuthed = useCallback(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        const user: {
          exp: number;
          iat: number;
          jti: string;
          token_type: string;
          user_id: number;
        } = jwt(accessToken);
        const isExpired = isPast(new Date(user.exp * 1000));
        return !isExpired;
      }
    }
    return false;
  }, []);

  useEffect(() => {
    if (isAuthed()) {
      router.replace('/');
    }
  }, [isAuthed, router]);

  return (
    <>
      <Head>
        <title>Login | Earnbetter</title>
      </Head>
      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col p-6">
          <div className="lg:pb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mx-auto h-5 w-auto md:mx-0"
              src="/earnbetter-logo-color.svg"
              alt="Earnbetter"
              data-testid="logo"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center py-12 sm:px-6 lg:flex-none lg:px-20 lg:py-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <h2 className="mt-6 text-center font-serif text-4xl font-bold text-ebgray-900">
                Sign In
              </h2>

              <div className="mt-8">
                <div className="mt-6">
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
            alt="Earnbetter"
            data-testid="login-background"
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
