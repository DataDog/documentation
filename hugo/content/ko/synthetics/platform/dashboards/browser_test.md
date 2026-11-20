---
aliases:
- /ko/synthetics/dashboards/browser_test
description: 기본 제공 신서틱(Synthetic) 브라우저 테스트 성능 대시보드에 대해 알아보세요.
further_reading:
- link: /continuous_testing/explorer/
  tag: 설명서
  text: 신서틱 모니터링 및 테스트 결과 탐색기에 대해 자세히 알아보기
title: 신서틱(Synthetic) 브라우저 테스트 성능 대시보드
---

## 개요

[브라우저 테스트 성능 대시보드][1]는 브라우저 테스트 실행, 브라우저 분석, 웹 성능 및 이벤트에 대한 인사이트를 제공합니다. 구체적으로는 다음과 같습니다.

- **Synthetic browser test analysis**: 브라우저 유형별 성공률 분석, 브라우저 테스트 알림 목록, 브라우저 유형 및 위치별 평균 테스트 기간을 확인합니다.

  {{< img src="synthetics/dashboards/browser_test_analysis.png" alt="Synthetic Browser 테스트 성능 대시보드의 Synthetic browser test analysis 섹션" style="width:100%" >}}

- **Synthetic test web performance**: Datadog RUM을 활성화한 경우 [RUM 통합][2]을 사용하여 핵심 웹 바이탈 및 타사 공급자 테스트 리소스 목록을 검사합니다.

  {{< img src="synthetics/dashboards/browser_test_web_performance.png" alt="Synthetics Browser 테스트 성능 대시보드의 Synthetic test web performance 섹션" style="width:100%" >}}

- **Events**: 신서틱(Synthetic) 테스트 알림에서 눈에 띄는 이벤트를 살펴봅니다.

  {{< img src="synthetics/dashboards/browser_test_events.png" alt="Synthetics Browser 테스트 성능 대시보드의 Events 섹션" style="width:100%" >}}


{{< img src="synthetics/dashboards/browser_test_performance.png" alt="기본 제공 Synthetics Browser 테스트 성능 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 [Synthetic Monitoring Metrics][4]에서 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /ko/synthetics/guide/explore-rum-through-synthetics/
[3]: /ko/watchdog/
[4]: /ko/synthetics/metrics/