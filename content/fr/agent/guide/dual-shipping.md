---
kind: guide
title: Transmission multiple
---

<div class="alert alert-danger">
Si vous envoyez des données à plusieurs organisations Datadog, la fonctionnalité de transmission multiple peut avoir une incidence sur vos coûts. Pour en savoir plus sur les frais supplémentaires engendrés par cette configuration, contactez l'<a href="/help/">assistance Datadog</a>.
</div>

## Présentation

Si vous souhaitez envoyer des données à plusieurs destinations, par exemple à une deuxième organisation Datadog ou à une autre infrastructure interne, vous pouvez configurer l'Agent de façon à envoyer ces données à des endpoints supplémentaires. Les configurations suivantes permettent à l'Agent d'envoyer différents types de données à plusieurs endpoints ou clés d'API.

## Métriques, APM, live processes, orchestrateur et CI Visibility

Vous pouvez ajouter la configuration YAML à votre `datadog.yaml` ou lancer l'Agent avec les variables d'environnement appropriées.

{{< tabs >}}

{{% tab "Métriques et checks de service" %}}

<div class="alert alert-info">Nécessite la version 6.17+ ou 7.17+ de l'Agent</div>

### Configuration YAML
Dans `datadog.yaml` :
```yaml
additional_endpoints:
  "https://app.datadoghq.com":
  - apikey2
  - apikey3
  "https://app.datadoghq.eu":
  - apikey4
```

### Configuration des variables d'environnement

<div class="alert alert-info">Nécessite la version 6.18+ ou 7.18+ de l'Agent</div>

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://app.datadoghq.eu\": [\"apikey4\"]}'
```

{{< /tabs >}}

{{% tab "APM" %}}

<div class="alert alert-info">Nécessite la version 6.7.0+ de l'Agent</div>

### Configuration YAML
Dans `datadog.yaml` :
```yaml
apm_config:
  [...]
  additional_endpoints:
    "https://trace.agent.datadoghq.com":
    - apikey2
    - apikey3
    "https://trace.agent.datadoghq.eu":
    - apikey4

  profiling_additional_endpoints:
    "https://trace.agent.datadoghq.com":
    - apikey2
    - apikey3
    "https://trace.agent.datadoghq.eu":
    - apikey4
```

### Configuration des variables d'environnement

<div class="alert alert-info">Nécessite la version 6.19+ ou 7.19+ de l'Agent</div>

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'

DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'
```

{{< /tabs >}}

{{% tab "Live processes" %}}

<div class="alert alert-info">Nécessite la version 6.4.0+ de l'Agent</div>

### Configuration YAML
Dans `datadog.yaml` :
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

### Configuration des variables d'environnement

<div class="alert alert-info">Nécessite la version 6.20+ ou 7.20+ de l'Agent</div>

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{< /tabs >}}

{{% tab "Orchestrateur" %}}

### Configuration YAML
Dans `datadog.yaml` :
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

### Configuration des variables d'environnement

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{< /tabs >}}

{{% tab "CI Visibility" %}}

<div class="alert alert-info">Nécessite la version 6.38+ ou 7.38+ de l'Agent</div>

### Configuration YAML
Dans `datadog.yaml` :
```yaml
evp_proxy_config:
  [...]
  additional_endpoints:
    "https://mydomain.datadoghq.com":
    - apikey2
    - apikey3
    "https://mydomain.datadoghq.eu":
    - apikey4
```

### Configuration des variables d'environnement

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://mydomain.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://mydomain.datadoghq.eu\": [\"apikey4\"]}'
```

{{% /tab %}}
{{% /tabs %}}

## Logs, Database Monitoring, périphériques réseau, CSPM et Runtime Security

{{< tabs >}}

{{% tab "Logs" %}}

<div class="alert alert-info">Pour TCP, la version 6.6+ de l'Agent est requise.<br/>Pour HTTPS, la version 6.13+ de l'Agent est requise.</div>

### Configuration YAML
Dans `datadog.yaml` :
```yaml
logs_config:
  use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.datadoghq.com"
    Port: 443
    is_reliable: true
