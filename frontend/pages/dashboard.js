import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const router = useRouter();

  // 共通のAPIクライアントの作成
  const apiClient = axios.create({
    baseURL: 'http://0.0.0.0:8000/api',
  });

  // 共通のエラーハンドリング関数
  const handleError = (error) => {
    if (error.response && error.response.status === 401) {
      alert('セッションの有効期限が切れました。再度ログインしてください。');
      localStorage.removeItem('token');
      router.push('/');
    } else {
      console.error('エラーが発生しました:', error);
    }
  };

  // 共通のAPI呼び出し関数
  const fetchData = async (url, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.get(url, {
        ...options,
        headers: {
          Authorization: `Token ${token}`,
          ...options.headers,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const postData = async (url, data, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.post(url, data, {
        ...options,
        headers: {
          Authorization: `Token ${token}`,
          ...options.headers,
        },
      });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const deleteData = async (url, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      await apiClient.delete(url, {
        ...options,
        headers: {
          Authorization: `Token ${token}`,
          ...options.headers,
        },
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const patchData = async (url, data, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      await apiClient.patch(url, data, {
        ...options,
        headers: {
          Authorization: `Token ${token}`,
          ...options.headers,
        },
      });
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await fetchData('/user/');
        setUsername(user.username);

        const todos = await fetchData('/todos/');
        setTodos(todos);
      } catch (error) {
        // エラーはすでにhandleErrorで処理されている
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await postData('/logout/', {});
      localStorage.removeItem('token');
      router.push('/');
    } catch (error) {
      // エラーはすでにhandleErrorで処理されている
    }
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle) return;
    try {
      const newTodo = await postData('/todos/', { title: newTodoTitle, text: '' });
      setTodos([...todos, newTodo]);
      setNewTodoTitle('');
    } catch (error) {
      // エラーはすでにhandleErrorで処理されている
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteData(`/todos/${id}/`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      // エラーはすでにhandleErrorで処理されている
    }
  };

  const handleUpdateTodo = async (id, title, text) => {
    try {
      await patchData(`/todos/${id}/`, { title, text });
    } catch (error) {
      // エラーはすでにhandleErrorで処理されている
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
        <div className="flex justify-end items-center py-4">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="border p-2 mr-2"
            placeholder="新しいTodoのタイトル"
          />
          <button onClick={handleAddTodo} className="bg-green-500 text-white p-2">
            追加
          </button>
        </div>
        <div className="flex flex-wrap">
          {todos.map((todo, index) => (
            <div key={todo.id} className="border rounded p-4 m-2 w-1/4">
              <input
                type="text"
                value={todo.title || ''}
                onChange={(e) => {
                  const updatedTodos = todos.map((t) =>
                    t.id === todo.id ? { ...t, title: e.target.value } : t
                  );
                  setTodos(updatedTodos);
                }}
                onBlur={() => handleUpdateTodo(todo.id, todo.title, todo.text)}
                className="border-b w-full"
              />
              <textarea
                value={todo.text || ''}
                onChange={(e) => {
                  const updatedTodos = todos.map((t) =>
                    t.id === todo.id ? { ...t, text: e.target.value } : t
                  );
                  setTodos(updatedTodos);
                }}
                onBlur={() => handleUpdateTodo(todo.id, todo.title, todo.text)}
                className="w-full border mt-2"
              />
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500 text-white p-2 mt-2"
              >
                削除
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

Dashboard.requiresAuth = true;

export default Dashboard;
