---
aliases:
- /ko/synthetics/dashboards/api_test
further_reading:
- link: /continuous_testing/explorer/
  tag: 설명서
  text: 신서틱 모니터링 및 테스트 결과 탐색기에 대해 자세히 알아보기
title: Synthetic API Test Performance Dashboard
---

## 개요

[Synthetic API Test Performance Dashboard][1]는 전체 스택 및 이벤트에 대한 인사이트를 제공합니다. 구체적으로는 다음과 같습니다.

- **API test types**: 네트워크 수준의 평균 응답 시간, 지연 시간 또는 조회 시간과 함께 트랜잭션 타이밍 및 위치별 응답 시간을 테스트 유형별로 확인할 수 있습니다.

  {{< img src="synthetics/dashboards/api_test_performance_dashboard_2_2024.png" alt="즉시 사용 가능한 Synthetics API 테스트 성능 대시보드" style="width:100%" >}}

- **Events**: 모든 API 테스트에 대해 트리거된 이벤트를 확인하고 대시보드 상단의 템플릿 변수를 사용하여 특정 테스트에 대해 필터링할 수 있습니다.

  {{< img src="synthetics/dashboards/api_test_performance_events_2_2024.png" alt="Synthetics API 테스트 성능 대시보드의 Events 섹션" style="width:100%" >}}


표시되는 데이터에 대한 자세한 정보는 [Synthetic Monitoring Metrics][3]에서 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /ko/watchdog/
[3]: /ko/synthetics/metrics/