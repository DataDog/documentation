---
description: Observability Pipelines Worker를 사용하여 Amazon Data Firehose에서 로그를 수집하는
  방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Amazon Data Firehose 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Amazon Data Firehose 소스를 사용하여 Amazon Data Firehose에서 로그를 수신하세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/amazon_data_firehose %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리의 경우, Amazon Data Firehose 주소의 식별자와 해당하는 경우 TLS 키 암호의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][3], [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하는 방법을 설명합니다.

파이프라인 UI에서 Amazon Data Firehose 소스를 선택한 후, Amazon Data Firehose 주소의 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### AWS 인증 {#aws-authentication}

{{< ui >}}AWS authentication{{< /ui >}} 옵션을 선택하세요. {{< ui >}}Assume role{{< /ui >}}을 선택한 경우:
1. 맡으려는 IAM 역할의 ARN을 입력합니다.
1. 필요시 맡은 역할의 세션 이름과 외부 ID를 입력합니다.

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Amazon Data Firehose 주소 식별자:
	- Observability Pipelines Worker가 로그를 수신하는 소켓 주소를 참조합니다.
	- 기본 식별자는 `SOURCE_AWS_DATA_FIREHOSE_ADDRESS`입니다.
- Amazon Data Firehose TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_AWS_DATA_FIREHOSE_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/amazon_data_firehose %}}

{{% /tab %}}
{{< /tabs >}}

## Amazon Data Firehose를 통해 Observability Pipelines Worker로 로그 전송 {#send-logs-to-the-observability-pipelines-worker-over-amazon-data-firehose}

{{% observability_pipelines/log_source_configuration/amazon_data_firehose %}}

## AWS 인증 {#aws-authentication-1}

{{% observability_pipelines/aws_authentication/instructions %}}

### 권한 {#permissions}

{{% observability_pipelines/aws_authentication/amazon_s3_source/permissions %}}

## 상태 메트릭 {#health-metrics}

모든 소스에서 내보내는 [구성 요소 메트릭][6] 및 [소스 버퍼 메트릭][7]은 [파이프라인 사용량 메트릭][8] 설명서를 참조하세요. Amazon Data Firehose 소스 메트릭별로 필터링하거나 그룹화하려면 `component_type:aws_kinesis_firehose` 태그를 사용하세요.

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/