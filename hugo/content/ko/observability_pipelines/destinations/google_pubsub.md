---
description: Observability Pipelines Worker를 사용하여 Google Pub/Sub 메시징 시스템에 로그를 게시하는
  방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google Pub/Sub 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Google Pub/Sub 목적지를 사용하여 로그를 Google Pub/Sub 메시징 시스템에 게시하면 로그를 다운스트림 서비스, 데이터 레이크 또는 사용자 지정 애플리케이션으로 전송할 수 있습니다.

### 이 목적지를 사용하는 경우 {#when-to-use-this-destination}

이 목적지를 사용할 수 있는 일반적인 시나리오는 다음과 같습니다.
- 분석 파이프라인: 로그를 Google BigQuery, 데이터 레이크 또는 사용자 지정 머신러닝 워크플로로 다운스트림 라우팅합니다.
- 이벤트 기반 처리: 로그를 Pub/Sub 주제에 게시하여 Google Cloud Functions, Cloud Run 함수 및 Dataflow 작업이 로그 데이터를 기반으로 실시간으로 작업을 수행할 수 있도록 합니다.

## 전제 조건 {#prerequisites}

목적지를 구성하기 전에 다음이 필요합니다.

- Pub/Sub 구독: Pub/Sub 주제와 메시지를 소비할 구독을 하나 이상 생성하세요.
- 인증: [표준 Google Cloud 인증 방식][2]을 설정하세요. 옵션은 다음과 같습니다.
	- 서비스 계정 키(JSON 파일)
	- 워크로드 ID(Google Kubernetes Engine (GKE))
- IAM 역할:
	이벤트를 게시하려면 - `roles/pubsub.publisher`가 필요합니다.
	상태 검사에는 - `roles/pubsub.viewer`가 권장됩니다.
		- 역할이 누락된 경우 `Healthcheck endpoint forbidden` 오류가 기록되고 Worker는 정상적으로 실행됩니다.
	- 자세한 내용은 [사용 가능한 Pub/Sub 역할][3]을 참조하세요.

### Worker용 서비스 계정 설정 {#set-up-a-service-account-for-the-worker}

Google Cloud의 서비스 계정은 애플리케이션이나 서비스에서만 사용하는 계정 유형입니다.
- 자체 ID와 자격 증명(JSON 키 파일)을 가지고 있습니다.
- 특정 리소스에 액세스할 수 있도록 IAM 역할을 할당하세요.
- 이 경우 Observability Pipelines Worker는 서비스 계정을 사용하여 사용자를 대신해 Pub/Sub에 인증하고 로그를 전송합니다.

서비스 계정을 사용하여 인증하려면 다음을 수행합니다.

1. Google Cloud 콘솔에서 **IAM & Admin** > **[Service Accounts][4]**로 이동합니다.
1. **+ Create service account**를 클릭합니다.
1. 이름을 입력하고 **Create and continue**를 클릭합니다.
1. 다음 역할을 할당합니다.
	- **Pub/Sub Publisher**
	- **Pub/Sub Viewer**
1. **Done**을 클릭합니다.

#### 인증 방식 {#authentication-methods}

올바른 역할이 할당된 서비스 계정을 생성한 후 다음 인증 방식 중 하나를 설정하세요.

##### 옵션 1: 워크로드 ID 방식(GKE용, 권장) {#option-a-workload-identity-method-for-gke-recommended}

1. 서비스 계정을 Kubernetes 서비스 계정(KSA)에 바인딩합니다.
1. 해당 KSA가 서비스 계정의 권한을 사용할 수 있도록 허용합니다.
1. GKE가 사용할 서비스 계정을 알 수 있도록 KSA에 주석을 추가합니다.
1. 이후 인증은 GCP의 메타데이터 서버에서 이루어집니다.

##### 옵션 2: GSA를 VM에 직접 연결(Google Compute Engine용) {#option-b-attach-the-gsa-directly-to-a-vm-for-google-compute-engine}

Google Compute Engine(GCE) VM에서 Observability Pipelines Worker를 실행 중인 경우 이 인증 방식을 사용하세요.
- VM을 생성하거나 수정할 때 **Identity and API access** > **Service account**에서 Google 서비스 계정을 지정하세요.

##### 옵션 3: GSA로 서비스 실행(Cloud Run 또는 Cloud Functions의 경우) {#option-c-run-the-service-as-the-gsa-for-cloud-run-or-cloud-functions}

Worker를 Cloud Run 서비스 또는 Cloud Function으로 배포하는 경우 이 인증 방식을 사용하세요.
- Cloud Run 또는 Cloud Functions 배포 설정에서 **Execution service account**를 생성한 Google 서비스 계정으로 설정하세요.

##### 옵션 4: JSON 키 방식(ID 바인딩이 없는 모든 환경) {#option-d-json-key-method-any-environment-without-identity-bindings}

