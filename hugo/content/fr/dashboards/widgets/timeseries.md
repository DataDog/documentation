---
aliases:
- /fr/graphing/widgets/timeseries/
- /fr/dashboards/widgets/network/
- /fr/graphing/widgets/network/
description: Affichez l'évolution des valeurs de plusieurs métriques, événements de
  log, spans indexées ou métriques de processus.
further_reading:
- link: https://www.datadoghq.com/blog/full-screen-graphs
  tag: GitHub
  text: Explorer les données sous la forme d'un graphique en plein écran
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
- link: /dashboards/guide/slo_data_source
  tag: Guide
  text: Représenter graphiquement les données SLO historiques dans les dashboards
title: Widget Série temporelle
widget_type: timeseries
---

La visualisation de séries temporelles vous permet de consulter l'évolution de plusieurs métriques, événements de log ou spans indexées. La période affichée dépend des éléments sélectionnés sur le [timeboard][1] ou le [screenboard][2] :

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Un widget Série temporelle affichant la métrique moyenne system.cpu.user pour un host" style="width:90%;" >}}

## Configuration

### Configuration

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Configuration d'une série temporelle" style="width:90%;" >}}

1. Choisissez les données à représenter :
   * Métrique : consultez la [section Requêtes][3] pour configurer une requête de métrique.
   * Spans indexées : consultez la [documentation sur la recherche de traces][4] pour configurer une requête de span indexée.
   * Événements de log : consultez la [documentation sur la recherche de logs][5] pour configurer une requête d'événement de log.

