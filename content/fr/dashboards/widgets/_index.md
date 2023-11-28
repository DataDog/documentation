---
aliases:
- /fr/graphing/dashboards/widgets
- /fr/graphing/faq/widgets
- /fr/graphing/widgets
further_reading:
- link: /dashboards/guide/context-links/
  tag: Documentation
  text: Liens personnalisés
kind: documentation
title: Widgets
---

## Présentation

Les widgets représentent les éléments constitutifs de vos dashboards. Ils vous permettent de visualiser et de mettre en corrélation vos données dans l'ensemble de votre infrastructure.

### Graphiques
{{< whatsnext desc="Widgets généraux permettant de représenter les données des produits Datadog : ">}}
    {{< nextlink href="/dashboards/widgets/change" 
        img="dashboards/widgets/icons/change_light_large.png">}}Évolution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution"
        img="dashboards/widgets/icons/distribution_light_large.png">}}Distribution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/funnel"
        img="dashboards/widgets/icons/funnel_light_large.png">}}Entonnoir{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" 
        img="dashboards/widgets/icons/geomap_light_large.png">}}Geomap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map"
        img="dashboards/widgets/icons/heatmap_light_large.png">}}Carte thermique{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/pie_chart"
        img="dashboards/widgets/icons/pie_light_large.png">}}Graphique circulaire{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value"
        img="dashboards/widgets/icons/query-value_light_large.png">}}Valeur de requête{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot"
        img="dashboards/widgets/icons/scatter-plot_light_large.png">}}Nuage de points{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table"
        img="dashboards/widgets/icons/table_light_large.png">}} Tableau{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/treemap"
        img="dashboards/widgets/icons/treemap_light_large.png">}} Treemap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries"
        img="dashboards/widgets/icons/timeseries_light_large.png">}}Série temporelle{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list"
        img="dashboards/widgets/icons/top-list_light_large.png">}}Top list{{< /nextlink >}}
{{< /whatsnext >}}

### Groups
{{< whatsnext desc="Affichez vos widgets dans des groupes : ">}}
    {{< nextlink href="/dashboards/widgets/group"
        img="dashboards/widgets/icons/placeholder_light_large.png">}}Groupe{{< /nextlink >}}
{{< /whatsnext >}}

### Annotations et embeds
{{< whatsnext desc="Widgets décoratifs permettant de structurer visuellement les dashboards et d'y ajouter des annotations : ">}}
    {{< nextlink href="/dashboards/widgets/free_text" 
        img="dashboards/widgets/icons/free-text_light_large.png">}}Texte libre{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" 
        img="dashboards/widgets/icons/iframe_light_large.png">}}iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" 
        img="dashboards/widgets/icons/image_light_large.png">}}Image{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" 
        img="dashboards/widgets/icons/notes_light_large.png">}}Notes et liens{{< /nextlink >}}
{{< /whatsnext >}}

### Listes et flux
{{< whatsnext desc="Affichez une liste d'événements et de problèmes provenant de diverses sources : ">}}
    {{< nextlink href="/dashboards/widgets/list"
        img="dashboards/widgets/icons/change_light_large.png">}} Liste{{< /nextlink >}}
{{< /whatsnext >}}

### Alertes et réponse
{{< whatsnext desc="Widgets de synthèse permettant d'afficher des données de surveillance : ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" 
        img="dashboards/widgets/icons/alert-graph_light_large.png">}}Graphique des alertes{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" 
        img="dashboards/widgets/icons/alert-value_light_large.png">}}Valeur d'alerte{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" 
        img="dashboards/widgets/icons/check-status_light_large.png">}}Statut de check{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" 
        img="dashboards/widgets/icons/monitor-summary_light_large.png">}}Résumé des monitors{{< /nextlink >}}
{{< /whatsnext >}}

### Architecture
{{< whatsnext desc="Visualisez des données sur votre infrastructure et architecture : ">}}
    {{< nextlink href="/dashboards/widgets/hostmap" 
        img="dashboards/widgets/icons/host-map_light_large.png">}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/topology_map" 
        img="dashboards/widgets/icons/service-map_light_large.png">}}Carte de topologie{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" 
        img="dashboards/widgets/icons/service-summary_light_large.png">}}Résumé de service{{< /nextlink >}}
{{< /whatsnext >}}

