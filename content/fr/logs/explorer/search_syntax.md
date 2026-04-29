---
aliases:
- /fr/logs/search-syntax
- /fr/logs/search_syntax/
description: Effectuez des recherches dans l'ensemble de vos logs.
further_reading:
- link: /getting_started/search/
  tag: Documentation
  text: Commencer avec la recherche dans Datadog
- link: /logs/explorer/#visualize
  tag: Documentation
  text: Apprenez à visualiser les journaux
- link: /logs/explorer/#patterns
  tag: Documentation
  text: Détecter les modèles dans vos logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/explorer/saved_views/
  tag: Documentation
  text: En savoir plus sur les vues enregistrées
- link: /logs/explorer/calculated_fields/formulas
  tag: Documentation
  text: En savoir plus sur les formules des champs calculés
title: Syntaxe de recherche de logs
---
## Aperçu {#overview}

Une requête de filtre est composée de termes et d'opérateurs.

Il existe deux types de termes :

* Un **terme unique** est un mot unique tel que `test` ou `hello`.

* Une **séquence** est un groupe de mots entourés de guillemets, tel que `"hello dolly"`.

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

|              |                                                                                                        |                              |
|--------------|--------------------------------------------------------------------------------------------------------|------------------------------|
| **Opérateur** | **Description**                                                                                        | **Exemple**                  |
| `AND`        | **Intersection** : les deux termes sont dans les événements sélectionnés (si rien n'est ajouté, AND est pris par défaut) | authentication AND failure   |
| `OR`         | **Union** : l'un ou l'autre des termes est contenu dans les événements sélectionnés | authentication OR password   |
| `-`          | **Exclusion** : le terme suivant n'est PAS dans l'événement (s'applique à chaque recherche de texte brut individuelle) | authentication AND -password |

## Recherche en texte intégral {#full-text-search}

<div class="alert alert-danger">La fonctionnalité de recherche en texte intégral est uniquement disponible dans la gestion des journaux et fonctionne dans les requêtes de moniteur, de tableau de bord et de carnet de notes. La syntaxe de recherche en texte intégral ne peut pas être utilisée pour définir des filtres d'index, des filtres d'archive, des filtres de pipeline de journaux, des filtres de réhydratation, ou dans Live Tail. </div>

Utilisez la syntaxe `*:search_term` pour effectuer une recherche en texte intégral sur tous les attributs de journal, y compris le message du journal.

### Exemple de terme unique {#single-term-example}

| Syntaxe de recherche | Type de recherche | Description |
| ------------- | ----------- | --------------------------------------------------------- |
| `*:hello`     | Texte intégral | Recherche tous les attributs de journal pour la chaîne exacte `hello`. |
| `hello`       | Texte libre | Recherche uniquement les `message`, `@title`, `@error.message` et `@error.stack` attributs pour la chaîne exacte `hello`.       |

### Exemple de terme de recherche avec un caractère générique {#search-term-with-wildcard-example}

| Syntaxe de recherche | Type de recherche | Description |
| ------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `*:hello`     | Texte intégral   | Recherche dans tous les attributs de journal pour la chaîne exacte `hello`.                                   |
| `*:hello*`    | Texte intégral   | Recherche dans tous les attributs de journal pour les chaînes commençant par `hello`. Par exemple, `hello_world`.  |

### Exemple de plusieurs termes avec correspondance exacte {#multiple-terms-with-exact-match-example}

| Syntaxe de recherche       | Type de recherche | Description                                                                                        |
| ------------------- | ----------- |--------------------------------------------------------------------------------------------------- |
| `*:"hello world"`   | Texte intégral   | Recherche dans tous les attributs de journal pour la chaîne exacte `hello world`.                                    |
| `hello world`       | Texte libre   | Recherche uniquement dans le message du journal pour les mots `hello` et `world`. Par exemple `hello beautiful world`.  |

## Échapper les caractères spéciaux et les espaces {#escape-special-characters-and-spaces}

Les caractères suivants sont considérés comme spéciaux et nécessitent d'être échappés avec le caractère `\` : `=` `-` `!` `&&` `||` `>` `>=` `<` `<=` `(` `)` `{` `}` `[` `]` `"` `*` `?` `:` `\` `#`, et les espaces.
- `/` n'est pas considéré comme un caractère spécial et n'a pas besoin d'être échappé.
- `@` ne peut pas être utilisé dans les requêtes de recherche dans Logs Explorer car il est réservé pour [Attribute Search](#attributes-search).

Vous ne pouvez pas rechercher des caractères spéciaux dans un message de journal. Vous pouvez rechercher des caractères spéciaux lorsqu'ils se trouvent à l'intérieur d'un attribut.

Pour rechercher des caractères spéciaux, extrayez-les dans un attribut à l'aide du [parser Grok][1], puis effectuez une recherche sur les logs contenant cet attribut.

## Recherche d'attributs {#attributes-search}

Pour rechercher sur un attribut spécifique, ajoutez `@` pour spécifier que vous recherchez sur un attribut.

Par exemple, si le nom de votre attribut est **url** et que vous souhaitez filtrer sur la valeur **url** `www.datadoghq.com`, entrez :

```
@url:www.datadoghq.com
```

### Attributs réservés {#reserved-attributes}

[Attributs réservés][8] tels que `host`, `source`, `status`, `service`, `trace_id`, et `message` ne nécessitent pas le préfixe `@`. Vous pouvez rechercher ces attributs directement :

```
service:web-app
status:error
host:i-1234567890abcdef0
```

**Notes** :

1. Il n'est **pas** nécessaire de définir une facette pour rechercher sur les attributs et les balises.

2. Les recherches sur les attributs sont sensibles à la casse. Utilisez [la recherche en texte intégral](#full-text-search) pour obtenir des résultats insensibles à la casse. Une autre option est d'utiliser le `lowercase` filtre avec votre parseur Grok lors de l'analyse pour obtenir des résultats insensibles à la casse pendant la recherche.

3. Lorsque vous recherchez une valeur d'attribut qui contient des caractères spéciaux, vous devez utiliser des caractères d'échappement ou des guillemets.
    - Par exemple, pour un attribut `my_attribute` avec la valeur `hello:world`, recherchez en utilisant : `@my_attribute:hello\:world` ou `@my_attribute:"hello:world"`.
    - Pour correspondre à un seul caractère spécial ou à un espace, utilisez le `?` caractère générique. Par exemple, pour un attribut `my_attribute` avec la valeur `hello world`, recherchez en utilisant : `@my_attribute:hello?world`.

Exemples :

| Requête de recherche                                                         | Description                                                                                                                                                         |
|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@http.url_details.path:"/api/v1/test"`                              | Recherche tous les journaux correspondant à `/api/v1/test` dans l'attribut `http.url_details.path`.                                                                               |
| `@http.url:/api\-v1/*`                                             | Recherche tous les journaux contenant une valeur dans l'attribut `http.url` qui commence par `/api-v1/`                                                                             |
| `@http.status_code:[200 TO 299] @http.url_details.path:/api\-v1/*` | Recherche tous les journaux contenant une `http.status_code` valeur entre 200 et 299, et contenant une valeur dans l'attribut `http.url_details.path` qui commence par `/api-v1/` |
| `-@http.status_code:*`                                                | Recherche tous les journaux ne contenant pas l'attribut `http.status_code` |

### Recherche en utilisant la notation CIDR {#search-using-cidr-notation}
Le routage inter-domaines sans classe (CIDR) est une notation qui permet aux utilisateurs de définir succinctement une plage d'adresses IP (également appelées blocs CIDR). Le CIDR est le plus souvent utilisé pour définir un réseau (tel qu'un VPC) ou un sous-réseau (tel qu'un sous-réseau public/privé au sein d'un VPC).

Les utilisateurs peuvent utiliser la fonction `CIDR()` pour interroger des attributs dans les journaux en utilisant la notation CIDR. La fonction `CIDR()` doit être passée dans un attribut de journal en tant que paramètre à filtrer, suivie d'un ou plusieurs blocs CIDR.

#### Exemples {#examples}
- `CIDR(@network.client.ip,13.0.0.0/8)` correspond et filtre les journaux qui ont des adresses IP dans le champ `network.client.ip` qui tombent sous le bloc CIDR 13.0.0.0/8.
- `CIDR(@network.ip.list,13.0.0.0/8, 15.0.0.0/8)` correspond et filtre les journaux qui contiennent des adresses IP dans un attribut de tableau `network.ip.list` qui relèvent des blocs CIDR 13.0.0.0/8 ou 15.0.0.0/8.
- `source:pan.firewall evt.name:reject CIDR(@network.client.ip, 13.0.0.0/8)` permettrait de correspondre et de filtrer les événements de rejet du pare-feu Palo Alto qui proviennent du sous-réseau 13.0.0.0/8.
- `source:vpc NOT(CIDR(@network.client.ip, 13.0.0.0/8)) CIDR(@network.destination.ip, 15.0.0.0/8)` affichera tous les journaux VPC qui ne proviennent pas du sous-réseau 13.0.0.0/8 mais qui sont destinés au sous-réseau de destination 15.0.0.0/8, car vous souhaitez analyser le trafic réseau entre les sous-réseaux dans vos environnements.

La fonction `CIDR()` prend en charge les notations CIDR IPv4 et IPv6 et fonctionne avec Log Explorer, Live Tail, les widgets de journaux dans les Dashboards, les moniteurs de journaux et les configurations de journaux.

## Caractères génériques {#wildcards}

Vous pouvez utiliser des caractères génériques avec la recherche en texte libre. Cependant, il ne recherche que des termes dans le message du journal, le texte dans la colonne `content` de Log Explorer. Voir [Recherche en texte intégral](#full-text-search) si vous souhaitez rechercher une valeur dans un attribut de journal.

### Caractère générique à plusieurs caractères {#multi-character-wildcard}

Pour effectuer une recherche avec un caractère générique à plusieurs caractères dans le message du journal (la colonne `content` de Log Explorer), utilisez le symbole `*` comme suit :

* `service:web*` correspond à chaque message de journal dont le service commence par `web`.
* `web*` correspond à tous les messages de journal qui commencent par `web`.
* `*web` correspond à tous les messages de journal qui se terminent par `web`.

**Remarque** : Les caractères génériques ne fonctionnent comme tels qu'en dehors des guillemets doubles. Par exemple, `"*test*"` correspond à un journal qui comporte la chaîne `*test*` dans son message. `*test*` correspond à un journal qui comporte la chaîne test à n'importe quel endroit dans son message.

Les recherches avec des caractères génériques fonctionnent au sein des balises et des attributs (facettés ou non) avec cette syntaxe. Cette requête renvoie tous les services qui se terminent par la chaîne `mongo`.
<p> </p>
<p></p>

```
service:*mongo
```

Les recherches avec des caractères génériques peuvent également être utilisées pour rechercher dans le texte brut d'un journal qui ne fait pas partie d'un attribut de journal. Par exemple, cette requête renvoie tous les journaux avec un contenu (message) qui comporte la chaîne `NETWORK`.

```
*NETWORK*
```

Cependant, ce terme de recherche ne renvoie pas les journaux contenant la chaîne `NETWORK` si elle se trouve dans un attribut de journal et non dans le message du journal.

### Recherche de caractère générique {#search-wildcard}

Lors de la recherche d'une valeur d'attribut ou de balise contenant des caractères spéciaux ou nécessitant des échappements ou des guillemets doubles, utilisez le caractère générique `?` pour faire correspondre un seul caractère spécial ou un espace. Par exemple, pour rechercher un attribut `my_attribute` avec la valeur `hello world` : `@my_attribute:hello?world`.
<p> </p>

## Valeurs numériques {#numerical-values}

Pour rechercher un attribut numérique, ajoutez-le d'abord en tant que facette. Vous pouvez ensuite utiliser des opérateurs numériques (`<`, `>`, `<=` ou `>=`) pour effectuer une recherche sur des facettes numériques.
Par exemple, récupérez tous les journaux ayant un temps de réponse supérieur à 100 ms avec :
<p> </p>

```
@http.response_time:>100
```

Vous pouvez rechercher un attribut numérique dans une plage spécifique. Par exemple, récupérez toutes vos erreurs 4xx avec :

```
@http.status_code:[400 TO 499]
```

## Balises {#tags}

Vos journaux héritent des balises des [hôtes][3] et des [intégrations][4] qui les génèrent. Elles peuvent également être utilisées dans la recherche et comme facettes :

* `test` recherche la chaîne "test".
* `env:(prod OR test)` correspond à tous les journaux avec la balise `env:prod` ou la balise `env:test`
* `(env:prod AND -version:beta)` correspond à tous les journaux contenant la balise `env:prod` et ne contenant pas la balise `version:beta`

Si vos balises ne respectent pas les [meilleures pratiques en matière de balises][5] et n'utilisent pas la syntaxe `key:value`, utilisez cette requête de recherche :

* `tags:<MY_TAG>`

## Tableaux {#arrays}

Dans l'exemple suivant, cliquer sur la valeur `Peter` dans la facette renvoie tous les journaux contenant un attribut `users.names`, dont la valeur est soit `Peter` soit un tableau contenant `Peter` :

{{< img src="logs/explorer/search/array_search.png" alt="Tableaux et facettes" style="width:80%;">}}

**Remarque** : La recherche peut également être utilisée sur des attributs de tableau non facettés en utilisant une syntaxe équivalente.

Dans l'exemple suivant, les journaux CloudWatch pour Windows contiennent un tableau d'objets JSON sous `@Event.EventData.Data`. Vous ne pouvez pas créer de facette sur un tableau d'objets JSON, mais vous pouvez rechercher en utilisant la syntaxe suivante.

* `@Event.EventData.Data.Name:ObjectServer` correspond à tous les journaux avec la clé `Name` et la valeur `ObjectServer`.

{{< img src="logs/explorer/search/facetless_query_json_arrray2.png" alt="Requête sans facette sur un tableau d'objets JSON" style="width:80%;">}}

### Recherche de tableau imbriqué {#nested-array-search}

Pour rechercher un champ imbriqué dans un attribut de tableau, utilisez le préfixe `@` avec le chemin complet de l'attribut. L'Explorateur de journaux correspond à tout élément dans le tableau :

* `@network.ip.attributes.ip:2a02\:1810*` correspond à tous les journaux où au moins un élément du tableau `network.ip.attributes` a un champ `ip` commençant par `2a02:1810`.

Pour correspondre aux journaux où un tableau contient plusieurs valeurs spécifiques, listez les valeurs entre parenthèses :

* `@user_perms:(4 6)` correspond à tous les journaux où le tableau `user_perms` contient à la fois `4` et `6`.

Pour correspondre aux journaux où un tableau contient n'importe quelle valeur dans une plage, utilisez une requête de plage :

* `@user_perms:[2 TO 6]` correspond à tous les journaux où le tableau `user_perms` contient au moins une valeur entre `2` et `6`.

## Champs calculés {#calculated-fields}

Les champs calculés fonctionnent comme des attributs de journal et peuvent être utilisés pour la recherche, l'agrégation, la visualisation et la définition d'autres champs calculés. Utilisez le préfixe `#` pour référencer les noms de champs calculés.

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Un champ calculé, appelé request_duration, est utilisé pour filtrer les résultats dans l'Explorateur de journaux" style="width:100%;" >}}

## Recherches enregistrées {#saved-searches}

Les [vues enregistrées][6] contiennent votre requête de recherche, les colonnes, l'horizon temporel et la facette.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/parsing
[2]: /fr/logs/explorer/facets/
[3]: /fr/infrastructure/
[4]: /fr/integrations/#cat-log-collection
[5]: /fr/getting_started/tagging/#tags-best-practices
[6]: /fr/logs/explorer/saved_views/
[7]: /fr/logs/explorer/facets/#facet-panel
[8]: /fr/logs/log_configuration/attributes_naming_convention/#reserved-attributes