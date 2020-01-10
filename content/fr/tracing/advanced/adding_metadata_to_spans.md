---
title: Ajouter des tags de span
kind: documentation
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: Enrichir vos traces
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tags: Enrichir vos traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tags: Enrichir vos traces
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
---
Ajoutez des [tags][1] sous la forme de paires clé/valeur à une span pour corréler les traces avec d'autres produits Datadog et ainsi obtenir plus de détails sur des spans spécifiques. Les tags peuvent être ajoutés à [une seule span](#ajout-de-tags-à-une-span) ou à [l'ensemble des spans](#ajouter-des-tags-a-l-ensemble-des-spans).

**Remarque **: les métadonnées de tracing sont ajoutées via des tags, mais les tags ont déjà une signification spécifique dans [Datadog][2].

## Ajouter des tags à une span

{{< tabs >}}
{{% tab "Java" %}}

L'IU Datadog utilise des [tags][2] pour définir des métadonnées au niveau des [spans][2]. La liste complète de ces tags est disponible dans les API de [Datadog][3] et [OpenTracing][4].

Vous pouvez définir une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global et en définissant un tag avec `setTag`.

```java
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet
class ServletImpl extends AbstractHttpServlet {
  @Override
  void doGet(HttpServletRequest req, HttpServletResponse resp) {
    final Span span = GlobalTracer.get().activeSpan();
    if (span != null) {
      span.setTag("customer.id", req.getParameter("customer_id"));
      span.setTag("<CLÉ_TAG>", "<VALEUR_TAG>");
    }
    // mise en œuvre de servlet
  }
}
```

[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[4]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
{{% /tab %}}
{{% tab "Python" %}}

Ajoutez directement des [tags][1] à une [span][2] en appelant `set_tag`. Par exemple, avec le gestionnaire de routage suivant :

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
    span.set_tag('<CLÉ_TAG>', '<VALEUR_TAG>')
```

La span actuelle peut être récupérée à partir du contexte afin d'appliquer ses tags. Ainsi, si une span a été initiée par l'instrumentation, vous pouvez la récupérer et ajouter des tags personnalisés. **Remarque** : si une span n'existe pas, `None` est renvoyé :

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
@tracer.wrap()
def handle_customer(customer_id):
  # récupère la span active dans le contexte, placée ici par tracer.wrap()
  current_span = tracer.current_span()
  if current_span:
    current_span.set_tag('customer.id', customer_id)
    current_span.set_tag('<CLÉ_TAG>', '<VALEUR_TAG>')
```


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Ruby" %}}

Ajoutez directement des [tags][1] aux objets `Datadog::Span` en appelant `#set_tag` :

```ruby
# Un exemple d'endpoint Sinatra,
# avec le tracing Datadog autour de la requête.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<CLÉ_TAG>', '<VALEUR_TAG>')
  end
end
```

Accédez à la [span][2] actuellement active au sein de votre code à l'aide de la méthode de votre choix. **Remarque** : si la méthode est appelée et qu'aucune span n'est actuellement active, `active_span` est `nil`.

```ruby
# exemple : ajouter un tag à une span active

current_span = Datadog.tracer.active_span
current_span.set_tag('<CLÉ_TAG>', '<VALEUR_TAG>') unless current_span.nil?
```


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Go" %}}

Ajoutez directement des [tags][1] à une interface `Span` en appelant `SetTag` :

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set tag
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<CLÉ_VALUE>", "<VALEUR_TAG>")
}

func main() {
    tracer.Start(tracer.WithServiceName("<NOM_SERVICE>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Les intégrations de Datadog utilisent le type `Context` pour propager la [span][2] active.
Si vous souhaitez ajouter des tags à une span associée à un `Context`, appelez la fonction `SpanFromContext` :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Récupérer une span pour une requête Web associée à un contexte Go.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Définir un tag
        span.SetTag("http.url", r.URL.Path)
    }
}
```


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}


Ajoutez directement des [tags][1] aux objets span en appelant `setTag` ou `addTags` :

```javascript
// Un exemple d'endpoint Express,
// avec un tracing Datadog autour de la requête.
app.get('/posts', (req, res) => {
  const span = tracer.startSpan('web.request')

  span.setTag('http.url', req.url)
  span.addTags({'http.method': req.method})
  span.addTags({'<CLÉ_TAG>': '<VALEUR_TAG>'})
})
```

Accédez à la [span][2] actuellement active au sein de votre code à l'aide de la méthode de votre choix. **Attention** : si la méthode est appelée et qu'aucune span n'est actuellement active, `tracer.scope().active()` renvoie `null`.

```javascript
// exemple d'ajout de tag à une span active

const span = tracer.scope().active()

span.setTag('<CLÉ_TAG>', '<VALEUR_TAG>')
```


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab ".NET" %}}

Ajoutez directement des [tags][1] à un objet `Datadog.Trace.Span` en appelant `Span.SetTag()`. Par exemple :

```csharp
using Datadog.Trace;

// accéder au contexte actif par l'intermédiaire du traceur global (peut renvoyer null)
var scope = Tracer.Instance.ActiveScope;

// ajouter un tag à la span
scope.Span.SetTag("<CLÉ_TAG>", "<VALEUR_TAG>");
```

**Remarque** : `Datadog.Trace.Tracer.Instance.ActiveScope` renvoie`null` si aucune [span][2] n'est active.


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "PHP" %}}


Ajoutez directement des [tags][1] à un objet `DDTrace\Span` en appelant `Span::setTag()`. Par exemple :

```php
<?php
  // Récupérer la span actuellement active (peut être null)
  $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
  if (null !== $span) {
    // Ajouter un tag à la span
    $span->setTag('<CLÉ_TAG>', '<VALEUR_TAG>');
  }
?>
```

**Remarque** : `Tracer::getActiveSpan()` renvoie `null` si aucune [span][2] n'est active.



[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{< /tabs >}}

## Ajouter des tags à l'ensemble des spans

{{< tabs >}}
{{% tab "Java" %}}

Ajoutez des [tags][1] à l'ensemble des [spans][2] en configurant le traceur à l'aide de la propriété système `dd.trace.global.tags` :

```bash
java -javaagent:<CHEMIN-AGENT-JAVA-DD>.jar \
     -dd.trace.global.tags='env:dev,<CLÉ_TAG>:<VALEUR_TAG>' \
     -jar <CHEMIN_VOTRE_APPLICATION>.jar
```
[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Python" %}}

Ajoutez des [tags][1] à l'ensemble des [spans] en configurant le traceur à l'aide de la méthode `tracer.set_tags` :

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'dev' })
```


[1]: /fr/tracing/visualization/#span-tags
{{% /tab %}}
{{% tab "Ruby" %}}

Ajoutez des [tags][1] à l'ensemble des [spans][2] en configurant l'option `tags` du traceur :

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'dev' }
end
```

Consultez la [documentation relative à l'API][3] pour en savoir plus.


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

Ajoutez des [tags][1] à l'ensemble des [spans][2] en configurant l'option `tags` du traceur :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

Ajoutez des [tags][1] à l'ensemble des [spans][2] en configurant le paramètre `tags` du traceur :

```js
const tracer = require('dd-trace').init({
  tags: {
    env: 'dev',
    '<CLÉ_TAG>': '<VALEUR_TAG>'
  }
})
```

[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.

[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

Utilisez la variable d'environnement `DD_TRACE_GLOBAL_TAGS` pour ajouter des [tags][1] à l'ensemble des [spans][2] générées. Consultez la section [Configuration PHP][3]
pour découvrir comment définir des variables d'environnements.

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/setup/php/#configuration
{{% /tab %}}
{{% tab "C++" %}}

Ajoutez directement des [tags][1] à un objet [span][2] en appelant `Span::SetTag`. Par exemple :

```cpp
auto tracer = ...
auto span = tracer->StartSpan("nom_opération");
span->SetTag("la clé doit être une chaîne de caractères", "Les valeurs sont des types de variables");
span->SetTag("la clé doit être une chaîne de caractères", 1234);
```

Les valeurs correspondent au [type de variable][3] et peuvent être des objets complexes. Les valeurs sont sérialisées en tant que JSON, à l'exception d'une valeur de chaîne de caractères qui est sérialisée telle quelle (sans guillemets supplémentaires).


[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tagging