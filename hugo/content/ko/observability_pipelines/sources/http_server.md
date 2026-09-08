---
description: Observability Pipelines Worker의 HTTP/S Server 소스를 사용하여 HTTP 클라이언트 로그를
  수집하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: HTTP/S Server 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 HTTP/S Server 소스를 사용하여 HTTP 클라이언트 로그를 수집하세요.

또한 [Datadog Lambda Forwarder를 사용하여 AWS vended 로그를 Observability Pipelines로 전송](#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines)할 수 있습니다.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/http_server %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리의 경우, HTTP/S Server 주소의 식별자만 입력하고, 해당하는 경우 일반(기본) 인증을 위한 사용자 이름 및 비밀번호의 식별자와 TLS 키 암호의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할][3] 때 이 소스를 설정하세요. 파이프라인은 [UI][1], [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하는 방법을 설명합니다.

파이프라인 UI에서 HTTP/S Server 소스를 선택한 후 다음 단계를 따르세요.

1. HTTP/S Server 주소의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
    - **참고**: 주소의 식별자만 입력하세요. 실제 주소는 **입력하지 마세요**.
1. 인증 방식을 선택합니다. {{< ui >}}Plain{{< /ui >}}을 선택한 경우:
    - HTTP/S Server 사용자 이름과 비밀번호의 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. (필요시) 인증 토큰을 설정합니다. 자세한 내용은 [인증 토큰 구성](#configure-authentication-tokens)을 참조하세요.
1. HTTP 메시지에 사용할 디코더를 선택합니다. HTTP 클라이언트 로그는 선택한 형식이어야 합니다. **참고**: `bytes` 디코딩을 선택하면 원시 로그가 `message` 필드에 저장됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### 인증 토큰 구성 {#configure-authentication-tokens}

HTTP 요청의 인증 헤더에 토큰을 자격 증명으로 저장하는 경우, Worker가 들어오는 HTTP 요청에 유효한 토큰이 있는지 검사하도록 구성할 수 있습니다. 유효한 토큰이 없는 요청 이벤트는 삭제됩니다. Worker는 헤더 대신 엔드포인트 경로 또는 IP 주소를 조회할 수도 있습니다.

**참고**: {{< ui >}}Plain{{< /ui >}} 인증 방식에서는 인증 토큰을 구성할 수 없습니다.

{{% observability_pipelines/configure_authentication_tokens %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- HTTP/S Server 주소 식별자:
	- Observability Pipelines Worker가 HTTP 클라이언트 로그를 수신하는 소켓 주소(예: `0.0.0.0:9997`)를 참조합니다.
	- 기본 식별자는 `SOURCE_HTTP_SERVER_ADDRESS`입니다.
- HTTP/S Server TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_HTTP_SERVER_KEY_PASS`입니다.
- 일반 인증을 사용하는 경우:
	- HTTP/S Server 사용자 이름 식별자:
		- 기본 식별자는 `SOURCE_HTTP_SERVER_USERNAME`입니다.
	- HTTP/S Server 암호 식별자:
		- 기본 식별자는 `SOURCE_HTTP_SERVER_PASSWORD`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_server %}}

{{% /tab %}}
{{< /tabs >}}

## Datadog Lambda Forwarder를 사용하여 AWS vended 로그를 Observability Pipelines로 전송{#send-aws-vended-logs-with-the-datadog-lambda-forwarder-to-observability-pipelines}

HTTP/S Server 소스를 사용하여 AWS vended 로그를 Observability Pipelines로 전송하려면 다음 단계를 따르세요.

- [HTTP/S Server 소스로 파이프라인을 설정하세요](#set-up-a-pipeline).
- [Datadog Forwarder를 배포하세요](#deploy-the-datadog-lambda-forwarder).

**참고**: 이 기능은 Worker 버전 2.51 이상에서 사용할 수 있습니다.

### 파이프라인 설정 {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

### Datadog Lambda Forwarder 배포 {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

[1]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/observability_pipelines/configuration/set_up_pipelines/
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline