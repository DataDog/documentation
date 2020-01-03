---
title: Widget Image
kind: documentation
description: Ajoutez une image ou un gif à vos dashboards Datadog.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Image vous permet d'intégrer une image à votre dashboard. Une image désigne un fichier PNG, JPG ou GIF animé :

{{< img src="graphing/widgets/image/image.mp4" alt="Image" video="true"  width="80%" >}}

## Implémentation

{{< img src="graphing/widgets/image/image_setup.png" alt="Configuration image"  style="width:80%;">}}

1. Saisissez l'URL de votre image.
2. Choisissez une option d'affichage :
    * Zoom image to cover whole title
    * Fit image on tile
    * Center image on tile

## API

Le [schéma JSON][1] utilisé pour le widget Image est le suivant :

```
IMAGE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["image"]},
        "url": {"type": "string"},
        "sizing": {"enum": ["zoom", "fit", "center"]},
        "margin": {"enum": ["small", "large"]}
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|oui|Type de widget (utilisez `image` pour le widget Image).|
|`url`|string|oui|URL de l'image.|
|`sizing`|string|non|Réglage du dimensionnement de l'image sur le widget. Valeurs disponibles  : `zoom`, `fit` ou `center`.
|`margin`|string|non|Taille des marges autour de l'image. Valeurs disponibles : `small` ou `large`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json/widget_json