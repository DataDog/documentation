---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    solr: assets/dashboards/solr_dashboard.json
  logs:
    source: solr
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    solr_processes: assets/saved_views/solr_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/solr/README.md
display_name: Solr
draft: false
git_integration_title: solr
guid: 0235124a-0207-44dd-aede-f578a6d46b26
integration_id: solr
integration_title: Solr
integration_version: 1.11.1
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: solr.
metric_to_check: solr.searcher.numdocs
name: solr
process_signatures:
- solr start
public_title: Intégration Datadog/Solr
short_description: Surveillez les taux de requêtes, les erreurs des gestionnaires,
  les miss et expulsions du cache, et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Graphique Solr][1]

## Présentation

Le check Solr permet de surveiller l'état et les performances d'un cluster Solr. Il recueille diverses métriques telles que le nombre de documents indexés, les hits et expulsions du cache, les temps de traitement moyens des requêtes, le nombre moyen de requêtes par seconde, et plus encore.

## Configuration

### Installation

Le check Solr est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds Solr.

Ce check étant basé sur JMX, vous devez activer les connexions JMX à distance sur vos serveurs Solr. Consultez la [documentation relative au check JMX][3] pour en savoir plus.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `solr.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple solr.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

     ## @param is_jmx - boolean - required
     ## Whether or not this file is a configuration for a JMX integration.
     #
     is_jmx: true

     ## @param collect_default_metrics - boolean - required
     ## Whether or not the check should collect all default metrics.
     #
     collect_default_metrics: true

   instances:
     ## @param host - string - required
     ## Solr host to connect to.
     - host: localhost

       ## @param port - integer - required
       ## Solr port to connect to.
       port: 9999
   ```

