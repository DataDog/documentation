---
title: Kubernetes
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/kubernetes
  - /fr/agent/basic_agent_usage/kubernetes
  - /fr/tracing/kubernetes/
  - /fr/tracing/setup/kubernetes
  - /fr/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
  - /fr/integrations/faq/gathering-kubernetes-events
  - /fr/agent/kubernetes/event_collection
  - /fr/agent/kubernetes/daemonset_setup
  - /fr/agent/kubernetes/helm
  - /fr/agent/autodiscovery
further_reading:
  - link: agent/kubernetes/log
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/kubernetes/apm
    tag: Documentation
    text: Recueillir les traces de votre application
  - link: /agent/kubernetes/prometheus
    tag: Documentation
    text: Recueillir vos métriques Prometheus
  - link: /agent/kubernetes/integrations
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management
    tag: Documentation
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
  - link: /agent/kubernetes/tag
    tag: Documentation
    text: Attribuer des tags à toutes les données émises par un conteneur
---
## Présentation

Exécutez l'Agent Datadog dans votre cluster Kubernetes en tant que DaemonSet pour commencer à recueillir des métriques, des traces et des logs sur votre cluster et vos applications. Vous pouvez déployer l'Agent à l'aide d'un [chart Helm](?tab=helm) ou directement avec une définition YAML d'objet [DaemonSet](?tab=daemonset).

**Remarque** : les versions 6.0 et ultérieures de l'Agent prennent seulement en charge les versions de Kubernetes ultérieures à 1.7.6. Pour les versions antérieures de Kubernetes, consultez la [section Versions antérieures de Kubernetes][1].

## Installation

{{< tabs >}}
{{% tab "Helm" %}}

Pour installer le chart avec un nom de version `<RELEASE_NAME>` personnalisé (p. ex., `datadog-agent`) :

1. [Installez Helm][1].
2. Téléchargez le [fichier de configuration `values.yaml` Datadog][2].
3. S'il s'agit d'une nouvelle installation, ajoutez le référentiel du Helm Datadog et le référentiel de Helm stable (pour le chart Kube State Metrics) :
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo add stable https://charts.helm.sh/stable
    helm repo update
    ```
4. Récupérez votre clé d'API Datadog à partir des [instructions d'installation de l'Agent][3] et exécutez ce qui suit :

- **Helm v3 et ultérieur**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    Remplacez `<TARGET_SYSTEM>` par le nom de votre système d'exploitation : `linux` ou `windows`.

- **Helm v1 ou v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> datadog/datadog
    ```

Ce chart ajoute l'Agent Datadog à l'ensemble des nœuds dans votre cluster via un DaemonSet. Il peut également déployer le [chart kube-state-metrics][4] et l'utiliser comme source supplémentaire de métriques concernant le cluster. Quelques minutes après l'installation, Datadog commence à transmettre les hosts et les métriques.

Activez ensuite les fonctionnalités Datadog que vous souhaitez utiliser, comme l'[APM][5] ou les [logs][6].

**Remarques** :

- Pour obtenir la liste complète des paramètres disponibles pour le chart Datadog et leurs valeurs par défaut, consultez le [README du référentiel Helm Datadog][7].
- Si Google Container Registry ([gcr.io/datadoghq][8]) n'est pas accessible dans votre région de déploiement, utilisez le registre Docker Hub avec les images [datadog/agent][9] et [datadog/agent-de-cluster][10] et la configuration suivante dans le fichier `values.yaml` :

    ```yaml
    agents:
      image:
        repository: datadog/agent

    clusterAgent:
      image:
        repository: datadog/cluster-agent

    clusterChecksRunner:
      image:
        repository: datadog/agent
    ```

### Mise à niveau depuis le chart v1.x

Le chart Datadog a été réusiné dans la v2.0 afin de regrouper plus logiquement les paramètres du fichier `values.yaml`.

Si vous déployez actuellement un chart antérieur à `v2.0.0`, suivez le [guide de migration][11] (en anglais) afin de mapper vos anciens paramètres avec les nouveaux champs.

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant au fichier `values.yaml` :

