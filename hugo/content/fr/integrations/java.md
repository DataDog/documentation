---
aliases:
  - /fr/agent/faq/docker-jmx
categories:
  - languages
ddtype: check
dependencies: []
description: Recueillez des métriques custom depuis vos applications à l'aide de la bibliothèque de métriques Yammer.
doc_link: https://docs.datadoghq.com/integrations/java/
draft: false
further_reading:
  - link: https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect
    tag: FAQ
    text: "Mon bean correspond à mon intégration JMX, mais je ne collecte aucune donnée\_!"
  - link: https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/
    tag: FAQ
    text: Afficher les données JMX dans jConsole et configurer votre jmx.yaml pour les recueillir
  - link: https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/
    tag: FAQ
    text: "Erreur jmx.yaml\_: section Include"
  - link: https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/
    tag: FAQ
    text: Recueillir des attributs JMX composite
  - link: https://docs.datadoghq.com/integrations/faq/how-to-run-jmx-commands-in-windows/
    tag: FAQ
    text: Exécuter des commandes JMX dans Windows
  - link: https://docs.datadoghq.com/integrations/faq/how-to-use-bean-regexes-to-filter-your-jmx-metrics-and-supply-additional-tags/
    tag: FAQ
    text: Comment utiliser les expressions régulières Bean pour filtrer vos métriques JMX et spécifier des tags supplémentaires
git_integration_title: java
has_logo: true
integration_id: java
integration_title: JMX
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: java
public_title: Intégration Datadog/JMX
short_description: Recueillez des métriques custom depuis vos applications à l'aide de la bibliothèque de métriques Yammer.
version: '1.0'
---
## Présentation

L'intégration Java vous permet de recueillir des métriques, des traces et des logs à partir de votre application Java.

## Configuration

### Collecte de métriques

Si votre application expose des métriques [JMX][1], l'Agent Datadog appelle un petit plug-in Java du nom de JMXFetch (compatible uniquement avec Java >= 1.7) afin de se connecter à MBean Server et de recueillir les métriques de votre application. Il envoie également des checks de service afin de déterminer le statut des instances que vous surveillez. Ce plug-in envoie les métriques à l'Agent Datadog via le serveur [DogStatsD][2], qui s'exécute au sein de l'Agent. Les intégrations suivantes utilisent également les métriques JMX :

- ActiveMQ
- Cassandra
- Solr
- Tomcat
- Kafka

**Remarque** : par défaut, les checks JMX sont limités à 350 métriques par instance. Si vous souhaitez utiliser davantage de métriques, contactez l'[assistance Datadog][3].

#### Installation

Vérifiez que vous pouvez ouvrir une [connexion JMX distante][4]. L'Agent Datadog nécessite une connexion distante pour se connecter à la JVM, même s'ils sont tous les deux sur le même host. Pour des raisons de sécurité, il est recommandé de ne pas utiliser l'adresse d'écoute `0.0.0.0`. Utilisez plutôt `com.sun.management.jmxremote.host=127.0.0.1` pour un déploiement avec la JVM et l'Agent.

#### Configuration

