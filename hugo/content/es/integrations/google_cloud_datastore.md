---
"app_id": "google-cloud-datastore"
"app_uuid": "93acce72-3f1c-444f-8518-0f16635af95d"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check": "gcp.datastore.api.request_count"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.datastore."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "184"
    "source_type_name": "Google Cloud Datastore"
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
- "mobile"
"custom_kind": "integración"
"dependencies": []
"description": "Realiza el seguimiento del rendimiento de lectura/escritura, del recuento de solicitudes y más"
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_datastore/"
"draft": falso
"git_integration_title": "google_cloud_datastore"
"has_logo": verdadero
"integration_id": "google-cloud-datastore"
"integration_title": "Google Cloud Datastore"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_datastore"
"public_title": "Google Cloud Datastore"
"short_description": "Cloud Datastore es una base de datos NoSQL altamente escalable para tus aplicaciones web y móviles"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Almacenes de datos"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Category::Mobile"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Cloud Datastore es una base de datos NoSQL altamente escalable para tus aplicaciones web y móviles"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Cloud Datastore"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Cloud Datastore es una base de datos NoSQL altamente escalable para tus aplicaciones web y móviles.

Obtén métricas de Google Datastore para:

- Visualizar el rendimiento de tus Datastores.
- Correlacionar el rendimiento de tus Datastores con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Datastore se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Datastore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Datastore.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_datastore" >}}


### Eventos

La integración Google Cloud Datastore no incluye eventos.

### Checks de servicios

La integración Google Cloud Datastore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_datastore/google_cloud_datastore_metadata.csv
[5]: https://docs.datadoghq.com/help/

