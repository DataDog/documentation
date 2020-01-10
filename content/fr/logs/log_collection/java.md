---
title: Collecte de logs Java
kind: documentation
aliases:
  - /fr/logs/languages/java
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/faq/log-collection-troubleshooting-guide
    tag: FAQ
    text: Dépannage pour la collecte de logs
  - link: 'https://www.datadoghq.com/blog/java-logging-guide/'
    tag: Blog
    text: 'Comment recueillir, personnaliser et standardiser des logs Java'
---
Les logs Java sont assez complexes à gérer, principalement à cause des traces de pile. Ces dernières sont divisées en plusieurs lignes, ce qui les rend difficiles à associer à l'événement de log d'origine :

```java
//4 événements générés alors qu'un seul événement est attendu !
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

En demandant à votre bibliothèque de journalisation de créer des logs au format JSON :

* vous garantissez qu'un paramètre stack_trace est correctement associé au bon LogEvent ;
* vous vous assurez que tous les attributs d'un événement de log sont correctement extraits (sévérité, nom du logger, nom du thread, etc.) ;
* vous permettez l'accès au [MDC][1], qui consiste en des attributs à associer à n'importe quel événement de log.

**Pour envoyer vos logs à Datadog, nous vous recommandons d'activer la journalisation au sein d'un fichier et de le suivre avec l'Agent Datadog.**

Il est fortement conseillé de configurer vos bibliothèques de journalisation afin de générer vos logs au format JSON et d'éviter de créer des [règles de parsing personnalisées][2].

Vous trouverez ci-dessous des exemples de configuration pour les bibliothèques de journalisation `log4j`, `slf4j` et `log4j2` :

## Configurer votre logger

### Format brut

{{< tabs >}}
{{% tab "Log4j" %}}

Ajoutez un nouvel appender de fichier à `log4j.xml` :

```xml
<appender name="fileAppender" class="org.apache.log4j.FileAppender">
  <param name="File" value="/logs/log4j.log" />
  <param name="Append" value="true" />
  <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n" />
  </layout>
</appender>
```

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][1] pour définir les [MDC (contextes de diagnostic mappés)][2] afin d'ajouter automatiquement par la suite un identifiant de trace et de span à vos logs.

Une fois cette opération effectuée, le `ConversionPattern` à utiliser devient :

```xml
<param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n" />
```

[1]: /fr/tracing/connect_logs_and_traces/?tab=java
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Log4j2" %}}

Modifiez votre fichier `log4j2.xml` :

```xml
 <File name="MonFichier" fileName="logs/app.log" immediateFlush="true">
        <PatternLayout pattern="%d{yyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
 </File>
 <Loggers>
        <Root level="debug">
        <AppenderRef ref="MonFichier" />
        </Root>
</Loggers>
```

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][1] pour définir les [MDC (contextes de diagnostic mappés)][2] afin d'ajouter automatiquement par la suite un identifiant de trace et de span à vos logs.

Une fois cette opération terminée, le `PatternLayout` à utiliser devient :

```xml
<PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n" />
```

[1]: /fr/tracing/connect_logs_and_traces/?tab=java
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Slf4j" %}}

Modifiez votre fichier `logback.xml` :

```xml
<configuration>
(....)
   <timestamp key="byDay" datePattern="yyyyMMdd'T'HHmmss"/>

   <appender name="Fichier" class="ch.qos.logback.core.FileAppender">
      <file> ~/logs/log-${byDay}.log </file>
      <append>true</append>
      <encoder>
          <Pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</Pattern>
        </encoder>
   </appender>
(....)
    <root level="debug">
        <appender-ref ref="Fichier" />
    </root>
