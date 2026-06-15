---
app_id: google-cloud-bigquery
app_uuid: 7b7d322f-c14a-4378-994c-ed9982c94864
assets:
  dashboards:
    bigquery: assets/dashboards/bigquery.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check: gcp.bigquery.query.count
      metadata_path: metadata.csv
      prefix: gcp.bigquery.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 188
    source_type_name: Google BigQuery
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- google cloud
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_bigquery
integration_id: google-cloud-bigquery
integration_title: Google BigQuery
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_bigquery
public_title: Google BigQuery
short_description: BigQuery es el almacén de datos empresariales de bajo coste, de
  nivel de petabyte y totalmente gestionado de Google para los análisis.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Google Cloud
  - Categoría::Almacenes de datos
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: BigQuery es el almacén de datos empresariales de bajo coste, de nivel
    de petabyte y totalmente gestionado de Google para los análisis.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google BigQuery
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Únete a la vista previa" >}}
   La monitorización ampliada de BigQuery está en vista previa. Utiliza este formulario para inscribirte y empezar a obtener información sobre el rendimiento de tus consultas. 
{{< /callout >}}


## Información general

La integración de Datadog con Google BigQuery proporciona una monitorización de tus cargas de trabajo de análisis de datos.

Al conectar BigQuery con Datadog (mediante la integración con Google Cloud Platform), obtendrás información en tiempo real sobre el rendimiento de las consultas, el consumo de recursos y los generadores de costes.

Esta integración te permite realizar un seguimiento de métricas críticas, como los tiempos de finalización de trabajos, el uso de ranuras y los bytes procesados, lo que te permite identificar latencias elevadas durante la ejecución de trabajos de BigQuery.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Monitorización ampliada de BigQuery

La monitorización ampliada de BigQuery proporciona una visibilidad granular de tus entornos BigQuery.

Consulta la [documentación de la integración Google Cloud][2] para obtener instrucciones de configuración detalladas.

### Recopilación de logs

Los logs de Google BigQuery se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][3].

Una vez hecho esto, exporta tus logs de Google BigQuery desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][4] y filtra los logs de Google BigQuery.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_bigquery" >}}


### Eventos

La integración Google BigQuery no incluye eventos.

### Checks de servicio

La integración Google BigQuery no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][6].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#expanded-bigquery-monitoring
[3]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[4]: https://console.cloud.google.com/logs/viewer
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[6]: https://docs.datadoghq.com/es/help/