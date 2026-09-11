---
description: Datadog 플랫폼 기능을 활용하여 신서틱(Synthetic) 기능을 극대화하는 방법을 알아보세요.
further_reading:
- link: /continuous_testing/explorer
  tag: 설명서
  text: Synthetics Monitoring & Testing Results Explorer에 대해 알아보기
title: 플랫폼
---

## 개요

신서틱(Synthetic) 테스트를 위한 데이터 수집을 시작하면 Datadog 플랫폼 기능을 활용하여 신서틱(Synthetic) 테스트 및 모니터링과 연결된 스택의 나머지 부분에서 데이터를 시각화, 모니터링 및 분석할 수 있습니다.

## 대시보드 생성 및 확인
[대시보드][1]를 사용하여 신서틱(Synthetic) 테스트의 주요 성능 및 사용량 메트릭을 추적, 분석, 표시합니다.

{{< img src="synthetics/platform/synthetics_dashboards_2.png" alt="대시보드가 강조 표시된 상위 Synthetics 탐색을 보여주는 스크린샷" >}}

## 모니터 확인
신서틱(Synthetic) 테스트에서 자동으로 생성된 관련 [모니터][2]를 통해 팀에 알리고 알림 플랫폼에서 알림을 한 눈에 관리하세요.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="신서틱 테스트 모니터" style="width:100%;">}}

## 보기 메트릭
신서틱(Synthetic) 모니터링 테스트 및 연속 테스트 설정에 의해 생성된 [메트릭][3]을 확인하세요.

## 테스트 범위 살펴보기

RUM 애플리케이션의 전체 테스트 범위에 대한 인사이트를 얻으려면 [Test Coverage]][4] 페이지를 살펴보세요.

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Overview 섹션, Untested Actions 섹션 및  Tested Actions 섹션이 있는 Test Coverage 페이지" style="width:100%" >}}

## 신서틱(Synthetic) 테스트와 APM 연결
[APM을 연결][4]하여 관련 트레이스를 조사하고 실패한 신서틱(Synthetic) 테스트의 근본 원인을 파악합니다.

{{< img src="tracing/index/Synthetics.png" alt="신서틱 테스트" style="width:100%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/platform/dashboards
[2]: /ko/synthetics/guide/synthetic-test-monitors/
[3]: /ko/synthetics/platform/metrics
[4]: /ko/synthetics/platform/test_coverage
[5]: /ko/synthetics/platform/apm