---
aliases:
- /ko/graphing/widgets/change/
description: 선택한 기간 동안 값의 변화를 그래프화합니다.
further_reading:
- link: /monitors/types/metric/?tab=change
  tag: 설명서
  text: 모니터에서 변경 알림 탐지를 설정하세요.
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/graphing_json/widget_json/
  tag: 설명서
  text: 위젯 JSON 스키마
- link: /dashboards/graphing_json/request_json/
  tag: 설명서
  text: JSON 스키마 요청
title: 변경 위젯
widget_type: 변경
---

변경 그래프는 일정 시간 동안 메트릭의 변화를 보여줍니다. 일정 임계값에 대해 N분 이전 및 현재 간 값의 절대 또는 상대(%) 변화를 비교합니다. 비교된 데이터 포인트는 단일 포인트가 아니라 메트릭 정의 섹션에서 파라마터를 사용해 계산됩니다. 자세한 정보는 [메트릭 모니터][6] 설명서와 [변경 알림 모니터 가이드][7]를 참조하세요.

{{< img src="/dashboards/widgets/change/change_widget.png" alt="Example of a change widget for jvm.heap_memory metric" style="width:100%;" >}}

## 설정

### 설정

1. 그래프화할 메트릭을 선택합니다.
2. 집계 함수를 선택합니다.
3. 선택 사항: 위젯에 대한 특정 컨텍스트를 선택합니다.
4. `host` 또는 `service`와 같은 태그 키로 집계를 분류합니다.
5. 다음에서 "비교 대상" 기간의 값을 선택합니다.
    * 한 시간 전
    * 하루 전
    * 한 주 전
    * 한 달 전
6. `relative` 또는 `absolute` 변경 중에서 하나를 선택합니다.
7. 다음에서 메트릭이 정렬되는 필드를 선택합니다.
    * `change`
    * `name`
    * `present value`
    * `past value`
8. `ascending` 또는 `descending` 순서를 선택합니다.
9. 그래프에 현재 값을 표시할지 여부를 선택합니다.

### 옵션

#### 컨텍스트 링크

[컨텍스트 링크][1]는 기본적으로 활성화되어 있으며, 켜거나 끌 수 있습니다. 컨텍스트는 대시보드 위젯을 다른 페이지(Datadog 또는 제3자)와 연결합니다.

## API

이 위젯은 **[대시보드 API][2]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][3]에 대한 다음 표를 참조하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/guide/context-links/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/
[6]: /ko/monitors/types/metric/?tab=change
[7]: /ko/monitors/guide/change-alert/