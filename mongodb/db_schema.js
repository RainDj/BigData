//Esquema de la base de datos

use modeling_portfolio

//Colecciones (models, portfolio_items, categories, clients y bookings

{
  "_id": "ObjectId",
  "name": "string",
  "age": "number",
  "gender": "string",
  "height": "number",
  "measurements": {
    "bust": "number",
    "waist": "number",
    "hips": "number"
  },
  "contact_info": {
    "email": "string",
    "phone": "string",
    "social_media": {
      "instagram": "string",
      "twitter": "string",
      "facebook": "string"
    }
  },
  "portfolio": ["ObjectId"], 
  "categories": ["ObjectId"], 
  "experience_years": "number",
  "availability": "boolean",
  "created_at": "date",
  "updated_at": "date"
}

{
  "_id": "ObjectId",
  "model_id": "ObjectId", 
  "type": "string", 
  "url": "string", 
  "description": "string",
  "tags": ["string"],
  "created_at": "date",
  "updated_at": "date"
}

{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "created_at": "date",
  "updated_at": "date"
}

{
  "_id": "ObjectId",
  "name": "string",
  "company": "string",
  "email": "string",
  "phone": "string",
  "projects": ["ObjectId"], 
  "created_at": "date",
  "updated_at": "date"
}

{
  "_id": "ObjectId",
  "model_id": "ObjectId",
  "client_id": "ObjectId",
  "date": "date",
  "location": "string",
  "details": "string",
  "status": "string", 
  "payment": {
    "amount": "number",
    "currency": "string",
    "paid": "boolean"
  },
  "created_at": "date",
  "updated_at": "date"
}


