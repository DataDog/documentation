---
title: Widget Valeur de requête
description: Afficher une valeur agrégée pour une requête de métrique donnée
aliases:
  - /fr/graphing/widgets/query_value/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Les valeurs de requête affichent la valeur actuelle d'une requête de métrique, d'APM ou de log donnée. Elles disposent d'une mise en forme conditionnelle (comme un arrière-plan vert/jaune/rouge) pour indiquer si la valeur figure dans la plage attendue. Les valeurs affichées par une valeur de requête ne représentent pas nécessairement une mesure instantanée.

Le widget peut afficher la dernière valeur transmise, ou une agrégation calculée à partir de toutes les valeurs de requête de l'intervalle. Ces visualisations offrent un aperçu limité mais explicite de votre requête d'infrastructure. 

{{< img src="dashboards/widgets/query_value/query_value1.png" alt="Widget Valeur de requête" >}}

## Configuration

{{< img src="dashboards/widgets/query_value/query-value-widget-setup1.png" alt="Configuration du widget Valeur de requête"  style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la documentation sur les [requêtes][1] pour configurer une requête de métrique.
    * Spans indexées : consultez la [documentation sur la recherche de traces][2] pour configurer une requête de span indexée.
    * Événements de log : consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log.
2. Choisissez les unités et la mise en forme. L'option de mise en forme automatique adapte la taille du dashboard en tenant compte des unités.
3. Facultatif : configurez une mise en forme conditionnelle en fonction de la valeur affichée.

### Options

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la documentation relative à l'[API Dashboards][4] pour en savoir plus.

Le [schéma JSON][5] utilisé pour le widget Valeur de requête est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/#overview
[2]: /fr/tracing/app_analytics/search/#search-bar
[3]: /fr/logs/search_syntax/
[4]: /fr/api/v1/dashboards/
[5]: /fr/dashboards/graphing_json/widget_json/