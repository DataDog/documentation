---
description: Lambda Extension 로그를 Observability Pipelines로 전송하는 방법을 알아보세요.
disable_toc: false
title: Datadog Lambda Extension 로그를 Observability Pipelines로 전송하세요.
---
## 개요 {#overview}

이 문서는 Datadog Lambda Extension을 사용하여 AWS 제공 로그를 Observability Pipelines로 전송하는 방법을 설명합니다. 설정 단계는 다음과 같습니다.

- [HTTP/S Server 소스를 사용하여 파이프라인 설정](#set-up-a-pipeline)
- [Datadog Lambda Extension 배포](#deploy-the-datadog-lambda-extension)

자세한 내용은 [Datadog Lambda Extension][1]을 참조하세요.

**참고**: Datadog Lambda Extension은 `source`와 `tags`가 아니라 `ddsource`와 `ddtags` 태그가 지정된 로그를 전송합니다. 이러한 로그에 대한 프로세서 쿼리나 필터를 정의할 때는 `ddsource` 및 `ddtags`를 사용하세요.

## 파이프라인 설정{#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**참고**: Lambda Extension에서 전송되는 로그를 처리하기 위해 Observability Pipeline에서 {{< ui >}}HTTP Server{{< /ui >}}를 소스로 사용해야 합니다. {{< ui >}}Datadog Agent{{< /ui >}}를 소스로 사용하지 마세요.

## Datadog Lambda Extension 배포{#deploy-the-datadog-lambda-extension}

### Datadog Lambda Extension 설치{#install-the-datadog-lambda-extension}

[AWS Lambda 애플리케이션 계측][2]의 지침에 따라 Datadog Lambda Library를 설정하여 AWS Lambda 애플리케이션에서 데이터를 수집하세요.

### Datadog Lambda Extension 환경 변수 설정{#set-environment-variables-for-datadog-lambda-extension}

{{% observability_pipelines/lambda_extension_source %}}

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][3] 및 [소스 버퍼 메트릭][4]에 대해서는 [Pipelines 사용량 메트릭][5] 설명서를 참조하세요. HTTP Server 소스를 사용하여 Lambda Extension에서 Observability Pipelines로 로그를 전송하므로, `component_type:http_server` 태그를 사용하여 관련 메트릭을 필터링하세요.

[1]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension/
[2]: https://docs.datadoghq.com/ko/serverless/aws_lambda/instrumentation/
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/