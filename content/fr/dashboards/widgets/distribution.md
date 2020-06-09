---
title: Widget Distribution
kind: documentation
description: Représentez graphiquement la distribution de métriques agrégées en fonction d'un ou de plusieurs tags.
aliases:
  - /fr/graphing/widgets/distribution/
further_reading:
  - link: /dashboards/timeboards/
    tag: Documentation
    text: Timeboards
  - link: /dashboards/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Distribution est une autre manière d'afficher les métriques agrégées en fonction d'un ou de plusieurs tags, tels que des *hosts*. Contrairement à la [carte thermique][1], l'axe des abscisses d'un graphique de distribution représente la quantité plutôt que le temps.

Cette visualisation affiche une seule requête de métrique. Les requêtes supplémentaires sont ignorées.

**Remarque** : la détection des singularités n'est pas possible avec cette visualisation.

{{< img src="dashboards/widgets/distribution/distribution.png" alt="Distribution"  >}}

## Configuration

{{< img src="dashboards/widgets/distribution/distribution_setup.png" alt="Distribution"  style="width:80%;">}}

### Configuration

Configurez votre requête de métrique comme d'habitude. Notez que ce type de visualisation est uniquement utile lorsque les métriques sont agrégées en fonction de clés de tag, p. ex. pour chaque `host`.
Utilisez les réglages `avg`/`max`/`min`/`sum by`/etc. pour visualiser vos données en fonction des tags associés.

### Options

#### Préférences d'affichage

{{< img src="dashboards/widgets/options/display_preferences.png" alt="Préférences d'affichage" style="width:80%;">}}

##### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

##### Légende

Utilisez *Show legend on graph* pour activer/désactiver l'affichage de la légende sur votre widget. Vous pouvez également sélectionner le nombre d'entrées à afficher si vous le souhaitez.

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][2] utilisé pour le widget Distribution est le suivant :

```text
DISTIBUTION_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["distribution"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title":   {"type": "string"},
        "show_legend": {"type": "boolean"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Paramètre     | Type             | Obligatoire | Description                                                                                                                                                  |
|---------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | chaîne           | oui      | Type de widget. Utilisez `distribution` pour le widget Distribution.                                                                                              |
| `requests`    | tableau d'objets | oui      | Tableau d'un objet `request` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][3] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `title`       | chaîne           | non       | Titre de votre widget.                                                                                                                                        |
| `show_legend` | booléen          | non       | Afficher la légende pour ce widget (screenboard uniquement)                                                                                                           |

Propriétés supplémentaires autorisées dans l'objet `request` :

```json
{
  "style": {
    "type": "object",
    "properties": {"palette": {"type": "string"}},
    "additionalProperties": false
  }
}
```

| Paramètre       | Type   | Obligatoire | Description                           |
|-----------------|--------|----------|---------------------------------------|
| `style.palette` | chaîne | non       | Palette de couleurs à appliquer au widget. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/heat_map/
[2]: /fr/dashboards/graphing_json/widget_json/
[3]: /fr/dashboards/graphing_json/request_json/