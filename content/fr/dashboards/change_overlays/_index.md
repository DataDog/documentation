---
description: Superposer vos événements de changement sur des graphiques pour corréler
  les anomalies de performances avec les changements de votre application
further_reading:
- link: /tracing/services/deployment_tracking/
  tag: Documentation
  text: Débuter avec le suivi des déploiements APM
- link: https://www.datadoghq.com/blog/datadog-deployment-tracking/
  tag: Blog
  text: Surveiller les déploiements de code avec le suivi des déploiements dans Datadog
    APM
- link: https://www.datadoghq.com/blog/faulty-deployment-detection/
  tag: Blog
  text: Déployer du code en toute confiance avec la détection automatique des déploiements
    défectueux
- link: /real_user_monitoring/guide/setup-rum-deployment-tracking/?tab=npm
  tag: Documentation
  text: Débuter avec le suivi des déploiements RUM
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking/
  tag: Blog
  text: Dépanner les problèmes de déploiement frontend avec le suivi des déploiements
    dans RUM
- link: https://www.datadoghq.com/blog/change-overlays/
  tag: Blog
  text: Repérer et annuler rapidement les déploiements défectueux avec les superpositions
    de changements
title: Superpositions de changements
---

## Section Overview

Lorsque les équipes itèrent, déploient du code et apportent des changements à leurs applications et services, identifier le changement exact qui a causé un pic d'erreurs, une latence accrue ou des temps de chargement de page plus lents peut être difficile. Utilisez les superpositions de changements pour visualiser les changements sur votre dashboard comme les déploiements ou les feature flags, et corrélez rapidement les problèmes de performances avec eux.

## Superposer les changements sur les graphiques

Pour commencer, cliquez sur **Show Overlays** dans le coin supérieur droit de votre dashboard. Vous pouvez maintenant activer la chronologie [Change Tracking][16] et les superpositions de changements sur les widgets de séries temporelles.

{{< img src="dashboards/change_overlays/show_overlays_button.png" alt="Bouton Overlays sur l'en-tête du dashboard" style="width:100%;">}}

Lorsqu'elle est activée, la barre de recherche **Service** affiche le service **Most Relevant** par défaut. Datadog sélectionne automatiquement le service le plus fréquemment référencé dans les requêtes prenant en charge les widgets du dashboard.

Remplacez la détection automatique de service en utilisant la barre de recherche pour trouver le service d'intérêt.

Tous les changements affichés sur la chronologie de changements et sous forme de superpositions sont liés au service sélectionné.
Utilisez le menu déroulant **Show On** pour limiter les superpositions de changements aux widgets pertinents, ou les afficher sur tous les widgets de votre dashboard.

Pour afficher des détails supplémentaires ou effectuer des actions supplémentaires, cliquez sur une superposition de changement ou un changement dans la chronologie de changements.

## FAQ

### Comment les changements de déploiements sont-ils délimités ?
Pour les déploiements APM, un `env` doit être spécifié. Si vous avez une variable de modèle `env` ou `datacenter` définie dans votre dashboard, les déploiements sont filtrés pour correspondre à la sélection. Sinon, l'`env` est défini par défaut sur `prod`.


## Pour aller plus loin

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