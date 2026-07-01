---
aliases:
- /fr/cloudprem/ingest_logs/datadog_agent/
description: Configurer l'Agent Datadog pour envoyer des logs à votre déploiement
  CloudPrem
further_reading:
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: Documentation
  text: Intégration Observability Pipelines
- link: /cloudprem/ingest_logs/rest_api/
  tag: Documentation
  text: Intégration via l'API REST
- link: /getting_started/containers/datadog_operator/
  tag: Documentation
  text: Guide de Datadog Operator
title: Envoyer des logs à CloudPrem avec l'Agent Datadog
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation
Ce document fournit les étapes de configuration pour utiliser l'Agent Datadog afin d'envoyer des logs vers un déploiement Datadog CloudPrem. Contrairement à la plateforme Datadog SaaS, CloudPrem nécessite des configurations spécifiques de l'Agent pour s'assurer que les logs sont enrichis avec les tags au niveau du host et envoyés au bon endpoint. Ce guide explique comment définir ces configurations pour les méthodes de déploiement les plus courantes.

## Prérequis
Pour envoyer des logs avec l'Agent Datadog vers CloudPrem, vous devez configurer deux variables d'environnement :

`DD_LOGS_CONFIG_LOGS_DD_URL`
: Définissez cette variable sur votre endpoint d'indexation CloudPrem, généralement `http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280`. Elle indique à l'Agent où envoyer les logs.

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: (Facultatif) Cette variable est facultative mais fortement recommandée. Définissez-la sur une valeur élevée, telle que "100000" (environ 5 ans). Cela garantit que l'Agent ajoute les tags au niveau du host à chaque log qu'il envoie. La plateforme Datadog SaaS enrichit automatiquement les logs avec ces tags après l'ingestion, mais CloudPrem requiert que l'Agent les ajoute en amont.

### Proxy

Si vous avez configuré l'Agent Datadog pour utiliser un proxy et que CloudPrem est hébergé dans votre réseau interne, vous devez configurer le paramètre `no_proxy` afin que l'Agent puisse envoyer des logs directement à CloudPrem sans passer par le proxy.

```yaml
# In the no_proxy section, add the CloudPrem DNS
no_proxy:
 - http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

De plus, vous devez définir `DD_NO_PROXY_NONEXACT_MATCH` sur true. Pour plus de détails, consultez la section [Configuration du proxy de l'Agent Datadog][2].

## Envoyer des logs Kubernetes avec l'opérateur Datadog

Pour déployer l'Agent sur Kubernetes à l'aide de l'opérateur Datadog, suivez le guide [Prise en main de l'opérateur Datadog][1]. Lorsque vous atteignez l'étape 3, utilisez la configuration `datadog-agent.yaml` suivante à la place de l'exemple fourni dans le guide.

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

## Options de configuration

### Configuration du endpoint

L'Agent Datadog peut être configuré pour envoyer des logs à CloudPrem via différents endpoints :

{{% collapse-content title="Internal cluster endpoint" level="h4" expanded=false %}}
Recommandé pour les agents dans le cluster :
```
DD_LOGS_CONFIG_LOGS_DD_URL=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```
{{% /collapse-content %}}

{{% collapse-content title="Internal ingress endpoint" level="h4" expanded=false %}}
Pour les Agents situés en dehors du cluster :
```
DD_LOGS_CONFIG_LOGS_DD_URL=https://cloudprem-internal.your-domain.com
```
{{% /collapse-content %}}

### Configuration supplémentaire de l'Agent

Vous pouvez également configurer des fonctionnalités supplémentaires pour envoyer des métadonnées de cluster à Datadog :

{{% collapse-content title="Collecte de métriques Prometheus" level="h4" expanded=false %}}

```yaml
features:
  prometheusScrape:
    enabled: true
    enableServiceEndpoints: true
```
{{% /collapse-content %}}

{{% collapse-content title="OTLP logs collection" level="h4" expanded=false %}}
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

## Méthodes de déploiement alternatives
Si vous n'utilisez pas l'opérateur Datadog, vous pouvez déployer l'Agent à l'aide de l'une des méthodes courantes suivantes :
### Déploiement via chart Helm

Exécutez la commande suivante pour déployer l'Agent à l'aide du chart Helm, en définissant directement les variables d'environnement spécifiques aux logs.

```shell
helm install datadog-agent datadog/datadog \
  --set datadog.apiKey=<YOUR_API_KEY> \
  --set datadog.logs.enabled=true \
  --set datadog.logs.containerCollectAll=true \
  --set datadog.logsConfigContainerCollectAll=true \
  --set agents.containers.agent.env[0].name=DD_LOGS_CONFIG_LOGS_DD_URL \
  --set agents.containers.agent.env[0].value=http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280
```

### Déploiement via DaemonSet

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

## Vérification
Une fois l'Agent déployé, vous pouvez vérifier que les logs sont correctement envoyés et reçus.

### Vérifier le statut de l'Agent

Utilisez `kubectl exec` pour vérifier le statut de l'Agent et confirmer qu'il est configuré pour envoyer des logs.

```shell
# Check Agent status and logs configuration
kubectl exec -it <datadog-agent-pod> -- agent status | grep -A 10 "Logs Agent"

# Check Agent logs for CloudPrem connection
kubectl logs <datadog-agent-pod> | grep -i cloudprem
```

### Vérifier que les logs sont indexés dans CloudPrem

Exécutez cette commande pour interroger le searcher CloudPrem et vérifier qu'il indexe bien les logs JSON.

```shell
kubectl exec -it <RELEASE_NAME>-searcher-0 -n <NAMESPACE_NAME> -- curl 'http://localhost:7280/api/v1/datadog/search?query='
```

## Dépannage

**L'Agent n'envoie pas de logs** :
- Vérifiez que la variable d'environnement `DD_LOGS_CONFIG_LOGS_DD_URL` est correctement définie.
- Consultez les logs du pod de l'Agent : `kubectl logs <datadog-agent-pod>`
- Assurez-vous que la collecte de logs est activée : `DD_LOGS_ENABLED=true`

**CloudPrem ne reçoit pas de logs** :
- Consultez les logs de l'indexeur CloudPrem : `kubectl logs -n <NAMESPACE_NAME> -l app=<RELEASE_NAME>-indexer`
- Vérifiez la connectivité réseau entre l'Agent et l'indexeur CloudPrem
- Confirmez que le service CloudPrem est en cours d'exécution : `kubectl get pods -n <NAMESPACE_NAME>`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/containers/datadog_operator/#installation-and-deployment
[2]: /fr/agent/configuration/proxy/#proxy-server-setup-examples