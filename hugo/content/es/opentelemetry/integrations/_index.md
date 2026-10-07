---
further_reading:
- link: /opentelemetry/schema_semantics/metrics_mapping/
  tag: Documentación
  text: Asignación de métricas de OpenTelemetry
title: Integrations
---
Esta página cubre las integraciones de OpenTelemetry (OTel) compatibles con Datadog. Estas integraciones le permiten recopilar y hacer un seguimiento de sus datos de observabilidad utilizando OpenTelemetry en Datadog.

## Descripción general {#overview}

Las integraciones de OpenTelemetry (OTel) son componentes que permiten la recopilación de datos de observabilidad (métricas, trazas y registros) de diversas fuentes utilizando el estándar OpenTelemetry. Estas integraciones están diseñadas para funcionar con el Colector de OpenTelemetry, el cual recibe, procesa y exporta datos de telemetría a backends de observabilidad como Datadog.

Para obtener una lista completa de todas las integraciones de OpenTelemetry, consulte el [Registro de OpenTelemetry][1]. Este registro proporciona información sobre receptores, exportadores y otros componentes en el ecosistema de OpenTelemetry.

## Precios de métricas {#metric-pricing}

Datadog recopila métricas de los receptores de OpenTelemetry compatibles sin costo adicional. Estas métricas sin costo son:
- Definidas en el archivo `metadata.yaml` para cada receptor.
- Listadas en la tabla de [Asignaciones de métricas][14].

Por ejemplo, el archivo `metadata.yaml` de [`dockerstatsreceiver`][15] lista las métricas que puede recopilar sin costo adicional.

<div class="alert alert-danger">Asegúrese de configurar los receptores de acuerdo con la documentación del receptor de OpenTelemetry. Los receptores configurados incorrectamente pueden causar que las métricas se clasifiquen como personalizadas, lo que resulta en cargos adicionales.</div>

## Integraciones de OpenTelemetry compatibles con Datadog {#datadog-supported-opentelemetry-integrations}

Datadog admite las siguientes integraciones de OpenTelemetry:

### APM (Application Performance Monitoring) {#apm-application-performance-monitoring}

Haga un seguimiento y optimice el rendimiento de su aplicación:

- [Métricas de traza][2] - Genere estadísticas de APM como aciertos, errores y duración
- [Métricas de tiempo de ejecución][3] - Recopile métricas de tiempo de ejecución para aplicaciones Java, .NET y Go

### Colector {#collector}

Supervise el estado y el rendimiento de su Colector de OpenTelemetry:

- [Métricas de estado del Colector][4] - Realice un seguimiento del rendimiento de su Colector de OpenTelemetry
- [Extensión de Datadog][17] - Vea la configuración del Colector y la información de compilación en Datadog Infrastructure Monitoring

### Contenedores y servidores {#containers-and-hosts}

Obtenga información sobre sus entornos en contenedores y sistemas de servidores:

- [Métricas de Docker][5] - Haga un seguimiento del rendimiento de los contenedores Docker
- [Métricas de servidor][6] - Haga un seguimiento de las métricas del sistema, como el uso de CPU, disco y memoria
- [Métricas de Kubernetes][18] - Recopile métricas de infraestructura de Kubernetes y envíe datos de recursos a Kubernetes Explorer
- [Métricas de Podman][16] - Haga un seguimiento del rendimiento de los contenedores Podman

### Servidores web y proxies {#web-servers-and-proxies}

Supervise servidores web y tecnologías de proxy:

- [Métricas de servidor web Apache][7] - Haga un seguimiento de las métricas de Apache HTTP Server
- [Métricas de NGINX][8] - Haga un seguimiento del rendimiento del servidor web NGINX
- [Métricas de IIS][9] - Realice un seguimiento de las métricas de Internet Information Services (IIS)
- [Métricas de HAProxy][10] - Haga un seguimiento del rendimiento del balanceador de carga HAProxy

### Bases de datos y mensajería {#databases-and-messaging}

Supervise sistemas de bases de datos y mensajería:

- [Métricas de MySQL][11] - Haga un seguimiento del rendimiento de la base de datos MySQL
- [Métricas de PostgreSQL][19] - Haga un seguimiento del rendimiento de la base de datos PostgreSQL
- [Métricas de SQL Server][20] - Haga un seguimiento del rendimiento de la base de datos SQL Server
- [Métricas de Kafka][12] - Haga un seguimiento de la plataforma de mensajería Apache Kafka

### Big data y procesamiento {#big-data-and-processing}

Haga un seguimiento de los marcos de procesamiento de big data:

- [Métricas de Apache Spark][13] - Haga un seguimiento de las métricas de rendimiento de Apache Spark

## Lecturas adicionales {#further-reading}

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
[17]: /es/opentelemetry/integrations/datadog_extension/
[18]: /es/opentelemetry/integrations/kubernetes_metrics/
[19]: /es/opentelemetry/integrations/postgres_metrics/
[20]: /es/opentelemetry/integrations/sqlserver_metrics/