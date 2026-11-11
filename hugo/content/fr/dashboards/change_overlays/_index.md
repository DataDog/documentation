---
description: Superposez vos événements de changement sur les graphiques pour corréler
  les anomalies de performance avec les changements dans votre application
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: Documentation
  text: Prise en main du suivi de déploiement APM
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: Blog
  text: Surveillez les déploiements de code avec le suivi de déploiement dans Datadog
    APM
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: Blog
  text: Publiez du code en toute confiance avec la détection automatique de déploiements
    défectueux
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: Documentation
  text: Prise en main du suivi de déploiement RUM
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: Blog
  text: Dépanner les problèmes de déploiement frontend avec le suivi des déploiements
    dans RUM
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: Blog
  text: Repérez et annulez rapidement les déploiements défectueux avec les superpositions
    de changements
title: Les superpositions de changements
---
## Présentation {#overview}

À mesure que les équipes itèrent, déploient du code et apportent des changements à leurs applications et services, identifier le changement exact ayant causé un pic d'erreurs, une latence accrue ou des temps de chargement de page plus lents peut s'avérer difficile. Utilisez les superpositions de changements pour visualiser les changements sur votre dashboard, tels que les déploiements ou les feature flags, et corrélez-les rapidement aux problèmes de performance.

## Superposer des changements sur les graphiques {#overlay-changes-on-graphs}

Pour commencer, cliquez sur {{< ui >}}Show Overlays{{< /ui >}} dans le coin supérieur droit de votre dashboard. Vous pouvez désormais activer la chronologie [Change Tracking][16] et superposer des changements sur les widgets de séries temporelles.

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Bouton Superpositions dans l'en-tête du dashboard" style="width:100%;">}}

Une fois activée, la barre de recherche {{< ui >}}Service{{< /ui >}} affiche le service {{< ui >}}Most Relevant{{< /ui >}} par défaut. Datadog sélectionne automatiquement le service le plus fréquemment référencé dans les requêtes prenant en charge les widgets du dashboard.

Remplacez la détection automatique de service en utilisant la barre de recherche pour trouver le service souhaité. 

Tous les changements affichés sur la chronologie des changements et sous forme de superpositions sont liés au service sélectionné. 
Utilisez le menu déroulant {{< ui >}}Show On{{< /ui >}} pour limiter les superpositions de changements aux widgets pertinents, ou affichez-les sur tous les widgets de votre dashboard.

Pour afficher des détails supplémentaires ou effectuer d'autres actions, cliquez sur une superposition de changement ou sur un changement dans la chronologie des changements.

### Définissez le périmètre des changements de déploiement {#scope-deployment-changes}

Pour les déploiements APM, un `env` doit être spécifié. Si vous avez une variable de modèle `env` ou `datacenter` définie dans votre dashboard, les déploiements sont filtrés pour correspondre à la sélection. Sinon, le `env` est défini par défaut sur `prod`. 

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/services/deployment_tracking/
[2]: /fr/watchdog/faulty_deployment_detection/
[3]: /fr/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /fr/metrics/advanced-filtering/
[8]: /fr/getting_started/tagging/
[9]: /fr/metrics/#time-aggregation
[10]: /fr/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /fr/dashboards/functions/rollup/
[12]: /fr/dashboards/functions/#apply-functions-optional
[13]: /fr/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /fr/logs/explorer/search_syntax/
[15]: /fr/dashboards/widgets/timeseries/#event-overlay
[16]: /fr/change_tracking/