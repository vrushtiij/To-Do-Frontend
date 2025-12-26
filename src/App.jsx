import Login from './Components/login'
import Register from './Components/register'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/dashboard';
import ProtectedRoute from './Components/Protected Route/ProtectedRoute';
function App() {

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path = '/' element={<Register />} />
        <Route path = '/login' element={<Login />} />
        <Route path = '/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
