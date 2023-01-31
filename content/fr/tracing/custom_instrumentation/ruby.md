---
title: Instrumentation personnalisée avec Ruby
kind: documentation
aliases:
  - /fr/tracing/opentracing/ruby
  - /fr/tracing/manual_instrumentation/ruby
description: Instrumentez manuellement votre application Ruby afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, commencez par lire la section <a href="https://docs.datadoghq.com/tracing/setup/ruby/">Instructions de configuration Ruby</a>.
</div>

Cette page revient en détail sur les méthodes courantes d'ajout et de personnalisation de la visibilité avec Datadog APM.

## Ajout de tags

Ajoutez des [tags de span][1] personnalisés à vos [spans][2] pour personnaliser votre visibilité dans Datadog. Les tags de span sont appliqués à vos traces entrantes, ce qui vous permet de corréler le comportement observé avec des informations au niveau du code, comme le niveau du commerçant, le montant du paiement ou l'ID de l'utilisateur.

### Ajouter des tags de span personnalisés

Ajoutez des tags personnalisés à vos spans correspondant à une valeur dynamique au sein du code de votre application, comme `customer.id`.

{{< tabs >}}
{{% tab "Span active" %}}
Accédez à la [span][1] active au sein de votre code à l'aide de la méthode de votre choix. **Remarque** : si la méthode est appelée et qu'aucune span n'est active, `active_span` est `nil`.

```ruby
require 'ddtrace'

# get '/shopping_cart/:customer_id', to: 'shopping_cart#index'
class ShoppingCartController < ApplicationController
  # GET /shopping_cart
  def index
    # Récupérer la span active
    current_span = Datadog.tracer.active_span
    # customer_id -> 254889
    current_span.set_tag('customer.id', params.permit([:customer_id])) unless current_span.nil?

    # [...]
  end

  # POST /shopping_cart
  def create
    # [...]
  end
end
```

[1]: /fr/tracing/visualization/#spans
{{% /tab %}}

{{% tab "Spans instrumentées manuellement" %}}

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


[1]: /fr/tracing/visualization/#span-tags
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

Il existe deux manières de définir une erreur sur une span.

- La première consiste simplement à appeler `span.set_error` et à transmettre l'objet d'exception.
- Cela permet d'extraire automatiquement le type d'erreur, le message et la backtrace.

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  span = Datadog.tracer.trace('example.trace')
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is an exception"
rescue StandardError => error
  span = Datadog.tracer.active_span
  span.set_error(error) unless span.nil?
  raise error
ensure
  span.finish
end

example_method()
```

- La deuxième consiste à utiliser `tracer.trace`, qui définira par défaut le type d'erreur, le message et la backtrace.
- Pour configurer ce comportement, vous pouvez utiliser l'option `on_error`, qui correspond au gestionnaire invoqué lorsqu'un bloc est fourni à `trace` et que le bloc renvoie une erreur.
- L'élément Proc reçoit les arguments `span` et `error`.
- Par défaut, `on_error` définit une erreur sur la span.

Comportement par défaut : `on_error`

```ruby
require 'ddtrace'
require 'timeout'

def example_method
  puts 'some work'
  sleep(1)
  raise StandardError.new "This is a exception"
end

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```

Comportement personnalisé : `on_error`

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

Datadog.tracer.trace('example.trace', on_error: custom_error_handler) do |span|
  example_method()
end
```


## Ajout de spans

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][4]), vous pouvez choisir d'instrumenter manuellement votre code. Vous pouvez utiliser la méthode `Datadog.tracer.trace` pour tracer facilement votre code. Celle-ci peut être ajoutée autour de n'importe quel code Ruby :

Pour tracer un bloc arbitraire de code Ruby, vous pouvez utiliser la méthode `Datadog.tracer.trace` :

```ruby
Datadog.tracer.trace(name, options) do |span|
  # Incorporez le code que vous souhaitez instrumenter dans ce bloc.
  # Vous pouvez également modifier la span ici.
  # Modifiez le nom de la ressource, définissez des tags, etc.
end
```

Assurez-vous de remplacer `name` par une `string` décrivant le type d'opération effectuée (p. ex. `'web.request'` ou `'request.parse'`)

`options` est un `hash` facultatif qui accepte les paramètres suivants :

