---
aliases:
  - /fr/integrations/zookeeper
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - notification
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/zk/README.md'
display_name: ZooKeeper
git_integration_title: zk
guid: 5519c110-5183-438e-85ad-63678c072ac7
integration_id: zookeeper
integration_title: ZooKeeper
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: zookeeper.
metric_to_check: zookeeper.connections
name: zk
process_signatures:
  - zkServer.sh start
  - java zoo.cfg
public_title: Intégration Datadog/ZooKeeper
short_description: Surveillez les connexions client et les latences et soyez informé des échecs de traitement des requêtes.
support: core
supported_os:
  - linux
  - mac_os
---
![Dashboard ZooKeeper][1]

## Présentation

Le check ZooKeeper vérifie les connexions client et les latences, surveille le nombre de requêtes non traitées et bien plus encore.

## Implémentation
### Installation

Le check ZooKeeper est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs ZooKeeper.

### Configuration

#### Liste blanche Zookeeper
Depuis la version 3.5 de Zookeeper, le paramètre `4lw.commands.whitelist` (voir la [documentation Zookeeper][7]) permet d'ajouter des [commandes à 4 lettres][8] à la liste blanche. Par défaut, seul la commande `srvr` est autorisée. Ajoutez `stat` et `mntr` à la liste blanche, car le processus d'intégration repose sur ces commandes.

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `zk.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) ZooKeeper.
  Consultez le [fichier d'exemple zk.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

#### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

1. ZooKeeper utilise le logger `log4j` par défaut. Pour activer la journalisation dans un fichier et personnaliser le format, modifiez le fichier `log4j.properties` :

    ```
      # Set root logger level to INFO and its only appender to R
      log4j.rootLogger=INFO, R
      log4j.appender.R.File=/var/log/zookeeper.log
      log4j.appender.R.layout=org.apache.log4j.PatternLayout
      log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n
    ```

2. Par défaut, notre pipeline d'intégration prend en charge les expressions de conversion suivantes :

    ```
      %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
      %d [%t] %-5p %c - %m%n
      %r [%t] %p %c %x - %m%n
    ```

    Vérifiez d'avoir bien dupliqué et modifié le pipeline d'intégration si vous utilisez un autre format.

3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

4. Supprimez la mise en commentaire du bloc de configuration suivant en bas de votre fichier `zk.d/conf.yaml`, puis modifiez-le :

    ```yaml
      logs:
        - type: file
          path: /var/log/zookeeper.log
          source: zookeeper
          service: myapp
          #To handle multi line that starts with yyyy-mm-dd use the following pattern
          #log_processing_rules:
          #  - type: multi_line
          #    name: log_start_with_date
          #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple zk.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

5. [Redémarrez l'Agent][6].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                  |
|----------------------|----------------------------------------|
| `<NOM_INTÉGRATION>` | `zk`                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                          |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port": "2181"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [collecte de logs avec Docker][12].

| Paramètre      | Valeur                                           |
|----------------|-------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "zk", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande status de l'Agent][9] et cherchez `zk` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "zk" >}}


#### Métriques obsolètes

Bien qu'elles soient toujours envoyées, les métriques suivantes seront prochainement supprimées :

 * `zookeeper.bytes_received`
 * `zookeeper.bytes_sent`

### Événements
Le check Zookeeper n'inclut aucun événement.

### Checks de service

**zookeeper.ruok** :<br>
Envoie `ruok` au nœud surveillé. Renvoie `OK` pour une réponse `imok`, renvoie `WARN` pour toute autre réponse ou renvoie `CRITICAL` si aucune réponse n'est reçue.

**zookeeper.mode** :<br>
L'Agent envoie ce check de service si `expected_mode` est configuré dans `zk.yaml`. Ce check renvoie `OK` lorsque le mode réel de ZooKeeper correspond à `expected_mode`. Si ce n'est pas le cas, il renvoie `CRITICAL`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][11].

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[8]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/zk/metadata.csv
[11]: https://docs.datadoghq.com/fr/help
[12]: https://docs.datadoghq.com/fr/agent/docker/log/


