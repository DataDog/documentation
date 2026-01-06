---
aliases:
- /es/integrations/amazon_app_runner
app_id: amazon-app-runner
categories:
- aws
- nube
- configuración y despliegue
- recopilación de logs
- aprovisionamiento
custom_kind: integración
description: Despliegues rápidos, sencillos y rentables a partir de código fuente
  o imágenes de contenedor.
media: []
title: AWS App Runner
---
## Información general

AWS App Runner te permite desplegar una aplicación desde el código fuente o una imagen de contenedor a AWS.

Activa esta integración para ver todas tus métricas de App Runner en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `AppRunner` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS App Runner](https://app.datadoghq.com/integrations/amazon-app-runner).

### Recopilación de logs

Hay dos tipos de logs que puedes integrar con Datadog desde tus aplicaciones gestionadas por AWS App Runner. Estos logs se envían a CloudWatch bajo dos grupos diferentes de logs. El primero es el grupo de logs de servicio que captura todos los logs de la actividad del ciclo de vida para tu servicio de App Runner como compilaciones y despliegues de aplicaciones. El segundo es el grupo de logs de aplicación que contiene la salida de logs del código de tu aplicación en ejecución.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).
1. Una vez instalada la función Lambda, añade manualmente un activador en el grupo de logs de CloudWatch del servicio o aplicación de App Runner en la consola de AWS:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_1.png" alt="grupo de logs de CloudWatch" popup="true" style="width:70%;">}}
   Selecciona el grupo de logs CloudWatch correspondiente, añade un nombre de filtro (puedes dejar el filtro vacío) y añade el desencadenador:
   {{< img src="integrations/amazon_cloudwatch/cloudwatch_log_collection_2.png" alt="Activador de CloudWatch" popup="true" style="width:70%;">}}
1. Repite el paso 2 para añadir el grupo de logs adicional.
1. Una vez hecho, ve a tu [sección de logs de Datadog](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

### Recopilación de eventos

AWS App Runner envía eventos de cambio de estado de servicios y operaciones a EventBridge, que puede reenviarlos a Datadog para su visualización en el [Flujo de eventos](https://app.datadoghq.com/event/stream). Para enviar estos eventos a Datadog, haz lo siguiente:

1. Crea un [destino API EventBridge para eventos Datadog](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destination-partners.html#eb-api-destination-datadog).
1. Crea una regla EventBridge para actuar sobre los eventos AWS App Runner (consulta [Gestión de eventos App Runner en EventBridge](https://docs.aws.amazon.com/apprunner/latest/dg/monitor-ev.html)). Elige el Destino API como destino.
1. Empieza a ver los nuevos eventos de cambio de estado en el flujo de eventos de Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.apprunner.2xx_status_responses** <br>(count) | Número de respuestas 2XX HTTP.<br>_Se muestra como respuesta_ |
| **aws.apprunner.4xx_status_responses** <br>(count) | Número de respuestas 4XX HTTP.<br>_Se muestra como respuesta_ |
| **aws.apprunner.5xx_status_responses** <br>(count) | Número de respuestas 5XX HTTP.<br>_Se muestra como respuesta_ |
| **aws.apprunner.active_instances** <br>(gauge) | Número de instancias activas.<br>_Se muestra como instancia_ |
| **aws.apprunner.cpuutilization** <br>(gauge) | Uso medio de CPU en periodos de un minuto.<br>_Se muestra como porcentaje_ |
| **aws.apprunner.memory_utilization** <br>(gauge) | Uso medio de memoria en periodos de un minuto.<br>_Se muestra como porcentaje_ |
| **aws.apprunner.request_latency** <br>(gauge) | Tiempo que tardó tu servicio web en procesar las solicitudes HTTP.<br>_Se muestra como milisegundos_ |
| **aws.apprunner.request_latency.p50** <br>(gauge) | Percentil 50 del tiempo que tardó tu servicio web en procesar las solicitudes HTTP.<br>_Se muestra como milisegundos_ |
| **aws.apprunner.request_latency.p95** <br>(gauge) | Percentil 95 del tiempo que tardó tu servicio web en procesar las solicitudes HTTP.<br>_Se muestra como milisegundos_ |
| **aws.apprunner.request_latency.p99** <br>(gauge) | Percentil 99 del tiempo que tardó tu servicio web en procesar las solicitudes HTTP.<br>_Se muestra como milisegundos_ |
| **aws.apprunner.requests** <br>(count) | Número de solicitudes HTTP que recibió el servicio.<br>_Se muestra coo solicitud_ |

### Eventos

La integración de AWS App Runner admite tanto eventos de servicio como de cambio de estado de la operación desde EventBridge.

### Checks de servicio

La integración de AWS App Runner no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).