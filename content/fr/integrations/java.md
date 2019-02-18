---
categories:
  - languages
ddtype: library
dependencies: []
description: Recueillez des métriques custom depuis vos applications à l'aide des métriques Yammer. library.
doc_link: 'https://docs.datadoghq.com/integrations/java/'
further_reading:
  - link: 'https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect'
    tag: FAQ
    text: 'J''ai un bean correspondant pour mon intégration JMX, mais aucune donnée à recueillir.'
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
integration_title: Java
is_public: true
kind: integration
manifest_version: '1.0'
name: java
public_title: Intégration Datadog/Java
short_description: Recueillez des métriques custom à partir de vos applications à l'aide des métriques Yammer. Metrics library.
version: '1.0'
---
## Présentation

L'intégration JMX recueille des métriques à partir des applications exposant des métriques [JMX][1].

L'Agent Datadog appelle un petit plug-in Java, JMXFetch, afin de se connecter à MBean Server et de recueillir des métriques. Ce plug-in envoie des métriques à l'Agent Datadog à l'aide du serveur DogStatsD, qui s'exécute au sein de l'Agent. Cette fonctionnalité est aussi utilisée dans les intégrations d'ActiveMQ, de Cassandra, de Solr et de Tomcat. JMXFetch envoie également des checks de service concernant le statut de vos instances surveillées.

<div class="alert alert-warning">
  JMXFetch est uniquement compatible avec Java >= 1.7.
</div>

Les checks JMX sont limités à 350 métriques par instance.

Si vous exécutez JMX au sein de Docker, consultez la [documentation relative à Docker JMX][2].

## Implémentation
### Installation

Assurez-vous que vous pouvez ouvrir une [connexion JMX à distance][3].

L'Agent Datadog nécessite une connexion à distance pour se connecter à JVM, même s'ils sont tous les deux sur le même host.

### Configuration

1.  Configurez l'Agent afin qu'il se connecte à l'aide de JMX, et modifiez-le selon vos besoins. Voici un exemple de fichier `jmx.d/conf.yaml` :

```yaml
init_config:
  custom_jar_paths: # facultatif
    - /chemin/vers/jar/personnalise.jar
  #is_jmx: true

instances:
  - host: localhost
    port: 7199
    user: nomutilisateur
    password: motdepasse

    jmx_url: "service:jmx:rmi:///jndi/rmi://myhost.host:9999/custompath" # facultatif

    name: jmx_instance  # facultatif
    java_bin_path: /chemin/vers/java
    java_options: "-Xmx200m -Xms50m"
    trust_store_path: /chemin/vers/trustStore.jks
    trust_store_password: motdepasse

    process_name_regex: .*nom_processus.*
    tools_jar_path: /usr/lib/jvm/java-7-openjdk-amd64/lib/tools.jar
    refresh_beans: 600 # facultatif (en secondes)
    tags:
      env: stage
      newTag: test

    conf:
      - include:
          domain: mon_domaine
          tags:
              simple: $attr0
              raw_value: ma_valeur_choisie
              multiple: $attr0-$attr1
          bean:
            - my_bean
            - my_second_bean
          attribute:
            attribute1:
              metric_type: counter
              alias: jmx.mon_nom_metrique
            attribute2:
              metric_type: gauge
              alias: jmx.mondeuxiemeattribut
      - include:
          domain: deuxieme_domaine
        exclude:
          bean:
            - excluded_bean
      - include:
          domain_regex: regex_sur_domaine
        exclude:
          bean_regex:
            - regex_on_excluded_bean
      - include:
          bean_regex: regex_topic=(.*?)
          attribute: 
            attribute1:
              metric_type: gauge
              alias: jmx.attribut_avec_tag_regex
          tags:
            - topic: $1 # Tague toutes les métriques sous ce bean avec le topic du bean correspondant
```

**Remarque** : pour exécuter plusieurs checks JMX, créez des fichiers de configuration avec le format `jmx_<INDEX>.yaml` (p. ex., `jmx_1.d/conf.yaml`, `jmx_2.d/conf.yaml`, etc.). Chaque fichier doit être stocké dans le répertoire `conf.d`. Définissez l'option `is_jmx` sur `true` dans ces fichiers de configuration.

