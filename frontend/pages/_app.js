import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import logger from '../pino';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthPage = Component.requiresAuth;
    logger.info('Rendering page', { page: Component.name });

    if (!token && isAuthPage) {
      router.push('/');
    }
  }, [router, Component]);

  return <Component {...pageProps} />;
}

export default MyApp;
