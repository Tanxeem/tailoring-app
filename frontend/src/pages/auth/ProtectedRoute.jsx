import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router"
import axios from "axios"   

function ProtectedRoute() {
    const [isAuth, setIsAuth] = useState(null)

    const navigate = useNavigate();

    useEffect( ()=> {
        axios.get('http://localhost:3000/api/v1/user/me', {withCredentials: true})
        .then( () => setIsAuth(true))
        .catch( () => setIsAuth(false))
    },[])

    if(isAuth === null) return <div>Loading...</div>;
  return (
    isAuth ? <Outlet /> : navigate('/login')
  )
}

export default ProtectedRoute