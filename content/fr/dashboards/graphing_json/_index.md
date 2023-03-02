---
title: Graphiques JSON
kind: documentation
aliases:
  - /fr/graphingjson/
  - /fr/graphing/miscellaneous/graphingjson
  - /fr/graphing/graphing_json/
further_reading:
  - link: /dashboards/widgets/
    tag: Documentation
    text: Widgets
  - link: /dashboards/graphing_json/request_json/
    tag: Documentation
    text: Schéma JSON des requêtes
---
Si vous interrogez un [timeboard Datadog][1] via l'[API dashboard][2], cela génère un objet JSON avec la disposition suivante :

```text
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

| Paramètre            | Type             | Description                                                                                                                               |
|----------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `title`              | chaîne           | Titre de votre dashboard.                                                                                                                  |
| `description`        | chaîne           | Description du dashboard.                                                                                                             |
| `layout_type`        | enum             | Type de disposition du dashboard. Valeurs autorisées : `ordered` ou `free`.               |
| `is_read_only`       | Booléen          | Indique si ce dashboard est en lecture seule. Si ce paramètre a pour valeur `true`, seuls l'auteur et les utilisateurs disposant de l'autorisation Access Management (`user_access_manage`) peuvent le modifier.                     |
| `template_variables` | tableau d'objets  | Liste des template variables utilisables dans ce dashboard. Consultez la [documentation relative au schéma des template variables](#schema-des-template-variables) pour en savoir plus. |
| `notify_list`        | tableau de strings | Liste des handles des utilisateurs à notifier lorsque des changements sont apportés à ce dashboard.                                                               |
| `widgets`            | tableau d'objets  | Liste des widgets à afficher dans le dashboard. Consultez la [documentation relative au schéma JSON des widgets][3] pour générer le `WIDGET_SCHEMA`.        |

## Schéma des template variables

Les template variables de dashboard servent à appliquer un nouveau contexte à un ou plusieurs graphiques dans votre dashboard, vous permettant ainsi d'explorer de façon dynamique les métriques associées à différents ensembles de tags en utilisant des variables au lieu de tags spécifiques. Pour les configurer dans l'API Dashboard, utilisez la disposition suivante :

```text
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
|-----------|--------|-------------------------------------------|
| `name`    | chaîne | Nom de votre template variable.           |
| `default` | chaîne | Valeur par défaut de votre template variable. |
| `prefix`  | chaîne | Clé de tag de votre template variable.       |

[En savoir plus sur les template variables dans l'interface utilisateur de Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/timeboard/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/
[4]: /fr/dashboards/template_variables/