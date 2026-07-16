---
title: Sumo Logic Hosted Collector
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Sumo Logic Hosted Collector source to receive logs sent to your Sumo Logic Hosted Collector.

## Prerequisites

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][2], using the [API][3], or with [Terraform][4]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifier for the Sumo Logic address. Do <b>not</b> enter the actual value.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Sumo Logic source in the pipeline UI, enter the identifier for your Sumo Logic address. If you leave it blank, the [default](#secret-defaults) is used.

### Optional settings

In the {{< ui >}}Decoding{{< /ui >}} dropdown menu, select whether your input format is raw {{< ui >}}Bytes{{< /ui >}}, {{< ui >}}JSON{{< /ui >}}, Graylog Extended Log Format ({{< ui >}}Gelf{{< /ui >}}), or {{< ui >}}Syslog{{< /ui >}}. If no decoding is selected, the decoding defaults to JSON.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Sumo Logic address identifier:
	- References the bind address, such as `0.0.0.0:80.`, that your Observability Pipelines Worker listens on to receive logs originally intended for the Sumo Logic HTTP Source.
	- The default identifier is `SOURCE_SUMO_LOGIC_ADDRESS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline