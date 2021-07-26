---
title: Monitor d'APM
kind: documentation
description: Comparer une métrique d'APM à un seuil défini par un utilisateur
aliases:
  - /fr/monitors/monitor_types/app_analytics
  - /fr/monitors/monitor_types/trace_search
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Vérifier le statut de votre monitor
---
## Présentation

Les monitors de métrique d'APM fonctionnent comme les [monitors de métrique][1], mais sont dotés de commandes personnalisées pour l'APM. Utilisez ces monitors pour recevoir des alertes au niveau des services pour les hits, les erreurs et toute une gamme de mesures relatives à la latence.

Les monitors Analytics vous permettent de visualiser l'évolution des données de l'APM et de définir des alertes basées sur des spans indexées. Utilisez par exemple un monitor Analytics pour recevoir des alertes en cas de hausse importante du nombre de requêtes lentes.

## Création de monitor

Pour créer un [monitor d'APM][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> APM*.

Choisissez un monitor **APM Metrics** ou **Analytics** :

{{< tabs >}}
{{% tab "Métriques d'APM" %}}

### Sélectionner le contexte du monitor

Choisissez vos [tags primaires][1], [services][2] et [ressources][3] dans les menus déroulants.

### Définir vos conditions d'alerte

Choisissez une alerte de **seuil** ou d'**anomalie** :

#### Alerte de seuil

Une alerte se déclenche chaque fois qu'une métrique dépasse un seuil.

* Envoyez une alerte lorsque `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`, `p75 latency`, `p90 latency` ou `p99 latency`
* est `above`, `above or equal to`, `below` ou `below or equal to` (supérieur, supérieur ou égal à, inférieur, inférieure ou égal à)
* au seuil d'alerte `<NOMBRE>`
* au seuil d'avertissement `<NOMBRE>`
* lors des dernières `5 minutes`, `15 minutes`, `1 hour` ou encore lors d'une période `custom` (comprise entre 1 minute et 48 heures).

#### Alerte d'anomalie

Une alerte se déclenche chaque fois qu'une métrique dévie d'un pattern attendu.

* Pour `Requests per second`, `Errors per second`, `Apdex`, `Error rate`, `Avg latency`, `p50 latency`, `p75 latency`, `p90 latency`, ou `p99 latency`
* Envoyez une alerte lorsque `<ALERT_THRESHOLD>` %, `<WARNING_THRESHOLD>` %
* des valeurs dévient de `<NOMBRE>` et sont `above or below`, `above` ou `below` (supérieur ou inférieur, supérieure, inférieure)
* à la prévision durant les dernières `5 minutes`, `15 minutes` , `1 hour` ou lors d'une période `custom` (comprise entre 1 minute et 48 heures).

[1]: /fr/tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /fr/tracing/visualization/service/
[3]: /fr/tracing/visualization/resource/
{{% /tab %}}
{{% tab "Analyse" %}}

### Définir la requête de recherche

* Créez une requête de recherche en utilisant la même logique qu'une [recherche de trace][1].
* Choisissez de surveiller un nombre de traces, une [facette][2] ou une [mesure][3] :
    * **Monitor over a trace count** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** une facette ou une mesure. Datadog évalue le nombre de traces sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Monitor over a facet or measure** : si vous sélectionnez une facette, le monitor envoie une alerte sur le `Unique value count` (nombre de valeurs uniques) de la facette. Si vous sélectionnez une mesure, le processus appliqué est semblable à celui d'un monitor de métrique. Vous devez simplement sélectionner l'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).

**Remarque :** les monitors Analytics peuvent être créés uniquement à partir de [spans indexées][4].

### Sélectionner les conditions d'alerte

* Envoyer une alerte lorsque la métrique est `above` ou `above or equal to` (supérieure, supérieure ou égale)
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre 5 minutes et 48 heures).
* Seuil d'alerte : `<NOMBRE>`
* Seuil d'avertissement : `<NOMBRE>`

[1]: /fr/tracing/trace_search_and_analytics/query_syntax/#search-bar
[2]: /fr/tracing/trace_search_and_analytics/query_syntax/#facet-search
[3]: /fr/tracing/trace_search_and_analytics/query_syntax/#numerical-values
[4]: /fr/tracing/visualization/#indexed-span
{{% /tab %}}
{{< /tabs >}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][3].

**Remarque** : recherchez des monitors au niveau des services sur la [page Services][4] et sur la [Service Map][5], puis recherchez des monitors au niveau des ressources sur les pages de ressources individuelles (vous pouvez y accéder en cliquant sur la ressource spécifique répertoriée sur la page [Services][4]).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/metric/
[2]: https://app.datadoghq.com/monitors#create/apm
[3]: /fr/monitors/notifications/
[4]: https://app.datadoghq.com/apm/services
[5]: https://app.datadoghq.com/apm/map