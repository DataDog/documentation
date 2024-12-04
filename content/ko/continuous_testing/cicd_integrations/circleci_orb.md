---
aliases:
- /ko/synthetics/cicd_integrations/circleci_orb
dependencies:
- https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/README.md
title: Continuous Testing 및 CircleCI Orb
---
## 개요

[![CircleCI Build Status](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb.svg?style=shield 'CircleCI Build Status')](https://circleci.com/gh/DataDog/synthetics-test-automation-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/synthetics-ci-orb.svg)](https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb) [![Apache 2.0 License](https://shields.io/badge/license-Apache--2.0-lightgray)](https://raw.githubusercontent.com/DataDog/synthetics-ci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

Datadog CircleCI orb를 사용하여 CircleCI 파이프라인에서 Synthetic 테스트를 실행합니다.

CircleCI 명령 orb는 [datadog-ci][1]를 설치하고 `datadog-ci synthetics run-tests` [명령][2]을 사용해 [Datadog Synthetic 테스트][3]를 실행합니다.

## 설정

시작 방법:

1. Datadog API와 애플리케이션 키를 CircleCI 프로젝트에 환경 변수로 추가합니다. 자세한 정보는 [API 및 애플리케이션 키][2]를 참고하세요.
2. orb를 실행하는 이미지가 cURL이 설치된 Linux x64 기본 이미지인지 확인하세요.
3.  [`run-tests.yml`][14] 파일을 생성하고 다음 이름 지정 규칙에 따라 워크플로 [입력](#inputs)을 명시하여 워크플로우를 커스터마이징합니다.

워크플로는 [간단](#simple-usage)하거나 [복잡](#complex-usage)할 수 있습니다.

## 간단한 사용

### 공용 ID를 사용한 orb 사용 예시

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.4.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### 글로벌 설정 재정의를 이용한 orb 사용 예시

이 orb는 [테스트 파일][18]의 패턴 경로를 재정의합니다.

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.4.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          files: e2e-tests/*.synthetics.json

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

Synthetic 테스트를 트리거하는 다른 파이프라인 예시는 [`simple-example.yml` 파일][15]을 참조하세요.

## 복잡한 사용

### `test_search_query`를 이용한 orb 사용 예시

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.4.0

jobs:
  e2e-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - synthetics-ci/run-tests:
          test_search_query: 'tag:e2e-tests'

workflows:
  run-tests:
    jobs:
      - e2e-tests
```

### [Continuous Testing Tunnel][10]을 이용한 orb 사용 예시

```
version: 2.1

orbs:
  synthetics-ci: datadog/synthetics-ci-orb@2.4.0

jobs:
  e2e-tests:
    docker:
      - image: your-image
    steps:
      - checkout
      - run:
          name: Running server in background
          command: npm start
          background: true
      - synthetics-ci/run-tests:
          config_path: tests/tunnel-config.json
          files: tests/*.synthetics.json
          test_search_query: 'tag:e2e-tests'
          tunnel: true

workflows:
  test-server:
    jobs:
      - build-image
      - integration-tests:
          requires:
            - build-image
```

CircleCI 파이프라인에서 `pollingTimeout`을 사용자 지정하는 것과 같은 추가 옵션을 보려면  [CI/CD 통합 설정][18]을 참고하세요. Continuous Testing Tunnel을 사용해 로컬 서버를 시작하고 Synthetic 테스트를 트리거하는 다른 파이프라인 예시는 [`advanced-example.yml` 파일][16]에서 확인할 수 있습니다.

## 입력

워크플로를 사용자 지정하려면 [`run-tests.yml` 파일][14]에서 다음 파라미터를 설정하세요.

| 이름                      | 유형         | 기본                                   | 설명                                                                                                                                                                                                 |
| ------------------------- | ------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | 환경 변수 이름 | `DATADOG_API_KEY`                         | API 키가 포함된 환경 변수 이름.                                                                                                                                                |
| `app_key`                 | 환경 변수 이름 | `DATADOG_APP_KEY`                         | APP 키가 포함된 환경 변수 이름.                                                                                                                                                |
| `config_path`             | 스트링       | `datadog-ci.json`                         | 테스트 실행 시 사용되는 글로벌 JSON 설정.                                                                                                                                                    |
| `fail_on_critical_errors` | boolean      | `false`                                   | 테스트가 트리거되지 않거나 결과를 가져올 수 없을 경우 실패.                                                                                                                                           |
| `fail_on_missing_tests`   | boolean      | `false`                                   | 공용 ID (`public_ids`를 사용하거나 [테스트 파일][18]에 나열되어 있는 ID)가 있는 지정 테스트 중 최소 하나 이상이 실행에서 누락될 경우 (예: 프로그램에서 또는 Datadog 사이트에서 삭제된 경우) 실패. |
| `fail_on_timeout`         | boolean      | `true`                                    | 결과 중 하나가 테스트 제한 시간을 초과하면 CI를 강제로 실패 (또는 통과) 조치                                                                                                                              |
| `files`                   | 스트링       | `{,!(node_modules)/**/}*.synthetics.json` | Synthetic 테스트 설정 파일을 감지하는 글로브 패턴                                                                                                                                                        |
| `junit_report`            | 스트링       | _none_                                    | JUnit 리포트를 생성하고 싶은 경우 파일 이름                                                                                                                                                |
| `locations`               | 스트링       | _[테스트 파일]의 값[18]_              | 테스트가 실행되는 위치를 재정의하기 위해 세미콜론으로 구분된 위치 문자열.                                                                                                                 |
| `public_ids`              | 스트링       | _[테스트 파일][18]의 값_              | 트리거하려는 Synthetic 테스트의 공개 ID를 쉼표로 구분한 문자열.                                                                                                                           |
| `site`                    | 스트링       | `datadoghq.com`                           | 데이터를 전송할 [Datadog 사이트][17]. `DD_SITE` 환경 변수가 설정되어 있으면 해당 변수가 우선함.                                                                                                  |
| `subdomain`               | 스트링       | `app`                                     | Datadog 애플리케이션에 액세스할 때 사용할 커스텀 하위 도메인 이름.                                                                                                                                    |
| `test_search_query`       | 스트링       | _none_                                    | 검색 쿼리에 해당하는 테스트를 트리거함.                                                                                                                                                              |
| `tunnel`                  | boolean      | `false`                                   | Continuous Testing Tunnel을 사용해 테스트를 트리거함.                                                                                                                                                         |
| `variables`               | 스트링       | _none_                                    | 테스트에 변수를 주입할 때 사용하는 키-값 쌍. `KEY=VALUE`를 사용한 형식이어야 함.                                                                                                                    |

`pollingTimeout`과 같은 파라미터를 사용자 지정하고 CircleCI 파이프라인에 대한 추가 옵션을 알아보려면 [Continuous Testing & CI/CD 통합 설정][12]을 참조하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Continuous Testing 및 CI/CD 설정][6]
- [Continuous Testing 및 CI GitHub Actions][11]
- [Datadog을 이용한 연속적인 테스트의 모범 사례][13]
- [Continuous Testing Tunnel][10]

[1]: https://github.com/DataDog/datadog-ci/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/synthetics
[3]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations
[4]: https://bats-core.readthedocs.io/en/stable/installation.html
[5]: https://circleci.com/orbs/registry/orb/datadog/synthetics-ci-orb
[6]: https://circleci.com/docs/2.0/orb-intro/#section=configuration
[7]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/issues
[8]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/pulls
[9]: https://discuss.circleci.com/c/orbs
[10]: https://docs.datadoghq.com/ko/continuous_testing/testing_tunnel
[11]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/github_actions
[12]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration?tab=npm
[13]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[14]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/commands/run-tests.yml
[15]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/simple-example.yml
[16]: https://github.com/DataDog/synthetics-test-automation-circleci-orb/blob/main/src/examples/advanced-example.yml
[17]: https://docs.datadoghq.com/ko/getting_started/site/
[18]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files