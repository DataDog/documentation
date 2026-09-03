---
aliases:
- /es/integrations/amazon_connect
app_id: amazon-connect
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Amazon Connect ofrece una configuración de autoservicio y permite un
  compromiso dinámico, personal y natural del cliente.
media: []
title: Amazon Connect
---
## Información general

Amazon Connect ofrece una configuración autogestionada y permite una interacción dinámica, personal y natural con el cliente.

Activa esta integración para ver todas tus métricas de Connect en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Connect` está habilitado en la pestaña `Metric Collection`.
1. Instala la integración [Datadog - Amazon Connect](https://app.datadoghq.com/integrations/amazon-connect).

### Recopilación de logs

#### Activar logging

Configura Amazon Connect para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_connect` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o en el grupo de logs de CloudWatch que contiene tus logs de Amazon Connect en la consola de AWS:

   - [Añadir un activador manual en el bucket S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.connect.call_back_not_dialable_number** <br>(count) | Número medio de veces que no se ha podido realizar una devolución de llamada en cola a un cliente debido a que el número del cliente se encuentra en un país para el que no están permitidas las llamadas salientes para la instancia.|
| **aws.connect.call_back_not_dialable_number.maximum** <br>(count) | Número máximo de veces que no se ha podido realizar una devolución de llamada en cola a un cliente debido a que el número del cliente se encuentra en un país para el que no están permitidas las llamadas salientes para la instancia.|
| **aws.connect.call_back_not_dialable_number.minimum** <br>(count) | Número mínimo de veces que no se ha podido realizar una devolución de llamada en cola a un cliente debido a que el número del cliente se encuentra en un país para el que no están permitidas las llamadas salientes para la instancia.|
| **aws.connect.call_recording_upload_error** <br>(count) | Número medio de grabaciones de llamadas que no se han podido cargar en el bucket de Amazon S3 configurado para tu instancia.|
| **aws.connect.call_recording_upload_error.maximum** <br>(count) | Número máximo de grabaciones de llamadas que no se han podido cargar en el bucket de Amazon S3 configurado para tu instancia.|
| **aws.connect.call_recording_upload_error.minimum** <br>(count) | Número mínimo de grabaciones de llamadas que no se han podido cargar en el bucket de Amazon S3 configurado para tu instancia.|
| **aws.connect.calls_breaching_concurrency_quota** <br>(count) | Número medio de llamadas de voz que han superado el límite de llamadas activas simultáneas para la instancia.|
| **aws.connect.calls_breaching_concurrency_quota.maximum** <br>(count) | Número máximo de llamadas de voz que han superado el límite de llamadas activas simultáneas para la instancia.|
| **aws.connect.calls_breaching_concurrency_quota.minimum** <br>(count) | Número mínimo de llamadas de voz que han superado el límite de llamadas activas simultáneas para la instancia.|
| **aws.connect.calls_per_interval** <br>(count) | Número medio de llamadas de voz entrantes y salientes recibidas o realizadas por segundo en la instancia.|
| **aws.connect.calls_per_interval.maximum** <br>(count) | Número máximo de llamadas de voz entrantes y salientes recibidas o realizadas por segundo en la instancia.|
| **aws.connect.calls_per_interval.minimum** <br>(count) | Número mínimo de llamadas de voz entrantes y salientes recibidas o realizadas por segundo en la instancia.|
| **aws.connect.concurrent_calls** <br>(count) | Número medio de llamadas de voz activas simultáneas en la instancia en el momento en que se muestran los datos en el dashboard.|
| **aws.connect.concurrent_calls.maximum** <br>(count) | Número máximo de llamadas de voz activas simultáneas en la instancia en el momento en que se muestran los datos en el dashboard.|
| **aws.connect.concurrent_calls.minimum** <br>(count) | Número mínimo de llamadas de voz activas simultáneas en la instancia en el momento en que se muestran los datos en el dashboard.|
| **aws.connect.concurrent_calls_percentage** <br>(gauge) | Porcentaje medio del límite de servicio de llamadas de voz activas simultáneas utilizadas en la instancia.<br>_Se muestra como porcentaje_ |
| **aws.connect.concurrent_calls_percentage.maximum** <br>(gauge) | Porcentaje máximo del límite de servicio de llamadas de voz activas simultáneas utilizadas en la instancia.<br>_Se muestra como porcentaje_ |
| **aws.connect.concurrent_calls_percentage.minimum** <br>(gauge) | Porcentaje mínimo del límite de servicio de llamadas de voz activas simultáneas utilizadas en la instancia.<br>_Se muestra como porcentaje_ |
| **aws.connect.contact_flow_errors** <br>(count) | Número medio de veces que se ha ejecutado la rama de error para un flujo de contactos.|
| **aws.connect.contact_flow_errors.maximum** <br>(count) | Número máximo de veces que se ha ejecutado la rama de error para un flujo de contactos.|
| **aws.connect.contact_flow_errors.minimum** <br>(count) | Número mínimo de veces que se ha ejecutado la rama de error para un flujo de contactos.|
| **aws.connect.contact_flow_fatal_errors** <br>(count) | Número medio de veces que un flujo de contactos no se ha ejecutado debido a un error del sistema.|
| **aws.connect.contact_flow_fatal_errors.maximum** <br>(count) | Número máximo de veces que un flujo de contactos no se ha ejecutado debido a un error del sistema.|
| **aws.connect.contact_flow_fatal_errors.minimum** <br>(count) | Número mínimo de veces que un flujo de contactos no se ha ejecutado debido a un error del sistema.|
| **aws.connect.longest_queue_wait_time** <br>(count) | Promedio de la mayor cantidad de tiempo en segundos que un contacto ha esperado en una cola. Este es el tiempo que un contacto ha esperado en una cola durante el intervalo de actualización.|
| **aws.connect.longest_queue_wait_time.maximum** <br>(count) | Promedio de la mayor cantidad de tiempo en segundos que un contacto ha esperado en una cola. Este es el tiempo que un contacto ha esperado en una cola durante el intervalo de actualización.|
| **aws.connect.longest_queue_wait_time.minimum** <br>(count) | Promedio de la mayor cantidad de tiempo en segundos que un contacto ha esperado en una cola. Este es el tiempo que un contacto ha esperado en una cola durante el intervalo de actualización.|
| **aws.connect.misconfigured_phone_numbers** <br>(count) | Número medio de llamadas fallidas debido a que el número de teléfono no está asociado a un flujo de contactos.|
| **aws.connect.misconfigured_phone_numbers.maximum** <br>(count) | Número máximo de llamadas fallidas debido a que el número de teléfono no está asociado a un flujo de contactos.|
| **aws.connect.misconfigured_phone_numbers.minimum** <br>(count) | Número mínimo de llamadas fallidas debido a que el número de teléfono no está asociado a un flujo de contactos.|
| **aws.connect.missed_calls** <br>(count) | Número medio de llamadas de voz perdidas por los agentes durante el intervalo de actualización.|
| **aws.connect.missed_calls.maximum** <br>(count) | Número máximo de llamadas de voz perdidas por los agentes durante el intervalo de actualización.|
| **aws.connect.missed_calls.minimum** <br>(count) | Número mínimo de llamadas de voz perdidas por los agentes durante el intervalo de actualización.|
| **aws.connect.public_signing_key_usage** <br>(count) | Número medio de veces que se ha utilizado una clave de seguridad de flujo de contactos (clave de firma pública) para cifrar la entrada del cliente en un flujo de contactos.|
| **aws.connect.public_signing_key_usage.maximum** <br>(count) | Número máximo de veces que se ha utilizado una clave de seguridad de flujo de contactos (clave de firma pública) para cifrar la entrada del cliente en un flujo de contactos.|
| **aws.connect.public_signing_key_usage.minimum** <br>(count) | Número mínimo de veces que se ha utilizado una clave de seguridad de flujo de contactos (clave de firma pública) para cifrar la entrada del cliente en un flujo de contactos.|
| **aws.connect.queue_size** <br>(count) | Número medio de contactos en la cola.|
| **aws.connect.queue_size.maximum** <br>(count) | Número máximo de contactos en la cola.|
| **aws.connect.queue_size.minimum** <br>(count) | Número mínimo de contactos en la cola.|
| **aws.connect.throttled_calls** <br>(count) | Número medio de llamadas de voz rechazadas debido a que la proporción de llamadas por segundo ha superado el límite máximo admitido.|
| **aws.connect.throttled_calls.maximum** <br>(count) | Número máximo de llamadas de voz rechazadas debido a que la proporción de llamadas por segundo ha superado el límite máximo admitido.|
| **aws.connect.throttled_calls.minimum** <br>(count) | Número mínimo de llamadas de voz rechazadas debido a que la proporción de llamadas por segundo ha superado el límite máximo admitido.|
| **aws.connect.to_instance_packet_loss_rate** <br>(count) | Proporción media de pérdida de paquetes para llamadas en la instancia notificada cada 10 segundos.|
| **aws.connect.to_instance_packet_loss_rate.maximum** <br>(count) | Proporción máxima de pérdida de paquetes para llamadas en la instancia notificada cada 10 segundos.|
| **aws.connect.to_instance_packet_loss_rate.minimum** <br>(count) | Proporción mínima de pérdida de paquetes para llamadas en la instancia notificada cada 10 segundos.|
| **aws.connect.queue_capacity_exceeded_error** <br>(count) | Número medio de llamadas rechazadas debido a que la cola estaba llena.|
| **aws.connect.queue_capacity_exceeded_error.maximum** <br>(count) | Número máximo de llamadas rechazadas debido a que la cola estaba llena.|
| **aws.connect.queue_capacity_exceeded_error.minimum** <br>(count) | Número mínimo de llamadas rechazadas debido a que la cola estaba llena.|

### Eventos

La integración de Amazon Connect no incluye ningún evento.

### Checks de servicio

La integración de Amazon Connect no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).