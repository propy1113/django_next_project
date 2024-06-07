import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://0.0.0.0:8000/api/login/', formData);
      alert('ログイン成功！');
      // ここでログイン後の処理を追加します
    } catch (error) {
      console.error(error);
      alert('ログインに失敗しました。');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">ログイン</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label className="block">ユーザー名</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2"
            required
          />
        </div>
        <div>
          <label className="block">パスワード</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          ログイン
        </button>
      </form>
      <Link href="/signup">
        アカウント作成
      </Link>
    </div>
  );
}
