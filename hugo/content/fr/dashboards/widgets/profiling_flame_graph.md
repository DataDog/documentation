---
aliases:
- /fr/video-categories/flamegraph/
description: Représenter graphiquement une répartition des lignes de code les plus
  consommatrices de ressources (CPU, mémoire, etc.)
further_reading:
- link: /profiler/profile_visualizations/
  tag: Documentation
  text: En savoir plus sur les visualisations de profils
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Profiling Flame Graph
widget_type: flame_graph
---

## Présentation

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph.png" alt="Profiling Flame Graph" >}}

La [visualisation flame graph de profiling][1] représente une répartition des lignes de code les plus consommatrices de ressources, telles que le CPU et la mémoire. Ajoutez ce widget pour visualiser les traces de pile de vos applications profilées et identifier avec précision les demandes de ressources fréquentes.

## Configuration

 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config.png" alt="Graph your data section in the profiling flame graph widget configuration" style="width:100%;" >}}

### Configuration

1. Définissez le périmètre de vos données de profiling avec des tags. Par exemple, `host`, `container_name`, `service`, `env` ou `version`.
2. Pour sélectionner la ressource, cliquez sur le menu déroulant à côté de **Show**. Les options peuvent inclure `CPU Time`, `Allocated Memory` ou `Thrown Exceptions`.
3. Cliquez sur les menus déroulants à côté de **by** et **for** pour sélectionner respectivement la granularité des frames et la provenance du code.
4. Attribuez un titre à votre graphique ou laissez le champ vide pour utiliser le titre suggéré.
5. Cliquez sur **Save**.

### Options

#### Options avancées et filtrage

Cliquez sur les trois points pour ouvrir les options avancées afin de spécifier les couleurs et la résolution.

Personnalisez votre flame graph. Ajoutez des actions graphiques ou des filtres dans le champ *Filter flame graph*.

#### Périmètre par endpoints

Filtrez sur un endpoint spécifique, pour la consommation totale (`per Minute by Endpoint`) ou par requête (`per Endpoint Call`).

#### Périmètre par fonctions

Filtrez selon d'autres critères tels que `Method`, `Package`, `Thread name` ou `Trace Operation`.

#### Intervalle global

Choisissez si votre widget utilise un intervalle de temps personnalisé ou l'intervalle de temps global du dashboard.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Consultez la [définition du schéma JSON du widget][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/profiler/profile_visualizations/#flame-graph
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/