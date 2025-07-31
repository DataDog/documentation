---
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas de Google Cloud Dataflow.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataflow/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-dataflow-pipelines-with-datadog/
  tag: Blog
  text: Monitorización de tus pipelines de Dataflow con Datadog
git_integration_title: google_cloud_dataflow
has_logo: true
integration_id: google-cloud-dataflow
integration_title: Google Cloud Dataflow
integration_version: ''
is_public: true
manifest_version: '1.0'
monitors:
  Job backlog time is high: assets/monitors/backlog_monitor.json
name: google_cloud_dataflow
public_title: Integración de Datadog y Google Cloud Dataflow
short_description: Realiza el seguimiento de las métricas de Google Cloud Dataflow.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Google Cloud Dataflow es un servicio totalmente gestionado para transformar y enriquecer datos en los modos flujo (stream) (en tiempo real) y batch (histórico) con la misma fiabilidad y expresividad.

Utiliza la integración de Google Cloud con Datadog para recopilar métricas de Google Cloud Dataflow.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### APM

Los logs de Google Cloud Dataflow se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Dataflow desde Google Cloud Logging a Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Dataflow.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-dataflow" >}}


<div class="alert alert-warning">
Al utilizar Google Cloud Dataflow para monitorizar métricas de pipelines Apache Beam, ten en cuenta que las métricas generadas a partir de <a href="https://beam.apache.org/releases/javadoc/current/org/apache/beam/sdk/metrics/Metrics.html">métodos Gauge estáticos</a> no se recopilan. Si necesitas monitorizar estas métricas, puedes utilizar <a href="https://micrometer.io/docs">Micrometer</a>.
</div>

### Eventos

La integración Google Cloud Dataflow no incluye eventos.

### Checks de servicio

La integración Google Cloud Dataflow no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataflow/google_cloud_dataflow_metadata.csv
[5]: https://docs.datadoghq.com/es/help/