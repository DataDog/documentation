Introduce tu token de Splunk HEC y la URL base de la instancia de Splunk. Consulta [los requisitos previos](#prerequisites) para obtener más información.

El Worker pasa el token HEC al endpoint de Splunk. Después de que Observability Pipelines Worker procese los logs, los envía a la URL de la instancia especificada de Splunk.

**Nota**: El destino Splunk HEC reenvía todos los logs al endpoint `/services/collector/event`, independientemente de si configuras tu destino Splunk HEC para codificar tu salida en `JSON` o `raw`.