// Calcular el número total de modelos por género

db.models.aggregate([
  { $group: { _id: "$gender", total: { $sum: 1 } } }
]);

// Total de ingresos generados por trabajos realizados

db.bookings.aggregate([
  { $match: { status: "completed" } }, // Filtrar trabajos completados
  { $group: { _id: null, totalIncome: { $sum: "$payment.amount" } } }
]);

// Número de trabajos realizados por cada modelo

db.bookings.aggregate([
  { $group: { _id: "$model_id", totalJobs: { $sum: 1 } } },
  { $sort: { totalJobs: -1 } }
]);

// Categorías más frecuentes entre los modelos

db.models.aggregate([
  { $unwind: "$categories" }, // Separar las categorías en documentos individuales
  { $group: { _id: "$categories", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);
