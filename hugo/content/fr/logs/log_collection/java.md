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
- link: /logs/explorer/#visualize
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /tracing/other_telemetry/connect_logs_and_traces/java/
  tag: Documentation
  text: Connect Logs and Traces
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
Pour envoyer vos journaux à Datadog, enregistrez-les dans un fichier et utilisez [tail][1] pour suivre ce fichier avec votre Datadog Agent.

Les traces de pile des journaux Java typiques sont réparties sur plusieurs lignes, ce qui rend leur association à l'événement de journal d'origine difficile. Exemple :

```java
//4 events generated when only one is expected!
Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Pour résoudre ce problème, configurez votre bibliothèque de journalisation pour produire vos journaux au format JSON. En enregistrant au format JSON, vous :

*  Assurez-vous que la trace de pile est correctement intégrée dans l'événement de journal.
*  Assurez-vous que tous les attributs de l'événement de journal (tels que la gravité, le nom du journaliseur et le nom du thread) sont correctement extraits.
* Accédez aux attributs du [Mapped Diagnostic Context (MDC)][2], que vous pouvez attacher à tout événement de journal.
*  Évitez la nécessité de [règles d'analyse personnalisées][3].

Les instructions suivantes montrent des exemples de configuration pour les bibliothèques de journalisation Log4j, Log4j 2 et Logback.

##  Configurez votre journaliseur {#configure-your-logger}

###  Format JSON {#json-format}

{{< tabs >}}
{{% tab "Log4j" %}}

Pour Log4j, enregistrez au format JSON en utilisant le module SLF4J [log4j-over-slf4j][1] combiné avec Logback. `log4j-over-slf4j` remplace proprement Log4j dans votre application afin que vous n'ayez pas à apporter de modifications au code.

1.  Dans votre fichier `pom.xml`, remplacez la dépendance `log4j.jar` par une dépendance `log4j-over-slf4j.jar`, et ajoutez les dépendances Logback. Exemple :
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
2.  Configurez un appender utilisant la mise en page JSON dans `logback.xml`. Voir les exemples de configurations suivants pour le fichier et la console.

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

    For console:

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
{{% tab "Log4j 2" %}}

Log4j 2 intègre une structure JSON.

1.  Configurez un appender utilisant la mise en page JSON dans `log4j2.xml`. Voir les exemples de configurations suivants pour l'appender de fichier et de console. Pour une description complète des plugins Log4j, consultez la [référence des plugins Log4j][1].
{{% collapse-content title="Appender de fichier" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml"  >}}
<?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <File name="FILE" fileName="logs/app.log" >
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </File>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="FILE"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="Appender de console" level="h4" %}}
{{< code-block lang="xml" filename="log4j2.xml" >}}
  <?xml version="1.0" encoding="UTF-8"?>
  <Configuration>
    <Appenders>
      <Console name="console" target="SYSTEM_OUT">
        <JsonTemplateLayout eventTemplateUri="classpath:MyLayout.json"/>
      </Console>
    </Appenders>
    <Loggers>
      <Root level="INFO">
        <AppenderRef ref="console"/>
      </Root>
    </Loggers>
  </Configuration>
{{< /code-block >}}
{{% /collapse-content %}}

2. Ajoutez le fichier de modèle de mise en page JSON (tel que `MyLayout.json`) dans le répertoire `src/main/resources` de votre projet Java. Exemple :
    ```json
    {
       "timestamp":{
          "$resolver":"timestamp",
          "pattern":{
             "format":"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
             "timeZone":"UTC"
          }
       },
       "status":{
          "$resolver":"level",
          "field":"name"
       },
       "thread_name":{
          "$resolver":"thread",
          "field":"name"
       },
       "logger_name":{
          "$resolver":"logger",
          "field":"name"
       },
       "message":{
          "$resolver":"message",
          "stringified":true
       },
       "exception_class":{
          "$resolver":"exception",
          "field":"className"
       },
       "exception_message":{
          "$resolver":"exception",
          "field":"message"
       },
       "stack_trace":{
          "$resolver":"exception",
          "field":"stackTrace",
          "stackTrace":{
             "stringified":true
          }
       },
       "host":"${hostName}",
       "service":"${env:DD_SERVICE}",
       "version":"${env:DD_VERSION}",
       "dd.trace_id":{
          "$resolver":"mdc",
          "key":"dd.trace_id"
       },
       "dd.span_id":{
          "$resolver":"mdc",
          "key":"dd.span_id"
       }
    }
    ```

3. Ajoutez les dépendances de mise en page JSON à votre `pom.xml`. Exemple :
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

[1]: https://logging.apache.org/log4j/2.x/plugin-reference.html
{{% /tab %}}
{{% tab "Logback" %}}

Utilisez la bibliothèque [logstash-logback-encoder][1] pour les logs au format JSON dans Logback.

1. Configurez un appender de fichier en utilisant la mise en page JSON dans `logback.xml`. Exemple :

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

2. Ajoutez la dépendance de l'encodeur Logstash à votre fichier `pom.xml`. Exemple :

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


Utilisez le format suivant dans un fichier `tinylog.properties` :

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

### Format brut {#raw-format}

{{< tabs >}}
{{% tab "Log4j" %}}

Configurez un appender de fichier dans `log4j.xml`. Exemple :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration>

  <appender name="FILE" class="org.apache.log4j.FileAppender">
    <param name="File" value="logs/app.log"/>
    <param name="Append" value="true"/>

    <layout class="org.apache.log4j.PatternLayout">
      <param name="ConversionPattern" value="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
    </layout>
  </appender>

  <root>
    <priority value="INFO"/>
    <appender-ref ref="FILE"/>
  </root>

</log4j:configuration>
```

