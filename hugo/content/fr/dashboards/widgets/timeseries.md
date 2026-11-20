---
aliases:
- /fr/graphing/widgets/timeseries/
- /fr/dashboards/widgets/network/
- /fr/graphing/widgets/network/
description: Affichez l'évolution d'une ou plusieurs métriques, événements de log,
  spans indexés ou métriques de processus au fil du temps.
further_reading:
- link: https://www.datadoghq.com/blog/full-screen-graphs
  tag: Blog
  text: Explorez vos données en mode graphique plein écran
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/guide/slo_data_source
  tag: Guide
  text: Représentez graphiquement les données SLO historiques sur les Dashboards
- link: https://learn.datadoghq.com/courses/dashboard-graph-widgets
  tag: Centre d'apprentissage
  text: Découverte des Graph Widgets
title: Widget de série temporelle
widget_type: timeseries
---
La visualisation de séries temporelles vous permet d'afficher l'évolution d'une ou plusieurs métriques, événements de log ou spans indexés au fil du temps. La fenêtre temporelle dépend de ce qui est sélectionné sur le [timeboard][1] ou le [screenboard][2] :

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Un widget de série temporelle affichant la moyenne de system.cpu.user pour un host" style="width:90%;" >}}

## Configuration {#setup}

### Configuration {#configuration}

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Configuration du widget de série temporelle" style="width:90%;" >}}

1. Choisissez les données à représenter graphiquement :
   * Métrique : consultez la [documentation sur les requêtes][3] pour configurer une requête de métrique.
   * Spans indexés : consultez la [documentation sur la recherche de traces][4] pour configurer une requête de span indexé.
   * Événements de log : consultez la [documentation sur la recherche de logs][5] pour configurer une requête d'événement de log.

