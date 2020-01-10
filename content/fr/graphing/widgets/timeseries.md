---
title: Widget Série temporelle
kind: documentation
description: 'Affichez l''évolution des valeurs de plusieurs métriques, événements de log, événements APM ou métriques de processus.'
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: 'https://www.datadoghq.com/blog/full-screen-graphs'
    tag: Blog
    text: Explorer les données sous la forme d'un graphique en plein écran
---
La visualisation de séries temporelles vous permet de consulter l'évolution de plusieurs métriques, événements de log ou événements APM. La période affichée dépend des éléments sélectionnés sur le [timeboard][1] ou le [screenboard][2] :

{{< img src="graphing/widgets/timeseries/timeseries.png" alt="Série temporelle" >}}

## Implémentation

{{< img src="graphing/widgets/timeseries/timeseries_setup.png" alt="Configuration de séries temporelles"  style="width:80%;" >}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la [documentation sur les graphiques][3] pour configurer une requête de métrique.
    * Événements APM : consultez la [documentation sur la recherche de traces][4] pour configurer une requête d'événement APM.
    * Événements de log : consultez la [documentation sur la recherche de logs][5] pour configurer une requête d'événement de log.

2. Personnalisez votre graphique avec les [options](#options) disponibles.

### Options
#### Graphiques linéaires

Les graphiques linéaires comprennent deux paramètres supplémentaires :

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

Chaque requête ou formule peut avoir un alias. L'alias remplace le nom sur le graphique et la légende, ce qui est utile pour les longs noms de métrique. À la fin de la requête/formule, cliquez sur **as...**, puis saisissez votre alias de métrique :

{{< img src="graphing/index/metric_alias.png" alt="Alias de métrique"  style="width:75%;" >}}

##### Superposer des événements

Intégrez des événements de systèmes associés pour ajouter plus de contexte à votre graphique. Par exemple, vous pouvez ajouter des commits Github, des déploiements Jenkins ou des événements de création Docker. Développez la section **Event Overlays** et saisissez une requête pour afficher ces événements. Utilisez le même format de requête que pour [le flux d'événements][6], par exemple :

| Requête                       | Description                                                |
|-----------------------------|------------------------------------------------------------|
| `sources:jenkins`           | Affiche tous les événements provenant de la source Jenkins.                  |
| `tag:role:web`              | Affiche tous les événements avec le tag `role:web`.                  |
| `tags:$<TEMPLATE_VARIABLE>` | Affiche tous les événements provenant de la [template variable][7] sélectionnée. |

##### Commandes de l'axe des ordonnées

Les commandes de l'axe des ordonnées sont disponibles via l'interface utilisateur et l'éditeur JSON. Grâce à ces commandes, vous pouvez :

* Régler l'axe des ordonnées sur un intervalle donné.
* Changer automatiquement les limites de l'axe des ordonnées en définissant un pourcentage ou une valeur absolue. Une limite peut être appliquée à l'une des deux extrémités du graphique (inférieure ou supérieure) pour supprimer les singularités.
* Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance.

Changer l'échelle de l'axe des ordonnées en développant le bouton *Y-Axis Controls*.

Les options de configuration suivantes sont disponibles :

| Option                | Obligatoire | Description                                                                                                                                                                                                       |
|-----------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Min`/`Max`           | Non       | Spécifie la valeur minimale et/ou maximale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `Auto` (la valeur par défaut).                                                                                                     |
| `Scale`               | Non       | Spécifie le type d'échelle. Valeurs autorisées :<br>- *linear* : une échelle linéaire (échelle par défaut).<br>- *log* : une échelle logarithmique<br>- *pow* : une échelle exprimée en puissance de 2. La valeur par défaut est 2, mais celle-ci peut être modifiée dans l'éditeur JSON.<br>- *sqrt* : une échelle exprimée sous la forme d'une racine carrée. |
| `Always include zero` | Non       | Indique s'il faut toujours inclure le zéro ou ajuster l'axe à la plage de données. Par défaut, le zéro est toujours inclus.                                                                                                                     |

**Remarque** : comme la fonction log mathématique n'accepte pas les valeurs négatives, notre échelle log ne fonctionne que si les valeurs ont le même signe (tout > 0 ou tout < 0). Si ce n'est pas le cas, un graphique vide s'affiche.

## Plein écran

Outre les [options de plein écran standard][8], vous pouvez appliquer des fonctions rapides, effectuer des comparaisons par rapport à des périodes précédentes, régler l'échelle de l'axe des ordonnées, enregistrer des modifications ou enregistrer un nouveau graphique.

Consultez l'article [Explorer les données sous la forme d'un graphique en plein écran][9] (en anglais) pour en savoir plus.

## API

Le [schéma JSON][10] utilisé pour le widget Série temporelle est le suivant :

```
TIMESERIES_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["timeseries"]},
        "requests": {
            "type":    "array",
            "items":   REQUEST_SCHEMA,
            "minItems": 1
        },
        "yaxis":   AXIS_SCHEMA,
        "events":  EVENTS_SCHEMA,
        "markers": MARKERS_SCHEMA,
        "title":   {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Paramètre  | Type             | Obligatoire | Description                                                                                                                                              |
|------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | string           | oui      | Type de widget (utilisez `timeseries` pour le widget Série temporelle).                                                                                              |
| `requests` | tableau d'objets | oui      | Tableau d'un objet `request` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][11] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `yaxis`    | objet           | non       | Options de commande de l'axe des ordonnées. Consultez la [documentation relative au schéma JSON de l'axe des ordonnées][12] pour apprendre à élaborer le `AXIS_SCHEMA`.                                |
| `events`   | objet           | non       | Options de commande de superposition d'événements. Consultez la [documentation relative au schéma JSON des événements][13] pour apprendre à élaborer le `EVENTS_SCHEMA`.                        |
| `markers`  | objet           | non       | Options de commande de superposition de marqueurs. Consultez la [documentation relative au schéma JSON des marqueurs][14] pour apprendre à élaborer le `MARKERS_SCHEMA`.                    |
| `title`    | string           | non       | Titre de votre widget.                                                                                                                                    |

Propriétés supplémentaires autorisées dans chaque objet `request` :

```json
{
    "style": {
        "type": "object",
        "properties": {
            "palette":    {"type": "string"},
            "line_type":  {"enum": ["dashed", "dotted", "solid"]},
            "line_width": {"enum": ["normal", "thick", "thin"]}
        },
        "additionalProperties": false
    },
    "metadata": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "expression": {"type": "string"},
                "alias_name": {"type": "string"}
            },
            "required": ["expression"],
            "additionalProperties": false
        }
    },
    "display_type": {"enum": ["area", "bars", "line"]}
}
```

| Paramètre          | Type   | Obligatoire | Description                                                                              |
|--------------------|--------|----------|------------------------------------------------------------------------------------------|
| `style.palette`    | chaîne | non       | Palette de couleurs à appliquer au widget.                                                    |
| `style.line_type`  | string | non       | Type des lignes affichées. Valeurs disponibles : `dashed`, `dotted` ou `solid`.           |
| `style.line_width` | string | non       | Largeur des lignes affichées. Valeurs disponibles : `normal`, `thick` ou `thin`.             |
| `metadata`         | objet | non       | Utilisé pour définir des alias d'expression.                                                       |
| `display_type`     | string | non       | Type d'affichage à utiliser pour la requête. Valeurs disponibles : `area`, `bars` ou `line`. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/graphing/dashboards/timeboard
[2]: /fr/graphing/dashboards/screenboard
[3]: /fr/graphing
[4]: /fr/tracing/search/#search-bar
[5]: https://docs.datadoghq.com/fr/logs/explorer/search/#search-syntax
[6]: /fr/graphing/event_stream
[7]: /fr/graphing/dashboards/template_variables
[8]: /fr/graphing/widgets/#full-screen
[9]: https://www.datadoghq.com/blog/full-screen-graphs
[10]: /fr/graphing/graphing_json/widget_json
[11]: /fr/graphing/graphing_json/request_json
[12]: /fr/graphing/graphing_json/widget_json/#y-axis-schema
[13]: /fr/graphing/graphing_json/widget_json/#events-schema
[14]: /fr/graphing/graphing_json/widget_json/#markers-schema