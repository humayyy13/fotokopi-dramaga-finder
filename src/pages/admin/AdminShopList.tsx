import { Link } from "react-router-dom";
import { useShops } from "@/context/ShopContext";
import { Pencil, Trash2, Plus, Star } from "lucide-react";
import { useState } from "react";

const AdminShopList = () => {
  const { shops, deleteShop } = useShops();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteShop(id);
    setConfirmId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Toko</h1>
        <Link
          to="/admin/shops/create"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" /> Tambah
        </Link>
      </div>

      <div className="bg-card rounded-xl card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left px-4 py-3 font-medium">Nama</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Alamat</th>
                <th className="text-left px-4 py-3 font-medium">Rating</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Jam</th>
                <th className="text-right px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{shop.name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{shop.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {shop.rating}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{shop.hours}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/admin/shops/edit/${shop.id}`}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      {confirmId === shop.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(shop.id)}
                            className="px-2 py-1 text-xs bg-destructive text-destructive-foreground rounded"
                          >
                            Hapus
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2 py-1 text-xs bg-secondary rounded"
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(shop.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminShopList;
