'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Task, {
        foreignKey: 'category_id'
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
            next('*Name is required');
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
    },
    color: {
      type: DataTypes.STRING,
    },
    display_order: {
      type: DataTypes.INTEGER,
    },
  }, {
    hooks: {
      beforeCreate: (category, options) => {
        category.color = 'white';
        if (!category.display_order) {
          return sequelize.models.Category.findAll({
            where: {
              user_id: category.user_id,
            },
          })
            .then((res) => {
              category.display_order = res.length + 1;
            });
        }
      },
      beforeDestroy: (category, options) => {
        return sequelize.models.Category.findAll({
          where: {
            user_id: category.user_id,
          },
        })
          .then((res) => {
            if (res.length - category.display_order) {
              let promises = [];
              for (let i = 0; i < res.length - category.display_order; i++) {
                let updateData = {
                  display_order: category.display_order + i,
                };
                promises.push(sequelize.models.Category.update(updateData, {
                  where: {
                    display_order: category.display_order + i + 1,
                  }
                }));
              }
              return Promise.all(promises);
            }
          })
      },
      beforeUpdate: (category, options) => {
        if (category.display_order !== category._previousDataValues.display_order) {
          const range = category.display_order - category._previousDataValues.display_order;
          const absRange = Math.abs(range);
          let promises = [];
          for (let i = 0; i < absRange; i++) {
            let updateData = {
              display_order: range > 0 ? category._previousDataValues.display_order + i : category._previousDataValues.display_order - i,
            };
            promises.push(sequelize.models.Category.update(updateData, {
              where: {
                display_order: range > 0 ? category._previousDataValues.display_order + i + 1 : category._previousDataValues.display_order - i - 1,
                user_id: category.user_id,
              },
            }));
          }
          return Promise.all(promises);
        }
      },
    },
    sequelize
  })
  return Category;
};
