---
aliases:
- /fr/integrations/faq/gathering-kubernetes-events
- /fr/agent/kubernetes/event_collection
- /fr/agent/kubernetes/configuration
title: Configuration avancée de l'Agent Datadog sur Kubernetes
---

## Présentation

Une fois l'Agent Datadog installé dans votre environnement Kubernetes, d'autres options de configuration sont disponibles.

### Activez Datadog pour recueillir les données suivantes :
- Des [traces (APM)](#activer-apm-et-le-tracing)
- Des [événements Kubernetes](#activer-la-collecte-d-evenements-kubernetes)
- Des [données NPM](#activer-la-collecte-de-donnees-npm)
- Des [logs](#activer-la-collecte-de-logs)
- Des [processus](#activer-la-collecte-de-processus)

### Autres fonctionnalités
- [Agent de cluster Datadog](#agent-de-cluster-datadog)
- [Intégrations](#integrations)
- [Vue des conteneurs](#vue-des-conteneurs)
- [Orchestrator Explorer](#orchestrator-explorer)
- [Serveur de métriques externes](#serveur-de-metriques-custom)

### Configurations supplémentaires
- [Variables d'environnement](#variables-d-environnement)
- [DogStatsD pour les métriques custom](#configurer-dogstatsd)
- [Mappage des tags](#configurer-le-mappage-des-tags)
- [Secrets](#utiliser-des-fichiers-de-secret)
- [Ignorer des conteneurs](#ignorer-des-conteneurs)

## Activer APM et le tracing

Si vous avez installé Kubernetes avec l'Operator Datadog ou avec Helm, **la solution APM est activée par défaut**.

Pour en savoir plus, consultez la section [Collecte de traces APM avec Kubernetes][16].

## Activer la collecte d'événements Kubernetes

Utilisez l'[Agent de cluster Datadog][2] pour recueillir vos événements Kubernetes.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

La collecte d'événements est activée par défaut par l'Operator Datadog. Pour configurer cette fonctionnalité, utilisez le paramètre `features.eventCollection.collectKubernetesEvents` dans votre fichier de configuration `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
    site: <SITE_DATADOG>

  features:
    eventCollection:
      collectKubernetesEvents: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Pour recueillir des événements Kubernetes avec l'Agent de cluster Datadog, assurez-vous que les options `clusterAgent.enabled`, `datadog.collectEvents` et `clusterAgent.rbac.create` sont définies sur `true` dans votre fichier `datadog-values.yaml`.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Si vous ne souhaitez pas utiliser l'Agent de cluster, vous pouvez vous servir d'un Agent de nœud pour recueillir les événements Kubernetes en définissant les options `datadog.leaderElection`, `datadog.collectEvents` et `agents.rbac.create` sur `true` dans votre fichier `datadog-values.yaml`.

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

## Activer la collecte de données NPM

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans votre fichier `datadog-agent.yaml`, définissez `features.npm.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>

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

Modifiez votre fichier `datadog-values.yaml` en indiquant la configuration suivante :

```yaml
datadog:
  # (...)
  networkMonitoring:
    enabled: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <NOM_VERSION> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Network Performance Monitoring][18].

## Activer la collecte de logs

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Dans votre fichier `datadog-agent.yaml`, définissez `features.logCollection.enabled` et `features.logCollection.containerCollectAll` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>

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
Modifiez votre fichier `datadog-values.yaml` en indiquant la configuration suivante :

```yaml
datadog:
  # (...)
  logs:
    enabled: true
    containerCollectAll: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <NOM_VERSION> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Collecte de logs Kubernetes][17].

## Activer la collecte de processus

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Dans votre fichier `datadog-agent.yaml`, définissez `features.liveProcessCollection.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>

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
Modifiez votre fichier `datadog-values.yaml` en indiquant la configuration suivante :

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
    processCollection: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <NOM_VERSION> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la section [Live processes][23].
## Agent de cluster Datadog

L'Agent de cluster Datadog simplifie la collecte de données de surveillance au niveau des clusters grâce à une approche centralisée. Datadog vous recommande fortement d'utiliser l'Agent de cluster pour surveiller Kubernetes.

À partir de la version 1.0.0 de l'Operator Datadog et de la version 2.7.0 du chart Helm, l'**Agent de cluster est activé par défaut**. Aucune configuration supplémentaire n'est requise.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

À partir de la version 1.0.0 de l'Operator Datadog, l'Agent de cluster est activé par défaut. L'Operator crée les autorisations RBAC nécessaires et déploie l'Agent de cluster. Les deux Agents utilisent la même clé d'API.

L'Operator génère automatiquement un token aléatoire dans un `Secret` Kubernetes. Ce token est partagé avec l'Agent Datadog et l'Agent de cluster afin de sécuriser leurs communications.

Vous pouvez spécifier ce token dans le champ `global.clusterAgentToken` de votre fichier `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
  clusterAgentToken: <TOKEN_AGENT_CLUSTER_DATADOG>
```

Il est également possible de spécifier ce token en faisant référence au nom d'un `Secret` existant et au nom de la clé de données contenant ce token :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
  clusterAgentTokenSecret: 
    secretName: <NOM_SECRET>
    keyName: <NOM_CLÉ>
```

**Remarque** : lorsque le token est défini manuellement, il doit être composé de 32 caractères alphanumériques.

Ensuite, appliquez la nouvelle configuration :

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

À partir de la version 2.7.0 du chart Helm, l'Agent de cluster est activé par défaut.

Pour vous assurer que l'Agent de cluster est bien activé, vérifiez que `clusterAgent.enabled` est défini sur `true` dans votre fichier `datadog-values.yaml` :

```yaml
clusterAgent:
  enabled: true
```

Helm génère automatiquement un token aléatoire dans un `Secret` Kubernetes. Ce token est partagé avec l'Agent Datadog et l'Agent de cluster afin de sécuriser leurs communications.

Vous pouvez spécifier ce token dans le champ `clusterAgent.token` de votre fichier `datadog-agent.yaml` :

```yaml
clusterAgent:
  enabled: true
  token: <TOKEN_AGENT_CLUSTER_DATADOG>
```

Il est également possible de spécifier ce token en faisant référence au nom d'un `Secret` existant comportant la clé `token` comportant le token :

```yaml
clusterAgent:
  enabled: true
  tokenExistingSecret: <NOM_SECRET>
```

{{% /tab %}}
{{< /tabs >}}

Pour en savoir plus, consultez la [documentation relative à l'Agent de cluster Datadog][2].

## Serveur de métriques custom

Pour utiliser le [serveur de métriques custom][22] de l'Agent de cluster, vous devez fournir une [clé d'application][24] Datadog et activer le fournisseur de métriques.

{{< tabs >}}
{{% tab "Operator Datadog" %}}
Dans le fichier `datadog-agent.yaml`, spécifiez une clé d'application sous `spec.global.credentials.appKey` et définissez `features.externalMetricsServer.enabled` sur `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>

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
Dans le fichier `datadog-values.yaml`, spécifiez une clé d'application `datadog.appKey` et définissez `clusterAgent.metricsProvider.enabled` sur `true`.

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>

  clusterAgent:
    enabled: true
    metricsProvider:
      enabled: true
```

Mettez ensuite à niveau votre chart Helm :

```shell
helm upgrade -f datadog-values.yaml <NOM_VERSION> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

## Intégrations

Dès lors que votre Agent s'exécute dans votre cluster, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][5] pour recueillir automatiquement des métriques et des logs à partir de vos pods.

## Vue des conteneurs

Pour pouvoir vous servir de la vue [Container Explorer][3] de Datadog, vous devez activer l'Agent de processus. L'Operator Datadog et le chart Helm **activent par défaut l'Agent de processus**. Aucune configuration supplémentaire n'est requise.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

L'Operator Datadog active par défaut l'Agent de processus.

Pour vous assurer que l'Agent de processus est bien activé, vérifiez que `features.liveContainerCollection.enabled` est défini sur `true` dans votre `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
  features:
    liveContainerCollection:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Le chart Helm active par défaut l'Agent de processus.

Pour vous assurer que l'Agent de processus est bien activé, vérifiez que `processAgent.enabled` est défini sur `true` dans votre fichier `datadog-values.yaml` :

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
```

Dans certaines configurations, il arrive que l'Agent de processus et l'Agent de cluster ne parviennent pas à détecter automatiquement un nom de cluster Kubernetes. Lorsque c'est le cas, la fonctionnalité ne démarre pas et l'avertissement suivant s'affiche dans le log de l'Agent de cluster : `Orchestrator explorer enabled but no cluster name set: disabling`. Vous devez alors définir `datadog.clusterName` sur le nom de votre cluster dans le fichier `values.yaml`.

```yaml
datadog:
  #(...)
  clusterName: <NOM_CLUSTER>
  #(...)
  processAgent:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{% /tab %}}
{{< /tabs >}}

Consultez la documentation relative à la [vue des conteneurs][15] pour obtenir des informations supplémentaires.

## Orchestrator Explorer

L'Operator Datadog et le chart Helm **activent par défaut la vue [Orchestrator Explorer][20] de Datadog**. Aucune configuration supplémentaire n'est requise.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

L'Operator Datadog active par défaut l'Orchestrator Explorer.

Pour vous assurer que cette vue est bien activée, vérifiez que le paramètre `features.orchestratorExplorer.enabled` est défini sur `true` dans votre fichier `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Le chart Helm active par défaut l'Orchestrator Explorer.

Pour vous assurer que cette vue est bien activée, vérifiez que le paramètre `orchestratorExplorer.enabled` est défini sur `true` dans votre fichier `datadog-values.yaml` :

```yaml
datadog:
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

Consultez la section [Orchestrator Explorer][21] pour obtenir des informations supplémentaires.

## Variables d'environnement

Les variables d'environnement suivantes servent à configurer l'Agent Datadog.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

| Paramètre (v2alpha1) |  Description |
| --------------------------- | ----------- |
| `global.credentials.apiKey` |  Permet de configurer votre clé d'API Datadog. |
| `global.credentials.apiSecret.secretName` | Au lieu d'utiliser `global.credentials.apiKey`, spécifiez le nom d'un `Secret` Kubernetes contenant votre clé d'API Datadog.|
| `global.credentials.apiSecret.keyName` | Au lieu d'utiliser `global.credentials.apiKey`, spécifiez la clé du `Secret` Kubernetes fourni dans `global.credentials.apiSecret.secretName`.|
| `global.credentials.appKey` |  Permet de configurer votre clé d'application Datadog. Si vous utilisez le serveur de métriques externes, vous devez définir une clé d'application Datadog afin de pouvoir consulter vos métriques. |
| `global.credentials.appSecret.secretName` | Au lieu d'utiliser `global.credentials.apiKey`, spécifiez le nom d'un `Secret` Kubernetes contenant votre clé d'application Datadog.|
| `global.credentials.appSecret.keyName` | Au lieu d'utiliser `global.credentials.apiKey`, spécifiez la clé du `Secret` Kubernetes fourni dans `global.credentials.appSecret.secretName`.|
| `global.logLevel` | Définit le niveau de détail de la journalisation. Ce paramètre peut être remplacé par le conteneur. Niveaux de log valides : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`. Valeur par défaut : `info`. |
| `global.registry` | Registre d'images à utiliser pour toutes les images d'Agent. Valeur par défaut : `gcr.io/datadoghq`. |
| `global.site` | Permet de définir le [site d'admission][1] Datadog vers lequel les données de l'Agent sont envoyées. Votre site est {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct). |
| `global.tags` | La liste des tags à appliquer à l'ensemble des métriques, événements et checks de service recueillis. |

Pour obtenir la liste complète des variables d'environnements pour l'Operator Datadog, consultez la [spécification v2alpha1 de l'Operator][2]. Pour les versions antérieures, consultez la [spécification v1alpha1 de l'Operator][3].

[1]: /fr/getting_started/
[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[3]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v1alpha1.md
{{% /tab %}}
{{% tab "Helm" %}}
|  Helm | Description |
|  ---- | ----------- |
|  `datadog.apiKey` | Permet de configurer votre clé d'API Datadog. |
| `datadog.apiKeyExistingSecret` | Au lieu d'utiliser `datadog.apiKey`, spécifiez le nom d'un `Secret` Kubernetes existant contenant votre clé API Datadog, qui est définie par la clé `api-key`. |
|  `datadog.appKey` | Permet de configurer votre clé d'application Datadog. Si vous utilisez le serveur de métriques externes, vous devez définir une clé d'application Datadog afin de pouvoir consulter vos métriques. |
| `datadog.appKeyExistingSecret` | Au lieu d'utiliser `datadog.appKey`, spécifiez le nom d'un `Secret` Kubernetes existant contenant votre clé d'application Datadog, qui est définie par la clé `app-key`. |
| `datadog.logLevel` | Définit le niveau de détail de la journalisation. Ce paramètre peut être remplacé par le conteneur. Niveaux de log valides : `trace`, `debug`, `info`, `warn`, `error`, `critical` et `off`. Valeur par défaut : `info`. |
| `registry` | Registre d'images à utiliser pour toutes les images d'Agent. Valeur par défaut : `gcr.io/datadoghq`. |
| `datadog.site` | Permet de définir le [site d'admission][1] Datadog vers lequel les données de l'Agent sont envoyées. Votre site est {{< region-param key="dd_site" code="true" >}} (assurez-vous que le SITE sélectionné à droite est correct). |
| `datadog.tags` | La liste de tags à appliquer à l'ensemble des métriques, événements et checks de services recueillis. |

Pour obtenir la liste complète des variables d'environnement pour le chart Helm, consultez la [liste des options][2] pour le fichier `datadog-values.yaml`.

[1]: /fr/getting_started/site
[2]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog#all-configuration-options
{{% /tab %}}
{{% tab "DaemonSet" %}}
| Variable d'environnement         | Description                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                             |
| `DD_ENV`             | Permet de définir le tag global `env` pour toutes les données générées.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Tags de host séparés par des espaces. Exemple : `simple-tag-0 tag-key-1:tag-value-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Site auquel vos métriques, traces et logs sont envoyés. Votre `DD_SITE` est {{< region-param key="dd_site" code="true">}}. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Paramètre facultatif permettant de remplacer l'URL pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | Alias pour `DD_DD_URL`. Ce paramètre est ignoré si `DD_DD_URL` est déjà défini.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | L'Agent exécute par défaut tous les checks simultanément (par défaut, avec `4` exécuteurs). Pour exécuter les checks de façon séquentielle, définissez la valeur `1`. Si vous devez exécuter un grand nombre de checks (ou des checks lents), le composant `collector-queue` peut prendre du retard et faire échouer le check de santé. Vous pouvez augmenter le nombre d'exécuteurs afin d'exécuter simultanément les checks. |
| `DD_LEADER_ELECTION` | Si plusieurs instances de l'Agent s'exécutent dans votre cluster, définissez cette variable sur `true` pour éviter de dupliquer la collecte d'événements.                                                                                                                                                                                                                         |
{{% /tab %}}
{{< /tabs >}}

## Configurer DogStatsD

DogStatsD peut envoyer des métriques custom via UDP avec le protocole StatsD. **L'Operator Datadog et Helm activent par défaut DogStatsD**. Consultez la [documentation relative à DogStatsD][19] pour en savoir plus.

Les variables d'environnement suivantes servent à configurer DogStatsD avec un DaemonSet :

| Variable d'environnement                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles à calculer pour l'histogramme (séparés par des espaces). Valeur par défaut :  `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : `"max median avg count"`.                                                          |
| `DD_DOGSTATSD_SOCKET`            | Le chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection des conteneurs et le tagging pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Exemple : `"env:golden group:retrievers"`. |

## Configurer le mappage des tags

Datadog recueille automatiquement les principaux tags Kubernetes.

Vous pouvez également mapper les étiquettes de nœud, les étiquettes de pod et les annotations Kubernetes avec des tags Datadog. Les variables d'environnement suivantes servent à configurer ce mappage :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

| Paramètre (v2alpha1) |  Description |
| --------------------------- |  ----------- |
| `global.namespaceLabelsAsTags` |  Permet de mapper les étiquettes d'espace de nommage Kubernetes avec des tags Datadog. Format : `<ÉTIQUETTE_ESPACE_NOMMAGE_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |
| `global.nodeLabelsAsTags` | Permet de mapper les étiquettes de nœud Kubernetes avec des tags Datadog. Format : `<ÉTIQUETTE_NŒUD_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |
| `global.podAnnotationsAsTags` |  Permet de mapper les annotations Kubernetes avec des tags Datadog. Format : `<ANNOTATION_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |
| `global.podLabelsAsTags` |  Permet de mapper les étiquettes Kubernetes avec des tags Datadog. Format : `<ÉTIQUETTE_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |

### Exemples

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
    namespaceLabelsAsTags:
      env: environment
      # <ÉTIQUETTE_ESPACE_NOMMAGE_KUBERNETES>: <CLÉ_TAG_DATADOG>
    nodeLabelsAsTags:
      beta.kubernetes.io/instance-type: aws-instance-type
      kubernetes.io/role: kube_role
      # <ÉTIQUETTE_NŒUD_KUBERNETES>: <CLÉ_TAG_DATADOG>
    podLabelsAsTags:
      app: kube_app
      release: helm_release
      # <ÉTIQUETTE_KUBERNETES>: <CLÉ_TAG_DATADOG>
    podAnnotationsAsTags:
      iam.amazonaws.com/role: kube_iamrole
       # <ANNOTATIONS_KUBERNETES>: <CLÉ_TAG_DATADOG>
```

{{% /tab %}}
{{% tab "Helm" %}}

|  Helm | Description |
| --------------------------- | ----------- |
|  `datadog.namespaceLabelsAsTags` | Permet de mapper les étiquettes d'espace de nommage Kubernetes avec des tags Datadog. Format : `<ÉTIQUETTE_ESPACE_NOMMAGE_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |
|  `datadog.nodeLabelsAsTags` | Permet de mapper les étiquettes de nœud Kubernetes avec des tags Datadog. Format : `<ÉTIQUETTE_NŒUD_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |
|  `datadog.podAnnotationsAsTags` | Permet de mapper les annotations Kubernetes avec des tags Datadog. Format : `<ANNOTATION_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |
|  `datadog.podLabelsAsTags` | Permet de mapper les étiquettes Kubernetes avec des tags Datadog. Format : `<ÉTIQUETTE_KUBERNETES>: <CLÉ_TAG_DATADOG>`. |

### Exemples

```yaml
datadog:
  # (...)
  namespaceLabelsAsTags:
    env: environment
    # <ÉTIQUETTE_ESPACE_NOMMAGE_KUBERNETES>: <CLÉ_TAG_DATADOG>
  nodeLabelsAsTags:
    beta.kubernetes.io/instance-type: aws-instance-type
    kubernetes.io/role: kube_role
    # <ÉTIQUETTE_NŒUD_KUBERNETES>: <CLÉ_TAG_DATADOG>
  podLabelsAsTags:
    app: kube_app
    release: helm_release
    # <ÉTIQUETTE_KUBERNETES>: <CLÉ_TAG_DATADOG>
  podAnnotationsAsTags:
    iam.amazonaws.com/role: kube_iamrole
     # <ANNOTATIONS_KUBERNETES>: <CLÉ_TAG_DATADOG>
```

{{% /tab %}}
{{< /tabs >}}

### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la section [Gestion des secrets][12].

### Ignorer des conteneurs

Vous pouvez exclure des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Ces listes d'inclusion et d'exclusion s'appliquent uniquement à Autodiscovery. Elles n'ont aucun impact sur les traces ni sur DogStatsD. Il est possible d'utiliser des expressions régulières pour les valeurs de ces variables d'environnement.

Consultez la section [Gestion de la découverte de conteneurs][13] pour obtenir des exemples.

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs.

### Paramètres de proxy

Depuis la version 6.4.0 de l'Agent (et 6.5.0 de l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement             | Description                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | URL HTTP à utiliser comme proxy pour les requêtes `http`.                     |
| `DD_PROXY_HTTPS`         | URL HTTPS à utiliser comme proxy pour les requêtes `https`.                   |
| `DD_PROXY_NO_PROXY`      | Liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé.      |
| `DD_SKIP_SSL_VALIDATION` | Option permettant de tester si l'Agent a des difficultés à se connecter à Datadog. |

### Divers

| Variable d'environnement                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"`. Cela n'est plus nécessaire depuis la version 7.35.0. de l'Agent.                                                                                                     |
| `DD_HEALTH_PORT`                    | Définissez cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Définissez un identifiant de cluster Kubernetes personnalisé pour éviter les conflits entre les alias de host. Le nom du cluster peut contenir jusqu'à 40 caractères correspondants à des lettres minuscules, des chiffres et des traits d'union. Il doit également commencer par une lettre et se terminer par un chiffre ou une lettre. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Active la collecte d'événements via l'Agent. Si vous exécutez plusieurs instances de l'Agent dans votre cluster, définissez également `DD_LEADER_ELECTION` sur `true`.                                                                                                                       |

Vous pouvez ajouter d'autres écouteurs et fournisseurs de configuration à l'aide des variables d'environnement `DD_EXTRA_LISTENERS` et `DD_EXTRA_CONFIG_PROVIDERS`. Elles viennent s'ajouter aux variables définies dans les sections `listeners` et `config_providers` du fichier de configuration `datadog.yaml`.

[1]: /fr/agent/
[2]: /fr/containers/cluster_agent/
[3]: https://app.datadoghq.com/containers
[4]: /fr/infrastructure/livecontainers/?tab=helm#configuration
[5]: /fr/containers/kubernetes/integrations/
[6]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[7]: /fr/agent/kubernetes/operator_configuration
[8]: /fr/agent/proxy/#agent-v6
[9]: /fr/developers/dogstatsd/
[10]: /fr/developers/dogstatsd/unix_socket/
[11]: /fr/agent/kubernetes/tag/
[12]: /fr/agent/guide/secrets-management/
[13]: /fr/agent/guide/autodiscovery-management/
[14]: /fr/containers/guide/kubernetes_daemonset#cluster-agent-event-collection
[15]: infrastructure/containers/?tab=datadogoperator
[16]: /fr/containers/kubernetes/apm
[17]: /fr/containers/kubernetes/log
[18]: /fr/network_monitoring/performance/
[19]: /fr/developers/dogstatsd
[20]: https://app.datadoghq.com/orchestration/overview
[21]: /fr/infrastructure/containers/orchestrator_explorer
[22]: /fr/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[23]: /fr/infrastructure/process/ 
[24]: /fr/account_management/api-app-keys/#application-keys