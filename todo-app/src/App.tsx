import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import Authenticate from "./Authenticate";
import MainPage from "./MainPage";
import { TodoElement } from "./types";
import { BrowserRouter, Route, Routes } from "react-router";
import Profile from "./Profile";

function App() {
  const [todos, setTodos] = useState<TodoElement[] | undefined>();
  async function fetchTodos(userId?: number) {
    const res = await fetch(`http://localhost:5000/api/${userId}/todos`);
    const data = await res.json();
    setTodos(data);
  }
  const { userId, username, login, logout, register } = useAuth();
  const id = localStorage.getItem("id");
  useEffect(() => {
    if (id || userId) {
      fetchTodos(parseInt(id!));
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {id ? (
          <Route path="/">
            <Route
              index 
              element={
                <MainPage
                  todos={todos}
                  username={username}
                  userId={userId}
                  login={login}
                  logout={logout}
                  register={register}
                />
              }
            />
            <Route path="/profile/:userId" element={<Profile/>}/>
          </Route>
        ) : (
          <Route path="/">
            <Route index element={<Authenticate />} />
            
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
