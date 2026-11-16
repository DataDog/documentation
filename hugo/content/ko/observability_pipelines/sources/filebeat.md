---
description: Logstash 소스를 통해 Filebeat로 Observability Pipelines에 로그를 전송하는 방법을 알아보세요.
disable_toc: false
title: Filebeat로 Observability Pipelines에 로그 전송
---
## 개요 {#overview}

Logstash 소스를 사용하여 Filebeat로 Observability Pipelines에 로그를 전송하세요.

## 설정 {#setup}

1. 아직 설정하지 않았다면 [Filebeat를 설정][1]하세요.
1. `filebeat.yml` 파일에서 다음을 수행합니다.
    <br>a. Elasticsearch 출력 구성 섹션을 주석 처리합니다.
    <br>b. Logstash 출력 섹션의 주석을 해제하고 구성합니다.
    ```
    # ------------------------------ Logstash Output -------------------------------
    output.logstash:
    # The Logstash hosts
    hosts: ["<OPW_HOST>:9997"]
    ```
    `<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

    For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

    For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `opw-observability-pipelines-worker.default.svc.cluster.local`.
1. Logstash 소스를 사용하여 [파이프라인을 설정][2]하세요.

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][3] 및 [소스 버퍼 메트릭][4]에 대해서는 [Pipelines 사용량 메트릭][5] 설명서를 참조하세요. Filebeat 소스는 Logstash 소스를 사용합니다. Logstash 소스 메트릭별로 필터링하거나 그룹화하려면 `component_type:logstash` 태그를 사용하세요.

[1]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/