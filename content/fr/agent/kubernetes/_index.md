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
Exécutez l'Agent Datadog directement dans votre cluster Kubernetes pour commencer à recueillir des métriques, des traces et des logs sur votre cluster et vos applications. Vous pouvez déployer l'Agent à l'aide d'un [chart Helm](?tab=helm) ou d'un [DaemonSet](?tab=daemonset).

**Remarque** : les versions 6.0 et ultérieures de l'Agent prennent seulement en charge les versions de Kubernetes ultérieures à 1.7.6. Pour les versions antérieures de Kubernetes, consultez la [section Versions antérieures de Kubernetes][1].

## Installation

{{< tabs >}}
{{% tab "Helm" %}}

Pour installer le chart avec un nom de version `<RELEASE_NAME>` personnalisé (p. ex., `datadog-agent`) :

1. [Installez Helm][1].
2. Téléchargez le [fichier de configuration `values.yaml` Datadog][2].
3. S'il s'agit d'une nouvelle installation, ajoutez le référentiel stable Helm :
    ```bash
    helm repo add stable https://kubernetes-charts.storage.googleapis.com/ && helm repo update
    ```
4. Récupérez votre clé d'API Datadog à partir des [instructions d'installation de l'Agent][3] et exécutez ce qui suit :

- **Helm v3 et ultérieur**

    ```bash
    helm install <RELEASE_NAME> -f values.yaml  --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog --set targetSystem=<TARGET_SYSTEM>
    ```

    Remplacez `<TARGET_SYSTEM>` par le nom de votre système d'exploitation : `linux` ou `windows`.

- **Helm v1 ou v2**

    ```bash
    helm install -f values.yaml --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog
    ```

Ce chart ajoute l'Agent Datadog à l'ensemble des nœuds dans votre cluster via un DaemonSet. Il peut également déployer le [chart kube-state-metrics][4] et l'utiliser comme source supplémentaire de métriques concernant le cluster. Quelques minutes après l'installation, Datadog commence à transmettre les hosts et les métriques.

Activez ensuite les fonctionnalités Datadog que vous souhaitez utiliser, comme l'[APM][5] ou les [logs][6].

**Remarque** : pour obtenir la liste complète des paramètres disponibles pour le chart Datadog et leurs valeurs par défaut, consultez le [README du référentiel Helm Datadog][7].

### Mise à niveau depuis le chart v1.x

Le chart Datadog a été réusiné dans la v2.0 afin de regrouper plus logiquement les paramètres du fichier `values.yaml`.

Si vous déployez actuellement un chart antérieur à `v2.0.0`, suivez le [guide de migration][8] (en anglais) afin de mapper vos anciens paramètres avec les nouveaux champs.


