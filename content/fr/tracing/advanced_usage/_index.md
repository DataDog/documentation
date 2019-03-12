---
title: Instrumentation avancée avec des langages
kind: documentation
---
## Tagging personnalisé

Le tagging personnalisé vous permet d'ajouter des paires de tags au format clé-valeur à des spans spécifiques. Ces tags servent à corréler des traces avec d'autres produits Datadog, afin de fournir davantage de détails sur ces spans.

[En savoir plus sur le tagging][1]

{{< tabs >}}
{{% tab "Java" %}}
Les tags correspondent à des paires clé-valeur associées aux spans. Tous les tags possèdent le même espace de nommage.

L'UI Datadog utilise des tags spécifiques pour définir les propriétés de l'IU, telles que le nom de service d'une application. La liste complète de ces tags est disponible dans les API de [Datadog][1] et [OpenTracing][2].

**Tags personnalisés** :

Les tags personnalisés sont définis par l'intermédiaire de l'API OpenTracing.

Vous pouvez définir une instrumentation automatique pour les tags personnalisés en récupérant la span active à partir du traceur global.

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
    final Tracer tracer = GlobalTracer.get();
    if (tracer != null && tracer.activeSpan() != null) {
      tracer.activeSpan().setTag("customer.id", 12345);
      tracer.activeSpan().setTag("http.url", "/login");
    }
    // implémentation de servlet
  }
}
```


[1]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/DDTags.java
[2]: https://github.com/opentracing/opentracing-java/blob/master/opentracing-api/src/main/java/io/opentracing/tag/Tags.java
{{% /tab %}}
{{% tab "Python" %}}

**Ajouter des tags à une span**

Ajoutez directement des tags à une span en appelant `set_tag`. Par exemple, avec le gestionnaire d'acheminement suivant :

```python
from ddtrace import tracer

@app.route('/customer/<int:id_client>')
def handle_customer(customer_id):
  with tracer.trace('web.request') as span:
    span.set_tag('customer.id', customer_id)
```

**Ajouter des tags à une span actuellement active**

La span actuelle peut être récupérée à partir du contexte afin de définir des tags. Ainsi, si une span a été initiée par l'instrumentation, vous pouvez la récupérer et ajouter des tags personnalisés. Veuillez noter que s'il existe une span, la valeur `None` est renvoyée :

```python
from ddtrace import tracer

@app.route('/customer/<int:customer_id>')
@tracer.wrap()
def handle_customer(customer_id):
  # récupère la span active dans le contexte, placée ici par tracer.wrap()
  current_span = tracer.current_span()
  if current_span:
    current_span.set_tag('customer.id', customer_id)
```

**Ajouter des tags à l'ensemble des spans**

Ajoutez des tags à l'ensemble des spans en configurant le traceur à l'aide de la méthode `tracer.set_tags` :

```python
from ddtrace import tracer

tracer.set_tags({ 'env': 'prod' })
```

{{% /tab %}}
{{% tab "Ruby" %}}

**Ajouter des tags à une span**

Ajoutez directement des tags aux objets `Datadog::Span` en appelant `#set_tag` :

```ruby
# Un exemple d'endpoint Sinatra,
# avec le tracing Datadog autour de la requête.
get '/posts' do
  Datadog.tracer.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
  end
end
```

**Ajouter des tags à une span actuellement active**

Accédez à la span actuellement active au sein de votre code à l'aide de la méthode de votre choix. Attention : si la méthode est appelée et qu'aucune span n'est actuellement active, `active_span` ne prend aucune valeur.

```ruby
# exemple : ajouter un tag à une span active

current_span = Datadog.tracer.active_span
current_span.set_tag('<TAG_KEY>', '<TAG_VALUE>') unless current_span.nil?
```

**Ajouter des tags à l'ensemble des spans**

Ajoutez des tags à toutes les spans en configurant l'option `tags` du traceur :

```ruby
Datadog.configure do |c|
  c.tracer tags: { 'env' => 'prod' }
end
```

Consultez la [documentation relative à l'API][1] pour en savoir plus.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#environment-and-tags
{{% /tab %}}
{{% tab "Go" %}}

**Ajouter des tags à une span**

Ajoutez directement des tags à une interface `Span` en appelant `SetTag` :

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

    // Définir le tag
    span.SetTag("http.url", r.URL.Path)
}

func main() {
    tracer.Start(tracer.WithServiceName("<NOM_SERVICE>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

**Ajouter des tags à une span associée à un contexte**

Les intégrations de Datadog utilisent le type `Context` pour propager la span actuellement active. Si vous souhaitez ajouter un tag à une span associée à un `Context` à l'aide d'une instrumentation automatique, appelez la fonction `SpanFromContext` :

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

**Ajouter des tags à l'ensemble des spans**

Ajoutez des tags à toutes les spans en configurant l'option `tags` du traceur :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "prod"),
    )
    defer tracer.Stop()
}
```

{{% /tab %}}
{{% tab "Node.js" %}}

**Ajouter des tags à une span**

Ajoutez directement des tags aux objets span en appelant `setTag` or `addTags` :

```javascript
// Un exemple d'endpoint Express,
// avec un tracing Datadog autour de la requête.
app.get('/posts', (req, res) => {
  const span = tracer.startSpan('web.request')

  span.setTag('http.url', req.url)
  span.addTags({
    'http.method': req.method
  })
})
```

**Ajouter des tags à une span actuellement active**

Accédez à la span actuellement active au sein de votre code à l'aide de la méthode de votre choix. **Attention** : si la méthode est appelée et qu'aucune span n'est actuellement active, `tracer.scope().active()` renvoie `null`.

```javascript
// exemple d'ajout de tag à une span active

const span = tracer.scope().active()

span.setTag('<TAG_KEY>', '<TAG_VALUE>')
```

{{% /tab %}}
{{% tab ".NET" %}}

**Ajouter des tags à une span**

Ajoutez directement des tags à un objet `Datadog.Trace.Span` en appelant `Span.SetTag()`. Par exemple :

```csharp
using Datadog.Trace;

// récupérer le traceur global
var tracer = Tracer.Instance;

// récupérer la span actuellement active (peut être null)
var span = tracer.ActiveScope?.Span;

// ajouter un tag à la span
span?.SetTag("<TAG_KEY>", "<TAG_VALUE>");
```

**Remarque** : `Datadog.Trace.Tracer.Instance.ActiveScope` renvoie`null` si aucune span n'est active.

{{% /tab %}}
{{% tab "PHP" %}}

**Ajouter des tags à une span**

Ajoutez directement des tags à un objet `DDTrace\Span` en appelant `Span::setTag()`.

```php
dd_trace('<NOM_FONCTION>', function () {
    $scope = \DDTrace\GlobalTracer::get()
      ->startActiveSpan('<NOM_FONCTION>');
    $span = $scope->getSpan();
    $span->setTag('<TAG_KEY>', '<TAG_VALUE>');

    $result = <NOM_FONCTION>();

    $scope->close();
    return $result;
});
```

**Ajouter des tags à une span actuellement active**

```php
// Récupérer la span actuellement active (peut être null)
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if (null !== $span) {
  // Ajouter un tag à la span
  $span->setTag('<TAG_KEY>', '<TAG_VALUE>');
}
```

**Remarque** : `Tracer::getActiveSpan()` renvoie `null` si aucune span n'est active.

**Ajouter des tags à l'ensemble des spans**

Utilisez la variable d'environnement `DD_TRACE_GLOBAL_TAGS` pour ajouter des tags à l'ensemble des spans générées. Consultez la section [Configuration PHP][1]
pour découvrir comment définir des variables d'environnements.

```ini
DD_TRACE_GLOBAL_TAGS=key1:value1,key2:value2
```


[1]: /fr/tracing/languages/php/#configuration
{{% /tab %}}
{{% tab "C++" %}}

Ajoutez directement des tags à un objet span en appelant `Span::SetTag`. Par exemple :

```cpp
auto tracer = ...
auto span = tracer->StartSpan("nom_opération");
span->SetTag("la clé doit être une chaîne de caractères", "Les valeurs sont des types de variables");
span->SetTag("la clé doit être une chaîne de caractères", 1234);
```

Les valeurs correspondent au [type variable][1] et peuvent être des objets complexes. Les valeurs sont sérialisées en tant que JSON, à l'exception d'une valeur de chaîne de caractères qui est sérialisée telle quelle (sans guillemets supplémentaires).

[1]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/value.h
{{% /tab %}}
{{< /tabs >}}

## Modifier le hostname de l'Agent

Configurez vos traceurs au niveau des applications pour envoyer des traces à un hostname d'Agent personnalisé. Consultez les exemples ci-dessous pour chaque langage pris en charge :

{{< tabs >}}
{{% tab "Java" %}}

Le module de tracing Java recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```bash
java -javaagent:<CHEMIN-AGENT-JAVA-DD>.jar -jar <CHEMIN_VOTRE_APPLICATION>.jar
```

Vous pouvez également utiliser des propriétés système :

```bash
java -javaagent:<CHEMIN-AGENT-JAVA-DD>.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
     -jar <CHEMIN_VOTRE_APPLICATION>.jar
```

{{% /tab %}}
{{% tab "Python" %}}

Le module de tracing Python recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```python
import os
from ddtrace import tracer

tracer.configure(
    hostname=os.environ['DD_AGENT_HOST'],
    port=os.environ['DD_TRACE_AGENT_PORT'],
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

Le module de tracing Ruby recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```ruby
Datadog.configure do |c|
  c.tracer hostname: ENV['DD_AGENT_HOST'],
           port: ENV['DD_TRACE_AGENT_PORT']
end
```

{{% /tab %}}
{{% tab "Go" %}}

Le module de tracing Go recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```go
package main

import (
    "net"
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        os.Getenv("DD_AGENT_HOST"),
        os.Getenv("DD_TRACE_AGENT_PORT"),
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}

```

{{% /tab %}}
{{% tab "Node.js" %}}

Le module de tracing NodeJS recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```js
const tracer = require('dd-trace').init({
  hostname: process.env.DD_AGENT_HOST,
  port: process.env.DD_TRACE_AGENT_PORT
})
```

{{% /tab %}}
{{% tab "PHP" %}}

Le traceur PHP recherche automatiquement les variables ENV `DD_AGENT_HOST` et `DD_TRACE_AGENT_PORT` et s'initialise avec celles-ci.

```php
putenv('DD_AGENT_HOST=localhost');
putenv('DD_TRACE_AGENT_PORT=8126');
```

{{% /tab %}}
{{< /tabs >}}

## Métriques d'exécution

Activez la collecte des métriques d'exécution dans le client de tracing pour obtenir davantage de détails sur les performances d'une application. Les métriques d'exécution peuvent être consultées au sein du contexte d'un service, corrélées dans la vue Trace lors de l'exécution d'une requête donnée et exploitées sur l'ensemble de la plate-forme.

{{< img src="tracing/jvm_runtime_trace.png" alt="Trace exécution JVM" responsive="true" style="width:100%;">}}

{{< tabs >}}
{{% tab "Java" %}}

### Configuration automatique

La collecte de métriques JVM peut être activée à l'aide d'un paramètre de configuration dans le client de tracing :

* Propriété système : `-Ddd.jmxfetch.enabled=true`
* Variable d'environnement : `DD_JMXFETCH_ENABLED=true`

Les métriques JVM peuvent être visualisées conjointement à vos services Java. Consultez la [page Service][1] dans Datadog.

{{< img src="tracing/jvm-runtime.png" alt="Exécution JVM" responsive="true" style="width:100%;">}}

**Remarque** : pour l'IU d'exécution, `dd-trace-java` >= [`0.24.0`][2] est pris en charge.

### Données collectées

Les métriques suivantes sont par défaut recueillies après l'activation des métriques JVM.

{{< get-metrics-from-git "java" >}}

Datadog fournit non seulement ces métriques sur votre page Service de l'APM, mais également un [dashboard d'exécution JVM par défaut][3] comportant les tags `service` et `runtime-id` appliqués à ces métriques.

En outre, vous pouvez ajouter des métriques JMX, à l'aide de fichiers de configuration, qui sont transmises à `jmxfetch.metrics-configs`. Il est également possible d'activer chaque intégration JMX de Datadog à l'aide du paramètre `dd.integration.<nom>`. Cela intègre automatiquement la configuration des [fichiers de configuration JMX existants][4]. Consultez l'[intégration JMX][5] pour en savoir plus sur la configuration.

### Collecte de métriques JVM dans des environnements conteneurisés

Par défaut, les métriques JVM de votre application sont envoyées à l'Agent Datadog sur le port 8125. Si vous exécutez l'Agent en tant que conteneur, assurez-vous que `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` [est défini sur true][6] et que le port 8125 est ouvert sur l'Agent. Par exemple : dans Kubernetes, [associez le port DogstatsD à un port de host][7] ; dans ECS, [indiquez les flags pertinents dans la définition de votre tâche][8].


[1]: https://app.datadoghq.com/apm/services
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v0.24.0
[3]: https://app.datadoghq.com/dash/integration/256/jvm-runtime-metrics
[4]: https://github.com/DataDog/integrations-core/search?q=jmx_metrics&unscoped_q=jmx_metrics
[5]: /fr/integrations/java/#configuration
[6]: https://docs.datadoghq.com/fr/agent/docker/#dogstatsd-custom-metrics
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/dogstatsd/#bind-the-dogstatsd-port-to-a-host-port
[8]: https://docs.datadoghq.com/fr/integrations/amazon_ecs/?tab=python#create-an-ecs-task
{{% /tab %}}
{{% tab "Python" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.

[1]: /fr/help
{{% /tab %}}
{{% tab "Ruby" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.

[1]: /fr/help
{{% /tab %}}
{{% tab "Go" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab "Node.js" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
{{% /tab %}}
{{< /tabs >}}

## Instrumentation manuelle

Grâce à l'instrumentation manuelle, vous pouvez rédiger des programmes afin de créer des traces à envoyer à Datadog. Cela vous permet d'effectuer un tracing du code interne qui n'est pas enregistré par l'instrumentation automatique. Avant d'instrumenter votre application, consultez la [terminologie de l'APM][2] de Datadog et passe en revue les concepts de base de l'APM.


{{< tabs >}}
{{% tab "Java" %}}

SI vous n'utilisez pas une [instrumentation de framework compatible][1], ou si vous souhaitez apporter de la profondeur aux traces de votre application, vous pouvez choisir d'instrumenter manuellement votre code.

Pour ce faire, utilisez l'annotation de traces pour effectuer un tracing simple des appels de méthode, ou l'[API OpenTracing][2] pour un tracing plus complexe.

La fonction d'annotation de traces de Datadog est fournie par la [dépendance dd-trace-api][3].

**Exemple d'utilisation**

```java
import datadog.trace.api.Trace;

public class MyClass {
  @Trace
  public static void myMethod() {
    // implémenter votre méthode ici
  }
}
```


[1]: /fr/tracing/languages/java/#compatibility
[2]: #opentracing
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
{{% /tab %}}
{{% tab "Python" %}}

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `ddtrace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

Les exemples suivants utilisent l'objet traceur global, qui peut être importé à l'aide de la commande :

```python
  from ddtrace import tracer
```

**Décorateur**

`ddtrace` fournir un décorateur permettant de tracer une méthode spécifique de votre application :

```python
  @tracer.wrap()
  def business_logic():
    """Une méthode pertinente à tracer."""
    # ...
    # ...
```

Consultez [`ddtrace.Tracer.wrap()`][2] pour obtenir des détails sur l'API pour le décorateur.

**Gestionnaire de contextes**

Pour tracer un bloc arbitraire de code, vous pouvez utiliser le gestionnaire de contextes [`ddtrace.Span`][3] :

```python
  # tracer une opération pertinente
  with tracer.trace('operations.pertinentes'):
    # ajouter une ou plusieurs opérations pertinentes
    # ...
    # ...
```

Consultez [`ddtrace.Tracer()`][4] pour obtenir davantage de détails sur l'API.

**Utiliser l'API**

Si les méthodes susmentionnées ne vous permettent pas de répondre à vos besoins en tracing, vous pouvez utiliser une API manuelle afin de lancer des spans et d'y mettre fin comme bon vous semble :

```python
  span = tracer.trace('operations.pertinentes')

  # ajouter une ou plusieurs opérations pertinentes ici

  # REMARQUE : assurez-vous d'appeler span.finish(), sans quoi la trace entière ne sera pas envoyée
  # à Datadog
  span.finish()
```

Consultez les ressources ci-dessous pour obtenir des détails sur l'API :

- [`ddtrace.Tracer.trace`][5]
- [`ddtrace.Span.finish`][6]



[1]: /fr/tracing/languages/python/#compatibility
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[4]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
[5]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{% tab "Ruby" %}}

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code. Vous pouvez utiliser la méthode `Datadog.tracer.trace` pour tracer facilement votre code. Celle-ci peut être ajoutée autour de n'importe quel code Ruby.

**Exemple d'utilisation**

```ruby
# Un exemple d'endpoint Sinatra,
# avec un tracing Datadog autour de la requête,
# une requête de base de données et des étapes de rendu.
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<NOM_SERVICE>', resource: 'GET /posts') do |span|
    # Tracer l'appel activerecord
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Ajouter des tags d'APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Tracer le rendu du modèle
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```

Pour en savoir plus sur l'instrumentation manuelle, consultez la [documentation relative à l'API][2].


[1]: /fr/tracing/languages/ruby/#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Afin de bénéficier d'une instrumentation manuelle, utilisez le paquet `tracer`, dont l'utilisation est documentée sur la [page GoDoc][2] de Datadog.

**Exemple d'utilisation**

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Commencer le traceur avec zéro ou plusieurs options.
    tracer.Start(tracer.WithServiceName("<NOM_SERVICE>"))
    defer tracer.Stop()

    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Définir les métadonnées.
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}
```


[1]: /fr/tracing/languages/go/#compatibility
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
{{% /tab %}}
{{% tab "Node.js" %}}

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

L'exemple suivant initialise un traceur Datadog et crée une span intitulée `web.request` :

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

Pour en savoir plus sur l'instrumentation manuelle, consultez la [documentation relative à l'API][2].


[1]: /fr/tracing/languages/nodejs/#compatibility
[2]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
{{% /tab %}}
{{% tab ".NET" %}}

Si vous n'utilisez pas de bibliothèques compatibles avec l’instrumentation automatique (voir la [compatibilité des bibliothèques][1]), vous devez instrumenter manuellement votre code.

L'exemple suivant utilise le traceur Datadog global et crée une span pour tracer une requête Web :

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // à vous de jouer…
}
```


[1]: /fr/tracing/languages/dotnet/#compatibility
{{% /tab %}}

{{% tab "PHP" %}}

Même si Datadog ne prend pas en charge officiellement votre framework Web, vous n'avez pas forcément besoin d'effectuer une instrumentation manuelle. Consultez la section [Instrumentation automatique][1] pour en savoir plus.

Si vous devez effectuer une instrumentation manuelle, par exemple pour tracer des méthodes personnalisées spécifiques dans votre application, commencez par installer la dépendance du traceur PHP avec Composer :

```bash
$ composer require datadog/dd-trace
```

#### Tracer une méthode ou une fonction personnalisée

La fonction `dd_trace()` se fixe aux fonctions et méthodes existantes pour :

* Ouvrir une span avant l'exécution du code
* Définir des tags ou des erreurs supplémentaires sur la span
* Fermer la span une fois le processus terminé
* Modifier les arguments ou la valeur renvoyée

Par exemple, le snippet suivant trace la méthode `CustomDriver::doWork()`, ajoute des tags personnalisés, signale les éventuelles exceptions sous la forme d'erreurs sur la span et renvoie à nouveau les exceptions.

```php
dd_trace("CustomDriver", "doWork", function (...$args) {
    // Commencer une nouvelle span
    $scope = GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Accéder aux membres d'objet via $this
    $span->setTag(Tags\NOM_RESSOURCE, $this->workToDo);

    try {
        // Exécuter la méthode d'origine
        $result = $this->doWork(...$args);
        // Définir un tag en fonction de la valeur renvoyée
        $span->setTag('doWork.size', count($result));
        return $result;
    } catch (Exception $e) {
        // Informer le traceur qu'une exception a été renvoyée
        $span->setError($e);
        // Remonter l'exception
        throw $e
    } finally {
        // Fermer la span
        $span->finish();
    }
});
```

Vous pourrez accéder plus tard à la span racine depuis le traceur global, via `Tracer::getRootScope()`. Cela s'avère utile lorsque les métadonnées à ajouter à la span racine n'existent pas au début de l'exécution d'un script.

```php
$rootSpan = \DDTrace\GlobalTracer::get()
    ->getRootScope()
    ->getSpan();
$rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
```

#### Instrumentation manuelle de Zend Framework 1

Par défaut, Zend Framework 1 est automatiquement instrumenté. Vous n'avez donc pas besoin de modifier votre projet ZF1. Cependant, si l'instrumentation automatique est désactivée, activez manuellement le traceur.

Commencez par [télécharger le dernier code source depuis la page des nouvelles versions][2]. Dézippez le fichier et copiez le dossier `src/DDTrace` dans le dossier `/library` de votre application. Ajoutez ensuite le code suivant au fichier `application/configs/application.ini` :

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = CHEMIN_APPLICATION "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

#### Instrumentation manuelle et optimisation du code PHP

Avant PHP 7, certains frameworks fournissaient des solutions pour compiler les classes PHP, par exemple via la commande `php artisan optimize` de Laravel.

Bien que cette version [soit désormais obsolète][3], si vous utilisez PHP 7.x, vous pouvez utiliser ce mécanisme de mise en cache au sein de votre app avant la version 7.x. Pour ce cas précis, nous vous recommandons d'utiliser l'API [OpenTracing][4] au lieu d'ajouter `datadog/dd-trace` à votre fichier Composer.



[1]: /fr/tracing/languages/php/#automatic-instrumentation
[2]: https://github.com/DataDog/dd-trace-php/releases/latest
[3]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[4]: #opentracing
{{% /tab %}}
{{% tab "C++" %}}

Pour instrumenter manuellement votre code, installez le traceur tel qu'indiqué dans les exemples de configuration, puis utilisez l'objet tracer pour créer des spans.

```cpp
{
  // Créer une span racine.
  auto root_span = tracer->StartSpan("nom_opération");
  // Créer une span enfant.
  auto child_span = tracer->StartSpan(
      "nom_opération",
      {opentracing::ChildOf(&root_span->context())});
  // Les spans peuvent prendre fin à une heure donnée…
  child_span->Finish();
} // ... ou lors de leur destruction (root_span prend fin ici).
```

{{% /tab %}}
{{< /tabs >}}

## OpenTracing

OpenTracing est une norme interlangage indépendante de tout fournisseur pour les applications de tracing. Datadog propose des implémentations OpenTracing pour de nombreux traceurs d'APM. Pour en savoir plus, visitez le site [opentracing.io][3].


{{< tabs >}}
{{% tab "Java" %}}

Utilisez l'[API Opentracing][1] et la bibliothèque de traceur Datadog (dd-trace-ot) pour mesurer les délais d'exécution de certains éléments de code. Vous pouvez ainsi tracer votre application plus précisément qu'avec l'Agent Java.

**Configuration** :

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

Configurez votre application à l'aide de variables d'environnement ou de propriétés système, tel qu'indiqué dans la section [Configuration][2].


**Instrumentation manuelle avec OpenTracing** :

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
         * 2. À l'aide de dd-java-agent (-javaagent:/path/to/dd-java-agent.jar),
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

Vous pouvez également ajouter la déclaration `try-with-resources` autour du code à tracer.

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
import datadog.trace.api.sampling.AllSampler;
import datadog.trace.common.writer.DDAgentWriter;

import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

public class Application {

    public static void main(String[] args) {

        // Initialiser le traceur depuis des variables d'environnement ou des propriétés système
        Tracer tracer = new DDTracer();
        GlobalTracer.register(tracer);
        // Enregistrer ce traceur avec l'API Datadog
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // OU depuis l'API
        Writer writer = new DDAgentWriter();
        Sampler sampler = new AllSampler();
        Tracer tracer = new DDTracer(writer, sampler);
        GlobalTracer.register(tracer);
        // Enregistrer ce traceur avec l'API Datadog
        datadog.trace.api.GlobalTracer.registerIfAbsent(tracer);

        // …
    }
}
```

**Instrumentation manuelle pour des traces Async** :

Créez des traces asynchrones avec une instrumentation manuelle à l'aide de l'API OpenTracing.

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
Veuillez noter que les exemples ci-dessus utilisent uniquement les classes OpenTracing. Consultez l'[API OpenTracing][1] pour en savoir plus.


[1]: https://github.com/opentracing/opentracing-java
[2]: /fr/tracing/languages/java/#configuration
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

La prise en charge d'OpenTracing pour Ruby sera bientôt disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.


[1]: /fr/help
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
public void ConfigureServices(IServiceCollection services)
{
    // créer un ITracer OpenTracing avec les réglages par défaut
    OpenTracing.ITracer tracer =
        Datadog.Trace.OpenTracing.OpenTracingTracerFactory.CreateTracer();

    // pour utiliser le traceur avec l'injection de dépendance ASP.NET Core
    services.AddSingleton<ITracer>(tracer);

    // pour utiliser le traceur avec OpenTracing.GlobalTracer.Instance
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
$otTracer = \OpenTracing\GlobalTracer::get();
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Utiliser OpenTracing comme prévu
```


[1]: https://github.com/opentracing/opentracing-php
[2]: /fr/tracing/languages/php/#automatic-instrumentation
{{% /tab %}}
{{% tab "C++" %}}

Le traceur C++ de Datadog peut uniquement être utilisé via l'API OpenTracing. Les instructions d'utilisation de cette section décrivent toutes les fonctionnalités génériques d'OpenTracing.

{{% /tab %}}
{{< /tabs >}}

## Tracing distribué

Le tracing distribué vous permet de propager une trace sur plusieurs services et hosts, afin de consulter les performances de bout en bout. L'association s'effectue en injectant des métadonnées Datadog dans les en-têtes de requête.

Les en-têtes de tracing distribué fonctionnent sur l'ensemble des langages. Une trace initiée dans un langage peut se propager dans un autre langage (par exemple, de Python à Java).

Les traces distribuées peuvent s’échantillonner de façon incohérente lorsque des traces associées s'exécutent sur différents hosts. Pour s'assurer que les traces distribuées sont exhaustives, activez l'[échantillonnage prioritaire][4].


{{< tabs >}}
{{% tab "Java" %}}

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

{{% /tab %}}
{{% tab "Python" %}}

Le tracing distribué est activé par défaut et pris en charge par les frameworks suivants :

| Framework/bibliothèque | Documentation de l'API                                                   |
| ----------------- | :------------------------------------------------------------------ |
| aiohttp           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#aiohttp  |
| bottle            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#bottle   |
| django            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#django   |
| falcon            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#falcon   |
| flask             | http://pypi.datadoghq.com/trace/docs/web_integrations.html#flask    |
| molten            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#molten   |
| pylons            | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pylons   |
| pyramid           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#pyramid  |
| requests          | http://pypi.datadoghq.com/trace/docs/other_integrations.html#requests |
| tornado           | http://pypi.datadoghq.com/trace/docs/web_integrations.html#tornado  |

Pour ajouter votre propre check de tracing distribué, consultez la [documentation relative à l'API Datadog][1].


[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#http-client
{{% /tab %}}
{{% tab "Ruby" %}}

Le tracing distribué est désactivé par défaut. Consultez la documentation sur la configuration de chaque framework pour l'activer.

Le tracing activé est pris en charge par les frameworks suivants :

| Framework/bibliothèque | Documentation de l'API                                                                    |
| ----------------- | :----------------------------------------------------------------------------------- |
| Excon             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#excon      |
| Faraday           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#faraday    |
| Net/HTTP          | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#nethttp    |
| Rack              | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rack       |
| Rails             | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#rails      |
| Client Rest       | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#restclient |
| Sinatra           | https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#sinatra    |

Pour en savoir plus sur l'activation et la configuration du tracing distribué, consultez la [documentation relative à l'API][1].


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#distributed-tracing
{{% /tab %}}
{{% tab "Go" %}}

Créez une trace distribuée en propageant manuellement le contexte de tracing :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Injecter le contexte de la span dans les en-têtes de requête
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Erreur de gestion ou d'injection de log
    }
    http.DefaultClient.Do(req)
}
```

Pour continuer la trace du côté serveur, commencez une nouvelle span à partir du `Context` extrait :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extraire le contexte de la span et continuer la trace dans ce service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Erreur de gestion ou d'extraction de log
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

{{% /tab %}}
{{% tab "Node.js" %}}

Le tracing distribué est activé par défaut pour toutes les intégrations prises en charge (voir la section [Compatibilité][1]).


[1]: /fr/tracing/languages/nodejs/#compatibility
{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.

[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

Le tracing distribué est activé par défaut.

{{% /tab %}}
{{% tab "C++" %}}

Vous pouvez effectuer un tracing distribué en [utilisant les méthodes `Inject` et `Extract` sur le traceur][1], qui accepte les [types `Reader` et `Writer` de base][2]. Vous devez utiliser l'échantillonnage prioritaire (activé par défaut) pour garantir l'envoi uniforme des spans.

```cpp
// Autorise l'écriture d'en-têtes de propagation sur une carte simple <string, string>.
// Copié depuis https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("nom_opération");
  tracer->Inject(span->context(), carrier);
  // `headers` contient désormais les en-têtes requis pour propager la span.
}
```

[1]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[2]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
{{% /tab %}}
{{< /tabs >}}

## Échantillonnage prioritaire

L'échantillonnage prioritaire vous permet d'échantillonner conjointement plusieurs traces entre deux endpoints Datadog. Cela vous permet d'éviter de supprimer des segments d'une trace distribuée lors de l'échantillonnage de vos traces. Ainsi, vos traces sont exhaustives. En outre, les traces d'APM exposent les flags d'échantillonnage de façon à configurer l'échantillonnage de traces spécifiques.

L'échantillonnage prioritaire attribue et propage automatiquement une valeur de priorité à toutes les traces, selon leur service et volume. Les priorités peuvent également être définies manuellement, afin de supprimer les traces non pertinentes ou de conserver les plus importantes.

Pour obtenir des explications plus détaillées sur l'échantillonnage et l'échantillonnage prioritaire, consultez la documentation [relative à l'échantillonnage et au stockage][5].


{{< tabs >}}
{{% tab "Java" %}}

L'échantillonnage prioritaire est activé par défaut. Pour le désactiver, configurez le flag `priority.sampling` sur `false` ([découvrez comment configurer le client Java][1]).


Valeurs prioritaires actuelles (d'autres valeurs peuvent être ajoutées au fil du temps) :

| Valeur d'échantillonnage | Effet                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| `SAMPLER_DROP` | L'échantillonneur a automatiquement décidé de ne pas conserver la trace. L'Agent va la supprimer.                           |
| `SAMPLER_KEEP` | L'échantillonneur a automatiquement décidé de conserver la trace. L'Agent la conservera, mais elle sera peut-être échantillonnée côté serveur. |
| `USER_DROP`    | L'utilisateur a demandé à ne pas conserver la trace. L'Agent va la supprimer.                                              |
| `USER_KEEP`    | L'utilisateur a demandé à conserver la trace. L'Agent et le serveur vont la conserver.                     |

Pour définir manuellement la priorité des traces :

```java
import datadog.trace.api.Trace;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.common.sampling.PrioritySampling;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // récupérer la span active à partir de la méthode tracée
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // demander à l'échantillonneur de conserver la trace actuelle
        ddspan.setSamplingPriority(PrioritySampling.USER_KEEP);
        // ajouter ensuite l'implémentation de la méthode
    }
}
```

[1]: /fr/tracing/languages/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

L'échantillonnage prioritaire est désactivé par défaut. Pour l'activer, configurez le flag `priority_sampling` à l'aide de la méthode `tracer.configure` :

```python
tracer.configure(priority_sampling=True)
```

Pour définir une priorité personnalisée pour une trace :

```python
from ddtrace.ext.priority import USER_REJECT, USER_KEEP

span = tracer.current_span()

# préciser que la trace ne doit pas être conservée
span.context.sampling_priority = USER_REJECT
```

Vous pouvez utiliser les priorités suivantes.

| Valeur d'échantillonnage | Effet                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| AUTO_REJECT    | L'échantillonneur a automatiquement décidé de ne pas conserver la trace. L'Agent va la supprimer.                           |
| AUTO_KEEP      | L'échantillonneur a automatiquement décidé de conserver la trace. L'Agent la conservera, mais elle sera peut-être échantillonnée côté serveur. |
| USER_REJECT    | L'utilisateur a demandé à ne pas conserver la trace. L'Agent va la supprimer.                                              |
| USER_KEEP      | L'utilisateur a demandé à conserver la trace. L'Agent et le serveur vont la conserver.                     |

{{% /tab %}}
{{% tab "Ruby" %}}

L'échantillonnage prioritaire est désactivé par défaut. Activez-le pour vous assurer que vos traces distribuées échantillonnées seront exhaustives. Pour activer l'échantillonnage prioritaire :

```ruby
Datadog.configure do |c|
  c.tracer priority_sampling: true
end
```

Une fois activé, l'échantillonneur attribue automatiquement une valeur de `AUTO_REJECT` ou `AUTO_KEEP` aux traces, en fonction de leur service et volume.

Vous pouvez également définir manuellement cette priorité pour supprimer une trace non pertinente ou conserver une trace importante. Pour ce faire, définissez `Context#sampling_priority` sur :

```ruby
# Pour rejeter la trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_REJECT

# Pour conserver la trace
span.context.sampling_priority = Datadog::Ext::Priority::USER_KEEP
```

Voici les valeurs autorisées pour le tag de priorité d'échantillonnage :

| Valeur d'échantillonnage                        | Effet                                                                                                     |
| ------------------------------------- | :--------------------------------------------------------------------------------------------------------- |
| `Datadog::Ext::Priority::AUTO_REJECT` | L'échantillonneur a automatiquement décidé de ne pas conserver la trace. L'Agent va la supprimer.                           |
| `Datadog::Ext::Priority::AUTO_KEEP`   | L'échantillonneur a automatiquement décidé de conserver la trace. L'Agent la conservera, mais elle sera peut-être échantillonnée côté serveur. |
| `Datadog::Ext::Priority::USER_REJECT` | L'utilisateur a demandé à ne pas conserver la trace. L'Agent va la supprimer.                                              |
| `Datadog::Ext::Priority::USER_KEEP`   | L'utilisateur a demandé à conserver la trace. L'Agent et le serveur vont la conserver.                     |

Lorsque vous n'utilisez pas le [tracing distribué](#tracing-distribue), vous pouvez modifier la priorité d'une trace à tout moment, tant que celle-ci n'a pas pris fin. Cependant, pour que votre changement soit pertinent, vous devez l'effectuer avant toute propagation de contexte (p. ex., duplication, appels RPC). Si ce n'est pas le cas, plusieurs éléments d'une trace distribuée auront différentes priorités. Ainsi, certains éléments seront conservés, tandis que d'autres seront rejetés. La trace pourra donc être en partie stockée et incomplète.

Il est recommandé de modifier la priorité le plus tôt possible, après la création de la span racine.

Consultez la [documentation relative à l'API][1] pour en savoir plus.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#priority-sampling
{{% /tab %}}
{{% tab "Go" %}}

Pour en savoir plus sur l'utilisation et la configuration du tracing distribué, consultez la [page GoDoc][1].

Définissez la priorité d'échantillonnage d'une trace en ajoutant le tag `sampling.priority` à sa span racine. Ce tag est ensuite propagé dans l'ensemble de la pile. Exemple :

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Définir l'échantillonnage prioritaire en tant que tag normal
    span.SetTag(ext.SamplingPriority, ext.PriorityUserKeep)
}
```

Voici les valeurs autorisées pour le tag de priorité d'échantillonnage :

| Valeur d'échantillonnage         | Effet                                                                                                     |
| ---------------------- | :--------------------------------------------------------------------------------------------------------- |
| ext.PriorityAutoReject | L'échantillonneur a automatiquement décidé de ne pas conserver la trace. L'Agent va la supprimer.                           |
| ext.PriorityAutoKeep   | L'échantillonneur a automatiquement décidé de conserver la trace. L'Agent la conservera, mais elle sera peut-être échantillonnée côté serveur. |
| ext.PriorityUserReject | L'utilisateur a demandé à ne pas conserver la trace. L'Agent va la supprimer.                                              |
| ext.PriorityUserKeep   | L'utilisateur a demandé à conserver la trace. L'Agent et le serveur vont la conserver.                     |


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
{{% /tab %}}
{{% tab "Node.js" %}}

L'échantillonnage prioritaire est activé par défaut. L'échantillonneur attribue automatiquement une valeur de `AUTO_REJECT` ou `AUTO_KEEP` aux traces, en fonction de leur service et volume.

Définissez manuellement cette priorité pour supprimer une trace non pertinente ou conserver une trace importante grâce au tag `sampling.priority` :

```javascript
const priority = require('dd-trace/ext/priority')

// Pour rejeter la trace
span.setTag('sampling.priority', priority.USER_REJECT)

// Pour conserver la trace
span.setTag('sampling.priority', priority.USER_KEEP)
```

Voici les valeurs autorisées pour le tag de priorité d'échantillonnage :

| Valeur d'échantillonnage | Effet                                                                                                     |
| -------------- | :--------------------------------------------------------------------------------------------------------- |
| `AUTO_REJECT`  | L'échantillonneur a automatiquement décidé de ne pas conserver la trace. L'Agent va la supprimer.                           |
| `AUTO_KEEP`    | L'échantillonneur a automatiquement décidé de conserver la trace. L'Agent la conservera, mais elle sera peut-être échantillonnée côté serveur. |
| `USER_REJECT`  | L'utilisateur a demandé à ne pas conserver la trace. L'Agent va la supprimer.                                              |
| `USER_KEEP`    | L'utilisateur a demandé à conserver la trace. L'Agent et le serveur vont la conserver.                     |

Une fois la priorité d'échantillonnage définie, vous ne pouvez pas la modifier. Ce processus est réalisé automatiquement lorsqu'une span prend fin ou lorsque la trace est propagée. Si vous choisissez de définir manuellement la priorité, assurez-vous de le faire avant que l'un de ces événements ne se produise.

{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.

[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

L'échantillonnage prioritaire est activé par défaut.

{{% /tab %}}
{{% tab "C++" %}}

L'échantillonnage prioritaire est activé par défaut et peut être désactivé dans les TracerOptions. Vous pouvez indiquer qu'une span doit être conservée ou supprimée en définissant le tag `sampling.priority`. La valeur `0` signifie que la span doit être rejetée ou ne doit pas être échantillonnée. Toute valeur supérieure à 0 signifie que la trace doit être conservée ou échantillonnée.

```cpp
auto tracer = ...
auto span = tracer->StartSpan("nom_opération");
span->SetTag("sampling.priority", 1); // Conserver cette span.
auto another_span = tracer->StartSpan("nom_opération");
another_span->SetTag("sampling.priority", 0); // Supprimer cette span.
```

{{% /tab %}}
{{< /tabs >}}

## Corréler des traces et des logs

L'ajout automatique de `trace_id` et `span_id` à vos logs, avec les bibliothèques de tracing, améliore la corrélation entre l'APM et Log Management de Datadog. Cette fonctionnalité peut être utilisée dans la plate-forme pour afficher les logs spécifiques qui sont corrélés à la trace observée.

Avant de corréler des traces à des logs, assurez-vous que vos logs sont [envoyés au format JSON][6] ou [analysés par le bon processeur de log au niveau des langages][7].

Vos logs au niveau des langages *doivent* être convertis en des attributs Datadog afin que la corrélation entre les traces et les logs fonctionne.

{{< img src="tracing/trace_id_injection.png" alt="Logs dans des traces" responsive="true" style="width:100%;">}}

{{< tabs >}}
{{% tab "Java" %}}

Utilisez l'une des options suivantes pour injecter des informations de trace Java dans vos logs :

**Injection automatique d'ID de trace**

Activez l'injection dans la [configuration][1] du traceur Java en indiquant `Ddd.logs.injection=true` ou via la variable d'environnement `DD_LOGS_INJECTION=true`.

**Remarque** : actuellement, seul **slf4j** est pris en charge pour l'auto-injection MDC.

Si les logs sont déjà au format JSON, vous n'avez plus rien à faire. S'ils sont au format brut, modifiez votre formateur en ajoutant `dd.trace_id` et `dd.span_id` à la configuration de votre enregistreur :

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**Injection manuelle d'ID de trace**

Si vous préférez corréler manuellement vos traces avec vos logs, utilisez l'API Datadog pour récupérer les identificateurs de corrélation :

* Utilisez les méthodes d'API `CorrelationIdentifier#getTraceId()` et `CorrelationIdentifier#getSpanId()` pour injecter les identificateurs au début et à la fin de chaque span dans vos logs (voir les exemples ci-dessous).
* Configurez MDC pour utiliser les clés injectées :
  * `dd.trace_id` : active l'ID de trace lors de la déclaration de log (ou renvoie `0` en l'absence de trace).
  * `dd.span_id` : active l'ID de span lors de la déclaration de log (ou renvoie `0` en l'absence de trace).

* `log4j2` - exemple :

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir commencé et être actifs avant ce bloc.
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Loguer quelque chose

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

* `slf4j/logback` -  exemple :

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir commencé et être actifs avant ce bloc.
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Loguer quelque chose

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

Modifiez ensuite la configuration de votre enregistreur en ajoutant `dd.trace_id` et `dd.span_id` à votre expression de log :

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][2] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

[Consultez la documentation relative à la journalisation Java][2] pour en savoir plus sur l'implémentation d'un enregistreur spécifique ou découvrir comment créer des logs au format JSON.

[1]: https://docs.datadoghq.com/fr/tracing/languages/java/#configuration
[2]: https://docs.datadoghq.com/fr/logs/log_collection/java/?tab=log4j#raw-format
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Python" %}}

Utilisez l'une des options suivantes pour injecter des informations de trace Python dans vos logs :

**Injection automatique d'ID de trace avec la bibliothèque standard Logging**

Activez l'injection avec la variable d'environnement `DD_LOGS_INJECTION=true` lorsque vous utilisez `ddtrace-run`.

**Remarque** : l'auto-injection prend en charge la bibliothèque standard `logging`, ainsi que toutes les bibliothèques qui complètent le module de bibliothèque standard, comme la bibliothèque `json_log_formatter`. `ddtrace-run` appelle `logging.basicConfig` avant l'exécution de votre application. Si l'enregistreur racine possède un gestionnaire configuré, votre application doit modifier directement l'enregistreur racine et le gestionnaire.

**Injection manuelle d'ID de trace avec la bibliothèque standard Logging**

Si vous préférez corréler manuellement vos traces avec vos logs, ajustez votre module `logging` en modifiant votre formateur de log de façon à inclure les attributs ``dd.trace_id`` et ``dd.span_id`` à partir de l'enregistrement de log.

La configuration ci-dessous est utilisée par la méthode d'injection automatique et est prise en charge par défaut par l'intégration de log Python :

``` python
from ddtrace import patch_all; patch_all(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__nom__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```


**Injection manuelle d'ID de trace sans la bibliothèque standard Logging**

Si vous n'utilisez pas le module `logging` de la bibliothèque standard, vous pouvez utiliser la commande `ddtrace.helpers.get_correlation_ids()` pour injecter les informations du traceur dans vos logs. Les exemples suivants illustrent cette approche, en définissant une fonction en tant que *processeur* dans `structlog` afin d'ajouter `dd.trace_id` et `dd.span_id` à la sortie de log :

``` python
from ddtrace.helpers import get_correlation_ids

import structlog


def tracer_injection(logger, log_method, event_dict):
    # obtenir les identifiants de corrélation à partir du contexte du traceur actuel
    trace_id, span_id = get_correlation_ids()

    # ajouter des identifiants au dictionnaire d'événement structlog
    # en l'absence de trace, définir les identifiants sur 0
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

    return event_dict


structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Une fois l'enregistreur configuré, si vous exécutez une fonction tracée qui logue un événement, vous obtenez les informations du traceur injecté :

```
>>> traced_func()
{"event": "Contexte du traceur", "trace_id": 9982398928418628468, "span_id": 10130028953923355146}
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `trace_id` and `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][2].

[Consultez la documentation relative à la journalisation Python][1] pour vous assurer que l'intégration de log Python est bien configurée de façon à ce que vos logs Python soient automatiquement analysés.

[1]: https://docs.datadoghq.com/fr/logs/log_collection/python/#configure-the-datadog-agent
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Ruby" %}}

Utilisez l'une des options suivantes pour injecter des informations de trace Ruby dans vos logs :

** Injection automatique d'ID de trace pour les applications Rails à l'aide de Lograge (conseillé)**

Après avoir [configuré Lograge dans une application Rails][1], modifiez le bloc `custom_options` dans le fichier de configuration de votre environnement (p. ex., `config/environments/production.rb`) pour ajouter les ID de trace :

```ruby
config.lograge.custom_options = lambda do |event|
  # Récupère les informations de trace pour le thread actuel
  correlation = Datadog.tracer.active_correlation

  {
    # Ajoute les ID en tant que tags à la sortie du log
    :dd => {
      :trace_id => correlation.trace_id,
      :span_id => correlation.span_id
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

**Injection automatique d'ID de trace pour les applications Rails par défaut**

Les applications Rails qui sont configurées avec un enregistreur `ActiveSupport::TaggedLogging` peuvent ajouter des ID de trace en tant que tags à la sortie du log. L'enregistreur Rails par défaut applique cette journalisation avec des tags, ce qui simplifie l'ajout de tags de trace. 

Dans le fichier de configuration de votre environnement Rails (p. ex., `config/environments/production.rb`), ajoutez le code suivant :

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end
```

Cela ajoute les tags de trace aux requêtes Web :

```
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

**Injection manuelle d'ID de trace pour les applications Ruby**

Pour ajouter des ID de trace à votre propre enregistreur, ajoutez un formateur de log qui récupère les ID de trace avec `Datadog.tracer.active_correlation`, puis ajoutez les ID de trace au message.

Pour s'assurer du bon fonctionnement de la corrélation des logs, vérifiez que les éléments suivants sont inclus dans chaque message :

 - `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `Datadog.tracer.active_correlation.trace_id` ou `0` en l'absence de trace active lors de la journalisation.
 - `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `Datadog.tracer.active_correlation.span_id` ou `0` en l'absence de trace active lors de la journalisation.

Par défaut, `Datadog::Correlation::Identifier#to_s` renvoie `dd.trace_id=<ID_TRACE> dd.span_id=<ID_SPAN>`.

Voici un exemple pour illustrer cela :

```ruby
require 'ddtrace'
require 'logger'

logger = Logger.new(STDOUT)
logger.progname = 'mon_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# Lorsqu'aucune trace n'est active
logger.warn('Cette opération n'est pas tracée.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=0 dd.span_id=0] Cette opération n'est pas tracée.

# Lorsqu'une trace est active
Datadog.tracer.trace('my.operation') { logger.warn('Cette opération est tracée.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] Cette opération est tracée.
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][2] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

Consultez la [documentation relative à la journalisation Ruby][2] pour vérifier que l'intégration de log Ruby est bien configurée et que vos logs Ruby sont automatiquement analysés.

[1]: https://docs.datadoghq.com/fr/logs/log_collection/ruby
[2]: https://docs.datadoghq.com/fr/logs/log_collection/ruby/#configure-the-datadog-agent
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Go" %}}

Utilisez l'exemple suivant pour injecter des informations de trace Go dans vos logs.

**Injection manuelle d'ID de trace pour Go**

Le traceur Go expose deux appels d'API afin d'autoriser l'affichage des identificateurs de span et de trace avec les déclarations de log, à l'aide des méthodes exportées à partir du type `SpanContext` :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Récupérer l'ID de trace et l'ID de span.
    traceID := span.Context().TraceID()
    spanID := span.Context().SpanID()

    // Les ajouter aux messages de log en tant que champs :
    log.Printf("mon message de log dd.trace_id=%d dd.span_id=%d", traceID, spanID)
}
```

L'exemple ci-dessus explique comment utiliser le contexte de la span dans le paquet `log` de la bibliothèque standard. Cette même logique peut s'appliquer aux paquets tiers.


**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][2].

[1]: https://docs.datadoghq.com/fr/tracing/languages/go/#configuration
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Node.js" %}}

Utilisez l'une des options suivantes pour injecter des informations de trace Node dans vos logs.

**Injection automatique d'ID de trace avec les bibliothèques de journalisation prises en charge (conseillé)**

Activez l'injection avec la variable d'environnement `DD_LOGS_INJECTION=true` ou en configurant directement le traceur :

```javascript
const tracer = require('dd-trace').init({
  logInjection: true
})
```

Cela active l'injection automatique d'ID de trace pour `winston`, `bunyan` et `pino`.

**Remarque** : l'injection automatique fonctionne uniquement pour les logs au format JSON.

**Injection manuelle d'ID de trace pour les logs au format JSON**

Si votre bibliothèque de journalisation n'est pas compatible avec l'injection automatique, mais que vous utilisez des logs au format JSON, vous pouvez effectuer une injection manuelle directement dans votre code.

Exemple d'utilisation de `console` comme enregistreur sous-jacent :

```javascript
const tracer = require('dd-trace')

class Logger {
  log (level, message) {
    const span = tracer.scope().active()
    const time = (new Date()).toISOString()
    const record = { time, level, message }

    if (span) {
      tracer.inject(span.context(), record)
    }

    console.log(record)
  }
}

module.exports = Logger
```

**Injection manuelle d'ID de trace pour les logs au format brut**

Pour s'assurer du bon fonctionnement de la corrélation des logs, vérifiez que les éléments suivants sont inclus dans chaque entrée de log :

- `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `tracer.scope().active().context().toTraceId()`.
- `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `tracer.scope().active().context().toSpanId()`.

Vous devez inclure ces deux chaînes de caractères, ou les ajouter en préfixe, directement dans le message de l'entrée du log. Cela vous permet de corréler la trace et les logs sans avoir à modifier vos règles de parsing.

Exemple d'utilisation de `console` comme enregistreur sous-jacent :

```javascript
const tracer = require('dd-trace').init()

class Logger {
  log (level, message) {
    const span = tracer.scope().active()
    const time = (new Date()).toISOString()
    const format = '[%s] [%s] - dd.trace_id=%s dd.span_id=%s %s'

    let traceId = ''
    let spanId = ''

    if (span) {
      traceId = span.context().toTraceId()
      spanId = span.context().toSpanId()
    }

    console.log(format, time, level.toUpperCase(), traceId, spanId, message)
  }
}

module.exports = Logger
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][2].


[1]: https://docs.datadoghq.com/fr/logs/log_collection/nodejs
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab ".NET" %}}

Prochainement disponible. Contactez [l'équipe d'assistance Datadog][1] pour participer à la bêta.

[1]: /fr/help
{{% /tab %}}
{{% tab "PHP" %}}

Utilisez l'exemple suivant pour injecter des informations de trace PHP dans vos logs.

**Injection manuelle d'ID de trace**

```php
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
$append = sprintf(
    ' [dd.trace_id=%d dd.span_id=%d]',
    $span->getTraceId(),
    $span->getSpanId()
);
my_error_logger('Message d'erreur.' . $append);
```

Si l'enregistreur implémente la [bibliothèque **monolog/monolog**][1], utilisez `Logger::pushProcessor()` pour ajouter automatiquement les identificateurs aux messages de log :

```php
$logger->pushProcessor(function ($record) {
    $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
    if (null === $span) {
        return $record;
    }
    $record['message'] .= sprintf(
        ' [dd.trace_id=%d dd.span_id=%d]',
        $span->getTraceId(),
        $span->getSpanId()
    );
    return $record;
});
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][2] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

[1]: https://github.com/Seldaek/monolog
[2]: https://docs.datadoghq.com/fr/logs/log_collection/php
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{< /tabs >}}

## Debugging

Les réglages de debugging de Datadog sont utilisés pour détecter les problèmes ou vérifier les données de trace.

Nous vous déconseillons d'activer le mode debugging sur vos systèmes de production, car cela augmente le nombre d'événements envoyés à vos enregistreurs. Utilisez avec parcimonie cette fonctionnalité, uniquement à des fins de debugging.

{{< tabs >}}
{{% tab "Java" %}}

Pour renvoyer des logs de debugging au niveau des applications, activez le mode debugging avec le flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` lors du démarrage de la JVM.

{{% /tab %}}
{{% tab "Python" %}}

Le debugging est désactivé par défaut.

Pour l'activer, définissez la variable d'environnement `DATADOG_TRACE_DEBUG=true` lorsque vous utilisez `ddtrace-run`.
{{% /tab %}}
{{% tab "Ruby" %}}

Le mode debugging est désactivé par défaut. Pour l'activer :

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**Logs d'application** :

Par défaut, tous les logs sont traités par l'enregistreur Ruby de base. Lorsque vous utilisez Rails, les messages s'affichent dans le fichier de log de votre application.

Les messages de log du client Datadog sont indiqués par `[ddtrace]`. Vous pouvez donc les isoler des autres messages.

De plus, vous pouvez remplacer l'enregistreur par défaut et le remplacer par un enregistreur personnalisé. Pour ce faire, utilisez l'attribut ``log`` du traceur.

```ruby
f = File.new("<NOMFICHIER>.log", "w+")           # Les messages de log doivent être ici
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Remplacement du traceur par défaut
end

Datadog::Tracer.log.info { "Ceci est généralement appelé par le code de tracing" }
```

Consultez [la documentation relative à l'API][1] pour en savoir plus.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{% /tab %}}
{{% tab "Go" %}}

Le mode debugging sur le traceur peut être activé en tant que configuration `Start`, ce qui entraîne une journalisation plus détaillée :

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{% /tab %}}

{{% tab "Node.js" %}}

Le mode debugging est désactivé par défaut. Pour l'activer :

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**Logs d'application** :

Par défaut, la journalisation à partir de cette bibliothèque est désactivée. Pour obtenir les informations de debugging et les erreurs envoyées aux logs, les options `debug` doivent être définies sur `true` dans la méthode [init()][1].


Le traceur enregistre ensuite les informations de debugging dans `console.log()` et les erreurs dans `console.error()`. Ce comportement peut être modifié en transmettant un enregistreur personnalisé au traceur. Celui-ci doit contenir des méthodes `debug()` et `error()` qui peuvent gérer respectivement des messages et des erreurs.

Par exemple :

```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

const tracer = require('dd-trace').init({
  logger: {
    debug: message => logger.trace(message),
    error: err => logger.error(err)
  },
  debug: true
})
```

Pour obtenir davantage de réglages pour le traceur, consultez la [documentation relative à l'API][2].


[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{% /tab %}}
{{% tab ".NET" %}}

Le mode debugging est désactivé par défaut. Pour l'activer, définissez l'argument `isDebugEnabled` sur `true` lors de la création d'une nouvelle instance de traceur :

```csharp
var tracer = Datadog.Trace.Tracer.Create(isDebugEnabled: true);
```

{{% /tab %}}
{{% tab "PHP" %}}

Le mode debugging est désactivé par défaut. Pour l'activer, définissez la variable d'environnement `DD_TRACE_DEBUG=true`. Consultez la [documentation de configuration][1] PHP pour découvrir comment et quand cette valeur de variable d'environnement doit être définie afin d'être
gérée de façon adéquate par le traceur.

Pour indiquer à PHP où placer les messages `error_log`, vous pouvez définir l'emplacement au niveau du serveur, ou en tant que paramètre `ini` PHP. Cette dernière option constitue la solution standard pour configurer le comportement PHP.

Si vous exploitez un serveur Apache, utilisez la directive `ErrorLog`.
Si vous exploitez un serveur NGINX, utilisez la directive `error_log`.
Si vous effectuez une configuration au niveau de PHP, utilisez le paramètre ini `error_log` de PHP.

[1]: http://php.net/manual/en/install.php
{{% /tab %}}
{{% tab "C++" %}}

Les bibliothèques binaires partagées sont toutes compilées en ajoutant des symboles de debugging à la version optimisée. Vous pouvez utiliser gdb ou lldb pour effectuer le debugging de la bibliothèque et lire les vidages principaux. Si vous créez la bibliothèque depuis les sources, transmettez l'argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` à cmake afin de compiler un build optimisé avec les symboles de debugging.

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{% /tab %}}
{{< /tabs >}}

## Sécurité

Vous pouvez nettoyer [automatiquement](#nettoyage-automatique) ou [manuellement](#nettoyage-manuel) les informations sensibles de vos traces.

#### Nettoyage automatique

Le nettoyage automatique est disponible pour certains services, comme ElasticSearch, MongoDB, Redis, Memcached et un serveur HTTP, ainsi que pour les URL de requête client. Vous trouverez ci-dessous un exemple de snippet de configuration pour toutes les options disponibles.

```yaml
apm_config:
  # Définit les règles d'obfuscation pour les données sensibles. Désactivé par défaut.
  obfuscation:
    # Règles d'obfuscation ElasticSearch. S'appliquent aux spans de type « elasticsearch »,
    # et plus précisément au tag « elasticsearch.body ».
    elasticsearch:
      enabled: true
      # Les valeurs des clés répertoriées ici ne feront pas l'objet d'une obfuscation.
      keep_values:
        - client_id
        - product_id

    # Règles d'obfuscation MongoDB. S'appliquent aux spans de type « mongodb », 
    # et plus précisément au tag « mongodb.query ».
    mongodb:
      enabled: true
      # Les valeurs des clés répertoriées ici ne feront pas l'objet d'une obfuscation.
      keep_values:
        - document_id
        - template_id

    # Règles d'obfuscation HTTP pour les tags « http.url » dans les spans de type « http ».
    http:
      # Si ce paramètre est défini sur true, les strings de requête dans les URL feront l'objet d'une obfuscation.
      remove_query_string: true
      # Si ce paramètre est défini sur true, les segments de chemin dans les URL contenant des nombres seront remplacés par le caractère « ? ».
      remove_paths_with_digits: true

    # Si cette option est activée, les traces de pile seront supprimées (remplacées par le caractère « ? »).
    remove_stack_traces: true

    # Règles d'obfuscation pour les spans de type « redis ». S'appliquent aux tags « redis.raw_command ».
    redis:
      enabled: true

    # Règles d'obfuscation pour les spans de type « memcached ». S'applique au tag « memcached.command ».
    memcached:
      enabled: true
```

#### Règles de remplacement

Pour nettoyer les données sensibles des tags de votre span, utilisez l'option `replace_tags`. Il s'agit d'une liste contenant un ou plusieurs paramètres qui expliquent comment remplacer les données sensibles au sein de vos tags. Les différents paramètres sont :

* `name` : la clé du tag à remplacer. Pour inclure tous les tags, utilisez le caractère `*`. Pour inclure la ressource, utilisez `nom.ressource`.
* `pattern` : l'expression régulière à utiliser.
* `repl`: la chaîne de remplacement.

Par exemple :

```yaml
apm_config:
  replace_tags:
    # Remplacer tous les nombres suivant la chaîne `token/` dans le tag « http.url » par le caractère « ? » :
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Remplacer toutes les occurrences de « foo » dans tous les tags par « bar » :
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Remplacer toutes les valeurs du tag « error.stack ».
    - name: "error.stack"
      pattern: "(?s).*"
```

[1]: /fr/tagging
[2]: /fr/tracing/visualization/services_list
[3]: http://opentracing.io
[4]: #priority-sampling
[5]: /fr/tracing/getting_further/trace_sampling_and_storage
[6]: /fr/logs/log_collection/?tab=tailexistingfiles#send-your-application-logs-in-json
[7]: /fr/logs/log_collection/?tab=tailexistingfiles#enabling-log-collection-from-integrations