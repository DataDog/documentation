---
aliases:
- /es/integrations/amazon_elb
app_id: amazon-elb
categories:
- aws
- métricas
- nube
custom_kind: integración
description: Amazon ELB distribuye automáticamente el tráfico entre varias instancias
  EC2.
media: []
title: Equilibrio de carga de Amazon Elastic
---
## Información general

Amazon Elastic Load Balancing distribuye automáticamente el tráfico entrante de las aplicaciones entre varias instancias de Amazon EC2 en la nube.

Datadog recopila métricas y metadatos de los tres tipos de Equilibradores de carga Elastic que ofrece AWS: Application (ALB), Classic (ELB) y Network Load Balancers (NLB).

Habilita esta integración para ver en Datadog todas tus métricas de Equilibrio de carga Elastic.

Nota: Esta integración requiere que los permisos 'ec2:describe*\*' y 'elasticloadbalancing:describe\*' estén completamente habilitados.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `ApplicationELB`, `ELB` y `NetworkELB` están habilitados en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon ELB](https://app.datadoghq.com/integrations/amazon-elb).

### Recopilación de logs

#### Habilitar el registro de Amazon ELB o ALB

Habilita primero la generación de logs en tu ELB o ALB para recopilar logs. Los logs de ALB y ELB pueden escribirse en un bucket de Amazon S3 y [ser consumidos por una función Lambda](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function). Para obtener más información, consulta [Habilitar logs de acceso para tu equilibrador de carga clásico](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html).

![amazon elb log enable](images/aws_elb_log_enable.png)

Configura el intervalo en 5 minutos y define tu bucket de S3 y el prefijo. Para evitar tener una [configuración de notificación de eventos de S3 definida de forma ambigua](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-s3-event-configuration-error/), asegúrate de utilizar una **ubicación única** que no se superponga con la ubicación de logs de ningún otro equilibrador de carga. Cuando varios equilibradores de carga generan logs en el mismo bucket, asegúrate de utilizar un **prefijo único**, como `my-bucket-for-elb-logs/my-elb-name`, para que sus logs se almacenen en ubicaciones separadas.

![amazon elb log configuration](images/aws_elb_configure_log.png)

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/) en tu cuenta de AWS.
1. Una vez configurado, ve a la función Lambda del Datadog Forwarder. Configura tus activadores [automáticamente](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers) o [manualmente](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets) en el bucket de S3 que contiene tus logs de ELB. Para la configuración manual, utiliza el tipo de evento `All object create events`.
1. Utiliza el [Explorador de logs](https://app.datadoghq.com/logs) para explorar tus logs.

Para obtener más información sobre la recopilación de logs de servicios de AWS, consulta [Enviar logs de servicios de AWS con la función Lambda de Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.applicationelb.active_connection_count** <br>(count) | Número total de conexiones TCP simultáneas activas desde los clientes al equilibrador de carga y desde este a los destinos.<br>_Se muestra como conexión_ |
| **aws.applicationelb.client_tlsnegotiation_error_count** <br>(count) | Número de errores de negociación TLS<br>_Se muestra como error_ |
| **aws.applicationelb.consumed_lcus** <br>(gauge) | Número de unidades de capacidad del equilibrador de carga (LCU) utilizadas por tu equilibrador de carga.<br>_Se muestra como unidad_ |
| **aws.applicationelb.grpc_request_count** <br>(count) | Número de solicitudes gRPC procesadas a través de IPv4 e IPv6.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.healthy_host_count** <br>(gauge) | Número medio de instancias sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.applicationelb.healthy_host_count.maximum** <br>(gauge) | Número máximo de instancias sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.applicationelb.healthy_host_count.minimum** <br>(gauge) | Número mínimo de instancias sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.applicationelb.healthy_host_count_deduped** <br>(count) | Número de instancias sanas por zona de disponibilidad, independientemente de si la opción de balanceo de carga entre zonas está activada o no.<br>_Se muestra como host_ |
| **aws.applicationelb.ipv_6processed_bytes** <br>(count) | Número total de bytes procesados por el equilibrador de carga a través de IPv6.<br>_Se muestra como bytes_ |
| **aws.applicationelb.ipv_6request_count** <br>(count) | Número de solicitudes IPv6 recibidas por el equilibrador de carga.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.new_connection_count** <br>(count) | Número total de nuevas conexiones TCP establecidas desde los clientes al equilibrador de carga y desde este a los destinos.<br>_Se muestra como conexión_ |
| **aws.applicationelb.processed_bytes** <br>(count) | Número total de bytes procesados por el equilibrador de carga a través de IPv4 e IPv6.<br>_Se muestra como bytes_ |
| **aws.applicationelb.rejected_connection_count** <br>(count) | Número de conexiones rechazadas debido a que el equilibrador de carga ha alcanzado su número máximo de conexiones.<br>_Se muestra como conexión_ |
| **aws.applicationelb.request_count** <br>(count) | Número total de solicitudes completadas que fueron recibidas y enrutadas a las instancias registradas. No incluye HTTP 460, HTTP 400 y algunos tipos de HTTP 503 y 500.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.request_count_per_target** <br>(count) | Número medio de solicitudes recibidas por cada objetivo en un grupo de destino.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.reserved_lcus** <br>(count) | Número de unidades de capacidad del equilibrador de carga (LCU) reservadas para el equilibrador de carga mediante LCU Reservation.<br>_Se muestra como unidad_ |
| **aws.applicationelb.rule_evaluations** <br>(count) | Número de reglas procesadas por el equilibrador de carga dada una tasa de solicitudes promediada durante una hora.|
| **aws.applicationelb.target_connection_error_count** <br>(count) | Número de conexiones que no se han establecido correctamente entre el equilibrador de carga y las instancias registradas.<br>_LCU Reservation como error_ |
| **aws.applicationelb.target_response_time.average** <br>(gauge) | Tiempo medio transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta.<br>_Se muestra como segundos_ |
| **aws.applicationelb.target_response_time.maximum** <br>(gauge) | Tiempo máximo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta.<br>_Se muestra como segundos_ |
| **aws.applicationelb.target_response_time.p50** <br>(gauge) | Percentil 50 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta.<br>_Se muestra como segundos_ |
| **aws.applicationelb.target_response_time.p90** <br>(gauge) | Percentil 90 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta.<br>_Se muestra como segundos_ |
| **aws.applicationelb.target_response_time.p95** <br>(gauge) | Percentil 95 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta.<br>_Se muestra como segundos_ |
| **aws.applicationelb.target_response_time.p99** <br>(gauge) | Percentil 99 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta.<br>_Se muestra como segundos_ |
| **aws.applicationelb.un_healthy_host_count** <br>(gauge) | Número medio de instancias no sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.applicationelb.un_healthy_host_count.maximum** <br>(gauge) | Número máximo de instancias no sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.applicationelb.un_healthy_host_count.minimum** <br>(gauge) | Número mínimo de instancias no sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.applicationelb.un_healthy_host_count_deduped** <br>(count) | Número de instancias no sanas por zona de disponibilidad, independientemente de si la opción de equilibrio de carga entre zonas está activada o no.<br>_Se muestra como host_ |
| **aws.elb.backend_connection_errors** <br>(rate) | Número de conexiones que no se han establecido correctamente entre el equilibrador de carga y las instancias registradas.<br>_Se muestra como error_ |
| **aws.elb.estimated_albactive_connection_count** <br>(count) | Número total estimado de conexiones TCP simultáneas activas desde los clientes al equilibrador de carga y desde este a los destinos.<br>_Se muestra como conexión_ |
| **aws.elb.estimated_albconsumed_lcus** <br>(gauge) | Número total estimado de unidades de capacidad del equilibrador de carga (LCU) utilizadas por un equilibrador de carga de aplicación.<br>_Se muestra como unidad_ |
| **aws.elb.estimated_albnew_connection_count** <br>(count) | Número total estimado de nuevas conexiones TCP establecidas desde los clientes al equilibrador de carga y desde este a los objetivos<br>_equilibrador  como conexión_ |
| **aws.elb.estimated_processed_bytes** <br>(count) | Número total estimado de bytes procesados por un equilibrador de carga de aplicación.<br>_Se muestra como bytes_ |
| **aws.elb.healthy_host_count** <br>(gauge) | Número medio de instancias sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.elb.healthy_host_count.maximum** <br>(gauge) | Número máximo de instancias sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.elb.healthy_host_count.minimum** <br>(gauge) | Número mínimo de instancias sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.elb.healthy_host_count_deduped** <br>(gauge) | Número de instancias sanas por zona de disponibilidad, independientemente de si la opción de equilibrio de carga entre zonas está activada o no.<br>_Se muestra como host_ |
| **aws.elb.httpcode_backend_2xx** <br>(rate) | Número de códigos de respuesta HTTP 2XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_backend_3xx** <br>(rate) | Número de códigos de respuesta HTTP 3XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_backend_4xx** <br>(rate) | Número de códigos de respuesta HTTP 4XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_backend_5xx** <br>(rate) | Número de códigos de respuesta HTTP 5XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_elb_4xx** <br>(rate) | Número de códigos de error de cliente HTTP 4XX generados por el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_elb_5_0_0** <br>(count) | Número de códigos de error HTTP 500 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_elb_5_0_2** <br>(count) | Número de códigos de error HTTP 502 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_elb_5_0_3** <br>(count) | Número de códigos de error HTTP 503 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_elb_5_0_4** <br>(count) | Número de códigos de error HTTP 504 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_elb_5xx** <br>(rate) | Número de códigos de error de cliente HTTP 5XX generados por el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.elb.latency** <br>(gauge) | Tiempo medio transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. (ELB v1)<br>_Se muestra como segundos_ |
| **aws.elb.latency.maximum** <br>(gauge) | Tiempo máximo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. (ELB v1)<br>_Se muestra como segundos_ |
| **aws.elb.latency.minimum** <br>(gauge) | Tiempo mínimo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. (ELB v1)<br>_Se muestra como segundos_ |
| **aws.elb.latency.p95** <br>(gauge) | Percentil 95 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. (ELB v1)<br>_Se muestra como segundos_ |
| **aws.elb.latency.p99** <br>(gauge) | Percentil 99 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. (ELB v1)<br>_Se muestra como segundos_ |
| **aws.elb.request_count** <br>(rate) | Número total de solicitudes completadas que se han recibido y enviado a instancias registradas.<br>_Se muestra como solicitud_ |
| **aws.elb.spillover_count** <br>(rate) | Número total de solicitudes rechazadas debido a que la cola estaba llena.<br>_Se muestra como solicitud_ |
| **aws.elb.spillover_count.maximum** <br>(rate) | Número máximo de solicitudes rechazadas debido a que la cola estaba llena.<br>_Se muestra como solicitud_ |
| **aws.elb.surge_queue_length** <br>(gauge) | Número máximo de solicitudes pendientes de envío a una instancia registrada.<br>_Se muestra como solicitud_ |
| **aws.elb.un_healthy_host_count** <br>(gauge) | Número medio de instancias no sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.elb.un_healthy_host_count.maximum** <br>(gauge) | Número máximo de instancias no sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.elb.un_healthy_host_count.minimum** <br>(gauge) | Número mínimo de instancias no sanas en cada zona de disponibilidad.<br>_Se muestra como host_ |
| **aws.elb.un_healthy_host_count_deduped** <br>(gauge) | Número de instancias no sanas por zona de disponibilidad, independientemente de si la opción de equilibrio de carga entre zonas está activada o no.<br>_Se muestra como host_ |
| **aws.networkelb.active_flow_count** <br>(gauge) | Número medio de conexiones activas establecidas desde clientes a destinos<br>_Se muestra como conexión_ |
| **aws.networkelb.active_flow_count.maximum** <br>(gauge) | Número máximo de conexiones activas establecidas desde clientes a destinos<br>_Se muestra como conexión_ |
| **aws.networkelb.active_flow_count.minimum** <br>(gauge) | Número mínimo de conexiones activas establecidas desde clientes a destinos<br>_Se muestra como conexión_ |
| **aws.networkelb.active_flow_count_tcp** <br>(count) | Número medio de flujos (o conexiones) TCP simultáneos desde clientes a destinos.<br>_Se muestra como conexión_ |
| **aws.networkelb.active_flow_count_tls** <br>(count) | Número medio de flujos (o conexiones) TLS simultáneos desde clientes a destinos.<br>_Se muestra como conexión_ |
| **aws.networkelb.active_flow_count_udp** <br>(count) | Número medio de flujos (o conexiones) UDP simultáneos desde clientes a destinos.<br>_Se muestra como conexión_ |
| **aws.networkelb.client_tlsnegotiation_error_count** <br>(count) | Número total de handshakes TLS que han fallado durante la negociación entre un cliente y un receptor TLS.<br>_Se muestra como error_ |
| **aws.networkelb.consumed_lcus** <br>(count) | Número de LCU utilizadas por el equilibrador de carga.<br>_Se muestra como unidad_ |
| **aws.networkelb.consumed_lcus_tcp** <br>(count) | Número de LCU utilizadas por el equilibrador de carga para TCP.<br>_Se muestra como unidad_ |
| **aws.networkelb.consumed_lcus_tls** <br>(count) | Número de LCU utilizadas por el equilibrador de carga para TLS.<br>_Se muestra como unidad_ |
| **aws.networkelb.consumed_lcus_udp** <br>(count) | Número de LCU utilizadas por el equilibrador de carga para UDP.<br>_Se muestra como unidad_ |
| **aws.networkelb.healthy_host_count** <br>(gauge) | Número medio de destinos sanos<br>_Se muestra como host_ |
| **aws.networkelb.healthy_host_count.maximum** <br>(gauge) | Número máximo de destinos sanos<br>_Se muestra como host_ |
| **aws.networkelb.healthy_host_count.minimum** <br>(gauge) | Número mínimo de destinos sanos<br>_Se muestra como host_ |
| **aws.networkelb.new_flow_count** <br>(count) | Número de nuevas conexiones TCP de clientes a destinos<br>_Se muestra como conexión_ |
| **aws.networkelb.new_flow_count_tcp** <br>(count) | Número total de nuevos flujos (o conexiones) TCP establecidos desde clientes a destinos en el periodo de tiempo.<br>_Se muestra como conexión_ |
| **aws.networkelb.new_flow_count_tls** <br>(count) | Número total de nuevos flujos (o conexiones) TLS establecidos desde clientes a destinos en el periodo de tiempo.<br>_Se muestra como conexión_ |
| **aws.networkelb.new_flow_count_udp** <br>(count) | Número total de nuevos flujos (o conexiones) UDP establecidos desde clientes a destinos en el periodo de tiempo.<br>_Se muestra como conexión_ |
| **aws.networkelb.peak_packets_per_second** <br>(gauge) | Tasa media más alta de paquetes de las seis ventanas de medición de 10 segundos en el periodo de tiempo.<br>_Se muestra como paquete_ |
| **aws.networkelb.port_allocation_error_count** <br>(count) | Número total de errores de asignación de puertos efímeros durante una operación de traducción de IP de cliente.<br>_Se muestra como error_ |
| **aws.networkelb.processed_bytes** <br>(count) | Número total de bytes procesados por el equilibrador de carga, incluidas las cabeceras TCP/IP.<br>_Se muestra como bytes_ |
| **aws.networkelb.processed_bytes_tcp** <br>(count) | Número total de bytes procesados por receptores TCP.<br>_Se muestra como bytes_ |
| **aws.networkelb.processed_bytes_tls** <br>(count) | Número total de bytes procesados por receptores TLS.<br>_Se muestra como bytes_ |
| **aws.networkelb.processed_bytes_udp** <br>(count) | Número total de bytes procesados por receptores UDP.<br>_Se muestra como bytes_ |
| **aws.networkelb.processed_packets** <br>(count) | Número total de paquetes procesados por el equilibrador de carga.<br>_Se muestra como paquete_ |
| **aws.networkelb.reserved_lcus** <br>(count) | Número de unidades de capacidad del equilibrador de carga (LCU) reservadas para el equilibrador de carga mediante LCU Reservation.<br>_Se muestra como unidad_ |
| **aws.networkelb.target_tlsnegotiation_error_count** <br>(count) | Número total de handshakes TLS que han fallado durante la negociación entre un receptor TLS y un destino.<br>_Se muestra como error_ |
| **aws.networkelb.tcpclient_reset_count** <br>(count) | Número de paquetes de reinicio (RST) creados por un cliente y enviados a un destino<br>_Se muestra como paquete_ |
| **aws.networkelb.tcpelbreset_count** <br>(count) | Número de paquetes de reinicio (RST) creados por un equilibrador de carga<br>_Se muestra como paquete_. |
| **aws.networkelb.tcptarget_reset_count** <br>(count) | Número de paquetes de reinicio (RST) creados por un destino y enviados a un cliente<br>_Se muestra como paquete_ |
| **aws.networkelb.un_healthy_host_count** <br>(gauge) | Número medio de destinos no saludables<br>_Se muestra como host_ |
| **aws.networkelb.un_healthy_host_count.maximum** <br>(gauge) | Número máximo de destinos no saludables<br>_Se muestra como host_ |
| **aws.networkelb.un_healthy_host_count.minimum** <br>(gauge) | Número mínimo de destinos no saludables<br>_Se muestra como host_ |
| **aws.applicationelb.desync_mitigation_mode_non_compliant_request** <br>(count) | Número de solicitudes que no cumplen con RFC 7230.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.elb_auth_error** <br>(count) | Número de autenticaciones de usuarios que no se han podido completar debido a un error de configuración de una acción de autenticación, a que el equilibrador de carga no ha podido establecer una conexión con el IdP o que el equilibrador de carga no ha podido completar el flujo de autenticación debido a un error interno.<br>_Se muestra como error_ |
| **aws.applicationelb.elb_auth_failure** <br>(count) | Número de autenticaciones de usuario que no se han podido completar debido a que el IdP ha denegado el acceso al usuario o a que se ha utilizado un código de autorización más de una vez.<br>_Se muestra como error_ |
| **aws.applicationelb.elb_auth_latency** <br>(gauge) | Tiempo transcurrido, en milisegundos, para consultar al IdP el token de ID y la información de usuario. Si una o varias de estas operaciones fallan, este es el tiempo transcurrido hasta el fallo.<br>_Se muestra como milisegundos_ |
| **aws.applicationelb.elb_auth_refresh_token_success** <br>(count) | Número de veces que el equilibrador de carga ha actualizado correctamente afirmaciones de usuarios utilizando un token de actualización proporcionado por el IdP.<br>_Se muestra como realizado con éxito_ |
| **aws.applicationelb.elb_auth_success** <br>(count) | Número de acciones de autenticación exitosas.<br>_Se muestra como realizado con éxito_ |
| **aws.applicationelb.elb_authuser_claims_size_exceeded** <br>(count) | Número de veces que un IdP configurado ha devuelto afirmaciones de usuario que superaban los 11K bytes de tamaño.|
| **aws.applicationelb.httpcode_elb_3xx** <br>(count) | Número de códigos de redirección HTTP 3XX que se originan en el equilibrador de carga.<br>__Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_elb_4xx** <br>(count) | Número de códigos de error de cliente HTTP 4XX generados por el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_elb_5_0_0** <br>(count) | Número de códigos de error HTTP 500 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_elb_5_0_2** <br>(count) | Número de códigos de error HTTP 502 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_elb_5_0_3** <br>(count) | Número de códigos de error HTTP 503 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_elb_5_0_4** <br>(count) | Número de códigos de error HTTP 504 que se originan en el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_elb_5xx** <br>(count) | Número de códigos de error de cliente HTTP 5XX generados por el equilibrador de carga.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_redirect** <br>(count) | Número de acciones de redirección exitosas.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_target_2xx** <br>(count) | Número de códigos de respuesta HTTP 2XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_target_3xx** <br>(count) | Número de códigos de respuesta HTTP 3XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_target_4xx** <br>(count) | Número de códigos de respuesta HTTP 4XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpcode_target_5xx** <br>(count) | Número de códigos de respuesta HTTP 5XX generados por instancias registradas.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpfixed_response** <br>(count) | Número de acciones de respuesta fija exitosas.<br>_Se muestra como respuesta_ |
| **aws.applicationelb.httpredirect** <br>(count) | Número de acciones de redireccionamiento exitosas.|
| **aws.applicationelb.httpredirect_url_limit_exceeded** <br>(count) | Número de acciones de redirección que no se han podido completar debido a que la URL de la cabecera de ubicación de la respuesta es superior a 8K.|
| **aws.applicationelb.lambda_internal_error** <br>(count) | Número de solicitudes a una función Lambda que han fallado debido a un problema interno del equilibrador de carga o AWS Lambda.<br>_Se muestra como sollicitud_ |
| **aws.applicationelb.lambda_target_processed_bytes** <br>(gauge) | Número total de bytes procesados por el equilibrador de carga para solicitudes y respuestas de una función Lambda.<br>_Se muestra como bytes_ |
| **aws.applicationelb.lambda_user_error** <br>(count) | Número de peticiones a una función Lambda que han fallado debido a un problema con la función Lambda.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.non_sticky_request_count** <br>(count) | Número de solicitudes en las que el equilibrador de carga ha elegido un nuevo destino debido a que no ha podido utilizar una sesión fija existente.<br>_Se muestra como solicitud_ |
| **aws.applicationelb.target_tlsnegotiation_error_count** <br>(count) | Número de conexiones TLS iniciadas por el equilibrador de carga que no han establecido una sesión con el destino.<br>_Se muestra como conexión_ |
| **aws.elb.active_connection_count** <br>(count) | Número total de conexiones TCP simultáneas activas desde los clientes al equilibrador de carga y desde este a los destinos.<br>_Se muestra como conexión_ |
| **aws.elb.client_tlsnegotiation_error_count** <br>(count) | Número de errores de negociación TLS<br>_Se muestra como error_ |
| **aws.elb.consumed_lbcapacity_units** <br>(gauge) | Número de unidades de capacidad ELB consumidas.<br>_Se muestra como unidad_ |
| **aws.elb.consumed_lcus** <br>(gauge) | Número de unidades de capacidad del equilibrador de carga (LCU) utilizadas por tu equilibrador de carga.<br>_Se muestra como unidad_ |
| **aws.elb.httpcode_redirect** <br>(count) | Número de acciones de redirección exitosas.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_target_2xx** <br>(count) | Número de códigos de respuesta HTTP 2XX generados por los destinos.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_target_3xx** <br>(count) | Número de códigos de respuesta HTTP 3XX generados por los destinos.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_target_4xx** <br>(count) | Número de códigos de respuesta HTTP 4XX generados por los destinos.<br>_Se muestra como respuesta_ |
| **aws.elb.httpcode_target_5xx** <br>(count) | Número de códigos de respuesta HTTP 5XX generados por los destinos.<br>_Se muestra como respuesta_ |
| **aws.elb.ipv_6processed_bytes** <br>(count) | Número total de bytes procesados por el equilibrador de carga a través de IPv6.<br>_Se muestra como bytes_ |
| **aws.elb.ipv_6request_count** <br>(count) | Número de solicitudes IPv6 recibidas por el equilibrador de carga.<br>_Se muestra como solicitud_ |
| **aws.elb.new_connection_count** <br>(count) | Número total de nuevas conexiones TCP establecidas desde los clientes al equilibrador de carga y desde este a los destinos.<br>_Se muestra como conexión_ |
| **aws.elb.processed_bytes** <br>(count) | Número total de bytes procesados por el equilibrador de carga a través de IPv4 e IPv6.<br>_Se muestra como bytes_ |
| **aws.elb.request_count_per_target** <br>(count) | Número medio de solicitudes recibidas por cada objetivo en un grupo de destino.<br>_Se muestra como solicitud_ |
| **aws.elb.rule_evaluations** <br>(count) | Número de reglas procesadas por el equilibrador de carga dada una tasa de solicitudes promediada durante una hora.|
| **aws.elb.target_connection_error_count** <br>(count) | Número de conexiones que no se han establecido correctamente entre el equilibrador de carga y las instancias registradas.<br>_Se muestra como error_ |
| **aws.elb.target_response_time.average** <br>(gauge) | Tiempo medio transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. Idéntico a `aws.applicationelb.target_response_time.average`.<br>_Se muestra como segundos_ |
| **aws.elb.target_response_time.maximum** <br>(gauge) | Tiempo máximo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. Idéntico a `aws.applicationelb.target_response_time.maximum`.<br>_Se muestra como segundos_ |
| **aws.elb.target_response_time.p95** <br>(gauge) | Percentil 95 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. Idéntico a `aws.applicationelb.target_response_time.p95`.<br>_Se muestra como segundos_ |
| **aws.elb.target_response_time.p99** <br>(gauge) | Percentil 99 del tiempo transcurrido desde que la solicitud abandona el equilibrador de carga hasta que se recibe una respuesta. Idéntico a `aws.applicationelb.target_response_time.p99`.<br>_Se muestra como segundos_ |

### Eventos

La integración de Equilibrio de carga Amazon Elastic no incluye eventos.

### Checks de servicio

La integración de Equilibrio de carga Amazon Elastic no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).