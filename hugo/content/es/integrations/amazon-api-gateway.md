---
aliases:
- /es/integrations/amazon_api_gateway
app_id: amazon-api-gateway
categories:
- aws
- métricas
- nube
custom_kind: integración
description: Amazon API Gateway es un servicio administrado para API.
media: []
title: Integración de Amazon API Gateway
---
## Información general

Amazon API Gateway es un servicio totalmente gestionado que facilita a los desarrolladores la creación, la publicación, el mantenimiento, la monitorización y la protección de API a cualquier escala.

Habilita esta integración para ver todas tus métricas de API Gateway en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `API Gateway` está habilitado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para que se apliquen etiquetas personalizadas a las etapas de API Gateway:

   - `apigateway:GET`
   - `tag:GetResources`

1. Instala la integración [Datadog - Amazon API Gateway](https://app.datadoghq.com/integrations/amazon-api-gateway).

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas que aparecen en la consola de AWS, incluyendo nombre de host, grupos de seguridad, etc.

**Nota**: Si has activado métricas de CloudWatch detalladas, debes activarlas para todos los recursos y las rutas que componen una etapa. De lo contrario, los valores agregados en Datadog no serán correctos.

### Recopilación de logs

Para activar el registro de API Gateway:

1. Abre API Gateway en tu consola AWS.

1. Selecciona la API deseada.

1. En el menú desplegable **Monitor** de la pestaña de navegación de la izquierda, selecciona **Logging** (Generación de logs). Si no ves la pestaña de navegación de la izquierda, haz clic en el icono de tres puntos situado junto al hilo de Ariadna **API Gateway** en la parte superior izquierda.

1. Selecciona una etapa.

1. En la sección **Access logging** (Generación de logs de acceso), haz clic en **Edit** (Editar).

1. Activa la opción **Access logging** (Generación de logs de acceso).

1. Para el **log de destino**, asegúrate de que el nombre de tu grupo CloudWatch Log empieza por `api-gateway`.

1. Selecciona el formato JSON (también se admiten CLF y CSV) y añade lo siguiente en el cuadro **Log format** (Formato de log):

   ```text
   {
       "apiId": "$context.apiId",
       "stage": "$context.stage",
       "requestId":"$context.requestId",
       "ip":"$context.identity.sourceIp",
       "caller":"$context.identity.caller",
       "user":"$context.identity.user",
       "requestTime":$context.requestTimeEpoch,
       "httpMethod":"$context.httpMethod",
       "resourcePath":"$context.resourcePath",
       "status":$context.status,
       "protocol":"$context.protocol",
       "responseLength":$context.responseLength
   }
   ```

1. Haz clic en **Save** (Guardar).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función AWS Lambda de recopilación de logs de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function).
1. Una vez instalada la función de Lambda, añade manualmente un activador en el grupo de log de CloudWatch que contiene tus logs de API Gateway en la consola de AWS.
   Selecciona el grupo de logs CloudWatch correspondiente, ponle un nombre al filtro (y deja el filtro vacío si quieres) y añade el desencadenador.

