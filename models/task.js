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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isInvalid(value, next) {
          if (value === null || value === '') {
            next('Title is required');
          } else {
            next();
          }
        }
      }
    },
    description: DataTypes.STRING,
    due_date: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    display_order: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: (task, options) => {
        if (!task.display_order) {
          return sequelize.models.Task.findAll({
            where: {
              user_id: task.user_id,
              category_id: task.category_id,
            },
          })
            .then((res) => {
              task.display_order = res.length + 1;
            });
        }
      },
      beforeUpdate: (task, options) => {
        if (task.display_order !== task._previousDataValues.display_order && task.category_id === task._previousDataValues.category_id) {
          console.log('masuk', task);
          const range = task.display_order - task._previousDataValues.display_order;
          const absRange = Math.abs(range);
          let promises = [];
          for (let i = 0; i < absRange; i++) {
            let updateData = {
              display_order: range > 0 ? task._previousDataValues.display_order + i : task._previousDataValues.display_order - i,
            };
            promises.push(sequelize.models.Task.update(updateData, {
              where: {
                display_order: range > 0 ? task._previousDataValues.display_order + i + 1 : task._previousDataValues.display_order - i - 1,
                category_id: task.category_id,
              },
            }));
          }
          return Promise.all(promises);
        }
      },
    },
    sequelize,
  })
  return Task;
};
