---
aliases:
- /es/integrations/amazon_cloudhsm
app_id: amazon-cloudhsm
categories:
- nube
- aprovisionamiento
- aws
- recopilación de logs
custom_kind: integración
description: AWS CloudHSM es un servicio que proporciona módulos de seguridad de hardware
  para su uso en la nube AWS.
media: []
title: AWS CloudHSM
---
## Información general

AWS CloudHSM es un servicio que proporciona módulos de seguridad de hardware para su uso en la nube AWS.

Habilita esta integración para ver todas tus métricas de CloudHSM en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `CloudHSM` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - AWS CloudHSM](https://app.datadoghq.com/integrations/amazon-cloudhsm).

### Recopilación de logs

#### Activar logging

Configura AWS CloudHSM para que envíe logs a un bucket S3 o a CloudWatch.

**Nota**: Si envías logs a un bucket S3, asegúrate de que `amazon_cloudhsm` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función Lambda, añade manualmente un activador en el bucket S3 o grupo de logs de CloudWatch que contenga tus logs de AWS CloudHSM en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.cloudhsm.hsm_keys_session_occupied** <br>(gauge) | Cantidad de memoria en buffer.<br>_Se muestra como clave_ |
| **aws.cloudhsm.hsm_keys_session_occupied.sum** <br>(count) | Suma de la cantidad de memoria en buffer.<br>_Se muestra como clave_ |
| **aws.cloudhsm.hsm_keys_token_occupied** <br>(gauge) | Número de claves ocupadas<br>_Se muestra como clave_. |
| **aws.cloudhsm.hsm_keys_token_occupied.sum** <br>(count) | Suma del número de claves ocupadas<br>_Se muestra como clave_ |
| **aws.cloudhsm.hsm_session_count** <br>(count) | Suma de las conexiones abiertas.<br>_Se muestra como sesión_ |
| **aws.cloudhsm.hsm_session_count.average** <br>(gauge) | Número de conexiones abiertas.<br>_Se muestra como sesión_ |
| **aws.cloudhsm.hsm_session_count.maximum** <br>(gauge) | Número máximo de conexiones abiertas.<br>_Se muestra como sesión_ |
| **aws.cloudhsm.hsm_ssl_ctxs_occupied** <br>(gauge) | Número de canales cifrados establecidos.<br>_Se muestra como proceso_ |
| **aws.cloudhsm.hsm_ssl_ctxs_occupied.sum** <br>(count) | Suma del número de canales cifrados establecidos.<br>_Se muestra como proceso_ |
| **aws.cloudhsm.hsm_temperature** <br>(gauge) | Temperatura de unión del procesador de hardware<br>_Se muestra como grados centígrados_ |
| **aws.cloudhsm.hsm_temperature.maximum** <br>(gauge) | Temperatura máxima de unión del procesador de hardware<br>_Se muestra como grados centígrados_ |
| **aws.cloudhsm.hsm_unhealthy** <br>(count) | Suma de instancias HSM no sanas.<br>_Se muestra como evento_ |
| **aws.cloudhsm.hsm_unhealthy.average** <br>(gauge) | Número medio de instancias HSM no sanas.<br>_Se muestra como evento_ |
| **aws.cloudhsm.hsm_unhealthy.maximum** <br>(gauge) | Número máximo de instancias HSM no sanas.<br>_Se muestra como evento_ |
| **aws.cloudhsm.hsm_users_available** <br>(gauge) | Número de usuarios HSM disponibles<br>_Se muestra como usuario_ |
| **aws.cloudhsm.hsm_users_max** <br>(gauge) | Número máximo de usuarios HSM disponibles<br>_Se muestra como usuario_ |
| **aws.cloudhsm.interface_eth_2dropped_input** <br>(gauge) | |
| **aws.cloudhsm.interface_eth_2dropped_input.sum** <br>(count) | |
| **aws.cloudhsm.interface_eth_2dropped_output** <br>(gauge) | |
| **aws.cloudhsm.interface_eth_2dropped_output.sum** <br>(count) | |
| **aws.cloudhsm.interface_eth_2errors_input** <br>(gauge) | <br>_Se muestra como error_ |
| **aws.cloudhsm.interface_eth_2errors_input.sum** <br>(count) | <br>_Se muestra como error_ |
| **aws.cloudhsm.interface_eth_2errors_output** <br>(gauge) | <br>_Se muestra como error_ |
| **aws.cloudhsm.interface_eth_2errors_output.sum** <br>(count) | <br>_Se muestra como error_ |
| **aws.cloudhsm.interface_eth_2octets_input** <br>(gauge) | Tráfico total de entrada a HSM.|
| **aws.cloudhsm.interface_eth_2octets_input.sum** <br>(count) | Suma total del tráfico de entrada a HSM.|
| **aws.cloudhsm.interface_eth_2octets_output** <br>(gauge) | Tráfico total de salida a HSM.|
| **aws.cloudhsm.interface_eth_2octets_output.sum** <br>(count) | Suma total del tráfico de salida a HSM.|
| **aws.cloudhsm.interface_eth_2packets_input** <br>(gauge) | <br>_Se muestra como paquete_ |
| **aws.cloudhsm.interface_eth_2packets_input.sum** <br>(count) | <br>_Se muestra como paquete_ |
| **aws.cloudhsm.interface_eth_2packets_output** <br>(gauge) | <br>_Se muestra como paquete_ |
| **aws.cloudhsm.interface_eth_2packets_output.sum** <br>(count) | <br>_Se muestra como paquete_ |

### Eventos

La integración de AWS CloudHSM no incluye eventos.

### Checks de servicio

La integración de AWS CloudHSM no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).