1. 새 서비스 계정을 열고 **Keys** > **Add key** > **Create new key**로 이동합니다.
1. JSON 형식을 선택합니다.
1. 다운로드한 JSON 파일을 안전한 위치에 저장합니다.
1. Worker를 설치한 후 JSON 파일을 `DD_OP_DATA_DIR/config/`에 복사하거나 마운트합니다.
Pipelines UI에서 [목적지를 설정할 때](#set-up-the-destination) Google Pub/Sub 목적지의 {{< ui >}}Credentials path{{< /ui >}} 필드에 이 파일을 참조하세요.

## 설정 {#setup}

[파이프라인을 설정][9]할 때 Google Pub/Sub 목적지를 설정하세요. 파이프라인은 [UI][1], [API][10] 또는 [Terraform][11]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 Google Pub/Sub 목적지를 선택한 다음 단계를 따르세요.

1. 목적지 프로젝트 이름을 입력합니다.
	- Pub/Sub 주제가 있는 GCP 프로젝트입니다.
1. 주제를 입력합니다.
	- 로그를 게시할 Pub/Sub 주제입니다.
1. {{< ui >}}Encoding{{< /ui >}} 드롭다운 메뉴에서 파이프라인 출력을 {{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Raw message{{< /ui >}} 형식으로 인코딩할지 선택합니다.
	- {{< ui >}}JSON{{< /ui >}}: 로그가 JSON으로 구조화됩니다. 다운스트림 도구에 구조화된 데이터가 필요한 경우 권장합니다.
	- {{< ui >}}Raw{{< /ui >}}: 로그가 원시 문자열로 전송되며 원래 형식이 유지됩니다.
1. 자격 증명 JSON 파일이 있는 경우 해당 파일의 경로를 입력합니다.
	- 서비스 계정 JSON을 사용하는 경우 `DD_OP_DATA_DIR/config/<your-service-account>.json` 경로를 입력하세요.
	- 또는 `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수를 설정하세요.
	- GKE에서 [워크로드 ID][7]를 사용하는 경우 자격 증명이 자동으로 관리됩니다.

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

<div class="alert alert-danger">시크릿 관리의 경우 TLS 키 암호의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요.</b></div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

{{< img src="observability_pipelines/destinations/google_pubsub_settings.png" alt="샘플 값이 포함된 Google Pub/Sub 목적지" style="width:30%;" >}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- (필요시) Google Pub/Sub 엔드포인트 URL 식별자:
	- 기본적으로 Worker는 글로벌 엔드포인트 `https://pubsub.googleapis.com`으로 데이터를 전송합니다.
	- Pub/Sub 주제가 특정 리전 전용인 경우, Google Pub/Sub 대체 엔드포인트 URL을 리전 엔드포인트로 구성하세요. 자세한 내용은 [Pub/Sub 엔드포인트 정보][1]를 참조하세요. 구성된 엔드포인트 URL을 시크릿 관리자에 입력하세요.
	- 기본 식별자는 `DESTINATION_GCP_PUBSUB_ENDPOINT_URL`입니다.
- Google Pub/Sub TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_GCP_PUBSUB_KEY_PASS`입니다.

[1]: https://docs.cloud.google.com/pubsub/docs/reference/service_apis_overview#pubsub_endpoints

{{% /tab %}}

{{% tab "환경 변수" %}}

#### 선택적 대체 Pub/Sub 엔드포인트 {#optional-alternative-pubsub-endpoints}

{{< img src="observability_pipelines/destinations/google_pubsub_env_var.png" alt="Google Pub/Sub 환경 변수 필드가 표시된 설치 페이지" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## 문제 해결 {#troubleshooting}

일반적인 문제 및 해결 방법은 다음과 같습니다.
- 상태 확인 금지됨
	- `roles/pubsub.viewer` IAM 역할을 확인하세요.
- 권한 거부됨
	- 서비스 계정에 `roles/pubsub.publisher`가 있는지 확인하세요.
- 인증 오류
	- 자격 증명 JSON 경로 또는 GKE Workload Identity 설정을 확인하세요.
- 삭제된 이벤트
	- `pipelines.component_discarded_events_total` 및 `pipelines.buffer_discarded_events_total` 메트릭을 확인하세요.
	- 문제를 해결하려면 필요에 따라 버퍼 크기를 늘리거나 잘못 구성된 필터를 수정하세요.
- 높은 지연 시간
	- 버퍼 크기와 제한 시간을 줄이거나 Worker를 확장하세요.
- 로그가 도착하지 않음
	- Google Pub/Sub 목적지 설정에서 주제 이름, 프로젝트 및 Pub/Sub 엔드포인트(글로벌 또는 리전)를 다시 확인하세요.

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][8] 및 [목적지 버퍼 메트릭][12]에 대해서는 [Pipelines 사용량 메트릭][13] 문서를 참조하세요. Google Pub/Sub 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:gcp_pubsub`를 사용하세요.

### 이벤트 배치 처리{#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][6]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 1,000          | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: https://cloud.google.com/docs/authentication#auth-flowchart
[3]: https://cloud.google.com/pubsub/docs/access-control#roles
[4]: https://console.cloud.google.com/iam-admin/serviceaccounts
[6]: /ko/observability_pipelines/destinations/#event-batching
[7]:https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /ko/observability_pipelines/configuration/set_up_pipelines/
[10]: /ko/api/latest/observability-pipelines/
[11]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[12]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[13]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/