---
aliases:
- /ko/graphing/widgets/change/
description: 선택한 기간 동안 값의 변화를 그래프화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/graphing_json/widget_json/
  tag: 설명서
  text: 위젯 JSON 스키마
- link: /dashboards/graphing_json/request_json/
  tag: 설명서
  text: 요청 JSON 스키마
kind: 설명서
title: 변경 위젯
---
변경 그래프는 일정 기간 동안 메트릭의 변경을 보여줍니다.

{{< img src="dashboards/widgets/change/change.png" alt="변경 그래프" >}}

## 구성

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

### 디스플레이 기본 설정

위젯이 커스텀 시간 프레임을 사용하는지 또는 대시보드의 글로벌 시간 프레임을 사용하는지 선택합니다.

### 타이틀

위젯의 커스텀 타이틀을 선택하거나, 생성된 타이틀을 사용하려면 양식을 비워 둡니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [Dashboards API documentation][1]을 참조하세요.

변경 위젯의 전용 [위젯 JSON 스키마 정의][2]는 다음과 같습니다.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/