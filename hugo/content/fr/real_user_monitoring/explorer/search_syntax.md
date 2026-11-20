---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentation
  text: Rechercher des événements
title: Syntaxe de recherche
---

## Présentation

Une requête est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

| **Opérateur** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les vues sélectionnées (si aucun opérateur n'est ajouté, AND est utilisé par défaut). |
| `OR`         | **Union** : un des deux termes figure dans les vues sélectionnées.                                             |
| `-`          | **Exclusion** : le terme suivant ne figure pas dans les vues sélectionnées.                                                  |

## Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter vos requêtes en utilisant des valeurs existantes.

{{< img src="real_user_monitoring/explorer/search/search_bar_autocomplete2.png" alt="Saisie automatique dans la barre de recherche" style="width:90%;" >}}

## Échapper des caractères spéciaux

**Remarque** : lorsque vous effectuez une recherche en fonction d'une valeur de facette qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets. Les caractères suivants sont considérés comme spéciaux : `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/` et `\`. Ils requièrent par conséquent le caractère d'échappement `\`.

La même logique s'applique aux espaces incluses dans les noms des facettes de vue. Évitez d'utiliser des espaces dans ces noms. S'ils contiennent tout de même des espaces, vous devez les échapper.

Par exemple, pour rechercher la facette `user.first name`, utilisez la requête suivante afin d'échapper l'espace : `@user.first\ name:myvalue`.

## Wildcards

Utilisez le symbole `*` pour effectuer une recherche avec un wildcard correspondant à plusieurs caractères. Par exemple, `@http.url:https:\/\/*` renvoie toutes les vues dont l'URL commence par `https://`.

## Valeurs numériques

Utilisez les caractères `<`, `>`, `<=` ou `>=` pour effectuer une recherche avec des attributs numériques. Par exemple, la requête `@session.error.count:>5` vous permet de récupérer toutes les sessions comportant plus de cinq erreurs.

Vous pouvez effectuer une recherche en fonction de la plage de valeurs d'un attribut numérique. Par exemple, la requête `@session.error.count:[3 TO 10]` vous permet de récupérer toutes les sessions qui comptent entre trois et dix erreurs.

## Exemples de recherche

`@view.url_path:"/department/sofas"`
: Recherche toutes les vues contenant `/department/sofas` l'attribut `@view.path`.

`@view.url_path:\/department\/sofas\/*`
: Recherche toutes les vues dont l'attribut `view.path` possède une valeur commençant par `/department/sofas/`.

`@view.loading_time:[1s TO 3s] @view.url_path:\/department\/sofas\/*`
: Recherche toutes les vues dont le `loading_time` est compris entre une et trois secondes et dont l'attribut `@view.url_path` possède une valeur commençant par `/department/sofas/`.

## Recherches enregistrées

Les [vues enregistrées][1] conservent votre requête de recherche, vos colonnes, votre ordre de tri, votre intervalle ainsi que vos facettes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/saved_views