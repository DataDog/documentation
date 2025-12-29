---
title: Send Logs to Observability Pipelines with Filebeat
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

## Overview

Use the Logstash source to send logs to Observability Pipelines with Filebeat.

## Setup

1. [Set up Filebeat][1] if you haven't already.
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
1. [Set up a pipeline][2] with the Logstash source.

[1]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[2]: /observability_pipelines/configuration/set_up_pipelines/