#### Options de configuration

| Option                                        | Obligatoire | Description                                                                                                                                                                                                                                                                                                                               |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | Non       | Permet de spécifier des fichiers jar personnalisés afin de les ajouter au classpath du JVM de l'Agent.                                                                                                                                                                                                                                                         |
| `jmx_url`                                     | Non       | Si l'Agent a besoin de se connecter à une URL JMX différente de celle par défaut, indiquez l'URL ici au lieu d'un host et d'un port. Si vous utilisez ce paramètre, vous devez spécifier un `name` pour l'instance.                                                                                                                                                                        |
| `is_jmx`                                      | Non       | Autorise la création de différents fichiers de configuration pour chaque application, au lieu de créer un seul fichier JMX exhaustif. Spécifiez cette option dans chaque fichier de configuration, tel qu'expliqué dans la remarque de la section [Configuration](#configuration).                                                                                                     |
| `collect_default_metrics`                     | Non       | Chaque intégration contient un fichier `metrics.yaml` qui comprend la liste des beans par défaut à recueillir. Si vous définissez ce paramètre sur `true`, ces métriques sont automatiquement recueillies sans être explicitement ajoutées au fichier yaml. Cette option est généralement utilisée pour gérer la configuration d'Autodiscovery, afin de réduire la taille de l'objet de configuration. |
| `name`                                        | Non       | Utilisé conjointement avec `jmx_url`.                                                                                                                                                                                                                                                                                                       |
| `java_bin_path`                               | Non       | Doit être défini si l'Agent ne parvient pas à trouver votre exécutable Java.                                                                                                                                                                                                                                                                              |
| `java_options`                                | Non       | Options JVM Java                                                                                                                                                                                                                                                                                                                          |
| `trust_store_path` and `trust_store_password` | Non       | À définir si le SSL est activé.                                                                                                                                                                                                                                                                                                          |
| `process_name_regex`                          | Non       | Au lieu de spécifier un host et un port ou `jmx_url`, l'Agent peut se connecter à l'aide de l'API Attach. Pour ce faire, vous devez avoir installé le JDK et avoir défini le chemin vers `tools.jar`.                                                                                                                                                              |
| `tools_jar_path`                              | Non       | À définir lorsque `process_name_regex` est défini.                                                                                                                                                                                                                                                                                               |
| `refresh_beans`                               | Non       | Période d'actualisation de la liste des Mbean correspondants. Valeur par défaut : 600 s. Toute valeur inférieure peut entraîner une augmentation de l'utilisation du processeur.                                                                                                                                                                                                |

Le paramètre `conf` correspond à une liste des dictionnaires. Seules deux clés sont autorisées dans ce dictionnaire :

| Clé       | Obligatoire | Description                                                                                                                                |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `include` | Oui      | Dictionnaire de filtres. Tout attribut qui correspond à ces filtres est recueilli, sauf s'il correspond également aux filtres « exclude » (voir ci-dessous). |
| `exclude` | Non       | Dictionnaire de filtres. Les attributs qui correspondent à ces filtres ne sont pas recueillis.                                                          |

Les tags sont automatiquement ajoutés aux métriques en fonction du nom actuel du MBean. Vous pouvez spécifier explicitement des tags supplémentaires. Par exemple, si le MBean suivant est exposé par votre application surveillée :

```
mondomaine:attr0=val0,attr1=val1
```

