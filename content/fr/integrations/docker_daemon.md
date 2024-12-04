---
aliases:
  - /fr/integrations/docker
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - log collection
creates_events: true
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/docker_daemon/README.md
display_name: Docker
draft: false
git_integration_title: docker_daemon
guid: 08ee2733-0441-4438-8af8-e2f6fb926772
integration_id: docker
integration_title: "Docker\_Daemon"
integration_version: ''
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: docker.
metric_to_check: docker.containers.running
name: docker_daemon
process_signatures:
  - dockerd
  - docker-containerd
  - docker run
  - docker daemon
  - docker-containerd-shim
public_title: "Intégration Datadog/Docker\_Daemon"
short_description: Corrélez les performances des conteneurs avec celles de vos services qui s'exécutent dans ces conteneurs.
support: core
supported_os:
  - linux
  - mac_os
---
**Remarque** : le check Docker Daemon est toujours tenu à jour, mais fonctionne uniquement avec la **version 5 de l'Agent**.

<div class="alert alert-warning">
<b>Pour utiliser l'intégration Docker avec la version 6 de l'Agent, consultez la <a href="#agent-v6">section sur l'Agent v6</a> ci-dessous.</b>
</div>

![Dashboard par défaut Docker][1]

## Présentation

Configurez ce check d'Agent pour obtenir des métriques du service Docker_daemon en temps réel pour :

* Visualiser et surveiller les états de Docker_daemon
* Être informé des failovers et des événements de Docker_daemon

## Configuration
### Installation

Pour recueillir des métriques Docker sur tous vos conteneurs, exécutez **un** Agent Datadog sur chaque host. Il existe deux façons d'exécuter l'Agent : directement sur chaque host, ou au sein d'un [conteneur docker-dd-agent][2] (conseillé).

Dans les deux cas, pour que le check Docker n'échoue pas, vos hosts requièrent l'activation de la gestion de mémoire cgroup. Consultez le [référentiel docker-dd-agent][3] pour savoir comment l'activer.

#### Installation sur un host

1. Vérifiez que Docker est en cours d'exécution sur le host.
2. Installez l'Agent comme décrit dans [les instructions d'installation de l'Agent][4] pour le système d'exploitation de votre host.
3. Activez [le carré d'intégration Docker dans l'application][5].
4. Ajoutez l'utilisateur de l'Agent au groupe Docker : `usermod -a -G docker dd-agent`.
5. Créez un fichier `docker_daemon.yaml` en copiant [le fichier d'exemple dans le répertoire conf.d de l'Agent][6]. Si vous avez effectué l'installation standard de Docker sur votre host, vous n'avez rien à changer pour faire fonctionner l'intégration.
6. Pour activer d'autres intégrations, utilisez `docker ps` afin d'identifier les ports utilisés par les applications correspondantes.
    ![Commande Docker ps][7]

#### Installation sur un conteneur

