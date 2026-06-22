const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  es_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'usuarios',
  timestamps: true,
  hooks: {
    beforeCreate: async (usuario) => {
      usuario.password = await bcrypt.hash(usuario.password, 10);
    },
    beforeUpdate: async (usuario) => {
      if (usuario.changed('password')) {
        usuario.password = await bcrypt.hash(usuario.password, 10);
      }
    },
  },
});

// Método para comparar contraseña al hacer login
Usuario.prototype.verificarPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = Usuario;
