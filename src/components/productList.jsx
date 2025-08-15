import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from './store/useCartStore';
import useUserStore from './store/useUserStore';

const ProductList = () => {
  const { addToCart, openDrawer } = useCartStore();
 
  const [items, setItems] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (item) => {
    addToCart({
      _id: item._id,
      name: item.title,
      price: item.price,
      imgSrc: item.image,
    });
    openDrawer();
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {items.map(item => (
      <div key={item._id} className="p-6 border rounded-lg shadow-md flex flex-col">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
        <p className="text-gray-700 flex-grow">{item.description}</p>
        <p className="text-green-600 font-bold mt-4">
          Rp{item.price.toLocaleString('id-ID')}
        </p>

    
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-gray-900 text-white mt-6 py-3 rounded-xl w-full hover:bg-gray-800 transition"
          >
            Add To Cart
          </button>
        
      </div>
    ))}
  </div>

  );
};

export default ProductList;
