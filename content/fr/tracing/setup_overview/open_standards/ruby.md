---
title: Standards ouverts Ruby
kind: documentation
description: Standards ouverts pour Ruby
code_lang: ruby
type: multi-code-lang
code_lang_weight: 20
---
## OpenTracing

Pour en savoir plus sur la configuration de Datadog avec OpenTracing, consultez la section [Démarrage rapide pour OpenTracing][1] de la documentation dédiée à Ruby.

### Configuration des paramètres du traceur Datadog

Le traceur Datadog sous-jacent peut être configuré en passant des options (qui correspondent à `Datadog::Tracer`) lors de la configuration du traceur global :

```ruby
# Où `options` correspond à un hash d'options spécifiées à Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

Il peut également être configuré en utilisant `Datadog.configure`, tel que décrit dans la section [Paramètres du traceur Ruby][2].

### Activation et configuration des intégrations

Par défaut, la configuration d'OpenTracing avec Datadog n'active aucune instrumentation supplémentaire assurée par Datadog. Vous ne recevrez que les [spans][3] et les [traces][4] provenant de l'instrumentation OpenTracing intégrée à votre application.

Cependant, des instrumentations supplémentaires fournies par Datadog peuvent être activées aux côtés d'OpenTracing à l'aide de `Datadog.configure`, afin d'optimiser encore plus votre tracing. Pour ce faire, consultez la section [Instrumentation d'intégration Ruby][5] pour obtenir plus de détails.

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

- Si vous utilisez [Bundler][6], incluez ce qui suit dans votre `Gemfile` :

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

Configurez l'application de façon à taguer automatiquement vos traces exportées Datadog en définissant les variables d'environnement suivantes :

- `DD_ENV` : l'environnement de votre application (p. ex. `production`, `staging`).
- `DD_SERVICE` : le nom de service par défaut de votre application (p. ex. `billing-api`).
- `DD_VERSION` : la version de votre application (p. ex. `2.5`, `202003181415` ou `1.3-alpha`).
- `DD_TAGS` : tags personnalisés sous forme de paires de valeurs séparées par des virgules (p. ex. `layer:api,team:intake`).
- Si la variable `DD_ENV`, `DD_SERVICE` ou `DD_VERSION` est définie, tout tag `env`, `service` ou `version` correspondant défini dans `DD_TAGS` sera remplacé.
- Si les variables `DD_ENV`, `DD_SERVICE` et `DD_VERSION` ne sont _pas_ définies, vous pouvez configurer l'environnement, le service et la version à l'aide des tags correspondants dans `DD_TAGS`.

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

- Consultez [rubygems][7] ou [github][8] pour en savoir plus sur l'utilisation de l'exportateur Datadog pour OpenTelemetry dans une application Ruby.

[1]: /fr/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /fr/tracing/setup/ruby/#tracer-settings
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/#trace
[5]: /fr/tracing/setup/ruby/#integration-instrumentation
[6]: https://bundler.io
[7]: https://rubygems.org/gems/opentelemetry-exporters-datadog
[8]: https://github.com/DataDog/dd-opentelemetry-exporter-ruby