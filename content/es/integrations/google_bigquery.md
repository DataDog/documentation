---
aliases:
- /es/integrations/google_cloud_big_query/
categories:
- nube
- google cloud
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza un seguimiento del recuento de consultas, tiempos de ejecución,
  bytes cargados y más.
doc_link: https://docs.datadoghq.com/integrations/google_bigquery/
draft: false
git_integration_title: google_bigquery
has_logo: true
integration_id: google-cloud-bigquery
integration_title: Google BigQuery
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_bigquery
public_title: Integración Google BigQuery
short_description: Realiza un seguimiento del recuento de consultas, tiempos de ejecución,
  bytes cargados y más.
version: '1.0'
---

<!-- EXTRAÍDO DE https://github.com/DataDog/dogweb -->

{{< callout url="https://www.datadoghq.com/product-preview/bigquery-monitoring/" header="Join the Preview!" >}}
La monitorización Advanced BigQuery está en Vista previa. Utiliza este formulario para registrarte y empezar a obtener información sobre el rendimiento de sus consultas.
{{< /callout >}}


## Información general

BigQuery de Google es el almacén de datos empresariales de bajo coste, totalmente gestionado y a escala de petabyte para realizar análisis.

Obtén métricas de Google BigQuery para:

- Visualizar el rendimiento de tus consultas BigQuery.
- Correlacionar el rendimiento de tus consultas BigQuery con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google BigQuery se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs de Google BigQuery desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs de Google BigQuery.
2. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede estar ubicado en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-bigquery" >}}


### Eventos

La integración Google BigQuery no incluye eventos.

### Checks de servicio

La integración Google BigQuery no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_big_query/google_cloud_big_query_metadata.csv
[5]: https://docs.datadoghq.com/es/help/
