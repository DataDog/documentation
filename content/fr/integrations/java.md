---
aliases:
  - /fr/agent/faq/docker-jmx
categories:
  - languages
ddtype: check
dependencies: []
description: Recueillez des métriques custom depuis vos applications à l'aide de la bibliothèque de métriques Yammer.
doc_link: 'https://docs.datadoghq.com/integrations/java/'
further_reading:
  - link: 'https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect'
    tag: FAQ
    text: "Mon bean correspond à mon intégration JMX, mais je ne collecte aucune donnée\_!"
  - link: 'https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/'
    tag: FAQ
    text: Afficher les données JMX dans jConsole et configurer votre jmx.yaml pour les recueillir
  - link: 'https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/'
    tag: FAQ
    text: "Erreur jmx.yaml\_: section Include"
  - link: 'https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/'
    tag: FAQ
    text: Recueillir des attributs JMX composites
  - link: 'https://docs.datadoghq.com/integrations/faq/how-to-run-jmx-commands-in-windows/'
    tag: FAQ
    text: Exécuter des commandes JMX dans Windows
git_integration_title: java
has_logo: true
integration_title: JMX
is_public: true
kind: integration
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

If your application exposes [JMX][1] metrics, a lightweight Java plugin named JMXFetch (only compatible with Java >= 1.7.) is called by the Datadog Agent to connect to the MBean Server and collect your application metrics. It also sends service checks that report on the status of your monitored instances. This plugin sends metrics to the Datadog Agent using the DogStatsD server running within the Agent. These integrations also use the JMX metrics:

- ActiveMQ
- Cassandra
- Solr
- Tomcat
- Kafka

**Remarque** : par défaut, les checks JMX sont limités à 350 métriques par instance. Si vous souhaitez recueillir davantage de métriques, contactez l'[assistance Datadog][2].

#### Installation

Vérifiez que vous pouvez ouvrir une [connexion JMX distante][3]. L'Agent Datadog nécessite une connexion distante pour se connecter au JVM, même s'ils sont tous les deux sur le même host.

#### Configuration

