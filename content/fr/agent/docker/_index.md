---
title: Agent Docker
kind: documentation
aliases:
  - /fr/guides/basic_agent_usage/docker/
  - /fr/agent/docker
  - /fr/agent/basic_agent_usage/docker/
further_reading:
  - link: agent/faq/getting-further-with-docker
    tag: FAQ
    text: En apprendre plus sur Docker
  - link: agent/faq/docker-jmx
    tag: FAQ
    text: JMX Docker
  - link: logs/docker
    tag: Documentation
    text: Recueillir vos logs Docker
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus Docker
  - link: agent/docker/apm
    tag: Documentation
    text: Recueillir vos traces Docker
---
Pour installer l'Agent de conteneur Datadog, suivez les [instructions d'installation de l'Agent][1] ou passez en revue les informations ci-dessous. Vous pouvez également consulter [l'image officielle de la version 6 de l'Agent Docker].

**Remarque** : les versions 1.12 et supérieures de Docker sont prises en charge.

## Comment l'exécuter

Commencez par une exécution de base de Docker :

```shell
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<VOTRE_CLÉ_API> \
              datadog/agent:latest
```

### Variables d'environnement

De nombreux paramètres de l'Agent peuvent être personnalisés. Vous trouverez ci-dessous les variables d'environnement les plus utilisées :

#### Options globales

| Variable d'environnement  | Description                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`  | Votre clé d'API Datadog (**obligatoire**).                                                                                                                         |
| `DD_HOSTNAME` | Le hostname à utiliser pour les métriques (si la détection automatique échoue).                                                                                                        |
| `DD_TAGS`     | Tags de host séparés par des espaces. Exemple : `tag-simple-0 clé-tag-1:valeur-tag-1`.                                                                            |
| `DD_SITE`     | Le site auquel vous transmettez vos métriques, traces et logs. Vous pouvez choisir entre `datadoghq.com` pour le site américain de Datadog et `datadoghq.eu` pour le site européen. |



#### Agents de collecte optionnels

Par défaut, les Agents de collecte optionnels sont désactivés pour des raisons de sécurité et de performances. Utilisez les variables d'environnement suivantes pour les activer :

| Variable d'environnement               | Description                                                                                                                                        |
|----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`           | Exécute trace-agent avec l'Agent d'infrastructure, afin que le conteneur accepte les traces sur `8126/tcp`.                                    |
| `DD_LOGS_ENABLED`          | Exécute [log-agent][3] avec l'Agent d'infrastructure.                                                                                        |
| `DD_PROCESS_AGENT_ENABLED` | Active la collecte de live processes dans [process-agent][4]. Par défaut, la vue Live Container est déjà activée si le socket Docker est disponible. |

#### DogStatsD (métriques custom)

Envoyez des métriques custom par l'intermédiaire du [protocole statsd][5] :

| Variable d'environnement                     | Description                                                                                       |
|----------------------------------|---------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Effectue une écoute de paquets DogStatsD à partir d'autres conteneurs (requis pour envoyer des métriques custom).              |
| `DD_HISTOGRAM_PERCENTILES`       | Les centiles de l'histogramme à calculer (séparés par des espaces). Valeur par défaut : « 0.95 ».                |
| `DD_HISTOGRAM_AGGREGATES`        | Les agrégations d'histogramme à calculer (séparées par des espaces). Valeur par défaut : « max median avg count ». |
| `DD_DOGSTATSD_SOCKET`            | Chemin vers le socket Unix à écouter. Doit être dans le volume `rw` monté.                           |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Active la détection de conteneurs et l'ajout de tags pour les métriques de socket Unix.                                   |

[En savoir plus sur DogStatsD sur un socket de domaine Unix avec Docker][6].

#### Tagging

Datadog recueille automatiquement les tags courants de [Docker][7], [Kubernetes][8], [ECS][9], [Swarm, Mesos, Nomad et Rancher][7], et vous permet d'extraire des tags supplémentaires à l'aide des paramètres suivants :

| Variable d'environnement                            | Description                                               |
|-----------------------------------------|-----------------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`              | Extraire les étiquettes de conteneur Docker                           |
| `DD_DOCKER_ENV_AS_TAGS`                 | Extraire les variables d'environnement de conteneur Docker            |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS`      | Extraire les étiquettes de pod                                        |
| `DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS` | Extraire les annotations de pod                                   |
| `DD_COLLECT_EC2_TAGS`                   | Extraire les tags EC2 personnalisés sans utiliser l'intégration AWS |

