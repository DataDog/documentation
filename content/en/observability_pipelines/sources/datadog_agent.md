---
title: Datadog Agent Source
disable_toc: false

further_reading:
  - link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
    tag: Blog
    text: Manage metric volume and tags in your environment with Observability Pipelines

---

Use Observability Pipelines' Datadog Agent source to receive logs or metrics ({{< tooltip glossary="preview" case="title" >}}) from the Datadog Agent. Select and set up this source when you [set up a pipeline][1].

**Note**: If you are using the Datadog Distribution of OpenTelemetry (DDOT) Collector for logs, you must [use the OpenTelemetry source to send logs to Observability Pipelines][4].

## Prerequisites

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Set up the source in the pipeline UI

{{% observability_pipelines/source_settings/datadog_agent %}}

## Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

## Connect the Datadog Agent to the Observability Pipelines Worker

{{< tabs >}}
{{% tab "Logs" %}}

Use the Agent configuration file or the Agent Helm chart values file to connect the Datadog Agent to the Observability Pipelines Worker.

**Note**: If your Agent is running in a Docker container, you must exclude Observability Pipelines logs using the `DD_CONTAINER_EXCLUDE_LOGS` environment variable. For Helm, use `datadog.containerExcludeLogs`. This prevents duplicate logs, as the Worker also sends its own logs directly to Datadog. See [Docker Log Collection][1] or [Setting environment variables for Helm][2] for more information.

{{% collapse-content title="Agent configuration file" level="h4" expanded=false id="id-for-anchoring" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Agent Helm value file" level="h4" expanded=false id="id-for-anchoring" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /containers/docker/log/?tab=containerinstallation#linux
[2]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "Metrics" %}}

Use the Agent configuration file or the Agent Helm chart values file to connect the Datadog Agent to the Observability Pipelines Worker.

**Note**: If your Agent is running in a Docker container, you must exclude Observability Pipelines metrics, such as utilization and events in/out metrics, using the `DD_CONTAINER_EXCLUDE_METRICS` environment variable. For Helm, use `datadog.containerExcludeMetrics`. This prevents duplicate metrics, as the Worker also sends its own metrics directly to Datadog. See [Docker Log Collection][1] or [Setting environment variables for Helm][2] for more information.

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

After you restart the Agent, your observability data should be going to the Worker, processed by the pipeline, and delivered to Datadog.

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml

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

**Note**: If the Worker is listening for logs on port 8282, you must use another port for metrics, such as 8383\.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /containers/docker/log/?tab=containerinstallation#linux
[2]: /containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/configuration/set_up_pipelines/

[4]: /observability_pipelines/sources/opentelemetry/#send-logs-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines