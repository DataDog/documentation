---
aliases:
- /es/agent/guide/dual-shipping
further_reading:
- link: /agent/configuration/network/
  tag: Guía
  text: Tráfico de red
title: Envío doble
---

<div class="alert alert-danger">
El envío doble puede afectar la facturación si estás enviando datos a múltiples organizaciones de Datadog. Para obtener más información sobre cómo afecta esta configuración, contacta con el <a href="/help/">equipo de asistencia de Datadog</a>.
</div>

## Información general

Si quieres enviar datos a más de un destino (p. ej., una segunda organización de Datadog u otra infraestructura interna) puedes configurar el Agent para que envíe datos a endpoints adicionales. Si deseas configurarlo para enviar distintos tipos de datos a varios endpoints o claves de API, utiliza las configuraciones que se indican a continuación.

Para ver una lista de destinos de tráfico de red, consulta [Network Traffic (tráfico de red)][1].

## Métricas y checks de servicio

Puedes añadir la configuración YAML a tu `datadog.yaml` o iniciar el Agent con las variables de entorno adecuadas.

### Configuración YAML

Es necesaria la versión 6.17 o 7.17 del Agent o una posterior.

En `datadog.yaml`:

```yaml
additional_endpoints:
  "https://app.datadoghq.com":
  - apikey2
  - apikey3
  "https://app.datadoghq.eu":
  - apikey4
```

### Configuración de la variable de entorno

Es necesaria la versión 6.18 o 7.18 del Agent o una posterior.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://app.datadoghq.eu\": [\"apikey4\"]}'
```

## APM

### Configuración YAML

Es necesaria la versión 6.7.0 del Agent o una posterior.

En `datadog.yaml`:
```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://trace.agent.datadoghq.com":
    - apikey2
    - apikey3
    "https://trace.agent.datadoghq.eu":
    - apikey4
```

### Configuración de la variable de entorno

Es necesaria la versión 6.19 o 7.19 del Agent o una posterior.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Continuous Profiler

### Configuración YAML

Es necesaria la versión 6.7.0 del Agent o una posterior.

En `datadog.yaml`:

```yaml
apm_config:
  [...]
  profiling_additional_endpoints:
    "https://intake.profile.datadoghq.com/api/v2/profile":
    - apikey2
    - apikey3
    "https://intake.profile.datadoghq.eu/api/v2/profile":
    - apikey4
```

### Configuración de la variable de entorno

Es necesaria la versión 6.19 o 7.19 del Agent o una posterior.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.datadoghq.com/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.datadoghq.eu/api/v2/profile\": [\"apikey4\"]}'
```

**Nota:** Las cargas a endpoints adicionales para el producto Continuous Profiler se realizan mediante el servicio de entrega con el mejor esfuerzo posible.
* El endpoint principal tiene la máxima prioridad. Las cargas a endpoints adicionales solo se gestionan después de que se hayan completado con éxito las cargas al endpoint principal.
* Las respuestas de endpoints adicionales no se reenvían de vuelta al generador de perfiles. Los errores que se producen durante la entrega a endpoints adicionales se registran en los logs de errores del Agent.

## Live Processes

### Configuración YAML

Es necesaria la versión 6.4.0 del Agent o una posterior.

En `datadog.yaml`:
```yaml
process_config:
  [...]
  additional_endpoints:
    "https://process.datadoghq.com":
    - apikey2
    - apikey3
    "https://process.datadoghq.eu":
    - apikey4
```

### Configuración de la variable de entorno

Es necesaria la versión 6.20 o 7.20 del Agent o una posterior.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://process.datadoghq.eu\": [\"apikey4\"]}'
```

## Métricas de Cluster Agent

Configurar el Agent para enviar métricas de Cluster Agent, como Centro de métricas de estado de Kubernetes, a endpoints adicionales.

### Configuración de HELM
En `valores.yaml` de Datadog:
```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.datadoghq.com": ["apikey2"]}'
```
### Proveedor de métricas de Cluster Agent

Para asegurar que el autoescalado es resistente a fallos, configura el Cluster Agent para ejecutar tus consultas de métricas para el HPA contra tus múltiples regiones de Datadog con datos de doble envío. Configura el manifiesto de Cluster Agent de Datadog con varios endpoints:

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" collapsible="true" >}}
external_metrics_provider:
  endpoints:
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.datadoghq.eu
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.datadoghq.com
{{< /code-block >}}

## Orquestador

### Configuración de HELM
En `valores.yaml` de Datadog:
```yaml
agents:
  customAgentConfig:
    process_config:
      additional_endpoints:
        "https://process.datadoghq.com":
        - apikey2
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.datadoghq.com":
        - apikey2 

