const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  passTimes.forEach((time) => {
    let duration = time.duration;
    let date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  }
  printPassTimes(passTimes);
});

module.exports = printPassTimes;