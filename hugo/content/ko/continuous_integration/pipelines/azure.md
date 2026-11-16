---
aliases:
- /ko/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: 블로그
  text: Datadog CI Visibility로 Azure 파이프라인 모니터링하기
- link: /continuous_integration/troubleshooting/
  tag: 문서
  text: CI Visibility 문제 해결하기
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: 문서
  text: 사용자 지정 태그 및 측정값을 추가하여 Pipeline Visibility 확장하기
title: CI Visibility를 위한 Azure Pipelines 설정
---
<div class="alert alert-danger">
Azure DevOps Server는 공식적으로 지원되지 않습니다.
</div>

## 개요 {#overview}

[Azure Pipelines][1]은 모든 언어, 플랫폼 또는 클라우드를 지원하는 지속적 통합 및 전달 서비스입니다.

CI/CD 워크플로에 대한 실시간 인사이트를 얻고, 파이프라인 성능을 추적하고, 비효율성을 분석하고, 배포 작업을 관리할 수 있도록 Azure Pipelines에 맞춰 CI Visibility를 설정할 수 있습니다.

### 호환성 {#compatibility}

| Pipeline Visibility                             | 플랫폼                            | 정의                                                |
|-------------------------------------------------|-------------------------------------|-----------------------------------------------------------|
| [로그 분석][21] | 로그 분석 | 관련 로그에 LLM 모델을 사용하여 실패한 CI 작업의 근본 원인을 분석합니다. |
| 로그 상관관계                                | 로그 상관관계                    | 파이프라인 및 작업 스팬을 로그와 상호 연관시킵니다. [로그 스토리지](#logs-storage)가 필요합니다. |
| [런타임 시][10] [사용자 지정 태그 및 측정값][11] | 런타임 시 사용자 지정 태그 및 측정값 | 런타임 시 [사용자 지정 태그 및 측정값][6]을 구성합니다.       |
| [사용자 지정 스팬][15]                              | 사용자 지정 스팬                        | 파이프라인에 대한 사용자 지정 스팬을 구성합니다.                |
| [임계 경로의 CI 작업 필터링][19]       | 임계 경로의 CI 작업 필터링 | 임계 경로에 있는 작업별로 필터링합니다.                      |
| [실행 시간][20]                            | 실행 시간                      | 파이프라인이 작업을 실행하는 데 걸린 시간을 조회합니다. |

### 용어 {#terminology}

이 표는 Datadog CI Visibility와 Azure Pipelines 간의 개념 매핑 관계를 보여줍니다.

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| 파이프라인                   | 파이프라인        |
| 스테이지                      | 스테이지           |
| 작업                        | 작업             |
| _Datadog에서 사용할 수 없음_ | 단계            |

## Datadog 통합 구성 {#configure-the-datadog-integration}
{{< tabs >}} {{% tab "Datadog 통합(권장)" %}}

### Datadog에서 CI Visibility 활성화 {#enable-ci-visibility-in-datadog}

Azure 앱을 생성하고 설치한 후, Datadog이 모니터링할 조직 및 프로젝트에 대해 CI Visibility를 활성화하세요.

1. Azure DevOps 조직이 **Microsoft Entra 테넌트**에 연결되어 있는지 확인합니다. Azure DevOps 프로젝트를 Datadog에 연결하는 방법에 대한 지침은 [Azure 소스 코드 설정 지침][1]을 참조하세요.

2. Datadog에서 [**Software Delivery → CI Visibility → Add a Pipeline Provider → Azure Pipelines**][2]로 이동합니다.

3. 활성화하려는 Azure DevOps 조직 옆의 {{< ui >}}Configure{{< /ui >}}를 클릭합니다.

4. 조직 전체에 대해 CI Visibility를 활성화하려면 {{< ui >}}Enable CI Visibility{{< /ui >}}를 토글합니다. Azure 앱에서 탐지한 향후 프로젝트는 자동으로 활성화됩니다.

5. 개별 프로젝트에 대해 CI Visibility를 활성화하려면 다음 단계를 따르세요.
   - 프로젝트 목록을 스크롤합니다.
   - 모니터링할 각 프로젝트에 대해 {{< ui >}}Enable CI Visibility{{< /ui >}}를 토글합니다.

조직 또는 프로젝트에 대해 CI Visibility가 활성화되면 Pipelines가 Datadog에 즉시 나타납니다.

<div class="alert alert-danger">이전에 서비스 후크 구독을 사용하여 Azure Pipelines를 구성한 경우, 동일한 프로젝트에 대해 CI Visibility를 활성화하기 전에 해당 통합을 비활성화합니다. 두 가지 통합을 동시에 실행해도 추가 비용은 발생하지 않지만 데이터가 중복 생성됩니다.</div>

[1]: /ko/integrations/azure-devops-source-code/#setup
[2]: https://app.datadoghq.com/ci/setup/pipeline?provider=azurepipelines

{{% /tab %}}
{{% tab "서비스 후크 구독" %}}

[Azure Pipelines][16]용 Datadog 통합은 [서비스 후크][2]를 사용하여 Datadog으로 데이터를 전송하는 방식으로 작동합니다.

1. Azure Marketplace에서 [Datadog CI Visibility][8] 확장 프로그램을 설치합니다. **Datadog**으로 시작하는 여러 확장 프로그램이 있으므로, [Datadog CI Visibility][8] 확장 프로그램을 설치하고 있는지 확인하세요.

2. 각 프로젝트에 대해 Azure DevOps에서 {{< ui >}}Project settings{{< /ui >}} > {{< ui >}}Service hooks{{< /ui >}}로 이동한 다음 녹색 더하기(+) 아이콘을 선택하여 구독을 생성합니다.

3. 다음 각 웹훅 유형에 대해 `Datadog CI Visibility` 서비스 구독을 생성합니다. 이러한 이벤트 유형은 필수이며 개별적으로 활성화해야 합니다.

    - {{< ui >}}Run state changed{{< /ui >}}
    - {{< ui >}}Run stage state changed{{< /ui >}}
    - {{< ui >}}Run job state changed{{< /ui >}}
    - {{< ui >}}Run stage approval completed{{< /ui >}}
    - {{< ui >}}Run stage waiting for approval{{< /ui >}}
    - {{< ui >}}Build completed{{< /ui >}}

4. {{< ui >}}Next{{< /ui >}}를 클릭하여 다음 단계로 진행하고 다음을 설정합니다.

    - {{< ui >}}Datadog Site{{< /ui >}}: `{{< region-param key="dd_site" >}}`
    - {{< ui >}}Datadog API Key{{< /ui >}}: [Datadog API 키][3]입니다.

5. {{< ui >}}Finish{{< /ui >}}를 클릭합니다.

### 여러 프로젝트를 일괄적으로 설정 {#configuring-multiple-projects-in-bulk}

Datadog은 Azure API를 사용하여 여러 또는 모든 Azure 프로젝트에서 서비스 훅을 활성화할 수 있도록 돕는 [스크립트][12]를 제공합니다. 이 스크립트를 실행하려면 Python 3 및 `requests` 패키지가 필요합니다.

스크립트를 실행하려면 다음이 필요합니다.

- Azure DevOps 사용자 이름
- Azure DevOps [API 토큰][13]
- Azure DevOps 조직 이름


이 스크립트는 환경 변수 `DD_API_KEY` 및 `DD_SITE`와 플래그 파라미터 `--dd-api-key` 및 `--dd-site`를 지원합니다.

자세한 내용을 확인하려면 다음 명령을 실행할 수 있습니다.

```shell
./service_hooks.py --help
```

#### 모든 Azure 프로젝트 {#all-azure-projects}

모든 프로젝트에서 후크를 활성화하는 예시는 다음과 같습니다.

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### 특정 Azure 프로젝트 {#specific-azure-projects}

특정 프로젝트에서 후크를 활성화하는 예시는 다음과 같습니다.

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[16]: /ko/integrations/azure_devops/

{{% /tab %}}
{{< /tabs >}}


## 고급 구성 {#advanced-configuration}

### 사용자 지정 태그 설정 {#set-custom-tags}

추적성을 향상하기 위해 Azure 프로젝트의 모든 파이프라인 및 작업 스팬에 대해 사용자 지정 태그를 설정할 수 있습니다. 자세한 내용은 [사용자 지정 태그 및 측정값][6]을 참조하세요.

### 작업 로그 관리 {#manage-job-logs}

#### 로그 분석 {#logs-analysis}

로그 분석은 LLM 모델을 사용하여 Azure Pipelines에서 제공되는 관련 로그를 기반으로 작업 실패를 근본 원인별로 분류합니다.

자세한 내용은 [로그 분석 사용][21] 가이드를 참조하세요.

로그 분석은 Datadog에서 기본적으로 활성화되어 있습니다. 분석을 위해 Azure Pipelines 작업 로그를 수신하려면 [Azure 통합 타일][14]의 단계를 따라 Datadog Azure DevOps 통합을 설정하세요. 로그 분석 설정을 관리하려면 [CI/CD 리포지토리 설정][23]으로 이동하여 Datadog 조직 수준 또는 원하는 리포지토리에 대해 로그 분석을 구성하세요.

PR 코멘트에 로그 분석을 추가할 수도 있습니다. [PR 코멘트 사용][22]에 대한 가이드를 참조하세요.

#### 로그 스토리지 {#logs-storage}

로그 스토리지를 활성화하려면 [CI/CD 리포지토리 설정][23]으로 이동하여 Datadog 조직 수준 또는 원하는 리포지토리에 대해 로그 스토리지를 활성화하세요.

로그 스토리지는 CI Visibility와 별도로 청구됩니다. 로그 보존, 제외 및 인덱스는 [Log Management][18]에서 구성됩니다. Azure 작업에 대한 로그는 `datadog.product:cipipeline` 및 `source:azurepipelines` 태그로 식별할 수 있습니다.

## Datadog에서 파이프라인 데이터 시각화 {#visualize-pipeline-data-in-datadog}

워크플로우가 완료되면 [**CI Pipeline List**][4] 및 [**Executions**][5] 페이지가 채워집니다.

{{< ui >}}CI Pipeline List{{< /ui >}} 페이지에는 각 리포지토리의 기본 브랜치 데이터만 표시됩니다. 자세한 내용은 [CI 파이프라인 검색 및 관리하기][17]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /ko/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /ko/glossary/#custom-tag
[11]: /ko/glossary/#custom-measure
[14]: https://app.datadoghq.com/integrations/azure
[15]: /ko/glossary/#custom-span
[17]: /ko/continuous_integration/search/#search-for-pipelines
[18]: /ko/logs/guide/best-practices-for-log-management/
[19]: /ko/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /ko/glossary/#pipeline-execution-time
[21]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: /ko/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[23]: https://app.datadoghq.com/ci/settings/ci-cd/repositories