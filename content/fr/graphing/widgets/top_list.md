---
title: Widget Top List
kind: documentation
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
La visualisation Top List vous permet d'afficher une liste de valeurs de tags comme `hostname` ou `service` avec la valeur maximale ou minimale d'une métrique quelconque (par exemple, les plus grands consommateurs de processeur, les hosts disposant de l'espace minimal, etc.) :

{{< img src="graphing/widgets/toplist/toplist.png" alt="Top List" >}}

## Implémentation

{{< img src="graphing/widgets/toplist/toplist_setup.png" alt="Top List"  style="width:80%;">}}

### Configuration

1. Choisissez les données à représenter :
    * Métrique : consultez la [documentation sur les graphiques][1] pour configurer une requête de métrique.
    * Événements APM : consultez la [documentation sur la recherche de traces][2] pour configurer une requête d'événement APM.
    * Événements de log : consultez la [documentation sur la recherche de logs][3] pour configurer une requête d'événement de log.

2. Facultatif : configurez une mise en forme conditionnelle en fonction des valeurs de vos entrées.

### Options
#### Durée globale

Choisissez si votre widget doit afficher un intervalle personnalisé ou l'intervalle global du screenboard (disponible sur les screenboards uniquement).

#### Titre

Affichez un titre personnalisé pour votre widget en cochant la case `Show a Title` :

{{< img src="graphing/widgets/options/title.png" alt="Titre du widget"  style="width:80%;">}}

Définissez sa taille et son alignement si vous le souhaitez.

## API

Le [schéma JSON][4] utilisé pour le widget Top List est le suivant :

```
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

| Paramètre  | Type            | Obligatoire | Description                                                                                                                                                  |
| ------     | -----           | -------- | -----                                                                                                                                                        |
| `type`     | string          | oui      | Type du widget (utilisez `toplist` pour le widget Top List).                                                                                                      |
| `requests` | tableau d'objets | oui      | Tableau d'un objet `request` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][5] pour apprendre à élaborer le `REQUEST_SCHEMA`. |
| `title`    | string          | non       | Titre de votre widget.                                                                                                                                        |


Propriétés supplémentaires autorisées dans l'objet `request` :

```
{
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| Paramètre             | Type   | Obligatoire | Description                                                                                                                                                     |
| ------                | -----  | ----     | -------                                                                                                                                                         |
| `conditional_formats` | objet | non       | Options de commande de mise en forme conditionnelle. Consultez la [documentation relative au schéma JSON de mise en forme conditionnelle][6] pour apprendre à élaborer le `CONDITIONAL_FORMATS_SCHEMA`. |


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing
[2]: /fr/tracing/search/#search-bar
[3]: https://docs.datadoghq.com/fr/logs/explorer/search/#search-syntax
[4]: /fr/graphing/graphing_json/widget_json
[5]: /fr/graphing/graphing_json/request_json
[6]: /fr/graphing/graphing_json/widget_json/#conditional-format-schema