clusterAgent:
...
  datadog_cluster_yaml:
    orchestrator_explorer:
      orchestrator_additional_endpoints:
        "https://orchestrator.ddog-gov.com":
        - apikey2 
```


### Configuración de la variable de entorno

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.datadoghq.eu\": [\"apikey4\"]}'
```

## CI Visibility

### Configuración YAML

Es necesaria la versión 6.38 o 7.38 del Agent o una posterior.

En `datadog.yaml`:
```yaml
evp_proxy_config:
  [...]
  additional_endpoints:
    "https://<VERSION>-app.agent.datadoghq.com":
    - apikey2
    - apikey3
    "https://<VERSION>-app.agent.datadoghq.eu":
    - apikey4
```

### Configuración de la variable de entorno

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Logs

TCP necesita la versión 6.6 del Agent o una posterior.<br/>
HTTPS necesita la versión 6.13 del Agent o una posterior.

### Configuración YAML
En `datadog.yaml`:
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.datadoghq.com"
    Port: 443
    is_reliable: true
```

### Configuración de la variable de entorno

Es necesaria la versión 6.18 o 7.18 del Agent o una posterior.

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Monitorización de base de datos

### Configuración YAML

Es necesaria la versión 6.29 o 7.29 del Agent o una posterior.

En `datadog.yaml`:
```yaml
database_monitoring:
  samples:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  activity:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbquery-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  metrics:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Configuración de la variable de entorno

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Dispositivos de red

### Configuración YAML

Es necesaria la versión 6.29 o 7.29 del Agent o una posterior.

En `datadog.yaml`:
```yaml
network_devices:
  metadata:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "ndm-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  snmp_traps:
    forwarder:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.datadoghq.com"
        Port: 443
        is_reliable: true
  netflow:
    forwarder:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.datadoghq.com"
        Port: 443
        is_reliable: true
```

### Configuración de la variable de entorno

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Errores en la gestión de la seguridad en la nube

### Configuración YAML

En `datadog.yaml`:
```yaml
compliance_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.datadoghq.eu"
      Port: 443
      is_reliable: true
```

### Configuración de la variable de entorno

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Amenazas para la gestión de la seguridad en la nube

### Configuración YAML
En `datadog.yaml`:
```yaml
runtime_security_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.datadoghq.eu"
      Port: 443
      is_reliable: true
```

### Configuración de la variable de entorno

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Envío doble en Kubernetes

Si estás utilizando el [Datadog Agent Helm chart][2], debes configurar estos ajustes con un configmap. En `valores.yaml`, configura `useConfigMap: verdadero`
y añade los ajustes pertinentes a `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configures a configmap to provide the agent configuration. Use this in combination with the `agents.customAgentConfig` parameter.
  useConfigMap:  true

  # agents.customAgentConfig -- Specify custom contents for the datadog agent config (datadog.yaml)
  ## ref: https://docs.datadoghq.com/agent/configuration/agent-configuration-files/?tab=agentv6
  ## ref: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## Note the `agents.useConfigMap` needs to be set to `true` for this parameter to be taken into account.
  customAgentConfig:
    additional_endpoints:
      "https://app.datadoghq.com":
      - apikey2
      - apikey3
      "https://app.datadoghq.eu":
      - apikey4

    logs_config:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "{{< region-param key=agent_http_endpoint >}}"
        Port: 443
        is_reliable: true
```

Si utilizas el [Datadog Agent operator (operador de Datadog Agent)][3], también puedes configurar la tecla `agent.customConfig.configData`. Todas las claves configurables están documentadas en [v1][4] y [v2][5].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/network/
[2]: https://github.com/DataDog/helm-charts
[3]: https://github.com/DataDog/datadog-operator
[4]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
[5]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md