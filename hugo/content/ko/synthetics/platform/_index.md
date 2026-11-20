---
description: Datadog 플랫폼 기능을 활용하여 Synthetic Monitoring 기능을 극대화하는 방법을 알아보세요.
further_reading:
- link: /continuous_testing/explorer
  tag: 설명서
  text: Synthetics Monitoring & Testing Results Explorer에 대해 알아보세요.
title: 플랫폼
---
## 개요 {#overview}

Synthetic 테스트 데이터 수집을 시작하면 Datadog 플랫폼 기능을 활용하여 Synthetic 테스트 및 모니터링과 연결된 나머지 기술 스택 전반의 데이터를 시각화, 모니터링 및 분석할 수 있습니다. 

## 대시보드 생성 및 조회 {#create-and-view-dashboards}
[대시보드][1]를 사용하여 Synthetic 테스트의 주요 성능 및 사용량 메트릭을 추적, 분석 및 표시하세요.

{{< img src="synthetics/platform/synthetics_dashboards_2.png" alt="상단 Synthetics 탐색 메뉴에서 Dashboards가 강조 표시된 스크린샷" >}}

## 모니터링 조회 {#view-monitors}
Synthetic 테스트에서 팀에 알림을 보내기 위해 자동으로 생성된 관련 [모니터링][2]을 조회하고, Alerting 플랫폼에서 경보를 한눈에 관리하세요.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Synthetic 테스트 모니터링" style="width:100%;">}}

## 메트릭 조회 {#view-metrics}
Synthetic Monitoring 테스트 및 Continuous Testing 설정에서 생성된 [메트릭][3]을 조회하세요.

## 테스트 커버리지 살펴보기 {#explore-test-coverage}

RUM 애플리케이션의 전반적인 테스트 커버리지에 대한 인사이트를 얻으려면[{{< ui >}}Test Coverage{{< /ui >}}][4] 페이지를 살펴보세요.

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Overview, Untested Actions 및 Tested Actions 섹션이 표시된 Test Coverage 페이지" style="width:100%" >}}

## Synthetic Monitoring 테스트와 APM 연결 {#connect-synthetic-monitoring-testing-and-apm}
[APM 연결][5]을 통해 관련 트레이스를 자세히 분석하고 실패한 Synthetic 테스트의 근본 원인을 파악하세요.

{{< img src="tracing/index/Synthetics.png" alt="Synthetic 테스트" style="width:100%;">}}

## Synthetic Monitoring과 RUM 연결 {#connect-synthetic-monitoring-and-rum}

[RUM 연결][6]을 통해 Synthetic 브라우저 테스트 실행에서 생성된 RUM 데이터, Session Replay 및 Error Tracking을 조회하세요.

{{< img src="synthetics/guide/rum_in_synthetics/view_session_in_rum_2.png" alt="Synthetic 브라우저 테스트 실행으로 생성된 RUM 세션으로, 오류, 액션 및 로드된 뷰가 표시된 모습입니다." style="width:100%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/platform/dashboards
[2]: /ko/synthetics/guide/synthetic-test-monitors/
[3]: /ko/synthetics/platform/metrics
[4]: /ko/synthetics/platform/test_coverage
[5]: /ko/synthetics/platform/apm
[6]: /ko/synthetics/platform/rum