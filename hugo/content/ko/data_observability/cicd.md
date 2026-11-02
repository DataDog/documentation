---
description: dbt 모델을 수정하는 풀 리퀘스트를 병합하기 전에 다운스트림 영향 및 데이터 드리프트에 대한 검사를 자동으로 실행하세요.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability 개요
- link: /data_observability/data_catalog/
  tag: 설명서
  text: 데이터 카탈로그
- link: /data_observability/lineage/
  tag: 설명서
  text: 계보
- link: /data_observability/quality_monitoring/
  tag: 설명서
  text: Quality Monitoring
- link: /data_observability/jobs_monitoring/
  tag: 설명서
  text: Jobs Monitoring
title: CI/CD
---
## 개요 {#overview}

{{< img src="data_observability/cicd/cicd-overview.png" alt="CI/CD 기능 보고서 페이지" style="width:100%;" >}}

dbt 모델을 수정하는 풀 리퀘스트(PR)를 열면 Data Observability CI/CD 검사가 자동으로 실행됩니다. 이 검사를 통해 변경 사항을 병합해도 안전한지 판단하는 데 필요한 정보를 확보할 수 있습니다.

Datadog은 결과를 PR에 댓글로 게시하며, 새로운 변경 사항을 푸시할 때마다 댓글이 업데이트됩니다. Datadog에서도 전체 보고서를 확인할 수 있으며, PR 댓글에서 전체 보고서로 연결되는 링크가 포함되어 있습니다.

## 검사 유형 {#check-types}

### 영향 계보 {#impact-lineage}

영향 계보는 변경된 dbt 모델의 모든 다운스트림 항목에 대해 그래프를 구축합니다. 병합하기 전에 이 그래프를 사용하여 변경 사항의 영향 범위를 평가하세요. 수정한 모델에 의존하는 테이블, 대시보드, 기타 소비자를 확인하고 올바른 소유자에게 검토를 요청합니다.

Datadog이 계보 그래프를 구축 및 탐색하는 방법에 대한 자세한 내용은 [Lineage][1]를 참조하세요.

### 드리프트 탐지 {#drift-detection}

드리프트 탐지 기능은 일련의 통계 검사를 통해 변경 전후에 모델이 생성한 데이터를 비교합니다. 이 기능을 사용하여 모델 변경이 예상 출력을 생성하는지 확인하거나, 행 수의 상당한 변화, null 비율 변동, 열 값의 카디널리티 변화 등 의도하지 않은 부작용을 발견할 수 있습니다.

## 설정 {#setup}

### 1. 소스 제어 공급자와 dbt 프로젝트 연결 {#1-connect-your-source-control-provider-and-dbt-project}

1. [소스 제어 공급자][2]를 연결하세요. CI/CD 검사는 GitHub, GitLab, Bitbucket Cloud 및 Azure DevOps를 지원합니다.
2. dbt 모델이 실행되는 [지원되는 데이터 소스 계정][3]을 연결하세요.
3. [dbt Cloud][4] 또는 [dbt Core][5] 프로젝트를 Datadog에 연결하세요. 또한 CI/CD 검사를 구성하는 동안 dbt 프로젝트를 연결할 수 있습니다.

### 2. dbt 프로젝트 및 리포지토리 선택 {#2-select-your-dbt-project-and-repository}

1. CI/CD 설정에서 {{< ui >}}Add CI/CD Checks{{< /ui >}}를 클릭합니다.
2. 검사를 추가하려는 dbt 프로젝트를 선택합니다.
3. 프로젝트의 기본 작업을 선택합니다. 이는 dbt 스키마에 대한 정보를 가장 많이 보유하는 작업입니다.
4. Datadog이 소스 제어 공급자로부터 리포지토리를 자동으로 추론하지 못하는 경우 수동으로 선택합니다.

{{< img src="data_observability/cicd/cicd-connection.png" alt="CI/CD 기능 생성 페이지" style="width:100%;" >}}

#### 고급 설정 {#advanced-settings}

dbt 프로젝트가 리포지토리 루트에 있지 않은 경우, 고급 설정에서 dbt 프로젝트 경로를 지정할 수 있습니다.

### 3. 검사 구성 {#3-configure-checks}

각 검사를 독립적으로 활성화할 수 있습니다. 모든 검사를 활성화하면 가장 상세한 보고서를 확보할 수 있습니다.

#### 영향 계보 {#impact-lineage-1}

영향 계보는 모델 변경으로 인해 영향을 받을 수 있는 다운스트림 자산 그래프를 생성합니다.

##### 일반 설정 {#general-settings}

