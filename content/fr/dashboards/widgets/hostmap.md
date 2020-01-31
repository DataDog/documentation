---
title: Widget Hostmap
kind: documentation
description: Affichez la hostmap Datadog dans vos dashboards.
aliases:
  - /fr/graphing/widgets/hostmap/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: Documentation
    text: Screenboard
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Hostmap représente graphiquement n'importe quelle métrique pour l'ensemble de vos hosts, en proposant le même type de visualisation que la principale page [Host Map][1] :

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="Host Map"  >}}

## Configuration

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="Configuration Hostmap" >}}

### Configuration

La configuration du widget Hostmap est similaire à celle de la [page principale de la hostmap][1] :

1. **Type** : choisissez d'afficher des `hosts` ou des `containers`.
2. **Filter by** : choisissez les hosts ou les conteneurs à afficher.
3. **Group by** : agrégez vos hosts ou conteneurs selon un ou plusieurs tags.
4. **Fill by** : choisissez une métrique afin de remplir votre hostmap ou votre container map.
5. **Size by** (facultatif) : choisissez une métrique afin de dimensionner les éléments de votre hostmap ou de votre container map.
6. **Palette** (facultatif) : choisissez une palette de couleurs.
7. **Values** (facultatif) : définissez les valeurs minimale et maximale de la palette de couleurs.

**Remarque** : il est impossible d'effectuer une recherche en texte libre dans le widget Hostmap.

### Options

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][2] utilisé pour le widget Hostmap est le suivant :

```text
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
|----------------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| `type`               | chaîne           | oui      | Type du widget (utilisez `hostmap` pour le widget Hostmap).                                                                           |
| `requests.fill`      | chaîne           | oui/non   | Requête utilisée pour remplir la carte. Consultez la [documentation relative au schéma JSON des requêtes][3] pour découvrir comment concevoir le `REQUEST_SCHEMA`. |
| `requests.size`      | chaîne           | oui/non   | Requête utilisée pour dimensionner la carte. Consultez la [documentation relative au schéma JSON des requêtes][3] pour découvrir comment concevoir le `REQUEST_SCHEMA`. |
| `node_type`          | chaîne           | non       | Le type de nœud à utiliser dans la carte. Valeurs possibles : `host` ou `container`.                                                |
| `no_metric_hosts`    | Booléen          | non       | Permet d'afficher ou non les hosts sans métriques.                                                                                       |
| `no_group_hosts`     | Booléen          | non       | Permet d'afficher ou non les hosts qui n'appartiennent à aucun groupe.                                                                             |
| `group`              | tableau de strings | non       | Liste des préfixes de tags à utiliser pour le regroupement.                                                                                                |
| `scope`              | tableau de strings | non       | Liste des tags utilisés pour filtrer la carte.                                                                                             |
| `style.palette`      | chaîne           | non       | Palette de couleurs à appliquer au widget.                                                                                            |
| `style.palette_flip` | Booléen          | non       | Permet d'inverser ou non les tons de la palette.                                                                                               |
| `style.fill_min`     | chaîne           | non       | Valeur minimale à utiliser pour colorer la carte.                                                                                               |
| `style.fill_max`     | chaîne           | non       | Valeur maximale à utiliser pour colorer la carte.                                                                                               |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/infrastructure/hostmap
[2]: /fr/dashboards/graphing_json/widget_json
[3]: /fr/dashboards/graphing_json/request_json