---
aliases:
- /ko/graphing/widgets/alert_value/
description: 시스템에 정의된 메트릭 모니터에서 메트릭의 현재 값을 그래프로 표시하세요.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
kind: 설명서
title: 경고 값 위젯
---

경고 값은 쿼리 값들이며 해당 값들은 시스템에 정의된 메트릭 모니터에 있는 메트릭의 현재 값을 표시하는 쿼리 값입니다.

{{< img src="dashboards/widgets/alert_value/alert_value.png" alt="경고 값" >}}

## 구성
{{< img src="dashboards/widgets/alert_value/alert_value_setup.png" alt="경고 값 구성" style="width:80%;">}}

### 설정

1. 이전에 만든 메트릭 모니터를 선택하여 그래프로 표시하세요.
2. 표시할 형식을 선택하세요.
    * 원시 값
    * 0/1/2/3 소수점
3. 표시하려면 선택하세요.
    * `Automatic`
    * `/s` 초당
    * `b` 비트
    * `B` 바이트
    * `Custom`

### 옵션

#### 타이틀

`Show a Title` 확인란을 활성화하여 위젯의 커스텀 타이틀을 표시하세요.

{{< img src="dashboards/widgets/options/title.png" alt="위젯 타이틀" style="width:80%;">}}

선택적으로 크기와 정렬을 정의할 수 있습니다.

## API

이 위젯은 **Dashboards API**와 함께 사용할 수 있습니다. 더 많은 정보를 얻으시려면 [대시보드 API 가이드][1]를 참조하세요.

경고 값 위젯의 전용 [위젯 JSON 스키마 정의][2]는 다음과 같습니다:

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v1/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/