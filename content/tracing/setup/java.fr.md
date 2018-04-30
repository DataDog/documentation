---
title: Tracer des application Java
kind: Documentation
aliases:
  - /fr/tracing/java
  - /fr/tracing/languages/java
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-java'
    tag: Github
    text: Code source
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorez vos services, vos ressources et vos traces'
---
## Compatibilité

Nous supportons officiellement Java JRE 1.7 et plus d'Oracle JDK et OpenJDK. D'autres langages compatibles avec la JVM (Scala, Groovy, Kotlin, etc.) devraient fonctionner, mais il pourrait manquer l'instrumentation nécessaire pour être utile. Pour voir quels frameworks web, bibliothèques et datastores nous supportons, consultez la section [Intégrations](#integrations).

Pour améliorer la visibilité des applications utilisant des frameworks non pris en charge, envisagez:

* Ajout d'une instrumentation personnalisée (avec OpenTracing ou l'annotation `@ Trace`).
* [Soumettre une pull request][1] avec l'instrumentation à inclure dans une future version.
* [Contacter le support][2] et soumettre une demande de fonctionnalité.

## Installation et démarrage

Pour commencer à tracer les applications écrites en Ruby, commencez par [installer et configurer Datadog Agent][3] (consultez la documentation supplémentaire pour [le traçage des applications Docker](/tracing/setup/docker/)).

Ensuite, téléchargez `dd-java-agent.jar` qui contient les fichiers de classe de l'Agent:

```shell
wget -O dd-java-agent.jar 'https://search.maven.org/remote_content?g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Enfin, ajoutez l'argument JVM suivant lors du démarrage de votre application dans votre IDE, votre script d'application Maven ou Gradle, ou votre commande `java -jar`:

```
-javaagent:/path/to/the/dd-java-agent.jar
```

## Configuration

Le traceur est configuré en utilisant les propriétés système et les variables d'environnement comme suit:

| Config             | System Property       | Environment Variable      |  Default           | Description |
|:------------------ |:--------------------- |:------------------------- |:------------------ |:----- |
| service.name       | dd.service.name       | DD_SERVICE_NAME           | `unnamed-java-app` | Le nom d'un ensemble de processus qui font le même travail. Utilisé pour regrouper les statistiques pour votre application.|
| writer.type        | dd.writer.type        | DD_WRITER_TYPE            | `DDAgentWriter`    | La valeur par défaut envoie des traces à l'Agent. La configuration avec `LoggingWriter` écrit à la place des traces dans console. |
| agent.host         | dd.agent.host         | DD_AGENT_HOST             | `localhost`        | Nom d'host auquel vous voulez envoyer des traces. Si vous utilisez un environnement conteneurisé, configurez-le comme l'host IP. Consultez notre [documentation docker][4] pour plus de détails. |
| agent.port         | dd.agent.port         | DD_AGENT_PORT             | `8126`             | Numéro de port sur lequel l'Agent écoute pour l'host. |
| priority.sampling  | dd.priority.sampling  | DD_PRIORITY_SAMPLING      | `false`            | Activez l'échantillonnage prioritaire pour vous assurer que les traces distribuées sont complètes ou pour exiger l'échantillonnage de traces spécifiques. Voir la section [Echantillonnage / traçage distribué](#sampling-distributed-tracing) pour plus de détails. |
| trace.span.tags  | dd.trace.span.tags  | DD_TRACE_SPAN_TAGS      | `null`            | (Exemple: `key1:value1,key2:value2`) liste des tags par défaut à ajouter à chaque span. Les tags du même nom ajoutées directement à une span remplaceront les valeurs par défaut fournies ici. |

**Note**:

* Si le même type de clé est défini pour les deux, la configuration de la propriété système est prioritaire.
* Les propriétés du système peuvent être utilisées comme paramètres JVM.

## Instrumentation manuelle

Avant d'instrumentaliser votre application, consultez la [Terminologie APM][5] de Datadog et familiarisez-vous avec les concepts de base de Datadog APM. Si vous n'utilisez pas une [instrumentation de framework prise en charge](#integrations), ou si vous souhaitez une profondeur supplémentaire pour les traces de votre application, instrumentaliser manuellement votre code.

Pour ce faire, utilisez l'annotation [Trace](#trace-annotation) pour le traçage simple des appels de méthode ou avec [API OpenTracing](#opentracing-api) pour un traçage plus complexe.

### Annotation de trace

Ajoutez la dépendance `dd-trace-api` à votre projet. Pour Maven, ajoutez ceci à `pom.xml`

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>{version}</version>
</dependency>
```

