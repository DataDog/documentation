---
further_reading:
- link: /tracing/trace_collection/otel_instrumentation/
  tag: Documentation
  text: Instrumentation personnalisée avec l'API OpenTelemetry
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentation
  text: Propagation du contexte des traces dans Datadog
kind: guide
title: Interopérabilité des traces instrumentées par l'API OpenTelemetry et par Datadog
---

## Instrumentation personnalisée avec l'API OpenTelemetry

Les bibliothèques de tracing Datadog permettent d'implémenter l'[API OpenTelemetry][101] afin d'instrumenter votre code. Cela signifie que vous pouvez continuer à instrumenter vos services sans dépendre d'un fournisseur, tout en tirant parti des fonctionnalités, des solutions et des capacités d'implémentation natives de Datadog.

Lorsque vous instrumentez votre code avec l'[API OpenTelemetry][2] :

- Votre code ne contient aucun appel d'API propre à un fournisseur.
- Votre code ne dépend pas des bibliothèques de tracing Datadog pendant la compilation (uniquement pendant l'exécution).
- Votre code n'utilise pas l'API OpenTracing obsolète.

Remplacez le SDK OpenTelemetry par la bibliothèque de tracing Datadog dans l'application instrumentée, de manière à ce que les traces générées par votre code exécuté puissent être traitées, analysées et surveillées en même temps que les traces Datadog, y compris dans les solutions propriétaires de Datadog, telles que le [profileur en continu][3], les [live processes][6], ainsi que les solutions [Data Streams Monitoring][4] et [Application Security Management][5].

## Propagation du contexte des traces W3C

Pour faciliter la gestion transparente des données de trace OpenTelemetry dans Datadog et leur mise en corrélation avec les données de trace générées par l'instrumentation Datadog, les versions les plus récentes des bibliothèques de tracing Datadog prennent par défaut en charge les [styles de propagation de Datadog (`datadog`) et de W3C (`tracecontext`)][8]. [Installez la version la plus récente des dépendances runtime de vos bibliothèques de tracing][7].

Ce style de propagation du contexte permet aux traceurs Datadog d'agir au sein du même environnement d'application que celui des SDK OpenTelemetry et d'autres traceurs de conformité W3C.


## ID de trace de 128 bits

Les traces W3C contiennent des ID de trace de 128 bits, et ce de façon implicite, à la place des traditionnels ID de trace de 64 bits utilisés par les traces Datadog. La configuration par défaut des dernières bibliothèques de tracing Datadog comporte le paramètre `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True`. Ainsi, ces bibliothèques génèrent également des données dotées d'ID de trace de 128 bits.

Conformément aux [recommandations relatives au contexte des traces W3C][9], les ID de trace Datadog de 128 bits intègrent un facteur aléatoire pour les 64 bits inférieurs. Cette restriction vise à fournir une rétrocompatibilité pour les systèmes qui combinent des bibliothèques générant des ID de trace de 64 bits et des bibliothèques plus récentes prenant en charge les ID de 128 bits. Dans de tels systèmes, les spans comportant des ID de trace complets de 128 bits et celles comportant des ID de trace tronqués de 64 bits peuvent atteindre le backend et être traitées sans aucune discrimination, au sein d'une trace unique.

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="Les ID de trace de 128 bits, ainsi que le contexte des traces, peuvent être transmis au code dont la bibliothèque de tracing génère des ID de trace de 64 bits. Datadog se charge ensuite de mettre en corrélation ces différents ID de trace dans le backend." style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[2]: /fr/tracing/trace_collection/otel_instrumentation/
[3]: /fr/profiler/
[4]: /fr/data_streams/
[5]: /fr/security/application_security/
[6]: /fr/infrastructure/process
[7]: /fr/tracing/trace_collection/dd_libraries/
[8]: /fr/tracing/trace_collection/trace_context_propagation/
[9]: https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers