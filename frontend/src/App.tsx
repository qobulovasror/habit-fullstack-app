import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/App.css';

//routes
const Home = lazy(() => import('./Pages/Home/Home'));
const Regis = lazy(() => import('./Pages/Auth/Regis'));
const Login = lazy(()=>import("./Pages/Auth/Login"));

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [token, setToken] = useState(window.localStorage.getItem("uset-auth-token"))
  return (
    <Suspense fallback={<>Loading</>}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={token ?
              <Home
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
              /> :
              <Navigate to="/login" replace />}
          />
          <Route
            path='/login'
            element={!token ? <Login setToken={setToken} setUser={setUser} /> : <Navigate to="/" replace />}
          />
          <Route
            path='/regis'
            element={!token ? <Regis setToken={setToken} setUser={setUser} /> : <Navigate to="/" replace />}
          />

        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
