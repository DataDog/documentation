---
aliases:
- /ko/observability_pipelines/set_up_pipelines/
description: Observability Pipelines 파이프라인의 소스, 프로세서 및 대상을 설정하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/pipeline_simulation/
  tag: 설명서
  text: Pipeline Simulation을 사용하여 프로세서 추가, 업데이트 및 검증
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: 설명서
  text: 기존 파이프라인 업데이트
- link: observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
  tag: 설명서
  text: Observability Pipelines를 위한 Advanced Worker 구성
- link: observability_pipelines/configuration/install_the_worker/run_multiple_pipelines_on_a_host/
  tag: 설명서
  text: 호스트에서 여러 파이프라인 실행
- link: observability_pipelines/monitoring_and_troubleshooting/troubleshooting/
  tag: 설명서
  text: Observability Pipelines 문제 해결
title: 파이프라인 설정
---
## 개요 {#overview}

<div class="alert alert-info">이 설명서에서 설명하는 파이프라인과 프로세서는 온프레미스 로깅 환경에만 적용됩니다. 클라우드 기반 로그를 집계, 처리 및 라우팅하려면 <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Log Management Pipelines</a>를 참조하세요.</div>

Observability Pipelines에서 파이프라인은 세 가지 유형의 구성 요소로 이루어진 순차적 경로입니다.
- [소스][1]: 데이터 소스(예: Datadog Agent)에서 데이터를 수신합니다.
- [프로세서][2]: 데이터를 보강 및 변환합니다.
- [대상][3]: 처리된 데이터가 전송되는 곳입니다.

{{< img src="observability_pipelines/archive_log_pipeline.png" alt="소스 한 개가 프로세서 그룹 두 개, 대상 두 개에 연결된 파이프라인" style="width:100%;" >}}

파이프라인을 만들려면 다음과 같은 방법 중 하나를 사용하면 됩니다.

