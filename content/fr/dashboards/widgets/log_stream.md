---
title: Widget Flux de logs
kind: documentation
description: Affichez un flux de logs filtré dans vos dashboards Datadog.
aliases:
  - /fr/graphing/widgets/log_stream/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Affichez un flux de logs correspondant à la requête de votre choix :

{{< img src="dashboards/widgets/log_stream/log_stream.png" alt="Flux de logs" >}}

## Configuration

### Configuration

{{< img src="dashboards/widgets/log_stream/log_stream_setup.png" alt="Configuration du flux de logs" style="width:80%;">}}

Saisissez une [requête de logs][1] pour filtrer le flux de logs.

### Options

#### Colonnes

Affichez les valeurs de vos [facettes][2] et [mesures][3] avec des colonnes.

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][4] utilisé pour le widget Flux de logs est le suivant :

```text
LOG_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["log_stream"]},
        "logset": {"type": "string"},
        "indexes": {"type": "array", "items": {"type": "string"}},
        "query": {"type": "string"},
        "columns": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]},
        "time": TIME_SCHEMA
    },
    "required": ["type"],
    "additionalProperties": false
}
```

| Paramètre     | Type   | Obligatoire | Description                                                                                                                |
|---------------|--------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `type`        | chaîne | oui      | Type du widget (utilisez `log_stream` pour le widget Flux de logs)                                                             |
| `indexes`     | chaîne | non       | Tableau des noms des index à inclure dans le flux.                                                                            |
| `logset`      | chaîne | non       | Obsolète : utiliser `indexes` à la place. L'ID de l'index à inclure dans le flux.                                             |
| `query`       | chaîne | non       | Requête à l'aide de laquelle le flux de logs est filtré                                                                                        |
| `columns`     | tableau  | non       | Les colonnes à afficher sur le widget                                                                                     |
| `title`       | chaîne | non       | Titre du widget.                                                                                                        |
| `title_size`  | chaîne | non       | Taille du titre.                                                                                                          |
| `title_align` | chaîne | non       | Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`.                                                 |
| `time`        | objet | non       | Définit l'intervalle de temps affiché sur le widget. Consultez la [documentation relative au schéma JSON du temps][5] pour apprendre à élaborer le `TIME_SCHEMA` |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/logs/explorer/?tab=facets#setup
[3]: /fr/logs/explorer/?tab=measures#setup
[4]: /fr/dashboards/graphing_json/widget_json
[5]: /fr/dashboards/graphing_json/widget_json/#time-schema