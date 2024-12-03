// Actualizar la disponibilidad de un modelo

db.models.updateOne(
  { name: "Modelo Ejemplo" },
  { $set: { availability: false, updated_at: new Date() } }
);


