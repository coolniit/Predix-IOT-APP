import loadConfig from './config';
import request from 'request';
const config = loadConfig();

const getToken = () => {
  return new Promise((resolve, reject) => {
    request.post({
      url: config.issuerId,
      form: {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        grant_type: 'client_credentials',
        response_type: 'token'
      },
      json: true
    }, (err, response, body) => {
      if (err) throw err;
      if (response.statusCode !== 200) throw body;
      resolve(body.access_token);
    });
  });
};

const sendEmail = (measurement, access_token) => {
  return new Promise((resolve, reject) => {
    const url = `${config.catalogUri}/v1/tenants/${config.tenantUuid}/email?configuration=${config.notificationConfigurationId}`;
    console.log(typeof measurement);
    console.log(measurement);
    request.post({
      url: url,
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Predix-Zone-Id': config.predixZoneId
      },
      body: {
        body: `Measurements:\n\n${JSON.stringify(measurement, null, 2)}`,
        subject: 'SOS Button pressed',
        fromEmail: config.fromEmail,
        fromName: config.fromName,
        important: true,
        recipients: [
          {
            email: config.recipientEmail,
            recipientName: config.recipientName,
            type: 'to'
          }
        ],
        attachments: null
      },
      json: true
    }, (err, response, body) => {
      if (err) throw err;
      if (response.statusCode !== 200) throw body;
      resolve(body);
    });
  });
};

export default (measurement) => {
  getToken().then((access_token) => {
    sendEmail(measurement, access_token).then((body) => {
      console.log('Successfully sent email: %j', body);
    }).catch((err) => {
      console.error('Failed to send email: %j', err);
    });
  }).catch((err) => {
    console.error('Failed to get token %j', err);
  });
};
