db.models.insertOne({
  name: "Modelo Ejemplo",
  age: 25,
  gender: "Female",
  height: 170,
  measurements: {
    bust: 85,
    waist: 60,
    hips: 90
  },
  contact_info: {
    email: "modelo.ejemplo@example.com",
    phone: "+1234567890",
    social_media: {
      instagram: "https://instagram.com/modeloejemplo",
      twitter: "https://twitter.com/modeloejemplo"
    }
  },
  portfolio: [],
  categories: [], // IDs de categorías asociadas
  experience_years: 5,
  availability: true,
  created_at: new Date(),
  updated_at: new Date()
});
