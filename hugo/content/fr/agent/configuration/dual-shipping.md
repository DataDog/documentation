---
aliases:
- /fr/agent/guide/dual-shipping
description: Configurez le site Datadog Agent pour qu'il envoie simultanément des
  métriques, des loget des traceà plusieurs organisations Datadog.
further_reading:
- link: /agent/configuration/réseau/
  tag: Guide
  text: Trafic réseau
- link: /observability_pipelines/
  tag: documentation
  text: Envoyer logs à des destinations externes avec Observability Pipelines
title: Transmission multiple
---

<div class="alert alert-warning">
Si vous envoyez des données à plusieurs organisations Datadog, la fonctionnalité de transmission multiple peut avoir une incidence sur vos coûts. Pour en savoir plus sur les frais supplémentaires engendrés par cette configuration, contactez l'<a href="/help/">assistance Datadog</a>.
</div>

## Présentation

Ce document fournit des exemples de configurations de l'Agent pour l'envoi double de différents types de données (par exemple, APM, logs, métriques du Cluster Agent, etc.) vers plusieurs organisations Datadog.

**Remarque** : utilisez [Observability Pipelines][1] si vous souhaitez effectuer un envoi double de logs ou répartir le trafic de logs entre différents fournisseurs de journalisation, stockages cloud ou fournisseurs SIEM.

Pour obtenir une liste complète des destinations du trafic réseau, consultez la section [Trafic réseau][2].

## Métriques et checks de service

Vous pouvez ajouter la configuration YAML à votre `datadog.yaml` ou lancer l'Agent avec les variables d'environnement appropriées.

### Configuration YAML

Nécessite la version >= 6.17 ou 7.17 de l'Agent.

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

Nécessite la version >= 6.18 ou 7.18 de l'Agent.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://app.datadoghq.eu\": [\"apikey4\"]}'
```

## APM

### Configuration YAML

Nécessite la version >= 6.7.0 de l'Agent.

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
```

### Configuration des variables d'environnement

Nécessite la version >= 6.19 ou 7.19 de l'Agent.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Profileur en continu

### Configuration YAML

Nécessite la version >= 6.7.0 de l'Agent.

Dans `datadog.yaml` :

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

### Configuration des variables d'environnement

Nécessite la version >= 6.19 ou 7.19 de l'Agent.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.datadoghq.com/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.datadoghq.eu/api/v2/profile\": [\"apikey4\"]}'
```

**Remarque** : les uploads vers des endpoints supplémentaires pour le produit Continuous Profiler sont effectués via une livraison au mieux.
* L'endpoint principal a la priorité la plus élevée. Les uploads vers des endpoints supplémentaires ne sont gérés qu'après que les uploads vers l'endpoint principal ont été terminés avec succès.
* Les réponses des endpoints supplémentaires ne sont pas renvoyées au profileur. Toutes les erreurs survenues lors de la livraison vers des endpoints supplémentaires sont enregistrées dans les logs d'erreur de l'Agent.

## Live processes

### Configuration YAML

Nécessite la version >= 6.4.0 de l'Agent.

Dans `datadog.yaml` :
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

### Configuration des variables d'environnement

Nécessite la version >= 6.20 ou 7.20 de l'Agent.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://process.datadoghq.eu\": [\"apikey4\"]}'
```

## Métriques de l'Agent de cluster

Configurez l'Agent pour envoyer les métriques de l'Agent de cluster, telles que Kubernetes State Metrics Core, vers des endpoints supplémentaires.

### Configuration HELM
Dans le fichier `values.yaml` de Datadog :
```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.datadoghq.com": ["apikey2"]}'
```
### Fournisseur de métriques de l'Agent de cluster

Pour garantir que l'autoscaling est résilient aux défaillances, configurez l'Agent de cluster pour exécuter vos requêtes de métriques pour le HPA sur vos plusieurs régions Datadog avec des données envoyées en double. Configurez le manifeste de l'Agent de cluster Datadog avec plusieurs endpoints :

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" collapsible="true" >}}
external_metrics_provider:
  endpoints:
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url : https://app.datadoghq.eu
  - api_key: <DATADOG_API_KEY>
    app_key: <DATADOG_APP_KEY>
    url: https://app.datadoghq.com
{{< /code-block >}}

## Orchestrateur

### Configuration HELM
Dans le fichier `values.yaml` de Datadog :
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


### Configuration des variables d'environnement

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.datadoghq.eu\": [\"apikey4\"]}'
```

## CI Visibility

### Configuration YAML

Nécessite l'Agent >= 6.38 ou 7.38.

Dans `datadog.yaml` :
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

### Configuration des variables d'environnement

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.datadoghq.com\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.datadoghq.eu\": [\"apikey4\"]}'
```

## Logs

Utilisez l'Agent si vous souhaitez effectuer un envoi double de logs vers plusieurs organisations Datadog. Utilisez [Observability Pipelines][2] si vous souhaitez envoyer des logs à Datadog et vers des destinations externes.

