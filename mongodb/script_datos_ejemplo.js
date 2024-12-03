// Crear categorías de modelaje
db.categories.insertMany([
  { name: "Alta Costura", description: "Modelaje para diseñadores de alta gama", created_at: new Date(), updated_at: new Date() },
  { name: "Comercial", description: "Modelaje para anuncios y campañas comerciales", created_at: new Date(), updated_at: new Date() },
  { name: "Pasarela", description: "Desfiles de moda en eventos", created_at: new Date(), updated_at: new Date() },
  { name: "Fotografía Artística", description: "Modelaje para proyectos fotográficos artísticos", created_at: new Date(), updated_at: new Date() }
]);

// Obtener las categorías creadas
const categories = db.categories.find().toArray();

// Crear clientes ficticios
for (let i = 0; i < 10; i++) {
  db.clients.insertOne({
    name: `Cliente ${i + 1}`,
    company: `Empresa ${i + 1}`,
    email: `cliente${i + 1}@example.com`,
    phone: `+1234567890${i}`,
    created_at: new Date(),
    updated_at: new Date()
  });
}

// Obtener los IDs de los clientes
const clients = db.clients.find().toArray();

// Crear modelos ficticios
for (let i = 0; i < 100; i++) {
  const randomCategories = categories
    .sort(() => 0.5 - Math.random()) // Mezclar categorías
    .slice(0, Math.floor(Math.random() * 3) + 1) // Seleccionar 1-3 categorías
    .map((cat) => cat._id);

  const modelId = db.models.insertOne({
    name: `Modelo ${i + 1}`,
    age: Math.floor(Math.random() * 18) + 18, // Edad entre 18 y 35
    gender: ["Male", "Female", "Non-Binary"][Math.floor(Math.random() * 3)],
    height: Math.floor(Math.random() * 51) + 150, // Altura entre 150 y 200 cm
    measurements: {
      bust: Math.floor(Math.random() * 46) + 75, // 75-120
      waist: Math.floor(Math.random() * 41) + 50, // 50-90
      hips: Math.floor(Math.random() * 46) + 75 // 75-120
    },
    contact_info: {
      email: `modelo${i + 1}@example.com`,
      phone: `+123456789${i}`,
      social_media: {
        instagram: `https://instagram.com/modelo${i + 1}`,
        twitter: `https://twitter.com/modelo${i + 1}`
      }
    },
    portfolio: [],
    categories: randomCategories,
    experience_years: Math.floor(Math.random() * 11), // Años de experiencia entre 0-10
    availability: Math.random() > 0.5, // Disponible o no
    created_at: new Date(),
    updated_at: new Date()
  }).insertedId;

  // Crear ítems de portafolio para el modelo
  for (let j = 0; j < Math.floor(Math.random() * 5) + 1; j++) {
    db.portfolio_items.insertOne({
      model_id: modelId,
      type: ["photo", "video"][Math.floor(Math.random() * 2)],
      url: `https://example.com/portfolio/model${i + 1}/item${j + 1}`,
      description: `Descripción del ítem ${j + 1} para el modelo ${i + 1}`,
      tags: [`tag${j + 1}`, `model${i + 1}`],
      created_at: new Date(),
      updated_at: new Date()
    });
  }

  // Crear reservas/trabajos para el modelo
  for (let k = 0; k < Math.floor(Math.random() * 3); k++) {
    const randomClient = clients[Math.floor(Math.random() * clients.length)];
    db.bookings.insertOne({
      model_id: modelId,
      client_id: randomClient._id,
      date: new Date(new Date().setDate(new Date().getDate() - Math.floor(Math.random() * 365))),
      location: `Ciudad ${Math.floor(Math.random() * 100)}`,
      details: `Detalles del trabajo ${k + 1} para el modelo ${i + 1}`,
      status: ["confirmed", "completed", "cancelled"][Math.floor(Math.random() * 3)],
      payment: {
        amount: Math.floor(Math.random() * 5000) + 100, // Entre 100 y 5000 USD
        currency: "USD",
        paid: Math.random() > 0.5 // Pagado o no
      },
      created_at: new Date(),
      updated_at: new Date()
    });
  }
}

print("¡Datos ficticios insertados correctamente!");
