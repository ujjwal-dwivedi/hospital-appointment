import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import Navbar from './components/Navbar.jsx';

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to='/login' />;
    if (user.role !== allowedRole) return <Navigate to='/login' />;
    return children;
};

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                    path='/admin'
                    element={
                        <ProtectedRoute allowedRole='admin'>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/patient'
                    element={
                        <ProtectedRoute allowedRole='patient'>
                            <PatientDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
