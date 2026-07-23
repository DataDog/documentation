---
aliases:
- /ko/continuous_integration/pipelines/custom_tags_and_metrics
- /ko/continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: CI Visibility 문제 해결
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: 블로그
  text: Datadog CI 모니터로 파이프라인 알림을 설정하세요
title: 파이프라인 트레이스에 커스텀 태그 및 측정값 추가
---

## 개요

커스텀 태그 및 측정 명령을 사용하여 [CI Pipeline Visibility][11]의 파이프라인 트레이스에 사용자 정의 텍스트 및 숫자 태그를 추가합니다. [`datadog-ci` NPM 패키지][1]를 사용하여 파이프라인 트레이스 또는 작업 스팬에 측정값을 추가하는 것 외에도 커스텀 태그를 추가할 수 있습니다. 이러한 커스텀 태그 및 측정값에서 패싯(문자열 값 태그) 또는 측정값(숫자 값 태그)을 생성할 수 있습니다.

패싯과 측정값을 사용하여 [CI Visibility Explorer][10]에서 파이프라인에 대한 필터링, 시각화 생성 또는 모니터 생성을 수행할 수 있습니다.

### 호환성

커스텀 태그 및 측정값은 다음 CI 공급자와 함께 작동합니다.

- Buildkite
- CircleCI
- GitLab (SaaS 또는 자체 호스팅 >= 14.1)
- GitHub.com (SaaS): GitHub 작업에 태그 및 측정값을 추가하려면 [아래 섹션](#add-tags-and-measures-to-github-jobs)을 참조하세요.
- Jenkins: Jenkins의 경우 [이 지침][5]에 따라 파이프라인에 커스텀 태그를 설정하세요.
- Azure DevOps Pipelines

## Datadog CI CLI 설치하기

`npm`을 사용하여 [`datadog-ci`][1](>=1.15.0) CLI를 전체적으로 설치합니다:

```shell
npm install -g @datadog/datadog-ci
```

또는 `npm`을 사용하지 않으려면 베타 버전의 [스탠드얼론 바이너리][2]를 사용하세요.

{{< tabs >}}
{{% tab "Linux" %}}
Linux에 독립형 바이너리를 설치하려면 다음을 실행하세요.

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "MacOS" %}}
MacOS에 독립형 바이너리를 설치하려면 다음을 실행하세요.

```shell
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
```
{{% /tab %}}

{{% tab "Windows" %}}
Windows에 독립형 바이너리를 설치하려면 다음을 실행하세요.

```shell
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64" -OutFile "datadog-ci.exe"
```
{{% /tab %}}
{{< /tabs >}}

## 파이프라인 트레이스에 태그 추가

파이프라인 스팬 또는 작업 스팬에 태그를 추가할 수 있습니다.

이를 위해 `tag` 명령을 실행합니다.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag [--level <pipeline|job>] [--tags <tag1>] [--tags <tag2>] ...
```

환경 변수 `DATADOG_API_KEY` 를 사용하여 유효한 [Datadog API 키][3]를 지정하고 환경 변수 `DATADOG_SITE`를 사용하여 [Datadog 사이트][12]를 지정해야 합니다.

다음 예시에서는 파이프라인 스팬에 `team` 및 `service` 태그를 추가합니다.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level pipeline --tags team:backend --tags service:processor
```

다음 예시에서는 현재 작업의 스팬에 `go.version` 태그를 추가합니다:

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci tag --level job --tags "go.version:`go version`"
```

태그에서 패싯을 생성하려면 [Pipeline Executions 페이지][4]에서 태그 이름 옆에 있는 기어 아이콘을 클릭하고 **Create Facet**을 클릭합니다.

{{< img src="ci/custom-tags-create-facet.mp4" alt="커스텀 태그에 대한 패싯 생성" style="width:100%;" video="true">}}

## 파이프라인 트레이스에 측정값 추가

파이프라인 스팬 또는 작업 스팬에 숫자 태그를 추가하려면 `measure` 명령을 실행합니다.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure [--level <pipeline|job>] [--measures <measure1>] [--measures <measure2>]...
```

환경 변수 `DATADOG_API_KEY` 를 사용하여 유효한 [Datadog API 키][3]를 지정하고 환경 변수 `DATADOG_SITE`를 사용하여 [Datadog 사이트][12]를 지정해야 합니다.

다음 예시에서는 파이프라인 스팬에 `error_rate` 및 `size` 측정값을 추가합니다.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level pipeline --measures "error_rate:0.56" --measures "size:2327"
```

다음 예에서는 현재 실행 중인 작업의 스팬에 측정값 `binary.size`를 추가합니다.

```shell
DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci measure --level job --measures "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
```

측정값을 생성하려면 [Pipeline Executions 페이지][4]에서 측정값 이름 옆에 있는 기어 아이콘을 클릭하고 **Create Measure**을 클릭합니다.

## GitHub 작업에 태그 및 측정값 추가

GitHub 작업에 태그 및 측정값을 추가하려면 `datadog-ci CLI` 버전 `2.29.0` 이상이 필요합니다.
작업 이름이 워크플로 구성 파일(GitHub [작업 ID][7])에 정의된 항목과 일치하지 않는 경우 작업 이름을 가리키는 `DD_GITHUB_JOB_NAME` 환경 변수가 노출되어야 합니다. 예를 들어,
1. [이름 속성][8]을 사용하여 작업 이름을 변경하는 경우:
    ```yaml
    jobs:
      build:
        name: My build job name
        env:
          DD_GITHUB_JOB_NAME: My build job name
        steps:
        - run: datadog-ci tag ...
    ```
2. [매트릭스 전략][9]을 사용하면 작업 이름 끝에 괄호 안에 매트릭스 값을 추가하여 GitHub에서 여러 작업 이름을 생성합니다. 그런 다음 `DD_GITHUB_JOB_NAME` 환경 변수는 매트릭스 값을 조건으로 해야 합니다.

    ```yaml
    jobs:
      build:
        strategy:
          matrix:
            version: [1, 2]
            os: [linux, macos]
        env:
          DD_GITHUB_JOB_NAME: build (${{ matrix.version }}, ${{ matrix.os }})
        steps:
        - run: datadog-ci tag ...
    ```

## 한계

- 파이프라인이나 작업에 추가할 수 있는 태그의 최대 개수는 100개입니다.
- 파이프라인이나 작업에 추가할 수 있는 측정값의 최대 개수는 100개입니다.
- 태그 또는 측정값의 최대 길이는 300자(키 + 값)입니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ko/continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines
[6]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux#add-tags-and-measures-to-github-jobs
[7]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[8]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[9]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy
[10]: /ko/continuous_integration/explorer
[11]: /ko/continuous_integration/pipelines/
[12]: /ko/getting_started/site/