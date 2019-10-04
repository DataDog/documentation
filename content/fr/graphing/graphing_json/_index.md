---
title: Graphiques JSON
kind: documentation
disable_toc: true
aliases:
  - /fr/graphingjson/
  - /fr/graphing/miscellaneous/graphingjson
further_reading:
  - link: graphing/widgets
    tag: Documentation
    text: Widgets
  - link: graphing/graphing_json/request_json
    tag: Documentation
    text: Schema JSON des requètes
---
Si vous envoyez une requête de [timeboard Datadog][1] via l'[API dashboard][2], cela génère un objet JSON dont la disposition est la suivante :

```
DASHBOARD_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "layout_type": {"enum": ["ordered", "free"]},
        "is_read_only": {"type": "boolean"},
        "template_variables": {"type": "array", "items": TEMPLATE_VARIABLE_SCHEMA},
        "notify_list": {"type": "array", "items": {"type": "string"}},
        "widgets": {
            "type": "array",
            "items": WIDGET_SCHEMA
        }
    },
    "required": ["title", "layout_type", "widgets"],
}
```

| Paramètre            | Type             | Description                                                                                                                                                                         |
| ------               | -----            | --------                                                                                                                                                                            |
| `title`              | string           | Titre de votre dashboard.                                                                                                                                                            |
| `description`        | string           | Description du dashboard.                                                                                                                                                       |
| `layout_type`        | enum             | Type de disposition du dashboard. Valeurs possibles : `ordered` (timeboard précédent) ou `free` (disposition du screenboard précédent)                                                                                                                    |
| `is_read_only`       | Boolean          | Si ce dashboard est en lecture seule. Si `True`, seul l'auteur et les admins peuvent effectuer des modifications.                                                               |
| `template_variables` | tableau d'objets  | Liste des template variables utilisables dans ce dashboard. Consultez la [documentation relative au schéma des template variables][1](#schema-template-variables) pour en savoir plus.                                            |
| `notify_list`        | tableau de strings | Liste de handles des utilisateurs à notifier lorsque des changements sont effectués sur ce dashboard.                                                                                                         |
| `widgets`            | tableau d'objets  | Liste des widgets à afficher dans le dashboard. Consultez la [documentation relative au schéma JSON des widgets][3] pour générer le `WIDGET_SCHEMA`. |

## Schéma des template variables

Les template variables de dashboard servent à appliquer un nouveau contexte à un ou plusieurs widgets dans votre dashboard, vous permettant ainsi d'explorer de façon dynamique les métriques associées à différents ensembles de tags en utilisant des variables au lieu de tags spécifiques. Pour les configurer dans l'API Dashboard, utilisez la disposition suivante :

```
TEMPLATE_VARIABLE_SCHEMA = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "default": {"type": "string"},
        "prefix": {"type": "string"},
    },
    "additionalProperties": false,
    "required": ["name"]
}
```

| Paramètre | Type   | Description                               |
| ------    | -----  | --------                                  |
| `name`    | string | Nom de votre template variable.           |
| `default` | string | Valeur par défaut de votre template variable. |
| `prefix`  | string | Groupe de tags de votre template variable.     |

[En savoir plus sur les template variables dans l'interface utilisateur de Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/dashboards/timeboard
[2]: /fr/api/#dashboards
[3]: /fr/graphing/graphing_json/widget_json
[4]: /fr/graphing/dashboards/template_variables