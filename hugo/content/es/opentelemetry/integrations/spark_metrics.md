---
further_reading:
- link: /opentelemetry/setup/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de Apache Spark
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/spark_metrics.png" alt="Métricas de Apache Spark de OpenTelemetry en un panel de Spark" style="width:100%;" >}}

El [receptor de Apache Spark][1] recopila métricas de Apache Spark que se muestran en el panel [Spark Overview][4].

Para obtener más información, consulte la documentación del proyecto OpenTelemetry para el [receptor de Apache Spark][1].

## Configuración {#setup}

Este ejemplo utiliza identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita su distribución. Las versiones anteriores denominan a este receptor `apachespark`.

El receptor de Apache Spark lee la API REST que una aplicación Spark en ejecución ofrece a través del puerto de su interfaz web.

Agregue las siguientes líneas a la configuración del Collector y establezca `endpoint` en la dirección de la interfaz web de su aplicación Spark:

```yaml
receivers:
  apache_spark:
    endpoint: http://localhost:4040
```

Agregue `apache_spark` a la lista `receivers` del pipeline de métricas en su configuración. Mantenga los procesadores que ya están en ese pipeline. La ingesta de métricas OTLP de Datadog solo acepta métricas delta, y este receptor produce sumas acumulativas, por lo que el pipeline necesita `cumulativetodelta`. La [configuración recomendada del Collector][3] lo incluye.

Para ver todas las opciones de configuración, consulte la [documentación del receptor de Apache Spark][1].

## Datos recopilados {#data-collected}

{{< mapping-table resource="apachespark.csv">}}

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[3]: /es/opentelemetry/setup/collector_exporter/
[4]: https://app.datadoghq.com/screen/integration/95/spark---overview