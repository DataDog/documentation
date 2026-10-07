---
description: Observability Pipelines Worker를 사용하여 Sumo Logic Hosted Collector로 전송된
  로그를 수집하는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Sumo Logic Hosted Collector
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Sumo Logic Hosted Collector 소스를 사용하여 Sumo Logic Hosted Collector로 전송된 로그를 수신하세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/sumo_logic %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: Sumo Logic 주소의 식별자만 입력하세요. 실제 값은 <b>입력하지 마세요.</b></div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][2], [API][3] 또는 [Terraform][4]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 Sumo Logic 소스를 선택한 후 Sumo Logic 주소에 대한 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

{{< ui >}}Decoding{{< /ui >}} 드롭다운 메뉴에서 입력 형식에 따라 원시 {{< ui >}}Bytes{{< /ui >}}, {{< ui >}}JSON{{< /ui >}}, Graylog Extended Log Format({{< ui >}}Gelf{{< /ui >}}) 또는 {{< ui >}}Syslog{{< /ui >}}를 선택하세요. 디코딩을 선택하지 않으면 기본값인 JSON이 사용됩니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Sumo Logic 주소 식별자:
	- Observability Pipelines Worker가 원래 Sumo Logic HTTP 소스용으로 의도된 로그를 수신하기 위해 수신 대기하는 바인딩 주소(예: `0.0.0.0:80.`)를 참조합니다.
	- 기본 식별자는 `SOURCE_SUMO_LOGIC_ADDRESS`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /ko/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline