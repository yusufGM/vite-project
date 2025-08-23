import useCartStore from "./store/useCartStore";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  const { addToCart, openDrawer } = useCartStore();

  const handleAddToCart = (item) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      imgSrc: item.imgSrc,
    });
    openDrawer();
  };

  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col shadow-md rounded-2xl overflow-hidden h-full bg-white"
          >
            <div className="flex flex-col p-4 h-full border rounded-lg shadow hover:shadow-lg transition-shadow">
              <Link to={`/product/${product._id}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden rounded-xl mb-4">
                  {product.imgSrc ? (
                    <img
                      src={product.imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">No Image</span>
                  )}
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {product.description}
                </p>
              </Link>

              <div className="mt-auto flex justify-between items-center">
                {product.isNew && (
                  <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                    Just In
                  </span>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="inline-block bg-black text-white rounded-3xl hover:bg-gray-800 transition px-6 py-2 uppercase font-semibold tracking-wider cursor-pointer text-center ml-auto"
                >
                  Rp{product.price.toLocaleString("id-ID")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
