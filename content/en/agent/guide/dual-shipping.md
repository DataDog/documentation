---
title: Dual Shipping
kind: guide
---

<div class="alert alert-danger">
Dual shipping can impact billing if you are sending data to multiple Datadog organizations. For more information about the impact of this configuration, contact <a href="/help/">Datadog Support</a>.
</div>

## Overview

If you wish to send data to more than one destination, such as a second Datadog organization or other internal infrastructure, you can configure the Agent to send data to additional endpoints. To set up the Agent to send different kinds of data to multiple endpoints or API keys, use the following configurations.


## Metrics, APM, Live Processes, Orchestrator

You can add the YAML configuration to your `datadog.yaml` or launch the Agent with the appropriate environment variables.

{{< tabs >}}

{{% tab "Metrics & Service checks" %}}

### YAML configuration
In `datadog.yaml`:
```yaml
additional_endpoints:
  "https://mydomain.datadoghq.com":
  - apikey2
  - apikey3
  "https://mydomain.datadoghq.eu":
  - apikey4
```

### Environment variable configuration

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

{{% tab "APM" %}}

### YAML configuration
In `datadog.yaml`: 
```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4

  profiling_additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### Environment variable configuration

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'

DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

{{% tab "Live Processes" %}}

### YAML configuration
In `datadog.yaml`: 
```yaml
process_config:
  [...]
  additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### Environment variable configuration

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

{{% tab "Orchestrator" %}}

### YAML configuration
In `datadog.yaml`: 
```yaml
orchestrator_explorer:
  [...]
  orchestrator_additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### Environment variable configuration

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}
{{% /tabs %}} 

## Logs, Database Monitoring, Network Devices, CSPM, Runtime Security

{{< tabs >}}

{{% tab "Logs" %}}

### YAML configuration 
In `datadog.yaml`: 
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "https://mydomain.datadoghq.com"
    Port: 443
    is_reliable: true
```

### Environment variable configuration

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "Database Monitoring" %}}

### YAML configuration 
In `datadog.yaml`: 
```yaml
database_monitoring:
  samples:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  activity:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  metrics:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "Network Devices" %}}

### YAML configuration

In `datadog.yaml`: 
```yaml
network_devices:
  metadata:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "CSPM" %}}

### YAML configuration 
In `datadog.yaml`: 
```yaml
​​compliance_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

{{% tab "CWS" %}}

### YAML configuration 
In `datadog.yaml`: 
```yaml
runtime_security_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Environment variable configuration

```bash
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}
{{% /tabs %}}

For data from these products, when setting up additional endpoints, you must explicitly set `use_http` to tell the Agent which transport to use. The same transport configuration is shared among all additional endpoints.

The `is_reliable` setting tells the Agent to treat this endpoint with the same priority as the primary endpoint. The primary endpoint is always reliable. This ensures that data is not missed if a destination becomes unavailable. 


For example, if you're sending data to the main endpoint and an additional endpoint with `is_reliable: true` and one endpoint becomes unavailable, data continue to flow to the other endpoint. If both endpoints become unavailable, the Agent stops reading and sending data until at least one endpoint recovers. This ensures all data makes it to at least one reliable endpoint.

The `is_reliable` setting defaults to `false`. We recommended you set `is_reliable` to `true`. Unreliable endpoints only send data if at least one reliable endpoint is available. You may define multiple additional endpoints with mixed use of `is_reliable`.

You can add the YAML configuration to your `datadog.yaml` or launch the Agent with the appropriate environment variables.

## Dual shipping in Kubernetes

If you're using the [Datadog Agent Helm chart](https://github.com/DataDog/helm-charts), you must configure these settings with a configmap. In the `values.yaml`, set `useConfigMap: true` 
and add the relevant settings to `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configures a configmap to provide the agent configuration. Use this in combination with the `agents.customAgentConfig` parameter.
  useConfigMap:  true

  # agents.customAgentConfig -- Specify custom contents for the datadog agent config (datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## Note the `agents.useConfigMap` needs to be set to `true` for this parameter to be taken into account.
  customAgentConfig:
    additional_endpoints:
      "https://mydomain.datadoghq.com":
      - apikey2
      - apikey3
      "https://mydomain.datadoghq.eu":
      - apikey4 

    logs_config:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "https://mydomain.datadoghq.com"
        Port: 443
        is_reliable: true
```

If you're using the [Datadog Agent operator](https://github.com/DataDog/datadog-operator) similarly you can set the `agent.customConfig.configData` key. All configurable keys are documented [here](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md).
