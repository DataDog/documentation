---
description: Créez des visualisations personnalisées avancées à l'aide de la grammaire
  Vega-Lite dans des widgets Wildcard, afin d'inclure des menus contextuels et des
  éléments interactifs.
further_reading:
- link: https://docs.datadoghq.com/dashboards/widgets/wildcard/
  tag: Documentation
  text: En savoir plus sur le widget Wildcard
- link: https://docs.datadoghq.com/dashboards/guide/wildcard_examples
  tag: Documentation
  text: Exemples de widget Wildcard
- link: https://docs.datadoghq.com/dashboards/guide/context-links/#context-links-variables
  tag: Documentation
  text: Utiliser des liens de contexte dans des dashboards
title: Utiliser Vega-Lite avec des widgets Wildcard dans Datadog
---

## Présentation

Avec les widgets Wildcard de Datadog, Vega-Lite intègre des capacités propres à Datadog qui ne font pas partie de la spécification Vega-Lite standard. Ce guide décrit les configurations nécessaires et les éléments à prendre en compte pour utiliser efficacement Vega-Lite afin de visualiser des données dans Datadog, tout en respectant ses spécifications uniques. La compréhension et l’exploitation de ces spécifications vous permettent de créer des visualisations de données interactives et visuellement abouties, qui s'adaptent efficacement à vos choix thématiques.

**Remarque** : certaines capacités de Vega-Lite sont exclusives à Datadog et peuvent ne pas fonctionner de la même manière si elles sont exportées vers d'autres outils utilisant Vega-Lite.

## Personnalisation du thème et des palettes de couleurs

Datadog propose différentes options de thèmes et de palettes de couleurs vous permettant d'améliorer l'esthétique des widgets. Vous pouvez spécifier des couleurs personnalisées pour qu'elles se fondent avec le style utilisé par les widgets natifs de Datadog. Si vous définissez des couleurs personnalisées, le graphique n'ajustera pas ses couleurs au moment du changement du thème de l'application. Par défaut, les graphiques Datadog ajustent les couleurs du texte et des graduations des axes pour s'assurer que le contraste demeure lisible en mode sombre. Il est préférable de ne pas définir de couleurs personnalisées pour les axes du graphique.

Il est possible de personnaliser les couleurs, la police, l'espacement et d'autres aspects liés au design. Ces paramètres s'appliquent automatiquement lorsque vous utilisez le sélecteur de thème (`CTRL + OPT + D`).

### Palette de couleurs personnalisée

Bien que vous puissiez créer des palettes de couleurs personnalisées à l'aide de codes hexadécimaux, l'utilisation de la palette de couleurs Datadog garantit un basculement automatique entre les modes clair et foncé.

Datadog propose des palettes de couleurs supplémentaires en plus des schémas de couleur publics de Vega, notamment :
- `dog_classic_area`
- `datadog16`
- `hostmap_blues`

{{< whatsnext desc="Additional resources:" >}}
    {{< nextlink href="/dashboards/guide/widget_colors/" >}}En savoir plus sur les schémas de couleur et les thèmes de Datadog{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega/docs/schemes/" >}}Consulter les schémas de couleur Vega{{< /nextlink >}}
{{< /whatsnext >}}


## Personnalisation des unités des visualisations

Datadog met en forme les nombres représentés en tenant compte de [plus de 150 unités][1], ce qui permet de convertir facilement des valeurs telles que 3 600 secondes en 1 heure. Pour utiliser cette fonctionnalité dans votre définition Vega-Lite, ajoutez le paramètre `"config": {"customFormatTypes": true}` à la racine de votre bloc JSON.

Par la suite, chaque fois que vous définissez une clé `format`, utilisez `formatType: hoverFormatter` et définissez vos unités sous forme de tableau. Exemple :

{{% collapse-content title="Example Vega-Lite Spec with custom units" level="h4" %}}
{{< highlight json "hl_lines=11 19-20" >}}
{
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
    "values": [
        {"grade": "A", "total": 28},
        {"grade": "B", "total": 55},
        {"grade": "C", "total": 43}
    ]
    },
    "config": {"customFormatTypes": true},
    "mark": "bar",
    "encoding": {
        "x": {"field": "total", "type": "quantitative"},
        "y": {
            "field": "grade",
            "type": "nominal",
            "axis": {
                "formatType": "hoverFormatter",
                "format": {"units": ["second", null]}
            }
        }
    }
}
{{< /highlight >}}


