---
description: 신서틱 테스트에서 생성한 예상 사용량 메트릭에 대해 알아봅니다.
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: 블로그
  text: 엔드 투 엔드 테스트 생성 모범 사례
- link: /synthetics/api_tests
  tag: 설명서
  text: API 테스트 생성
- link: /synthetics/multistep
  tag: 설명서
  text: 다단계 API 테스트 생성
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 생성
title: 예상 사용량 메트릭 활용
---

## 개요

신서틱 테스트에는 [예상 사용량 메트릭][1]이 있습니다. 이 메트릭으로 사용량을 추적할 수 있습니다. 이와 같은 메트릭으로 다음을 할 수 있습니다.

* 시간 흐름에 따른 사용량 변화 이해
* 팀, 애플리케이션, 또는 서비스가 신서틱 사용량에 미치는 영향 가시화
* 빌링에 영향을 주는 예상치 못한 사용량 급증이 일어날 경우 알림 전송

신서틱 사용량을 가시화하거나 알림을 받고 싶을 경우 다음 쿼리를 사용하세요.

* [단일][2] 및 [다단계 API 테스트][3]: `sum:datadog.estimated_usage.synthetics.api_test_runs{*}.as_count()`

* [브라우저 테스트][4]: `sum:datadog.estimated_usage.synthetics.browser_test_runs{*}.as_count()`

더 상세하게 구체화하고 싶을 경우 테스트와 연결된 메트릭이나 태그를 태그로 그룹화하세요(예: `team` 또는 `application`).

이 메트릭을 정적 임계값에 맞춰 그래프로 만들 수 있고, [이상 감지][5]나 [예측][6]과 같은 기계 학습 기반 알고리즘을 사용해 예상 사용량 증가에 알림을 보내지 않도록 할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/billing/usage_metrics/#types-of-usage
[2]: /ko/synthetics/api_tests
[3]: /ko/synthetics/multistep
[4]: /ko/synthetics/browser_tests
[5]: /ko/monitors/types/anomaly/
[6]: /ko/monitors/types/forecasts