[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[5]: /fr/agent/kubernetes/apm?tab=helm
[6]: /fr/agent/kubernetes/log?tab=helm
[7]: https://github.com/helm/charts/tree/master/stable/datadog
[8]: https://github.com/helm/charts/blob/master/stable/datadog/docs/Migration_1.x_to_2.x.md
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
    kubectl create secret generic datadog-secret --from-literal api-key="<DATADOG_API_KEY>" --namespace="default"
    ```

     **Remarque** : cette opération crée un secret dans l'espace de nommage `default`. SI vous utilisez un espace de nommage personnalisé, modifiez le paramètre `namespace` de la commande avant de l'exécuter.

3. **Créez le manifeste de l'Agent Datadog**. Créez le manifeste `datadog-agent.yaml` à partir de l'un des modèles suivants :

    - [Manifeste avec activation des logs, de l'APM, des processus et de la collecte des métriques][3]
    - [Manifeste avec activation des logs, de l'APM et de la collecte des métriques][4]
    - [Manifeste avec activation des logs et de la collecte des métriques][5]
    - [Manifeste avec activation de l'APM et de la collecte des métriques][6]
    - [Manifeste avec activation de la surveillance des performances réseau][7]
    - [Manifeste de base avec activation de la collecte des métriques uniquement][8]

     Pour activer toutes les fonctionnalités de collecte de traces, [vous devez suivre plusieurs étapes supplémentaires lors de la configuration des pods de votre application][9]. Consultez également les sections relatives aux [logs][10], à l'[APM][11], aux [processus][12] et à la [surveillance des performances réseau][13] pour découvrir comment activer chacune de ces fonctionnalités.

     **Remarque** : ces manifestes sont par défaut définis pour l'espace de nommage `default`. Si vous utilisez un espace de nommage personnalisé, modifiez le paramètre `metadata.namespace` avant d'appliquer les manifestes.

4. **Définissez votre site Datadog** (facultatif). Si vous utilisez le site européen de Datadog, définissez la variable d'environnement `DD_SITE` sur `datadoghq.eu` dans le manifeste `datadog-agent.yaml`.

5. **Déployez le DaemonSet** avec cette commande :

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

6. **Vérification** : pour vérifier que l'Agent Datadog s'exécute dans votre environnement en tant que DaemonSet, exécutez :

    ```shell
    kubectl get daemonset
    ```

     Si l'Agent est déployé, une sortie similaire au texte ci-dessous s'affiche. Les valeurs `DESIRED` et `CURRENT` correspondent au nombre de nœuds exécutés dans votre cluster.

    ```shell
    NAME            DESIRED   CURRENT   READY     UP-TO-DATE   AVAILABLE   NODE SELECTOR   AGE
    datadog-agent   2         2         2         2            2           <none>          10s
    ```

7. **Configurez des métriques Kubernetes State** (facultatif) : téléchargez le [dossier de manifestes Kube-State][14], puis appliquez-les à votre cluster Kubernetes pour recueillir automatiquement des [métriques kube-state][15] :

    ```shell
    kubectl apply -f <NAME_OF_THE_KUBE_STATE_MANIFESTS_FOLDER>
    ```


[1]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#nodeselector
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/yaml/datadog-agent-all-features.yaml
[4]: /resources/yaml/datadog-agent-logs-apm.yaml
[5]: /resources/yaml/datadog-agent-logs.yaml
[6]: /resources/yaml/datadog-agent-apm.yaml
[7]: /resources/yaml/datadog-agent-npm.yaml
[8]: /resources/yaml/datadog-agent-vanilla.yaml
[9]: /fr/agent/kubernetes/apm/#setup
[10]: /fr/agent/kubernetes/log/
[11]: /fr/agent/kubernetes/apm/
[12]: /fr/infrastructure/process/?tab=kubernetes#installation
[13]: /fr/network_performance_monitoring/installation/
[14]: https://github.com/kubernetes/kube-state-metrics/tree/master/examples/standard
[15]: /fr/agent/kubernetes/data_collected/#kube-state-metrics
{{% /tab %}}
{{% tab "Operator" %}}

[L'Operator Datadog][1] est actuellement en bêta publique. Il s'agit d'une fonctionnalité vous permettant de déployer l'Agent Datadog sur Kubernetes et OpenShift. L'Operator transmet des données sur le statut de déploiement, la santé et les erreurs dans le statut de sa ressource personnalisée. Ses paramètres de niveau supérieur permettent également de réduire les erreurs de configuration. Pour commencer à utiliser l'Operator, consultez la [page de présentation][2] dans le [référentiel Datadog Operator][1] ou installez l'Opérator depuis la [page Datadog Operator du site OperatorHub.io][3].

[1]: https://github.com/DataDog/datadog-operator/blob/master/docs/getting_started.md
[2]: https://github.com/DataDog/datadog-operator
[3]: https://operatorhub.io/operator/datadog-operator
{{% /tab %}}
{{< /tabs >}}

## Collecte d'événements

{{< tabs >}}
{{% tab "Helm" %}}

Définissez les options `datadog.leaderElection`, `datadog.collectEvents` et `agents.rbac.create` sur `true` dans votre fichier `value.yaml` afin d'activer la collecte d'événements Kubernetes.

{{% /tab %}}
{{% tab "DaemonSet" %}}

Si vous souhaitez recueillir des événements à partir de votre cluster Kubernetes, définissez les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` dans le manifeste de votre Agent. Vous pouvez également utiliser le [processus de collecte d'événements de l'Agent de cluster Datadog][1]. 

[1]: /fr/agent/cluster_agent/event_collection/
{{% /tab %}}
{{< /tabs >}}


## Intégrations

Dès lors que votre Agent s'exécute dans votre cluster, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][2] pour recueillir automatiquement des métriques et des logs à partir de vos pods.

## Variables d'environnement

Vous trouverez ci-dessous la liste des variables d'environnement disponibles pour l'Agent Datadog. Si vous souhaitez configurer ces variables avec Helm, consultez la liste complète des options de configuration pour le fichier `datadog-value.yaml` dans le [référentiel helm/charts GitHub][3].

### Options globales

| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_API_KEY`       | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_HOSTNAME`      | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | Le site auquel vous transmettez vos métriques, traces et logs. Vous pouvez choisir entre `datadoghq.com` pour le site américain de Datadog et `datadoghq.eu` pour le site européen.                                                                                                                                                                                      |
| `DD_DD_URL`        | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard et renvoyer un échec au check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |
| `DD_LEADER_ELECTION` | Si vous exécutez plusieurs Agents dans votre cluster, définissez cette variable sur `true` pour éviter de recueillir deux fois chaque événement. |

### Paramètres de proxy

À partir de l'Agent v6.4.0 (et v6.5.0 pour l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement        | Description                                                       |
| ------------------- | ----------------------------------------------------------------- |
| `DD_PROXY_HTTP`     | URL HTTP à utiliser comme proxy pour les requêtes `http`.                |
| `DD_PROXY_HTTPS`    | URL HTTPS à utiliser comme proxy pour les requêtes `https`.              |
| `DD_PROXY_NO_PROXY` | Une liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé. |

Pour en savoir plus sur les paramètres de proxy, consultez la [documentation relative au proxy de l'Agent v6][4].

### Agents de collecte facultatifs

Par défaut, les Agents de collecte facultatifs sont désactivés pour des raisons de sécurité et de performance. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement               | Description                                                                                                                                                                                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_APM_ENABLED`           | Active la [collecte de traces][5] via l'Agent de trace.                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`          | Active la [collecte de logs][6] via l'Agent de log.                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED` | Active la [collecte de live processes][7] via l'Agent de processus. Par défaut, la [vue Live Container][8] est déjà activée si le socket Docker est disponible. Si définie sur `false`, la [collecte de live processes][7] et la [vue Live Container][8] sont désactivées. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Active la collecte d'événements via l'Agent. Si vous exécutez plusieurs Agents dans votre cluster, définissez également `DD_LEADER_ELECTION` sur `true`. |

### DogStatsD (métriques custom)

Envoyez des métriques custom avec le [protocole StatsD][9] :

| Variable d'environnement                     | Description                                                                                                                                                |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles de l'histogramme à calculer (séparés par des espaces). Valeur par défaut :  `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : « max median avg count ».                                                          |
| `DD_DOGSTATSD_SOCKET`            | Le chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et l'ajout de tags pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Par exemple : `["env:golden", "group:retrievers"]`. |

En savoir plus sur l'utilisation de [DogStatsD sur des sockets de domaine Unix][10].

### Tagging

Datadog recueille automatiquement les tags courants à partir de Kubernetes. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                            | Description             |
| --------------------------------------- | ----------------------- |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extrait les étiquettes de pod.      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extrait les annotations de pod. |

Consultez la documentation relative à [l'extraction de tags Kubernetes][11] pour en savoir plus.

### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la [documentation sur la gestion des secrets][12].

### Ignorer des conteneurs

Excluez des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift.

| Variable d'environnement    | Description                                                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DD_AC_INCLUDE` | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE` | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"`. (**Remarque** : cette variable est seulement traitée pour Autodiscovery.), `image:.*` |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][13].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

### Divers

| Variable d'environnement                        | Description                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"`. |
| `DD_HEALTH_PORT`                    | Définir cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                              |

**Remarque** : si vous utilisez le runtime containerd, définissez `DD_PROCESS_AGENT_CONTAINER_SOURCE="kubelet"` pour faire apparaître vos conteneurs sur la page des conteneurs.

Vous pouvez ajouter d'autres écouteurs et fournisseurs de configuration à l'aide des variables d'environnement `DD_EXTRA_LISTENERS` et `DD_EXTRA_CONFIG_PROVIDERS`. Elles viennent s'ajouter aux variables définies dans les sections `listeners` et `config_providers` du fichier de configuration `datadog.yaml`.

## Commandes

Consultez les [guides sur les commandes de l'Agent][14] pour découvrir toutes les commandes de l'Agent Docker.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/kubernetes-legacy/
[2]: /fr/agent/kubernetes/integrations/
[3]: https://github.com/helm/charts/tree/master/stable/datadog#all-configuration-options
[4]: /fr/agent/proxy/#agent-v6
[5]: /fr/agent/kubernetes/apm/
[6]: /fr/agent/kubernetes/log/
[7]: /fr/infrastructure/process/
[8]: /fr/infrastructure/livecontainers/
[9]: /fr/developers/dogstatsd/
[10]: /fr/developers/dogstatsd/unix_socket/
[11]: /fr/agent/kubernetes/tag/
[12]: /fr/security/agent/#secrets-management
[13]: /fr/agent/guide/autodiscovery-management/
[14]: /fr/agent/guide/agent-commands/