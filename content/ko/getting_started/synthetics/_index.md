---
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
- link: /synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 알아보기
- link: /synthetics/private_locations
  tag: 설명서
  text: 프라이빗 위치 자세히 알아보기
- link: /synthetics/cicd_integrations
  tag: 설명서
  text: CI 파이프라인에서 신서틱 테스트 실행하는 방법 알아보기
title: 신서틱(Synthetic) 모니터링 시작하기
---

## 개요

신서틱(Synthetic) 테스트를 통해 **전 세계에서 전송된 요청과 액션을 시뮬레이션**하여 시스템과 애플리케이션의 성능을 파악할 수 있습니다. Datadog는 안정적으로 관리되는 방식을 통해 웹페이지와 API의 백엔드부터 프론트엔드까지, 또한 다양한 네트워크 수준에서(`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, `gRPC`) 성능을 추적합니다. 또한 회귀, 기능의 고장, 응답 속도 지연, 예상하지 못한 상태 코드 등의 문제가 발생했을 때 경고를 보냅니다.

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="신서틱 모니터링 테스트" style="width:100%;" >}}

## 신서틱 테스트 유형

Datadog는 **API 테스트**, **멀티스텝 API 테스트**, **브라우저 테스트**를 지원합니다.

내부용 애플리케이션을 모니터링하려면 관리형 위치나 프라이빗 위치에서 테스트를 실행하세요. 신서틱 테스트는 직접 트리거하거나 스케줄에 맞추어 실행할 수 있습니다. CI/CD 파이프라인에서 바로 실행하기도 가능합니다.

## 전제 조건

계정이 없다면 [Datadog 계정][1]을 만드세요.

## 먼저 테스트를 설정합니다

첫 Datadog 신서틱 테스트를 구성하려면 다음 옵션을 선택하세요.

- [API 테스트를 생성][2]해 API 엔드포인트의 업타임을 모니터링하세요.
- [멀티스텝 API 테스트를 생성][3]해 여러 HTTP 요청을 연결하고, API 수준에서 주요 작업 흐름을 모니터링하세요.
- [브라우저 테스트를 생성][4]해 애플리케이션에서 수행하는 주요 비즈니스 트랜잭션을 테스트하세요.
- [프라이빗 위치를 생성][5]해 모든 신서틱 테스트 유형을 활용하여 내부 애플리케이션을 모니터링하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /ko/getting_started/synthetics/api_test/
[3]: /ko/getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /ko/getting_started/synthetics/browser_test/
[5]: /ko/getting_started/synthetics/private_location/