from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, avg, max, min

# Crear una sesión de Spark
spark = SparkSession.builder.appName("PokemonDataAnalysis").getOrCreate()

# Cargar el archivo CSV en un DataFrame
file_path = "hdfs://localhost:9000/TareaR/pokemon.csv"
pokemon_df = spark.read.csv(file_path, header=True, inferSchema=True)

# Mostrar algunas filas iniciales para revisar el contenido
pokemon_df.show(5)
pokemon_df.printSchema()

# Análisis Exploratorio de Datos (EDA)
#Eliminar filas con valores nulos
pokemon_df = pokemon_df.dropna()
# Estadísticas descriptivas
pokemon_df.describe().show()

# Contar la cantidad de tipos de Pokémon
type_counts = pokemon_df.groupBy("Type_1").count()
type_counts.show()

# 3. Promedio de estadísticas (HP, Ataque, Defensa, etc.) por tipo principal
average_stats = (pokemon_df.groupBy("Type_1")
                              .agg(avg("HP").alias("Avg_HP"),
                                   avg("Attack").alias("Avg_Attack"),
                                   avg("Defense").alias("Avg_Defense"),
                                   avg("Sp_Atk").alias("Avg_Sp_Atk"),
                                   avg("Sp_Def").alias("Avg_Sp_Def"),
                                   avg("Speed").alias("Avg_Speed")))
average_stats.show()


# Almacenamiento de resultados procesados
# Guardar en un nuevo archivo CSV . Descomentar y ajustar la ruta de salida y nombre del archivo
#output_path = "ruta/de/salida/pokemon_procesado.csv"
#pokemon_df.write.csv(output_path, header=True)