Définissez ces paramètres dans votre fichier `datadog.yaml` personnalisé ou configurez-les en tant que cartes JSON dans ces variables d'environnement. La clé de carte correspond au nom de la source (`label/envvar`), tandis que sa valeur correspond au nom du tag Datadog.

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

#### Ignorer les conteneurs

Excluez les conteneurs de la collecte de logs, de la collecte de métriques et d'Autodiscovery. Par défaut, Datadog exclut les conteneurs `pause` de Kubernetes et d'OpenShift. Consultez le fichier `datadog.yaml.example` pour en savoir plus et découvrir des exemples :

| Variable d'environnement    | Description                                                                                                                                                                   |
|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_AC_INCLUDE` | Liste des conteneurs à inclure (séparés par des espaces). Exemple : `"image:nom_image_1 image:nom_image_2"`.                                                              |
| `DD_AC_EXCLUDE` | Liste des conteneurs à exclure (séparés par des espaces). Exemple : `"image:nom_image_3 image:nom_image_4"`. (**Remarque** : cette variable est seulement traitée pour Autodiscovery.) |

**Remarque** : ces paramètres n'ont aucun effet sur les métriques `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total`, qui prennent toujours en compte l'ensemble des conteneurs. Cela n'a aucune incidence sur le nombre de conteneurs facturés.

#### Divers

| Variable d'environnement                        | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Remplacer la détection automatique des sources de conteneurs par une source unique, comme `"docker"`, `"ecs_fargate"` ou `"kubelet"` |

### Fichiers de configuration

Si vous montez des fichiers de configuration YAML dans le dossier `/conf.d`, ils sont automatiquement copiés vers `/etc/datadog-agent/conf.d/` lorsque le conteneur démarre. Il en va de même pour le dossier `/checks.d`. Tous les fichiers Python du dossier `/checks.d` sont automatiquement copiés vers `/etc/datadog-agent/checks.d/` lorsque le conteneur démarre.

1. Créez un dossier de configuration sur le host et rédigez vos fichiers YAML au sein de celui-ci. Les exemples ci-dessous peuvent également être utilisés pour le dossier `/checks.d`.

    ```
    mkdir /opt/datadog-agent-conf.d
    touch /opt/datadog-agent-conf.d/nginx.yaml
    ```

2. Lors de la création du conteneur, montez ce nouveau dossier sur `/conf.d`.
    ```
    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -v /opt/datadog-agent-conf.d:/conf.d:ro \
      -e API_KEY={your_api_key_here} \
       datadog/agent:latest
    ```

    _N'oubliez surtout pas `-v /opt/datadog-agent-conf.d:/conf.d:ro`._

Désormais, lorsque le conteneur démarre, tous les fichiers dans `/opt/datadog-agent-conf.d` qui possèdent l'extension `.yaml` sont copiés vers `/etc/datadog-agent/conf.d/`. **Remarque** : pour ajouter de nouveaux fichiers, redémarrez le conteneur.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: https://hub.docker.com/r/datadog/agent
[3]: /fr/logs
[4]: /fr/graphing/infrastructure/process
[5]: https://docs.datadoghq.com/fr/developers/dogstatsd
[6]: /fr/developers/dogstatsd/unix_socket
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[8]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go