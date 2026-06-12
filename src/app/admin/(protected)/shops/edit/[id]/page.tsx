"use client";

import { useParams } from "next/navigation";
import { useShops } from "@/context/ShopContext";
import ShopForm from "@/components/ShopForm";
import { Shop } from "@/data/shops";

export default function AdminShopEdit() {
  const params = useParams();
  const id = params?.id as string;
  const { getShop, updateShop } = useShops();
  
  const shop = getShop(id || "");

  if (!shop) return <p className="text-center py-12 text-muted-foreground">Toko tidak ditemukan.</p>;

  return <ShopForm title="Edit Toko" initial={shop} onSubmit={(s: Shop) => updateShop(s)} />;
}
