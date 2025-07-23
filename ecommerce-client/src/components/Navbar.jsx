import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/products" className="font-bold text-lg text-blue-600">
          E-Commerce
        </Link>
        {user && (
          <>
            <Link to="/cart" className="hover:text-blue-600">
              Cart
            </Link>
            {user.role === "admin" && (
              <>
                <Link to="/admin/add-product" className="hover:text-blue-600">
                  Add Product
                </Link>
                <Link
                  to="/admin/manage-products"
                  className="hover:text-blue-600"
                >
                  Manage Products
                </Link>
              </>
            )}
          </>
        )}
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Login
            </Link>
            <Link to="/register" className="border px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
