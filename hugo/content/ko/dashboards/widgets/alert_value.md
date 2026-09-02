---
aliases:
- /ko/graphing/widgets/alert_value/
description: 시스템에 정의된 간단 알림 메트릭을 어떤 것이든 사용해 현재 값을 그래프로 표시할 수 있습니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 경고 값 위젯
widget_type: alert_value
---

알림 값 위젯에는 간단 알림 메트릭 모니터의 현재 쿼리 값을 표시합니다. 간단 알림 모니터에는 그룹화되지 않고 값을 하나만 반환하는 메트릭 쿼리가 있습니다. 대시보드에 알림 값 위젯을 사용해 모니터 동작과 알림 상태의 개요를 확인할 수 있습니다.

{{< img src="dashboards/widgets/alert_value/alert_value_2023.png" alt="디스크 공간, 높은 CPU, 구매 오류율의 상태 모니터를 나타내는 알림 값 위젯 3개" >}}

## 설정
{{< img src="dashboards/widgets/alert_value/alert_value_setup_2023.png" alt="높은 CPU 모니터의 알림 값 설정 페이지" style="width:100%;">}}

### 설정

1. 그래프로 만들 기존 메트릭 모니터를 선택하세요.
2. 표시할 형식을 선택하세요.
    * 10진수
    * 유닛
    * 맞춤
3. 그래프 이름을 입력하세요.

## API

이 위젯을 **[대시보드 API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]와 관해서는 다음 테이블을 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/