Una vez hecho, ve a la [página de logs](https://app.datadoghq.com/logs) para empezar a explorar tus logs.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.apigateway.4xx** <br>(count) | Número de errores del lado del cliente de las API HTTP<br>_Se muestra como operación_ |
| **aws.apigateway.4xxerror** <br>(count) | Número de errores del lado del cliente de las API REST<br>_Se muestra como operación_ |
| **aws.apigateway.5xx** <br>(count) | Número de errores del lado del servidor de las API HTTP<br>_Se muestra como operación_ |
| **aws.apigateway.5xxerror** <br>(count) | Número de errores del lado del servidor de las API REST<br>_Se muestra como operación_ |
| **aws.apigateway.cache_hit_count** <br>(count) | Número de solicitudes servidas desde la caché de la API<br>_Se muestra como operación_ |
| **aws.apigateway.cache_miss_count** <br>(count) | Número de solicitudes servidas desde el backend cuando la caché de la API está activada<br>_Se muestra como operación_ |
| **aws.apigateway.client_error** <br>(count) | Número medio de solicitudes que tienen una respuesta 4XX devuelta por API Gateway antes de que se invoque la integración.<br>_Se muestra como operación_ |
| **aws.apigateway.client_error.sum** <br>(count) | Número total de solicitudes que tienen una respuesta 4XX devuelta por API Gateway antes de que se invoque la integración.<br>_Se muestra como operación_ |
| **aws.apigateway.connect_count** <br>(count) | Número medio de mensajes enviados a la integración de rutas $connect.<br>_Se muestra como operación_ |
| **aws.apigateway.connect_count.sum** <br>(count) | Número total de mensajes enviados a la integración de rutas $connect.<br>_Se muestra como operación_ |
| **aws.apigateway.count** <br>(count) | Número de llamadas a métodos de API<br>_Se muestra como operación_ |
| **aws.apigateway.execution_error** <br>(count) | Promedio de errores ocurridos al llamar a la integración.<br>_Se muestra como operación_ |
| **aws.apigateway.execution_error.sum** <br>(count) | Total de errores ocurridos al llamar a la integración.<br>_Se muestra como operación_ |
| **aws.apigateway.integration_error** <br>(count) | Número medio de solicitudes que devuelven una respuesta 4XX/5XX de la integración.<br>_Se muestra como operación_ |
| **aws.apigateway.integration_error.sum** <br>(count) | Número total de solicitudes que devuelven una respuesta 4XX/5XX de la integración.<br>_Se muestra como operación_ |
| **aws.apigateway.integration_latency** <br>(gauge) | Tiempo transcurrido entre el momento en que API Gatewayre transmite una solicitud al backend y el momento en que recibe una respuesta del backend.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.integration_latency.maximum** <br>(gauge) | Tiempo máximo entre el momento en que API Gateway retransmite una solicitud al backend y el momento en que recibe una respuesta del backend.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.integration_latency.minimum** <br>(gauge) | Tiempo mínimo entre el momento en que API Gateway retransmite una solicitud al backend y el momento en que recibe una respuesta del backend.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.integration_latency.p90** <br>(gauge) | Tiempo del percentil 90 entre el momento en que API Gateway retransmite una solicitud al backend y el momento en que recibe una respuesta del backend.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.integration_latency.p95** <br>(gauge) | Tiempo del percentil 95 entre el momento en que API Gateway retransmite una solicitud al backend y el momento en que recibe una respuesta del backend.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.integration_latency.p99** <br>(gauge) | Tiempo percentil 99 entre el momento en que API Gateway retransmite una solicitud al backend y el momento en que recibe una respuesta del backend.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency** <br>(gauge) | Tiempo transcurrido entre el momento en que API Gateway recibe una solicitud de un cliente y el momento en que devuelve una respuesta al cliente. La latencia incluye la latencia de integración y otras sobrecargas generales de API Gateway.<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.maximum** <br>(gauge) | Tiempo máximo transcurrido entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.minimum** <br>(gauge) | Tiempo mínimo transcurrido entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.p50** <br>(gauge) | Tiempo del percentil 50 entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.p75** <br>(gauge) | Tiempo del percentil 75 entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.p90** <br>(gauge) | Tiempo del percentil 90 entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.p95** <br>(gauge) | Tiempo del percentil 95 entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.latency.p99** <br>(gauge) | Tiempo del percentil 99 entre la recepción de las solicitudes y la devolución de las respuestas<br>_Se muestra como milisegundos_ |
| **aws.apigateway.message_count** <br>(count) | Número medio de mensajes enviados a la API WebSocket, desde o hacia el cliente.<br>_Se muestra como operación_ |
| **aws.apigateway.message_count.sum** <br>(count) | Número total de mensajes enviados a la API WebSocket, desde o hacia el cliente.<br>_Se muestra como operación_ |

### Eventos

La integración de Amazon API Gateway no incluye ningún evento.

### Checks de servicio

La integración de Amazon API Gateway no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).