```

### Configuration des variables d'environnement

<div class="alert alert-info">Nécessite la version 6.18+ ou 7.18+ de l'Agent</div>

```bash
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{< /tabs >}}

{{% tab "Database Monitoring" %}}

<div class="alert alert-info">Nécessite la version 6.29+ ou 7.29+ de l'Agent</div>

### Configuration YAML
Dans `datadog.yaml` :
```yaml
database_monitoring:
  samples:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  activity:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  metrics:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{< /tabs >}}

{{% tab "Périphériques réseau" %}}

<div class="alert alert-info">Nécessite la version 6.29+ ou 7.29+ de l'Agent</div>

### Configuration YAML

Dans `datadog.yaml` :
```yaml
network_devices:
  metadata:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
  snmp_traps:
    forwarder:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "mydomain.datadoghq.com"
        Port: 443
        is_reliable: true
  netflow:
    forwarder:
      use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "mydomain.datadoghq.com"
        Port: 443
        is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{< /tabs >}}

{{% tab "CSPM" %}}

### Configuration YAML
Dans `datadog.yaml` :
```yaml
​​compliance_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{< /tabs >}}

{{% tab "CWS" %}}

### Configuration YAML
Dans `datadog.yaml` :
```yaml
runtime_security_config:
  endpoints:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "mydomain.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_​​RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"mydomain.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% /tab %}}
{{% /tabs %}}

Pour les données provenant de ces solutions, lors de la configuration des endpoints supplémentaires, vous devez définir explicitement `use_http` afin que l'Agent sache quel transport utiliser. Tous les endpoints supplémentaires partagent la même configuration de transport.

Le paramètre `is_reliable` (disponible depuis la version `7.34.0` de l'Agent) ordonne à l'Agent d'appliquer à l'endpoint supplémentaire la même priorité que celle du principal endpoint. Ce dernier est toujours fiable. Ainsi, en cas d'indisponibilité d'une destination, les données ne sont pas perdues.


Par exemple, si vous envoyez des données au principal endpoint ainsi qu'à un endpoint supplémentaire avec le paramètre `is_reliable: true`, et si l'un des endpoints n'est plus disponible, les données sont tout de même transmises à l'autre endpoint. SI les deux endpoints ne sont plus disponibles, l'Agent arrête de lire et d'envoyer les données jusqu'à ce qu'un endpoint soit à nouveau disponible. Ainsi, toutes les données sont systématiquement transmises au minimum à un endpoint fiable.

Par défaut, le paramètre `is_reliable` est défini sur `true` pour les versions `7.37.0+` de l'Agent. Les endpoints non fiables envoient uniquement des données lorsqu'un ou plusieurs endpoints fiables sont disponibles. Vous pouvez définir plusieurs endpoints supplémentaires en variant les valeurs du paramètre `is_reliable`. Il est toutefois recommandé d'utiliser la valeur par défaut du paramètre `is_reliable`.

Vous pouvez ajouter la configuration YAML à votre `datadog.yaml` ou lancer l'Agent avec les variables d'environnement appropriées.

## Transmission multiple dans Kubernetes

Si vous utilisez le [chart Helm de l'Agent Datadog](https://github.com/DataDog/helm-charts), vous devez configurer ces paramètres avec une configmap. Dans le fichier `values.yaml`, définissez `useConfigMap: true` et ajoutez les paramètres pertinents dans `customAgentConfig`.

```yaml
# agents.useConfigMap -- Configure une configmap afin de fournir la configuration de l'Agent. Utilisez ce paramètre avec le paramètre `agents.customAgentConfig`.
  useConfigMap:  true

  # agents.customAgentConfig -- Spécifie les contenus personnalisés pour la configuration de l'Agent Datadog (datadog.yaml).
  ## Référence : https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6
  ## Référence : https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
  ## Veuillez noter que `agents.useConfigMap` doit être défini sur `true` pour que ce paramètre soit appliqué.
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

Si vous utilisez l'[Operator de l'Agenrt Datadog](https://github.com/DataDog/datadog-operator), vous pouvez définir la clé `agent.customConfig.configData` de façon similaire. La configuration de toutes les clés est expliquée sur [cette page](https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.md) (en anglais).