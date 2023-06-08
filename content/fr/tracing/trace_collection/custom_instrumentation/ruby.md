---
aliases:
- /fr/tracing/opentracing/ruby
- /fr/tracing/manual_instrumentation/ruby
- /fr/tracing/custom_instrumentation/ruby
- /fr/tracing/setup_overview/custom_instrumentation/ruby
code_lang: ruby
code_lang_weight: 20
description: Instrumentez manuellement votre application Ruby afin d'envoyer des traces
  personnalisées à Datadog.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentation
  text: Associer vos logs à vos traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
kind: documentation
title: Instrumentation Ruby personnalisée avec la bibliothèque Datadog
type: multi-code-lang
---
<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, lisez la section <a href="https://docs.datadoghq.com/tracing/setup/ruby/">Tracer des applications Ruby</a>.
</div>

Cette page décrit les méthodes à suivre pour configurer et personnaliser l'observabilité avec la solution APM Datadog.

## Ajout de tags

Ajoutez des [tags de span][1] personnalisés à vos [spans][2] pour personnaliser la visibilité sur vos applications dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement ou l'ID de l'utilisateur.

### Ajouter des tags de span personnalisés

Ajoutez des tags personnalisés à vos spans correspondant à une valeur dynamique au sein du code de votre application, comme `customer.id`.

{{< tabs >}}
{{% tab "Span active" %}}
Accédez à la [span][1] active pour n'importe quelle méthode dans votre code.

**Remarque** : si la méthode est appelée et qu'aucune span est active, `active_span` renvoie `nil`.

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Récupérer la span active et définir customer_id -> 254889
    Datadog::Tracing.active_span&.set_tag('customer.id', params.permit([:customer_id]))

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /fr/tracing/glossary/#spans
{{% /tab %}}

{{% tab "Spans instrumentées manuellement" %}}

Ajoutez directement des [tags][1] aux objets `Datadog::Span` en appelant `#set_tag` :

```ruby
# Un exemple d'endpoint Sinatra,
# avec le tracing Datadog autour de la requête.
get '/posts' do
  Datadog::Tracing.trace('web.request') do |span|
    span.set_tag('http.url', request.path)
    span.set_tag('<CLÉ_TAG>', '<VALEUR_TAG>')
  end
end
```


[1]: /fr/tracing/glossary/#span-tags
{{% /tab %}}
{{< /tabs >}}

### Ajouter des tags à l'ensemble des spans

Ajoutez des [tags][1] à l'ensemble des [spans][2] en configurant l'option `tags` du traceur :

```ruby
Datadog.configure do |c|
  c.tags = { 'team' => 'qa' }
end
```

Vous pouvez aussi utiliser la variable d'environnement `DD_TAGS` pour définir des tags sur toutes les spans d'une application. Pour en savoir plus sur les variables d'environnement Ruby, consultez la [documentation relative à la configuration][3].

### Définir des erreurs sur une span

Il existe deux manières de définir une erreur sur une span :

- Vous pouvez appeler `span.set_error` et transmettre l'objet d'exception. Cela permet d'extraire automatiquement le type d'erreur, le message et la backtrace.

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  span = Datadog::Tracing.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
rescue StandardError => error
  Datadog::Tracing.active_span&.set_error(error)
  raise
ensure
  span.finish
end

example_method()
```

- Vous avez également la possibilité d'utiliser `tracer.trace`, qui définit par défaut le type d'erreur, le message et la backtrace. Pour ce faire, vous pouvez vous servir de l'option  `on_error`, qui définit le gestionnaire invoqué lorsqu'un bloc est fourni à `trace` et que ce bloc génère une erreur. L'élément Proc reçoit les arguments `span` et `error`. Par défaut, `on_error` définit l'erreur sur la span.

Comportement par défaut pour `on_error` :

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError, "This is an exception"
end

Datadog::Tracing.trace('example.trace') do |span|
  example_method()
end
```

Comportement personnalisé pour `on_error` :

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a special exception"
end

custom_error_handler = proc do |span, error|
  span.set_tag('custom_tag', 'custom_value')
  span.set_error(error) unless error.message.include?("a special exception")
end

Datadog::Tracing.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

## Ajout de tags

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][4]), vous pouvez instrumenter manuellement votre code. Utilisez la méthode `Datadog::Tracing.trace` pour tracer votre code. Celle-ci peut être ajoutée autour de n'importe quel code Ruby.

Pour tracer du code Ruby, vous pouvez utiliser la méthode `Datadog::Tracing.trace` :

```ruby
Datadog::Tracing.trace(name, resource: resource, **options) do |span|
  # Incorporer le code que vous souhaitez instrumenter dans ce bloc.
  # La span peut également être modifiée ici.
  # Exemple : changement de nom de ressource, définition de tags, etc.
```

