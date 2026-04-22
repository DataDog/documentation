---
description: Découvrez des exemples de visualisations et de scénarios d'utilisation
  des widgets Wildcard en vous servant de Vega-Lite pour créer des graphiques personnalisés.
further_reading:
- link: /dashboards/widgets/wildcard
  tag: Documentation
  text: En savoir plus sur le widget Wildcard
- link: /dashboards/guide/using_vega_lite_in_wildcard_widgets
  tag: Documentation
  text: Utiliser Vega-Lite dans des widgets Wildcard
title: Exemples de widget Wildcard
---

## Présentation
Le widget Wildcard est un outil puissant qui vous permet de créer des visualisations personnalisées dans des dashboards Datadog à l'aide de Vega-Lite, un langage déclaratif conçu pour créer des graphiques interactifs. Grâce à cette fonctionnalité flexible, vous pouvez concevoir des visualisations plus poussées que des widgets standard, afin d’adapter les représentations de vos données à vos besoins spécifiques en surveillance et analyse.

Ces exemples sont conçus pour illustrer la flexibilité et l'utilité du widget Wildcard pour la création de visualisations personnalisées qui dépassent les fonctionnalités offertes par les widgets standard. Chaque exemple comprend une description des principales caractéristiques, un aperçu visuel, ainsi que le code de configuration complet Vega-Lite que vous pouvez copier et adapter à vos propres dashboards.

## Geomap avec transformation de données
Le widget Wildcard permet de créer des geomaps personnalisées capables de transformer des données. Dans l'exemple suivant, des fournisseurs de service Internet sont représentés sur une carte d'Europe continentale en fonction de données de log. La carte comprend des infobulles interactives qui affichent des informations supplémentaires sur les fournisseurs lorsque l'utilisateur passe son curseur sur des points de données.

**Principales caractéristiques** :
- Projection d'Albers personnalisée centrée sur l'Europe
- Code couleur appliqué aux positions des fournisseurs
- Infobulles interactives fournissant des détails sur les fournisseurs
- Données provenant directement des requêtes de log

{{< img src="/dashboards/guide/wildcard_examples/geomap_with_data_transform.png" alt="Geomap de l'Europe continentale affichant la position de fournisseurs de service Internet avec des marqueurs identifiés par un code couleur et des infobulles interactives" style="width:100%;" >}}

{{< img src="/dashboards/guide/wildcard_examples/geomap_with_data_transform_config.png" alt="Code de configuration de l'exemple de geomap avec transformation de données" style="width:100%;" >}}

{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "projection": {
   "type": "albers",
   "rotate": [
     -12,
     -15,
     0
   ],
   "scale": 700
 },
 "layer": [
   {
     "data": {
       "sphere": true
     },
     "mark": {
       "type": "geoshape",
       "fill": "skyblue"
     }
   },
   {
     "data": {
       "url": "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json",
       "format": {
         "type": "topojson",
         "feature": "countries"
       }
     },
     "mark": {
       "type": "geoshape",
       "fill": "#e0ffd4",
       "stroke": "gray",
       "strokeWidth": 5,
       "strokeOpacity": 0.1,
       "strokeJoin": "round",
       "strokeCap": "round"
     }
   },
   {
     "data": {
       "name": "table1"
     },
     "encoding": {
       "latitude": {
         "field": "attributes.network.client.geoip.location.latitude",
         "type": "quantitative"
       },
       "longitude": {
         "field": "attributes.network.client.geoip.location.longitude",
         "type": "quantitative"
       },
       "color": {
         "field": "attributes.network.client.geoip.as.name",
         "type": "ordinal",
         "title": "Provider",
         "scale": {
           "scheme": "set1"
         }
       }
     },
     "mark": {
       "type": "point",
       "filled": true,
       "opacity": 0.75,
       "size": 200,
       "tooltip": true
     }
   }
 ]
}

