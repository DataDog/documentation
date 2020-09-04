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

{{< img src="dashboards/widgets/log_stream/log_stream_setup.gif" alt="Configuration du flux de logs"  style="width:80%;">}}

Saisissez une [requête de log][1] pour filtrer le flux de logs.

### Options

#### Colonnes

Affichez les valeurs de vos [facettes][2] et [mesures][2] avec des colonnes.

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][3] utilisé pour le widget Flux de logs est le suivant :

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

| Paramètre             | Type    | Obligatoire | Description                                                                                |
|-----------------------|---------|----------|--------------------------------------------------------------------------------------------|
| `type`                | Chaîne  | Oui      | Type du widget (utilisez `log_stream` pour le widget Flux de logs).                            |
| `logset`              | Chaîne  | Non       | (Obsolète) Utiliser `indexes` à la place. L'ID de l'index à inclure dans le flux.            |
| `indexes`             | Tableau   | Non       | Tableau des noms des index à inclure dans le flux. Utiliser `[]` pour interroger tous les index en même temps.       |
| `query`               | Chaîne  | Non       | Requête à l'aide de laquelle le flux de logs est filtré.                                                        |
| `columns`             | Tableau   | Non       | Les colonnes à afficher sur le widget.                                                      |
| `show_date_column`    | Booléen | Non       | Permet d'afficher ou non la colonne de date.                                                    |
| `show_message_column` | Booléen | Non       | Permet d'afficher ou non la colonne de message.                                                 |
| `message_display`     | Chaîne  | Non       | Le nombre de lignes de log à afficher.                                                        |
| `sort`                | Objet  | Non       | La colonne et l'ordre de tri.                                                           |
| `title`               | Chaîne  | Non       | Le titre du widget.                                                                   |
| `title_size`          | Chaîne  | Non       | La taille du titre.                                                                     |
| `title_align`         | Chaîne  | Non       | Définit comment aligner le titre. Les valeurs disponibles sont `center`, `left` ou `right`.             |
| `time`                | Objet  | Non       | Définit l'intervalle de temps affiché sur le widget. Pour en savoir plus, consultez la [documentation relative au schéma JSON d'intervalle][4]. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search/
[2]: /fr/logs/explorer/facets/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/dashboards/graphing_json/widget_json/#time-schema