---
aliases:
- /fr/guides/basic_agent_usage/docker/
- /fr/agent/docker
- /fr/agent/basic_agent_usage/docker/
- /fr/integrations/docker_daemon/
- /fr/docker/
description: Installez et configurez l'Agent Datadog pour les conteneurs Docker et
  les runtimes de conteneurs
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notes de version
  text: Découvrez les dernières versions des conteneurs Datadog ! (Connexion à l'application
    requise).
- link: /agent/docker/log/
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/docker/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/docker/integrations/
  tag: Documentation
  text: Collectez automatiquement les métriques et les journaux de votre application
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: https://learn.datadoghq.com/courses/agent-on-docker
  tag: Centre d'apprentissage
  text: L'Agent sur Docker
title: Agent Docker pour Docker, containerd et Podman
---
## Aperçu {#overview}

L'Agent Docker Datadog est une version de l'[Agent Datadog][1] qui prend en charge les runtimes de conteneurs Docker, containerd et Podman. Pour les versions Docker prises en charge, consultez [Plateformes prises en charge][2].

## Installez l'Agent Docker Datadog {#install-the-datadog-docker-agent}
Suivez le [flux d'installation dans l'application Datadog][3]. C'est le flux recommandé, qui vous aide à créer votre `docker run` commande avec votre clé API, les configurations minimales requises et les options pour diverses fonctionnalités de Datadog.

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="Étapes d'installation dans l'application pour l'Agent Datadog sur Docker." style="width:90%;">}}

## Exécutez manuellement l'Agent Docker Datadog {#manually-run-the-datadog-docker-agent}

Le flux d'automatisation de flotte aide à configurer votre conteneur Agent Datadog avec les instructions recommandées par Datadog. Pour configurer cela manuellement, consultez les exemples ci-dessous.

Utilisez la commande suivante pour exécuter l'Agent en tant que conteneur Docker une fois sur chaque hôte que vous souhaitez surveiller. Remplacez `<DATADOG_API_KEY>` par votre clé API Datadog et `<DATADOG_SITE>` par votre {{< region-param key=dd_site code="true" >}}.

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_SITE=<DATADOG_SITE> \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{% tab "Windows" %}}
L'Agent Datadog est pris en charge sur Windows Server 2019 (LTSC) et Windows Server 2022 (LTSC). La commande PowerShell suivante exécute le conteneur Agent Datadog :

```powershell
docker run -d --name dd-agent `
  -v \\.\pipe\docker_engine:\\.\pipe\docker_engine `
  -e DD_SITE=<DATADOG_SITE> `
  -e DD_API_KEY=<DATADOG_API_KEY> `
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Pour Docker Compose, consultez [Compose et l'Agent Datadog][4]. Pour déployer l'Agent dans Podman, consultez les instructions dans [Utiliser l'intégration Docker avec le runtime de conteneurs Podman][5].

## Intégrations {#integrations}

Après que l'Agent Docker Datadog soit opérationnel, vous pouvez [configurer les intégrations Datadog][6] pour collecter automatiquement des métriques et des journaux de vos conteneurs d'application. L'[Autodécouverte de Conteneurs Datadog][7] vous permet de définir une configuration de surveillance pour des ressources dynamiques dans des systèmes conteneurisés.

## Options de configuration pour l'Agent Docker Datadog {#configuration-options-for-the-datadog-docker-agent}

### Registres de conteneurs {#container-registries}

Les images sont disponibles pour les architectures 64 bits x86 et Arm v8. Datadog publie des images de conteneurs dans le Registre de Conteneurs Datadog, Google Artifact Registry (GAR), Amazon ECR, Azure ACR et Docker Hub :

{{% container-images-table %}}

Par défaut, les instructions ci-dessus tirent l'image du Registre de Conteneurs Datadog (`registry.datadoghq.com`). Si vous utilisez ce registre, assurez-vous que votre pare-feu autorise le trafic vers `us-docker.pkg.dev/datadog-prod/public-images`, car le registre peut rediriger les demandes vers cette URL.

<div class="alert alert-warning">Docker Hub est soumis à des limites de taux d'extraction d'images. Si vous n'êtes pas client de Docker Hub, Datadog recommande de mettre à jour votre configuration pour extraire depuis un autre registre. Pour les instructions, consultez <a href="/agent/guide/changing_container_registry">Changer votre registre de conteneurs</a>.</div>

### Variables d'environnement {#environment-variables}

Dans un environnement non conteneurisé, les options de configuration pour l'Agent Datadog sont définies dans [`datadog.yaml`][8]. Pour l'Agent Docker Datadog, vous pouvez définir `datadog.yaml` options de configuration via des variables d'environnement.

#### Options globales {#global-options}

`DD_API_KEY`
: Votre clé API Datadog (**requise**).

`DD_ENV`
: Définit le tag global `env` pour toutes les données émises.

`DD_HOSTNAME`
: Nom d'hôte à utiliser pour les métriques (si l'autodétection échoue).

`DD_HOSTNAME_FILE`
: Dans certains environnements, la détection automatique du nom d'hôte n'est pas adéquate, et vous ne pouvez pas définir la valeur avec des variables d'environnement. Dans ces cas, vous pouvez utiliser un fichier sur l'hôte pour fournir une valeur appropriée. Si `DD_HOSTNAME` est défini sur une valeur non vide, cette option est ignorée.

`DD_TAGS`
: Tags d'hôte séparés par des espaces. Par exemple: `key1:value1 key2:value2`.

`DD_SITE`
: Site de destination pour vos métriques, traces et journaux. Définissez votre site Datadog sur : `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.

