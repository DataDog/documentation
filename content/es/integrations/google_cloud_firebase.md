---
"app_id": "google-cloud-firebase"
"app_uuid": "d7f5267d-56e4-4148-aabb-bec98207c35a"
"assets":
  "integration":
    "auto_install": falso
    "events":
      "creates_events": falso
    "metrics":
      "check": "gcp.firebasedatabase.io.utilization"
      "metadata_path": "metadata.csv"
      "prefix": "gcp."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "189"
    "source_type_name": "Google Cloud Firebase"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "google cloud"
- "log collection"
- "mobile"
"custom_kind": "integración"
"dependencies": []
"description": "Realiza un seguimiento del uso de la red y del almacén de datos atribuible a tus servicios Firebase."
"display_on_public_website": verdadero
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_firebase/"
"draft": falso
"git_integration_title": "google_cloud_firebase"
"has_logo": verdadero
"integration_id": "google-cloud-firebase"
"integration_title": "Google Cloud Firebase"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_cloud_firebase"
"public_title": "Google Cloud Firebase"
"short_description": "Firebase es una plataforma móvil que te ayuda a desarrollar aplicaciones rápidamente"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Category::Mobile"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Firebase es una plataforma móvil que te ayuda a desarrollar aplicaciones rápidamente"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Cloud Firebase"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Firebase es una plataforma móvil que te ayuda a desarrollar rápidamente aplicaciones de alta calidad, a hacer crecer tu base de usuarios y a ganar más dinero.

Obtén métricas de Google Firebase para:

- Visualizar el rendimiento de tus bases de datos y tus servicios de alojamiento Firebase.
- Correlacionar el rendimiento de tus herramientas Firebase con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Firebase se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Firebase desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Firebase.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_firebase" >}}


### Eventos

La integración Google Firebase no incluye eventos.

### Checks de servicios

La integración Google Firebase no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_firebase/google_cloud_firebase_metadata.csv
[5]: https://docs.datadoghq.com/help/

