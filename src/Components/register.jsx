import { useState } from "react"
import "../Styles/register.css"
import { FaTwitter, FaGoogle, FaFacebookF } from "react-icons/fa"
import api from "../api/axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, Link } from "react-router-dom"
const Register = () => {
    const [user, setUser] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const res = await api.post("/register", {
            user, name, pass
            });
            if (res.data.success) {
                toast.success(res.data.message || "Registration successful");
                navigate('/login');
            } else {
                toast.error(res.data.message || "Registration failed");
            }
            console.log(res.data);
            
        }
        catch(err) {
            toast.error(
                err.response?.data?.message || "Something went wrong. Try again."
    );
        }
    }
  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-left">
          <div className="brand">
            <div className="cloud">☁</div>
            <h2>Task Manager</h2>
          </div>

          <div className="social-icons">
            <FaTwitter />
            <FaGoogle />
            <FaFacebookF />
          </div>

          <p className="login-text">
            Already have an account? <Link to="/" className="login-link">Login</Link>
          </p>
        </div>

        <div className="register-right">
          <h2>
            <span>Create an account</span> 
          </h2>
          <p className="subtitle">Plan. Focus. Complete</p>

          <form onSubmit={handleSubmit}>
            <input
              type="name"
              placeholder="Full Name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={user}
              onChange={(e)=> setUser(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={pass}
              onChange={(e)=> setPass(e.target.value)}
            />

            <button type="submit">SIGN UP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