Pour Gradle, ajoutez:

```gradle
compile group: 'com.datadoghq', name: 'dd-trace-api', version: {version}
```

Maintenant, ajoutez `@Trace` à vos méthodes pour qu'elles soient tracées lors de l'exécution avec` dd-java-agent.jar`. Si l'Agent n'est pas attaché, cette annotation n'aura aucun effet sur votre application.

### API OpenTracing

Utilisez l'API [OpenTracing API][6] et la bibliothèque Datadog Tracer (dd-trace-ot) pour mesurer les temps d'exécution de certaines parties du code. Cela vous permet de tracer votre application plus précisément qu'avec l'agent Java seul.

#### Implémentation

Pour Maven, ajoutez ceci à `pom.xml`:

```xml
<!-- OpenTracing API -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- OpenTracing Util -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Datadog Tracer (only needed if you do not use dd-java-agent) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

Pour Gradle, ajoutez:

```
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configurez votre application à l'aide de variables d'environnement ou de propriétés système, comme indiqué dans la section [configuration](#configuration).

#### Exemples d'instrumentation personnalisées

Utilisez une combinaison de ces éléments si l'instrumentation automatique ne vous fournit pas assez de profondeur ou de détails.

En utilisant try-finally:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        /*
         * 1. Configure your application using environment variables or system properties
         * 2. Using dd-java-agent (-javaagent:/path/to/dd-java-agent.jar),
         *    GlobalTracer is automatically instantiated.
         */
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("operation-name").startActive(true);
        try {
            scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");

            // The code you're tracing
            Thread.sleep(1000);

        // If you don't call close(), the span data will NOT make it to Datadog!
        } finally {
            scope.close();
        }
    }
}
```

Vous pouvez également envelopper le code que vous souhaitez tracer dans une instruction `try-with-resources`:

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        Tracer tracer = GlobalTracer.get();

        try (Scope scope = tracer.buildSpan("operation-name").startActive(true)) {
            scope.span().setTag(DDTags.SERVICE_NAME, "my-new-service");
            Thread.sleep(1000);
        }
    }
}
```

Dans ce cas, vous n'avez pas besoin d'appeler `scope.close ()`.

Si vous n'utilisez pas `dd-trace-java.jar`, vous devez enregistrer un traceur configuré avec` GlobalTracer`. Cela peut être facilement fait en appelant `GlobalTracer.register (new DDTracer ())` tôt dans le démarrage de votre application (méthode principale).

```java
import datadog.opentracing.DDTracer;
import datadog.trace.api.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {

    public static void main(String[] args) {

        // Initialize the tracer from environment variables or system properties
        Tracer tracer = new DDTracer();
        GlobalTracer.register(tracer);

        // OR from the API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        Tracer tracer = new DDTracer(writer, sampler);
        GlobalTracer.register(tracer);

        // ...
    }
}
```

Notez que les exemples ci-dessus utilisent uniquement les classes OpenTracing. Reportez-vous à [API OpenTracing][6] pour plus de détails et d'informations.

## Sampling / Distributed Tracing

Activez l'échantillonnage prioritaire pour vous assurer que les traces distribuées sont complètes. L'échantillonnage prioritaire affecte et propage automatiquement une valeur prioritaire sur toutes les traces, en fonction de leur service et de leur volume. Les priorités peuvent également être définies manuellement pour supprimer des traces non intéressantes ou pour conserver celles qui sont importantes.

L'échantillonnage prioritaire est désactivé par défaut. Pour l'activer, configurez l'indicateur `priority.sampling` sur` true` ([voir comment configurer le client ci-dessus](#configuration)).

Valeurs prioritaires actuelles (d'autres peuvent être ajoutées à l'avenir):

|Valeur d'échantillonnage | Effet                                                                                                     |
|---------------|:----------------------------------------------------------------------------------------------------------|
|SAMPLER_DROP   | L'échantillonneur a automatiquement décidé de ne pas garder la trace. L'agent va la supprimer.                           |
|SAMPLER_KEEP   | L'échantillonneur a automatiquement décidé de garder la trace. L'agent la gardera. Cependant elle peut être échantillonnée côté serveur. |
|USER_DROP      | L'utilisateur a demandé de ne pas garder la trace. L'agent va la supprimer.                                              |
|USER_KEEP      | L'utilisateur a demandé de garder la trace. L'agent la gardera. Le serveur la gardera aussi.                     |

