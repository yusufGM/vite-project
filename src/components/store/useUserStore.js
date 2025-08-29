import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      token: null,
      username: null,
      userId: null,
      role: null,
      setUser: ({ token, username, userId, role }) =>
        set({ token, username, userId, role }),
      clearUser: () =>
        set({ token: null, username: null, userId: null, role: null }),
    }),
    {
      name: 'user-auth',
    }
  )
);

export default useUserStore;