2. [Redémarrez l'Agent][3].

#### Liste des métriques

Le paramètre `conf` correspond à la liste des métriques devant être recueillies par l'intégration. Seules deux clés sont autorisées :

- `include` (**requis**) : dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres `exclude` (voir ci-dessous).
- `exclude` (**facultatif**) : dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.

Pour chaque bean, les métriques sont taguées de la manière suivante :

```text
mydomain:attr0=val0,attr1=val1
```

Dans cet exemple, votre métrique est `mondomaine` (ou un nom similaire, en fonction de l'attribut au sein du bean). Elle est associée aux tags `attr0:val0`, `attr1:val1` et `domain:mondomaine`.

Si vous spécifiez un alias dans une clé `include` au format _camel case_, il est converti au format _snake case_. Par exemple, `MonNomMétrique` devient `mon_nom_métrique` dans Datadog.

##### Le filtre attribute

Le filtre `attribute` accepte deux types de valeurs :

- Un dictionnaire dont les clés correspondent à des noms d'attributs (voir ci-dessous). Vous pouvez alors spécifier un alias pour la métrique, qui correspondra au nom de la métrique dans Datadog. Vous pouvez également indiquer le type de métrique, à savoir « gauge » ou « counter ». Si vous choisissez counter, un taux par seconde est calculé pour cette métrique.

  ```yaml
  conf:
    - include:
      attribute:
        maxThreads:
          alias: tomcat.threads.max
          metric_type: gauge
        currentThreadCount:
          alias: tomcat.threads.count
          metric_type: gauge
        bytesReceived:
          alias: tomcat.bytes_rcvd
          metric_type: counter
  ```

- Une liste de noms d'attributs (voir ci-dessous). La métrique est alors de type gauge, et son nom correspond à `jmx.\[NOM_DOMAINE].\[NOM_ATTRIBUT]`.

  ```yaml
  conf:
    - include:
      domain: org.apache.cassandra.db
      attribute:
        - BloomFilterDiskSpaceUsed
        - BloomFilterFalsePositives
        - BloomFilterFalseRatio
        - Capacity
        - CompressionRatio
        - CompletedTasks
        - ExceptionCount
        - Hits
        - RecentHitRate
  ```

#### Anciennes versions

La liste de filtres est uniquement prise en charge pour les versions > 5.3.0 de l'Agent Datadog. Si vous utilisez une version antérieure, utilisez plutôt des singletons et plusieurs déclarations `include`.

```yaml
# Agent Datadog > 5.3.0
  conf:
    - include:
      domain: nom_domaine
      bean:
        - premier_nom_domaine
        - deuxieme_nom_domaine
# Anciennes versions de l'Agent Datadog
  conf:
    - include:
      domain: nom_domaine
      bean: premier_nom_bean
    - include:
      domain: nom_domaine
      bean: deuxieme_nom_bean
```

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Pour les environnements conteneurisés, consultez le guide [Autodiscovery avec JMX][1].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

      ```yaml
       logs_enabled: true
     ```

2. Solr utilise le logger `log4j` par défaut. Pour personnaliser le format de logging, modifiez le fichier [`server/resources/log4j2.xml`][2]. Par défaut, le pipeline d'intégration de Datadog prend en charge l'[expression][3] de conversion suivante :

   ```text
   %maxLen{%d{yyyy-MM-dd HH:mm:ss.SSS} %-5p (%t) [%X{collection} %X{shard} %X{replica} %X{core}] %c{1.} %m%notEmpty{ =>%ex{short}}}{10240}%n
   ```

    Dupliquez et modifiez le [pipeline d'intégration][4] si vous utilisez un autre format.


3. Supprimez la mise en commentaire du bloc de configuration des logs du fichier `solr.d/conf.yaml` et modifiez les paramètres. Modifiez les valeurs des paramètres `type`, `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple solr.d/solr.yaml][5] pour découvrir toutes les options de configuration disponibles.

      ```yaml
       logs:
         - type: file
           path: /var/solr/logs/solr.log
           source: solr
           # To handle multi line that starts with yyyy-mm-dd use the following pattern
           # log_processing_rules:
           #   - type: multi_line
           #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #     name: new_log_start_with_date
     ```

4. [Redémarrez l'Agent][6].

Pour activer les logs pour les environnements Kubernetes, consultez la section [Collecte de logs Kubernetes][7].

[1]: https://docs.datadoghq.com/fr/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://lucene.apache.org/solr/guide/configuring-logging.html#permanent-logging-settings
[3]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[4]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[5]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `solr` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "solr" >}}


### Événements

Le check Solr n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "solr" >}}


## Dépannage

### Commandes pour afficher les métriques disponibles

La commande `datadog-agent jmx` a été ajoutée dans la version 4.1.0.

- Énumérer les attributs qui correspondent au moins à l'une de vos configurations d'instance :
  `sudo datadog-agent jmx list matching`
- Énumérer les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies :
  `sudo datadog-agent jmx list limited`
- Énumérer les attributs devant être recueillis par vos configurations d'instance actuelles :
  `sudo datadog-agent jmx list collected`
- Énumérer les attributs qui ne correspondent à aucune de vos configurations d'instance :
  `sudo datadog-agent jmx list not-matching`
- Énumérer l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch :
  `sudo datadog-agent jmx list everything`
- Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console :
  `sudo datadog-agent jmx collect`

## Pour aller plus loin

### Parsing d'une valeur de chaîne en tant que nombre

Cela peut être utile si votre JMXFetch renvoie uniquement des valeurs de chaîne telles que **false** et **true** et que vous souhaitez les transformer en métriques gauge Datadog pour une utilisation avancée. Par exemple, si vous souhaitez obtenir l'équivalence suivante pour votre JMXFetch :

```text
"myJmxfetch:false" = myJmxfetch:0
"myJmxfetch:true" = myJmxfetch:1
```

Vous pouvez utiliser le filtre `attribute` comme suit :

```yaml
# ...
attribute:
  myJmxfetch:
    alias: nom_votre_métrique
    metric_type: gauge
    values:
      "false": 0
      "true": 1
```


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/solr/images/solrgraph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/integrations/java/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information