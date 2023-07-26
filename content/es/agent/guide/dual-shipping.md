---
further_reading:
- link: /agent/guide/network/
  tag: Guía
  text: Tráfico de red
kind: guía
title: Envío doble
---

<div class="alert alert-danger">
El envío doble puede afectar la facturación si estás enviando datos a múltiples organizaciones de Datadog. Para obtener más información sobre cómo afecta esta configuración, contacta con el <a href="/help/">equipo de asistencia de Datadog</a>.
</div>

## Información general

Si quieres enviar datos a más de un destino (p. ej., una segunda organización de Datadog u otra infraestructura interna) puedes configurar el Agent para que envíe datos a otros endpoints. Si deseas configurarlo para enviar distintos tipos de datos a varios endpoints o claves de API, utiliza las configuraciones que se indican a continuación.

Para ver una lista de destinos de tráfico de red, consulta [Tráfico de red][1].

## Métricas y checks de servicio

Puedes añadir la configuración YAML a tu `datadog.yaml` o inicar el Agent con las variables de entorno adecuadas.

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

### Configurar la variable de entorno

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

### Configurar la variable de entorno

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

### Configurar la variable de entorno

Es necesaria la versión 6.19 o 7.19 del Agent o una posterior.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.datadoghq.com/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.datadoghq.eu/api/v2/profile\": [\"apikey4\"]}'
```

**Nota:** Las cargas a endpoints adicionales para el producto Continuous Profiler se realizan mediante el servicio entrega de mejor esfuerzo.
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

### Configurar la variable de entorno

Es necesaria la versión 6.20 o 7.20 del Agent o una posterior.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://process.datadoghq.eu\": [\"apikey4\"]}'
```

## Orquestador

### Configuración YAML
En `datadog.yaml`:
```yaml
orchestrator_explorer:
  [...]
  orchestrator_additional_endpoints:
    "https://orchestrator.datadoghq.com":
    - apikey2
    - apikey3
    "https://orchestrator.datadoghq.eu":
    - apikey4
```

### Configurar la variable de entorno

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

### Configurar la variable de entorno

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Logs

TCP requiere la versión 6.6 del Agent o una posterior.<br/>
HTTPS requiere la versión 6.13 del Agent o una posterior.

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

### Configurar la variable de entorno

Es necesaria la versión 6.18 o 7.18 del Agent o una posterior.

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Monitorización de bases de datos

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

### Configurar la variable de entorno

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

### Configurar la variable de entorno

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Administración de la posición de seguridad en la nube (CSPM)

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

### Configurar la variable de entorno

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Workload Security (CWS)

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

### Configurar la variable de entorno

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Envío doble en Kubernetes

Si estás usando el [Helm chart del Datadog Agent](https://github.com/DataDog/helm-charts), debes configurar estos parámetros con un configmap. En el `values.yaml`, configura `useConfigMap: true`
y añade los parámetros correspondientes a `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configura un configmap para proporcionar la configuración del Agent. Utilízalo en combinación con el parámetro  `agents.customAgentConfig`.
  useConfigMap:  true

  # agents.customAgentConfig -- Especifica contenidos personalizados para la configuración del Datadog Agent (datadog.yaml)
  ## ref. : https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6
  ## ref. : https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## Recuerda que `agents.useConfigMap` debe configurarse como `true` para que este parámetro se tenga en cuenta.
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
        Host: "agent-http-intake.logs.datadoghq.com"
        Port: 443
        is_reliable: true
```

Si estás usando [Datadog Agent Operator][1], también puedes configurar de forma similar la clave `agent.customConfig.configData`. Todas las claves que se pueden configurar se documentan en [v1][2] y [v2][3].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/guide/network/
[1]: https://github.com/DataDog/datadog-operator
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
[3]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md