```
{{% /collapse-content %}}

## Croisement de données avec des tables de référence

Vous pouvez optimiser vos visualisations en croisant des requêtes de données Wildcard à des [tables de référence][1], afin d'ajouter des mappages personnalisés. L'exemple suivant représente des volumes de log par service, avec un code couleur basé sur les informations relatives à l'équipe responsable provenant d'une table de référence.

**Principales caractéristiques** :
- Données opérationnelles combinées à des informations de contexte sur l'entreprise
- Création de regroupements pertinents basés sur la structure de l'organisation
- Simplification des relations complexes grâce aux mappages personnalisés
- Filtrage et analyse basés sur les équipes

{{< img src="/dashboards/guide/wildcard_examples/bar-chart-with-reference-table.png" alt="Graphique à barres représentant des données de log associées à la propriété des services, afin d'illustrer la possibilité de croiser des données avec une table de référence" style="width:100%;" >}}

{{< img src="/dashboards/guide/wildcard_examples/bar-chart-with-reference-table-config.png" alt="Code de configuration pour l'exemple de graphique à barres avec une table de référence." style="width:100%;" >}}

{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```javascript
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "description": "Log volume by team ownership.",
 "data": {
   "name": "table1"
 },
 "mark": "bar",
 "encoding": {
   "x": {
     "field": "service",
     "type": "nominal",
     "title": "Service"
   },
   "y": {
     "field": "query1",
     "type": "quantitative",
     "title": "Log Count",
     "scale": {
       "type": "sqrt"
     }
   },
   "color": {
     "field": "team_name",
     "type": "nominal",
     "title": "Team",
     "scale": {
       "range": [
         "#1f77b4",
         "#ff7f0e",
         "#2ca02c",
         "#d62728",
         "#9467bd",
         "#8c564b",
         "#e377c2",
         "#7f7f7f",
         "#bcbd22",
         "#17becf",
         "#393b79",
         "#637939"
       ]
     }
   },
   "tooltip": [
     {
       "field": "team_name",
       "type": "nominal",
       "title": "Team"
     },
     {
       "field": "query1",
       "type": "quantitative",
       "title": "Log Count"
     }
   ]
 }
}