1. Vérifiez que Docker est en cours d'exécution sur le host.
2. Conformément aux [instructions d'installation du conteneur Docker][8], exécutez ce qui suit :

        docker run -d --name dd-agent \
          -v /var/run/docker.sock:/var/run/docker.sock:ro \
          -v /proc/:/host/proc/:ro \
          -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
          -e API_KEY={VOTRE_CLÉ_API_DD} \
          datadog/docker-dd-agent:latest

Dans la commande ci-dessus, vous pouvez transmettre votre clé d'API à l'Agent Datadog à l'aide du flag de variable d'environnement `-e` de Docker. Le tableau ci-dessous répertorie d'autres variables disponibles :

| **Variable**                                                                                      | **Description**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Configure votre clé d'API Datadog.                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | Définit le hostname dans le fichier `datadog.conf` du conteneur de l'Agent. Si cette variable n'est pas définie, le conteneur de l'Agent utilise par défaut le champ `Name` (tel qu'indiqué par la commande `docker info`) en tant que hostname du conteneur de l'Agent.  |
| DD_URL                                                                                            | Définit l'URL du serveur entrant de Datadog où l'Agent envoie les données. Cette variable s'avère utile lorsque vous [utilisez l'Agent en tant que proxy][9].                                                                                                              |
| LOG_LEVEL                                                                                         | Définit le niveau de détail de la journalisation (CRITICAL, ERROR, WARNING, INFO, DEBUG). Par exemple, `-e LOG_LEVEL=DEBUG` définit la journalisation sur le mode de debugging.                                                                                                    |
| TAGS                                                                                              | Définit des tags de host en tant que chaîne délimitée par des virgules. Vous pouvez ajouter des tags simples et des tags clé/valeur sont disponibles. Par exemple : `-e TAGS="tag-simple, clé-tag:valeur-tag"`.                                                                           |
| EC2_TAGS                                                                                          | Cette fonctionnalité permet à l'Agent d'envoyer des requêtes et d'enregistrer des tags personnalisés à l'aide de l'API EC2 lors du démarrage. Pour l'activer, utilisez la commande `-e EC2_TAGS=yes`. **Remarque** : vous devez avoir associé un rôle IAM à l'instance pour bénéficier de cette fonctionnalité.        |
| NON_LOCAL_TRAFFIC                                                                                 | Cette fonctionnalité permet de transmettre des données StatsD à partir de n'importe quelle adresse IP externe. Pour l'activer, utilisez la commande `-e NON_LOCAL_TRAFFIC=yes`. Elle est utilisée pour transmettre les métriques depuis d'autres conteneurs ou systèmes. Consultez la [configuration réseau][10] pour en savoir plus. |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | Définit les informations de configuration du proxy. **Remarque** : `PROXY_PASSWORD` est obligatoire pour la transmission d'un mot de passe d'authentification. Il ne peut pas être renommé. Pour en savoir plus, consultez la [documentation relative au proxy de l'Agent][11].                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | Active et configure Autodiscovery. Pour en savoir plus, consultez le [guide sur Autodiscovery][12].                                                                                                                                   |

**Remarque** : ajoutez `--restart=unless-stopped` si vous souhaitez limiter les redémarrages de votre Agent.

#### Exécuter le conteneur de l'Agent sur Amazon Linux

