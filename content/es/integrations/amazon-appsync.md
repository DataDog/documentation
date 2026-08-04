---
aliases:
- /es/integrations/amazon_appsync
app_id: amazon-appsync
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Simplifica el desarrollo de aplicaciones con la API flexible y segura
  de AppSync para acceder y combinar datos de diversas fuentes.
media: []
title: AWS AppSync
---
## Información general

AWS AppSync simplifica el desarrollo de aplicaciones permitiéndote crear una API flexible para acceder, manipular y combinar datos de una o varias fuentes de datos de forma segura.

Activa esta integración para ver todas tus métricas de AppSync en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `AppSync` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS AppSync](https://app.datadoghq.com/integrations/amazon-appsync).

### Recopilación de logs

#### Activar logging

Configura AWS AppSync para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_appsync` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS AppSync en la consola AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.appsync.4xxerror** <br>(count) | Número de errores capturados como resultado de solicitudes no válidas debidas a una configuración incorrecta del cliente.<br>_Se muestra como error_ |
| **aws.appsync.5xxerror** <br>(count) | Errores encontrados durante la ejecución de una consulta GraphQL.<br>_Se muestra como error_ |
| **aws.appsync.active_connections** <br>(count) | Número de conexiones WebSocket simultáneas de clientes a AWS AppSync en 1 minuto.|
| **aws.appsync.connect_server_error** <br>(count) | Número de errores que se originaron en AWS AppSync al procesar conexiones. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.connect_success** <br>(count) | Número de conexiones WebSocket a AWS AppSync exitosas. Es posible tener conexiones sin suscripciones.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.connection_duration** <br>(count) | Cantidad de tiempo que la conexión permanece abierta.<br>_Se muestra como milisegundos_ |
| **aws.appsync.disconnect_client_error** <br>(count) | Número de errores de cliente que se originaron en AWS AppSync al desconectar conexiones WebSocket.<br>_Se muestra como error_ |
| **aws.appsync.disconnect_server_error** <br>(count) | Número de errores de servidor que se originaron en AWS AppSync al desconectar conexiones WebSocket.<br>_Se muestra como error_ |
| **aws.appsync.disconnect_success** <br>(count) | Número de desconexiones WebSocket de AWS AppSync exitosas.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.latency** <br>(gauge) | Tiempo medio entre el momento en que AWS AppSync recibe una solicitud de un cliente y el momento en que devuelve una respuesta al cliente. Esto no incluye la latencia de red encontrada para que una respuesta llegue a los dispositivos finales.<br>_Se muestra como milisegundos_ |
| **aws.appsync.latency.maximum** <br>(gauge) | Tiempo máximo entre el momento en que AWS AppSync recibe una solicitud de un cliente y el momento en que devuelve una respuesta al cliente. Esto no incluye la latencia de red encontrada para que una respuesta llegue a los dispositivos finales.<br>_Se muestra como milisegundos_ |
| **aws.appsync.latency.p90** <br>(gauge) | Tiempo del percentil 90 entre el momento en que AWS AppSync recibe una solicitud de un cliente y el momento en que devuelve una respuesta al cliente. Esto no incluye la latencia de red encontrada para que una respuesta llegue a los dispositivos finales.<br>_Se muestra como milisegundos_ |
| **aws.appsync.publish_data_message_client_error** <br>(count) | Número de mensajes de eventos de suscripción que no se publicaron debido a errores del lado del cliente.<br>_Se muestra como error_ |
| **aws.appsync.publish_data_message_server_error** <br>(count) | Número de errores que se originaron en AWS AppSync al publicar mensajes de eventos de suscripción. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.publish_data_message_size** <br>(gauge) | Tamaño de los mensajes de eventos de suscripción publicados.<br>_Se muestra como bytes_ |
| **aws.appsync.publish_data_message_success** <br>(count) | Número de mensajes de eventos de suscripción que se publicaron con éxito.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.requests** <br>(count) | Número de solicitudes (consultas + mutaciones) que han procesado todas las API de tu cuenta.<br>_Se muestra como solicitud_ |
| **aws.appsync.subscribe_client_error** <br>(count) | Número de suscripciones rechazadas por AWS AppSync debido a errores del lado del cliente. Esto puede ocurrir cuando una carga útil JSON es incorrecta, el servicio está limitado o los ajustes de autorización están mal configurados.<br>_Se muestra como error_ |
| **aws.appsync.subscribe_server_error** <br>(count) | Número de errores que se originaron en AWS AppSync al procesar suscripciones. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.subscribe_success** <br>(count) | Número de suscripciones que se registraron con éxito en AWS AppSync a través de WebSocket. Es posible tener conexiones sin suscripciones, pero no es posible tener suscripciones sin conexiones.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.unsubscribe_client_error** <br>(count) | Número de desuscripciones rechazadas por AWS AppSync debido a errores del lado del cliente.<br>_Se muestra como error_ |
| **aws.appsync.unsubscribe_server_error** <br>(count) | Número de errores que se originaron en AWS AppSync al procesar desuscripciones. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.unsubscribe_success** <br>(count) | Número de desuscripciones que se procesaron con éxito desde AWS AppSync.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.active_connections.sum** <br>(count) | Suma de conexiones WebSocket concurrentes de clientes a AWS AppSync en 1 minuto.|
| **aws.appsync.active_subscriptions** <br>(count) | Número de suscripciones concurrentes de clientes en 1 minuto.|
| **aws.appsync.active_subscriptions.sum** <br>(count) | Suma de suscripciones concurrentes de clientes en 1 minuto.|
| **aws.appsync.connect_client_error** <br>(count) | Número de conexiones WebSocket rechazadas por AWS AppSync debido a errores del lado del cliente. Esto podría implicar que el servicio está limitado o que los ajustes de autorización están mal configurados.<br>_Se muestra como error_ |
| **aws.appsync.connect_client_error.sum** <br>(count) | Suma de conexiones WebSocket rechazadas por AWS AppSync debido a errores del lado del cliente. Esto podría implicar que el servicio está limitado o que los ajustes de autorización están mal configurados.<br>_Se muestra como error_ |
| **aws.appsync.connect_server_error.sum** <br>(count) | Suma de errores que se originaron en AWS AppSync al procesar conexiones. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.connect_success.sum** <br>(count) | Suma de conexiones WebSocket a AWS AppSync exitosas. Es posible tener conexiones sin suscripciones.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.disconnect_client_error.sum** <br>(count) | Suma de errores de cliente que se originaron en AWS AppSync al desconectar conexiones WebSocket.<br>_Se muestra como error_ |
| **aws.appsync.disconnect_server_error.sum** <br>(count) | Suma de errores de servidor que se originaron en AWS AppSync al desconectar conexiones WebSocket.<br>_Se muestra como error_ |
| **aws.appsync.disconnect_success.sum** <br>(count) | Suma de desconexiones WebSocket de AWS AppSync exitosas.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.publish_data_message_client_error.sum** <br>(count) | Suma de mensajes de eventos de suscripción que no se publicaron debido a errores del lado del cliente.<br>_Se muestra como error_ |
| **aws.appsync.publish_data_message_server_error.sum** <br>(count) | Número de errores que se originaron en AWS AppSync al publicar mensajes de eventos de suscripción. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.publish_data_message_success.sum** <br>(count) | Suma de mensajes de eventos de suscripción que se publicaron con éxito.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.subscribe_client_error.sum** <br>(count) | Suma de suscripciones rechazadas por AWS AppSync debido a errores del lado del cliente. Esto puede ocurrir cuando una carga útil JSON es incorrecta, el servicio está limitado o los ajustes de autorización están mal configurados.<br>_Se muestra como error_ |
| **aws.appsync.subscribe_server_error.sum** <br>(count) | Suma de errores que se originaron en AWS AppSync al procesar suscripciones. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.subscribe_success.sum** <br>(count) | Suma de suscripciones que se registraron con éxito en AWS AppSync a través de WebSocket. Es posible tener conexiones sin suscripciones, pero no es posible tener suscripciones sin conexiones.<br>_Se muestra como realizado con éxito_ |
| **aws.appsync.unsubscribe_client_error.sum** <br>(count) | Suma de desuscripciones rechazadas por AWS AppSync debido a errores del lado del cliente.<br>_Se muestra como error_ |
| **aws.appsync.unsubscribe_server_error.sum** <br>(count) | Suma de errores que se originaron en AWS AppSync al procesar desuscripciones. Se sabe que esto ocurre cuando se produce un problema inesperado del lado del servidor.<br>_Se muestra como error_ |
| **aws.appsync.unsubscribe_success.sum** <br>(count) | Suma de desuscripciones que se procesaron con éxito desde AWS AppSync.<br>_Se muestra como realizado con éxito_ |

### Eventos

La integración de AWS AppSync no incluye eventos.

### Checks de servicio

La integración de AWS AppSync no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).