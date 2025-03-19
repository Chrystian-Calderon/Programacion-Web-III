Comparación de rendimiento en las 3 conexiones

📈 Resultados de pruebas con 20 registros:
Conexión básica 0.164 ms
Conexión con promesas 1.454 ms
Conexión con pool 0.031 ms

📈Resultados de pruebas con 103 registros:
Conexión básica 0.217 ms
Conexión con promesas 2.043 ms
Conexión con pool 0.025 ms

📝 Comentario sobre los resultados obtenidos:

- Conexión Básica: Se muestra un rendimiento de 20 registros a 103 registros que crece, por ende para registros con más de 500 o 1000 registros puede ser no optimo para proyectos a gran escala.
- Conexión con Promesas: Con un enfoque moderno, se muestra un rendimiento afectado que puede ser cuasa de manejo de promesas y await para cada conexion individual.
- Conexión con Pool: Es la conexion aceptable para proyectos reales con resultados significativos por ende se puede decir que con más registros el rendimiento no se vera muy afectado ya que reutiliza la conexion abierta.

✅ Conclusión:
La conexión mediante createPool() es altamente recomendada para aplicaciones con múltiples operaciones de lectura/escritura, ya que reduce drásticamente el tiempo de ejecución y mejora la escalabilidad.
