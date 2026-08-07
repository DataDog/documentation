---
"app_id": "google-stackdriver-logging"
"app_uuid": "91f9116d-6407-4ca4-b18c-ee92a1eb5a89"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check": "gcp.logging.log_entry_count"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.logging."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "193"
    "source_type_name": "Registro de Google StackDriver"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "google cloud"
"custom_kind": "integración"
"dependencies": []
"description": "Realiza un seguimiento del tamaño de los logs ingeridos en Google Cloud Logging"
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_stackdriver_logging/"
"draft": falso
"further_reading":
- "link": "https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/"
  "tag": "Blog"
  "text": "Recopilación de logs de Google Cloud con Datadog"
"git_integration_title": "google_stackdriver_logging"
"has_logo": verdadero
"integration_id": "google-stackdriver-logging"
"integration_title": "Registro de Google StackDriver"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_stackdriver_logging"
"public_title": "Registro de Google StackDriver"
"short_description": "Almacenar, buscar, analizar, monitorizar y alertar sobre datos de logs y eventos desde Google Cloud"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Almacenar, buscar, analizar, monitorizar y alertar sobre datos de logs y eventos desde Google Cloud"
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/collect-stackdriver-logs-with-datadog/"
  "support": "README.md#Support"
  "title": "Registro de Google StackDriver"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

El producto Google Cloud Logging te permite almacenar, buscar, analizar, monitorizar y alertar sobre datos y eventos de logs de Google Cloud Platform.

Datadog extrae **métricas** de Google Cloud Logging para:

- Visualizar el rendimiento de tus logs de Google Cloud.
- Correlacionar el rendimiento de tus logs de Google Cloud con tus aplicaciones.

## Configuración

### Instalación

Las métricas de logs de Google Cloud se incluyen como parte de la [integración Google Cloud Platform][1]. No se requieren pasos de instalación adicionales.

### Recopilación de logs

Los logs de Google Cloud se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_stackdriver_logging" >}}


**Nota**: Datadog recopila [métricas definidas por usuarios][4] de Google Cloud Logging con el prefijo `gcp.logging.user`.

### Eventos

La integración Google Cloud Logging no incluye eventos.

### Checks de servicios

La integración Google Cloud Logging no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/google_stackdriver_loggin/google_stackdriver_logging_metadata.csv
[4]: https://cloud.google.com/logging/docs/logs-based-metrics/#user-defined_metrics_interface
[5]: https://docs.datadoghq.com/help/