```yaml
datadog:
  securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<USER_ID>` correspond à l'UID utilisé pour exécuter l'agent et `<DOCKER_GROUP_ID>` à l'ID du groupe auquel appartient le socket containerd ou docker.

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[5]: /fr/agent/kubernetes/apm?tab=helm
[6]: /fr/agent/kubernetes/log?tab=helm
[7]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog
[8]: https://gcr.io/datadoghq
[9]: https://hub.docker.com/r/datadog/agent
[10]: https://hub.docker.com/r/datadog/cluster-agent
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
{{% /tab %}}
{{% tab "DaemonSet" %}}

Tirez profit des DaemonSets pour déployer l'Agent Datadog sur l'ensemble de vos nœuds (ou sur un nœud donné grâce [aux nodeSelectors][1]).

Pour installer l'Agent Datadog sur votre cluster Kubernetes :

1. **Configurez les autorisations de l'Agent** : si le contrôle d'accès basé sur des rôles (RBAC) est activé pour votre déploiement Kubernetes, configurez les autorisations RBAC pour le compte de service de votre Agent Datadog. Depuis la version 1.6 de Kubernetes, le RBAC est activé par défaut. Créez les ClusterRole, ServiceAccount et ClusterRoleBinding appropriés à l'aide de la commande suivante :

    ```shell
    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrole.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/serviceaccount.yaml"

    kubectl apply -f "https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/rbac/clusterrolebinding.yaml"
    ```

    **Remarque** : ces configurations sont par défaut définies pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `namespace` avant d'appliquer les configurations.

2. **Créez un secret qui contient votre clé d'API Datadog**. Remplacez `<DATADOG_API_KEY>` ci-dessous par [la clé d'API de votre organisation][2]. Ce secret est utilisé dans le manifeste pour déployer l'Agent Datadog.

    ```shell
    kubectl create secret generic datadog-agent --from-literal api-key="<DATADOG_API_KEY>" --namespace="default"
    ```

     **Remarque** : cette opération crée un secret dans l'espace de nommage `default`. SI vous utilisez un espace de nommage personnalisé, modifiez le paramètre `namespace` de la commande avant de l'exécuter.

3. **Créez le manifeste de l'Agent Datadog**. Créez le manifeste `datadog-agent.yaml` à partir de l'un des modèles suivants :

    | Métriques | Logs | APM | Processus | NPM | Linux                  | Windows                 |
    |---------|------|-----|---------|-----|------------------------|-------------------------|
    | X       | X    | X   | X       |     | [Modèle de manifeste][3] | [Modèle de manifeste][4] |
    | X       | X    | X   |         |     | [Modèle de manifeste][5] | [Modèle de manifeste][6] |
    | X       | X    |     |         |     | [Modèle de manifeste][7] | [Modèle de manifeste][8] |
    | X       |      | X   |         |     | [Modèle de manifeste][9] | [Modèle de manifeste][10] |
    |         |      |     |         | X   | [Modèle de manifeste][11] | Aucun modèle             |
    | X       |      |     |         |     | [Modèle de manifeste][12] | [Modèle de manifeste][13] |

     Pour activer toutes les fonctionnalités de collecte de traces, [vous devez suivre plusieurs étapes supplémentaires lors de la configuration des pods de votre application][14]. Consultez également les sections relatives aux [logs][15], à l'[APM][16], aux [processus][17] et à [la fonction Network Performance Monitoring][18] pour découvrir comment activer chacune de ces fonctionnalités.

     **Remarque** : ces manifestes sont par défaut définis pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `metadata.namespace` avant d'appliquer les manifestes.

4. **Définissez votre site Datadog** sur {{< region-param key="dd_site" code="true" >}} en utilisant la variable d'environnement `DD_SITE` dans le manifeste `datadog-agent.yaml`.

5. **Déployez le DaemonSet** avec cette commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

6. **Vérification** : pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez ce qui suit :

    ```shell
    kubectl get daemonset
    ```

     Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs `DESIRED` et `CURRENT` correspondent au nombre de nœuds exécutés dans votre cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