`DD_DD_URL`
: Paramètre optionnel pour remplacer l'URL pour la soumission des métriques.

`DD_URL` (6.36+/7.36+)
: Alias pour `DD_DD_URL`. Ignoré si `DD_DD_URL` est déjà défini.

`DD_CHECK_RUNNERS`
: L'Agent exécute toutes les vérifications en parallèle par défaut (valeur par défaut = `4` runners). Pour exécuter les vérifications de manière séquentielle, définissez la valeur sur `1`. Si vous devez exécuter un grand nombre de vérifications (ou des vérifications lentes), le composant `collector-queue` peut prendre du retard et échouer au contrôle de santé. Vous pouvez augmenter le nombre de runners pour exécuter les vérifications en parallèle.

`DD_APM_ENABLED`
: Active la collecte de traces. Par défaut, c'est `true`. Pour plus d'informations sur les variables d'environnement supplémentaires pour la collecte de traces, consultez [Tracing Docker Applications][9].

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: Dans certains environnements, les journaux initiaux des hôtes peuvent ne pas inclure les bons tags. Si vous manquez des tags sur de nouveaux hôtes dans vos journaux, incluez cette variable d'environnement et définissez-la sur `"10m"`.

#### Paramètres du proxy {#proxy-settings}

À partir de l'Agent v6.4.0 (et v6.5.0 pour l'Agent de trace), vous pouvez remplacer les paramètres de proxy de l'Agent via les variables d'environnement suivantes :

`DD_PROXY_HTTP`
: Une URL HTTP à utiliser comme proxy pour les requêtes `http`.

`DD_PROXY_HTTPS`
: Une URL HTTPS à utiliser comme proxy pour les requêtes `https`.

`DD_PROXY_NO_PROXY`
: Une liste d'URL séparées par des espaces pour lesquelles aucun proxy ne doit être utilisé.

Pour plus d'informations sur les paramètres du proxy, consultez la [documentation du Proxy de l'Agent v6][10].

#### Agents de collecte optionnels {#optional-collection-agents}

Les agents de collecte optionnels sont désactivés par défaut pour des raisons de sécurité ou de performance. Utilisez ces variables d'environnement pour les activer :

`DD_APM_NON_LOCAL_TRAFFIC`
: Autoriser le trafic non local lors du traçage depuis d'autres conteneurs [11].

`DD_LOGS_ENABLED`
: Activer la [collecte de journaux][12] avec l'Agent des Journaux.

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: Activer la [collecte de processus en direct][13] avec l'Agent des Processus. La [vue des conteneurs en direct][14] est déjà activée par défaut si le socket Docker est disponible.

#### DogStatsD (métriques personnalisées) {#dogstatsd-custom-metrics}

Envoyez des métriques personnalisées avec [le protocole StatsD][15] :

`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`
: Écoutez les paquets DogStatsD provenant d'autres conteneurs (nécessaire pour envoyer des métriques personnalisées).

`DD_HISTOGRAM_PERCENTILES`
: Les percentiles de l'histogramme à calculer (séparés par des espaces). La valeur par défaut est `0.95`.

`DD_HISTOGRAM_AGGREGATES`
: Les agrégats de l'histogramme à calculer (séparés par des espaces). La valeur par défaut est `"max median avg count"`.

`DD_DOGSTATSD_SOCKET`
: Chemin vers le socket unix à écouter. Doit être dans un volume `rw` monté.

`DD_DOGSTATSD_ORIGIN_DETECTION`
: Activer la détection et le marquage des conteneurs pour les métriques de socket UNIX.

`DD_DOGSTATSD_TAGS`
: Tags supplémentaires à ajouter à toutes les métriques, événements et vérifications de service reçus par ce serveur DogStatsD. Par exemple: `"env:golden group:retrievers"`.

