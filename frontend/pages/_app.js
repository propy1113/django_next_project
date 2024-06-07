import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && router.pathname !== '/') {
      router.push('/');
    }
  }, [router]);

  return <Component {...pageProps} />
}

export default MyApp
