---
categories:
- nube
- contenedores
- google cloud
- Kubernetes
- recopilación de logs
- la red
custom_kind: integración
dependencies: []
description: Monitoriza el uso de recursos GKE.
doc_link: https://docs.datadoghq.com/integrations/google_kubernetes_engine/
draft: false
git_integration_title: google_kubernetes_engine
has_logo: true
integration_id: google-kubernetes-engine
integration_title: Google Kubernetes Engine, Nube
integration_version: ''
is_public: true
manifest_version: '1.0'
name: google_kubernetes_engine
public_title: Integración de Datadog y Google Kubernetes Engine, Nube
short_description: Monitoriza el uso de recursos GKE.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Google Kubernetes Engine (GKE) es un potente gestor de clústeres y un sistema de orquestación para la ejecución de tus contenedores Docker.

Obtén métricas de Google Kubernetes Engine para:

- Visualizar el rendimiento de tus contenedores GKE y del plano de control GKE.
- Correlacionar el rendimiento de tus contenedores GKE con tus aplicaciones.

Esta integración viene con dos dashboards preconfigurados separados:

- El dashboard estándar de GKE presenta métricas de GKE y del plano de control GKE recopiladas de la integración Google.
- El dashboard mejorado de GKE presenta métricas de la integración Kubernetes basada en el Agent de Datadog junto con las métricas del plano de control GKE recopiladas de la integración Google.

El dashboard estándar ofrece observabilidad en GKE con una simple configuración. El dashboard mejorado requiere pasos de configuración adicionales, pero proporciona más métricas de Kubernetes en tiempo real y a menudo es un mejor punto de partida al clonar y personalizar un dashboard para la monitorización de cargas de trabajo en producción.

A diferencia de los clústeres Kubernetes autoalojados, el plano de control GKE es gestionado por Google y no es accesible por un Datadog Agent que se ejecuta en el clúster. Por lo tanto, la observabilidad en el plano de control GKE requiere la integración Google, incluso si utilizas principalmente el Datadog Agent para monitorizar tus clústeres.

## Configuración

### Recopilación de métricas

#### Instalación

1. Si aún no lo has hecho, configura la [integración Google Cloud Platform][1]. No es necesario realizar ningún otro paso de instalación para las métricas estándar y el dashboard preconfigurado.

2. Para rellenar el dashboard mejorado y habilitar el rastreo, la generación de logs, los perfiles, la seguridad de APM y otros servicios Datadog, [instala el Datadog Agent en tu clúster GKE][2].

3. Para rellenar las métricas del plano de control, debes [habilitar las métricas del plano de control GKE][3]. Las métricas del plano de control te proporcionan visibilidad del funcionamiento del plano de control Kubernetes, gestionado por Google en GKE.

### APM

Los logs de Google Kubernetes Engine se recopilan con Google Cloud Logging y se envían a una tarea de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla Dataflow de Datadog][4].

Una vez hecho esto, exporta tus logs de Google Kubernetes Engine desde Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página del Explorador de logs de GCP][5] y filtra logs de Kubernetes y GKE.
2. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.
3. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

4. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_kubernetes_engine" >}}


### Eventos

La integración Google Kubernetes Engine no incluye eventos.

### Checks de servicio

La integración Google Kubernetes Engine no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].


[1]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/
[2]: https://docs.datadoghq.com/es/integrations/gke/?tab=standard
[3]: https://cloud.google.com/stackdriver/docs/solutions/gke/managing-metrics#enable-control-plane-metrics
[4]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/?tab=datadogussite#log-collection
[5]: https://console.cloud.google.com/logs/viewer
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/google_kubernetes_engine/google_kubernetes_engine_metadata.csv
[7]: https://docs.datadoghq.com/es/help/