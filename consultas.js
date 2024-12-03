// Consultar todos los modelos

db.models.find().pretty();

// Consultar un modelo por nombre

db.models.findOne({ name: "nombre_modelo" });


//Buscar trabajos confirmados realizados por un modelo
db.bookings.find({
  model_id: ObjectId("63fe3dfb8f8b9f0012345678"),
  status: "confirmed"
}).pretty();
