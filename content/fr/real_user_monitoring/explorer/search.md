---
title: Recherche RUM
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer/analytics/
    tag: Documentation
    text: Générez des analyses à partir de vos événements.
---
## Syntaxe de recherche

Une requête est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

| **Opérateur** | **Description**                                                                                       |
|--------------|-------------------------------------------------------------------------------------------------------|
| `AND`        | **Intersection** : les deux termes figurent dans les vues sélectionnées (si aucun opérateur n'est ajouté, AND est utilisé par défaut). |
| `OR`         | **Union** : un des deux termes figure dans les vues sélectionnées.                                             |
| `-`          | **Exclusion** : le terme suivant ne figure PAS dans les vues sélectionnées.                                                  |

### Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant des valeurs existantes :

{{< img src="real_user_monitoring/explorer/search/search_bar_autocomplete.png" alt="Saisie automatiquement dans la barre de recherche"  style="width:60%;">}}

## Recherche à facettes

Pour effectuer une recherche en fonction d'un attribut spécifique, [ajoutez-le comme facette][1] puis utilisez `@` pour indiquer que vous faites une recherche à partir d'une facette.

Par exemple, si le nom de votre facette est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur *www.datadoghq.com*, saisissez :

`@url:www.datadoghq.com`

### Échappement de caractères spéciaux

**Remarque** : lorsque vous effectuez une recherche en fonction d'une valeur de facette qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets. Les caractères suivants sont considérés comme spéciaux : `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/` et `\`. Ils requièrent par conséquent le caractère d'échappement `\`.

La même logique s'applique aux espaces dans les noms des facettes de vues. Les facettes de vues ne sont pas supposées contenir d'espaces, mais si elles en ont, les espaces doivent être précédées d'un caractère d'échappement. Si un attribut est appelé `user.first name`, effectuez une recherche en fonction de cet attribut en ajoutant un caractère d'échappement devant l'espace : `@user.first\ name:mavaleur`

### Wildcards

Afin d'effectuer une recherche avec un wildcard correspondant à plusieurs caractères, utilisez le symbole `*`. Par exemple, `@http.url:https:\/\/*` renvoie toutes les vues dont l'URL commence par `https://`.

### Valeurs numériques

Utilisez les caractères `<`,`>`, `<=` ou `>=` pour effectuer une recherche avec des attributs numériques. Par exemple, pour récupérer toutes les vues dont la durée est supérieure à 100 ns :

`@duration:>100`

Vous pouvez effectuer une recherche d'attribut numérique dans un intervalle spécifique. Par exemple, pour récupérer toutes les vues dont la durée est comprise entre 100 ns et 300 ns :

`@duration:[100 TO 300]`

## Exemples

`@http.url_details.path:"/api/v1/test"`
: Recherche toutes les vues contenant `/api/v1/test` dans l'attribut `http.url_details.path`.

`@http.url:\/api\/v1\/*`
: Recherche toutes les vues dont la valeur de l'attribut `http.url` commence par `/api/v1/`.

`@duration:[100 TO 300] @http.url_details.path:\/api\/v1\/*`
: Recherche toutes les vues dont la `duration` est comprise entre 100 et 300 ns et dont la valeur de l'attribut `http.url_details.path` commence par `/api/v1/`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/#setup---facets--measures