---
title: Widget Résumé des monitors
kind: documentation
description: Affichez une vue synthétique de tous vos monitors Datadog ou d'un sous-ensemble filtré selon une requête.
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
Le widget Résumé des monitors affiche une vue synthétique de tous vos monitors Datadog ou d'un sous-ensemble filtré selon une requête.

{{< img src="graphing/widgets/monitor_summary/monitor_summary.png" alt="résumé des monitors " responsive="true">}}

## Implémentation

{{< img src="graphing/widgets/monitor_summary/monitor_summary_setup.png" alt="configuration du résumé des monitors" responsive="true" style="width:80%;">}}

### Configuration

1. Saisissez une [requête de monitor][1] pour afficher un sous-ensemble de monitors dans votre widget Résumé des monitors.
2. Vous pouvez choisir d'afficher uniquement le nombre de monitors en fonction de leur statut (`count`), la liste complète des monitors (`list`) ou ces deux informations (`both`).

## Options
#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget" responsive="true" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Voici le [schéma JSON][2] utilisé pour le widget Résumé des monitors :

```
MANAGE_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["manage_status"]},
        "query": {"type": "string"},
        "display_format": {"enum": ["counts", "countsAndList", "list"]},
        "color_preference": {"enum": ["background", "text"]},
        "hide_zero_counts": {"type": "boolean"},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|oui|Type du widget (utilisez `manage_status` pour le widget Résumé des monitors).|
|`query`|string|oui|Requête à l'aide de laquelle les monitors sont filtrés.|
|`display_format`|string|non|Les éléments à afficher sur le widget. Valeurs disponibles : `counts`, `countsAndList` ou `list`.
|`color_preference`|string|non|La couleur du widget. Valeurs disponibles : `background` ou `text`.
|`hide_zero_counts`|Booléen|non|Permet d'afficher ou non le nombre de 0.|
|`title`|string|non|Titre du widget.|
|`title_size`|string|non|Taille du titre.|
|`title_align`|string|non|Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/manage_monitor
[2]: /fr/graphing/graphing_json/widget_json