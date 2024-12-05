import { create } from 'zustand';

interface MenuCard {
  id: number;
  name: string;
  price: string;
  ingredients: string[];
  class: string;
  quantity: number;
  totalPrice: string;
}

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
  cart: MenuCard[];
  addToCart: (item: MenuCard) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: Math.max(state.count - 1, 0) })),
  cart: [],

  addToCart: (item) =>
    set((state) => {
      const cart = [...state.cart];
      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = (parseFloat(existingItem.price) * existingItem.quantity).toString();
      } else {
        cart.push({
          ...item,
          quantity: 1,
          totalPrice: parseFloat(item.price).toString(),
        });
      }
      return { cart };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
  })),
  
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: (parseFloat(item.price) * quantity).toString(),
            }
          : item
      ),
    })),
}));

export default useStore;