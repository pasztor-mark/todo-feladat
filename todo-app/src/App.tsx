
import { useAuth } from './AuthContext';
import Authenticate from './Authenticate';
import MainPage from './MainPage';


function App() {
  const {userId, username, login, logout} = useAuth();
  const id = localStorage.getItem('id');
  return (
    id === null ? <Authenticate /> : <MainPage username={username} userId={userId} login={login} logout={logout} />
    
  )
}

export default App
