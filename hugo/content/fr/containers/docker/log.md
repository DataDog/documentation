---
aliases:
- /fr/logs/docker
- /fr/logs/languages/docker
- /fr/logs/log_collection/docker
- /fr/agent/docker/log
description: Configurez la collecte des journaux des applications s'exécutant dans
  des conteneurs Docker à l'aide de l'Agent Datadog
further_reading:
- link: logs/explorer
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /agent/docker/apm/
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/docker/prometheus/
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/docker/integrations/
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/docker/tag/
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: /containers/troubleshooting/log-collection
  tag: Documentation
  text: Dépannage de la collecte des journaux des conteneurs
title: Collecte de logs Docker
---
## Aperçu {#overview}

L'Agent Datadog 6+ collecte les journaux des conteneurs. Deux types d'installation sont disponibles :

La configuration de la collecte des journaux dépend de votre environnement actuel. Choisissez l'une des installations suivantes pour commencer :

- Si votre environnement écrit **tous** les journaux dans `stdout`/`stderr`, suivez l'installation de l'[Agent containerisé](?tab=containerized-agent#installation).

- Si vous ne pouvez pas déployer l'Agent containerisé et que votre conteneur écrit **tous** les journaux dans `stdout`/`stderr`, suivez l'installation de l'[Agent hôte](?tab=hostagent#installation) pour activer la journalisation containerisée dans votre fichier de configuration de l'Agent.

- Si votre conteneur écrit des journaux dans des fichiers (écrit partiellement des journaux dans `stdout`/`stderr` et écrit des journaux dans des fichiers OU écrit entièrement des journaux dans des fichiers), suivez l'installation de l'[Agent hôte avec collecte de journaux personnalisée](?tab=hostagentwithcustomlogging#installation) ou suivez l'installation de l'[Agent containerisé](?tab=containerized-agent#installation) et vérifiez l'[exemple de configuration de collecte de journaux à partir de fichiers avec Autodécouverte](?tab=logcollectionfromfile#examples).

Les commandes CLI sur cette page concernent le Docker runtime. Remplacez `docker` par `nerdctl` pour le containerd runtime, ou `podman` pour le Podman runtime. Le support pour la collecte de journaux containerd et Podman est limité.

## Installation {#installation}

{{< tabs >}}
{{% tab "Installation de conteneur" %}}

Pour exécuter un [conteneur Docker][1] qui intègre l'Agent Datadog de façon à surveiller votre host, utilisez la commande suivante pour votre système d'exploitation respectif :

### Linux {#linux}
Pour la configuration suivante, remplacez `<DD_SITE>` par {{< region-param key="dd_site" code="true">}}:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           registry.datadoghq.com/agent:latest
```

### Windows {#windows}
Pour la configuration suivante, remplacez `<DD_SITE>` par {{< region-param key="dd_site" code="true">}}:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           -v c:\programdata\docker\containers:c:\programdata\docker\containers:ro
           registry.datadoghq.com/agent:latest
```

### macOS {#macos}
Ajoutez le chemin `/opt/datadog-agent/run` sous Docker Desktop -> Paramètres -> Ressources -> Partage de fichiers.

Pour la configuration suivante, remplacez `<DD_SITE>` par {{< region-param key="dd_site" code="true">}}:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           registry.datadoghq.com/agent:latest
```

Il est recommandé de choisir la dernière version de l'Agent Datadog. Consultez la liste complète des [images pour l'Agent v6][2] sur GCR.

Les commandes liées à la collecte de logs sont les suivantes :

`-e DD_LOGS_ENABLED=true`                                     
: Active la collecte des journaux lorsqu'il est réglé sur `true`. L'Agent recherche des instructions de journalisation dans les fichiers de configuration.

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: Ajoute une configuration de journal qui permet la collecte des journaux pour tous les conteneurs.

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: Pour éviter la perte des journaux des conteneurs lors des redémarrages ou des problèmes de réseau, la dernière ligne de journal collectée pour chaque conteneur dans ce répertoire est stockée sur l'hôte.

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: Empêche l'Agent Datadog de collecter et d'envoyer ses propres journaux et métriques. Supprimez ce paramètre si vous souhaitez collecter les journaux ou les métriques de l'Agent Datadog. Cette valeur de paramètre prend en charge les expressions régulières.

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: Pour se connecter au démon Docker afin de découvrir les conteneurs et de collecter `stdout/stderr` à partir du socket Docker.

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: Pour collecter les journaux des conteneurs à partir des fichiers. Disponible dans l'Agent Datadog 6.27.0/7.27.0+

**Remarque** : Si vous utilisez Docker Compose, la valeur pour `DD_CONTAINER_EXCLUDE` ne doit pas être entre guillemets. Configurez la variable d'environnement dans votre fichier docker-compose.yaml comme dans l'exemple ci-dessous :

```yaml
environment:
    - DD_CONTAINER_EXCLUDE=image:datadog/agent:*
```

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Agent de host" %}}

1. Installez la [dernière version de l'Agent][1] sur votre hôte.
2. La collecte des journaux est _désactivée_ par défaut dans l'Agent Datadog. Pour l'activer, ajoutez les lignes suivantes dans votre fichier de configuration `datadog.yaml` :

    ```yaml
    logs_enabled: true
    listeners:
        - name: docker
    config_providers:
        - name: docker
          polling: true
    logs_config:
        container_collect_all: true
    ```
3. **Windows 10 uniquement** : L'utilisateur de l'Agent Datadog doit être membre du groupe `docker-users` afin d'avoir les permissions nécessaires pour travailler avec les conteneurs Docker. Exécutez `net localgroup docker-users "ddagentuser" /ADD` depuis votre invite de commande Administrateur ou suivez les étapes de configuration du [Groupe d'Utilisateurs Docker][2].  
4. [Redémarrez l'Agent][3] pour voir tous vos journaux de conteneur dans Datadog.

[1]: /fr/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent hôte avec journalisation personnalisée" %}}

1. Installez la [dernière version de l'Agent][1] sur votre hôte.
2. Suivez la [documentation de collecte de journaux personnalisés][2] pour suivre les fichiers de journaux.

    Pour rassembler les journaux de votre `<APP_NAME>` application stockée dans `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, créez un fichier `<APP_NAME>.d/conf.yaml` à la racine de votre [répertoire de configuration de l'Agent][3] avec le contenu suivant :

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Redémarrez l'Agent][4] pour voir tous vos journaux de conteneur dans Datadog.

**Remarque** : Pour que l'Agent puisse collecter les journaux produits par un conteneur avec une configuration de journalisation personnalisée, les journaux doivent être écrits dans un volume accessible depuis l'hôte. Il est recommandé que les journaux de conteneur soient écrits dans `stdout` et `stderr` afin qu'ils puissent être collectés automatiquement. 

[1]: /fr/agent/basic_agent_usage/
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/configuration/agent-configuration-files/
[4]: /fr/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Remarques importantes** :

- Les métadonnées des conteneurs ne sont pas récupérées avec la collecte de journaux personnalisés, par conséquent, l'Agent n'assigne pas automatiquement des balises de conteneur aux journaux. Utilisez [des balises personnalisées][1] pour créer des balises de conteneur.

- `source` et `service` a pour valeur par défaut celle de la balise `short_image` dans Datadog Agent 6.8+. Les valeurs source et service peuvent être remplacées par l'Autodécouverte comme décrit ci-dessous. Définir la valeur `source` sur un nom d'intégration entraîne l'installation d'integration Pipelines qui analysent vos journaux et en extraient les informations pertinentes.

- Les journaux provenant du conteneur `Stderr` ont un statut par défaut de `Error`.

- Si vous utilisez le pilote de journalisation _journald_ au lieu du pilote de journalisation json-file par défaut de Docker, consultez la [documentation d'intégration journald][2] pour des détails concernant la configuration des environnements conteneurisés. Consultez la [documentation des unités de filtre journald][2] pour plus d'informations sur les paramètres de filtrage.


## Intégrations de journaux {#log-integrations}

Dans Datadog Agent 6.8+, `source` et `service` ont pour valeur par défaut la valeur de la balise `short_image`. Cela permet à Datadog d'identifier la source des journaux pour chaque conteneur et d'installer automatiquement l'intégration correspondante.

Le nom d'image court du conteneur peut ne pas correspondre au nom de l'intégration pour les images personnalisées et peut être remplacé pour mieux refléter le nom de votre application. Cela peut être fait avec [Datadog Autodiscovery][3] et [les annotations de pod dans Kubernetes][4] ou les étiquettes de conteneur.

Autodiscovery s'attend à des étiquettes qui suivent ce format, selon le type de fichier :

{{< tabs >}}
{{% tab "Dockerfile" %}}

Ajoutez le `LABEL` suivant à votre Dockerfile :

```text
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Ajoutez l'étiquette suivante dans votre fichier `docker-compose.yaml` :

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "Commande Exécuter" %}}

Ajoutez l'étiquette suivante comme commande d'exécution :

```text
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

Où `<LOG_CONFIG>` est la configuration de collecte des journaux que vous trouverez dans un fichier de configuration d'intégration. [Voir la configuration de collecte des journaux pour en savoir plus][5].

**Remarque** : Lors de la configuration de la valeur `service` via des étiquettes Docker, Datadog recommande d'utiliser le balisage de service unifié comme meilleure pratique. Le balisage de service unifié relie toutes les télémétries Datadog, y compris les journaux, grâce à l'utilisation de trois étiquettes standard : `env`, `service` et `version`. Pour apprendre à configurer votre environnement avec le balisage unifié, consultez la [documentation sur le balisage de service unifié][6].

### Exemples {#examples}

{{< tabs >}}
{{% tab "NGINX Dockerfile" %}}

Le Dockerfile suivant active l'intégration des journaux NGINX sur le conteneur correspondant (la valeur `service` peut être modifiée) :

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

Pour permettre les intégrations NGINX des métriques et des logs :

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Journaux Java multi-lignes" %}}

Pour les logs multiligne tels que les traces de pile, l'Agent dispose de [règles de traitement multiligne][1] pour agréger les lignes dans un seul log.

Exemple de log (traces de pile Java) :

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Utilisez l'étiquette `com.datadoghq.ad.logs` comme ci-dessous sur vos conteneurs pour vous assurer que le journal ci-dessus est correctement collecté :

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

Consultez la [documentation relative aux règles de processing multiligne][1] pour obtenir d'autres d'exemples d'expressions.


[1]: /fr/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "Depuis un fichier" %}}

L'Agent v7.25.0+/6.25.0+ peut collecter directement des journaux à partir d'un fichier basé sur une étiquette d'Autodiscovery de conteneur. Pour collecter ces journaux, utilisez l'étiquette `com.datadoghq.ad.logs` comme indiqué ci-dessous sur vos conteneurs pour collecter `/logs/app/prod.log` :

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

Les journaux collectés à partir d'un fichier sont étiquetés avec les métadonnées du conteneur. La collecte des journaux est liée au cycle de vie du conteneur, dès que le conteneur s'arrête, la collecte des journaux à partir de ce fichier s'arrête.


**Remarques** :

- Le chemin du fichier est **relatif** à l'Agent, donc le répertoire contenant le fichier doit être partagé entre le conteneur exécutant l'application et le conteneur de l'Agent. Par exemple, si le conteneur monte `/logs`, chaque conteneur écrivant dans un fichier peut monter un volume tel que `/logs/app` où le fichier journal est écrit.

- Lorsque vous utilisez ce type d'étiquette sur un conteneur, ses journaux `stderr`/`stdout` ne sont pas collectés automatiquement. Si la collecte à partir de `stderr`/`stdout` et d'un fichier est nécessaire, elle doit être explicitement activée en utilisant une étiquette, par exemple :

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- Lorsque vous utilisez ce type de combinaison, `source` et `service` n'ont pas de valeur par défaut et doivent être explicitement définis dans l'étiquette d'Autodécouverte.

{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les fonctionnalités d'Autodécouverte peuvent être utilisées avec ou sans la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`. Choisissez l'une des options suivantes :

- Utilisez des étiquettes de conteneur ou des annotations de pod pour choisir les conteneurs à partir desquels collecter les journaux.
- Utilisez la variable d'environnement pour collecter les journaux de tous les conteneurs, puis remplacez les valeurs par défaut `source` et `service`.
- Ajoutez des règles de traitement pour le sous-ensemble de conteneurs souhaité.

## Collecte avancée des journaux {#advanced-log-collection}

Utilisez les étiquettes de log Autodiscovery afin d'appliquer la logique de processing pour la collecte de logs avancée, par exemple :

- [Filtrer les journaux avant de les envoyer à Datadog][7].
- [Nettoyer les données sensibles de vos journaux][8].
- [Procéder à l'agrégation multi-lignes][9].

## Collecte des journaux de conteneur Docker à partir d'un fichier {#docker-container-log-collection-from-a-file}

La collecte des journaux de conteneur Docker à partir d'un fichier est une alternative à la collecte via le socket Docker. La collecte basée sur des fichiers offre de meilleures performances que la collecte basée sur des sockets.

Dans les versions 7.27.0/6.27.0+, vous pouvez configurer l'Agent pour collecter les journaux des conteneurs Docker à partir d'un fichier. Dans les versions 6.33.0+/7.33.0+, l'Agent collecte par défaut les journaux des conteneurs Docker à partir d'un fichier. 

La collecte basée sur des fichiers nécessite que le répertoire stockant les journaux des conteneurs Docker soit exposé à l'Agent à l'emplacement suivant : `/var/lib/docker/containers` (`c:\programdata\docker\containers` sur Windows). Consultez le [guide de dépannage de la collecte des journaux Docker][10] pour plus d'informations.

**Remarque** :
- Lorsque vous migrez de la collecte de journaux de conteneurs basée sur le socket Docker à la collecte de journaux basée sur des fichiers, seuls les nouveaux conteneurs font l'objet d'une lecture en continu de leurs fichiers. Vous pouvez forcer l'Agent à collecter tous les journaux de conteneurs à partir des fichiers en définissant la variable d'environnement `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` sur `true`. Forcer l'Agent à collecter tous les journaux de conteneurs à partir des fichiers peut entraîner des journaux dupliqués pour les conteneurs existants.
- Si vous revenez de la collecte de journaux de conteneurs basée sur des fichiers à la collecte via le socket Docker, vous verrez probablement des journaux dupliqués pour les conteneurs existants.

## Filtrer les conteneurs {#filter-containers}

Il est possible de définir les conteneurs dont vous souhaitez collecter des journaux. Cela peut être utile pour éviter la collecte des journaux de l'Agent Datadog, par exemple. Consultez la [Gestion de la découverte des conteneurs][11] pour en savoir plus.

## Conteneurs à courte durée de vie {#short-lived-containers}

Pour un environnement Docker, l'Agent reçoit des mises à jour de conteneurs en temps réel via des événements Docker. L'Agent extrait et met à jour la configuration à partir des étiquettes de conteneur (Autodécouverte) chaque seconde.

À partir de l'Agent v6.14+, l'Agent recueille les logs de tous les conteneurs (qu'ils soient exécutés ou arrêtés). Par conséquent, les logs des conteneurs de courte durée qui ont été lancés ou arrêtés il y a moins d'une seconde sont également recueillis tant qu'ils ne sont pas supprimés.

Pour les environnements Kubernetes, consultez la [documentation sur les conteneurs à courte durée de vie Kubernetes][12].

## Dépannage {#troubleshooting}

Pour les étapes de dépannage, consultez [Dépannage de la collecte de journaux de conteneurs][13].

## Pour en savoir plus {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[2]: /fr/integrations/journald/
[3]: /fr/agent/docker/integrations/
[4]: /fr/agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[5]: /fr/agent/logs/#custom-log-collection
[6]: /fr/getting_started/tagging/unified_service_tagging
[7]: /fr/agent/logs/advanced_log_collection/?tab=docker#filter-logs
[8]: /fr/agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[9]: /fr/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
[10]: /fr/logs/guide/docker-logs-collection-troubleshooting-guide/
[11]: /fr/agent/guide/autodiscovery-management/
[12]: /fr/agent/kubernetes/log/?tab=daemonset#short-lived-containers
[13]: /fr/containers/troubleshooting/log-collection/