---
further_reading:
- link: /synthetics/ci_results_explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de résultats CI

title: Dashboard Performances des tests API Synthetic
---

## Présentation

Le [dashboard Performances des tests API][1] offre des informations sur l'ensemble de votre stack et de vos événements. Il affiche les données suivantes :

- **Types de tests API** : visualisez le temps de réponse moyen, la latence moyenne ou le temps de recherche moyen au sein de votre réseau, ainsi que les délais de transaction et le temps de réponse par emplacement et par type de test.
- **Événements** : visualisez les événements déclenchés pour tous vos tests API et filtrez les tests de votre choix en utilisant les template variables en haut du dashboard.

Cliquez sur l'icône Watchdog rose pour ouvrir le volet latéral [**Watchdog Insights**][2] et analyser les anomalies notables liées aux performances de votre application ou les alertes de monitor qui se sont déclenchées.

{{< img src="synthetics/dashboards/api_test_performance_dashboard.png" alt="Dashboard prêt à l'emploi Performances des tests API Synthetic" style="width:100%" >}}

{{< img src="synthetics/dashboards/api_test_performance_events.png" alt="Section des événements du dashboard Performances des tests API Synthetic" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez la section [Métriques de la surveillance Synthetic][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30695/synthetics---api-test-performance
[2]: /fr/watchdog/
[3]: /fr/synthetics/metrics/
