---
description: Split Array 프로세서를 사용하여 중첩된 배열을 개별 이벤트로 분할하여 데이터를 쿼리, 필터링 및 시각화하고 관련 경보를
  생성하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Split Array 프로세서
---
{{< product-availability >}}

## 개요 {#overview}

이 프로세서는 중첩된 배열을 개별 이벤트로 분할하여 배열 내의 데이터를 쿼리, 필터링 및 시각화하고 관련 경보를 생성할 수 있도록 합니다. 배열은 이미 구문 분석되어 있어야 합니다. 예를 들어, 이 프로세서는 `[item_1, item_2]`를 처리할 수 있지만 `"[item_1, item2]"`는 처리할 수 없습니다. 배열의 항목은 JSON 객체, 문자열, 정수, 부동 소수점 또는 부울일 수 있습니다. 수정되지 않은 모든 필드는 하위 이벤트에 추가됩니다. 예를 들어, Observability Pipelines Worker로 다음 항목을 전송하는 경우

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": [item_1, item_2]
}
```

Split Array 프로세서를 사용하여 `batched_items`의 각 항목을 별도의 이벤트로 전송하세요.

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_1
}
```

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_2
}
```

더 자세한 예시는 [배열 분할 예시](#split-array-example)를 참조하세요.

## 설정 {#setup}

이 프로세서를 설정하려면 다음 단계를 따르세요.

{{< ui >}}Manage arrays to split{{< /ui >}}을 클릭하여 분할할 배열을 추가하거나 기존 배열을 편집하여 분할합니다. 이렇게 하면 사이드 패널이 열립니다.

- 아직 배열을 생성하지 않은 경우, 아래의 [새 배열 추가](#add-a-new-array) 섹션에 설명된 대로 배열 파라미터를 입력합니다.
- 이미 배열을 생성한 경우, 표에서 해당 배열의 행을 클릭하여 편집하거나 삭제합니다. 검색 창을 사용하여 특정 배열을 찾은 다음 해당 배열을 선택하여 편집하거나 삭제합니다. {{< ui >}}Add Array to Split{{< /ui >}}을 클릭하여 새 배열을 추가합니다.

### 새 배열 추가 {#add-a-new-array}

1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][1]을 참조하세요.
   - 필터와 일치하는 로그만 처리됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. 배열 필드의 경로를 입력합니다. 하위 필드를 일치시키려면 `<OUTER_FIELD>.<INNER_FIELD>` 경로 표기법을 사용하세요. 아래의 [경로 표기법 예시](#path-notation-example-split-array)를 참조하세요.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### 배열 분할 예시 {#split-array-example}

다음은 이벤트 예시입니다.

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {
            "timestamp":14500000,
            "firstarray":["one", 2]
        },
    },
    "secondarray": [
    {
        "some":"json",
        "Object":"works"
    }, 44]
}
```

프로세서가 `"message.myfield.firstarray"` 및 `"secondarray"` 배열을 분할하는 경우, 상위 이벤트와 동일한 하위 이벤트가 출력됩니다. 단, `"message.myfield.firstarray"` 및 `"secondarray",`의 값은 예외입니다. 이러한 값은 각각 원래 배열의 단일 항목이 됩니다. 각 하위 이벤트는 두 배열 항목의 고유한 조합이므로 이 예시에서는 4개의 하위 이벤트(2개 항목 * 2개 항목 = 4개 조합)가 생성됩니다.

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
    },
    "secondarray": {
        "some":"json",
        "Object":"works"
    }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
        },
    "secondarray": 44
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": {
            "some":"json",
            "object":"works"
        }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": 44
}
```

### 경로 표기법 예시 {#path-notation-example-split-array}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /ko/observability_pipelines/search_syntax/logs/