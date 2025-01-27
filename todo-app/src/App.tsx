
import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import Authenticate from './Authenticate';
import MainPage from './MainPage';
import { TodoElement } from './types';


function App() {
  const [todos, setTodos] = useState<TodoElement[] | undefined>();
  async function fetchTodos(userId?: number) {

      const res = await fetch(`http://localhost:5000/api/${userId}/todos`)
      const data = await res.json();
      setTodos(data);

    }
  const {userId, username, login, logout} = useAuth();
  const id = localStorage.getItem('id');
  useEffect(() => {
    if (id || userId) {

      fetchTodos(parseInt(id!));
    }
  }, [])
  return (
    id === null ? <Authenticate /> : <MainPage todos={todos} username={username} userId={userId} login={login} logout={logout} />
    
  )
}

export default App