2. Personnalisez votre graphique avec les [options](#options-d-affichage) disponibles.

## Options d'affichage

Les graphiques peuvent être affichés sous forme de courbes, de surfaces et de barres. Datadog agrège les données sur des [intervalles][15] tels que la somme par heure. Par défaut, le dernier intervalle de temps incomplet dans un graphique de série temporelle est ombré et étiqueté comme « données partielles ».

Les graphiques en courbes contiennent des paramètres supplémentaires :

| Paramètre | Options                  |
|-----------|--------------------------|
| Style     | Solid, Dashed ou Dotted |
| Stroke    | Normal, Thin ou Thick   |

### Couleur

Pour tous les types de graphiques, Datadog propose de nombreuses options en matière de couleurs pour différencier les diverses métriques affichées sur un même graphique :

| Palette     | Rôle                                                                                                 |
|-------------|-------------------------------------------------------------------------------------------------------------|
| Classic     | Des couleurs simples : bleu clair, bleu foncé, violet clair, violet, jaune clair et jaune (les couleurs se répètent).    |
| Cohérent | En utilisant un ensemble de 16 couleurs, applique une couleur cohérente pour chaque série de données dans tous les widgets pour chaque groupe de tags. |

Pour les graphiques en courbes, différentes métriques peuvent se voir attribuer des palettes spécifiques en séparant les requêtes en JSON. Pour plus d'informations, consultez le guide de [sélection des bonnes couleurs pour vos graphiques][6].

### Tri

Classez le graphique par **Tags** ou par **Values** pour trier les légendes des séries temporelles et les graphiques empilés. Cela ne concerne que la visualisation du graphique et n'a pas d'impact sur la requête. Activez l'option **Reverse** pour trier par ordre alphabétique inverse ou par valeurs décroissantes.

### Alias de métrique

Chaque requête, formule ou [tag de filtrage][7] peut avoir un alias. L'alias remplace le nom sur le graphique et la légende, ce qui est utile pour les longs noms de métrique ou les longues listes de filtres. À la fin de votre requête ou formule, cliquez sur **as...**, puis saisissez votre alias de métrique :

{{< img src="dashboards/widgets/timeseries/metric_alias.png" alt="Ajout d'un alias à une requête de recherche dans l'éditeur du widget Série temporelle" style="width:100%;" >}}

### Superposition d'événements

La superposition d'événements prend en charge toutes les sources de données. Vous pouvez ainsi facilement mettre en corrélation les événements commerciaux avec les données de n'importe quel service Datadog.

Avec la superposition d'événements, vous pouvez voir comment les actions au sein de l'organisation impactent les performances des applications et de l'infrastructure. Voici quelques exemples de cas d'usage :
- Affichage des taux d'erreurs RUM avec les événements de déploiement superposés
- Mise en corrélation de la charge CPU avec les événements associés au provisionnement de serveurs supplémentaires
- Mise en corrélation du trafic de sortie avec les activités de connexion suspectes
- Mise en corrélation des données de séries temporelles avec les alertes de monitor pour vérifier que les alertes appropriées ont bien été configurées dans Datadog

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widget Série temporelle affichant les taux d'erreurs RUM avec les événements de déploiement en superposition" style="width:100%;" >}}

Vous pouvez ajouter des événements provenant de systèmes associés afin d'enrichir le contexte de votre graphique, par exemple des commits GitHub, des déploiements Jenkins et des événements de création Docker. Cliquez sur **Add Event Overlay** dans la section **Event Overlays** et saisissez une requête pour afficher ces événements.

Utilisez le même format de requête que pour l'[Event Explorer][8], par exemple :

| Requête                       | Rôle                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Affiche tous les événements provenant de la source Jenkins.                  |
| `tag:role:web`              | Affiche tous les événements avec le tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Affiche tous les événements de la [template variable][9] sélectionnée. |

### Marqueurs

Pour ajouter des marqueurs pour des ensembles de données supplémentaires, cliquez sur **Add Marker** dans la section **Markers**.

1. Sélectionnez une ligne ou un intervalle et renseignez une valeur ou un intervalle de valeurs.
2. Dans le champ **Show as**, sélectionnez un statut d'alerte ou une couleur et choisissez un type de ligne horizontale (uni, gras ou pointillé).
3. Pour ajouter une étiquette en bas à gauche du widget Série temporelle, définissez une valeur pour l'axe des ordonnées et cochez la case **Label**.

### Commandes de l'axe des ordonnées

Les commandes de l'axe des ordonnées sont disponibles dans l'interface et dans l'éditeur JSON. Vous pouvez définir la valeur et le type de l'axe des ordonnées afin de réaliser ce qui suit :

* Régler l'axe des ordonnées sur un intervalle donné
* Modifiez automatiquement les limites de l'axe des abscisses en fonction d'un seuil basé sur une valeur absolue. Ce seuil peut être appliqué à une extrémité ou aux deux extrémités du graphique (inférieure et supérieure) pour supprimer les séries « aberrantes ».
* Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance

Les options de configuration suivantes sont disponibles :

| Option                | Obligatoire | Rôle                                                                                                                                                                                                               |
|-----------------------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`                 | Non       | Spécifie la valeur minimale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                                |
| `Max`                 | Non       | Spécifie la valeur maximale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                                        |
| `Scale`               | Non       | Spécifie le type d'échelle. Valeurs autorisées :<br>- *linear* : une échelle linéaire (valeur par défaut).<br>- *log* : une échelle logarithmique.<br>- *pow* : une échelle basée sur une puissance de 2. La valeur par défaut est 2, mais celle-ci peut être modifiée dans l'éditeur JSON.<br>- *sqrt* : une échelle basée sur la racine carrée. |
| `Always include zero` | Non       | Indique s'il faut toujours inclure le zéro ou ajuster l'axe des ordonnées à la plage de données. Par défaut, le zéro est toujours inclus.                                                                                                                             |

Comme la fonction log mathématique n'accepte pas les valeurs négatives, l'échelle log Datadog ne fonctionne que si les valeurs ont le même signe (toutes les valeurs positives ou toutes négatives). Si ce n'est pas le cas, un graphique vide s'affiche.

### Configuration de la légende

Vous pouvez ajouter des légendes configurables à vos screenboards en sélectionnant l'une des options suivantes dans la section **Legend** :

* Automatic (par défaut)
* Compact
* Expanded : colonnes configurables pour value, avg, sum, min et max
* Aucune

Pour les timeboards, les légendes s'affichent automatiquement lorsque le format du dashboard est défini sur L ou XL.

### Liens de contexte

Pour ajouter un lien de contexte dans le menu déroulant qui s'affiche lorsque vous cliquez sur un widget de dashboard, cliquez sur **Add a Context Link** dans la section **Context Links**.

Pour en savoir plus sur la modification et la suppression de liens de contexte, consultez la section [Liens de contexte][10].

### Plein écran

En plus des [options standard en plein écran][11], vous pouvez appliquer des fonctions rapides, ajuster l'échelle Y, enregistrer les modifications ou enregistrer en tant que nouveau graphique.

Pour en savoir plus, consultez l'article [Explorer des données sous la forme d'un graphique en plein écran][12] (en anglais).

### Comparer les périodes

L'onglet **Compare Time** vous permet de comparer les performances actuelles des métriques par rapport à une période précédente pour repérer les changements en un coup d'oeil. Utilisez cette option lors de l'investigation d'un pic de charge système ou pour valider l'impact d'un déploiement.

Pour ouvrir l'onglet **Compare Time**, ouvrez un widget en mode inspection en cliquant sur l'icône d'agrandissement dans les options de contrôle du widget, puis cliquez sur **Compare Time**.

L'onglet affiche deux graphiques :
- **Current** : vos données de métriques pour la fenêtre de temps active. Utilisez le menu déroulant de l'intervalle de temps et les contrôles de lecture pour ajuster la fenêtre.
- **Previous** : la période de comparaison. Sélectionnez **Period**, **Day**, **Week**, **Month** ou **Custom** pour définir le décalage.

Pour afficher les deux périodes sur le même graphique, cliquez sur **Overlay**. Pour revenir à la vue côte à côte, cliquez sur **Grid**.

### Informations sur les métriques

Sur un graphique de métriques, cliquez sur le menu contextuel (trois points verticaux) pour trouver l'option **Metrics Info**. Cela ouvre un panneau avec une description de la métrique. Cliquer sur le nom de la métrique dans ce panneau ouvre la métrique dans la page de résumé des métriques pour une analyse ou des modifications supplémentaires.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][13]**. Consultez le tableau suivant pour la [définition du schéma JSON du widget][14] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

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