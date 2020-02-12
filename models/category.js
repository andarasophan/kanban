'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Task, {
        foreignKey: 'id'
      })
      Category.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('Name is required');
          } else {
            next();
          }
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('User id is required');
          } else {
            next();
          }
        }
      }
    }
  }, { sequelize })
  return Category;
};