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

## Implémentation
Si vous n'avez pas installé l'Agent Docker, consultez les informations ci-dessous ou les [instructions d'installation intégrées à l'application][3]. Consultez la documentation de l'Agent pour connaître les [versions prises en charge][4].

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

### Configuration
Le [fichier de configuration principal][6] de l'Agent est `datadog.yaml`. Pour l'Agent Docker, les options de configuration `datadog.yaml` sont envoyées via des variables d'environnement.

#### Variables d'environnement

##### Options globales

| Variable d'environnement  | Description                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`  | Votre clé d'API Datadog (**obligatoire**).                                                                                                                         |
| `DD_HOSTNAME` | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                        |
| `DD_TAGS`     | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                            |
| `DD_SITE`     | Le site auquel vous transmettez vos métriques, traces et logs. Vous pouvez choisir entre `datadoghq.com` pour le site américain de Datadog et `datadoghq.eu` pour le site européen. |

##### Agents de collecte facultatifs

Par défaut, les Agents de collecte facultatifs sont désactivés pour des raisons de sécurité et de performances. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement               | Description                                                                                                                                                |
|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Active la [collecte de traces][7] avec l'Agent de trace.                                                                                                        |
| `DD_LOGS_ENABLED`          | Active la [collecte de logs][8] avec l'Agent de logs.                                                                                                            |
| `DD_PROCESS_AGENT_ENABLED` | Active la [collecte de live processes][9] dans l'Agent de processus. Par défaut, la [vue Live Container][10] est déjà activée si le socket Docker est disponible. Si défini sur `false`, la [collecte de live processes][9] et la [vue Live Container][10] sont désactivées.|

##### DogStatsD (métriques custom)

Envoie des métriques custom avec le [protocole StatsD][11] :

| Variable d'environnement                     | Description                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute de paquets DogStatsD à partir d'autres conteneurs (requis pour envoyer des métriques custom).              |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles de l'histogramme à calculer (séparés par des espaces). Valeur par défaut : « 0.95 ».                |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations d'histogramme à calculer (séparées par des espaces). Valeur par défaut : « max median avg count ». |
| `DD_DOGSTATSD_SOCKET`            | Chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                           |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et l'ajout de tags pour les métriques de socket Unix.                                   |

En savoir plus sur l'utilisation de [DogStatsD sur un socket de domaine Unix][12].

##### Tagging

Datadog recueille automatiquement les tags courants de [Docker][13], [Kubernetes][14], [ECS][15], [Swarm, Mesos, Nomad et Rancher][13]. Pour extraire davantage de tags, utilisez les options suivantes :

| Variable d'environnement                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extrait les étiquettes de conteneur Docker                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extrait les variables d'environnement de conteneur Docker            |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extrait les étiquettes de pod                                        |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extrait les annotations de pod                                   |
| `DD_COLLECT_EC2_TAGS`                   | Extrait les tags EC2 personnalisés sans utiliser l'intégration AWS |

La clé de carte correspond au nom de la source (`label/envvar`), tandis que sa valeur correspond au nom du tag Datadog, par exemple :
```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Des exemples supplémentaires sont disponibles sur la [page Appliquer et Extraire des tags][16].

##### Ignorer des conteneurs

Excluez des conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift.

| Variable d'environnement    | Description                                                                                                                                                                                                        |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Liste des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour les inclure tous. Exemple : `"image:nom_image_1 image:nom_image_2"`, `image:.*`                                                              |
| `DD_AC_EXCLUDE` | Liste des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour les exclure tous. Exemple : `"image:nom_image_3 image:nom_image_4"`. (**Remarque** : cette variable est seulement traitée pour Autodiscovery.), `image:.*` |

Des exemples supplémentaires sont disponibles sur la page [Gestion de la découverte de conteneurs][17].

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`. L'ensemble des conteneurs est pris en compte. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

##### Divers

| Variable d'environnement                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplace la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"` |
| `DD_HEALTH_PORT`                    | Définir cette variable sur `5555` pour exposer le check de santé de l'Agent sur le port `5555`.                                              |

### Validation
Exécutez la [commande status](#commandes) de l'Agent Docker pour vérifier l'installation.

### Commandes
Ces commandes sont exécutées sur le host.

| Type    | Commandes                                         |
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
| CPU         | [System][18]  |
| Disk        | [Disk][19]    |
| Docker      | [Docker][20]  |
| File Handle | [System][18]  |
| IO          | [System][18]  |
| Load        | [System][18]  |
| Memory      | [System][18]  |
| Network     | [Network][21] |
| NTP         | [NTP][22]     |
| Uptime      | [System][18]  |

### Événements
L'Agent Docker envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Checks de service
**datadog.agent.up** :  
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à Datadog. Si ce n'est pas le cas, renvoie `OK`.

**datadog.agent.check_status** :  
Renvoie `CRITICAL` si un check de l'Agent n'est pas capable d'envoyer des métriques à Datadog. Si ce n'est pas le cas, renvoie `OK`.

## Intégrations
L'intégration Docker envoie automatiquement des métriques avec l'Agent Docker. Pour configurer d'autres intégrations, utilisez Autodiscovery ou le montage.

### Autodiscovery
Pour activer Autodiscovery sur l'Agent Docker lorsque vous utilisez l'installation en une étape, montez `/var/run/docker.sock`.

Pour ajouter des intégrations avec Autodiscovery, consultez la page [Modèles d'intégration Autodiscovery][23].

### Monter conf.d

Les fichiers de configuration de votre intégration peuvent être copiés dans `/etc/datadog-agent/conf.d/` lorsque l'Agent Docker démarre en montant un répertoire `/conf.d`.

1. Créez un répertoire de configuration sur le host avec vos fichiers YAML :
    ```shell
    mkdir /opt/datadog-agent-conf.d
    touch /opt/datadog-agent-conf.d/http_check.yaml
    ```

2. Lors de l'installation de l'Agent Docker, ajoutez `-v /opt/datadog-agent-conf.d:/conf.d:ro`, par exemple :
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
[6]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[7]: /fr/tracing
[8]: /fr/logs
[9]: /fr/graphing/infrastructure/process
[10]: /fr/graphing/infrastructure/livecontainers
[11]: https://docs.datadoghq.com/fr/developers/dogstatsd
[12]: /fr/developers/dogstatsd/unix_socket
[13]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[14]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[15]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[16]: /fr/agent/autodiscovery/tag/?tab=containerizedagent
[17]: /fr/agent/autodiscovery/management/?tab=containerizedagent
[18]: /fr/integrations/system/#metrics
[19]: /fr/integrations/disk/#metrics
[20]: /fr/integrations/docker_daemon/#metrics
[21]: /fr/integrations/network/#metrics
[22]: /fr/integrations/ntp/#metrics
[23]: /fr/agent/autodiscovery/integrations
