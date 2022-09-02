import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Todolist from './todolist';
import Login from './login.js';
import Signup from './signup.js';

const items = [{ id: 1, name: "打電話叫媽媽匯款給我", finished: false }, { id: 2, name: "整理電腦資料夾", finished: true }, { id: 3, name: "繳電費水費瓦斯費", finished: true }, { id: 4, name: "約vicky禮拜三泡溫泉", finished: true }, { id: 5, name: "約ada禮拜四吃晚餐", finished: false }];

function Home() {
  return (
    <Link to="login">Login</Link>
  );
}

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="todolist" element={<Todolist items={items} />} />
    </Routes>
  );
}

export default App;
