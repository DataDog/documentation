---
title: Parsing
kind: documentation
description: Transformer vos logs en utilisant le processor Grok
aliases:
  - /fr/logs/parsing/
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprenez à traiter vos logs
  - link: logs/faq/how-to-investigate-a-log-parsing-issue
    tag: FAQ
    text: Comment étudier un problème de traitement de log?
  - link: logs/faq/log-parsing-best-practice
    tag: FAQ
    text: Parsing de log - Meilleures pratiques
  - link: logs/logging_without_limits
    tag: Documentation
    text: Contrôler le volume de logs indexés par Datadog
---
## Aperçu

Si vos logs sont au format JSON, Datadog les parse automatiquement. Pour les autres formats, Datadog vous permet d'enrichir vos logs à l'aide de parser Grok.
La syntaxe Grok offre un moyen plus simple de parser les logs que les expressions régulières pures.
L'utilisation principale d'un parser Grok consiste à extraire des attributs à partir de messages texte semi-structurés.

Grok propose un grand nombre de patterns réutilisables pour extraire des entiers, des adresses IP, des hostnames, etc.

Les règles de parsing peuvent être écrites avec la syntaxe `%{MATCHER:EXTRACT:FILTER}` :

* **Matcher**: règle (éventuellement une référence à une autre règle token) qui décrit à quoi s'attendre (number, word, notSpace, etc.).

* **Extract** (optionnel) : un identifiant représentant l'attribut de capture pour le morceau de texte correspondant au MATCHER.

* **Filter** (optionnel) : un post-processeur du matcher pour transformer la valeur extraite.

Exemple pour ce log non structuré classique :
```
john connected on 11/08/2017
```

