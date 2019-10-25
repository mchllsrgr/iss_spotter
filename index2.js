const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  passTimes.forEach((time) => {
    let duration = time.duration;
    let date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('It didn\'t work:', error.message);
  })