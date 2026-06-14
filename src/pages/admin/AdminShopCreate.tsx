import { useShops } from "@/context/ShopContext";
import ShopForm from "@/components/ShopForm";
import { Shop } from "@/data/shops";

const AdminShopCreate = () => {
  const { addShop } = useShops();
  return <ShopForm title="Tambah Toko Baru" onSubmit={(shop: Shop) => addShop(shop)} />;
};

export default AdminShopCreate;
