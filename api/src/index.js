import loadConfig from './config';
import express from 'express';
import multipart from 'connect-multiparty';
import models from './models/index';
import loadExpressWs from 'express-ws';
import email from './email';
const config = loadConfig();
const app = express();
const multipartMiddleware = multipart();
const expressWs = loadExpressWs(app);

app.ws('/', (ws, req) => {
});
const wss = expressWs.getWss('/');
wss.on('connection', (ws) => {
  models.Measurement.findAll({
    limit: 100,
    order: 'timestamp DESC',
  }).then((measurements) => {
    ws.send(JSON.stringify(measurements));
  });
});

app.post('/', multipartMiddleware, (req, res) => {
  const measurement = {
    timestamp: parseInt(req.body.timestamp),
    coordinates: JSON.parse(req.body.coordinates),
    button: JSON.parse(req.body.button),
    accelerometer: JSON.parse(req.body.accelerometer),
    gyrometer: JSON.parse(req.body.gyrometer),
    pulse: parseInt(req.body.pulse),
    audio: req.files.audio,
  };
  models.Measurement.create(measurement).then((doc) => {
    res.json(doc.dataValues);
    wss.clients.forEach((client) => {
      client.send(JSON.stringify([doc.dataValues]));
    });
    if (measurement.button) email(doc.dataValues);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

models.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(config.port, () => {
    console.log('API started');
  });
});