### Performances et fiabilité
{{< whatsnext desc="Visualisations sur la fiabilité des sites : ">}}
    {{< nextlink href="/dashboards/widgets/slo" 
        img="dashboards/widgets/icons/slo-summary_light_large.png">}}Résumé des SLO{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo_list" 
        img="dashboards/widgets/icons/slo-list_light_large.png">}}Liste de SLO{{< /nextlink >}}
{{< /whatsnext >}}

## Plein écran

Vous pouvez afficher la plupart des widgets en mode plein écran et effectuer les opérations suivantes :

* Modifier des intervalles de temps
* Avancer ou reculer en fonction de l'intervalle de temps sélectionné
* Mettre le graphique en pause à la période en cours ou afficher le graphique en direct
* Réinitialiser des intervalles de temps
* Exporter le graphique vers un dashboard, un notebook ou copier la requête
* Télécharger les données à l'origine du graphique au format CSV

Pour accéder directement à la vue d'ensemble du widget, cliquez sur le bouton d'affichage en plein écran situé en haut à droite du widget.

Des options supplémentaires sont disponibles pour [les widgets Série temporelle][1].

## Liens personnalisés

Les liens personnalisés permettent d'associer des valeurs de données à des URL, comme une page Datadog ou votre console AWS.

Pour personnaliser les interactions avec les données intégrées à vos widgets génériques, consultez la section [Liens personnalisés][2].

## Copier et coller des widgets

Les widgets peuvent être copiés sur les pages des [dashboards][3], [notebooks][4], [services APM][5] et [ressources APM][6] à l'aide du raccourci `Ctrl + C` (`Cmd + C` pour Mac). Vous pouvez également sélectionner l'icône de partage et choisir l'option Copy.

Les widgets copiés peuvent être collés dans Datadog en utilisant les touches `Ctrl + V` (`Cmd + V` pour Mac) :

* Sur les **dashboards** : cela ajoute un nouveau widget sous le curseur de votre souris.
* Sur les **notebooks** : cela ajoute une nouvelle cellule à la fin du notebook.

Vous pouvez également coller un widget dans votre logiciel de discussion préféré, tant que celui-ci affiche les prévisualisations de lien (par exemple, Slack ou Microsoft Teams). Cela vous permet d'afficher une image d'un snapshot de votre graphique, ainsi qu'un lien direct vers le widget.

### Groupe de widgets

Vous pouvez copier les groupes de widgets d'un timeboard. Pour ce faire, passez le curseur sur la zone du groupe de widgets et appuyez sur les touches `Ctrl + C` (`Cmd + C` sur Mac), ou sélectionnez l'icône de partage et choisissez l'option Copy.

**Remarque** : lorsque vous collez des graphiques dans des screenboards ou des notebooks, chaque widget du groupe est collé.

Pour copier plusieurs widgets de screenboard (en mode éditeur uniquement), cliquez sur les widgets en maintenant la touche Maj enfoncée, puis appuyez sur les touches `Ctrl + C` (`Cmd + C` sur Mac).

**Remarque** : ces raccourcis fonctionnent uniquement lorsque vous partagez des widgets dans Datadog. Ils ne génèrent pas d'image d'aperçu.

## Exporter des graphiques

### Format PNG

Pour télécharger un widget au format PNG, cliquez sur le bouton d'exportation dans le coin supérieur droit du widget, puis sélectionnez l'option **Download as PNG**.

### Format CSV

Pour exporter les données d'un widget Série temporelle, Tableau ou Top list au format CSV, cliquez sur le bouton d'exportation dans le coin supérieur droit du widget, puis sélectionnez l'option **Download as CSV**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/timeseries/#full-screen
[2]: /fr/dashboards/guide/context-links/
[3]: /fr/dashboards/
[4]: /fr/notebooks/
[5]: /fr/tracing/services/service_page/
[6]: /fr/tracing/services/resource_page/