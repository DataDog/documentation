---
description: Deduplicate 프로세서를 사용하여 로그 데이터 복사본을 제거하고 볼륨 및 노이즈를 줄이는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Deduplicate 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

Deduplicate 프로세서는 데이터 복사본을 제거하여 볼륨과 노이즈를 줄입니다. 메시지를 캐싱하고 유입되는 로그 트래픽을 캐시된 메시지와 비교합니다. 예를 들어, 동일한 경고 로그가 연속으로 여러 번 전송되는 경우, 이 프로세서를 사용하여 고유한 경고 로그만 유지할 수 있습니다.

## 설정 {#setup}

Deduplicate 프로세서를 설정하려면 다음 단계를 따르세요.

1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
   - 지정된 필터 쿼리와 일치하는 로그만 처리됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. {{< ui >}}Type of deduplication{{< /ui >}}드롭다운에서 래에 지정된 필드를 `Match`할지 또는 `Ignore`할지 선택합니다.
    - `Match`를 선택하면 로그가 통과한 후 아래에 지정한 모든 필드 값이 동일한 향후 로그가 제거됩니다.
    - `Ignore`를 선택하면 로그가 통과한 후 아래에 지정한 필드를 *제외하고* 모든 필드 값이 동일한 향후 로그가 제거됩니다.
1. 일치시키거나 무시할 필드를 입력합니다. 최소 하나의 필드가 필요하며, 최대 3개의 필드를 지정할 수 있습니다.
    - 하위 필드를 일치시키려면 `<OUTER_FIELD>.<INNER_FIELD>` 경로 표기법을 사용하세요. 아래의 [경로 표기법 예시](#path-notation-example)를 참조하세요.
1. {{< ui >}}Add field{{< /ui >}}를 클릭하여 필터링할 필드를 추가합니다.

### 선택적 설정 {#optional-settings}

#### 캐시 크기 {#cache-size}

기본 캐시 크기는 5,000개 메시지입니다(권장). 캐시된 메시지는 들어오는 메시지가 중복인지 판단하기 위해 메모리에 보관됩니다. 필요에 따라 캐시 크기를 늘릴 수 있습니다.

**참고**:
- 캐시 크기를 늘리면 메모리 사용량이 증가합니다.
- 캐시는 LRU 캐시를 기반으로 하며, LRU 캐시 크기는 구성된 캐시 크기와 동일합니다.
- 캐시는 Worker 간에 공유되지 않으므로 동일한 Worker에 의해 처리된 중복 이벤트만 삭제됩니다.

### 경로 표기법 예시 {#path-notation-example}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /ko/observability_pipelines/search_syntax/logs/