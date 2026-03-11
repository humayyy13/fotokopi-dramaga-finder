import { useState, useEffect, useCallback } from "react";

interface GeolocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({
        ...s,
        error: "Geolocation tidak didukung oleh browser Anda",
        loading: false,
      }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          loading: false,
          error: null,
        });
      },
      (err) => {
        let message = "Gagal mendapatkan lokasi";
        if (err.code === err.PERMISSION_DENIED) {
          message = "Akses lokasi ditolak. Silakan izinkan akses lokasi di browser.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          message = "Informasi lokasi tidak tersedia";
        } else if (err.code === err.TIMEOUT) {
          message = "Permintaan lokasi timeout";
        }
        setState((s) => ({ ...s, error: message, loading: false }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return { ...state, requestLocation };
}
