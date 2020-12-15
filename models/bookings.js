'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bookings.init({
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    total_person: DataTypes.INTEGER,
    booking_time: DataTypes.DATE,
    noted: DataTypes.STRING,
    check_in_time: DataTypes.DATE,
    check_out_time: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return bookings;
};