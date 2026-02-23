import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Shop, dbRowToShop, shopToDbRow } from "@/data/shops";
import { supabase } from "@/integrations/supabase/client";

interface ShopContextType {
  shops: Shop[];
  loading: boolean;
  addShop: (shop: Shop) => Promise<void>;
  updateShop: (shop: Shop) => Promise<void>;
  deleteShop: (id: string) => Promise<void>;
  getShop: (id: string) => Shop | undefined;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShops = async () => {
    const { data, error } = await supabase.from("shops").select("*").order("created_at", { ascending: true });
    if (!error && data) {
      setShops(data.map(dbRowToShop));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const addShop = async (shop: Shop) => {
    const row = shopToDbRow(shop);
    const { id, ...rest } = row;
    const { error } = await supabase.from("shops").insert(rest);
    if (!error) await fetchShops();
  };

  const updateShop = async (shop: Shop) => {
    const row = shopToDbRow(shop);
    const { id, ...rest } = row;
    const { error } = await supabase.from("shops").update(rest).eq("id", shop.id);
    if (!error) await fetchShops();
  };

  const deleteShop = async (id: string) => {
    const { error } = await supabase.from("shops").delete().eq("id", id);
    if (!error) await fetchShops();
  };

  const getShop = (id: string) => shops.find((s) => s.id === id);

  return (
    <ShopContext.Provider value={{ shops, loading, addShop, updateShop, deleteShop, getShop }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShops = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShops must be used within ShopProvider");
  return ctx;
};
