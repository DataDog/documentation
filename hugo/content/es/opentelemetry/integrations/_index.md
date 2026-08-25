---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: Documentación
  text: Asignación de métricas de OpenTelemetry
title: Integraciones
---

Esta página cubre integraciones OpenTelemetry (OTel) compatibles con Datadog. Estas integraciones le permiten recopilar y monitorizar tus datos de observabilidad utilizando OpenTelemetry en Datadog.

## Información general

Las integraciones OpenTelemetry (OTel) son componentes que permiten la recopilación de datos de observabilidad (métricas, trazas (traces) y logs) de diversas fuentes utilizando el estándar OpenTelemetry. Estas integraciones están diseñadas para funcionar con OpenTelemetry Collector, que recibe, procesa y exporta datos de telemetría a backends de observabilidad como Datadog.

Para obtener una lista completa de todas las integraciones OpenTelemetry, consulta el [registro de OpenTelemetry][1]. Este registro proporciona información sobre receptores, exportadores y otros componentes del ecosistema OpenTelemetry.

## Precios de métricas

Datadog recopila métricas de los receptores compatibles de OpenTelemetry sin coste adicional. Estas métricas sin coste son:
- Definidas en el archivo `metadata.yaml` para cada receptor.
- Enumeradas en la tabla [Metrics Mappings][14].

Por ejemplo, el archivo [`dockerstatsreceiver`][15] `metadata.yaml` enumera las métricas que puedes recopilar sin coste adicional.

<div class="alert alert-danger">Asegúrate de configurar los receptores de acuerdo con la documentación de receptores de OpenTelemetry. Los receptores configurados incorrectamente pueden hacer que las métricas se clasifiquen como personalizadas, lo que conlleva cargos adicionales.</div>

## Integraciones OpenTelemetry (OTel) compatibles con Datadog

Datadog admite las siguientes integraciones OpenTelemetry:

### APM (Application Performance Monitoring)

Monitoriza y optimiza el rendimiento de tu aplicación:

- [Métricas de traza][2]: genera estadísticas de APM como aciertos, errores y duración.
- [Métricas de tiempo de ejecución][3]: recopila métricas de tiempo de ejecución para aplicaciones Java, .NET y Go.

### Collector

Monitoriza el estado y el rendimiento de tu OpenTelemetry Collector:

- [Métricas de estado del recolector][4]: controla el rendimiento del recolector de OpenTelemetry 

### Contenedores y hosts

Obtén información sobre tus sistemas de entornos y hosts en contenedores:

- [Métricas de Docker][5]: monitoriza el rendimiento de los contenedores de Docker
- [Métricas del host][6]: seguimiento de las métricas del sistema, como el uso de CPU, disco y memoria.
- [Métricas de Podman][16]: monitoriza el rendimiento de los contenedores de Podman

### Servidores web y proxies

Monitoriza servidores web y tecnologías proxy:

- [Métricas del servidor web de Apache][7]: recopilación de métricas del servidor HTTP de Apache 
- [Métricas de NGINX][8]: monitorizar el rendimiento del servidor web de NGINX
- [Métricas de IIS][9]: seguimiento de métricas de Internet Information Services (IIS)
- [Métricas de HAProxy Metrics][10]: monitoriza el rendimiento del equilibrador de carga de HAProxy

### Bases de datos y mensajería

Monitorización de base de datos y sistemas de mensajería:

- [Métricas de MySQL][11]: seguimiento del rendimiento de la base de datos de MySQL 
- [Métricas de Kafka][12]: monitoriza la plataforma de mensajería de Apache Kafka

### Big data y procesamiento

Monitoriza marcos de procesamiento de big data:

- [Métricas de Apache Spark][13]: seguimiento de las métricas de rendimiento de Apache Spark

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/ecosystem/registry/
[2]: /es/opentelemetry/integrations/trace_metrics
[3]: /es/opentelemetry/integrations/runtime_metrics/
[4]: /es/opentelemetry/integrations/collector_health_metrics/
[5]: /es/opentelemetry/integrations/docker_metrics/
[6]: /es/opentelemetry/integrations/host_metrics/
[7]: /es/opentelemetry/integrations/apache_metrics/
[8]: /es/opentelemetry/integrations/nginx_metrics/
[9]: /es/opentelemetry/integrations/iis_metrics/
[10]: /es/opentelemetry/integrations/haproxy_metrics/
[11]: /es/opentelemetry/integrations/mysql_metrics/
[12]: /es/opentelemetry/integrations/kafka_metrics/
[13]: /es/opentelemetry/integrations/spark_metrics/
[14]: /es/opentelemetry/mapping/metrics_mapping/#metrics-mappings
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/metadata.yaml
[16]: /es/opentelemetry/integrations/podman_metrics/