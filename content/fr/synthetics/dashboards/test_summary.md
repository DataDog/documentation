---
further_reading:
- link: /synthetics/ci_results_explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de résultats CI

title: Dashboard Résumé des tests Synthetic
---

## Présentation

Le [dashboard Résumé des tests][1] offre des informations sur les tests Synthetic exécutés, les tests Synthetic dans vos pipelines CI/CD et les emplacements privés. Il affiche les données suivantes :

- **Utilisation de la surveillance et des tests Synthetic** : visualisez des données détaillées de votre utilisation des tests Synthetic par environnement, équipe et type de test.
- **Automatisation des tests** : visualisez les tests Synthetic exécutés dans vos pipelines CI/CD par type et par équipe.
- **Emplacements privés** : visualisez le nombre de workers Synthetic par emplacement privé, la simultanéité moyenne et le nombre moyen de tests exécutés.

Cliquez sur l'icône Watchdog rose pour ouvrir le volet latéral [**Watchdog Insights**][2] et analyser les anomalies notables liées aux performances de votre application ou les alertes de monitor qui se sont déclenchées.

{{< img src="synthetics/dashboards/test_summary_dashboard.png" alt="Dashboard prêt à l'emploi Résumé des tests Synthetic" style="width:100%" >}}
{{< img src="synthetics/dashboards/test_automation.png" alt="Section Synthetics et intégrations CI/CD du dashboard Résumé des tests Synthetic" style="width:100%" >}}
{{< img src="synthetics/dashboards/private_locations.png" alt="Section Emplacements privés du dashboard Résumé des tests Synthetic" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez la section [Métriques de la surveillance Synthetic][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30696/synthetics---test-summary
[2]: /fr/watchdog/
[3]: /fr/synthetics/metrics/
