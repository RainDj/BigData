//Eliminar un modelo por ID

db.models.deleteOne({ _id: ObjectId("63fe3dfb8f8b9f0012345678") });

// Eliminar trabajos de un cliente específico

db.bookings.deleteMany({ client_id: ObjectId("63fe4b8c8f8b9f0012345679") });
