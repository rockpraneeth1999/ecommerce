import { useEffect, useState } from "react";
import { fetchCart, updateCartItem, removeCartItem } from "../api/cart";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      setLoading(true);
      const data = await fetchCart();
      setCart(data?.Products || []);
      setCartId(data.id);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(itemId, quantity, cartId);
    getCart();
  };

  const handleRemove = async (itemId) => {
    await removeCartItem(itemId);
    getCart();
  };

  const handleCheckout = async () => {
    try {
      await API.post("/orders");
      // alert("Order placed successfully!");
      navigate("/products");
    } catch {
      alert("Failed to place order");
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.CartItem.quantity * item.price,
    0
  );

  if (loading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-white p-4 shadow rounded"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ${item.price} × {item.CartItem.quantity}
                </p>
                <p className="font-bold">
                  ${item.price * item.CartItem.quantity}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.CartItem.quantity - 1)
                  }
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.CartItem.quantity + 1)
                  }
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="ml-3 text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="font-bold text-lg">Total: ${totalAmount}</p>
            <button
              onClick={handleCheckout}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
