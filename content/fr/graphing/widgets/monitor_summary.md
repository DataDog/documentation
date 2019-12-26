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

{{< img src="graphing/widgets/monitor_summary/monitor-summary-overview.png" alt="résumé des monitors" responsive="true">}}

## Implémentation

{{< img src="graphing/widgets/monitor_summary/monitor-summary-setup.png" alt="configuration du widget résumé des monitors" responsive="true" style="width:80%;">}}

### Configuration

1. Sélectionnez l'un des trois types de résumé : `Monitor`, `Group` ou `Combined`.
    - Le type de résumé `Monitor` répertorie les statuts et les noms des monitors correspondant à la [requête de monitor][1]. Les monitors à alertes multiples sont affichés sur une seule ligne dans la liste des résultats, et leur statut correspond au statut global du monitor à alertes multiples. Les nombres indiqués pour chaque statut représentent le nombre de monitors correspondant à chaque type de statut.

    {{< img src="graphing/widgets/monitor_summary/monitor_summary_type.png" alt="type de résumé Monitor" responsive="true" style="width:80%;">}}

    - Le type de résumé `Group` répertorie les statuts, les noms et les groupes des monitors correspondant à la requête de monitor. Les monitors à alertes multiples sont affichés sur plusieurs lignes dans la liste des résultats, chaque ligne correspondant à un groupe et chaque statut correspondant à celui du groupe au sein du monitor à alertes multiples. Tout comme la [page Triggered Monitors][2], le type de résumé `Group` prend également en charge les facettes `group` et `group_status` dans sa requête de monitor. Les nombres indiqués pour chaque statut représentent le nombre de groupes de monitors correspondant à chaque type de statut.

    {{< img src="graphing/widgets/monitor_summary/group_summary_type.png" alt="type de résumé Group" responsive="true" style="width:80%;">}}

    - Le type de résumé `Combined` répertorie le nombre de statuts de groupe et les noms des monitors correspondant à la requête de monitor. Les monitors à alertes multiples s'affichent sur une seule ligne dans la liste des résultats, comme pour le type de résumé `Monitor`, mais la colonne dédiée aux groupes affiche le nombre de groupes correspondant à chaque type de statut au lieu d'afficher le statut global du monitor. Tout comme le type de résumé `Group`, le type de résumé `Combined` prend également en charge les facettes `group` et `group_status` dans sa requête de monitor. Tout comme pour le type de résumé `Monitor`, les nombres indiqués pour chaque statut représentent le nombre total de monitors associés à chaque statut.

    {{< img src="graphing/widgets/monitor_summary/combined_summary_type.png" alt="type de résumé combined" responsive="true" style="width:80%;">}}

2. Saisissez une requête de monitor pour afficher un sous-ensemble de monitors sur le widget Résumé des monitors.
    - Si vous avez des template variables dans votre dashboard et souhaitez les inclure dans votre requête de monitor, tapez le signe dollar `$` dans la barre de recherche, suivi du nom de la template variable. Lorsque vous tapez `$` dans la barre de recherche, une liste des template variables disponibles dans votre dashboard actuel apparaît automatiquement pour que vous puissiez choisir la template variable qui vous intéresse.

    **Remarque** : outre les facettes répertoriées dans le lien ci-dessus, les types de résumé `Group` et `Combined` prennent également en charge les facettes `group` et `group_status` pour les recherches au sein des groupes, de la même manière que la [page Triggered Monitors][2].

## Options
#### Préférences d'affichage

Choisissez parmi les options d'affichage suivantes : `Count` pour afficher le nombre de monitors par type de statut de monitor, `List` pour afficher une liste des monitors, ou `Both` pour afficher les deux. Les options `Text` et `Background` spécifient si les couleurs de statut doivent être appliquées au texte ou à l'arrière-plan des nombres de statuts. Lorsque l'option `Hide empty Status Counts` est sélectionnée, le nombre de monitors associés à un statut est uniquement affiché lorsque la liste des résultats contient au moins un monitor avec ce statut.

{{< img src="graphing/widgets/monitor_summary/display-preferences.png" alt="préférences d'affichage" responsive="true" style="width:80%;">}}

En activant l'option `Show triggered column`, vous pouvez filtrer les résultats de manière à afficher uniquement les monitors ou les groupes de monitors qui présentent un état déclenché (`Alert`, `Warn` ou `No Data`). Ceux-ci sont alors triés en fonction de leur date de déclenchement, de la plus récente à la plus éloignée. Une colonne supplémentaire indique alors le temps écoulé depuis le dernier déclenchement du monitor/groupe.

{{< img src="graphing/widgets/monitor_summary/monitor-summary.png" alt="préférences d'affichage" responsive="true" style="width:80%;">}}

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a title` :

{{< img src="graphing/widgets/monitor_summary/widget_title.png" alt="titre du widget" responsive="true" style="width:80%;">}}

Vous pouvez aussi définir sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][3] utilisé pour le widget Résumé des monitors est le suivant :

```
MANAGE_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["manage_status"]},
        "query": {"type": "string"},
        "summary_type": {"enum": ["monitors", "groups", "combined"]},
        "display_format": {"enum": ["counts", "countsAndList", "list"]},
        "color_preference": {"enum": ["background", "text"]},
        "hide_zero_counts": {"type": "boolean"},
        "show_last_triggered": {"type": "boolean"},
        "title": {"type": "string"},
        "title_size": {"type": "string"},
        "title_align": {"enum": ["center", "left", "right"]}
    },
    "required": ["type", "query"],
    "additionalProperties": false
}
```

| Paramètre             | Type    | Obligatoire | Description                                                                              |
|-----------------------|---------|----------|------------------------------------------------------------------------------------------|
| `type`                | chaîne  | oui      | Type du widget (utilisez `manage_status` pour le widget Résumé des monitors).                   |
| `query`               | chaîne  | oui      | Requête à l'aide de laquelle les monitors sont filtrés.                                                        |
| `summary_type`        | chaîne  | non       | Type de résumé à utiliser.                                                        |
| `display_format`      | chaîne  | non       | Les éléments à afficher sur le widget. Valeurs disponibles : `counts`, `countsAndList` ou `list`. |
| `color_preference`    | chaîne  | non       | La couleur du widget. Valeurs disponibles : `background` ou `text`.            |
| `hide_zero_counts`    | Booléen | non       | Afficher ou masquer le nombre lorsque celui-ci est de 0.                                                       |
| `show_last_triggered` | Booléen | non       | Permet d'afficher ou non le temps écoulé depuis le déclenchement du monitor/groupe.              |
| `title`               | chaîne  | non       | Titre du widget.                                                                      |
| `title_size`          | chaîne  | non       | Taille du titre.                                                                        |
| `title_align`         | chaîne  | non       | Définit comment aligner le titre. Valeurs disponibles : `center`, `left` ou `right`.               |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/manage_monitor
[2]: /fr/monitors/manage_monitor/#manage-triggered-monitors-with-group-level-granularity
[3]: /fr/graphing/graphing_json/widget_json