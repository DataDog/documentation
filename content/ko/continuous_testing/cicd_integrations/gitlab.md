---
aliases:
- /ko/synthetics/cicd_integrations/gitlab
description: CI/CD 파이프라인에서 Continuous Testing 테스트를 실행하기 위해 GitLab 인스턴스를 설정하세요.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: 블로그
  text: GitLab 파이프라인에서 Datadog Synthetic 테스트 실행
- link: /continuous_integration/pipelines/gitlab/
  tag: 설명서
  text: GitLab 파이프라인에서 트레이스 설정
title: GitLab
---

## 개요

[GitLaab][1] 파이프라인에서 Continuous Testing 테스트를 실행하고, 배포를 차단하며, 롤백을 트리거함으로써 필수 비즈니스 워크플로가 예상대로 작동할 때 프로덕션에 코드를 추가할 수 있도록 하세요.


[GitLab 파이프라인][2]으로 Continuous Testing 테스트를 통합하려면 [datadog-ci npm 패키지][3]를 사용하세요.

## 설정

시작하기:

1. GitLab 프로젝트에 Datadog API와 애플리케이션 키를 변수로 추가합니다.
2. GitLab 러너에 Node.js 10.24.1 버전 이상이 설치되어 있는지 확인하세요. 

자세한 정보는 [CI/CD Integrations 설정][4]을 참고하세요.

## 간단한 구성

### 테스트 ID를 사용해 테스트 실행

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --public-id xtf-w5p-z5n --public-id eif-van-tu7
{{< /code-block >}}

### 테그를 사용해 테스트 실행

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests'
{{< /code-block >}}

### 변수 재정의를 사용해 테스트 실행

내 CI/CD 환경에 따라 데이터나 테스트 사용자가 다른 경우 이 변수를 `-v` 명령으로 재정의할 수 있습니다. 더 자세한 정보는 `datadog-ci` NPM 패키지의 [Synthetics 명령](https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics)을 참고하세요.

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" -s 'tag:e2e-tests' -v PASSWORD="$PASSWORD"
{{< /code-block >}}

## 고급 설정

### 커스텀 설정 파일을 사용해 테스트 실행

파이프라인 리포지토리에 커스텀 `config.json` 파일을 추가하고 파이프라인 설정에서 액세스합니다.

{{< code-block lang="yaml" >}}
stages: 
  - test
synthetic-tests:
  stage: test
  script: 
    - npm install -g @datadog/datadog-ci
    - datadog-ci synthetics run-tests --apiKey "$DATADOG_API_KEY" --appKey "$DATADOG_APP_KEY" --config synthetics_global.json -f synthetic_test.json
{{< /code-block >}}

### 테스트 출력

이 예시는 파이프라인이 설정 파일을 확인하고 테스트를 실행하는 것을 나타냅니다:

{{< img src="synthetics/cicd_integrations/gitlab/synthetic_test_run.png" alt="A Synthetic test running in GitLab" style="width:100%;" >}}

테스트 출력이 성공하면 GitLab에서 다음과 같이 반환됩니다:

{{< img src="synthetics/cicd_integrations/gitlab/successful_test_run.png" alt="A successful Synthetic test run result in a GitLab pipeline" style="width:100%;" >}}


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/gitlab/
[2]: https://docs.gitlab.com/ee/ci/pipelines/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /ko/synthetics/cicd_integrations/configuration