import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useLocation } from 'react-router-dom';

let locationGetter; 


export const usePathListener = () => {
  const location = useLocation();
  locationGetter = location.pathname;
};

const useCartStore = create(
  persist(
    (set) => ({
      isOpen: false,
      cart: [],

      openDrawer: () =>
        set((state) => {
          if (locationGetter === '/login') {
            return state; 
          }
          return { isOpen: true };
        }),

      closeDrawer: () => set({ isOpen: false }),

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find(p => p._id === product._id);
          const updatedCart = existing
            ? state.cart.map(p =>
                p._id === product._id ? { ...p, qty: p.qty + 1 } : p
              )
            : [...state.cart, { ...product, qty: 1 }];

          return { cart: updatedCart };
        }),

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

      removeItem: (index) =>
        set((state) => {
          const newCart = [...state.cart];
          newCart.splice(index, 1);
          return { cart: newCart };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter(item => item._id !== id),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;
