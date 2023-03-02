---
aliases:
- /fr/logs/search
- /fr/logs/search-syntax
- /fr/logs/explorer/search/
- /fr/logs/search_syntax/
description: Effectuez des recherches dans l'ensemble de vos logs.
further_reading:
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Effectuer des analyses de logs
- link: /logs/explorer/#patterns
  tag: Documentation
  text: Détecter les patterns dans vos logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/explorer/saved_views/
  tag: Documentation
  text: Configurer automatiquement votre vue Log Explorer
kind: documentation
title: Syntaxe de recherche de logs
---

## Présentation

Un filtre de requête est composé de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants :

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant ne figure PAS dans les événements sélectionnés.                                                  | authentication AND -password |

## Saisie automatique

Utilisez la fonctionnalité de saisie automatique de la barre de recherche pour compléter votre requête en utilisant des valeurs existantes :

{{< img src="logs/explorer/search/search_bar_autocomplete.jpg" alt="Saisie automatique dans la barre de recherche" style="width:80%;">}}

## Échappement de caractères spéciaux

Les caractères `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\` ont un rôle spécial. De plus, le caractère `/` doit être échappé par `\`. Il n'est pas possible de rechercher ces caractères spéciaux dans un message de log. Vous avez toutefois la possibilité de les rechercher dans un attribut. Pour rechercher des caractères spéciaux, parsez-les dans un attribut avec le [parser grok][1], puis cherchez les logs qui contiennent cet attribut.


## Recherche d'attributs

{{< site-region region="gov,us3,us5" >}}
Pour rechercher un attribut spécifique, commencez par l'[ajouter en tant que facette][1], puis ajoutez `@` pour indiquer que vous recherchez une facette.

Par exemple, si le nom de votre attribut est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur de **url** `www.datadoghq.com`, saisissez :

```
@url:www.datadoghq.com
```

**Remarques** :

1. Les recherches de facettes sont sensibles à la casse. Effectuez une recherche en texte intégral pour obtenir des résultats non sensibles à la casse. Vous pouvez aussi utiliser le filtre lowercase avec votre parser Grok lors du parsing pour obtenir des résultats de recherche non sensibles à la casse.

2. Lorsque vous effectuez une recherche en fonction d'une valeur de facette qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets.
Par exemple, pour rechercher la facette `my_facet` avec la valeur `hello:world`, utilisez `@my_facet:hello\:world` ou `@my_facet:"hello:world"`.
Pour rechercher un caractère spécial ou une espace unique, utilisez le wildcard `?`. Par exemple, pour rechercher la facette `my_facet` avec la valeur `hello world`, utilisez `@my_facet:hello?world`.

[1]: /fr/logs/explorer/facets/

{{< /site-region >}}
{{< site-region region="us,eu" >}}
Pour rechercher un attribut spécifique, ajoutez `@` pour indiquer que vous recherchez un attribut.

Par exemple, si le nom de votre attribut est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur de **url** `www.datadoghq.com`, saisissez :

```
@url:www.datadoghq.com
```


**Remarques** :

1. Vous n'avez **pas** besoin de définir une facette pour rechercher des attributs et des tags.

2. Les recherches d'attributs sont sensibles à la casse. Effectuez une recherche en texte intégral pour obtenir des résultats non sensibles à la casse. Vous pouvez aussi utiliser le filtre `lowercase` avec votre parser Grok lors du parsing pour obtenir des résultats de recherche non sensibles à la casse.

3. Lorsque vous recherchez une valeur d'attribut qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets.
Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello:world`, recherchez `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.
Pour rechercher un caractère spécial ou une espace unique, utilisez le wildcard `?`. Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello world`, recherchez `@my_attribute:hello?world`.
{{< /site-region >}}

Exemples :

| Requête de recherche                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Recherche tous les logs correspondants à `/api/v1/test` dans l'attribut `http.url_details.path`.                                                                               |
| `@http.url:\/api\/v1\/*`                                             | Recherche tous les logs dont la valeur de l'attribut `http.url` commence par `/api/v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | Recherche tous les logs dont la valeur `http.status_code` est comprise entre 200 et 299 et dont la valeur de l'attribut `http.url_details.path` commence par `/api/v1/` |

## Wildcards

### Wildcard pour plusieurs caractères

Afin d'effectuer une recherche générique avec plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

* `service:web*` renvoie tous les messages de log dont le service commence par `web`.
* `web*` renvoie tous les messages de log commençant par `web`
* `*web` renvoie tous les messages de log finissant par `web`

**Remarque** : les wildcards sont uniquement considérés comme tels lorsqu'ils se trouvent en dehors de guillemets. Par exemple, `”*test*”` renvoie un log qui contient le texte `*test*` dans son message, tandis que `*test*` renvoie un log qui contient le texte test à n'importe quel endroit de son message.

