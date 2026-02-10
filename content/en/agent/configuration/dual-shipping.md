---
title: Dual Shipping
description: "Configure the Datadog Agent to send metrics, logs, and traces to multiple Datadog organizations simultaneously."
aliases:
- /agent/guide/dual-shipping
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralize and govern your OpenTelemetry pipeline with the DDOT gateway
- link: "/agent/configuration/network/"
  tag: "Guide"
  text: "Network Traffic"
- link: "/observability_pipelines/"
  tag: "documentation"
  text: "Send logs to external destinations with Observability Pipelines"
---

<div class="alert alert-warning">
Dual shipping can impact billing if you are sending data to multiple Datadog organizations. For more information about the impact of this configuration, contact <a href="/help/">Datadog Support</a>.
</div>

## Overview

This document provides examples of Agent configurations for dual shipping different types of data (for example, APM, logs, Cluster Agent metrics, and so on) to multiple Datadog organizations.

**Note**: Use [Observability Pipelines][1] if you want to dual ship logs or split log traffic across different logging vendors, cloud storages, or SIEM providers.

For a full list of network traffic destinations, see [Network Traffic][2].

## Metrics and service checks

You can add the YAML configuration to your `datadog.yaml` or launch the Agent with the appropriate environment variables.

### YAML configuration

Requires Agent version >= 6.17 or 7.17.

In `datadog.yaml`:

```yaml
additional_endpoints:
  "https://app.{{< region-param key="dd_site">}}":
  - apikey2
  - apikey3
  "https://app.<DD_SITE>": # Replace "<DD_SITE>" with its value. For example, "https://app.datadoghq.eu" for the EU site.
  - apikey4
```

### Environment variable configuration

Requires Agent version >= 6.18 or 7.18.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://app.<DD_SITE>\": [\"apikey4\"]}'
```

## APM

### YAML configuration

Requires Agent version >= 6.7.0.

In `datadog.yaml`:
```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://trace.agent.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://trace.agent.<DD_SITE>": # Replace "<DD_SITE>" with its value. For example, "https://trace.agent.datadoghq.eu" for the EU site.
    - apikey4
```

### Environment variable configuration

Requires Agent version >= 6.19 or 7.19.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.<DD_SITE>\": [\"apikey4\"]}'
```

## Continuous Profiler

### YAML configuration

Requires Agent version >= 6.7.0.

In `datadog.yaml`:

```yaml
apm_config:
  [...]
  profiling_additional_endpoints:
    "https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile":
    - apikey2
    - apikey3
    "https://intake.profile.<DD_SITE>/api/v2/profile": # Replace "<DD_SITE>" with its value. For example, "https://intake.profile.datadoghq.eu/api/v2/profile" for the EU site.
    - apikey4
```

### Environment variable configuration

Requires Agent version >= 6.19 or 7.19.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.<DD_SITE>/api/v2/profile\": [\"apikey4\"]}'
```

**Note:** Uploads to additional endpoints for the Continuous Profiler product are done through best-effort delivery.
* The main endpoint has the highest priority. Uploads to additional endpoints are only handled after uploads to the main endpoint have completed successfully.
* Responses from additional endpoints are not forwarded back to the profiler. Any errors during delivery to additional endpoints are logged in the Agent error logs.

## Live Processes

### YAML configuration

Requires Agent version >= 6.4.0.

In `datadog.yaml`:
```yaml
process_config:
  [...]
  additional_endpoints:
    "https://process.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://process.<DD_SITE>": # Replace "<DD_SITE>" with its value. For example, "https://process.datadoghq.eu" for the EU site.
    - apikey4
```

### Environment variable configuration

Requires Agent version >= 6.20 or 7.20.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://process.<DD_SITE>\": [\"apikey4\"]}'
```

## Cluster Agent metrics

Configure the Agent to send Cluster Agent metrics, such as Kubernetes State Metrics Core, to additional endpoints.

### HELM configuration
In Datadog `values.yaml`:
```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.{{< region-param key="dd_site">}}": ["apikey2"]}'
```
### Cluster Agent metrics provider

To ensure autoscaling is resilient to failure, configure the Cluster Agent to run your metric queries for the HPA against your multiple Datadog regions with dual-shipped data. Configure the Datadog Cluster Agent manifest with several endpoints:

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" collapsible="true" >}}
external_metrics_provider:
  endpoints:
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.<DD_SITE>
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.<DD_SITE>
{{< /code-block >}}

## Orchestrator

### HELM configuration
In Datadog `values.yaml`:
```yaml
agents:
  customAgentConfig:
    process_config:
      additional_endpoints:
        "https://process.{{< region-param key="dd_site">}}":
        - apikey2
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.{{< region-param key="dd_site">}}":
        - apikey3

clusterAgent:
...
  datadog_cluster_yaml:
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.<DD_SITE>": # Replace "<DD_SITE>" with its value. For example, "https://orchestrator.ddog-gov.com" for the US1-FED site.
        - apikey4
```

### Environment variable configuration

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.<DD_SITE>\": [\"apikey4\"]}'
```

## CI Visibility

### YAML configuration

Requires Agent >= 6.38 or 7.38.

In `datadog.yaml`:
```yaml
evp_proxy_config:
  [...]
  additional_endpoints:
    "https://<VERSION>-app.agent.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://<VERSION>-app.agent.<DD_SITE>":  # Replace "<VERSION>" and "<DD_SITE>" with their values. For example, "https://7-38-0-app.agent.datadoghq.eu" for Agent version 7.38.0 on the EU site.
    - apikey4
