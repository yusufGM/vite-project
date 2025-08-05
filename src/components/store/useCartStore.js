import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useUserStore from './useUserStore';

const useCartStore = create(
  persist(
    (set) => ({
      isOpen: false,
      cart: [],

      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      addToCart: (product) =>
        set((state) => {
          const { token } = useUserStore.getState();
          if (!token) {
            alert("Harus login untuk menambahkan ke keranjang.");
            return state;
          }

          const existing = state.cart.find(p => p._id === product._id);
          const updatedCart = existing
            ? state.cart.map(p =>
                p._id === product._id ? { ...p, qty: p.qty + 1 } : p
              )
            : [...state.cart, { ...product, qty: 1 }];

          return { cart: updatedCart };
        }),

      // Update quantity
      updateQty: (index, qty) =>
        set((state) => {
          const newCart = [...state.cart];
          if (qty <= 0) {
            newCart.splice(index, 1);
          } else {
            newCart[index].qty = qty;
          }
          return { cart: newCart };
        }),

      // Remove item by index
      removeItem: (index) =>
        set((state) => {
          const newCart = [...state.cart];
          newCart.splice(index, 1);
          return { cart: newCart };
        }),

      // Optional: remove item by ID
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter(item => item._id !== id),
        })),

      // Clear all
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // ✅ simpan ke localStorage
    }
  )
);

export default useCartStore;