7. **Configurez des métriques Kubernetes State** (facultatif) : téléchargez le [dossier de manifestes Kube-State][19], puis appliquez les manifestes à votre cluster Kubernetes pour recueillir automatiquement des [métriques kube-state][20] :

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```

### Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à votre [modèle de pod][2] :

```yaml
  spec:
    securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<USER_ID>` correspond à l'UID utilisé pour exécuter l'agent et `<DOCKER_GROUP_ID>` à l'ID du groupe auquel appartient le socket containerd ou docker.

[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/yaml/datadog-agent-all-features.yaml
[4]: /resources/yaml/datadog-agent-windows-all-features.yaml
[5]: /resources/yaml/datadog-agent-logs-apm.yaml
[6]: /resources/yaml/datadog-agent-windows-logs-apm.yaml
[7]: /resources/yaml/datadog-agent-logs.yaml
[8]: /resources/yaml/datadog-agent-windows-logs.yaml
[9]: /resources/yaml/datadog-agent-apm.yaml
[10]: /resources/yaml/datadog-agent-windows-apm.yaml
[11]: /resources/yaml/datadog-agent-npm.yaml
[12]: /resources/yaml/datadog-agent-vanilla.yaml
[13]: /resources/yaml/datadog-agent-windows-vanilla.yaml
[14]: /fr/agent/kubernetes/apm/#setup
[15]: /fr/agent/kubernetes/log/
[16]: /fr/agent/kubernetes/apm/
[17]: /fr/infrastructure/process/?tab=kubernetes#installation
[18]: /fr/network_monitoring/performance/setup/
[19]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[20]: /fr/agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{% tab "Operator" %}}

<div class="alert alert-warning">L'Operator Datadog est en bêta publique. Si vous souhaitez nous faire part de vos remarques ou de vos questions, contactez l'<a href="/help">assistance Datadog</a>.</div>

[L'Operator Datadog][1] est une fonctionnalité permettant de déployer l'Agent Datadog sur Kubernetes et OpenShift. L'Operator transmet des données sur le statut, la santé et les erreurs du déploiement dans le statut de sa ressource personnalisée. Ses paramètres de niveau supérieur permettent également de réduire les erreurs de configuration.

## Prérequis

L'utilisation de l'Operator Datadog nécessite les prérequis suivants :

- **Cluster Kubernetes version >= v1.14.X** : les tests ont été réalisés sur les versions >= `1.14.0`. Néanmoins, les versions `>= 1.11.0` devraient également fonctionner. Pour les versions plus anciennes, en raison de la prise en charge limitée de la CRD, il se peut que l'Operator ne fonctionne pas comme prévu.
- [`Helm`][2] pour le déploiement de `datadog-operator`.
- [Interface de ligne de commande `Kubectl`][3] pour l'installation de `datadog-agent`.

## Déployer un Agent avec l'Operator

Pour déployer un Agent Datadog avec l'Operator en un minimum d'étapes, utilisez le chart Helm [`datadog-agent-with-operator`][4].
Voici les étapes à suivre :

1. [Téléchargez le chart][5] :

   ```shell
   curl -Lo datadog-agent-with-operator.tar.gz https://github.com/DataDog/datadog-operator/releases/latest/download/datadog-agent-with-operator.tar.gz
   ```

2. Créez un fichier avec les spécifications de votre Agent. Voici la configuration la plus simple :

   ```yaml
   credentials:
     apiKey: <DATADOG_API_KEY>
     appKey: <DATADOG_APP_KEY>
   agent:
     image:
       name: "gcr.io/datadoghq/agent:latest"
   ```

   Remplacez `<DATADOG_API_KEY>` et `<DATADOG_APP_KEY>` par vos [clés d'API et d'application Datadog][6].

3. Déployez l'Agent Datadog avec le fichier de configuration ci-dessus :
   ```shell
   helm install --set-file agent_spec=/path/to/your/datadog-agent.yaml datadog datadog-agent-with-operator.tar.gz
   ```

## Nettoyage

La commande suivante permet de supprimer toutes les ressources Kubernetes créées par les instructions ci-dessus :

```shell
kubectl delete datadogagent datadog
helm delete datadog
```

Pour en savoir plus sur la configuration de l'Operator, notamment sur l'utilisation de tolérances, consultez le [guide de configuration avancée de l'Operator Datadog][7].

## Sans privilèges

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez le bloc suivant à la [ressource personnalisée Datadog][8] :

```yaml
agent:
  config:
    securityContext:
      runAsUser: <ID_UTILISATEUR>
      supplementalGroups:
        - <ID_GROUPE_DOCKER>
