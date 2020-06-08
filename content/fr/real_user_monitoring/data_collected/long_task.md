---
title: Tâche longue RUM
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: Blog
  text: Real User Monitoring
- link: /real_user_monitoring/dashboards/
  tag: Documentation
  text: Visualisez vos données RUM sur des dashboards prêts à l'emploi
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorez vos vues dans Datadog
- link: /logs/processing/attributes_naming_convention/
  tag: Documentation
  text: Attributs standards Datadog
---

Une tâche est dite [longue][1] lorsqu'elle bloque le thread principal pendant 50 ms ou plus. Les tâches longues peuvent entraîner une forte latence au niveau des entrées, un décalage des interactions, etc. Découvrez pourquoi certaines de vos tâches prennent du temps à s'exécuter dans l'analyseur de performances de votre navigateur.

## Mesure collectée

| Attribut  | Type   | Description                |
|------------|--------|----------------------------|
| `duration` | number | Durée de la tâche longue. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