Cela créé une métrique `mondomaine` (ou un nom similaire, en fonction de l'attribut au sein du bean) avec les tags : `attr0:val0, attr1:val1, domain:mondomaine, simple:val0, raw_value:ma_valeur_choisie, multiple:val0-val1`.

Si vous spécifiez un alias dans une clé `include` au format *camel case*, il est converti au format *snake case*. Par exemple, `MonNomMetrique` s'affiche sous la forme de `mon_nom_metrique` dans Datadog.

#### Description des filtres

Chaque dictionnaire `include` ou `exclude` prend en charge les clés suivantes :

| Clé                   | Description                                                                                                                                                                              |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | Liste des noms de domaine (p. ex., `java.lang`).                                                                                                                                               |
| `domain_regex`        | Liste des expressions régulières pour le nom de domaine (p. ex., `java\.lang.*`).                                                                                                                              |
| `bean` ou `bean_name` | Liste des noms de bean complets (p. ex., `java.lang:type=Compilation`).                                                                                                                           |
| `bean_regex`          | Liste des expressions régulières pour les noms de bean complets (p. ex., `java\.lang.*[,:]type=Compilation.*`). Vous pouvez utiliser des groupes d'enregistrement dans votre expression régulière afin de fournir des valeurs de tag. Voir l'exemple de configuration ci-dessus. |
| `attribute`           | Liste ou dictionnaire de noms d'attributs (voir ci-dessous pour plus de détails).                                                                                                                  |

Les expressions régulières définies dans `domain_regex` et `bean_regex` doivent respecter le [format des expressions régulières de Java][4].

Les filtres `domain_regex` et `bean_regex` ont été ajoutés dans la version 5.5.0.

En plus de ces paramètres, les filtres prennent en charge les clés « personnalisées ». Ainsi, vous pouvez appliquer des filtres basés sur des paramètres bean. Par exemple, si vous souhaitez recueillir des métriques concernant le cache Cassandra, vous pouvez appliquer le filtre `type: - Caches` :

```yaml
conf:
- include:
    domain: org.apache.cassandra.db
    type:
      - Caches
```

### Le filtre Attribute

Le filtre `attribute` accepte deux types de valeurs :

* Un dictionnaire dont les clés correspondent à des noms d'attributs :

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

  Vous pouvez alors spécifier un alias pour la métrique, qui correspond au nom de la métrique dans Datadog. Vous pouvez également spécifier le type de métrique, à savoir « gauge » ou « counter ». Si vous choisissez counter, un taux par seconde est calculé pour cette métrique.

* Une liste de noms d'attributs :

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

    * Le type de métrique est gauge.
    * Le nom de la métrique est `jmx.<DOMAIN_NAME>.<ATTRIBUTE_NAME>`.

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

#### Versions antérieures

La liste de filtres est uniquement prise en charge pour les versions > 5.3.0 de l'Agent Datadog. Si vous utilisez une version antérieure, utilisez plutôt des singletons et plusieurs déclarations `include`.

```yaml
    # Agent Datadog > 5.3.0
      conf:
        - include:
            domain: nom_domaine
            bean:
              - premier_nom_bean
              - deuxieme_nom_bean
    ...


    # Anciennes versions de l'Agent Datadog
      conf:
        - include:
            domain: nom_domaine
            bean: premier_nom_bean
        - include:
            domain: nom_domaine
            bean: deuxieme_nom_bean
    ...
```

### Validation

[Lancez la sous-commande « status » de l'Agent][5] et cherchez votre check JMX dans la section JMXFetch.

Les checks JMX possèdent également une configuration par défaut qui recueille 11 métriques depuis votre application. Reportez-vous au [Metrics Explorer][6] pour : `jvm.heap_memory`, `jvm.non_heap_memory` ou `jvm.gc.cms.count`.

## Données collectées
### Métriques

{{< get-metrics-from-git >}}

## Dépannage

Consultez la liste des [commandes de dépannage JMX][7].

### Limite de 350 métriques

En raison de la nature de ces intégrations, il est possible d'envoyer directement à Datadog un nombre très important de métriques. De nombreux clients s'accordent à dire que certaines de ces métriques ne sont pas requises. Ainsi, Datadog a défini une limite de 350 métriques.

Pour consulter les métriques que vous recueillez et respecter la limite, commencez par utiliser les commandes ci-dessus afin d'identifier les métriques disponibles. Nous vous recommandons de créer des filtres pour réduire le nombre de métriques recueillies. Si vous estimez que vous avez besoin de plus de 350 métriques, contactez [l'assistance Datadog][8].

### Chemin Java

L'Agent n'est pas fourni avec un JVM groupé, mais utilise celui installé sur votre système. Ainsi, vous devez vous assurer que le répertoire de base Java est indiqué dans le chemin de l'utilisateur exécutant l'Agent.

Vous pouvez également spécifier le chemin JVM dans le fichier de configuration de l'intégration :

    java_bin_path: /chemin/vers/java


### Surveillance d'applications JBoss/WildFly

Les instructions suivantes fonctionnent sur la version 5.6.0+ de l'Agent.

Les applications JBoss/WildFly exposent JMX avec un protocole spécifique (JMX à distance) qui n'est pas par défaut groupé avec JMXFetch. Pour que JMXFetch se connecte à ces applications, suivez les étapes suivantes :

* Naviguez jusqu'au fichier `jboss-cli-client.jar` sur votre serveur JBoss/WildFly (par défaut, son chemin est  `$JBOSS_HOME/bin/client/jboss-cli-client.jar`).
* Si JMXFetch s'exécute sur un host autre que l'application JBoss/WildFly, copiez `jboss-cli-client.jar` à un emplacement du host sur lequel JMXFetch s'exécute.
* Ajoutez le chemin du fichier jar dans la section `init_config` de votre configuration :

```yaml
  # Datadog Agent >= 5.6.0

  init_config:
    custom_jar_paths:
      - /chemin/vers/client-cli-jboss.jar
```

* Indiquez une URL personnalisée à laquelle JMXFetch doit se connecter dans la section `instances` de votre configuration :

  ```yaml
  # Datadog Agent >= 5.6.0

  # The jmx_url may be different depending on the version of JBoss/WildFly you're using
  # and the way you've set up JMX on your server
  # Refer to the relevant documentation of JBoss/WildFly for more information
  instances:
    - jmx_url: "service:jmx:remote://localhost:4447"
      name: jboss-application  # Mandatory, but can be set to any value,
                               # is used to tag the metrics pulled from that instance
  ```

* [Redémarrez l'Agent][9].

### Surveillance de Tomcat avec l'option d'écoute de cycle de vie à distance de JMX

Les instructions suivantes fonctionnent sur la version 5.6.0+ de l'Agent.

Si vous utilisez Tomcat avec l'option d'écoute de cycle de vie à distance de JMX activée (consultez la [documentation Tomcat][10] pour en savoir plus), vous devez suivre quelques étapes de configuration supplémentaires pour que JMXFetch se connecte à votre application Tomcat.

* Naviguez jusqu'au fichier `catalina-jmx-remote.jar` sur votre serveur Tomcat (par défaut, son chemin est `$CATALINA_HOME/lib`).
* Si JMXFetch s'exécute sur un host autre que l'application Tomcat, copiez `catalina-jmx-remote.jar` à un emplacement du host sur lequel JMXFetch s'exécute.
* Ajoutez le chemin du fichier jar dans la section `init_config` de votre configuration :

```yaml


init_config:
  custom_jar_paths:
    - /chemin/vers/jmx-distance-catalina.jar
```

* Indiquez une URL personnalisée à laquelle JMXFetch doit se connecter dans la section `instances` de votre configuration :

```yaml
# Agent Datadog >= 5.6.0

# Le jmx_url peut varier en fonction de votre configuration de JMX sur votre serveur Tomcat.
instances:
  - jmx_url: "service:jmx:rmi://:10002/jndi/rmi://:10001/jmxrmi"
    name: tomcat-application  # Requis, mais peut être défini sur n'importe quelle valeur arbitraire,
                              # est utilisé pour taguer les métriques récupérées à partir de cette instance
```

* [Redémarrez l'Agent][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



{{< get-dependencies >}}
[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[2]: https://docs.datadoghq.com/fr/agent/faq/docker-jmx
[3]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
[4]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/graphing/metrics/explorer
[7]: https://docs.datadoghq.com/fr/integrations/faq/troubleshooting-jmx-integrations
[8]: https://docs.datadoghq.com/fr/help
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[10]: https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener
