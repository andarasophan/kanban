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
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, { sequelize })
  return Category;
};