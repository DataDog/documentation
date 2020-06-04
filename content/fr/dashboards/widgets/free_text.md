---
title: Widget Texte libre
kind: documentation
description: Affichez du texte dans vos screenboards.
aliases:
  - /fr/graphing/widgets/free_text/
further_reading:
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Texte libre vous permet d'ajouter des titres à votre [screenboard][1].

Cela sert généralement à indiquer la fonction générale du dashboard.

{{< img src="dashboards/widgets/free_text/free_text.png" alt="Texte libre" >}}

## Configuration

{{< img src="dashboards/widgets/free_text/free_text_setup.png" alt="Saisie du texte libre" style="width:80%;">}}

### Configuration

1. Entrez le texte à afficher.
2. Choisissez le formatage de votre texte.

## API

Le [schéma JSON][2] utilisé pour le widget Texte libre est le suivant :

```text
FREE_TEXT_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["free_text"]},
        "text": {"type": "string"},
        "color": {"type": "string"},
        "font_size": {"type": "string"},
        "text_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "text"],
    "additionalProperties": false
}
```

| Paramètre    | Type   | Obligatoire | Description                                                                             |
|--------------|--------|----------|-----------------------------------------------------------------------------------------|
| `type`       | chaîne | oui      | Type de widget (utilisez `free_text` pour le widget Texte libre)                            |
| `text`       | chaîne | oui      | Texte à afficher                                                                         |
| `color`      | chaîne | non       | Couleur du texte                                                                       |
| `font_size`  | chaîne | non       | Taille du texte.                                                                        |
| `text_align` | chaîne | non       | Alignement du texte sur le widget. Valeurs disponibles : `center`, `left`, ou `right`. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/screenboard/
[2]: /fr/dashboards/graphing_json/widget_json/