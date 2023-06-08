---
aliases:
- /fr/integrations/faq/gathering-kubernetes-events
- /fr/agent/kubernetes/event_collection
- /fr/agent/kubernetes/configuration
kind: documentation
title: Configurer l'Agent Datadog sur Kubernetes
---

## Présentation

Une fois l'Agent Datadog installé dans votre environnement Kubernetes, d'autres options de configuration sont disponibles.

## Live containers

Vous pouvez configurer l'[Agent Datadog][1] et l'[Agent de cluster][2] afin de récupérer des ressources Kubernetes pour des [live containers][3]. Cela vous permet de surveiller l'état de vos pods, déploiements et autres entités Kubernetes dans un espace de nommage ou une zone de disponibilité précise. Il est également possible de consulter les spécifications de ressources pour les échecs de pods d'un déploiement ou encore de mettre en corrélation l'activité d'un nœud avec les logs associés.

Consultez la documentation relative aux [live containers][4] pour obtenir des instructions de configuration ainsi que des informations supplémentaires.

## Collecte d'événements

{{< tabs >}}
{{% tab "Operator" %}}

La collecte d'événements est activée par défaut par l'Operator Datadog. Vous pouvez modifier ceci à l'aide du paramètre `features.eventCollection.collectKubernetesEvents` dans votre configuration `DatadogAgent`.

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

L'Agent de cluster recueille et transmet les événements Kubernetes.


{{% /tab %}}
{{% tab "Helm" %}}

Si vous souhaitez que les événements Kubernetes soient recueillis par l'Agent de cluster Datadog, assurez-vous que les options `clusterAgent.enabled`, `datadog.collectEvents` et `clusterAgent.rbac.create` sont définies sur true dans votre fichier `values.yaml`.

```yaml
datadog:
  collectEvents: true
clusterAgent:
  enabled: true
  rbac: 
    create: true
```

Si vous ne souhaitez pas utiliser l'Agent de cluster, vous pouvez vous servir d'un Agent de nœud pour recueillir les événements Kubernetes en définissant les options `datadog.leaderElection`, `datadog.collectEvents` et `agents.rbac.create` sur true dans votre fichier `values.yaml`.

```yaml
datadog:
  leaderElection: true
  collectEvents: true
agents:
  rbac:
    create: true

{{% /tab %}}
{{% tab "DaemonSet" %}}

Si vous souhaitez que les événements Kubernetes soient recueillis par l'Agent de cluster Datadog, suivez ces étapes :

1. Désactivez l'élection de leader dans votre Agent de nœud en définissant la variable `leader_election` ou la variable d'environnement `DD_LEADER_ELECTION` sur `false`.

2. Dans le fichier de déploiement de votre Agent de cluster, définissez les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` :

      ```yaml
        - name: DD_COLLECT_KUBERNETES_EVENTS
          value: "true"
        - name: DD_LEADER_ELECTION
          value: "true"
      ```

En configurant l'élection de leader conformément aux étapes ci-dessus, vous aurez l'assurance que la collecte des événements est assurée par un seul Agent de cluster.

Pour recueillir les événements Kubernetes avec un Agent de nœud, il est également possible de définir les variables d'environnement `DD_COLLECT_KUBERNETES_EVENTS` et `DD_LEADER_ELECTION` sur `true` dans le manifeste de votre Agent.

```yaml
- name: DD_COLLECT_KUBERNETES_EVENTS
  value: "true"
- name: DD_LEADER_ELECTION
  value: "true"
```

{{% /tab %}}
{{< /tabs >}}

## Intégrations

Dès lors que votre Agent s'exécute dans votre cluster, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][5] pour recueillir automatiquement des métriques et des logs à partir de vos pods.

## Variables d'environnement

Vous trouverez ci-dessous la liste des variables d'environnement disponibles pour l'Agent Datadog avec une configuration basée sur un DaemonSet. Si vous utilisez Helm, consultez la liste complète des options de configuration pour le fichier `datadog-value.yaml` dans le [référentiel helm/charts GitHub][6]. Si vous utilisez l'Operator, consultez la section [Configuration de l'Operator][7].

### Options globales

| Variable d'environnement         | Description                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Définit le tag `env` global pour toutes les données émises.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`            | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Le site auquel vous transmettez vos métriques, traces et logs. Votre `DD_SITE` est {{< region-param key="dd_site" code="true">}}. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                               |
| `DD_DD_URL`          | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (versions 6.36/7.36 ou ultérieures)            | Alias de `DD_DD_URL`. Ignoré si la valeur `DD_DD_URL` est déjà définie.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard, ce qui entraîne l'échec potentiel du check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |
| `DD_LEADER_ELECTION` | Si vous exécutez plusieurs instances de l'Agent dans votre cluster, définissez cette variable sur `true` pour éviter de recueillir deux fois chaque événement.                                                                                                                                                                                                                         |

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
| `DD_APM_ENABLED`                | Active la [collecte de traces][4] avec l'Agent de trace.                                                                                                                                                                                                           |
| `DD_LOGS_ENABLED`               | Active la [collecte de logs][5] avec l'Agent de log.                                                                                                                                                                                                              |
| `DD_PROCESS_AGENT_ENABLED`      | Active la [collecte de live processes][6] via l'Agent de processus. Par défaut, la [vue Live Container][8] est déjà activée si le socket Docker est disponible. Si cette variable d'environnement est définie sur `false`, la [collecte de live processes][6] et la [vue Live Container][8] sont désactivées. |
| `DD_COLLECT_KUBERNETES_EVENTS ` | Active la collecte d'événements via l'Agent. Si vous exécutez plusieurs instances de l'Agent dans votre cluster, définissez également `DD_LEADER_ELECTION` sur `true`.                                                                                                                       |

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
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Par exemple : `"env:golden group:retrievers"`. |

En savoir plus sur l'utilisation de [DogStatsD sur des sockets de domaine Unix][10].

### Tags

Datadog recueille automatiquement les tags courants à partir de Kubernetes. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                            | Description             |
|-----------------------------------------|-------------------------|
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extrait les étiquettes de pod.      |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extrait les annotations de pod. |

Consultez la documentation relative à [l'extraction de tags Kubernetes][11] pour en savoir plus.

### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la section [Gestion des secrets][12].

### Ignorer des conteneurs

Vous pouvez exclure des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Ces listes d'inclusion et d'exclusion s'appliquent uniquement à Autodiscovery. Elles n'ont aucun impact sur les traces ni sur DogStatsD. Il est possible d'utiliser des expressions régulières pour les valeurs de ces variables d'environnement.

| Variable d'environnement                   | Description                                                                                                                                                                                                                        |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.                                                                              |
| `DD_CONTAINER_EXCLUDE`         | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"`, `image:.*`.                                                                              |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez inclure les métriques.                                                                                                                                                                         |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez exclure les métriques.                                                                                                                                                                         |
| `DD_CONTAINER_INCLUDE_LOGS`    | Liste des conteneurs dont vous souhaitez inclure les logs.                                                                                                                                                                            |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Liste des conteneurs dont vous souhaitez exclure les logs.                                                                                                                                                                            |
| `DD_AC_INCLUDE`                | **Obsolète**. Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.                                                              |
| `DD_AC_EXCLUDE`                | **Obsolète**. Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`. |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][13].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs.

### Divers

| Variable d'environnement                        | Description                                                                                                                                                                                                                                                         |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"`. Cela n'est plus nécessaire depuis la version 7.35.0. de l'Agent.                                                                                                     |
| `DD_HEALTH_PORT`                    | Définissez cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                                                                                                                                                                                 |
| `DD_CLUSTER_NAME`                   | Définissez un identifiant de cluster Kubernetes personnalisé pour éviter les conflits entre les alias de host. Le nom du cluster peut contenir jusqu'à 40 caractères correspondants à des lettres minuscules, des chiffres et des traits d'union. Il doit également commencer par une lettre et se terminer par un chiffre ou une lettre. |

Vous pouvez ajouter d'autres écouteurs et fournisseurs de configuration à l'aide des variables d'environnement `DD_EXTRA_LISTENERS` et `DD_EXTRA_CONFIG_PROVIDERS`. Elles viennent s'ajouter aux variables définies dans les sections `listeners` et `config_providers` du fichier de configuration `datadog.yaml`.

[1]: /fr/agent/
[2]: /fr/agent/cluster_agent/
[3]: https://app.datadoghq.com/containers
[4]: /fr/infrastructure/livecontainers/?tab=helm#configuration
[5]: /fr/agent/kubernetes/integrations/
[6]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog#all-configuration-options
[7]: /fr/agent/kubernetes/operator_configuration
[8]: /fr/agent/proxy/#agent-v6
[9]: /fr/developers/dogstatsd/
[10]: /fr/developers/dogstatsd/unix_socket/
[11]: /fr/agent/kubernetes/tag/
[12]: /fr/agent/guide/secrets-management/
[13]: /fr/agent/guide/autodiscovery-management/