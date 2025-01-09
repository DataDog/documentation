---
aliases:
- /fr/synthetics/explorer/search_syntax
description: Découvrez comment créer une requête de recherche dans l'Explorateur de
  surveillance Synthetic et de tests en continu.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentation
  text: En savoir plus sur l'explorateur de surveillance Synthetic et de tests en
    continu
title: Syntaxe de recherche
---

## Présentation

Une requête est composée de termes et d'opérateurs.

Il existe deux types de termes :

- Un **terme unique** est un mot unique comme `test` ou `hello`.
- Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

| Opérateur | Description                                                                                        |
|--------------|------------------------------------------------------------------------------------------------------- |
| `AND`        | **Intersection** : les deux termes figurent dans les vues sélectionnées. Si aucun opérateur n'est utilisé, `AND` est utilisé par défaut. |
| `OR`         | **Union** : un des deux termes figure dans les vues sélectionnées.                                             |
| `-`          | **Exclusion** : le terme suivant ne figure pas dans les vues sélectionnées.                                                  |

## Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter vos requêtes en utilisant des valeurs existantes.

## Valeurs numériques

Vous pouvez rechercher un attribut numérique au sein d'un intervalle spécifique. Par exemple, récupérez tous les lots d'une durée moyenne se situant entre deux et dix nanosecondes dans la facette **Duration**. La requête de recherche se met à jour avec `Duration:[2-10]`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}