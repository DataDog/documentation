---
description: Observability Pipelines Worker를 사용하여 Google Cloud Pub/Sub에서 로그를 가져오는
  방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Google Pub/Sub 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Google Pub/Sub 소스를 사용하여 Google Cloud Pub/Sub 메시징 시스템에서 로그를 가져오세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/google_pubsub %}}

## 설정 {#setup}

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. Pipelines는 [UI][5]에서 설정할 수 있으며, [API][6] 또는 [Terraform][7]을 통해 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

Pipelines UI에서 Google Pub/Sub 소스를 선택한 후:

1. 소스 프로젝트의 이름을 입력하세요.
1. 자격 증명 JSON 파일이 있는 경우 해당 파일의 경로를 입력합니다. 자격 증명 파일은 `DD_OP_DATA_DIR/config` 아래에 배치해야 합니다. 또는 `GOOGLE_APPLICATION_CREDENTIALS` 환경 변수를 사용하여 자격 증명 경로를 제공할 수 있습니다.
    - Google Kubernetes Engine (GKE)에서 [workload identity]를 사용하는 경우 `GOOGLE_APPLICATION_CREDENTIALS`가 자동으로 제공됩니다.
    - Worker는 표준 [Google 인증 방식][4]을 사용합니다.
1. 구독 이름을 입력하세요.
1. 사용할 디코더 (Bytes, GELF, JSON, syslog)를 선택하세요.

### 선택 사항 TLS 설정 {#optional-tls-settings}

<div class="alert alert-danger">시크릿 관리의 경우 TLS 키 암호의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요.</b></div>

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/secrets_env_var_note %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

이 소스에 대한 기본 비밀 식별자는 없습니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/google_pubsub %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][8] 및 [소스 버퍼 메트릭][9]은 [Pipelines 사용량 메트릭][10] 설명서를 참조하세요. Google Pub/Sub 소스 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:gcp_pubsub`를 지정하세요.

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity
[4]: https://cloud.google.com/docs/authentication#auth-flowchart
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /ko/api/latest/observability-pipelines/
[7]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[9]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[10]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/