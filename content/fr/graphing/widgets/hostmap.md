---
title: Widget Hostmap
kind: documentation
description: Affiche la hostmap Datadog dans vos dashboards.
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
La hostmap représente n'importe quelle métrique d'un sous-ensemble de hosts sur une unique visualisation, disponible depuis le menu [Infrastructure Host Map][1] :

{{< img src="graphing/widgets/hostmap/hostmap.png" alt="Hostmap" responsive="true" >}}

## Implémentation

{{< img src="graphing/widgets/hostmap/hostmap_setup.png" alt="Configuration hostmap" responsive="true" >}}

### Configuration

La configuration du widget Hostmap est similaire à celle de la [page principale de la hostmap][1] :

1. Choisissez d'afficher les `hosts` ou les `containers`.
2. `Filter by` : choisissez les hosts/conteneurs à afficher.
3. `Group by` : agrégez vos hosts/conteneurs selon un ou plusieurs tags.
4. Choisissez une métrique pour ajouter les éléments de votre hostmap.
5. Facultatif : choisissez une métrique pour dimensionner les éléments de votre hostmap.
6. Facultatif : définissez une palette de couleurs avec les valeurs `min` et `max`.

### Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget" responsive="true" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API


Le [schéma JSON][2] utilisé pour le widget Hostmap est le suivant :

```
HOSTMAP_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["hostmap"]},
        "requests":       {
            "type": "object",
            "properties": {
                'fill': REQUEST_SCHEMA,
                'size': REQUEST_SCHEMA
            },
            "anyOf": [
                {"required": ["fill"]},
                {"required": ["size"]}
            ],
            "additionalProperties": false
        },
        "node_type":       {"enum": ["host", "container"]},
        "no_metric_hosts": {"type": "boolean"},
        "no_group_hosts":  {"type": "boolean"},
        "group":           {"type": "array", "items": {"type": "string"}},
        "scope":           {"type": "array", "items": {"type": "string"}},
        "style":           {
            "type": "object",
            "properties": {
                "palette":      {"type": "string"},
                "palette_flip": {"type": "boolean"},
                "fill_min":     {"type": "string"},
                "fill_max":     {"type": "string"}
            },
            "additionalProperties": false
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Paramètre            | Type             | Obligatoire | Description                                                                                                                      |
| ------               | -----            | -----    | --------                                                                                                                         |
| `type`               | string           | oui      | Type du widget (utilisez `hostmap` pour le widget Hostmap).                                                                       |
| `requests.fill`      | string           | oui/non   | Requête utilisée pour remplir la carte. Consultez la [documentation relative au schéma JSON des requêtes][3] pour découvrir comment concevoir le `REQUEST_SCHEMA`. |
| `requests.size`      | string           | oui/non   | Requête utilisée pour dimensionner la carte. Consultez la [documentation relative au schéma JSON des requêtes][3] pour découvrir comment concevoir le `REQUEST_SCHEMA`. |
| `node_type`          | string             | non       | Le type de nœud à utiliser dans la carte. Valeurs possibles : `host` ou `container`.                                                 |
| `no_metric_hosts`    | Booléen          | non       | Permet d'afficher ou non les hosts sans métriques.                                                                                       |
| `no_group_hosts`     | Booléen          | non       | Permet d'afficher ou non les hosts qui n'appartiennent à aucun groupe.                                                                             |
| `group`              | tableau de strings | non       | Liste des préfixes de tags à utiliser pour le regroupement.                                                                                                |
| `scope`              | tableau de strings | non       | Liste des tags utilisés pour filtrer la carte.                                                                                             |
| `style.palette`      | string           | non       | Palette de couleurs à appliquer au widget.                                                                                            |
| `style.palette_flip` | Booléen          | non       | Permet d'inverser ou non les tons de la palette.                                                                                               |
| `style.fill_min`     | string           | non       | Valeur minimale à utiliser pour colorer la carte.                                                                                               |
| `style.fill_max`     | string           | non       | Valeur maximale à utiliser pour colorer la carte.                                                                                               |



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/infrastructure/hostmap
[2]: /fr/graphing/graphing_json/widget_json
[3]: /fr/graphing/graphing_json/request_json