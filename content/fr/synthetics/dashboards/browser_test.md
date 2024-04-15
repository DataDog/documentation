---
description: Découvrez le dashboard prêt à l'emploi Performances des tests Browser
  Synthetic.
further_reading:
- link: /synthetics/ci_results_explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de résultats CI

title: Dashboard Performances des tests Browser Synthetic
---

## Présentation

Le [dashboard Performances des tests Browser][1] offre des informations sur les tests Browser exécutés, les navigateurs, les performances Web et les événements. Il affiche les données suivantes :

- **Analyse des tests Browser Synthetic** : visualisez les détails des taux de réussite par type de navigateur, une liste des alertes de test Browser, ainsi que la durée moyenne des tests par type de navigateur et emplacement.
- **Performances Web des tests Synthetic** : si vous avez activé la fonctionnalité Datadog RUM, utilisez l'[intégration RUM][2] pour examiner les signaux Web essentiels et obtenir une liste de ressources de test de fournisseurs tiers.
- **Événements** : explorez les événements notables issus de vos alertes de test Synthetic.

Cliquez sur l'icône Watchdog rose pour ouvrir le volet latéral [**Watchdog Insights**][3] et analyser les anomalies notables liées aux performances de votre application ou les alertes de monitor qui se sont déclenchées.

{{< img src="synthetics/dashboards/browser_test_performance.png" alt="Dashboard prêt à l'emploi Performances des tests Browser Synthetic" style="width:100%" >}}

{{< img src="synthetics/dashboards/browser_test_analysis.png" alt="Section d'analyse des tests Browser du dashboard Performances des tests Browser Synthetic" style="width:100%" >}}

{{< img src="synthetics/dashboards/browser_test_web_performance.png" alt="Section des performances Web des tests Synthetic du dashboard Performances des tests Browser Synthetic" style="width:100%" >}}

{{< img src="synthetics/dashboards/browser_test_events.png" alt="Section des événements du dashboard Performances des tests Browser Synthetic" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez la section [Métriques de la surveillance Synthetic][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30697/synthetics---browser-test-performance
[2]: /fr/synthetics/guide/explore-rum-through-synthetics/
[3]: /fr/watchdog/
[4]: /fr/synthetics/metrics/