</configuration>
```

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][1] pour définir les [MDC (contextes de diagnostic mappés)][2] afin d'ajouter automatiquement par la suite un identifiant de trace et de span à vos logs.

Une fois cette opération terminée, le `Pattern` à utiliser devient :

```xml
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"</Pattern>
```

[1]: /fr/tracing/connect_logs_and_traces/?tab=java
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{< /tabs >}}

### Format JSON

{{< tabs >}}
{{% tab "Log4j" %}}

La création de logs au format JSON avec log4j peut s'avérer complexe. C'est pour cette raison que nous vous conseillons d'utiliser un transmetteur slf4j avec un module du nom de log4j-over-slf4j, puis d'utiliser Logback pour le format JSON.

Pour utiliser log4j-over-slf4j dans votre propre application, la première étape consister à rechercher `log4j.jar`, puis à le remplacer par `log4j-over-slf4j.jar`.
Veuillez noter qu'il vous faudra néanmoins une liaison slf4j ainsi que ses dépendances pour que log4j-over-slf4j fonctionne correctement.

Dans la plupart des situations, il vous suffit de remplacer le fichier jar pour migrer de log4j à SLF4J.
Modifiez votre fichier `pom.xml` :

```xml
<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>log4j-over-slf4j</artifactId>
  <version>1.7.13</version>
</dependency>

<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.3</version>
</dependency>
```

Modifiez ensuite votre fichier `logback.xml` comme décrit dans la section `Slf4j` ci-dessous.

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][1] pour définir les identifiants de trace et de span avec les [MDC (contextes de diagnostic mappés)][2]. Ils seront ensuite automatiquement ajoutés aux logs JSON.

[1]: /fr/tracing/connect_logs_and_traces/?tab=java
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Log4j2" %}}

Il existe une structure JSON log4j2 par défaut qui peut être utilisée. Ajoutez l'appender suivant à votre fichier `log4j2.xml` : 

```
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <JSONLayout compact="true" eventEol="true" properties="true"/>
        </Console>
    </Appenders>
    <Loggers>
        <Root level="TRACE">
            <AppenderRef ref="Console" />
        </Root>
    </Loggers>
</Configuration>
```

* Puis ajoutez les dépendances suivantes dans votre fichier `pom.xml` :

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>datadog</groupId>
    <artifactId>assistance</artifactId>
    <version>1.0-SNAPSHOT</version>


    <dependencies>
        <!-- https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core -->
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.7</version>
        </dependency>


        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>2.8.3</version>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.8.3</version>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
            <version>2.8.3</version>
        </dependency>

    </dependencies>


</project>
```

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][1] pour définir les identifiants de trace et de span avec les [MDC (contextes de diagnostic mappés)][2]. Ils seront ensuite automatiquement ajoutés aux logs JSON.

[1]: https://gist.github.com/NBParis/8bda7aea745987dd3261d475c613cf66
[2]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{% tab "Slf4j" %}}

Nous vous recommandons d'utiliser la bibliothèque [logstash-logback-encoder][1] pour Logback. Son principal avantage réside dans le fait qu'elle est placée dans le référentiel Maven principal.

Pour l'ajouter à votre classpath, ajoutez simplement la dépendance suivante (version 4.5.1 dans l'exemple) à votre fichier `pom.xml` :

```xml
<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
  <groupId>ch.qos.logback</groupId>
  <artifactId>logback-classic</artifactId>
  <version>1.1.3</version>
</dependency>
```

Modifiez ensuite votre fichier `logback.xml` et mettez à jour l'encodeur :

```xml
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder">
            <customFields>{"env":"prod"}</customFields>
        </encoder>
    </appender>
```

**Ajouter des identifiants de trace à vos logs**

Si l'APM est activé pour cette application et que vous souhaitez améliorer la corrélation entre les traces et les logs d'application, [suivez ces instructions][2] pour définir les identifiants de trace et de span avec les [MDC (contextes de diagnostic mappés)][3]. Ils seront ensuite automatiquement ajoutés aux logs JSON.

[1]: https://github.com/logstash/logstash-logback-encoder
[2]: /fr/tracing/connect_logs_and_traces/?tab=java
[3]: http://logback.qos.ch/manual/mdc.html
{{% /tab %}}
{{< /tabs >}}

## Configurer l'Agent Datadog

Créez un fichier `java.yaml` dans le répertoire `conf.d/` de l'Agent avec le contenu suivant :

