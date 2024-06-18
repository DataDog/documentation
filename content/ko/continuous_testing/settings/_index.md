---
further_reading:
- link: /continuous_testing/cicd_integrations
  tag: 설명서
  text: 연속 테스트를 CI/CD 파이프라인에 통합
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트 설정
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
- link: /mobile_app_testing/mobile_app_tests/
  tag: 설명서
  text: 모바일 앱 테스트 설정
- link: /synthetics/guide/explore-rum-through-synthetics/
  tag: 설명서
  text: 신서틱에서 RUM & 세션 리플레이 살펴보기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 테라폼
  text: 테라폼으로 테스트 생성 및 관리
title: 연속 테스트 설정
---
{{< jqmath-vanilla >}}

## 개요

[신서틱 모니터링 & 연속 테스트 설정 페이지][1]에서 연속 테스트 설정에 접근할 수 있습니다.

{{< img src="continuous_testing/continuous_testing_settings_default.png" alt="연속 테스트 기본 설정" style="width:100%;">}}

기본적으로 CI/CD 파이프라인에서 실행 중인 모든 테스트는 순차적으로(차례대로) 실행됩니다. 해당 동작을 변경하려면 [병렬화 값](#set-parallelization)을 설정하고 선택 사항을 저장합니다.

## 병렬화

병렬 테스트는 [연속 통합 및 연속 배포(CI/CD) 파이프라인][4]에서 동시에 실행되는 테스트입니다. 

{{< img src="continuous_testing/parallelization_explained.png" alt="병렬화 vs. 순차 테스트 실행의 이점을 설명하는 다이어그램" style="width:100%;">}}

다음과 같이 실행할 수 있습니다.

* 파이프라인 시간 단축 및 더욱 빠른 신규 기능 포함
* 개발 신뢰도 및 배포 속도 향상
* 완벽한 테스트 적용 범위를 확보하고 프로덕션을 방해하는 버그가 코드베이스에 도달하는 것을 줄여보세요.

### 병렬화 예측

**병렬화 예측**을 클릭하여 [연속 테스트 메트릭][3]에 따라 Datadog이 병렬로 실행할 것을 권장하는 테스트 수를 확인합니다.

{{< img src="continuous_testing/estimated_parallelization.png" alt="연속 테스트 설정에서 예측 병렬화 마법사 완료" style="width:60%;">}}

CI 파이프라인에서 예상되는 테스트 시간과 CI 배치당 평균 테스트 횟수를 옵션으로 지정하면 **예측 병렬화** 섹션에서 다음과 같이 설정하려는 병렬화 양을 계산합니다:

$$\text"estimated parallelization" = {\text"average numbers of tests per CI batch" * \text"average test duration"} / \text"expected duration in your CI pipeline"$$

### 병렬화 설정

1. **환경설정**에서 **병렬화** 옵션을 선택합니다.
2. 병렬로 실행하려는 테스트 수에 따라 필요한 병렬화 옵션을 사용자 지정합니다.
3. **선택 사항 저장**을 클릭합니다.
4. 선택 사항을 확인합니다.

{{< img src="continuous_testing/continuous_testing_settings_parallelization.png" alt="연속 테스트 병렬화 설정" style="width:100%;">}}

## 권한 허용

연속 테스트 병렬화를 사용자 지정하려면 `billing_edit` 권한이 있어야 합니다. 

그렇지 않다면 다음과 같은 오류 메시지가 표시됩니다. `You're missing edit permission for Continuous Testing settings. You can run your tests with a parallelization of X (up to X tests running at the same time at a given point during your CI). To increase this value, reach out to your administrator admin.email@datadoghq.com`.

자세한 정보를 확인하려면 [Datadog 역할 권한][2]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/settings/
[2]: /ko/account_management/rbac/permissions/#billing-and-usage
[3]: /ko/synthetics/metrics/#continuous-testing
[4]: /ko/continuous_testing/cicd_integrations