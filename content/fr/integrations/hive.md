---
assets:
  dashboards:
    Hive Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/hive/README.md'
display_name: Hive
git_integration_title: hive
guid: 3faee302-f293-45de-9eb8-ba6b7fa052a3
integration_id: hive
integration_title: Hive
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hive.
metric_to_check: hive.server.memory.total.used
name: hive
public_title: Intégration Datadog/Hive
short_description: "Recueille diverses métriques JMX fournies par HiveServer2 et Hive\_MetaStore"
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check surveille deux composants de [Hive][1] : Hive Metastore et HiveServer2.

## Configuration
### Installation

Le check Hive est inclus avec le paquet de l'[Agent Datadog][2]. Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Configuration de Hive

1. Modifiez le fichier de configuration de Hive dans [`HIVE_HOME/conf/hive-site.xml`][3] pour activer les métriques de Hive Metastore et de HiveServer2 en ajoutant les propriétés suivantes :

    ```xml
    <property>
      <name>hive.metastore.metrics.enabled</name>
      <value>true</value>
    </property>
    <property>
      <name>hive.server2.metrics.enabled</name>
      <value>true</value>
    </property>
    ```

2. Activez une connexion JMX à distance pour HiveServer2 et/ou Hive Metastore. Définissez par exemple la variable d'environnement `HADOOP_CLIENT_OPTS` :

    ```conf
    export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
    -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.port=8808"
    ```

    Redémarrez ensuite HiveServer2 ou Hive Metastore. Hive Metastore et HiveServer2 ne peuvent pas partager la même connexion JMX.

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `hive.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Hive. Consultez le [fichier d'exemple hive.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    Ce check prévoit une limite de 350 métriques par instance. Le nombre de métriques renvoyées est indiqué sur la page d'informations. Choisissez les métriques qui vous intéressent en modifiant la configuration ci-dessous.
    Pour découvrir comment modifier la liste des métriques à recueillir, consultez la [documentation relative aux checks JMX][5] afin d'obtenir des instructions détaillées. Si vous souhaitez surveiller davantage de métriques, contactez [l'assistance Datadog][6].

2. [Redémarrez l'Agent][7].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `hive.d/conf.yaml` pour commencer à recueillir vos logs Hive :

    ```
      logs:
        - type: file
          path: /tmp/<USER>/hive.log
          source: hive
          service: <SERVICE_NAME>
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \d{4}\-\d{2}\-\d{2}
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple hive.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][7].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][8] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

Pour recueillir des métriques avec l'intégration Datadog/Hive, consultez le guide [Autodiscovery avec JMX][9].

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][10].

| Paramètre      | Valeur                                                                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "hive", "service": "<NOM_SERVICE>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-\d{2}\-\d{2}"}}` |

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `Hive` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "hive" >}}


### Checks de service

 **hive.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance HiveServer2 ou Hive Metastore qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check Hive n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://cwiki.apache.org/confluence/display/Hive/Home
[2]: https://docs.datadoghq.com/fr/agent
[3]: https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/java
[6]: https://docs.datadoghq.com/fr/help
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[9]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[10]: https://docs.datadoghq.com/fr/agent/docker/log/
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/metadata.csv


{{< get-dependencies >}}