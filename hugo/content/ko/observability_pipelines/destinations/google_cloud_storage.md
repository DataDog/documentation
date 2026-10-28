---
description: 필요에 따라 Datadog에서 아카이빙 및 리하이드레이션하기 위해 로그를 Google Cloud Storage 버킷으로 전송하는
  방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google Cloud Storage 목적지
---
{{< product-availability >}}

## 개요 {#overview}

<div class="alert alert-info">Worker 버전 2.7 이상에서는 Google Cloud 목적지가 <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access">균일한 버킷 수준 액세스</a>를 지원합니다. Google은 <a href = "https://cloud.google.com/storage/docs/uniform-bucket-level-access#should-you-use">균일한 버킷 수준 액세스</a> 사용을 권장합니다. <br>Worker 버전 2.7 미만에서는 <a href = "https://cloud.google.com/storage/docs/access-control/lists">Access Control Lists</a>만 지원됩니다.</div>

Google Cloud Storage 목적지를 사용하여 로그를 Google Cloud Storage 버킷으로 전송하세요. [아카이빙][1] 및 [리하이드레이션][2]을 위해 로그를 Google Cloud Storage로 전송하려면 [Log Archives를 구성](#configure-log-archives)해야 합니다. Datadog에서 로그를 리하이드레이션할 필요가 없는 경우 [파이프라인 목적지 설정](#set-up-the-destinations)으로 건너뛰세요.

Observability Pipelines Worker는 표준 Google 인증 방식을 사용합니다. 사용 사례에 적합한 인증 방식을 선택하는 방법에 대한 자세한 내용은 [Google의 인증 방법][6]을 참조하세요.

## Log Archives 구성 {#configure-log-archives}

이 단계는 [아카이빙][1] 및 [리하이드레이션][2]을 위해 로그를 Google Cloud Storage로 전송하려는 경우에만 필요하며, Observability Pipelines용 Datadog Log Archive가 아직 구성되지 않은 경우에만 해당합니다. 이미 Datadog Log Archive가 구성되어 있거나 Datadog에서 로그를 리하이드레이션할 필요가 없는 경우 [파이프라인 목적지 설정](#set-up-the-destinations)으로 건너뛰세요.

이미 Observability Pipelines용 Datadog Log Archive가 구성되어 있는 경우 [파이프라인 목적지 설정](#set-up-the-destination-for-your-pipeline)으로 건너뛰세요.

Datadog Log Archives를 설정하려면 Datadog의 [Google Cloud Platform 통합][3]이 설치되어 있어야 합니다.

### 스토리지 버킷 생성 {#create-a-storage-bucket}

1. [Google Cloud Storage][16]로 이동합니다.
1. 버킷 페이지에서 **Create**를 클릭하여 아카이브용 버킷을 생성합니다.
1. 버킷 이름을 입력하고 데이터를 저장할 위치를 선택합니다.
1. **Choose how to control access to objects** 섹션에서 **Fine-grained**를 선택합니다.
1. 드물게(일반적으로 시간 초과 발생 시) 최신 데이터를 다시 기록해야 하는 경우가 있으므로 보존 정책을 추가하지 않습니다.
1. **Create**를 클릭합니다.

### Workers가 버킷에 쓸 수 있도록 서비스 계정 생성 {#create-a-service-account-to-allow-workers-to-write-to-the-bucket}

1. Google Cloud Storage [서비스 계정][17]을 생성합니다.
    - 서비스 계정에 버킷에 대해 `Storage Admin` 및 `Storage Object Admin` 권한을 부여하세요.
    - 자격 증명 파일로 인증하려면 서비스 계정 키 파일을 다운로드하고 `DD_OP_DATA_DIR/config` 아래에 배치하세요. 이후 [Google Cloud Storage 목적지](#set-up-the-destinations)를 설정할 때 이 파일을 참조합니다.
1. [지침][18]에 따라 서비스 계정 키를 생성합니다. 키 유형으로 `json`을 선택하세요.

### 스토리지 버킷을 Datadog Log Archives에 연결 {#connect-the-storage-bucket-to-datadog-log-archives}

1. Datadog [Log Forwarding][19]으로 이동합니다.
1. **New archive**를 클릭합니다.
1. 아카이브를 설명하는 이름을 입력합니다.
1. 로그 파이프라인을 통과하는 모든 로그를 필터링하여 해당 로그가 이 아카이브로 들어가지 않도록 쿼리를 추가하세요. 예를 들어, 파이프라인을 통과하는 로그에 해당 태그가 추가되지 않았다고 가정하여 쿼리 `observability_pipelines_read_only_archive`를 추가하세요.
1. **Google Cloud Storage를 선택합니다**.
1. 스토리지 버킷이 있는 서비스 계정을 선택합니다.
1. 프로젝트를 선택합니다.
1. 이전에 생성한 스토리지 버킷의 이름을 입력합니다.
1. 필요시 경로를 입력합니다.
1. 필요시 권한을 설정하고, 태그를 추가하며, 리하이드레이션을 위한 최대 스캔 크기를 정의합니다. 자세한 내용은 [고급 설정][20]을 참조하세요.
1. **Save**를 클릭합니다.

추가 정보는 [Log Archives 설명서][1]을 참조하세요.

## 파이프라인의 목적지 설정 {#set-up-the-destinations}

[파이프라인을 설정][4]할 때 Google Cloud Storage 목적지를 구성하세요. 파이프라인은 [UI][10]에서 설정할 수 있으며, [API][11] 또는 [Terraform][12]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 Google Cloud Storage 목적지를 선택한 후:

1. Google Cloud 스토리지 버킷의 이름을 입력합니다. Log Archives를 구성한 경우, 이전에 생성한 버킷입니다.
1. 자격 증명 JSON 파일이 있는 경우, 해당 파일의 경로를 입력합니다. Log Archives를 구성한 경우, [이전에](#create-a-service-account-to-allow-workers-to-write-to-the-bucket) 다운로드한 자격 증명입니다. 자격 증명 파일은 `DD_OP_DATA_DIR/config` 아래에 배치해야 합니다. 또는 `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수를 사용하여 자격 증명 경로를 제공할 수 있습니다.
    - Google Kubernetes Engine(GKE)에서 [워크로드 ID][9]를 사용하는 경우 `GOOGLE_APPLICATION_CREDENTIALS`가 자동으로 제공됩니다.
    - Worker는 표준 [Google 인증 방식][8]을 사용합니다.
1. 생성된 객체의 스토리지 클래스를 선택합니다.
1. 생성된 객체의 액세스 수준을 선택합니다.

### 선택적 설정 {#optional-settings}

#### 모든 키 객체에 적용할 접두사 {#prefix-to-apply-to-all-key-objects}

모든 키 객체에 적용할 접두사를 입력하세요.

- 접두사는 객체를 파티셔닝하는 데 유용합니다. 예를 들어, 접두사를 객체 키로 사용하여 특정 디렉터리 아래에 객체를 저장하세요. 이 용도로 접두사를 사용하는 경우, 디렉터리 경로로 작동하도록 `/`로 끝나야 합니다. 후행 `/`는 자동으로 추가되지 않습니다.
- 로그의 특정 필드를 기반으로 로그를 다른 객체 키로 라우팅하려면 [템플릿 구문][7]을 참조하세요.
  - **참고**: Datadog은 접두사를 디렉터리 이름으로 시작하고 선행 슬래시(`/`) 없이 시작할 것을 권장합니다. 예를 들어, `app-logs/` 또는 `service-logs/`.

#### 메타데이터 {#metadata}

1. {{< ui >}}Add Header{{< /ui >}}를 클릭하여 메타데이터를 추가합니다.
1. 헤더 이름과 값을 입력합니다.

#### 압축 {#compression}

1.  {{< ui >}}Compression - Algorithm{{< /ui >}} 드롭다운 메뉴에서 아카이브된 로그에 대한 압축 알고리즘을 선택하십시오({{< ui >}}gzip{{< /ui >}} 또는 {{< ui >}}zstd{{< /ui >}}).
    - **참고**: 압축 알고리즘을 지정하지 않으면 압축 수준이 `6`인 gzip이 사용됩니다.
1.  {{< ui >}}Compression - Level {{< /ui >}} 필드에 압축 수준을 입력해야 합니다. Datadog은 gzip의 경우 `6`, zstd의 경우 `3`을 권장합니다.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

구성할 시크릿 식별자가 없습니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/datadog_archives_google_cloud_storage %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][13] 및 [목적지 버퍼 메트릭][14]에 대해서는 [Pipelines 사용량 메트릭][15] 설명서를 참조하세요. Google Cloud Storage 목적지 메트릭별로 필터링하거나 그룹화하려면 `component_type:datadog_archives_gcs` 태그를 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 일괄 처리][5]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 100               | 900                 |

[1]: /ko/logs/log_configuration/archives/
[2]: /ko/logs/log_configuration/rehydrating/
[3]: /ko/integrations/google_cloud_platform/#setup
[4]: /ko/observability_pipelines/configuration/set_up_pipelines/
[5]: /ko/observability_pipelines/destinations/#event-batching
[6]: https://cloud.google.com/docs/authentication#auth-flowchart
[7]: /ko/observability_pipelines/destinations/#template-syntax
[8]: https://cloud.google.com/docs/authentication#auth-flowchart
[9]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /ko/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[15]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[16]: https://console.cloud.google.com/storage
[17]: https://console.cloud.google.com/iam-admin/serviceaccounts
[18]: https://cloud.google.com/iam/docs/keys-create-delete#creating
[19]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[20]: /ko/logs/log_configuration/archives/?tab=awss3#advanced-settings