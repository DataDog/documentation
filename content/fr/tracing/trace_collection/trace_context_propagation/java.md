---
code_lang: java
code_lang_weight: 0
further_reading:
- link: https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/
  tag: Blog
  text: Surveiller les applications instrumentées avec OpenTelemetry grâce à la prise
    en charge du contexte des traces W3C
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentation
  text: Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog
title: Propagation du contexte des traces Java
type: multi-code-lang
---


Le traceur APM Datadog prend en charge l'extraction et l'injection des en-têtes [B3][13] et des en-têtes de [contexte de trace W3C][14] pour le tracing distribué.

Vous pouvez configurer des styles d'injection et d'extraction pour les en-têtes distribués.

Le traceur Java prend en charge les styles suivants :

- Datadog : `datadog`
- En-tête B3 multiple : `b3multi` (l'alias `b3` est obsolète)
- Contexte de trace W3C : `tracecontext` (disponible depuis la version 1.11.0)
- En-tête B3 unique : `b3 single header` (`b3single`)

Les styles d'injection peuvent être configurés via :

- Une propriété système : `-Ddd.trace.propagation.style.inject=datadog,b3multi`
- Une variable d'environnement : `DD_TRACE_PROPAGATION_STYLE_INJECT=datadog,b3multi`

La propriété ou la variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'injection. Par défaut, les styles d'injection `datadog,tracecontext` sont activés.

Les styles d'extraction peuvent être configurés via :

- Une propriété système : `-Ddd.trace.propagation.style.extract=datadog,b3multi`
- Une variable d'environnement : `DD_TRACE_PROPAGATION_STYLE_EXTRACT=datadog,b3multi`

La propriété ou la variable d'environnement prend pour valeur une liste de styles d'en-tête séparés par des virgules (ou des espaces) qui sont activés pour l'injection. Par défaut, les styles d'extraction `datadog` et `tracecontext` sont activés avec le paramètre `datadog,tracecontext`. Ainsi, le style `datadog` est prioritaire par rapport au style `tracecontext`.

Lorsque plusieurs styles d'extraction sont configurés, la tentative d'extraction est basée sur l'ordre de configuration des styles. La première valeur extraite est utilisée. Si des contextes de trace valides sont détectés par la suite, ils sont désactivés et ajoutés sous la forme de liens de span. De plus, si le style `tracecontext` est activé, W3C Tracestate est propagé tant que W3C Traceparent correspond au contexte extrait.

Pour obtenir plus de détails sur les paramètres de propagation de contexte et sur d'autres configurations, consultez la section [Configurer la bibliothèque de tracing Java][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/library_config/java/#headers-extraction-and-injection
[13]: https://github.com/openzipkin/b3-propagation
[14]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format