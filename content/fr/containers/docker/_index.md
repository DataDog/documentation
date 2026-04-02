---
aliases:
- /fr/guides/basic_agent_usage/docker/
- /fr/agent/docker
- /fr/agent/basic_agent_usage/docker/
- /fr/integrations/docker_daemon/
- /fr/docker/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions des conteneurs Datadog (connexion à l'application
    requise).
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/docker/prometheus/
  tag: Documentation
  text: Recueillir vos métriques Prometheus
- link: /agent/docker/integrations/
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
title: Agent Docker pour Docker, containerd et Podman
---

## Présentation

L'Agent Datadog Docker est la version conteneurisée de l'[Agent][1]. installé sur le host. L'Agent Docker prend en charge les runtimes Docker, containerd et Podman. L'[image Docker officielle][2] est disponible sur Docker Hub, Google Container Registry (GCR) et ECR-Public.

<div class="alert alert-danger">Docker Hub est soumis à des limites de pull d'images. Si vous n'êtes pas client Docker Hub, Datadog vous recommande de mettre à jour la configuration de votre Agent Datadog et de votre Agent de cluster afin de récupérer les images à partir de GCR ou ECR. Pour connaître la marche à suivre, consultez la section <a href="/agent/guide/changing_container_registry">Modifier votre registre de conteneurs</a>.</div>

L'image est disponible en versions pour architectures x86 64 bits et Arm v8.

| ECR-Public                                                           | Google Container Registry                                       | Docker Hub                                             |
|----------------------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------|
| [Agent v6+][4]<br>`docker pull public.ecr.aws/datadog/agent`         | [Agent v6+][3]<br>`docker pull gcr.io/datadoghq/agent`          | [Agent v6+][2]<br>`docker pull datadog/agent`          |
| [Agent v5][7]<br>`docker pull public.ecr.aws/datadog/docker-dd-agent`| [Agent v5][6]<br>`docker pull gcr.io/datadoghq/docker-dd-agent` | [Agent v5][5]<br>`docker pull datadog/docker-dd-agent` |


Les commandes CLI sur cette page servent au runtime Docker. Remplacez `docker` par `nerdctl` pour le runtime containerd, ou `podman` pour le runtime Podman.

## Configuration

Si vous n'avez pas installé l'Agent Docker, suivez les [instructions d'installation intégrées à l'application][8] ou consultez la section ci-dessous. Pour les [versions prises en charge][9], reportez-vous à la documentation de l'Agent. Utilisez la commande d'installation en une étape. Remplacez `<YOUR_DATADOG_API_KEY>` par votre [clé d'API Datadog][10], et `<DATADOG_SITE>` par {{< region-param key=dd_site code="true" >}}.

{{< tabs >}}
{{% tab "Intégration standard" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```

Pour ECR-Public :

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

**Remarque** : mettez à jour l'image si vous utilisez un autre registre que GCR ou ECR-public.

**Remarque** : pour certaines fonctionnalités fournies par system-probe, y compris la surveillance réseau, l'Agent de sécurité et le check oom_kill, vous devez également monter le fichier `/etc/os-release` avec `-v /etc/os-release:/host/etc/os-release:ro`. Si votre distribution Linux n'inclut pas de fichier `/etc/os-release`, montez le fichier équivalent, par exemple `/etc/redhat-release` ou `/etc/fedora-release`.

{{% /tab %}}
{{% tab "Amazon Linux" %}}

Pour les versions d'Amazon Linux antérieures à la v2 :

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
Pour ECR-Public :

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

Pour Amazon Linux v2 :

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
Pour ECR-Public :

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

{{% /tab %}}
{{% tab "Windows" %}}

L'Agent Datadog est pris en charge sur Windows Server 2019 (LTSC) et Windows Server 2022 (LTSC).

```shell
docker run -d --name dd-agent -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine gcr.io/datadoghq/agent
```

Pour ECR-Public :

```shell
docker run -d --name dd-agent -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine public.ecr.aws/datadog/agent
```

{{% /tab %}}
{{% tab "Sans privilèges" %}}

(Facultatif) Pour exécuter une installation sans privilèges, ajoutez `--group-add=<ID_GROUPE_DOCKER>` à la commande d'installation. Par exemple :

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7 --group-add=<DOCKER_GROUP_ID>
```
Pour ECR-Public :


```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7 --group-add=<DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : pour Docker Compose, consultez [Compose et l'Agent Datadog][11].

## Intégrations

Dès lors que votre Agent s'exécute, vous pouvez utiliser la [fonctionnalité Autodiscovery de Datadog][12] pour recueillir automatiquement des métriques et des logs à partir des conteneurs de votre application.


## Variables d'environnement

Le [fichier de configuration principal][13] de l'Agent est `datadog.yaml`. Pour l'Agent Docker, les options de configuration `datadog.yaml` sont envoyées via des variables d'environnement.

### Options globales

| Variable d'environnement         | Rôle                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Définit le tag `env` global pour toutes les données émises.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_HOSTNAME_FILE`        | Dans certains environnements, la détection automatique du hostname ne fonctionne pas, et vous ne pouvez pas définir sa valeur avec des variables d'environnement. Dans ce cas, vous pouvez utiliser un fichier sur le host afin de fournir la valeur appropriée. Si `DD_HOSTNAME` est défini sur une valeur non vide, cette option est ignorée.                                              |
| `DD_TAGS`            | Tags de host séparés par des espaces. Exemple : `key1:value1 key2:value2`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Le site auquel vous transmettez vos métriques, traces et logs. Définissez votre site Datadog sur `{{< region-param key="dd_site" >}}`. Valeur par défaut : `datadoghq.com`.                                                                                                                                                                                                |
| `DD_DD_URL`          | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (versions 6.36/7.36 ou ultérieures)            | Alias de `DD_DD_URL`. Ignoré si la valeur `DD_DD_URL` est déjà définie.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard, ce qui entraîne l'échec potentiel du check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |
| `DD_APM_ENABLED`             | Active la collecte de traces. Valeur par défaut : `true`. Pour plus d'informations sur les variables d'environnement supplémentaires de collecte de traces, consultez la section [Tracer des applications Docker][14].   |
| `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` | Dans certains environnements, les premiers logs provenant des hosts peuvent ne pas inclure les bons tags. Si vous constatez l'absence de tags sur de nouveaux hosts dans vos logs, ajoutez cette variable d'environnement et définissez-la sur `"10m"`. |

### Paramètres de proxy

Depuis la version 6.4.0 de l'Agent (et 6.5.0 de l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement        | Rôle                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | URL HTTP à utiliser comme proxy pour les requêtes `http`.                |
| `DD_PROXY_HTTPS`    | URL HTTPS à utiliser comme proxy pour les requêtes `https`.              |
| `DD_PROXY_NO_PROXY` | Liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé. |

Pour en savoir plus sur les paramètres de proxy, consultez la [documentation relative au proxy de l'Agent v6][15].

### Agents de collecte facultatifs

Par défaut, les Agents de collecte facultatifs sont désactivés pour des raisons de sécurité et de performance. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement                                   | Rôle                                                                                                                                                   |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_NON_LOCAL_TRAFFIC`                     | Autorise le trafic non local pour le [tracing depuis d'autres conteneurs][16].                                                                                             |
| `DD_LOGS_ENABLED`                              | Active la [collecte de logs][17] via l'Agent de log.                                                                                                              |
| `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` | Activez la [collecte des processus en direct][18] avec l'Agent de processus. La [vue Live Containers][19] est déjà activée par défaut si le socket Docker est disponible. |

### DogStatsD (métriques custom)

Envoyez des métriques custom avec le [protocole StatsD][20] :

| Variable d'environnement                     | Rôle                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles à calculer pour l'histogramme (séparés par des espaces). Valeur par défaut :  `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : « max median avg count ».                                                          |
| `DD_DOGSTATSD_SOCKET`            | Le chemin vers le socket Unix à écouter. Doit être dans un volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et le tagging pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Exemple : `"env:golden group:retrievers"`. |
| `DD_USE_DOGSTATSD`           | Active ou désactive l'envoi de métriques custom à partir de la bibliothèque DogStatsD.                                                                                                |
En savoir plus sur l'utilisation de [DogStatsD sur des sockets de domaine Unix][21].

### Tags

Datadog recommande d'utiliser le [tagging de service unifié][22] pour attribuer des tags.

Datadog recueille automatiquement les tags courants à partir de Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                  | Rôle                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS` | Permet d'extraire les étiquettes du conteneur. Remplace l'ancienne variable d'environnement `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`    | Permet d'extraire les variables d'environnement du conteneur. Remplace l'ancienne variable d'environnement `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_COLLECT_EC2_TAGS`         | Permet d'extraire les tags EC2 personnalisés sans utiliser l'intégration AWS.                                              |

Consultez la documentation relative à [l'extraction de tags Docker][23] pour en savoir plus.

### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la [documentation relative à la gestion des secrets][24].

### Ignorer des conteneurs

Vous pouvez exclure des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Ces listes d'inclusion et d'exclusion s'appliquent uniquement à Autodiscovery. Elles n'ont aucun impact sur les traces ni sur DogStatsD. Il est possible d'utiliser des expressions régulières pour la valeur des variables d'environnement.

| Variable d'environnement                   | Rôle                                                                                                                                                                                                                                                                                                               |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*` Lorsque vous utilisez ImageStreams au sein d'environnements OpenShift, utilisez le nom du conteneur à la place de l'image. Par exemple : "name:nom_conteneur_1 name:nom_conteneur_2", name:.* |
| `DD_CONTAINER_EXCLUDE`         | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`.                                                                                                        |
| `DD_CONTAINER_INCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez inclure les métriques.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_EXCLUDE_METRICS` | Liste des conteneurs dont vous souhaitez exclure les métriques.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_INCLUDE_LOGS`    | Liste des conteneurs dont vous souhaitez inclure les logs.                                                                                                                                                                                                                                                                   |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Liste des conteneurs dont vous souhaitez exclure les logs.                                                                                                                                                                                                                                                                   |
| `DD_AC_INCLUDE`                | **Obsolète**. Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`.                                                                                                                                                     |
| `DD_AC_EXCLUDE`                | **Obsolète**. Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"` (cette variable est seulement traitée pour Autodiscovery), `image:.*`.                                                                                        |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][25].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

**Remarque** : lorsque vous utilisez containerd, il est possible d'ignorer des conteneurs par espace de nommage en utilisant `DD_CONTAINERD_NAMESPACES` et `DD_CONTAINERD_EXCLUDE_NAMESPACES`. Les deux sont des listes d'espaces de nommage séparés par des espaces. Lorsque `DD_CONTAINERD_NAMESPACES` est défini, l'Agent rapporte les données des conteneurs qui appartiennent à un espace de nommage présent dans la liste. Lorsque `DD_CONTAINERD_EXCLUDE_NAMESPACES` est défini, l'Agent rapporte les données de tous les conteneurs sauf ceux qui appartiennent à un espace de nommage de la liste.

### Autodiscovery

| Variable d'environnement                 | Rôle                                                                                                                                                                           |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Écouteurs Autodiscovery à exécuter.                                                                                                                                                       |
| `DD_EXTRA_LISTENERS`         | Les écouteurs Autodiscovery supplémentaires à exécuter. Ils s'ajoutent aux variables définies dans la section `listeners` du fichier de configuration `datadog.yaml`.                   |
| `DD_CONFIG_PROVIDERS`        | Les fournisseurs que l'Agent doit appeler pour collecter les configurations de checks. Le fournisseur par défaut est `docker`. Le fournisseur Docker gère les modèles intégrés dans les étiquettes de conteneurs. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Les fournisseurs de configuration Autodiscovery supplémentaires à utiliser. Ils s'ajoutent aux variables définies dans la section `config_providers` du fichier de configuration `datadog.yaml`. |

### Divers

| Variable d'environnement                        | Rôle                                                                                                                                                     |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"`. Cela n'est plus nécessaire depuis la version 7.35.0. de l'Agent. |
| `DD_HEALTH_PORT`                    | Définissez cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                                                                             |

## Commandes

Consultez les [guides sur les commandes de l'Agent][26] pour découvrir toutes les commandes de l'Agent Docker.

## Données collectées

### Métriques

Par défaut, l'Agent Docker recueille les métriques associées aux checks principaux suivants. Pour recueillir les métriques associées à d'autres technologies, consultez la section [Intégrations](#integrations).

| Check       | Métriques       |
|-------------|---------------|
| Conteneur   | [Métriques][27]
| CPU         | [Système][28]  |
| Disk        | [Disque][29]    |
| Docker      | [Docker][30]  |
| File Handle | [Système][28]  |
| IO          | [Système][28]  |
| Load        | [Système][28]  |
| Mémoire      | [Système][28]  |
| Réseau     | [Réseau][31] |
| NTP         | [NTP][32]     |
| Uptime      | [Système][28]  |

### Événements

L'Agent Docker envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Checks de service

**datadog.agent.up** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à Datadog. Si ce n'est pas le cas, renvoie `OK`.

**datadog.agent.check_status** :<br>
Renvoie `CRITICAL` si un check de l'Agent ne parvient pas à envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

## Désinstaller l'instrumentation APM en une étape

Si vous avez installé l'Agent Datadog Docker avec l'instrumentation APM en une étape et si vous souhaitez le désinstaller, vous devez [exécuter des commandes supplémentaires][33] pour désinstaller l'instrumentation APM.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[4]: https://gallery.ecr.aws/datadog/agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/docker-dd-agent?gcrImageListsize=30
[7]: https://gallery.ecr.aws/datadog/docker-dd-agent
[8]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[9]: /fr/agent/supported_platforms/?tab=cloudandcontainers
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /fr/agent/guide/compose-and-the-datadog-agent/
[12]: /fr/agent/docker/integrations/
[13]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[14]: /fr/agent/docker/apm/
[15]: /fr/agent/configuration/proxy/#agent-v6
[16]: /fr/agent/docker/apm/#tracing-from-other-containers
[17]: /fr/agent/docker/log/
[18]: /fr/infrastructure/process/
[19]: /fr/infrastructure/livecontainers/
[20]: /fr/developers/dogstatsd/
[21]: /fr/developers/dogstatsd/unix_socket/
[22]: /fr/getting_started/tagging/unified_service_tagging/
[23]: /fr/agent/docker/tag/
[24]: /fr/agent/configuration/secrets-management/?tab=linux
[25]: /fr/agent/guide/autodiscovery-management/
[26]: /fr/agent/configuration/agent-commands/
[27]: /fr/integrations/container/
[28]: /fr/integrations/system/#metrics
[29]: /fr/integrations/disk/#metrics
[30]: /fr/agent/docker/data_collected/#metrics
[31]: /fr/integrations/network/#metrics
[32]: /fr/integrations/ntp/#metrics
[33]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=docker#removing-apm-for-all-services-on-the-infrastructure