---
aliases:
- /fr/agent/guide/dual-shipping
description: Configurez le Datadog Agent pour envoyer simultanément des métriques,
  des logs et des traces vers plusieurs organisations Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT
- link: /agent/configuration/network/
  tag: Guide
  text: Trafic réseau
- link: /observability_pipelines/
  tag: Documentation
  text: Envoyez des logs vers des destinations externes avec Observability Pipelines
title: Transmission multiple
---
<div class="alert alert-warning">
Le double envoi peut avoir une incidence sur la facturation si vous envoyez des données vers plusieurs organisations Datadog. Pour en savoir plus sur l'impact de cette configuration, contactez <a href="/help/">Datadog Support</a>.
</div>

## Présentation {#overview}

Ce guide fournit des exemples de configurations d'Agent pour le double envoi de différents types de données (par exemple, APM, logs, métriques du Cluster Agent) vers plusieurs organisations et sites Datadog. Pour en savoir plus sur les sites Datadog, consultez [Débuter avec les sites Datadog][3].

**Remarque** : utilisez [Observability Pipelines][1] si vous souhaitez effectuer un double envoi de logs ou répartir le trafic de logs entre différents fournisseurs de logs, stockages cloud ou fournisseurs SIEM.

Pour obtenir la liste complète des destinations du trafic réseau, consultez [Trafic réseau][2].

## Métriques et checks de service {#metrics-and-service-checks}

Vous pouvez ajouter la configuration YAML à votre `datadog.yaml` ou lancer l'Agent avec les variables d'environnement appropriées.

### Configuration YAML {#yaml-configuration}

Nécessite l'Agent version >= 6.17 ou 7.17.

Dans `datadog.yaml` :

```yaml
additional_endpoints:
  "https://app.{{< region-param key="dd_site">}}":
  - apikey2
  - apikey3
  "https://app.<DD_SITE>": # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
  - apikey4
```

### Configuration par variable d'environnement {#environment-variable-configuration}

Nécessite l'Agent version >= 6.18 ou 7.18.

```bash
DD_ADDITIONAL_ENDPOINTS='{\"https://app.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://app.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## APM {#apm}

### Configuration YAML {#yaml-configuration-1}

Nécessite l'Agent version >= 6.7.0.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-1}

Nécessite l'Agent version >= 6.19 ou 7.19.

```bash
DD_APM_ADDITIONAL_ENDPOINTS='{\"https://trace.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://trace.agent.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Continuous Profiler {#continuous-profiler}

### Configuration YAML {#yaml-configuration-2}

Nécessite l'Agent version >= 6.7.0.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-2}

Nécessite l'Agent version >= 6.19 ou 7.19.

```bash
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS='{\"https://intake.profile.{{< region-param key="dd_site">}}/api/v2/profile\": [\"apikey2\", \"apikey3\"], \"https://intake.profile.<DD_SITE>/api/v2/profile\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

**Remarque :** Les chargements vers des endpoints supplémentaires pour le produit Continuous Profiler sont effectués via une livraison au mieux.
* L'endpoint principal a la priorité la plus élevée. Les chargements vers des endpoints supplémentaires ne sont traités qu'une fois que les chargements vers l'endpoint principal ont été effectués avec succès.
* Les réponses des endpoints supplémentaires ne sont pas renvoyées vers le profileur. Toute erreur lors de la livraison vers des endpoints supplémentaires est consignée dans les logs d'erreurs de l'Agent.

## Live Processes {#live-processes}

### Configuration YAML {#yaml-configuration-3}

Nécessite la version de l'Agent >= 6.4.0.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-3}

Nécessite la version de l'Agent >= 6.20 ou 7.20.

```bash
DD_PROCESS_ADDITIONAL_ENDPOINTS='{\"https://process.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://process.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
```

## Métriques du Cluster Agent {#cluster-agent-metrics}

Configurez l'Agent pour envoyer les métriques du Cluster Agent, telles que Kubernetes State Metrics Core, vers des endpoints supplémentaires.

### Configuration HELM {#helm-configuration}
Dans Datadog `values.yaml` :

```yaml
clusterAgent:
  env:
    - name: DD_ADDITIONAL_ENDPOINTS
      value: '{"https://app.{{< region-param key="dd_site">}}": ["apikey2"]}'
```
### Fournisseur de métriques du Cluster Agent {#cluster-agent-metrics-provider}

Pour garantir que la mise à l'échelle automatique résiste aux pannes, configurez le Cluster Agent pour exécuter vos requêtes de métriques pour le HPA sur vos multiples régions Datadog avec un double envoi de données. Configurez le manifeste du Datadog Cluster Agent avec plusieurs endpoints :

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

### Configuration HELM {#helm-configuration-1}
Dans Datadog `values.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-4}

```bash
DD_ORCHESTRATOR_EXPLORER_ORCHESTRATOR_ADDITIONAL_ENDPOINTS='{\"https://orchestrator.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://orchestrator.<DD_SITE>\": [\"apikey4\"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, ddog-gov.com).
```

## CI Visibility {#ci-visibility}

### Configuration YAML {#yaml-configuration-4}

Nécessite l'Agent >= 6.38 ou 7.38.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-5}

