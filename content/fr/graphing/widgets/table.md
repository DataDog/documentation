---
title: Widget Tableau
kind: documentation
beta: true
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: Créer des dashboards avec JSON
---
## Présentation

La visualisation Tableau est disponible sur les timeboards et les screenboards. Elle permet d'afficher des métriques regroupées par clé de tag sous forme de colonnes. L'exemple suivant affiche les métriques `system.cpu.system` et `system.cpu.user` regroupées par `service` :

{{< img src="graphing/widgets/table/table_widget.png" alt="Widget Tableau" responsive="true" style="width:80%;">}}

## Implémentation
### Configuration

* Choisissez les données à représenter (ajoutez des colonnes supplémentaires en fonction de vos besoins) :

    * Métrique : consultez la [documentation principale sur les graphiques][1] pour configurer une requête de métrique.
    * Événements de log : consultez la [documentation sur la recherche de logs][2] pour configurer une requête d'événement de log.

* Vous pouvez renommer les en-têtes de colonne en définissant des alias de métriques.
* Pour les **Rows** (rangs), définissez l'option **Group by** sur la clé de tag à utiliser pour le regroupement. L'exemple ci-dessous affiche les rangs `service`.
* Choisissez une limite pour le nombre de résultats (10 par défaut).
* Choisissez la métrique à utiliser pour trier le tableau (par défaut, il s'agit de la première colonne).
* Facultatif : configurez une mise en forme conditionnelle en fonction des valeurs des cellules pour chaque colonne.

{{< img src="graphing/widgets/table/table_setup.png" alt="Configuration du tableau" responsive="true" style="width:80%;">}}

## API

Le [schéma JSON][3] utilisé pour le widget Tableau est le suivant :

```
TOPLIST_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["query_table"]},
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

| Paramètre  | Type             | Obligatoire | Description                                                                                                                                         |
|------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | Chaîne           | Oui      | Le type de widget (utilisez `query_table` pour le widget Tableau).                                                                                         |
| `requests` | Tableau d'objets | Oui      | Tableau d'un objet `request` à afficher dans le widget. Consultez la [documentation relative au schéma JSON des requêtes][4] pour élaborer le `REQUEST_SCHEMA`. |
| `title`    | Chaîne           | Non       | Titre de votre widget                                                                                                                                |

### Requêtes

Propriétés supplémentaires autorisées dans un objet `request` :

```
{
   "alias": {"type": "string"},
   "aggregator": {"enum": ["avg", "last", "max", "min", "sum"]},
   "limit": {"type": "integer"},
   "order": {"enum": ["asc", "desc"]},
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| Paramètre             | Type    | Obligatoire | Description                                                                                                                                                                                        |
|-----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `alias`               | Chaîne  | Non       | Le nom de la colonne (par défaut, il s'agit du nom de la métrique)                                                                                                                                                      |
| `aggregator`          | Enum    | Oui      | Pour les requêtes de métriques, ce paramètre permet de déterminer la méthode à utiliser pour transformer les valeurs de l'intervalle de temps en valeur unique pour le tableau. Valeurs disponibles : `avg`, `last`, `max`, `min` ou `sum`. |
| `limit`               | Nombre entier | Oui      | Pour les requêtes de métriques, le nombre de lignes à afficher dans le tableau. Seule une requête peut disposer de cette propriété.                                                                                          |
| `order`               | Enum    | Oui      | Pour les requêtes de métriques, l'ordre de tri des rangs. Ce paramètre doit être défini pour la même requête que `limit`. Valeurs disponibles : `desc` et `asc`.                                                        |
| `conditional_formats` | Objet  | Non       | Options de commande de mise en forme conditionnelle. Consultez la [documentation relative au schéma JSON de format conditionnel][5] pour apprendre à élaborer le `CONDITIONAL_FORMATS_SCHEMA`.                                    |

#### Colonnes multiples

Afin d'obtenir des colonnes multiples pour une requête de métriques, vous devez spécifier plusieurs objets de requête (un objet par colonne). Pour les requêtes de logs, vous devez uniquement spécifier un objet de requête contenant un tableau `multi_compute` d'objets `compute`. Chaque objet `compute` fournit une colonne.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/using_graphs/#configuring-a-graph
[2]: /fr/logs/explorer/search/#search-syntax
[3]: /fr/graphing/graphing_json/widget_json
[4]: /fr/graphing/graphing_json/request_json
[5]: /fr/graphing/graphing_json/widget_json/#conditional-format-schema