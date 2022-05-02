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

Les widgets représentent les éléments constitutifs de vos dashboards. Il en existe trois types.

{{< whatsnext desc="Widgets génériques permettant de représenter graphiquement des données provenant de solutions Datadog : ">}}
    {{< nextlink href="/dashboards/widgets/change" >}}Évolution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}Distribution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_stream" >}}Flux d'événements{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_timeline" >}}Chronologie des événements{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}Geomap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}Carte thermique{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/log_stream" >}}Flux de logs{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}Valeur de requête{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}Nuage de points{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}Tableau{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}Série temporelle{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}Top List{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Widgets de synthèse permettant de visualiser des informations sur la surveillance Synthetic : ">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}Graphique des alertes{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}Valeur d'alerte{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}Statut de check{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}Résumé des monitors{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" >}}Résumé des SLO{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_map" >}}Service Map{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}Résumé de service{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Widgets décoratifs permettant de structurer visuellement les dashboards et d'y ajouter des annotations : ">}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}Texte libre{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/group" >}}Groupe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}Image{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}Notes et liens{{< /nextlink >}}
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

Pour télécharger un widget au format PNG, cliquez sur le bouton d'exportation dans le coin supérieur droit du widget, puis sélectionnez l'option Download as PNG.

### Format CSV

Pour exporter les données d'un widget Série temporelle, Tableau ou Top List au format CSV, cliquez sur le bouton d'exportation dans le coin supérieur droit du widget, puis sélectionnez l'option Download as CSV.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/timeseries/#full-screen
[2]: /fr/dashboards/guide/context-links/
[3]: /fr/dashboards/
[4]: /fr/notebooks/
[5]: /fr/tracing/visualization/service/
[6]: /fr/tracing/visualization/resource/