// useBalanceStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface BalanceState {
  balance: number;
  setBalance: (value: number) => void;
  loadBalanceFromStorage: () => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: 0,
  setBalance: (value) => set({ balance: value }),
  loadBalanceFromStorage: async () => {
    const stored = await AsyncStorage.getItem("balance");
    set({ balance: parseInt(stored || "0") });
  },
}));
