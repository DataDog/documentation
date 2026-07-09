---
aliases:
- /fr/integrations/faq/gathering-kubernetes-events
- /fr/agent/kubernetes/event_collection
- /fr/agent/kubernetes/configuration
description: Options de configuration supplémentaires pour APM, journaux, processus,
  événements et autres capacités après l'installation de l'Agent Datadog
title: Configuration avancée de l'Agent Datadog sur Kubernertes
---
## Aperçu {#overview}

Une fois l'Agent Datadog installé dans votre environnement Kubernetes, d'autres options de configuration sont disponibles.

### Activer Datadog pour collecter : {#enable-datadog-to-collect}
- [Traces (APM)](#enable-apm-and-tracing)
- [Événements Kubernetes](#enable-kubernetes-event-collection)
- [CNM](#enable-cnm-collection)
- [Journaux](#enable-log-collection)
- [Processus](#enable-process-collection)

### Autres capacités {#other-capabilities}
- [Datadog Cluster Agent](#datadog-cluster-agent)
- [Intégrations](#integrations)
- [Vue des conteneurs](#containers-view)
- [Orchestrator Explorer](#orchestrator-explorer)
- [Serveur de métriques externes](#custom-metrics-server)

### Plus de configurations {#more-configurations}
- [Variables d'environnement](#environment-variables)
- [DogStatsD pour des métriques personnalisées](#configure-dogstatsd)
- [Mappage des étiquettes](#configure-tag-mapping)
- [Secrets](#using-secret-files)
- [Ignorer les conteneurs](#ignore-containers)
- [Délai d'attente du serveur API Kubernetes](#kubernetes-api-server-timeout)
- [Paramètres de proxy](#proxy-settings)
- [Autodécouverte](#autodiscovery)
- [Définir le nom du cluster](#set-cluster-name)
- [Divers](#miscellaneous)

## Activer APM et le traçage {#enable-apm-and-tracing}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Modifiez votre `datadog-agent.yaml` pour définir `features.apm.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Dans Helm, APM est **activé par défaut** via UDS ou un pipe nommé Windows.

Pour vérifier, assurez-vous que `datadog.apm.socketEnabled` est défini sur `true` dans votre `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Collecte de traces APM avec Kubernetes][16].

## Activer la collecte d'événements Kubernetes {#enable-kubernetes-event-collection}

Utilisez l'[Agent de cluster Datadog][2] pour recueillir vos événements Kubernetes. 

{{< tabs >}}
{{% tab "Operator Datadog" %}}

La collecte d'événements est activée par défaut par l'Opérateur Datadog. Cela peut être géré dans la configuration `features.eventCollection.collectKubernetesEvents` de votre `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>

  features:
    eventCollection:
      collectKubernetesEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Pour collecter des événements Kubernetes avec le Datadog Cluster Agent, assurez-vous que les options `clusterAgent.enabled`, `datadog.collectEvents` et `clusterAgent.rbac.create` sont définies sur `true` dans votre fichier `datadog-values.yaml`.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Si vous ne souhaitez pas utiliser le Cluster Agent, vous pouvez toujours avoir un Node Agent collecter des événements Kubernetes en définissant les options `datadog.leaderElection`, `datadog.collectEvents` et `agents.rbac.create` sur `true` dans votre fichier `datadog-values.yaml`.

```yaml
datadog:
  leaderElection: true
  collectEvents: true
agents:
  rbac:
    create: true
```

[1]: /fr/containers/cluster_agent

{{% /tab %}}
{{< /tabs >}}

Pour les configurations reposant sur un DaemonSet, consultez la documentation relative à la [collecte d'événements avec l'Agent de cluster et un Daemonset][14].

## Activer la collecte CNM {#enable-cnm-collection}

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans votre `datadog-agent.yaml`, définissez `features.npm.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    npm:
      enabled: true
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Mettez à jour votre `datadog-values.yaml` avec la configuration suivante :

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations, voir [Cloud Network Monitoring][18].

## Activer la collecte de journaux {#enable-log-collection}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Dans votre `datadog-agent.yaml`, définissez `features.logCollection.enabled` et `features.logCollection.containerCollectAll` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    logCollection:
      enabled: true
      containerCollectAll: true
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Mettez à jour votre `datadog-values.yaml` avec la configuration suivante :

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Collecte de logs Kubernetes][17].

## Activer la collecte de processus {#enable-process-collection}

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Dans votre `datadog-agent.yaml`, définissez `features.liveProcessCollection.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    liveProcessCollection:
      enabled: true
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Mettez à jour votre `datadog-values.yaml` avec la configuration suivante :

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Live processes][23].
## Datadog Cluster Agent{#datadog-cluster-agent}

Le Datadog Cluster Agent fournit une approche centralisée et rationalisée pour la collecte des données de surveillance au niveau du cluster. Datadog recommande fortement d'utiliser le Cluster Agent pour surveiller Kubernetes.

L'Opérateur Datadog v1.0.0+ et le graphique Helm v2.7.0+ **activent le Cluster Agent par défaut**. Aucune configuration supplémentaire n'est nécessaire.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

L'Opérateur Datadog v1.0.0+ active le Cluster Agent par défaut. L'Opérateur crée les RBAC nécessaires et déploie le Cluster Agent. Les deux Agents utilisent la même clé API.

L'Opérateur génère automatiquement un jeton aléatoire dans un Kubernetes `Secret` à partager entre le Datadog Agent et le Cluster Agent pour une communication sécurisée. 

Vous pouvez spécifier manuellement ce jeton dans le champ `global.clusterAgentToken` de votre `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
```

Alternativement, vous pouvez spécifier ce jeton en faisant référence au nom d'un `Secret` existant et à la clé de données contenant ce jeton :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentTokenSecret: 
      secretName: <SECRET_NAME>
      keyName: <KEY_NAME>
```

**Remarque** : Lorsqu'il est défini manuellement, ce jeton doit comporter 32 caractères alphanumériques.

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

À partir de la version 2.7.0 du chart Helm, l'Agent de cluster est activé par défaut.

Pour vérification, assurez-vous que `clusterAgent.enabled` est défini sur `true` dans votre `datadog-values.yaml` :

```yaml
clusterAgent:
  enabled: true
```

Helm génère automatiquement un jeton aléatoire dans un Kubernetes `Secret` à partager entre le Datadog Agent et le Cluster Agent pour une communication sécurisée. 

Vous pouvez spécifier manuellement ce jeton dans le champ `clusterAgent.token` de votre `datadog-agent.yaml` :

```yaml
clusterAgent:
  enabled: true
  token: <DATADOG_CLUSTER_AGENT_TOKEN>
```

Alternativement, vous pouvez spécifier ce jeton en faisant référence au nom d'un `Secret` existant, où le jeton se trouve dans une clé nommée `token` :

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <SECRET_NAME>
```

{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la [documentation relative à l'Agent de cluster Datadog][2].

## Serveur de métriques personnalisées {#custom-metrics-server}

Pour utiliser le [serveur de métriques custom][22] de l'Agent de cluster, vous devez fournir une [clé d'application][24] Datadog et activer le fournisseur de métriques.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Dans `datadog-agent.yaml`, fournissez une clé d'application sous `spec.global.credentials.appKey` et définissez `features.externalMetricsServer.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>

  features:
    externalMetricsServer:
      enabled: true
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
Dans `datadog-values.yaml`, fournissez une clé d'application sous `datadog.appKey` et définissez `clusterAgent.metricsProvider.enabled` sur `true`.

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

clusterAgent:
  enabled: true
  metricsProvider:
    enabled: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## Intégrations {#integrations}

Dès lors que votre Agent s'exécute dans votre cluster, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][5] pour recueillir automatiquement des métriques et des logs à partir de vos pods.

## Vue des conteneurs {#containers-view}

Pour utiliser le [Container Explorer][3] de Datadog, activez le Process Agent. L'Opérateur Datadog et le graphique Helm **activent le Process Agent par défaut**. Aucune configuration supplémentaire n'est nécessaire.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

L'Operator Datadog active par défaut l'Agent de processus. 

Pour vérification, assurez-vous que `features.liveContainerCollection.enabled` est défini sur `true` dans votre `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
```
Dans certaines configurations, le Process Agent et le Cluster Agent ne peuvent pas détecter automatiquement le nom d'un cluster Kubernetes. Si cela se produit, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le journal du Cluster Agent : `Orchestrator explorer enabled but no cluster name set: disabling`. Dans ce cas, vous devez définir `spec.global.clusterName` sur le nom de votre cluster dans `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Le chart Helm active par défaut l'Agent de processus.

Pour vérification, assurez-vous que `processAgent.enabled` est défini sur `true` dans votre `datadog-values.yaml` :

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

Dans certaines configurations, le Process Agent et le Cluster Agent ne peuvent pas détecter automatiquement le nom d'un cluster Kubernetes. Si cela se produit, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le journal du Cluster Agent : `Orchestrator explorer enabled but no cluster name set: disabling.` Dans ce cas, vous devez définir `datadog.clusterName` sur le nom de votre cluster dans `datadog-values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

Pour les restrictions sur les noms de cluster valides, voir [Set cluster name](#set-cluster-name).

Consultez la documentation relative à la [vue des conteneurs][15] pour obtenir des informations supplémentaires.

## Orchestrator Explorer {#orchestrator-explorer}

L'Opérateur Datadog et le graphique Helm **activent par défaut le [Orchestrator Explorer][20]**. Aucune configuration supplémentaire n'est nécessaire.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

L'Operator Datadog active par défaut l'Orchestrator Explorer. 

Pour vérification, assurez-vous que le paramètre `features.orchestratorExplorer.enabled` est défini sur `true` dans votre `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

Dans certaines configurations, le Process Agent et le Cluster Agent ne peuvent pas détecter automatiquement le nom d'un cluster Kubernetes. Si cela se produit, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le journal du Cluster Agent : `Orchestrator explorer enabled but no cluster name set: disabling`. Dans ce cas, vous devez définir `spec.global.clusterName` sur le nom de votre cluster dans `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```


{{% /tab %}}
{{% tab "Helm" %}}

Le chart Helm active par défaut l'Orchestrator Explorer.

Pour vérification, assurez-vous que le paramètre `orchestratorExplorer.enabled` est défini sur `true` dans votre fichier `datadog-values.yaml` :

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

Dans certaines configurations, le Process Agent et le Cluster Agent ne peuvent pas détecter automatiquement le nom d'un cluster Kubernetes. Si cela se produit, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le journal du Cluster Agent : `Orchestrator explorer enabled but no cluster name set: disabling.` Dans ce cas, vous devez définir `datadog.clusterName` sur le nom de votre cluster dans `values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
  #(...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

Pour les restrictions sur les noms de cluster valides, voir [Set cluster name](#set-cluster-name).

Consultez la section [Orchestrator Explorer][21] pour obtenir des informations supplémentaires.

## Configuration de base {#basic-configuration}

Utilisez les champs de configuration suivants pour configurer le Datadog Agent.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

| Paramètre (v2alpha1) |  Description |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Configure votre clé API Datadog. |
| `global.credentials.apiSecret.secretName` | Au lieu de `global.credentials.apiKey`, fournissez le nom d'un `Secret` Kubernetes contenant votre clé API Datadog.|
| `global.credentials.apiSecret.keyName` | Au lieu de `global.credentials.apiKey`, fournissez la clé du `Secret` Kubernetes nommé dans `global.credentials.apiSecret.secretName`.|
| `global.credentials.appKey` |  Configure votre clé d'application Datadog. Si vous utilisez le serveur de métriques externe, vous devez définir une clé d'application Datadog pour un accès en lecture à vos métriques. |
| `global.credentials.appSecret.secretName` | Au lieu de `global.credentials.apiKey`, fournissez le nom d'un `Secret` Kubernetes contenant votre clé d'application Datadog.|
| `global.credentials.appSecret.keyName` | Au lieu de `global.credentials.apiKey`, fournissez la clé du `Secret` Kubernetes nommé dans `global.credentials.appSecret.secretName`.|
| `global.logLevel` | Définit la verbosité des journaux. Cela peut être remplacé par le conteneur. Les niveaux de journal valides sont : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`. Par défaut : `info`. |
| `global.registry` | Registre d'images à utiliser pour toutes les images de l'Agent. Par défaut : `gcr.io/datadoghq`. |
| `global.site` | Définit le Datadog intake site auquel les données de l'Agent sont envoyées. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le SITE correct est sélectionné à droite). |
| `global.tags` | Une liste de balises à attacher à chaque métrique, événement et vérification de service collectés. |

Pour une liste complète des champs de configuration pour l'Opérateur Datadog, voir la [spécification de l'Opérateur v2alpha1][2]. Pour les versions plus anciennes, voir [Migrer les DatadogAgent CRDs vers v2alpha1][3]. Les champs de configuration peuvent également être interrogés en utilisant `kubectl explain datadogagent --recursive`.

[1]: /fr/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: /fr/containers/guide/v2alpha1_migration/
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | Description |
|  ---- | ----------- |
|  `datadog.apiKey` | Configurez votre clé API Datadog. |
| `datadog.apiKeyExistingSecret` | Au lieu de `datadog.apiKey`, fournissez le nom d'un `Secret` Kubernetes existant contenant votre clé API Datadog, définie avec le nom de clé `api-key`. |
|  `datadog.appKey` | Configurez votre clé d'application Datadog. Si vous utilisez le serveur de métriques externe, vous devez définir une clé d'application Datadog pour un accès en lecture à vos métriques. |
| `datadog.appKeyExistingSecret` | Au lieu de `datadog.appKey`, fournissez le nom d'un `Secret` Kubernetes existant contenant votre clé d'application Datadog, définie avec le nom de clé `app-key`. |
| `datadog.logLevel` | Définit la verbosité des journaux. Cela peut être remplacé par le conteneur. Les niveaux de journal valides sont : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`. Par défaut : `info`. |
| `registry` | Registre d'images à utiliser pour toutes les images de l'Agent. Par défaut : `gcr.io/datadoghq`. |
| `datadog.site` | Définit le site d'intake de Datadog [intake site][1] auquel les données de l'Agent sont envoyées. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le SITE correct est sélectionné à droite). |
| `datadog.tags` | Une liste de balises à attacher à chaque métrique, événement et vérification de service collectés. |

Pour une liste complète des variables d'environnement pour le chart Helm, consultez la [liste complète des options][2] pour `datadog-values.yaml`.

[1]: /fr/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| Variable d'environnement         | Description                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Votre clé API Datadog (**requise**)                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Définit la balise globale `env` pour toutes les données émises.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Nom d'hôte à utiliser pour les métriques (si l'autodétection échoue)                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Balises d'hôte séparées par des espaces. Par exemple : `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Site de destination pour vos métriques, traces et journaux. Votre `DD_SITE` est {{< region-param key="dd_site" code="true">}}. Par défaut, c'est `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Paramètre optionnel pour remplacer l'URL pour la soumission des métriques.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | Alias pour `DD_DD_URL`. Ignoré si `DD_DD_URL` est déjà défini.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | L'Agent exécute toutes les vérifications en parallèle par défaut (valeur par défaut = `4` runners). Pour exécuter les vérifications séquentiellement, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de vérifications (ou des vérifications lentes), le composant `collector-queue` pourrait être en retard et échouer le contrôle de santé. Vous pouvez augmenter le nombre de runners pour exécuter des vérifications en parallèle. |
| `DD_LEADER_ELECTION` | Si plusieurs instances de l'Agent s'exécutent dans votre cluster, définissez cette variable sur `true` pour éviter la duplication de la collecte d'événements.                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## Variables d'environnement {#environment-variables}
L'Agent Datadog conteneurisé peut être configuré en utilisant des variables d'environnement. Pour une liste exhaustive des variables d'environnement prises en charge, consultez la section [Variables d'environnement][26] de la documentation de l'Agent Docker.

### Exemples {#examples}
{{< tabs >}}
{{% tab "Operator Datadog" %}}
Lorsque vous utilisez l'Opérateur Datadog, vous pouvez définir des variables d'environnement supplémentaires dans `override` pour un composant avec `[key].env []object`, ou pour un conteneur avec `[key].containers.[key].env []object`. Les clés suivantes sont prises en charge : 

- `nodeAgent`
- `clusterAgent`
- `clusterChecksRunner`

Les paramètres au niveau du conteneur ont la priorité sur tous les paramètres au niveau du composant.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
clusterAgent:
  env:
  - name: <ENV_VAR_NAME>
    value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{% tab "DaemonSet" %}}
Ajoutez des variables d'environnement au DaemonSet ou au Déploiement (pour l'Agent Cluster Datadog).

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

## Configurer DogStatsD {#configure-dogstatsd}

DogStatsD peut envoyer des métriques personnalisées via UDP avec le protocole StatsD. **DogStatsD est activé par défaut par l'Opérateur Datadog et Helm**. Consultez la [documentation de DogStatsD][19] pour plus d'informations.

Les variables d'environnement suivantes servent à configurer DogStatsD avec un DaemonSet :

| Variable d'environnement                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Écoutez les paquets DogStatsD provenant d'autres conteneurs (nécessaire pour envoyer des métriques personnalisées).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les percentiles de l'histogramme à calculer (séparés par des espaces). La valeur par défaut est `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégats de l'histogramme à calculer (séparés par des espaces). La valeur par défaut est `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | Chemin vers le socket Unix à écouter. Doit être dans un `rw` volume monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Activer la détection et le marquage des conteneurs pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Tags supplémentaires à ajouter à toutes les métriques, événements et vérifications de service reçus par ce serveur DogStatsD, par exemple : `"env:golden group:retrievers"`. |

## Configurer le mappage des tags {#configure-tag-mapping}

Datadog recueille automatiquement les principaux tags Kubernetes.

De plus, vous pouvez mapper les étiquettes de nœuds Kubernetes, les étiquettes de pods et les annotations aux tags Datadog. Utilisez les variables d'environnement suivantes pour configurer ce mappage :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

| Paramètre (v2alpha1) |  Description |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Fournissez un mappage des étiquettes de namespace Kubernetes aux tags Datadog. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.nodeLabelsAsTags` | Fournissez un mappage des étiquettes de nœuds Kubernetes aux tags Datadog. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
| `global.podAnnotationsAsTags` |  Fournissez un mappage des annotations Kubernetes aux tags Datadog. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
| `global.podLabelsAsTags` |  Fournissez un mappage des étiquettes Kubernetes aux tags Datadog. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Exemples {#examples-1}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    namespaceLabelsAsTags:
      env: environment
      # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
    nodeLabelsAsTags:
      beta.kubernetes.io/instance-type: aws-instance-type
      kubernetes.io/role: kube_role
      # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
    podLabelsAsTags:
      app: kube_app
      release: helm_release
      # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
    podAnnotationsAsTags:
      iam.amazonaws.com/role: kube_iamrole
       # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{% tab "Helm" %}}

|  Helm | Description |
| --------------------------- | ----------- |
|  `datadog.namespaceLabelsAsTags` | Fournissez un mappage des étiquettes de namespace Kubernetes aux tags Datadog. `<KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.nodeLabelsAsTags` | Fournissez un mappage des étiquettes de nœuds Kubernetes aux tags Datadog. `<KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>` |
|  `datadog.podAnnotationsAsTags` | Fournissez un mappage des annotations Kubernetes aux tags Datadog. `<KUBERNETES_ANNOTATION>: <DATADOG_TAG_KEY>` |
|  `datadog.podLabelsAsTags` | Fournissez un mappage des étiquettes Kubernetes aux tags Datadog. `<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>` |

### Exemples {#examples-2}

```yaml
datadog:
  # (...)
  namespaceLabelsAsTags:
    env: environment
    # <KUBERNETES_NAMESPACE_LABEL>: <DATADOG_TAG_KEY>
  nodeLabelsAsTags:
    beta.kubernetes.io/instance-type: aws-instance-type
    kubernetes.io/role: kube_role
    # <KUBERNETES_NODE_LABEL>: <DATADOG_TAG_KEY>
  podLabelsAsTags:
    app: kube_app
    release: helm_release
    # <KUBERNETES_LABEL>: <DATADOG_TAG_KEY>
  podAnnotationsAsTags:
    iam.amazonaws.com/role: kube_iamrole
     # <KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>
```

{{% /tab %}}
{{< /tabs >}}

## Utilisation des fichiers secrets {#using-secret-files}

Les identifiants d'intégration peuvent être stockés dans des secrets Docker ou Kubernetes et utilisés dans des modèles d'Autodécouverte. Pour plus d'informations, consultez [Gestion des secrets][12].

## Ignorer les conteneurs {#ignore-containers}

Exclure les conteneurs de la collecte des journaux, de la collecte des métriques et de l'Autodécouverte. Datadog exclut par défaut les conteneurs Kubernetes et OpenShift `pause`. Ces listes blanches et noires s'appliquent uniquement à l'Autodécouverte ; les traces et DogStatsD ne sont pas affectés. Ces variables d'environnement prennent en charge les expressions régulières dans leurs valeurs.

Consultez la section [Gestion de la découverte de conteneurs][13] pour obtenir des exemples.

**Remarque** : Les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total` ne sont pas affectées par ces paramètres. Tous les conteneurs sont comptés.

## Délai d'attente du serveur API Kubernetes {#kubernetes-api-server-timeout}

Par défaut, le [Kubernetes State Metrics Core check][25] attend 10 secondes pour une réponse du serveur API Kubernetes. Pour les grands clusters, la demande peut expirer, ce qui entraîne des métriques manquantes.

Vous pouvez éviter cela en définissant la variable d'environnement `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` à une valeur supérieure à la valeur par défaut de 10 secondes.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Mettez à jour votre `datadog-agent.yaml` avec la configuration suivante :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Mettez à jour votre `datadog-values.yaml` avec la configuration suivante :

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

## Paramètres du proxy {#proxy-settings}

À partir de l'Agent v6.4.0 (et v6.5.0 pour l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement             | Description                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | Une URL HTTP à utiliser comme proxy pour les requêtes `http`.                     |
| `DD_PROXY_HTTPS`         | Une URL HTTPS à utiliser comme proxy pour les requêtes `https`.                   |
| `DD_PROXY_NO_PROXY`      | Une liste d'URLs séparées par des espaces pour lesquelles aucun proxy ne doit être utilisé.      |
| `DD_SKIP_SSL_VALIDATION` | Une option pour tester si l'Agent rencontre des problèmes de connexion à Datadog. |

## Définir le nom du cluster {#set-cluster-name}

Certaines fonctionnalités nécessitent que vous définissiez un nom de cluster Kubernetes. Un nom de cluster valide doit être unique et séparé par des points, avec les restrictions suivantes :

- Peut contenir uniquement des lettres minuscules, des chiffres et des tirets
- Doit commencer par une lettre
- La longueur totale est inférieure ou égale à 80 caractères

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Définissez `spec.global.clusterName` comme le nom de votre cluster dans `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}

{{% tab "Helm" %}}
Définissez `datadog.clusterName` comme le nom de votre cluster dans `datadog-values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <YOUR_CLUSTER_NAME>
```
{{% /tab %}}
{{< /tabs >}}

## Autodécouverte {#autodiscovery}

| Variable d'environnement                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Auditeurs d'autodécouverte à exécuter.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DD_EXTRA_LISTENERS`         | Auditeurs d'autodécouverte supplémentaires à exécuter. Ils sont ajoutés en plus des variables définies dans la section `listeners` du fichier de configuration `datadog.yaml`.                                                                                                                                                                                                                                                                                                                                    |
| `DD_CONFIG_PROVIDERS`        | Les fournisseurs que l'Agent doit appeler pour collecter les configurations de vérification. Les fournisseurs disponibles sont : <br>`kubelet` - Gère les modèles intégrés dans les annotations de pod. <br>`docker` - Gère les modèles intégrés dans les étiquettes de conteneur. <br>`clusterchecks` - Récupère les configurations de vérification au niveau du cluster depuis le Cluster Agent. <br>`kube_services` - Surveille les services Kubernetes pour les vérifications de cluster. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Fournisseurs de configuration d'autodécouverte supplémentaires à utiliser. Ils sont ajoutés en plus des variables définies dans la section `config_providers` du fichier de configuration `datadog.yaml`. |

## Divers {#miscellaneous}

| Variable d'environnement                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique de la source du conteneur afin de forcer l'utilisation d'une source unique. par exemple `"docker"`, `"ecs_fargate"`, `"kubelet"`. Cela n'est plus nécessaire depuis la version 7.35.0 de l'Agent.                                                                                                     |
| `DD_HEALTH_PORT`                    | Définissez ceci sur `5555` pour exposer le contrôle de l'état de santé de l'Agent au port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Définissez un identifiant de cluster Kubernetes personnalisé pour éviter les collisions d'alias d'hôte. Le nom du cluster peut comporter jusqu'à 40 caractères avec les restrictions suivantes : lettres minuscules, chiffres et tirets uniquement. Les métriques doivent commencer par une lettre. Doit se terminer par un chiffre ou une lettre. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Activez la collecte d'événements avec l'Agent. Si vous exécutez plusieurs instances de l'Agent dans votre cluster, définissez `DD_LEADER_ELECTION` sur `true` également. |


[1]: /fr/agent/
[2]: /fr/containers/cluster_agent/
[3]: https://app.datadoghq.com/containers
[5]: /fr/containers/kubernetes/integrations/
[12]: /fr/agent/configuration/secrets-management/
[13]: /fr/agent/guide/autodiscovery-management/
[14]: /fr/containers/guide/kubernetes_daemonset#cluster-agent-event-collection
[15]: /fr/infrastructure/containers/
[16]: /fr/containers/kubernetes/apm
[17]: /fr/containers/kubernetes/log
[18]: /fr/network_monitoring/cloud_network_monitoring/
[19]: /fr/extend/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /fr/infrastructure/containers/orchestrator_explorer
[22]: /fr/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /fr/infrastructure/process/ 
[24]: /fr/account_management/api-app-keys/#application-keys
[25]: /fr/integrations/kubernetes_state_core/
[26]: /fr/containers/docker/?tab=standard#environment-variables