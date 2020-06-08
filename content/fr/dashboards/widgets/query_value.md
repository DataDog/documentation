---
title: Widget Valeur de requête
kind: documentation
description: Afficher une valeur agrégée pour une requête de métrique donnée
aliases:
  - /fr/graphing/widgets/query_value/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Les valeurs de requête affichent la valeur actuelle d'une requête de métrique, d'APM ou de log donnée. Elles disposent d'une mise en forme conditionnelle (comme un arrière-plan vert/jaune/rouge) pour indiquer si la valeur figure dans la plage attendue.
Les valeurs affichées par une valeur de requête ne représentent pas nécessairement une mesure instantanée.

Le widget peut afficher la dernière valeur transmise, ou une agrégation calculée à partir de toutes les valeurs de requête de l'intervalle. Ces visualisations offrent un aperçu limité mais explicite de votre requête d'infrastructure. 

{{< img src="dashboards/widgets/query_value/query_value.png" alt="Widget Valeur de requête" >}}

## Configuration

{{< img src="dashboards/widgets/query_value/query_value_setup.png" alt="Configuration du widget Valeur de requête" style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la documentation sur les [requêtes][1] pour configurer une requête de métrique.
    * Spans analysées : consultez la [documentation sur la recherche de traces][2] pour configurer une requête de span analysée.
    * Événements de log : consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log.
2. Choisissez les unités et la mise en forme.
3. Facultatif : configurez une mise en forme conditionnelle en fonction de la valeur affichée.

### Options

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][4] utilisé pour le widget Valeur de requête est le suivant :

```text
QUERY_VALUE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["query_value"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "autoscale":   {"type": "boolean"},
        "custom_unit": {"type": "string"},
        "precision":   {"type": "integer"},
        "text_align":  {"enum": ["center", "left", "right"]},
        "title":       {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Paramètre     | Type             | Obligatoire | Description                                                                                                                                                  |
|---------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | chaîne           | oui      | Type de widget (utilisez `query_value` pour le widget Valeur de requête)                                                                                                |
| `requests`    | tableau d'objets | oui      | Tableau d'un objet `request` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][5] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `autoscale`   | Booléen          | non       | Indique si la mise à l'échelle automatique doit être utilisée ou non.                                                                                                                           |
| `custom_unit` | chaîne           | non       | Affichez une unité au choix sur le widget.                                                                                                                 |
| `precision`   | nombre entier          | non       | Nombre de décimales à afficher. Si vous ne définissez pas ce paramètre, le widget utilise une valeur brute.                                                                                   |
| `text_align`  | chaîne           | non       | Alignement de la valeur dans le widget. Valeurs disponibles : `center`, `left` ou `right`.                                                                     |
| `title`       | chaîne           | non       | Titre de votre widget.                                                                                                                                        |

Propriétés supplémentaires autorisées dans l'objet `request` :

```text
{
    "conditional_formats": CONDITIONAL_FORMATS_SCHEMA,
    "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}
}
```

| Paramètre             | Type   | Obligatoire | Description                                                                                                                                                     |
|-----------------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `conditional_formats` | objet | non       | Options de commande de mise en forme conditionnelle. Consultez la [documentation relative au schéma JSON de mise en forme conditionnelle][6] pour apprendre à élaborer le `CONDITIONAL_FORMATS_SCHEMA`. |
| `aggregator`          | enum   | non       | Agrégateur utilisé pour la requête. Valeurs disponibles : `avg`, `last`, `max`, `min` ou `sum`.                                                                   |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/#overview
[2]: /fr/tracing/app_analytics/search/#search-bar
[3]: /fr/logs/search_syntax/
[4]: /fr/dashboards/graphing_json/widget_json/
[5]: /fr/dashboards/graphing_json/request_json/
[6]: /fr/dashboards/graphing_json/widget_json/#conditional-format-schema