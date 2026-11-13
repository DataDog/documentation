---
aliases:
- /es/agent/guide/dual-shipping
description: Configure el Datadog Agent para enviar métricas, registros y trazas a
  múltiples organizaciones de Datadog simultáneamente.
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gobierne su canalización de OpenTelemetry con el gateway DDOT
- link: /agent/configuration/network/
  tag: Guía
  text: Tráfico de red
- link: /observability_pipelines/
  tag: Documentación
  text: Envíe registros a destinos externos con Observability Pipelines
title: Envío doble
---
<div class="alert alert-warning">
El envío doble puede afectar la facturación si está enviando datos a múltiples organizaciones de Datadog. Para obtener más información sobre el impacto de esta configuración, comuníquese con <a href="/help/">Soporte de Datadog</a>.
</div>

## Descripción general {#overview}

Esta guía proporciona ejemplos de configuraciones del Agent para el envío doble de diferentes tipos de datos (por ejemplo, APM, registros, métricas del Clúster Agent) a múltiples organizaciones y sitios de Datadog. Para obtener más información sobre los sitios de Datadog, consulte [Introducción a los sitios de Datadog][3].

**Nota**: Utilice [Observability Pipelines][1] si desea realizar un envío doble de registros o dividir el tráfico de registros entre diferentes proveedores de registro, almacenamientos en la nube o proveedores de SIEM.

Para obtener una lista completa de los destinos del tráfico de red, consulte [Tráfico de red][2].

## Métricas y comprobaciones de servicio {#metrics-and-service-checks}

Puede agregar la configuración YAML a su `datadog.yaml` o iniciar el Agent con las variables de entorno adecuadas.

### Configuración YAML {#yaml-configuration}

Requiere la versión del Agent >= 6.17 o 7.17.

En `datadog.yaml`:

```yaml
additional_endpoints:
  "https://app.{{< region-param key="dd_site">}}":
  - apikey2
  - apikey3
  "https://app.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
  - apikey4
```

### Configuración de variables de entorno {#environment-variable-configuration}

Requiere la versión del Agent >= 6.18 o 7.18.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://app.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## APM {#apm}

### Configuración YAML {#yaml-configuration-1}

Requiere la versión del Agent >= 6.7.0.

En `datadog.yaml`:

```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://trace.agent.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://trace.agent.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    - apikey4
```

### Configuración de variables de entorno {#environment-variable-configuration-1}

