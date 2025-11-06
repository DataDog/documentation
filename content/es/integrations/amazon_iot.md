---
aliases:
- /es/integrations/awsiot/
app_id: amazon_iot
categories:
- aws
- cloud
- iot
- log collection
custom_kind: integración
description: Rastrea las métricas clave de AWS IoT Core.
title: AWS IoT Core
---
## Información general

AWS IoT Core es una plataforma gestionada en la nube que permite a los dispositivos conectados interactuar de forma fácil y segura con aplicaciones en la nube y otros dispositivos.

Habilita esta integración para ver en Datadog todas tus métricas de IOT.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `IoT` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS IoT Core](https://app.datadoghq.com/integrations/amazon-iot).

### Recopilación de logs

#### Activar logging

Configura AWS IoT Core para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_iot` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS IoT Core en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.iot.connect_auth_error** <br>(count) | AWS IoT no pudo autorizar una solicitud de conexión de un cliente en un tema MQTT.<br>_Se muestra como error_ |
| **aws.iot.connect_client_error** <br>(count) | AWS IoT rechazó una solicitud de conexión de un cliente en un tema MQTT porque el mensaje MQTT no cumplía los requisitos definidos en Límites de AWS IoT.<br>_Se muestra como error_ |
| **aws.iot.connect_client_idthrottle** <br>(count) | AWS IoT no procesó una solicitud de conexión de cliente en un tema MQTT porque el cliente superó la tasa de solicitud de conexión permitida para un ID de cliente específico.|
| **aws.iot.connect_server_error** <br>(count) | AWS IoT no ha podido procesar una solicitud de conexión de cliente en un tema MQTT porque se ha producido un error interno.<br>_Se muestra como error_ |
| **aws.iot.connect_success** <br>(count) | AWS IoT ha procesado correctamente una solicitud de conexión de cliente en un tema MQTT.|
| **aws.iot.connect_throttle** <br>(count) | AWS IoT no procesó una solicitud de conexión en un tema MQTT porque la cuenta superó la tasa de solicitud de conexión permitida.|
| **aws.iot.connection_authn_error** <br>(count) | El número de intentos de conexión que AWS IoT Core rechaza debido a fallos de autenticación.<br>_Se muestra como error_ |
| **aws.iot.credential_exchange_success** <br>(count) | Número de solicitudes AssumeRoleWithCertificate realizadas con éxito al proveedor de credenciales de AWS IoT Core.|
| **aws.iot.delete_thing_shadow_accepted** <br>(count) | AWS IoT recibió una solicitud DeleteThingShadow.<br>_Se muestra como solicitud_ |
| **aws.iot.error_action_failure** <br>(count) | Número de acciones de error fallidas.|
| **aws.iot.error_action_success** <br>(count) | Número de acciones de error realizadas con éxito.|
| **aws.iot.failure** <br>(count) | Número de invocaciones fallidas de la acción de regla.|
| **aws.iot.get_thing_shadow_accepted** <br>(count) | AWS IoT ha recibido una solicitud GetThingShadow.<br>_Se muestra como solicitud_ |
| **aws.iot.http_code_4xx** <br>(count) | Se genera si el código de estado de la respuesta del servicio web o aplicación descendente está entre 400 y 499.|
| **aws.iot.http_code_5xx** <br>(count) | Se genera si el código de estado de la respuesta del servicio web o aplicación descendente está entre 500 y 599.|
| **aws.iot.http_request_timeout** <br>(count) | Se genera si el servicio web o la aplicación no devuelve una respuesta dentro del límite de tiempo de espera de la solicitud.|
| **aws.iot.http_unknown_host** <br>(count) | Se genera si la URL es válida, pero el servicio no existe o es inalcanzable.|
| **aws.iot.list_named_shadows_for_thing_accepted** <br>(count) | AWS IoT recibió una solicitud ListNamedShadowsForThing.<br>_Se muestra como solicitud_ |
| **aws.iot.parse_error** <br>(count) | El número de errores de análisis JSON que se produjeron en los mensajes publicados en un tema en el que una regla está escuchando.|
| **aws.iot.ping_success** <br>(count) | AWS IoT recibió un mensaje ping.|
| **aws.iot.publish_in_auth_error** <br>(count) | AWS IoT no pudo autorizar una solicitud de publicación de un cliente.<br>_Se muestra como error_ |
| **aws.iot.publish_in_client_error** <br>(count) | AWS IoT rechazó una solicitud de publicación de un cliente porque el mensaje MQTT no cumplía los requisitos definidos en AWS IoT Limits.<br>_Se muestra como error_ |
| **aws.iot.publish_in_server_error** <br>(count) | AWS IoT no ha podido procesar una solicitud de publicación de un cliente porque se ha producido un error interno.<br>_Se muestra como error_ |
| **aws.iot.publish_in_success** <br>(count) | Un cliente ha publicado correctamente un mensaje MQTT.|
| **aws.iot.publish_in_throttle** <br>(count) | AWS IoT no procesó una solicitud de publicación de un cliente porque éste excedió la tasa de mensajes entrantes permitida.|
| **aws.iot.publish_out_auth_error** <br>(count) | AWS IoT no ha podido autorizar la solicitud de publicación del agente de mensajes.<br>_Se muestra como error_ |
| **aws.iot.publish_out_client_error** <br>(count) | AWS IoT rechazó la solicitud de publicación del agente de mensajes porque el mensaje MQTT no cumplía los requisitos definidos en los Límites de AWS IoT.<br>_Se muestra como error_ |
| **aws.iot.publish_out_success** <br>(count) | AWS IoT ha publicado correctamente un mensaje al cliente conectado.|
| **aws.iot.publish_out_throttle** <br>(count) | El número de solicitudes de publicación que fueron limitadas porque el cliente excedió la tasa de mensajes salientes permitida.|
| **aws.iot.publish_retained_auth_error** <br>(count) | Número de solicitudes de publicación con el indicador `retain` activado que el agente de mensajes no ha podido autorizar.|
| **aws.iot.publish_retained_success** <br>(count) | Número de solicitudes de publicación con el indicador `retain` activado que el agente de mensajes ha procesado correctamente.|
| **aws.iot.publish_retained_throttle** <br>(count) | El número de solicitudes de publicación con el indicador `retain` activado que se limitaron porque el cliente superó la tasa de mensajes entrantes permitida.|
| **aws.iot.queued_server_error** <br>(count) | Número de mensajes que no se han almacenado para una sesión persistente debido a un error interno.|
| **aws.iot.queued_success** <br>(count) | El número de mensajes almacenados que fueron procesados con éxito por el agente de mensajes para los clientes que se desconectaron de su sesión persistente.|
| **aws.iot.queued_throttle** <br>(count) | El número de mensajes que no se pudieron almacenar y se limitaron mientras se desconectaban los clientes con sesiones persistentes.|
| **aws.iot.rule_message_throttled** <br>(count) | El número de mensajes limitados por el motor de reglas debido a un comportamiento malicioso o porque el número de mensajes supera el límite del motor de reglas.|
| **aws.iot.rule_not_found** <br>(count) | El recuento de reglas que no se han podido encontrar.|
| **aws.iot.rules_executed** <br>(count) | Número de reglas de AWS IoT ejecutadas.|
| **aws.iot.subscribe_auth_error** <br>(count) | AWS IoT no pudo autorizar una solicitud de suscripción de un cliente en un tema MQTT.<br>_Se muestra como error_ |
| **aws.iot.subscribe_client_error** <br>(count) | AWS IoT rechazó una solicitud de suscripción de un cliente en un tema MQTT porque el mensaje MQTT no cumplía los requisitos definidos en los Límites de AWS IoT.<br>_Se muestra como error_ |
| **aws.iot.subscribe_server_error** <br>(count) | AWS IoT no ha podido procesar una solicitud de suscripción de cliente en un tema MQTT porque se ha producido un error interno.<br>_Se muestra como error_ |
| **aws.iot.subscribe_success** <br>(count) | AWS IoT ha procesado correctamente una solicitud de suscripción de cliente en un tema MQTT.|
| **aws.iot.subscribe_throttle** <br>(count) | AWS IoT no procesó una solicitud de suscripción de cliente en un tema MQTT porque el cliente superó la tasa de solicitud de suscripción permitida.|
| **aws.iot.success** <br>(count) | Número de invocaciones correctas de la acción de regla.|
| **aws.iot.throttle_exceeded** <br>(count) | Número de invocaciones correctas de la acción de regla.|
| **aws.iot.topic_match** <br>(count) | El número de mensajes entrantes publicados en un tema en el que una regla está escuchando.|
| **aws.iot.unsubscribe_client_error** <br>(count) | AWS IoT rechazó una solicitud de baja de un cliente en un tema MQTT porque el mensaje MQTT no cumplía los requisitos definidos en AWS IoT Limits.<br>_Se muestra como error_ |
| **aws.iot.unsubscribe_server_error** <br>(count) | AWS IoT no ha podido procesar la solicitud de baja de un cliente en un tema MQTT porque se ha producido un error interno.<br>_Se muestra como error_ |
| **aws.iot.unsubscribe_success** <br>(count) | AWS IoT ha procesado correctamente una solicitud de baja de cliente en un tema MQTT.|
| **aws.iot.unsubscribe_throttle** <br>(count) | AWS IoT no procesó una solicitud de cancelación de suscripción de un cliente en un tema MQTT porque el cliente superó la tasa de solicitudes de cancelación de suscripción permitida.|
| **aws.iot.update_thing_shadow_accepted** <br>(count) | AWS IoT recibió una solicitud UpdateThingShadow.<br>_Se muestra como solicitud_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS IoT Core no incluye ningún evento.

### Checks de servicio

La integración de AWS IoT Core no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).