```
{{% /collapse-content %}}

## Diagramme circulaire représentant plusieurs métriques avec un menu contextuel

Le widget Wildcard permet de créer des graphiques circulaires dont chaque part représente une métrique ou une formule différente, à l'aide de l'opérateur de transformation « fold ». Cette représentation est particulièrement utile pour visualiser des données provenant d'intégrations comme Fastly, qui transmet des métriques distinctes pour chaque code de statut, au lieu d'une seule métrique taguée avec différentes valeurs de statut.

Cet exemple illustre comment créer un diagramme circulaire représentant plusieurs métriques, avec un menu contextuel interactif permettant aux utilisateurs d'afficher plus de détails sur des points de données spécifiques.

**Principales caractéristiques** :
- Combinaison de plusieurs métriques au sein d'une seule visualisation
- Utilisation de la transformation « fold » afin de convertir différentes requêtes en parts
- Application de jeux de couleurs personnalisés afin de différentier les différentes catégories de données 
- Infobulles interactives affichant des informations détaillées au survol
- Intégration d'un menu contextuel permettant d'approfondir l'analyse

{{< img src="dashboards/guide/wildcard_examples/multi_metric_pie_chart.png" alt="Graphique circulaire représentant plusieurs métriques avec un menu contextuel" style="width:100%;" >}}

{{< img src="dashboards/guide/wildcard_examples/multi_metric_pie_chart_config.png" alt="Configuration pour un graphique circulaire représentant plusieurs métriques" style="width:100%;" >}}

{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```javascript
{
 "description": "A simple pie chart with multiple scalar queries",
 "encoding": {
   "color": {
     "field": "http\\.status_code",
     "scale": {
       "scheme": "dogcat"
     },
     "type": "nominal"
   },
   "theta": {
     "field": "value",
     "type": "quantitative"
   },
   "tooltip": [
     {
       "field": "http.status_code",
       "type": "nominal"
     },
     {
       "field": "value",
       "type": "quantitative"
     }
   ]
 },
 "transform": [
   {
     "fold": [
       "400",
       "403",
       "404"
     ],
     "as": [
       "http.status_code",
       "value"
     ]
   }
 ],
 "mark": "arc",
 "params": [
   {
     "name": "datadogPointSelection",
     "select": "point"
   }
 ],
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "data": {
   "name": "table1"
 }
}
```
{{% /collapse-content %}}


## Histogramme multicouche

L'exemple suivant correspond à un histogramme multicouche qui compare les durées d'erreur aux durées de trace globales. Cette visualisation est particulièrement utile pour identifier les goulets d'étranglement liés aux performances, en représentant la distribution des durées d'erreur par rapport à celles des opérations normales. En superposant ces distributions, vous pouvez identifier les situations dans lesquelles le traitement des erreurs est nettement plus long, ce qui vous aide à définir les problèmes à traiter en priorité en fonction de leur impact sur les performances.

**Principales caractéristiques** :
- Utilisation de la transformation `joinaggregate` pour calculer les fréquences relatives
- Infobulles personnalisées avec des valeurs mises en forme
- Configuration de la mise en forme des unités pour les durées (en nanosecondes)
- Superposition de plusieurs séries de données permettant d'effectuer une comparaison visuelle

{{< img src="dashboards/guide/wildcard_examples/multi_layer_histogram_1.png" alt="Historigramme multicouche comparant des durées d'erreur à des durées de trace globales" style="width:100%;" >}}

{{< img src="dashboards/guide/wildcard_examples/multi_layer_histogram_config.png" alt="Configuration pour une visualisation d'histogramme multicouche" style="width:100%;" >}}

{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```javascript
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "config": {
   "customFormatTypes": true
 },
 "encoding": {
   "x": {
     "field": "min",
     "type": "quantitative",
     "axis": {
       "formatType": "hoverFormatter",
       "format": {
         "units": [
           "nanosecond",
           null
         ]
       }
     },
     "title": "duration"
   },
   "x2": {
     "field": "max"
   },
   "y": {
     "field": "relative_frequency",
     "type": "quantitative",
     "title": "Relative Frequency"
   },
   "tooltip": [
     {
       "field": "count"
     },
     {
       "field": "min",
       "formatType": "hoverFormatter",
       "format": {
         "units": [
           "nanosecond",
           null
         ]
       }
     },
     {
       "field": "max",
       "formatType": "hoverFormatter",
       "format": {
         "units": [
           "nanosecond",
           null
         ]
       }
     },
     {
       "field": "relative_frequency",
       "format": "0.3f"
     }
   ]
 },
 "layer": [
   {
     "data": {
       "name": "table2"
     },
     "transform": [
       {
         "joinaggregate": [
           {
             "op": "sum",
             "field": "count",
             "as": "total_count"
           }
         ]
       },
       {
         "calculate": "datum.count / datum.total_count",
         "as": "relative_frequency"
       }
     ],
     "mark": {
       "type": "rect",
       "color": "gray",
       "opacity": 0.8
     }
   },
   {
     "data": {
       "name": "table1"
     },
     "transform": [
       {
         "joinaggregate": [
           {
             "op": "sum",
             "field": "count",
             "as": "total_count"
           }
         ]
       },
       {
         "calculate": "datum.count / datum.total_count",
         "as": "relative_frequency"
       }
     ],
     "mark": {
       "type": "rect",
       "color": "pink",
       "tooltip": {
         "content": "data"
       }
     }
   }
 ]
}