Pour exécuter le conteneur de l'Agent Datadog sur Amazon Linux, apportez les modifications suivantes au niveau du montage du volume `cgroup` :

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={VOTRE CLÉ D'API} \
  datadog/docker-dd-agent:latest
```

#### Conteneur basé sur Alpine Linux

L'image Docker standard repose sur Debian Linux, mais depuis la version 5.7 de l'Agent Datadog, il existe une image basée sur [Alpine Linux][13]. L'image Alpine Linux est beaucoup plus petite que l'image traditionnelle Debian. Elle hérite également des conceptions axées sur la sécurité d'Alpine.

Pour utiliser l'image Alpine Linux, ajoutez `-alpine` au tag de version. Par exemple :

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={VOTRE CLÉ D'API} \
  datadog/docker-dd-agent:latest-alpine
```

#### Contrôle de version de l'image
Depuis la version 5.5.0 de l'Agent Datadog, l'image Docker suit un nouveau modèle de contrôle de version. Il permet de valider les modifications apportées à l'image Docker de l'Agent Datadog tout en conservant la même version de l'Agent.

La version de l'image Docker est exprimée de la façon suivante : **X.Y.Z**. **X** correspond à la version majeure de l'image Docker, **Y** à la version mineure et **Z** à la version de l'Agent.

Par exemple, la première version de l'image Docker qui est fournie avec l'Agent 5.5.0 de Datadog est `10.0.550`.

#### Conteneurs personnalisés et informations supplémentaires

Pour en savoir plus sur l'élaboration de conteneurs Docker personnalisés avec l'Agent Datadog, l'image Alpine Linux, le contrôle de version et plus encore, consultez [le projet docker-dd-agent sur Github][2].

### Validation

[Lancez la sous-commande status de l'Agent][14] et cherchez `docker_daemon` dans la section Checks.

## Agent v6

Le dernier check Docker s'intitule `docker`. Il est rédigé en Go pour tirer pleinement parti de la nouvelle architecture interne. Depuis la v6.0, l'Agent ne charge plus le check `docker_daemon`, même s'il est toujours disponible et maintenu à jour pour l'Agent v5. Toutes les fonctionnalités ont été incluses dans les versions >6.0, à l'exception de ce qui suit :

  * Les options `url`, `api_version` et `tags*` sont obsolètes. Nous vous conseillons d'utiliser directement [les variables d'environnement Docker standard][15].
  * Les options `ecs_tags`, `performance_tags` et `container_tags` sont obsolètes. Tous les tags pertinents sont recueillis par défaut.
  * L'option `collect_container_count` permettant d'activer la métrique `docker.container.count` n'est plus prise en charge. Vous devez utiliser `docker.containers.running` et `.stopped`.

Certaines options ont été déplacées du fichier `docker_daemon.yaml` vers le fichier `datadog.yaml` principal :

  * `collect_labels_as_tags` a été renommé `docker_labels_as_tags` et prend désormais en charge les tags dotés d'une cardinalité élevée. Consultez les informations détaillées dans `datadog.yaml.example`.
  * Les listes `exclude` et `include` ont été renommées `ac_include` et `ac_exclude`. Afin d'obtenir un filtrage cohérent entre tous les composants de l'Agent, le filtrage des tags arbitraires a été abandonné. Les seuls tags de filtrage pris en charge sont `image` (nom de l'image) et `name` (nom du conteneur). Le filtrage à l'aide d'expressions régulières est toujours disponible. Consultez `datadog.yaml.example` pour obtenir des exemples.
  * L'option `docker_root` a été divisée en deux options : `container_cgroup_root` et `container_proc_root`.
  * `exclude_pause_container` a été ajouté afin d'exclure les conteneurs en pause sur Kubernetes et Openshift (valeur par défaut : true). Cela évite de les supprimer de la liste d'exclusion par erreur.

Autres modifications :

  * La variable d'environnement `TAGS` a été renommée `DD_TAGS`.
  * Le référentiel Docker Hub est passé de [datadog/docker-dd-agent][16] à [datadog/agent][17].

La commande [`import`][18] effectue la conversion de l'ancien `docker_daemon.yaml` vers le nouveau `docker.yaml`. Elle déplace également les paramètres requis de `docker_daemon.yaml` vers `datadog.yaml`.

## Données collectées
### Métriques
{{< get-metrics-from-git "docker_daemon" >}}


### Événements
L'intégration Docker génère les événements suivants :

* Delete Image
* Die
* Erreur
* Fail
* Kill
* Out of memory (oom)
* Pause
* Restart container
* Restart Daemon
* Update

### Checks de service
{{< get-service-checks-from-git "docker_daemon" >}}


**Remarque** : pour utiliser `docker.exit`, ajoutez `collect_exit_code: true` dans votre [fichier YAML Docker][21] et redémarrez l'Agent.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][22].

## Pour aller plus loin

* [Compose et l'Agent Datadog][23]
* [DogStatsD et Docker][24]
* [Le problème de la surveillance Docker][25] (série d'articles)
* [Comment surveiller les métriques de ressource Docker][26]
* [Comment recueillir des métriques Docker][27]
* [8 faits surprenants sur l'adoption concrète de Docker][28]
* [Surveiller Docker sur AWS ECS][29]
* [Optimiser Datadog pour Docker][30]
* [Surveiller Docker avec Datadog][31]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://github.com/DataDog/docker-dd-agent#cgroups
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://app.datadoghq.com/account/settings#integrations/docker
[6]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png
[8]: https://app.datadoghq.com/account/settings#agent/docker
[9]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy
[10]: https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration
[11]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy
[12]: https://docs.datadoghq.com/fr/agent/autodiscovery
[13]: https://alpinelinux.org
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[15]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[16]: https://hub.docker.com/r/datadog/docker-dd-agent
[17]: https://hub.docker.com/r/datadog/agent
[18]: https://docs.datadoghq.com/fr/agent/#cli
[19]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/metadata.csv
[20]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/assets/service_checks.json
[21]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example#L124
[22]: https://docs.datadoghq.com/fr/help
[23]: https://docs.datadoghq.com/fr/integrations/faq/compose-and-the-datadog-agent
[24]: https://docs.datadoghq.com/fr/integrations/faq/dogstatsd-and-docker
[25]: https://www.datadoghq.com/blog/the-docker-monitoring-problem
[26]: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
[27]: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
[28]: https://www.datadoghq.com/docker-adoption
[29]: https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs
[30]: https://www.datadoghq.com/blog/docker-performance-datadog
[31]: https://www.datadoghq.com/blog/monitor-docker-datadog