```bash
DD_EVP_PROXY_CONFIG_ADDITIONAL_ENDPOINTS='{\"https://<VERSION>-app.agent.{{< region-param key="dd_site">}}\": [\"apikey2\", \"apikey3\"], \"https://<VERSION>-app.agent.<DD_SITE>\": [\"apikey4\"]}'  # Replace <VERSION> and <DD_SITE> with your Agent version and Datadog site parameter (for example, 7-38-0 and datadoghq.eu).
```

## Logs {#logs}

Utilisez l'Agent si vous souhaitez effectuer un double envoi de logs vers plusieurs organisations Datadog. Utilisez [Observability Pipelines][2] si vous souhaitez envoyer des logs vers Datadog et des destinations externes.

TCP nécessite l'Agent version >= 6.6.<br/>
HTTPS nécessite l'Agent version >= 6.13.

### Configuration YAML {#yaml-configuration-5}
Dans `datadog.yaml` :

```yaml
logs_config:
  force_use_http: true
  additional_endpoints:
  - api_key: "apiKey2"
    Host: "agent-http-intake.logs.{{< region-param key="dd_site">}}"
    Port: 443
    is_reliable: true
```

### Configuration par variable d'environnement {#environment-variable-configuration-6}

Nécessite l'Agent >= 6.18 ou 7.18.

```bash
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"agent-http-intake.logs.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Database Monitoring {#database-monitoring}

### Configuration YAML {#yaml-configuration-6}

Nécessite l'Agent >= 6.29 ou 7.29.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-7}

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

### Configuration YAML {#yaml-configuration-7}

Nécessite l'Agent >= 6.29 ou 7.29.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-8}

```bash
DD_NETWORK_DEVICES_METADATA_USE_HTTP=true
DD_NETWORK_DEVICES_METADATA_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"ndm-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Network Path {#network-path}

### Configuration YAML {#yaml-configuration-8}

Nécessite l'Agent >= 6.55 ou 7.55.

Dans `datadog.yaml` :

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

### Configuration par variable d'environnement {#environment-variable-configuration-9}

```bash
DD_NETWORK_PATH_FORWARDER_USE_HTTP=true
DD_NETWORK_PATH_FORWARDER_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"Host\": \"netpath-intake.{{< region-param key="dd_site">}}\", \"Port\": 443, \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Cloud Security Misconfigurations {#cloud-security-misconfigurations}

### Configuration YAML {#yaml-configuration-9}

Dans `datadog.yaml` :

```yaml
compliance_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cspm-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### Configuration par variable d'environnement {#environment-variable-configuration-10}

```bash
DD_COMPLIANCE_CONFIG_ENDPOINTS_USE_HTTP=true
DD_COMPLIANCE_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cspm-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Workload Protection {#workload-protection}

### Configuration YAML {#yaml-configuration-10}
Dans `datadog.yaml` :

```yaml
runtime_security_config:
  endpoints:
    force_use_http: true
    additional_endpoints:
    - api_key: "apiKey2"
      host: "cws-intake.{{< region-param key="dd_site">}}.:443"
      is_reliable: true
```

### Configuration par variable d'environnement {#environment-variable-configuration-11}

```bash
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_USE_HTTP=true
DD_RUNTIME_SECURITY_CONFIG_ENDPOINTS_ADDITIONAL_ENDPOINTS="[{\"api_key\": \"apiKey2\", \"host\": \"cws-intake.{{< region-param key="dd_site">}}.:443\", \"is_reliable\": true}]"
```

{{% agent-dual-shipping %}}

## Double envoi dans Kubernetes {#dual-shipping-in-kubernetes}

{{< tabs >}} {{% tab "Helm" %}}

Si vous utilisez le [Datadog Agent Helm chart][1], vous pouvez configurer ces paramètres avec une configmap. Dans le `values.yaml`, définissez `useConfigMap: true`
et ajoutez les paramètres pertinents à `customAgentConfig`.

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

Pour éviter d'exposer votre ou vos clés d'API en texte clair dans le `ConfigMap`, vous pouvez également utiliser la configuration par variable d'environnement et référencer un secret Kubernetes. Voici un exemple pour envoyer des métriques vers une région supplémentaire :

1. Créez un secret Kubernetes avec la valeur de configuration de votre variable d'environnement à partir de ce guide :
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}' # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
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

Si vous utilisez l'[opérateur Datadog Agent][1], vous pouvez définir la clé `[key].customConfigurations.[key].configData` [override][2] pour configurer ces paramètres. L'exemple ci-dessous remplace le fichier de configuration `datadog.yaml` de l'Agent de nœud pour envoyer des métriques et des logs vers des régions supplémentaires.

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

Pour éviter d'exposer votre ou vos clés d'API en texte clair dans le `ConfigMap`, vous pouvez également utiliser la configuration par variable d'environnement et référencer un secret Kubernetes. Voici un exemple pour envoyer des métriques vers une région supplémentaire :

1. Créez un secret Kubernetes avec la valeur de configuration de votre variable d'environnement à partir de ce guide :
    ```bash
    kubectl create -n <DATADOG AGENT NAMESPACE> secret generic dual-shipping --from-literal metrics='{"https://app.<DD_SITE>": ["apikey4"]}'  # Replace <DD_SITE> with your Datadog site parameter (for example, datadoghq.eu).
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

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/
[2]: /fr/agent/configuration/network/
[3]: /fr/getting_started/site/#access-the-datadog-site