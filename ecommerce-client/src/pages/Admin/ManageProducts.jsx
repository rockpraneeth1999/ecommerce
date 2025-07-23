import { useEffect, useState } from "react";
import {
  fetchProducts,
  updateProduct,
  deleteProduct,
} from "../../api/products";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  const getProducts = async () => {
    const res = await fetchProducts("", 1, 50); // load all products for admin
    // console.log("Fetched products:", res);

    setProducts(res.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleEdit = (product) => {
    setEditing(product.id);
    setForm({ name: product.name, price: product.price, stock: product.stock });
  };

  const handleUpdate = async (id) => {
    await updateProduct(id, form);
    setEditing(null);
    getProducts();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
      getProducts();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex justify-between items-center bg-white p-4 shadow rounded mb-3"
        >
          {editing === product.id ? (
            <div className="flex-1">
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-1 mr-2"
              />
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="border p-1 mr-2 w-20"
              />
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="border p-1 mr-2 w-20"
              />
              <button
                onClick={() => handleUpdate(product.id)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex-1">
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-600">
                ${product.price}
                {/* ${product.price} | Stock: {product.stock} */}
              </p>
            </div>
          )}
          <div className="space-x-2">
            {editing === product.id ? (
              <button
                onClick={() => setEditing(null)}
                className="text-gray-600"
              >
                Cancel
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(product)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
