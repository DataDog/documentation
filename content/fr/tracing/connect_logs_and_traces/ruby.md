---
title: Associer vos logs Ruby à vos traces
kind: documentation
description: Associez vos logs Ruby à vos traces pour les mettre en corrélation dans Datadog.
further_reading:
  - link: tracing/manual_instrumentation
    tags: Enrichir vos traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tags: Enrichir vos traces
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
---
## Injecter manuellement les ID des traces et des spans

Dans de nombreux cas, par exemple pour le logging, il peut s'avérer utile de mettre en corrélation les ID de trace à d'autres événements ou flux de données afin de comparer ces différentes sources plus facilement. Le traceur peut générer un identifiant de corrélation pour la trace active via `active_correlation`, et cet identifiant peut ensuite être utilisé pour décorer les autres sources de données.

```ruby
# Lorsqu'une trace est active…
Datadog.tracer.trace('correlation.example') do
  # Renvoie #<Datadog::Correlation::Identifier>
  correlation = Datadog.tracer.active_correlation
  correlation.trace_id # => 5963550561812073440
  correlation.span_id # => 2232727802607726424
  correlation.env # => 'production' (récupéré à partir de DD_ENV)
  correlation.service # => 'billing-api' (récupéré à partir de DD_SERVICE)
  correlation.version # => '2.5.17' (récupérée à partir de DD_VERSION)
end

# Lorsqu'une trace n'est pas active…
correlation = Datadog.tracer.active_correlation
# Renvoie #<Datadog::Correlation::Identifier>
correlation = Datadog.tracer.active_correlation
correlation.trace_id # => 0
correlation.span_id # => 0
correlation.env # => 'production' (récupéré à partir de DD_ENV)
correlation.service # => 'billing-api' (récupéré à partir de DD_SERVICE)
correlation.version # => '2.5.17' (récupérée à partir de DD_VERSION)
```

#### Logging dans les applications Rails avec Lograge (méthode conseillée)

Après avoir [configuré Lograge dans une application Rails][1], modifiez le bloc `custom_options` dans le fichier de configuration de votre environnement (p. ex., `config/environments/production.rb`) pour ajouter les ID de trace :

```ruby
config.lograge.custom_options = lambda do |event|
  # Récupère les informations de trace pour le thread actuel
  correlation = Datadog.tracer.active_correlation

  {
    # Ajoute les ID en tant que tags au log généré
    :dd => {
      # Pour maintenir le même niveau de précision durant la sérialisation JSON, utiliser des chaînes pour les grands nombres
      :trace_id => correlation.trace_id.to_s,
      :span_id => correlation.span_id.to_s,
      :env => correlation.env.to_s,
      :service => correlation.service.to_s,
      :version => correlation.version.to_s
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

#### Logging dans les applications Rails

Les applications Rails qui sont configurées avec un logger `ActiveSupport::TaggedLogging` peuvent ajouter des ID de corrélation en tant que tags aux logs générés. Le logger Rails par défaut applique ce logging avec tags, ce qui simplifie l'ajout de tags de corrélation.

Ajoutez ce qui suit au fichier de configuration de votre environnement Rails :

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end

# Pour :
# DD_ENV = 'production' (Le nom de l'environnement dans lequel votre application est exécutée.)
# DD_SERVICE = 'billing-api' (Le nom de service par défaut de votre application.)
# DD_VERSION = '2.5.17' (La version de votre application.)

# Les requêtes Web vont générer :
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

#### Logging dans les applications Ruby

Pour ajouter des ID de corrélation à votre logger, ajoutez un formateur de log qui récupère les ID de corrélation avec `Datadog.tracer.active_correlation`, puis ajoutez les ID au message.

Pour vous assurer que vos logs Datadog sont bien mis en corrélation, vérifiez que les éléments suivants sont inclus dans chaque message de log (l'ordre doit être le même) :

 - `dd.env=<ENV>` : où `<ENV>` correspond à `Datadog.tracer.active_correlation.env`. N'incluez pas cet élément si aucun environnement n'est configuré.
 - `dd.service=<SERVICE>` : où `<SERVICE>` correspond à `Datadog.tracer.active_correlation.service`. N'incluez pas cet élément si aucun nom de service par défaut n'est configuré.
 - `dd.version=<VERSION>` : où `<VERSION>` correspond à `Datadog.tracer.active_correlation.version`. N'incluez pas cet élément si aucune version de l'application n'est configurée.
 - `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `Datadog.tracer.active_correlation.trace_id` ou `0` en l'absence de trace active lors de la journalisation.
 - `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `Datadog.tracer.active_correlation.span_id` ou `0` en l'absence de trace active lors de la journalisation.

Par défaut, `Datadog::Correlation::Identifier#to_s` renvoie `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<ID_TRACE> dd.span_id=<ID_SPAN>`.

Si une trace n'est pas active et que ni l'environnement ni la version de l'application ne sont configurés, il renvoie `dd.trace_id=0 dd.span_id=0 dd.env= dd.version=`.

Voici un exemple pour illustrer cela :

```ruby
require 'ddtrace'
require 'logger'

ENV['DD_ENV'] = 'production'
ENV['DD_SERVICE'] = 'billing-api'
ENV['DD_VERSION'] = '2.5.17'

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# Lorsqu'aucune trace n'est active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# Lorsqu'une trace est active
Datadog.tracer.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][2] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et  `dd.span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

Consultez la [documentation relative à la journalisation Ruby][2] pour vérifier que l'intégration de log Ruby est bien configurée et que vos logs Ruby sont automatiquement analysés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/logs/log_collection/ruby/
[2]: /fr/logs/log_collection/ruby/#configure-the-datadog-agent
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom