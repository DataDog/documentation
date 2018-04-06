---
title: Liste de Traces
kind: Documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Découvrez comment configurer Tracing d'APM avec votre application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Découvrir la liste des services reportant à Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: En savoir plus sur les Services dans Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Plongez dans les performances de vos ressources et vos traces
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Comprendre comment lire une trace Datadog
---

Toutes les traces collectées par vos agents sont répertoriées dans la [page trace list][1]:

{{< img src="tracing/traces/trace_search.png" alt="Trace search UI" responsive="true" popup="true">}}

## Horizon temporel des traces

Sélectionnez l'horizon temporel que vous souhaitez afficher avec le sélecteur de temps dans le coin supérieur droit.

{{< img src="tracing/traces/traces_time_selector.png" alt="Trace search UI" responsive="true" popup="true" style="width:40%;">}}

## Filtrer les traces

Filtrer vos traces en fonction de:

* Leur [environnement][2]
* Leur [nom de service][3]
* Leur durée


[1]: https://app.datadoghq.com/apm/search
[2]: /tracing/setup/environment
[3]: /tracing/visualization/services_list/
