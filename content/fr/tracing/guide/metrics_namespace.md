---
title: Métriques d'application de tracing
kind: guide
disable_toc: true
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
aliases:
  - /fr/tracing/getting_further/metrics_namespace
---
## Présentation
L'espace de nommage des [métriques de traces][1] est : `trace.<nom>.<métriques>{<tags>}`, où :

Les métriques d'application de tracing sont collectées après l'[activation de la collecte de traces][2] et l'[instrumentation de votre application][3]. Ces métriques sont disponibles pour les dashboards et les monitors.

### Noms de métriques

Les noms de métriques de traces sont au format `trace.<NOM>.<MÉTRIQUE>` ou `trace.<NOM>.<2E_TAG_PRIMAIRE_MÉTRIQUE>`.

| Paramètre               | Description                                                                                                             |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `<NOM>`                | Le nom de l'opération ou `span.name` (par exemple : `redis.command`, `pylons.request`, `rails.request`, `mysql.query`). |
| `<MÉTRIQUE>`              | Le nom de la métrique (par exemple : `duration`, `hits`, `span_count`).                                                    |
| `<2E_TAG_PRIMAIRE_MÉTRIQUE>` | Si le nom de la métrique prend en compte le deuxième tag primaire, ce tag fait partie du nom de la métrique.                            |

### Tags

Les métriques de traces s'accompagnent de nombreux tags. Les tags possibles sont les suivants :

* `env`
* `service`
* `resource`
* `sublayer_type`
* `sublayer_service`
* `http.status_code`
* `http.status_class`
* Tags de l'Agent Datadog (host et deuxième tag primaire inclus)

**Remarque** : les tags sont appliqués en fonction de la métrique concernée. Référez-vous au tableau des métriques ci-dessous.

## Données collectées
### Métriques

{{< get-metrics-from-git "tracing" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace-metrics
[2]: /fr/tracing/send_traces
[3]: /fr/tracing/setup