```

### Environment variable configuration

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.<DD_SITE>\": [\"apikey4\"]}'
```

## Logs

Use the Agent if you want to dual ship logs to multiple Datadog organizations. Use [Observability Pipelines][2] if you want to send logs to Datadog and external destinations.

TCP requires Agent version >= 6.6.<br/>
HTTPS requires Agent version >= 6.13.

### YAML configuration
In `datadog.yaml`:
```yaml
logs_config:
  force_use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.{{< region-param key="dd_site">}}"
    Port: 443
    is_reliable: true
```

### Environment variable configuration

Requires Agent >= 6.18 or 7.18.

```bash
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring

### YAML configuration

Requires Agent >= 6.29 or 7.29.

In `datadog.yaml`:
```yaml
database_monitoring:
  samples:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
  activity:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbquery-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
  metrics:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Devices

### YAML configuration

Requires Agent >= 6.29 or 7.29.

In `datadog.yaml`:
```yaml
network_devices:
  metadata:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "ndm-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
  snmp_traps:
    forwarder:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.{{< region-param key="dd_site">}}"
        Port: 443
        is_reliable: true
  netflow:
    forwarder:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.{{< region-param key="dd_site">}}"
        Port: 443
        is_reliable: true
```

### Environment variable configuration

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Path

### YAML configuration

Requires Agent >= 6.55 or 7.55.

In `datadog.yaml`:
```yaml
network_path:
  forwarder:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "netpath-intake.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_NETWORK_PATH_FORWARDER_USE_HTTP=true
DD_NETWORK_PATH_FORWARDER_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"netpath-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Misconfigurations

### YAML configuration

In `datadog.yaml`:
```yaml
compliance_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Workload Protection

### YAML configuration
In `datadog.yaml`:
```yaml
runtime_security_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.{{< region-param key="dd_site">}}"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Dual shipping in Kubernetes

{{< tabs >}} {{% tab "Helm" %}}

If you're using the [Datadog Agent Helm chart][1], you can configure these settings with a configmap. In the `values.yaml`, set `useConfigMap: true`
and add the relevant settings to `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configures a configmap to provide the agent configuration. Use this in combination with the `agents.customAgentConfig` parameter.
  useConfigMap:  true

  # agents.customAgentConfig -- Specify custom contents for the datadog agent config (datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## Note the `agents.useConfigMap` needs to be set to `true` for this parameter to be taken into account.
  customAgentConfig:
    additional_endpoints:
      "https://app.<DD_SITE>":  # Replace "<DD_SITE>" with its value. For example, "https://app.datadoghq.com" for the US1 site.
      - apikey2
      - apikey3
      "https://app.<DD_SITE>":  # Replace "<DD_SITE>" with its value. For example, "https://app.datadoghq.eu" for the EU site.
      - apikey4

    logs_config:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "agent-http-intake.logs.<DD_SITE>" # Replace "<DD_SITE>" with its value. For example, "https://app.datadoghq.com" for the US1 site.
        Port: 443
        is_reliable: true
```

To avoid exposing your API key(s) in clear text inside the `ConfigMap`, you can also use the environment variable configuration and reference a Kubernetes secret. Here is an example to send metrics to an additional region:

1. Create a Kubernetes secret with your environment variable configuration value from this guide:
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}'
    ```
2. Use the [Helm chart parameters][2] `datadog.env` or `datadog.envFrom` to reference this secret in your configuration:
    ```yaml
    datadog:
      [...]
      env:
      - name: DD_ADDITIONAL_ENDPOINTS
        valueFrom:
          secretKeyRef:
            name: dual-shipping
            key: metrics
    ```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/e1ec85127de74c8b876eef6a81bb1579d17b49bf/charts/datadog/values.yaml#L563-L578

{{% /tab %}}

{{% tab "Datadog Operator" %}}

If you're using the [Datadog Agent operator][1], you can set the `[key].customConfigurations.[key].configData` [override][2] key to set these settings. The example below replaces the `datadog.yaml` configuration file of the node Agent to send metrics and logs to additional regions.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      customConfigurations:
        datadog.yaml:
          # Replace "<DD_SITE>" with its value. For example, "https://app.datadoghq.com" for the US1 site using `apikey2` and `apikey3` and  "https://app.datadoghq.eu" for the EU site using `apikey4`.
          configData: |-
            additional_endpoints:
              "https://app.<DD_SITE>":  
              - apikey2
              - apikey3
              "https://app.<DD_SITE>":  
              - apikey4
            logs_config:
              force_use_http: true
              additional_endpoints:
              - api_key: "apiKey2"
                Host: "agent-http-intake.logs.<DD_SITE>"
                Port: 443
                is_reliable: true
```

To avoid exposing your API key(s) in clear text inside the `ConfigMap`, you can also use the environment variable configuration and reference a Kubernetes secret. Here is an example to send metrics to an additional region:

1. Create a Kubernetes secret with your environment variable configuration value from this guide:
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}'
    ```
2. Use the `[key].env` parameter to reference this secret in your configuration:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      override:
        nodeAgent:
          env:
          - name: DD_ADDITIONAL_ENDPOINTS
            valueFrom:
              secretKeyRef:
                name: dual-shipping
                key: metrics
    ```

[1]: https://github.com/DataDog/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}} {{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/
[2]: /agent/configuration/network/