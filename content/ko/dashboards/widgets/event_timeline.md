---
aliases:
- /ko/graphing/widgets/event_timeline/
description: 이벤트 스트림 타임라인을 위젯에 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 이벤트 타임라인 위젯
---

이벤트 타임라인은 [이벤트 익스플로러 보기][1] 상단에 표시되는 타임라인의 위젯 버전입니다.

{{< img src="dashboards/widgets/event_timeline/event_timeline.png" alt="이벤트 타임라인 예시" >}}

## 구성

{{< img src="dashboards/widgets/event_timeline/event_timeline_setup.png" alt="이벤트 타임라인 예시" style="width:80%;">}}

### 설정

1. 이벤트 스트림을 필터링하려면 [검색 쿼리][1]를 입력하세요.
2. 스크린보드에만 해당: 위젯에 사용자 지정 기간이 있는지 또는 스크린보드의 글로벌 기간이 있는지 선택하세요.

### 옵션

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 사용자 지정 제목을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 [Dashboards API][2]와 함께 사용할 수 있습니다.

이벤트 타임라인 위젯의 전용 [위젯 JSON 스키마 정의][3]는 다음과 같습니다:

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/events/
[2]: /ko/api/latest/dashboards/
[3]: /ko/dashboards/graphing_json/widget_json/