Si vous exécutez l'Agent en tant que binaire sur un host, configurez votre check JMX comme n'importe quelle [intégration de l'Agent][4]. Si vous exécutez l'Agent en tant que DaemonSet dans Kubernetes, configurez votre check JMX avec [Autodiscovery](?tab=docker#configuration).

{{< tabs >}}
{{% tab "Host" %}}

Configurez l'Agent afin qu'il se connecte à l'aide de JMX, et modifiez-le selon vos besoins. Voici un fichier d'exemple `jmx.d/conf.yaml` :

```yaml
init_config:
  #custom_jar_paths:
  #  - <CHEMIN_FICHIER_JAR_PERSONNALISÉ>.jar
  #is_jmx: true

instances:
  - host: "<ENDPOINT_INSTANCE_JMX>"
    port: "<PORT_JMX>"
    user: "<NOM_UTILISATEUR>"
    password: "<MOTDEPASSE>"

    jmx_url: "service:jmx:rmi:///jndi/rmi://myhost.host:9999/<CHEMIN_PERSONNALISÉ>" # facultatif

    name: "<NOM_INSTANCE_JMX>"
    java_bin_path: "<CHEMIN_JAVA>"
    java_options: "-Xmx200m -Xms50m"
    trust_store_path: "<CHEMIN_TRUST_STORE>.jks"
    trust_store_password: "<MOTDEPASSE>"

    process_name_regex: ".*<NOM_PROCESSUS>.*"
    tools_jar_path: /usr/lib/jvm/java-7-openjdk-amd64/lib/tools.jar
    refresh_beans: 600
    tags:
      env: dev
      "<TAG_KEY>":"<TAG_VALUE>"

    conf:
      - include:
          domain: "<NOM_DOMAINE_1>"
          tags:
              simple: $attr0
              raw_value: "<VALEUR_CHOISIE>"
              multiple: $attr0-$attr1
          bean:
            - "<NOM_BEAN_1>"
            - "<NOM_BEAN_2>"
          attribute:
            attribute1:
              metric_type: counter
              alias: "jmx.<NOM_ATTRIBUT_MÉTRIQUE_1>"
            attribute2:
              metric_type: gauge
              alias: "jmx.<NOM_ATTRIBUT_MÉTRIQUE_2>"
            attribute3:
              metric_type: monotonic_count
              alias: "jmx.<NOM_ATTRIBUT_MÉTRIQUE_3>"

      - include:
          domain: "<NOM_DOMAINE_2>"
        exclude:
          bean:
            - "<NOM_BEAN_EXCLU>"
      - include:
          domain_regex: "<REGEX_DOMAINE>"
        exclude:
          bean_regex:
            - "<NOM_REGEX_BEAN_EXCLU>"
      - include:
          bean_regex: regex_topic=(.*?)
          attribute:
            attribute1:
              metric_type: gauge
              alias: "jmx.<NOM_ATTRIBUT_AVEC_TAG_REGEX>"

          ## Les lignes suivantes envoient le bean jmx.<NOM_ATTRIBUT_AVEC_TAG_REGEX> avec les tags :
          ## `hostregex:<paramètreBean>`
          ## `typeregex:<paramètreBean>`
          ## `contextregex<paramètreBean>`
          ## `optional:tag`
          tags:
              TypeRegex: $1
              HostRegex: $2
              contextRegex: $3
              optional: tag
```

**Remarque** : pour exécuter plusieurs checks JMX, créez des fichiers de configuration avec le format `jmx_<INDEX>.yaml` (p. ex., `jmx_1.d/conf.yaml`, `jmx_2.d/conf.yaml`, etc.). Chaque fichier doit être stocké dans le répertoire `conf.d`. Définissez l'option `is_jmx` sur `true` dans ces fichiers de configuration.

{{% /tab %}}
{{% tab "Docker" %}}

JMX n'est pas installé sur l'image standard `datadog/agent:latest` servant à exécuter le [conteneur de l'Agent Datadog][1]. **Utilisez plutôt l'image `datadog/agent:latest-jmx`** : celle-ci est basée sur `datadog/agent:latest` mais comprend un JVM, dont l'Agent a besoin pour exécuter [jmxfetch][2].

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
[7]: https://docs.datadoghq.com/fr/agent/autodiscovery/?tab=files#setting-up-check-templates
{{% /tab %}}
{{< /tabs >}}

##### Options de configuration

| Option                                        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `custom_jar_paths`                            | Non       | Permet de spécifier des fichiers jar personnalisés afin de les ajouter au classpath du JVM de l'Agent.                                                                                                                                                                                                                                                         |
| `jmx_url`                                     | Non       | Si l'Agent a besoin de se connecter à une URL JMX différente de celle par défaut, indiquez l'URL ici au lieu d'un host et d'un port. Si vous utilisez ce paramètre, vous devez spécifier un `name` pour l'instance.                                                                                                                                                                        |
| `is_jmx`                                      | Non       | Autorise la création de différents fichiers de configuration pour chaque application, au lieu de créer un seul fichier JMX exhaustif. Indiquez cette option dans chaque fichier de configuration, tel qu'expliqué dans la remarque de la section [Configuration](#configuration).                                                                                                     |
| `collect_default_metrics`                     | Non       | Chaque intégration contient un fichier `metrics.yaml` qui comprend la liste des beans par défaut à recueillir. Si vous définissez ce paramètre sur `true`, ces métriques sont automatiquement recueillies sans être explicitement ajoutées au fichier yaml. Cette option est généralement utilisée pour gérer la configuration d'Autodiscovery, afin de réduire la taille de l'objet de configuration. |
| `name`                                        | Non       | Utilisé conjointement avec `jmx_url`.                                                                                                                                                                                                                                                                                                       |
| `java_bin_path`                               | Non       | Doit être défini si l'Agent ne parvient pas à trouver votre exécutable Java.                                                                                                                                                                                                                                                                              |
| `java_options`                                | Non       | Options JVM Java                                                                                                                                                                                                                                                                                                                          |
| `trust_store_path` et `trust_store_password` | Non       | À définir si le protocole SSL est activé.                                                                                                                                                                                                                                                                                                          |
| `process_name_regex`                          | Non       | Au lieu de spécifier un host et un port ou `jmx_url`, l'Agent peut se connecter à l'aide de l'API Attach. Pour ce faire, vous devez avoir installé le JDK et avoir défini le chemin vers `tools.jar`.                                                                                                                                                              |
| `tools_jar_path`                              | Non       | À définir lorsque `process_name_regex` est défini.                                                                                                                                                                                                                                                                                               |
| `refresh_beans`                               | Non       | Fréquence d'actualisation de la liste des Mbeans correspondants. Valeur par défaut : 600 s. Toute valeur inférieure peut entraîner une augmentation de la charge processeur.                                                                                                                                                                                                  |

Le paramètre `conf` correspond à une liste de dictionnaires. Seules deux clés sont autorisées dans ce dictionnaire :

| Clé       | Obligatoire | Description                                                                                                                                |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `include` | Oui      | Dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres « exclude » (voir ci-dessous). |
| `exclude` | Non       | Dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.                                                           |

Les tags sont automatiquement ajoutés aux métriques en fonction du nom actuel du MBean. Vous pouvez spécifier explicitement des tags supplémentaires. Par exemple, si le MBean suivant est exposé par votre application surveillée :

```text
mydomain:attr0=val0,attr1=val1
```

Cela créé une métrique `mondomaine` (ou un nom similaire, en fonction de l'attribut au sein du bean) avec les tags : `attr0:val0, attr1:val1, domain:mondomaine, simple:val0, raw_value:ma_valeur_choisie, multiple:val0-val1`.

Si vous spécifiez un alias dans une clé `include` au format _camel case_, il est converti au format _snake case_. Par exemple, `MonNomMétrique` s'affiche sous la forme `mon_nom_métrique` dans Datadog.

##### Description des filtres

Chaque dictionnaire `include` ou `exclude` prend en charge les clés suivantes :

| Clé                   | Description                                                                                                                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain`              | Liste des noms de domaine (p. ex., `java.lang`).                                                                                                                                               |
| `domain_regex`        | Liste des expressions régulières pour le nom de domaine (p. ex., `java\.lang.*`).                                                                                                                              |
| `bean` ou `bean_name` | Liste des noms de bean complets (p. ex., `java.lang:type=Compilation`).                                                                                                                           |
| `bean_regex`          | Liste des expressions régulières pour les noms de bean complets (p. ex., `java\.lang.*[,:]type=Compilation.*`). Vous pouvez utiliser des groupes de capture dans votre expression régulière afin de fournir des valeurs de tag. Référez-vous à l'exemple de configuration ci-dessus. |
| `attribute`           | Liste ou dictionnaire de noms d'attributs (voir ci-dessous pour plus de détails).                                                                                                                  |

Les expressions régulières définies dans `domain_regex` et `bean_regex` doivent respecter le [format des expressions régulières Java][5].

Les filtres `domain_regex` et `bean_regex` ont été ajoutés dans la version 5.5.0.

En plus de ces paramètres, les filtres prennent en charge les clés personnalisées. Ainsi, vous pouvez appliquer des filtres basés sur des paramètres bean. Par exemple, si vous souhaitez recueillir des métriques concernant le cache Cassandra, vous pouvez appliquer le filtre `type: - Caches` :

```yaml
conf:
    - include:
          domain: org.apache.cassandra.db
          type:
              - Caches
```

#### Le filtre Attribute

Le filtre `attribute` accepte deux types de valeurs :

- Un dictionnaire dont les clés correspondent à des noms d'attributs :

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

     Vous pouvez alors spécifier un alias pour la métrique, qui correspond au nom de la métrique dans Datadog. Vous pouvez également indiquer le type de métrique : `gauge`, `histogram`, `counter`/`rate` ou `monotonic_count`. Si vous choisissez `counter`, un `rate` par seconde est calculé pour cette métrique et envoyé en tant que `gauge`.

- Une liste de noms d'attributs :

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

     Dans ce cas :
      - Le type de métrique est gauge.
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

[Lancez la sous-commande status de l'Agent][6] et cherchez votre check JMX dans la section JMXFetch.

Les checks JMX possèdent également une configuration par défaut qui recueille 11 métriques depuis votre application. Consultez le [Metrics Explorer][7] pour : `jvm.heap_memory`, `jvm.non_heap_memory` ou `jvm.gc.cms.count`.

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez la documentation relative à la [configuration de la collecte de logs Java][8] pour transmettre vos logs à Datadog.

### Collecte de traces

Après l'[activation de la collecte de traces avec votre Agent][9], consultez la documentation relative à l'[instrumentation de votre application Java][10] pour envoyer ses traces à Datadog.

## Données collectées

### Métriques

{{< get-metrics-from-git >}}

**Remarque** : définissez `new_gc_metrics: true` dans votre fichier [jmx.d/conf.yaml][11] pour remplacer les métriques suivantes :

```text
jvm.gc.cms.count   => jvm.gc.minor_collection_count
                      jvm.gc.major_collection_count
jvm.gc.parnew.time => jvm.gc.minor_collection_time
                      jvm.gc.major_collection_time
```

## Dépannage

Consultez la liste des [commandes et la FAQ de dépannage JMX][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[2]: https://docs.datadoghq.com/fr/help
[3]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/#setting-up-an-integration
[5]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/metrics/explorer
[8]: https://docs.datadoghq.com/fr/logs/log_collection/java/
[9]: https://docs.datadoghq.com/fr/tracing/send_traces/
[10]: https://docs.datadoghq.com/fr/tracing/setup/java/
[11]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jmx.d/conf.yaml.example
[12]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-jmx-integrations