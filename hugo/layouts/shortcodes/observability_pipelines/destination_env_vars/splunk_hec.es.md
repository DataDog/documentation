Introduce tu token Splunk HEC y la URL base de la instancia Splunk. Para obtener más información, consulta los [requisitos previos](#prerequisites).

El worker pasa el token HEC al endpoint de recopilación de Splunk. Una vez que el Worker de Observability Pipelines procesa los logs, los envía a la URL de la instancia Splunk especificada.

**Nota**: El destino Splunk HEC reenvía todos los logs al endpoint `/services/collector/event`, independientemente de si configuras tu destino Splunk HEC para codificar tu resultado en `JSON` o `raw`.