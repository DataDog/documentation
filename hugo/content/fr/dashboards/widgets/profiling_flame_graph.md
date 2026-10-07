---
aliases:
- /fr/video-categories/flamegraph/
description: Visualisez la consommation des ressources sur les chemins de code profilés.
further_reading:
- link: /profiler/profile_visualizations/
  tag: Documentation
  text: Découvrez les visualisations de profilage
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget de graphique en flamme de profilage
widget_type: flame_graph
---
## Présentation {#overview}

{{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_2.png" alt="Graphique en flamme de profilage" >}}

Le [graphique en flamme de profilage][1] visualise les traces de pile collectées par le Continuous Profiler. Chaque frame représente une unité de code, telle qu'une méthode ou une ligne. La largeur d'une frame représente sa part de la métrique de profil sélectionnée, et les frames sur la ligne suivante représentent le code appelé par la frame au-dessus. Utilisez le widget pour identifier les chemins de code gourmands en ressources dans vos applications profilées.

## Configuration {#setup}
 
 {{< img src="dashboards/widgets/profiling_flame_graph/profiling_flame_graph_config_2.png" alt="Section « Graph your data » dans la configuration du widget de graphique en flamme de profilage" style="width:100%;" >}}

### Graph your data {#graph-your-data}

1. Dans le champ de recherche, délimitez vos données de profilage avec des tags. Par exemple, `host`, `container_name`, `service`, `env` ou `version`.
2. Dans le menu {{< ui >}}Show{{< /ui >}}, sélectionnez un type de profil. Les [types de profil disponibles][2] dépendent du langage.
3. Dans le menu {{< ui >}}by{{< /ui >}}, sélectionnez la granularité des frames, comme la méthode ou la ligne.
4. Utilisez les menus {{< ui >}}color by{{< /ui >}} et {{< ui >}}sort{{< /ui >}} pour sélectionner la manière dont les frames sont ombrées et ordonnées.
5. Utilisez les sections de périmètre pour affiner le graphique en flamme :
   - {{< ui >}}Scope to methods{{< /ui >}} : Sélectionnez les méthodes à inclure. Le nom de cette section change en fonction de la granularité sélectionnée dans le menu {{< ui >}}by{{< /ui >}}.
   - {{< ui >}}Scope to endpoints{{< /ui >}} : Filtrez sur un endpoint spécifique. Sélectionnez `per Minute by Endpoint` pour afficher la consommation totale des ressources ou `per Endpoint Call` pour afficher la consommation des ressources par requête.

### Définissez les préférences temporelles {#set-time-preferences}

Sélectionnez {{< ui >}}Global dashboard time{{< /ui >}} pour utiliser la période du dashboard, ou sélectionnez {{< ui >}}Custom time{{< /ui >}} pour définir une période pour le widget.

**Remarque** : Les Notebooks conservent les données du graphique en flamme pendant un an lorsque le widget utilise une plage {{< ui >}}Custom time{{< /ui >}} fixe. La plage doit être comprise dans la période de rétention des données de profilage de 8 jours [8-day profiling data retention period][5] lors de la création du widget.

### Ajoutez un titre et une description {#add-a-title-and-description}

Attribuez un titre à votre graphique ou laissez le champ vide pour utiliser le titre suggéré. Vous pouvez également ajouter une description facultative. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Interagissez avec le widget {#interact-with-the-widget}

Survolez une frame pour afficher ses valeurs de profilage. Sélectionnez une frame pour vous concentrer sur son chemin de code. Pour étudier le profil plus en détail, cliquez sur l'icône d'ouverture en pleine page dans le coin supérieur droit du graphique en flamme.

## API {#api}

Ce widget peut être utilisé avec l'**[Dashboards API][3]**. Consultez la [définition du schéma JSON du widget][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/profiler/profile_visualizations/#flame-graph
[2]: /fr/profiler/profile_types/
[3]: /fr/api/latest/dashboards/
[4]: /fr/dashboards/graphing_json/widget_json/
[5]: /fr/data_security/data_retention_periods/