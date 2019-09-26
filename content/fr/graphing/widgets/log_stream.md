---
title: Widget Flux de logs
kind: documentation
description: Affichez un flux de logs filtré dans vos dashboards Datadog.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Affichez un flux de logs correspondant à la requête de votre choix :

{{< img src="graphing/widgets/log_stream/log_stream.png" alt="Flux de logs" responsive="true">}}

## Implémentation
### Configuration

{{< img src="graphing/widgets/log_stream/log_stream_setup.png" alt="Configuration du flux de logs" responsive="true" style="width:80%;">}}

Saisissez une [requête de log][1] pour filtrer le flux de logs.

### Options
#### Colonnes

Affichez les valeurs de vos [facettes][2] et [mesures][3] avec des colonnes.

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget" responsive="true" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][4] utilisé pour le widget Flux de logs est le suivant :

```
LOG_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["log_stream"]},
        "logset": {"type": "string"},
        "query": {"type": "string"},
        "columns": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type", "logset"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|oui|Type du widget (utilisez `log_stream` pour le widget Flux de logs)|
|`logset`|string|oui|Le logset à utiliser pour le flux|
|`query`|string|non|Requête à l'aide de laquelle le flux de logs est filtré|
|`columns`|tableau|non|Les colonnes à afficher sur le widget|
|`title`|string|non|Titre du widget|
|`title_size`|string|non|Taille du titre|
|`title_align`|string|non|Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`
|`time`|objet|non|Définit le paramètre temporel associé au widget. Consultez la [documentation relative au schéma JSON du temps][5] pour apprendre à élaborer le `TIME_SCHEMA`


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/?tab=facets#setup
[3]: /fr/logs/explorer/?tab=measures#setup
[4]: /fr/graphing/graphing_json/widget_json
[5]: /fr/graphing/graphing_json/widget_json/#time-schema