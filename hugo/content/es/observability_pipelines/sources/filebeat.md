---
description: Aprenda a enviar registros a Observability Pipelines con Filebeat a través
  de la fuente de Logstash.
disable_toc: false
title: Enviar registros a Observability Pipelines con Filebeat
---
## Descripción general {#overview}

Utilice la fuente de Logstash para enviar registros a Observability Pipelines con Filebeat.

## Configuración {#setup}

1. [Configure Filebeat][1] si aún no lo ha hecho.
1. En el archivo `filebeat.yml`:
    <br>a. Comente la sección de configuración de salida de Elasticsearch.
    <br>b. Quite los comentarios y configure la sección de salida de Logstash:
    ```
    # ------------------------------ Logstash Output -------------------------------
    output.logstash:
    # The Logstash hosts
    hosts: ["<OPW_HOST>:9997"]
    ```
    `<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

    For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

    For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `opw-observability-pipelines-worker.default.svc.cluster.local`.
1. [Configure una canalización][2] con la fuente de Logstash.

## Métricas de salud {#health-metrics}

Para [métricas de componente][3] y [métricas de búfer de fuente][4] emitidas por todas las fuentes, consulte la documentación de [Pipelines Usage Metrics][5]. La fuente de Filebeat utiliza la fuente de Logstash. Para filtrar o agrupar por métricas de la fuente de Logstash, utilice la etiqueta `component_type:logstash`.

[1]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[2]: /es/observability_pipelines/configuration/set_up_pipelines/
[3]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/