'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartState, FavoritesState } from '@/lib/types';
import { getProductById } from '@/lib/data/products';
import { getAccessoryById } from '@/lib/data/accessories';

// Cart Store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: CartItem) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.selectedColor === item.selectedColor &&
              i.selectedStorage === item.selectedStorage
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId &&
                i.selectedColor === item.selectedColor &&
                i.selectedStorage === item.selectedStorage
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const product = getProductById(item.productId);
          const accessory = getAccessoryById(item.productId);
          const price = product?.newPrice || accessory?.newPrice || 0;
          return total + price * item.quantity;
        }, 0);
      },

      getOldTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const product = getProductById(item.productId);
          const accessory = getAccessoryById(item.productId);
          const price = product?.oldPrice || accessory?.oldPrice || 0;
          return total + price * item.quantity;
        }, 0);
      },

      getSavings: () => {
        return get().getOldTotalPrice() - get().getTotalPrice();
      },
    }),
    {
      name: 'luxphone-cart',
    }
  )
);

// Favorites Store
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: string) => {
        set((state) => {
          if (state.items.includes(productId)) {
            return state;
          }
          return { items: [...state.items, productId] };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));
      },

      toggleItem: (productId: string) => {
        const isFav = get().isFavorite(productId);
        if (isFav) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },

      isFavorite: (productId: string) => {
        return get().items.includes(productId);
      },
    }),
    {
      name: 'luxphone-favorites',
    }
  )
);

// UI Store for modals, search, etc.
interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isCartOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isCartOpen: false,

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
}));
