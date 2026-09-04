---
description: Observability Pipelines Worker를 사용하여 로깅 플랫폼 또는 SIEM과 같은 HTTP 클라이언트로 로그를
  전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: HTTP 클라이언트 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 HTTP 클라이언트 목적지를 사용하여 로깅 플랫폼 또는 SIEM과 같은 HTTP 클라이언트로 로그를 전송합니다.

## 목적지 설정 {#set-up-destination}

<div class="alert alert-danger">시크릿 관리의 경우: HTTP 클라이언트 URI에 대한 식별자와, 해당하는 경우 기본 인증을 위한 사용자 이름 및 비밀번호, TLS 키 암호에 대한 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정][3]할 때 HTTP 클라이언트 목적지를 구성하세요. 파이프라인은 [UI][1]에서 설정할 수 있으며, [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 HTTP 클라이언트 목적지를 선택한 후 다음 단계를 따르세요.

1. HTTP 클라이언트 URI에 대한 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 인증 전략({{< ui >}}None{{< /ui >}}, {{< ui >}}Basic{{< /ui >}} 또는 {{< ui >}}Bearer{{< /ui >}})을 선택하세요. 선택한 방식에 따라 다음을 설정하세요.
	- {{< ui >}}Basic{{< /ui >}}:
		- HTTP 클라이언트 사용자 이름에 대한 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
		- HTTP 클라이언트 비밀번호에 대한 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
	- {{< ui >}}Bearer{{< /ui >}}:
		- HTTP 클라이언트 토큰에 대한 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. JSON만 사용 가능한 인코더입니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### 압축을 활성화 {#enable-compression}

스위치를 {{< ui >}}Enable Compression{{< /ui >}}으로 전환하세요. 활성화된 경우:
1. GZIP 압축 알고리즘만 사용할 수 있습니다.
1. 사용할 압축 수준을 선택하세요.

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- HTTP 클라이언트 URI 엔드포인트 식별자:
	- 기본 식별자는 `DESTINATION_HTTP_CLIENT_URI`입니다.
- HTTP 클라이언트 TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_HTTP_CLIENT_KEY_PASS`입니다.
- 기본 인증을 사용하는 경우:
	- HTTP Client 사용자 이름 식별자:
		- 기본 식별자는 `DESTINATION_HTTP_CLIENT_USERNAME`입니다.
	- HTTP Client 비밀번호 식별자:
		- 기본 식별자는 `DESTINATION_HTTP_CLIENT_PASSWORD`입니다.
- Bearer 인증을 사용하는 경우:
	- HTTP Client Bearer 토큰 식별자:
		- 기본 식별자는 `DESTINATION_HTTP_CLIENT_BEARER_TOKEN`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

## 상태 메트릭 {#health-metrics}

모든 목적지에서 내보내는 [구성 요소 메트릭][6] 및 [목적지 버퍼 메트릭][7]은 [파이프라인 사용량 메트릭][8] 설명서를 참조하세요. HTTP Client 목적지 메트릭을 필터링하거나 그룹화하려면 태그 `component_type:http`를 사용하세요.

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리{#event-batching}

이벤트 배치는 다음 조건 중 하나가 발생하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 1,000          | 1                 | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/configuration/set_up_pipelines/
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[6]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[7]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics
[8]: /ko/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/