`name` est une `string` décrivant le type d'opération effectuée (p. ex., `'web.request'` ou `'request.parse'`).

`resource` est une `String` correspondant au nom de l'action tracée. Les traces associées à un même nom de ressource seront regroupées pour la collecte de métriques. Les ressources sont généralement spécifiques à un domaine, tel qu'une URL, une requête, etc. Exemples : 'Article#submit', http://example.com/articles/list.

Pour obtenir la liste de toutes les `**options` disponibles, consultez le [guide de référence][5].

### Créer manuellement une nouvelle span

Programmez la création de spans autour d'un bloc de code. Les spans créées à l'aide de cette méthode s'intègrent automatiquement aux autres mécanismes de tracing. Autrement dit, si une trace a déjà commencé, la span manuelle aura son appelant comme span parent. De la même manière, une méthode tracée appelée à partir du bloc de code incorporé aura la span manuelle comme parent.

```ruby
# Un exemple d'endpoint Sinatra,
# avec le tracing Datadog autour de la requête,
# une requête de base de données et des étapes de rendu.
get '/posts' do
  Datadog::Tracing.trace('web.request', service: '<NOM_SERVICE>', resource: 'GET /posts') do |span|
    # Tracer l'appel activerecord
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Ajouter des tags APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Tracer le rendu du modèle
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

### Post-traitement de traces

Certaines applications nécessitent que les traces soient modifiées ou filtrées avant d'être envoyées à Datadog. Le pipeline de traitement vous permet de créer des *processeurs* servant à mettre en place un tel comportement.

#### Filtrage

Vous pouvez utiliser le processeur `Datadog::Tracing::Pipeline::SpanFilter` pour supprimer les spans lorsque le bloc renvoie une valeur truthy :

```ruby
Datadog::Tracing.before_flush(
  # Supprimer les spans associées à une ressource spécifique
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Supprimer les spans acheminées vers localhost
  Datadog::Tracing::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Traitement

Vous pouvez utiliser le processeur `Datadog::Tracing::Pipeline::SpanProcessor` pour modifier des spans :

```ruby
Datadog::Tracing.before_flush(
  # Supprimer le texte correspondant au champ resource
  Datadog::Tracing::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

#### Processeur personnalisé

Un processeur peut être n'importe quel objet répondant à un `#call` et acceptant `trace` comme argument (qui est un `array` de `Datadog::Span`).

Par exemple, avec une syntaxe de bloc raccourcie :

```ruby
Datadog::Tracing.before_flush do |trace|
   # Logique de traitement…
   trace
end
```

L'exemple suivant implémente un processeur afin d'appliquer une logique de post-traitement complexe :

```ruby
Datadog::Tracing.before_flush do |trace|
  trace.spans.each do |span|
    originalPrice = span.get_tag('order.price'))
    discount = span.get_tag('order.discount'))

    # Définir un tag à partir d'un calcul basé sur d'autre tags
    if (originalPrice != nil && discount != nil)
      span.set_tag('order.value', originalPrice - discount)
    end
  end
  trace
end
```

Pour une classe de processeur personnalisé :

```ruby
class MyCustomProcessor
  def call(trace)
    # Logique de traitement…
    trace
  end
end

Datadog::Tracing.before_flush(MyCustomProcessor.new)
```

Dans les deux cas, la méthode du processeur *doit* renvoyer l'objet `trace`. La valeur renvoyée est ensuite passée au processeur suivant dans le pipeline.


## Configuration de l'Agent et du client de tracing

D'autres paramètres peuvent être configurés au niveau du client de tracing et de l'Agent Datadog pour la propagation en contexte avec les en-têtes B3, ainsi que pour empêcher des ressources spécifiques d'envoyer des traces à Datadog (si vous ne souhaitez pas que ces ces traces soient prises en compte pour le calcul des métriques, comme pour les checks de santé).

### Propager le contexte avec l'injection et l'extraction d'en-têtes

Vous pouvez injecter et extraire des en-têtes afin de configurer la propagation du contexte des traces distribuées. Consultez la [section dédiée][6] pour en savoir plus.


### Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource, afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, consulter la documentation relative à la [sécurité][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/#span-tags
[2]: /fr/tracing/glossary/#spans
[3]: /fr/tracing/setup/ruby/#environment-and-tags
[4]: /fr/tracing/compatibility_requirements/ruby/
[5]: /fr/tracing/trace_collection/dd_libraries/ruby/#manual-instrumentation
[6]: /fr/tracing/trace_collection/trace_context_propagation/ruby/
[7]: /fr/tracing/security