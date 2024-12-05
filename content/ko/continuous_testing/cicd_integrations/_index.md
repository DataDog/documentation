---
aliases:
- /ko/synthetics/ci
- /ko/synthetics/cicd_testing
- /ko/synthetics/cicd_integrations
description: CI/CD 파이프라인에서 온디맨드 또는 사전 정의된 간격으로 연속 테스트를 실행합니다.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: 블로그
  text: Datadog 신서틱 테스트를 CI/CD 파이프라인에 통합
- link: https://www.datadoghq.com/blog/shift-left-testing-best-practices/
  tag: 블로그
  text: Shift-left 테스트 모범 예시
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: 학습 센터
  text: CI/CD 파이프라인에서 신서틱 테스트 실행 방법 알아보기
- link: /synthetics/api_tests/
  tag: 설명서
  text: API 테스트를 설정하는 방법 알아보기
- link: /synthetics/multistep
  tag: 설명서
  text: 멀티스텝 API 테스트를 설정하는 방법 알아보기
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트를 설정하는 방법 알아보기
title: 연속 테스트 및 CI/CD
---

<div class="alert alert-info">이 페이지에서는 연속 통합(CI)과 연속 배포(CD) 파이프라인에 대해 Continuous Testing 테스트를 수행하는 방법을 설명합니다. CI/CD 메트릭과 데이터를 Datadog 대시보드로 가져오려면 <a href="/continuous_integration/" target="_blank">CI 가시성</a> 섹션을 참고하세요.</div>

## 개요

사전 정의된 간격으로 테스트를 실행하는 것 외에도, `@datadog/datadog-ci` 패키지 또는 API를 사용하여 Datadog 신서틱 테스트를 재사용하고 온디맨드 방식으로 실행할 수 있습니다. 연속 통합(CI) 파이프라인에서 Datadog Continuous Testing 테스트를 실행하여 브랜치 배포 및 프로덕션 환경에서 애플리케이션이 중단되는 것을 방지할 수 있습니다.

Continuous Testing 및 CI/CD를 사용하여 연속 배포(CD) 프로세스의 일부로 테스트를 실행하고, 배포 종료 또는 신규 릴리즈가 새로 배포된 직후 프로덕션 환경에서 애플리케이션 및 서비스의 상태를 평가할 수도 있습니다. 사용자에게 영향을 줄 수 있는 잠재적 회귀를 감지하고 중요한 테스트가 실패하면 자동으로 롤백을 트리거할 수도 있습니다.

본 기능은 프로세스 초기에 버그 및 회귀를 사전에 포착하여 프로덕션 환경에서 문제를 해결하는 데 소요되는 시간을 줄여 드립니다. 해당 기능을 활용하면 엔지니어 팀은 긴급하지 않은 작업에 집중할 수 있습니다.

시작하려면 [통합](#integrations) 및 [API 사용](#use-the-api) 또는 [오픈 소스 CLI 패키지](#use-the-cli)를 참조하세요.

## 통합

{{< whatsnext desc="연속 테스트 및 CI/CD를 사용하면 선택한 모든 CI 플랫폼 공급자에서 연속 테스트를 실행할 수 있습니다. 다음 통합 정보 관련 지침을 확인하거나 Datadog CI NPM 패키지를 참조하세요.">}}
    {{< nextlink href="synthetics/cicd_integrations/azure_devops_extension" >}}Azure DevOps Extension{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/circleci_orb" >}}CircleCI Orb{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="synthetics/cicd_integrations/configuration" >}}NPM package{{< /nextlink >}}
{{< /whatsnext >}}

## CLI 사용

[`@datadog/datadog-ci` 패키지][1]를 사용하면 CI/CD 파이프라인 내에서 직접 Continuous Testing 테스트를 실행할 수 있습니다. [`@datadog/datadog-ci` NPM 패키지][2]를 사용하려면 [설정][3]을 참조하세요.

태그로 검색하여 테스트를 트리거할 수 있습니다. 예를 들어 `"ci": "datadog-ci synthetics run-tests --config fileconfig.json -s 'tag:staging'"`를 사용해 보세요. 해당 명령은 인수로 사용할 수 있습니다. 구성 파일에서는 이 명령을 사용하지 마세요.

## API 사용

Synthetics API 엔드포인트를 사용하면 스테이징 및 배포 라이프사이클의 어떤 단계에서든 해당 테스트를 시작할 수 있습니다. 예를 들어, 자동 롤백이 포함된 카나리 배포 후 테스트를 시작할 수 있습니다.

API 엔드포인트를 사용하여 신규 배포 버전에 회귀가 발생하지 않는지 신속하게 확인할 수 있습니다. [CI/CD 파이프라인 테스트 트리거][4] 및 [배치 세부 정보 가져오기][5] 엔드포인트를 참조하여 cURL 또는 지원 클라이언트를 통해 CI 내에서 사용하세요.

### CI/CD 파이프라인에서 테스트 트리거하기

테스트 트리거링 엔드포인트는 한 번의 요청으로 최대 100개의 테스트를 지원합니다.

* **엔드포인트**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/tests/trigger/ci`
* **방식**: `POST`
* **인수**: 트리거할 모든 테스트 목록과 해당 설정 재정의가 포함된 JSON 객체입니다.

#### 요청 데이터 구조

```json
{
    "tests": [TEST_TO_TRIGGER, TEST_TO_TRIGGER, ...]
}
```

`TEST_TO_TRIGGER` 개체는 트리거하려는 테스트에 대한 필수 `public_id` 및 옵션 설정 재정의로 구성됩니다. 각 필드에 대한 설명을 확인하려면 [테스트 설정하기][6]를 참조하세요.

테스트 공개 식별자는 테스트 상세 페이지의 URL에 표시된 (예: `https://app.datadoghq.com/synthetics/details/abc-def-ghi` 식별자의 경우 `abc-def-ghi`) 테스트 식별자이거나 테스트 상세 페이지의 전체 URL입니다(예: `https://app.datadoghq.com/synthetics/details/abc-def-ghi`).

자세한 내용을 확인하려면 [신서틱 API 엔드포인트 문서][4]를 참조하세요.

### 배치 세부 정보 보기

배치 세부 정보 불러오기 엔드포인트로 CI/CD 파이프라인에서 트리거한 테스트 그룹(배치) 결과를 검색합니다. 관련 CI를 실행하려면 `batch_id`을 제공해야 합니다.

* **엔드포인트**: `https://api.{{< region-param key="dd_site" >}}/api/v1/synthetics/ci/batch/{batch_id}`
* **방식**: `GET`
* **파라미터**: 검사하려는 테스트 결과 배치용 `batch_id`.

자세한 내용을 확인하려면 [신서틱 API 엔드포인트 문서][5]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /ko/continuous_testing/cicd_integrations/configuration
[4]: /ko/api/latest/synthetics/#trigger-tests-from-cicd-pipelines
[5]: /ko/api/latest/synthetics/#get-details-of-batch
[6]: /ko/continuous_testing/cicd_integrations/configuration#configure-tests