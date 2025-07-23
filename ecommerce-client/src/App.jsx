import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import AddProduct from "./pages/Admin/AddProduct";
import ManageProducts from "./pages/Admin/ManageProducts";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/products" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/products" />}
        />
        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/add-product"
          element={
            user?.role === "admin" ? (
              <AddProduct />
            ) : (
              <Navigate to="/products" />
            )
          }
        />
        <Route
          path="/admin/manage-products"
          element={
            user?.role === "admin" ? (
              <ManageProducts />
            ) : (
              <Navigate to="/products" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
