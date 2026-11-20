---
"app_id": "google-cloud-storage"
"app_uuid": "d4a7c80f-f4d4-4495-b565-b0fadc436e99"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check": "gcp.storage.network.sent_bytes_count"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.storage."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "194"
    "source_type_name": "Almacenamiento en la nube de Google"
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
"description": Realiza el seguimiento de las métricas clave de Google Cloud Storage.
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_storage/"
"draft": falso
"git_integration_title": "google_cloud_storage"
"has_logo": verdadero
"integration_id": "google-cloud-storage"
"integration_title": "Almacenamiento en la nube de Google"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_storage"
"public_title": "Almacenamiento en la nube de Google"
"short_description": "Almacenamiento de objetos unificado para servicio de datos en directo, análisis de datos, aprendizaje automático y archivo de datos"
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
  "description": "Almacenamiento de objetos unificado para servicio de datos en directo, análisis de datos, aprendizaje automático y archivo de datos"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Almacenamiento en la nube de Google"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Storage es un servicio de almacenamiento de objetos unificado para desarrolladores y empresas, desde los datos en directo para su análisis/ML hasta el archivado de datos.

Obtén métricas de Google Storage para:

- Visualizar el rendimiento de tus servicios de almacenamiento.
- Correlacionar el rendimiento de tus servicios de almacenamiento con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

#### Configuración

Para recopilar etiquetas (labels) Cloud Storage personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

### Recopilación de logs

Los logs de Google Cloud Storage se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Storage de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Storage.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_storage" >}}


### Eventos

La integración Google Cloud Storage no incluye eventos.

### Checks de servicios

La integración Google Cloud Storage no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_storage/google_cloud_storage_metadata.csv
[5]: https://docs.datadoghq.com/help/