```yaml

##Section Log
logs:

    ## - type (obligatoire) : type de fichier de la source d'entrée de log (tcp/udp/file).
    ##   port / path (obligatoire) : définit le type tcp ou udp du port. Choisit le chemin si le type est défini sur file.
    ##   service (obligatoire) : nom du service propriétaire du log.
    ##   source (obligatoire) : attribut qui définit l'intégration qui envoie les logs.
    ##   sourcecategory (facultatif) : attribut à valeur multiple. Il peut être utilisé pour préciser l'attribut source.
    ##   tags (facultatif) : ajoute des tags à chaque log recueilli.

  - type: fichier
    path: /chemin/vers/votre/log/java.log
    service: java
    source: java
    sourcecategory: sourcecode
    # Pour les logs multiligne, s'ils commencent par la date au format aaaa-mm-jj, supprimez la mise en commentaire de la règle de traitement suivante.
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

## Logging sans agent

Il est possible de transmettre des logs depuis votre application vers Datadog ou directement vers l'Agent Datadog. Cette configuration n'est pas recommandée, car la gestion des problèmes de connexion ne doit pas se faire directement dans votre application ; il peut toutefois arriver qu'il soit impossible d'enregistrer les logs dans un fichier lorsque votre application est utilisée sur une machine hors d'accès.

Vous devez suivre deux étapes pour configurer l'application Java afin de diffuser des logs directement à Datadog :

1. Ajoutez la bibliothèque de journalisation Logback à votre code (ou créez un pont entre  votre logger actuel et la bibliothèque).
2. Configurez-la pour qu'elle envoie les logs à Datadog.

### Créer un pont entre les bibliothèques de journalisation Java et Logback

* Nous vous conseillons d'utiliser la bibliothèque de journalisation Logback [logstash-logback-encoder][3] pour diffuser directement vos logs.

Cette bibliothèque de journalisation peut être liée à partir des bibliothèques Java les plus couramment utilisées :

{{< tabs >}}
{{% tab "Log4j" %}}

La journalisation vers un serveur à distance au format JSON avec Log4j peut s'avérer complexe. Il est recommandé d'utiliser un transmetteur SLF4J avec un module du nom de `log4j-over-slf4j`, puis d'utiliser Logback pour le format JSON.

Pour utiliser `log4j-over-slf4j` dans votre propre application, la première étape consiste à rechercher `log4j.jar`, puis à le remplacer par `log4j-over-slf4j.jar`.
Dans la plupart des situations, il vous suffit de remplacer le fichier jar pour migrerde Log4j à SLF4J.

Modifiez ensuite le fichier `pom.xml` avec le contenu suivant : 

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>log4j-over-slf4j</artifactId>
    <version>1.7.13</version>
</dependency>

<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.3</version>
</dependency>
```

**Remarque** : suite à cette migration, les fichiers de configuration Log4j ne seront plus recueillis. Migrez votre fichier `log4j.properties` vers `logback.xml` avec le [convertisseur Log4j][1].

[1]: https://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Log4j2" %}}

Log4j2 permet la journalisation sur un host à distance, mais n'offre pas la possibilité d'ajouter une clé d'API en préfixe avant les logs. C'est pour cette raison qu'il est recommandé d'utiliser un transmetteur SLF4J avec un module du nom de `log4j-over-slf4j`, puis d'utiliser Logback pour le format JSON.

Pour utiliser `log4j-over-slf4j` dans votre propre application, la première étape consiste à rechercher `log4j.jar`, puis à le remplacer par `log4j-to-slf4j-2.11.jar`.

Modifiez ensuite le fichier `pom.xml` avec le contenu suivant : 

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-to-slf4j</artifactId>
    <version>2.11.0</version>
</dependency>

