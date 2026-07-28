---
aliases:
- /ko/real_user_monitoring/dashboards/testing_coverage
- /ko/real_user_monitoring/platform/dashboards/testing_coverage
description: 즉시 사용 가능한 RUM 테스팅 및 배포 대시보드에 대해 알아보세요.
further_reading:
- link: /real_user_monitoring/
  tag: 설명서
  text: RUM 및 세션 재생에 대해 알아보기
- link: /synthetics/browser_tests
  tag: 설명서
  text: 신서틱(Synthetic) 브라우저 테스트 알아보기
- link: https://www.datadoghq.com/blog/test-coverage-monitoring-datadog/
  tag: 블로그
  text: RUM 및 신서틱(Synthetic) 모니터링을 사용해 테스트 범위 추적
title: 대시보드 테스트 및 배포
---

## 테스트 범위


[신서틱 및 RUM 애플리케이션 테스트 범위 대시보드][1]는 [RUM][2]에서 수집한 데이터와 신서틱 [브라우저 테스트][3] 결과를 사용해 애플리케이션에 대한 전반적인 테스트 범위 정보를 제공합니다.

이 대시보드를 사용해 다음 질문에 답할 수 있습니다.

- 애플리케이션에서 테스트되는 대상과 테스트되지 않는 대상은 무엇인가요?
- 가장 인기 높은 애플리케이션 섹션을 어떻게 파악하여 지속적으로 모니터링할 수 있나요?
- 애플리케이션에서 가장 인기 높은 사용자 작업을 어떻게 파악하여 브라우저 테스트 범위에 추가할 수 있나요?

다음을 표시합니다.

- **테스트한 작업의 비율**: 애플리케이션의 총 테스트 범위를 검사합니다.
- **테스트 안 한 작업**: 가장 인기 있는 테스트 안 된 사용자 작업, 실제 사용자 상호 작용 집계, 브라우저 테스트에서 지원되는 작업 개수를 살펴봅니다.

{{< img src="synthetics/dashboards/testing_coverage-2.png" alt="즉시 사용 가능한 신서틱 테스트 범위 대시보드" style="width:100%" >}}

{{< img src="synthetics/dashboards/testing_coverage_actions_tests-1.png" alt="테스트 안 된 RUM 작업 및 상위 신서틱 브라우저 테스트(신서틱 테스트 범위 대시보드의 RUM 작업 섹션 포함)" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 [수집된 RUM 브라우저 데이터][2]를 참조하세요.

## 웹 배포 추적

RUM 웹 앱 배포 추적 대시보드는 최신 배포가 애플리케이션 내 성능 문제나 새로운 오류를 야기할 때를 파악할 수 있도록 해줍니다. 이 기능을 사용하려면 [애플리케이션에 RUM 버전을 추가][4]해야 합니다. 이 대시보드는 다음을 표시합니다.

- **핵심 웹 바이탈**:
  모든 보기에 대해 세 개의 브라우저 성능 메트릭이 강조 표시됩니다. 최대 콘텐츠풀 페인트(Largest Contentful Paint, LCP), 최초 입력 지연(First Input Delay, FID), 및 누적 레이아웃 전환(Cumulative Layout Shift, CLS)입니다. 로드 시간 등 다른 성능 메트릭도 사용할 수 있습니다.
- **오류**:
  오류 개수, 오류 포함된 보기의 비율과 지속적인 문제에 대해 알아보세요.
- **브라우저 성능 메트릭**:
  로딩 시간, 세션, 오류,를 비롯해 각기 다른 서비스 및 버전에서의 로드 시간과 같은 성능 메트릭을 비교하세요.

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-web.png" alt="즉시 사용 가능한 웹  배포 대시보드" style="width:100%" >}}

## 모바일 배포 추적

RUM 모바일 앱 배포 추적 대시보드는 최근 배포 또는 릴리스가 모바일 애플리케이션 내에서 성능 문제나 새로운 오류를 발생시키는 경우를 파악할 수 있도록 해줍니다. 버전을 직접 비교해야 한다면 RUM 요약 페이지 배포 추적 섹션을 사용하세요.

배포 추적을 사용하려면 **Datadog SDK** 초기화 시 앱 버전을 지정하세요.

이 대시보드는 다음을 표시합니다.

- **충돌**:
  버전별 충돌 개수, 버전별 충돌 비율을 검토하고 지속적인 충돌 문제를 살펴보세요.
- **오류**:
  버전별 오류 개수, 버전별 오류 비율을 검토하고 지속적인 오류를 살펴보세요.
- **버전별 모바일 바이탈**:
  모든 버전에서 4개의 모바일 성능 메트릭이 강조 표시됩니다. 바로 느린 렌더링, 잠긴 프레임, 애플리케이션 시작 시간과 메모리 사용량입니다.

{{< img src="real_user_monitoring/dashboards/dashboard-deployment-mobile.png" alt="즉시 사용 가능한 모바일 배포 대시보드" style="width:100%" >}}

표시되는 데이터에 대한 자세한 정보는 각 플랫폼([iOS RUM][5], [Android RUM][6], [React Native RUM][7] 및 [Flutter RUM][8])에 대한 설명서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /ko/real_user_monitoring/browser/data_collected/
[3]: /ko/synthetics/browser_tests/
[4]: /ko/real_user_monitoring/browser/setup/#initialization-parameters
[5]: /ko/real_user_monitoring/ios/data_collected/
[6]: /ko/real_user_monitoring/android/data_collected/
[7]: /ko/real_user_monitoring/reactnative/data_collected/
[8]: /ko/real_user_monitoring/mobile_and_tv_monitoring/flutter/data_collected/