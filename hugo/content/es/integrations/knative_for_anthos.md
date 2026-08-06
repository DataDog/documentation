---
app_id: knative_for_anthos
categories:
- nube
- configuración y despliegue
- rastreo
- google cloud
- Kubernetes
- recopilación de logs
- orquestación
custom_kind: integración
description: Recopila métricas y logs de clústeres de Knative para Anthos y analízalos
  en Datadog.
title: Knative para Anthos
---
## Información general

Knative para Anthos es una plataforma de desarrollo serverless flexible para entornos híbridos y multinube. Knative para Anthos es la oferta de [Knative](https://knative.dev/) gestionada y totalmente compatible con Google.

Utiliza la integración de Datadog Google Cloud Platform para recopilar métricas de Knative para Anthos.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google_cloud_platform/).

Si ya estás autenticando tus servicios de Knative para Anthos con Workload Identity, entonces no se necesitan más pasos.

Si no has habilitado Workload Identity, debes migrar para utilizar Workload Identity y empezar a recopilar métricas de Knative. Esto implica vincular una cuenta de servicio de Kubernetes a una cuenta de servicio de Google y configurar cada servicio del que quieres recopilar métricas para que utilice Workload Identity.

Para obtener instrucciones detalladas de configuración, consulta [Identidad de cargas de trabajo de Google Cloud](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).

### Recopilación de logs

Knative for Anthos expone [logs de servicio](https://cloud.google.com/anthos/run/docs/logging).
Los logs de Knative pueden recopilarse con Google Cloud Logging y enviarse a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Run desde Google Cloud Logging a Pub/Sub:

1. Ve a [Knative para Anthos](https://console.cloud.google.com/anthos/run), haz clic en los servicios que desees y navega hasta la pestaña **Logs**.

1. Haz clic en **View in Logs Explorer** (Ver en el Explorador de logs) para ir a la **Página de generación de logs de Google Cloud**.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el Pub/Sub creado a tal efecto. **Nota**: El Pub/Sub puede estar ubicado en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.knative.eventing.broker.event_count** <br>(count) | Número de eventos recibidos por un broker.|
| **gcp.knative.eventing.trigger.event_count** <br>(count) | Número de eventos recibidos por un activador.|
| **gcp.knative.eventing.trigger.event_dispatch_latencies.avg** <br>(gauge) | Promedio de tiempo empleado en enviar un evento a un suscriptor de activación.<br>_Se muestra en milisegundos_ |
| **gcp.knative.eventing.trigger.event_dispatch_latencies.p99** <br>(gauge) | Percentil 99 del tiempo empleado en enviar un evento a un suscriptor de activación.<br>_Se muestra en milisegundos_ |
| **gcp.knative.eventing.trigger.event_dispatch_latencies.p95** <br>(gauge) | Percentil 95 del tiempo empleado en enviar un evento a un suscriptor de activación.<br>_Se muestra en milisegundos_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.avg** <br>(gauge) | Promedio de tiempo empleado en procesar un evento antes de que se envíe a un suscriptor de activación.<br>_Se muestra en milisegundos_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.p99** <br>(gauge) | Percentil 99 del tiempo empleado en procesar un evento antes de que se envíe a un suscriptor de activación.<br>_Se muestra en milisegundos_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.p95** <br>(gauge) | Percentil 95 del tiempo empleado en procesar un evento antes de que se envíe a un suscriptor de activación.<br>_Se muestra en milisegundos_ |
| **gcp.knative.serving.activator.request_count** <br>(count) | El número de solicitudes que se dirigen al activador.<br>_Se muestra como solicitud_ |
| **gcp.knative.serving.activator.request_latencies.avg** <br>(gauge) | Media de los tiempos de solicitud de servicio en milisegundos para las solicitudes que pasan por el activador.<br>_Se muestra en milisegundos_ |
| **gcp.knative.serving.activator.request_latencies.p99** <br>(gauge) | Percentil 99 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que pasan por el activador.<br>_Se muestra en milisegundos_ |
| **gcp.knative.serving.activator.request_latencies.p95** <br>(gauge) | Percentil 95 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que pasan por el activador.<br>_Se muestra en milisegundos_ |
| **gcp.knative.serving.autoscaler.actual_pods** <br>(gauge) | Número de pods asignados actualmente.|
| **gcp.knative.serving.autoscaler.desired_pods** <br>(gauge) | Número de pods que el autoescalador quiere asignar.|
| **gcp.knative.serving.autoscaler.panic_mode** <br>(gauge) | Se establece en 1 si el autoescalador está en modo pánico para la revisión, en caso contrario 0.|
| **gcp.knative.serving.autoscaler.panic_request_concurrency** <br>(gauge) | Promedio de concurrencia de solicitudes observado por pod durante la ventana de autoescalado de pánico más corta.<br>_Se muestra como solicitud_ |
| **gcp.knative.serving.autoscaler.requested_pods** <br>(gauge) | Número de pods de autoescalador solicitados a Kubernetes.|
| **gcp.knative.serving.autoscaler.stable_request_concurrency** <br>(gauge) | Promedio de concurrencia de solicitudes observado por pod durante la ventana estable de autoescalado.<br>_Se muestra como solicitud_ |
| **gcp.knative.serving.autoscaler.target_concurrency_per_pod** <br>(gauge) | La concurrencia media deseada de solicitudes por pod durante la ventana estable de autoescalado.<br>_Se muestra como solicitud_ |
| **gcp.knative.serving.revision.request_count** <br>(count) | El número de solicitudes que llegan a la revisión.<br>_Se muestra como solicitud_ |
| **gcp.knative.serving.revision.request_latencies.avg** <br>(gauge) | Media de los tiempos de solicitud de servicio en milisegundos para las solicitudes que llegan a la revisión.<br>_Se muestra en milisegundos_ |
| **gcp.knative.serving.revision.request_latencies.p99** <br>(gauge) | Percentil 99 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que llegan a la revisión.<br>_Se muestra en milisegundos_ |
| **gcp.knative.serving.revision.request_latencies.p95** <br>(gauge) | Percentil 95 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que llegan a la revisión.<br>_Se muestra en milisegundos_ |

### Eventos

La integración de Knative para Anthos no incluye ningún evento.

### Checks de servicio

La integración de Knative para Anthos no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}