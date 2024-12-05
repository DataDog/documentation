---
aliases:
- /fr/logs/languages/java
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: Documentation
  text: Associer vos logs à vos traces
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guide de dépannage pour la collecte de logs
- link: https://www.datadoghq.com/blog/java-logging-guide/
  tag: Blog
  text: Comment recueillir, personnaliser et standardiser des logs Java
- link: /glossary/#tail
  tag: Glossaire
  text: Entrée du glossaire pour le terme « tail » (suivi)
title: Collecte de logs avec Java
---

Pour envoyer vos logs à Datadog, activez la journalisation au sein d'un fichier et [suivez][14] ce fichier avec l'Agent Datadog.

Les stack traces types des logs Java sont divisées en plusieurs lignes, ce qui les rend difficiles à associer à l'événement de log d'origine. Par exemple :

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Pour résoudre ce problème, configurez votre bibliothèque de journalisation de façon à ce que vos logs soient générés au format JSON. L'enregistrement des logs au format JSON offre les avantages suivants :

* La stack trace est correctement associée à l'événement de log.
* Tous les attributs d'un événement de log (gravité, nom du logger, nom du thread, etc.) sont correctement extraits.
* Vous avez accès aux attributs du [MDC (Mapped Diagnostic Context)][1], que vous pouvez associer à n'importe quel événement de log.
* Vous n'avez pas besoin de créer de [règles de parsing personnalisées][2].

Les instructions suivantes montrent des exemples de configuration pour les bibliothèques de journalisation Log4j, Log4j 2 et Logback.

## Configurer votre logger

### Format JSON

{{< tabs >}}
{{% tab "Log4j" %}}

Pour Log4j, générez les logs au format JSON en utilisant le module SLF4J [log4j-over-slf4j][1] avec Logback. `log4j-over-slf4j` remplace directement Log4j dans votre application, ce qui fait qu'aucune modification du code n'est nécessaire. Pour l'utiliser :

1. Dans votre fichier `pom.xml`, remplacez la dépendance `log4j.jar` par une dépendance `log4j-over-slf4j.jar`, puis ajoutez les dépendances Logback :
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Configurez un appender en utilisant la structure JSON dans `logback.xml` :

    Pour un fichier :

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

    Pour une console :

    ```xml
    <configuration>
      <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
          <encoder class="ch.qos.logback.classic.encoder.JsonEncoder"/>
      </appender>

      <root>
        <level value="DEBUG"/>
          <appender-ref ref="CONSOLE"/>
        </root>
    </configuration>
    ```

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
{{% /tab %}}
{{% tab "Log4j 2" %}}

Log4j 2 intègre une structure JSON.

1. Configurez un appender en utilisant la structure JSON dans `log4j2.xml` :

    Pour un file appender :

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>
      <Appenders>
        <File name="FILE" fileName="logs/app.log" >
          <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
        </File>
      </Appenders>

      <Loggers>
        <Root level="INFO">
          <AppenderRef ref="FILE"/>
        </Root>
      </Loggers>
    </Configuration>
    ```

    Pour un console appender :

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Configuration>

        <Appenders>
            <Console name="console" target="SYSTEM_OUT">
                <JSONLayout compact="true" eventEol="true" properties="true" stacktraceAsString="true" />
            </Console>
        </Appenders>

        <Loggers>
            <Root level="INFO">
                <AppenderRef ref="console"/>
            </Root>

        </Loggers>
    </Configuration>
    ```

2. Ajoutez les dépendances de structure JSON dans votre fichier `pom.xml` :
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.13.0</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>2.13.0</version>
    </dependency>
    ```

{{% /tab %}}
{{% tab "Logback" %}}

Utilisez la bibliothèque [logstash-logback-encoder][1] pour les logs au format JSON dans Logback.

1. Configurez un file appender en utilisant la structure JSON dans `logback.xml` :

    ```xml
    <configuration>
      <appender name="FILE" class="ch.qos.logback.core.FileAppender">
        <file>logs/app.log</file>
        <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
      </appender>

      <root level="INFO">
        <appender-ref ref="FILE"/>
      </root>
    </configuration>
    ```

2. Ajoutez la dépendance d'encodeur Logstash dans votre fichier `pom.xml` :

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```

[1]: https://github.com/logstash/logstash-logback-encoder
{{% /tab %}}
{{% tab "Tinylog" %}}

Créez une configuration de writer JSON en vous basant sur la [documentation officielle de Tinylog][1].


Utilisez le format suivant dans un fichier `tinylog.properties` :