`DD_USE_DOGSTATSD`
: Activer ou désactiver l'envoi de métriques personnalisées depuis la bibliothèque DogStatsD.
En savoir plus sur [DogStatsD via les sockets de domaine Unix][16].

#### Marquage {#tagging}

En tant que meilleure pratique, Datadog recommande d'utiliser [le marquage de service unifié][17] lors de l'attribution des tags.

Datadog collecte automatiquement les tags courants de Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher. Pour extraire encore plus de tags, utilisez les options suivantes :

`DD_CONTAINER_LABELS_AS_TAGS`
: Extraire les étiquettes de conteneur. Cet environnement est équivalent à `DD_DOCKER_LABELS_AS_TAGS`.

`DD_CONTAINER_ENV_AS_TAGS`
: Extraire les variables d'environnement du conteneur. Cet environnement est équivalent à `DD_DOCKER_ENV_AS_TAGS`.

`DD_COLLECT_EC2_TAGS`
: Extraire des tags EC2 personnalisés sans utiliser l'intégration AWS.

Consultez la documentation sur [l'extraction de tags Docker][18] pour en savoir plus.

#### Utilisation de fichiers secrets {#using-secret-files}

Les identifiants d'intégration peuvent être stockés dans des secrets Docker ou Kubernetes et utilisés dans des modèles d'Autodécouverte. Pour plus d'informations, consultez la [documentation sur la gestion des secrets][19].

#### Ignorez les conteneurs {#ignore-containers}

Excluez les conteneurs de la collecte des journaux, de la collecte des métriques et de l'Autodécouverte. Datadog exclut par défaut les conteneurs Kubernetes et OpenShift `pause`. Ces listes blanches et noires s'appliquent uniquement à l'Autodécouverte ; les traces et DogStatsD ne sont pas affectés. La valeur de ces variables d'environnement prend en charge les expressions régulières.

`DD_CONTAINER_INCLUDE`
: Liste blanche des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour inclure tout. Par exemple: `"image:image_name_1 image:image_name_2"`, `image:.*` Lorsque vous utilisez des ImageStreams dans des environnements OpenShift, utilisez le nom du conteneur au lieu de l'image. Par exemple: `"name:container_name_1 name:container_name_2"`, `name:.*`

`DD_CONTAINER_EXCLUDE`
: Liste noire des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour exclure tout. Par exemple: `"image:image_name_3 image:image_name_4"`, `image:.*` (**Remarque**: Cette variable n'est honorée que pour l'Autodécouverte.)

`DD_CONTAINER_INCLUDE_METRICS`
: Liste blanche des conteneurs dont vous souhaitez inclure les métriques.

`DD_CONTAINER_EXCLUDE_METRICS`
: Liste de blocage des conteneurs dont vous souhaitez exclure les métriques.

`DD_CONTAINER_INCLUDE_LOGS`
: Liste d'autorisation des conteneurs dont vous souhaitez inclure les journaux.

`DD_CONTAINER_EXCLUDE_LOGS`
: Liste de blocage des conteneurs dont vous souhaitez exclure les journaux.

`DD_AC_INCLUDE`
: **Obsolète**. Liste d'autorisation des conteneurs à inclure (séparés par des espaces). Utilisez `.*` pour inclure tout. Par exemple: `"image:image_name_1 image:image_name_2"`, `image:.*`

`DD_AC_EXCLUDE`
: **Obsolète**. Liste de blocage des conteneurs à exclure (séparés par des espaces). Utilisez `.*` pour exclure tout. Par exemple : `"image:image_name_3 image:image_name_4"`, `image:.*` (**Remarque** : Cette variable n'est prise en compte que pour Autodiscovery.)

Des exemples supplémentaires sont disponibles sur la page [Container Discovery Management][20].

**Remarque** : Les métriques `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` et `.stopped.total` ne sont pas affectées par ces paramètres. Tous les conteneurs sont comptés. Cela n'affecte pas votre facturation par conteneur.

**Remarque** : Lors de l'utilisation de containerd, il est possible d'ignorer les conteneurs par espace de noms en utilisant `DD_CONTAINERD_NAMESPACES` et `DD_CONTAINERD_EXCLUDE_NAMESPACES`. Les deux sont une liste d'espaces de noms séparés par des espaces. Lorsque `DD_CONTAINERD_NAMESPACES` est défini, l'agent rapporte des données pour les conteneurs appartenant à un espace de noms présent dans la liste. Lorsque `DD_CONTAINERD_EXCLUDE_NAMESPACES` est défini, l'agent rapporte des données pour tous les conteneurs sauf ceux appartenant à un espace de noms de la liste.

#### Autodiscovery {#autodiscovery}

`DD_LISTENERS`
: Autodiscovery listeners à exécuter.

`DD_EXTRA_LISTENERS`
: Autodiscovery listeners supplémentaires à exécuter. Ils sont ajoutés en plus des variables définies dans la section `listeners` du fichier de configuration `datadog.yaml`.

`DD_CONFIG_PROVIDERS`
: Les fournisseurs que l'Agent doit appeler pour collecter les configurations de vérification. Le fournisseur par défaut est `docker`. Le fournisseur Docker gère les modèles intégrés dans les étiquettes des conteneurs.

`DD_EXTRA_CONFIG_PROVIDERS`
: Fournisseurs de configuration d'autodécouverte supplémentaires à utiliser. Ils sont ajoutés en plus des variables définies dans la section `config_providers` du fichier de configuration `datadog.yaml`.

#### Divers {#miscellaneous}

`DD_PROCESS_AGENT_CONTAINER_SOURCE`
: Remplace la détection automatique de la source du conteneur pour forcer une seule source. par exemple `"docker"`, `"ecs_fargate"`, `"kubelet"`. Cela n'est plus nécessaire depuis l'Agent v7.35.0.

`DD_HEALTH_PORT`
: Réglez cela sur `5555` pour exposer le contrôle de santé de l'Agent au port `5555`.

## Commands {#commands}

Consultez les [Agent Commands guides][21] pour découvrir toutes les commandes de l'Agent Docker.

## Données collectées {#data-collected}

### Métriques {#metrics}

Par défaut, l'Agent Docker collecte des métriques avec les vérifications de base suivantes. Pour collecter des métriques d'autres technologies, consultez la section [Intégrations](#integrations).

| Vérifier       | Métriques       |
| ----------- | ------------- |
| Conteneur   | [Métriques][22] |
| CPU         | [Système][23]  |
| Disque      | [Disque][24]    |
| Docker      | [Docker][25]  |
| Descripteur de fichier | [Système][23]  |
| IO          | [Système][23]  |
| Charge       | [Système][23]  |
| Mémoire      | [Système][23]  |
| Réseau     | [Réseau][26] |
| NTP         | [NTP][27]     |
| Temps d'activité      | [Système][23]  |

### Événements {#events}

L'Agent Docker envoie des événements à Datadog lorsqu'un Agent est démarré ou redémarré.

### Vérifications de service {#service-checks}

**datadog.agent.up** <br>
Renvoie `CRITICAL` si l'Agent ne peut pas se connecter à Datadog, sinon renvoie `OK`.

**datadog.agent.check_status** <br>
Renvoie `CRITICAL` si une vérification de l'Agent ne peut pas envoyer de métriques à Datadog, sinon renvoie `OK`.

## Désinstaller l'instrumentation APM en une seule étape {#uninstall-single-step-apm-instrumentation}

Si vous avez installé l'Agent Docker Datadog avec l'instrumentation APM en une seule étape, et que vous souhaitez désinstaller l'Agent, vous devez [exécuter des commandes supplémentaires][28] pour désinstaller l'instrumentation APM.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/
[2]: /fr/agent/supported_platforms/?tab=cloudandcontainers
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[4]: /fr/containers/guide/compose-and-the-datadog-agent/
[5]: /fr/containers/guide/podman-support-with-docker-integration/
[6]: /fr/containers/docker/integrations/
[7]: /fr/getting_started/containers/autodiscovery
[8]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /fr/containers/docker/apm/
[10]: /fr/agent/configuration/proxy/#agent-v6
[11]: /fr/containers/docker/apm/?tab=linux#tracing-from-other-containers
[12]: /fr/containers/docker/log/
[13]: /fr/infrastructure/process/
[14]: /fr/infrastructure/livecontainers/
[15]: /fr/extend/dogstatsd/
[16]: /fr/extend/dogstatsd/unix_socket/
[17]: /fr/getting_started/tagging/unified_service_tagging/?tab=docker
[18]: /fr/containers/docker/tag
[19]: /fr/agent/configuration/secrets-management/?tab=linux
[20]: /fr/containers/guide/container-discovery-management/?tab=containerizedagent
[21]: /fr/agent/configuration/agent-commands/
[22]: /fr/integrations/container/
[23]: /fr/integrations/system/#metrics
[24]: /fr/integrations/disk/#metrics
[25]: /fr/containers/docker/data_collected/#metrics
[26]: /fr/integrations/network/#metrics
[27]: /fr/integrations/ntp/#metrics
[28]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker/#remove-single-step-apm-instrumentation-from-your-agent