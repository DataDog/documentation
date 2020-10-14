---
title: Exigences de compatibilité C++
kind: documentation
description: Exigences de compatibilité pour le traceur C++
further_reading:
  - link: tracing/setup/cpp
    tag: Documentation
    text: Instrumenter votre application
---
## Compatibilité

La bibliothèque de tracing Datadog C++ est open source. Consultez le [référentiel GitHub][1] pour en savoir plus.

La bibliothèque requiert C++14 pour être compilée, mais si vous utilisez le [chargement dynamique][2], alors OpenTracing requiert [C++11 ou une version ultérieure][3].

Les plateformes prises en charge comprennent Linux et Mac. Pour une compatibilité avec Windows, [contactez l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-opentracing-cpp
[2]: /fr/tracing/setup/cpp/#dynamic-loading
[3]: https://github.com/opentracing/opentracing-cpp/#cc98
[4]: /fr/help/