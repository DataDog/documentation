---
title: Agent Docker
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/docker/
  - /fr/agent/docker
  - /fr/agent/basic_agent_usage/docker/
  - /fr/integrations/docker_daemon/
  - /fr/integrations/docker/
further_reading:
  - link: /agent/docker/log/
    tag: Documentation
    text: Recueillir les logs de votre application
  - link: /agent/docker/apm/
    tag: Documentation
    text: Recueillir les traces de votre application
  - link: /agent/docker/prometheus/
    tag: Documentation
    text: Recueillir vos métriques Prometheus
  - link: /agent/docker/integrations/
    tag: Documentation
    text: Recueillir automatiquement les métriques et les logs de vos applications
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
  - link: /agent/docker/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données émises par un conteneur
---
## Présentation

L'Agent Docker Datadog est la version conteneurisée de l'[Agent][1] pour host. L'[image Docker][2] officielle est disponible sur Docker Hub.

L'image est disponible en versions pour architectures x86 64 bits et Arm v8.

## Configuration

Si vous n'avez pas encore installé l'Agent Docker, consultez les informations ci-dessous ou les [instructions d'installation intégrées à l'application][3]. Consultez la documentation de l'Agent pour connaître les [versions prises en charge][4]. Utilisez la commande d'installation en une seule étape. Remplacez `<CLÉ_API_DATADOG>` par votre [clé d'API Datadog][5].

{{< tabs >}}
{{% tab "Installation standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<CLÉ_API_DATADOG> datadog/agent:7
```


{{% /tab %}}
{{% tab "Amazon Linux < v2" %}}

```shell
DOCKER_CONTENT_TRUST=1 docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<CLÉ_API_DATADOG> datadog/agent:7
```

{{% /tab %}}
{{% tab "Windows" %}}

L'Agent Datadog est pris en charge dans Windows Server version 2019 (LTSC) et 1909 (SAC).

```shell
docker run -d --name dd-agent -e DD_API_KEY=<CLÉ_API> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine datadog/agent:latest
```

{{% /tab %}}
{{% tab "Sans privilèges" %}}

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez `--group-add=<ID_GROUPE_DOCKER>` à la commande d'installation. Par exemple :

```shell
DOCKER_CONTENT_TRUST=1 docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=<CLÉ_API_DATADOG> datadog/agent:7 --group-add=<ID_GROUPE_DOCKER>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : pour Docker Compose, consultez [Compose et l'Agent Datadog][6].

## Intégrations

Dès lors que votre Agent s'exécute, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][7] pour recueillir automatiquement des métriques et des logs à partir des conteneurs de votre application.

## Variables d'environnement

Le [fichier de configuration principal][8] de l'Agent est `datadog.yaml`. Pour l'Agent Docker, les options de configuration `datadog.yaml` sont envoyées via des variables d'environnement.

### Options globales

| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`       | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`          | Définit le tag `env` global pour toutes les données émises.                                                                                                                                                                                                                                                                 |
| `DD_HOSTNAME`      | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | Le site auquel vous transmettez vos métriques, traces et logs. Vous pouvez choisir entre `datadoghq.com` pour le site américain de Datadog et `datadoghq.eu` pour le site européen.                                                                                                                                                                                      |
| `DD_DD_URL`        | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard et renvoyer un échec au check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |

### Paramètres de proxy

À partir de l'Agent v6.4.0 (et v6.5.0 pour l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | URL HTTP à utiliser comme proxy pour les requêtes `http`.                |
| `DD_PROXY_HTTPS`    | URL HTTPS à utiliser comme proxy pour les requêtes `https`.              |
| `DD_PROXY_NO_PROXY` | Une liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé. |

Pour en savoir plus sur les paramètres de proxy, consultez la [documentation relative au proxy de l'Agent v6][9].

### Agents de collecte facultatifs

Par défaut, les Agents de collecte facultatifs sont désactivés pour des raisons de sécurité et de performance. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement               | Description                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Active la [collecte de traces][10] via l'Agent de traces.                                                                                                                                                                                                               |
| `DD_LOGS_ENABLED`          | Active la [collecte de logs][11] via l'Agent de logs.                                                                                                                                                                                                                 |
| `DD_PROCESS_AGENT_ENABLED` | Active la [collecte de live processes][12] via l'Agent de processus. Par défaut, la [vue Live Container][13] est déjà activée si le socket Docker est disponible. Si définie sur `false`, la [collecte de live processes][12] et la [vue Live Container][13] sont désactivées. |

### DogStatsD (métriques custom)

Envoyez des métriques custom avec le [protocole StatsD][14] :

| Variable d'environnement                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles de l'histogramme à calculer (séparés par des espaces). Valeur par défaut :  `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : « max median avg count ».                                                          |
| `DD_DOGSTATSD_SOCKET`            | Le chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et l'ajout de tags pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Par exemple : `["env:golden", "group:retrievers"]`. |

En savoir plus sur l'utilisation de [DogStatsD sur des sockets de domaine Unix][15].

### Tagging

Datadog recommande d'utiliser le [tagging de service unifié][16] pour attribuer des tags.

Datadog recueille automatiquement les tags courants à partir de [Docker][17], [Kubernetes][18], [ECS][19], [Swarm, Mesos, Nomad et Rancher][17]. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extrait les étiquettes de conteneur Docker.                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extrait les variables d'environnement de conteneur Docker.            |
| `DD_COLLECT_EC2_TAGS`                   | Extrait les tags EC2 personnalisés sans utiliser l'intégration AWS. |

Consultez la documentation relative à [l'extraction de tags Docker][20] pour en savoir plus.

### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la [documentation relative à la gestion des secrets][21].

### Ignorer des conteneurs

Excluez les conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Ces listes d'inclusion et d'exclusion s'appliquent uniquement à Autodiscovery. Elles n'ont aucun impact sur les traces ni sur DogStatsD.

| Variable d'environnement    | Description                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE` | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.  |
| `DD_CONTAINER_EXCLUDE` | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`. |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez inclure les métriques.  |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez exclure les métriques. |
| `DD_CONTAINER_INCLUDE_LOGS` | Liste des conteneurs dont vous souhaitez inclure les logs.  |
| `DD_CONTAINER_EXCLUDE_LOGS` | Liste des conteneurs dont vous souhaitez exclure les logs. |
| `DD_AC_INCLUDE` | **Obsolète**. Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.  |
| `DD_AC_EXCLUDE` | **Obsolète**. Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`. |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][22].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

### Divers

| Variable d'environnement                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"`. |
| `DD_HEALTH_PORT`                    | Définissez cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                              |

Vous pouvez ajouter d'autres écouteurs et fournisseurs de configuration à l'aide des variables d'environnement `DD_EXTRA_LISTENERS` et `DD_EXTRA_CONFIG_PROVIDERS`. Elles viennent s'ajouter aux variables définies dans les sections `listeners` et `config_providers` du fichier de configuration `datadog.yaml`.

## Commandes

Consultez les [guides sur les commandes de l'Agent][23] pour découvrir toutes les commandes de l'Agent Docker.

## Données collectées

### Métriques

Par défaut, l'Agent Docker recueille les métriques associées aux checks principaux suivants. Pour recueillir les métriques associées à d'autres technologies, consultez la section [Intégrations](#integrations).

| Check       | Métriques       |
|-------------|---------------|
| CPU         | [Système][24]  |
| Disk        | [Disk][25]    |
| Docker      | [Docker][26]  |
| File Handle | [Système][24]  |
| IO          | [Système][24]  |
| Load        | [Système][24]  |
| Memory      | [Système][24]  |
| Réseau     | [Network][27] |
| NTP         | [NTP][28]     |
| Uptime      | [Système][24]  |

### Événements

L'Agent Docker envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Checks de service

**datadog.agent.up** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Datadog. Si ce n'est pas le cas, renvoie `OK`.

**datadog.agent.check_status** :<br>
Renvoie `CRITICAL` si un check de l'Agent ne parvient pas à envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#agent/docker
[4]: /fr/agent/basic_agent_usage/#supported-os-versions
[5]: https://app.datadoghq.com/account/settings#api
[6]: /fr/integrations/faq/compose-and-the-datadog-agent/
[7]: /fr/agent/docker/integrations/
[8]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /fr/agent/proxy/#agent-v6
[10]: /fr/agent/docker/apm/
[11]: /fr/agent/docker/log/
[12]: /fr/infrastructure/process/
[13]: /fr/infrastructure/livecontainers/
[14]: /fr/developers/dogstatsd/
[15]: /fr/developers/dogstatsd/unix_socket/
[16]: /fr/getting_started/tagging/unified_service_tagging/
[17]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[18]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[19]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[20]: /fr/agent/docker/tag/
[21]: /fr/agent/guide/secrets-management/?tab=linux
[22]: /fr/agent/guide/autodiscovery-management/
[23]: /fr/agent/guide/agent-commands/
[24]: /fr/integrations/system/#metrics
[25]: /fr/integrations/disk/#metrics
[26]: /fr/agent/docker/data_collected/#metrics
[27]: /fr/integrations/network/#metrics
[28]: /fr/integrations/ntp/#metrics