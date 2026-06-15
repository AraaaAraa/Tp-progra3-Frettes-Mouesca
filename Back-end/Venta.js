const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Venta = sequelize.define('Venta', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre ingresado por el cliente en el autoservicio',
  },
  precio_total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'FK opcional, solo si el cliente está registrado',
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'ventas',
  timestamps: true,
});

module.exports = Venta;