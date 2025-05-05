import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import Services from "./pages/public/Services";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import DashboardLayout from "./pages/admin/DashboardLayout"; // New layout component
import AllUsers from "./pages/admin/AllUsers";
import CreateMeasurement from "./pages/admin/CreateMeasurement";
import CreateUsers from "./pages/admin/CreateUsers";
import Dashboard from "./pages/admin/Dashboard";

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

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-user" element={<CreateUsers />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="create-measurement" element={<CreateMeasurement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;