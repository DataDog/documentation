El procesador Sensitive Data Scanner analiza los logs para detectar y redactar o aplicar hash a información sensible como PII, PCI y datos sensibles personalizados. Puedes elegir entre la biblioteca de reglas predefinidas de Datadog o introducir reglas Regex personalizadas para buscar datos sensibles.

Para configurar el procesador:

1. Define una consulta de filtro. Solo se analizan y procesan los logs que coinciden con la consulta de filtro especificada. Todos los logs se envían al siguiente paso del pipeline, independientemente de si coinciden con la consulta del filtro.
1. Haz clic en **Add Scanning Rule (Añadir regla de análisis)**.
1. Selecciona una de las siguientes: