---
app_id: amazon_rds_proxy
categories:
- aws
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon RDS Proxy.
title: Amazon RDS Proxy
---
## Información general

Amazon RDS Proxy es un proxy de base de datos totalmente gestionado de alta disponibilidad para Amazon Relational Database Service (RDS) que hace que las aplicaciones sean más escalables, más resistentes a los fallos de la base de datos y más seguras.

Habilita esta integración para ver todas tus métricas de RDS Proxy en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).
También es necesario habilitar la [integración de Amazon RDS](https://docs.datadoghq.com/integrations/amazon_rds/).

### Recopilación de métricas

1. En la [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `RDS Proxy` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon RDS Proxy](https://app.datadoghq.com/integrations/amazon-rds-proxy).

### Recopilación de logs

#### Activar logging

Al crear un RDS Proxy, se puede habilitar el registro en la configuración avanzada. Sigue las instrucciones de [Primeros pasos con RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-setup.html#rds-proxy-creating) para empezar a enviar los logs de tu RDS Proxy a Cloudwatch.

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de AWS Lambda de recopilación de logs de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#log-collection).
1. Una vez instalada la función de Lambda, añade manualmente un activador en el grupo de logs de CloudWatch que contenga tus logs de RDS Proxy. Selecciona el grupo de logs de CloudWatch correspondiente, añade un nombre de filtro (opcional) y añade el activador.

Una vez hecho esto, ve a [Datadog Log Explorer](https://app.datadoghq.com/logs) para analizar tus logs.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.rds.proxy.availability_percentage** <br>(gauge) | Porcentaje de tiempo durante el cual el grupo objetivo estuvo disponible en su rol.<br>_Se muestra como porcentaje_ |
| **aws.rds.proxy.client_connections** <br>(gauge) | El número actual de conexiones de cliente.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.client_connections_closed** <br>(gauge) | Número de conexiones de cliente cerradas.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.client_connections_no_tls** <br>(gauge) | El número actual de conexiones de cliente sin Transport Layer Security (TLS).<br>_Se muestra como conexión_ |
| **aws.rds.proxy.client_connections_received** <br>(gauge) | Número de solicitudes de conexión de cliente recibidas.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.client_connections_setup_failed_auth** <br>(gauge) | Número de intentos fallidos de conexión de cliente.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.client_connections_setup_succeeded** <br>(gauge) | Número de conexiones de cliente establecidas con éxito.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.client_connections_tls** <br>(gauge) | El número actual de conexiones de cliente con TLS.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connection_requests** <br>(gauge) | El número de solicitudes para crear una conexión de base de datos.<br>_Se muestra como solicitud_ |
| **aws.rds.proxy.database_connection_requests_with_tls** <br>(gauge) | El número de solicitudes para crear una conexión de base de datos con TLS.<br>_Se muestra como solicitud_ |
| **aws.rds.proxy.database_connections** <br>(gauge) | El número actual de conexiones a la base de datos.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connections_borrow_latency** <br>(gauge) | El tiempo en microsegundos que tarda el proxy en obtener una conexión de base de datos.<br>_Se muestra como microsegundo_ |
| **aws.rds.proxy.database_connections_currently_borrowed** <br>(gauge) | El número actual de conexiones a bases de datos en estado de préstamo.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connections_currently_in_transaction** <br>(gauge) | El número actual de conexiones a la base de datos en una transacción.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connections_currently_session_pinned** <br>(gauge) | Número actual de conexiones a bases de datos ancladas.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connections_setup_failed** <br>(gauge) | El número de solicitudes a la conexión de base de datos que han fallado.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connections_setup_succeeded** <br>(gauge) | Número de conexiones a bases de datos establecidas con éxito.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.database_connections_with_tls** <br>(gauge) | El número actual de conexiones de base de datos con TLS.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.max_database_connections_allowed** <br>(gauge) | El número máximo de conexiones a bases de datos permitidas.<br>_Se muestra como conexión_ |
| **aws.rds.proxy.query_database_response_latency** <br>(gauge) | El tiempo en microsegundos que la base de datos tardó en responder a la consulta.<br>_Se muestra como microsegundo_ |
| **aws.rds.proxy.query_requests** <br>(gauge) | Número de consultas recibidas (una consulta que incluya varias sentencias se cuenta como una sola consulta).<br>_Se muestra como solicitud_ |
| **aws.rds.proxy.query_requests_no_tls** <br>(gauge) | Número de consultas recibidas de conexiones no TLS.<br>_Se muestra como solicitud_ |
| **aws.rds.proxy.query_requests_tls** <br>(gauge) | Número de consultas recibidas de conexiones TLS.<br>_Se muestra como solicitud_ |
| **aws.rds.proxy.query_response_latency** <br>(gauge) | El tiempo en microsegundos entre la recepción de una solicitud de consulta y la respuesta del proxy.<br>_Se muestra como microsegundo_ |

### Eventos

La integración de Amazon RDS Proxy no incluye ningún evento.

### Checks de servicio

La integración de Amazon RDS Proxy no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).