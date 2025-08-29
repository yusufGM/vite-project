import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto mt-24 p-6 text-center border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Pembayaran Berhasil!</h1>
      <p>Terima kasih, pesanan Anda telah diterima.</p>
      <p className="mt-2 text-sm text-gray-500">
        Anda akan diarahkan ke halaman utama dalam beberapa detik...
      </p>
    </div>
  );
};

export default SuccessPage;
