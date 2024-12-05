---
title: Graphiques rapides
---

<div class="alert alert-warning">
    Les graphiques rapides sont actuellement disponibles en version bêta.
</div>

## Présentation

Les graphiques rapides vous permettent de représenter vos données où que vous soyez dans Datadog.

Pour ouvrir l'éditeur de graphique rapide, effectuez l'une des opérations suivantes :

* Appuyez sur la touche `G` sur n'importe quelle page.
* Utilisez le menu de recherche globale (`Cmd + K` sous macOS, `Ctrl + K` sous Windows).
* Utilisez le sous-menu des dashboards.

{{< img src="dashboards/guide/quick_graph_editor.png" alt="éditeur de graphique rapide" style="width:80%;">}}


## Afficher vos données dans un graphique

### Affichage de métriques

Pour interroger des métriques, suivez la procédure détaillée dans [cette section][1] :
1. [Choisissez la métrique à représenter][1].
2. [Appliquez un filtre][2].
3. [Agrégez et cumulez vos données][3].
4. [Appliquez des fonctions supplémentaires][4].

### Affichage d'événements
Cette section décrit la marche à suivre pour interroger les sources de données de plates-formes d'événements, notamment les [logs][5], l'[APM][6], la [solution RUM][7], le [Security Signals Explorer][8], les [événements Datadog][9], les [pipelines de CI][10], les [tests de CI][11] et le [Findings Explorer][12]. Utilisez la liste déroulante pour choisir une source de données. Par défaut, l'option **Metrics** est sélectionnée.

Pour interroger vos données d'événement, procédez comme suit :
1. **Appliquez un filtre :** affichez des données précises ou générales, ou focalisez-vous sur un sous-ensemble spécifique de données pertinentes. Vous pouvez saisir dans le champ en haut de l'éditeur une requête de recherche comportant à la fois des paires key:value et du texte libre.

{{< img src="dashboards/guide/quick_graph_event_filter.png" alt="filtrage d'événements" style="width:80%;">}}

2. **Choisissez une mesure ou une facette :** les mesures vous permettent de choisir une fonction d'agrégation, tandis que les facettes affichent le nombre de valeurs uniques.

{{< img src="dashboards/guide/quick_graph_event_measure.png" alt="choix d'une mesure" style="width:80%;">}}

3. **Agrégez vos données :** si vous représentez une mesure, sélectionnez une fonction d'agrégation pertinente et utilisez une facette pour fractionner votre graphique.

{{< img src="dashboards/guide/quick_graph_event_group.png" alt="choix d'une agrégation" style="width:80%;">}}

4. **Cumulez vos données :** choisissez un intervalle pour votre graphique. Si vous changez l'intervalle global, cela modifie la liste des laps de temps disponibles.

5. **[Appliquez des fonctions supplémentaires][4]** (comme pour des métriques).

## Sélectionner une visualisation

Les graphiques rapides prennent en charge les visualisations suivantes :
* [Série temporelle][13]
* [Top List][14]
* [Valeur de requête][15]
* [Geomap][16]

## Attribuer un nom à votre widget

Si vous ne saisissez pas de titre, Datadog en génère un automatiquement en fonction de vos sélections. Nous vous conseillons toutefois de définir un titre qui décrit précisément l'objectif du graphique.

## Exporter et partager le widget

Cliquez sur **Export** pour enregistrer votre graphique dans un dashboard ou un notebook. Vous pouvez à tout moment accéder à l'éditeur pour modifier le graphique. Si vous souhaitez partager un lien direct vers votre graphique sans passer par un dashboard ou un notebook, cliquez sur **Copy to Clipboard**.

[1]: /fr/dashboards/querying/#choose-the-metric-to-graph
[2]: /fr/dashboards/querying/#filter
[3]: /fr/dashboards/querying/#aggregate-and-rollup
[4]: /fr/dashboards/querying/#advanced-graphing
[5]: /fr/logs/explorer/
[6]: /fr/tracing/trace_explorer/
[7]: /fr/real_user_monitoring/explorer/search/
[8]: /fr/security_platform/explorer/
[9]: /fr/events/
[10]: /fr/continuous_integration/explore_pipelines/
[11]: /fr/continuous_integration/explore_tests/
[12]: /fr/security_platform/cspm/findings/
[13]: /fr/dashboards/widgets/timeseries/
[14]: /fr/dashboards/widgets/top_list/
[15]: /fr/dashboards/widgets/query_value/
[16]: /fr/dashboards/widgets/geomap/