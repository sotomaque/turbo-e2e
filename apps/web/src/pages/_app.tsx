import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type AppType } from 'next/app';
import '../styles/tailwind.css';

const queryClient = new QueryClient();

const Web: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default Web;