{{% /tab %}}
{{% tab "Log4j 2" %}}

Configurez un appender de fichier dans `log4j2.xml`. Exemple :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration>
  <Appenders>
    <File name="FILE" fileName="logs/app.log">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n"/>
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

Configurez un appender de fichier dans `logback.xml`. Exemple :

```xml
<configuration>
  <appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <file>${dd.test.logfile}</file>
    <append>false</append>
    <immediateFlush>true</immediateFlush>

    <encoder>
      <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5p %C:%L - %X{dd.trace_id} %X{dd.span_id} - %m%n</pattern>
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


Utilisez le format suivant dans un fichier `tinylog.properties` :

```properties
writer          = file
writer.level    = debug
writer.format   = {level} - {message} - "dd.trace_id":{context: dd.trace_id} - "dd.span_id":{context: dd.span_id}
writer.file     = log.txt
```

[1]: https://tinylog.org/v2/configuration/#writer
{{% /tab %}}
{{< /tabs >}}

#### Injectez des identifiants de trace dans vos journaux {#inject-trace-ids-into-your-logs}

Si APM est activé pour cette application, vous pouvez corréler les journaux et les traces en activant l'injection d'identifiants de trace. Voir [Connexion des journaux et des traces Java][4].

Si vous _ne corrélez pas_ les journaux et les traces, retirez les espaces réservés MDC (`%X{dd.trace_id} %X{dd.span_id}`) des modèles de journaux inclus dans les exemples de configuration précédents.

Par exemple, si vous utilisez Log4j 2 mais que vous ne corrélez pas les journaux et les traces, retirez le bloc suivant du modèle de mise en page de journal d'exemple, `MyLayout.json` :

```json
"dd.trace_id":{
   "$resolver":"mdc",
   "key":"dd.trace_id"
},
"dd.span_id":{
   "$resolver":"mdc",
   "key":"dd.span_id"
}
```


## Configurez le Datadog Agent {#configure-the-datadog-agent}

Une fois que [la collecte de journaux est activée][5], configurez [la collecte de journaux personnalisée][6] pour suivre vos fichiers journaux et les envoyer à Datadog.

1. Créez un dossier `java.d/` dans le `conf.d/` [répertoire de configuration de l'Agent][7].
2. Créez un fichier `conf.yaml` dans `java.d/` avec le contenu suivant :

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

3. [Redémarrez l'Agent][8].
4. Exécutez la [sous-commande d'état de l'Agent][9] et recherchez `java` dans la section {{< ui >}}Checks{{< /ui >}} pour confirmer que les journaux sont correctement soumis à Datadog.

Si les journaux sont au format JSON, Datadog [analyse automatiquement les messages de journal][10] pour extraire les attributs des journaux. Utilisez le [Log Explorer][11] pour visualiser et dépanner vos journaux.

## Diffusez les journaux directement vers l'Agent {#stream-logs-directly-to-the-agent}

Dans le cas exceptionnel où votre application s'exécute sur une machine qui ne peut pas être accessible ou qui ne peut pas enregistrer dans un fichier, il est possible de diffuser les journaux vers Datadog ou directement vers l'Agent Datadog. Ce n'est pas la configuration recommandée, car cela nécessite que votre application gère les problèmes de connexion.

Pour transmettre vos logs directement à Datadog :

1. Ajoutez la bibliothèque de journalisation Logback à votre code, ou **reliez votre journaliseur actuel à Logback**.
2. **Configurez Logback** pour envoyer des journaux à Datadog.

### Reliez les bibliothèques de journalisation Java à Logback {#bridge-from-java-logging-libraries-to-logback}

Si vous n'utilisez pas déjà Logback, la plupart des bibliothèques de journalisation courantes peuvent être reliées à Logback.

{{< tabs >}}
{{% tab "Log4j" %}}

Utilisez le module SLF4J [log4j-over-slf4j][1] avec Logback pour envoyer des journaux à un autre serveur. `log4j-over-slf4j` remplace proprement Log4j dans votre application afin que vous n'ayez pas à apporter de modifications au code.

1.  Dans votre fichier `pom.xml`, remplacez la dépendance `log4j.jar` par une dépendance `log4j-over-slf4j.jar`, et ajoutez les dépendances Logback. Exemple :
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

**Remarque :** En raison de ce changement, les fichiers de configuration Log4j ne seront plus pris en compte. Migrez votre fichier `log4j.properties` vers `logback.xml` avec le [traducteur Log4j][2].


[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator/
{{% /tab %}}

{{% tab "Log4j 2" %}}

Log4j 2 permet de journaliser vers un hôte distant, mais il n'offre pas la possibilité de préfixer les journaux avec une clé API. Pour cette raison, utilisez le module SLF4J [log4j-over-slf4j][1] et Logback. `log4j-to-slf4j.jar` remplace proprement Log4j 2 dans votre application afin que vous n'ayez pas à apporter de modifications au code. Pour l'utiliser :

1.  Dans votre fichier `pom.xml`, remplacez la dépendance `log4j.jar` par une dépendance `log4j-over-slf4j.jar`, et ajoutez les dépendances Logback. Exemple :
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

**Remarques :**

- Assurez-vous que `log4j-slf4j-impl.jar` n'est **pas** utilisé comme décrit ici : https://logging.apache.org/log4j/log4j-2.2/log4j-to-slf4j/index.html
- En raison de cette migration, les fichiers de configuration Log4j 2 ne seront plus pris en compte. Migrez votre fichier `log4j.properties` vers `logback.xml` avec le [traducteur Log4j][2].

[1]: http://www.slf4j.org/legacy.html#log4j-over-slf4j
[2]: http://logback.qos.ch/translator
{{% /tab %}}

{{< /tabs >}}

### Configurez Logback {#configure-logback}
Datadog ne prend pas en charge l'envoi de journaux directement via TCP vers l'entrée de Datadog. Au lieu de cela, configurez Logback vers votre Agent Datadog local, qui transmet ensuite les journaux à Datadog via HTTPS avec un enrichissement automatique.

1. [Installez un Agent Datadog local][12] (v6+ / v7+).
1. Activez la collecte de journaux dans `datadog.yaml`, et assurez-vous que l'Agent transmet les journaux via HTTPS (HTTPS est le transport par défaut pour l'Agent v6.19+/v7.19+ et ultérieur) :
   ```
   logs_enabled: true
   logs_config:
     # HTTPS is the default. Keep or set this to force HTTPS forwarding.
     force_use_http: true
     # (Optional) auto-detect multi-line patterns
     auto_multi_line_detection: true
   ```

1. Activez la collecte de journaux sur l'Agent.
   ```yaml
   # /etc/datadog-agent/conf.d/logback.d/conf.yaml
   logs:
     - type: tcp
       port: 10518           # Port the Agent will listen on
       service: my-java-app  # Your service name (unified service tagging)
       source: java          # Or a more specific source, e.g., "logback"
   ```
1. Redémarrez l'Agent pour appliquer les modifications.
1. Configurez Logback pour envoyer les journaux à l'Agent. Utilisez l'[appender TCP logstash-logback-encoder][13] dans votre `logback.xml` pour transmettre les journaux à l'Agent :
   ```xml
   <configuration>
     <appender name="DD_TCP_JSON" class="net.logstash.logback.appender.LogstashTcpSocketAppender">
       <destination>localhost:10518</destination>
       <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
         <providers>
           <timestamp/>
           <pattern>
             <pattern>
               {
                 "message": "%message",
                 "level": "%level",
                 "logger": "%logger",
                 "service": "${DD_SERVICE:-my-java-app}",
                 "env": "${DD_ENV:-prod}",
                 "version": "${DD_VERSION:-1.0.0}",
                 "dd.trace_id": "%X{dd.trace_id}",
                 "dd.span_id": "%X{dd.span_id}"
               }
             </pattern>
           </pattern>
           <arguments/>
           <stackTrace/>
         </providers>
       </encoder>
     </appender>
   </configuration>
   ```
   Ensuite, référencez-le dans votre logger racine :
   ```xml
   <root level="INFO">
     <appender-ref ref="DD_TCP_JSON"/>
   </root>
   ```

1. Vérifiez le transfert des journaux. Exécutez `datadog-agent status` pour confirmer votre écouteur TCP, et vérifiez l'Explorateur de journaux pour les entrées étiquetées avec votre service.

## Pour aller plus loin {#getting-further}

Enrichissez vos événements de log avec des attributs contextuels.

### Utilisation du parseur de valeur clé {#using-the-key-value-parser}

Le [parseur de valeur clé][14] extrait tout motif `<KEY>=<VALUE>` reconnu dans tout événement de journal.

Pour enrichir vos événements de journal en Java, vous pouvez réécrire des messages dans votre code et introduire des séquences `<KEY>=<VALUE>`.

Par exemple, si vous avez :

```java
logger.info("Emitted 1001 messages during the last 93 seconds for customer scope prod30");
```

Vous pouvez le remplacer par :

```java
logger.info("Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30");
```

Lorsque le parser key/value est activé, chaque paire est extraite du document JSON :

```json
{
  "message": "Emitted quantity=1001 messages during the last durationInMs=93180 ms for customer scope=prod30",
  "scope": "prod30",
  "durationInMs": 93180,
  "quantity": 1001
}
```

Ainsi, vous pouvez exploiter *scope* comme un champ, et *durationInMs* et *quantity* comme mesures de journal.

### MDC {#mdc}

Une autre option pour enrichir vos journaux est d'utiliser les [Mapped Diagnostic Contexts (MDC)][2] de Java.

Si vous utilisez SLF4J, exécutez le code Java suivant :

```java
...
MDC.put("scope", "prod30");
logger.info("Emitted 1001 messages during the last 93 seconds");
...
```

Pour générer ce document JSON :

```json
{
  "message": "Emitted 1001 messages during the last 93 seconds",
  "scope": "prod30"
}
```

**Remarque** : Les MDC n'acceptent que des types de chaîne, donc ne les utilisez pas pour des métriques de valeurs numériques.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/glossary/#tail
[2]: http://logback.qos.ch/manual/mdc.html
[3]: /fr/logs/log_configuration/parsing
[4]: /fr/tracing/other_telemetry/connect_logs_and_traces/java/
[5]: /fr/agent/logs/?tab=tailfiles#activate-log-collection
[6]: /fr/agent/logs/?tab=tailfiles#custom-log-collection
[7]: /fr/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[8]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[9]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /fr/logs/log_configuration/parsing/?tab=matchers
[11]: /fr/logs/explorer/#overview
[12]: /fr/agent/?tab=Host-based
[13]: https://github.com/logstash/logstash-logback-encoder
[14]: /fr/logs/log_configuration/parsing/#key-value-or-logfmt