Avec la règle de parsing suivante :
```
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

Vous obtenez à la fin ce log structuré :

{{< img src="logs/processing/parsing/parsing_example_1.png" alt="Parsing example 1" responsive="true" style="width:80%;">}}

## Matcher

Voici la liste de tous les matchers pris en charge nativement par Datadog :

|                                                 |                                                                                                                             |
| :---                                            | :---                                                                                                                        |
| **Pattern**                                     | **Utilisation**                                                                                                                   |
| `date("pattern"[, "timezoneId"[, "localeId"]])` | renvoie une date avec le pattern indiqué, et effectue un parsing pour obtenir un timestamp unix [En savoir plus](#parsing-dates)                |
| `regex("pattern")`                              | renvoie un regex                                                                                                             |
| `data`                                          | renvoie n'importe quelle chaîne, espaces et nouvelles lignes comprises. Équivalent à `.*`                                                        |
| `notSpace`                                      | renvoie toutes les chaînes jusqu'à la prochaine espace                                                                                     |
| `boolean("truePattern", "falsePattern")`        | renvoie et parse un booléen qui définit de manière facultative les patterns true et false (valeurs par défaut « true » et « false », non sensible à la casse) |
| `numberStr`                                     | renvoie un nombre à virgule flottante et le parse en tant que chaîne                                                           |
| `number`                                        | renvoie un nombre à virgule flottante et le parse en tant que nombre à double précision                                          |
| `numberExtStr`                                  | renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique)                                                          |
| `numberExt`                                     | renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique) et le parse en tant que nombre à double précision               |
| `integerStr`                                    | renvoie un nombre entier à virgule flottante et le parse en tant que chaîne                                                                  |
| `integer`                                       | renvoie un nombre entier à virgule flottante et le parse en tant que nombre entier                                                         |
| `integerExtStr`                                 | renvoie un nombre entier (avec prise en charge de la notation scientifique)                                                                |
| `integerExt`                                    | renvoie un nombre entier (avec prise en charge de la notation scientifique) et le parse en tant que nombre entier                             |
| `word`                                          | renvoie des mots alphanumériques                                                                                                |
| `doubleQuotedString`                            | renvoie une chaîne entre guillemets doubles                                                                                              |
| `singleQuotedString`                            | renvoie une chaîne entre guillemets simples                                                                                              |
| `quotedString`                                  | renvoie une chaîne entre guillemets doubles ou simples                                                                             |
| `uuid`                                          | renvoie un UUID                                                                                                              |
| `mac`                                           | renvoie une adresse Mac                                                                                                       |
| `ipv4`                                          | renvoie une adresse IPv4                                                                                                             |
| `ipv6`                                          | renvoie une adresse IPv6                                                                                                             |
| `ip`                                            | renvoie une adresse IP (v4 ou v6)                                                                                                    |
| `hostname`                                      | renvoie un nom d'hôte                                                                                                          |
| `ipOrHost`                                      | renvoie un nom d'hôte ou une adresse IP                                                                                                    |
| `port`                                          | renvoie un numéro de port                                                                                                       |

## Filtres
Voici la liste de tous les filtres pris en charge nativement par Datadog :

|                                                                |                                                                                                                                                     |
| :---                                                           | :---                                                                                                                                                |
| **Pattern**                                                    | **Utilisation**                                                                                                                                           |
| `number`                                                       | parse une correspondance en tant que nombre à double précision                                                                                                          |
| `integer`                                                      | parse une correspondance en tant nombre entier                                                                                                                 |
| `boolean`                                                      | parse les chaînes « true » et « false » en tant que booléens non sensibles à la casse                                                                                        |
| `date("pattern"[, "timezoneId"[, "localeId"]])`                | parse une date avec le pattern indiqué pour produire un timestamp unix [En savoir plus](#parsing-dates)                                                   |
| `nullIf("value")`                                              | revoie null si le résultat est égal à la valeur indiquée                                                                                           |
| `json`                                                         | parse un JSON correctement formaté                                                                                                                      |
| `rubyhash`                                                     | parse le hash Ruby correctement formaté (ex. :  {name => "Jean" "poste" => {"entreprise" => "Grande entreprise", "fonction" => "CTO"}})                                   |
| `geoip`                                                        | Parse une IP ou un hôte et renvoie un objet JSON qui contient le continent, le pays, la ville et la localisation de l'adresse IP.                         |
| `useragent([decodeuricomponent:true/false])`                   | parse un user-agent et renvoie un objet JSON qui contient l'appareil, le système d'exploitation et le navigateur de l'agent. [En savoir plus](#useragent-parser) |
| `querystring`                                                  | extrait toutes les paires clé-valeur dans la chaîne de requête d'une URL correspondante (ex. : "productId=superproduit&promotionCode=superpromo")                             |
| `decodeuricomponent`                                           | ce filtre de base décode les composants de l'URI                                                                                                            |
| `lowercase`                                                    | renvoie la chaîne en minuscules                                                                                                                     |
| `uppercase`                                                    | renvoie la chaîne en majuscules                                                                                                                     |
| `keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` | extrait le pattern clé-valeur et renvoie un objet JSON. [En savoir plus](#key-value)                                                                       |
| `scale(factor)`                                                | multiplie la valeur numérique attendue par le facteur indiqué                                                                                     |
| `array([[openCloseStr, ] separator][, subRuleOrFilter)`        | parse une séquence de chaînes de tokens et la renvoie sous forme de tableau                                                                                      |
| `url`                                                          | parse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON. [En savoir plus][1]                               |

## Exemples
Vous trouverez ci-dessous quelques exemples montrant comment utiliser les parsers :

### Clé-valeur

Il s'agit du filtre key/value : `keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` où :

* `separatorStr` : définit le séparateur. Par défaut `=`
* `characterWhiteList` : définit des caractères supplémentaires non échappés. Par défaut `\\w.\\-_@`
* `quotingStr` : définit les guillemets. Le comportement par défaut détecte les guillemets (`<>`, `"\"\""`, etc.). Lorsqu'il est défini, le comportement par défaut est remplacé en autorisant uniquement les caractères de guillemets définis. Par exemple `<>` correspond à *test=<toto sda> test2=test*.

Utilisez des filtres tels que **keyvalue()** pour mapper plus facilement les chaînes aux attributs :

log :

```
user=john connect_date=11/08/2017 id=123 action=click
```

Règle

```
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Parsing example 2" responsive="true" style="width:80%;">}}

Vous n'avez pas besoin de spécifier le nom de vos paramètres car ils étaient déjà contenus dans le log.
Si vous ajoutez un attribut **extract** `my_attribute` dans votre pattern de règles, vous obtenez :

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Parsing example 2 bis" responsive="true" style="width:80%;">}}

Si `=` n'est pas le séparateur par défaut entre votre clé et vos valeurs, ajoutez à votre règle de parsing un paramètre avec le séparateur souhaité.

log :

```
user: john connect_date: 11/08/2017 id: 123 action: click
```

Règle

```
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Key value parser" responsive="true" style="width:80%;" >}}

Si le log contient des caractères spéciaux dans une valeur d'attribut, comme `/` dans une URL, ajoutez-les à la liste blanche de la règle de parsing :

log :

```
url=https://app.datadoghq.com/event/stream user=john
```

Règle :

```
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="Key value whitelist" responsive="true" style="width:80%;" >}}

