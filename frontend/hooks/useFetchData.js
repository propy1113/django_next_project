import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(url, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(response.data);
        setData(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          alert('セッションの有効期限が切れました。再度ログインしてください。');
          localStorage.removeItem('token');
          router.push('/');
        } else {
          console.error('エラーが発生しました:', err);
        }
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchData;
