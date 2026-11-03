---
description: Parse XML 프로세서로 XML 데이터를 구문 분석하여 해당 데이터를 처리하고 대상으로 전송하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 MSSP의 로그 수집 및 집계 간소화하기
- link: https://www.datadoghq.com/blog/observability-pipelines-parsing-xml-logs/
  tag: 블로그
  text: Observability Pipelines로 XML 로그 수집 및 처리 간소화하기
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Parse XML 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서는 Extensible Markup Language(XML)를 구문 분석하여 해당 데이터를 처리하고 서로 다른 대상으로 전송할 수 있도록 합니다. XML은 구조화된 데이터를 저장하고 전송하는 데 사용되는 로그 형식입니다. 이는 트리 구조로 구성되어 중첩된 정보를 나타내며 태그와 특성을 사용하여 데이터를 정의합니다. 예를 들어, 다음은 태그(`<recipe>`, `<type>`, `<name>`)만 사용하고 특성은 사용하지 않는 XML 데이터입니다.

```xml
<recipe>
    <type>pasta</type>
    <name>Carbonara</name>
</recipe>
```

다음은 태그 `recipe`가 특성 `type`을 가지는 XML 예시입니다.

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

다음 이미지에서는 XML 형식의 Windows 이벤트 4625 로그와 구문 분석되어 JSON으로 출력된 동일한 로그를 나란히 보여줍니다. XML 로그를 구문 분석함으로써 로그 이벤트 크기가 약 30% 감소했습니다.

{{< img src="observability_pipelines/processors/xml-side-by-side.png" alt="XML 로그 및 결과로 생성된 JSON 형식의 구문 분석된 로그" style="width:80%;" >}}

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.

1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
   - 필터와 일치하는 로그만 처리됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. XML을 구문 분석하려는 로그 필드의 경로를 입력합니다. 하위 필드를 일치시키려면 `<OUTER_FIELD>.<INNER_FIELD>` 경로 표기법을 사용하세요. 아래의 [경로 표기법 예시](#path-notation-example-parse-xml)를 참조하세요.
1. 필요시 `Enter text key` 필드에 XML 특성이 추가될 때 텍스트 노드에 사용할 키 이름을 입력합니다. [텍스트 키 예시](#text-key-example)를 참조하세요. 필드를 비워 두면 `value`가 키 이름으로 사용됩니다.
1. 필요시 특성이 없는 경우에도 텍스트 키를 사용하여 객체 내부에 텍스트를 저장하려면 {{< ui >}}Always use text key{{< /ui >}}를 선택합니다.
1. 필요시 XML 특성을 포함하려면 {{< ui >}}Include XML attributes{{< /ui >}}를 켭니다. 그런 다음 사용하려는 특성 접두사를 추가하도록 선택할 수 있습니다. [특성 접두사 예시](#attribute-prefix-example)를 참조하세요. 필드를 비워 두면 원본 특성 키가 사용됩니다.
1. 필요시 데이터 유형을 숫자, 불리언 또는 null로 변환할지 선택합니다.
    - {{< ui >}}Numbers{{< /ui >}}를 선택하면 숫자가 정수 및 부동 소수점으로 구문 분석됩니다.
    - {{< ui >}}Booleans{{< /ui >}}를 선택하면 `true` 및 `false`가 불리언으로 구문 분석됩니다.
    - {{< ui >}}Nulls{{< /ui >}}를 선택하면 문자열 `null`이 null로 구문 분석됩니다.

### 경로 표기법 예시 {#path-notation-example-parse-xml}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

### Always use text key 예시 {#always-use-text-key-example}

{{< ui >}}Always use text key{{< /ui >}}를 선택하면 텍스트 키가 기본값(`value`)이 되며, 다음 XML이 생성됩니다.

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

XML은 다음과 같이 변환됩니다.

```json
{
    "recipe": {
        "type": "pasta",
        "value": "Carbonara"
        }
}
```

### 텍스트 키 예시 {#text-key-example}

키가 `text`이고 다음과 같은 XML이 있는 경우

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

XML은 다음과 같이 변환됩니다.

```json
{
    "recipe": {
        "type": "pasta",
        "text": "Carbonara"
        }
}
```

### 특성 접두사 예시 {#attribute-prefix-example}

{{< ui >}}Include XML attributes{{< /ui >}}를 활성화하면 특성이 각 XML 특성의 접두사로 추가됩니다. 예를 들어, 특성 접두사가 `@`이고 다음과 같은 XML이 있는 경우

```xml
<recipe type="pasta">Carbonara</recipe>
```

XML은 JSON으로 변환됩니다.

```json
{
    "recipe": {
        "@type": "pasta",
        "<text key>": "Carbonara"
        }
}
```

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][2] 및 [프로세서 버퍼 메트릭][3]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][4] 설명서를 참조하세요. Parse 프로세서 메트릭별로 필터링하거나 그룹화하려면 `component_type:parse` 태그를 사용하세요.

[1]: /ko/observability_pipelines/search_syntax/logs/
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}