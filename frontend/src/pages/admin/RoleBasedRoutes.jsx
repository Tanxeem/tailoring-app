import { Routes, Route, Navigate, useOutletContext } from 'react-router-dom';
import Dashboard from "./Dashboard";
import AllUsers from "./AllUsers";
import CreateMeasurement from "./CreateMeasurement";
import CreateUsers from "./CreateUsers";
import ClientDetails from "./ClientDetails";
import ChangePassword from "../../components/ChangePassword";

function RoleBasedRoutes() {
  const context = useOutletContext();
  const { role } = context || {};

  // Loading state while role is being determined
  if (!role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (role === 'admin') {
    return (
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-user" element={<CreateUsers />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="users/change-password/:id" element={<ChangePassword />} />
        <Route path="create-measurement" element={<CreateMeasurement />} />
        <Route path="client-details" element={<ClientDetails />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    );
  }

  if (role === 'tailor') {
    return (
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-measurement" element={<CreateMeasurement />} />
        <Route path="client-details" element={<ClientDetails />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    );
  }

  return <Navigate to="/login" replace />;
}

export default RoleBasedRoutes;