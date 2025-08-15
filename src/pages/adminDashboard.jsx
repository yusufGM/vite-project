import { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/items');
    const data = await res.json();
    setProducts(data);
  };

  const fetchOrders = async () => {
    const res = await fetch('http://localhost:5000/orders');
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin hapus produk ini?')) {
      await fetch(`http://localhost:5000/items/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/items/${editProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProduct),
    });
    setEditProduct(null);
    fetchProducts();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Semua Produk</h2>
      <table className="w-full mb-8 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Nama</th>
            <th className="p-2">Harga</th>
            <th className="p-2">Kategori</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2">Rp {item.price}</td>
              <td className="p-2">{item.category}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => setEditProduct(item)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editProduct && (
        <div className="mb-8 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Edit Produk</h3>
          <input
            type="text"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            className="block w-full mb-2 p-2 border"
          />
          <input
            type="number"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
            className="block w-full mb-2 p-2 border"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Simpan
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Riwayat Pesanan</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User ID</th>
            <th className="p-2">Item</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{order.userId}</td>
              <td className="p-2">
                {order.items.map((item, i) => (
                  <div key={i}>{item.name} - Rp {item.price}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
