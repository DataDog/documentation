---
aliases:
- /ko/continuous_integration/setup_pipelines/custom_tags_and_metrics
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: 설명서
  text: 트러블슈팅 CI
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: 블로그
  text: Datadog CI 모니터를 사용하여 파이프라인 경고
kind: 설명서
title: 파이프라인 트레이스에 커스텀 태그 및 메트릭 추가
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

<div class="alert alert-info">커스텀 태그 및 메트릭은 베타 기능이며 API는 여전히 변경 가능합니다.</div>

커스텀 태그 및 메트릭 명령은 CI Visibility 파이프라인 트레이스에 사용자 정의 텍스트 및 숫자 태그를 추가하는 방법을 제공합니다. 이러한 태그를 사용해 패싯 (문자열 값 태그) 또는 측정값 (숫자 값 태그)을 만들 수 있습니다. 또한, 패싯 및 측정값은 파이프라인을 검색, 그래프화 또는 모니터링하는 데 사용할 수 있습니다.

## 호환성

커스텀 태그 및 메트릭은 다음 CI 제공자와 함께 작동합니다:

- Buildkite
- CircleCI
- GitLab (SaaS 또는 자체 호스팅 >= 14.1)
- GitHub.com (SaaS) **참고:** GitHub의 경우 태그 및 메트릭은 파이프라인 스팬에만 추가할 수 있습니다.
- Jenkins **참고:** Jenkins의 경우 [다음 지침][5]에 따라 파이프라인에 커스텀 태그를 설정합니다.
- Azure DevOps 파이프라인

## Datadog CI CLI 설치

`npm`을 사용하여 [`datadog-ci`][1](>=1.15.0) CLI를 전체적으로 설치합니다:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

또는 `npm`을 사용하지 않으려면 베타 버전의 [스탠드얼론 바이너리][2]를 사용하세요.

{{< tabs >}}
{{% tab "Linux" %}}
Linux에서 스탠드얼론 바이너리를 설치하려면 다음을 실행합니다:

{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_linux-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}
{{% /tab %}}

{{% tab "MacOS" %}}
MacOS에 스탠드얼론 바이너리를 설치하려면 다음을 실행합니다:

{{< code-block lang="shell" >}}
curl -L --fail "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_darwin-x64" --output "/usr/local/bin/datadog-ci" && chmod +x /usr/local/bin/datadog-ci
{{< /code-block >}}
{{% /tab %}}

{{% tab "Windows" %}}
Windows에 스탠드얼론 바이너리를 설치하려면 다음을 실행합니다:

{{< code-block lang="shell" >}}
Invoke-WebRequest -Uri "https://github.com/DataDog/datadog-ci/releases/latest/download/datadog-ci_win-x64.exe" -OutFile "datadog-ci.exe"
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 파이프라인 트레이스에 태그 추가

태그는 파이프라인 스팬 또는 작업 스팬에 추가할 수 있습니다. 이 작업을 수행하려면 다음을 실행합니다:

{{< code-block lang="shell" >}}
datadog-ci tag [--level <pipeline|job>] [--tags <tags>]
{{< /code-block >}}

환경 변수 `DATADOG_API_KEY`를 사용하여 유효한 [Datadog API 키][3]를 지정해야 합니다.

{{< site-region region="us5,us3,eu,ap1" >}}
환경 변수 `DATADOG_SITE`를 사용하여 [Datadog 사이트][1]를 지정해야 합니다.

[1]: /ko/getting_started/site/
{{< /site-region >}}

다음 예시에서는 파이프라인 스팬에 `team` 태그를 추가합니다:

{{< code-block lang="shell" >}}
datadog-ci tag --level pipeline --tags team:backend
{{< /code-block >}}

다음 예시에서는 현재 작업의 스팬에 `go.version` 태그를 추가합니다:

{{< code-block lang="shell" >}}
datadog-ci tag --level job --tags "go.version:`go version`"
{{< /code-block >}}

태그에서 패싯을 만들려면 [파이프라인 실행 페이지][4]의 태그 이름 옆에 있는 기어 아이콘을 클릭하고 **create facet** 옵션을 클릭합니다.

{{< img src="ci/custom-tags-create-facet.mp4" alt="Facet creation for custom tag" style="width:100%;" video="true">}}

## 파이프라인 트레이스에 메트릭 추가

파이프라인 스팬 또는 작업 스팬에 숫자 태그를 추가하려면 다음을 실행합니다:

{{< code-block lang="shell" >}}
datadog-ci metric [--level <pipeline|job>] [--metrics <metrics>]
{{< /code-block >}}

환경 변수 `DATADOG_API_KEY`를 사용하여 유효한 [Datadog API 키][3]를 지정해야 합니다.
{{< site-region region="us5,us3,eu,ap1" >}}
환경 변수 `DATADOG_SITE`를 사용하여 [Datadog 사이트][1]를 지정해야 합니다.

[1]: /ko/getting_started/site/
{{< /site-region >}}

다음 예시에서는 파이프라인 스팬에 `error_rate` 메트릭을 추가합니다:

{{< code-block lang="shell" >}}
datadog-ci metric --level pipeline --metrics "error_rate:0.56"
{{< /code-block >}}

다음 예시에서는 현재 실행 중인 작업의 스팬에 `binary.size` 메트릭을 추가합니다:

{{< code-block lang="shell" >}}
datadog-ci metric --level job --metric "binary.size:`ls -l dst/binary | awk '{print \$5}' | tr -d '\n'`"
{{< /code-block >}}

측정값을 생성하려면 [파이프라인 실행 페이지][4]의 메트릭 이름 옆에 있는 기어 아이콘을 클릭하고, **create measure** 옵션을 클릭합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://github.com/datadog/datadog-ci#standalone-binary-beta
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ko/continuous_integration/pipelines/jenkins?tab=usingui#setting-custom-tags-for-your-pipelines