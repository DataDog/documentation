---
title: OpenTracing
kind: documentation
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: Enrichir vos traces
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tags: Enrichir vos Traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
---
OpenTracing est une norme interlangage indépendante de tout fournisseur pour les applications de tracing. Datadog propose des implémentations OpenTracing pour de nombreux traceurs d'APM. Pour en savoir plus, visitez le site [opentracing.io][1].

{{< tabs >}}
{{% tab "Java" %}}

Utilisez l'[API Opentracing][1] et la bibliothèque de traceur Datadog (dd-trace-ot) pour mesurer les délais d'exécution de certains éléments de code. Vous pouvez ainsi [tracer][2] votre application plus précisément qu'avec l'Agent Java.

#### Implémentation

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

```
compile group: 'io.opentracing', name: 'opentracing-api', version: "0.31.0"
compile group: 'io.opentracing', name: 'opentracing-util', version: "0.31.0"
compile group: 'com.datadoghq', name: 'dd-trace-ot', version: "${dd-trace-java.version}"
```

Configurez votre application à l'aide de variables d'environnement ou de propriétés système, tel qu'indiqué dans la section [Configuration][3].

#### Instrumentation manuelle avec OpenTracing

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

Si vous n'utilisez pas `dd-java-agent.jar`, vous devez enregistrer un traceur configuré avec `GlobalTracer`. Pour ce faire, appelez `GlobalTracer.register(new DDTracer())` au début de votre démarrage d'application (p. ex., méthode principale).

```java
import datadog.opentracing.DDTracer;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;
import datadog.trace.common.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

//Pour l'exemple d'API
import datadog.trace.common.writer.Writer;
import datadog.trace.common.sampling.Sampler;

public class Application {

    public static void main(String[] args) {

        // Initialisez le traceur avec des variables d'environnement ou des propriétés système
        DDTracer tracer = new DDTracer();
        GlobalTracer.register(tracer);
        // enregistrez le même traceur avec l'API Datadog
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // OU depuis l'API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        String service = "Service Name";
        Tracer tracer = new DDTracer(service,writer, sampler);
        GlobalTracer.register(tracer);

        // ...
    }
}
```

#### Instrumentation manuelle pour des traces asynchrones

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


#### Créer une trace distribuée avec une instrumentation manuelle à l'aide d'Opentracing

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

[1]: https://github.com/opentracing/opentracing-java
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/setup/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

La prise en charge d'Opentracing dans le traceur Python est actuellement disponible en version bêta.

**Configuration** :

La prise en charge d'OpenTracing est incluse dans le paquet `ddtrace`. Utilisez `pip` pour installer le paquet `opentracing` requis :

```sh
$ pip install ddtrace[opentracing]
```

**Utilisation** :

Pour initialiser un traceur, OpenTracing définit une méthode d'initialisation qui configure et instancie un nouveau traceur et remplace la référence `opentracing.tracer` globale :

```python
import time
import opentracing
from ddtrace.opentracer import Tracer, set_global_tracer

def init_tracer(service_name):
    config = {
      'agent_hostname': 'localhost',
      'agent_port': 8126,
    }
    tracer = Tracer(service_name, config=config)
    set_global_tracer(tracer)
    return tracer

def my_operation():
  span = opentracing.tracer.start_span('<NOM_OPÉRATION>')
  span.set_tag('<TAG_KEY>', '<TAG_VALUE>')
  time.sleep(0.05)
  span.finish()

init_tracer('<NOM_SERVICE>')
my_operation()
```