| Clé | Type | Description | Valeur par défaut |
| --- | --- | --- | --- |
| `service`     | `string` | Le nom du service auquel cette span appartient (p. ex. `'mon-service-web'`) | `default-service` du traceur, `$PROGRAM_NAME` ou `'ruby'` |
| `resource`    | `string` | Nom de la ressource ou de l'action tracée. Les traces associées à un même nom de ressource seront regroupées pour la collecte de métriques (elles resteront toutefois consultables séparément). Généralement spécifique à un domaine, tel qu'une URL, une requête, etc. (p. ex. `'Article#submit'`, `http://exemple.com/articles/list`.) | `name` de la span. |
| `span_type`   | `string` | Type de span (`'http'`, `'db'`, etc.) | `nil` |
| `child_of`    | `Datadog::Span` / `Datadog::Context` | Parent de cette span. Si aucun parent n'est spécifié, devient automatiquement la span active. | `nil` |
| `start_time`  | `Integer` | Heure d'initialisation réelle de la span. Utile dans les cas où les événements tracés se sont déjà produits. | `Time.now.utc` |
| `tags`        | `Hash` | Tags supplémentaires à ajouter à la span. | `{}` |
| `on_error`    | `Proc` | Gestionnaire invoqué lorsqu'un bloc devant être tracé renvoie une erreur. Arguments : `span` spécifiée et `error`. Définit l'erreur sur la span par défaut. | `proc { |span, error| span.set_error(error) unless span.nil? }` |

Nous vous conseillons fortement de définir un `service` et une `resource` au strict minimum. Les spans sans `service` ou `resource` (`nil`) seront ignorées par l'Agent Datadog.


### Créer manuellement une nouvelle span

Programmez la création de spans autour d'un bloc de code. Les spans créées à l'aide de cette méthode s'intègrent automatiquement aux autres mécanismes de tracing. Autrement dit, si une trace a déjà commencé, la span manuelle aura son appelant comme span parent. De la même manière, une méthode tracée appelée à partir du bloc de code associé aura la span manuelle comme parent.

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


### Post-traitement de traces

Certaines applications nécessitent que les traces soient modifiées ou filtrées avant d'être envoyées en amont. Le pipeline de processing permet aux utilisateurs de créer des *processeurs* servant à mettre en place un tel comportement.

Un processeur peut être n'importe quel objet répondant à un `#call` et acceptant `trace` comme argument (qui est un `array` de `Datadog::Span`s).

Par exemple :

```ruby
lambda_processor = ->(trace) do
  # Logique de processing…
  trace
end

class MyCustomProcessor
  def call(trace)
    # Logique de processing…
    trace
  end
end
custom_processor = MyFancyProcessor.new
```

Le bloc `#call` d'un processeur *doit* renvoyer l'objet `trace`. La valeur renvoyée est ensuite passée au processeur suivant dans le pipeline.

Ces processeurs doivent ensuite être ajoutés au pipeline via `Datadog::Pipeline.before_flush` :

```ruby
Datadog::Pipeline.before_flush(lambda_processor, custom_processor)
```

Vous pouvez également définir ces processeurs en utilisant la syntaxe de bloc abrégée pour `Datadog::Pipeline.before_flush` :

```ruby
Datadog::Pipeline.before_flush do |trace|
  trace.delete_if { |span| span.name =~ /forbidden/ }
end
```

#### Filtrage

Vous pouvez utiliser le processeur `Datadog::Pipeline::SpanFilter` pour supprimer les spans lorsque le bloc renvoie une valeur truthy :

```ruby
Datadog::Pipeline.before_flush(
  # Supprimer les spans associées à une ressource spécifique
  Datadog::Pipeline::SpanFilter.new { |span| span.resource =~ /PingController/ },
  # Supprimer les spans acheminées vers localhost
  Datadog::Pipeline::SpanFilter.new { |span| span.get_tag('host') == 'localhost' }
)
```

#### Processing

Vous pouvez utiliser le processeur `Datadog::Pipeline::SpanProcessor` pour modifier des spans :

```ruby
Datadog::Pipeline.before_flush(
  # Supprimer le texte correspondant du champ ressource
  Datadog::Pipeline::SpanProcessor.new { |span| span.resource.gsub!(/password=.*/, '') }
)
```

## Configuration de l'Agent et du client de tracing

