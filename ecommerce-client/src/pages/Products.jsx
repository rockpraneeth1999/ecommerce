import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useAuth();

  const getProducts = async () => {
    const res = await fetchProducts(search, page, 6);
    // console.log("Fetched products:", res);

    setProducts(res.products);
    setTotalPages(Math.ceil(res.total / 6));
  };

  useEffect(() => {
    getProducts();
  }, [page, search]);

  const handleAddToCart = async (productId) => {
    try {
      await API.post("/cart", { productId, quantity: 1 });
      // alert("Added to cart!");
    } catch {
      alert("Error adding to cart.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded p-2 w-1/3"
        />
        <div className="space-x-3">
          {user && <span className="font-semibold">Hi, {user.email}</span>}
          <a
            href="/cart"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Cart
          </a>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
