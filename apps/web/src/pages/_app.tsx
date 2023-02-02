import { ProtectedRoute } from '@components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppType } from 'next/app';
import '../styles/tailwind.css';

const queryClient = new QueryClient();

const publicPages = ['/login/[[...index]]'];

const Web: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProtectedRoute publicRoutes={publicPages}>
        <Component {...pageProps} />
      </ProtectedRoute>
    </QueryClientProvider>
  );
};

export default Web;
