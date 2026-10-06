---
aliases:
- /fr/graphing/widgets/table/
description: Affichez des données tabulaires avec des colonnes, des lignes et des
  fonctionnalités de tri pour une analyse détaillée des métriques et des événements.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/querying/
  tag: Documentation
  text: Découvrir comment créer une requête de graphique
- link: https://learn.datadoghq.com/courses/discovering-table-list-widgets
  tag: Centre d'apprentissage
  text: Découverte des widgets Tableau, Liste, SLO et Architecture
title: Widget Tableau
widget_type: query_table
---
## Présentation {#overview}

La visualisation sous forme de tableau affiche des colonnes de données agrégées regroupées par clé de tag. Utilisez des tableaux pour comparer des valeurs entre de nombreux groupes de données et observer les tendances, les changements et les singularités.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="Widget de tableau avec formatage conditionnel" style="width:100%;">}}

## Configuration {#setup}

### Configuration {#configuration}

1. Choisissez les données à représenter graphiquement :
    * Métrique : consultez la [documentation principale sur les graphiques][1] pour configurer une requête de métrique.
    * Sources de données non métriques : consultez la [documentation sur la recherche de logs][2] pour configurer une requête d'événement.

2. Ajoutez des colonnes supplémentaires au tableau en utilisant les boutons {{< ui >}}\+ Add Query{{< /ui >}} et {{< ui >}}\+ Add Formula{{< /ui >}}.

### Options {#options}

* Renommez les en-têtes de colonne en définissant des alias, cliquez sur le bouton {{< ui >}}as...{{< /ui >}}.
* Configurez l'affichage ou non de la barre de recherche. {{< ui >}}Auto{{< /ui >}} est la valeur par défaut et affiche la barre de recherche en fonction de la taille du widget ; cela signifie que si votre écran devient trop petit, il donne la priorité à l'affichage des données sur le widget et masque la barre de recherche, qui reste toutefois disponible en mode plein écran.

#### Formatage de colonne {#column-formatting}

Personnalisez la visualisation des valeurs de cellule pour chaque colonne avec des règles de formatage de colonne. Créez des codes couleur pour vos données afin de visualiser les tendances et les changements.
* Formatage par seuil : mettez en surbrillance les cellules avec des couleurs lorsque des plages de valeurs spécifiques sont atteintes.
* Formatage par plage : codez par couleur les cellules avec une plage de valeurs.
* Formatage de texte : remplacez les cellules par des valeurs de texte d'alias pour améliorer la lisibilité.
* Informations sur les tendances : visualisez les requêtes de métriques et d'événements.

{{< img src="/dashboards/widgets/table/conditional_formatting_trends.png" alt="Widget de tableau affichant un formatage conditionnel avec des indicateurs de tendance" style="width:100%;" >}}

#### Liens contextuels {#context-links}

Les [liens contextuels][10] sont activés par défaut et peuvent être activés ou désactivés. Les liens contextuels relient les widgets de dashboard à d'autres pages dans Datadog ou à des applications tierces.

## Valeurs N/A {#na-values}

Les colonnes du widget de tableau sont interrogées indépendamment les unes des autres. Les groupes qui se chevauchent avec des noms correspondants sont joints en temps réel pour former les lignes du tableau. En raison de ce processus, il peut y avoir des situations sans chevauchement total, affichant des cellules N/A. Pour atténuer cela :
  * Augmentez la limite des requêtes à des nombres plus élevés, afin de maximiser le chevauchement entre les colonnes
  * Triez les tableaux selon la colonne que vous pourriez considérer comme « moteur » de l'analyse

## API {#api}

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation de l'API Dashboards][8] pour plus d'informations.

Le [schéma JSON][9] utilisé pour le widget Tableau est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/#configuring-a-graph
[2]: /fr/logs/search_syntax/
[3]: /fr/tracing/trace_explorer/query_syntax/
[4]: /fr/real_user_monitoring/explorer/search_syntax
[5]: /fr/profiler/profile_visualizations
[6]: /fr/security_monitoring/explorer/
[7]: /fr/dashboards/guide/apm-stats-graph
[8]: /fr/api/latest/dashboards/
[9]: /fr/dashboards/graphing_json/widget_json/
[10]: /fr/dashboards/guide/context-links/
[11]: /fr/dashboards/querying/#advanced-graphing