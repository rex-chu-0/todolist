import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Todolist from './todolist';
import Login from './login.js';
import Signup from './signup.js';
import { Auth } from './Auth';
import { useState } from 'react';



function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <>
      <Auth.Provider value={{ token, setToken, user, setUser }}>
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="todolist" element={<Todolist />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Auth.Provider>
    </>
  );
}

export default App;