{{< site-region region="gov,us3,us5" >}}
Les wildcards peuvent être utilisés au sein de facettes avec cette syntaxe. La requête suivante renvoie tous les services se terminant par le texte `mongo` :
<p> </p>
{{< /site-region >}}

{{< site-region region="us,eu" >}}
Les wildcards peuvent être utilisés au sein de tags et d'attributs (à facette ou non) avec cette syntaxe. La requête suivante renvoie tous les services se terminant par le texte `mongo` :
<p> </p>
{{< /site-region >}}
<p></p>

```
service:*mongo
```

Les wildcards peuvent également être utilisés pour effectuer une recherche de texte brut dans un log qui ne fait pas partie d'une facette. La requête suivante renvoie tous les logs contenant le texte `NETWORK` :

```
*NETWORK*
```

En revanche, les logs contenant le texte `NETWORK` et faisant partie d'une facette mais pas du message de log ne seront pas renvoyés.

### Wildcard de recherche

{{< site-region region="gov,us3,us5" >}}
Lorsque vous recherchez une valeur de facette qui contient des caractères spéciaux ou qui nécessite des caractères d'échappement ou des guillemets, utilisez le wildcard `?` pour renvoyer un caractère spécial ou une espace unique. Par exemple, pour rechercher une facette `my_facet` ayant pour valeur `hello world`, utilisez `@my_facet:hello?world`.
<p> </p>
{{< /site-region >}}

{{< site-region region="us,eu" >}}
Lorsque vous recherchez une valeur d'attribut ou de tag qui contient des caractères spéciaux ou qui nécessite des caractères d'échappement ou des guillemets, utilisez le wildcard `?` pour renvoyer un caractère spécial ou une espace unique. Par exemple, pour rechercher un attribut `my_attribute` ayant pour valeur `hello world`, utilisez `@my_attribute:hello?world`.
<p> </p>
{{< /site-region >}}

## Valeurs numériques

Pour rechercher un attribut numérique, commencez par l'[ajouter en tant que facette][2]. Vous pouvez ensuite utiliser des opérateurs numériques (`<`,`>`, `<=` ou `>=`) pour rechercher vos facettes numériques.
Par exemple, pour récupérer tous les logs dont le délai de réponse est supérieur à 100 ms, utilisez :<p> </p>

```
@http.response_time:>100
```

Vous pouvez effectuer une recherche d'attribut numérique dans une plage spécifique. Par exemple, pour récupérer toutes les erreurs 4xx :

```
@http.status_code:[400 TO 499]
```

## Tags

Vos logs héritent des tags des [hosts][3] et des [intégrations][4] qui les génèrent. Ils peuvent être utilisés dans une recherche ainsi que comme facettes :

* `test` recherche la chaîne « test ».
* `env:(prod OR test)` renvoie tous les logs avec le tag `env:prod` ou le tag `env:test`.
* `(env:prod AND -version:beta)` renvoie tous les logs avec le tag `env:prod` et sans le tag `version:beta`.

Si vos tags ne respectent pas les [recommandations relatives aux tags][5] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche :

* `tags:<MON_TAG>`

## Tableaux

Vous pouvez ajouter des facettes à des tableaux de chaînes ou de nombres. Toutes les valeurs incluses dans le tableau sont énumérées dans la facette et peuvent être utilisées pour effectuer une recherche de logs.

Dans l'exemple ci-dessous, cliquer sur la valeur `Peter` dans la facette renvoie tous les logs contenant un attribut `users.names` dont la valeur est soit `Peter`, soit un tableau qui contient `Peter` :

{{< img src="logs/explorer/search/array_search.png" alt="Tableau et facettes" style="width:80%;">}}

{{< site-region region="us,eu" >}}

**Remarque** : il est également possible de rechercher des attributs de tableau sans facette à l'aide d'une syntaxe similaire.

Dans l'exemple suivant, les logs CloudWatch pour Windows contiennent un tableau d'objets JSON sous `@Event.EventData.Data`.

* `@Event.EventData.Data.Name:ObjectServer` renvoie tous les logs ayant pour clé `Name` et pour valeur `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Requête sans facette sur un tableau d'objets JSON" style="width:80%;">}}
<p> </p>
{{< /site-region >}}

## Recherches enregistrées

Les [vues enregistrées][6] contiennent votre requête de recherche, les colonnes, l'horizon temporel et la facette.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing
[2]: /fr/logs/explorer/facets/
[3]: /fr/infrastructure/
[4]: /fr/integrations/#cat-log-collection
[5]: /fr/getting_started/tagging/#tags-best-practices
[6]: /fr/logs/explorer/saved_views/