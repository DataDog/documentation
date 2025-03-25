---
aliases:
- /ko/continuous_integration/static_analysis/circleci_orbs
- /ko/static_analysis/circleci_orbs
dependencies:
- https://github.com/DataDog/datadog-static-analyzer-circleci-orb/blob/main/README.md
description: Datadog과 CircleCI를 사용해 CI 파이프라인에서 Static Analysis 작업을 실행하세요.
title: Static Analysis와 CircleCI Orbs
---
[![CircleCI Build Status](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb.svg?style=shield "CircleCI Build Status")](https://circleci.com/gh/DataDog/datadog-static-analyzer-circleci-orb) [![CircleCI Orb Version](https://badges.circleci.com/orbs/datadog/datadog-static-analyzer-circleci-orb.svg)](https://circleci.com/developer/orbs/orb/datadog/datadog-static-analyzer-circleci-orb) [![GitHub License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/DataDog/datadog-static-analyzer-circleci-orb/main/LICENSE) [![CircleCI Community](https://img.shields.io/badge/community-CircleCI%20Discuss-343434.svg)](https://discuss.circleci.com/c/ecosystem/orbs)

## 개요

CircleCI 워크플로에서 [Datadog 정적 분석][1] 작업을 실행합니다.

## 설정

Datadog Static Analysis를 사용하려면 `static-analysis.datadog.yml` 파일을 리포지토리의 루트 디렉터리에 추가해 사용할 규칙 세트를 지정해야 합니다.

```yaml
rulesets:
  - <ruleset-name>
  - <ruleset-name>
```

### Python 전용 예시

다음은 Python 기반 리포지토리 예시입니다:

```yaml
rulesets:
  - python-code-style
  - python-best-practices
  - python-inclusive
```

## 워크플로

Datadog Static Analysis 작업을 실행하기 위해 `.circleci`에서 파일을 생성합니다.

다음은 워크플로 파일 샘플입니다.

```yaml
version: 2.1
orbs:
  datadog-static-analysis: datadog/datadog-static-analyzer-circleci-orb@1
jobs:
  run-static-analysis-job:
    docker:
      - image: cimg/node:current
    steps:
      - checkout
      - datadog-static-analysis/analyze:
          service: "my-service"
          env: "ci"
          site: {{< region-param key="dd_site" code="true" >}}
          cpu_count: 2
          enable_performance_statistics: false
workflows:
  main:
    jobs:
      - run-static-analysis-job
```

### 환경 변수

[CircleCI Project Settings 페이지][2]에서 다음 환경 변수를 설정합니다.

| 이름         | 설명                                                                                                                | 필수 |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|
| `DD_API_KEY` | Datadog API 키입니다. 이 키는 [Datadog 조직][3]에서 생성되며 비밀로 저장되어야 합니다.              | Yes     |
| `DD_APP_KEY` | Datadog 애플리케이션 키입니다. 이 키는 [Datadog 조직][4]에서 생성되며 비밀로 저장되어야 합니다.      | Yes     |

## 입력

워크플로를 사용자 지정하려면 Static Analysis에 대해 다음 파라미터를 설정하세요.

| 이름         | 설명                                                                                                                | 필수 | 기본값         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `service` | 결과에 태그를 지정할 서비스입니다.                                                                                | Yes     |                 |
| `env`     | 결과에 태그를 지정할 환경입니다. Datadog은 `ci`를 입력 값으로 권장합니다.                 | 아니요    | `none`          |
| `site`    | 정보를 전송할 [Datadog 사이트][4]입니다.                                                                                 | 아니요    | `datadoghq.com` | 
| `cpu_count`  | 분석기가 사용하는 CPU 수를 설정합니다.                                                                            | 아니요      | `2`             |
| `enable_performance_statistics` | 분석된 파일의 실행 시간 통계를 가져옵니다.                                                   | 아니요      | `false`         |

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [코드 분석에 대해 알아보기][1]

[1]: https://docs.datadoghq.com/ko/code_analysis/static_analysis
[2]: https://circleci.com/docs/set-environment-variable/#set-an-environment-variable-in-a-project
[3]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#application-keys