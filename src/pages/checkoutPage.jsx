import { useState } from 'react';
import useCartStore from '../components/store/useCartStore';
import useUserStore from '../components/store/useUserStore';

const CheckoutPage = () => {
  const { cart, clearCart } = useCartStore();
  const { token } = useUserStore();
  const [address, setAddress] = useState('');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePayment = async () => {
    if (!address) {
      alert("Alamat tidak boleh kosong");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart,
          address,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Checkout berhasil! Silakan lanjutkan pembayaran.");
        clearCart();
   
      } else {
        alert(data.error || "Checkout gagal.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat checkout.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Alamat Pengiriman</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
      </div>

      <div className="border-t pt-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Ringkasan Pesanan</h2>
        <ul className="space-y-2">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name} x {item.qty}</span>
              <span>Rp{(item.price * item.qty).toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-lg text-right">
          Total: Rp{total.toLocaleString('id-ID')}
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default CheckoutPage;
