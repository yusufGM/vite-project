import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCartStore from "../components/store/useCartStore";
import toast, { Toaster } from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [otherProducts, setOtherProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`http://localhost:5000/items/${id}`).then((res) => res.json()),
      fetch("http://localhost:5000/items").then((res) => res.json()),
    ])
      .then(([productData, itemsData]) => {
        setProduct(productData);
        setOtherProducts(itemsData.filter((item) => item._id !== id));
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <p className="text-center py-10 text-xl font-semibold">
        Loading halaman, mohon tunggu...
      </p>
    );
  }

  if (!product) {
    return <p className="text-center py-10">Produk tidak ditemukan</p>;
  }

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imgSrc: product.imgSrc,
    });
    toast.success("Produk ditambahkan ke keranjang!");
  };

  return (
    <div className="max-w-7xl mx-auto pt-28">
      <Toaster position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img
            src={product.imgSrc}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>
          <p className="mt-6 text-2xl font-semibold">Rp{product.price.toLocaleString("id-ID")}</p>
          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Produk Lainnya</h2>
          <div className="space-y-4">
            {otherProducts.slice(0, 5).map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="flex items-center space-x-4 border rounded-lg p-3 hover:shadow-lg transition"
              >
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Rp{item.price.toLocaleString("id-ID")}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              to="/StorePage"
              className="block text-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;