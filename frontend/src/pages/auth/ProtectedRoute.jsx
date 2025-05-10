import { useEffect, useState } from "react"
import { Outlet, Navigate } from "react-router"
import axios from "axios"
import { backendUrl } from "../../App";

function ProtectedRoute() {
  const [authState, setAuthState] = useState({
    isAuth: null,
    role: null,
    loading: true
  })

  useEffect(() => {
    axios.get(`${backendUrl}/api/v1/user/me`, {withCredentials: true})
    .then((response) => {
      setAuthState({
        isAuth: true,
        role: response.data.user.role,
        loading: false
      })
    })
    .catch(() => {
      setAuthState({
        isAuth: false,
        role: null,
        loading: false
      })
    })
  }, [])

  if(authState.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return authState.isAuth ? (
    <Outlet context={{ role: authState.role }} />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default ProtectedRoute