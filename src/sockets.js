let latestCoords = null;

const predefinedLocations = [
  { id: 1, lat: 40.712776, lng: -74.005974 }, // Example: New York
  { id: 2, lat: 34.052235, lng: -118.243683 }, // Example: Los Angeles
  { id: 3, lat: -23.55052, lng: -46.633309 }, // Example: São Paulo
  // Add more predefined locations here
];

module.exports = io => {
  io.on('connection', socket => {
    console.log('new socket connected');

    socket.on('userCoordinates', (coords) => {
      console.log(coords);
      latestCoords = coords;
      const nearestLocation = findNearestLocation(coords, predefinedLocations);
      io.emit('newUserCoordinates', coords); 
      io.emit('nearestLocation', nearestLocation);
      // Emit to all connected sockets
    });
  });
};

module.exports.getLatestCoords = () => latestCoords;

const findNearestLocation = (userLocation, locations) => {
  let nearestLocation = null;
  let minDistance = Infinity;

  locations.forEach((location) => {
    const distance = getDistance(userLocation, location);
    if (distance < minDistance) {
      minDistance = distance;
      nearestLocation = location;
    }
  });

  return nearestLocation;
};

const getDistance = (loc1, loc2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
  const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(loc1.lat * (Math.PI / 180)) * Math.cos(loc2.lat * (Math.PI / 180)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