<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.3</version>
</dependency>
```

**Remarques :** 

- Vérifiez que `log4j-slf4j-impl-2.0.jar` n'est **pas** utilisé, comme expliqué à l'adresse suivante : https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html.
- Suite à cette migration, les fichiers de configuration Log4j ne seront plus recueillis. Migrez votre fichier `log4j.properties` vers `logback.xml` avec le [convertisseur Log4j][1].

[1]: https://logback.qos.ch/translator
{{% /tab %}}

{{% tab "Slf4j" %}}

Pour ajouter Logback [logstash-logback-encoder][1] à votre classpath, ajoutez la dépendance suivante (version 4.5.1 dans l'exemple) à votre fichier `pom.xml` :

```xml
<dependency>
  <groupId>net.logstash.logback</groupId>
  <artifactId>logstash-logback-encoder</artifactId>
  <version>4.5.1</version>
</dependency>

<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.1.3</version>
</dependency>
```

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{< /tabs >}}

### Configuration de Logback

Configurez le logger Logback de façon à diffuser les logs directement à Datadog en ajoutant le code suivant à votre fichier `logback.xml` :

```
<appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
    <encoder class="net.logstash.logback.encoder.LogstashEncoder"/>
</appender>

<appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
    <remoteHost>intake.logs.datadoghq.com</remoteHost>
  <port>10514</port>
  <keepAliveDuration>1 minute</keepAliveDuration>
    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
      <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
        <layout class="ch.qos.logback.classic.PatternLayout">
          <pattern><CLÉAPI> %mdc{cléNonExistante}</pattern>
        </layout>
      </prefix>    
    </encoder>
</appender>

<root level="debug">
    <appender-ref ref="JSON_TCP" />
    <appender-ref ref="JSON" />
</root>
```

**Remarques :**

- Remplacez `<CLÉAPI>` par la valeur clé de votre API Datadog
- `%mdc{cléNonExistante}` est ajouté, car la configuration XML supprime les espaces, comme expliqué [ici][4].
- Consultez la liste des [endpoints disponibles pour le site européen][5].

Découvrez plus de détails sur le paramètre de préfixe dans la [documentation Logback][4] (en anglais).


## Concepts avancés

Enrichissez vos événements de log avec des attributs contextuels.

### Utilisation du parser key/value

Le [parser key/value][6] extrait n'importe quelle expression `<key>=<value>` identifiée dans un événement de log.

Pour enrichir vos événements de log dans Java, vous pouvez réécrire les messages dans votre code et y ajouter des séquences `<key>=<value>`.

Par exemple, si vous avez :

```java
logger.info("A généré 1 001 messages lors des 93 dernières secondes pour customer scope prod30");
```

Vous pouvez le remplacer par :

```java
logger.info("A généré quantity=1001 messages lors des dernières durationInMs=93180 ms pour le client scope=prod30");
```

Lorsque le [parser key/value][6] est activé, **Datadog** extrait automatiquement chaque paire de votre document JSON final :

```json
{
    //...
    "message" : "A généré quantity=1001 messages lors des dernières durationInMs=93180 ms pour le client scope=prod30",
    "scope" : "prod30",
    "durationInMs" : 93180,
    "quantity" : 1001
    //...
}
```

Vous pouvez donc exploiter *scope* en tant que champ, et *durationInMs* et *quantity* en tant que mesures de log.

### MDC (contextes de diagnostics mappés)

Pour enrichir vos logs, vous pouvez également utiliser des [MDC (contextes de diagnostics mappés)][1] dans Java.

Si vous utilisez Logback, utilisez le code Java suivant :

```java
...
MDC.put("scope", "prod30");
logger.info("A généré 1 001 messages lors des dernières 93 secondes");
...
```

Pour générer ce document JSON final :

```json
{
    "message" : "A généré 1 001 messages lors des dernières 93 secondes",
    "scope" : "prod30",
}
```

**Les MDC sont très utiles, mais pour une raison inconnue, seules les chaînes de caractères sont autorisées. Par conséquent, nous vous déconseillons de fournir des valeurs numériques aux métriques dotées d'un MDC.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /fr/logs/processing/parsing
[3]: https://github.com/logstash/logstash-logback-encoder
[4]: https://github.com/logstash/logstash-logback-encoder#prefixsuffix
[5]: /fr/logs/log_collection/?tab=eusite#datadog-logs-endpoints
[6]: /fr/logs/processing/parsing/#key-value