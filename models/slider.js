'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Slider extends Model {}

  Slider.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        details: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN,
          defaultValue: true
        }
      },
      {
        sequelize,
        modelName: 'Slider',
        tableName: 'Sliders' // ensures table matches
      }
  );

  return Slider;
};
