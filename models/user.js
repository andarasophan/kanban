'use strict';
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {
    static associate(models) {
      // associations can be defined here
      User.hasMany(models.Task, {
        foreignKey: 'user_id'
      })
      User.hasMany(models.Category, {
        foreignKey: 'user_id'
      })
    }
  }
  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'First name is required'
        },
        notEmpty: {
          args: true,
          msg: 'First name is required'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Email is required'
        },
        notEmpty: {
          args: true,
          msg: 'Email is required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        isDuplicate(value, next) {
          User.findOne({
            where: {
              email: value
            }
          })
            .then(user => {
              if (user) {
                if (this.email == user.email && this.id === user.id) {
                  next()
                } else {
                  next('Email is already registered')
                }
              } else {
                next()
              }
            })
            .catch(err => {
              next(err)
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [4],
          msg: 'Password minimal 4 characters'
        }
      }
    },
    background: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPass(user.password);
        user.background = 'default';
      },
      afterCreate: async (user, options) => {
        await sequelize.transaction(function (t) {
          let defaultValue = ['Things To Do', 'Doing', 'Done'];
          let promises = [];
          defaultValue.forEach((el, index) => {
            const promise = sequelize.models.Category.create({
              name: el,
              user_id: user.id,
              display_order: index + 1,
            }, {
              transaction: t
            });
            promises.push(promise);
          });
          return Promise.all(promises);
        })
      }
    },
    sequelize
  })
  return User;
};
