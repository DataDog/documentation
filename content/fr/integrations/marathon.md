---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    marathon-overview: assets/dashboards/marathon-overview_dashboard.json
  logs:
    source: marathon
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    marathon_processes: assets/saved_views/marathon_processes.json
  service_checks: assets/service_checks.json
categories:
  - configuration & deployment
  - containers
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/marathon/README.md'
display_name: Marathon
draft: false
git_integration_title: marathon
guid: 6af353ff-ecca-420a-82c0-a0e84cf0a35e
integration_id: marathon
integration_title: Marathon
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: marathon.
metric_to_check: marathon.apps
name: marathon
process_signatures:
  - start --master mesos marathon
public_title: Intégration Datadog/Marathon
short_description: "Suivez vos métriques d'application\_: mémoire et espace disque requis, nombre d'instances et plus encore."
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Le check Marathon de l'Agent vous permet de :

- Suivre l'état et la santé de chaque application en visualisant la mémoire, l'espace disque, la charge processeur et le nombre d'instances configurés, ainsi que le nombre de tâches saines et non saines.
- Surveiller le nombre d'applications en attente et le nombre de déploiements

## Configuration

### Installation

Le check Marathon est inclus avec le package de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur votre master Marathon.

### Configuration

Suivez les instructions ci-dessous pour configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `marathon.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple marathon.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     # the API endpoint of your Marathon master; required
     - url: "https://<SERVER>:<PORT>"
       # if your Marathon master requires ACS auth
       #   acs_url: https://<SERVER>:<PORT>

       # the username for Marathon API or ACS token authentication
       username: "<USERNAME>"

       # the password for Marathon API or ACS token authentication
       password: "<PASSWORD>"
   ```

   Les paramètres `username` et `password` peuvent avoir deux fonctions différentes : si vous avez configuré `acs_url`, l'Agent les utilise pour demander un token d'authentification à ACS, dont il se sert ensuite pour s'authentifier auprès de l'API Marathon. Dans le cas contraire, l'Agent utilise `username` et `password` pour s'authentifier directement auprès de l'API Marathon.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Étant donné que Marathon utilise Logback, vous pouvez spécifier un format de log personnalisé. Avec Datadog, deux formats sont pris en charge par défaut : le format par défaut fourni par Marathon et le format recommandé par Datadog. Ajoutez un file appender à votre configuration comme dans l'exemple suivant et remplacez `$PATTERN$` par le format de votre choix :

   - Format par défaut Marathon : `[%date] %-5level %message \(%logger:%thread\)%n`
   - Format recommandé par Datadog : `%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n`

   ```xml
     <?xml version="1.0" encoding="UTF-8"?>

     <configuration>
         <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>
         <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
             <encoder>
                 <pattern>[%date] %-5level %message \(%logger:%thread\)%n</pattern>
             </encoder>
         </appender>
         <appender name="async" class="ch.qos.logback.classic.AsyncAppender">
             <appender-ref ref="stdout" />
             <queueSize>1024</queueSize>
         </appender>
         <appender name="FILE" class="ch.qos.logback.core.FileAppender">
             <file>/var/log/marathon.log</file>
             <append>true</append>
             <!-- set immediateFlush to false for much higher logging throughput -->
             <immediateFlush>true</immediateFlush>
             <encoder>
                 <pattern>$PATTERN$</pattern>
             </encoder>
         </appender>
         <root level="INFO">
             <appender-ref ref="async"/>
             <appender-ref ref="FILE"/>
         </root>
     </configuration>
   ```

3. Ajoutez ce bloc de configuration à votre fichier `marathon.d/conf.yaml` pour commencer à recueillir vos logs Marathon :

   ```yaml
   logs:
     - type: file
       path: /var/log/marathon.log
       source: marathon
       service: "<SERVICE_NAME>"
   ```

4. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/marathon/datadog_checks/marathon/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                  |
| -------------------- | -------------------------------------- |
| `<NOM_INTÉGRATION>` | `marathon`                             |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                 |
| -------------- | ----------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "marathon", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][2] et cherchez `marathon` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "marathon" >}}


### Événements

Le check Marathon n'inclut aucun événement.

### Checks de service

**marathon.can_connect**:<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'API Marathon pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/