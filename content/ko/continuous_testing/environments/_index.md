---
aliases:
- /ko/synthetics/testing_tunnel
- /ko/continuous_testing/testing_tunnel
description: 로컬 및 원격 환경에서 Continuous Testing 사용에 대해 알아보기
further_reading:
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: 블로그
  text: Shift-left 테스트 모범 예시
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: 블로그
  text: Datadog 신서틱 테스트를 CI/CD 파이프라인에 통합
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 학습 센터
  text: CI/CD 파이프라인에서 테스트 실행 방법 알아보기
- link: /continuous_testing/environments/multiple_env
  tag: 설명서
  text: 다중 환경에서의 테스트에 대해 알아보기
- link: /continuous_testing/environments/proxy_firewall_vpn
  tag: 설명서
  text: 프록시, 방화벽 또는 VPN 사용 시 테스트에 대해 알아보기
- link: /synthetics/private_locations
  tag: 설명서
  text: 프라이빗 위치 알아보기
title: 로컬 및 스테이징 환경 테스트
---

## 개요

[CI/CD 파이프라인 내 테스트(shift-left 테스트라고도 함)][1]를 할 때, 프로덕션 환경은 일반적으로 체인의 마지막 단계입니다. 애플리케이션은 여러 단계를 거친 후에 이 단계에 도달합니다.

{{< img src="continuous_testing/environments.png" alt="Continuous Testing은 로컬 개발 환경에서 스테이징, 프로덕션까지 개발 주기 전반에 사용할 수 있습니다." width="100%" >}}

[신서틱(Synthetic) 테스트 일정은 주로 공개적으로 사용 가능한 프로덕션 환경에 초점을 맞추지만][2], Continuous Testing은 개발 주기 전반에 걸쳐 애플리케이션이 배포된 일부 또는 전체 환경에서 애플리케이션을 테스트할 수 있습니다.

## 다중 환경에서의 테스트

Continuous Testing는 프로덕션 환경에서 사용된 예약 테스트와 동일한 시나리오를 재사용해 공개적으로 사용 가능한 사전 프로덕션 환경을 테스트합니다.

[블루-그린 배포][3]이든 전용 스테이징 환경이든, Continuous Testing으로 기존 시나리오를 다른 환경으로 라우팅할 수 있습니다. 자세한 내용은 [다중 환경 테스트][4]를 참조하세요.

## 프록시, 방화벽, 또는 VPN 사용 테스트하기

Continuous Testing로 개발 주기의 초기 단계에서 애플리케이션을 테스트할 수 있습니다. 여기에는 프록시, 방화벽, 또는 VPN으로 보호되는 프라이빗 네트워크 테스트가 포함됩니다.

내 개발 환경(예: 개발용 노트북)에서 실행되는 로컬 서버에서 배포된 변경 사항에 동일한 신서틱(Synthetic) 일정 테스트를 실행할 수 있습니다. 또는 CI/CD 작업 시간과 같은 시기에 임시 환경에 배포되는 CI/CD 파이프라인 또는 프라이빗 스테이징 환경에 동일한 시나리오를 실행할 수 있습니다.

Continuous Testing은 [테스팅 터널][5]을 제공하기 때문에 신서틱(Synthetic) 관리형 위치에서 프라이빗 환경에 접근할 수 있습니다. 자세한 내용은 [프록시, 방화벽, 또는 VPN을 사용 테스트][6]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
[2]: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
[3]: https://en.wikipedia.org/wiki/Blue%E2%80%93green_deployment
[4]: /ko/continuous_testing/environments/multiple_env
[5]: /ko/continuous_testing/environments/proxy_firewall_vpn/#what-is-the-testing-tunnel
[6]: /ko/continuous_testing/environments/proxy_firewall_vpn