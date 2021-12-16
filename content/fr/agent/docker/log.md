---
title: Collecte de logs avec Docker
kind: documentation
aliases:
  - /fr/logs/docker
  - /fr/logs/languages/docker
  - /fr/logs/log_collection/docker
further_reading:
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
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
    text: Limiter la collecte de données à un sous-ensemble de conteneurs
  - link: /agent/docker/tag/
    tag: Documentation
    text: Attribuer des tags à toutes les données envoyées par un conteneur
---
## Présentation

L'Agent Datadog 6 (et ses versions ultérieures) recueille des logs à partir des conteneurs. Deux types d'installation sont disponibles :

La configuration de la collecte de logs dépend de votre environnement actuel. Choisissez l'une des installations suivantes pour commencer :

- Si votre environnement écrit **tous** les logs dans `stdout`/`stderr`, suivez les étapes de l'installation de l'[Agent conteneurisé](?tab=agent-conteneurise#installation).

- Si vous ne pouvez pas déployer l'Agent conteneurisé, et si votre conteneur écrit **tous** les logs dans `stdout`/`stderr`, suivez les étapes de l'installation de l'[Agent de host](?tab=agent-de-host#installation) pour activer la journalisation conteneurisée au sein du fichier de configuration de votre Agent.

- Si votre conteneur écrit les logs dans des fichiers (environnement avec des logs à la fois dans `stdout`/`stderr` et dans des fichiers ou environnement avec des logs exclusivement dans des fichiers), suivez les étapes de l'installation de l'[Agent de host avec collecte de logs personnalisée](?tab=hostagentwithcustomlogging#installation) ou de l'[Agent conteneurisé](?tab=containerized-agent#installation). Vérifiez ensuite le bon fonctionnement de la [collecte de logs à partir des fichiers avec l'exemple de configuration Autodiscovery](?tab=logcollectionfromfile#exemples).

## Installation

{{< tabs >}}
{{% tab "Installation de l'Agent conteneurisé" %}}

Afin de lancer un [conteneur Docker][1] qui intègre l'Agent Datadog pour surveiller votre host, utilisez la commande suivante :

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY=<CLÉ_API_DATADOG> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

**Remarque** : sur les systèmes Windows, exécutez cette commande sans aucun montage de volume. Exemple :

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY=<CLÉ_API_DATADOG> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           -v c:\programdata\docker\containers:c:\programdata\docker\containers:ro
           gcr.io/datadoghq/agent:latest
```

Nous vous conseillons de choisir la dernière version de l'Agent Datadog. La liste complète des [images de l'Agent v6][2] est disponible sur GCR.

Voici les commandes associées à la collecte de logs :

`-e DD_LOGS_ENABLED=true`                                     
: L'envoi de cette commande avec la valeur `true` active la collecte de logs. L'Agent recherche les instructions relatives aux logs dans les fichiers de configuration.

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: Ajoute une configuration de log qui active la collecte de logs pour tous les conteneurs.

`-e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true`            
: Ajoute une configuration de log qui active la collecte des logs de conteneur Docker depuis un fichier. Disponible pour les versions 7.27.0/6.27.0+ de l'Agent Datadog. Consultez la [section dédiée](#collecte-de-logs-de-conteneur-docker-depuis-un-fichier) pour en savoir plus.

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: Pour éviter de perdre des logs de conteneur lors des redémarrages ou des problèmes de réseau, la dernière ligne de log recueillie pour chaque conteneur dans ce répertoire est stockée sur le host.

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: Empêche l'Agent Datadog de recueillir et d'envoyer ses propres logs et métriques. Supprimez ce paramètre si vous souhaitez recueillir les logs ou les métriques de l'Agent Datadog. La valeur de ce paramètre prend en charge les expressions régulières.

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: Active la connexion au daemon Docker dans le but de découvrir des conteneurs et de recueillir les données `stdout/stderr` depuis le socket Docker.

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: Active la collecte des logs de conteneurs depuis des fichiers. Disponible avec l'Agent Datadog 6.27.0/7.27.0+.


[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Agent de host" %}}

1. Installez la [dernière version de l'Agent][1] sur votre host.
2. La collecte de logs est _désactivée_ par défaut dans l'Agent Datadog. Pour l'activer, ajoutez les lignes suivantes à votre fichier de configuration `datadog.yaml` :

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
3. **Windows 10 uniquement** : l'utilisateur de l'Agent Datadog doit faire partie du groupe `docker-users` pour bénéficier d'un accès aux conteneurs Docker. Exécutez la commande `net localgroup docker-users "ddagentuser" /ADD` depuis une invite de commande avec des droits administrateur ou suivez les étapes de configuration du [groupe d'utilisateurs Docker][2].
4. [Redémarrez l'Agent][3] pour afficher tous vos logs de conteneur dans Datadog.

[1]: /fr/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent de host avec journalisation personnalisée" %}}

1. Installez la [dernière version de l'Agent][1] sur votre host.
2. Suivez les instructions de la section [Collecte de logs personnalisée][2] pour suivre les fichiers de logs.

    Pour recueillir les logs de votre application `<NOM_APP>` stockés dans `<CHEMIN_FICHIER_LOG>/<NOM_FICHIER_LOG>.log`, créez un fichier `<NOM_APP>.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][3] avec le contenu suivant :

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Redémarrez l'Agent][4]pour afficher tous vos logs de conteneur dans Datadog.

[1]: /fr/agent/basic_agent_usage/
[2]: /fr/agent/logs/#custom-log-collection
[3]: /fr/agent/guide/agent-configuration-files/
[4]: /fr/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Remarques importantes** :

- Les métadonnées de conteneur ne sont pas récupérées par la collecte de logs personnalisée. Par conséquent, l'Agent n'attribue pas automatiquement de tags aux logs. Utilisez des [tags personnalisés][1] pour créer des tags de conteneur.

- Pour l'Agent Datadog 6.8 et les versions ultérieures, les paramètres `source` et `service` sont définis par défaut sur la valeur du tag `short_image`. Les valeurs de source et service peuvent être remplacées avec Autodiscovery, comme décrit ci-dessous. Définissez `source` sur le nom d'une intégration pour installer des pipelines d'intégration qui analysent vos logs et extraient leurs informations pertinentes.

- Les logs qui proviennent du `Stderr` du conteneur possèdent par défaut le statut `Error`.

- Si vous utilisez le pilote de journalisation _journald_ à la place du pilote json-file par défaut de Docker, consultez la [documentation relative à l'intégration de journald][2] pour obtenir des instructions de configuration spécifiques aux environnements conteneurisés. Consultez la [documentation sur les unités de filtrage journald][2] pour en savoir plus sur les paramètres de filtrage.

## Collecte de logs de conteneur Docker depuis un fichier

Avec l'Agent Datadog 7.27.0/6.27.0+, les logs de conteneur Docker peuvent être recueillis depuis un fichier. Cette méthode permet d'éviter d'utiliser le socket Docker. Elle est plus efficace et peut être utilisée dès que le répertoire stockant les logs de conteneur Docker est exposé à l'Agent à l'emplacement suivant : `/var/lib/docker/containers` (`c:\programdata\docker\containers` sous Windows). 

**Remarques importantes** :

- Lorsque vous passez d'une collecte basée sur le socket Docker à une collecte basée sur un fichier, seuls les nouveaux conteneurs sont suivis à partir du fichier. Si besoin, vous pouvez faire en sorte que l'Agent recueille tous les logs de conteneur à partir du fichier, en définissant la variable d'environnement `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` sur `true`. Avec cette solution, il est possible que des logs soient dupliqués pour les conteneurs dont certains logs avaient déjà été recueillis.

- Si un Agent repasse à une approche basée sur le socket Docker, il se peut que les logs des conteneurs existants se dupliquent.



## Intégrations de log

Pour l'Agent Datadog 6.8 et les versions ultérieures, les paramètres `source` et `service` sont définis par défaut sur la valeur du tag `short_image`. Cela permet à Datadog d'identifier la source du log pour chaque conteneur et d'installer automatiquement l'intégration correspondante.

Le nom raccourci de l'image du conteneur peut être différent du nom de l'intégration pour les images personnalisées, et peut être remplacé pour correspondre davantage au nom de votre application. Pour cela, vous pouvez utiliser la fonction [Autodiscovery de Datadog][3] et les [annotations de pod dans Kubernetes][4], ou les étiquettes de conteneur.

Selon le type de fichier, Autodiscovery exige les formats d'étiquettes suivants :

{{< tabs >}}
{{% tab "Dockerfile" %}}

Ajoutez l'étiquette `LABEL` suivante à votre Dockerfile :

```text
LABEL "com.datadoghq.ad.logs"='[<CONFIG_LOGS>]'
```

{{% /tab %}}
{{% tab "Docker-Compose" %}}

Ajoutez l'étiquette suivante à votre fichier `docker-compose.yaml` :

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "Commande Exécuter" %}}

