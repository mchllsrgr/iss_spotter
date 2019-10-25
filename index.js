const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log('It didn\'t work!', error);
  }
  passTimes.forEach((time) => {
    let duration = time.duration;
    let date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  });
});
