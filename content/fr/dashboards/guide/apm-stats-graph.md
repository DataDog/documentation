---
aliases:
- /fr/dashboards/querying/#configuration-d-un-graphique-de-statistiques-APM
disable_toc: false
further_reading:
- link: /dashboards/querying/
  tag: Documentation
  text: Apprendre à effectuer des requêtes de graphiques
title: Configuration d'un graphique de statistiques APM
---

## Présentation

Pour configurer votre graphique à l'aide des données statistiques de l'APM, suivez ces étapes :

1. Sélectionnez votre visualisation à partir des [widgets][1] disponibles.
2. [Choisir votre niveau de détail](#niveau-de-detail).
3. [Choisir vos paramètres](#parametres-des-statistiques-de-l-APM).
4. Donner un titre au graphique (procédure identique à celle des métriques).

### Niveau de détail
Choisissez le niveau de détail pour lequel vous souhaitez visualiser des statistiques : services, ressources ou spans. Les niveaux de détail ne sont pas tous disponibles pour chaque type de widget.

### Paramètres des statistiques de l'APM
Sélectionnez les paramètres suivants depuis l'éditeur de graphiques : Environnement (`env`), Tag primaire (`primary_tag`), Service (`service`) et Nom de l'opération (`name`).

Si le niveau de détail choisi correspond à `resource` ou à `span`, vous devrez également sélectionner un Nom de ressource (`resource`) pour certains types de widget afin d'affiner le contexte de votre requête.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/