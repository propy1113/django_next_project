import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuthPage = Component.requiresAuth;

    if (!token && isAuthPage) {
      router.push('/');
    }
  }, [router, Component]);

  return <Component {...pageProps} />;
}

export default MyApp;
