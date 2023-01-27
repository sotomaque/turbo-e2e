import { type AppType } from 'next/app';
import '../styles/tailwind.css';

const Web: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default Web;
