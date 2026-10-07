---
description: Apprenez à utiliser le processeur Tag Cardinality Control pour limiter
  le nombre de valeurs de tag pour chaque métrique.
disable_toc: false
products:
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Processeur Tag Cardinality Control
---
{{< jqmath-vanilla >}}

{{< product-availability >}}

## Présentation {#overview}

Le processeur Tag Cardinality Control limite le nombre de valeurs de tag pour chaque métrique. Par exemple, une métrique avec des clés de tag non bornées, telles que `userID`, peut entraîner un pic de cardinalité de la métrique et impacter les coûts d'ingestion et d'indexation. Pour éviter ces pics inattendus, utilisez le processeur pour définir une limite de cardinalité pour les métriques qui correspondent à la requête de filtrage, et soit supprimez les métriques reçues après l'atteinte de la limite, soit supprimez les tags de ces métriques.

En option, vous pouvez également configurer des [remplacements par métrique](#optional-per-metric-override-settings) pour définir une limite pour une métrique spécifique ou pour exclure la métrique de toute limite de cardinalité. Pour chaque remplacement par métrique, vous pouvez également définir une limite personnalisée pour des tags individuels au sein de la métrique, ou les exclure de la limite de cardinalité par métrique.

## Configuration {#setup}

Pour configurer le processeur Tag Cardinality Control :

1. Définissez une requête de filtre. Consultez [Syntaxe de recherche de métriques][1] pour plus d'informations.
    - Seules les métriques correspondant au filtre sont traitées.
    - Toutes les métriques, qu'elles correspondent ou non à la requête de filtrage, sont envoyées à l'étape suivante du pipeline.
1. Sélectionnez un **Mode de suivi** dans le menu déroulant. Consultez la section [Modes exact et probabiliste](#exact-and-probabilistic-modes) pour plus d'informations.
1. Saisissez une limite de cardinalité pour le nombre maximal de valeurs distinctes par tag. Cette limite s'applique à toutes les métriques qui correspondent à la requête de filtrage.
1. Dans le menu déroulant **Lorsque la limite est atteinte**, sélectionnez si vous souhaitez **Supprimer le tag** ou **Supprimer l'événement** pour les métriques ayant dépassé la limite de cardinalité.

{{< img src="observability_pipelines/processors/tag_cardinality_control_settings.png" alt="Le processeur Tag Cardinality Control est défini sur une limite de cardinalité de 200 et sur la suppression du tag lorsque la limite est atteinte." style="width:40%;" >}}

### Paramètres de remplacement par métrique facultatifs {#optional-per-metric-override-settings}

Si vous souhaitez définir une limite de cardinalité pour une métrique spécifique :

1. Cliquez sur **Gérer les remplacements** puis sur **Ajouter un remplacement de métrique** dans le panneau latéral.
1. Saisissez le nom de la métrique.
1. Sélectionnez le mode de remplacement dans le menu déroulant.
    - **Limite personnalisée** : définit une limite de cardinalité pour cette métrique.
    - **Exclure de la limite** : exclut cette métrique du comptage vers la limite de cardinalité. Ceci est utile lorsque vous suivez une métrique importante et que vous ne souhaitez supprimer aucun échantillon ni aucun tag en raison d'une limite de cardinalité.
1. Dans le menu déroulant **Lorsque la limite est atteinte**, sélectionnez si vous souhaitez **Supprimer le tag** ou **Supprimer l'événement** pour les métriques ayant dépassé la limite de cardinalité.

#### Remplacements par tag {#per-tag-overrides}

Pour ajouter des remplacements de tag spécifiques pour cette métrique :

1. Cliquez sur **Ajouter un remplacement de tag**.
1. Saisissez la clé de tag pour laquelle vous souhaitez définir une limite.
1. Sélectionnez le mode de remplacement dans le menu déroulant :
    - **Limite personnalisée** : définit une limite sur le nombre de valeurs uniques par tag. Par exemple, si la limite de tag est définie sur `5`, les cinq premières valeurs de tag reçues sont utilisées.
        - **Remarque** : les valeurs de tag persistent jusqu'au redémarrage du Worker ou à la mise à jour de la configuration du pipeline. Toute mise à jour de la configuration du pipeline réinitialise les valeurs de tag, même si la mise à jour n'affecte pas le processeur Tag Cardinality Control.
    - **Exclure de la limite** : exclut les métriques avec le tag spécifié du comptage vers la limite de cardinalité.
1. Saisissez la limite pour le nombre maximal de valeurs de clé de tag.
1. Cliquez sur **Ajouter un remplacement**.

{{< img src="observability_pipelines/processors/tag_cardinality_control_overrides.png" alt="Le panneau de remplacement par métrique avec une limite personnalisée définie sur 100, avec des remplacements par tag pour le tag host exclu de la limite et le tag region limité à cinq." style="width:80%;" >}}

## Fonctionnement du processeur {#how-the-processor-works}

### Modes exact et probabiliste {#exact-and-probabilistic-modes}

Le processeur Tag Cardinality Control prend en charge deux modes pour le suivi de la cardinalité des tags :

- **Exact** : stocke les valeurs de tag sous forme d'un hachage de 8 octets pour optimiser l'utilisation de la mémoire, au prix d'une probabilité extrêmement faible que deux valeurs distinctes soient hachées dans la même empreinte.
- **Probabiliste**a: Utilise des [filtres de Bloom][2] pour suivre les valeurs vues, ce qui peut fortement optimiser l'utilisation de la mémoire au prix de faux positifs occasionnels. Un faux positif se produit lorsqu'une valeur qui n'a pas encore été vue est incorrectement déterminée comme ayant été vue, ce qui amène le processeur à dépasser légèrement la limite de cardinalité spécifiée.

#### Utilisation de la mémoire pour le mode exact {#memory-usage-for-exact-mode}

La formule suivante calcule la quantité de mémoire utilisée par le mode exact :

$$A = \\text\"nombre total de métriques\"\\ \\×\\ \\text\"nombre moyen de clés de tag par métrique\"$$

$$B = \\text\"longueur moyenne de chaque clé de tag\"\\ + (\\text\"value_limit\"\\ \\×\\ \\text\"longueur moyenne des valeurs de tag\")$$

$$\\text\"Utilisation de la mémoire\" = A\\ \\×\\ B$$

Comme chaque valeur de tag est stockée sous forme d'empreinte de hachage de 8 octets, le `average length of tag values` est `8`.

#### Utilisation de la mémoire pour le mode probabiliste {#memory-usage-for-probabilistic-mode}

Le mode probabiliste utilise des filtres de Bloom pour suivre les valeurs vues pour chaque paire (métrique, tag). Par exemple, si le nom de la métrique est `request.latency` avec les clés de tag `host` et `region`, les paires suivies sont :

- (`request.latency`, `host`)
- (`request.latency`, `region`)

La formule suivante estime l'utilisation de la mémoire pour le mode probabiliste :

$$A = \\text\"nombre total de métriques\"\\ \\×\\ \\text\"nombre moyen de clés de tag par métrique\"$$

$$B = \\text\"longueur moyenne des noms de champs pour les tags\"\\ \\+\\ \\text\"cache_size_per_key\"$$

$$\\text\"Utilisation de la mémoire\" = A\\ \\×\\ B$$

Vous pouvez calculer `cache_size_per_key` avec un calculateur de filtre de Bloom en utilisant une formule standard, où `n` est la limite de cardinalité et le taux de faux positifs (`p`) est fixé à `0.1%` dans le Worker.

### Benchmarks pour le mode exact par rapport au mode probabiliste {#benchmarks-for-exact-mode-versus-probabilistic-mode}

Les tableaux suivants présentent des benchmarks pour le mode exact et le mode probabiliste. À mesure que le nombre de valeurs uniques pour chaque tag augmente, le mode probabiliste devient plus efficace en utilisation de mémoire. Les noms de métriques et les noms de tags utilisés pour ces benchmarks étaient des chaînes de 20 octets générées aléatoirement.

Le type de machine utilisé pour le benchmarking est une instance AWS M6gd.4xlarge.

#### Benchmarks pour 10 000 métriques suivies {#benchmarks-for-10000-metrics-tracked}

Le tableau suivant montre l'utilisation de la mémoire RSS du Worker pour les modes probabiliste et exact lors du suivi de 10 000 métriques.

**10 tags par métrique**

| Valeurs uniques par tag | Mode probabiliste (GB) | Mode exact (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 500                   | 0,20                    | 1,04            |
| 250                   | 0,13                    | 0,56            |
| 100                   | 0,10                    | 0,21            |

#### Benchmarks pour 50 000 métriques suivies {#benchmarks-for-50000-metrics-tracked}

Le tableau suivant montre l'utilisation de la mémoire RSS du Worker pour les modes probabiliste et exact lors du suivi de 50 000 métriques.

**10 tags par métrique**

| Valeurs uniques par tag | Mode probabiliste (GB) | Mode exact (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 0,35                    | 0,92            |
| 250                   | 0,54                    | 2,67            |
| 500                   | 0,83                    | 5,06            |

**50 tags par métrique**

| Valeurs uniques par tag | Mode probabiliste (GB) | Mode exact (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 1,27                    | 3,98            |
| 250                   | 2,08                    | 12,91           |
| 500                   | 3,33                    | 24,87           |

#### Benchmarks pour 100 000 métriques suivies {#benchmarks-for-100000-metrics-tracked}

Le tableau suivant présente l'utilisation de la mémoire RSS du Worker pour les modes probabiliste et exact lors du suivi de 100 000 métriques.

**10 tags par métrique**

| Valeurs uniques par tag | Mode probabiliste (GB) | Mode exact (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 0,66                    | 1,79            |
| 250                   | 1,02                    | 5,29            |
| 500                   | 1,61                    | 10,11           |

**50 tags par métrique**

| Valeurs uniques par tag | Mode probabiliste (GB) | Mode exact (GB) |
|:---------------------:|:-----------------------:|:---------------:|
| 100                   | 2,49                    | 7,86            |
| 250                   | 4,08                    | 25,74           |
| 500                   | 6,61                    | 47,15 (estimation)|

[1]: /fr/observability_pipelines/search_syntax/metrics/
[2]: https://en.wikipedia.org/wiki/Bloom_filter