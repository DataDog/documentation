---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/solr/README.md'
display_name: Solr
git_integration_title: solr
guid: 0235124a-0207-44dd-aede-f578a6d46b26
integration_id: solr
integration_title: Solr
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: solr.
metric_to_check: solr.cache.hits
name: solr
process_signatures:
  - solr start
public_title: Intégration Datadog/Solr
short_description: 'Surveillez les taux de requêtes, les erreurs des gestionnaires, les miss et expulsions du cache, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique Solr][1]

## Présentation

Le check Solr permet de surveiller l'état et les performances d'un cluster Solr. Il recueille diverses métriques telles que le nombre de documents indexés, les hits et expulsions du cache, les délais de traitement moyens des requêtes, le nombre moyen de requêtes par seconde, et plus encore.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Solr est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos nœuds Solr.

Ce check étant basé sur JMX, vous devez activer une connexion JMX à distance sur vos serveurs Solr. Consultez la [documentation relative au check JMX][4] pour en savoir plus à ce sujet.

### Configuration

Modifiez le fichier `solr.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][5]. Consultez le [fichier d'exemple solr.d/conf.yaml][6] pour découvrir toutes les options de configuration disponibles :

```
instances:
  # Emplacement de tomcat
  - host: localhost
    port: 9999

  # Si tomcat nécessite une authentification
  #   user: <NOMUTILISATEUR_SOLR>
  #   password: <MOTDEPASSE_SOLR>

init_config:
  conf:
    - include:
      type: searcher
      attribute:
        maxDoc:
          alias: solr.searcher.maxdoc
          metric_type: gauge
        numDocs:
          alias: solr.searcher.numdocs
          metric_type: gauge
        warmupTime:
          alias: solr.searcher.warmup
          metric_type: gauge
    - include:
      id: org.apache.solr.search.FastLRUCache
      attribute:
        cumulative_lookups:
          alias: solr.cache.lookups
          metric_type: counter
        cumulative_hits:
          alias: solr.cache.hits
          metric_type: counter
        cumulative_inserts:
          alias: solr.cache.inserts
          metric_type: counter
        cumulative_evictions:
          alias: solr.cache.evictions
          metric_type: counter
    - include:
      id: org.apache.solr.search.LRUCache
      attribute:
        cumulative_lookups:
          alias: solr.cache.lookups
          metric_type: counter
        cumulative_hits:
          alias: solr.cache.hits
          metric_type: counter
        cumulative_inserts:
          alias: solr.cache.inserts
          metric_type: counter
        cumulative_evictions:
          alias: solr.cache.evictions
          metric_type: counter
    - include:
      id: org.apache.solr.handler.component.SearchHandler
      attribute:
        errors:
          alias: solr.search_handler.errors
          metric_type: counter
        requests:
          alias: solr.search_handler.requests
          metric_type: counter
        timeouts:
          alias: solr.search_handler.timeouts
          metric_type: counter
        totalTime:
          alias: solr.search_handler.time
          metric_type: counter
        avgTimePerRequest:
          alias: solr.search_handler.avg_time_per_req
          metric_type: gauge
        avgRequestsPerSecond:
          alias: solr.search_handler.avg_requests_per_sec
          metric_type: gauge
