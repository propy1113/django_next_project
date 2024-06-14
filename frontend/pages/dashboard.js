import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userResponse = await axios.get('http://0.0.0.0:8000/api/user/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setUsername(userResponse.data.username);

        const todosResponse = await axios.get('http://0.0.0.0:8000/api/todos/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setTodos(todosResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert('セッションの有効期限が切れました。再度ログインしてください。');
          localStorage.removeItem('token');
          router.push('/');
        } else {
          console.error('データ取得に失敗しました:', error);
        }
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

  const handleAddTodo = async () => {
    if (!newTodoTitle) return;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://0.0.0.0:8000/api/todos/',
        { title: newTodoTitle, text: '' },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodoTitle('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('セッションの有効期限が切れました。再度ログインしてください。');
        localStorage.removeItem('token');
        router.push('/');
      } else {
        console.error('Todoの追加に失敗しました:', error);
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://0.0.0.0:8000/api/todos/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('セッションの有効期限が切れました。再度ログインしてください。');
        localStorage.removeItem('token');
        router.push('/');
      } else {
        console.error('Todoの削除に失敗しました:', error);
      }
    }
  };

  const handleUpdateTodo = async (id, title, text) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://0.0.0.0:8000/api/todos/${id}/`,
        { title, text },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('セッションの有効期限が切れました。再度ログインしてください。');
        localStorage.removeItem('token');
        router.push('/');
      } else {
        console.error('Todoの更新に失敗しました:', error);
      }
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