```

`<USER_ID>` correspond à l'UID utilisé pour exécuter l'agent et `<DOCKER_GROUP_ID>` à l'ID du groupe auquel appartient le socket containerd ou Docker.

[1]: https://github.com/DataDog/datadog-operator
[2]: https://helm.sh
[3]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[4]: https://github.com/DataDog/datadog-operator/tree/master/chart/datadog-agent-with-operator
[5]: https://github.com/DataDog/datadog-operator/releases/latest/download/datadog-agent-with-operator.tar.gz
[6]: https://app.datadoghq.com/account/settings#api
[7]: /fr/agent/guide/operator-advanced
[8]: https://github.com/DataDog/datadog-operator/blob/master/docs/configuration.md
{{% /tab %}}
{{< /tabs >}}

## Configuration supplémentaire

### Ressources Kubernetes pour les live containers

L'[Agent Datadog][2] et l'[Agent de cluster][3] peuvent être configurés afin de récupérer des ressources Kubernetes pour des [live containers][4]. Cela vous permet de surveiller l'état de vos pods, déploiements et autres entités Kubernetes dans un espace de nommage ou une zone de disponibilité précise. Il est également possible de consulter les spécifications de ressources pour les échecs de pods d'un déploiement ou encore de mettre en corrélation l'activité d'un nœud avec les logs associés.

Consultez la documentation relative aux [live containers][5] pour obtenir des instructions de configuration ainsi que des informations supplémentaires.

## Collecte d'événements

{{< tabs >}}
{{% tab "Helm" %}}

Définissez les options `datadog.leaderElection`, `datadog.collectEvents` et `agents.rbac.create` sur `true` dans votre fichier `value.yaml` afin d'activer la collecte d'événements Kubernetes.

{{% /tab %}}
{{% tab "DaemonSet" %}}

Si vous souhaitez recueillir des événements à partir de votre cluster Kubernetes, définissez les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` dans le manifeste de votre Agent. Vous pouvez également utiliser le [processus de collecte d'événements de l'Agent de cluster Datadog][1].

[1]: /fr/agent/cluster_agent/event_collection/
{{% /tab %}}
{{% tab "Operator" %}}

Définissez `agent.config.collectEvents` sur `true` dans votre manifeste `datadog-agent.yaml`.

Par exemple :

```
agent:
  config:
    collectEvents: true
```

{{% /tab %}}
{{< /tabs >}}

## Intégrations

Dès lors que votre Agent s'exécute dans votre cluster, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][6] pour recueillir automatiquement des métriques et des logs à partir de vos pods.

## Variables d'environnement

Vous trouverez ci-dessous la liste des variables d'environnement disponibles pour l'Agent Datadog. Si vous souhaitez configurer ces variables avec Helm, consultez la liste complète des options de configuration pour le fichier `datadog-value.yaml` dans le [référentiel helm/charts GitHub][7].

### Options globales

| Variable d'environnement         | Description                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Définit le tag `env` global pour toutes les données émises.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Le site auquel vous transmettez vos métriques, traces et logs. Votre `DD_SITE` est {{< region-param key="dd_site" code="true">}}. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS`   | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard, ce qui entraîne l'échec potentiel du check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |
| `DD_LEADER_ELECTION` | Si vous exécutez plusieurs Agents dans votre cluster, définissez cette variable sur `true` pour éviter de recueillir deux fois chaque événement.                                                                                                                                                                                                                         |

### Paramètres de proxy

Depuis la version 6.4.0 de l'Agent (et 6.5.0 de l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement             | Description                                                            |
|--------------------------|------------------------------------------------------------------------|
| `DD_PROXY_HTTP`          | URL HTTP à utiliser comme proxy pour les requêtes `http`.                     |
| `DD_PROXY_HTTPS`         | URL HTTPS à utiliser comme proxy pour les requêtes `https`.                   |
| `DD_PROXY_NO_PROXY`      | Liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé.      |
| `DD_SKIP_SSL_VALIDATION` | Option permettant de tester si l'Agent a des difficultés à se connecter à Datadog. |