```
{{% /collapse-content %}}

## Nuages de points avec des mots colorés

Créez un nuage de points personnalisé qui utilise des mots à la place de points, et appliquez automatiquement des couleurs provenant de la palette Datadog. Les étiquettes de texte sont directement intégrées au graphique, ce qui améliore la lisibilité tout en conservant les relations de données positionnelles d'un nuage de points traditionnel.

**Principales caractéristiques** :
- Éléments textuels utilisés comme points de données pour gagner en lisibilité
- Attribution automatique des couleurs à l'aide du jeu de couleurs Datadog 
- Axes personnalisables pour différentes métriques (p50 et p95 dans cet exemple)
- Codage visuel qui combine la position et les couleurs, pour une analyse multidimensionnelle
- Représentation compacte de données catégorielles dans un espace quantitatif

{{< img src="dashboards/guide/wildcard_examples/text_color_scatterplot.png" alt="Nuage de points basé sur du texte, avec la palette de couleurs Datadog, permettant de visualiser les métriques p50 et p95" style="width:100%;" >}}

{{< img src="dashboards/guide/wildcard_examples/text_color_scatterplot_config.png" alt="Configuration du widget Wildcard de nuage de points" style="width:100%;" >}}

{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```javascript
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "data": {
   "name": "table1"
 },
 "encoding": {
   "x": {
     "field": "query1",
     "type": "quantitative",
     "axis": {
       "title": "p50"
     }
   },
   "y": {
     "field": "query2",
     "type": "quantitative",
     "axis": {
       "title": "p95"
     }
   },
   "text": {
     "field": "viz"
   },
   "color": {
     "field": "viz",
     "type": "nominal",
     "scale": {
       "scheme": "dogcat"
     }
   }
 },
 "mark": {
   "type": "text"
 }
}

```
{{% /collapse-content %}}


## Carte thermique catégorielle avec filtrage temporel

La carte thermique catégorielle de cet exemple affiche des données temporelles et des catégories et comporte des capacités de filtrage avancées. Les cartes thermiques permettent de découvrir des tendances et des singularités à partir de données multidimensionnelles. Elles constituent donc un outil idéal pour le suivi de catégories et de l'évolution de métriques.

**Principales caractéristiques** :
- Filtrage des données afin d'exclure les valeurs nulles ou négatives
- Mise en forme des unités de temps pour le regroupement des données temporelles
- Infobulles interactives affichant des informations détaillées au survol
- Menu contextuel permettant d'approfondir l'analyse
- Dégradé de couleur représentant l'intensité des données

{{< img src="dashboards/guide/wildcard_examples/categorical_heatmap_1.png" alt="Variation horaire de la carte thermique catégorielle affichant des tendances concernant l'activité liée aux référentiels selon l'heure de la journée" style="width:100%;" >}}

{{< img src="dashboards/guide/wildcard_examples/categorical_heatmap_config.png" alt="Volet de configuration pour la carte thermique catégorielle avec les paramètres d'heure et de catégorie" style="width:100%;" >}}


{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```javascript
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "name": "table1"
  },
  "encoding": {
    "x": {
      "title": null,
      "field": "_time",
      "type": "temporal",
      "timeUnit": "utcmonthdate"
    },
    "y": {
      "title": null,
      "field": "_time",
      "type": "temporal",
      "timeUnit": "utchours"
    },
    "color": {
      "field": "result1",
      "type": "quantitative",
      "title": "PRs Closed",
      "scale": {
        "scheme": "blues"
      }
    }
  },
  "mark": {
    "type": "rect",
    "tooltip": {
      "content": "data"
    }
  },
  "transform": [
    {
      "filter": "datum.result1 > 0"
    }
  ]
}