| 설정                            | 설명                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | 초안 풀 리퀘스트/머지 리퀘스트에 대해 검사를 실행하려면 이 옵션을 활성화합니다. |

#### 드리프트 탐지 {#drift-detection-1}

드리프트 탐지 기능은 브랜치의 현재 데이터 상태를 기준선과 비교하여 편차를 표시합니다. Datadog은 CI 파이프라인의 dbt 실행을 드리프트 탐지 검사의 트리거로 사용합니다. **dbt Core**의 경우, Datadog이 이러한 실행 정보를 수신할 수 있도록 CI 작업에서 OpenLineage 이벤트를 전송해야 합니다. [OpenLineage 설정 설명서][6]를 참조하세요. **dbt Cloud**의 경우, [dbt Cloud](#dbt-cloud) 섹션의 `CI Job URL` 설정에서 풀 리퀘스트에 대해 실행되는 CI 작업을 구성합니다.

또한 Datadog은 비교 작업을 위해 CI 작업이 빌드하는 테이블을 읽을 수 있어야 합니다. Snowflake 설정 과정에서 생성한 역할(기본값 `DATADOG_ROLE`)에는 CI 작업으로 모델을 구체화하는 데이터베이스에 대한 `USAGE` 및 `SELECT` 권한이 필요합니다. Datadog의 Snowflake 통합 설정에는 데이터베이스 내 모든 스키마의 현재 및 향후 테이블과 보기에 대해 이 권한을 부여하는 `grant_database_access` 프로시저가 포함되어 있습니다. CI 작업으로 기록하는 데이터베이스에 대해 이를 실행합니다.

```sql
CALL grant_database_access('["<CI_DATABASE>"]', '<ROLE_NAME>');
```

CI가 풀 리퀘스트당 임시 데이터베이스를 생성하는 경우, 각각의 새 데이터베이스를 읽을 수 있도록 해당 프로비저닝 단계의 일환으로 프로시저를 호출합니다. 프로시저 정의는 [Snowflake 설정][8]을 참조하세요. 이 액세스 권한이 없으면 Datadog은 CI 실행 정보를 수신하지만 CI 테이블을 쿼리할 수 없으며, 결과적으로 드리프트 탐지를 실패합니다.

**dbt Core**의 경우, 드리프트 탐지를 실행하려면 `sourceCodeLocation` 패싯을 통해 OpenLineage 이벤트에 풀 리퀘스트 번호를 첨부해야 합니다. 이를 위해서는 `openlineage-dbt` 버전 1.46.0 이상과 `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false` 환경 변수가 필요합니다. [환경 변수 설정][7]을 참조하세요. dbt Core CI 작업이 컨테이너 내부에서 실행되는 경우 추가 설정이 필요합니다. [컨테이너에서 dbt Core CI 작업 실행](#running-your-dbt-core-ci-job-in-a-container) 섹션을 참조하세요.

##### 일반 설정 {#general-settings-1}

| 설정                            | 설명                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | 초안 풀 리퀘스트/머지 리퀘스트에 대해 검사를 실행하려면 이 옵션을 활성화합니다.                                                                                          |
| `Threshold`                        | 드리프트 탐지 임계값(예: 10% 드리프트의 경우 `0.1`) 메트릭이 해당 임계값을 초과하면 검사 결과에 경고로 표시됩니다.      |
| `Downstream Checks`                | dbt 모델이 변경되면 해당 모델과 모든 다운스트림 dbt 모델에 대해 드리프트 탐지 검사가 생성됩니다. 이 설정은 검사 실행의 다운스트림 범위를 제어합니다. |

##### dbt Cloud {#dbt-cloud}

| 설정      | 설명                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | 풀 리퀘스트에 의해 트리거되고, CI용 dbt 모델을 구체화하는 dbt Cloud CI 작업의 로케이터입니다. Datadog은 dbt Cloud 통합을 통해 이 작업의 실행 이벤트를 수신합니다. 이는 일반적으로 `https://cloud.getdbt.com/...`처럼 표시됩니다. |

**Bitbucket Cloud 및 Azure DevOps**

Azure DevOps 리포지토리가 dbt Cloud의 기본 Azure DevOps 통합(Enterprise 플랜)을 사용하는 경우 CI 작업이 자동으로 시작됩니다. 이 섹션을 건너뜁니다.

그렇지 않으면 [dbt Cloud Administrative API][9]를 사용하여 파이프라인에서 CI 작업을 시작합니다. 먼저 CI 공급자에 맞게 예시의 자리 표시자를 바꿉니다.

| 자리 표시자 | 값 |
| ----------- | ----- |
| `<DBT_CLOUD_HOST>` | dbt Cloud 호스트 이름(예: `cloud.getdbt.com`) |
| `<ACCOUNT_ID>` | dbt Cloud CI 작업 URL의 계정 ID입니다. |
| `<CI_JOB_ID>` | 동일한 URL의 CI 작업 ID입니다. |

{{< tabs >}}
{{% tab "Bitbucket Pipelines" %}}

1. 작업을 실행할 수 있는 dbt Cloud API 토큰을 생성합니다.
2. Bitbucket에서 토큰을 `DBT_API_KEY`라는 이름의 보안 리포지토리 변수로 저장합니다.
3. 다음 단계를 `bitbucket-pipelines.yml`에 추가합니다. 파일에 `pipelines`가 이미 포함되어 있는 경우 `pipelines > pull-requests > '**'` 아래에 이 단계를 추가합니다.

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: Trigger dbt Cloud CI job
          script:
            - |
              curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
                -H "Authorization: Token $DBT_API_KEY" \
                -H "Content-Type: application/json" \
                -d "{\"cause\": \"Bitbucket PR #$BITBUCKET_PR_ID\",
                     \"git_sha\": \"$BITBUCKET_COMMIT\",
                     \"non_native_pull_request_id\": $BITBUCKET_PR_ID,
                     \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$BITBUCKET_PR_ID\"}"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

Azure Repos의 리포지토리인 경우:

1. 작업을 실행할 수 있는 dbt Cloud API 토큰을 생성합니다.
2. 토큰을 `DBT_API_KEY`라는 이름의 Azure Pipelines 비밀 변수로 저장합니다.
3. 대상 브랜치에 [빌드 유효성 검사 브랜치 정책][10]을 추가하여 풀 리퀘스트에 대한 파이프라인이 실행되도록 합니다.
4. 이 Bash 단계를 파이프라인의 `steps` 섹션에 추가합니다. `env` 블록은 비밀 변수와 풀 리퀘스트 값을 스크립트에 전달하고, `condition`은 풀 리퀘스트용이 아닌 빌드에서 해당 단계를 건너뛰도록 합니다.

```yaml
steps:
  - bash: |
      curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
        -H "Authorization: Token $DBT_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"cause\": \"Azure DevOps PR #$PR_NUMBER\",
             \"git_sha\": \"$HEAD_SHA\",
             \"non_native_pull_request_id\": $PR_NUMBER,
             \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$PR_NUMBER\"}"
    displayName: Trigger dbt Cloud CI job
    condition: eq(variables['Build.Reason'], 'PullRequest')
    env:
      DBT_API_KEY: $(DBT_API_KEY)
      PR_NUMBER: $(System.PullRequest.PullRequestId)
      HEAD_SHA: $(System.PullRequest.SourceCommitId)
```

{{% /tab %}}
{{< /tabs >}}

**참고**:
- `non_native_pull_request_id`와 `git_sha`를 모두 포함하고 `git_sha`를 풀 리퀘스트의 헤드 커밋으로 설정합니다. Datadog은 둘 다 사용하여 실행 결과를 해당 풀 리퀘스트와 연결합니다.
- `schema_override` CI 테이블이 프로덕션 스키마에 생성되지 않도록 합니다. 작업 ID를 포함하면 두 개의 CI 작업이 동일한 스키마에 데이터를 쓰지 않도록 할 수 있습니다.
- dbt Cloud는 API를 통해 트리거된 실행에서 이러한 스키마를 삭제하지 않습니다. 정기적으로 이러한 스키마를 정리합니다.

##### dbt Core {#dbt-core}

| 설정            | 설명                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | 풀 리퀘스트에 의해 트리거되고, CI용 dbt 모델을 구체화하며, OpenLineage 이벤트를 Datadog으로 전송하는 작업의 이름입니다.                                                                                                                   |
| `CI Job Namespace` | 위에서 지정한 작업에서 OpenLineage 이벤트 전송 시 지정하는 OPENLINEAGE_NAMESPACE 변수입니다. [환경 변수 설정][7]을 참조하세요. OpenLineage 이벤트 전송 시 이 변수를 설정하지 않으면 여기에서 지정할 필요가 없습니다. |

**Bitbucket Cloud 및 Azure DevOps**

먼저 [환경 변수 설정][7]에서 설정을 완료합니다. 그런 다음 `dbt-ol`을 실행하는 단계에서 다음 두 변수를 CI 공급자에 맞는 값으로 설정합니다.

- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER`
- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION`

| CI 공급자 | `PULL_REQUEST_NUMBER` | `VERSION` |
| ----------- | --------------------- | --------- |
| Bitbucket Pipelines | `$BITBUCKET_PR_ID` | `$BITBUCKET_COMMIT` |
| Azure Repos를 사용하는 Azure Pipelines | `$(System.PullRequest.PullRequestId)` | `$(System.PullRequest.SourceCommitId)` |
| GitHub 리포지토리를 사용하는 Azure Pipelines | `$(System.PullRequest.PullRequestNumber)` | `$(System.PullRequest.SourceCommitId)` |

`VERSION`을 명시적으로 설정합니다. 이러한 공급자에서 풀 리퀘스트 빌드는 병합 커밋을 체크아웃하므로 Git에서 탐지한 커밋이 풀 리퀘스트의 헤드 커밋과 달라 실행 결과가 풀 리퀘스트와 연결되지 않습니다.

Azure Repos의 경우, 대상 브랜치에 [빌드 유효성 검사 브랜치 정책][10]을 추가하여 파이프라인이 풀 리퀘스트 컨텍스트에서 실행되도록 합니다.

#### 컨테이너에서 dbt Core CI 작업 실행 {#running-your-dbt-core-ci-job-in-a-container}

CI 러너가 `docker run`으로 dbt Core를 실행하는 경우 리포지토리 URL, 풀 리퀘스트의 헤드 커밋 SHA, 풀 리퀘스트 번호를 컨테이너에 전달합니다. 컨테이너는 러너의 git 컨텍스트를 자동으로 상속하지 않습니다.

Datadog은 실행 결과를 풀 리퀘스트와 연결하고 드리프트 결과를 표시하기 위해 `sourceCodeLocation` 패싯에 세 가지 값이 모두 필요합니다.

**GitHub Actions**의 경우, 러너에서 값을 읽어 컨테이너에 전달합니다.

```shell
# On the CI runner, before launching the container:
PR_NUMBER=$(jq -r '.pull_request.number'  "$GITHUB_EVENT_PATH")
HEAD_SHA=$(jq -r '.pull_request.head.sha' "$GITHUB_EVENT_PATH")   # the pull request's head commit, not the merge commit
REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}"

docker run \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__REPO_URL="$REPO_URL" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER="$PR_NUMBER" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION="$HEAD_SHA" \
  <YOUR_IMAGE> <YOUR_DBT_OL_COMMAND>
```

워크플로는 풀 리퀘스트가 열리거나 업데이트되는 시점에 실행해야 합니다.

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

다른 CI 공급자의 경우, 위 예시에서 `PR_NUMBER`, `HEAD_SHA`, `REPO_URL`에 할당된 값을 바꿉니다. 작업을 풀 리퀘스트 파이프라인(GitLab 병합 요청 파이프라인, Bitbucket `pull-requests` 파이프라인 또는 빌드 유효성 검사 정책으로 시작된 Azure Pipelines 빌드)으로 실행합니다. 그렇지 않으면 이 값들은 비어 있습니다.

{{< tabs >}}
{{% tab "GitLab CI" %}}

```shell
PR_NUMBER="$CI_MERGE_REQUEST_IID"
# In merged results pipelines, use $CI_MERGE_REQUEST_SOURCE_BRANCH_SHA instead.
HEAD_SHA="$CI_COMMIT_SHA"
REPO_URL="$CI_PROJECT_URL"
```

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

```shell
PR_NUMBER="$BITBUCKET_PR_ID"
HEAD_SHA="$BITBUCKET_COMMIT"
REPO_URL="https://bitbucket.org/$BITBUCKET_REPO_FULL_NAME"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

```shell
# For a GitHub repository, use $SYSTEM_PULLREQUEST_PULLREQUESTNUMBER instead.
PR_NUMBER="$SYSTEM_PULLREQUEST_PULLREQUESTID"
HEAD_SHA="$SYSTEM_PULLREQUEST_SOURCECOMMITID"
REPO_URL="$SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI"
```

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_observability/lineage/
[2]: /ko/integrations/#cat-source-control
[3]: /ko/data_observability/quality_monitoring/#supported-data-sources
[4]: /ko/data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /ko/data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /ko/data_observability/jobs_monitoring/openlineage/
[7]: /ko/data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
[8]: /ko/data_observability/quality_monitoring/data_warehouses/snowflake/
[9]: https://docs.getdbt.com/docs/deploy/ci-jobs#trigger-a-ci-job-with-the-api-
[10]: https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies#build-validation