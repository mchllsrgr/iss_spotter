const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIP = (body) => {
  let ipString = JSON.parse(body);
  let ip = ipString.ip;
  return request(`https://ipvigilante.com/${ip}`)
}

const fetchISSFlyOverTimes = (body) => {
  let coords = {};
  coords['latitude'] = JSON.parse(body).data.latitude;
  coords['longitude'] = JSON.parse(body).data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
};

module.exports = { nextISSTimesForMyLocation };