Ajoutez l'étiquette suivante en tant que commande Exécuter :

```text
-l com.datadoghq.ad.logs='[<CONFIG_LOGS>]'
```

{{% /tab %}}
{{< /tabs >}}

Lorsque `<CONFIG_LOGS>` correspond à la configuration de collecte de logs, vous trouverez à l'intérieur un fichier de configuration d'intégration. [Consultez la section relative à la configuration de la collecte de logs pour en savoir plus][5].

**Remarque** : lorsque vous configurez la valeur `service` via les étiquettes Docker, Datadog vous conseille d'utiliser le tagging de service unifié. Cette approche permet de lier toutes les données de télémétrie Datadog entre elles, y compris les logs, via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la [documentation dédiée][6].

### Scénarios

{{< tabs >}}
{{% tab "Dockerfile NGINX" %}}

Le Dockerfile suivant permet l'intégration de log NGINX dans le conteneur correspondant (la valeur `service` peut être modifiée) :

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

Pour activer les intégrations NGINX de métrique et de log :

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Logs multiligne Java" %}}

Pour les logs multiligne tels que les stack traces, l'Agent dispose de [règles de traitement multiligne][1] pour agréger les lignes dans un seul log.

Exemple de log (stack traces Java) :

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Appliquez l'étiquette `com.datadoghq.ad.logs` à vos conteneurs comme indiqué ci-dessous pour que le log précédent soit correctement recueilli :

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

