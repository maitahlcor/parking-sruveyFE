import { useState, useCallback } from "react";

export default function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCoords = useCallback(() => new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      const err = new Error("Geolocalización no disponible");
      setError(err);
      return reject(err);
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        };
        setCoords(c);
        setError(null);
        setLoading(false);
        resolve(c);
      },
      (e) => {
        setError(e);
        setLoading(false);
        reject(e);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }), []);

  return { coords, error, loading, getCoords };
}
