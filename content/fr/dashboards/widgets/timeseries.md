---
title: Widget Série temporelle
kind: documentation
description: 'Affichez l''évolution des valeurs de plusieurs métriques, événements de log, spans indexées ou métriques de processus.'
aliases:
  - /fr/graphing/widgets/timeseries/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: 'https://www.datadoghq.com/blog/full-screen-graphs'
    tag: Blog
    text: Explorer les données sous la forme d'un graphique en plein écran
---
La visualisation de séries temporelles vous permet de consulter l'évolution de plusieurs métriques, événements de log ou spans indexées. La période affichée dépend des éléments sélectionnés sur le [timeboard][1] ou le [screenboard][2] :

{{< img src="dashboards/widgets/timeseries/timeseries.png" alt="Série temporelle" >}}

## Configuration

{{< img src="dashboards/widgets/timeseries/timeseries_setup.png" alt="Configuration d'une série temporelle"  style="width:80%;" >}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la documentation sur les [requêtes][3] pour configurer une requête de métrique.
    * Spans indexées : consultez la [documentation sur la recherche de traces][4] pour configurer une requête de span indexée.
    * Événements de log : consultez la [documentation sur la recherche de logs][5] pour configurer une requête d'événement de log.

2. Personnalisez votre graphique avec les [options](#options) disponibles.

### Options

#### Graphiques linéaires

Les graphiques linéaires proposent deux paramètres supplémentaires :

| Paramètre | Options               |
|-----------|-----------------------|
| Style     | Solid, Dashed, Dotted |
| Stroke    | Normal, Thin, Thick   |

#### Apparence

Vous pouvez créer des graphiques en aires, à barres ou linéaires. Pour tous les types de graphiques, Datadog propose de nombreuses options en matière de couleurs pour différencier les diverses métriques affichées sur un même graphique :

| Palette | Description                                                                                              |
|---------|----------------------------------------------------------------------------------------------------------|
| Classic | Des couleurs simples : bleu clair, bleu foncé, violet clair, violet, jaune clair et jaune (les couleurs se répètent). |
| Cool    | Un dégradé de couleurs composé de tons bleus et verts.                                                        |
| Warm    | Un dégradé de couleurs composé de tons jaunes et orange.                                                     |
| Purple  | Un dégradé de couleurs composé de tons violets.                                                                |
| Orange  | Un dégradé de couleurs composé de tons orange.                                                                |
| Gray    | Un dégradé de couleurs composé de tons gris.                                                                  |

Pour les graphiques linéaires, vous pouvez attribuer des palettes à différentes métriques en séparant les requêtes avec le format JSON.

#### Alias de métrique

Chaque requête, formule ou [tag de filtrage][6] peut avoir un alias. L'alias remplace le nom sur le graphique et la légende, ce qui est utile pour les longs noms de métrique ou les longues listes de filtres. À la fin de la requête/formule, cliquez sur **as...**, puis saisissez votre alias de métrique :

{{< img src="dashboards/querying/metric_alias.png" alt="Alias de métrique" style="width:75%;" >}}

##### Superposition d'événements

Intégrez des événements de systèmes associés pour ajouter plus de contexte à votre graphique. Par exemple, vous pouvez ajouter des commits GitHub, des déploiements Jenkins ou des événements de création Docker. Développez la section **Event Overlays** et saisissez une requête pour afficher ces événements. Utilisez le même format de requête que pour [le flux d'événements][7], par exemple :

| Requête                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Affiche tous les événements provenant de la source Jenkins.                  |
| `tag:role:web`              | Affiche tous les événements avec le tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Affiche tous les événements provenant de la [template variable][8] sélectionnée. |

Une fois activés, les événements s'affichent en superposition sur vos graphiques avec des barres rouges :

{{< img src="dashboards/widgets/timeseries/event_overlay.png" alt="Superposition d'événements"  style="width:75%;" >}}

##### Configuration de légendes

Ajoutez des légendes personnalisables à vos screenboards en accédant à la section Legend dans l'éditeur de graphique et en sélectionnant une option.

{{< img src="dashboards/widgets/timeseries/legend-config.jpg" alt="Configuration de légendes"  style="width:100%;" >}}

Options :

* Automatic (par défaut)
* Compact
* Expanded : colonnes configurables pour value, avg, sum, min, max
* None

Remarque : pour les timeboards, les légendes s'afficheront automatiquement lorsque le format du dashboard est défini sur L ou XL.

##### Commandes de l'axe des ordonnées

Les commandes de l'axe des ordonnées sont disponibles via l'interface utilisateur et l'éditeur JSON. Grâce à ces commandes, vous pouvez :

* Ajoutez un deuxième axe des ordonnées pour les visualisations qui comprennent plusieurs ensembles de données.
* Régler l'axe des ordonnées sur un intervalle donné
* Changer automatiquement les limites de l'axe des ordonnées en définissant un pourcentage ou une valeur absolue. Une limite peut être appliquée à l'une des deux extrémités du graphique (inférieure ou supérieure) pour supprimer les singularités.
* Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance.

Si votre visualisation comprend plusieurs ensembles de données, vous pouvez ajouter un deuxième axe des ordonnées en développant le bouton *Y-axis controls*. Cliquez sur *+ Add right y-axis*, puis indiquez quel côté correspondra à l'axe des cordonnées de chaque métrique sous les options de configuration des métriques. Pour repérer quelle partie de la visualisation correspond à quel axe des ordonnées sur le graphique, survolez l'axe des ordonnées qui vous intéresse avec votre souris.

Changer l'échelle de l'axe des ordonnées en développant le bouton *Y-Axis Controls*.

Les options de configuration suivantes sont disponibles :

| Option                | Obligatoire | Rôle                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | Non       | Spécifie la valeur minimale et/ou maximale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                     |
| `Scale`               | Non       | Spécifie le type d'échelle. Valeurs autorisées :<br>- *linear* : une échelle linéaire (échelle par défaut).<br>- *log* : une échelle logarithmique<br>- *pow* : une échelle basée sur une puissance de 2. La valeur par défaut est 2, mais celle-ci peut être modifiée dans l'éditeur JSON.<br>- *sqrt* : une échelle basée sur la racine carrée. |
| `Always include zero` | Non       | Indique s'il faut toujours inclure le zéro ou ajuster l'axe à la plage de données. Par défaut, le zéro est toujours inclus.                                                                                                                     |

**Remarque** : comme la fonction log mathématique n'accepte pas les valeurs négatives, notre échelle log ne fonctionne que si les valeurs ont le même signe (tout > 0 ou tout < 0). Si ce n'est pas le cas, un graphique vide s'affiche.

## Plein écran

Outre les [options de plein écran standard][9], vous pouvez appliquer des fonctions rapides, effectuer des comparaisons par rapport à des périodes précédentes, régler l'échelle de l'axe des ordonnées, enregistrer des modifications ou enregistrer un nouveau graphique.

Consultez l'article [Explorer les données sous la forme d'un graphique en plein écran][10] (en anglais) pour en savoir plus.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][11] pour en savoir plus.

Le [schéma JSON][12] utilisé pour le widget Série temporelle est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/timeboard/
[2]: /fr/dashboards/screenboard/
[3]: /fr/dashboards/querying/
[4]: /fr/tracing/app_analytics/search/#search-bar
[5]: /fr/logs/search_syntax/
[6]: /fr/dashboards/querying/#filter
[7]: /fr/events/
[8]: /fr/dashboards/template_variables/
[9]: /fr/dashboards/widgets/#full-screen
[10]: https://www.datadoghq.com/blog/full-screen-graphs
[11]: /fr/api/v1/dashboards/
[12]: /fr/dashboards/graphing_json/widget_json/