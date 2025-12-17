---
title: Sumo Logic Hosted Collector
disable_toc: false
---

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

The following are the defaults used for secret identifiers and environment variables.

**Note**: If you entered identifiers for yours secrets and then choose to use environment variables, the environment variable is the identifier entered prepended with `DD_OP`. For example, if you entered `PASSWORD_1` for the a password identifier, the environment variable for the password is `DD_OP_PASSWORD_1`.

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Sumo Logic address identifier:
	- The default identifier is `SOURCE_SUMO_LOGIC_ADDRESS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/sumo_logic %}}

[1]: /observability_pipelines/configuration/set_up_pipelines/