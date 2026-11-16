---
description: Parse JSON 프로세서를 사용하여 지정된 JSON 필드를 객체로 구문 분석하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 MSSP의 로그 수집 및 집계 간소화
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Parse JSON 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서는 지정된 JSON 필드를 객체로 구문 분석합니다. 예를 들어, 문자열화된 JSON을 포함하는 `message` 필드가 있는 경우

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": "{\"level\":\"info\",\"timestamp\":\"2024-01-15T10:30:00Z\",\"service\":\"user-service\",\"user_id\":\"12345\",\"action\":\"login\",\"success\":true,\"ip_address\":\"192.168.1.100\"}"
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

Parse JSON 프로세서를 사용하여 `message` 필드를 구문 분석하면 `message` 필드에 중첩된 객체 내의 모든 특성이 포함됩니다.

{{< img src="observability_pipelines/processors/parse-json-example.png" alt="message를 구문 분석할 필드로 사용하는 Parse JSON 프로세서" style="width:60%;" >}}

이 출력에는 구문 분석된 JSON이 있는 `message` 필드가 포함되어 있습니다.

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": {
        "action": "login",
        "ip_address": "192.168.1.100",
        "level": "info",
        "service": "user-service",
        "success": true,
        "timestamp": "2024-01-15T10:30:00Z",
        "user_id": "12345"
    }
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 처리됩니다. 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다. 자세한 내용은 [검색 구문][1]을 참조하세요.
2. JSON을 구문 분석할 필드의 이름을 입력합니다.<br>**참고**: 구문 분석된 JSON은 해당 필드에 원래 포함되어 있던 내용을 덮어씁니다.

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][2] 및 [프로세서 버퍼 메트릭][3]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][4] 설명서를 참조하세요. Parse 프로세서 메트릭별로 필터링하거나 그룹화하려면 `component_type:parse` 태그를 사용하세요.

[1]: /ko/observability_pipelines/search_syntax/logs/
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}