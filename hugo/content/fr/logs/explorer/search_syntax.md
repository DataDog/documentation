---
aliases:
- /fr/logs/search-syntax
- /fr/logs/search_syntax/
description: Effectuez des recherches dans l'ensemble de vos logs.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Bien démarrer avec la recherche en texte intégral dans Datadog
- link: /logs/explorer/#visualize
  tag: Documentation
  text: Apprenez à visualiser les logs
- link: /logs/explorer/#patterns
  tag: Documentation
  text: Détecter les modèles dans vos logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/explorer/saved_views/
  tag: Documentation
  text: En savoir plus sur Saved Views
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentation
  text: En savoir plus sur les formules de champs calculés
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: Centre d'apprentissage
  text: Bien démarrer avec le Log Explorer
title: Syntaxe de recherche de logs
---
## Présentation {#overview}

Une requête de filtre est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot seul tel que `test` ou `hello`.

* Une **séquence** est un groupe de mots entourés de guillemets doubles, tel que `"hello dolly"`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
| `AND`        | **Intersection** : les deux termes sont présents dans les événements sélectionnés (si rien n'est ajouté, AND est pris par défaut) | authentication AND failure   |
| `OR`         | **Union** : l'un ou l'autre terme est contenu dans les événements sélectionnés                                             | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant n'est PAS dans l'événement (s'applique à chaque recherche de texte brut individuelle)                                                  | authentication AND -password |

## Recherche en texte intégral {#full-text-search}

<div class="alert alert-danger">La fonctionnalité de recherche plein texte est uniquement disponible dans Log Management et fonctionne dans les requêtes de monitor, de dashboard et de notebook. La syntaxe de recherche plein texte ne peut pas être utilisée pour définir des filtres d'index, des filtres d'archivage, des filtres de pipeline de logs, des filtres de réhydratation, des filtres de métriques basés sur les logs, ou dans Live Tail. </div>

Utilisez la syntaxe `*:search_term` pour effectuer une recherche en texte intégral sur tous les attributs de log, y compris le message de log.

### Exemple de terme unique {#single-term-example}

| Syntaxe de recherche | Type de recherche | Description                                               |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | Texte intégral   | Recherche la chaîne exacte `hello` dans tous les attributs de log. |
| `hello`       | Texte libre   | Recherche la chaîne exacte uniquement dans les attributs `message`, `@title`, `@error.message` et `@error.stack` `hello`.       |

### Exemple de terme de recherche avec caractère générique {#search-term-with-wildcard-example}

| Syntaxe de recherche | Type de recherche | Description                                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | Texte intégral   | Recherche la chaîne exacte `hello` dans tous les attributs de log.                                   |
| `*:hello*`    | Texte intégral   | Recherche les chaînes commençant par `hello` dans tous les attributs de log. Par exemple, `hello_world`.  |

### Exemple de termes multiples avec correspondance exacte {#multiple-terms-with-exact-match-example}

| Syntaxe de recherche       | Type de recherche | Description                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | Texte intégral   | Recherche la chaîne exacte dans tous les attributs de log `hello world`.                                    |
| `hello world`       | Texte libre   | Recherche uniquement dans le message de log pour les mots `hello` et `world`. Par exemple `hello beautiful world`.  |

## Échapper les caractères spéciaux et les espaces {#escape-special-characters-and-spaces}

Les caractères suivants sont considérés comme spéciaux et nécessitent d'être échappés avec le caractère `\` : `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#`, ainsi que les espaces.
- `/` n'est pas considéré comme un caractère spécial et n'a pas besoin d'être échappé.
- `@` ne peut pas être utilisé dans les requêtes de recherche dans le Log Explorer, car il est réservé pour [Recherche d'attributs](#attributes-search).

Vous ne pouvez pas rechercher de caractères spéciaux dans un message de log. Vous pouvez rechercher des caractères spéciaux lorsqu'ils se trouvent à l'intérieur d'un attribut.

Pour rechercher des caractères spéciaux, extrayez-les dans un attribut à l'aide du [parser Grok][1], puis effectuez une recherche sur les logs contenant cet attribut.

## Recherche d'attributs {#attributes-search}

Pour effectuer une recherche sur un attribut spécifique, ajoutez `@` pour préciser que vous effectuez une recherche sur un attribut.

Par exemple, si le nom de votre attribut est **url** et que vous souhaitez filtrer sur la valeur **url** `www.datadoghq.com`, saisissez :

```
@url:www.datadoghq.com
```

### Attributs réservés {#reserved-attributes}

Les [attributs réservés][8] tels que `host`, `source`, `status`, `service`, `trace_id` et `message` ne nécessitent pas le préfixe `@`. Vous pouvez rechercher ces attributs directement :

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**Remarques** :

1. Il n'est **pas** nécessaire de définir une facette pour effectuer une recherche sur des attributs et des tags.

2. Les recherches d'attributs sont sensibles à la casse. Utilisez la [recherche en texte intégral](#full-text-search) pour obtenir des résultats insensibles à la casse. Une autre option consiste à utiliser le filtre `lowercase` avec votre analyseur Grok lors du parsing pour obtenir des résultats insensibles à la casse pendant la recherche.

3. La recherche d'une valeur d'attribut contenant des caractères spéciaux nécessite l'utilisation de caractères d'échappement ou de guillemets doubles.
    - Par exemple, pour un attribut `my_attribute` avec la valeur `hello:world`, effectuez la recherche en utilisant : `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.
    - Pour faire correspondre un seul caractère spécial ou un espace, utilisez le caractère générique `?`. Par exemple, pour un attribut `my_attribute` avec la valeur `hello world`, effectuez la recherche en utilisant : `@my_attribute:hello?world`.

Exemples :

| Requête de recherche                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Recherche tous les logs correspondant à `/api/v1/test` dans l'attribut `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Recherche tous les logs contenant une valeur dans l'attribut `http.url` qui commence par `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Recherche tous les logs contenant une valeur `http.status_code` comprise entre 200 et 299, et contenant une valeur dans l'attribut `http.url_details.path` qui commence par `/api-v1/` |
| `-@http.status_code:*`                                                | Recherche tous les logs ne contenant pas l'attribut `http.status_code` |

### Recherche en utilisant la notation CIDR {#search-using-cidr-notation}
Le routage inter-domaine sans classe (CIDR) est une notation qui permet aux utilisateurs de définir succinctement une plage d'adresses IP (également appelée blocs CIDR). Le CIDR est le plus couramment utilisé pour définir un réseau (tel qu'un VPC) ou un sous-réseau (tel qu'un sous-réseau public/privé au sein d'un VPC).

Les utilisateurs peuvent utiliser la fonction `CIDR()` pour interroger des attributs dans les logs en utilisant la notation CIDR. La fonction `CIDR()` doit recevoir un attribut de log en tant que paramètre pour le filtrage, suivi d'un ou plusieurs blocs CIDR.

#### Exemples {#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)` correspond aux logs et les filtre s'ils possèdent des adresses IP dans le champ `network.client.ip` qui tombent sous le bloc CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` correspond aux logs et les filtre s'ils possèdent des adresses IP dans un attribut de tableau `network.ip.list` qui tombent sous les blocs CIDR 13.0.0.0/8 ou 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` correspondrait et filtrerait les événements de rejet du pare-feu Palo Alto qui proviennent du sous-réseau 13.0.0.0/8
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` affichera tous les logs VPC qui ne proviennent pas du sous-réseau 13.0.0.0/8 mais qui sont destinés au sous-réseau de destination 15.0.0.0/8, car vous souhaitez analyser le trafic réseau entre les sous-réseaux dans vos environnements

La fonction `CIDR()` prend en charge les notations CIDR IPv4 et IPv6 et fonctionne dans le Log Explorer, Live Tail, les widgets de logs dans les dashboards, les monitors de logs et les configurations de logs.

## Wildcards {#wildcards}

Vous pouvez utiliser des wildcards avec la recherche en texte libre. Cependant, elle ne recherche que les termes dans le message du log, le texte de la colonne `content` dans le Log Explorer. Consultez [Recherche en texte intégral](#full-text-search) si vous souhaitez rechercher une valeur dans un attribut de log.

### Caractère générique multi-caractères {#multi-character-wildcard}

Pour effectuer une recherche par wildcard multi-caractères dans le message du log (la colonne `content` dans le Log Explorer), utilisez le symbole `*` comme suit :

* `service:web*` correspond à tout message de log dont le service commence par `web`.
* `web*` correspond à tous les messages de log commençant par `web`.
* `*web` correspond à tous les messages de log se terminant par `web`.

**Remarque** : les wildcards ne fonctionnent comme tels qu'en dehors des guillemets. Par exemple, `"*test*"` correspond à un log contenant la chaîne `*test*` dans son message. `*test*` correspond à un log contenant la chaîne test n'importe où dans son message.

Les recherches par wildcard fonctionnent avec cette syntaxe au sein des tags et des attributs (facettés ou non). Cette requête renvoie tous les services qui se terminent par la chaîne `mongo` :
<p> </p>
<p></p>

```
service:*mongo
```

Les recherches par wildcard peuvent également être utilisées pour effectuer des recherches dans le texte brut d'un log qui ne fait pas partie d'un attribut de log. Par exemple, cette requête renvoie tous les logs dont le contenu (message) contient la chaîne `NETWORK` :

```
*NETWORK*
```

Cependant, ce terme de recherche ne renvoie pas les logs contenant la chaîne `NETWORK` si elle se trouve dans un attribut de log et non dans le message du log.

### Caractère générique de recherche {#search-wildcard}

Lors de la recherche d'un attribut ou d'une valeur de tag qui contient des caractères spéciaux ou nécessite des caractères d'échappement ou des guillemets doubles, utilisez le caractère générique `?` pour faire correspondre un seul caractère spécial ou espace. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world` : `@my_attribute:hello?world`.
<p> </p>

## Valeurs numériques {#numerical-values}

Afin d'effectuer une recherche sur un attribut numérique, [ajoutez-le d'abord en tant que facette][2]. Vous pouvez ensuite utiliser des opérateurs numériques (`<`, `>`, `<=` ou `>=`) pour effectuer une recherche sur des facettes numériques.
Par exemple, récupérez tous les logs ayant un temps de réponse supérieur à 100 ms avec :
<p> </p>

```
@http.response_time:>100
```

Vous pouvez rechercher un attribut numérique dans une plage spécifique. Par exemple, récupérez toutes vos erreurs 4xx avec :

```
@http.status_code:[400 TO 499]
```

## Tags {#tags}

Vos logs héritent des tags des [hosts][3] et des [intégrations][4] qui les génèrent. Ils peuvent être utilisés dans la recherche ainsi que comme facettes :

* `test` recherche la chaîne « test ».
* `env:(prod OR test)` correspond à tous les logs avec le tag `env:prod` ou le tag `env:test`
* `(env:prod AND -version:beta)` correspond à tous les logs qui contiennent le tag `env:prod` et qui ne contiennent pas le tag `version:beta`

Si vos tags ne suivent pas les [bonnes pratiques en matière de tags][5] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche :

* `tags:<MY_TAG>`

## Tableaux {#arrays}

Dans l'exemple suivant, en cliquant sur la valeur `Peter` dans la facette, l'interface renvoie tous les logs qui contiennent un attribut `users.names`, dont la valeur est soit `Peter`, soit un tableau contenant `Peter` :

{{< img src="logs/explorer/search/array_search.png" alt="Tableau et facettes" style="width:80%;">}}

**Remarque** : La recherche peut également être utilisée sur des attributs de tableau non facettés en utilisant une syntaxe équivalente.

Dans l'exemple suivant, les logs CloudWatch pour Windows contiennent un tableau d'objets JSON sous `@Event.EventData.Data`. Vous ne pouvez pas créer de facette sur un tableau d'objets JSON, mais vous pouvez effectuer une recherche en utilisant la syntaxe suivante.

* `@Event.EventData.Data.Name:ObjectServer` correspond à tous les logs avec la clé `Name` et la valeur `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Requête sans facette sur un tableau d'objets JSON" style="width:80%;">}}

### Recherche dans un tableau imbriqué {#nested-array-search}

Pour rechercher un champ imbriqué dans un attribut de tableau, utilisez le préfixe `@` avec le chemin d'accès complet à l'attribut. Le Log Explorer correspond à n'importe quel élément du tableau :

* `@network.ip.attributes.ip:2a02\:1810*` correspond à tous les logs où au moins un élément du tableau `network.ip.attributes` possède un champ `ip` commençant par `2a02:1810`.

Pour faire correspondre les logs où un tableau contient plusieurs valeurs spécifiques, listez les valeurs entre parenthèses :

* `@user_perms:(4 6)` correspond à tous les logs où le tableau `user_perms` contient à la fois `4` et `6`.

Pour faire correspondre les logs où un tableau contient une valeur quelconque dans une plage, utilisez une requête de plage :

* `@user_perms:[2 TO 6]` correspond à tous les logs où le tableau `user_perms` contient au moins une valeur comprise entre `2` et `6`.

## Champs calculés {#calculated-fields}

Les champs calculés fonctionnent comme des attributs de log et peuvent être utilisés pour la recherche, l'agrégation, la visualisation et la définition d'autres champs calculés. Utilisez le préfixe `#` pour référencer les noms de champs calculés.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un champ calculé appelé request_duration, utilisé pour filtrer les résultats dans le Log Explorer." style="width:100%;" >}}

## Recherches enregistrées {#saved-searches}

[Saved Views][6] contient votre requête de recherche, les colonnes, l'horizon temporel et la facette.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing
[2]: /fr/logs/explorer/facets/
[3]: /fr/infrastructure/
[4]: /fr/integrations/#cat-log-collection
[5]: /fr/getting_started/tagging/#tags-best-practices
[6]: /fr/logs/explorer/saved_views/
[7]: /fr/logs/explorer/facets/#facet-panel
[8]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes