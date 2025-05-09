import { useEffect, useState } from "react"
import { Outlet} from "react-router"
import axios from "axios"   
import { backendUrl } from "../../App";
import { Navigate } from "react-router-dom";

function ProtectedRoute() {
    const [isAuth, setIsAuth] = useState(null)

    useEffect( ()=> {
        axios.get(`${backendUrl}/api/v1/user/me`, {withCredentials: true})
        .then( () => setIsAuth(true))
        .catch( () => setIsAuth(false))
    },[])

    if(isAuth === null) return <div>Loading...</div>;
  return (
  isAuth ? <Outlet /> : <Navigate to="/login" replace />
)
}

export default ProtectedRoute
