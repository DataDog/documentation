---
description: Synthetic 테스트에서 생성된 예상 사용량 메트릭에 대해 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드투엔드 테스트 생성 모범 사례
- link: /synthetics/api_tests
  tag: 설명서
  text: API 테스트 생성
- link: /synthetics/multistep
  tag: 설명서
  text: 다단계 API 테스트 생성
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 생성
title: 예상 사용량 메트릭 사용
---
## 개요 {#overview}

Synthetic 테스트에는 사용량을 추적할 수 있는 [예상 사용량 메트릭][1]이 포함되어 있습니다. 이러한 메트릭을 통해 특히 다음을 수행할 수 있습니다.

* 시간 경과에 따른 사용량 변화를 파악합니다.
* 어떤 팀, 애플리케이션 또는 서비스가 Synthetic Monitoring 사용량에 가장 많이 기여하는지 시각화합니다.
* 청구에 영향을 줄 수 있는 예상치 못한 사용량 급증에 대해 경보를 설정합니다.

Synthetic Monitoring 사용량을 시각화하거나 경보를 설정하려면 다음 쿼리를 사용하세요.

* [단일][2] 및 [다단계 API 테스트][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [브라우저 테스트][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`.

  **참고:** 브라우저 테스트의 요금 책정은 {{< tooltip glossary="test_run">}}단계 수를 기준으로 합니다. 자세한 내용은 [요금 책정 문서][7]를 참조하세요.

더 세밀하게 조정하려면 `team` 또는 `application`과 같이 테스트와 연결된 태그별로 이러한 메트릭을 범위 지정하거나 그룹화하세요. 

이러한 메트릭을 정적 임계값과 비교하여 그래프로 표시하고 모니터링할 수 있으며, [이상 탐지][5] 또는 [예측][6]과 같은 머신러닝 기반 알고리즘을 사용하여 예상된 사용량 증가에 대해 경보를 받지 않도록 할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[2]: /ko/synthetics/api_tests
[3]: /ko/synthetics/multistep
[4]: /ko/synthetics/browser_tests
[5]: /ko/monitors/types/anomaly/
[6]: /ko/monitors/types/forecasts
[7]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#synthetic-monitoring-api--browser-what-counts-as-a-browser-test-run