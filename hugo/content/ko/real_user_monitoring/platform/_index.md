---
description: Datadog 플랫폼 기능을 활용하여 RUM 기능을 극대화하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에 대해 자세히 알아보기
title: 플랫폼
---

## 개요

RUM 애플리케이션에 대한 데이터 수집을 시작하면 Datadog 플랫폼 기능을 활용하여 RUM 및 연결된 스택의 나머지 부분에서 데이터를 시각화, 모니터링 및 분석할 수 있습니다.

## 대시보드 생성
[대시보드][1]를 사용하여 주요 성능 및 사용량 메트릭을 추적, 분석 및 표시합니다.

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="RUM 대시보드" >}}

## 모니터 설정
팀에 알리도록 [모니터][2]를 설정하고 Alerting 플랫폼에서 알림을 손쉽게 관리하세요.

{{< img src="monitors/monitor_types/rum/rum_multiple_queries_2.png" alt="장바구니 페이지의 오류율을 경고하도록 구성된 모니터입니다. 이 모니터에는 두 개의 쿼리(a 및 b)가 있으며 공식(a/b)*100이 포함되어 있습니다." style="width:80%;" >}}

## 커스텀 메트릭 생성
[커스텀 메트릭][3]을 생성하여 최대 15개월의 장기간에 걸쳐 애플리케이션 KPI를 추적합니다.

{{< img src="real_user_monitoring/generate_metrics/generate_metric_example.png" alt="RUM 기반 커스텀 메트릭 생성" width="80%" >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/platform/dashboards
[2]: /ko/monitors/types/real_user_monitoring/
[3]: /ko/real_user_monitoring/platform/generate_metrics