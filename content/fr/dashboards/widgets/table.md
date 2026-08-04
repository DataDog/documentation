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
title: Widget Tableau
widget_type: query_table
---

## Présentation

Les tableaux affichent au sein de leurs colonnes des données agrégées regroupées en fonction d'une clé de tag. Ils vous permettent de comparer les valeurs de différents groupes de données, ainsi que de visualiser des tendances, changements et singularités.

{{< img src="/dashboards/widgets/table/table_conditional_formatting.png" alt="Widget Tableau avec une mise en forme conditionnelle" style="width:100%;">}}

## Configuration

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la [documentation principale sur les graphiques][1] pour configurer une requête de métrique.
    * Sources de données sans métriques : consultez la section [Syntaxe de recherche de logs][2] pour configurer une requête d'événement.

2. Cliquez sur les boutons **+ Add Query** et **+ Add Formula** pour ajouter des colonnes supplémentaires au tableau.

### Options

* Vous pouvez cliquer sur le bouton **as...** pour configurer des alias afin de renommer les en-têtes de vos colonnes.
* Définissez si la barre de recherche doit s'afficher ou non. L'option **Auto**, appliquée par défaut, affiche la barre de recherche en fonction de la taille du widget. Ainsi, si la fenêtre devient trop petite, le widget affiche en priorité les données et masque la barre de recherche. Cette dernière continue à s'afficher en mode plein écran.

#### Mise en forme des colonnes

Personnalisez l'affichage des valeurs des cellules pour chaque colonne grâce aux règles de mise en page des colonnes. Vous pouvez ainsi créer des codes couleur pour vos données afin de représenter des tendances et changements.
* Mise en forme par seuil : mettre en évidence les cellules avec des couleurs lorsque des plages de valeurs spécifiques sont atteintes.
* Mise en forme avec des plages : appliquez un code couleur à vos cellules en fonction d'une plage de valeurs.
* Mise en forme de texte : remplacez des cellules par des alias de valeurs textuelles afin d'améliorer la lisibilité de vos données.
* Informations sur les tendances : visualiser des requêtes de métriques et d'événements.

{{< img src="/dashboards/widgets/table/conditional_formatting_trends.png" alt="Widget Table affichant une mise en forme conditionnelle avec des indicateurs de tendance" style="width:100%;" >}}

#### Liens de contexte

Les [liens de contexte][10] sont activés par défaut, mais vous pouvez les désactiver si vous le souhaitez. Ils relient les widgets du dashboard à d'autres pages dans Datadog ou sur des applications externes.

## Absence de valeurs

Les colonnes d'un widget Tableau sont chacune interrogées indépendamment. Les groupes dont les données se recoupent et qui partagent le même nom sont fusionnés en temps réel. Ils représentent les lignes du tableau. Ainsi, il arrive qu'aucune donnée ne se chevauche, ce qui donne lieu à des cellules sans valeur. Pour y remédier, procédez comme suit :
  * Autorisez un plus grand nombre de requêtes, afin de maximiser le chevauchement de données entre les colonnes.
  * Triez les tableaux en fonction de la colonne qui contient les données centrales à votre analyse.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][8] pour en savoir plus.

Le [schéma JSON][9] utilisé pour le widget Tableau est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

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