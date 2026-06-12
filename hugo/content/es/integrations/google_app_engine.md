---
"app_id": "google-app-engine"
"app_uuid": "873be5df-897f-450d-856d-99cea1ffae03"
"assets":
  "dashboards":
    "gcp_appengine": "assets/dashboards/gcp_appengine.json"
  "integration":
    "auto_install": verdadero
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "gcp.gae.memcache.hit_ratio"
      - "gcp.gae.http.server.response_latencies.avg"
      - "gcp.gae.system.cpu.usage"
      - "gcp.gae.flex.instance.connections.current"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.gae"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "87"
    "source_type_name": "Google App Engine"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "configuration & deployment"
- "google cloud"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "google_app_engine"
"integration_id": "google-app-engine"
"integration_title": "Google App Engine"
"integration_version": ""
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "google_app_engine"
"public_title": "Google App Engine"
"short_description": "Google App Engine: Platforma como servicio de Google.\nMonitor de tu aplicación que se ejecuta en la nube"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Configuración y despliegue"
  - "Category::Google Cloud"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Google App Engine: Platforma como servicio de Google.\nMonitori de tu aplicación que se ejecuta en la nube"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google App Engine"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Instala la integración Google App Engine en tu proyecto para:

- Consultar métricas de tus servicios Google App Engine: memcache, colas de tareas, almacenes de datos.
- Consultar métricas sobre solicitudes: percentiles de visualización, latencia, coste.
- Etiquetar métricas de Google App Engine por versión y comparar el rendimiento de las diferentes versiones.

También puedes enviar métricas personalizadas a Datadog a través de la [API][1] o de [DogStatsD][2].

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][3]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google App Engine se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][4].

Una vez hecho esto, exporta tus logs de Google App Engine desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][5] y filtra logs de Google App Engine.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_app_engine" >}}


### Eventos

La integración Google App Engine no incluye eventos.

### Checks de servicios

La integración Google App Engine no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

[1]: https://docs.datadoghq.com/api/latest/using-the-api/
[2]: https://docs.datadoghq.com/developers/dogstatsd/
[3]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[4]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_app_engine/google_app_engine_metadata.csv
[7]: https://docs.datadoghq.com/help/

