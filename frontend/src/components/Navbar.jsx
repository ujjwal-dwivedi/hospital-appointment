import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
            <h2 className="text-xl font-bold tracking-wide">Hospital App</h2>
            {user && (
                <div className="flex items-center gap-4">
                    <span className="text-sm">
                        Welcome, <span className="font-semibold">{user.name}</span>{' '}
                        <span className="bg-blue-800 px-2 py-0.5 rounded-full text-xs uppercase">
                            {user.role}
                        </span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-4 py-1.5 rounded font-medium text-sm hover:bg-blue-50 transition"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;