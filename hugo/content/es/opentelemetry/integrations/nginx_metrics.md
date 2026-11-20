---
further_reading:
- link: /opentelemetry/collector_exporter/
  tag: Documentación
  text: Configuración del OpenTelemetry Collector
title: Métricas de NGINX
---
## Descripción general {#overview}

{{< img src="/opentelemetry/collector_exporter/nginx_metrics.png" alt="Métricas de NGINX de OpenTelemetry en un panel de control de NGINX" style="width:100%;" >}}

El [NGINX receiver][1] recopila métricas de NGINX que alimentan el panel de control [NGINX Overview][4].

Para obtener más información, consulte la documentación del proyecto OpenTelemetry sobre el [NGINX receiver][1].

## Configuración {#setup}

Este ejemplo utiliza identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita su distribución.

El NGINX receiver lee la página de estado del módulo [`ngx_http_stub_status_module`][6]. Antes de comenzar, habilite el módulo y exponga una página de estado. Limite el acceso a la página de estado, por ejemplo, a localhost.

Agregue las siguientes líneas a su configuración del Collector y establezca `endpoint` en la dirección de su página de estado:

```yaml
receivers:
  nginx:
    endpoint: http://localhost:80/status
```

Agregue `nginx` a la lista `receivers` del pipeline de métricas en su configuración. Mantenga los procesadores que ya se encuentran en ese pipeline. La ingesta de métricas OTLP de Datadog solo acepta métricas delta y este receptor produce sumas acumulativas, por lo que el pipeline necesita `cumulativetodelta`. La [configuración recomendada del Collector][5] lo incluye.

Para ver todas las opciones de configuración, consulte la [documentación del NGINX receiver][1].

## Datos recopilados {#data-collected}

{{< mapping-table resource="nginx.csv">}}

Para ver la asignación completa entre los nombres de métricas de OpenTelemetry y Datadog, consulte [Asignación de métricas de OpenTelemetry][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver
[2]: /es/opentelemetry/guide/metrics_mapping/
[4]: https://app.datadoghq.com/dash/integration/21/nginx---overview
[5]: /es/opentelemetry/setup/collector_exporter/
[6]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html