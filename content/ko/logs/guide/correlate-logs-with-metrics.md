---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: 제한없는 로그 수집*
- link: /logs/live_tail/
  tag: 설명서
  text: Datadog 라이브 테일 기능
kind: 지침
title: 로그와 메트릭 상호 연결하기
---

## 개요

Datadog 앱 내에서 로그와 메트릭을 상호 연관시키는 몇 가지 방법이 있습니다. [로그 탐색기][1], [대시보드][2], [메트릭 탐색기][3] 등의 보기는 자세한 정보 패널 및 직각적인 화면 전환을 제공하여 문제의 맥락을 빠르게 파악하고 서비스 전체에 매핑할 수 있도록 도와드립니다.

본 지침에서는 이러한 보기에서 로그 및 메트릭을 상호 연관시키는 방법을 알아봅니다.

## 로그 탐색기

[로그 탐색기][4]에서 로그와 메트릭을 상호 연관시키려면

1. **콘텐츠** 컬럼에서 로그를 클릭합니다. 해당 로그에 대한 자세한 정보가 포함된 패널이 열립니다.
2. 패널의 **메트릭** 탭을 클릭합니다.

{{< img src="logs/guide/correlate-logs-with-metrics/log-explorer-metrics-tab.jpg" alt="로그 탐색기 메트릭" >}}

## 대시보드

[대시보드][5]의 로그와 메트릭을 연결하려면

1. 대시보드로 이동합니다.
2. 위젯의 데이터 포인트를 클릭하여 [그래프 메뉴][6]를 채웁니다.
3. 위젯에 **메트릭과 연관시키려는 로그 이벤트**가 포함되어 있는 경우
    1. **관련 로그 보기**를 선택하면 관련 로그에 대한 자세한 정보로 해당 패널이 채워집니다.
    2. 특정 로그 이벤트를 선택합니다.
    3. **메트릭** 탭을 클릭합니다.
4. 위젯에 **로그와 연관시키려는 메트릭**이 포함되어 있는 경우
    1. **관련 로그 보기**를 선택합니다.

## 메트릭 탐색기

[메트릭 탐색기][7] 페이지에서 로그와 메트릭을 상호 연관시키려면

1. 메트릭을 선택하여 그래프화합니다.
2. 그래프의 아무 지점이나 클릭하여 그래프 메뉴를 채웁니다.
3. **관련 로그 보기**를 선택합니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}
<br>
\*제한 없는 로그 수집은 Datadog, Inc.의 상표입니다.

[1]: /ko/logs/explorer/
[2]: /ko/dashboards/
[3]: /ko/metrics/explorer/
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/dashboard/lists
[6]: /ko/dashboards/widgets/#graph-menu
[7]: https://app.datadoghq.com/metric/explorer