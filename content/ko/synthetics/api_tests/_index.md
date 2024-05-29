---
aliases:
- /ko/synthetics/uptime_check
- /ko/synthetics/api_test
description: 공개 및 내부 서비스에 대한 요청 시뮬레이션
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링을 사용해 API 테스트 범위  개선
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog
  tag: 블로그
  text: Datadog SSL, TLS, 다단계 API 테스트로 워크플로우 모니터링
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: 학습 센터
  text: Synthetic 테스트 소개
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: API 테스트 시작하기
- link: /synthetics/private_locations
  tag: 설명서
  text: 내부 엔드포인트에서 API 테스트 실행
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Terraform으로 신서틱(Synthetic) API 테스트 생성 및 관리
kind: 설명서
title: API 테스트
---

## 개요

API 테스트 기능이 언제 어디서든 고객님의 가장 중요한 서비스를 **사전 예방 모니터링**할 수 있도록 도와드립니다. 

다음 하위 유형을 활용하여 시스템의 다양한 네트워크 레이어에서 요청을 실행하세요.

{{< partial name="synthetics/network-layers.html" >}}

서비스 중 하나가 더 느리게 응답하거나 예상치 못한 방식으로 응답하기 시작하면(예: 예상치 못한 응답 본문 또는 잘못된 레코드), 테스트로 [팀에 알림][1], [CI 파이프라인 차단][2], 또는 [결함 배포 버전 롤백][2]을 실행할 수 있습니다.

API 테스트를 Datadog [관리 위치][3] 또는 [비공개 위치][4]에서 실행하여 시스템 **내외부 범위**를 허용합니다.

**참고:** API 테스트는 서비스에서 실행되는 단일 요청입니다. API 수준 또는 인증이 필요한 엔드포인트에서 복잡한 비즈니스 트랜잭션을 모니터링하려면 [다단계 API 테스트][5]로 요청을 연결합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/api_tests/http_tests?tab=requestoptions#notify-your-team
[2]: /ko/continuous_testing/cicd_integrations
[3]: /ko/synthetics/api_tests/http_tests/#select-locations
[4]: /ko/synthetics/private_locations
[5]: /ko/synthetics/multistep/