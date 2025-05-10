import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Services from "./pages/public/Services";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/admin/DashboardLayout";
import ProtectedRoute from "./pages/auth/ProtectedRoute";
import RoleBasedRoutes from "./pages/admin/RoleBasedRoutes";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/services" element={
          <>
            <Navbar />
            <Services />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin/Tailor Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="*" element={<RoleBasedRoutes />} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;