export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'measurements',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        attr1: Sequelize.STRING,
        timestamp: Sequelize.BIGINT,
        coordinates: Sequelize.JSON,
        button: Sequelize.BOOLEAN,
        accelerometer: Sequelize.JSON,
        gyrometer: Sequelize.JSON,
        pulse: Sequelize.INTEGER,
        audio: Sequelize.BLOB,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('measurements');
  }
};
