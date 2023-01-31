---
title: OpenTracing Ruby
kind: documentation
description: Appliquez la norme OpenTracing au traceur de l'APM Ruby de Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Pour en savoir plus sur la configuration de Datadog avec OpenTracing, consultez la section [Démarrage rapide pour OpenTracing][1] de la documentation dédiée à Ruby.

## Configuration des paramètres du traceur Datadog

Le traceur Datadog sous-jacent peut être configuré en transmettant des options (qui correspondent à `Datadog::Tracer`) lors de la configuration du traceur global :

```ruby
# Lorsque `options` correspond à un hachage d'options fournies à Datadog::Tracer
OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new(options)
```

Il peut également être configuré en utilisant `Datadog.configure`, tel que décrit dans la section [Paramètres du traceur Ruby][2].

## Activation et configuration des intégrations

Par défaut, la configuration d'OpenTracing avec Datadog n'active aucune instrumentation supplémentaire assurée par Datadog. Vous ne recevrez que les [spans][3] et les [traces][4] provenant de l'instrumentation OpenTracing intégrée à votre application.

Cependant, des instrumentations supplémentaires fournies par Datadog peuvent être activées aux côtés d'OpenTracing à l'aide de `Datadog.configure`, afin d'optimiser encore plus votre tracing. Pour ce faire, consultez la section [Instrumentation d'intégration Ruby][5] pour obtenir plus de détails.

## Formats de sérialisation pris en charge

| Type                           | Prise en charge | Informations supplémentaires                                                                                                                                                                                                                                                                                        |
| ------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OpenTracing::FORMAT_TEXT_MAP` | Oui        |                                                                                                                                                                                                                                                                                                               |
| `OpenTracing::FORMAT_RACK`     | Oui        | En raison de la perte de résolution liée au format Rack, veuillez noter que les majuscules dans les noms d'éléments transmis lors de l'aller-retour doivent être remplacées par des minuscules, et le caractère `-` par le caractère  `_`. Datadog recommande d'éviter l'utilisation de ces caractères ou de prévoir une étape pour y remédier au niveau du destinataire. |
| `OpenTracing::FORMAT_BINARY`   | Non         |                                                                                                                                                                                                                                                                                                               |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/ruby/#quickstart-for-opentracing
[2]: /fr/tracing/setup/ruby/#tracer-settings
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/#trace
[5]: /fr/tracing/setup/ruby/#integration-instrumentation