Il existe des configurations supplémentaires possibles à la fois pour le client de tracing et l'Agent Datadog pour la propagation en contexte avec les en-têtes B3, ainsi que pour exclure des ressources spécifiques de l'envoi de traces à Datadog si vous ne voulez pas de ces traces dans les métriques calculées, comme les checks de santé.


### Extraction et injection d'en-têtes B3

Le traceur de l'APM Datadog prend en charge [l'extraction et l'injection d'en-têtes B3][5] pour le tracing distribué.

L'injection et l'extraction distribuées d'en-têtes sont contrôlées en configurant des styles d'injection/extraction. Deux styles sont actuellement pris en charge :

- Datadog : `Datadog`
- B3 : `B3`

Les styles d'injection peuvent être configurés via :

- Variable d'environnement : `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

La valeur de la variable d'environnement est une liste de styles d'en-tête séparés par des virgules et qui sont activés pour l'injection. Par défaut, seul le style d'injection Datadog est activé.

Les styles d'extraction peuvent être configurés via :

- Variable d'environnement : `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

La valeur de la variable d'environnement est une liste de styles d'en-tête séparés par des virgules et qui sont activés pour l'extraction. Par défaut, seul le style d'extraction Datadog est activé.

Si plusieurs styles d'extraction sont activés, une tentative d'extraction est effectuée dans l'ordre selon lequel ces styles ont été configurés, et la première valeur extraite avec succès est utilisée.

### Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, accédez à la page [Securité][6].

## OpenTracing

Pour en savoir plus sur la configuration de Datadog avec OpenTracing, consultez la section [Démarrage rapide pour OpenTracing][7] de la documentation dédiée à Ruby.

### Configuration des paramètres du traceur Datadog

Le traceur Datadog sous-jacent peut être configuré en passant des options (qui correspondent à `Datadog::Tracer`) lors de la configuration du traceur global :

```ruby
# Où `options` correspond à un hash d'options spécifiées à Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

Il peut également être configuré en utilisant `Datadog.configure`, tel que décrit dans la section [Paramètres du traceur Ruby][8].

### Activation et configuration des intégrations

Par défaut, la configuration d'OpenTracing avec Datadog n'active aucune instrumentation supplémentaire assurée par Datadog. Vous ne recevrez que les [spans][2] et les [traces][9] provenant de l'instrumentation OpenTracing intégrée à votre application.

Cependant, des instrumentations supplémentaires fournies par Datadog peuvent être activées aux côtés d'OpenTracing à l'aide de `Datadog.configure`, afin d'optimiser encore plus votre tracing. Pour ce faire, consultez la section [Instrumentation d'intégration Ruby][10] pour obtenir plus de détails.

### Formats de sérialisation pris en charge

| Type                           | Prise en charge | Informations supplémentaires                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Oui        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Oui        | En raison de la perte de résolution liée au format Rack, veuillez noter que les majuscules dans les noms d'éléments transmis lors de l'aller-retour doivent être remplacées par des minuscules, et le caractère `-` par le caractère  `_`. Datadog recommande d'éviter l'utilisation de ces caractères ou de prévoir une étape pour y remédier au niveau du destinataire. |
| `OpenTracing::FORMAT_BINARY`   | Non         |                                                                                                                                                                                                                                                                                                               |

## OpenTelemetry

La prise en charge d'OpenTelemetry est disponible via le gem `opentelemetry-exporters-datadog` pour exporter les traces d'OpenTelemetry vers Datadog.

<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta. <a href="https://docs.datadoghq.com/help/">Contactez l'assistance</a> si elle ne fonctionne pas correctement.
</div>

### Installation

- Si vous utilisez [Bundler][11], incluez ce qui suit dans votre `Gemfile` :

```
gem 'opentelemetry-exporters-datadog'
gem 'opentelemetry-api', '~> 0.5'
gem 'opentelemetry-sdk', '~> 0.5'
```

- Vous pouvez également installer les gems directement comme suit :

```
gem install opentelemetry-api
gem install opentelemetry-sdk
gem install opentelemetry-exporters-datadog
```

### Utilisation

Installez le processeur et l'exportateur Datadog dans votre application et configurez les options. Ensuite, utilisez les interfaces OpenTelemetry pour générer des traces et d'autres informations :

```ruby
require 'opentelemetry/sdk'
require 'opentelemetry-exporters-datadog'

