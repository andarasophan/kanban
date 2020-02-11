'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Task.belongsTo(models.Category, {
        foreignKey: 'category_id'
      });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
  }, { sequelize })
  return Task;
};