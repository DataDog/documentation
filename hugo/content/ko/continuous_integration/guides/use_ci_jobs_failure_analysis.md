---
description: 로그 분석을 사용하여 CI 파이프라인 실패의 가장 일반적인 근본 원인을 식별하는 방법을 알아보세요.
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: 문서
  text: 파이프라인 실행 검색 및 관리 방법 알아보기
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
  tag: 문서
  text: 임계 경로에서 CI 작업을 식별하여 파이프라인 소요 시간 줄이기
title: 로그 분석을 사용하여 실패한 CI 작업의 근본 원인 식별하기
---
## 개요 {#overview}

이 가이드에서는 로그 분석을 사용하여 실패한 CI 작업의 가장 일반적인 근본 원인을 파악하는 방법을 설명합니다. 이는 CI 파이프라인의 사용자 경험을 개선하는 데 도움이 될 수 있습니다.

Datadog은 이 분류기를 사용하여 [자동 작업 재시도][10] 기능을 강화하여 일시적인 실패일 가능성이 높은 작업을 다시 실행합니다.

### 로그 분석 이해 {#understanding-logs-analysis}

CI Visibility는 LLM 모델을 사용하여 향상된 오류 메시지를 생성하여 실패한 모든 CI 작업에서 수집된 관련 로그를 기반으로 도메인 및 하위 도메인별로 분류합니다.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="LLM 생성 오류 항목이 있는 실패한 CI 작업" width="90%">}}

#### CI Visibility는 CI 작업의 관련 로그를 어떻게 식별하나요? {#how-does-ci-visibility-identify-the-relevant-logs-of-a-ci-job}

CI Visibility는 어떤 로그 라인이 해당 CI 작업의 성공적인 이전 실행에서 수집된 로그에 나타나지 않았다면 해당 로그 라인은 관련성이 있다고 간주합니다. 로그 관련성은 실패한 CI 작업에서 생성된 로그에 대해서만 계산됩니다.

로그 탐색기에서 `@relevant:true` 태그를 사용하면 로그 라인이 관련성 있는 것으로 간주되었는지 확인할 수 있습니다.

#### LLM 모델은 어떤 정보를 입력으로 사용합니까? {#what-information-does-the-llm-model-use-as-input}

실패한 CI 작업에 관련 로그가 있으면 LLM 모델은 마지막 100개의 관련 로그 라인을 입력으로 사용합니다. 실패한 CI 작업에 관련 로그가 없으면 CI Visibility는 마지막 100개의 로그 라인을 전송합니다.

각 로그 라인은 사전 스캔되어 사용되기 전에 잠재적으로 민감한 정보가 비식별화됩니다.

<div class="alert alert-info">
LLM 모델은 유사한 메시지가 포함된 오류를 별개이지만 관련 하위 도메인으로 분류할 수 있습니다. 예를 들어, 오류 메시지가 다음과 같은 경우 <code>Cannot connect to docker daemon</code>일반적으로 <code>domain:platform</code> 및 <code>subdomain:network</code>범주로 분류됩니다. 하지만 LLM 모델이 때때로 다음 범주 아래에 분류할 수 있습니다 <code>subdomain:infrastructure</code> .
</div>

#### 도메인 및 하위 도메인 {#domains-and-subdomains}

오류는 도메인 및 하위 도메인으로 분류됩니다.

##### 도메인 {#domains}

| 도메인   | 설명                                                                                                                                                       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`     | CI 파이프라인에서 빌드 및 테스트 중인 코드로 인해 발생한 실패입니다. 코드를 수정한 개발자가 수정해야 합니다.           |
| `platform` | 빌드 및 테스트 중인 코드 외부의 이유로 발생한 실패입니다. 이러한 실패는 CI 공급자, 기본 인프라 또는 외부 종속성으로 인해 발생할 수 있습니다. 개발자 코드 변경 사항과 관련이 없으며 종종 전체 CI 시스템을 담당하는 팀이 수정해야 합니다. |
| `unknown`  | 작업 실패의 명확한 근본 원인이 로그에 나타나지 않을 때 사용됩니다.                                                                                                |

##### 하위 도메인 {#subdomains}

해당 하위 도메인을 확인하려면 도메인 탭을 클릭하세요.

{{< tabs >}}
{{% tab "코드" %}}

| 하위 도메인 | 원인                                     | 예시                                                                                                                   |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `build`     | 컴파일 또는 빌드 오류입니다. | `Compilation error in processor_test.go:28:50`                                                                             |
| `test`      | 테스트 실패입니다.              | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| `quality`   | 형식 또는 린팅 실패입니다.     | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| `security`  | 보안 위반입니다.         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "플랫폼" %}}

| 하위 도메인      | 원인                                                                                         | 예시                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assembly`       | 스크립트 실행 중 아티팩트 생성 오류 또는 어셈블리 오류입니다. | `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| `deployment`     | 배포 중 또는 배포 구성과 관련된 오류입니다.             | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| `infrastructure` | 작업이 실행된 인프라와 관련된 오류입니다.                 | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| `network`        | 다른 종속성과의 연결성 오류입니다.                                  | `Connection refused when accessing localhost:8080.`                                                                                                   |
| `credentials`    | 인증 오류입니다. 자격 증명이 누락되었거나 잘못되었습니다.                          | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| `dependencies`   | 작업 실행에 필요한 종속성을 설치하거나 업데이트하는 중 발생한 오류입니다.       | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| `git`            | git 명령 실행 오류입니다.                                                   | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| `checks`         | CI 작업 실행 중 필수 검사 충족과 관련된 오류입니다.            | `Release note not found during changelog validation`                                                                                                  |
| `setup`          | CI 작업 설정 오류입니다.                                                 | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| `script`         | CI 작업 스크립트의 구문 오류입니다.                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "알 수 없음" %}}

| 하위 도메인 | 설명                     | 예시                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| 알 수 없음   | 오류를 분류할 수 없습니다. | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### 지원되는 CI 공급자 {#supported-ci-providers}

로그 분석은 다음 CI 공급자에 대해 사용할 수 있습니다.

* [Azure Pipelines][8]
* [Buildkite][12]
* [CircleCI][13]
* [GitHub Actions][1]
* [GitLab][2]

**참고:** 로그 분석에는 CI 공급자별 구성이 필요할 수 있습니다. 사용 중인 공급자는 [Pipeline Visibility 설정 페이지][6]의 **로그 분석** 섹션을 확인하세요.

<div class="alert alert-info">로그 분석에 관심이 있지만 사용 중인 CI 공급자가 아직 지원되지 않는 경우 <a href="https://forms.gle/vSrqS5QwitgHf9wG6" target="_blank">이 양식</a>을 작성하세요.</div>

## CI 파이프라인에서 가장 자주 발생하는 오류 식별 {#identify-the-most-recurrent-errors-in-your-ci-pipelines}

### CI 상태 페이지 사용 {#using-the-ci-health-page}

[CI Health][3]는 CI 파이프라인의 상태 및 성능에 대한 상위 수준의 개요를 제공합니다. DevOps 및 엔지니어링 팀이 CI 작업을 모니터링하고 실패를 탐지하며 빌드 성능을 최적화하도록 지원합니다.

이 페이지에서는 오류 도메인별로 분류된 CI 파이프라인의 오류 분석을 확인할 수 있습니다. CI 파이프라인을 클릭하고 {{< ui >}}Failed Executions{{< /ui >}} 섹션의 {{< ui >}}Breakdown{{< /ui >}} 열을 확인하세요.

{{< img src="continuous_integration/ci_health_failed_executions_breakdown.png" alt="CI Health의 CI 작업 실패 분석 분류" width="90%">}}

### 패싯 사용 {#using-facets}

`@error.message`, `@error.domain`, `@error.subdomain` 패싯을 사용하여 CI 파이프라인에서 가장 자주 발생하는 오류를 식별합니다. 이러한 패싯을 사용하여 사용자 지정 대시보드와 노트북을 만들 수 있습니다.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="error.domain 및 error.subdomain별로 필터링된 실패한 CI 작업" width="90%">}}

이러한 패싯은 쿼리에서 `ci_level:job`을 사용할 때만 사용할 수 있습니다. CI 작업 실패 분석을 계산할 수 없는 경우(예: 지원되는 CI 공급자를 사용하지 않는 경우) 이러한 패싯에는 CI 공급자에서 가져온 오류 정보가 포함됩니다.

### 대시보드 템플릿 사용 {#using-the-dashboard-template}

{{< ui >}}CI Visibility - CI Jobs Failure Analysis{{< /ui >}} 대시보드 템플릿을 가져올 수 있습니다.

1. [civisibility-ci-jobs-failure-analysis-dashboard.json][4] 대시보드 템플릿을 열고 내용을 클립보드에 복사합니다.
2. Datadog에서 [새 대시보드][5]를 만듭니다.
3. 복사한 내용을 새 대시보드에 붙여넣습니다.
4. 대시보드를 저장합니다.

{{< img src="continuous_integration/ci_jobs_failure_analysis_dashboard.png" alt="로그 분석 대시보드" width="90%">}}

### PR 코멘트 사용 {#using-pr-comments}

PR 코멘트에 로그 분석을 추가할 수 있습니다.

{{< img src="continuous_integration/pr_comment.png" alt="로그 분석이 포함된 PR 코멘트" width="90%">}}

PR 코멘트가 게시되려면 리포지토리가 Datadog과 통합되어 있어야 합니다. 자세한 내용은 [Datadog에 Git 리포지토리 연결][7]을 참조하세요.

[**CI/CD Optimization** > **Settings** > **Repositories**][11]에서 PR Comments를 활성화합니다.

1. 설정을 적용할 위치를 선택합니다.
   - **조직** 탭을 선택하여 기본적으로 모든 리포지토리에 대해 PR 코멘트를 활성화합니다.
   - **리포지토리별** 탭을 선택하여 단일 리포지토리에 대해 PR 코멘트를 활성화합니다.
1. **일반**에서 **PR 코멘트**를 켭니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/ko/continuous_integration/pipelines/github/
[2]:/ko/continuous_integration/pipelines/gitlab/
[3]:https://app.datadoghq.com/ci/pipelines/health/
[4]:/ko/resources/json/civisibility-ci-jobs-failure-analysis-dashboard.json
[5]:/ko/dashboards/
[6]:/ko/continuous_integration/pipelines/#setup
[7]:/ko/integrations/guide/source-code-integration/#connect-your-git-repositories-to-datadog
[8]:/ko/continuous_integration/pipelines/azure/
[10]:/ko/continuous_integration/pipelines/automatic_retries/
[11]:https://app.datadoghq.com/ci/settings/ci-cd/repositories
[12]:/ko/continuous_integration/pipelines/buildkite/
[13]:/ko/continuous_integration/pipelines/circleci/