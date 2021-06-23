---
title: Dashboard de visualisation des performances RUM
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Explorer vos vues dans Datadog
---
Le dashboard de visualisation des performances offre une vue d'ensemble de vos applications RUM. Il est divisé en trois sections :

- **Performance metrics** :
    quatre métriques de navigation sont mises en évidence pour chaque vue : Load Time, First Contentful Paint, DOM Content Loaded et Load Event. Pour chacune de ces métriques, les widgets affichent la médiane, le 75e centile et le 90e centile.
- **Trends** :
    visualisez l'évolution des vues de page, des erreurs frontend associées à des appels backend qui ont échoué, des erreurs JS et des tâches longues.
- **Page views breakdown** :
    analysez la nature de votre trafic et le temps de chargement associé pour chaque segment.

{{< img src="real_user_monitoring/dashboards/performance_overview.png" alt="Dashboard de visualisation des performances" >}}

Pour en savoir plus sur les informations affichées, consultez la [documentation Données RUM collectées] [1]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/