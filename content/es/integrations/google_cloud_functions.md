---
"app_id": "google-cloud-functions"
"app_uuid": "3101d455-ff1e-432e-a60b-58d8ecc4009a"
"assets":
  "dashboards":
    "gcp_cloudfunctions": "assets/dashboards/gcp_cloudfunctions.json"
  "integration":
    "auto_install": falso
    "events":
      "creates_events": false
    "metrics":
      "check": "gcp.cloudfunctions.function.execution_count"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.cloudfunctions."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "196"
    "source_type_name": "Google Cloud Functions"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "google cloud"
- "log collection"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "google_cloud_functions"
"integration_id": "google-cloud-functions"
"integration_title": "Google Cloud Functions"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_functions"
"public_title": "Google Cloud Functions"
"short_description": "Una solución de computación asíncrona basada en eventos que permite la creación de pequeñas funciones de propósito único"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Una solución de computación asíncrona basada en eventos que permite la creación de pequeñas funciones de propósito único"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Cloud Functions"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Functions es una solución informática asíncrona, ligera y basada en eventos que permite crear pequeñas funciones de un solo propósito.

Obtén métricas de Google Functions para:

- Visualizar el rendimiento de tus funciones.
- Correlacionar el rendimiento de tus funciones con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Functions se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Functions de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Functions.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_functions" >}}


### Eventos

La integración Google Cloud Functions no incluye eventos.

### Checks de servicio

La integración Google Cloud Functions no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_functions/google_cloud_functions_metadata.csv
[5]: https://docs.datadoghq.com/help/