- [파이프라인 UI](#set-up-a-pipeline-in-the-ui)
- [API](#set-up-a-pipeline-with-the-api)
- [Terraform](#set-up-a-pipeline-with-terraform)

UI에서 생성한 파이프라인을 프로그램 방식으로 배포하는 방법은 [파이프라인 구성을 JSON 또는 Terraform으로 내보내기][14]를 참조하세요.

## UI에서 파이프라인 설정 {#set-up-a-pipeline-in-the-ui}

### 파이프라인 구성 요소 설정 {#set-up-pipeline-components}

{{< tabs >}}
{{% tab "로그" %}}

1. [Observability Pipelines][1]로 이동합니다.
1. 사용 사례에 따라 [템플릿][2]을 선택하거나 {{< ui >}}New Pipeline{{< /ui >}}을 클릭한 후 {{< ui >}}Logs Pipeline{{< /ui >}}을 선택합니다.
1. [로그 소스][3]를 선택하고 설정합니다.
1. 처리된 로그의 [대상][5]을 선택하고 설정합니다.
1. [Pipeline Simulation][6]을 사용하여 [프로세서][4]를 추가, 업데이트 및 검증하려면 프로세서 그룹에서 {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
    - **참고**:
      - 파이프라인 캔버스의 경우, 프로세서 그룹 25개, 총 프로세서 수 150개의 한도가 있습니다.
      - 프로세서를 복사하려면 해당 프로세서의 복사 아이콘을 클릭한다음 `command-v`를 사용하여 붙여 넣으세요.

#### 다른 프로세서 그룹 추가 {#add-another-processor-group}

{{< img src="observability_pipelines/setup/another_processor_group.png" alt="프로세서 그룹 두 개가 동일한 대상으로 로그를 전송하는 작업이 표시된 Pipelines 페이지" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### 다른 프로세서 및 대상 세트 추가 {#add-another-set-of-processors-and-destinations}

{{< img src="observability_pipelines/setup/another_set_processor_destination.png" alt="프로세서 그룹 두 개가 서로 다른 두 개의 대상으로 로그를 전송하는 작업이 표시된 Pipelines 페이지" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### 프로세서 그룹에 다른 대상 추가 {#add-another-destination-to-a-processor-group}

{{< img src="observability_pipelines/setup/another_destination.png" alt="프로세서 그룹 한 개가 서로 다른 두 개의 대상으로 로그를 전송하는 작업이 표시된 Pipelines 페이지" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/configuration/explore_templates/
[3]: /ko/observability_pipelines/sources/?tab=logs#sources
[4]: /ko/observability_pipelines/processors/
[5]: /ko/observability_pipelines/destinations/?tab=logs#destinations
[6]: /ko/observability_pipelines/configuration/pipeline_simulation/
[11]: /ko/observability_pipelines/search_syntax/logs/

{{% /tab %}}
{{% tab "메트릭" %}}

1. [Observability Pipelines][1]로 이동합니다.
1. [메트릭 태그 거버넌스][2] 템플릿을 선택하거나 {{< ui >}}New Pipeline{{< /ui >}}을 클릭한 후 {{< ui >}}Metrics Pipeline{{< /ui >}}을 선택합니다.
1. [메트릭 소스][3]를 선택하고 설정합니다.
1. 처리된 메트릭의 [대상][5]을 선택하고 설정합니다.
1. [Pipeline Simulation][6]을 사용하여 [프로세서][4]를 추가, 업데이트 및 검증하려면 프로세서 그룹에서 {{< ui >}}Edit{{< /ui >}}을 클릭합니다.
    - **참고**:
      - 파이프라인 캔버스의 경우, 프로세서 그룹 25개, 총 프로세서 수 150개의 한도가 있습니다.
      - 프로세서를 복사하려면 해당 프로세서의 복사 아이콘을 클릭한 다음 붙여 넣습니다(Mac에서는 `Cmd+V`, Windows/Linux에서는 `Ctrl+V`).

#### 다른 프로세서 그룹 추가 {#add-another-processor-group-1}

{{< img src="observability_pipelines/setup/another_processor_group_metrics.png" alt="동일한 대상으로 메트릭을 전송하는 두 프로세서 그룹이 표시된 Pipelines 페이지" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_processor_group %}}

#### 다른 프로세서 및 대상 세트 추가 {#add-another-set-of-processors-and-destinations-1}

{{< img src="observability_pipelines/setup/another_set_processor_destination_metrics.png" alt="서로 다른 두 대상으로 메트릭을 전송하는 두 프로세서 그룹이 표시된 Pipelines 페이지" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_set_of_processors_and_destinations %}}

#### 프로세서 그룹에 다른 대상 추가 {#add-another-destination-to-a-processor-group-1}

{{< img src="observability_pipelines/setup/another_destination_metrics.png" alt="서로 다른 두 대상으로 메트릭을 전송하는 한 프로세서 그룹이 표시된 Pipelines 페이지" style="width:100%;" >}}

{{% observability_pipelines/set_up_pipelines/add_another_destination %}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/configuration/explore_templates/?tab=metrics#metric-tag-governance
[3]: /ko/observability_pipelines/sources/?tab=metrics#sources
[4]: /ko/observability_pipelines/processors/?tab=metrics#processors
[5]: /ko/observability_pipelines/destinations/?tab=metrics#destinations
[6]: /ko/observability_pipelines/configuration/pipeline_simulation/
[11]: /ko/observability_pipelines/search_syntax/metrics/

{{% /tab %}}
{{< /tabs >}}

### Worker 설치 및 파이프라인 배포 {#install-the-worker-and-deploy-the-pipeline}

소스, 프로세서 및 대상을 설정한 후, {{< ui >}}Next: Install{{< /ui >}}을 클릭합니다. 사용 중인 플랫폼에 Worker를 설치하는 방법에 대한 지침은 [Worker 설치][12]를 참조하세요. 부트스트래핑 옵션은 [고급 Worker 구성][5]을 참조하세요.

배포한 파이프라인을 변경하려면 [기존 파이프라인 업데이트][11]를 참조하세요.

### 파이프라인의 기본 제공 모니터링 활성화 {#enable-out-of-the-box-monitors-for-your-pipeline}

1. [Pipelines][4] 페이지로 이동하여 해당 파이프라인을 찾습니다.
1. 파이프라인의 {{< ui >}}Enable monitors{{< /ui >}} 열에서 {{< ui >}}Monitors{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Start{{< /ui >}}를 클릭하여 제안된 사용 사례 중 하나에 대해 모니터링을 설정합니다.<br>
    - 선택한 사용 사례에 따라 메트릭 모니터링이 구성됩니다. 구성을 업데이트하여 추가로 사용자 지정할 수 있습니다. 자세한 내용은 [메트릭 모니터링 설명서][13]를 참조하세요.

## API로 파이프라인 설정 {#set-up-a-pipeline-with-the-api}

1. Observability Pipelines API를 사용하여 [파이프라인을 만듭니다][6]. 요청 페이로드 예시는 API 레퍼런스를 참조하세요.

1. 파이프라인을 생성한 후, 해당 파이프라인을 통해 데이터를 전송하려면 [Worker를 설치][7]합니다.
    - Worker를 설치할 때 다양한 소스, 프로세서 및 목적지에 필요한 환경 변수 목록은 [환경 변수][9]를 참조하세요.

기존 파이프라인을 변경하려면 [파이프라인 업데이트][8] 엔드포인트를 사용하세요

부트스트래핑 옵션은 [고급 Worker 구성][5]을 참조하세요.

## Terraform으로 파이프라인 설정 {#set-up-a-pipeline-with-terraform}

<div class="alert alert-warning"><a href="https://github.com/DataDog/terraform-provider-datadog/releases/tag/v3.84.0">Terraform 3.84.0</a>에서는 독립형 프로세서를 <a href="/observability_pipelines/processors/#processor-groups">프로세서 그룹</a>으로 대체하며, 이는 이전 버전과 호환되지 않는 변경 사항입니다. Terraform 3.84.0으로 업그레이드하려면 <a href="https://github.com/DataDog/terraform-provider-datadog/pull/3346">기존 리소스의 마이그레이션 지침이 담긴 PR 설명</a>을 참조하세요.</div>

1. Terraform에서 [datadog_observability_pipeline][10] 모듈을 사용하여 파이프라인을 만들 수 있습니다.

1. 파이프라인을 생성한 후 해당 파이프라인을 통해 데이터를 전송하려면 [Worker를 설치합니다][16].
    - Worker를 설치할 때 다양한 소스, 프로세서 및 목적지에 필요한 환경 변수 목록은 [환경 변수][9]를 참조하세요.

기존 파이프라인을 변경하려면 [datadog_observability_pipeline][10] 모듈을 사용하세요.

부트스트래핑 옵션은 [고급 Worker 구성][5]을 참조하세요.

## 파이프라인 복제 {#clone-a-pipeline}

UI에서 파이프라인을 복제하려면 다음 단계를 따르세요.

1. [Observability Pipelines][4]로 이동합니다.
1. 복제하려는 파이프라인을 선택합니다.
1. 페이지 오른쪽 상단의 톱니바퀴 아이콘을 클릭한 후, {{< ui >}}Clone{{< /ui >}}을 선택합니다.

## 파이프라인 삭제 {#delete-a-pipeline}

UI에서 파이프라인을 삭제하려면 다음 단계를 따르세요.

1. [Observability Pipelines][4]로 이동합니다.
1. 삭제하려는 파이프라인을 선택합니다.
1. 페이지 오른쪽 상단의 톱니바퀴 아이콘을 클릭한 후, {{< ui >}}Delete{{< /ui >}}를 선택합니다.

**참고**: 활성 파이프라인은 삭제할 수 없습니다. 파이프라인의 모든 Worker를 중지한 후에만 해당 파이프라인을 삭제할 수 있습니다

## 파이프라인 요구 사항 및 한도 {#pipeline-requirements-and-limits}

- 파이프라인에는 하나 이상의 목적지가 있어야 합니다. 프로세서 그룹에 목적지가 하나만 있는 경우 해당 목적지는 삭제할 수 없습니다.
- 로그 파이프라인의 경우 다음과 같습니다.
  - 로그 파이프라인에는 최대 20개의 목적지를 추가할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/sources/
[2]: /ko/observability_pipelines/processors/
[3]: /ko/observability_pipelines/destinations/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ko/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: /ko/api/latest/observability-pipelines/#create-a-new-pipeline
[7]: /ko/observability_pipelines/configuration/install_the_worker/?interface=api&platform=docker&secrets_source=secrets_management
[8]: /ko/api/latest/observability-pipelines/#update-a-pipeline
[9]: /ko/observability_pipelines/guide/environment_variables/
[10]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[11]: /ko/observability_pipelines/configuration/update_existing_pipelines/?
[12]: /ko/observability_pipelines/configuration/install_the_worker/
[13]: /ko/monitors/types/metric/
[14]: /ko/observability_pipelines/configuration/export_pipeline_configuration/
[16]: /ko/observability_pipelines/configuration/install_the_worker/?interface=terraform&platform=docker&secrets_source=secrets_management