---
title: Widget Notes et liens
kind: documentation
description: Affichez du texte dans vos screenboards.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Notes et liens fonctionne comme le [widget Texte libre][1], mais offre davantage d'options de mise en forme :

## Implémentation

{{< img src="graphing/widgets/note/using_link_note_widget.gif" alt="Configuration du widget Notes et liens"   style="width:80%;">}}

1. Saisissez le texte que vous souhaitez afficher. Notez que le format Markdown est pris en charge.
2. Choisissez la taille du texte et la couleur de l'arrière-plan de la note.
3. Sélectionnez la position du pointeur.

## API

Le [schéma JSON][2] utilisé pour le widget Note est le suivant :

```
NOTE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["note"]},
        "content": {"type": "string"},
        "background_color": {"type": "string"},
        "font_size": {"type": "string"},
        "text_align": {"enum": ["center", "left", "right"]}
        "show_tick": {"type": "boolean"},
        "tick_pos": {"type": "string"},
        "tick_edge": {"enum": ["bottom", "left", "right", "top"]}
    },
    "required": ["type", "content"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | chaîne          | oui      | Type de widget (utilisez `note` pour le widget Note).|
|`content`|chaîne|oui|Contenu de la note.|
|`background_color`|chaîne|non|Couleur de l'arrière-plan de la note.|
|`font_size`|chaîne|non|Taille du texte.|
|`text_align`|chaîne|non|Alignement du texte sur le widget. Valeurs disponibles : `center`, `left`, ou `right`.
|`show_tick`|Booléen|non|Permet d'afficher ou non une coche.
|`tick_pos`|chaîne|non|Positionnement de la coche sur une arête.
|`tick_edge`|chaîne|non|Arête sur laquelle s'affiche la coche. Valeurs disponibles : `bottom`, `left`, `right` ou `top`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/widgets/free_text
[2]: /fr/graphing/graphing_json/widget_json