---
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: 샘플 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서는 사용자가 정의한 비율로 로그를 샘플링하여 대표 하위 집합을 만들고 나머지 이벤트는 삭제합니다. 예를 들어, 이 프로세서를 사용하여 노이즈가 많은 중요하지 않은 서비스에서 이벤트의 20%를 샘플링할 수 있습니다.

샘플링은 필터 쿼리와 일치하는 이벤트에만 적용되며 다른 이벤트에는 영향을 주지 않습니다. 이 프로세서에서 이벤트가 삭제되면 해당 이벤트는 후속 프로세서로 전송되지 않습니다.

## 설정 {#setup}

샘플 프로세서를 설정하려면 다음 단계를 따르세요.
1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
    - 지정된 필터 쿼리와 일치하는 이벤트만 지정된 보존율로 샘플링됩니다.
    - 샘플링된 이벤트와 필터 쿼리와 일치하지 않는 이벤트가 파이프라인의 다음 단계로 전송됩니다.
1. 원하는 샘플링 비율을 {{< ui >}}Retain{{< /ui >}} 필드에 입력합니다. 예를 들어, `2`를 입력하면 필터 쿼리와 일치하는 모든 이벤트 중 2%의 이벤트가 보존됩니다.
1. 필요시 {{< ui >}}Group By{{< /ui >}} 필드를 입력하여 해당 필드의 각 고유 값에 대해 별도의 샘플링 그룹을 생성합니다. 예를 들어, `status:error` 및 `status:info`는 두 개의 고유한 필드 값입니다. 필드가 동일한 각 이벤트 버킷은 독립적으로 샘플링됩니다. 분할할 필드를 더 추가하려면 {{< ui >}}Add Field{{< /ui >}}를 클릭합니다. [그룹화 기준 예시](#group-by-example)를 참조하세요.

### 그룹화 기준 예시 {#group-by-example}

샘플 프로세서에 대해 다음과 같이 설정한 경우
- 필터 쿼리: `env:staging`
- 보관: 일치하는 이벤트 중 `40%`
- 그룹화 기준: `status` 및 `service`

{{< img src="observability_pipelines/processors/group-by-example-service.png" alt="예시 값이 포함된 샘플 프로세서" style="width:40%;" >}}

그러면 `env:staging`에서 `status` 및 `service`의 각 고유한 조합에 대한 이벤트 중 40%가 보관됩니다. 예:

- `status:info` 및 `service:networks`를 포함하는 이벤트 중 40%가 보관됩니다.
- `status:info` 및 `service:core-web`을 포함하는 이벤트 중 40%가 보관됩니다.
- `status:error` 및 `service:networks`를 포함하는 이벤트 중 40%가 보관됩니다.
- `status:error` 및 `service:core-web`을 포함하는 이벤트 중 40%가 보관됩니다.

[1]: /ko/observability_pipelines/search_syntax/logs/