---
app_id: amazon_kinesis_data_analytics
categories:
- nube
- aws
- recopilación de logs
custom_kind: integración
description: Rastrea métricas clave de Amazon Kinesis Data Analytics.
title: Amazon Kinesis Data Analytics
---
## Información general

Amazon Kinesis Data Analytics te permite transformar, consultar y analizar fácilmente
datos de streaming en tiempo real con Apache Flink.

Habilita esta integración para ver todas tus métricas de Amazon Kinesis Data Analitycs en
Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En [página de integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `Kinesis Analytics` está activado en la pestaña `Metric Collection`.
1. Instala la [integración de Datadog y Amazon Kinesis Data Analytics](https://app.datadoghq.com/integrations/amazon-kinesis-data-analytics).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.kinesisanalytics.bytes** <br>(count) | El número de bytes leídos (por flujo de entrada) o escritos (por flujo de salida).<br>_Se muestra como byte_ |
| **aws.kinesisanalytics.input_processing_dropped_records** <br>(count) | Número de registros devueltos por la función Lambda de procesamiento de entrada que se marcaron con el estado Dropped (Descartados).<br>_Se muestra como registro_ |
| **aws.kinesisanalytics.input_processing_duration** <br>(gauge) | El tiempo medio que tarda la invocación de una función Lambda de procesamiento de entrada realizada por Kinesis Data Analytics.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.input_processing_duration.maximum** <br>(gauge) | El tiempo máximo que tarda la invocación de una función Lambda de procesamiento de entrada realizada por Kinesis Data Analytics.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.input_processing_duration.minimum** <br>(gauge) | El tiempo mínimo que tarda la invocación de una función Lambda de procesamiento de entrada realizada por Kinesis Data Analytics.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.input_processing_ok_bytes** <br>(count) | La suma de bytes de los registros devueltos por la función Lambda de procesamiento de entrada que se marcaron con el estado Ok.<br>_Se muestra como byte_ |
| **aws.kinesisanalytics.input_processing_ok_records** <br>(count) | El número de registros devueltos por la función Lambda de procesamiento de entrada que se marcaron con el estado Ok.<br>_Se muestra como registro_ |
| **aws.kinesisanalytics.input_processing_processing_failed_records** <br>(count) | El número de registros devueltos por la función Lambda de procesamiento de entrada que se marcaron con el estado ProcessingFailed (Procesamiento fallido).<br>_Se muestra como registro_ |
| **aws.kinesisanalytics.input_processing_success** <br>(count) | Número de invocaciones Lambda de procesamiento de entrada realizadas con éxito por Kinesis Data Analytics.<br>_Se muestra como invocación_ |
| **aws.kinesisanalytics.input_processing_success.average** <br>(gauge) | La fracción de invocaciones Lambda de procesamiento de entrada que tuvieron éxito.<br>_Se muestra como fracción_ |
| **aws.kinesisanalytics.kpus** <br>(count) | El número de unidades de procesamiento de Kinesis que se utilizan para ejecutar tu aplicación de procesamiento de flujos.<br>_Se muestra como unidad_ |
| **aws.kinesisanalytics.kpus.average** <br>(gauge) | El número medio de unidades de procesamiento de Kinesis que se utilizan para ejecutar tu aplicación de procesamiento de flujos. El número medio de KPUs utilizadas cada hora determina la facturación de tu aplicación.<br>_Se muestra como unidad_ |
| **aws.kinesisanalytics.lambda_delivery_delivery_failed_records** <br>(count) | Número de registros devueltos por una función Lambda de entrega que se marcaron con el estado DeliveryFailed (Entrega fallida).<br>_Se muestra como registro_ |
| **aws.kinesisanalytics.lambda_delivery_duration** <br>(gauge) | El tiempo medio que tarda la invocación de una función Lambda de entrega realizada por Kinesis Data Analytics.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.lambda_delivery_duration.maximum** <br>(gauge) | El tiempo máximo que tarda la invocación de una función Lambda de entrega realizada por Kinesis Data Analytics.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.lambda_delivery_duration.minimum** <br>(gauge) | El tiempo mínimo que tarda la invocación de una función Lambda de entrega realizada por Kinesis Data Analytics.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.lambda_delivery_ok_records** <br>(count) | Número de registros devueltos por una función Lambda de entrega que se marcaron con el estado Ok.<br>_Se muestra como registro_ |
| **aws.kinesisanalytics.millis_behind_latest** <br>(gauge) | La duración media en milisegundos antes de la hora actual que la aplicación estaba leyendo de la fuente de flujo.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.millis_behind_latest.maximum** <br>(gauge) | La duración máxima en milisegundos antes de la hora actual que la aplicación estaba leyendo de la fuente de flujo.<br> _Se muestra como milisegundo_ |
| **aws.kinesisanalytics.millis_behind_latest.minimum** <br>(gauge) | La duración mínima en milisegundos antes de la hora actual que la aplicación estaba leyendo de la fuente de flujo.<br>_Se muestra como milisegundo_ |
| **aws.kinesisanalytics.records** <br>(count) | El número de registros leídos (por flujo de entrada) o escritos (por flujo de salida).<br>_Se muestra como registro_ |
| **aws.kinesisanalytics.success** <br>(count) | El número de intentos de entrega con éxito al destino configurado para tu aplicación.<br>_Se muestra como unidad_ |
| **aws.kinesisanalytics.success.average** <br>(gauge) | La fracción de intentos de entrega al destino configurado para tu aplicación que tienen éxito.<br>_Se muestra como fracción_ |

### Eventos

La integración de Amazon Kinesis Data Analytics no incluye ningún evento.

### Checks de servicio

La integración de Amazon Kinesis Data Analytics no incluye ningún check de
servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).