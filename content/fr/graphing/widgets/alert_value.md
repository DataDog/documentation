---
title: Widget Valeur d'alerte
kind: documentation
description: Créez un graphique illustrant la valeur actuelle d'une métrique dans n'importe quel monitor défini sur votre système.
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
Les valeurs d'alerte sont des valeurs de requête qui représentent la valeur actuelle d'une métrique dans n'importe quel monitor défini sur votre système :

{{< img src="graphing/widgets/alert_value/alert_value.png" alt="Valeur d'alerte" >}}

## Implémentation
{{< img src="graphing/widgets/alert_value/alert_value_setup.png" alt="Configuration de la valeur d'alerte"  style="width:80%;">}}

### Configuration

1. Sélectionnez un monitor existant à représenter graphiquement.
2. Sélectionnez le format d'affichage de la valeur :
    * valeur brute
    * 0/1/2/3 décimale(s)
3. Sélectionnez l'unité à afficher :
    * `Automatic`
    * `/s` Par seconde
    * `b` Bits
    * `B` Octets
    * `Custom`

### Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget"  style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][1] utilisé pour le widget Valeur d'alerte est le suivant :

```
ALERT_VALUE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["alert_value"]},
        "alert_id": {"type": "string"},
        "precision": {"type": "integer"},
        "unit": {"type": "string"},
        "text_size": {"type": "string"},
        "text_align": {"enum": ["left", "center", "right"]},
        "title": {"type": "string"}
    },
    "required": ["type", "alert_id"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | chaîne          | oui      | Type de widget (utilisez `alert_value` pour le widget Valeur d'alerte)|
| `alert_id`     | chaîne          | oui      | ID de l'alerte à utiliser dans le widget|
| `precision`| nombre entier| non| Nombre de décimales à afficher. Si vous ne définissez pas ce paramètre, une valeur brute est utilisée.|
| `unit`| chaîne| non| Unité à afficher avec la valeur|
| `text_size`| chaîne| non| Taille de la valeur dans le widget|
| `text_align`| chaîne| non| Comment aligner la valeur dans le widget. Valeurs disponibles : `left`, `center` ou `right`.|
|`title`|chaîne|non|Titre du widget|

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json/widget_json