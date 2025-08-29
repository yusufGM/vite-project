import { useState, useEffect } from "react";
import useCartStore from "../components/store/useCartStore";
import useUserStore from "../components/store/useUserStore";

const CheckoutPage = () => {
  const { cart, clearCart } = useCartStore();
  const { token, username: storeUsername, email: storeEmail } = useUserStore();

  const [username, setUsername] = useState(storeUsername || "");
  const [email, setEmail] = useState(storeEmail || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0);

  useEffect(() => {
    if (storeUsername) setUsername(storeUsername);
    if (storeEmail) setEmail(storeEmail);
  }, [storeUsername, storeEmail]);

  const handlePayment = async () => {
    if (!username || !email || !phone || !address) {
      alert("Lengkapi semua data: nama, email, WhatsApp, dan alamat");
      return;
    }

    if (!cart.length) {
      alert("Cart kosong, silakan tambahkan produk terlebih dahulu.");
      return;
    }

    if (!token) {
      alert("Silakan login dulu sebelum checkout");
      return;
    }

    const body = { items: cart, address, email, whatsapp: phone, username };
    console.log("Checkout body:", body);
    console.log("Token saat checkout:", token);

    try {
      const res = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout gagal:", data);
        alert(data.error || "Checkout gagal. Cek console untuk detail.");
        return;
      }

      if (data.paymentUrl) {
        clearCart();
        window.location.href = data.paymentUrl;
      } else {
        alert("Checkout sukses tapi URL pembayaran tidak ditemukan.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Terjadi kesalahan saat checkout. Cek console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {!storeUsername && (
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nama</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Masukkan nama Anda"
          />
        </div>
      )}

      {!storeEmail && (
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="contoh@email.com"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nomor WhatsApp</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="08xxxxxxx"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Alamat Pengiriman</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="border-t pt-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Ringkasan Pesanan</h2>
        <ul className="space-y-2">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>
                {item.name} x {item.qty}
              </span>
              <span>Rp{(item.price * item.qty).toLocaleString("id-ID")}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 font-bold text-lg text-right">
          Total: Rp{total.toLocaleString("id-ID")}
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
