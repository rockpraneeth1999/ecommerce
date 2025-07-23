export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-blue-600 font-bold mt-2">${product.price}</p>
        {/* <p className="text-xs text-gray-500">Stock: {product.stock}</p> */}
      </div>
      {onAddToCart && (
        <button
          onClick={() => onAddToCart(product.id)}
          className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
