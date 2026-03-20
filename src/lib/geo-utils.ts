import { Shop } from "@/data/shops";

/**
 * Calculate the distance between two coordinates using the Haversine formula.
 * Returns distance in meters.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000; // Earth's radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Format distance in meters to a human-readable string.
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Sort shops by distance from a given point.
 * Returns a new array with shops sorted nearest-first, each augmented with distance.
 */
export function sortByDistance(
  shops: Shop[],
  userLat: number,
  userLng: number
): (Shop & { distance: number })[] {
  return shops
    .map((shop) => ({
      ...shop,
      distance: haversineDistance(userLat, userLng, shop.lat, shop.lng),
    }))
    .sort((a, b) => a.distance - b.distance);
}


/**
 * Estimate travel time based on distance.
 * Returns formatted strings for walking (~5 km/h) and motorcycle (~30 km/h).
 */
export function estimateTime(meters: number): { walking: string; motorcycle: string } {
  const walkingSpeed = 5; // km/h
  const motorcycleSpeed = 30; // km/h

  const km = meters / 1000;

  const walkMinutes = Math.round((km / walkingSpeed) * 60);
  const motorMinutes = Math.round((km / motorcycleSpeed) * 60);

  const formatMinutes = (mins: number): string => {
    if (mins < 1) return "< 1 menit";
    if (mins < 60) return `${mins} menit`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h} jam ${m} menit` : `${h} jam`;
  };

  return {
    walking: formatMinutes(walkMinutes),
    motorcycle: formatMinutes(motorMinutes),
  };
}

export const getWaLink = (whatsapp: string | undefined | null, shopName: string) => {
  if (!whatsapp) return "";
  let cleanWa = whatsapp.replace(/\D/g, "");
  if (cleanWa.startsWith("0")) {
    cleanWa = "62" + cleanWa.slice(1);
  }

  const hour = new Date().getHours();
  let greeting = "pagi";
  if (hour >= 11 && hour < 15) {
    greeting = "siang";
  } else if (hour >= 15 && hour < 19) {
    greeting = "sore";
  } else if (hour >= 19 || hour < 3) {
    greeting = "malam";
  }

  const wave = String.fromCodePoint(0x1F44B);
  const pin = String.fromCodePoint(0x1F4CD);
  const page = String.fromCodePoint(0x1F4C4);
  const printer = String.fromCodePoint(0x1F5A8, 0xFE0F);
  const smile = String.fromCodePoint(0x1F60A);

  const messageText = `Selamat ${greeting} ${wave}

Saya menemukan toko ${shopName} melalui website SIG Photo Copy Dramaga ${pin}

Saya ingin menanyakan beberapa layanan yang tersedia di toko ini ${page}${printer}

Apakah bisa dibantu informasinya?  
Terima kasih ${smile}`;

  const message = encodeURIComponent(messageText);
  return `https://wa.me/${cleanWa}?text=${message}`;
};

export function isWithinRadius(
  shopLat: number,
  shopLng: number,
  centerLat: number,
  centerLng: number,
  radiusMeters: number
): boolean {
  return haversineDistance(centerLat, centerLng, shopLat, shopLng) <= radiusMeters;
}
