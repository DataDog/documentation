---
aliases:
- /ko/synthetics/cicd_integrations/troubleshooting
description: Continuous Testing 및 CI/CD 개념과 일반적인 오류 문제 해결에 관해 알아보기
further_reading:
- link: /synthetics/cicd_integrations/configuration
  tag: 설명서
  text: Continuous Testing 및 CI/CD 설정에 관해 알아보기
- link: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
  tag: 블로그
  text: Datadog을 사용한 연속적 테스트 모범 사례
title: Continuous Testing 및 CI/CD 문제 해결
---

## 개요

이 페이지에서는 Continuous Testing 및 CI/CD 문제 해결에 도움이 되는 정보를 제공합니다. 추가적인 도움이 필요하시면 [Datadog 지원팀][1]에 문의하세요.

## 용어

CI 배치
: 연속적 통합 또는 연속적 딜리버리 (CI/CD) 파이프라인 또는 [Datadog Synthetic Monitoring API][2]를 통해 트리거되는 Continuous Testing 테스트 그룹.

테스트 실행
: [API][7]나 [브라우저 테스트][8]와 같은 Continuous Testing 테스트를 1회 실행. 재시도를 설정한 경우 재시도는 개별 테스트 실행으로 계산됨. 예를 들어, 두 번의 재시도가 설정된 테스트는 최대 세 번의 관련 테스트 실행을 가질 수 있음.

병렬 테스트
: CI/CD 파이프라인에서 다른 Continuous Testing 테스트와 동시에 실행되는 Continuous Testing 테스트. 병렬로 실행할 테스트 수를 설정하려면 [Continuous Testing 설정 페이지][9]에서 병렬화를 설정하세요.

배치 타임아웃
: 설정 파일에 지정된 [폴링 타임아웃][3]에 따라 적절한 시간 내에 배치가 완료되지 않으면 배치 타임아웃 발생.


실행 규칙
: [실행 규칙][4]은 테스트 실패가 CI/CD 파이프라인에 미치는 영향이 가장 큰 것부터 가장 작은 것까지를 정의합니다:  `skipped`, `non_blocking`, `blocking`. 이러한 옵션은 가중치를 매겨 기본값은 가장 영향력이 큰 것으로 설정되어 있습니다. UI에서 테스트가 `skipped`로 설정되어 있고 설정 파일에서 `blocking`으로 설정되어 있으면, 테스트 실행 중에 건너뜁니다. </br><br> 테스트 속성, 글로벌 설정 파일, 개별 테스트의 재정의 파일에서 실행 규칙을 설정할 수 있습니다.

## 익스플로러

### CI 메타데이터가 나타나지 않음

API 엔드포인트를 사용하여 CI/CD 테스트 실행을 트리거하고 있는지 확인하세요. CI Results Explorer에 CI 메타데이터를 입력하려면 Datadog의 [네이티브 통합][5] 또는 [NPM 패키지][6] 중 하나를 사용해야 합니다.

## CI/CD 파이프라인 내

### CI 파이프라인에서 테스트가 시간 초과됨

가장 먼저 [글로벌 설정 파일][10]에서 어떤 실패 모드 플래그를 전달하고 있는지 확인해야 합니다. 여러 테스트가 포함된 CI 실행의 경우 일부 테스트는 [Continuous Testing 설정 페이지][9]에 정의된 병렬화 설정에 따라 대기합니다. 조직의 필요에 따라 설정과 병렬화 모두를 조정해야 할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[3]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#additional-configuration
[4]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#execution-rule
[5]: /ko/continuous_testing/cicd_integrations
[6]: /ko/continuous_testing/cicd_integrations#use-the-cli
[7]: /ko/synthetics/api_tests/
[8]: /ko/synthetics/browser_tests/?tab=requestoptions
[9]: /ko/continuous_testing/settings
[10]: /ko/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options