```
{{% /collapse-content %}}


## Graphique de type Lollipop

Cet exemple présente un graphique de type Lollipop (en forme de sucette) qui permet de classer facilement des éléments et de mettre en avant leur valeur relative. Les graphiques de type Lollipop s'avèrent particulièrement utiles pour comparer les valeurs de plusieurs catégories sans encombrer le rendu de la visualisation. En associant la précision des points à l’orientation visuelle apportée par les lignes, les graphiques Lollipop rendent la lecture et la comparaison des données plus aisées qu’avec des graphiques à barres classiques, surtout lorsqu'un grand nombre de catégories sont représentées ou lorsqu'il est crucial de comparer des valeurs exactes.

**Principales caractéristiques** :
- Classement visuel amélioré par rapport aux toplists traditionnelles
- Combinaison de barres et de points pour une meilleure lisibilité
- Tri automatique pour mettre en évidence les meilleurs et les moins bons élèves
- Mise en forme personnalisée des étiquettes d'axe pour une présentation plus claire
- Distinction visuelle entre le rang et la valeur de la métrique

{{< img src="dashboards/guide/wildcard_examples/lollipop.png" alt="Graphique de type Lollipop affichant l'utilisation du CPU classée par équipe, avec des lignes horizontales et des cercles représentant des endpoints, pour une comparaison visuelle simplifiée" style="width:100%;" >}}

{{< img src="dashboards/guide/wildcard_examples/lollipop_config.png" alt="Volet de configuration pour un graphique de type Lollipop avec les paramètres des sources de données, du tri et des styles visuels" style="width:100%;" >}}

{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "data": {
   "name": "table1"
 },
 "description": "A lollipop / dot plot",
 "layer": [
   {
     "encoding": {
       "x": {
         "field": "query1",
         "title": "cpu usage",
         "type": "quantitative"
       },
       "y": {
         "sort": "-x",
         "field": "team",
         "type": "nominal"
       }
     },
     "mark": {
       "type": "rule",
       "color": "#3598eccc"
     }
   },
   {
     "encoding": {
       "x": {
         "field": "query1",
         "title": "cpu usage",
         "type": "quantitative"
       },
       "y": {
         "sort": "-x",
         "field": "team",
         "type": "nominal",
         "axis": {
           "labelExpr": "upper(substring(replace(datum.label, /[-_]/g, ' '), 0, 1)) + lower(substring(replace(datum.label, /[-_]/g, ' '), 1))",
           "labelPadding": 10
         }
       }
     },
     "mark": {
       "type": "point",
       "filled": true,
       "color": "#3598ec",
       "size": 100
     }
   }
 ]
}

```
{{% /collapse-content %}}


## Widget de texte de statut personnalisé
Créez un widget de texte réactif qui change de couleur en fonction d'une logique conditionnelle appliquée à vos métriques.

Pour cet exemple, un widget de statut affiche des statistiques sur l'utilisation de Firefox. La couleur du texte varie en fonction du résultat d'une comparaison avec les données d'utilisation de Safari. Le texte devient vert lorsque l'utilisation de Firefox est au moins 10 fois supérieure à celle de Safari, et rouge dans les cas contraires.

**Principales caractéristiques** :
- Coloration conditionnelle du texte basée sur des comparaisons de seuil
- Mise en forme personnalisée du texte avec association de plusieurs métriques au sein d'une seule visualisation
- Taille de la police variant en fonction des dimensions du widget 
- Affichage combiné des valeurs absolues et des pourcentages
- Transformation des données afin de créer des métriques dérivées pour la logique décisionnelle

{{< img src="dashboards/guide/wildcard_examples/custom_status_text.png" alt="Widget de texte de statut personnalisé, avec les statistiques d'utilisation de Firefox dont la couleur varie selon le résultat d'une comparaison avec les statistiques de Safari" style="width:100%;" >}}

{{< img src="dashboards/guide/wildcard_examples/custom_status_text_config.png" alt="Configuration du widget de texte de statut personnalisé" style="width:100%;" >}}


{{% collapse-content title="Configuration Vega-Lite" level="h4" expanded=false %}}
```
{
 "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
 "description": "Customize a text display using a transform and conditional coloring",
 "data": {
   "name": "table1"
 },
 "transform": [
   {
     "calculate": "'Firefox: ' + datum.num_firefox + ' of ' + format(datum.num_total, '.3s') + ' (' + format(datum['fraction'], '.0%') + ')'",
     "as": "display_text"
   },
   {
     "calculate": "datum.num_firefox >= 10 * datum.num_safari",
     "as": "is_firefox_ahead"
   }
 ],
 "mark": {
   "type": "text",
   "align": "center",
   "baseline": "middle",
   "fontSize": {
     "expr": "width / 18"
   }
 },
 "encoding": {
   "text": {
     "field": "display_text",
     "type": "nominal"
   },
   "color": {
     "condition": {
       "test": "datum.is_firefox_ahead",
       "value": "rgb(45,195,100)"
     },
     "value": "red"
   }
 }
}

```
{{% /collapse-content %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/reference_tables