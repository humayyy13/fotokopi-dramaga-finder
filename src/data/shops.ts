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
}

export const initialShops: Shop[] = [
  {
    id: "1",
    name: "Fotokopi Berkah Jaya",
    address: "Jl. Raya Dramaga No. 12, Bogor",
    lat: -6.5518,
    lng: 106.7230,
    rating: 4.5,
    hours: "08:00 - 21:00",
    openTime: "08:00",
    closeTime: "21:00",
    services: { printWarna: true, jilid: true, laminating: true, fotokopi: true },
    image: "",
    description: "Fotokopi terlengkap di Dramaga dengan pelayanan cepat dan harga terjangkau."
  },
  {
    id: "2",
    name: "Fotokopi Maju Bersama",
    address: "Jl. Babakan Raya No. 5, Dramaga",
    lat: -6.5540,
    lng: 106.7250,
    rating: 4.2,
    hours: "07:30 - 20:00",
    openTime: "07:30",
    closeTime: "20:00",
    services: { printWarna: true, jilid: false, laminating: true, fotokopi: true },
    image: "",
    description: "Melayani mahasiswa dan umum dengan harga bersahabat."
  },
  {
    id: "3",
    name: "Digital Print Dramaga",
    address: "Jl. Dramaga Raya No. 45, Bogor",
    lat: -6.5495,
    lng: 106.7200,
    rating: 4.8,
    hours: "08:00 - 22:00",
    openTime: "08:00",
    closeTime: "22:00",
    services: { printWarna: true, jilid: true, laminating: false, fotokopi: true },
    image: "",
    description: "Spesialis cetak digital dan fotokopi berkualitas tinggi."
  },
  {
    id: "4",
    name: "Fotokopi Cepat Murah",
    address: "Jl. Raya IPB No. 8, Dramaga",
    lat: -6.5560,
    lng: 106.7180,
    rating: 3.9,
    hours: "09:00 - 19:00",
    openTime: "09:00",
    closeTime: "19:00",
    services: { printWarna: false, jilid: true, laminating: true, fotokopi: true },
    image: "",
    description: "Harga murah, pelayanan cepat untuk kebutuhan fotokopi sehari-hari."
  },
  {
    id: "5",
    name: "Toko Fotokopi Mandiri",
    address: "Jl. Raya Dramaga No. 78, Bogor",
    lat: -6.5480,
    lng: 106.7270,
    rating: 4.6,
    hours: "07:00 - 21:30",
    openTime: "07:00",
    closeTime: "21:30",
    services: { printWarna: true, jilid: true, laminating: true, fotokopi: true },
    image: "",
    description: "Layanan lengkap dengan kualitas terbaik di kawasan Dramaga."
  },
];
