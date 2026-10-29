---
description: Observability Pipelines Worker를 사용하여 Prometheus 클라이언트가 푸시하는 메트릭을 수집하는
  방법을 알아보십시오.
disable_toc: false
products:
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Prometheus 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Prometheus 소스를 사용하여 Prometheus 클라이언트가 푸시하는 메트릭을 수신하십시오.

## 설정 {#setup}

<div class="alert alert-danger">Secrets Management의 경우: Prometheus 주소의 식별자만 입력하고, 해당하는 경우 일반(기본) 인증을 위한 사용자 이름 및 비밀번호의 식별자만 입력하십시오. 실제 값을 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][2], [API][3] 또는 [Terraform][4]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

pipeline UI에서 Prometheus 소스를 선택한 후:

1. Prometheus 주소의 식별자를 입력하십시오. 식별자가 참조하는 소켓 주소의 예: `0.0.0.0:9091`. 식별자 필드를 비워 두면 [기본값](#secret-defaults)이 사용됩니다.
1. 메트릭 POST 요청이 허용되는 URL 경로를 입력하십시오(예: `/api/v1/write`).
1. 인증 방식을 선택합니다. {{< ui >}}Plain{{< /ui >}}을 선택한 경우:
    - Prometheus 사용자 이름과 비밀번호의 식별자를 입력하십시오. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### 인증 토큰 구성 {#configure-authentication-tokens}

Prometheus 클라이언트의 인증 헤더에 토큰을 자격 증명으로 저장하는 경우, Worker가 들어오는 요청에 유효한 토큰이 있는지 검사하도록 구성할 수 있습니다. 유효한 토큰이 없는 요청 이벤트는 삭제됩니다. Worker는 헤더 대신 엔드포인트 경로 또는 IP 주소를 조회할 수도 있습니다. 인증 전략이 **None**으로 설정된 경우에만 인증 토큰을 설정할 수 있습니다.

{{% observability_pipelines/configure_authentication_tokens %}}

#### keepalive 구성 {#configure-keepalive}

소스에 대한 연결의 keepalive 설정을 구성하려면 {{< ui >}}Configure keepalive{{< /ui >}} 토글을 활성화하십시오:

- {{< ui >}}Max connection age{{< /ui >}}: 연결이 닫히기까지의 최대 시간(초)입니다. 기본값은 `300`초입니다.
- {{< ui >}}Max connection age jitter factor{{< /ui >}}: 모든 연결이 동시에 닫히지 않도록 최대 연결 수명을 무작위화하는 데 사용되는 계수입니다. 기본값은 `0.1`입니다.

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Prometheus 주소 식별자:
	- Observability Pipelines Worker가 Prometheus 메트릭을 수신하는 소켓 주소를 참조합니다. 식별자가 참조하는 소켓 주소의 예: `0.0.0.0:9091`.
	- 기본 식별자는 `SOURCE_PROMETHEUS_REMOTE_WRITE_ADDRESS`입니다.
- 일반 인증을 사용하는 경우:
	- Prometheus 사용자 이름 식별자:
		- 기본 식별자는 `SOURCE_PROMETHEUS_REMOTE_WRITE_USERNAME`입니다.
	- Prometheus 비밀번호 식별자:
		- 기본 식별자는 `SOURCE_PROMETHEUS_REMOTE_WRITE_PASSWORD`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline