---
aliases:
- /ko/dashboards/guide/semantic_colors
further_reading:
- link: /dashboards/guide/widget_colors/#categorical-palettes
  tag: 설명서
  text: 그래프에 적합한 색상 선택하기
title: 호환 시맨틱 태그
---

## 개요

호환 데이터 시리즈의 경우 Datadog은 의미에 컬러를 매핑할 수 있습니다. 호환 태그가 감지되면 Datadog은 시맨틱 컬러 팔레트를 제안해 드립니다. 해당 기능은 데이터를 의미에 따라 컬러에 자동 매핑합니다.

**참고**: 시맨틱 컬러 팔레트를 사용하려면 쿼리를 단일 태그 세트로 반드시 그룹화해야 합니다.

### 호환 태그를 의미에 따라 컬러에 매핑합니다.

예를 들어, 오류 상태 코드는 빨간색으로 매핑되고 성공은 녹색으로 매핑됩니다.

{{< img src="/dashboards/guide/compatible_semantic_tags/semantic_option.png" alt="그래프 에디터의 시맨틱 컬러 옵션" style="width:100%;" >}}

### 차트 전반에 일관된 컬러 지정 보장

시맨틱 팔레트가 있는 차트는 각 태그에 대해 일관적이고 동일한 색상을 사용합니다. 본 기능을 통해 여러 그래프에서 해당 태그를 쉽게 추적할 수 있습니다.

### 그룹화 동작

태그 단일 집합으로 그룹화된 쿼리가 지원됩니다. 시맨틱 팔레트와 함께 여러 그룹화 기능을 사용하는 경우 컬러는 일관되게 지정되나 의미를 기반으로 하지는 않습니다.

{{< img src="/dashboards/guide/compatible_semantic_tags/multiple_tags.png" alt="시맨틱 팔레트를 사용한 다중 태그 그래프 예시" style="width:100%;" >}}

예를 들어, `Status`과 `Service` 태그를 모두 사용하는 쿼리를 떠올려 보세요. 시맨틱 팔레트를 선택하더라도 차트의 컬러는 특정 의미를 뜻하지 않습니다(예: 빨간색은 더 이상 '나쁨'을 뜻하지 않음). 그러나 각 상태/서비스 조합은 차트 전반에서 일관된 컬러로 유지됩니다.

## 지원되는 태그 키

{{% semantic-color %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}