{{% /collapse-content %}}

Le deuxième élément du tableau « units » représente le terme « par », par exemple « octets par seconde ». Les unités doivent être fournies au singulier (« seconde » au lieu de « secondes »). Il est possible d'utiliser des jetons [au format d3][2] pour appliquer une mise en forme standard à des nombres, par exemple pour la définition de la précision, l'utilisation de la notation scientifique ou l'affichage en nombres entiers. Les deux formats suivants sont les plus souvent utilisés :

* `~s` : préfixe pour la notation scientifique (par exemple, 2000 -> 2k) supprimant les zéros finaux
* `.2f` : virgule flottante avec deux décimales

La fonction `hoverFormatter` peut également être appelée dans des [expressions Vega][3]. Voici sa signature :

```
# `CanonicalUnitName` fait référence à l'une des chaînes définies comme une unité Datadog.

(
   datum: number,
   params?: {
       units?: [CanonicalUnitName, CanonicalUnitName];
   },
)
```

 {{< whatsnext desc="Ressources supplémentaires :" >}}
    {{< nextlink href="/metrics/units/#liste-d-unites" >}}Liste complète des unités Datadog{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega-lite/docs/format.html" >}}Personnalisation du format Vega-Lite{{< /nextlink >}}
    {{< nextlink href="https://vega.github.io/vega/docs/expressions/" >}}Langage d’expression Vega pour l'écriture de formules simples{{< /nextlink >}}
{{< /whatsnext >}}


## Adaptation de la taille

Les widgets utilisent généralement une taille réactive par défaut, qui s'adapte automatiquement à l'espace disponible. Toutefois, vous avez la possibilité de définir une hauteur fixe pour chaque élément de données, en particulier si vous souhaitez activer le défilement au sein d'un diagramme à barres. Tout comme la personnalisation des couleurs, la personnalisation de la taille désactive le dimensionnement réactif automatique.

Par exemple, vous pouvez utiliser la configuration suivante pour spécifier un incrément de hauteur pour chaque élément :

{{% collapse-content title="Example Vega-Lite Spec with custom height" level="h4" %}}
{{< highlight json "hl_lines=3" >}}
{
    "width": 120,
    "height": 120,
    "data": {"url": "data/cars.json"},
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "Name",
            "scale": {"round": false}
        },
        "y": {"aggregate": "count"}
    }
}
{{< /highlight >}}


{{% /collapse-content %}}

## Référencement des données Datadog dans Vega-Lite

Dans Datadog, chaque demande, ou requête, correspond à une [source de données nommée][4] de Vega. Ces sources sont numérotées, en commençant par la valeur 1. Ainsi, si votre widget émet plusieurs requêtes, il génère des ensembles de données correspondants nommés `table1`, `table2`, et ainsi de suite.

{{< img src="/dashboards/guide/using_vega_lite_in_wildcard_widgets/wildcard_multiple_requests.png" alt="Exemple de widget Wildcard avec plusieurs requêtes" style="width:100%;" >}}

Dans la mesure du possible, les widgets Datadog conservent les noms de tag du champ de regroupement de votre requête. Pour les requêtes liées à des formules ou fonctions, par exemple pour des données scalaires ou de série temporelle, des alias de formule sont utilisés comme noms de champ. Consultez la documentation relative au [widget Wildcard][5] pour découvrir un exemple.

### Informations sur les champs supplémentaires

- Les requêtes de série temporelle comprennent un champ `_time` pour les horodatages en millisecondes.
- Les lignes de requête d'histogramme sont composées de trois champs : `start`, `end` et `count`.
- Les réponses aux requêtes de liste varient selon la source de données. Utilisez l'[aperçu des données][6] pour déterminer les champs disponibles.

### Noms de champ avec des caractères spéciaux

