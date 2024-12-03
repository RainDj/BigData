// Buscar modelos disponibles para trabajar

db.models.find({ availability: true }).pretty();

//Buscar modelos en un rango de edad (20 a 30 años)

db.models.find({
  age: { $gte: 20, $lte: 30 }
}).pretty();


//Buscar trabajos con estados específicos (confirmados o completados)

db.bookings.find({
  status: { $in: ["confirmados", "completados"] }
}).pretty();
