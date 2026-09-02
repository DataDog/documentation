---
description: 필요에 따라 Datadog에서 아카이빙 및 리하이드레이션하기 위해 로그를 Azure 스토리지 버킷으로 전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Azure Storage 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Azure Storage 목적지를 사용하여 로그를 Azure Storage 버킷으로 전송하세요. [아카이빙][1] 및 [리하이드레이션][2]을 위해 로그를 Azure Storage로 전송하려면 [Log Archives를 구성](#configure-log-archives)해야 합니다. Datadog에서 로그를 리하이드레이션하지 않으려면 [파이프라인의 목적지 설정](#set-up-the-destination-for-your-pipeline)으로 건너뛰세요.

## Log Archives 구성 {#configure-log-archives}

이 단계는 Datadog에서 [아카이빙][1] 및 [리하이드레이션][2]을 위해 로그를 Datadog 리하이드레이션 가능한 형식으로 Azure Storage에 전송하려는 경우이며 Observability Pipelines용 Datadog Log Archive가 없는 경우에만 필요합니다. 이미 Datadog Log Archive가 구성되어 있거나 Datadog에서 로그를 리하이드레이션하지 않으려면 [파이프라인의 목적지 설정](#set-up-the-destination-for-your-pipeline)으로 건너뛰세요.

Datadog Log Archives를 설정하려면 Datadog의 [Azure 통합][3]이 설치되어 있어야 합니다.

#### 스토리지 계정 만들기 {#create-a-storage-account}

아직 [Azure 스토리지 계정][13]이 없는 경우 계정을 만드세요.

1. [Storage accounts][14]로 이동합니다.
1. **Create**를 클릭합니다.
1. 사용하려는 구독 이름과 리소스 이름을 선택합니다.
1. 스토리지 계정의 이름을 입력합니다.
1. 드롭다운 메뉴에서 리전을 선택합니다.
1. **Standard** 성능 또는 **Premium** 계정 유형을 선택합니다.
1. **Next**를 클릭합니다.
1. **Blob storage** 섹션에서 **Hot** 또는 **Cool** 스토리지를 선택합니다.
1. **Review + create**를 클릭합니다.

#### 스토리지 버킷 생성 {#create-a-storage-bucket}

1. 스토리지 계정의 왼쪽 탐색 메뉴에 있는 **Data storage**에서 **Containers**를 클릭합니다.
1. 상단의 **+ Container**를 클릭하여 컨테이너를 생성합니다.
1. 새 컨테이너의 이름을 입력합니다. 해당 이름은 향후 Observability Pipelines Azure Storage 목적지를 설정할 때 사용됩니다.

**참고**: 드물게 (일반적으로 시간 초과 시) 마지막 데이터를 다시 작성해야 할 수 있으므로 [불변성 정책][15]을 설정하지 마세요.

#### Azure 컨테이너를 Datadog Log Archives에 연결 {#connect-the-azure-container-to-datadog-log-archives}

1. Datadog [Log Forwarding][16]으로 이동합니다.
1. **New archive**를 클릭합니다.
1. 아카이브를 설명하는 이름을 입력합니다.
1. 로그 파이프라인을 통과하는 모든 로그를 필터링하여 해당 로그가 이 아카이브로 들어가지 않도록 쿼리를 추가하세요. 예를 들어, 파이프라인을 통과하는 로그에 해당 태그가 추가되지 않았다고 가정하여 쿼리 `observability_pipelines_read_only_archive`를 추가하세요.
1. **Azure Storage**를 선택합니다.
1. 스토리지 계정이 속한 Azure 테넌트 및 클라이언트를 선택합니다.
1. 스토리지 계정의 이름을 입력합니다.
1. 이전에 만든 컨테이너의 이름을 입력합니다.
1. 필요시 경로를 입력합니다.
1. 필요시 권한을 설정하고, 태그를 추가하며, 리하이드레이션을 위한 최대 스캔 크기를 정의합니다. 자세한 내용은 [고급 설정][17]을 참조하세요.
1. **Save**를 클릭합니다.

추가 정보는 [Log Archives 설명서][1]을 참조하세요.

## 파이프라인 목적지 설정하기{#set-up-the-destination-for-your-pipeline}

<div class="alert alert-danger">시크릿 관리의 경우 Azure 연결 문자열의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요.</b></div>

[파이프라인을 설정][4]할 때 Azure Storage 목적지를 구성하세요. 파이프라인은 [UI][7]에서 설정할 수 있으며, [API][8] 또는 [Terraform][9]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 Azure Storage 목적지를 선택한 후:

1. Azure 연결 문자열의 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 이전에 만든 Azure 컨테이너의 이름을 입력하세요.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### 모든 키 객체에 적용할 접두사 {#prefix-to-apply-to-all-key-objects}

모든 키 객체에 적용할 접두사를 입력하세요.

- 접두사는 객체를 파티셔닝하는 데 유용합니다. 예를 들어, 접두사를 객체 키로 사용하여 특정 디렉터리 아래에 객체를 저장하세요. 이 용도로 접두사를 사용하는 경우, 디렉터리 경로로 작동하도록 `/`로 끝나야 합니다. 후행 `/`는 자동으로 추가되지 않습니다.
- 로그의 특정 필드를 기반으로 로그를 다른 객체 키로 라우팅하려면 [템플릿 구문][6]을 참조하세요.
	- **참고**: Datadog은 접두사를 디렉터리 이름으로 시작하고 선행 슬래시(`/`) 없이 시작할 것을 권장합니다. 예를 들어, `app-logs/` 또는 `service-logs/`.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Azure 연결 문자열 식별자:
	- Worker가 Azure Storage 버킷에 액세스할 수 있도록 하는 연결 문자열을 참조합니다.
	- 기본 식별자는 `DESTINATION_DATADOG_ARCHIVES_AZURE_BLOB_CONNECTION_STRING`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_azure_storage %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][10] 및 [목적지 버퍼 메트릭][11]에 대해서는 [Pipelines 사용량 메트릭][12] 설명서를 참조하세요. Azure Storage 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:datadog_archives_azure_blob`를 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 일괄 처리][5]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 100               | 900                 |

[1]: /ko/logs/log_configuration/archives/
[2]: /ko/logs/log_configuration/rehydrating/
[3]: /ko/integrations/azure/#setup
[4]: /ko/observability_pipelines/configuration/set_up_pipelines/
[5]: /ko/observability_pipelines/destinations/#event-batching
[6]: /ko/observability_pipelines/destinations/#template-syntax
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ko/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[11]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[12]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[13]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[14]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[15]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[16]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[17]: /ko/logs/log_configuration/archives/?tab=awss3#advanced-settings