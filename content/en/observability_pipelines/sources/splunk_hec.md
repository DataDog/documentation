---
title: Splunk HTTP Event Collector (HEC) Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

Use Observability Pipelines' Splunk HTTP Event Collector (HEC) source to receive logs from your Splunk HEC. Select and set up this source when you [set up a pipeline][1].

**Note**: Use the Splunk HEC source if you want to [send logs from the Splunk Distribution of the OpenTelemetry Collector to Observability Pipelines](#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines).

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

<div class="alert alert-danger">Only enter the identifiers for the Splunk HEC address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

- Enter the identifier for your Splunk HEC address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

Toggle the switch to **Enable TLS**. If you enable TLS, the following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][5] for more information. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.
- Enter the identifier for your Splunk HEC key pass. If you leave it blank, the [default](#set-secrets) is used.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509).
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509).
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set secrets

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
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/