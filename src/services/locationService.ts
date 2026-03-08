export interface Position {
  latitude: number;
  longitude: number;
}

export class LocationService {
  static async getUserLocation(): Promise<Position | null> {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return null;
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user location:", error);
          resolve(null);
        }
      );
    });
  }

  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  static openByPlaceId(placeId: string) {
    const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
    window.open(url, "_blank");
  }

  static openByName(namaPencarian: string, alamatLengkap: string) {
    const q = encodeURIComponent(`${namaPencarian}, ${alamatLengkap}, Kota Malang`);
    const url = `https://www.google.com/maps/search/?api=1&query=${q}`;
    window.open(url, "_blank");
  }

  static openBestAvailable(branch: any) {
    if (branch.placeId && branch.placeId.length > 0) {
      this.openByPlaceId(branch.placeId);
    } else {
      this.openByName(branch.namaPencarian, branch.alamatLengkap);
    }
  }

  static sortByNearest(branches: any[], pos: Position) {
    return [...branches].sort((a, b) => {
      const dA = this.calculateDistance(pos.latitude, pos.longitude, a.lat, a.lon);
      const dB = this.calculateDistance(pos.latitude, pos.longitude, b.lat, b.lon);
      return dA - dB;
    });
  }
}
