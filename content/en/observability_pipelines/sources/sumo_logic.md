---
title: Sumo Logic Hosted Collector
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

Use Observability Pipelines' Sumo Logic Hosted Collector source to receive logs sent to your Sumo Logic Hosted Collector. Select and set up this source when you [set up a pipeline][1].

## Prerequisites

{{% observability_pipelines/prerequisites/sumo_logic %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

- Enter the identifier for your Sumo Logic address. If you leave it blank, the [default](#set-secrets) is used.
    - **Note**: Only enter the identifier for the address. Do **not** enter the actual address.

### Optional settings

In the **Decoding** dropdown menu, select whether your input format is raw **Bytes**, **JSON**, Graylog Extended Log Format (**Gelf**), or **Syslog**. If no decoding is selected, the decoding defaults to JSON.

## Set secrets

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