export default (sequelize, DataTypes) => {
  return sequelize.define('Measurement', {
    timestamp: DataTypes.BIGINT,
    coordinates: DataTypes.JSON,
    button: DataTypes.BOOLEAN,
    accelerometer: DataTypes.JSON,
    gyrometer: DataTypes.JSON,
    pulse: DataTypes.INTEGER,
    audio: DataTypes.BLOB,
  });
};
