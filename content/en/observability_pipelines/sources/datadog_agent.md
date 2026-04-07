---
title: Datadog Agent Source
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- name: Metrics
  icon: metrics
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
further_reading:
  - link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
    tag: Blog
    text: Manage metric volume and tags in your environment with Observability Pipelines
---

{{< product-availability >}}

{{< callout url="https://www.datadoghq.com/product-preview/metrics-ingestion-and-cardinality-control-in-observability-pipelines/"
 btn_hidden="false" header="Join the Preview!">}}
Sending metrics to Observability Pipelines is in Preview. Fill out the form to request access.
{{< /callout >}}

## Overview

Use Observability Pipelines' Datadog Agent source to receive logs or metrics ({{< tooltip glossary="preview" case="title" >}}) from the Datadog Agent.

**Note**: If you are using the Datadog Distribution of OpenTelemetry (DDOT) Collector to collect logs or metrics, you must [use the OpenTelemetry source to send that data to Observability Pipelines][4].

## Prerequisites

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][6], using the [API][7], or with [Terraform][8]. The instructions in this section are for setting up the source in the UI.

### Optional TLS settings

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

To configure your Datadog Agent source:

<div class="alert alert-danger">Only enter the identifier for the Datadog Agent address and, if applicable, the TLS key pass. Do <b>not</b> enter the actual values.</div>

Enter the identifier for your Datadog Agent address. If you leave it blank, the [default](#set-secrets) is used.

### Optional settings

Toggle the switch to **Enable TLS**. The following certificate and key files are required.<br>**Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. See [Advanced Worker Configurations][5] for more information. The file must be owned by the `observability-pipelines-worker` user and group, or at least readable by the group or user.
- Enter the identifier for your Datadog Agent key pass. If you leave it blank, the [default](#set-secrets) is used.
   - **Note**: Only enter the identifier for the key pass. Do **not** enter the actual key pass.
- `Server Certificate Path`: The path to the certificate file that has been signed by your Certificate Authority (CA) root file in DER or PEM (X.509) format.
- `CA Certificate Path`: The path to the certificate file that is your Certificate Authority (CA) root file in DER or PEM (X.509) format.
- `Private Key Path`: The path to the `.key` private key file that belongs to your Server Certificate Path in DER or PEM (PKCS#8) format.

## Set secrets

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Secrets Management" %}}

- Datadog Agent address identifier:
    - References the bind address on which the Observability Pipelines Worker listens to receive logs from the Datadog Agent.
    - The default identifier is `SOURCE_DATADOG_AGENT_ADDRESS`.
- Datadog Agent TLS passphrase identifier (when TLS is enabled):
    - The default identifier is `SOURCE_DATADOG_AGENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{< /tabs >}}

## Connect the Datadog Agent to the Observability Pipelines Worker

{{< tabs >}}
{{% tab "Logs" %}}

Use the Agent configuration file or the Agent Helm chart values file to connect the Datadog Agent to the Observability Pipelines Worker.

**Note**: If your Agent is running in a Docker container, you must exclude Observability Pipelines logs using the `DD_CONTAINER_EXCLUDE_LOGS` environment variable. For Helm, use `datadog.containerExcludeLogs`. This prevents duplicate logs, as the Worker also sends its own logs directly to Datadog. See [Docker Log Collection][1] or [Setting environment variables for Helm][2] for more information.

{{% collapse-content title="Agent configuration file" level="h4" expanded=false id="id-for-anchoring" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm values file" level="h4" expanded=false id="id-for-anchoring" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /containers/docker/log/?tab=containerinstallation#linux
[2]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "Metrics" %}}

Use the Agent configuration file or the Agent Helm chart values file to connect the Datadog Agent to the Observability Pipelines Worker.

**Note**: If your Agent is running in a Docker container, you must exclude Observability Pipelines metrics, such as utilization and events in/out metrics, using the `DD_CONTAINER_EXCLUDE_METRICS` environment variable. For Helm, use `datadog.containerExcludeMetrics`. This prevents duplicate metrics, as the Worker also sends its own metrics directly to Datadog. See [Docker Metrics Collection][1] or [Setting environment variables for Helm][2] for more information.

{{% collapse-content title="Agent configuration file" level="h4" expanded=false id="id-for-anchoring" %}}

To send Datadog Agent metrics to the Observability Pipelines Worker, update your [Agent configuration file][1] with the following:

```
observability_pipelines_worker:
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8383"

```

`<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.
- For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.
- For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Note**: If the Worker is listening for logs on port 8282, you must use another port for metrics, such as 8383.

After you [restart the Agent][2], your observability data should be going to the Worker, processed by the pipeline, and delivered to Datadog.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[2]: /agent/configuration/agent-commands/#restart-the-agent

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm values file" level="h4" expanded=false id="id-for-anchoring" %}}

To send Datadog Agent metrics to the Observability Pipelines Worker, update your Datadog Helm chart [datadog-values.yaml][1] with the following environment variables. See [Agent Environment Variables][2] for more information.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL
      value: "http://<OPW_HOST>:8383"
```

`<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

 For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Note**: If the Worker is listening for logs on port 8282, you must use another port for metrics, such as 8383.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /containers/docker/data_collected/
[2]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/
[4]: /observability_pipelines/sources/opentelemetry/#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
