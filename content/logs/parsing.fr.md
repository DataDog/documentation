---
title: Parsing
kind: documentation
description: "Transformer vos logs en utilisant le processor Grok"
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: Apprenez à traiter vos logs
- link: "logs/faq/how-to-investigate-a-log-parsing-issue"
  tag: "FAQ"
  text: Comment étudier un problème de traitement de log?
- link: "logs/faq/log-parsing-best-practice"
  tag: "FAQ"
  text: Parsing de log - Meilleures pratiques
---

## Aperçu

Si vos logs sont au format JSON, Datadog les parse automatiquement, mais pour les autres formats, Datadog vous permet d'enrichir vos logs à l'aide de parser Grok.
La syntaxe Grok fournit un moyen plus simple de parser les logs que les expressions régulières pures.
L'utilisation principale d'un parser Grok consiste à extraire des attributs à partir de messages texte semi-structurés.

Grok est livré avec beaucoup de patterns réutilisables pour extraire des entiers, des adresses IP, des hostname, etc ...

Les règles de parsing peuvent être écrites avec la syntaxe `%{MATCHER:EXTRACT:FILTER}`

* **Matcher**: règle (éventuellement une référence à une autre règle token) qui décrit à quoi s'attendre (number, word, notSpace, ...)

* **Extract** (optionnel): un identifiant représentant l'attribut de capture pour le morceau de texte correspondant au MATCHER.

* **Filter** (optionnel): un post-processeur du matcher pour transformer la valeur extraite.

Exemple pour ce log non structuré classique:
```
john connected on 11/08/2017
```

Avec la règle de parsing suivante:
```
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

Vous auriez à la fin ce log structuré

{{< img src="logs/parsing/parsing_example_1.png" alt="Parsing example 1" responsive="true" popup="true">}}

## Matcher

Voici la liste de tous les matchers implémentés nativement par Datadog:

{{% table responsive="true" %}}
|||
|:---|:---|
|**Pattern**| **Usage**|
|`date("pattern"[, "timezoneId"[, "localeId"]])`| matches a date with the specified pattern and parses to produce a unix timestamp [More info](#parsing-dates)|
|`regex("pattern")` |matches a regex|
| `data` |matches any string including spaces and newlines. Equivalent to `.*` |
| `notSpace` |matches any string until the next space |
|`boolean("truePattern", "falsePattern")`|matches and parses a boolean optionally defining the true and false patterns (defaults to 'true' and 'false' ignoring case)|
| `numberStr` | matches a decimal floating point number and parses it as a string|
|`number` |matches a decimal floating point number and parses it as a double precision number |
|`numberExtStr` |matches a floating point number (with scientific notation support)|
| `numberExt` | matches a floating point number (with scientific notation support) and parses it as a double precision number |
|`integerStr` | matches a decimal integer number and parses it as a string |
|`integer` | matches a decimal integer number and parses it as an integer number |
| `integerExtStr` |matches an integer number (with scientific notation support)|
|`integerExt` | matches an integer number (with scientific notation support) and parses it as an integer number |
|`word` |matches alpha-numberic words |
|`doubleQuotedString`| matches a double-quoted string|
|`singleQuotedString` | matches a single-quoted string |
| `quotedString` | matches a double-quoted or single-quoted string|
|`uuid` | matches a uuid|
| `mac` | matches a mac address|
|`ipv4` | matches an ipv4|
|`ipv6` | matches an ipv6|
|`ip` | matches an ip (v4 or v6)|
|`hostname`|matches a hostname|
|`ipOrHost`|matches a hostname or ip|
|`port` |matches a port number |
{{% /table %}}

## Filter
Voici la liste de tous les filters implémentés nativement par Datadog:

{{% table responsive="true" %}}
|||
|:---|:---|
|**Pattern**| **Usage**|
|`number`| parses a match as double precision number.|
|`integer`| parses a match as an integer number|
|`boolean`| parses 'true' and 'false' strings as booleans ignoring case.|
| `date("pattern"[, "timezoneId"[, "localeId"]])`| parses a date with the specified pattern to produce a unix timestamp. [More info](#parsing-dates)|
|`nullIf("value")`| returns null if the match is equal to the provided value.|
|`json`| parses properly formatted JSON |
|`rubyhash`| parses properly formatted Ruby Hash (eg {name => "John" "job" => {"company" => "Big Company", "title" => "CTO"}})|
|`geoip` |parses an IP or a host and returns a JSON object that contains the continent, country, city and location of the IP address.|
|`useragent([decodeuricomponent:true/false])`| parses a user-agent and returns a JSON object that contains the device, os and the browser represented by the agent. [More info](#useragent-parser)|
|`querystring`| extracts all the key-value pairs in a matching URL query string (eg. "productId=superproduct&promotionCode=superpromo")|
|`decodeuricomponent`| this core filter decodes uri components.|
|`lowercase`| returns the lower cased string.|
|`uppercase` |returns the upper cased string.|
|`keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` |extracts key value pattern and returns a JSON object. [More info](#key-value) |
|`scale(factor)` | multiplies the expected numerical value by the provided factor.|
|`array([[openCloseStr, ] separator][, subRuleOrFilter)` | parses a string sequence of tokens and returns it as an array.|
|`url`|parses a url and returns all the tokenized members (domain, query params, port, etc) in a JSON object. [More info][1]|
{{% /table %}}

## Exemples
Vous trouverez ci-dessous quelques exemples montrant comment utiliser les parsers:

### Key value

C'est le filter key/value :  `keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` où:

* `separatorStr` : définit le séparateur. Par défaut `=`
* `characterWhiteList`: définit des caractères supplémentaires non échappés. Par défaut `\\w.\\-_@`
* `quotingStr` : définit les quotes.. Le comportement par défaut détecte les guillemets (`<>`, `"\"\""`, ...). Lorsque le comportement par défaut défini est remplacé alors uniquement le caractère de quote défini est autorisé. Par exemple `<>` correspond à *test=<toto sda> test2=test*.

Utilisez des filters tels que **keyvalue()** pour mapper plus facilement les strings aux attributs:

log: 

```
user=john connect_date=11/08/2017 id=123 action=click
```

Rule

```
rule %{data::keyvalue}
```

{{< img src="logs/parsing/parsing_example_2.png" alt="Parsing example 2" responsive="true" popup="true">}}

Vous n'avez pas besoin de spécifier le nom de vos paramètres car ils étaient déjà contenus dans le log.
Si vous ajoutez un paramètre **extract** dans votre pattern de règles, vous aurez:

{{< img src="logs/parsing/parsing_example_2_bis.png" alt="Parsing example 2 bis" responsive="true" popup="true">}}

### Parsing de dates

Le date matcher transforme votre timestamp au format EPOCH.

{{% table responsive="true" %}}
|**Raw string** | **Parsing rule** | **Result** |
|:---|:----|:----|
|14:20:15| `%{date("HH:mm:ss"):date}` |{"date": 51615000} |
|11/10/2014| `%{date("dd/mm/yyyy"):date}`| {"date": 1412978400000}|
|Thu Jun 16 08:29:03 2016 | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}` | {"date": 1466065743000}|
|Tue Nov 1 08:29:03 2016 | `%{date("EEE MMM d HH:mm:ss yyyy"):date}` | {"date": 1466065743000}|
|06/Mar/2013:01:36:30 +0900| `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}` | {"date": 1362501390000}|
|2016-11-29T16:21:36.431+0000| `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}` | {"date": 1480436496431} |
|2016-11-29T16:21:36.431+00:00| `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}` | {"date": 1480436496431} |
|06/Feb/2009:12:14:14.655 | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}` | {“date”: 1233922454655}|
|Thu Jun 16 08:29:03 2016 | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` |{"date": 1466058543000}|
|2007-08-31 19:22:22.427 ADT|`%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`|{"date": 1188675889244}|
{{% /table %}}

