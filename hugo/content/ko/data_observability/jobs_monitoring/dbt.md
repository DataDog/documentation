---
aliases:
- /ko/data_observability/jobs_monitoring/dbtcore
- /ko/data_observability/jobs_monitoring/dbtcloud
description: 작업 실행 메타데이터 및 모델 계보를 위해 dbt Cloud 또는 dbt Core를 Datadog에 연결합니다.
further_reading:
- link: /data_observability/
  tag: 설명서
  text: Data Observability에 관해 알아보기
- link: https://www.datadoghq.com/blog/understanding-dbt/
  tag: 블로그
  text: 'dbt 이해하기: 기본 사항 및 모범 사례'
title: dbt
---
## 개요 {#overview}

Datadog은 dbt Cloud 또는 dbt Core 메타데이터에 액세스하여 작업 실행 기간, dbt에서 생성된 모델, 모델 간의 계보 관계를 포함한 작업 실행에 대한 정보를 추출할 수 있습니다. Datadog은 웨어하우스의 테이블을 dbt 모델과 일치시켜 표 장애의 원인과 영향을 파악합니다.

{{< tabs >}}
{{% tab "dbt Cloud" %}}

아래 단계에 따라 dbt Cloud를 Datadog에 연결합니다.

## dbt Cloud에서 API 토큰 생성 {#generate-an-api-token-in-dbt-cloud}

Datadog이 계정의 메타데이터에 액세스할 수 있도록 dbt Cloud에서 서비스 토큰을 생성합니다.

1. dbt Cloud에서 {{< ui >}}User Profile{{< /ui >}} > {{< ui >}}API Tokens{{< /ui >}} > {{< ui >}}Service Tokens{{< /ui >}}으로 이동합니다.
2. {{< ui >}}\+ Create Service Token{{< /ui >}}를 클릭합니다.
3. 토큰의 이름을 입력합니다.
4. 토큰 권한을 설정합니다.
   - 직접 dbt Cloud에서 웹훅을 생성하는 경우, 관련 dbt Cloud 프로젝트로 범위가 지정된 {{< ui >}}Stakeholder/Read-Only{{< /ui >}} 권한 세트를 사용합니다.
   - Datadog이 웹훅을 생성하고 관리하는 경우, dbt Cloud Enterprise 플랜에는 {{< ui >}}Developer{{< /ui >}} 권한을 사용하고 dbt Cloud Team 플랜에는 {{< ui >}}Account Admin{{< /ui >}} 권한을 사용합니다.
5. {{< ui >}}Save{{< /ui >}}을 클릭하고 생성된 API 토큰을 복사합니다.

## dbt Cloud 계정을 Datadog에 연결 {#connect-your-dbt-cloud-account-to-datadog}

API 토큰을 사용하여 Data Observability에서 통합을 구성합니다.

1. [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1]으로 이동합니다.
2. {{< ui >}}dbt Cloud{{< /ui >}} 섹션에서 {{< ui >}}Configure{{< /ui >}}을 클릭합니다.
3. 이미 dbt Cloud 통합 계정을 생성한 경우, 위에서 설명한 권한이 있는 API 토큰으로 업데이트했는지 확인합니다.
4. 그렇지 않으면 계정을 만듭니다. {{< ui >}}Account Name{{< /ui >}}, {{< ui >}}Account Id{{< /ui >}}, {{< ui >}}Account Url{{< /ui >}} 및 {{< ui >}}API Token{{< /ui >}} 섹션을 입력합니다.
5. {{< ui >}}Save{{< /ui >}}을 클릭하여 설정을 저장합니다.

## 웹훅 구성 {#configure-webhooks}

Data Observability 설정에서 dbt Cloud 계정을 확장하고 Datadog이 dbt Cloud 작업 실행 이벤트를 수신하는 방법을 선택합니다.

### dbt Cloud에서 직접 웹훅 생성 {#create-the-webhook-in-dbt-cloud-yourself}

아티팩트 수집을 위해 {{< ui >}}Stakeholder/Read-Only{{< /ui >}} 서비스 토큰을 사용하려는 경우 이 옵션을 사용합니다.

1. {{< ui >}}I'll manage the webhook in dbt Cloud myself{{< /ui >}}를 선택합니다.
2. Datadog 웹훅 URL을 복사합니다.
3. dbt Cloud에서 {{< ui >}}Account Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}} > {{< ui >}}Create New Webhook{{< /ui >}}으로 이동합니다.
4. Datadog 웹훅 URL을 웹훅 URL 필드에 붙여넣습니다.
5. {{< ui >}}Job Run Started{{< /ui >}}와 {{< ui >}}Job Run Completed{{< /ui >}} 이벤트를 활성화합니다. 수집 범위를 특정 작업으로 지정하려면 dbt Cloud 웹훅 구성에서 해당 작업을 선택합니다.
6. dbt Cloud에서 웹훅을 저장합니다.
7. dbt Cloud에서 HMAC 비밀 키를 복사하여 Datadog의 {{< ui >}}HMAC secret from dbt Cloud{{< /ui >}} 필드에 붙여넣고 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

**참고**: 저장 후, 직접 생성한 웹훅이 dbt Cloud로부터 트래픽을 수신하기 시작하는 데 최대 5분이 소요될 수 있습니다.

나중에 Datadog에서 사용자 관리형 웹훅 구성을 제거하는 경우, dbt Cloud에서 웹훅을 수동으로 삭제하세요.

### Datadog의 웹훅 관리 {#let-datadog-manage-the-webhook}

Datadog이 dbt Cloud에서 웹훅을 생성하고 유지 관리하도록 하려면 이 옵션을 사용합니다.

