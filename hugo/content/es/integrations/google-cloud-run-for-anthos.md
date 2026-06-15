---
aliases:
- /es/integrations/google_cloud_run_for_anthos
app_id: google-cloud-run-for-anthos
categories:
- nube
- orquestación
- google cloud
- recopilación de logs
custom_kind: integración
description: Una oferta gestionada de Knative que permite cargas de trabajo serverless
  en entornos híbridos y multicloud.
further_reading:
- link: https://docs.datadoghq.com/integrations/google_cloud_run/
  tag: documentación
  text: Documentación de Google Cloud Run para Anthos
media: []
title: Google Cloud Run para Anthos
---
## Información general

Google Cloud Run para Anthos es una plataforma flexible de desarrollo serverless para entornos híbridos y multicloud. Cloud Run para Anthos es la oferta gestionada y totalmente compatible de Google [Knative](https://knative.dev/). Si utilizas Google Cloud totalmente gestionado, consulta la [documentación de Google Cloud Run](https://docs.datadoghq.com/integrations/google-cloud-run/).

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Run para Anthos.

## Configuración

### Recopilación de métricas

#### Instalación

Si aún no lo has hecho, configura la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/).

Si ya autenticas tus servicios Cloud Run para Anthos utilizando Workload Identity, entonces no es necesario realizar más pasos.

Si no has habilitado Workload Identity, debes migrar para utilizar Workload Identity y empezar a recopilar métricas de Knative. Esto implica vincular una cuenta de servicio de Kubernetes a una cuenta de servicio de Google y configurar cada servicio del que quieres recopilar métricas para que utilice Workload Identity.

Para obtener instrucciones detalladas de configuración, consulta [Identidad de cargas de trabajo de Google Cloud](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity).

### Recopilación de logs