**Note**: Le parsing d'une date **ne définit pas** sa valeur en tant que date officielle du log. Pour cela, utilisez le [Log Date Remapper][2] sur le log dans le processor suivant.


### Modèle conditionnel

Vous pouvez avoir des logs avec deux formats possibles qui diffèrent par un seul attribut. Ces cas peuvent être traités avec une seule règle, en utilisant une conditionnelle avec `|`.

**Log**:
```
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Rule**:
Notez que "id" est un entier et non une chaîne de caractère grâce au matcheur "integer" dans la règle.

```
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats**:

{{< img src="logs/parsing/parsing_example_4.png" alt="Parsing example 4" responsive="true" popup="true">}}

{{< img src="logs/parsing/parsing_example_4_bis.png" alt="Parsing example 4 bis" responsive="true" popup="true">}}

### Attribut optionnel

Certains logs ne contiennent des valeurs qui n'apparaissent que de temps en temps. Dans ce cas, vous pouvez rendre l'extraction d'attribut facultative avec `()?` En l'extrayant uniquement lorsque l'attribut est contenu dans votre logs.

**Log**:
```
john 1234 connected on 11/08/2017 
```

**Rule**:
```
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Note**: vous devrez généralement inclure l'espace dans la partie facultative sinon vous vous retrouveriez avec deux espaces et la règle ne correspondrait plus.

{{< img src="logs/parsing/parsing_example_5.png" alt="Parsing example 5" responsive="true" popup="true">}}

{{< img src="logs/parsing/parsing_example_5_bis.png" alt="Parsing example 5 bis" responsive="true" popup="true">}}

### Regex 
Utilisez le matcher regex pour faire correspondre toute une sous-chaîne de votre log en fonction des règles littérales regex.

**Log**:

```
john_1a2b3c4 connected on 11/08/2017
```

**Rule**:
ici, nous cherchons simplement l'id pour l'extraire
```
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-Z0-9]*"):user.id} .*
```

{{< img src="logs/parsing/regex_parsing.png" alt="Parsing example 6" responsive="true" popup="true">}}

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/processing/#url-parser
[2]: /logs/processing/#log-date-remapper
