"use client";

import { useShops } from "@/context/ShopContext";
import ShopForm from "@/components/ShopForm";
import { Shop } from "@/data/shops";

export default function AdminShopCreate() {
  const { addShop } = useShops();
  return <ShopForm title="Tambah Toko Baru" onSubmit={(shop: Shop) => addShop(shop)} />;
}
