---
aliases:
- /es/integrations/awsopsworks/
app_id: amazon_ops_works
categories:
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
custom_kind: integración
description: Rastrea el uso de recursos de AWS OpsWorks.
title: AWS OpsWorks
---
## Información general

AWS OpsWorks es un servicio de administración de aplicaciones que facilita el despliegue y el funcionamiento de aplicaciones de todas las formas y tamaños.

Habilita esta integración para ver en Datadog todas tus métricas de OpsWorks.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `OpsWorks` está habilitado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y AWS OpsWork](https://app.datadoghq.com/integrations/amazon-ops-works).

### Recopilación de logs

#### Activar logging

Configura AWS OpsWorks para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_ops_work` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de AWS OpsWorks en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.opsworks.cpusystem** <br>(gauge) | El porcentaje de tiempo que la CPU está gestionando operaciones del sistema.<br>_Se muestra como porcentaje_ |
| **aws.opsworks.cpuuser** <br>(gauge) | El porcentaje de tiempo que la CPU está gestionando operaciones de usuario.<br>_Se muestra como porcentaje_ |
| **aws.opsworks.cpuwaitio** <br>(gauge) | El porcentaje de tiempo que la CPU está esperando operaciones de entrada/salida.<br>_Se muestra como porcentaje_ |
| **aws.opsworks.load_1** <br>(gauge) | La carga promediada en una ventana de 1 minuto.|
| **aws.opsworks.load_1_5** <br>(gauge) | La carga se promedió en una ventana de 15 minutos.|
| **aws.opsworks.load_5** <br>(gauge) | La carga se promedia en una ventana de 5 minutos.|
| **aws.opsworks.memorybuffers** <br>(gauge) | La cantidad de memoria en búfer.<br>_Se muestra como kibibyte_ |
| **aws.opsworks.memorycached** <br>(gauge) | La cantidad de memoria en caché.<br>_Se muestra como kibibyte_ |
| **aws.opsworks.memoryfree** <br>(gauge) | La cantidad de memoria libre.<br>_Se muestra como kibibyte_ |
| **aws.opsworks.memoryswap** <br>(gauge) | La cantidad de espacio swap.<br>_Se muestra como kibibyte_ |
| **aws.opsworks.memorytotal** <br>(gauge) | La cantidad total de memoria.<br>_Se muestra como kibibyte_ |
| **aws.opsworks.memoryused** <br>(gauge) | La cantidad de memoria en uso.<br>_Se muestra como kibibyte_ |
| **aws.opsworks.procs** <br>(gauge) | El número de procesos activos.<br>_Se muestra como proceso_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, donde se incluyen el nombre del host y los grupos de seguridad, entre otras cosas.

### Eventos

La integración de AWS OpsWorks no incluye ningún evento.

### Checks de servicio

La integración de AWS OpsWorks no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).