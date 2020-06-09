---
title: Actions utilisateur personnalisées RUM
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
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
Une action utilisateur personnalisée correspond à un événement personnalisé généré pour une action utilisateur donnée. [Ajoutez une action en instrumentant votre code][1].

## Facette collectée

| Attribut    | Type   | Description              |
|--------------|--------|--------------------------|
| `event.name` | chaîne | Nom de l'action utilisateur. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/installation/advanced_configuration/