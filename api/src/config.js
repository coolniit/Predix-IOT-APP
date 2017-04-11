import dotenv from 'dotenv';

export default () => {
  dotenv.load();

  return {
    port: process.env.PORT,
    databaseUrl: JSON.parse(process.env.VCAP_SERVICES).postgres[0].credentials.uri,
    catalogUri: JSON.parse(process.env.VCAP_SERVICES).notification[0].credentials.catalogUri,
    tenantUuid: JSON.parse(process.env.VCAP_SERVICES).notification[0].credentials.tenantUuid,
    predixZoneId: JSON.parse(process.env.VCAP_SERVICES)['predix-uaa'][0].credentials.zone['http-header-value'],
    issuerId: JSON.parse(process.env.VCAP_SERVICES)['predix-uaa'][0].credentials.issuerId,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    notificationConfigurationId: process.env.NOTIFICATION_CONFIGURATION_ID,
    fromEmail: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME,
    recipientEmail: process.env.RECIPIENT_EMAIL,
    recipientName: process.env.RECIPIENT_NAME,
  };
}
