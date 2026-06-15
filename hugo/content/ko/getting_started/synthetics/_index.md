---
algolia:
  tags:
  - synthetics
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: 신서틱(Synthetic) 테스트 소개
- link: /synthetics/api_tests
  tag: 설명서
  text: API 테스트에 대해 자세히 알아보기
- link: /synthetics/multistep
  tag: 설명서
  text: 멀티스텝 API 테스트에 대해 자세히 알아보기
- link: /synthetics/mobile_app_testing
  tag: 설명서
  text: 모바일 테스트에 대해 알아보기
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 알아보기
- link: /synthetics/private_locations
  tag: 설명서
  text: 프라이빗 위치 자세히 알아보기
- link: /continuous_testing/cicd_integrations
  tag: 설명서
  text: CI 파이프라인에서 신서틱 테스트 실행하는 방법 알아보기
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 대화형 세션에 참여하여 synthetic 테스트 역량을 강화하세요.
title: 신서틱(Synthetic) 모니터링 시작하기
---

## 개요

신서틱(Synthetic) 테스트를 통해 **전 세계에서 전송된 요청과 액션을 시뮬레이션**하여 시스템과 애플리케이션의 성능을 파악할 수 있습니다. Datadog는 안정적으로 관리되는 방식을 통해 웹페이지와 API의 백엔드부터 프론트엔드까지, 또한 다양한 네트워크 수준에서(`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, `gRPC`) 성능을 추적합니다. 또한 회귀, 기능의 고장, 응답 속도 지연, 예상하지 못한 상태 코드 등의 문제가 발생했을 때 경고를 보냅니다.

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="신서틱 모니터링 테스트" style="width:100%;" >}}

## 신서틱 테스트 유형

Datadog은 **API 테스트**, **다단계 API 테스트**, **브라우저 테스트**, **모바일 테스트**를 제공합니다.

내부용 애플리케이션을 모니터링하려면 관리되는 위치 또는 프라이빗 위치에서 테스트를 실행하세요. 합성(Synthetic) 테스트는 수동으로, 일정에 따라 또는 [CI/CD 파이프라인에서 직접][7] 트리거할 수 있습니다.

## 사전 필수 조건

계정이 없다면 [Datadog 계정][1]을 만드세요.

## 먼저 테스트를 설정합니다

첫 Datadog 신서틱 테스트를 구성하려면 다음 옵션을 선택하세요.

- [API 테스트를 생성][2]해 API 엔드포인트의 업타임을 모니터링하세요.
- [멀티스텝 API 테스트를 생성][3]해 여러 HTTP 요청을 연결하고, API 수준에서 주요 작업 흐름을 모니터링하세요.
- [브라우저 테스트를 생성][4]해 애플리케이션에서 수행하는 주요 비즈니스 트랜잭션을 테스트하세요.
- Android 및 iOS 애플리케이션에서 주요 비즈니스 워크플로 테스트를 시작하려면 [모바일 테스트를 생성하세요][6].
- [프라이빗 위치를 생성][5]해 모든 신서틱 테스트 유형을 활용하여 내부 애플리케이션을 모니터링하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /ko/getting_started/synthetics/api_test/
[3]: /ko/getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /ko/getting_started/synthetics/browser_test/
[5]: /ko/getting_started/synthetics/private_location/
[6]: /ko/getting_started/synthetics/mobile_app_testing/
[7]: /ko/getting_started/continuous_testing/