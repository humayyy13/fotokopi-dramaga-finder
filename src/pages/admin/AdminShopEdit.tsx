import { useParams } from "react-router-dom";
import { useShops } from "@/context/ShopContext";
import ShopForm from "@/components/ShopForm";
import { Shop } from "@/data/shops";

const AdminShopEdit = () => {
  const { id } = useParams();
  const { getShop, updateShop } = useShops();
  const shop = getShop(id || "");

  if (!shop) return <p className="text-center py-12 text-muted-foreground">Toko tidak ditemukan.</p>;

  return <ShopForm title="Edit Toko" initial={shop} onSubmit={(s: Shop) => updateShop(s)} />;
};

export default AdminShopEdit;
