---
description: Apprenez à utiliser le processeur Aggregate pour combiner plusieurs métriques
  ayant les mêmes valeurs de tag en un seul échantillon.
disable_toc: false
products:
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Processeur Aggregate
---
{{< product-availability >}}

## Présentation {#overview}

Le processeur Aggregate combine plusieurs métriques ayant les mêmes valeurs de tag en un seul échantillon en fonction du mode d'agrégation sélectionné. L'agrégation des métriques peut contribuer à réduire votre volume de métriques ainsi que vos coûts.

## Configuration {#setup}

Pour configurer le processeur Aggregate :

1. Définissez une requête de filtre. Consultez [Syntaxe de recherche de métriques][1] pour plus d'informations sur la création de requêtes.
    - Les métriques qui ne correspondent pas à la requête de filtrage sont envoyées à l'étape suivante du pipeline.
    - Les métriques qui correspondent à la requête sont agrégées et les métriques agrégées sont envoyées à l'étape suivante du pipeline.
1. Dans le menu déroulant **Mode**, sélectionnez la fonction d'agrégation à utiliser. Consultez la section [Modes](#modes) pour plus de détails.
1. Dans le champ **Interval**, saisissez la fenêtre temporelle en secondes pour agréger les métriques. La valeur maximale est de 60 secondes.

## Modes {#modes}

Le processeur Aggregate peut combiner des métriques en une seule métrique selon les modes suivants. Certains modes ne sont disponibles que pour des [types de métriques][2] spécifiques, incrémentales ou absolues.

| Mode   | Description                                                                            | Métriques incrémentales | Métriques absolues |
| ------ | -------------------------------------------------------------------------------------- | :-----------------: | :--------------: |
| Auto   | Mode par défaut. Additionne les métriques incrémentales et utilise la dernière valeur pour les métriques absolues. | {{< X >}}           | {{< X >}}        |
| Sum    | Additionne les valeurs des métriques.                                                                | {{< X >}}           |                  |
| Count  | Compte le nombre de fois où la métrique est reçue.                                     | {{< X >}}           | {{< X >}}        |
| Latest | Renvoie la dernière valeur.                                                       |                     | {{< X >}}        |
| Max    | Renvoie la valeur maximale de la métrique.                                                      |                     | {{< X >}}        |
| Mean   | Renvoie la valeur moyenne de la métrique.                                                         |                     | {{< X >}}        |
| Min    | Renvoie la valeur minimale de la métrique.                                                      |                     | {{< X >}}        |

[1]: /fr/observability_pipelines/search_syntax/metrics/
[2]: /fr/observability_pipelines/configuration/?tab=metrics#metrics-data