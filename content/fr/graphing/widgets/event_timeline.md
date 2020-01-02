---
title: Widget Chronologie des événements
kind: documentation
description: Affichez votre flux d'événements sous forme de chronologie dans un widget.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
La chronologie des événements est une version widget de la chronologie qui apparaît en haut de la [vue Chronologie des événements[1] :

{{< img src="graphing/widgets/event_timeline/event_timeline.png" alt="Exemple de chronologie des événements"  >}}

## Implémentation

{{< img src="graphing/widgets/event_timeline/event_timeline_setup.png" alt="Exemple de chronologie des événements"  style="width:80%;">}}

### Configuration

1. Saisissez une [requête de recherche][1] pour filtrer le flux d'événements.
2. Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

### Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget"  style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.


## API

Le [schéma JSON][2] utilisé pour le widget Chronologie des événements est le suivant :

```
EVENT_TIMELINE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["event_timeline"]},
        "query": {"type": "string"},
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
| `type`| chaîne|oui|Type de widget (utilisez `event_timeline` pour le widget Chronologie des événements)|
|`query`|chaîne|oui|Requête à l'aide de laquelle la chronologie des événements est filtrée|
|`title`|chaîne|non|Titre du widget|
|`title_size`|chaîne|non|Taille du titre|
|`title_align`|chaîne|non|Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`
|`time`|objet|non|Définit le paramètre temporel utilisé par le widget. Consultez la [documentation relative au schéma JSON du temps][3] pour apprendre à élaborer le `TIME_SCHEMA`



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/event_stream
[2]: /fr/graphing/graphing_json/widget_json
[3]: /fr/graphing/graphing_json/widget_json/#time-schema