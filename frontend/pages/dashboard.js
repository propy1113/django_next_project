import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://0.0.0.0:8000/api/user/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('ユーザー情報の取得に失敗しました:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://0.0.0.0:8000/api/logout/',
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">ダッシュボード</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white p-2">
          ログアウト
        </button>
      </header>
      <main>
        <h2>ようこそ、{username}さん</h2>
        {/* 他のコンテンツをここに追加 */}
      </main>
    </div>
  );
};

// ダッシュボードページは認証が必要
Dashboard.requiresAuth = true;

export default Dashboard;
