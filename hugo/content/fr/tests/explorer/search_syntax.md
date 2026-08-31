---
description: Découvrez comment rechercher toutes vos exécutions de tests dans Test
  Visibility Explorer.
further_reading:
- link: /tests/search
  tag: Documentation
  text: Filtrer et regrouper des tests
- link: /tests/explorer/facets
  tag: Documentation
  text: En savoir plus sur les facettes
title: Syntaxe de la recherche dans Test Visibility Explorer
---

## Présentation

Un filtre de requête est composé de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant l'opérateur ne figure PAS dans l'événement (s'applique à chaque recherche de texte brute).                                                  | authentication AND -password |

## Rechercher des attributs et des tags

Vous n'avez pas besoin de définir une facette pour rechercher des attributs et des tags. Pour rechercher un attribut spécifique, ajoutez `@` pour indiquer que vous recherchez un attribut. Les recherches d'attributs sont sensibles à la casse. Effectuez une recherche en texte libre pour obtenir des résultats non sensibles à la casse.

Par exemple, si vous êtes intéressé par l'attribut `git.repository.name` et que vous souhaitez utiliser la valeur `Datadog/documentation` pour le filtre, utilisez `@git.repository.id:"github.com/Datadog/documentation"`.

La recherche d'une valeur d'attribut contenant des caractères spéciaux nécessite un échappement ou des guillemets doubles. Par exemple, pour un attribut `my_attribute` avec la valeur `hello:world`, utilisez ceci pour la recherche : `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.

Pour rechercher un caractère spécial ou une espace unique, utilisez le wildcard `?`. Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello world`, recherchez `@my_attribute:hello?world`.

Pour en savoir plus sur les tags, consultez la section [Utiliser les tags][2].

## Wildcards

### Wildcard pour plusieurs caractères

Afin d'effectuer une recherche avec un wildcard pour plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

* `service:web*` renvoie tous les messages de log dont le service commence par `web`.
* `web*` renvoie tous les messages de log commençant par `web`.
* `*web` renvoie tous les messages de log finissant par `web`.

Les wildcards peuvent être utilisés au sein de tags et d'attributs (avec ou sans facettes) avec cette syntaxe. La requête suivante renvoie tous les services se terminant par le texte `mongo` :
<p> </p>
<p></p>

```
test.service:*mongo
```

### Wildcard de recherche

Lorsque vous recherchez une valeur d'attribut ou de tag qui contient des caractères spéciaux ou qui nécessite des caractères d'échappement ou des guillemets, utilisez le wildcard `?` pour renvoyer un caractère spécial ou une espace unique. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world`, utilisez `@my_attribute:hello?world`.
<p> </p>

## Valeurs numériques

Pour rechercher un attribut numérique, commencez par [l'ajouter en tant que facette][1]. Vous pouvez ensuite utiliser les opérateurs numériques (`<`,`>`, `<=`, ou `>=`) pour effectuer une recherche dans les facettes numériques.

Par exemple, pour récupérer tous les tests dont la durée est supérieure à une semaine, utilisez : `@duration:>=7days`.

## Tags

Vos exécutions de tests héritent des tags des [hosts][3] et des [intégrations][4] qui les génèrent. Elles peuvent être utilisées dans une recherche ainsi que comme facettes :

* `test` recherche la chaîne « test ».
* `env:(prod OR test)` renvoie toutes les exécutions de test avec le tag `env:prod` ou le tag `env:test`.
* `(env:prod AND -version:beta)` renvoie toutes les exécutions de test avec le tag `env:prod` et sans le tag `version:beta`.

Si vos tags ne respectent pas les [recommandations relatives aux tags][5] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche : `tags:<MON_TAG>`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tests/explorer/facets
[2]: /fr/getting_started/tagging/using_tags
[3]: /fr/infrastructure
[4]: /fr/integrations
[5]: /fr/getting_started/tagging/#define-tags