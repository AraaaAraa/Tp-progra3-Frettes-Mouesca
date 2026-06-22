const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const VentaProducto = sequelize.define('VentaProducto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  venta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'ventas', key: 'id' },
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'productos', key: 'id' },
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: { min: 1 },
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Precio al momento de la compra (snapshot)',
  },
}, {
  tableName: 'ventas_productos',
  timestamps: true,
});

module.exports = VentaProducto;