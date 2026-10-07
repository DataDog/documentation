---
description: Observability Pipelines Worker를 사용하여 rsyslog 또는 syslog-ng로 로그를 전송하는 방법을
  알아봅니다.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Syslog 대상
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 syslog 대상을 사용하여 rsyslog 또는 syslog-ng로 로그를 전송합니다.

**참고**: rsyslog 및 syslog-ng 대상은 [RFC5424][5] 형식을 지원합니다.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: syslog 엔드포인트 URL에 대한 식별자와 해당하는 경우 키 암호만 입력하십시오. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할 때][2] rsyslog 또는 syslog-ng 대상을 구성하십시오. 파이프라인은 [UI][1], [API][3] 또는 [Terraform][4]을 사용하여 설정할 수 있습니다. 이 섹션에서 설명하는 단계는 UI에서 설정합니다.

파이프라인 UI에서 rsyslog 또는 syslog-ng 대상을 선택한 후, 엔드포인트 URL에 대한 식별자를 입력하십시오. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

필드가 매핑되는 방법에 대한 자세한 내용은 [로그 필드를 syslog 필드에 매핑](#matching-log-fields-to-syslog-fields)을 참조하십시오.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### TCP keepalive 프로브 대기 시간 {#wait-time-for-tcp-keepalive-probes}

유휴 연결에서 TCP keepalive 프로브를 보내기 전에 대기할 시간(초)을 입력하십시오.

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

## 로그 필드를 syslog 필드에 매핑 {#matching-log-fields-to-syslog-fields}

rsyslog 및 syslog-ng 대상은 이러한 로그 필드를 다음 syslog 필드에 매핑합니다:

| 로그 이벤트       | SYSLOG 필드 | 기본값                    |
|-----------------|--------------|----------------------------|
| log["message"]  | MESSAGE      | `NIL`                      |
| log[\"procid\"]   | PROCID       | 실행 중인 Worker의 프로세스 ID입니다. |
| log["appname"]  | APP-NAME     | `observability_pipelines`  |
| log[\"facility\"] | FACILITY     | `8 (log_user)`             |
| log["msgid"]    | MSGID        | `NIL`                      |
| log["severity"] | SEVERITY     | `info`                     |
| log["host"]     | HOSTNAME     | `NIL`                      |
| log[\"timestamp\"]| TIMESTAMP    | 현재 UTC 시간입니다.          |

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- rsyslog 또는 syslog-ng 엔드포인트 URL 식별자:
	- Observability Pipelines Worker가 로그를 전송할 주소 및 포트를 참조합니다. 예를 들어, `127.0.0.1:9997`입니다.
	- 기본 식별자는 `DESTINATION_SYSLOG_ENDPOINT_URL`입니다.
- rsyslog 또는 syslog-ng TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `DESTINATION_SYSLOG_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## 대상 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리 {#event-batching}

rsyslog 및 syslog-ng 대상은 이벤트를 일괄 처리하지 않습니다.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: /ko/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://datatracker.ietf.org/doc/html/rfc5424