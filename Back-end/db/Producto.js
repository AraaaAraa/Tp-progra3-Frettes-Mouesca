const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 },
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Categoría del producto (ej: "tipo1" o "tipo2")',
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'productos',
  timestamps: true,
});

module.exports = Producto;