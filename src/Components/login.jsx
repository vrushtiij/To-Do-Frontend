import { useState } from "react";
import "../Styles/login.css";
import { FaTwitter, FaGoogle, FaFacebookF } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit  = async (e) => {
        e.preventDefault();
        try {
        const res = await api.post("/login", {
            username, password
        }, { withCredentials: true });

        if (res.data.success) {
            toast.success("Login Successful!");
            navigate('/dashboard');
        }
        else {
            toast.error(res.data.message || "Invalid Credentials");
        }
        
    }
        catch(err) {
            console.log(err);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <div className="brand">
            <div className="cloud">☁</div>
            <h2>Task Manager</h2>
          </div>

          <div className="social-icons">
            <FaTwitter />
            <FaGoogle />
            <FaFacebookF />
          </div>

          <p className="register-text">
            Don’t have an account? <Link to='/' className="register-link">Register</Link>
          </p>
        </div>

        <div className="login-right">
          <h2>
            <span>Log In to your account</span> 
          </h2>
          <p className="subtitle">to manage tasks effortlessly.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />

            <button type="submit">LOG IN</button>

            <p className="forgot">Forgot Password?</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
