---
title: Nommage des métriques de traces
kind: documentation
further_reading:
- link: "tracing/setup/"
  tag: "Documentation"
  text: Découvrir comment configurer le tracing d'APM avec votre application
- link: "tracing/visualization/services_list/"
  tag: "Documentation"
  text: Découvrir la liste des services transmettant des données à Datadog
- link: "tracing/visualization/service"
  tag: "Documentation"
  text: En savoir plus sur les services de Datadog
- link: "tracing/visualization/resource"
  tag: "Documentation"
  text: Plonger au cœur des traces et des performances de vos ressources
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Comprendre comment lire une trace Datadog
---

Les métriques de trace sont nommées de la façon suivante : `trace.<nom>.<métriques>{<tags>}`, où :

* `<nom>` est le nom de l'opération, à savoir le `span.name` (*redis.command*, *pylons.request*, *rails.request*, *mysql.query*).
* `<métriques>` indique des données sur les hits, errors ou latency (« request.hits », etc.).
* `<tags>`  correspond aux métriques taguées par le service et la ressource.

Voici un exemple pour pylons : `trace.pylons.request.hits{service:web_server}`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

