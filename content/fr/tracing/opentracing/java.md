---
title: OpenTracing Java
kind: documentation
description: Appliquez la norme OpenTracing au traceur de l'APM Java de Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Utilisez l'[API Opentracing][1] et la bibliothèque de traceur Datadog (dd-trace-ot) pour mesurer les délais d'exécution de certains éléments de code. Vous pouvez ainsi [tracer][2] votre application plus précisément qu'avec l'Agent Java.

## Configuration

Pour Maven, ajoutez ce qui suit à `pom.xml` :

```xml
<!-- API OpenTracing -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Utilitaire OpenTracing -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.31.0</version>
</dependency>

<!-- Traceur Datadog (requis uniquement si vous n'utilisez pas dd-java-agent) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

Pour Gradle, ajoutez :

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configurez votre application à l'aide de variables d'environnement ou de propriétés système, tel qu'indiqué dans la section [Configuration][3].

## Instrumentation manuelle

Utilisez plusieurs de ces solutions si l'instrumentation automatique ne vous fournit pas assez de profondeur ou de détails.

Avec try/finally :

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        /*
         * 1. Configurez votre application à l'aide de variables d'environnement ou de propriétés système
         * 2. À l'aide de dd-java-agent (-javaagent:/chemin/vers/dd-java-agent.jar),
         *    GlobalTracer est automatiquement instancié.
         */
        Tracer tracer = GlobalTracer.get();

        Scope scope = tracer.buildSpan("<NOM_OPÉRATION>").startActive(true);
        try {
            scope.span().setTag(DDTags.NOM_SERVICE, "<NOM_SERVICE>");

            // Le code que vous tracez
            Thread.sleep(1000);

        // Si vous n'appelez pas close(), les données de la span ne seront PAS transmises à Datadog !
        } finally {
            scope.close();
        }
    }
}
```

Vous pouvez également ajouter la déclaration `try-with-resources` autour du code à [tracer][2] :

```java
import datadog.trace.api.DDTags;

import io.opentracing.Scope;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class InstrumentedClass {

    void method0() {
        Tracer tracer = GlobalTracer.get();

        try (Scope scope = tracer.buildSpan("<NOM_OPÉRATION>").startActive(true)) {
            scope.span().setTag(DDTags.NOM_SERVICE, "<NOM_SERVICE>");
            Thread.sleep(1000);
        }
    }
}
```

Dans ce cas, vous n'avez pas besoin d'appeler `scope.close()`.

Si vous n'utilisez pas `dd-java-agent.jar`, vous devez enregistrer un traceur configuré avec `GlobalTracer`. Pour ce faire, appelez `GlobalTracer.register(DDTracer.builder().build())` au début de votre démarrage d'application (p. ex., méthode principale).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import datadog.trace.common.writer.DDAgentWriter;

public class Application {

    public static void main(String[] args) {

        // Initialiser le traceur depuis des variables d'environnement ou des propriétés système
        DDTracer tracer = DDTracer.builder().build();
        GlobalTracer.register(tracer);
        // Enregistrer ce traceur avec l'API Datadog
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // OU initialiser manuellement depuis l'API builder
        DDTracer tracer = DDTracer.builder()
          .writer(DDAgentWriter.builder().build())
          .serviceName("Nom du service")
          .build()
        GlobalTracer.register(tracer);
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // ...
    }
}
```

## Traces asynchrones

Créez des [traces][2] asynchrones avec une instrumentation manuelle à l'aide de l'API OpenTracing.

```java
// 1re étape : commencer le Scope/Span sur le thread d'envoi des travaux
try (Scope scope = tracer.buildSpan("ServiceHandlerSpan").startActive(false)) {
    final Span span = scope.span();
    doAsyncWork(new Runnable() {
        @Override
        public void run() {
            // 2e étape : réactiver la span dans le thread de travail
            try (Scope scope = tracer.scopeManager().activate(span, false)) {
              // implémentation du thread de travail…
            }
        }
    });
    // implémentation du thread d'envoi…
}
```

## Tracing distribué

Créez une trace distribuée avec une instrumentation manuelle à l'aide d'Opentracing :

```java
// 1re étape : injecter les en-têtes Datadog dans le code du client
try (Scope scope = tracer.buildSpan("httpClientSpan").startActive(true)) {
    final Span span = scope.span();
    HttpRequest request = /* insérer votre code ici */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // implémentation de la requête HTTP…
}

public static class MyHttpHeadersInjectAdapter implements TextMap {
  private final HttpRequest httpRequest;

  public HttpHeadersInjectAdapter(final HttpRequest httpRequest) {
    this.httpRequest = httpRequest;
  }

  @Override
  public void put(final String key, final String value) {
    httpRequest.addHeader(key, value);
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    throw new UnsupportedOperationException("Cette classe doit être utilisée uniquement avec tracer#inject()");
  }
}

// 2e étape : extraire les en-têtes Datadog dans le code du serveur
HttpRequest request = /* insérer votre code ici */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

try (Scope scope = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).startActive(true)) {
    final Span span = scope.span(); // est un enfant de la span client HTTP de l'étape 1
    // implémentation du serveur HTTP…
}

public class MyHttpRequestExtractAdapter implements TextMap {
  private final HttpRequest request;

  public HttpRequestExtractAdapter(final HttpRequest request) {
    this.request = request;
  }

  @Override
  public Iterator<Map.Entry<String, String>> iterator() {
    return request.headers().iterator();
  }

  @Override
  public void put(final String key, final String value) {
    throw new UnsupportedOperationException("Cette classe doit être utilisée uniquement avec Tracer.extract()!");
  }
}
```

Veuillez noter que les exemples ci-dessus utilisent uniquement les classes OpenTracing. Consultez l'[API OpenTracing][1] pour en savoir plus.

## Définir des erreurs

Pour personnaliser une erreur associée à l'une ou plusieurs de vos spans, importez les bibliothèques `io.opentracing.Span`, `io.opentracing.tag.Tags` et `io.opentracing.util.GlobalTracer` dans la méthode à l'origine de l'erreur :

```java
import io.opentracing.Span;
import io.opentracing.tag.Tags;
import io.opentracing.util.GlobalTracer;
```

Ensuite, définissez l'erreur sur `true` et ajoutez _au minimum_ les tags `error.msg`, `error.type` et `error.stack` à votre span.

```java
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      Tags.ERROR.set(span, true);
      span.log(Collections.singletonMap(Fields.ERROR_OBJECT, ex));
    }
```

**Remarque** : les métadonnées pertinentes de l'erreur, décrites dans la [documentation sur la Vue Trace][4], peuvent également être ajoutées.
Si la span actuelle n'est pas une span racine, marquez-la comme erreur en faisant appel à la bibliothèque `dd-trace-api` pour récupérer la span racine avec `MutableSpan`, puis en utilisant `setError(true)`. Consultez le [code source][5] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/opentracing/opentracing-java
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/setup/java/#configuration
[4]: /fr/tracing/visualization/trace/?tab=spantags#more-information
[5]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/interceptor/MutableSpan.java#L51