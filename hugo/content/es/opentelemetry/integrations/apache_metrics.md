---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de Apache Web Server
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/apache_metrics.png" alt="Métricas de Apache de OpenTelemetry en un panel de Apache" style="width:100%;" >}}

El [receptor de Apache][1] recopila métricas de Apache Web Server.

Para obtener más información, consulte la documentación del proyecto OpenTelemetry para el [receptor de Apache][1].

## Configuración {#setup}

Este ejemplo utiliza identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita su distribución.

El receptor de Apache lee la página `server-status?auto` de su servidor. Antes de comenzar, [habilite `mod_status`][5] en su servidor Apache. Limite el acceso a la página de estado, por ejemplo a localhost, ya que muestra detalles sobre su servidor y sus solicitudes.

Agregue las siguientes líneas a su configuración del Collector y establezca `endpoint` en la dirección de su página de estado:

```yaml
receivers:
  apache:
    endpoint: http://localhost:8080/server-status?auto
```

Agregue `apache` a la lista `receivers` del pipeline de métricas en su configuración. Mantenga los procesadores que ya están en ese pipeline. La ingesta de métricas OTLP de Datadog solo acepta métricas delta y este receptor produce sumas acumulativas, por lo que el pipeline necesita `cumulativetodelta`. La [configuración recomendada del Collector][4] lo incluye.

Para ver todas las opciones de configuración, consulte la [documentación del receptor de Apache][1].

## Datos recopilados {#data-collected}

{{< mapping-table resource="apache.csv">}}

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachereceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: /es/opentelemetry/setup/collector_exporter/
[5]: https://httpd.apache.org/docs/2.4/mod/mod_status.html