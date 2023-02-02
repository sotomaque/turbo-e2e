import { useRouter } from 'next/router';

import isPast from 'date-fns/isPast';
import jwt from 'jwt-decode';
import { useCallback, useEffect } from 'react';

export const ProtectedRoute = ({
  children,
  publicRoutes,
}: {
  children: React.ReactNode;
  publicRoutes: string[];
}) => {
  // Hook(s)
  const router = useRouter();
  const pathIsProtected = publicRoutes.indexOf(router.pathname) === -1;
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
    if (pathIsProtected && !isAuthed()) {
      router.replace('/login');
    }
  }, [pathIsProtected, isAuthed, router]);

  return <>{children}</>;
};