Si vous exécutez l'Agent en tant que binaire sur un host, configurez votre check JMX comme n'importe quelle [intégration de l'Agent][5]. Si vous exécutez l'Agent en tant que DaemonSet dans Kubernetes, configurez votre check JMX avec [Autodiscovery](?tab=docker#configuration).

{{< tabs >}}
{{% tab "Host" %}}

- Configurez l'Agent pour le connecter à JMX. Modifiez le fichier `jmx.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez les [options de configuration](#options-de-configuration) ci-dessous ou les modèles de [init_config][2] et d'[instance][3] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:
        is_jmx: true
        collect_default_metrics: true
        # custom_jar_paths:
        #  - <CUSTOM_JAR_FILE_PATH>.jar

      instances:
        - host: localhost
          port: port
          user: username
          password: password
          name: jmx_instance_name
    ```

- [Redémarrez l'Agent][4].

**Remarque** : pour exécuter plusieurs checks JMX, créez des fichiers de configuration avec le format `jmx_<INDEX>.d/conf.yaml`. Exemples : `jmx_1.d/conf.yaml`, `jmx_2.d/conf.yaml`, etc. Chaque dossier doit être stocké dans le répertoire `conf.d`. Définissez l'option `is_jmx` sur `true` dans le fichier de configuration.


[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

JMX n'est pas installé sur l'image standard `gcr.io/datadoghq/agent:latest` servant à exécuter le [conteneur de l'Agent Datadog][1]. **Utilisez plutôt l'image `gcr.io/datadoghq/agent:latest-jmx`Agent** : celle-ci est basée sur `gcr.io/datadoghq/agent:latest` mais comprend une JVM, dont l'Agent a besoin pour exécuter [jmxfetch][2].

Pour lancer un check JMX sur l'un de vos conteneurs :

1. Créez un fichier de configuration de check JMX en faisant référence à [host](?tab=host) ou en utilisant un fichier de configuration de check JMX pour l'une des intégrations JMX officiellement prises en charge par Datadog :

    - [ActiveMQ][2]
    - [Cassandra][3]
    - [Solr][4]
    - [Tomcat][5]
    - [Kafka][6]

2. Montez ce fichier dans le dossier `conf.d/` de votre Agent Datadog : `-v <CHEMIN_DOSSIER_HOST>:/conf.d`. Consultez la section [Configuration des modèles de checks][7] pour en savoir plus.

**Remarque** : l'utilisation de `%%port%%` peut entraîner des erreurs. Si vous rencontrez un problème, vous pouvez remplacer `%%port%%` par un port JMX codé en dur.


[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/docker/integrations/?tab=file#configuration
{{% /tab %}}
{{< /tabs >}}

##### Options de configuration

| Option                                        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | Non       | Permet de spécifier des fichiers jar personnalisés afin de les ajouter au classpath du JVM de l'Agent.                                                                                                                                                                                                                                                                                                                                       |
| `jmx_url`                                     | Non       | Si l'Agent a besoin de se connecter à une URL JMX différente de celle par défaut, indiquez l'URL ici au lieu d'un host et d'un port. Si vous utilisez ce paramètre, vous devez spécifier un `name` pour l'instance.                                                                                                                                                                                                                                                      |
| `is_jmx`                                      | Non       | Autorise la création de différents fichiers de configuration pour chaque application, au lieu de créer un seul fichier JMX exhaustif. Indiquez cette option dans chaque fichier de configuration, tel qu'expliqué dans la remarque de la section [Configuration](#configuration).                                                                                                                                                                                   |
| `collect_default_jvm_metrics`                 | Non       | Ordonne à l'intégration de collecter les métriques JVM par défaut (`jvm.*`). La valeur par défaut est `true`.                                                                                                                                                                                                                                                                                                                                 |
| `collect_default_metrics`                     | Non       | Chaque intégration contient un fichier `metrics.yaml` qui comprend la liste des beans par défaut à recueillir. Si vous définissez ce paramètre sur `True`, ces métriques sont automatiquement recueillies sans être explicitement ajoutées au fichier yaml. Cette option est généralement utilisée pour gérer la configuration d'Autodiscovery, afin de réduire la taille de l'objet de configuration. Cela ne s'applique pas à la collecte de [métriques JMX avec l'Agent de tracing Java][6]. |
| `java_bin_path`                               | Non       | Indiquez le chemin vers votre binaire ou exécutable Java si l'Agent ne parvient pas à le localiser. Exemple : `C:/chemin/vers/java.exe` ou `/etc/alternatives/java`.                                                                                                                                                                                                                                                                          |
| `java_options`                                | Non       | Options JVM Java                                                                                                                                                                                                                                                                                                                                                                                                        |
| `name`                                        | Non       | Utilisé conjointement avec `jmx_url`.                                                                                                                                                                                                                                                                                                                                                                                     |
| `new_gc_metrics`                              | Non       | Définissez ce paramètre sur `true` pour améliorer les noms des métriques de garbage collection. La valeur par défaut est `false`.                                                                                                                                                                                                                                                                                                                                |
| `process_name_regex`                          | Non       | Au lieu de spécifier un host et un port ou `jmx_url`, l'Agent peut se connecter à l'aide de l'API Attach. Pour ce faire, vous devez avoir installé le JDK et avoir défini le chemin vers `tools.jar`.                                                                                                                                                                                                                                            |
| `refresh_beans`                               | Non       | Fréquence d'actualisation de la liste des Mbeans correspondants. Valeur par défaut : 600 s. Toute valeur inférieure peut entraîner une augmentation de la charge processeur.                                                                                                                                                                                                                                                                                |
| `refresh_beans_initial`                       | Non       | Période d'actualisation de la liste des Mbeans correspondants qui intervient immédiatement après l'initialisation. La valeur par défaut est `refresh_beans`.                                                                                                                                                                                                                                                                                        |
| `rmi_connection_timeout`                      | Non       | Le délai d'expiration, en millisecondes, d'une connexion à la JVM à l'aide du `host` et du `port` ou d'une `jmx_url`.                                                                                                                                                                                                                                                                                                               |
| `rmi_client_timeout`                          | Non       | Spécifie la durée, en millisecondes, sans réponse de la JVM connectée après laquelle l'Agent abandonne une connexion existante et réessaie de se connecter.                                                                                                                                                                                                                                                                      |
| `service`                                     | Non       | Permet d'associer un tag `service:<SERVICE>` à chaque métrique, événement et check de service émis par cette intégration.                                                                                                                                                                                                                                                                                                                 |
| `service_check_prefix`                        | Non       | Préfixe de check de service custom, par exemple `my_prefix`, pour obtenir un check de service nommé `my_prefix.can_connect`. Si cette valeur n'a pas été définie, le nom de l'intégration est utilisé par défaut.                                                                                                                                                                                                                                                                |
| `tools_jar_path`                              | Non       | À définir lorsque `process_name_regex` est défini.                                                                                                                                                                                                                                                                                                                                                                             |
| `trust_store_path` et `trust_store_password` | Non       | À définir si le protocole SSL est activé.                                                                                                                                                                                                                                                                                                                                                                                        |

Le paramètre `conf` correspond à une liste de dictionnaires. Seules deux clés sont autorisées dans ce dictionnaire :

| Clé       | Obligatoire | Description                                                                                                                                |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `include` | Oui      | Dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres « exclude » (voir ci-dessous). |
| `exclude` | Non       | Dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.                                                           |

Les tags sont automatiquement ajoutés aux métriques en fonction du nom du MBean. Vous pouvez spécifier explicitement des tags supplémentaires. Par exemple, si le MBean suivant est exposé par votre application surveillée :

```text
mydomain:attr0=val0,attr1=val1
```

Cela créé une métrique `mondomaine` (ou un nom similaire, en fonction de l'attribut au sein du bean) avec les tags : `attr0:val0, attr1:val1, domain:mondomaine, simple:val0, raw_value:ma_valeur_choisie, multiple:val0-val1`.

Si vous spécifiez un alias dans une clé `include` au format _camel case_, il est converti au format _snake case_. Par exemple, `MonNomMétrique` devient `mon_nom_métrique` dans Datadog.

##### Description des filtres

Chaque dictionnaire `include` ou `exclude` prend en charge les clés suivantes :

| Clé                   | Description                                                                                                                                                                                                             |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | Nom de domaine ou liste de noms de domaine, par exemple : `java.lang`.                                                                                                                                                        |
| `domain_regex`        | Expression régulière ou liste d'expressions régulières correspondant au nom de domaine, par exemple : `java\.lang.*`.                                                                                                                              |
| `bean` ou `bean_name` | Nom de bean ou liste de noms de bean complets, par exemple : `java.lang:type=Compilation`                                                                                                                                      |
| `bean_regex`          | Expression régulière ou liste d'expressions régulières correspondant aux noms de bean complets, par exemple :`java\.lang.*[,:]type=Compilation.*`. Vous pouvez utiliser des groupes d'enregistrement dans votre expression régulière afin de spécifier des valeurs de tag. Voir l'exemple de configuration ci-dessus. |
| `class`               | Classe ou liste de noms de classe, par exemple : `org.datadog.jmxfetch.SimpleTestJavaApp`                                                                                                                                  |
| `class_regex`         | Expression régulière ou liste d'expressions régulières correspondant aux noms de classe, par exemple : `org\.datadog\.jmxfetch\.SimpleTestJavaApp`.                                                                                                 |
| `exclude_tags`        | Liste de clés de tag à supprimer des métriques finales. Permet d'améliorer la cardinalité des tags de métrique, par exemple : `["attr1", "id", "partition-id"]`.                                                            |
| `attribute`           | Liste ou dictionnaire de noms d'attributs (voir ci-dessous pour plus de détails).                                                                                                                                                 |

**Remarques** :

- Les expressions régulières définies dans `domain_regex` et `bean_regex` doivent respecter [le format des expressions régulières de Java][7]. Ces filtres ont été ajoutés dans la version 5.5.0.
- À l'exception des expressions régulières, toutes les valeurs sont sensibles à la casse.

En plus de ces paramètres, les filtres prennent en charge les clés personnalisées. Ainsi, vous pouvez appliquer des filtres basés sur des paramètres bean. Par exemple, si vous souhaitez recueillir des métriques concernant le cache Cassandra, vous pouvez appliquer le filtre `type: - Caches` :

```yaml
conf:
    - include:
          domain: org.apache.cassandra.db
          type:
              - Caches
```

#### Filtre Attribute

Le filtre `attribute` accepte deux types de valeurs :

- Dictionnaire dont les clés correspondent aux noms des attributs cibles :

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

    - Vous pouvez définir un `alias` pour l'attribut qui devient le nom de la métrique dans Datadog.
    - Vous pouvez également définir le type de métrique : `gauge`, `histogram`, `counter`/`rate`, ou `monotonic_count`. Si vous choisissez `counter`, un `rate` (taux) par seconde est calculé pour la métrique et envoyé en tant que `gauge`.

- Une liste de noms d'attribut cible :

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

    - Le type de métrique est défini sur `gauge` par défaut.
    - Le nom de la métrique est `jmx.<NOM_DOMAINE>.<NOM_ATTRIBUT>`.

Voici un autre exemple de filtre :

```yaml
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
```

#### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez votre check JMX dans la section JMXFetch.

Les checks JMX possèdent également une configuration par défaut qui recueille des métriques depuis votre application. Reportez-vous au [Metrics Explorer][9] pour : `jvm.heap_memory`, `jvm.non_heap_memory` ou `jvm.gc.cms.count`.

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez la documentation relative à la [configuration de la collecte de logs Java][10] pour transmettre vos logs à Datadog.

### Collecte de traces

Après avoir [activé la collecte de traces avec votre Agent][11], consultez la documentation relative à l'[instrumentation de votre application Java][12] pour envoyer ses traces à Datadog.

## Données collectées

### Métriques

{{< get-metrics-from-git >}}

**Remarque** : définissez `new_gc_metrics: true` dans votre fichier [jmx.d/conf.yaml][13] pour remplacer les métriques suivantes :

```text
jvm.gc.cms.count   => jvm.gc.minor_collection_count
                      jvm.gc.major_collection_count
jvm.gc.parnew.time => jvm.gc.minor_collection_time
                      jvm.gc.major_collection_time
```

### Checks de service
{{< get-service-checks-from-git "java" >}}


## Dépannage

Consultez la liste des [commandes de dépannage JMX et la FAQ dédiée][15].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[2]: https://docs.datadoghq.com/fr/developers/dogstatsd
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.oracle.com/en/java/javase/14/management/monitoring-and-management-using-jmx-technology.html
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/#setting-up-an-integration
[6]: 14
[7]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/fr/metrics/explorer/
[10]: https://docs.datadoghq.com/fr/logs/log_collection/java/
[11]: https://docs.datadoghq.com/fr/tracing/send_traces/
[12]: https://docs.datadoghq.com/fr/tracing/setup/java/
[13]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jmx.d/conf.yaml.example
[14]: https://github.com/DataDog/dogweb/blob/prod/integration/java/service_checks.json
[15]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-jmx-integrations/