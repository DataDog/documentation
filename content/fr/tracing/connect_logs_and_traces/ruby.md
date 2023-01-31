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

Pour les applications Rails utilisant le logger par défaut (`ActiveSupport::TaggedLogging`), `lograge` ou `semantic_logger`, l'injection des informations de mise en corrélation des traces est automatiquement configurée.

#### Injection manuelle

Pour ajouter des ID de corrélation à votre logger, ajoutez un formateur de log qui récupère les ID de corrélation avec `Datadog::Tracing.correlation`, puis ajoutez les ID au message.

Pour vous assurer que vos logs Datadog sont bien mis en corrélation, vérifiez que les éléments suivants sont inclus dans chaque message de log (l'ordre doit être le même) :

 - `dd.env=<ENVIRONNEMENT>` : `<ENVIRONNEMENT>` correspond à `Datadog::Tracing.correlation.env`. N'incluez pas cet élément si aucun environnement n'est configuré.
 - `dd.service=<SERVICE>` : `<SERVICE>` correspond à `Datadog::Tracing.correlation.service`. N'incluez pas cet élément si aucun nom de service par défaut n'est configuré.
 - `dd.version=<VERSION>` : `<VERSION>` correspond à `Datadog::Tracing.correlation.version`. N'incluez pas cet élément si aucune version de l'application n'est configurée.
 - `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `Datadog::Tracing.correlation.trace_id` ou `0` en l'absence de trace active lors de la journalisation.
 - `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `Datadog::Tracing.correlation.span_id` ou `0` en l'absence de trace active lors de la journalisation.

Par défaut, `Datadog::Tracing.log_correlation` renvoie `dd.env=<ENVIRONNEMENT> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<ID_TRACE> dd.span_id=<ID_SPAN>`.

Si aucune trace n'est active et que ni l'environnement ni la version de l'application ne sont configurés, `Datadog::Tracing.log_correlation` renvoie `dd.service= dd.trace_id=0 dd.span_id=0`.

Voici un exemple pour illustrer cela :

```ruby
require 'ddtrace'
require 'logger'

Datadog.configure do |c|
  c.env = 'production'
  c.service = 'billing-api'
  c.version = '2.5.17'
end

logger = Logger.new(STDOUT)
logger.progname = 'my_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog::Tracing.log_correlation}] #{msg}\n"
end

# Lorsqu'aucune trace n'est active
logger.warn('This is an untraced operation.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=0 dd.span_id=0] This is an untraced operation.

# Lorsqu'une trace est active
Datadog::Tracing.trace('my.operation') { logger.warn('This is a traced operation.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.env=production dd.service=billing-api dd.version=2.5.17 dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] This is a traced operation.
```
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/ruby/