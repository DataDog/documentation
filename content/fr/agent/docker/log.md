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

- Si votre conteneur écrit les logs dans des fichiers (environnement avec des logs à la fois dans `stdout`/`stderr` et dans des fichiers ou environnement avec des logs exclusivement dans des fichiers), suivez les étapes de l'installation de l'[Agent de host avec collecte de logs personnalisée](?tab=agent-de-host-avec-journalisation-personnalisee#installation).

## Installation

{{< tabs >}}
{{% tab "Installation de l'Agent conteneurisé" %}}

Afin de lancer un [conteneur Docker][1] qui intègre l'Agent Datadog pour surveiller votre host, utilisez la commande suivante :

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
           --name datadog-agent \
           -e DD_API_KEY="<CLÉ_API_DATADOG>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           datadog/agent
```

**Remarque** : sur les systèmes Windows, exécutez cette commande sans les montages de volume. C'est-à-dire :

```shell
DOCKER_CONTENT_TRUST=1 docker run -d \
           --name datadog-agent \
           -e DD_API_KEY="<CLÉ_API_DATADOG>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           datadog/agent
```

Nous vous conseillons de choisir la dernière version de l'Agent Datadog. La liste complète des [images de l'Agent v6][2] est disponible sur GCR.

Voici les commandes associées à la collecte de logs :

| Commande                                               | Description                                                                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-e DD_LOGS_ENABLED=true`                             | L'envoi de cette commande avec la valeur `true` active la collecte de logs. L'Agent recherche les instructions relatives aux logs dans les fichiers de configuration.                                                          |
| `-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`        | Ajoute une configuration de log qui active la collecte de logs pour tous les conteneurs.                                                                                         |
| `-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw` | Pour éviter de perdre des logs de conteneur lors des redémarrages ou des problèmes de réseau, la dernière ligne de log recueillie pour chaque conteneur dans ce répertoire est stockée sur le host.     |
| `-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`               | Empêche l'Agent Datadog de recueillir et d'envoyer ses propres logs et métriques. Supprimez ce paramètre si vous souhaitez recueillir les logs et les métriques de l'Agent Datadog. La valeur de ce paramètre prend en charge les expressions régulières. |
| `-v /var/run/docker.sock:/var/run/docker.sock:ro`     | Les logs sont recueillis à partir du `stdout/stderr` du conteneur via le socket Docker.                                                                                        |

[1]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
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

3. [Redémarrez l'Agent][2]pour afficher tous vos logs de conteneur dans Datadog.

[1]: /fr/agent/basic_agent_usage/
[2]: /fr/agent/guide/agent-commands/#restart-the-agent
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

- Si vous utilisez le pilote de journalisation _journald_ à la place du pilote json-file par défaut de Docker, consultez la documentation relative à l'[intégration de journald][2] pour obtenir des instructions de configuration spécifiques aux environnements conteneurisés. Consultez la documentation sur les [unités de filtrage journald][2] pour en savoir plus sur les paramètres de filtrage.

## Collecte de logs pour des intégrations

Pour l'Agent Datadog 6.8 et les versions ultérieures, les paramètres `source` et `service` sont définis par défaut sur la valeur du tag `short_image`. Cela permet à Datadog d'identifier la source du log pour chaque conteneur et d'installer automatiquement l'intégration correspondante.

Le nom raccourci de l'image du conteneur peut être différent du nom de l'intégration pour les images personnalisées, et peut être remplacé pour correspondre davantage au nom de votre application. Pour cela, vous pouvez utiliser la fonction [Autodiscovery de Datadog][1] et les [annotations de pod dans Kubernetes][3], ou les étiquettes de conteneur.

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

Lorsque `<CONFIG_LOGS>` est la configuration de collecte de logs, vous trouverez à l'intérieur un fichier de configuration d'intégration. [Consultez la section relative à la configuration de la collecte de logs pour en savoir plus][4].

**Remarque **: lorsque vous configurez la valeur `service` via les étiquettes Docker, Datadog vous conseille d'utiliser le tagging de service unifié. Le tagging de service unifié permet de lier toutes les données de télémétrie Datadog entre elles, y compris les logs, via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][5].

### Exemples

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


[1]: /fr/agent/logs/advanced_log_collection/#multi-line-aggregation
{{% /tab %}}
{{< /tabs >}}

**Remarque** : les fonctionnalités d'Autodiscovery peuvent être utilisées avec ou sans la variable d'environnement `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`. Choisissez l'une des options suivantes :

- Utilisez les étiquettes de conteneur ou les annotations de pod pour choisir les conteneurs à partir desquels recueillir les logs.
- Utilisez la variable d'environnement pour recueillir les logs de tous les conteneurs avant de remplacer les valeurs `source` et `service` par défaut.
- Ajoutez des règles de traitement pour le sous-ensemble de conteneurs souhaité.

## Collecte de logs avancée

Utilisez des étiquettes de log Autodiscovery afin d'appliquer une logique de traitement avancée pour la collecte de logs. Par exemple :

- [Filtrez les logs avant de les envoyer à Datadog][6].
- [Nettoyez les données sensibles de vos logs][7].
- [Effectuez une agrégation multiligne][8].

## Filtrer les conteneurs

Il est possible de spécifier les conteneurs à partir desquels vous souhaitez recueillir les logs. Ce filtrage peut par exemple vous servir à empêcher la collecte de logs de l'Agent Datadog. Consultez la section relative à la [gestion de la découverte de conteneurs][9] pour en savoir plus.

## Conteneurs de courte durée

Dans un environnement Docker, l'Agent reçoit les mises à jour des conteneurs en temps réel via les événements Docker. L'Agent extrait et met à jour la configuration toutes les secondes depuis les étiquettes de conteneur (Autodiscovery).

À partir de la version 6.14, l'Agent recueille les logs de tous les conteneurs (qu'ils soient exécutés ou arrêtés). Par conséquent, les logs des conteneurs de courte durée qui ont été lancés ou arrêtés il y a moins d'une seconde sont également recueillis tant qu'ils ne sont pas supprimés.

Pour les environnements Kubernetes, consultez la [documentation relative aux conteneurs de courte durée Kubernetes][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[2]: /fr/agent/logs/?tab=tailfiles
[3]: /fr/integrations/journald/
[4]: /fr/agent/docker/integrations/
[5]: /fr/agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[6]: /fr/agent/logs/#custom-log-collection
[7]: /fr/getting_started/tagging/unified_service_tagging
[8]: /fr/agent/logs/advanced_log_collection/?tab=docker#filter-logs
[9]: /fr/agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[10]: /fr/agent/kubernetes/log/?tab=daemonset#short-lived-containers