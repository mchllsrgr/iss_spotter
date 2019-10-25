const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      return callback(Error(msg), null);
    } else {
      let ipString = JSON.parse(body);
      let ip = ipString.ip;
      return callback(null, ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode}: ${body}`;
      return callback(Error(msg), null);
    } else {
      let coords = {};
      coords['latitude'] = JSON.parse(body).data.latitude;
      coords['longitude'] = JSON.parse(body).data.longitude;
      return callback(null, coords);
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  let lat = coords.latitude;
  let long = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode}: ${body}`;
      return callback(Error(msg), null);
    } else {
      let flyoverTimes = JSON.parse(body).response;
      return callback(null, flyoverTimes);
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      console.log('It didn\'t work!', err);
      return;
    }
  
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        console.log('It didn\'t work!', err);
        return;
      }

      fetchISSFlyOverTimes(coords, (err, flyoverTimes) => {
        if (err) {
          console.log('It didn\'t work!', err);
          return;
        }
        
        callback(null, flyoverTimes);

      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
