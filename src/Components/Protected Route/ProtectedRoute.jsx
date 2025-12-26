import {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from "react-toastify"
import api from '../../api/axios'

const ProtectedRoute = ({children}) => {
    const[loading, setLoading] = useState(true);
    const[isAuth, setisAuth] = useState(false);

    useEffect(() => 
    {
        const checkAuth = async () => {
            try {
                await api.get("/check-auth", {
                    withCredentials: true,
                });
                setisAuth(true);
            }
            catch (err) {
                console.log(err);
                setisAuth(false); 
                toast.info("Please Log In"); 
            }
            finally{
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    if (loading) return <p>Checking authentication...</p>;

    if (!isAuth)
            return <Navigate to="/login" replace />;
    return children;
}

export default ProtectedRoute;
