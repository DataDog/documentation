---
aliases:
- /es/integrations/azure_hd_insight
app_id: azure-hdinsight
categories:
- nube
- azure
custom_kind: integración
description: Rastreo de las métricas clave de Azure HD Insight.
media: []
title: Azure HD Insight
---
## Información general

Azure HDInsight es un servicio en la nube que permite procesar de forma fácil, rápida y rentable grandes cantidades de datos.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure HDInsight.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.hdinsight_clusters.categorized_gateway_requests** <br>(count) | Número de solicitudes de gateway por categorías: (1xx/2xx/3xx/4xx/5xx)<br>_Se muestra como solicitud_ |
| **azure.hdinsight_clusters.count** <br>(gauge) | El recuento de clústeres de Azure HDInsight|
| **azure.hdinsight_clusters.gateway_requests** <br>(count) | El número de solicitudes de gateway<br>_Se muestra como solicitud_ |
| **azure.hdinsight_clusters.kafka_rest_proxy.consumer_request.m1_delta** <br>(count) | Número de solicitudes de consumidores al proxy REST de kafka|
| **azure.hdinsight_clusters.kafka_rest_proxy.consumer_request_fail.m1_delta** <br>(count) | Excepciones a las solicitudes de los consumidores|
| **azure.hdinsight_clusters.kafka_rest_proxy.consumer_request_time.p95** <br>(gauge) | Latencia de mensajes en una solicitud de consumidor a través del proxy REST de kafka<br>_Se muestra como milisegundo_ |
| **azure.hdinsight_clusters.kafka_rest_proxy.consumer_request_waiting_in_queue_time.p95** <br>(gauge) | Longitud de la cola del proxy REST del consumidor<br>_Se muestra en milisegundos_ |
| **azure.hdinsight_clusters.kafka_rest_proxy.messages_in.m1_delta** <br>(count) | Número de mensajes de productores a través del proxy REST de kafka|
| **azure.hdinsight_clusters.kafka_rest_proxy.messages_out.m1_delta** <br>(count) | Número de mensajes de consumidores a través del proxy REST de kafka|
| **azure.hdinsight_clusters.kafka_rest_proxy.open_connections** <br>(count) | Número de conexiones concurrentes a través del proxy REST de kafka|
| **azure.hdinsight_clusters.kafka_rest_proxy.producer_request.m1_delta** <br>(count) | Número de solicitudes de productores al proxy REST de kafka|
| **azure.hdinsight_clusters.kafka_rest_proxy.producer_request_fail.m1_delta** <br>(count) | Número de excepciones a las solicitudes de los productores|
| **azure.hdinsight_clusters.kafka_rest_proxy.producer_request_time.p95** <br>(gauge) | Latencia de mensajes en una solicitud de productor a través del proxy REST de kafka<br>_Se muestra como milisegundo_ |
| **azure.hdinsight_clusters.kafka_rest_proxy.producer_request_waiting_in_queue_time.p95** <br>(gauge) | Longitud de cola proxy REST de productor<br>_Se muestra como milisegundo_ |
| **azure.hdinsight_clusters.num_active_workers** <br>(gauge) | El número de workers activos|
| **azure.hdinsight_clusters.pending_cpu** <br>(gauge) | Solicitudes de CPU pendientes en yarn|
| **azure.hdinsight_clusters.pending_memory** <br>(gauge) | Solicitudes de memoria pendientes en yarn|

### Eventos

La integración Azure HDInsight no incluye ningún evento.

### Checks de servicio

La integración Azure HDInsight no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).