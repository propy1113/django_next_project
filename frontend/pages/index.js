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
    <div>
      <h1>フォーム入力画面</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>名前</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>メール</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>電話番号</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>住所</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>ノート</label>
          <textarea name="note" value={formData.note} onChange={handleChange} required />
        </div>
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
