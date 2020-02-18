/*const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});*/
/*var yourLong;
var yourLat;
console.log('Start');
readline.question('Enter your longitude: ',yourLong => {
  console.log(`Your longitude is: ${yourLong}`);
  readline.close();
});
readline.question('Enter your latitude: ', yourLat => {
  console.log(`Your longitude is: ${yourLat}`)
  readline.close();
});*/
var spacetrack = require('spacetrack');
var util = require('util');
var tle;
 
spacetrack.login({
  username: 'd.jdeluz@hotmail.com',
  password: 'thisisforumsats'
});
 
spacetrack.get({
  type: 'tle_latest',
  query: [
    {field:'NORAD_CAT_ID', condition: '25544'},
    {field:'ORDINAL', condition: '1'},
  ],
  predicates: [
    'TLE_LINE0', 
    'TLE_LINE1', 
    'TLE_LINE2'
  ]
})
.then(function(result) {
  console.log( util.inspect(result, {colors: true, depth: null}) );
  tle = result;
  processTLE(tle);
  console.log(tle);
  
}, function(err) {
  console.error('error', err.stack);
});
function processTLE(tle){

}
function computePasses(groundStationPosition,
  startDate = dayjs().toDate(),
  endDate = dayjs(startDate).add(7, "day").toDate(),
  minElevation = 1,
  maxPasses = 50) {
  const groundStation = { ...groundStationPosition };
  const deg2rad = (Math.PI / 180);
  groundStation.latitude *= deg2rad;
  groundStation.longitude *= deg2rad;
  groundStation.height /= 1000;

  const date = startDate;
  const passes = [];
  let pass = false;
  let ongoingPass = false;
  let lastElevation = 0;
  while (date < endDate) {
    const positionEcf = this.positionECF(date);
    const lookAngles = satellitejs.ecfToLookAngles(groundStation, positionEcf);
    const elevation = lookAngles.elevation / deg2rad;

    if (elevation > 0) {
      if (!ongoingPass) {
        // Start of new pass
        pass = {
          name: this.name,
          start: date.getTime(),
          azimuthStart: lookAngles.azimuth,
          maxElevation: elevation,
          azimuthApex: lookAngles.azimuth,
        };
        ongoingPass = true;
      } else if (elevation > pass.maxElevation) {
        // Ongoing pass
        pass.maxElevation = elevation;
        pass.apex = date.getTime();
        pass.azimuthApex = lookAngles.azimuth;
      }
      date.setSeconds(date.getSeconds() + 5);
    } else if (ongoingPass) {
      // End of pass
      if (pass.maxElevation > minElevation) {
        pass.end = date.getTime();
        pass.duration = pass.end - pass.start;
        pass.azimuthEnd = lookAngles.azimuth;
        pass.azimuthStart /= deg2rad;
        pass.azimuthApex /= deg2rad;
        pass.azimuthEnd /= deg2rad;
        passes.push(pass);
        if (passes.length > maxPasses) {
          break;
        }
      }
      ongoingPass = false;
      lastElevation = -180;
      date.setMinutes(date.getMinutes() + this.orbitalPeriod * 0.75);
    } else {
      const deltaElevation = elevation - lastElevation;
      lastElevation = elevation;
      if (deltaElevation < 0) {
        date.setMinutes(date.getMinutes() + this.orbitalPeriod * 0.75);
        lastElevation = -180;
      } else if (elevation < -20) {
        date.setMinutes(date.getMinutes() + 5);
      } else if (elevation < -5) {
        date.setMinutes(date.getMinutes() + 1);
      } else if (elevation < -1) {
        date.setSeconds(date.getSeconds() + 5);
      } else {
        date.setSeconds(date.getSeconds() + 2);
      }
    }
  }
  return passes;
}