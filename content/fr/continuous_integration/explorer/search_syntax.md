---
description: Découvrez comment effectuer une recherche parmi toutes vos exécutions
  de pipeline dans le CI Visibility Explorer.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Premiers pas avec la recherche dans Datadog
- link: /continuous_integration/search
  tag: Documentation
  text: Filtrer et regrouper des pipelines
- link: /continuous_integration/explorer/facets
  tag: Documentation
  text: En savoir plus sur les facettes
title: Syntaxe de recherche de CI Visibility Explorer
---

## Présentation

Un filtre de requête est composé de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `pipeline` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant l'opérateur ne figure PAS dans l'événement (s'applique à chaque recherche de texte brute).                                                  | authentication AND -password |

## Rechercher des attributs et des tags

Vous n'avez pas besoin de définir une facette pour rechercher des attributs et des tags. Pour rechercher un attribut spécifique, ajoutez `@` pour indiquer que vous recherchez un attribut. Les recherches d'attributs sont sensibles à la casse. Effectuez une recherche en texte libre pour obtenir des résultats non sensibles à la casse.

Par exemple, si vous êtes intéressé par l'attribut `git.repository.id` et que vous souhaitez utiliser la valeur `Datadog/documentation` pour le filtre, utilisez `@git.repository.id:"github.com/Datadog/documentation"`.

La recherche d'une valeur d'attribut contenant des caractères spéciaux nécessite un échappement ou des guillemets doubles. Par exemple, pour un attribut `my_attribute` avec la valeur `hello:world`, utilisez ceci pour la recherche : `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.

Pour rechercher un caractère spécial ou une espace unique, utilisez le wildcard `?`. Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello world`, recherchez `@my_attribute:hello?world`.

Pour en savoir plus sur les tags, consultez la section [Utiliser les tags][2].

## Les wildcards

### Wildcard pour plusieurs caractères

Afin d'effectuer une recherche avec un wildcard pour plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

* `service:web*` renvoie tous les messages de log dont le service commence par `web`.
* `web*` renvoie tous les messages de log commençant par `web`.
* `*web` renvoie tous les messages de log finissant par `web`.

**Remarque** : les wildcards sont uniquement interprétés comme tels lorsqu'ils sont utilisés en dehors de guillemets doubles. Par exemple, `@ci.pipeline.name:"*test*"` renvoie un pipeline dont le nom contient la chaîne `*test*`, tandis que `@ci.pipeline.name:*test*` renvoie un pipeline dont le nom contient la chaîne `test`.

Les recherches de wildcards fonctionnent dans les tags et attributs (avec facettes ou non) à l'aide de cette syntaxe. 

### Wildcard de recherche

Lorsque vous recherchez une valeur d'attribut ou de tag qui contient des caractères spéciaux ou qui nécessite des caractères d'échappement ou des guillemets, utilisez le wildcard `?` pour renvoyer un caractère spécial ou une espace unique. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world`, utilisez `@my_attribute:hello?world`.

## Valeurs numériques

Pour rechercher un attribut numérique, commencez par [l'ajouter en tant que facette][1]. Vous pouvez ensuite utiliser les opérateurs numériques (`<`,`>`, `<=`, ou `>=`) pour effectuer une recherche dans les facettes numériques.

Par exemple, pour récupérer toutes les exécutions de pipeline dont la durée est supérieure à une semaine, utilisez `@duration:>=7days`.

## Tags

Vos exécutions de pipeline héritent des tags des [hosts][3] et des [intégrations][4] qui les génèrent. Ils peuvent être utilisés dans une recherche ainsi que comme facettes :

* `pipeline` recherche la chaîne « pipeline ».
* `env:(prod OR pipeline)` renvoie toutes les exécutions de pipeline avec le tag `env:prod` ou le tag `env:pipeline`.
* `(env:prod AND -version:beta)` renvoie toutes les exécutions de pipeline avec le tag `env:prod` et sans le tag `version:beta`.

Si vos tags ne respectent pas les [recommandations relatives aux tags][5] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche : `tags:<MY_TAG>`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/explorer/facets
[2]: /fr/getting_started/tagging/using_tags
[3]: /fr/infrastructure
[4]: /fr/integrations
[5]: /fr/getting_started/tagging/#define-tags