Pour consulter des informations sur une configuration et une utilisation plus avancées, consultez [la documentation relative à l'API OpenTracing Python de Datadog][1] et le [référentiel OpenTracing Python][2].


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#opentracing
[2]: https://github.com/opentracing/opentracing-python
{{% /tab %}}
{{% tab "Ruby" %}}

Pour configurer Datadog avec OpenTracing, consultez la section [Prise en main d'OpenTracing][1] de Ruby pour obtenir plus de détails.

**Configurer les paramètres du traceur Datadog**

Le traceur Datadog sous-jacent peut être configuré en transmettant des options (qui correspondent à `Datadog::Tracer`) lors de la configuration du traceur global :

```ruby
# Lorsque `options` correspond à un hachage d'options fournies à Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

Il peut également être configuré en utilisant `Datadog.configure`, tel que décrit dans la section [Paramètres du traceur Ruby][2].

**Activer et configurer des intégrations**

Par défaut, la configuration d'OpenTracing avec Datadog n'active pas automatiquement d'instrumentation supplémentaire fournie par Datadog. Vous ne recevrez que des [spans][3] et des [traces][4] provenant de l'instrumentation OpenTracing disponible dans votre application.

Cependant, des instrumentations supplémentaires fournies par Datadog peuvent être activées aux côtés d'OpenTracing à l'aide de `Datadog.configure`, afin d'optimiser encore plus votre tracing. Pour ce faire, consultez la section [Instrumentation d'intégration Ruby][5] pour obtenir plus de détails.

**Formats de sérialisation pris en charge**

| Type                           | Prise en charge | Informations supplémentaires                                                                                                                                                                                                                                                                                        |
|--------------------------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `OpenTracing::FORMAT_TEXT_MAP` | Oui        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Oui        | En raison de la perte de résolution liée au format Rack, veuillez noter que les majuscules dans les noms d'éléments transmis lors de l'aller-retour doivent être remplacées par des minuscules, et le caractère `-` par le caractère  `_`. Datadog recommande d'éviter l'utilisation de ces caractères ou de prévoir une étape pour y remédier au niveau du destinataire. |
| `OpenTracing::FORMAT_BINARY`   | Non         |                                                                                                                                                                                                                                                                                                               |


[1]: /fr/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /fr/tracing/setup/ruby/#tracer-settings
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/#trace
[5]: /fr/tracing/setup/ruby/#integration-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

Importez le [paquet `opentracer`][1] pour exposer le traceur Datadog en tant que traceur compatible avec [OpenTracing][2].

**Exemple** :

Un exemple d'utilisation courante :

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Lancer le traceur normal et le renvoyer sous la forme d'une interface opentracing.Tracer. Vous
    // pouvez utiliser le même ensemble d'options que celui que vous utilisez habituellement avec le traceur Datadog.
    t := opentracer.New(tracer.WithServiceName("<NOM_SERVICE>"))

    // Arrêter le traceur à l'aide de l'appel Stop habituel pour le paquet du traceur.
    defer tracer.Stop()

    // Définir le traceur OpenTracing global.
    opentracing.SetGlobalTracer(t)

    // Utiliser comme d'habitude l'API OpenTracing.
}
```

**Remarque** : vous pouvez utiliser l'[API OpenTracing][3] conjointement avec l'API normale ou les intégrations Datadog. Elles se basent toutes sur le même traceur. Consultez la [documentation relative à l'API][1] pour obtenir davantage d'exemples et de détails.

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentracer
[2]: http://opentracing.io
[3]: https://github.com/opentracing/opentracing-go
{{% /tab %}}
{{% tab "Node.js" %}}
Cette bibliothèque respecte les normes OpenTracing. Utilisez l'[API OpenTracing][1] et la bibliothèque de traceur Datadog ([dd-trace][2]) pour mesurer les délais d'exécution de certains éléments de code. Dans l'exemple suivant, un traceur Datadog est initialisé et utilisé comme traceur global :


```javascript
// server.js

const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)

const app = require('./app.js')

// app.js

const tracer = opentracing.globalTracer()
```

Vous pouvez utiliser les tags suivants pour remplacer certaines options de Datadog :

* `service.name` : le nom de service à utiliser pour cette span. Si ce tag n'est pas fourni, le nom de service du traceur est utilisé.
* `resource.name` : le nom de ressource à utiliser pour cette span. Si ce tag n'est pas fourni, le nom d'opération est utilisé.
* `span.type` : le type de span à utiliser pour cette span. Si ce tag n'est pas fourni, le type est défini sur `custom`.

[1]: https://doc.esdoc.org/github.com/opentracing/opentracing-javascript
[2]: https://datadog.github.io/dd-trace-js
{{% /tab %}}
{{% tab ".NET" %}}

Pour prendre en charge OpenTracing, ajoutez le paquet NuGet [`Datadog.Trace.OpenTracing`][1] à votre application. Lors du démarrage de l'application, initialisez la bibliothèque OpenTracing :

```csharp
using Datadog.Trace.OpenTracing;

public void ConfigureServices(IServiceCollection services)
{
    // créer un iTracer OpenTracing avec les réglages par défaut
    OpenTracing.ITracer tracer = OpenTracingTracerFactory.CreateTracer();

    // pour utiliser le traceur avec l'injection de dépendance ASP.NET Core 
    services.AddSingleton<ITracer>(tracer);

    // pour utiliser le traceur avec OpenTracing.GlobalTracer.Instance Core
    GlobalTracer.Register(tracer);
}
```


[1]: https://www.nuget.org/packages/Datadog.Trace.OpenTracing
{{% /tab %}}
{{% tab "PHP" %}}

Le traceur PHP prend en charge OpenTracing via la [bibliothèque **opentracing/opentracing**][1], qui est installée avec Composer :

```bash
$ composer require opentracing/opentracing:1.0.0-beta5
```

Lorsque l'[instrumentation automatique][2] est activée, un traceur compatible avec OpenTracing est utilisé en tant que traceur global :

```php
<?php
  $otTracer = \OpenTracing\GlobalTracer::get();
  $span = $otTracer->startActiveSpan('web.request')->getSpan();
  $span->setTag('span.type', 'web');
  $span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
  // ...Utiliser OpenTracing comme prévu
?>
```


[1]: https://github.com/opentracing/opentracing-php
[2]: /fr/tracing/setup/php/#automatic-instrumentation
{{% /tab %}}
{{% tab "C++" %}}

Le traceur C++ de Datadog peut uniquement être utilisé via l'API OpenTracing. Les instructions d'utilisation de cette section décrivent toutes les fonctionnalités génériques d'OpenTracing.

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentracing.io