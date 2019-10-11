---
title: Widget Nuage de points
kind: documentation
description: Représenter deux métriques dans un certain contexte avec leur agrégation respective
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
La visualisation de nuage de points vous permet de représenter deux métriques dans un certain contexte avec leur agrégation respective :

{{< img src="graphing/widgets/scatterplot/scatterplot.png" alt="Nuage de points" responsive="true">}}

## Implémentation

{{< img src="graphing/widgets/scatterplot/scatterplot_setup.png" alt="Configuration d'un nuage de points" responsive="true" style="width:80%;">}}

### Configuration

1. Sélectionnez une métrique et une agrégation pour les axes X et Y.
2. Définissez le contexte pour chaque point du nuage de points, tel que `host`, `service`, `app`, `region`, etc.
3. Facultatif : activez un tag de couleur.
4. Facultatif : définissez les commandes des axes des abscisses et des ordonnées.

## Options

#### Durée globale

Choisissez si votre widget affiche un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget" responsive="true" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][1] utilisé pour le widget Nuage de points est le suivant :

```
SCATTERPLOT_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["scatterplot"]},
        "requests": {
            "type": "object",
            "properties": {
                "x": REQUEST_SCHEMA,
                "y": REQUEST_SCHEMA
            },
            "required": ["x", "y"],
            "additionalProperties": false
        },
        "xaxis": AXIS_SCHEMA,
        "yaxis": AXIS_SCHEMA,
        "color_by_groups": {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Paramètre         | Type            | Obligatoire | Description                                                                                                                                        |
| ------            | -----           | -----    | --------                                                                                                                                           |
| `type`            | string          | oui      | Type du widget (utilisez `scatterplot` pour le widget Nuage de points)                                                                                        |
| `requests`        | objet          | oui      | Objet `requests` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][2] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `yaxis`           | objet          | non       | Options de commande de l'axe des ordonnées. Consultez la [documentation relative au schéma JSON de l'axe des ordonnées][3] pour apprendre à élaborer le `AXIS_SCHEMA`.                           |
| `xaxis`           | objet          | non       | Options de commande de l'axe des abscisses. Consultez la [documentation relative au schéma JSON de l'axe des abscisses][3] pour apprendre à élaborer le `AXIS_SCHEMA`.                           |
| `color_by_groups` | tableau de strings | non       | Liste des groupes utilisés pour les couleurs.                                                                                                                    |
| `title`           | string          | non       | Titre de votre widget.                                                                                                                              |

Propriétés supplémentaires autorisées dans l'objet `request` :

```json
{
  "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}
}
```

| Paramètre    | Type  | Obligatoire | Description                                                                                  |
| ------       | ----- | -------- | ----                                                                                         |
| `aggregator` | string  | non       | Agrégateur utilisé pour la requête. Valeurs disponibles : `avg`, `last`, `max`, `min` ou `sum`. |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json/widget_json
[2]: /fr/graphing/graphing_json/request_json
[3]: /fr/graphing/graphing_json/widget_json/#y-axis-schema