Pour en savoir plus sur les paramètres de proxy, consultez la [documentation relative au proxy de l'Agent v6][8].

### Agents de collecte facultatifs

Par défaut, les Agents de collecte facultatifs sont désactivés pour des raisons de sécurité et de performance. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement                    | Description                                                                                                                                                                                                                                                  |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`                | Active la [collecte de traces][5] via l'Agent de trace.                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`               | Active la [collecte de logs][6] via l'Agent de log.                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED`      | Active la [collecte de live processes][7] via l'Agent de processus. Par défaut, la [vue Live Container][8] est déjà activée si le socket Docker est disponible. Si cette variable d'environnement est définie sur `false`, la [collecte de live processes][7] et la [vue Live Container][8] sont désactivées. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Active la collecte d'événements via l'Agent. Si vous exécutez plusieurs Agents dans votre cluster, définissez également `DD_LEADER_ELECTION` sur `true`.                                                                                                                       |

Pour activer la vue Live Container, assurez-vous d'exécuter l'Agent de processus en ayant défini DD_PROCESS_AGENT_ENABLED sur `true`.

### DogStatsD (métriques custom)

Envoyez des métriques custom avec le [protocole StatsD][9] :

| Variable d'environnement                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles à calculer pour l'histogramme (séparés par des espaces). Valeur par défaut :  `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : « max median avg count ».                                                          |
| `DD_DOGSTATSD_SOCKET`            | Le chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et le tagging pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Par exemple : `["env:golden", "group:retrievers"]`. |

En savoir plus sur l'utilisation de [DogStatsD sur des sockets de domaine Unix][10].

### Tagging

Datadog recueille automatiquement les tags courants à partir de Kubernetes. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                            | Description             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extrait les étiquettes de pod.      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extrait les annotations de pod. |

Consultez la documentation relative à [l'extraction de tags Kubernetes][11] pour en savoir plus.

### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la [documentation sur la gestion des secrets][12].

### Ignorer des conteneurs

Vous pouvez exclure des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Ces listes d'inclusion et d'exclusion s'appliquent uniquement à Autodiscovery. Elles n'ont aucun impact sur les traces ni sur DogStatsD. Il est possible d'utiliser des expressions régulières pour la valeur des variables d'environnement.

| Variable d'environnement    | Description                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_CONTAINER_INCLUDE` | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.  |
| `DD_CONTAINER_EXCLUDE` | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"`, `image:.*`. |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez inclure les métriques.  |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez exclure les métriques. |
| `DD_CONTAINER_INCLUDE_LOGS` | Liste des conteneurs dont vous souhaitez inclure les logs.  |
| `DD_CONTAINER_EXCLUDE_LOGS` | Liste des conteneurs dont vous souhaitez exclure les logs. |
| `DD_AC_INCLUDE` | **Obsolète**. Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.  |
| `DD_AC_EXCLUDE` | **Obsolète**. Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`. |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][13].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

### Divers

| Variable d'environnement                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"`.                                                                                                                                                    |
| `DD_HEALTH_PORT`                    | Définissez cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Définissez un identifiant de cluster Kubernetes personnalisé pour éviter les conflits entre les alias de host. Le nom du cluster peut contenir jusqu'à 40 caractères correspondants à des lettres minuscules, des chiffres et des traits d'union. Il doit également commencer par une lettre et se terminer par un chiffre ou une lettre. |

Vous pouvez ajouter d'autres écouteurs et fournisseurs de configuration à l'aide des variables d'environnement `DD_EXTRA_LISTENERS` et `DD_EXTRA_CONFIG_PROVIDERS`. Elles viennent s'ajouter aux variables définies dans les sections `listeners` et `config_providers` du fichier de configuration `datadog.yaml`.

## Commandes

Consultez le [guide sur les commandes de l'Agent][14] pour découvrir toutes les commandes de l'Agent Docker.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/kubernetes-legacy/
[2]: /fr/agent/
[3]: /fr/agent/cluster_agent/
[4]: https://app.datadoghq.com/containers
[5]: /fr/infrastructure/livecontainers/?tab=helm#configuration
[6]: /fr/agent/kubernetes/integrations/
[7]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[8]: /fr/agent/proxy/#agent-v6
[9]: /fr/developers/dogstatsd/
[10]: /fr/developers/dogstatsd/unix_socket/
[11]: /fr/agent/kubernetes/tag/
[12]: /fr/security/agent/#secrets-management
[13]: /fr/agent/guide/autodiscovery-management/
[14]: /fr/agent/guide/agent-commands/