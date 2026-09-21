---
aliases:
- /fr/cloudprem/ingest_logs/datadog_agent/
- /fr/cloudprem/ingest/agent/
description: Configurez l'Agent Datadog pour envoyer des logs vers votre déploiement
  BYOC Logs
further_reading:
- link: /byoc-logs/ingest/observability_pipelines/
  tag: Documentation
  text: Intégration Observability Pipelines
- link: /byoc-logs/ingest/api/
  tag: Documentation
  text: Intégration REST API
- link: /getting_started/containers/datadog_operator/
  tag: Documentation
  text: Guide du Datadog Operator
private: true
title: Envoyer des logs vers BYOC Logs avec l'Agent Datadog
---
## Présentation {#overview}
Ce document fournit les étapes de configuration pour utiliser l'Agent Datadog afin d'envoyer des logs vers un déploiement Datadog BYOC (Bring Your Own Cloud) Logs. Contrairement à la plateforme SaaS Datadog, BYOC Logs nécessite des configurations d'Agent spécifiques pour garantir que les logs sont enrichis avec les tags nécessaires au niveau du host et envoyés au bon endpoint. Ce guide explique comment définir ces configurations pour les méthodes de déploiement les plus courantes.

## Exigences clés {#key-requirements}
Pour envoyer des logs avec l'Agent Datadog vers BYOC Logs, vous devez configurer deux variables d'environnement :

`DD_LOGS_CONFIG_LOGS_DD_URL`
: Définissez ceci sur votre endpoint d'indexeur BYOC Logs, généralement `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`. Cela indique à l'Agent où envoyer les logs

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (Facultatif) Il s'agit d'une variable facultative mais fortement recommandée. Définissez-la sur une valeur élevée, comme « 100000 » (environ 5 ans). Cela garantit que l'Agent ajoute des tags au niveau du host à chaque log qu'il envoie. La plateforme SaaS Datadog enrichit automatiquement les logs avec ces tags après l'ingestion, mais BYOC Logs nécessite que l'Agent les ajoute au préalable.

### Proxy {#proxy}

Si vous avez configuré l'Agent Datadog pour utiliser un proxy et que BYOC Logs est hébergé dans votre réseau interne, vous devez configurer le paramètre `no_proxy` afin que l'Agent puisse envoyer les logs directement à BYOC Logs sans passer par le proxy.

```yaml
# In the no_proxy section, add the BYOC Logs DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

De plus, vous devez définir `DD_NO_PROXY_NONEXACT_MATCH` sur true. Pour plus de détails, consultez [Configuration du proxy de l'Agent Datadog][2].

## Envoyez les logs Kubernetes avec le Datadog Operator {#send-kubernetes-logs-with-the-datadog-operator}

Pour déployer l'Agent sur Kubernetes à l'aide du Datadog Operator, suivez le guide [Getting Started with Datadog Operator][1]. Lorsque vous atteignez l'étape 3, utilisez la configuration `datadog-agent.yaml` suivante au lieu de l'exemple fourni dans le guide.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    env:
      - name: DD_LOGS_CONFIG_LOGS_DD_URL
        value: http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
      - name: DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION
        value: "100000"

  features:
    logCollection:
      enabled: true
      containerCollectAll: true

    otlp:
      receiver:
        protocols:
          grpc:
            enabled: true
            endpoint: 0.0.0.0:4417

    prometheusScrape:
      enabled: true
      enableServiceEndpoints: true

```

## Options de configuration {#configuration-options}

### Configuration du endpoint {#endpoint-configuration}

L'Agent Datadog peut être configuré pour envoyer des logs vers BYOC Logs en utilisant différents endpoints :

{{% collapse-content title="Endpoint interne du cluster" level="h4" expanded=false %}}
Recommandé pour les agents au sein du cluster :

```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="Endpoint d'entrée interne" level="h4" expanded=false %}}
Pour les agents en dehors du cluster :

```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### Configuration supplémentaire de l'Agent {#additional-agent-configuration}

Vous pouvez également configurer des fonctionnalités supplémentaires pour envoyer les métadonnées du cluster à Datadog :

{{% collapse-content title="Collecte de métriques Prometheus" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="Collecte de logs OTLP" level="h4" expanded=false %}}
Pour envoyer les logs de l'Agent à Datadog :

```yaml
features:
  otlp:
    receiver:
      protocols:
        grpc:
          enabled: true
          endpoint: 0.0.0.0:4417
```
{{% /collapse-content %}}

## Méthodes de déploiement alternatives {#alternative-deployment-methods}
Si vous n'utilisez pas le Datadog Operator, vous pouvez déployer l'Agent en utilisant l'une de ces méthodes courantes :
### Déploiement par Helm chart {#helm-chart-deployment}

Exécutez la commande suivante pour déployer l'Agent à l'aide du Helm chart, en définissant directement les variables d'environnement spécifiques aux logs.

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### Déploiement par DaemonSet {#daemonset-deployment}

Pour les déploiements personnalisés, définissez la variable d'environnement dans votre DaemonSet :

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
spec:
  template:
    spec:
      containers:
      - name: agent
        image: registry.datadoghq.com/agent:latest
        env:
        - name: DD_API_KEY
          value: <YOUR_API_KEY>
        - name: DD_LOGS_ENABLED
          value: "true"
        - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
          value: "true"
        - name: DD_LOGS_CONFIG_LOGS_DD_URL
          value: "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280"
```

## Vérification {#verification}
Une fois l'Agent déployé, vous pouvez vérifier que les logs sont envoyés et reçus correctement.

### Vérifier le statut de l'Agent {#check-agent-status}

Utilisez `kubectl exec` pour vérifier le statut de l'Agent et confirmer qu'il est configuré pour envoyer des logs.

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for BYOC Logs connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### Vérifier que les journaux sont indexés dans BYOC Logs {#check-logs-are-indexed-in-byoc-logs}

Exécutez cette commande pour interroger le moteur de recherche BYOC Logs et vérifier qu'il indexe les journaux JSON.

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Dépannage {#troubleshooting}

**L'Agent n'envoie pas de journaux** :
- Vérifiez que la variable d'environnement `DD_LOGS_CONFIG_LOGS_DD_URL` est correctement définie
- Vérifiez les logs du pod de l'Agent : `kubectl logs <datadog-agent-pod>`
- Assurez-vous que la collecte de logs est activée : `DD_LOGS_ENABLED=true`

**BYOC Logs ne reçoit pas les journaux** :
- Vérifiez les journaux de l'indexeur BYOC Logs : `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Vérifiez la connectivité réseau entre l'Agent et l'indexeur BYOC Logs
- Confirmez que le service BYOC Logs est en cours d'exécution : `kubectl get pods -n <NAMESPACE_NAME>`

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /fr/agent/configuration/proxy/#proxy-server-setup-examples