# Configurer le SDK avec l'exportation personnalisée
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service', agent_url: 'http://localhost:8126'
      )
    )
  )
end

# Pour la propagation des en-têtes de tracing distribué spécifiques à Datadog,
# définir la propagation HTTP sur le propagateur composite
OpenTelemetry::Exporters::Datadog::Propagator.auto_configure

# Pour lancer une trace, obtenez un traceur auprès du fournisseur de traceurs
tracer = OpenTelemetry.tracer_provider.tracer('my_app_or_gem', '0.1.0')

# créer une span
tracer.in_span('foo') do |span|
  # définir un attribut
  span.set_attribute('platform', 'osx')
  # ajouter un événement
  span.add_event(name: 'event in bar')
  # créer un bar en tant qu'enfant de foo
  tracer.in_span('bar') do |child_span|
    # inspecter la span
    pp child_span
  end
end
```

### Options de configuration

Si nécessaire, l'URL de l'Agent Datadog et les valeurs des tags de span peuvent être configurées en fonction de l'emplacement de l'Agent et de votre environnement.

#### URL de l'Agent Datadog

Par défaut, l'exportateur Datadog pour OpenTelemetry envoie les traces à l'URL `http://localhost:8126`. Pour les envoyer vers une autre URL, configurez les variables d'environnement suivantes :

- `DD_TRACE_AGENT_URL` : le `<host>:<port>` où l'Agent Datadog écoute les traces. Par exemple, `http://agent-host:8126`.

Vous pouvez également remplacer ces valeurs au niveau de l'exportateur de traces :

```ruby
# Configurer le SDK avec l'exportation personnalisée
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://dd-agent:8126',
      )
    )
  )
end
```

#### Tagging

Configurez l'application de façon à taguer automatiquement vos traces exportées en configurant les variables d'environnement suivantes :

- `DD_ENV` : l'environnement de votre application (p. ex. `production`, `staging`).
- `DD_SERVICE` : le nom de service par défaut de votre application (p. ex. `billing-api`).
- `DD_VERSION` : la version de votre application (p. ex. `2.5`, `202003181415` ou `1.3-alpha`).
- `DD_TAGS` : tags personnalisés sous forme de paires de valeurs séparées par des virgules (p. ex. `layer:api,team:intake`).
- Si la variable `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` est définie, tout tag `env`, `service` ou `version` correspondant défini dans `DD_TAGS` sera remplacé.
- Si les variables `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ne sont _pas_ définies, vous pouvez configurer un environnement, un service et une version en utilisant des tags correspondants dans `DD_TAGS`.

Les valeurs de tag peuvent également être remplacées au niveau de l'exportateur de traces. Cela vous permet de définir des valeurs différentes pour chaque application. De cette façon, il est possible de recevoir des données à partir de plusieurs applications issues d'environnements différents sur un même host :

```ruby
# Configurer le SDK avec l'exportation personnalisée
OpenTelemetry::SDK.configure do |c|
  c.add_span_processor(
    OpenTelemetry::Exporters::Datadog::DatadogSpanProcessor.new(
      OpenTelemetry::Exporters::Datadog::Exporter.new(
        service_name: 'my_service',
        agent_url: 'http://localhost:8126',
        env: 'prod',
        version: '1.5-alpha',
        tags: 'team:ops,region:west'
      )
    )
  )
end
```

Les tags qui sont définis directement sur des spans spécifiques remplacement les tags définis au niveau de l'application en cas de conflit.

### Liens OpenTelemetry

- Consultez [Rubygems][12] ou [GitHub][13] pour en savoir plus sur l'utilisation de l'exportateur Datadog pour OpenTelemetry dans une application Ruby.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#span-tags
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/setup/ruby/#environment-and-tags
[4]: /fr/tracing/compatibility_requirements/ruby/
[5]: https://github.com/openzipkin/b3-propagation
[6]: /fr/tracing/security
[7]: /fr/tracing/setup/ruby/#quickstart-for-opentracing
[8]: /fr/tracing/setup/ruby/#tracer-settings
[9]: /fr/tracing/visualization/#trace
[10]: /fr/tracing/setup/ruby/#integration-instrumentation
[11]: https://bundler.io
[12]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[13]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby