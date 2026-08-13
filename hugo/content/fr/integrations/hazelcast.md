---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Hazelcast Overview: assets/dashboards/overview.json
  logs:
    source: hazelcast
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- data store
- caching
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hazelcast/README.md
display_name: Hazelcast
draft: false
git_integration_title: hazelcast
guid: b2c63c99-f955-4494-a171-494f9dcf7d1f
integration_id: hazelcast
integration_title: Hazelcast
integration_version: 2.0.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hazelcast.
metric_to_check:
- hazelcast.mc.license_expiration_time
- hazelcast.instance.running
name: hazelcast
public_title: Intégration Datadog/Hazelcast
short_description: Surveillez les membres Hazelcast et le Management Center.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Hazelcast][1] 4.0 et ultérieur.

## Configuration

### Installation

Le check Hazelcast est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `hazelcast.d/conf.yaml` dans le dossier `conf.d/` à la racine du
   répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Hazelcast.
   Consultez le [fichier d'exemple hazelcast.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations.
   Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
   Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][2] afin d'obtenir des instructions détaillées.
   Si vous devez surveiller davantage de métriques, contactez [l'assistance Datadog][3].

2. [Redémarrez l'Agent][4].

##### Collecte de logs

1. Hazelcast prend en charge un vaste nombre d'[adaptateurs de logging][5] différents. Voici un exemple de fichier `log4j2.properties` :

   ```text
   rootLogger=file
   rootLogger.level=info
   property.filepath=/path/to/log/files
   property.filename=hazelcast

   appender.file.type=RollingFile
   appender.file.name=RollingFile
   appender.file.fileName=${filepath}/${filename}.log
   appender.file.filePattern=${filepath}/${filename}-%d{yyyy-MM-dd}-%i.log.gz
   appender.file.layout.type=PatternLayout
   appender.file.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   appender.file.policies.type=Policies
   appender.file.policies.time.type=TimeBasedTriggeringPolicy
   appender.file.policies.time.interval=1
   appender.file.policies.time.modulate=true
   appender.file.policies.size.type=SizeBasedTriggeringPolicy
   appender.file.policies.size.size=50MB
   appender.file.strategy.type=DefaultRolloverStrategy
   appender.file.strategy.max=100

   rootLogger.appenderRefs=file
   rootLogger.appenderRef.file.ref=RollingFile

   #Hazelcast specific logs.

   #log4j.logger.com.hazelcast=debug

   #log4j.logger.com.hazelcast.cluster=debug
   #log4j.logger.com.hazelcast.partition=debug
   #log4j.logger.com.hazelcast.partition.InternalPartitionService=debug
   #log4j.logger.com.hazelcast.nio=debug
   #log4j.logger.com.hazelcast.hibernate=debug
   ```

2. Par défaut, le pipeline d'intégration de Datadog prend en charge l'[expression][6] de conversion suivante :

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

    Dupliquez et modifiez le [pipeline d'intégration][7] si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

4. Ajoutez le bloc de configuration suivant à votre fichier `hazelcast.d/conf.yaml`. Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple hazelcast.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   logs:
     - type: file
       path: /var/log/hazelcast.log
       source: hazelcast
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Redémarrez l'Agent][4].

[1]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/integrations/java/
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration
[6]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[7]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

##### Collecte de métriques

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Docker][2].

| Paramètre      | Valeur                                              |
| -------------- | -------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "hazelcast", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `hazelcast` dans la section **JMXFetch** :

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hazelcast
      instance_name : hazelcast-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## Données collectées

### Métriques
{{< get-metrics-from-git "hazelcast" >}}


### Checks de service
{{< get-service-checks-from-git "hazelcast" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://hazelcast.org
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/