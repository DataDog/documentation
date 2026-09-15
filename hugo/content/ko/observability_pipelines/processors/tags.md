---
aliases:
- /ko/observability_pipelines/processors/tag_control/logs/
description: Datadog Agent에서 생성된 로그에 사용되는 Datadog 태그 배열에서 특정 태그를 제외하거나 포함하도록 태그 프로세서를
  사용하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Tags Processor
---
{{< product-availability >}}

## 개요 {#overview}

Datadog Agent에서 수신되는 로그의 경우, 이 프로세서를 사용하여 Datadog 태그(`ddtags`) 배열에서 특정 태그를 제외하거나 포함하세요. 제외되거나 포함되지 않은 태그는 삭제되며, 이로 인해 아웃바운드 로그의 볼륨이 줄어들 수 있습니다.

## 설정 {#setup}

프로세서를 설정하려면 다음 단계를 따르세요.

1. {{< ui >}}filter query{{< /ui >}}를 정의합니다. 자세한 내용은 [로그 검색 구문][2]을 참조하세요.
   - 필터와 일치하는 로그만 처리됩니다.
   - 모든 로그는 필터 쿼리와 일치하는지 여부에 관계없이 파이프라인의 다음 단계로 전송됩니다.
1. 필요시 {{< ui >}}Configure tags{{< /ui >}} 섹션에 Datadog 태그 배열을 입력합니다. 지원되는 형식은 `["key:value", "key"]`입니다. `key:value`형식에 대한 자세한 내용은 [태그 정의][1]를 참조하세요.
1. {{< ui >}}Configure tags{{< /ui >}} 섹션에서 {{< ui >}}Exclude tags{{< /ui >}} 또는 {{< ui >}}Include tags{{< /ui >}}를 선택합니다. 이전 단계에서 태그 배열을 입력한 경우, 구성할 태그 키를 선택하세요. 태그 키를 수동으로 추가할 수도 있습니다. **참고**: 태그는 최대 100개까지 선택할 수 있습니다.

[1]: /ko/getting_started/tagging/#define-tags
[2]: /ko/observability_pipelines/search_syntax/logs/