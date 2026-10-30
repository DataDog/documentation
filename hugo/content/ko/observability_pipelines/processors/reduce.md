---
description: Reduce 프로세서를 사용하여 지정된 필드와 병합 전략을 기준으로 여러 로그 이벤트를 하나의 로그로 그룹화하는 방법을 학습합니다.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Reduce 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

Reduce 프로세서는 지정된 필드와 선택한 병합 전략을 기반으로 여러 로그 이벤트를 단일 로그로 그룹화합니다. 로그는 10초 간격으로 그룹화됩니다. 그룹에 대한 간격이 경과하면 해당 그룹의 축소된 로그가 다음 단계인 파이프라인으로 전송됩니다.

## 설정 {#setup}

다음에 따라 Reduce 프로세서를 설정합니다.
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 지정된 필터 쿼리와 일치하는 로그만 처리됩니다. 축소된 로그와 필터 쿼리와 일치하지 않는 로그가 다음 단계인 파이프라인으로 전송됩니다. 자세한 내용은 [검색 구문][1]을 참조하세요.
2. {{< ui >}}Group By{{< /ui >}} 섹션에서 로그를 그룹화할 필드를 입력합니다.
3. {{< ui >}}Add Group by Field{{< /ui >}}을 클릭하여 추가 필드를 추가합니다.
4. {{< ui >}}Merge Strategy{{< /ui >}} 섹션에서:
   - {{< ui >}}On Field{{< /ui >}}에 로그를 병합할 필드 이름을 입력합니다.
   - {{< ui >}}Apply{{< /ui >}} 드롭다운 메뉴에서 병합 전략을 선택합니다. 이벤트 결합에 사용되는 전략입니다. 사용 가능한 전략에 대한 설명은 [병합 전략](#merge-strategies) 섹션을 참조하세요.
   - {{< ui >}}Add Merge Strategy{{< /ui >}}을 클릭하여 추가 전략을 추가합니다.

### 병합 전략 {#merge-strategies}

로그 이벤트를 결합하는 데 사용할 수 있는 병합 전략입니다.


| 이름           | 설명                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Array          | 각 값을 배열에 추가합니다.                                                                                    |
| Concat         | 각 문자열 값을 공백으로 구분하여 연결합니다.                                                            |
| Concat newline | 각 문자열 값을 새 행으로 구분하여 연결합니다.                                                          |
| Concat raw     | 각 문자열 값을 구분 기호 없이 연결합니다.                                                               |
| Discard        | 수신한 첫 번째 값을 제외한 모든 값을 삭제합니다.                                                      |
| Flat unique    | 수신한 모든 고유 값의 평탄화된 배열을 생성합니다.                                                 |
| Longest array  | 수신한 가장 긴 배열을 유지합니다.                                                                         |
| Max            | 수신한 최대 숫자 값을 유지합니다.                                                                 |
| Min            | 수신한 최소 숫자 값을 유지합니다.                                                                 |
| Retain         | 수신한 마지막 값을 제외한 모든 값을 삭제합니다. \`null\`을 유지하지 않음으로써 병합하는 방식으로 작동합니다. |
| Shortest array | 수신한 가장 짧은 배열을 유지합니다.                                                                        |
| Sum            | 수신한 모든 숫자 값을 합산합니다.                                                                        |

## 상태 메트릭 {#health-metrics}

모든 프로세서에서 내보내는 [구성 요소 메트릭][2] 및 [프로세서 버퍼 메트릭][3]에 대한 자세한 내용은 [Pipelines 사용량 메트릭][4] 설명서를 참조하세요.

### Reduce 메트릭 {#reduce-metrics}

- `component_id` 태그를 사용하여 개별 구성 요소별로 필터링하거나 그룹화하세요.
- 태그는 `component_type` 이러한 메트릭에 대해 `reduce`입니다.

`pipelines.stale_events_flushed_total`
: **설명**: 프로세서가 플러시한 만료된 이벤트의 수입니다.
: **메트릭 유형**: 개수

[1]: /ko/observability_pipelines/search_syntax/logs/
[2]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/