---
title: Widget du flux d'événements
kind: documentation
description: Afficher les événements filtrés à partir du flux d'événements.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le flux d'événements est une version widget du flux d'événements de la [vue du flux d'événements][1].

Remarque : **ce widget n'affiche que les 100 événements les plus récents**.

{{< img src="graphing/widgets/event_stream/event_stream.png" alt="flux d'événements" responsive="true">}}

## Implémentation

{{< img src="graphing/widgets/event_stream/event_stream_setup.png" alt="configuration du flux d'événements" responsive="true" style="width:80%;">}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux d'événements.
2. Choisissez si votre widget affiche un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).
3. Utilisez le paramètre de taille pour choisir de n'afficher que le titre des événements ou d'en afficher l'intégralité.

### Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget" responsive="true" style="width:80%;">}}

Définissez sa taille et son alignement en option.


## API

Le [schéma JSON][2] utilisé pour le widget Flux d'événements est le suivant :

```
EVENT_STREAM_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["event_stream"]},
        "query": {"type": "string"},
        "event_size": {"enum": ["s", "l"]},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
        "time": TIME_SCHEMA
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|oui|Type du widget (utilisez `event_stream` pour le widget du flux d'événements)|
|`query`|string|oui|Requête à l'aide de laquelle le flux d'événements est filtré|
|`event_size`|string|non|Taille à utiliser pour afficher un événement (petite ou grande). Les valeurs disponibles sont : `s` ou `l`
|`title`|string|non|Titre du widget|
|`title_size`|string|non|Taille du titre|
|`title_align`|string|non|Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`
|`time`|objet|non|Définit le paramètre temporel lié au widget. Consultez la [documentation relative au schéma JSON du temps][3] pour apprendre à élaborer le `TIME_SCHEMA`


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/event_stream
[2]: /fr/graphing/graphing_json/widget_json
[3]: /fr/graphing/graphing_json/widget_json/#time-schema