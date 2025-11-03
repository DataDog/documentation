---
aliases:
- /fr/logs/search-syntax
- /fr/logs/search_syntax/
description: Effectuez des recherches dans l'ensemble de vos logs.
further_reading:
- link: /logs/explorer/#visualiser-les-donnees
  tag: Documentation
  text: Découvrir comment visualiser des logs
- link: /logs/explorer/#patterns
  tag: Documentation
  text: Détecter les patterns dans vos logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/explorer/saved_views/
  tag: Documentation
  text: En savoir plus sur les vues enregistrées
- link: /logs/explorer/calculated_fields/expression_language
  tag: Documentation
  text: En savoir plus sur le langage d'expression des champs calculés
title: Syntaxe de recherche de logs
---

## Section Overview

Un filtre de requête est composé de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant l'opérateur ne figure PAS dans l'événement (s'applique à chaque recherche de texte brute).                                                  | authentication AND -password |

## Recherche en texte intégral 

<div class="alert alert-danger">La fonction de recherche en texte intégral est uniquement disponible dans Log Management et fonctionne dans les requêtes de monitor, de dashboard et de notebook. La syntaxe de recherche en texte intégral ne peut pas être utilisée pour définir des filtres d'index, d'archivage, de pipeline de logs, de réhydratation, ni dans Live Tail (suivi en direct). </div>

Utilisez la syntaxe `*:search_term` pour effectuer une recherche en texte intégral sur tous les attributs de logs, y compris le message de log.

### Exemple de terme unique

| Syntaxe de recherche | Type de recherche | Rôle                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | Texte intégral   | Recherche dans tous les attributs de logs la chaîne exacte `hello`. |
| `hello`       | Texte libre   | Recherche uniquement dans le message de log la chaîne exacte `hello`.       |

### Exemple de terme de recherche avec caractère générique

| Syntaxe de recherche | Type de recherche | Rôle                                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | Texte intégral   | Recherche dans tous les attributs de logs la chaîne exacte `hello`.                                   |
| `*:hello*`    | Texte intégral   | Recherche dans tous les attributs de logs les chaînes commençant par `hello`. Par exemple : `hello_world`.  |

### Exemple de termes multiples avec correspondance exacte

| Syntaxe de recherche       | Type de recherche | Rôle                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | Texte intégral   | Recherche dans tous les attributs de logs la chaîne exacte `hello world`.                                    |
| `hello world`       | Texte libre   | Recherche uniquement dans le message de log les mots `hello` et `world`. Par exemple `hello beautiful world`.  |

## Échapper les caractères spéciaux et les espaces

Les caractères suivants, considérés comme spéciaux : `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` `\` `#`, ainsi que les espaces, doivent être échappés à l'aide du caractère `\`. 
- `/` n'est pas considéré comme un caractère spécial et n'a pas besoin d'être échappé.
- `@` ne peut pas être utilisé dans les requêtes de recherche dans Logs Explorer, car il est réservé à la [recherche d'attributs](#attributes-search).

Il n'est pas possible de rechercher des caractères spéciaux dans un message de log. Il est possible de rechercher des caractères spéciaux lorsqu'ils se trouvent dans un attribut.

Pour rechercher des caractères spéciaux, extrayez-les dans un attribut à l'aide du [parser Grok][1], puis effectuez une recherche sur les logs contenant cet attribut.


## Recherche d'attributs

Pour effectuer une recherche sur un attribut spécifique, ajoutez `@` pour indiquer qu'il s'agit d'une recherche sur un attribut.

Par exemple, si le nom de votre attribut est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur de **url** `www.datadoghq.com`, saisissez :

```
@url:www.datadoghq.com
```


**Remarques** :

1. Vous n'avez **pas** besoin de définir une facette pour rechercher des attributs et des tags.

2. Les recherches d'attributs sont sensibles à la casse. Utilisez la [recherche en texte intégral](#full-text-search) pour obtenir des résultats insensibles à la casse. Une autre option consiste à utiliser le filtre `lowercase` avec votre parser Grok lors de l'analyse pour obtenir des résultats insensibles à la casse pendant la recherche.

3. Lorsque vous recherchez une valeur d'attribut qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets.
    - Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello:world`, recherchez `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.
    - Pour rechercher un caractère spécial ou une espace unique, utilisez le wildcard `?`. Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello world`, recherchez `@my_attribute:hello?world`.

Exemples :

| Requête de recherche                                                         | Rôle                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Recherche tous les logs correspondants à `/api/v1/test` dans l'attribut `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Recherche dans tous les logs une valeur de l'attribut `http.url` commençant par `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Recherche tous les logs contenant une valeur `http.status_code` comprise entre 200 et 299, et une valeur dans l'attribut `http.url_details.path` qui commence par `/api-v1/` |
| `-@http.status_code:*`                                                | Recherche tous les logs ne contenant pas l'attribut `http.status_code` |

### Recherche avec la notation CIDR
CIDR (Classless Inter Domain Routing) est une notation qui permet de définir de manière concise une plage d'adresses IP (également appelée bloc CIDR). Elle est le plus souvent utilisée pour définir un réseau (comme un VPC) ou un sous-réseau (comme un sous-réseau public/privé au sein d'un VPC).

Les utilisateurs peuvent utiliser la fonction `CIDR()` pour interroger des attributs dans les logs en utilisant la notation CIDR. La fonction `CIDR()` prend en paramètre un attribut de log à filtrer, suivi d'un ou plusieurs blocs CIDR. 

#### Exemples
- `CIDR(@network.client.ip,13.0.0.0/8)` correspond aux logs dont l'adresse IP dans le champ `network.client.ip` appartient au bloc CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` correspond aux logs contenant au moins une adresse IP dans l'attribut tableau `network.ip.list` appartenant aux blocs CIDR 13.0.0.0/8 ou 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` filtre les événements de type *reject* provenant d'un pare-feu Palo Alto situés dans le sous-réseau 13.0.0.0/8.
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` affiche tous les logs VPC qui ne proviennent pas du sous-réseau 13.0.0.0/8 mais sont destinés au sous-réseau 15.0.0.0/8, utile pour analyser le trafic réseau entre sous-réseaux dans votre environnement.

La fonction `CIDR()` prend en charge les notations CIDR IPv4 et IPv6, et fonctionne dans Log Explorer, Live Tail, les widgets de logs dans les dashboards, les monitors de logs et les configurations de logs.

## Les wildcards

Vous pouvez utiliser des caractères génériques dans la recherche en texte libre. Toutefois, cela ne recherche que les termes présents dans le message de log, c'est-à-dire le texte de la colonne `content` dans Log Explorer. Référez-vous à la rubrique [Recherche en texte intégral](#full-text-search) si vous souhaitez rechercher une valeur dans un attribut de log.

### Wildcard pour plusieurs caractères

Pour effectuer une recherche avec un caractère générique multi-caractères dans le message de log (colonne `content` dans Log Explorer), utilisez le symbole `*` comme suit :

* `service:web*` renvoie tous les messages de log dont le service commence par `web`.
* `web*` renvoie tous les messages de log commençant par `web`.
* `*web` renvoie tous les messages de log finissant par `web`.

**Remarque** : Les caractères génériques ne sont interprétés comme tels que lorsqu’ils sont utilisés en dehors des guillemets doubles. Par exemple, `"*test*"` correspond à un log contenant littéralement la chaîne `*test*` dans son message. En revanche, `*test*` correspond à un log contenant la chaîne `test` n’importe où dans son message.

Les wildcards peuvent être utilisés au sein de tags et d'attributs (avec ou sans facettes) avec cette syntaxe. La requête suivante renvoie tous les services se terminant par le texte `mongo` :
<p> </p>
<p></p>

```
service:*mongo
```

Les recherches avec caractères génériques peuvent aussi être utilisées pour chercher dans le texte brut d’un log, c’est-à-dire en dehors des attributs. Par exemple, la requête suivante renvoie tous les logs dont le contenu (message) contient la chaîne `NETWORK` :

```
*NETWORK*
```

Cependant, ce terme de recherche ne renverra pas de logs contenant la chaîne `NETWORK` si celle-ci se trouve dans un attribut de log et non dans le message.

### Wildcard de recherche

Lorsque vous recherchez une valeur d'attribut ou de tag qui contient des caractères spéciaux ou qui nécessite des caractères d'échappement ou des guillemets, utilisez le wildcard `?` pour renvoyer un caractère spécial ou une espace unique. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world`, utilisez `@my_attribute:hello?world`.
<p> </p>

## Valeurs numériques

Pour effectuer une recherche sur un attribut numérique, commencez par [l'ajouter comme facette][2]. Vous pourrez ensuite utiliser des opérateurs numériques (`<`, `>`, `<=` ou `>=`) pour effectuer une recherche sur ces facettes numériques.
Par exemple, récupérez tous les logs dont le temps de réponse dépasse 100 ms avec :
<p> </p>

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

Dans l'exemple ci-dessous, cliquer sur la valeur `Peter` dans la facette renvoie tous les logs contenant un attribut `users.names` dont la valeur est soit `Peter`, soit un tableau qui contient `Peter` :

{{< img src="logs/explorer/search/array_search.png" alt="Tableau et facettes" style="width:80%;">}}

**Remarque** : il est également possible de rechercher des attributs de tableau sans facette à l'aide d'une syntaxe similaire.

Dans l'exemple suivant, les logs CloudWatch pour Windows contiennent un tableau d'objets JSON sous `@Event.EventData.Data`. Même s'il est impossible de créer une facette sur un tableau d'objets JSON, vous pouvez effectuer une recherche à l'aide de la syntaxe suivante.

* `@Event.EventData.Data.Name:ObjectServer` renvoie tous les logs ayant pour clé `Name` et pour valeur `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Requête sans facette sur un tableau d'objets JSON" style="width:80%;">}}
<p> </p>

## Champs calculés

Les champs calculés fonctionnent comme des attributs de log et peuvent être utilisés pour la recherche, l’agrégation, la visualisation et la définition d’autres champs calculés. Utilisez le préfixe `#` pour faire référence aux noms de champs calculés.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un champ calculé nommé request_duration utilisé pour filtrer les résultats dans le Log Explorer" style="width:100%;" >}}

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
[7]: /fr/logs/explorer/facets/#facet-panel