Consultez la [documentation relative aux règles de traitement multiligne][1] pour obtenir d'autres d'exemples d'expressions.


[1]: /fr/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "Depuis un fichier" %}}

L'Agent v7.25.0+/6.25.0+ peut directement recueillir les logs depuis un fichier en fonction d'une étiquette Autodiscovery de conteneur. Pour recueillir `/logs/app/prod.log` et récupérer vos logs, utilisez l'étiquette `com.datadoghq.ad.logs` comme indiqué ci-dessous sur vos conteneurs :

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

Les logs recueillis depuis un fichier sont tagués avec les métadonnées des conteneurs. La collecte de logs est liée au cycle de vie du conteneur : dès que le conteneur s'arrête, la collecte de logs depuis ce fichier s'arrête également.


**Remarques** :

- Le chemin du fichier est **relatif** à l'Agent : le répertoire contenant le fichier doit ainsi être partagé entre le conteneur qui exécute l'application et le conteneur de l'Agent. Par exemple, si le conteneur monte `/logs`, chaque conteneur écrivant des données dans un fichier peut monter un volume, par exemple `/logs/app`, afin d'y écrire le fichier de log.

- Lorsque vous utilisez ce type d'étiquette sur un conteneur, ses logs `stderr`/`stdout` ne sont pas recueillis automatiquement. Si vous devez effectuer une collecte depuis `stderr`/`stdout` et depuis un fichier, vous devez l'activer explicitement à l'aide d'une étiquette, par exemple :
```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- Lorsque vous utilisez ce type de combinaison, les paramètres `source` et `service` ne présentent aucune valeur par défaut et doivent être définis explicitement dans l'étiquette Autodiscovery.

{{% /tab %}}
{{< /tabs >}}

**Remarque** : les fonctionnalités d'Autodiscovery peuvent être utilisées avec ou sans la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`. Choisissez l'une des options suivantes :

- Utilisez les étiquettes de conteneur ou les annotations de pod pour choisir les conteneurs à partir desquels recueillir les logs.
- Utilisez la variable d'environnement pour recueillir les logs de tous les conteneurs avant de remplacer les valeurs `source` et `service` par défaut.
- Ajoutez des règles de traitement pour le sous-ensemble de conteneurs souhaité.

## Collecte de logs avancée

Utilisez des étiquettes de log Autodiscovery afin d'appliquer une logique de traitement avancée pour la collecte de logs. Par exemple :

- [Filtrer les logs avant de les envoyer à Datadog][7]
- [Nettoyer les données sensibles de vos logs][8]
- [Effectuer une agrégation multiligne][9]

## Filtrer les conteneurs

Il est possible de spécifier les conteneurs à partir desquels vous souhaitez recueillir les logs. Ce filtrage peut par exemple vous permettre d'éviter la collecte des logs de l'Agent Datadog. Consultez la section [Gestion de la découverte de conteneurs][10] pour en savoir plus.

## Conteneurs de courte durée

Dans un environnement Docker, l'Agent reçoit les mises à jour des conteneurs en temps réel via les événements Docker. L'Agent extrait et met à jour la configuration toutes les secondes depuis les étiquettes de conteneur (Autodiscovery).

À partir de la version 6.14, l'Agent recueille les logs de tous les conteneurs (qu'ils soient exécutés ou arrêtés). Par conséquent, les logs des conteneurs de courte durée qui ont été lancés ou arrêtés il y a moins d'une seconde sont également recueillis tant qu'ils ne sont pas supprimés.

Pour les environnements Kubernetes, consultez la [documentation relative aux conteneurs de courte durée Kubernetes][11].

## Pour aller plus loin

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
[10]: /fr/agent/guide/autodiscovery-management/
[11]: /fr/agent/kubernetes/log/?tab=daemonset#short-lived-containers