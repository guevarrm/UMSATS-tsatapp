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
