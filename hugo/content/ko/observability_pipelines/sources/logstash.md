---
description: Observability Pipelines Worker를 사용하여 Logstash 에이전트에서 로그를 수집하는 방법을 알아보십시오.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Logstash 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Logstash 소스를 사용하여 Logstash 에이전트로부터 로그를 수신하십시오.

Logstash 소스를 사용하여 [Filebeat를 통해 Observability Pipelines로 로그를 전송][2]할 수도 있습니다.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/logstash%}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Logstash 주소에 대한 식별자와 해당하는 경우 TLS 키 암호만 입력하세요. 실제 값은 <b>입력하지 마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][4], [API][5] 또는 [Terraform][6]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하는 방법을 설명합니다.

파이프라인 UI에서 Logstash 소스를 선택한 후 Logstash 주소에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택 사항 TLS 설정 {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Logstash 주소 식별자:
	- Observability Pipelines Worker가 들어오는 로그 메시지를 수신하는 주소를 참조합니다.
	- 기본 식별자는 `SOURCE_LOGSTASH_ADDRESS`입니다.
- Logstash TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_LOGSTASH_KEY_PASS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/logstash %}}

{{% /tab %}}
{{< /tabs >}}

## Logstash를 통해 Observability Pipelines Worker로 로그 전송 {#send-logs-to-the-observability-pipelines-worker-over-logstash}

{{% observability_pipelines/log_source_configuration/logstash %}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: /ko/observability_pipelines/sources/filebeat/
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /ko/api/latest/observability-pipelines/
[6]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline