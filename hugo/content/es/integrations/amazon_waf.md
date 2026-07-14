---
aliases:
- /es/integrations/awswaf/
app_id: amazon_waf
categories:
- cloud
- security
- aws
- log collection
custom_kind: integración
description: Realiza un seguimiento de las solicitudes autorizadas frente a las bloqueadas.
further_reading:
- link: https://www.datadoghq.com/blog/aws-waf-metrics/
  tag: Blog
  text: Métricas clave para monitorizar AWS WAF
- link: https://www.datadoghq.com/blog/aws-waf-monitoring-tools/
  tag: Blog
  text: Herramientas para la recopilación de datos AWS WAF
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: Blog
  text: Monitorización de actividades WAF de AWS con Datadog
title: AWS WAF
---
## Información general

AWS WAF es un cortafuegos de aplicaciones web que te ayuda a proteger tus aplicaciones web de los exploits web más comunes.

Habilita esta integración para ver tus métricas WAF en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `WAF` o `WAFV2` está habilitado en la pestaña `Metric Collection`, dependiendo del endpoint que utilices.

1. Instala la integración [Datadog - AWS WAF](https://app.datadoghq.com/integrations/amazon-waf).

### Recopilación de logs

Para obtener información detallada sobre el tráfico analizado de tu lista de control de acceso (ACL) web, habilita los logs de auditoría de Web Application Firewall:

#### WAF

1. Crea un `Amazon Data Firehose` con un nombre que empiece por `aws-waf-logs-`.
1. En el destino `Amazon Data Firehose`, elige `Amazon S3` y asegúrate de añadir `waf` como prefijo.
1. Selecciona la ACL web deseada y configúrala para que envíe logs al Firehose ([pasos detallados steps](https://docs.aws.amazon.com/waf/latest/developerguide/classic-logging.html)) recientemente creado.

#### WAFV2

1. Crea un `S3 bucket` con un nombre que empiece por `aws-waf-logs-`.
1. Configura el destino de los logs para el bucket de Amazon S3 ([pasos detallados](https://docs.aws.amazon.com/waf/latest/developerguide/logging.html)).

Los logs WAF/WAFV2 se recopilan y se envían al bucket de S3 especificado.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).
1. Una vez instalada la función Lambda, añade manualmente un activador en el bucket de S3 que contiene tus logs WAF, en la consola de AWS. En tu función Lambda, haz clic en S3 en la lista de activadores.
1. Para configurar tu activador, elige el bucket de S3 que contiene tus logs WAF y cambia el tipo evento a `Object Created (All)`.
1. Haz clic en **Add** (Añadir).

**Notas**:

- La función Lambda del Datadog Forwarder transforma automáticamente las matrices de objetos anidados en logs WAF a un formato `key:value` para facilitar su uso.
- Si aparece un mensaje de error que indica que "Las configuraciones del mismo bucket no pueden compartir un tipo evento común", asegúrate de que el bucket no tiene otra notificación de evento vinculada a otro forwarder Lambda. Tu bucket de S3 no puede tener varias instancias de `All object create events`. 

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.waf.allowed_requests** <br>(count) | Número de solicitudes web autorizadas.<br>_Se muestra como solicitud_ |
| **aws.waf.blocked_requests** <br>(count) | Número de solicitudes web bloqueadas.<br>_Se muestra como solicitud_ |
| **aws.waf.counted_requests** <br>(count) | Número de solicitudes web contadas.<br>_Se muestra como solicitud_ |
| **aws.waf.passed_requests** <br>(count) | Número de solicitudes web pasadas.<br>_Se muestra como solicitud_ |
| **aws.wafv2.allow_rule_match** <br>(count) | Número de reglas coincidentes que finalizaron la evaluación de la solicitud con una acción Permitir.|
| **aws.wafv2.allowed_requests** <br>(count) | Número de solicitudes web autorizadas.<br>_Se muestra como solicitud_ |
| **aws.wafv2.block_rule_match** <br>(count) | Número de reglas coincidentes que finalizaron la evaluación de la solicitud con una acción Bloquear.|
| **aws.wafv2.blocked_requests** <br>(count) | Número de solicitudes web bloqueadas.<br>_Se muestra como solicitud_ |
| **aws.wafv2.captcha_requests** <br>(count) | Número de solicitudes web a las que se han aplicado controles CAPTCHA.<br>_Se muestra como solicitud_ |
| **aws.wafv2.captcha_rule_match** <br>(count) | Número de reglas coincidentes que finalizaron la evaluación de la solicitud con una acción CAPTCHA.|
| **aws.wafv2.captcha_rule_match_with_valid_token** <br>(count) | Número de reglas coincidentes que aplicaron una acción CAPTCHA no terminante.|
| **aws.wafv2.captchas_attempted** <br>(count) | Número de soluciones enviadas por un usuario final en respuesta a un rompecabezas CAPTCHA.|
| **aws.wafv2.captchas_attempted_sdk** <br>(count) | Número de soluciones enviadas por un usuario final en respuesta a un rompecabezas CAPTCHA, para los desafíos proporcionados a través de la API JavaScript CAPTCHA.|
| **aws.wafv2.captchas_solved** <br>(count) | Número de soluciones a rompecabezas CAPTCHA enviadas que resolvieron correctamente el desafío.|
| **aws.wafv2.captchas_solved_sdk** <br>(count) | Número de soluciones a rompecabezas CAPTCHA enviadas que resolvieron correctamente el desafío, para los desafíos proporcionados a través de la API CAPTCHA JavaScript.|
| **aws.wafv2.challenge_requests** <br>(count) | Número de solicitudes web a las que se han aplicado controles de autenticación.<br>_Se muestra como solicitud_ |
| **aws.wafv2.challenge_rule_match** <br>(count) | Número de reglas coincidentes que finalizaron la evaluación de la solicitud con una acción Autenticación.|
| **aws.wafv2.challenge_rule_match_with_valid_token** <br>(count) | Número de reglas coincidentes que aplicaron una acción Autenticación no terminante.|
| **aws.wafv2.count_rule_match** <br>(count) | Número de reglas coincidentes que aplicaron una acción Recuento no terminante.|
| **aws.wafv2.counted_requests** <br>(count) | Número de solicitudes web contadas.<br>_Se muestra como solicitud_ |
| **aws.wafv2.days_to_expiry** <br>(gauge) | Número de días que faltan para la fecha de caducidad del grupo de reglas gestionadas y la versión asociados.<br>_Se muestra como día_ |
| **aws.wafv2.passed_requests** <br>(count) | Número de peticiones web pasadas.<br>_Se muestra como solicitud_ |
| **aws.wafv2.requests_with_valid_captcha_token** <br>(count) | Número de solicitudes web a las que se han aplicado controles CAPTCHA y que tenían un token CAPTCHA válido.<br>_Se muestra como solicitud_ |
| **aws.wafv2.requests_with_valid_challenge_token** <br>(count) | Número de solicitudes web a las que se han aplicado controles de autenticación y que tenían un token de autenticación válido.<br>_Se muestra como solicitud_ |
| **aws.wafv2.sample_allowed_request** <br>(count) | Número de solicitudes muestreadas que el grupo de reglas gestionado por Bot Control autorizaría.<br>_Se muestra como solicitud_ |
| **aws.wafv2.sample_blocked_request** <br>(count) | Número de solicitudes muestreadas que el grupo de reglas gestionado por Bot Control bloquearía.<br>_Se muestra como solicitud_ |
| **aws.wafv2.sample_captcha_request** <br>(count) | Número de solicitudes muestreadas a las que el grupo de reglas gestionado por Bot Control respondería con un CAPTCHA.<br>_Se muestra como solicitud_ |
| **aws.wafv2.sample_challenge_request** <br>(count) | Número de solicitudes muestreadas a las que el grupo de reglas gestionado por Bot Control respondería con una autenticación.<br>_Se muestra como solicitud_ |
| **aws.wafv2.sample_count_request** <br>(count) | Número de solicitudes muestreadas a las que el grupo de reglas gestionado por Bot Control aplicaría una acción Recuento.<br>_Se muestra como solicitud_ |

**Nota**: Tanto `aws.waf.*` como `waf.*` métricas se indican debido al formato histórico de las API de CloudWatch métrica para WAF.

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de AWS WAF no incluye eventos.

### Checks de servicio

La integración de AWS WAF no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).