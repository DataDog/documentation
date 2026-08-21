---
title: Prometheus Source
description: Learn how to collect metrics pushed by Prometheus clients using the Observability Pipelines Worker.
disable_toc: false
products:
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' {{< tooltip text=" Prometheus source" tooltip="Contact your account manager to request access." >}} to receive metrics pushed by your Prometheus clients.

## Setup

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Prometheus address and, if applicable, the username and password for plain (also known as basic) authorization. Do <b>not</b> enter the actual values.</div>

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][2], using the [API][3], or with [Terraform][4]. The instructions in this section are for setting up the source in the UI.

After you select the Prometheus source in the pipeline UI:

1. Enter the identifier for your Prometheus address. An example of the socket address that the identifier references: `0.0.0.0:9091`. If you leave the identifier field blank, the [default](#secret-defaults) is used.
1. Select your authorization strategy. If you selected {{< ui >}}Plain{{< /ui >}}:
    - Enter the identifiers for your Prometheus username and password. If you leave them blank, the [defaults](#secret-defaults) are used.

{{% observability_pipelines/secrets_env_var_note %}}

### Optional settings

#### Configure authentication tokens

If you store tokens as credentials in your Prometheus client's authorization header, you can configure the Worker to check if incoming requests have a valid token. Request events that do not have a valid token are dropped. The Worker can also look up an endpoint path or an IP address instead of a header.

{{% observability_pipelines/configure_authentication_tokens %}}

#### Aggregate metrics

Select {{< ui >}}Aggregate metrics{{< /ui >}} to combine metrics that share the same name, tags, and timestamp before they are sent downstream.

#### Configure keepalive

To configure keepalive settings for connections to the source, enable the {{< ui >}}Configure keepalive{{< /ui >}} toggle:

- {{< ui >}}Max connection age{{< /ui >}}: The maximum number of seconds after which a connection is closed. The default is `300` seconds.
- {{< ui >}}Max connection age jitter factor{{< /ui >}}: The factor used to randomize the max connection age, so connections don't all close simultaneously. The default is `0.1`.

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Prometheus address identifier:
	- References the socket address on which the Observability Pipelines Worker listens for Prometheus metrics. An example of the socket address that the identifier references: `0.0.0.0:9091`.
	- The default identifier is `SOURCE_PROMETHEUS_ADDRESS`.
- If you are using plain authentication:
	- Prometheus username identifier:
		- The default identifier is `SOURCE_PROMETHEUS_USERNAME`.
	- Prometheus password identifier:
		- The default identifier is `SOURCE_PROMETHEUS_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/prometheus %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
