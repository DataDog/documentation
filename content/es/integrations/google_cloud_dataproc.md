---
categories:
- nube
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas de Google Cloud Dataproc.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_dataproc/
draft: false
git_integration_title: google_cloud_dataproc
has_logo: true
integration_id: google-cloud-dataproc
integration_title: Google Cloud Dataproc
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_dataproc
public_title: Integración de Datadog y Google Cloud Dataproc
short_description: Realiza el seguimiento de las métricas de Google Cloud Dataproc.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> te ayuda a observar, solucionar problemas y optimizar los costes de tus tareas de Spark en tus clústeres Dataproc.
</div>

Google Cloud Dataproc es un servicio de nube rápido, fácil de utilizar y totalmente gestionado para ejecutar clústeres Apache Spark y Apache Hadoop de una forma más sencilla y rentable.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Dataproc.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Dataproc se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google Cloud Dataproc de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google Cloud Dataproc.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede estar ubicado en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-dataproc" >}}


### Eventos

La integración Google Cloud Dataproc no incluye eventos.

### Checks de servicio

La integración Google Cloud Dataproc no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_dataproc/google_cloud_dataproc_metadata.csv
[5]: https://docs.datadoghq.com/es/help/