---
description: Datadog Lambda Forwarder를 사용하여 AWS vended 로그를 Observability Pipelines로
  전송하는 방법을 알아봅니다.
disable_toc: false
title: Datadog Lambda Forwarder 로그를 Observability Pipelines로 전송하십시오.
---
## 개요 {#overview}

이 문서에서는 Datadog Lambda Forwarder를 사용하여 AWS vended 로그를 Observability Pipelines로 전송하는 방법을 단계별로 설명합니다. 설정 단계는 다음과 같습니다.

- [HTTP/S Server 소스를 사용하여 파이프라인 설정](#set-up-a-pipeline)
- [Datadog Forwarder를 배포하세요](#deploy-the-datadog-lambda-forwarder).

자세한 내용은 [Datadog Forwarder][1]를 참조하십시오.

**참고**: Datadog Forwarder는 `ddsource` 및 `ddtags`으로 태그가 지정된 로그를 전송하며, `source` 및 `tags`는 전송하지 않습니다. 이러한 로그에 대한 프로세서 쿼리나 필터를 정의할 때는 `ddsource` 및 `ddtags`를 사용하세요.

## 파이프라인 설정{#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Datadog Lambda Forwarder를 배포하십시오{#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][2] 및 [소스 버퍼 메트릭][3]은 [Pipelines Usage Metrics][4] 설명서를 참조하십시오. HTTP Server 소스를 사용하여 Lambda Forwarder에서 Observability Pipelines로 로그를 전송하므로, `component_type:http_server` 태그를 사용하여 관련 메트릭을 필터링하십시오.

[1]: /ko/logs/guide/forwarder/?tab=cloudformation
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/