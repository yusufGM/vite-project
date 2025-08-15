import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCartStore from "./store/useCartStore";
import useUserStore from "./store/useUserStore";
import { toast } from "sonner"; 

function CartDrawer() {
  const drawerRef = useRef();
  const navigate = useNavigate();
  const { isOpen, cart, closeDrawer, updateQty, removeItem } = useCartStore();
  const { token } = useUserStore();

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target)) {
        closeDrawer();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, closeDrawer]);

  if (!isOpen) return null;

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    closeDrawer();
    navigate("/checkout");
  };

  return (
    <aside
      ref={drawerRef}
      id="drawer"
      className={`transition-transform duration-300 ease-in-out fixed top-0 right-0 h-full w-116 bg-gray-900 shadow-lg flex flex-col z-100 border border-r-12 border-gray-900 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-6 border-b">
        <h2 className="text-xl text-white mb-1">Shopping Cart</h2>
      </div>

      <div className="listCart flex-1 overflow-y-auto p-4 space-y-4">
        {cart.length === 0 ? (
          <p className="text-white text-center">Keranjang kosong.</p>
        ) : (
          cart.map((item, idx) => (
            <div
              key={idx}
              className="item grid grid-cols-[50px_130px_100px_1fr_30px] gap-1 text-center items-center p-2"
            >
              <img src={item.imgSrc} alt={item.name} className="w-full h-auto" />
              <div className="name text-white">{item.name}</div>
              <div className="text-white">Rp {item.price.toLocaleString("id-ID")}</div>
              <input
                type="number"
                min="0"
                value={item.qty}
                onChange={(e) => updateQty(idx, parseInt(e.target.value))}
                className="quality w-12 rounded-2xl text-center bg-white h-10"
              />
              <button
                onClick={() => removeItem(idx)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="total border-t border-gray-200 p-3 text-white text-center">
        Total: Rp <span id="totalPrice">{total.toLocaleString("id-ID")}</span>
      </div>

      <form onSubmit={handleCheckout} className="p-4">
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Checkout
          </button>
          <button
            type="button"
            onClick={closeDrawer}
            className="bg-white px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </form>
    </aside>
  );
}

export default CartDrawer;
