---
aliases:
- /fr/llm_observability/guide/llm_observability_and_apm
- /fr/llm_observability/monitoring/llm_observability_and_apm/
description: Apprenez à naviguer entre les spans d'Agent Observability et les spans
  d'APM afin d'obtenir des informations sur les opérations spécifiques aux LLM et
  sur votre écosystème applicatif plus large.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: Documentation
  text: En savoir plus sur les spans d'Agent Observability
- link: /glossary/#span/
  tag: Documentation
  text: En savoir plus sur les spans d'APM
- link: https://www.datadoghq.com/blog/troubleshooting-rag-llms/
  tag: Blog
  text: Dépannage des applications LLM basées sur le RAG
- link: https://learn.datadoghq.com/courses/llm-obs-investigations
  tag: Centre d'apprentissage
  text: Enquêter avec le LLM Observability
title: Corrélation entre Agent Observability et APM
---
## Présentation {#overview}

Ce guide explique comment utiliser à la fois Agent Observability et APM pour corréler les [spans][6] d'Agent Observability et d'APM dans Datadog. 

En instrumentant vos opérations spécifiques aux LLM avec Agent Observability et votre application plus large avec APM, vous pouvez accomplir ce qui suit :



* Comprendre la visibilité de bout en bout : explorez les requêtes en amont et en aval de vos applications LLM dans le contexte de l'ensemble de votre application.
* Depuis APM, plongez plus profondément dans Agent Observability : déterminez si un problème avec votre application est spécifique aux applications LLM, comme un appel à OpenAI.

## Configuration {#setup}

Le SDK Agent Observability est basé sur le dd-tracer d'APM. Cela vous permet d'utiliser Agent Observability avec [Application Performance Monitoring (APM)][7]

Si vous utilisez le [SDK Agent Observability pour Python][1] avec [`dd-tracer`][2] d'APM, vous pouvez naviguer entre les spans dans Datadog APM et Agent Observability sans configuration supplémentaire.

Si vous utilisez l'[API Agent Observability][3] avec `dd-tracer` pour APM :

1. Utilisez la méthode appropriée pour obtenir l'ID de span à partir du traceur (par exemple, en utilisant `span.Context().SpanID()` pour le traceur Go).
1. Incluez les IDs de span capturés dans toutes les requêtes de l'API Agent Observability. Cela lie les spans APM et Agent Observability dans Datadog.

## Naviguez entre les spans {#navigate-between-spans}

En utilisant cette intégration, vous pouvez corréler les données de votre pile applicative et comprendre comment vos applications LLM interagissent avec d'autres composants. Vous pouvez également résoudre les problèmes plus rapidement et optimiser les performances de votre application.

{{< img src="llm_observability/guides/apm/end_to_end_tracing.mp4" alt="Cette vidéo montre la possibilité de naviguer entre les spans d'Agent Observability et les spans d'APM dans Datadog" style="width:100%" video=true >}}

### De Agent Observability à APM {#from-agent-observability-to-apm}

Pour comprendre le contexte plus large de vos opérations LLM au sein de votre écosystème applicatif, sélectionnez un span d'Agent Observability dans l'[Agent Observability Explorer][4] et cliquez sur {{< ui >}}APM span{{< /ui >}} pour accéder au span APM correspondant.

{{< img src="llm_observability/guides/apm/llm_span.png" alt="Un span d'Agent Observability avec un span APM associé vers lequel vous pouvez naviguer depuis la page Traces d'Agent Observability." style="width:100%;" >}}

### De APM à Agent Observability {#from-apm-to-agent-observability}

Pour accéder aux informations spécifiques aux LLM, sélectionnez un span APM dans l'[Trace Explorer][5] et cliquez sur {{< ui >}}View Span{{< /ui >}} dans la section Agent Observability sous l'onglet {{< ui >}}Info{{< /ui >}} pour accéder au span Agent Observability correspondant.

{{< img src="llm_observability/guides/apm/apm_span.png" alt="Un span APM avec un span Agent Observability associé vers lequel vous pouvez naviguer depuis la page Traces d'APM." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/llm_observability/setup/sdk/
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[3]: /fr/llm_observability/setup/api/
[4]: https://app.datadoghq.com/llm/traces
[5]: https://app.datadoghq.com/apm/traces
[6]: /fr/llm_observability/quickstart/terms/#spans
[7]: /fr/tracing