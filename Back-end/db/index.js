const Usuario     = require('./Usuario');
const Producto    = require('./Producto');
const Venta       = require('./Venta');
const VentaProducto = require('./VentaProducto');

// Un usuario puede tener muchas ventas
Usuario.hasMany(Venta, { foreignKey: 'usuario_id', as: 'ventas' });
Venta.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Relación muchos a muchos: Venta ↔ Producto (a través de VentaProducto)
Venta.belongsToMany(Producto, {
  through: VentaProducto,
  foreignKey: 'venta_id',
  otherKey: 'producto_id',
  as: 'productos',
});
Producto.belongsToMany(Venta, {
  through: VentaProducto,
  foreignKey: 'producto_id',
  otherKey: 'venta_id',
  as: 'ventas',
});
 
// Asociaciones directas con la tabla intermedia
Venta.hasMany(VentaProducto, { foreignKey: 'venta_id', as: 'items' });
VentaProducto.belongsTo(Venta, { foreignKey: 'venta_id' });
 
Producto.hasMany(VentaProducto, { foreignKey: 'producto_id' });
VentaProducto.belongsTo(Producto, { foreignKey: 'producto_id', as: 'producto' });
 
module.exports = { Usuario, Producto, Venta, VentaProducto };