2. Personnalisez votre graphique avec les [options](#display-options) disponibles.

## Options d'affichage {#display-options}

Les graphiques peuvent être affichés sous forme de lignes, d'aires et de barres. Les graphiques Datadog agrègent les données sur des [intervalles][15], par exemple une somme par heure. Par défaut, le dernier intervalle de temps incomplet d'un graphique de série temporelle est grisé et porte la mention « partial data ».

Les graphiques linéaires contiennent des paramètres supplémentaires :

| Paramètre | Options                  |
|-----------|--------------------------|
| Style     | Solid, dashed, or dotted |
| Stroke    | Normal, thin, or thick   |

### Étiquettes automatiques {#automatic-labels}

Les graphiques linéaires affichent des étiquettes sur les points de données notables, tels que les pics et les creux, afin que vous puissiez lire les valeurs clés sans survoler le graphique. Les étiquettes automatiques sont activées par défaut. Pour les désactiver, désactivez {{< ui >}}Show labels{{< /ui >}} dans l'éditeur de graphique.

Si une requête est regroupée par tag ou possède un [alias](#metric-aliasing), Datadog étiquette le dernier point de chaque ligne avec le nom de la série au lieu de ses pics et creux.

Pour préserver la lisibilité des graphiques, Datadog affiche un maximum de trois étiquettes par série et n'en affiche aucune si le graphique comporte plus de six séries.

### Couleur {#color}

Pour tous les types de graphiques, Datadog propose diverses options de couleur pour différencier les multiples métriques affichées sur un même graphique :

| Palette     | Description                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Classic     | Les couleurs simples bleu clair, bleu foncé, violet clair, violet, jaune clair et jaune (les couleurs se répètent).    |
| Consistent | Utilise un ensemble de 16 couleurs et applique une couleur cohérente à chaque série de données dans tous les widgets pour chaque groupe de tags. |

Pour les graphiques linéaires, différentes palettes peuvent être attribuées à des métriques spécifiques en séparant les requêtes dans le JSON. Pour plus d'informations, consultez le guide sur [le choix des couleurs adaptées à vos graphiques][6].

### Tri {#sorting}

Ordonnez le graphique par {{< ui >}}Tags{{< /ui >}} ou par {{< ui >}}Values{{< /ui >}} pour trier les légendes des séries temporelles et les graphiques empilés. Cela trie uniquement la visualisation du graphique et n'a aucune incidence sur la requête. Activez l'option {{< ui >}}Reverse{{< /ui >}} pour trier par ordre alphabétique inverse ou par valeurs décroissantes. 

### Alias de métrique {#metric-aliasing}

Chaque requête ou formule, ainsi que tout [tag de filtrage][7], peut être doté d'un alias. L'alias remplace l'affichage sur le graphique et la légende, ce qui est utile pour les noms de métriques longs ou les longues listes de filtres. À la fin de votre requête ou formule, cliquez sur {{< ui >}}as...{{< /ui >}} et saisissez votre alias de métrique :

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Ajout d'un alias à une requête de recherche dans l'éditeur du widget de série temporelle" style="width:100%;" >}}

### Superposition d'événements {#event-overlay}

La superposition d'événements prend en charge toutes les sources de données. Cela facilite la corrélation entre les événements métier et les données provenant de n'importe quel service Datadog.

Avec la superposition d'événements, vous pouvez voir comment les actions au sein de l'organisation impactent les performances des applications et de l'infrastructure. Voici quelques exemples de cas d'utilisation :
- Taux d'erreur RUM avec superposition d'événements de déploiement
- Corrélation de l'utilisation du processeur avec des événements liés au provisionnement de serveurs supplémentaires
- Corrélation du trafic sortant avec une activité de connexion suspecte
- Corrélation de toute donnée de série temporelle avec des alertes de monitor pour garantir que Datadog a été configuré avec les alertes appropriées

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de séries temporelles affichant les taux d'erreur RUM avec des événements de déploiement superposés" style="width:100%;" >}}

Vous pouvez ajouter des événements provenant de systèmes connexes pour ajouter plus de contexte à votre graphique, tels que des commits GitHub, des déploiements Jenkins et des événements de création Docker. Cliquez sur {{< ui >}}Add Event Overlay{{< /ui >}} dans la section {{< ui >}}Event Overlays{{< /ui >}} et saisissez une requête pour afficher ces événements.

Utilisez le même format de requête que pour l'[Event Explorer][8], par exemple :

| Requête                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Affiche tous les événements de la source Jenkins.                  |
| `tag:role:web`              | Affiche tous les événements avec le tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Affiche tous les événements de la [variable de modèle][9] sélectionnée. |

### Marqueurs {#markers}

Pour ajouter des marqueurs pour des jeux de données supplémentaires, cliquez sur {{< ui >}}Add Marker{{< /ui >}} dans la section {{< ui >}}Markers{{< /ui >}}.

1. Sélectionnez Line ou Range et saisissez une valeur ou une plage de valeurs.
2. Dans le champ {{< ui >}}Show as{{< /ui >}}, sélectionnez un statut/une couleur d'alerte et choisissez une ligne horizontale continue, épaisse ou en pointillés.
3. Pour ajouter une étiquette qui s'affiche en bas à gauche du widget de série temporelle, cochez la case {{< ui >}}Label{{< /ui >}} et définissez une valeur pour l'axe Y.

### Double axe Y {#dual-y-axis}

Pour afficher plus d'un axe Y sur le même graphique, cliquez sur **Add Graph**. Utilisez le menu déroulant **Y-axis** pour associer les données de la requête à l'axe de gauche ou de droite. Vous pouvez affecter n'importe quel nombre de requêtes à chaque côté.

{{< img src="dashboards/widgets/timeseries/dual_y_axis.png" alt="Le widget de série temporelle affiche deux requêtes de métriques : system.uptime en violet sur l'axe Y gauche et system.disk.used en orange sur l'axe Y droit." style="width:100%;" >}}

### Contrôles de l'axe Y {#y-axis-controls}

Les contrôles de l'axe Y sont disponibles dans l'interface utilisateur et dans l'éditeur JSON. Vous pouvez définir la valeur et le type de l'axe Y sur :

* Limiter l'axe Y à des plages spécifiques.
* Modifier automatiquement les limites de l'axe Y en fonction d'un seuil de valeur absolue. Ce seuil peut être appliqué à une ou aux deux extrémités du graphique (inférieure et supérieure) pour supprimer les séries présentant des singularités.
* Changer l'échelle de l'axe Y de linéaire à log, pow ou sqrt.

Les options de configuration suivantes sont disponibles :

| Option                | Requis | Description                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | Non       | Spécifiez la valeur minimale à afficher sur l'axe Y. Il prend un nombre ou `Auto` comme valeur par défaut.                                                                                                                |
| `Max`                 | Non       | Spécifiez la valeur maximale à afficher sur l'axe Y. Il accepte un nombre ou `Auto` comme valeur par défaut.                                                                                                                        |
| `Scale`               | Non       | Spécifie le type d'échelle. Les valeurs possibles incluent :<br>- *linear* : une échelle linéaire (par défaut).<br>- *log* : une échelle logarithmique.<br>- *pow* : une échelle de puissance de 2 (2 est la valeur par défaut, à modifier dans le JSON).<br>- *sqrt* : une échelle de racine carrée. |
| `Always include zero` | Non       | Incluez toujours zéro ou adaptez l'axe Y à la plage de données. La valeur par défaut consiste à toujours inclure zéro.                                                                                                                             |
<div class="alert alert-info">Comme la fonction mathématique logarithmique n'accepte pas les valeurs négatives, l'échelle logarithmique de Datadog ne fonctionne que si les valeurs sont du même signe (toutes > 0 ou toutes < 0). Otherwise, Datadog returns an empty graph.</div>

### Configuration de la légende {#legend-configuration}

Vous pouvez ajouter des légendes configurables à vos screenboards en sélectionnant l'une des options suivantes dans la section {{< ui >}}Legend{{< /ui >}} :

* Automatic (par défaut)
* Compact
* Expanded : colonnes configurables pour value, avg, sum, min et max
* None

Pour les timeboards, les légendes s'affichent automatiquement lorsque le tableau de bord est réglé sur L ou XL.

### Liens contextuels {#context-links}

Pour ajouter un lien contextuel dans le menu déroulant qui apparaît lorsque vous cliquez dans un widget de tableau de bord, cliquez sur {{< ui >}}Add a Context Link{{< /ui >}} dans la section {{< ui >}}Context Links{{< /ui >}}.

Pour plus d'informations sur la modification et la suppression de liens contextuels, consultez [Liens contextuels][10].

### Plein écran {#full-screen}

En plus des [options standard de plein écran][11], vous pouvez appliquer des fonctions rapides, ajuster l'échelle Y, enregistrer les modifications ou enregistrer le graphique en tant que nouveau graphique.

Pour plus d'informations, consultez [Explorer vos données en mode graphique plein écran][12].

### Compare time {#compare-time}

L'onglet {{< ui >}}Compare Time{{< /ui >}} vous permet de comparer les performances actuelles de la métrique par rapport à une période précédente pour repérer les changements en un coup d'œil. Utilisez cette fonctionnalité pour examiner un pic de charge système ou valider l'impact d'un déploiement.

Pour ouvrir l'onglet {{< ui >}}Compare Time{{< /ui >}}, ouvrez un widget en mode inspection en cliquant sur l'icône d'agrandissement dans les options de contrôle du widget, puis cliquez sur {{< ui >}}Compare Time{{< /ui >}}.

L’onglet affiche deux graphiques :
- {{< ui >}}Current{{< /ui >}} : vos données de métrique pour la fenêtre temporelle active. Utilisez le menu déroulant de plage temporelle et les commandes de lecture pour ajuster la fenêtre.
- {{< ui >}}Previous{{< /ui >}} : la période de comparaison. Sélectionnez {{< ui >}}Period{{< /ui >}}, {{< ui >}}Day{{< /ui >}}, {{< ui >}}Week{{< /ui >}}, {{< ui >}}Month{{< /ui >}} ou {{< ui >}}Custom{{< /ui >}} pour définir le décalage.

Pour afficher les deux périodes sur le même graphique, cliquez sur {{< ui >}}Overlay{{< /ui >}}. Pour revenir à la vue côte à côte, cliquez sur {{< ui >}}Grid{{< /ui >}}.

### Metrics info {#metrics-info}

Sur un graphique de métriques, cliquez sur le menu contextuel (trois points verticaux) pour trouver l'option {{< ui >}}Metrics Info{{< /ui >}}. Cela ouvre un panneau avec une description de la métrique. Cliquez sur le nom de la métrique dans ce panneau pour ouvrir la page Metrics Catalog afin de l'analyser ou de la modifier.

## API {#api}

Ce widget peut être utilisé avec l’**[API Dashboards][13]**. Consultez le tableau suivant pour la [définition du schéma JSON du widget][14] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/#get-started
[2]: /fr/dashboards/#screenboards
[3]: /fr/dashboards/querying/
[4]: /fr/tracing/trace_explorer/query_syntax/#search-bar
[5]: /fr/logs/search_syntax/
[6]: /fr/dashboards/guide/widget_colors/
[7]: /fr/dashboards/querying/#filter
[8]: /fr/events/
[9]: /fr/dashboards/template_variables/
[10]: /fr/dashboards/guide/context-links/
[11]: /fr/dashboards/widgets/#full-screen
[12]: https://www.datadoghq.com/blog/full-screen-graphs
[13]: /fr/api/latest/dashboards/
[14]: /fr/dashboards/graphing_json/widget_json/
[15]: /fr/dashboards/functions/rollup/