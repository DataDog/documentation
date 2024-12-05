---
aliases:
- /ko/graphing/widgets/alert_graph/
description: 시스템에 정의된 모니터의 현재 상태를 그래프화합니다.
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
title: 경고 그래프 위젯
widget_type: alert_graph
---

경고 그래프는 시스템에 정의된 모니터 대부분의 현재 상태를 보여주는 시계열 그래프입니다.

{{< img src="dashboards/widgets/alert_graph/alert_graph.png" alt="경고 그래프" >}}

이 위젯은 메트릭, 이상치, 아웃라이어, 예측, APM, 통합과 같은 기본 예약된 쿼리 경고 모니터에서 지원됩니다.

## 설정

### 구성

1. 이전에 생성한 모니터를 선택하여 그래프화합니다.
2. 시간대를 선택합니다.
3. 다음에서 시각화를 선택합니다.
    * 시계열
    * 상위 목록

## API

이 위젯을 **[대시보드 API][1]**와 함께 사용할 수 있습니다. [위젯 JSON 스키마 정의][2]에 관해서는 다음 테이블을 참고하세요.

{{< dashboards-widgets-api >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/latest/dashboards/
[2]: /ko/dashboards/graphing_json/widget_json/