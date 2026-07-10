---
"app_id": "google-cloud-spanner"
"app_uuid": "543ff7dc-c2ea-499b-bb40-9f1a532a27cb"
"assets":
  "dashboards":
    "gcp_cloud_spanner_screen": "assets/dashboards/gcp_cloud_spanner_screen.json"
  "integration":
    "auto_install": falso
    "events":
      "creates_events": false
    "metrics":
      "check": "gcp.spanner.instance.cpu.utilization"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.spanner."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "192"
    "source_type_name": "Google Cloud Spanner"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "data stores"
- "google cloud"
- "log collection"
"custom_kind": "integración"
"dependencies": []
"description": "Realiza un seguimiento del uso de recursos de tus instancias Spanner"
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_spanner/"
"draft": falso
"git_integration_title": "google_cloud_spanner"
"has_logo": verdadero
"integration_id": "google-cloud-spanner"
"integration_title": "Google Cloud Spanner"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_spanner"
"public_title": "Google Cloud Spanner"
"short_description": "El primero y único servicio de base de datos relacional que es a la vez fuertemente consistente y escalable horizontalmente"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Almacenes de datos"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "El primero y único servicio de base de datos relacional que es a la vez fuertemente consistente y escalable horizontalmente"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Cloud Spanner"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Spanner es el primer y único servicio de bases de datos relacionales que es altamente coherente y escalable horizontalmente.

Obtén métricas de Google Spanner para:

- Visualizar el rendimiento de tus bases de datos Spanner.
- Correlacionar el rendimiento de tus bases de datos Spanner con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Spanner se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Spanner de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra los logs de Google Cloud Spanner.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_spanner" >}}


### Eventos

La integración Google Cloud Spanner no incluye eventos.

### Checks de servicios

La integración Google Cloud Spanner no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_spanner/google_cloud_spanner_metadata.csv
[5]: https://docs.datadoghq.com/help/

