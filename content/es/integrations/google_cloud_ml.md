---
categories:
- cloud
- google cloud
- log collection
- ai/ml
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud Machine
  Learning.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_ml/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/ml-model-monitoring-in-production-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de modelos de ML en producción
git_integration_title: google_cloud_ml
has_logo: true
integration_id: google-cloud-ml
integration_title: Google Machine Learning
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_ml
public_title: Integración de Datadog y Google Machine Learning
short_description: Realiza el seguimiento de las métricas clave de Google Cloud Machine
  Learning.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Google Cloud Machine Learning es un servicio gestionado que permite crear fácilmente modelos de Machine Learning, que funcionen con cualquier tipo de datos, de cualquier tamaño.

Obtén métricas de Google Machine Learning para:

- Visualizar el rendimiento de tus servicios de ML.
- Correlacionar el rendimiento de tus servicios de ML con tus aplicaciones.

## Ajuste

### Instalación

Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### APM

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

### Checks de servicio

La integración Google Cloud Machine Learning no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

## Lectura adicional
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_ml/google_cloud_ml_metadata.csv
[5]: https://docs.datadoghq.com/es/help/