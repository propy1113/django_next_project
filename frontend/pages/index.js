// ReactのuseStateフックをインポート
import { useState } from 'react';
// Next.jsのuseRouterフックをインポート
import { useRouter } from 'next/router';
// HTTPリクエスト用のaxiosをインポート
import axios from 'axios';
// Next.jsのLinkコンポーネントをインポート
import Link from 'next/link';

// Homeコンポーネントを定義
export default function Home() {
  // フォームの状態を管理
  const [formData, setFormData] = useState({
    username: '',  // ユーザー名フィールド
    password: '',  // パスワードフィールド
  });
  const router = useRouter();  // ルーターを初期化

  // フォーム入力の変更をハンドル
  const handleChange = (e) => {
    const { name, value } = e.target;  // イベントから名前と値を取得
    // 状態を更新
    setFormData({
      ...formData,  // 以前のデータを保持
      [name]: value,  // 新しいデータを更新
    });
  };

  // フォーム送信の処理
  const handleSubmit = async (e) => {
    e.preventDefault();  // デフォルトの送信動作を無効
    try {
      // サーバーにログインデータを送信
      const response = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL+'/login/', formData);
      localStorage.setItem('token', response.data.token);  // トークンを保存
      router.push('/dashboard');  // ダッシュボードへ移動
    } catch (error) {
      console.error(error);  // エラーをコンソールに表示
      alert('ログインに失敗しました。');  // エラー通知
    }
  };

  return (
    // コンテナのスタイル設定
    <div className="container mx-auto">
      {/* タイトル表示 */}
      <h1 className="text-2xl font-bold">ログイン</h1>
      {/* フォームの開始 */}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          {/* ユーザー名のラベル */}
          <label className="block">ユーザー名</label>
          {/* ユーザー名の入力フィールド */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-2"
            required  // 必須フィールド
          />
        </div>
        <div>
          {/* パスワードのラベル */}
          <label className="block">パスワード</label>
          {/* パスワードの入力フィールド */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2"
            required  // 必須フィールド
          />
        </div>
        {/* ログインボタン */}
        <button type="submit" className="bg-blue-500 text-white p-2">
          ログイン
        </button>
      </form>
      {/* アカウント作成へのリンク */}
      <Link href="/signup">
        アカウント作成
      </Link>
    </div>
  );
}
