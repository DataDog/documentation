---
title: Widget Top List
kind: documentation
aliases:
  - /fr/graphing/widgets/top_list/
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
La visualisation Top List vous permet d'afficher une liste de valeurs de tags comme `hostname` ou `service` avec la valeur maximale ou minimale d'une métrique quelconque (par exemple, les processus qui sollicitent le plus le processeur, les hosts disposant du moins d'espace disque, etc.) :

{{< img src="dashboards/widgets/toplist/toplist.png" alt="Top List" >}}

## Configuration

{{< img src="dashboards/widgets/toplist/toplist_setup.png" alt="Top List"  style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la documentation sur les [requêtes][1] pour configurer une requête de métrique.
    * Spans analysées : consultez la [documentation sur la recherche de traces][2] pour configurer une requête de span analysée.
    * Événements de log : consultez la [documentation sur la recherche de logs][1] pour configurer une requête d'événement de log.

2. Facultatif : configurez une mise en forme conditionnelle en fonction des valeurs de vos entrées.

### Options

#### Intervalle global

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="dashboards/widgets/options/title.png" alt="Titre du widget" style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][3] utilisé pour le widget Top List est le suivant :

```text
TOPLIST_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["toplist"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| Paramètre  | Type             | Obligatoire | Description                                                                                                                                                  |
|------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | chaîne           | oui      | Type du widget (utilisez `toplist` pour le widget Top List).                                                                                                       |
| `requests` | tableau d'objets | oui      | Tableau d'un objet `request` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][4] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `title`    | chaîne           | non       | Titre de votre widget.                                                                                                                                        |

Propriétés supplémentaires autorisées dans l'objet `request` :

```text
{
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| Paramètre             | Type   | Obligatoire | Description                                                                                                                                                     |
|-----------------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `conditional_formats` | objet | non       | Options de commande de mise en forme conditionnelle. Consultez la [documentation relative au schéma JSON de format conditionnel][5] pour apprendre à élaborer le `CONDITIONAL_FORMATS_SCHEMA`. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search/#search-syntax
[2]: /fr/tracing/app_analytics/search/#search-bar
[3]: /fr/dashboards/graphing_json/widget_json
[4]: /fr/dashboards/graphing_json/request_json
[5]: /fr/dashboards/graphing_json/widget_json/#conditional-format-schema