Des considérations particulières s'appliquent aux noms de champ qui contiennent des caractères non alphanumériques. Les tags de métrique Datadog [refusent la plupart des caractères non alphanumériques][7]. Cependant, les solutions ne sont pas toutes soumises à cette contrainte, et certaines autorisent des caractères dans les noms d'attribut qui peuvent avoir une double signification dans Vega-Lite. Il s'agit notamment des crochets `[]` et des points `.`, qui sont utilisés pour accéder aux propriétés imbriquées dans des données structurées sous forme d'objets. Ces caractères doivent être échappés, car le backend « aplatit » les données de type /scalar et /timeseries avant de vous les renvoyer.

Pour que ces caractères soient interprétés correctement par le widget Wildcard, vous devez les échapper à l'aide de `\\`. Par exemple, lorsque vous utilisez le champ de requête RUM `@view.name`, utilisez l'écriture `@view\\.name` dans la spécification Vega-Lite.

Pour en savoir plus sur les formats de données pris en charge, consultez la documentation relative au [widget Wildcard][11].

## Menu contextuel et liens de contexte

Dans un widget Datadog, vous pouvez cliquer sur un point de données d'un graphique pour ouvrir un [menu contextuel du graphique][8] comportant des liens de contexte. Vous pouvez activer cette fonctionnalité pour les widgets Wildcard en ajoutant des paramètres spécifiques à la configuration de votre widget.

Pour activer la fonction de menu contextuel, incluez les paramètres suivants dans la configuration Vega-Lite :

```json
"params": [
  {
    "name": "datadogPointSelection",
    "select": "point"
  }
]
```

Si le graphique contient la clé `layer`, le paramètre doit être ajouté à l'un des objets de couche, et non à la racine de la spécification. En effet, les paramètres situés à la racine sont appliqués à toutes les couches, ce qui peut entraîner des conflits. Pour y remédier, attribuez à chaque couche un paramètre doté d'un nom unique comportant un préfixe `datadogPointSelection_`, comme `datadogPointSelection_squares` ou `datadogPointSelection_circles`. Exemple :

```json
"layer": [
  {
    "mark": "line",
    "encoding": {
      "x": { "field": "_time", "type": "temporal" },
      "y": { "field": "cpu", "type": "quantitative" },
      "color": { "field": "host", "type": "nominal" },
      "opacity": { "value": 0.4 }
    },
    "params": [
      {
        "name": "datadogPointSelection_lines",
        "select": { "type": "point", "on": "click" }
      }
    ]
  },
  {
    "mark": "point",
    "encoding": {
      "x": { "field": "_time", "type": "temporal" },
      "y": { "field": "cpu", "type": "quantitative" },
      "color": { "field": "host", "type": "nominal" },
      "size": { "value": 50 }
    },
    "params": [
      {
        "name": "datadogPointSelection_circles",
        "select": { "type": "point", "on": "click" }
      }
    ]
  }
],
```


Après avoir activé cette fonctionnalité, vous pouvez cliquer sur des points de données dans le widget pour ouvrir un menu contextuel. Utilisez le menu contextuel du graphique avec les liens de contexte de l'éditeur de graphique. Les liens de contexte relient les widgets de dashboard à d'autres pages du site Datadog, ainsi qu'à des applications tierces que vous avez intégrées à vos workflows. Pour en savoir plus, consultez la section [Liens de contexte][9].

Vous pouvez également ajouter des liens dynamiques personnalisés grâce à l'[encodage `href`][10]. Cette approche est pertinente si vous n'avez pas besoin de configurer un menu contextuel complet avec différentes options.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/units/#unit-list
[2]: https://d3js.org/d3-format#locale_format
[3]: https://vega.github.io/vega/docs/expressions/
[4]: https://vega.github.io/vega-lite/docs/data.html#named
[5]: /fr/dashboards/widgets/wildcard/#map-datadog-data-to-vega-lite-specifications
[6]: /fr/dashboards/widgets/wildcard/#data-preview
[7]: /fr/getting_started/tagging/#define-tags
[8]: /fr/dashboards/widgets/#graph-menu
[9]: /fr/dashboards/guide/context-links/#context-links-variables
[10]: https://vega.github.io/vega-lite/docs/encoding.html
[11]: /fr/dashboards/widgets/wildcard/#compatible-data-formats