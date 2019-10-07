---
title: Widgets
kind: documentation
aliases:
  - /fr/graphing/dashboards/widgets
  - /fr/graphing/faq/widgets
---
## Présentation

{{< whatsnext desc="Choisissez un widget pour découvrir comment l'utiliser dans Datadog et avec l'API :">}}
    {{< nextlink href="/graphing/widgets/alert_graph" >}}Graphique d'alerte{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/alert_value" >}}Valeur d'alerte{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/change" >}}Évolution{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/check_status" >}}Statut du check{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/distribution" >}}Distribution{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/event_stream" >}}Flux d'événements{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/event_timeline" >}}Chronologie des événements{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/free_text" >}}Texte libre{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/group" >}}Groupe{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/heat_map" >}}Carte thermique{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/hostmap" >}}Hostmap{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/iframe" >}}Iframe{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/image" >}}Image{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/log_stream" >}}Flux de logs{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/monitor_summary" >}}Résumé des monitors{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/note" >}}Notes et liens{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/query_value" >}}Valeur de requête{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/scatter_plot" >}}Nuage de points{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/slo" >}}Objectifs de niveau de service (SLO)
    {{< nextlink href="/graphing/widgets/service_map" >}}Service Map{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/service_summary" >}}Résumé des services{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/table" >}}Tableau{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/timeseries" >}}Séries temporelles{{< /nextlink >}}
    {{< nextlink href="/graphing/widgets/top_list" >}}Top List{{< /nextlink >}}
{{< /whatsnext >}}

## Plein écran

La plupart des widgets dispose d'un mode plein écran. Pour accéder à cette vue, cliquez sur le bouton Plein écran dans le coin supérieur droit du widget.

En mode plein écran, vous pouvez :

* Modifier des intervalles de temps
* Avancer ou reculer en fonction de l'intervalle de temps sélectionné
* Mettre le graphique en pause à la période en cours ou afficher le graphique en direct
* Réinitialiser des intervalles de temps
* Exporter le graphique vers un dashboard, une notebook ou copier la requête

Des options supplémentaires sont disponibles pour [les widgets des séries temporelles][1].

## Copiez/collez des widgets

Le widgets peuvent être copiés sur les pages des [dashboards][2], [notebooks][3], [services APM][4] et [ressources APM][5] en utilisant les touches `Ctrl + C` (`Cmd + C` pour Mac).

Le widget copié peut être collé dans Datadog en utilisant les touches `Ctrl + V` (`Cmd + V` pour Mac) :

* Sur les **Dashboards** : ajoute un nouveau widget positionné sous le curseur de votre souris.
* Sur les **Notebooks** : ajoute une nouvelle cellule à la fin du notebook.

Un widget copié peut également être partagé en dehors de Datadog comme image statique stockée dans le même centre de données Datadog que votre site (américain ou européen).

[1]: /fr/graphing/widgets/timeseries#full-screen
[2]: /fr/graphing/dashboards
[3]: /fr/graphing/notebooks
[4]: /fr/tracing/visualization/service
[5]: /fr/tracing/visualization/resource