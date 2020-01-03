---
title: Widget Flux d'événements
kind: documentation
description: Affichez des événements filtrés à partir du flux d'événements.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le flux d'événements affiche les événements de la [vue Flux d'événements][1] sous forme de widget.

Remarque : **ce widget n'affiche que les 100 événements les plus récents**.

{{< img src="graphing/widgets/event_stream/event_stream.png" alt="flux d'événements" >}}

## Implémentation

{{< img src="graphing/widgets/event_stream/event_stream_setup.png" alt="configuration du flux d'événements"  style="width:80%;">}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux d'événements.
2. Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).
3. Utilisez le paramètre de taille pour choisir de n'afficher que le titre des événements ou d'en afficher l'intégralité.

### Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget"  style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.


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
| `type`| chaîne|oui|Type de widget (utilisez `event_stream` pour le widget Flux d'événements)|
|`query`|chaîne|oui|Requête à l'aide de laquelle le flux d'événements est filtré|
|`event_size`|chaîne|non|Taille d'affichage des événements (petite ou grande). Valeurs disponibles : `s` ou `l`
|`title`|chaîne|non|Titre du widget|
|`title_size`|chaîne|non|Taille du titre|
|`title_align`|chaîne|non|Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`
|`time`|objet|non|Définit le paramètre temporel utilisé par le widget. Consultez la [documentation relative au schéma JSON du temps][3] pour apprendre à élaborer le `TIME_SCHEMA`


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/event_stream
[2]: /fr/graphing/graphing_json/widget_json
[3]: /fr/graphing/graphing_json/widget_json/#time-schema