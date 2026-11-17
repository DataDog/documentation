---
description: Visualiser vos données pour mieux les comprendre
further_reading:
- link: /product_analytics/
  tag: Documentation
  text: Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centre d'apprentissage
  text: Bien démarrer avec Product Analytics
title: Dashboards
---
## Présentation {#overview}

La clé pour bien démarrer avec les dashboards est de savoir quel genre de questions vous vous posez régulièrement. Quels sont les problèmes courants auxquels vos clients sont confrontés ? Lorsqu'un problème survient, quelles questions vous aident à trouver une solution ?

Créer un bon dashboard consiste à faire ressortir les réponses à ces questions. De plus, il est important de ne pas surcharger un dashboard en y concentrant toutes ces informations. La création de dashboards distincts pour identifier différents problèmes peut vous aider à trouver rapidement vos réponses.

Ce guide vous aide à démarrer sur la voie de la création de dashboards. Ces dashboards de base favorisent la discussion au sein de l'équipe et accélèrent la résolution des problèmes.

## Créer un tableau de bord {#create-a-dashboard}

Pour créer un tableau de bord, cliquez sur {{< ui >}}\+ New Dashboard{{< /ui >}} sur la page [{{< ui >}}Dashboard List{{< /ui >}}][1].

{{< img src="product_analytics/dashboard/pana_dashboard_overview.png" alt="Ajout d'un nouveau tableau de bord" style="width:70%;">}}


Saisissez un nom de tableau de bord et choisissez une option de mise en page.

{{< img src="dashboards/create-dashboard.png" alt="Ajout d'un nouveau tableau de bord" style="width:70%;">}}

{{< ui >}}Dashboards{{< /ui >}}
: Une mise en page basée sur une grille, qui peut inclure une variété d'objets tels que des images, des graphiques et des journaux. Ces tableaux de bord sont couramment utilisés comme tableaux d'état ou vues de narration qui se mettent à jour en temps réel, et peuvent représenter des points fixes dans le passé. Leur largeur maximale est de 12 cases de grille, et ils conviennent également bien au débogage.

{{< ui >}}Timeboards{{< /ui >}}
: Mises en page automatiques qui représentent un point unique dans le temps — fixe ou en temps réel — sur l'ensemble du tableau de bord. Elles sont couramment utilisées pour le dépannage, la corrélation et l'exploration générale des données.

{{< ui >}}Screenboards{{< /ui >}}
: Tableaux de bord avec des mises en page libres qui peuvent inclure une variété d'objets tels que des images, des graphiques et des journaux. Ils sont couramment utilisés comme tableaux d'état ou vues de narration qui se mettent à jour en temps réel ou représentent des points fixes dans le passé.

## Fréquence de rafraîchissement {#refresh-rate}

La fréquence de rafraîchissement d'un tableau de bord privé dépend de la période que vous consultez. Plus la période est courte, plus les données sont rafraîchies fréquemment. Les tableaux de bord partagés publiquement se rafraîchissent toutes les trente secondes, quelle que soit la période sélectionnée.

| Période   | Fréquence de rafraîchissement |
|--------------|--------------|
| 1 minute     | 10 secondes   |
| 2 minutes    | 10 secondes   |
| 5 minutes    | 10 secondes   |
| 10 minutes   | 10 secondes   |
| 30 minutes   | 20 secondes   |
| 1 heure       | 20 secondes   |
| 3 heures      | 1 minute     |
| 4 heures      | 1 minute     |
| 1 jour        | 3 minutes     |
| 2 jours       | 10 minutes    |
| 1 semaine       | 1 heure       |
| 1 mois      | 1 heure       |
| 3 mois     | 1 heure       |
| 6 mois     | 1 heure       |
| 1 an       | 1 heure       |



## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/dashboard/list