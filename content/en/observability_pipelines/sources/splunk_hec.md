---
title: Splunk HTTP Event Collector (HEC) Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) source to receive logs from your Splunk HEC. You can choose to store the HEC token as event metadata and:

- Send logs from Observability Pipelines to Splunk HEC with the original token sent with the event.
- Use the Enrichment Table processor to append a log field from your lookup file based on the token in the metadata, and then process and route your logs based on the value of that field.

**Notes**:
- The Worker forwards the stored HEC token that is received onto the next component.
- Stored Splunk HEC tokens are not shown in [Live Capture][9].
- Use the Splunk HEC source if you want to [send logs from the Splunk Distribution of the OpenTelemetry Collector to Observability Pipelines](#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][6], using the [API][7], or with [Terraform][8]. The instructions in this section are for setting up the source in the UI.

<div class="alert alert-danger">For Secrets Management: Only enter the identifiers for the Splunk HEC address and, if applicable, the TLS key pass and authentication token keys. Do <b>not</b> enter the actual values.</div>

{{% observability_pipelines/secrets_env_var_note %}}

After you select the Splunk HEC source in the pipeline UI:

1. Enter the identifier for your Splunk HEC address. If you leave it blank, the [default](#secret-defaults) is used.
1. Only enable {{< ui >}}Store HEC token{{< /ui >}} if you want to do one of the following:
    - Use a Splunk HEC destination with the {{< ui >}}From Source{{< /ui >}} token strategy.
    - Use an Enrichment Table processor to map Splunk HEC tokens from a local file.

### Optional settings

#### Enable TLS

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### Configure authentication tokens

If you store Splunk HEC tokens in your HTTP request's authorization header, you can configure Observability Pipelines to check if incoming HTTP requests have a valid token. Request events that do not have a valid token are dropped.

To configure authentication tokens, enable the {{< ui >}}Configure authentication tokens{{< /ui >}} toggle:

1. Click {{< ui >}}Manage Tokens{{< /ui >}} and then {{< ui >}}Add Token{{< /ui >}}.
1. Enter the identifier for your token key.<br>**Note**: If you are using environment variables, the environment variable for this token is the identifier you entered prepended with `DD_OP_`.
1. (Optional) Enter a field and value if you want to add additional information to logs successfully authenticated with this specific token.

## Secret defaults

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Splunk HEC address identifier:
	- References the bind address, such as `0.0.0.0:8088`, on which your Observability Pipelines Worker listens to receive logs originally intended for the Splunk indexer.
	- The default identifier is `SOURCE_SPLUNK_HEC_ADDRESS`.
- Splunk HEC TLS passphrase identifier (when TLS is enabled):
	- The default identifier is `SOURCE_SPLUNK_HEC_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

## Send logs from the Splunk Distribution of the OpenTelemetry Collector to Observability Pipelines

To send logs from the Splunk Distribution of the OpenTelemetry Collector:

1. Install the Splunk OpenTelemetry Collector based on your environment:
    - [Kubernetes][2]
    - [Linux][3]
1. [Set up a pipeline][4] using the [Splunk HEC source](#set-up-the-source-in-the-pipeline-ui).
1. Configure the Splunk OpenTelemetry Collector:
    ```bash
    cp /etc/otel/collector/splunk-otel-collector.conf.example etc/otel/collector/splunk-otel-collector.conf
    ```
    ```bash
    # Splunk HEC endpoint URL, if forwarding to Splunk Observability Cloud
    # SPLUNK_HEC_URL=https://ingest.us0.signalfx.com/v1/log
    # If you're forwarding to a Splunk Enterprise instance running on example.com, with HEC at port 8088:
    SPLUNK_HEC_URL=http://<OPW_HOST>:8088/services/collector
    ```
   -  `<OPW_HOST>` is the IP or URL of the host (or load balancer) associated with the Observability Pipelines Worker.
        - For CloudFormation installs, the `LoadBalancerDNS` CloudFormation output has the correct URL to use.
        - For Kubernetes installs, the internal DNS record of the Observability Pipelines Worker service can be used, for example `opw-observability-pipelines-worker.default.svc.cluster.local`.

**Note**: If you are using a firewall, make sure your firewall allows traffic from the Splunk OpenTelemetry Collector to the Worker.

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-kubernetes
[3]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-linux
[4]: /observability_pipelines/configuration/set_up_pipelines
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /observability_pipelines/configuration/live_capture/
