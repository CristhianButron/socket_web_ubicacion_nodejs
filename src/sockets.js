let latestCoords = null;

module.exports = io => {
  io.on('connection', socket => {
    console.log('new socket connected');

    socket.on('userCoordinates', (coords) => {
      console.log(coords);
      latestCoords = coords;
      socket.broadcast.emit('newUserCoordinates', coords);
    });
  });
};

module.exports.getLatestCoords = () => latestCoords;
