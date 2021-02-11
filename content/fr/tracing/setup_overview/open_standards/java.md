---
title: Standards ouverts Java
kind: documentation
description: 'Standards ouverts pour Java'
code_lang: java
type: multi-code-lang
code_lang_weight: 0

---

## OpenTracing

Datadog prend parfaitement en charge l'[API OpenTracing][1].

### Configuration

Pour Maven, ajoutez ce qui suit à `pom.xml` :
```xml
<!-- API OpenTracing -->
<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-api</artifactId>
    <version>0.32.0</version>
</dependency>

<dependency>
    <groupId>io.opentracing</groupId>
    <artifactId>opentracing-util</artifactId>
    <version>0.32.0</version>
</dependency>

<!-- API Datadog  -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>

<!-- Pont Datadog OpenTracing (requis uniquement si vous n'utilisez pas dd-java-agent pour l'instrumentation automatique) -->
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-ot</artifactId>
    <version>${dd-trace-java.version}</version>
</dependency>
```

Pour Gradle, ajoutez :

```text
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.32.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.32.0"
compile group: 'com.datadoghq', name: 'dd-trace-api', version: "${dd-trace-java.version}"
// Pont Datadog OpenTracing (requis uniquement si vous n'utilisez pas dd-java-agent pour l'instrumentation automatique)
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configurez votre application à l'aide de variables d'environnement ou de propriétés système, tel qu'indiqué dans la section relative à la configuration.

Si vous n'utilisez pas l'instrumentation automatique, vous devez enregistrer un traceur configuré avec `GlobalTracer`. Pour ce faire, appelez `GlobalTracer.register(DDTracer.builder().build())` au début du démarrage de votre application (p. ex., avec la méthode main).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {
    public static void main(String[] args) {
        DDTracer tracer = DDTracer.builder().build();
        GlobalTracer.register(tracer);
        // Enregistrer ce traceur avec l'API Datadog
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);
    }
}
```

Outre les variables d'environnement et les propriétés système, il existe d'autres options de configuration dans l'interface `DDTracer.Builder`. Consultez la [documentation Java][2] pour découvrir toutes les options disponibles.

**Remarque :** n'ajoutez jamais `dd-java-agent` à votre classpath. Cela peut entraîner un comportement inattendu.

### Traces asynchrones

Une trace est dite asynchrone lorsqu'une span est initiée dans un thread et se termine dans un autre. Pour instrumenter ce comportement, il convient d'utiliser un nouveau contexte dans chaque thread au sein duquel la span est active.
```java
// 1re étape : commencer le contexte et la span sur le thread d'envoi des travaux
final Tracer tracer = GlobalTracer.get();
final Span span = tracer.buildSpan("ServicehandlerSpan").start();

try (final Scope scope = tracer.activateSpan(span)) {
    // Implémentation du thread d'envoi…

    submitAsyncTask(new Runnable() {
        @Override
        public void run() {
            // 2e étape : réactiver la span dans le thread de travail
            try (final Scope scope = tracer.activateSpan(span)) {
              // worker thread impl
            } finally {
              // 3e étape : conclure la span une fois le travail terminé
              span.finish();
            }
       }
    });
}
```

### Injecter et extraire du contexte pour le tracing distribué

Créez une trace distribuée avec une instrumentation manuelle à l'aide d'Opentracing :

```java
// 1re étape : injecter les en-têtes Datadog dans le code du client
Span span = tracer.buildSpan("httpClientSpan").start();
try (Scope scope = tracer.activate(span)) {
    HttpRequest request = /* insérer votre code ici */;

    tracer.inject(span.context(),
                  Format.Builtin.HTTP_HEADERS,
                  new MyHttpHeadersInjectAdapter(request));

    // Implémentation de la requête HTTP...
} finally {
    span.finish();
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
        throw new UnsupportedOperationException("Cette classe doit être utilisée uniquement avec tracer#inject().");
    }
}

// 2e étape : extraire les en-têtes Datadog dans le code du serveur
HttpRequest request = /* insérer votre code ici */;

final SpanContext extractedContext =
  GlobalTracer.get().extract(Format.Builtin.HTTP_HEADERS,
                             new MyHttpRequestExtractAdapter(request));

// est un enfant de la span client HTTP de l'étape 1
Span span = tracer.buildSpan("httpServerSpan").asChildOf(extractedContext).start();
try (Scope scope = tracer.activateSpan(span)) {
    // implémentation du serveur HTTP...
} finally {
    span.finish();
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
        throw new UnsupportedOperationException("Cette classe doit être utilisée uniquement avec Tracer.extract().");
    }
}
```

Veuillez noter que les exemples ci-dessus utilisent uniquement les classes OpenTracing. Consultez l'[API OpenTracing][1] pour en savoir plus.


[1]: https://github.com/opentracing/opentracing-java
[2]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-ot/src/main/java/datadog/opentracing/DDTracer.java
