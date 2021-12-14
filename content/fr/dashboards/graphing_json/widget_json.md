---
title: Schéma JSON des widgets
kind: documentation
aliases:
  - /fr/graphing/graphing_json/widget_json/
further_reading:
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
  - link: /dashboards/graphing_json/request_json/
    tag: Documentation
    text: Schéma JSON des requêtes
---
Pour en savoir plus sur l'éditeur visuel, consultez la documentation sur l'[éditeur de graphiques][1].

## Schéma de l'axe des ordonnées

Grâce aux commandes de l'axe des ordonnées de Datadog, vous pouvez :

*   Régler l'axe des ordonnées sur un intervalle donné
*   Filtrer les séries en spécifiant un pourcentage ou une valeur absolue
*   Changer l'échelle de l'axe des ordonnées afin de passer d'une échelle linéaire à une échelle logarithmique, racine carrée ou puissance

Le schéma est :

```text
AXIS_SCHEMA = {
    "type": "object",
    "properties": {
        "scale":        {"type": "string"},
        "min":          {"type": "string"},
        "max":          {"type": "string"},
        "include_zero": {"type": "boolean"}
    },
    "additionalProperties": false
}
```

| Paramètre      | Type    | Description                                                                                           | Valeur par défaut  |
|----------------|---------|-------------------------------------------------------------------------------------------------------|----------|
| `scale`        | chaîne  | Spécifie le type d'échelle. Valeurs autorisées : `linear`, `log`, `sqrt`, `pow##` (par exemple : `pow2`, `pow0.5`.)  | `linear` |
| `min`          | chaîne  | Spécifie la valeur minimale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `auto` pour le comportement par défaut.     | `auto`   |
| `max`          | chaîne  | Spécifie la valeur maximale à afficher sur l'axe des ordonnées. Indiquez un nombre ou `auto` pour le comportement par défaut. | `auto`   |
| `include_zero` | Booléen |                                                                                                       |          |

## Schéma des événements

Vous pouvez superposer n'importe quel événement de Datadog. Le format général pour `events` est comme suit :

```text
EVENTS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "q": {"type": "string"},
        },
        "required": ["q"],
        "additionalProperties": false
    }
}
```

