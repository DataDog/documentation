---
aliases:
- /ko/graphing/widgets/event_stream/
description: 이벤트 스트림에서 필터링된 이벤트를 표시합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 이벤트 스트림 위젯
---

이벤트 스트림은 [이벤트 탐색기 보기][1]에 있는 이벤트 스트림의 위젯 버전입니다.

**참고:** 이 위젯은 가장 최근 이벤트 100개만 표시합니다.

## 구성

### 설정

1. 이벤트 스트림을 필터링하려면 [검색 쿼리][2]를 입력하세요.
2. (스크린보드에서만 해당) 위젯에 커스텀 타임프레임이 있는지 또는 스크린보드의 글로벌 타임프레임이 있는지 선택합니다.
3. 크기 파라미터를 사용하여 이벤트 타이틀만 표시할지 또는 전체 이벤트 본문을 표시할지 선택합니다.
4. 그래프에 타이틀을 지정합니다.
5. **Done** 버튼을 클릭합니다.

## API

이 위젯은 [Dashboards API][3]와 함께 사용할 수 있습니다.

이벤트 스트림 위젯에 대한 전용 [위젯 JSON 스키마 정의][4]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/events/
[2]: /ko/events/explorer/#search-syntax
[3]: /ko/api/latest/dashboards/
[4]: /ko/dashboards/graphing_json/widget_json/