Autres exemples :

| **Chaîne brute**          | **Règle de parsing**                    | **Résultat**                     |
| :---                    | :----                               | :----                          |
| key=valueStr            | `%{data::keyvalue}`                 | {"key": "valueStr}             |
| key=\<valueStr>         | `%{data::keyvalue}`                 | {"key": "valueStr"}            |
| key:valueStr            | `%{data::keyvalue(":")}`            | {"key": "valueStr"}            |
| key:"/valueStr"         | `%{data::keyvalue(":", "/")}`       | {"key": "/valueStr"}           |
| key:={valueStr}         | `%{data::keyvalue(":=", "", "{}")}` | {"key": "valueStr"}            |
| key:=valueStr           | `%{data::keyvalue(":=", "")}`       | {"key": "valueStr"}            |
| key1:=>val1,key2:=>val2 | `%{data::keyvalue(":=>", ",")}`     | {"key1": "val1","key2":"val2"} |


### Parsing de dates

Le date matcher transforme votre timestamp au format EPOCH.

| **Chaîne brute**                | **Règle de parsing**                                          | **Résultat**              |
| :---                          | :----                                                     | :----                   |
| 14:20:15                      | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 11/10/2014                    | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016      | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016       | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900    | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000  | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00 | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655      | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {“date”: 1233922454655} |
| Thu Jun 16 08:29:03 2016      | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| 2007-08-31 19:22:22.427 ADT   | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188675889244} |

**Remarque** : Le parsing d'une date **ne définit pas** sa valeur en tant que date officielle du log. Pour cela, utilisez le [Log Date Remapper][2] sur le log dans le processor suivant.

### Pattern conditionnel

Vous pouvez avoir des logs avec deux formats possibles qui diffèrent par un seul attribut. Ces cas peuvent être traités avec une seule règle, en utilisant une conditionnelle avec `|`.

**Log** :
```
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Règle** :
Notez que « id » est un entier et non une chaîne de caractère grâce au matcher « integer » dans la règle.

```
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats** :

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Parsing example 4" responsive="true" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Parsing example 4 bis" responsive="true" style="width:80%;" >}}

### Attribut optionnel

Certains logs contiennent des valeurs qui n'apparaissent que de temps en temps. Dans ce cas, vous pouvez rendre l'extraction d'attribut facultative avec `()?` afin de l'extraire uniquement lorsque l'attribut est contenu dans votre logs.

**Log** :
```
john 1234 connected on 11/08/2017 
```

**Règle** :
```
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Remarque** : Vous devrez généralement inclure l'espace dans la partie facultative afin de ne pas obtenir deux espaces, ce qui empêcherait la règle de correspondre.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Parsing example 5" responsive="true" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Parsing example 5 bis" responsive="true" style="width:80%;" >}}

### Regex 
Utilisez le matcher regex pour faire correspondre toute une sous-chaîne de votre message de log en fonction des règles littérales regex.

**Log** :

```
john_1a2b3c4 connected on 11/08/2017
```

**Règle** :
Ici, nous cherchons simplement l'id pour l'extraire
```
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Parsing example 6" responsive="true" style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/#url-parser
[2]: /logs/processing/#log-date-remapper