Consultez la [documentation relative au flux d'événements][2] pour en savoir plus sur la syntaxe `<EVENT_QUERY>`.

### Exemples

Par exemple, pour indiquer que vous souhaitez afficher les événements du host X et du tag Y :

```text
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

ou si vous cherchez à afficher toutes les erreurs :

```text
"events": [
  {
    "q": "status:error"
  }
]
```

## Schéma des marqueurs

Les marqueurs vous permettent d'ajouter une mise en forme conditionnelle visuelle pour vos graphiques. Le format pour `markers` est le suivant :

```text
MARKERS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "value":        {"type": "string"},
            "display_type": {"type": "string"},
            "label":        {"type": "string"}
        },
        "required": ["value"],
        "additionalProperties": false
    }
}
```

| Paramètre      | Type   | Description                                                                                                           |
|----------------|--------|-----------------------------------------------------------------------------------------------------------------------|
| `value`        | chaîne | Valeur à appliquer. Peut être une valeur unique `y = 15` ou une plage de valeurs `0 < y < 10`                                      |
| `display_type` | chaîne | Combinaison des éléments suivants : <br>- Un niveau de gravité `error`, `warning`, `ok` ou `info` <br> - Un type de ligne `dashed`, `solid` ou `bold` |
| `label`        | chaîne | Libellé à afficher sur le marqueur.                                                                                     |

### Exemple :

Les marqueurs suivants :

{{< img src="dashboards/graphing_json/markers.png" alt="Marqueurs"  style="width:80%;">}}

sont appliqués avec la configuration suivante :

```text
{ (...)
  "widgets": [
    {
      "definition": {
        "markers": [
          {
            "display_type": "ok dashed",
            "label": "OK",
            "value": "0 < y < 50"
          },
          {
            "display_type": "error dashed",
            "label": "ALERT",
            "value": "y > 80"
          },
          {
            "display_type": "warning dashed",
            "label": "WARNING",
            "value": "50 < y < 80"
          }
        ],
        "requests": [(...)],
        "title": "CPU with markers",
        "type": "timeseries"
      },
(...)
},
```

## Schéma des formats conditionnels

Les formats conditionnels vous permettent de définir la couleur du contenu ou de l'arrière-plan de votre widget, en fonction d'une règle appliquée à vos données.

```text
CONDITIONAL_FORMATS_SCHEMA = {
    "type": "array",
    "items": {
        "type": "object",
        "properties": {
            "comparator":      {"enum": [">", ">=", "<", "<="]},
            "value":           {"type": "number"},
            "palette":         {"enum": ["blue","custom_bg","custom_image","custom_text","gray_on_white","green","green_on_white","grey","orange","red","red_on_white","white_on_gray","white_on_green","white_on_red","white_on_yellow","yellow_on_white",
            ]},
            "custom_bg_color": {"type": "string"},
            "custom_fg_color": {"type": "string"},
            "image_url":       {"type": "string", "format": "uri"},
        },
        "required": ["comparator", "value", "palette"],
        "additionalProperties": false
    }
}
```

| Paramètre         | Type   | Description                                                                                                                                                                                                                                                             |
|-------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `comparator`      | enum   | Comparateur à appliquer. Valeurs autorisées : `>`, `>=`, `<` ou `<=`                                                                                                                                                                                                                       |
| `value`           | double | Valeur pour le comparateur.                                                                                                                                                                                                                                               |
| `palette`         | chaîne | Palette de couleurs à appliquer. Valeurs autorisées :`blue`, `custom_bg`, `custom_image`, `custom_text`, `gray_on_white`, `green`, `green_on_white`, `grey`, `orange`, `red`, `red_on_white`, `white_on_gray`, `white_on_green`, `white_on_red`, `white_on_yellow` ou `yellow_on_white` |
| `custom_bg_color` | chaîne | Palette de couleurs à appliquer à l'arrière-plan. Les valeurs autorisées sont les mêmes que pour palette.                                                                                                                                                                                             |
| `custom_fg_color` | chaîne | Palette de couleurs à appliquer au premier plan. Les valeurs autorisées sont les mêmes que pour palette.                                                                                                                                                                                             |
| `image_url`       | chaîne | Affiche une image en tant qu'arrière-plan.                                                                                                                                                                                                                                    |
## Schéma des intervalles

Les intervalles de temps disponibles dépendent du widget que vous utilisez, mais le format général pour `time` est le suivant :

```text
TIME_SCHEMA = {
    "type": "object",
    "properties": {
        "live_span": {"enum": [
            '1m',
            '5m',
            '10m',
            '15m',
            '30m',
            '1h',
            '4h',
            '1d',
            '2d',
            '1w',
            '1mo',
            '3mo',
            '6mo',
            '1y',
            'alert'
        ]}
    },
    "additionalProperties": false
}
```

| Paramètre   | Type   | Description                                                                                                                                                                                                                                                                                                                                                                                                    |
|-------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `live_span` | chaîne | Nom court pour représenter une valeur d'intervalle de temps. Valeurs acceptées :<br> -`1m` : 1 minute<br> -`5m` : 5 minutes<br> -`10m` : 10 minutes<br> -`15m` : 15 minutes<br> -`30m` : 30 minutes<br> -`1h` : 1 heure<br> -`4h` : 4 heures<br> -`1d` : 1 jour<br> -`2d` : 2 jours<br> -`1w` : 1 semaine<br> -`1mo` : 1 mois<br> -`3mo` : 3 mois<br> -`6mo` : 6 mois<br> -`1y` : 1 an<br> -`alert` : utilisée uniquement dans le widget `alert_graph` |

### Exemple

Par exemple, pour indiquer que vous souhaitez afficher un intervalle de temps de 10 minutes, utilisez ce qui suit :

```text
"time": {
  "live_span": "10m"
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/querying/#graphing-editor
[2]: /fr/events/