TCP nécessite la version >= 6.6 de l'Agent.<br/>
HTTPS nécessite la version >= 6.13 de l'Agent.

### Configuration YAML
Dans `datadog.yaml` :
```yaml
logs_config:
  force_use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.datadoghq.com"
    Port: 443
    is_reliable: true
```

### Configuration des variables d'environnement

Nécessite l'Agent >= 6.18 ou 7.18.

```bash
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring

### Configuration YAML

Nécessite l'Agent >= 6.29 ou 7.29.

Dans `datadog.yaml` :
```yaml
database_monitoring:
  samples:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  activity:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbquery-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  metrics:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "dbm-metrics-intake.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_DATABASE_MONITORING_SAMPLES_USE_HTTP=true
DD_DATABASE_MONITORING_SAMPLES_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_ACTIVITY_USE_HTTP=true
DD_DATABASE_MONITORING_ACTIVITY_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbquery-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
DD_DATABASE_MONITORING_METRICS_USE_HTTP=true
DD_DATABASE_MONITORING_METRICS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"dbm-metrics-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Devices

### Configuration YAML

Nécessite l'Agent >= 6.29 ou 7.29.

Dans `datadog.yaml` :
```yaml
network_devices:
  metadata:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "ndm-intake.datadoghq.com"
      Port: 443
      is_reliable: true
  snmp_traps:
    forwarder:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.datadoghq.com"
        Port: 443
        is_reliable: true
  netflow:
    forwarder:
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "ndm-intake.datadoghq.com"
        Port: 443
        is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Chemin réseau

### Configuration YAML

Nécessite l'Agent >= 6.55 ou 7.55.

Dans `datadog.yaml` :
```yaml
network_path:
  forwarder:
    use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "netpath-intake.datadoghq.com"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_NETWORK_PATH_FORWARDER_USE_HTTP=true
DD_NETWORK_PATH_FORWARDER_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"netpath-intake.datadoghq.com\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Misconfigurations

### Configuration YAML

Dans `datadog.yaml` :
```yaml
compliance_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.datadoghq.eu"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Workload Protection

### Configuration YAML
Dans `datadog.yaml` :
```yaml
runtime_security_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      Host: "https://<VERSION>-app.agent.datadoghq.eu"
      Port: 443
      is_reliable: true
```

### Configuration des variables d'environnement

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"https://<VERSION>-app.agent.datadoghq.eu\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Transmission multiple dans Kubernetes

{{< tabs >}} {{% tab "Helm" %}}

Si vous utilisez le [chart Helm de l'Agent Datadog][1], vous pouvez configurer ces paramètres avec une configmap. Dans le fichier `values.yaml`, définissez `useConfigMap: true` et ajoutez les paramètres pertinents à `customAgentConfig`. et ajoutez les paramètres appropriés à `customAgentConfig`.

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
      force_use_http: true
      additional_endpoints:
      - api_key: "apiKey2"
        Host: "agent-http-intake.logs.datadoghq.com"
        Port: 443
        is_reliable: true
```

Pour éviter d'exposer votre ou vos clés d'API en clair à l'intérieur de la `ConfigMap`, vous pouvez également utiliser la configuration de variable d'environnement et référencer un secret Kubernetes. Voici un exemple pour envoyer des métriques vers une région supplémentaire :

1. Créez un secret Kubernetes avec la valeur de configuration de votre variable d'environnement issue de ce guide :
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.datadoghq.eu": ["apikey4"]}'
    ```
2. Utilisez les [paramètres du chart Helm][2] `datadog.env` ou `datadog.envFrom` pour référencer ce secret dans votre configuration :
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

Si vous utilisez l'[opérateur de l'Agent Datadog][1], vous pouvez définir la clé de [remplacement][2] `[key].customConfigurations.[key].configData` pour définir ces paramètres. L'exemple ci-dessous remplace le fichier de configuration `datadog.yaml` du node Agent pour envoyer des métriques et des logs vers des régions supplémentaires.

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
          configData: |-
            additional_endpoints:
              "https://app.datadoghq.com":
              - apikey2
              - apikey3
              "https://app.datadoghq.eu":
              - apikey4
            logs_config:
              force_use_http: true
              additional_endpoints:
              - api_key: "apiKey2"
                Host: "agent-http-intake.logs.datadoghq.com"
                Port: 443
                is_reliable: true
```

Pour éviter d'exposer votre ou vos clés d'API en clair à l'intérieur de la `ConfigMap`, vous pouvez également utiliser la configuration de variable d'environnement et référencer un secret Kubernetes. Voici un exemple pour envoyer des métriques vers une région supplémentaire :

1. Créez un secret Kubernetes avec la valeur de configuration de votre variable d'environnement issue de ce guide :
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.datadoghq.eu": ["apikey4"]}'
    ```
2. Utilisez le paramètre `[key].env` pour référencer ce secret dans votre configuration :
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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/
[2]: /fr/agent/configuration/network/