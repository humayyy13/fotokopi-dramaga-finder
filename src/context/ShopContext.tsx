import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Shop, initialShops } from "@/data/shops";

interface ShopContextType {
  shops: Shop[];
  addShop: (shop: Shop) => void;
  updateShop: (shop: Shop) => void;
  deleteShop: (id: string) => void;
  getShop: (id: string) => Shop | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [shops, setShops] = useState<Shop[]>(() => {
    const saved = localStorage.getItem("sig-shops");
    return saved ? JSON.parse(saved) : initialShops;
  });

  useEffect(() => {
    localStorage.setItem("sig-shops", JSON.stringify(shops));
  }, [shops]);

  const addShop = (shop: Shop) => setShops((prev) => [...prev, shop]);
  const updateShop = (shop: Shop) =>
    setShops((prev) => prev.map((s) => (s.id === shop.id ? shop : s)));
  const deleteShop = (id: string) =>
    setShops((prev) => prev.filter((s) => s.id !== id));
  const getShop = (id: string) => shops.find((s) => s.id === id);

  return (
    <ShopContext.Provider value={{ shops, addShop, updateShop, deleteShop, getShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShops = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShops must be used within ShopProvider");
  return ctx;
};
