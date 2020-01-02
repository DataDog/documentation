---
title: Widget Groupe
kind: documentation
description: Regroupez vos widgets dans un timeboard.
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Groupe vous permet de regrouper des graphiques semblables sur votre [timeboard][1]. Chaque groupe a un en-tête personnalisé, peut contenir entre un et de nombreux graphiques, et peut être réduit :

{{< img src="graphing/widgets/group/group.mp4" alt="Widget Groupe" video="true"  >}}

## Implémentation

Choisissez un nom pour votre groupe en utilisant l'icône en forme d'engrenage dans le coin supérieur droit de votre groupe.

## API
Le [schéma JSON][2] utilisé pour le widget Groupe est le suivant :

```
GROUP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["group"]},
        "layout_type": {"enum": ["ordered"]},
        "widgets": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "definition": {
                        "oneOf": [WIDGET_DEFINITION]
                    },
                    "id": {"type": "integer"}
                },
                "required": ["definition"],
                "additionalProperties": false
            }
        },
        "title": {"type": "string"}
    },
    "required": ["type", "layout_type", "widgets"],
    "additionalProperties": false
}
```

| Paramètre     | Type             | Obligatoire | Description                                                                                                                                             |
| ------        | -----            | -------- | -----                                                                                                                                                   |
| `type`        | chaîne           | oui      | Type de widget (utilisez `group` pour le widget Groupe)                                                                                                   |
| `widgets`     | tableau d'objets | oui      | Liste des widgets appartenant au widget Groupe. Consultez la [documentation relative au schéma JSON des widgets][3] pour apprendre à élaborer le `WIDGET_DEFINITION`. |
| `layout_type` | chaîne           | oui      | Type de disposition du groupe. Valeur possible : `ordered`                                                                                                  |
| `title`       | chaîne           | non       | Titre de votre widget.                                                                                                                                   |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/dashboards/timeboard
[2]: /fr/graphing/graphing_json/widget_json
[3]: /fr/graphing/graphing_json/widget_json