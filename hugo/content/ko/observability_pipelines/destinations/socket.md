---
description: Observability Pipelines Worker를 사용하여 소켓 엔드포인트로 로그를 전송하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: 소켓 대상
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 소켓 대상을 사용하여 소켓 엔드포인트로 로그를 전송하세요.

## 설정 {#setup}

<div class="alert alert-danger">Secrets Management의 경우: 소켓 주소의 식별자와 키 패스(해당하는 경우)만 입력합니다. 실제 값을 입력하지 <b>마세요</b>.</div>

소켓 대상은 [파이프라인을 설정][2]할 때 구성합니다. 파이프라인은 [UI][1]에서, [API][3]를 사용해서, 또는 [Terraform][4]을 사용해서 설정합니다. 이 섹션에서 설명한 단계는 UI로 구성했습니다.

파이프라인 UI에서 소켓 대상을 선택한 다음:

1. 주소의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1.  {{< ui >}}Mode{{< /ui >}} 드롭다운 메뉴에서 사용할 소켓 유형을 선택합니다.
1.  {{< ui >}}Encoding{{< /ui >}} 드롭다운 메뉴에서 출력 형식으로 {{< ui >}}JSON{{< /ui >}} 또는 {{< ui >}}Raw message{{< /ui >}}를 선택합니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- 소켓 주소 식별자:
	- Observability Pipelines Worker가 처리된 로그를 전송하는 주소를 참조합니다.
	- 기본 식별자는 `DESTINATION_SOCKET_ADDRESS`입니다.
- 소켓 TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_SOCKET_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

## 대상의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리{#event-batching}

소켓 대상이 이벤트를 배치 처리하지 않습니다.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: /ko/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline