---
aliases:
- /ko/continuous_integration/dora_metrics/setup/
- /ko/continuous_integration/dora_metrics/setup/deployments
- /ko/continuous_integration/dora_metrics/setup/incidents
- /ko/dora_metrics/setup/incidents
- /ko/dora_metrics/setup/deployments
- /ko/dora_metrics/setup/failures/
- /ko/dora_metrics/deployments/apm
- /ko/dora_metrics/deployments/deployment_api
- /ko/dora_metrics/deployments
- /ko/dora_metrics/failures/incident_api
- /ko/dora_metrics/failures/pagerduty
- /ko/dora_metrics/failures/
description: APM 배포 추적, API, CLI, 그리고 인시던트 관리를 포함한 DORA Metrics용 배포 및 실패 이벤트 데이터 소스를
  구성합니다.
further_reading:
- link: /dora_metrics/
  tag: 설명서
  text: DORA Metrics에 대해 알아보기
- link: /dora_metrics/calculation
  tag: 설명서
  text: DORA Metrics 계산 방식 알아보기
- link: /dora_metrics/change-failure-detection
  tag: 설명서
  text: 변경 실패 감지에 대해 알아보기
- link: /tracing/software_catalog
  tag: 설명서
  text: Software Catalog에 대해 알아보기
- link: https://github.com/DataDog/datadog-ci
  tag: 소스 코드
  text: datadog-ci CLI 도구에 대해 알아보기
title: DORA Metrics 설정
---
## 개요 {#overview}

DORA Metrics는 배포 이벤트를 사용하여 소프트웨어 배포 성능을 추적하고 측정합니다. 이러한 이벤트는 배포 빈도, 변경 리드 타임, 변경 실패율 및 복구 시간의 네 가지 주요 DORA 메트릭을 산출하는 데 사용됩니다.

DORA Metrics를 사용하려면 다음 단계를 따르세요.

1. **[배포 데이터 소스 구성](#configure-a-deployment-data-source)**: APM 배포 추적 또는 DORA Metrics API/CLI를 통해 배포 이벤트를 Datadog에 전송하는 방법을 선택합니다.

2. **[커밋 정보로 배포 이벤트 보강](#enrich-deployments-with-commit-information)**: 배포 이벤트에 Git 메타데이터(저장소 URL 및 커밋 SHA)를 추가하고 저장소를 Datadog와 동기화하여 변경 리드 타임을 계산할 수 있도록 합니다.

3. **[변경 실패 감지 사용자 지정](#customize-change-failure-detection)**: DORA Metrics는 롤백(이전 버전 재배포)을 통해 실패한 배포를 자동으로 감지하며, Revert PR이나 Hotfix 라벨과 같은 일반적인 롤포워드 패턴에 대한 기본 규칙도 포함합니다. 팀의 특정 워크플로 및 수정 패턴에 맞게 이러한 규칙을 사용자 지정할 수 있습니다.

4. **[(선택 사항) 인시던트 추적 설정](#optional-set-up-incidents-tracking)**: 인시던트 데이터를 통합하여 감지된 변경 실패와 프로덕션 인시던트를 연관시켜 배포가 서비스 상태에 미치는 영향을 완전하게 파악할 수 있습니다.

구성이 완료되면 배포 이벤트가 팀, 서비스, 환경 및 [사용자 지정 태그](#custom-tags)로 필터링된 성능 데이터를 자동으로 [DORA Metrics 대시보드][1]에 채웁니다.

### 제한 사항 {#limitations}

- 데이터 소스 옵션(예: APM 배포 추적)을 처음 선택하면 DORA Metrics는 그 시점부터 데이터를 채우기 시작합니다. 소스 A에서 소스 B로 전환한 다음 다시 소스 A로 되돌아가더라도 소스 A의 과거 데이터는 처음 선택된 시점 이후의 데이터만 사용할 수 있습니다.
- 동일한 서비스의 배포는 동시에 발생할 수 없습니다.

## 배포 데이터 소스 구성 {#configure-a-deployment-data-source}

DORA Metrics는 다음 배포 이벤트를 위한 데이터 소스를 지원합니다.

{{< tabs >}}
{{% tab "APM 배포 추적" %}}

[APM 배포 추적][1]을 DORA Metrics의 배포를 위한 데이터 소스로 구성할 수 있습니다.

### 요구 사항 {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}}이 [DORA 설정][2]에서 {{< ui >}}Deployments{{< /ui >}} 이벤트 데이터 소스로 활성화되어 있어야 합니다.
- 서비스가 Software Catalog에 [메타데이터][3]와 함께 정의되어 있어야 합니다.
- 서비스에 [unified service tagging][4]이 활성화되어 있어야 합니다. 배포는 `version` 태그를 사용하여 식별됩니다.

APM에 의해 추적된 서비스 배포가 변경 리드 타임에 기여하도록 보장하는 방법에 대한 자세한 내용은 [커밋 정보로 배포 보강](#enrich-deployments-with-commit-information)을 참조하세요.

[1]: /ko/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /ko/software_catalog/adding_metadata
[4]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API 또는 CLI" %}}

자체 배포 이벤트를 전송하려면 [DORA Metrics API][1] 또는 [`datadog-ci dora deployment`][2] 명령을 사용하세요.

### 요구 사항 {#requirements-1}

- [DORA 설정][3]에서 {{< ui >}}datadog-ci CLI / API{{< /ui >}}이 {{< ui >}}Deployments{{< /ui >}} 이벤트 데이터 소스로 활성화되어 있어야 합니다.
- 필수 속성은 다음과 같습니다.
  - `started_at`: 배포가 시작된 시간입니다.
  - `finished_at`: 배포가 완료된 시간입니다.
  - `service`: 배포된 서비스입니다. 제공된 서비스가 [Software Catalog][4]에 등록되어 있고 메타데이터가 설정되어 있는 경우([메타데이터 추가][5] 참조), 서비스의 `team`이 자동으로 조회되어 모든 메트릭과 연결됩니다.

배포 이벤트에 다음 속성을 선택적으로 추가할 수 있습니다.

- `repository_url`: 서비스의 소스 코드 저장소입니다. 변경 리드 타임을 계산하는 데 필요합니다.
- `commit_sha`: 배포와 관련된 HEAD 커밋의 SHA입니다. 변경 리드 타임을 계산하는 데 필요합니다.
- `team`: 서비스에 대해 자동으로 검색된 것과 다른 `team`에 배포를 연결합니다.
- `env`: [DORA Metrics][6] 페이지에서 환경별로 DORA 메트릭을 필터링합니다.
- `id`: 배포를 식별합니다. 이 속성은 사용자가 생성한 속성입니다. 지정하지 않으면 엔드포인트는 Datadog가 생성한 UUID를 반환합니다.
- `version`: 배포 버전입니다.
- `custom_tags`: [DORA Metrics][6] 페이지에서 이벤트를 필터링하는 데 사용할 수 있는 `key:value` 형식의 태그입니다.


### API(cURL) 예제 {#api-curl-example}

전체 사양 및 추가 코드 샘플은 [DORA Metrics API 참조 설명서][1]를 참조하세요.

다음 예제에서는 URL의 `<DD_SITE>`를 {{< region-param key="dd_site" code="true" >}} 으로 바꾸고 `${DD_API_KEY}`를 [Datadog API 키][7]로 바꿉니다.

```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "team": "backend",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

### CLI 예제 {#cli-example}

[`datadog-ci`][2] CLI 도구를 사용하면 Continuous Integration 환경에서 손쉽게 배포 이벤트를 전송할 수 있습니다.

다음 예제에서는 `DD_SITE` 환경 변수를 {{< region-param key="dd_site" code="true" >}} 으로 설정하고 `DD_API_KEY` 환경 변수를 [Datadog API 키][7]로 설정합니다.

```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --version v1.12.07 --custom-tags department:engineering \
    --custom-tags app_type:backend \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

`--finished-at`을 지정하지 않으면 배포 종료 시간은 현재 시각으로 자동 설정됩니다.

배포 CI 작업이 실제 배포되는 Git 리비전과 동일한 경우 `git-repository-url` 및 `git-commit-sha`은 생략할 수 있으며 CI 컨텍스트에서 자동으로 추론됩니다.

`--skip-git` 옵션을 사용하면 저장소 URL과 커밋 SHA 전송을 비활성화할 수 있습니다. 이 옵션을 추가하면 변경 리드 타임 메트릭을 사용할 수 없게 됩니다.

[1]: /ko/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /ko/tracing/software_catalog
[5]: /ko/tracing/software_catalog/adding_metadata
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### 사용자 지정 태그 {#custom-tags}

배포와 연결된 서비스가 [Software Catalog][2]에 등록되어 있고 메타데이터가 설정되어 있는 경우([메타데이터 추가][3] 참조), 서비스의 `languages` 및 모든 `tags`가 자동으로 조회되어 이벤트와 연결됩니다.

## 커밋 정보로 배포 이벤트 보강 {#enrich-deployments-with-commit-information}

변경 리드 타임 계산을 활성화하려면 배포에 대한 Git 정보를 구성하고 저장소 메타데이터를 Datadog와 동기화해야 합니다. 이를 통해 DORA Metrics는 커밋 생성부터 배포까지 걸린 시간을 추적할 수 있습니다.

### 배포에 Git 정보 연결 {#attach-git-information-to-deployments}

Datadog은 배포의 헤드 커밋에 대한 Git 정보(리포지토리 URL 및 커밋 SHA)에 접근할 수 있어야 합니다. 요구 사항은 사용하는 배포 데이터 소스에 따라 다릅니다.

{{< tabs >}}
{{% tab "APM 배포 추적" %}}

APM 배포 추적으로 식별되는 배포의 경우 애플리케이션 텔레메트리에 Git 정보 태그가 포함되어 있어야 합니다.

- [APM에서][1]에서 Git 태깅을 활성화하거나 [소스 코드 통합 설명서][2]를 참조하세요.

**참고**: APM으로 추적되는 배포의 경우 변경 리드 타임은 커밋 생성 시점부터 해당 커밋이 새 버전에서 처음 관찰되는 시점까지를 기준으로 계산됩니다. `Deploy Time` 메트릭은 사용할 수 없습니다.

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /ko/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API 또는 CLI" %}}

DORA Metrics API 또는 `datadog-ci dora deployment` 명령으로 추적되는 배포의 경우 다음을 확인하세요.

- 배포 이벤트 페이로드에 `repository_url` 및 `commit_sha` 속성이 포함되어 있어야 합니다.

{{% /tab %}}
{{< /tabs >}}

### 리포지토리 메타데이터를 Datadog와 동기화 {#synchronize-repository-metadata-to-datadog}

Datadog은 현재 배포와 이전 배포 사이에 포함된 모든 커밋을 확인하기 위해 리포지토리 메타데이터(커밋, 파일 경로)에 접근할 수 있어야 합니다. Git 공급자에 따라 적절한 동기화 방법을 선택하세요.

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
GitHub의 <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> 트리거</a>에서 실행되는 워크플로는 현재 GitHub 통합에서 지원되지 않습니다.
현재 <code>pull_request</code> 트리거를 사용 중이면 대체 방법을 사용하세요.
</div>

[GitHub 통합][1]이 이미 설치되어 있지 않은 경우, [GitHub 통합 타일][2]에서 설치하세요.

GitHub 애플리케이션을 구성할 때:
1. 최소한 {{< ui >}}Read{{< /ui >}} 리포지토리 권한에 대해 {{< ui >}}Contents{{< /ui >}} 및 {{< ui >}}Pull Requests{{< /ui >}} 권한을 선택하세요.
2. 최소한 {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} 및 {{< ui >}}PullRequestReview{{< /ui >}} 이벤트를 구독하세요.

설정이 유효한지 확인하려면 [GitHub 통합 타일][2]에서 GitHub 애플리케이션을 선택하고 {{< ui >}}Datadog Features{{< /ui >}} 표에 {{< ui >}}Pull Request Information{{< /ui >}}이 모든 요구 사항을 충족하는 것으로 표시되는지 확인하세요.

[1]: /ko/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
[GitLab 소스 코드 통합][1]이 아직 설치되지 않은 경우 [GitLab 소스 코드 통합 타일][2]에 설치합니다.

**참고**: 서비스 계정의 개인 액세스 토큰 범위는 최소 `read_api` 이상이어야 합니다.

### GitLab 그룹 및 하위 그룹 처리 {#handling-gitlab-groups-and-subgroups}

리포지토리가 [**GitLab 그룹 또는 하위 그룹**][3](예:
`https://gitlab.com/my-org/group(/subgroup)/repo`) 아래에 구성된 경우,
GitLab의 중첩 그룹 구조로 인해 자동 서비스 경로 감지가 올바르게 동작하지 않을 수 있습니다.

DORA 메트릭이 서비스의 소스 코드 경로를 올바르게 처리할 수 있도록
서비스 정의에서 다음 구성을 사용할 수 있습니다.

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      # All paths relative to the repository URL provided with the deployment
      - **
      # or specific paths related to this service (for monorepos)
      - src/apps/shopist/**
      - src/libs/utils/**
```

[1]: /ko/integrations/gitlab-source-code/
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
[3]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Azure DevOps" %}}

<div class="alert alert-danger">
2026년 3월 10일 이전에 통합이 설치된 경우 모든 DORA 메트릭이 올바르게 계산되도록 <a href="https://github.com/DataDog/azdevops-sci-hooks">웹훅 설치 설정 스크립트</a>를 다시 실행하세요. 오류가 발생하면 지원팀에 연락하기 전에 스크립트를 다시 실행하세요.
</div>

[Azure DevOps 소스 코드 통합][1]이 아직 설치되지 않은 경우 [Azure DevOps 소스 코드 통합 타일][2]에 설치합니다.

통합 설정 방법:

1. Datadog에서 [Azure DevOps 소스 코드 통합 타일][2]을 엽니다.

2.  {{< ui >}}Configuration{{< /ui >}} 탭을 선택하고 {{< ui >}}Connect Microsoft Entra App{{< /ui >}}을 클릭합니다.

3. 설정 지침을 따릅니다.

4. {{< ui >}}Add Organizations{{< /ui >}}를 클릭합니다.

5. 리포지토리 설치 단계를 따르고 [**설정 스크립트를 실행**][3]합니다. 스크립트를 실행하지 않으면 풀 요청이 생성되기 이전에 이루어진 커밋이 해당 풀 요청과 연결되지 않습니다.

6. 스크립트가 완료되면 타일에서 통합 상태를 확인합니다. 연결된 리포지토리와 프로젝트가 목록에 표시됩니다.

[1]: https://docs.datadoghq.com/ko/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "기타 Git 공급자" %}}

[`datadog-ci git-metadata upload`][1] 명령을 사용하여 Git 리포지토리 메타데이터를 업로드할 수 있습니다.
이 명령이 실행되면 Datadog은 리포지토리 URL, 현재 브랜치의 커밋 SHA, 추적된 파일 경로 목록을 수신합니다.

새 커밋마다 CI에서 이 명령을 실행하세요. 특정 커밋 SHA에 대해 배포가 실행되는 경우, 배포 이벤트가 전송되기 **전**에 해당 커밋에 대해 `datadog-ci git-metadata upload` 명령을 실행해야 합니다.

<div class="alert alert-danger">
이 <code>--no-gitsync</code> 옵션을 <code>datadog-ci git-metadata upload</code> 명령에 제공하지 마세요.
해당 옵션이 포함되면, 커밋 정보가 Datadog로 전송되지 않으며 변경 리드 타임 메트릭이 계산되지 않습니다.
</div>

명령 출력에서 명령의 설정이 올바른지 확인할 수 있습니다. 올바른 출력 예시는 다음과 같습니다.

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### 같은 리포지토리에서 여러 서비스를 처리하기 {#handling-multiple-services-in-the-same-repository}

여러 서비스의 소스 코드가 같은 리포지토리에 존재하는 경우, 배포되는 특정 서비스에 영향을 미치는 커밋만 고려하여 변경 리드 타임이 계산되도록 추가 작업이 필요합니다.

해당 서비스에 영향을 미치는 커밋만 측정되도록 필터링하려면, [서비스 정의][4]에서 소스 코드 글로브 파일 경로 패턴을 지정하세요.

서비스 정의에 애플리케이션 폴더를 가리키는 **전체** GitHub 또는 GitLab URL이 포함되어 있으면, 단일 경로 패턴이 자동으로 사용됩니다. 링크 유형은 **repo**여야 하며, 링크 이름은 "Source" 또는 서비스의 이름(아래 예제의 `shopist`)이어야 합니다.

**예제(스키마 버전 v2.2):**
{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```
{{% /tab %}}
{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```
{{% /tab %}}
{{% tab "Azure DevOps" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: azure
    url: https://dev.azure.com/organization/project/_git/example-repository?path=/src/apps/shopist
```
{{% /tab %}}
{{< /tabs >}}

`shopist` 서비스에 대한 DORA Metrics는 `src/apps/shopist/**` 내 변경 사항이 포함된 Git 커밋만 고려합니다. 보다 세밀한 필터링 제어가 필요한 경우 `extensions[datadoghq.com/dora-metrics]`를 구성할 수 있습니다.**예제(스키마 버전 v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

`shopist` 서비스에 대한 DORA Metrics는 `src/apps/shopist/**` 또는 `src/libs/utils/**` 내 변경 사항이 포함된 Git 커밋만 고려합니다.

서비스에 대해 두 개의 메타데이터 항목이 정의된 경우, 커밋 필터링에는 `extensions[datadoghq.com/dora-metrics]`만 사용됩니다.

## 변경 실패 감지 사용자 지정 {#customize-change-failure-detection}

DORA Metrics는 변경 실패율과 실패한 배포 복구 시간을 계산하기 위해 실패한 배포를 자동으로 식별합니다.

### 작동 방식 {#how-it-works}

[변경 실패 감지][5]는 복구 배포를 식별하고 이를 복구하는 특정 배포와 연결하여 즉시 작동합니다.

**자동 감지(구성 필요 없음)**:
- **롤백**: 이전에 배포된 버전이 다시 배포되면 자동으로 감지됩니다.

**사용자 지정 규칙(사용자 지정 가능)**:
- **롤포워드**: Revert PR, Hotfix 라벨과 같은 일반적인 패턴에 맞는 기본 규칙을 통해 감지됩니다. 팀의 워크플로와 복구 패턴에 맞게 [DORA 설정][6]에서 이러한 규칙을 사용자 지정할 수 있습니다.

감지 작동 방식과 규칙을 사용자 지정하는 방법에 대한 자세한 내용은 [변경 실패 감지 설명서][5]를 참조하세요.

## (선택 사항) 인시던트 추적 설정 {#optional-set-up-incidents-tracking}

인시던트 데이터를 통합하면 배포 활동이 서비스 상태에 미치는 영향을 종합적으로 파악할 수 있습니다. 자동으로 감지된 변경 실패와 함께 인시던트를 추적하면, 배포 성능과 실제 운영 영향 간의 상관관계를 파악하고 소프트웨어 배포가 서비스 안정성에 미치는 전체적인 영향을 이해할 수 있습니다.

DORA Metrics는 인시던트 추적을 위한 다음 옵션을 지원합니다.

{{< tabs >}}
{{% tab "Datadog 인시던트" %}}
DORA Metrics는 [Datadog 인시던트][1]를 통해 실패를 자동으로 식별하고 추적할 수 있습니다. 인시던트가 선언되면 DORA는 이를 사용하여 변경 실패율과 복구 시간을 측정합니다.

**참고**: 복구 시간은 인시던트가 `active` 상태에 머문 전체 시간으로 측정됩니다. `active` → `stable` → `active` → `stable`와 같은 상태 전이가 발생한 경우, 모든 `active` 상태 기간이 포함됩니다. 복구 시간은 인시던트가 `stable` 또는 `resolved` 상태일 때만 표시됩니다. `resolved` 상태의 인시던트가 다시 활성화되면 해당 메트릭은 숨겨지며, 다시 `resolved` 상태가 되면 표시됩니다.


### 요구 사항 {#requirements-2}

- {{< ui >}}Incidents{{< /ui >}}가 [DORA 설정][2]에서 {{< ui >}}Failures{{< /ui >}} 이벤트 데이터 소스로 활성화되어 있어야 합니다.

레이블 없는 실패를 방지하기 위해 Datadog은 다음 속성을 인시던트에 추가할 것을 강력히 권장합니다.
  - {{< ui >}}Teams{{< /ui >}}
  - {{< ui >}}Services{{< /ui >}}
  - {{< ui >}}Envs{{< /ui >}}: {{< ui >}}Envs{{< /ui >}} 속성이 없는 경우 [인시던트 설정][3]에서 추가할 수 있습니다.

이 속성이 인시던트에 제공되면 실패 이벤트에 `Severity` 태그가 추가됩니다.

**권장**: [인시던트 설정][3]에서 속성 필드 {{< ui >}}Prompted{{< /ui >}}를 {{< ui >}}At Resolution{{< /ui >}}으로 설정하면 인시던트 생성 시 해당 속성을 누락하는 일을 방지할 수 있습니다.

### 과거 인시던트 포함 {#include-historical-incidents}

[DORA 설정][2]에서 {{< ui >}}Backfill Data{{< /ui >}}를 선택하면 지난 2년간의 인시던트를 소급 적용하여 실패 이벤트를 생성할 수 있습니다. 데이터 보충은 완료까지 최대 1시간이 소요될 수 있습니다.

[1]: /ko/incident_response/incident_management/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][1]는 IT 팀이 인시던트를 즉시 파악하고 대응할 수 있도록 지원하는 인시던트 관리 플랫폼으로, 운영 안정성과 복원력을 유지하는 데 도움을 줍니다.

PagerDuty 계정을 DORA Metrics와 통합하려면 다음을 수행하세요.

1. [DORA 설정][2]에서 {{< ui >}}PagerDuty{{< /ui >}}를 {{< ui >}}Failures{{< /ui >}} 이벤트 데이터 소스로 활성화합니다.

1. PagerDuty에서 {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Developer Tools{{< /ui >}}으로 이동한 후 {{< ui >}}Generic Webhooks (v3){{< /ui >}}를 클릭합니다.

1. {{< ui >}}+ New Webhook{{< /ui >}}을 클릭하고 다음 세부 정보를 입력합니다.

     <table>
      <thead>
        <tr>
          <th>변수</th>
          <th>설명</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>웹훅 URL</td>
          <td>추가 <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>범위 유형</td>
          <td>전송할 인시던트의 범위를 선택합니다. 특정 {{< ui >}}Service{{< /ui >}} 또는 {{< ui >}}Team{{< /ui >}}에 대해 또는 {{< ui >}}Account{{< /ui >}} 내의 모든 PagerDuty 서비스에 대해 인시던트를 전송할 수 있습니다. 환경 및 권한 수준에 따라 일부 범위 유형은 사용할 수 없을 수 있습니다.</td>
        </tr>
        <tr>
          <td>설명</td>
          <td>설명은 웹훅을 구분하는 데 도움이 됩니다. 예를 들어 다음과 같은 설명을 추가할 수 있습니다. <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>이벤트 구독</td>
          <td>다음 이벤트를 선택하세요.<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>사용자 지정 헤더</td>
          <td>{{< ui >}}Add custom header{{< /ui >}}를 클릭하고, <code>DD-API-KEY</code> 을(를) 이름으로 입력하고, 값으로 <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">Datadog API 키</a>를 입력합니다.<br><br>원할 경우, 웹훅에서 전송되는 모든 PagerDuty 인시던트에 환경을 추가하기 위해 이름을 <code>dd_env</code> (으)로 하여 원하는 환경 값으로 추가 사용자 지정 헤더를 생성할 수 있습니다.</td>
        </tr>
      </tbody>
    </table>

1. 웹훅을 저장하려면 {{< ui >}}Add Webhook{{< /ui >}}을 클릭합니다.

DORA Metrics 제품에서 실패의 심각도는 PagerDuty의 [인시던트 우선순위][3]를 기준으로 결정됩니다.

**참고:** 웹훅 생성 시 새로운 시크릿이 생성되며 모든 웹훅 페이로드에 서명하는 데 사용됩니다. 하지만 인증은 API 키를 사용하므로 해당 시크릿은 통합 동작에 필요하지 않습니다.

### PagerDuty 서비스를 Datadog 서비스에 매핑 {#mapping-pagerduty-services-to-datadog-services}

특정 [PagerDuty 서비스][4]에 대한 인시던트 이벤트를 수신하면 Datadog은 트리거된 [Datadog 모니터][5]와 [Software Catalog][6]를 기반으로 관련 Datadog 서비스와 팀을 찾으려고 시도합니다.

매칭 알고리즘은 다음 단계로 동작합니다.

1. PagerDuty 인시던트 이벤트가 [Datadog 모니터에서 트리거된 경우][5]:
   - 모니터가 [다중 경고 모드][7]에 있는 경우, 인시던트 메트릭과 이벤트는 경고 그룹의 `env`, `service`, `team`와 함께 전송됩니다.
   - 모니터에 `env`, `service` 또는 `team`에 대한 [태그][8]가 있는 경우:
     - `env`: 모니터에 단일 `env` 태그가 있는 경우, 인시던트 메트릭과 이벤트는 환경과 함께 전송됩니다.
     - `service`: 모니터에 하나 이상의 `service` 태그가 있는 경우, 인시던트 메트릭과 이벤트는 제공된 서비스와 함께 전송됩니다.
     - `team`: 모니터에 단일 `team` 태그가 있는 경우, 인시던트 메트릭과 이벤트는 팀과 함께 전송됩니다.

2. 인시던트의 서비스 URL이 Software Catalog의 모든 서비스에 대한 PagerDuty 서비스 URL과 일치하는 경우:
   - 단일 Datadog 서비스가 일치하는 경우, 인시던트 메트릭과 이벤트는 해당 서비스 및 팀과 함께 전송됩니다.
   - 여러 Datadog 서비스가 일치하는 경우, 인시던트 메트릭과 이벤트는 팀과 함께 전송됩니다.

   Datadog 서비스에 대한 PagerDuty 서비스 URL 설정에 대한 자세한 내용은 [Software Catalog와 통합 사용][9]을 참조하세요.

3. 인시던트의 PagerDuty 서비스 이름이 Software Catalog의 서비스 이름과 일치하는 경우, 인시던트 메트릭과 이벤트는 해당 서비스 및 팀과 함께 전송됩니다.
4. 인시던트의 PagerDuty 팀 이름이 Software Catalog의 팀 이름과 일치하는 경우, 인시던트 메트릭과 이벤트는 해당 팀과 함께 전송됩니다.
5. 인시던트의 PagerDuty 서비스 이름이 Software Catalog의 팀 이름과 일치하는 경우, 인시던트 메트릭과 이벤트는 해당 팀과 함께 전송됩니다.
6. 지금까지 일치하는 항목이 없는 경우, 인시던트 메트릭과 이벤트는 인시던트에 제공된 PagerDuty 서비스 및 PagerDuty 팀과 함께 전송됩니다.

<div class="alert alert-danger">
PagerDuty에서 모니터 알림이 아닌 수동 방식으로 인시던트를 해결한 경우, 인시던트 해결 이벤트에는 모니터 정보가 포함되지 않으므로 매칭 알고리즘의 첫 번째 단계는 건너뛰게 됩니다.
</div>

[1]: /ko/integrations/pagerduty/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://support.pagerduty.com/main/docs/incident-priority
[4]: https://support.pagerduty.com/docs/services-and-integrations
[5]: /ko/integrations/pagerduty/#troubleshooting
[6]: /ko/software_catalog/
[7]: /ko/monitors/configuration/#multi-alert
[8]: /ko/monitors/manage/#monitor-tags
[9]: /ko/software_catalog/integrations/#pagerduty-integration


{{% /tab %}}
{{% tab "API" %}}

직접 실패 이벤트를 보내려면 [DORA Metrics API][1]를 사용하세요. 실패 이벤트는 변경 실패율 및 복구 시간을 계산하는 데 사용됩니다.

실패가 해결되었음을 표시하기 위해 실패 이벤트에 `finished_at` 속성을 포함하세요. 실패 시작 시점과 해결 시점 모두 이벤트를 전송할 수 있습니다. 실패 이벤트는 `env`, `service` 및 `started_at` 속성 조합으로 매칭됩니다.

### 요구 사항 {#requirements-3}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}}가 [DORA 설정][2]에서 {{< ui >}}Failures{{< /ui >}} 이벤트 데이터 소스로 활성화되어 있어야 합니다.
- 필수 속성은 다음과 같습니다.
  - `services` 또는 `team`(최소 하나는 존재해야 함)
  - `started_at`

실패 이벤트에 다음 속성을 선택적으로 추가할 수 있습니다.
- `finished_at`: 해결된 실패에 사용.**.***복구 시간 계산에 필요***
- `id`: 실패 식별에 사용. 이 속성은 사용자가 생성한 속성입니다. 지정하지 않으면 엔드포인트는 Datadog가 생성한 UUID를 반환합니다.
- `name` : 실패를 설명합니다.
- `severity`
- `env` : [{{< ui >}}DORA Metrics{{< /ui >}} 페이지][3]에서 환경별로 DORA 메트릭을 필터링합니다.
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags`: `key:value` [{{< ui >}}DORA Metrics{{< /ui >}} 페이지][3]에서 이벤트를 필터링하는 데 사용할 수 있는 형식의 태그입니다.

전체 사양 및 추가 코드 샘플은 [DORA Metrics API 참조 설명서][1]를 참조하세요.

### API(cURL) 예제 {#api-curl-example-1}

다음 구성을 위해 `<DD_SITE>`를 {{< region-param key="dd_site" >}}으로 바꿉니다.

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/failure" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

[1]: /ko/api/latest/dora-metrics/#send-a-failure-event-for-dora-metrics
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/ci/dora


{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /ko/tracing/software_catalog
[3]: /ko/tracing/software_catalog/adding_metadata
[4]: /ko/tracing/software_catalog/adding_metadata
[5]: /ko/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora