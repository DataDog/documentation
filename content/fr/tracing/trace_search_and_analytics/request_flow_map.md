---
title: Carte de flux de requêtes
kind: documentation
description: Analyse et recherche de traces
further_reading:
  - link: https://www.datadoghq.com/blog/apm-request-flow-map-datadog
    tag: Blog
    text: En savoir plus sur les cartes de flux de requêtes
---
{{< img src="tracing/live_search_and_analytics/request_flow_map/Overview.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Carte de flux de requêtes" >}}

Les _cartes de flux de requêtes_ rassemblent deux fonctionnalités clés de l'APM Datadog : la [service map][1] et la [recherche et l'analyse en direct][2]. Elles vous permettent de mieux comprendre et de surveiller l'itinéraire de vos requêtes au sein de votre pile. Identifiez rapidement les services générant beaucoup de requêtes, les goulots d'étranglement, ou encore le nombre d'appels de base de données générés par une requête sur un endpoint spécifique.

Pour tirer profit des cartes de flux de requêtes, aucune configuration supplémentaire n'est requise. Le fonctionnement des cartes repose sur vos [spans ingérées][3]. Filtrez vos dernières traces (des 15 dernières minutes) en fonction de n'importe quelle combinaison de tags, et générez une carte dynamique représentant les flux de requêtes entre chaque service. Cette carte est automatiquement générée à partir de vos critères de recherche. Elle s'actualise en temps réel en cas de changement.

## Parcourir la carte de flux de requêtes

- Passez votre curseur sur une ligne reliant deux services afin d'afficher des métriques sur les requêtes, les erreurs et la latence des requêtes entre ces deux services pour les paramètres définis.

- Les connexions avec le débit le plus élevé sont mises en avant, afin de vous présenter l'itinéraire le plus fréquent.

- Cliquez sur **Export** pour enregistrer la carte de flux de requêtes actuelle au format PNG. Cette fonctionnalité d'exportation vous permet notamment de générer un diagramme de l'architecture actuelle ou un diagramme filtré sur un certain utilisateur.

{{< img src="tracing/live_search_and_analytics/request_flow_map/ServicePanel.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Volet latéral d'une carte de flux avec des informations sur un service" >}}

- Cliquez sur un service de la carte pour afficher des informations générales sur sa santé et ses performances (débit, latence, taux d'erreur, statut des monitors), ainsi que des métriques runtime et des métriques sur l'infrastructure.

- La carte sélectionne automatiquement la présentation appropriée en fonction du nombre de services affichés. Vous pouvez également cliquer sur **Cluster** ou **Flow** pour passer d'une présentation à une autre.

- Si vous avez [connecté la solution RUM aux traces][4], les applications RUM sont représentées sur la carte de flux de requêtes.

{{< img src="tracing/live_search_and_analytics/request_flow_map/RUMService.gif" alt="Lien d'un service RUM depuis la carte de flux" style="width:100%;">}}

N'hésitez pas à tester la [carte de flux de requêtes dans l'application][5]. Pour commencer, il vous suffit d'appliquer un filtre à une requête simple, pour visualiser par exemple un seul service ou un seul endpoint.

### Exemples

Utilisez la carte de flux de requêtes pour analyser le comportement de votre application :

- Recherchez une [ressource][6] correspondant à une requête HTTP précise.

- Si vous utilisez des [déploiements fantômes][7] ou des feature flags définis en tant que [tags de span personnalisés][8], cette carte vous permet de comparer la latence de plusieurs requêtes. Ce cas d'utilisation vient renforcer le [suivi des déploiements][9] en pré-production et vous permet de visualiser l'impact potentiel de modifications de code sur la latence des versions déployées.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/services_map/
[2]: /fr/tracing/trace_search_and_analytics/
[3]: /fr/tracing/trace_retention_and_ingestion/#ingestion-controls
[4]: /fr/real_user_monitoring/connect_rum_and_traces?tab=browserrum
[5]: https://app.datadoghq.com/apm/flow-map
[6]: /fr/tracing/visualization/#resources
[7]: /fr/tracing/deployment_tracking/#shadow-deploys
[8]: /fr/tracing/guide/add_span_md_and_graph_it/
[9]: /fr/tracing/deployment_tracking/