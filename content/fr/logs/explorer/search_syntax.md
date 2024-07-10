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
title: Syntaxe de recherche de logs
---

## Présentation

Un filtre de requête est composé de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique comme `test` ou `hello`.

* Une **séquence** est un groupe de mots entre guillemets, comme `hello dolly`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens sensibles à la casse suivants :

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
| `AND`        | **Intersection** : les deux termes figurent dans les événements sélectionnés (si aucun opérateur n'est ajouté, AND est utilisé par défaut). | authentication AND failure   |
| `OR`         | **Union** : un des deux termes figure dans les événements sélectionnés.                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant ne figure PAS dans l'événement (cela s'applique à chaque recherche de texte brut).                                                  | authentication AND -password |

## Échapper les caractères spéciaux et les espaces

Les caractères suivants sont considérés comme spéciaux : `+` `-` `=` `&&` `||` `>` `<` `!` `(` `)` `{` `}` `[` `]` `^` `"` `“` `”` `~` `*` `?` `:` et `\`. Tout comme les espaces, ils doivent être échappés avec le caractère `\`.

Il n'est pas possible de rechercher des caractères spéciaux dans un message de log. Vous pouvez toutefois rechercher des caractères spéciaux au sein d'un attribut.

Pour rechercher des caractères spéciaux, parsez-les dans un attribut avec le [parser Grok][1], puis recherchez les logs contenant l'attribut en question.


## Recherche d'attributs

Pour rechercher un attribut spécifique, ajoutez `@` pour indiquer que vous recherchez un attribut.

Par exemple, si le nom de votre attribut est **url** et que vous souhaitez filtrer les résultats en fonction de la valeur de **url** `www.datadoghq.com`, saisissez :

```
@url:www.datadoghq.com
```


**Remarques** :

1. Vous n'avez **pas** besoin de définir une facette pour rechercher des attributs et des tags.

2. Les recherches d'attributs sont sensibles à la casse. Effectuez une recherche en texte intégral pour obtenir des résultats non sensibles à la casse. Vous pouvez aussi utiliser le filtre `lowercase` avec votre parser Grok lors du parsing pour obtenir des résultats de recherche non sensibles à la casse.

3. Lorsque vous recherchez une valeur d'attribut qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets.
    - Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello:world`, recherchez `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.
    - Pour rechercher un caractère spécial ou une espace unique, utilisez le wildcard `?`. Par exemple, pour un attribut `my_attribute` ayant pour valeur `hello world`, recherchez `@my_attribute:hello?world`.

Exemples :

| Requête de recherche                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Recherche tous les logs correspondants à `/api/v1/test` dans l'attribut `http.url_details.path`.                                                                               |
| `@http.url:\/api\/v1\/*`                                             | Recherche tous les logs dont la valeur de l'attribut `http.url` commence par `/api/v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:\/api\/v1\/*` | Recherche tous les logs dont la valeur `http.status_code` est comprise entre 200 et 299 et dont la valeur de l'attribut `http.url_details.path` commence par `/api/v1/` |
| `-@http.status_code:*`                                                | Recherche tous les logs ne contenant pas l'attribut `http.status_code` |

### Effectuer une recherche avec la syntaxe CIDR
La syntaxe Classless Inter Domain Routing (CIDR) permet aux utilisateurs de définir de façon succincte une plage d'adresses IP (ou blocs CIDR). Cette syntaxe sert généralement à définir un réseau (comme un VPC) ou un sous-réseau (comme un sous-réseau public ou privé au sein d'un VPC).

Les utilisateurs peuvent se servir de la fonction `CIDR()` pour interroger les attributs contenus dans des logs à l'aide de la syntaxe CIDR. La fonction `CIDR()` doit être passée dans un attribut de log sous forme de paramètre de filtre, et être suivie d'un ou de plusieurs blocs CIDR.

#### Exemples
- `CIDR(@network.client.ip,13.0.0.0/8)` renvoie et filtre les logs pour lesquels les adresses IP du champ `network.client.ip` correspondent au bloc CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` renvoie et filtre les logs pour lesquels une adresse IP d'un attribut de tableau `network.ip.list` correspond au bloc 13.0.0.0/8 ou au bloc 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` renvoie et filtre les événements de rejet du pare-feu Palo Alto qui provienne du sous-réseau 13.0.0.0/8.
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` renvoie tous les logs de VPC qui ne proviennent pas de 13.0.0.0/8, mais dont la destination est le sous-réseau 15.0.0.0/8. Cela vous permet d'analyser le trafic réseau de vos environnements entre les sous-réseaux.

La fonction `CIDR()` prend à la fois en charge la syntaxe CIDR IPv4 et IPv6. Elle peut être utilisée dans le Log Explorer, la vue Live Tail, les widgets de logs dans les dashboards, les monitors de log et les configurations de log.


## Wildcards

### Wildcard pour plusieurs caractères

Afin d'effectuer une recherche avec un wildcard pour plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

* `service:web*` renvoie tous les messages de log dont le service commence par `web`.
* `web*` renvoie tous les messages de log commençant par `web`
* `*web` renvoie tous les messages de log finissant par `web`

**Remarque** : les wildcards sont uniquement considérés comme tels lorsqu'ils se trouvent en dehors de guillemets. Par exemple, `”*test*”` renvoie un log qui contient le texte `*test*` dans son message, tandis que `*test*` renvoie un log qui contient le texte test à n'importe quel endroit de son message.

Les wildcards peuvent être utilisés au sein de tags et d'attributs (qu'ils comportent ou non une facette) avec cette syntaxe. La requête suivante renvoie tous les services se terminant par le texte `mongo` :
<p> </p>
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

Lorsque vous recherchez une valeur d'attribut ou de tag qui contient des caractères spéciaux ou qui nécessite des caractères d'échappement ou des guillemets, utilisez le wildcard `?` pour renvoyer un caractère spécial ou une espace unique. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world`, utilisez : `@my_attribute:hello?world`.
<p> </p>

## Valeurs numériques

Pour pouvoir rechercher une valeur dans un attribut numérique, commencez par [l'ajouter en tant que facette][2]. Vous pouvez alors utiliser des opérateurs numériques (`<`,`>`, `<=` ou `>=`) pour rechercher une valeur parmi des facettes numériques. Par exemple, recherchez ce qui suit pour récupérer tous les logs dont le temps de réponse dépasse 100 ms :
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

Dans l'exemple suivant, les logs CloudWatch pour Windows contiennent un tableau d'objets JSON sous `@Event.EventData.Data`. Il est impossible de créer une facette sur un tableau d'objets JSON. Toutefois, vous pouvez effectuer une recherche à l'aide de la syntaxe suivante.

* `@Event.EventData.Data.Name:ObjectServer` renvoie tous les logs ayant pour clé `Name` et pour valeur `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Requête sans facette sur un tableau d'objets JSON" style="width:80%;">}}
<p> </p>

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