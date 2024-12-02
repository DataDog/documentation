---
title: Logstash Source
disable_toc: false
---

Use Observability Pipelines' Logstash source to receive logs from your Logstash agent. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/logstash%}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/logstash %}}

## Send logs to the Observability Pipelines Worker over Logstash

{{% observability_pipelines/log_source_configuration/logstash %}}

## Send logs using Filebeat to Observability Pipelines

Use the Logstash source to send logs to the Observability Pipelines Worker with Filebeat.

1. [Set up Filebeat][2] if you haven't already.
1. In the `filebeat.yml` file:
    <br>a. Comment out the Elasticsearch Output configuration section.
    <br>b. Uncomment and configure the Logstash Output section:
    ```
    # ------------------------------ Logstash Output -------------------------------
    output.logstash:
    # The Logstash hosts
    hosts: ["<OPW_HOST>:9997"]
    ```
    `<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

    For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

    For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `opw-observability-pipelines-worker.default.svc.cluster.local`.
1. [Set up a pipeline][3] with the Logstash source.

[1]: /observability_pipelines/set_up_pipelines/
[2]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[3]: /observability_pipelines/set_up_pipelines/