```

Nous vous invitons à nouveau à consulter la [documentation relative au check JMX][4] pour découvrir la liste des options de configuration compatibles avec l'ensemble des checks basés sur JMX. Cette page décrit également comment l'Agent applique des tags aux métriques JMX.

[Redémarrez l'Agent][7] pour commencer à envoyer des métriques Solr à Datadog.

Options de configuration

* `user` et `password` (facultatifs) : le nom d'utilisateur et le mot de passe.
* `process_name_regex` (facultatif) : au lieu de spécifier un host et un port ou jmx_url, l'Agent peut se connecter à l'aide de l'API Attach. Pour ce faire, vous devez avoir installé le JDK et avoir défini le chemin vers tools.jar.
* `tools_jar_path` (facultatif) : à définir lorsque process_name_regex est défini.
* `java_bin_path` (facultatif) : doit être défini si l'Agent ne parvient pas à trouver votre exécutable java.
* `java_options` (facultatif) : options JVM.
* `trust_store_path` et `trust_store_password` (facultatifs) : doivent être définis si « com.sun.management.jmxremote.ssl » est défini sur true pour le JVM cible.
* `key_store_path` et `key_store_password` (facultatifs) : doivent être définis si « com.sun.management.jmxremote.ssl.need.client.auth » est défini sur true pour le JVM cible.
* `rmi_registry_ssl` (facultatif) : doit être défini sur true si « com.sun.management.jmxremote.registry.ssl » est défini sur true pour le JVM cible.


Le paramètre `conf` correspond à une liste de dictionnaires. Seules deux clés sont autorisées dans ce dictionnaire :

* `include` (**requis**) : dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres « exclude » (voir ci-dessous).
* `exclude` (**facultatif**) : un autre dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.

Pour chaque bean, les métriques sont taguées de la manière suivante :

    mondomaine:attr0=val0,attr1=val1

Vous obtiendrez alors une métrique mondomaine (ou un nom similaire, en fonction de l'attribut au sein du bean) avec les tags `attr0:val0, attr1:val1, domain:mondomaine`.

Si vous spécifiez un alias dans une clé `include` au format *camel case*, il sera converti au format *snake case*. Par exemple, `MonNomMetrique` s'affichera sous la forme de `mon_nom_metrique` dans Datadog.

#### Le filtre `attribute`

Le filtre `attribute` accepte deux types de valeurs :

* Un dictionnaire dont les clés correspondent à des noms d'attributs :

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


Vous pouvez alors spécifier un alias pour la métrique, qui correspondra au nom de la métrique dans Datadog. Vous pouvez également indiquer le type de métrique, à savoir « gauge » ou « counter ». Si vous choisissez counter, un taux par seconde est calculé pour cette métrique.

* Une liste de noms d'attributs :

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


Dans ce cas :

  * Le type de métrique est gauge.
  * Le nom de la métrique est `jmx.\[NOM_DOMAINE].\[NOM_ATTRIBUT]`.

Voici un autre exemple de filtre :

    instances:
      - host: 127.0.0.1
        name: jmx_instance
        port: 9999

    init_config:
      conf:
        - include:
          bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
          attribute:
            - OneMinuteRate
            - 75thPercentile
            - 95thPercentile
            - 99thPercentile


#### Remarque

La liste de filtres est uniquement prise en charge pour les versions > 5.3.0 de l'Agent Datadog. Si vous utilisez une version antérieure, utilisez plutôt des singletons et plusieurs déclarations `include`.

    # Agent Datadog > 5.3.0
      conf:
        - include:
          domain: domain_name
          bean:
            - first_bean_name
            - second_bean_name

    # Anciennes versions de l'Agent Datadog
      conf:
        - include:
          domain: domain_name
          bean: first_bean_name
        - include:
          domain: domain_name
          bean: second_bean_name


### Validation

[Lancez la sous-commande `status` de l'Agent][8] et cherchez `solr` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "solr" >}}


### Événements
Le check Solr n'inclut aucun événement.

### Checks de service
**solr.can_connect**

Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance SolR qu'il surveille et d'y recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.


## Dépannage
### Commandes pour afficher les métriques disponibles :

La commande `datadog-agent jmx` a été ajoutée dans la version 4.1.0.

  * Énumérer les attributs qui correspondent à au moins l'une de vos configurations d'instance :
`sudo datadog-agent jmx list matching`
  * Énumérer les attributs qui correspondent à l'une de vos configurations d'instance, mais qui ne sont pas recueillis afin de ne pas dépasser le nombre maximum de métriques pouvant être recueillies :
`sudo datadog-agent jmx list limited`
  * Énumérer les attributs qui seront recueillis par vos configurations d'instance actuelles :
`sudo datadog-agent jmx list collected`
  * Énumérer les attributs qui ne correspondent à aucune de vos configurations d'instance :
`sudo datadog-agent jmx list not-matching`
  * Énumérer l'ensemble des attributs disponibles dont le type est pris en charge par JMXFetch :
`sudo datadog-agent jmx list everything`
  * Démarrer la collecte de métriques en fonction de votre configuration actuelle et les afficher dans la console :
`sudo datadog-agent jmx collect`

## Pour aller plus loin
### Parsing d'une valeur de chaîne en tant que nombre
Cela peut être utile si votre JMXFetch renvoie uniquement des valeurs de chaîne telles que **false** et **true** et que vous souhaitez les transformer en métriques gauge Datadog pour une utilisation avancée. Par exemple, si vous souhaitez obtenir l'équivalence suivante pour votre JMXFetch :

```
"myJmxfetch:false" = myJmxfetch:0
"myJmxfetch:true" = myJmxfetch:1
```

Vous pouvez utiliser le filtre `attribute` comme suit :

```
...
    attribute:
          myJmxfetch:
            alias: nom_votre_métrique
            metric_type: gauge
            values:
              "false": 0
              "true": 1
```


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/solr/images/solrgraph.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/integrations/java
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/solr/metadata.csv


{{< get-dependencies >}}