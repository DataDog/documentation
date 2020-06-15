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
## Injection automatique d'ID de trace

Utilisez l'une des options suivantes pour injecter des informations de trace Ruby dans vos logs :

- [Injection automatique d'ID de trace pour les applications Rails à l'aide de Lograge (recommandé)](?tab=lograge).
- [Injection automatique d'ID de trace pour les applications Rails par défaut](?tab=default)

{{< tabs >}}
{{% tab "Lograge" %}}

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

[1]: /fr/logs/log_collection/ruby/#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Par défaut" %}}

Les applications Rails qui sont configurées avec un logger `ActiveSupport::TaggedLogging` peuvent ajouter des ID de trace en tant que tags aux logs générés. Le logger Rails par défaut applique ce logging avec tags, ce qui simplifie l'ajout de tags de trace. 

Dans le fichier de configuration de votre environnement Rails (p. ex., `config/environments/production.rb`), ajoutez le code suivant :

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end
```

Cela ajoute les tags de trace aux requêtes Web :

```text
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```

{{% /tab %}}
{{< /tabs >}}

## Injection manuelle d'ID de trace

Pour ajouter des ID de trace à votre propre logger, ajoutez un formateur de log qui récupère les ID de trace avec `Datadog.tracer.active_correlation`, puis ajoutez les ID de trace au message.

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

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et  `dd.span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][2].

Consultez la [documentation relative à la journalisation Ruby][1] pour vérifier que l'intégration de log Ruby est bien configurée et que vos logs Ruby sont automatiquement parsés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/ruby/#configure-the-datadog-agent
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom