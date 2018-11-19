---
title: Nommage des métriques de Trace
kind: documentation
further_reading:
- link: "agent/apm/"
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

On nomme les métriques de Trace `trace.<name>.<metrics>{<tags>}` où:

* `<name>`: est le nom de l'opération i.e. le `span.name`: (*redis.command*, *pylons.request*, *rails.request*, *mysql.query*)
* `<metrics>` est par rapport au hits, errors or latency ("request.hits", etc.)
* `<tags>`  les métriques sont taggé par service & ressource

Donc pour pylons cela serait: `trace.pylons.request.hits{service:web_server}`.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

