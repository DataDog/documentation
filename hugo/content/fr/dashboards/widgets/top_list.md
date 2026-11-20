---
title: Widget Top List
widget_type: toplist
aliases:
  - /fr/graphing/widgets/top_list/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: /notebooks/
    tag: Documentation
    text: Notebooks
---
La visualisation Top List vous permet d'afficher une liste de valeurs de tags comme `hostname` ou `service` avec la valeur maximale ou minimale d'une métrique quelconque (par exemple, les processus qui sollicitent le plus le processeur, les hosts disposant du moins d'espace disque, etc.) :

{{< img src="dashboards/widgets/toplist/toplist.png" alt="Top List" >}}

## Configuration

{{< img src="dashboards/widgets/toplist/toplist_setup.png" alt="Top List" style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la [documentation sur les requêtes][1] pour configurer une requête de métrique.
    * Spans indexées : consultez la [documentation sur la recherche de traces][2] pour configurer une requête de span indexée.
    * Événements de log : consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log.

2. Facultatif : configurez une mise en forme conditionnelle en fonction des valeurs de vos entrées.

### Options

#### Intervalle global

Sur les screenboards et les notebooks, choisissez si votre widget doit utiliser un intervalle personnalisé ou l'intervalle global.

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][4] pour en savoir plus.

Le [schéma JSON][5] utilisé pour le widget Top List est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/
[2]: /fr/tracing/app_analytics/search/#search-bar
[3]: /fr/logs/search_syntax/
[4]: /fr/api/v1/dashboards/
[5]: /fr/dashboards/graphing_json/widget_json/