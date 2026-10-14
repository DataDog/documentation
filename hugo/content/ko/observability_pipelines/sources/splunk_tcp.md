---
description: Observability Pipelines Worker를 사용하여 TCP를 통해 Splunk Heavy 또는 Universal
  Forwarders에서 로그를 수집하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Splunk Heavy 또는 Universal Forwarders(TCP) 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Splunk Heavy 및 Universal Forwarders(TCP) 소스를 사용하여 Splunk Forwarder로 전송된 로그를 수신합니다.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Splunk TCP 주소의 식별자와 해당하는 경우 TLS 키 암호의 식별자만 입력합니다. 실제 값은 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][2], [API][3] 또는 [Terraform][4]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 Splunk TCP 소스를 선택한 후 Splunk TCP 주소에 대한 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

**참고**:
- 기본적으로 Splunk TCP 소스는 이벤트 크기를 제한하지 않습니다. 잘못된 형식의 연결이나 무기한 열린 연결 등으로 인한 무제한 메모리 사용을 방지하려면 환경 변수 `DD_OP_SPLUNK_TCP_MAX_FRAME_LENGTH`를 사용하여 최대 프레임 길이를 바이트 단위로 설정하세요.
- 보안 식별자를 입력한 후 환경 변수 사용을 선택하면, 환경 변수는 입력한 식별자 앞에 `DD_OP_`가 추가된 형태가 됩니다. 예를 들어, 다음을 입력하여 <code>PASSWORD_1</code> 암호 식별자로 사용했다면 해당 암호의 환경 변수는 `DD_OP_PASSWORD_1`입니다.

### 선택적 설정 {#optional-settings}

#### 최대 연결 지속 시간 {#maximum-connection-duration}

연결을 열린 상태로 유지할 최대 시간(초)을 입력합니다. 설정하지 않으면 연결이 무기한 유지될 수 있습니다.

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Splunk TCP 주소 식별자는 다음과 같습니다.
	- Observability Pipelines Worker가 Splunk Forwarder에서 로그를 수신하기 위해 수신 대기하는 소켓 주소(예: `0.0.0.0:9997`)를 참조합니다.
	- 기본 식별자는 `SOURCE_SPLUNK_TCP_ADDRESS`입니다.
- Splunk TCP TLS 암호문 식별자(TLS가 활성화된 경우)는 다음과 같습니다.
	- 기본 식별자는 `SOURCE_SPLUNK_TCP_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline