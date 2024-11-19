---
categories:
- cloud
- google cloud
- log collection
- message queues
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud PubSub.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_pubsub/
draft: false
git_integration_title: google_cloud_pubsub
has_logo: true
integration_id: google-cloud-pubsub
integration_title: Google Pub/Sub
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_pubsub
public_title: Integración de Datadog y Google Cloud PubSub
short_description: Realiza el seguimiento de las métricas clave de Google Cloud PubSub.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
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

Para recopilar etiquetas (labels) Pub/Sub personalizadas como etiquetas (tags), activa el permiso de inventario de recursos en la nube.

### APM

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

### Checks de servicio

La integración Google Cloud Pub/Sub no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_pubsub/google_cloud_pubsub_metadata.csv
[5]: https://docs.datadoghq.com/es/help/