1. {{< ui >}}Datadog-managed{{< /ui >}}을 선택합니다.
2. {{< ui >}}Save{{< /ui >}}을 클릭합니다.

이 모드는 dbt Cloud Enterprise 플랜의 경우 {{< ui >}}Developer{{< /ui >}} 권한이, dbt Cloud Team 플랜의 경우 {{< ui >}}Account Admin{{< /ui >}} 권한이 있는 dbt Cloud 토큰이 필요합니다.

## 다음 단계 {#whats-next}

다음 dbt 작업 실행 후, 아래와 같이 [Datadog Data Observability][2]에서 작업 실행 및 계보 데이터를 확인할 수 있게 됩니다.

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="시간 경과에 따른 dbt 작업 실행을 누적 막대 차트로 보여주는 Data Observability 개요와 연결된 dbt Cloud 계정 및 상태를 보여주는 표입니다." style="width:100%;" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: https://app.datadoghq.com/data-obs/catalog?integration=dbt

{{% /tab %}}

{{% tab "dbt Core" %}}

아래 단계에 따라 dbt Core를 Datadog에 연결합니다.

**참고**: 외부 오케스트레이터(예: Airflow)로 dbt Core를 실행하고 오케스트레이터 작업과 dbt 실행을 연관시키려면 먼저 [Airflow 통합 지침][1]을 따르세요.

## Datadog API 키 확인 {#retrieve-your-datadog-api-key}

1. [이 지침을 따라][2] Datadog API 키를 생성하거나 확인하세요.

## openlineage-dbt 설치{#install-openlineage-dbt}

1. `openlineage-dbt` 패키지를 설치합니다. 가상 환경에서 이 패키지를 설정하려면 [Using dbt with Amazon MWAA][3]를 참조하세요.

   ```shell
   pip3 install openlineage-dbt>=1.39.0
   ```

## 환경 변수 설정 {#set-the-environment-variables}

1. 다음 환경 변수를 설정합니다. `datadoghq.com`을 조직에 맞는 [Datadog 사이트][4]로 대체합니다. 사전 정의된 Datadog 사이트에 대한 자세한 내용은 [OpenLineage 문서][5]를 참조하세요.

   ```shell
   export DD_SITE=datadoghq.com
   export DD_API_KEY=<YOUR_DATADOG_API_KEY>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog

   # OPENLINEAGE_NAMESPACE determines the Datadog tag value for the environment (similar to how the service tag identifies the application).
   # Typical values are dev, staging, or prod, but you can over ride it with any custom value.
   export OPENLINEAGE_NAMESPACE=<YOUR_ENV>

   # Optional, for debugging purposes
   export OPENLINEAGE_CLIENT_LOGGING=DEBUG

   # Required for CI/CD Drift Detection (requires openlineage-dbt >= 1.46.0).
   # Attaches the sourceCodeLocation facet (repository URL, commit SHA, and pull
   # request number) so Datadog can associate the dbt run with a pull request.
   # Disabled by default; not required for job monitoring alone.
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false
   ```

   [CI/CD 검사][8]의 경우, 실행 시 `GITHUB_REF`(풀 리퀘스트에 의해 트리거된 GitHub Actions 워크플로) 또는 `CI_MERGE_REQUEST_IID`(GitLab 머지 리퀘스트 파이프라인)가 노출되면 풀 리퀘스트 번호가 자동으로 감지됩니다. 두 변수가 모두 없으면 풀 리퀘스트 번호를 명시적으로 설정합니다.

   ```shell
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER=<PR_NUMBER>
   ```

   CI 작업이 러너의 git 컨텍스트를 상속하지 않는 컨테이너 내부에서 실행되는 경우(예: 컨테이너를 시작하는 GitHub Actions 워크플로), 리포지토리 URL, 커밋 SHA, 풀 리퀘스트 번호가 자동으로 감지되지 않으므로 세 가지 모두를 명시적으로 전달해야 합니다. [컨테이너에서 dbt Core CI 작업 실행](/data_observability/cicd/#running-your-dbt-core-ci-job-in-a-container)을 참조하세요.

## dbt 호출 업데이트 {#update-the-dbt-invocation}

1. `dbt`를 직접 호출하는 대신 OpenLineage 래퍼(`dbt-ol`)를 사용하도록 dbt 호출을 변경합니다. 이는 `run`, `build`, `test`와 같이 Datadog에서 추적하려는 모든 dbt 명령에 적용됩니다. 사용 가능한 전체 명령 목록은 [dbt 설명서][7]를 참조하세요.
2. 명령이 실행되는 동안 dbt 작업을 조회하려면 `--consume-structured-logs` 플래그를 추가합니다.

   ```shell
   # Run models
   dbt-ol run --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run tests (required to see test failures in Datadog)
   dbt-ol test --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run build (runs models, tests, seeds, and snapshots)
   dbt-ol build --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
   ```

## 다음 단계 {#whats-next-1}

다음 dbt 작업 실행 후, 아래와 같이 [Datadog Data Observability][6]에서 작업 실행 및 계보 데이터를 확인할 수 있습니다.

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="dbt 작업 실행 및 모델 계보를 보여주는 Data Observability 개요" style="width:100%;" >}}

[1]: /ko/data_jobs/airflow/?tab=kubernetes
[2]: /ko/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[4]: /ko/getting_started/site/#access-the-datadog-site
[5]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[6]: https://app.datadoghq.com/data-obs/catalog?integration=dbt
[7]: https://docs.getdbt.com/docs/running-a-dbt-project/run-your-dbt-projects
[8]: /ko/data_observability/cicd/

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}