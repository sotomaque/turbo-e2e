import { type AppType } from 'next/app';
import '../styles/globals.css';

const Web: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default Web;
