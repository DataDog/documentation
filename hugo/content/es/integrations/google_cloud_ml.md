---
"app_id": "google-cloud-ml"
"app_uuid": "ed0cf686-2653-4082-bf00-1ad5d1dcd379"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check": "gcp.ml.training.cpu.utilization"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.ml."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "195"
    "source_type_name": "Google Cloud ML"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "google cloud"
- "log collection"
- "ai/ml"
"custom_kind": "integration"
"dependencies": []
"description": "Realiza el seguimiento de las métricas clave de Google Cloud Machine Learning."
"display_on_public_website": true
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_ml/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/"
  "tag": "Blog"
  "text": "Prácticas recomendadas para la monitorización de modelos de ML en producción"
"git_integration_title": "google_cloud_ml"
"has_logo": true
"integration_id": "google_cloud_ml"
"integration_title": "Google Cloud ML"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_cloud_ml"
"public_title": "Google Cloud ML"
"short_description": "Un servicio gestionado para crear fácilmente modelos aprendizaje automático para datos de cualquier tipo o tamaño."
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Category::IA/ML"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Un servicio gestionado para crear fácilmente modelos aprendizaje automático para datos de cualquier tipo o tamaño."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/"
  "support": "README.md#Support"
  "title": "Google Cloud ML"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Machine Learning es un servicio gestionado que permite crear fácilmente modelos de Machine Learning, que funcionen con cualquier tipo de datos, de cualquier tamaño.

Obtén métricas de Google Machine Learning para:

- Visualizar el rendimiento de tus servicios de ML.
- Correlacionar el rendimiento de tus servicios de ML con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Machine Learning se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Machine Learning de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Machine Learning.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_ml" >}}


### Eventos

La integración Google Cloud Machine Learning no incluye eventos.

### Checks de servicios

La integración Google Cloud Machine Learning no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[5]: https://docs.datadoghq.com/help/

