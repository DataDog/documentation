---
categories:
- nube
- configuración y despliegue
- google cloud
- recopilación de logs
custom_kind: integración
dependencies: []
description: Realiza el seguimiento de las métricas clave de Google Cloud Load Balancing.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_loadbalancing/
draft: false
git_integration_title: google_cloud_loadbalancing
has_logo: true
integration_id: google-cloud-loadbalancing
integration_title: Google Cloud Load Balancing
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_cloud_loadbalancing
public_title: Integración de Datadog y Google Cloud Load Balancing
short_description: Realiza el seguimiento de las métricas clave de Google Cloud Load
  Balancing.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Google Cloud Load Balancing te ofrece la posibilidad de distribuir recursos informáticos con equilibrio de carga en una o varias regiones, para satisfacer tus requisitos de alta disponibilidad, colocar tus recursos detrás de una única IP anycast y escalar aumentando o reduciendo tus recursos con el Autoscaling inteligente.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Load Balancing.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, primero configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación.

### APM

Los logs del Balanceador de carga HTTP de Google Cloud HTTP se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][2].

Una vez hecho esto, exporta tus logs del Balanceador de carga HTTP de Google Cloud HTTP de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging][3] y filtra logs del Balanceador de carga HTTP de Google Cloud HTTP.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google-cloud-loadbalancing" >}}


### Eventos

La integración Google Cloud Load Balancing no incluye eventos.

### Checks de servicio

La integración Google Cloud Load Balancing no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[3]: https://console.cloud.google.com/logs/viewer
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/google_cloud_loadbalancing/google_cloud_loadbalancing_metadata.csv
[5]: https://docs.datadoghq.com/es/help/