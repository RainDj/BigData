from kafka import KafkaProducer
import json
import time
import random

# Configuración del productor Kafka
producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

# Generador de datos
def generate_event():
    return {
        "pokemon_id": random.randint(1, 151),
        "HP": random.randint(50, 100),
        "Attack": random.randint(50, 150),
        "Defense": random.randint(30, 100),
        "Sp_Atk": random.randint(50, 150),
        "Sp_Def": random.randint(30, 100),
        "Speed": random.randint(50, 150)
    }

# Enviar eventos continuamente
while True:
    event = generate_event()
    producer.send("pokemon-events", value=event)
    print(f"Sent: {event}")
    time.sleep(1)  # envía un evento cada segundo