```properties
writer                     = json
writer.file                = log.json
writer.format              = LDJSON
writer.level               = info
writer.field.level         = level
writer.field.source        = {class}.{method}()
writer.field.message       = {message}
writer.field.dd.trace_id   = {context: dd.trace_id}
writer.field.dd.span_id    = {context: dd.span_id}
writer.field.dd.service    = {context: dd.service}
writer.field.dd.version    = {context: dd.version}
writer.field.dd.env        = {context: dd.env}
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

#### Ajouter des identifiants de trace à vos logs

Si APM est activé pour cette application, vous pouvez corréler vos logs et vos traces en activant l'injection des ID de trace. Consultez la section [Associer vos logs Java à vos traces][3] pour en savoir plus.

### Format brut

{{< tabs >}}
{{% tab "Log4j" %}}

Configurez un file appender dans `log4j.xml` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </layout>
  </appender>

  <root>
    <priority value="INFO"/>
    <appender-ref ref="FILE"/>
  </root>

</log4j:configuration>
```

{{% /tab %}}
{{% tab "Log4j 2" %}}

Configurez un file appender dans `log4j2.xml` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </File>
  </Appenders>

  <Loggers>
    <Root level="INFO">
      <AppenderRef ref="FILE"/>
    </Root>
  </Loggers>
</Configuration>
```

{{% /tab %}}
{{% tab "Logback" %}}

Configurez un file appender dans `logback.xml` :

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
    </encoder>
  </appender>

  <root level="INFO">
    <appender-ref ref="FILE"/>
  </root>
</configuration>
```

{{% /tab %}}
{{% tab "Tinylog" %}}

Créez une configuration de writer sortant vers un fichier en vous basant sur la [documentation officielle de Tinylog][1].


Utilisez le format suivant dans un fichier `tinylog.properties` :

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#json-writer
{{% /tab %}}
{{< /tabs >}}

#### Ajouter des identifiants de trace à vos logs

Si APM est activé pour cette application, vous pouvez corréler vos logs et vos traces en activant l'injection des ID de trace. Consultez la section [Associer vos logs Java à vos traces][3].

Si vous ne souhaitez _pas_ corréler vos logs et vos traces, vous pouvez supprimer les paramètres fictifs MDC (`%X{dd.trace_id} %X{dd.span_id}`) des logs patterns inclus dans les exemples de configuration ci-dessus.


## Configurer l'Agent Datadog

Une fois la [collecte de logs activée][4], configurez la [collecte de logs personnalisée][5] pour suivre vos fichiers de logs et les transmettre à Datadog.