Définir manuellement la priorité de trace:
```java
import datadog.opentracing.DDSpan;
import datadog.trace.api.Trace;
import datadog.trace.common.sampling.PrioritySampling;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // grab the active span out of the traced method
        DDSpan ddspan = (DDSpan) GlobalTracer.get().activeSpan();
        // ask the sampler to keep the current trace
        ddspan.setSamplingPriority(PrioritySampling.USER_KEEP);
        // method impl follows
    }
}
```

## Débogage

Pour renvoyer les journaux d'application de niveau debug, activez le mode de debug avec le flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel = debug` lors du démarrage de la JVM.

## Métriques JMX

[L'intégration JMX][7]  de Datadog monitore des métriques supplémentaires autour de la heap memory de la JVM, le nombre de threads et le garbage collection. Utilisez-le conjointement avec APM pour une vision encore plus large des performances de votre application Java.

## Intégrations

### Frameworks Web 

`dd-java-agent` inclut le support pour le tracing automatique des frameworks web suivants:

| Server | Versions |
|:------------- |:-------------|
| Java Servlet Compatible | 2.3+, 3.0+ |
| Jax-RS Annotations | JSR311-API |
| Spring-Web | 4.0+ |

*Note:* De nombreux serveurs d'applications sont compatibles avec Servlet, tels que Tomcat, Jetty, Websphere, Weblogic, etc.
En outre, les frameworks tels que Spring Boot et Dropwizard fonctionnent de manière inhérente car ils utilisent un serveur d'applications intégré compatible Servlet.

Vous ne voyez pas votre framework web? Nous ajoutons continuellement des frameworks supportés, [vérifiez auprès de notre équipe][2] pour voir si nous pouvons vous aider.

### Frameworks réseaux

`dd-java-agent` inclut le support pour le tracing automatique des frameworks réseau suivants:

| Framework      | Versions           |
|:-------------|:-------------|
| [OkHTTP][8] | 3.x |
| [Apache HTTP Client][9] | 4.3 + |
| [JMS 2][10] | 2.x |
| AWS Java SDK | 1.11.0+ |
| Kafka-Clients | 0.11+ |
| Kafka-Streams | 0.11+ |

Vous ne voyez pas votre framework réseau? Nous ajoutons continuellement des frameworks supportés, [vérifiez auprès de notre équipe][2] pour voir si nous pouvons vous aider.

### Datastores

`dd-java-agent` inclut le support pour le tracing automatique des frameworks/drivers de base de données suivants.

| Base de données      | Versions           |
|:-------------|:-------------|
| JDBC | 4.x |
| [MongoDB][11] | 3.x |
| [Cassandra][12] | 3.2.x |
| Jedis | 1.4.0+ |

`dd-java-agent` est également compatible avec les pilotes JDBC courants, notamment:

*  Apache Derby
*  Firebird SQL
*  H2 Database Engine
*  HSQLDB
*  IBM DB2
*  MSSQL (Microsoft SQL Server)
*  MySQL
*  MariaDB
*  Oracle
*  Postgres SQL

Vous ne voyez pas votre datastores? Nous ajoutons continuellement des frameworks supportés, [vérifiez auprès de notre équipe][2] pour voir si nous pouvons vous aider.

### Instrumentation Beta

`dd-java-agent` Livré avec des instrumentations plus récentes désactivées par défaut.

| Instrumentation      | Versions           | Argument JVM à activer |
|:-------------|:-------------|:-------------|
| Jax RS Client | 1.11.0+ | -Ddd.integration.jax-rs.enabled=true |

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/documentation#outside-contributors
[2]: /help
[3]: https://docs.datadoghq.com/tracing/setup
[4]: https://docs.datadoghq.com/tracing/setup/docker/
[5]: /tracing/visualization/services_list/
[6]: https://github.com/opentracing/opentracing-java
[7]: https://docs.datadoghq.com/integrations/java/
[8]: https://github.com/opentracing-contrib/java-okhttp
[9]: https://github.com/opentracing-contrib/java-apache-httpclient
[10]: https://github.com/opentracing-contrib/java-jms
[11]: https://github.com/opentracing-contrib/java-mongo-driver
[12]: https://github.com/opentracing-contrib/java-cassandra-driver