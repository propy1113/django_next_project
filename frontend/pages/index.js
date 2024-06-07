import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://0.0.0.0:8000/api/notes/', formData);
      alert('データが送信されました！');
    } catch (error) {
      console.error(error);
      alert('送信中にエラーが発生しました。');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">フォーム入力画面</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">名前</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">メール</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">電話番号</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">住所</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ノート</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