1. Créez un dossier `java.d/` dans le [répertoire de configuration de l'Agent][6] `conf.d/`.
2. Créez un fichier `conf.yaml` dans votre dossier `java.d/` avec le contenu suivant :

    ```yaml
    #Log section
    logs:

      - type: file
        path: "<path_to_your_java_log>.log"
        service: <service_name>
        source: java
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```

3. [Redémarrez l'Agent][7].
4. Lancez la [sous-commande status de l'Agent][8] et cherchez `java` dans la section `Checks` pour vérifier que les logs sont bien transmis à Datadog.

Si les logs sont au format JSON, Datadog [parse automatiquement les messages de log][9] pour extraire les attributs. Utilisez le [Log Explorer][10] pour visualiser et dépanner vos logs.

## Logging sans Agent

Dans le cas exceptionnel où votre application s'exécute sur une machine qui n'est pas accessible ou qui ne peut pas enregistrer les logs dans un fichier, il est possible de transmettre directement les logs à Datadog ou à l'Agent Datadog. Cette configuration n'est pas recommandée, car votre application doit alors gérer les problèmes de connexion.

Pour transmettre vos logs directement à Datadog :

1. Ajoutez la bibliothèque de journalisation Logback à votre code ou **créez un pont entre votre logger actuel et Logback**.
2. **Configurez Logback** de façon à envoyer les logs à Datadog.

### Créer un pont entre les bibliothèques de journalisation Java et Logback

Si vous n'utilisez pas déjà Logback, la plupart des bibliothèques de journalisation courantes peuvent être reliées à Logback.

{{< tabs >}}
{{% tab "Log4j" %}}

Utilisez le module SLF4J [log4j-over-slf4j][1] avec Logback pour envoyer les logs vers un autre serveur. `log4j-over-slf4j` remplace directement Log4j dans votre application, ce qui fait qu'aucune modification du code n'est nécessaire. Pour l'utiliser :

1. Dans votre fichier `pom.xml`, remplacez la dépendance `log4j.jar` par une dépendance `log4j-over-slf4j.jar`, puis ajoutez les dépendances Logback :
    ```xml
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>log4j-over-slf4j</artifactId>
      <version>1.7.32</version>
    </dependency>
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```
2. Configurez Logback.

**Remarque** : suite à cette modification, les fichiers de configuration Log4j ne seront plus recueillis. Migrez votre fichier `log4j.properties` vers `logback.xml` avec le [convertisseur Log4j][2].


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 permet la journalisation sur un host à distance, mais n'offre pas la possibilité d'ajouter une clé d'API en préfixe avant les logs. De ce fait, utilisez le module SLF4J [log4j-over-slf4j][1] avec Logback. `log4j-to-slf4j.jar` remplace directement Log4j 2 dans votre application, ce qui fait qu'aucune modification du code n'est nécessaire. Pour l'utiliser :

1. Dans votre fichier `pom.xml`, remplacez la dépendance `log4j.jar` par une dépendance `log4j-over-slf4j.jar`, puis ajoutez les dépendances Logback :
    ```xml
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-to-slf4j</artifactId>
        <version>2.17.1</version>
    </dependency>
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.9</version>
    </dependency>
    <dependency>
        <groupId>net.logstash.logback</groupId>
        <artifactId>logstash-logback-encoder</artifactId>
        <version>6.6</version>
    </dependency>

    ```
2. Configurez Logback.

**Remarques :**

- Vérifiez que `log4j-slf4j-impl.jar` n'est **pas** utilisé, comme expliqué à l'adresse suivante : https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- Suite à cette migration, les fichiers de configuration Log4j 2 ne seront plus recueillis. Migrez votre fichier `log4j.properties` vers `logback.xml` avec le [convertisseur Log4j][2].

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Configurer Logback

Utilisez la bibliothèque de journalisation [logstash-logback-encoder][11] avec Logback pour envoyer directement vos logs à Datadog.

1. Configurez un TCP appender dans votre fichier `logback.xml`. Votre clé d'API sera ainsi récupérée depuis la variable d'environnement `DD_API_KEY`. Vous pouvez également ajouter votre clé d'API directement dans le fichier de configuration :

    {{< site-region region="us,us3,us5,ap1" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>intake.logs.datadoghq.com:10516</destination>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern>${DD_API_KEY} %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
      <ssl />
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="eu" >}}

  ```xml
  <configuration>
    <appender name="FILE" class="ch.qos.logback.core.FileAppender">
      <file>logs/app.log</file>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder" />
    </appender>
    <appender name="JSON_TCP" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
      <destination>tcp-intake.logs.datadoghq.eu:443</destination>
      <keepAliveDuration>20 seconds</keepAliveDuration>
      <encoder class="net.logstash.logback.encoder.LogstashEncoder">
          <prefix class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
              <layout class="ch.qos.logback.classic.PatternLayout">
                  <pattern>${DD_API_KEY} %mdc{keyThatDoesNotExist}</pattern>
              </layout>
            </prefix>
      </encoder>
      <ssl />
    </appender>

    <root level="DEBUG">
      <appender-ref ref="FILE"/>
      <appender-ref ref="JSON_TCP" />
    </root>
  </configuration>
  ```

    {{< /site-region >}}

    {{< site-region region="gov" >}}
  Non pris en charge.
    {{< /site-region >}}

    **Remarque** : `%mdc{keyThatDoesNotExist}` est utilisé car la configuration XML supprime les espaces. Pour en savoir plus sur le paramètre de préfixe, consultez la [documentation Logback][12].

2. Ajoutez la dépendance d'encodeur Logstash dans votre fichier `pom.xml` :

    ```xml
    <dependency>
      <groupId>ch.qos.logback</groupId>
      <artifactId>logback-classic</artifactId>
      <version>1.2.9</version>
    </dependency>
    <dependency>
      <groupId>net.logstash.logback</groupId>
      <artifactId>logstash-logback-encoder</artifactId>
      <version>6.6</version>
    </dependency>
    ```

## Concepts avancés

Enrichissez vos événements de log avec des attributs contextuels.

### Utilisation du parser key/value

Le [parser key/value][13] extrait n'importe quelle expression `<KEY>=<VALUE>` identifiée dans un événement de log.

Pour enrichir vos événements de log dans Java, vous pouvez réécrire les messages dans votre code et y ajouter des séquences `<KEY>=<VALUE>`.

Par exemple, si vous avez :

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

Vous pouvez le remplacer par :

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

Lorsque le parser key/value est activé, chaque paire est extraite à partir du JSON :

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

Vous pouvez donc utiliser *scope* en tant que champ, et *durationInMs* et *quantity* en tant que mesures de log.

### MDC

Pour enrichir vos logs, vous pouvez également utiliser des [MDC (contextes de diagnostics mappés)][1].

Si vous utilisez SLF4J, exécutez le code Java suivant :

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

Pour générer ce JSON :

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**Remarque** : les MDC acceptent uniquement les chaînes de caractères. Vous ne devez donc pas les utiliser pour des métriques à valeur numérique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://logback.qos.ch/manual/mdc.html
[2]: /fr/logs/log_configuration/parsing
[3]: /fr/tracing/other_telemetry/connect_logs_and_traces/java/
[4]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[5]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[6]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[7]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[8]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information]
[9]: /fr/logs/log_configuration/parsing/?tab=matchers
[10]: /fr/logs/explorer/#overview
[11]: https://github.com/logstash/logstash-logback-encoder
[12]: https://github.com/logstash/logstash-logback-encoder#prefixsuffixseparator
[13]: /fr/logs/log_configuration/parsing/#key-value-or-logfmt
[14]: /fr/glossary/#tail