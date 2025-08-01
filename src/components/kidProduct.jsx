import { useEffect, useState } from 'react';

function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item._id} className="p-4 border shadow">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold">{item.title}</h2>
          <p>{item.description}</p>
          <p className="text-green-600 font-semibold">Rp{item.price.toLocaleString('id-ID')}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
