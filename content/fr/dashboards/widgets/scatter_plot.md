---
title: Widget Nuage de points
kind: documentation
description: Représenter deux métriques dans un certain contexte avec leur agrégation respective
aliases:
  - /fr/graphing/widgets/scatter_plot/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
La visualisation de nuage de points vous permet de représenter deux métriques dans un certain contexte avec leur agrégation respective :

{{< img src="dashboards/widgets/scatterplot/scatterplot.png" alt="Nuage de points" >}}

## Configuration

{{< img src="dashboards/widgets/scatterplot/scatterplot_setup.png" alt="Configuration d'un nuage de points" style="width:80%;">}}

### Configuration

1. Sélectionnez une métrique et une agrégation pour les axes X et Y.
2. Définissez le contexte pour chaque point du nuage de points, tel que `host`, `service`, `app`, `region`, etc.
3. Facultatif : activez un tag de couleur.
4. Facultatif : définissez les commandes des axes des abscisses et des ordonnées.

## Options

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][1] utilisé pour le widget Nuage de points est le suivant :

```text
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

| Paramètre         | Type             | Obligatoire | Description                                                                                                                                        |
|-------------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`            | chaîne           | oui      | Type du widget (utilisez `scatterplot` pour le widget Nuage de points)                                                                                     |
| `requests`        | objet           | oui      | Objet `requests` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][2] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `yaxis`           | objet           | non       | Options de commande de l'axe des ordonnées. Consultez la [documentation relative au schéma JSON de l'axe des ordonnées][3] pour apprendre à élaborer le `AXIS_SCHEMA`.                           |
| `xaxis`           | objet           | non       | Options de commande de l'axe des abscisses. Consultez la [documentation relative au schéma JSON de l'axe des abscisses][3] pour apprendre à élaborer le `AXIS_SCHEMA`.                           |
| `color_by_groups` | tableau de chaînes | non       | Liste des groupes utilisés pour les couleurs.                                                                                                                    |
| `title`           | chaîne           | non       | Titre de votre widget.                                                                                                                              |

Propriétés supplémentaires autorisées dans l'objet `request` :

```json
{"aggregator": {"enum": ["avg", "last", "max", "min", "sum"]}}
```

| Paramètre    | Type   | Obligatoire | Description                                                                                   |
|--------------|--------|----------|-----------------------------------------------------------------------------------------------|
| `aggregator` | chaîne | non       | Agrégateur utilisé pour la requête. Valeurs disponibles : `avg`, `last`, `max`, `min` ou `sum`. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/graphing_json/widget_json/
[2]: /fr/dashboards/graphing_json/request_json/
[3]: /fr/dashboards/graphing_json/widget_json/#y-axis-schema