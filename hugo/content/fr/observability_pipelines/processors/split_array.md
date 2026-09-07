---
description: Apprenez à utiliser le processeur Split Array pour fractionner des tableaux
  imbriqués en événements distincts afin de pouvoir interroger, filtrer, alerter et
  visualiser les données.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Processeur Split Array
---
{{< product-availability >}}

## Présentation {#overview}

Ce processeur fractionne les tableaux imbriqués en événements distincts afin que vous puissiez interroger, filtrer, alerter et visualiser les données au sein d'un tableau. Les tableaux doivent déjà être parsés. Par exemple, le processeur peut traiter `[item_1, item_2]`, mais ne peut pas traiter `"[item_1, item2]"`. Les éléments du tableau peuvent être des objets JSON, des chaînes, des entiers, des nombres à virgule flottante ou des booléens. Tous les champs non modifiés sont ajoutés aux événements enfants. Par exemple, si vous envoyez les éléments suivants à l'Observability Pipelines Worker :

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": [item_1, item_2]
}
```

Utilisez le processeur Split Array pour envoyer chaque élément de `batched_items` en tant qu'événement distinct :

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_1
}
```

```json
{
    "host": "my-host",
    "env": "prod",
    "batched_items": item_2
}
```

Consultez l'[exemple de fractionnement de tableau](#split-array-example) pour un exemple plus détaillé.

## Configuration {#setup}

Pour configurer ce processeur :

Cliquez sur {{< ui >}}Manage arrays to split{{< /ui >}} pour ajouter un tableau à fractionner ou pour modifier un tableau existant à fractionner. Cela ouvre un panneau latéral.

- Si vous n'avez pas encore créé de tableaux, saisissez les paramètres du tableau comme décrit dans la section [Ajouter un nouveau tableau](#add-a-new-array) ci-dessous.
- Si vous avez déjà créé des tableaux, cliquez sur la ligne du tableau dans le tableau pour le modifier ou le supprimer. Utilisez la barre de recherche pour trouver un tableau spécifique, puis sélectionnez le tableau pour le modifier ou le supprimer. Cliquez sur {{< ui >}}Add Array to Split{{< /ui >}} pour ajouter un nouveau tableau à fractionner.

### Ajouter un nouveau tableau {#add-a-new-array}

1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
   - Seuls les logs correspondant au filtre sont traités.
   - Tous les logs, qu’ils correspondent ou non à la requête de filtrage, sont envoyés à l’étape suivante du pipeline.
1. Saisissez le chemin d'accès au champ du tableau. Utilisez la notation de chemin `<OUTER_FIELD>.<INNER_FIELD>` pour faire correspondre les sous-champs. Consultez l'exemple de notation [Path](#path-notation-example-split-array) ci-dessous.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Exemple de fractionnement de tableau {#split-array-example}

Ceci est un exemple d'événement :

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {
            "timestamp":14500000,
            "firstarray":["one", 2]
        },
    },
    "secondarray": [
    {
        "some":"json",
        "Object":"works"
    }, 44]
}
```

Si le processeur fractionne les tableaux `"message.myfield.firstarray"` et `"secondarray"`, il génère des événements enfants identiques à l'événement parent, à l'exception des valeurs de `"message.myfield.firstarray"` et `"secondarray",`, qui deviennent chacune un élément unique issu de leur tableau d'origine. Chaque événement enfant est une combinaison unique d'éléments issus des deux tableaux ; ainsi, quatre événements enfants (2 éléments * 2 éléments = 4 combinaisons) sont créés dans cet exemple.

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
    },
    "secondarray": {
        "some":"json",
        "Object":"works"
    }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":"one"},
        },
    "secondarray": 44
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": {
            "some":"json",
            "object":"works"
        }
}
```

```json
{
    "ddtags": ["tag1", "tag2"],
    "host": "my-host",
    "env": "prod",
    "message": {
        "isMessage": true,
        "myfield" : {"timestamp":14500000, "firstarray":2},
        },
    "secondarray": 44
}
```

### Exemple de notation de chemin {#path-notation-example-split-array}

{{% observability_pipelines/path_notation %}}

{{% observability_pipelines/path_notation_dots %}}

[1]: /fr/observability_pipelines/search_syntax/logs/