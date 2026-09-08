---
description: Observability Pipelines Worker를 사용하여 rsyslog 또는 syslog-ng로 전송된 로그를 가져오는
  방법을 알아봅니다.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Syslog 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 rsyslog 또는 syslog-ng를 사용하여 rsyslog 또는 syslog-ng로 전송된 로그를 수신합니다.

[타사 로그를 syslog로 포워딩](#forward-third-party-logs-to-syslog)한 다음 Observability Pipelines Worker로 전송할 수 있습니다.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/syslog %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: syslog 주소의 식별자와 해당하는 경우 TLS 키 암호만 입력하십시오. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][7]에서 설정할 수 있으며, [API][8] 또는 [Terraform][9]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 Syslog 소스를 선택한 후:

1. syslog 주소의 식별자를 입력하십시오. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. {{< ui >}}Socket Type{{< /ui >}}드롭다운 메뉴에서 사용하려는 통신 프로토콜 {{< ui >}}TCP{{< /ui >}} 또는 {{< ui >}}UDP{{< /ui >}}을 선택하십시오.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택 사항 TLS 설정 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- rsyslog 또는 syslog-ng 주소 식별자:
	- Observability Pipelines Worker가 Syslog 포워더로부터 로그를 수신하기 위해 대기하는 `0.0.0.0:9997`와 같은 바인딩 주소를 참조합니다.
	- 기본 식별자는 `SOURCE_SYSLOG_ADDRESS`입니다.
- rsyslog 또는 syslog-ng TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_SYSLOG_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## syslog를 통해 Observability Pipelines Worker로 로그 전송 {#send-logs-to-the-observability-pipelines-worker-over-syslog}

{{% observability_pipelines/log_source_configuration/syslog %}}

## 타사 로그를 Observability Pipelines Worker로 포워딩 {#forward-third-party-logs-to-the-observability-pipelines-worker}

Syslog는 네트워크 로그를 중앙 서버로 전송하기 위해 널리 사용되는 로깅 프로토콜입니다. 많은 네트워크 장치가 syslog 출력을 지원하므로, 타사 로그를 Observability Pipelines의 Syslog 소스로 포워딩하여 처리 및 라우팅할 수 있습니다. 이러한 타사 서비스의 예는 다음과 같습니다:

### Fortinet {#fortinet}
- [로그 포워딩 구성][2]
- [syslog 설정 구성][3]

### Palo Alto Networks {#palo-alto-networks}
- [로그 포워딩 구성][4]
- [트래픽 로그를 syslog 서버로 포워딩][5]

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ko/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline