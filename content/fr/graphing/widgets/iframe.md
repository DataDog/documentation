---
title: Widget iframe
kind: documentation
description: Ajoutez un iframe à vos dashboards Datadog.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget iframe vous permet d'intégrer une partie de n'importe quelle autre page web à votre dashboard.

## Implémentation

{{< img src="graphing/widgets/iframe/iframe_setup.png" alt="Configuration de l'iframe" responsive="true" style="width:80%;">}}

Saisissez l'URL de la page que vous souhaitez afficher à l'intérieur de l'iframe. Si vous n'utilisez pas une URL HTTPS, vous devrez peut-être configurer votre navigateur afin d'autoriser le contenu non sécurisé.

## API

Le [schéma JSON][1] utilisé pour le widget iframe est le suivant :

```
IFRAME_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["iframe"]},
        "url": {"type": "string"},
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| chaîne|oui|Type de widget (utilisez `iframe` pour le widget iframe)|
|`url`|chaîne|oui|URL de l'iframe|

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json/widget_json