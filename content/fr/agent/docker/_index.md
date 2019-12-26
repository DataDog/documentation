---
title: Agent Docker
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/docker/
  - /fr/agent/docker
  - /fr/agent/basic_agent_usage/docker/
further_reading:
  - link: '/integrations/java/?tab=docker#configuration'
    tag: Documentation
    text: JMX Docker
  - link: agent/docker/log
    tag: Documentation
    text: Recueillir vos logs Docker
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus Docker
  - link: agent/docker/apm
    tag: Documentation
    text: Recueillir vos traces Docker
---
## Présentation
L'Agent Docker Datadog est la version conteneurisée de l'[Agent][1] pour host. L'[image Docker][2] officielle est disponible sur Docker Hub.

L'image est disponible en versions pour architectures x86 64 bits et Arm v8.

## Implémentation
Si vous n'avez pas encore installé l'Agent Docker, consultez les informations ci-dessous ou les [instructions d'installation intégrées à l'application][3]. Consultez la documentation de l'Agent pour connaître les [versions prises en charge][4].

### Installation

Utilisez la commande d'installation en une étape. Remplacez `<VOTRE_CLÉ_API_DATADOG>` par votre [clé d'API Datadog][5].

{{< tabs >}}
{{% tab "Standard" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<VOTRE_CLÉ_API_DATADOG> \
              datadog/agent:latest
```

{{% /tab %}}
{{% tab "Amazon Linux version <2" %}}

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro \
                              -v /proc/:/host/proc/:ro \
                              -v /cgroup/:/host/sys/fs/cgroup:ro \
                              -e DD_API_KEY=<VOTRE_CLÉ_API_DATADOG> \
                              datadog/agent:latest
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : pour Docker Compose, consultez [Compose et l'Agent Datadog][6].

### Configuration
Le [fichier de configuration principal][7] de l'Agent est `datadog.yaml`. Pour l'Agent Docker, les options de configuration `datadog.yaml` sont envoyées via des variables d'environnement.

#### Variables d'environnement

##### Options globales

| Variable d'environnement       | Description                                                                                                                                                                                                                                                                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`       | Votre clé d'API Datadog (**obligatoire**).                                                                                                                                                                                                                                                                                                              |
| `DD_HOSTNAME`      | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                                                                                                                                                                                                             |
| `DD_TAGS`          | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`          | Le site auquel vous transmettez vos métriques, traces et logs. Vous pouvez choisir entre `datadoghq.com` pour le site américain de Datadog et `datadoghq.eu` pour le site européen.                                                                                                                                                                                      |
| `DD_DD_URL`        | Paramètre facultatif pour remplacer l'URL utilisée pour l'envoi de métriques.                                                                                                                                                                                                                                                                                      |
| `DD_CHECK_RUNNERS` | Par défaut, l'Agent exécute tous les checks simultanément (valeur par défaut : `4` runners). Pour exécuter les checks de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de checks (ou plusieurs checks lents), le composant `collector-queue` peut prendre du retard et renvoyer un échec au check de santé. Vous pouvez accroître le nombre de runners pour exécuter davantage de checks en parallèle. |

##### Paramètres de proxy

À partir de l'Agent v6.4.0 (et v6.5.0 pour l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

| Variable d'environnement        | Description                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | URL HTTP à utiliser comme proxy pour les requêtes `http`.                |
| `DD_PROXY_HTTPS`    | URL HTTPS à utiliser comme proxy pour les requêtes `https`.              |
| `DD_PROXY_NO_PROXY` | Une liste d'URL, séparées par des espaces, pour lesquelles aucun proxy ne doit être utilisé. |

Pour en savoir plus sur les paramètres de proxy, consultez la [documentation relative au proxy de l'Agent v6][8].

##### Agents de collecte facultatifs

Par défaut, les Agents de collecte facultatifs sont désactivés pour des raisons de sécurité et de performances. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement               | Description                                                                                                                                                                                                                                                      |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Active la [collecte de traces][9] avec l'Agent de traces.                                                                                                                                                                                                               |
| `DD_LOGS_ENABLED`          | Active la [collecte de logs][10] avec l'Agent de logs.                                                                                                                                                                                                                  |
| `DD_PROCESS_AGENT_ENABLED` | Active la [collecte de live processes][11] via l'Agent de processus. Par défaut, la [vue Live Container][12] est déjà activée si le socket Docker est disponible. Si définie sur `false`, la [collecte de live processes][11] et la [vue Live Container][12] sont désactivées. |

##### DogStatsD (métriques custom)

Envoyez des métriques custom avec le [protocole StatsD][13] :

| Variable d'environnement                     | Description                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs (requis pour envoyer des métriques custom).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles à calculer pour l'histogramme (séparés par des espaces). Valeur par défaut : « 0.95 ».                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations à calculer pour l'histogramme (séparées par des espaces). Valeur par défaut : « max median avg count ».                                                          |
| `DD_DOGSTATSD_SOCKET`            | Chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et l'ajout de tags pour les métriques de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. Par exemple : `["env:golden", "group:retrievers"]`. |

En savoir plus sur l'utilisation de [DogStatsD sur un socket de domaine Unix][14].

##### Tagging

Datadog recueille automatiquement les tags courants à partir de [Docker][15], [Kubernetes][16], [ECS][17], [Swarm, Mesos, Nomad et Rancher][15]. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extrait les étiquettes de conteneur Docker                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extrait les variables d'environnement de conteneur Docker            |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extrait les étiquettes de pod                                        |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extrait les annotations de pod                                   |
| `DD_COLLECT_EC2_TAGS`                   | Extrait les tags EC2 personnalisés sans utiliser l'intégration AWS |

La clé de carte correspond au nom de la source (`label/envvar`), tandis que sa valeur correspond au nom du tag Datadog. Par exemple :
```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Des exemples supplémentaires sont disponibles sur la [page Appliquer et extraire des tags][18].

##### Utiliser des secrets

Les identifiants des intégrations peuvent être conservés dans des secrets Docker ou Kubernetes et utilisés dans les modèles Autodiscovery. Pour en savoir plus, consultez la [documentation sur la Gestion des secrets][19].

##### Ignorer des conteneurs

Excluez des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift.

| Variable d'environnement    | Description                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour tous les inclure. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE` | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour tous les exclure. Exemple : `"image:nom_image_3 image:nom_image_4"`. (**Remarque** : cette variable est seulement traitée pour Autodiscovery.), `image:.*` |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][20].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

##### Divers

| Variable d'environnement                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"` |
| `DD_HEALTH_PORT`                    | Définir cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                              |

**Remarque** : si vous utilisez le runtime containerd, définissez `DD_PROCESS_AGENT_CONTAINER_SOURCE="kubelet"` pour faire apparaître vos conteneurs sur la page des conteneurs.

Vous pouvez ajouter d'autres écouteurs et fournisseurs de configuration à l'aide des variables d'environnement `DD_EXTRA_LISTENERS` et `DD_EXTRA_CONFIG_PROVIDERS`. Elles viennent s'ajouter aux variables définies dans les sections `listeners` et `config_providers` du fichier de configuration `datadog.yaml`.
### Validation
Exécutez la [commande status](#commandes) de l'Agent Docker pour vérifier l'installation.

### Commandes
Ces commandes sont exécutées sur le host.

| Type    | Commande                                         |
|---------|-------------------------------------------------|
| Démarrer   | Utilisez la [commande d'installation](#installation).  |
| Arrêter    | `docker exec -it <NOM_CONTENEUR> agent stop`   |
| Redémarrer | Utilisez la [commande d'installation](#installation).  |
| Statut  | `docker exec -it <NOM_CONTENEUR> agent status` |

## Données collectées

### Métriques
Par défaut, l'Agent Docker recueille les métriques associées aux checks principaux suivants. Pour recueillir les métriques associées à d'autres technologies, consultez la section [Intégrations](#integrations).

| Check       | Métriques       |
|-------------|---------------|
| CPU         | [Système][21]  |
| Disk        | [Disque][22]    |
| Docker      | [Docker][23]  |
| File Handle | [Système][21]  |
| IO          | [Système][21]  |
| Load        | [Système][21]  |
| Memory      | [Système][21]  |
| Réseau     | [Réseau][24] |
| NTP         | [NTP][25]     |
| Uptime      | [Système][21]  |

### Événements
L'Agent Docker envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Checks de service
**datadog.agent.up** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Datadog. Si ce n'est pas le cas, renvoie `OK`.

**datadog.agent.check_status** :<br>
Renvoie `CRITICAL` si un check de l'Agent n'est pas capable d'envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

## Intégrations
L'intégration Docker envoie automatiquement des métriques avec l'Agent Docker. Pour configurer d'autres intégrations, utilisez Autodiscovery ou le montage de fichiers.

### Autodiscovery
Pour activer Autodiscovery sur l'Agent Docker lorsque vous utilisez l'installation en une étape, montez `/var/run/docker.sock`.

Pour ajouter des intégrations avec Autodiscovery, consultez la page [Modèles d'intégration Autodiscovery][26].

### Monter conf.d

Les fichiers de configuration de votre intégration peuvent être copiés dans `/etc/datadog-agent/conf.d/` lorsque l'Agent Docker démarre en montant un répertoire `/conf.d`.

1. Créez un répertoire de configuration sur le host avec vos fichiers YAML :
    ```shell
    mkdir /opt/datadog-agent-conf.d
    touch /opt/datadog-agent-conf.d/http_check.yaml
    ```

2. Lors de l'installation de l'Agent Docker, ajoutez `-v /opt/datadog-agent-conf.d:/conf.d:ro`. Par exemple :
    ```shell
    DOCKER_CONTENT_TRUST=1 \
    docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
                  -v /proc/:/host/proc/:ro \
                  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
                  -v /opt/datadog-agent-conf.d:/conf.d:ro \
                  -e DD_API_KEY=<YOUR_DATADOG_API_KEY> \
                  datadog/agent:latest
    ```

Lorsque le conteneur démarre, tous les fichiers sur le host dans `/opt/datadog-agent-conf.d` qui possèdent l'extension `.yaml` sont copiés vers `/etc/datadog-agent/conf.d/`. **Remarque** : si vous ajoutez de nouveaux fichiers YAML dans `/opt/datadog-agent-conf.d`, redémarrez l'Agent Docker.

Il en va de même pour le dossier `/checks.d`. Tous les fichiers Python du dossier `/checks.d` sont automatiquement copiés vers `/etc/datadog-agent/checks.d/` lorsque l'Agent Docker démarre.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://app.datadoghq.com/account/settings#agent/docker
[4]: /fr/agent/basic_agent_usage/#supported-os-versions
[5]: https://app.datadoghq.com/account/settings#api
[6]: /fr/integrations/faq/compose-and-the-datadog-agent
[7]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[8]: /fr/agent/proxy/#agent-v6
[9]: /fr/tracing
[10]: /fr/logs
[11]: /fr/graphing/infrastructure/process
[12]: /fr/graphing/infrastructure/livecontainers
[13]: https://docs.datadoghq.com/fr/developers/dogstatsd
[14]: /fr/developers/dogstatsd/unix_socket
[15]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[16]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[17]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[18]: /fr/agent/autodiscovery/tag/?tab=containerizedagent
[19]: /fr/agent/guide/secrets-management/?tab=linux
[20]: /fr/agent/autodiscovery/management/?tab=containerizedagent
[21]: /fr/integrations/system/#metrics
[22]: /fr/integrations/disk/#metrics
[23]: /fr/integrations/docker_daemon/#metrics
[24]: /fr/integrations/network/#metrics
[25]: /fr/integrations/ntp/#metrics
[26]: /fr/agent/autodiscovery/integrations