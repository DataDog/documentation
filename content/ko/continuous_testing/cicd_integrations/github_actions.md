---
aliases:
- /ko/synthetics/cicd_integrations/github_actions
dependencies:
- https://github.com/DataDog/synthetics-ci-github-action/blob/main/README.md
title: Continuous Testing 및 CI GitHub Actions
---
## 개요

[Datadog CI Synthetics 명령][1]으로 GitHub 워크플로에서 Synthetic 테스트를 트리거하세요.

## 설정

시작하기:

1. GitHub 리포지토리에 Datadog API와 애플리케이션 키를 비밀로 추가합니다. 더 많은 정보를 보려면 [API와 애플리케이션 키][2]를 참고하세요.
2. GitHub 워크플로에서 `DataDog/synthetics-ci-github-action`을 사용합니다.

워크플로우는 [간단](#simple-workflows)하거나 [복합](#complex-workflows)적일 수 있습니다.

## 간단한 워크플로 

### 공용 ID를 사용한 워크플로 예시

```yaml
name: Run Synthetic tests using the test public IDs
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.16.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          public_ids: 'abc-d3f-ghi, jkl-mn0-pqr'
```

### 기존 `synthetics.json` 파일을 사용한 워크플로 예시

```yaml
name: Run Synthetic tests using an existing synthetics.json file
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.16.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
```

테스트 파일 예시를 보려면 [`test.synthetics.json` 파일][12]을 참고하세요.

**참고**: 기본적으로 이 워크플로는 `{,!(node_modules)/**/}*.synthetics.json` 파일(`node_modules` 폴더에 있는 것을 제외하고 `.synthetics.json`로 끝나는 모든 파일)에 있는 모든 테스트를 실행합니다. `public_id`나 검색 쿼리를 사용해 Synthetic 테스트 목록을 트리거할 수도 있습니다.

## 복합적인 워크플로

### `test_search_query`를 사용한 워크플로 예시

```yaml
name: Run Synthetic tests by test tag
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.16.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:e2e-tests'
```

### 테스트 검색 쿼리와 변수 재정의를 사용한 워크플로 예시

```yaml
name: Run Synthetic tests using search query
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.16.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          test_search_query: 'tag:staging'
          variables: 'START_URL=https://staging.website.com,PASSWORD=stagingpassword'
```

### `config_path`와 함께 글로벌 설정 재정의를 사용한 워크플로 예시

이 GitHub Action은 글로벌 `datadog-ci.config.json` 파일의 경로를 재정의합니다.

```yaml
name: Run Synthetic tests with custom config
jobs:
  e2e_testing:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Run Datadog Synthetic tests
        uses: DataDog/synthetics-ci-github-action@v0.16.0
        with:
          api_key: ${{secrets.DD_API_KEY}}
          app_key: ${{secrets.DD_APP_KEY}}
          config_path: './synthetics-config.json'
```

테스트 파일 예시를 보려면, 이 [`global.config.json` 파일][13]을 참고하세요.

## 입력

| 이름                      | 유형    | 요구 사항 | 설명                                                                                                                                                                                                                                  |
| ------------------------- | ------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_key`                 | 스트링  | _필수_  | Datadog API 키입니다. 이 키는 [Datadog 조직][2]에서 생성되고 [비밀][3]로 저장되어야 합니다. **기본값: ** 없음.                                                                                                        |
| `app_key`                 | 스트링  | _필수_  | Datadog 애플리케이션 키입니다. 이 키는 [Datadog 조직][2]에서 생성되고 [비밀][3]로 저장되어야 합니다. **기본값:** 없음.                                                                                                |
| `public_ids`              | 스트링  | _선택_  | 트리거하고자 하는 Synthetic 테스트의 공용 ID가 쉼표로 구분되어 있는 목록입니다. 값을 제공하지 않으면 `synthetics.json`이라는 이름의 파일을 검색합니다. **기본값:** 없음.                                                             |
| `test_search_query`       | 스트링  | _선택_  | [검색 쿼리][5]에 해당하는 테스트를 트리거합니다. **기본값:** 없음.                                                                                                                                                                       |
| `subdomain`               | 스트링  | _선택_  | Datadog 애플리케이션에 액세스하도록 설정된 커스텀 하위 도메인 이름입니다. Datadog에 액세스할 때 사용하는 URL이`myorg.datadoghq.com`이면 하위 도메인 값이 `myorg`로 설정되어야 합니다. **기본값:** `app`.                                     |
| `files`                   | 스트링  | _선택_  | Synthetic 테스트 설정 파일을 감지할 때 사용되는 Glob 패턴입니다. **기본값:** `{,!(node_modules)/**/}*.synthetics.json`.                                                                                                                           |
| `datadog_site`            | 스트링  | _선택_  | 데이터를 보낼 [Datadog사이트][11]입니다. **기본값:** `datadoghq.com`.                                                                                                                                                                        |
| `config_path`             | 스트링  | _선택_  | 테스트를 실행할 때 사용할 [글로벌 JSON 설정][4]입니다. 자세한 정보를 보려면 [설정 파일 예시][13]를 참고하세요. **기본값:** `datadog-ci.json`.                                                                               |
| `variables`               | 스트링  | _선택_  | Synthetic 테스트에 사용할 글로벌 변수 목록입니다. 쉼표로 구분되어 있습니다. 예: `START_URL=https://example.org,MY_VARIABLE=My title`. **기본값:** `[]`.                                                                                   |
| `junit_report`            | 스트링  | _선택_  | JUnit 리포트를 생성하고 싶을 경우 파일 이름입니다. **기본값:** 없음.                                                                                                                                                              |
| `tunnel`                  | boolean | _선택_  | [Continuous Testing Tunnel][9]을 사용해 테스트 배치를 실행합니다. **기본값:** `false`.                                                                                                                                                     |
| `polling_timeout`         | 숫자  | _선택_  | 액션이 테스트 결과 폴링을 중지할 때까지의 시간(밀리초)입니다. CI 레벨에서 이 시간 이후에 완료된 테스트 결과는 실패로 간주됩니다. **기본값:** 30분.                                            |
| `fail_on_critical_errors` | boolean | _선택_  | 테스트가 트리거되지 않거나 Datadog에서 결과를 가져올 수 없을 경우 CI 작업을 실패로 처리합니다. **기본값:** `false`.                                                                                                                              |
| `fail_on_missing_tests`   | boolean | _선택_  | 실행 중에 공용 ID (`public_ids`를 사용하거나 [테스트 파일][12]에 있음)가 있는 지정된 테스트 중 하나 이상이 누락될 경우(예: 프로그램 또는 Datadog 사이트에서 삭제된 경우) CI 작업을 실패로 처리합니다. **기본값:** `false`. |
| `fail_on_timeout`         | boolean | _선택_  | 최소 하나 이상의 테스트가 테스트 제한 시간 기본값을 초과할 경우 CI 작업을 실패로 처리합니다. **기본값:** `true`.                                                                                                                                                  |

## 개발

```bash


yarn test

# 프로젝트 구축
yarn build

# 릴리스를 위해 프로젝트 및 해당 종속성 컴파일
yarn package
```

### 릴리스 절차

`synthetics-ci-github-action`의 새 버전을 릴리스 하려면:

1. 버전 업그레이드를 위해 새 브랜치를 생성합니다.
2. 변경 내용에 따라 `yarn version [--patch|--minor|--major]`를 사용해 패키지 버전을 업데이트합니다. 무엇을 증가시켜야 하는지 확인하려면 [Semantic Versioning][7]을 참고하세요. `yarn version` 명령을 실행하면 새로운 커밋 `vX.Y.Z`와 새 태그가 Git 트리에 추가됩니다.
3. `README.md` 예시 버전을 업데이트하고 `yarn build && yarn package`로 프로젝트를 빌드 및 패키징합니다.

   이와 같은 변경 사항을 **`vX.Y.Z` 태그가 포함된 동일한 커밋**내에서 커밋해야 합니다. `git commit --amend`나 `git rebase -i HEAD~2`를 사용해 변경 사항을 동일한 커밋에 병합할 수 있습니다.

4. 릴리스 태그(`git push --tags`)와 브랜치를 업스트림(GitHub)으로 푸시합니다.

   설명에서 소개한 변경 사항을 포함해 풀 요청을 생성합니다. 이 풀 요청에는 최소한 하나의 승인이 필요합니다.

5. 풀 요청을 병합합니다.
6. [태그 페이지][8]에서 변경 사항에 대한 설명과 함께 GitHub 릴리스를 생성합니다.

⚠️ 릴리스 버전이 예상 형식인 `vX.Y.Z`를 따르는지 확인하세요.

릴리스가 생성되면 Github Action의 새 버전을 워크플로에서 사용할 수 있습니다.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Continuous Testing 및 CI/CD 설정][6]
- [Datadog을 사용한 연속적 테스트 모범 사례][10]

[1]: https://github.com/DataDog/datadog-ci
[2]: https://docs.datadoghq.com/ko/account_management/api-app-keys/
[3]: https://docs.github.com/en/actions/reference/encrypted-secrets
[4]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration/?tab=npm#setup-the-client
[5]: https://docs.datadoghq.com/ko/synthetics/search/#search
[6]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration
[7]: https://semver.org/#summary
[8]: https://github.com/DataDog/synthetics-ci-github-action/tags
[9]: https://docs.datadoghq.com/ko/continuous_testing/testing_tunnel/
[10]: https://www.datadoghq.com/blog/best-practices-datadog-continuous-testing/
[11]: https://docs.datadoghq.com/ko/getting_started/site
[12]: https://docs.datadoghq.com/ko/continuous_testing/cicd_integrations/configuration/?tab=npm#test-files
[13]: https://github.com/DataDog/datadog-ci/blob/master/.github/workflows/e2e/global.config.json