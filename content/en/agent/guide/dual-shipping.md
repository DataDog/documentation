---
title: Dual Shipping
kind: guide
---

<div class="alert alert-danger">
Dual shipping can impact billing if you are sending data to multiple Datadog orgs. For more information about the impact of this configuration, contact <a href="/help/">Datadog Support</a>.
</div>

## Overview

If you wish to send data to more than one destination such as a second Datadog org or other internal infrastructure - you can configure the Agent to send data to additional endpoints. Most data sent from the Agent supports multiple endpoints or API keys.


## Agent Metrics

{{< tabs >}}

<!-- Metrics -->

{{% tab "Metrics & Service checks" %}}

### YAML configuration
In `datadog.yaml` 
```yaml
additional_endpoints:
  "https://mydomain.datadoghq.com":
  - apikey2
  - apikey3
  "https://mydomain.datadoghq.eu":
  - apikey4
```

### Environment Variable configuration

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

<!-- APM -->
{{% tab "APM" %}}

### YAML configuration
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'

DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

<!-- Process Agent -->
{{% tab "Process Agent" %}}

### YAML configuration
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}

<!-- Orchestrator -->
{{% tab "Orchestrator" %}}

### YAML configuration
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}
{{% /tabs %}}

You can add the yaml configuration to your `datadog.yaml` or launch the agent with the appropriate environment variables. 
## Logs and Events

{{< tabs >}}

<!-- Logs -->
{{% tab "Logs" %}}

### YAML configuration 
In `datadog.yaml` 
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "https://mydomain.datadoghq.com"
    Port: 443
    is_reliable: true
```

### Environment Variable configuration

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

<!-- Database Monitoring -->
{{% tab "Database Monitoring" %}}

### YAML configuration 
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

<!-- Network Devices -->
{{% tab "Network Devices" %}}

### YAML configuration 
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

<!-- Compliance -->
{{% tab "Compliance" %}}

### YAML configuration 
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}

<!-- Runtime Security -->
{{% tab "Runtime Security" %}}

### YAML configuration 
In `datadog.yaml` 
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

### Environment Variable configuration

```bash
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}
{{% /tabs %}}

**Note**: When using additional endpoints you have to explicitly set `use_http` to tell the Agent component which transport to use. The same transport configuration is shared among all additional endpoints. 

The `is_reliable` setting tells the agent to treat this endpoint with the same priority as the primary endpoint. The primary endpoint is always reliable. `is_reliable` tries to ensure logs are never missed if a destination becomes unavailable. 

For example: If you are sending logs to two reliable endpoints and one becomes unavailable, logs will continue to flow to the second reliable endpoint. If both endpoints becomes unavailable logs will stop flowing until at least one recovers. 

If `is_reliable` is not specified it defaults to `false`. Unreliable endpoints will only send logs if they successfully send to at least one reliable endpoint. You may define multiple additional endpoints with mixed use of `is_reliable`. 
