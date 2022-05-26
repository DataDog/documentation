---
description: Associez vos logs Ruby à vos traces pour les mettre en corrélation dans
  Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Corréler automatiquement vos logs de requête avec vos traces
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
kind: documentation
title: Associer vos logs Ruby à vos traces
---

## Mise en corrélation des traces

Dans de nombreux cas, par exemple pour le logging, il peut s'avérer utile de mettre en corrélation les ID de trace à d'autres événements ou flux de données afin de comparer ces différentes sources plus facilement.

### Journalisation dans les applications Rails

#### Injection automatique

Pour les applications Rails qui utilisent le logger par défaut (`ActiveSupport::TaggedLogging`) ou `lograge`, vous pouvez activer automatiquement l'injection des informations de mise en corrélation des traces en définissant l'option de configuration de l'instrumentation `rails` intitulée `log_injection` sur `true` ou en définissant la variable d'environnement `DD_LOGS_INJECTION=true`:

```ruby
# config/initializers/datadog.rb
require 'ddtrace'

Datadog.configure do |c|
  c.use :rails, log_injection: true
end
```

**Remarque** : Rails charge les initialiseurs dans l'ordre alphabétique. Ainsi, pour les utilisateurs `lograge` qui ont également défini `lograge.custom_options` dans un fichier de configuration `initializers/lograge.rb`, il est possible que la corrélation automatique des traces ne soit pas appliquée. En effet, `initializers/datadog.rb` serait écrasé par l'initialiseur `initializers/lograge.rb`. Pour activer la corrélation automatique des traces avec un paramètre `lograge.custom_options` _existant_, utilisez la configuration [manuelle de Lograge](#Lograge) ci-dessous.

#### Injection manuelle
##### Lograge

Après avoir [configuré Lograge dans une application Rails][1], modifiez manuellement le bloc `custom_options` dans le fichier de configuration de votre environnement (par exemple, `config/environments/production.rb`) pour ajouter les ID de trace.

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

##### `ActiveSupport::TaggedLogging`

Les applications Rails configurées avec le logger `ActiveSupport::TaggedLogging` par défaut peuvent ajouter des ID de corrélation en tant que tags aux logs générés. Pour activer la mise en corrélation des traces avec `ActiveSupport::TaggedLogging`, ajoutez ce qui suit dans le fichier de configuration de votre environnement Rails :

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

### Journalisation dans les applications Ruby

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
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/ruby/