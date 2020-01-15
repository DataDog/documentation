---
title: Recherche
kind: documentation
description: Effectuez des recherches dans l'ensemble de vos logs.
aliases:
  - /fr/logs/search
further_reading:
  - link: logs/explorer/analytics
    tag: Documentation
    text: Effectuer des analyses de logs
  - link: logs/explorer/patterns
    tag: Documentation
    text: Détecter les patterns dans vos logs
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/explorer/saved_views
    tag: Documentation
    text: Configurer automatiquement votre vue Log Explorer
---
Tous les paramètres de recherche sont contenus dans l'adresse URL. Vous pouvez partager votre vue en partageant l'URL.

{{< img src="logs/explorer/search_your_logs.mp4" alt="Effectuer une recherche dans vos logs" video="true" >}}

## Syntaxe de recherche

Une requête est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
| `AND`        | **Intersection** : les deux termes sont inclus dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes est inclus dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant n'est PAS inclus dans les événements sélectionnés.                                                  | authentication AND -password |

### Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant des valeurs existantes :

{{< img src="logs/explorer/search/search_bar_autocomplete.png" alt="Saisie automatique dans la barre de recherche" style="width:80%;">}}

### Échappement de caractères spéciaux

Les caractères suivants sont considérés comme spéciaux : `?`, `>`, `<`, `:`, `=`,`"`, `~`, `/`, et `\` requièrent le caractère d'échappement `\`.

### Recherche d'attributs

#### Recherche d'attribut message

Pour rechercher les logs qui contiennent `user=AliceMartin` dans l'attribut message, utilisez la recherche suivante :

`user\=AliceMartin`

#### Recherche à facettes

Pour effectuer une recherche en fonction d'un attribut spécifique, [ajoutez-le comme facette][1] puis utilisez `@` pour indiquer que vous faites une recherche à partir d'une facette.

Par exemple, si le nom de votre facette est **url** et que vous souhaitez filtrer la valeur **url** sur *www.datadoghq.com*, saisissez :

`@url:www.datadoghq.com`

**Remarque** : lorsque vous recherchez une valeur de facette qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets. La même logique s'applique aux espaces dans les attributs de log. Les attributs de log ne sont pas supposés contenir d'espaces, mais s'ils en ont, les espaces doivent être précédées d'un caractère d'échappement. Si un attribut est appelé `user.first name`, effectuez une recherche en fonction de cet attribut en ajoutant un caractère d'échappement devant l'espace : `@user.first\ name:mavaleur`

Exemples :

| Requête de recherche                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Recherche tous les logs contenant `/api/v1/test` dans l'attribut `http.url_details.path`.                                                                               |
| `@http.url:\/api\/v1\/*`                                             | Recherche tous les logs dont la valeur de l'attribut `http.url` commence par `/api/v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | Recherche tous les logs dont la valeur `http.status_code` est comprise entre 200 et 299 et dont la valeur de l'attribut `http.url_details.path` commence par `/api/v1/` |

### Wildcards

Afin d'effectuer une recherche générique avec plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

* `service:web*` renvoie tous les messages de log dont le service commence par `web`.
* `web*` renvoie tous les messages de log commençant par `web`
* `*web` renvoie tous les messages de log finissant par `web`

Les wildcards peuvent être utilisés au sein d'une facette avec cette syntaxe. La requête suivante renvoie tous les services se terminant par le texte `mongo` :

`service:*mongo`

Les wildcards peuvent également être utilisés pour effectuer une recherche de texte brut dans un log qui ne fait pas partie d'une facette. La requête suivante renvoie tous les logs contenant le texte `NETWORK` :

`*NETWORK*`

En revanche, les logs contenant le texte `NETWORK` et faisant partie d'une facette mais pas du message de log ne seront pas renvoyés.

### Valeurs numériques

Utilisez les caractères `<`, `>`, `<=` ou `>=` pour effectuer une recherche avec des attributs numériques. Par exemple, pour récupérer tous les logs avec un délai de réponse supérieur à 100 ms :

`@http.response_time:>100`

Vous pouvez effectuer une recherche d'attribut numérique dans une plage spécifique. Par exemple, pour récupérer toutes les erreurs 4xx :

`@http.status_code:[400 TO 499]`

### Tags

Vos logs héritent des tags des [hosts][2] et des [intégrations][3] qui les génèrent. Ils peuvent être utilisés dans une recherche ainsi que comme facettes :

* `test` recherche la chaîne « test ».
* `("env:prod" OR test)` renvoie tous les logs avec le tag `#env:prod` ou le tag `#test`.
* `(service:srvA OR service:srvB)` ou `(service:(srvA OR srvB))` renvoie tous les logs qui contiennent les tags `#service:srvA` ou `#service:srvB`.
* `("env:prod" AND -"version:beta")` renvoie tous les logs qui contiennent `#env:prod` et qui ne contiennent pas `#version:beta`

Si vos tags ne respectent pas les [recommandations relatives aux tags][4] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche :

* `tags:<MON_TAG>`

### Tableaux

Vous pouvez ajouter des facettes à des tableaux de chaînes ou de nombres. Toutes les valeurs incluses dans le tableau sont énumérées dans la facette et peuvent être utilisées pour effectuer une recherche de logs.

Dans l'exemple ci-dessous, cliquer sur la valeur `Peter` dans la facette renvoie tous les logs contenant un attribut `users.names` dont la valeur est soit `Peter`, soit un tableau qui contient `Peter` :

{{< img src="logs/explorer/search/array_search.png" alt="Tableaux et facettes" style="width:80%;">}}

## Recherches enregistrées

Les [vues enregistrées][5] contiennent votre requête de recherche, les colonnes, l'horizon temporel et la facette.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/?tab=facets#setup
[2]: /fr/infrastructure
[3]: /fr/integrations/#cat-log-collection
[4]: /fr/tagging/#tags-best-practices
[5]: /fr/logs/explorer/saved_views