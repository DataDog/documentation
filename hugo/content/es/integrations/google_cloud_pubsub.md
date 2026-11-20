---
"app_id": "google-cloud-pubsub"
"app_uuid": "62c5815c-27d2-4a3c-ad69-c1b7f163bc1e"
"assets":
  "dashboards":
    "gcp_pub_sub_screen": "assets/dashboards/gcp_pub_sub_screen.json"
  "integration":
    "auto_install": false
    "events":
      "creates_events": false
    "metrics":
      "check": "gcp.pubsub.subscription.pull_request_count"
      "metadata_path": "metadata.csv"
      "prefix": "gcp.pubsub."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "186"
    "source_type_name": "Google Cloud Pubsub"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "cloud"
- "google cloud"
- "log collection"
- "message queues"
"custom_kind": "integration"
"dependencies": []
"description": Realiza el seguimiento de las métricas clave de Google Cloud PubSub.
"display_on_public_website": true
"doc_link": "https://docs.datadoghq.com/integrations/google_cloud_pubsub/"
"draft": false
"git_integration_title": "google_cloud_pubsub"
"has_logo": true
"integration_id": "google-cloud-pubsub"
"integration_title": "Google Cloud Pubsub"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "google_cloud_pubsub"
"public_title": "Google Cloud Pubsub"
"short_description": "Una solución de middleware empresarial orientada a mensajes escalable, flexible y fiable en Google Cloud"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Google Cloud"
  - "Category::Recopilación de logs"
  - "Category::Colas de mensajes"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Una solución de middleware empresarial orientada a mensajes escalable, flexible y fiable en Google Cloud"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Google Cloud Pubsub"
"version": "1.0"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Google Cloud Pub/Sub lleva a la nube la escalabilidad, la flexibilidad y la fiabilidad del middleware empresarial dirigido a mensajes.

Obtén métricas de Google Pub/Sub para:

- Visualizar el rendimiento de tus temas y suscripciones Pub/Sub.
- Correlacionar el rendimiento de tus temas y suscripciones Pub/Sub con tus aplicaciones.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

#### Configuración

Para recopilar etiquetas de Pub/Sub personalizadas como etiquetas (tags), activa el permiso de inventario de activos en la nube en la cuenta de servicio de Datadog en Google Cloud.

### Recopilación de logs

Los logs de Google Cloud Pub/Sub se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Pub/Sub de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Pub/Sub.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_pubsub" >}}


### Eventos

La integración Google Cloud Pub/Sub no incluye eventos.

### Checks de servicios

La integración Google Cloud Pub/Sub no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[5]: https://docs.datadoghq.com/help/

