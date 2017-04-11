import loadConfig from './config';
import randomExt from 'random-ext';
import fs from 'fs';
import request from 'request';
const config = loadConfig();
console.log('Simulator started');

const generateMeasurement = () => {
  const accelerometer = randomExt.integerArray(3, 10000, -10000);
  const gyrometer = randomExt.integerArray(3, 10000, -10000);
  const formData = {
    timestamp: Date.now(),
    coordinates: JSON.stringify({latitude: randomExt.float(-90, 90), longitude: randomExt.float(-180, 180)}),
    button: JSON.stringify(randomExt.boolean()),
    accelerometer: JSON.stringify({x: accelerometer[0], y: accelerometer[1], z: accelerometer[2]}),
    gyrometer: JSON.stringify({x: gyrometer[0], y: gyrometer[1], z: gyrometer[2]}),
    pulse: randomExt.integer(220),
    audio: fs.createReadStream(__dirname + '/audio.mp3'),
  };
  console.log('Generated measurement: %j', formData);
  request.post({url: config.apiUrl, formData: formData}, (err, response, body) => {
    if (err) return console.error('Sending failed: %j', err);
    console.log('Sent to %s successfuly', config.apiUrl);
  });
};

setInterval(generateMeasurement, config.interval);
