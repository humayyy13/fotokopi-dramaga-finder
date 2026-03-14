export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  hours: string;
  openTime: string;
  closeTime: string;
  services: {
    printWarna: boolean;
    jilid: boolean;
    laminating: boolean;
    fotokopi: boolean;
  };
  image: string;
  description: string;
  whatsapp?: string;
}

// Helper to convert DB row to Shop
export function dbRowToShop(row: any): Shop {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    lat: row.lat,
    lng: row.lng,
    rating: row.rating,
    hours: row.hours,
    openTime: row.open_time,
    closeTime: row.close_time,
    services: {
      printWarna: row.print_warna,
      jilid: row.jilid,
      laminating: row.laminating,
      fotokopi: row.fotokopi,
    },
    image: row.image,
    description: row.description,
    whatsapp: row.whatsapp || "",
  };
}

// Helper to convert Shop to DB row for insert/update
export function shopToDbRow(shop: Shop) {
  return {
    id: shop.id,
    name: shop.name,
    address: shop.address,
    lat: shop.lat,
    lng: shop.lng,
    rating: shop.rating,
    hours: shop.hours,
    open_time: shop.openTime,
    close_time: shop.closeTime,
    print_warna: shop.services.printWarna,
    jilid: shop.services.jilid,
    laminating: shop.services.laminating,
    fotokopi: shop.services.fotokopi,
    image: shop.image,
    description: shop.description,
    whatsapp: shop.whatsapp || null,
  };
}
