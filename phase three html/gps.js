const restaurant = { lat: -26.1929, lng: 28.0305 };
const gpsButton = document.querySelector('#gps-button');
const gpsStatus = document.querySelector('#gps-status');
const directions = document.querySelector('#directions');
const mapDetail = document.querySelector('#map-detail');

function distanceInKm(lat, lng) {
  const toRadians = degrees => degrees * Math.PI / 180;
  const earthRadius = 6371;
  const dLat = toRadians(restaurant.lat - lat);
  const dLng = toRadians(restaurant.lng - lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat)) * Math.cos(toRadians(restaurant.lat)) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

gpsButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    gpsStatus.textContent = 'Live location is not supported in this browser. Use Get directions instead.';
    return;
  }
  gpsButton.disabled = true;
  gpsButton.textContent = 'Locating you…';
  gpsStatus.textContent = 'Requesting your location permission…';
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const { latitude, longitude, accuracy } = coords;
      const distance = distanceInKm(latitude, longitude);
      gpsStatus.textContent = `You are approximately ${distance.toFixed(1)} km away (GPS accuracy ±${Math.round(accuracy)} m).`;
      mapDetail.textContent = `${distance.toFixed(1)} km from your live location`;
      directions.href = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${restaurant.lat},${restaurant.lng}&travelmode=driving`;
      gpsButton.disabled = false;
      gpsButton.textContent = '✓ Live location active';
    },
    error => {
      const messages = { 1: 'Location permission was declined.', 2: 'Your location could not be found.', 3: 'Location request timed out.' };
      gpsStatus.textContent = `${messages[error.code] || 'Live location is unavailable.'} You can still use Get directions.`;
      gpsButton.disabled = false;
      gpsButton.textContent = '◎ Use my live location';
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
  );
});
