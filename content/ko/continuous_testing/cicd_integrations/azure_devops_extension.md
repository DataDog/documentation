---
aliases:
- /ko/synthetics/cicd_integrations/azure_devops_extension
dependencies:
- https://github.com/DataDog/datadog-ci-azure-devops/blob/main/README.md
description: Synthetics 및 Datadog CI 확장 기능을 활용하여 CI 파이프라인에서 사용할 수 있는 작업을 생성하세요.
kind: 설명서
title: Continuous Testing 및 Datadog CI Azure DevOps 확장 기능
---
[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/Datadog.datadog-ci)][1]
[![Build Status](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_apis/build/status%2FDevelopment?branchName=main)](https://dev.azure.com/datadog-ci/Datadog%20CI%20Azure%20DevOps%20Extension/_build/latest?definitionId=4&branchName=main)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## 개요

Datadog Continuous Testing Azure DevOps 확장 프로그램을 사용하면 Azure 파이프라인 설정 내에서 신서틱 테스트를 실행하고, Azure DevOps를 사용하는 모든 팀이 소프트웨어 라이프사이클의 모든 단계에서 신서틱 테스트의 이점을 누릴 수 있도록 도와드립니다. [`SyntheticsRunTests`][3]을 작업으로 실행할 수 있습니다.

## 인증

### 서비스 연결

[Datadog 사이트][11]에 연결하려면, Datadog은 신서틱 실행 테스트 작업을 설정할 때 사용자 지정 서비스 연결을 설정할 것을 권장합니다. 

다음의 값을 입력해야 합니다.

- Datadog 사이트: 연결 및 데이터를 전송할 [Datadog 사이트][11].
- 사용자 지정 하위 도메인 (기본값: `app`): Datadog 애플리케이션에 접근하기 위해 설정한 사용자 지정 하위 도메인 세트의 이름입니다. Datadog에 접근할 때 사용하는 URL이 `myorg.datadoghq.com`이면 값을 `myorg`로 설정해야 합니다.
- API 키: Datadog API 키입니다. 해당 키는 [Datadog 조직][6]에서 생성합니다.
- 애플리케이션 키: Datadog 애플리케이션 키입니다. 해당 키는 [Datadog 조직][6]에서 생성합니다.


### API 및 애플리케이션 키

- API 키: Datadog API 키입니다. 해당 키는 [Datadog 조직][6]에서 생성하며 환경 변수로 액세스합니다.
- 애플리케이션 키: Datadog 애플리케이션 키입니다. 해당 키는 [Datadog 조직][6]에서 생성하며 환경 변수로 액세스합니다.
- Datadog 사이트: 연결 및 데이터를 전송할 [Datadog 사이트][11]입니다.
- 사용자 지정 하위 도메인 (옵션): Datadog 애플리케이션에 접근하기 위해 설정한 사용자 지정 하위 도메인 세트의 이름입니다. Datadog에 접근할 때 사용하는 URL이 `myorg.datadoghq.com`이면 값을 `myorg`로 설정해야 합니다.

## 설정

Datadog 계정에 연결하려면 Azure 파이프라인 프로젝트에서 [Datadog CI 서비스 연결을 생성][5]하세요. 생성한 후에는 작업에서 서비스 연결의 이름만 입력하면 됩니다.

1. Azure 조직에 [Visual Studio Marketplace에서 Datadog Continuous Testing 확장 프로그램][1]을 설치합니다.
2. [Datadog CI 서비스 연결](#authentication)에 Datadog API 및 애플리케이션 키를 추가하거나, [Azure 파이프라인 프로젝트 기밀 사항][7]으로 추가합니다.
3. Azure DevOps 파이프라인에서 `SyntheticsRunTests` 작업을 사용합니다.

작업은 [간단](#simple-usage)하거나 [복잡](#complex-usage)할 수 있습니다.

## 간단한 사용

> **알림**: 최근 작업의 주요 버전을 `SyntheticsRunTests@0`에서 `SyntheticsRunTests@1`으로 변경하였습니다.
>
> 이는 **주요한 변경 사항**은 아니지만, 작업 버전과 확장 버전의 정렬 작업입니다.

### 공개 ID를 사용하는 작업 예시

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    publicIds: |
      abc-d3f-ghi
      jkl-mn0-pqr
```

### 기존 `synthetics.json` 파일을 사용하는 작업 예시

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    files: 'e2e-tests/*.synthetics.json'
```

테스트 파일 예시를 보려면 [`test.synthetics.json` 파일][14]을 참고하세요.

### 인증에 파이프라인 기밀 정보를 사용하는 작업 예시

```yaml
- task: SyntheticsRunTests@1
  inputs:
    authenticationType: 'apiAppKeys'
    apiKey: '$(DatadogApiKey)'
    appKey: '$(DatadogAppKey)'
    subdomain: 'myorg'
    datadogSite: '$(DatadogSite)'
```

## 복잡한 사용

> **알림**: 최근 작업의 주요 버전을 `SyntheticsRunTests@0`에서 `SyntheticsRunTests@1`으로 변경하였습니다.
>
> 이는 **주요한 변경 사항**은 아니지만, 작업 버전과 확장 버전의 정렬 작업입니다.

### `testSearchQuery`를 사용한 작업 예시

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
```

### `testSearchQuery`와 변수 재정의를 사용한 작업 예시

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    testSearchQuery: 'tag:e2e-tests'
    variables: |
      START_URL=https://staging.website.com
      PASSWORD=$(StagingPassword)
```

### `configPath`로 글로벌 설정 재정의를 사용한 작업 예시

해당 작업은 글로벌 `datadog-ci.config.json` 파일의 경로를 재정의합니다.

```yaml
- task: SyntheticsRunTests@1
  displayName: Run Datadog Synthetic tests
  inputs:
    authenticationType: 'connectedService'
    connectedService: 'my-datadog-ci-connected-service'
    configPath: './synthetics-config.json'
```

설정 파일의 예시를 확인하려면 [`global.config.json` 파일][13]을 참조하세요.

## 입력 사항

| 이름                   | 요구 사항 | 설명                                                                                                                                                                                                                                     |
| ---------------------- | :---------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authenticationType`   | _required_  | Datadog가 사용할 인증 유형은 `connectedService` 또는 `apiAppKeys`입니다.                                                                                                                                                  |
| `connectedService`     | _선택_  | `connectedService` 인증 유형을 사용할 때 사용할 [Datadog CI 서비스 연결](#setup)의 이름입니다.                                                                                                                           |
| `apiKey`               | _선택_  | `apiAppKeys` 인증 유형을 사용할 때의 Datadog API 애플리케이션 키입니다. 해당 키는 [Datadog 조직][6]에서 생성되고 [기밀][7]로 저장되어야 합니다.                                                                              |
| `appKey`               | _선택_  | `apiAppKeys` 인증 유형을 사용할 때의 Datadog 애플리케이션 키입니다. 해당 키는 [Datadog 조직][6]에서 생성되고 [기밀][7]로 저장되어야 합니다.                                                                      |
| `subdomain`            | _선택_  | `apiAppKeys` 인증 유형을 사용할 때 Datadog 애플리케이션에 접근하도록 설정된 사용자 지정 하위 도메인 세트의 이름입니다. Datadog에 접근하는 데 사용되는 URL이 `myorg.datadoghq.com`인 경우, 해당 값을 `myorg`로 설정해야 합니다. **기본값**: `app`. |
| `datadogSite`          | _선택_  | `apiAppKeys` 인증 유형을 사용하는 경우 [Datadog 사이트][11]. **기본값**: `datadoghq.com`.                                                                                                                                           |
| `publicIds`            | _선택_  | 트리거하려는 신서틱 테스트의 테스트 ID 목록으로, 새 줄 또는 쉼표로 구분합니다. 해당하는 값이 없을 경우 작업 시 `synthetics.json`라는 이름의 파일을 검색합니다.                                                                       |
| `testSearchQuery`      | _선택_  | [검색][8] 쿼리에 해당하는 테스트를 트리거합니다. 테스트 설정에서 태그를 지정하는 경우 유용할 수 있습니다. 자세한 내용을 확인하려면 [태그 이름 지정 규칙 및 모범 사례][10]를 참조하세요.                                                   |
| `files`                | _선택_  | 신서틱 테스트의 구성 파일을 감지하는 Glob 패턴. **기본값:** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                                                                   |
| `configPath`           | _선택_  | 테스트를 시작할 때 사용되는 글로벌 JSON 설정입니다. 자세한 내용을 확인하려면 [예제 설정][9]을 참조하세요. **기본값:** `datadog-ci.json`.                                                                                              |
| `variables`            | _선택_  | 신서틱 테스트에 사용할 글로벌 변수 목록입니다. 새 줄이나 쉼표로 구분되어 있습니다. 예: `START_URL=https://example.org,MY_VARIABLE=My title`. **기본값:** `[]`.                                                                  |
| `jUnitReport`          | _선택_  | JUnit 리포트를 생성하고 싶을 경우 파일 이름.                                                                                                                                                                                    |
| `pollingTimeout`       | _선택_  | 작업이 테스트 결과 폴링을 중지할 때까지 걸리는 시간(밀리초)입니다. CI 레벨에서 해당 시간이 경과한 이후 완료한 테스트 결과는 실패로 간주합니다. **기본값:** 30분.                                                 |
| `failOnCriticalErrors` | _선택_  | 테스트가 트리거되지 않거나 Datadog에서 결과를 가져올 수 없을 경우 CI 작업을 실패로 만듭니다. **기본값:** `false`.                                                                                                                                 |
| `failOnMissingTests`   | _선택_  | 공용 ID(`publicIds`를 사용하거나 [테스트 파일][14]에 포함된)가 있는 지정 테스트 중 하나 이상이 누락될 경우 (예: 프로그램적으로 삭제 또는 Datadog 사이트에서 삭제된 경우) CI 작업을 실패로 처리합니다. **기본값:** `false`.     |
| `failOnTimeout`        | _선택_  | 최소 하나 이상의 테스트가 테스트 제한 시간 기본값을 초과할 경우 CI 작업을 실패로 처리합니다. **기본값:** `true`.                                                                                                                                                     |

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Continuous Testing 및 CI/CD 설정][4]
- [Datadog을 이용한 continuous testing의 모범 사례][12]

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-ci
[2]: https://github.com/DataDog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci-azure-devops/tree/main/SyntheticsRunTestsTask
[4]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration
[5]: https://docs.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints
[6]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[7]: https://docs.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables
[8]: https://docs.datadoghq.com/ko/synthetics/search/#search
[9]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[10]: https://docs.datadoghq.com/ko/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
[11]: https://docs.datadoghq.com/ko/getting_started/site/
[12]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json
[14]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files