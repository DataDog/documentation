---
title: Vue Screenboard
kind: documentation
aliases:
  - /fr/graphing/dashboards/screenboards/
  - /fr/graphing/dashboards/screenboard/
  - /fr/dashboards/screenboard/
  - /fr/screenboards/
  - /fr/screenboard/
further_reading:
  - link: /dashboards/template_variables/
    tag: Documentation
    text: Améliorer vos dashboards avec les template variables
  - link: /dashboards/sharing/
    tag: Documentation
    text: Partager vos graphiques en dehors de Datadog
  - link: /dashboards/widgets/
    tag: Documentation
    text: Découvrir tous les widgets disponibles pour votre dashboard
---
Les screenboards sont des dashboards qui vous permettent de représenter librement de nombreux objets tels que des images, des graphiques ou des logs. Généralement utilisés pour visualiser les statuts de vos services et pour mettre en récit vos données, ils peuvent être mis à jour en temps réel ou représenter des points fixes historiques.

## Menu des graphiques

Cliquez sur un graphique de screenboard pour ouvrir le menu des options :

| Option                 | Description                                                      |
|------------------------|------------------------------------------------------------------|
| View in full screen    | Afficher le graphique [en plein écran][1].                         |
| View related processes | Accéder à la page [Live Processes][2] filtrée sur les données de votre graphique.   |
| View related hosts     | Accéder à la page [Host Map][3] filtrée sur les données de votre graphique.         |
| View related logs      | Remplir automatiquement un volet de [logs][4] à partir des données de votre graphique.                 |
| View related traces    | Remplir automatiquement un volet de [traces][5] à partir des données de votre graphique.               |
| View related profiles  | Accéder à la page [Profiling][6] filtrée sur les données de votre graphique.        |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/#full-screen
[2]: https://app.datadoghq.com/process
[3]: https://app.datadoghq.com/infrastructure/map
[4]: /fr/logs/
[5]: /fr/tracing/
[6]: /fr/tracing/profiler/