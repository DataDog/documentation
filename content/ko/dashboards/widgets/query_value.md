---
aliases:
- /ko/graphing/widgets/query_value/
description: 주어진 메트릭 쿼리에 대해 집계된 값 표시
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 쿼리 값 위젯
widget_type: query_value
---

쿼리 값은 주어진 메트릭, APM 또는 로그 쿼리의 현재 값을 표시합니다. 해당 값이 예상 범위에 있는지 여부를 나타내기 위해 조건부 서식(예: 녹색/노란색/빨간색 배경)이 제공됩니다. 이는 시계열 데이터의 부수적인 배경으로 보완될 수 있습니다. 쿼리 값으로 표시되는 값은 즉각적인 측정이 필요하지 않습니다.

위젯은 보고된 최신 값 또는 해당 기간에 걸친 모든 쿼리 값에서 계산된 집계 결과를 표시할 수 있습니다. 이러한 시각화는 인프라스트럭처 쿼리를 보여주는, 협소하지만 명확한 창을 제공합니다.

{{< img src="dashboards/widgets/query_value/query_value1.png" alt="쿼리 값 위젯" style="width:80%;" >}}

## 설정

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="쿼리 값 위젯 구성" style="width:80%;">}}

### 구성

1. 그래프화할 데이터를 선택합니다.
    * 메트릭: 메트릭 쿼리를 구성하려면 [쿼리 가이드][1]를 참조하세요.
    * 인덱싱 스팬: 인덱싱 스팬 쿼리를 구성하려면 [트레이스 검색 가이드][2]를 참조하세요.
    * 로그 이벤트: 로그 이벤트 쿼리를 구성하려면 [로그 검색 가이드][3]를 참조하세요.
2. 쿼리 값을 지정된 시간 프레임에 속하는 모든 데이터 포인트의 `avg`, `min`, `sum`, `max` 또는 `last` 값으로 계산되는 단일 값으로 줄입니다. 지원되는 경우 `p75` 또는 `p90` 같은 퍼센트값이 사용될 수도 있습니다.
3. 단위와 형식을 선택합니다. 자동 형식은 단위에 따라 대시보드를 확장합니다.
4. 옵션으로 표시되는 값에 따라 조건부 서식을 설정할 수 있습니다. 더 많은 예제는 [시각적 서식 규칙](#visual-formatting-rules)을 참조하세요.
5. (선택 사항) 다음과 같이 시계열 배경을 오버레이합니다.
    * Min to Max: 하한에서 상한을 보여주는 확장 그래프.
    * Line: 영(0)을 포함하는 확장 그래프.
    * Bars: 불연속적이고 주기적인 측정 값을 표시.

### 옵션

#### 시각적 서식 규칙

<div class="alert alert-info">시각적 서식 규칙은 메트릭의 원시 값에 기반해야 합니다. 메트릭 기본 단위는 나노초이지만, 쿼리 값이 초로 자동 서식 지정되는 경우 조건부 규칙은 나노초를 기준으로 해야 합니다.</div>

조건부 규칙을 사용하여 쿼리 값 위젯의 배경을 사용자 지정합니다. 배경색, 글꼴색 또는 커스텀 이미지를 추가할 수 있습니다. 커스텀 이미지를 사용할 경우 로컬 컴퓨터에서 이미지를 업로드하거나 공용 인터넷의 이미지를 참조할 수 있습니다. 내부 이미지를 참조하려면 내부 서버를 업데이트하여 교차 출처 요청을 지원합니다.

{{< img src="dashboards/widgets/query_value/visual_formatting_rules_custom_img.png" alt="커스텀 이미지 배경을 적용한 쿼리 값 위젯 시각적 서식 규칙" style="width:90%;" >}}

#### 컨텍스트 링크

기본값으로 [컨텍스트 링크][4]가 활성화되어 있고 활성화 및 비활성화로 토글할 수 있습니다. 컨텍스트 링크로 대시보드 위젯과 Datadog의 다른 페이지나 타사 애플리케이션를 연결할 수 있습니다.

#### 글로벌 시간

위젯이 커스텀 타임프레임을 사용하는지 또는 대시보드의 글로벌 타임프레임을 사용하는지 선택합니다.

## API

이 위젯을 **[Dashboards API][5]**와 사용할 수 있습니다. [위젯 JSON 스키마 정의][6]를 보려면 다음 표를 참고하세요.

{{< dashboards-widgets-api >}}

### 트러블슈팅
 - 쿼리에서 백분위수 값을 사용하여 기본 데이터 포인터를 집계하는 경우, 위젯에서 반환되는 값이 다른 시간 범위 전반에서 동일하게 유지될 수도 있습니다. 기본 데이터 포인트의 샘플 크기가 큰 경우 이러한 동작을 예상할 수 있습니다. 이러한 값의 변화는 일반적으로 더 좁은 시간 범위에서 더 쉽게 찾아볼 수 있습니다. 이 개념에 대한 자세한 내용은 [큰 수의 법칙][7]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/querying/#overview
[2]: /ko/tracing/trace_explorer/query_syntax/#search-bar
[3]: /ko/logs/search_syntax/
[4]: /ko/dashboards/guide/context-links/
[5]: /ko/api/latest/dashboards/
[6]: /ko/dashboards/graphing_json/widget_json/
[7]: https://en.wikipedia.org/wiki/Law_of_large_numbers