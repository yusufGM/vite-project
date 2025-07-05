// store/useCartStore.js
import { create } from 'zustand';

const useCartStore = create((set) => ({
  isOpen: false,
  cart: [],
  openDrawer: () => set({ isOpen: true }),
  closeDrawer: () => set({ isOpen: false }),
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find(p => p.name === product.name);
      let updatedCart;

      if (existing) {
        updatedCart = state.cart.map(p =>
          p.name === product.name ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        updatedCart = [...state.cart, { ...product, qty: 1 }];
      }

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
}));

export default useCartStore;
