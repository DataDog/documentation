---
title: Widgets
kind: documentation
aliases:
  - /fr/graphing/dashboards/widgets
  - /fr/graphing/faq/widgets
  - /fr/graphing/widgets
---
## Présentation

{{< whatsnext desc="Choisissez un widget pour découvrir comment l'utiliser dans Datadog et avec l'API :">}}
    {{< nextlink href="/dashboards/widgets/alert_graph" >}}Graphique des alertes{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/alert_value" >}}Valeur d'alerte{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/change" >}}Évolution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/check_status" >}}Statut de check{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/distribution" >}}Distribution{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_stream" >}}Flux d'événements{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/event_timeline" >}}Chronologie des événements{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/free_text" >}}Texte libre{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/geomap" >}}Geomap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/group" >}}Groupe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/heat_map" >}}Carte thermique{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/hostmap" >}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/iframe" >}}Iframe{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/image" >}}Image{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/log_stream" >}}Flux de logs{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/monitor_summary" >}}Résumé des monitors{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/note" >}}Notes et liens{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/query_value" >}}Valeur de requête{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/scatter_plot" >}}Nuage de points{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/slo" >}}Service Level Objective (SLO){{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_map" >}}Service Map{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/service_summary" >}}Résumé de service{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/table" >}}Tableau{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/timeseries" >}}Série temporelle{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list" >}}Top List{{< /nextlink >}}
{{< /whatsnext >}}

## Plein écran

La plupart des widgets dispose d'un mode plein écran. Pour accéder à cette vue, cliquez sur le bouton dédié dans le coin supérieur droit du widget.

En mode plein écran, vous pouvez :

* Modifier des intervalles de temps
* Avancer ou reculer en fonction de l'intervalle de temps sélectionné
* Mettre le graphique en pause à la période en cours ou afficher le graphique en direct
* Réinitialiser des intervalles de temps
* Exporter le graphique vers un dashboard, un notebook ou copier la requête
* Télécharger les données à l'origine du graphique au format CSV

Des options supplémentaires sont disponibles pour [les widgets Série temporelle][1].

## Liens personnalisés
La plupart des widgets proposent l'option de lien personnalisé dans le menu contextuel cliquable. Pour ajouter cette fonctionnalité, modifiez votre widget et sélectionnez l'onglet **Custom Links** ou choisissez **New custom link** à partir du menu contextuel cliquable.

Les liens personnalisés vous permettent d'associer une valeur à une URL, comme une page Datadog ou votre console AWS. Elles prennent en charge les template variables et les tags ou les attributs utilisés dans le champ `group by`.

### Exemples

Afficher les logs associés à un graphique regroupé par `region` :
```text
http://app.datadoghq.com/logs?query={{region}}
```

Afficher les logs associés à un graphique sur un dashboard avec la template variable  `region` :
```text
http://app.datadoghq.com/logs?query={{$region.value}}
```

## Copier/coller des widgets

Les widgets peuvent être copiés sur les pages des [dashboards][2], [notebooks][3], [services APM][4] et [ressources APM][5] en utilisant les touches `Ctrl + C` (`Cmd + C` pour Mac) ou en sélectionnant l'icône de partage et en choisissant l'option Copy.

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

[1]: /fr/dashboards/widgets/timeseries/#full-screen
[2]: /fr/dashboards/
[3]: /fr/notebooks/
[4]: /fr/tracing/visualization/service/
[5]: /fr/tracing/visualization/resource/