Google Cloud Run para Anthos expone [logs de servicio](https://cloud.google.com/anthos/run/docs/logging).
Los logs de Google Cloud Run pueden recopilarse con Google Cloud Logging y enviarse a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Run de Google Cloud Logging al tema Pub/Sub:

1. Ve a [Cloud Run para Anthos](https://console.cloud.google.com/anthos/run), haz clic en los servicios que desees y ve a la pestaña **Logs**.

1. Haz clic en **View in Logs Explorer** (Ver en el Explorador de logs) para ir a la **Page (página) de generación de logs de Google Cloud**.

1. Haz clic en **Create sink** (Crear sumidero) y asigna al sumidero el nombre correspondiente.

1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.

   {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Exportar logs de Google Cloud Pub/Sub a Pub Sub" >}}

1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

### Rastreo y métricas personalizadas

Utiliza el [Datadog Admission Controller](https://docs.datadoghq.com/containers/cluster_agent/admission_controller/) para configurar automáticamente los rastreadores de APM y los clientes de DogStatsD. Inserta las variables de entorno `DD_AGENT_HOST` y `DD_ENTITY_ID` mediante uno de los siguientes métodos:

- Añade la etiqueta `admission.datadoghq.com/enabled: "true"` a tu pod.
- Configura el Controlador de admisión del Cluster Agent definiendo `mutateUnlabelled: true`.

Para evitar que los pods reciban variables de entorno, añade la etiqueta `admission.datadoghq.com/enabled: "false"`. Esto funciona incluso si estableces `mutateUnlabelled: true`. Para obtener más información, consulta la documentación del [Datadog Admission Controller](https://docs.datadoghq.com/containers/cluster_agent/admission_controller/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.knative.eventing.broker.event_count** <br>(count) | Número de eventos recibidos por un corredor.|
| **gcp.knative.eventing.trigger.event_count** <br>(count) | Número de eventos recibidos por un activador.|
| **gcp.knative.eventing.trigger.event_dispatch_latencies.avg** <br>(gauge) | Media de tiempo empleado en enviar un evento a un suscriptor de activación.<br>_Mostrado como milisegundo_ |
| **gcp.knative.eventing.trigger.event_dispatch_latencies.p99** <br>(gauge) | Percentil 99 del tiempo empleado en enviar un evento a un suscriptor de activación.<br>_Mostrado como milisegundo_ |
| **gcp.knative.eventing.trigger.event_dispatch_latencies.p95** <br>(gauge) | Percentil 95 del tiempo empleado en enviar un evento a un suscriptor de activación.<br>_Mostrado como milisegundo_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.avg** <br>(gauge) | Media de tiempo empleado en procesar un evento antes de que se envíe a un suscriptor de activación.<br>_Mostrado como milisegundo_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.p99** <br>(gauge) | Percentil 99 del tiempo empleado en procesar un evento antes de que se envíe a un suscriptor de activación.<br>_Mostrado como milisegundo_ |
| **gcp.knative.eventing.trigger.event_processing_latencies.p95** <br>(gauge) | Percentil 95 del tiempo empleado en procesar un evento antes de que se envíe a un suscriptor de activación.<br>_Mostrado como milisegundo_ |
| **gcp.knative.serving.activator.request_count** <br>(count) | El número de solicitudes que se dirigen al activador.<br>_Mostrado como solicitud_ |
| **gcp.knative.serving.activator.request_latencies.avg** <br>(gauge) | Media de los tiempos de solicitud de servicio en milisegundos para las solicitudes que pasan por el activador.<br>_Mostrado como milisegundo_ |
| **gcp.knative.serving.activator.request_latencies.p99** <br>(gauge) | Percentil 99 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que pasan por el activador.<br>_Mostrado como milisegundo_ |
| **gcp.knative.serving.activator.request_latencies.p95** <br>(gauge) | Percentil 95 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que pasan por el activador.<br>_Mostrado como milisegundo_ |
| **gcp.knative.serving.autoscaler.actual_pods** <br>(gauge) | Número de pods asignados actualmente.|
| **gcp.knative.serving.autoscaler.desired_pods** <br>(gauge) | Número de pods que el autoescalador desea asignar.|
| **gcp.knative.serving.autoscaler.panic_mode** <br>(gauge) | Se configura en 1 si el autoescalador está en modo de pánico para la revisión, en caso contrario 0.|
| **gcp.knative.serving.autoscaler.panic_request_concurrency** <br>(gauge) | Media de concurrencia de solicitudes observada por pod durante la ventana de autoescalado de pánico más corta.<br>_Mostrado como solicitud_ |
| **gcp.knative.serving.autoscaler.requested_pods** <br>(gauge) | Número de pods de autoescalador solicitados a Kubernetes.|
| **gcp.knative.serving.autoscaler.stable_request_concurrency** <br>(gauge) | Media de concurrencia de solicitudes observada por pod durante la ventana estable de autoescalado.<br>_Mostrado como solicitud_ |
| **gcp.knative.serving.autoscaler.target_concurrency_per_pod** <br>(gauge) | La concurrencia media deseada de solicitudes por pod durante la ventana estable de autoescalado.<br>_Mostrado como soiicitud_ |
| **gcp.knative.serving.revision.request_count** <br>(count) | El número de solicitudes que llegan a la revisión.<br>_Mostrado como solicitud_ |
| **gcp.knative.serving.revision.request_latencies.avg** <br>(gauge) | Media de los tiempos de solicitud de servicio en milisegundos para las solicitudes que llegan a la revisión.<br>_Mostrado como milisegundo_ |
| **gcp.knative.serving.revision.request_latencies.p99** <br>(gauge) | Percentil 99 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que llegan a la revisión.<br>_Mostrado como milisegundo_ |
| **gcp.knative.serving.revision.request_latencies.p95** <br>(gauge) | Percentil 95 de los tiempos de solicitud de servicio en milisegundos para las solicitudes que llegan a la revisión.<br>_Mostrado como milisegundo_ |

### Eventos

La integración de Google Cloud Run para Anthos no incluye eventos.

### Checks de servicio

La integración de Google Cloud Run para Anthos no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}