---
disable_toc: false
further_reading:
- link: /observability_pipelines/guide/remap_reserved_attributes/
  tag: 설명서
  text: 예약된 특성 재매핑
- link: /logs/guide/regex_log_parsing/
  tag: 가이드
  text: 정규 표현식을 사용하여 효과적인 Grok 구문 분석 규칙 작성
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: 커스텀 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서를 Vector Remap Language(VRL)와 함께 사용하여 로그 또는 메트릭을 수정하고 보강할 수 있습니다. VRL은 데이터 변환을 위해 설계된 표현식 중심의 도메인 특화 언어입니다. 관측 가능성 사용 사례를 위한 내장 함수를 제공합니다. 다음과 같은 방법으로 커스텀 함수를 사용할 수 있습니다.

- [배열](#array)을 조작, [문자열](#string)을 조작, 및 기타 데이터 유형을 처리합니다.
- [Codec](#codec)을 사용하여 값을 인코딩 및 디코딩합니다.
값을 - [암호화](#encrypt) 및 [복호화](#decrypt)합니다.
- [하나의 데이터 유형을 다른 데이터 유형으로 강제 변환](#coerce)합니다(예: 정수에서 문자열로).
- [syslog 값을 읽기 쉬운 값으로 변환합니다](#convert).
- [보강 테이블](#enrichment)을 사용하여 값을 보강합니다.
- [IP 값을 조작합니다](#ip).
- Haversine을 사용하여 [지리적 거리](#map)와 방위를 계산합니다.
- [커스텀 규칙(예: grok, regex 등)과 기본 기능(예: syslog, apache, VPC flow logs 등)을 사용하여 값을 구문 분석합니다](#parse). 자세한 내용은 [정규 표현식을 사용한 효과적인 Grok 구문 분석 규칙 작성][3]을 참조하세요.
- 이벤트 [경로 조정](#path)

사용 가능한 전체 함수 목록은 [커스텀 함수](#custom-functions)를 참조하세요.

커스텀 프로세서를 사용하여 속성을 수동 및 동적으로 다시 매핑하는 방법은 [예약된 속성 다시 매핑][1]을 참조하세요.

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.

- 아직 함수를 생성하지 않았다면 {{< ui >}}Add custom processor{{< /ui >}}를 클릭하고 [함수 추가](#add-a-function) 지침에 따라 함수를 생성합니다.
- 사용자 지정 함수를 이미 추가했다면 {{< ui >}}Manage custom processors{{< /ui >}}를 클릭합니다. 목록에서 함수를 클릭하여 편집하거나 삭제합니다. 검색 창을 사용하여 이름으로 함수를 찾을 수 있습니다. {{< ui >}}Add Custom Processor{{< /ui >}}를 클릭하여 [함수 추가](#add-a-function)를 수행합니다.

### 함수 추가 {#add-a-function}

1. 커스텀 프로세서의 이름을 입력합니다.
1. [커스텀 함수][1]를 사용하여 데이터를 수정할 스크립트를 추가합니다. {{< ui >}}Autofill with Example{{< /ui >}}을 클릭하고 일반적인 사용 사례 중 하나를 선택하여 시작합니다. 예제 스크립트의 복사 아이콘을 클릭하고 스크립트에 붙여넣습니다. 자세한 내용은 [커스텀 프로세서 시작하기][2]를 참조하세요.
1. 선택적으로, 처리 중 오류가 발생한 이벤트를 삭제하려면 {{< ui >}}Drop events on error{{< /ui >}}를 선택합니다.
1. 샘플 이벤트를 입력합니다.
1. 함수가 이벤트를 처리하는 방식을 미리 보려면 {{< ui >}}Run{{< /ui >}}을 클릭합니다. 스크립트가 실행된 후 이벤트에 대한 출력을 확인할 수 있습니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 커스텀 함수 {#custom-functions}

{{< whatsnext desc="함수는 다음 범주로 구성됩니다." >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#array" >}}배열{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#codec" >}}Codec{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#convert" >}}변환{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#cryptography" >}}암호화{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#debug" >}}디버그{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#enrichment" >}}보강{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#ip" >}}IP{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#map" >}}맵{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#number" >}}숫자{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#object" >}}개체{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#parse" >}}구문 분석{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#path" >}}경로{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#random" >}}임의{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#string" >}}스트링{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#system" >}}시스템{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#timestamp" >}}타임스탬프{{< /nextlink >}}
    {{< nextlink href="observability_pipelines/processors/custom_processor/#type" >}}유형{{< /nextlink >}}
{{< /whatsnext >}}

{{< vrl-functions >}}

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][4] 및 [프로세서 버퍼 메트릭][5]에 대한 자세한 내용은 [파이프라인 사용량 메트릭][6] 문서를 참조하세요. 커스텀 프로세서 메트릭별로 필터링하거나 그룹화하려면 `component_type:remap_vrl` 태그를 사용하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/guide/remap_reserved_attributes
[2]: /ko/observability_pipelines/guide/get_started_with_the_custom_processor
[3]: /ko/logs/guide/regex_log_parsing/
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[5]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[6]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/