Requiere la versión del Agent >= 6.19 o 7.19.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Continuous Profiler {#continuous-profiler}

### Configuración YAML {#yaml-configuration-2}

Requiere la versión del Agent >= 6.7.0.

En `datadog.yaml`:

```yaml
apm_config:
  [...]
  profiling_additional_endpoints:
    "https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile":
    - apikey2
    - apikey3
    "https://intake.profile.<DD_SITE>/api/v2/profile": # Replace "<DD_SITE>" with your Datadog site parameter (for example, datadoghq.eu).
    - apikey4
```

### Configuración de variables de entorno {#environment-variable-configuration-2}

Requiere la versión del Agent >= 6.19 o 7.19.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.<DD_SITE>/api/v2/profile\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

**Nota:** Las cargas a puntos de conexión adicionales para el producto Continuous Profiler se realizan mediante entrega de mejor esfuerzo.
* El punto de conexión principal tiene la prioridad más alta. Las cargas a puntos de conexión adicionales solo se gestionan después de que las cargas al punto de conexión principal se hayan completado correctamente.
* Las respuestas de los puntos de conexión adicionales no se reenvían al profiler. Cualquier error durante la entrega a puntos de conexión adicionales se registra en los registros de errores del Agente.

## Live Processes {#live-processes}

### Configuración YAML {#yaml-configuration-3}

Requiere la versión del Agent >= 6.4.0.

En `datadog.yaml`:

```yaml
process_config:
  [...]
  additional_endpoints:
    "https://process.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://process.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    - apikey4
```

### Configuración de variables de entorno {#environment-variable-configuration-3}

Requiere la versión del Agente >= 6.20 o 7.20.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://process.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Métricas del Cluster Agent {#cluster-agent-metrics}

Configure el Agent para enviar métricas del Cluster Agent, como Kubernetes State Metrics Core, a puntos de conexión adicionales.

### Configuración de HELM {#helm-configuration}
En Datadog `values.yaml`:

```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.{{< region-param key="dd_site">}}": ["apikey2"]}'
```
### Proveedor de métricas del Cluster Agent {#cluster-agent-metrics-provider}

Para garantizar que el escalado automático sea resistente a fallos, configure el Cluster Agent para ejecutar sus consultas de métricas para el HPA en sus múltiples regiones de Datadog con datos enviados por duplicado. Configure el manifiesto del Datadog Cluster Agent con varios puntos de conexión:

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

## Orchestrator {#orchestrator}

### Configuración de HELM {#helm-configuration-1}
En Datadog `values.yaml`:

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
        "https://orchestrator.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, ddog-gov.com).
        - apikey4
```

### Configuración de variables de entorno {#environment-variable-configuration-4}

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, ddog-gov.com).
```

## CI Visibility {#ci-visibility}

### Configuración YAML {#yaml-configuration-4}

Requiere el Agent >= 6.38 o 7.38.

En `datadog.yaml`:

```yaml
evp_proxy_config:
  [...]
  additional_endpoints:
    "https://<VERSION>-app.agent.{{< region-param key="dd_site">}}":
    - apikey2
    - apikey3
    "https://<VERSION>-app.agent.<DD_SITE>":  # Replace <VERSION> and <DD_SITE> with your Agent version and Datadog site parameter (for example, 7-38-0 and datadoghq.eu).
    - apikey4
```

### Configuración de variables de entorno {#environment-variable-configuration-5}

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.<DD_SITE>\": [\"apikey4\"]}'  # Replace <VERSION> and <DD_SITE> with your Agent version and Datadog site parameter (for example, 7-38-0 and datadoghq.eu).
```

## Logs {#logs}

Utilice el Agent si desea enviar registros mediante envío doble a varias organizaciones de Datadog. Utilice [Observability Pipelines][2] si desea enviar registros a Datadog y a destinos externos.

TCP requiere la versión del Agent >= 6.6.<br/>
HTTPS requiere la versión del Agent >= 6.13.

### Configuración YAML {#yaml-configuration-5}
En `datadog.yaml`:

```yaml
logs_config:
  force_use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.{{< region-param key="dd_site">}}"
    Port: 443
    is_reliable: true
```

### Configuración de variables de entorno {#environment-variable-configuration-6}

Requiere el Agent >= 6.18 o 7.18.

```bash
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring {#database-monitoring}

### Configuración YAML {#yaml-configuration-6}

Requiere el Agent >= 6.29 o 7.29.

En `datadog.yaml`:

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

### Configuración de variables de entorno {#environment-variable-configuration-7}

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Devices {#network-devices}

### Configuración YAML {#yaml-configuration-7}

Requiere el Agent >= 6.29 o 7.29.

En `datadog.yaml`:

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

### Configuración de variables de entorno {#environment-variable-configuration-8}

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Path {#network-path}

### Configuración YAML {#yaml-configuration-8}

Requiere Agent >= 6.55 o 7.55.

En `datadog.yaml`:

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

### Configuración de variables de entorno {#environment-variable-configuration-9}

```bash
DD_NETWORK_PATH_FORWARDER_USE_HTTP=true
DD_NETWORK_PATH_FORWARDER_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"netpath-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Misconfigurations {#cloud-security-misconfigurations}

### Configuración YAML {#yaml-configuration-9}

En `datadog.yaml`:

```yaml
compliance_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cspm-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### Configuración de variables de entorno {#environment-variable-configuration-10}

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cspm-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Workload Protection {#workload-protection}

### Configuración YAML {#yaml-configuration-10}
En `datadog.yaml`:

```yaml
runtime_security_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cws-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### Configuración de variables de entorno {#environment-variable-configuration-11}

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cws-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Envío doble en Kubernetes {#dual-shipping-in-kubernetes}

{{< tabs >}} {{% tab "Helm" %}}

Si utiliza el [Datadog Agent Helm chart][1], puede configurar estos ajustes con un configmap. En `values.yaml`, establezca `useConfigMap: true`
y agregue la configuración relevante a `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configures a configmap to provide the agent configuration. Use this in combination with the `agents.customAgentConfig` parameter.
  useConfigMap:  true

  # agents.customAgentConfig -- Specify custom contents for the datadog agent config (datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
  ## Note the `agents.useConfigMap` needs to be set to `true` for this parameter to be taken into account.
  customAgentConfig:
    additional_endpoints:
      "https://app.<DD_SITE>":  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.com).
      - apikey2
      - apikey3
      "https://app.<DD_SITE>":  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
      - apikey4

    logs_config:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "agent-http-intake.logs.<DD_SITE>" # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.com).
        Port: 443
        is_reliable: true
```

Para evitar exponer su(s) clave(s) de API en texto plano dentro del `ConfigMap`, también puede utilizar la configuración de variables de entorno y hacer referencia a un secreto de Kubernetes. Aquí tiene un ejemplo para enviar métricas a una región adicional:

1. Cree un secreto de Kubernetes con el valor de configuración de su variable de entorno de esta guía:
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    ```
2. Utilice los [parámetros del Helm chart][2] `datadog.env` o `datadog.envFrom` para hacer referencia a este secreto en su configuración:
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

Si está utilizando el [operador de Datadog Agent][1], puede establecer la clave `[key].customConfigurations.[key].configData` [override][2] para configurar estos ajustes. El siguiente ejemplo reemplaza el archivo de configuración `datadog.yaml` del node Agent para enviar métricas y registros a regiones adicionales.

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
          ## Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.com (US1) for `apikey2` and `apikey3`, and datadoghq.eu (EU) for `apikey4`).
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

Para evitar exponer su(s) clave(s) de API en texto plano dentro del `ConfigMap`, también puede utilizar la configuración de variables de entorno y hacer referencia a un secreto de Kubernetes. Aquí tiene un ejemplo para enviar métricas a una región adicional:

1. Cree un secreto de Kubernetes con el valor de configuración de su variable de entorno de esta guía:
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}'  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
    ```
2. Utilice el parámetro `[key].env` para hacer referencia a este secreto en su configuración:
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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/
[2]: /es/agent/configuration/network/
[3]: /es/getting_started/site/#access-the-datadog-site