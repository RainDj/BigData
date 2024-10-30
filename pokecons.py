from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col, avg
from pyspark.sql.types import StructType, StructField, IntegerType

# Crear la sesión de Spark con soporte para Kafka
spark = SparkSession.builder \
    .appName("PokemonRealTimeProcessing") \
    .getOrCreate()
spark.sparkContext.setLogLevel("WARN")

# Esquema del JSON de entrada
schema = StructType([
    StructField("pokemon_id", IntegerType(), True),
    StructField("HP", IntegerType(), True),
    StructField("Attack", IntegerType(), True),
    StructField("Defense", IntegerType(), True),
    StructField("Sp_Atk", IntegerType(), True),
    StructField("Sp_Def", IntegerType(), True),
    StructField("Speed", IntegerType(), True)
])

# Crear una sesión de Spark
spark = SparkSession.builder \
 .appName("SensorDataAnalysis") \
 .getOrCreate()

# Leer datos del topic de Kafka
df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "pokemon-events") \
    .option("startingOffsets", "latest") \
    .load()

# Transformar el valor a JSON y aplicar el esquema
pokemon_df = df.select(from_json(col("value").cast("string"), schema).alias("data")).select("data.*")

# Realizar un análisis: calcular el promedio de estadísticas por ID de Pokémon
avg_stats = pokemon_df.groupBy("pokemon_id") \
    .agg(
        avg("HP").alias("Avg_HP"),
        avg("Attack").alias("Avg_Attack"),
        avg("Defense").alias("Avg_Defense"),
        avg("Sp_Atk").alias("Avg_Sp_Atk"),
        avg("Sp_Def").alias("Avg_Sp_Def"),
        avg("Speed").alias("Avg_Speed")
    )

# Configurar la visualización de los resultados
query = avg_stats.writeStream \
    .outputMode("complete") \
    .format("console") \
    .option("truncate", "false") \
    .start()

query.awaitTermination()

