---
title: Page des Ressources
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
- link: "tracing/visualization/trace"
  tag: "Documentation"
  text: Comprendre comment lire une trace Datadog
---

{{< img src="tracing/visualization/resource/ressource.png" alt="Ressource" responsive="true" >}}

Une ressource est une action particulière pour un service donné (généralement un endpoint ou une requête). Apprenez en plus sur les ressources sur la page [débuter avec l'APM][1]. Pour chaque ressource, APM génère automatiquement une page dashboard couvrant:

* Indicateurs de santé clés
* Monitorer l'état de tous les monitors associés à ce service
* Liste et métriques pour toutes les ressources associées à ce service

## Graphiques par défaut

Datadog fournit des graphiques par défaut pour une ressource donnée:

* Requêtes -  Choisissez d'afficher:
    *  Le **Nombre total de requêtes** 
    *  La fréquence **de requêtes par seconde**
* Latence -  Choisissez d'afficher:
    *  Le Avg/p75/p90/p95/p99/Max de latence pour vos requêtes tracées
* Erreur -  Choisissez d'afficher:
    * Le **Nombre total d'erreurs** 
    * Le nombre **d'erreurs par seconde**
    * Le **Taux d'erreur** 
* Sub-Services: Quand plusieurs services sont impliqués, un quatrième graphique est disponible qui décompose votre  **Total time spent**/**%of time spent**/**Avg time per request** de votre service par *services* ou *type*. Pour les services comme *Postgres* ou *Redis*, qui sont des opérations "finales" n'appelant pas d'autres services, il n'y aura pas de graphique de Sub-Services.

{{< img src="tracing/visualization/resource/resource_otb_graphs.png" alt="Out of the bow resource graphs" responsive="true" style="width:90%;">}}

**Note**: Utilisez l'icône *cogs* pour afficher toutes les options disponibles pour un graphique donné.

### Exporter dans un Timeboard

Dans le coin supérieur droit de chaque graphique, cliquez sur la flèche pour exporter votre graphique dans un [Timeboard][2] éxistant:

{{< img src="tracing/visualization/resource/save_to_timeboard.png" alt="Save to timeboard" responsive="true" style="width:40%;">}}

### Distribution de latence

En plus de tous ces graphiques, il y a un graphique de distribution de latence de ressources:

{{< img src="tracing/visualization/resource/resource_latency_distribution.png" alt="Latency distribution" responsive="true" style="width:90%;">}}

Utilisez le sélecteur en haut à droite de ce graphique pour zoomer sur un pourcentage donné de la distribution de latence:

{{< img src="tracing/visualization/service/latency_distribution_selector.png" alt="latency distribution selector" responsive="true" style="width:20%;">}}

Zoomez sur ce graphique pour filtrer les traces correspondantes.

## Traces

Consultez la liste des traces associées à cette ressource. Filtrer/trier cette liste pour voir les traces rapides/lentes et en erreurs/non-erreurs:

[Reportez-vous à notre documentation sur les traces pour en apprendre plus][3].

{{< img src="tracing/visualization/resource/traces_list.png" alt="Traces list" responsive="true" style="width:90%;">}}

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/visualization
[2]: /graphing/dashboards/timeboard
[3]: /tracing/visualization/trace
