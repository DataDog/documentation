---
description: Configurer la délimitation et le filtrage pour les requêtes SLO basées
  sur des métriques en utilisant des tags sémantiques compatibles dans les widgets
  de dashboard.
disable_toc: false
further_reading:
- link: /dashboards/widgets/slo/
  tag: Documentation
  text: Widget SLO
title: Délimiter les requêtes SLO basées sur des métriques
---

<div class="alert alert-info">Cette fonctionnalité est uniquement disponible pour les requêtes SLO <strong>basées sur des métriques</strong>.</div>

## Présentation

Le [widget SLO][1] prend en charge le filtrage avancé des requêtes de métriques, y compris l'utilisation de template variables pour délimiter dynamiquement les résultats affichés.

## Présentation d'une requête SLO

### Requête SLO basée sur des métriques
Tout d'abord, créez un [SLO basé sur des métriques][2]. Cet exemple utilise des métriques de trace APM pour mesurer la disponibilité d'un exemple de service appelé `web-store`.

##### Good events (numérateur)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store} by {resource_name}.as_count()`

##### Total events (dénominateur)
`sum:trace.rack.request.hits{service:web-store} by {resource_name}.as_count()`

{{< img src="service_management/service_level_objectives/slo_graph_query/trace_metrics_slo.png" alt="Configuration SLO montrant des exemples de métriques de trace" style="width:100%;" >}}

### Widget SLO

Sélectionnez le SLO dans l'[éditeur de widget SLO][1]. Vous pouvez appliquer des filtres supplémentaires dans la configuration du widget pour délimiter davantage les résultats affichés. Cela ne modifie pas la définition originale du SLO. Dans l'exemple, nous ajoutons les tags `$env` et `$availability-zone` au champ **filter by** du widget. 

{{< img src="service_management/service_level_objectives/slo_graph_query/slo_filter_by.png" alt="Éditeur SLO Summary avec des tags dynamiques pour $env et $availability-zone" style="width:100%;" >}}

Avec cette configuration, que se passe-t-il lorsque la [template variable de dashboard][3] est changée en `env:prod` et `availability-zone:northcentralus` ?

Le widget SLO filtre les requêtes de métriques SLO par ces tags supplémentaires à des fins de visualisation :

##### Good events (numérateur)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()` <br>
`sum:trace.rack.request.errors{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

##### Total events (dénominateur)
`sum:trace.rack.request.hits{service:web-store, env:prod, availability-zone:northcentralus} by {resource_name}.as_count()`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/slo/
[2]: /fr/service_level_objectives/metric/
[3]: /fr/dashboards/template_variables/