---
title: Parsing
description: Parser vos logs à l'aide du processeur Grok
aliases:
  - /fr/logs/parsing/
  - /fr/logs/processing/parsing
further_reading:
  - link: /logs/log_configuration/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: /logs/faq/how-to-investigate-a-log-parsing-issue/
    tag: FAQ
    text: "Comment étudier un problème de parsing de log\_?"
  - link: /logs/guide/log-parsing-best-practice/
    tag: FAQ
    text: "Parsing de log\_: bonnes pratiques à adopter"
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Contrôler le volume de logs indexés par Datadog
---
## Présentation

Datadog effectue automatiquement le parsing de vos logs au format JSON. Pour les autres formats, Datadog vous permet d'enrichir vos logs à l'aide du parser Grok.
Comparée à l'utilisation exclusive d'expressions régulières, la syntaxe Grok simplifie le parsing des logs. Le parser Grok vous permet d'extraire des attributs à partir de messages texte semi-structurés.

Grok propose des patterns réutilisables pour parser des entiers, des adresses IP, des hostnames, etc.

Vous pouvez rédiger des règles de parsing à l'aide de la syntaxe `%{MATCHER:EXTRACT:FILTER}` :

* **Matcher** : une règle (éventuellement une référence à la règle d'un autre token) qui décrit la valeur attendue (number, word, notSpace, etc.).

* **Extract** (facultatif) : un identifiant représentant la destination d'enregistrement pour le morceau de texte correspondant au *Matcher*.

* **Filter** (facultatif) : un post-processeur de la correspondance permettant de la transformer.

Exemple d'un log non structuré standard :

```text
john connected on 11/08/2017
```

Avec la règle de parsing suivante :

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

Une fois le traitement terminé, le log structuré suivant est généré :

{{< img src="logs/processing/processors/_parser.png" alt="Exemple de parsing 1"  style="width:80%;">}}

**Remarques** :

* Si vous cumulez plusieurs règles de parsing dans un seul parser Grok :
  * Une seule d'entre elles peut renvoyer un log donné. La première qui correspond en totalité est celle qui effectue le parsing.
  * Chaque règle peut se référer à des règles de parsing définies en amont dans la liste.
* Les noms des règles au sein d'un même parser Grok doivent être uniques.
* Les noms des règles doivent contenir uniquement des caractères alphanumériques, ainsi que les caractères `_` et `.`. Ils doivent commencer par un caractère alphanumérique.
* Les propriétés avec des valeurs null ou vides ne sont pas affichées.
* Une description détaillée de la syntaxe acceptée par l'Agent pour les expressions régulières est disponible sur le [référentiel RE2][1].
* Le matcher d'expression régulière applique un `^` implicite, afin de renvoyer le début d'une chaîne, ainsi qu'un `$`, afin de renvoyer la fin d'une chaîne.
* Certains logs peuvent générer une grande quantité d'espaces. Utilisez `\n` et `\s+` pour tenir compte des retours à la ligne et des espaces.

### Matcher et filtre

Voici la liste de tous les matchers et de tous les filtres implémentés en natif par Datadog :

{{< tabs >}}
{{% tab "Matchers" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])` 
: Renvoie une date correspondant au pattern et la parse pour générer un timestamp Unix. [Voir les exemples de matcher de date](#parser-des-dates).

`regex("pattern")`
: Renvoie une regex. [Voir les exemples de matcher d'expression régulière](#expression-reguliere).

`notSpace`
: Renvoie n'importe quelle chaîne jusqu'à la prochaine espace.

`boolean("truePattern", "falsePattern")`
: Renvoie et parse une valeur booléenne qui définit de façon facultative les patterns true et false (par défaut, `true` et `false`, en ignorant la casse).

`numberStr`
: Renvoie un nombre décimal à virgule flottante et le parse en tant que chaîne.

`number`
: Renvoie un nombre décimal à virgule flottante et le parse en tant que nombre à double précision.

`numberExtStr`
: Renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique) et le parse en tant que chaîne.

`numberExt`
: Renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique) et le parse en tant que nombre à double précision.

`integerStr`
: Renvoie un nombre entier et le parse en tant que chaîne.

`integer`
: Renvoie un nombre entier et le parse en tant que nombre entier.

`integerExtStr`
: Renvoie un nombre entier (avec prise en charge de la notation scientifique) et le parse en tant que chaîne.

`integerExt`
: Renvoie un nombre entier (avec prise en charge de la notation scientifique) et le parse en tant que nombre entier.

`word`
: Renvoie les caractères a à z, A à Z, 0 à 9, y compris le caractère _ (underscore).

`doubleQuotedString`
: Renvoie une chaîne entre guillemets.

`singleQuotedString`
: Renvoie une chaîne entre apostrophes.

`quotedString`
: Renvoie une chaîne entre guillemets ou entre apostrophes.

`uuid`
: Renvoie un UUID.

`mac`
: Renvoie une adresse Mac.

`ipv4`
: Renvoie une adresse IPV4.

`ipv6`
: Renvoie une adresse IPV6.

`ip`
: Renvoie une adresse IP (v4 ou v6).

`hostname`
: Renvoie un hostname.

`ipOrHost`
: Renvoie un hostname ou une adresse IP.

`port`
: Renvoie un numéro de port.

`data`
: Renvoie n'importe quelle chaîne, espaces et sauts de ligne inclus. Équivaut à `.*`. À utiliser lorsqu'aucun des patterns ci-dessus ne convient.

{{% /tab %}}
{{% tab "Filtres" %}}

`number`
: Parse une correspondance en tant que nombre à double précision.

`integer`
: Parse une correspondance en tant que nombre entier.

`boolean`
: Parse les chaînes 'true' et 'false' en tant que valeurs booléennes ignorant la casse.

`nullIf("value")`
: Renvoie une valeur null si la correspondance est identique à la valeur fournie.

`json`
: Parse du JSON correctement formaté.

`rubyhash`
: Parse un hash Ruby correctement formaté `{nom => "John", "poste" => {"entreprise" => "Grosse entreprise", "titre" => "Directeur technique"}}`.

`useragent([decodeuricomponent:true/false])`
: Parse un user-agent et renvoie un objet JSON qui contient l'appareil, le système d'exploitation et le navigateur représentés par l'Agent. [En savoir plus sur le processeur d'user-agent][1].

`querystring`
: Extrait toutes les paires key/value d'une chaîne de requête URL correspondante (par exemple, `?productId=superproduct&promotionCode=superpromo`).

`decodeuricomponent`
: Décode les composants d'un URI. Transforme par exemple `%2Fservice%2Ftest` en `/service/test`.

`lowercase`
: Renvoie la chaîne en minuscules.

`uppercase`
: Renvoie la chaîne en majuscules.

`keyvalue([separatorStr[, characterWhiteList[, quotingStr[, delimiter]]]])`
: Extrait un pattern key/value et renvoie un objet JSON. Voir les [exemples de filtres key/value](#key-value-ou-logfmt).

`xml`
: Parse du XML correctement formaté. Voir les [exemples de filtres XML](#parser-du-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Parse des lignes CSV ou TSV correctement formatées. Voir les [exemples de filtres CSV](#parser-des-csv).

`scale(factor)`
: Multiplie la valeur numérique attendue par le coefficient spécifié.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Parse une séquence de tokens et la renvoie en tant que tableau.

`url`
: Parse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON. [En savoir plus sur le parsing d'URL][2].

[1]: /fr/logs/log_configuration/processors/#user-agent-parser
[2]: /fr/logs/log_configuration/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Paramètres avancés

En bas de vos carrés de processeur Grok, vous trouverez une section **Advanced Settings** :

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Paramètres avancés"  style="width:80%;">}}

### Parsing d'un attribut texte spécifique

Utilisez le champ **Extract from** pour appliquer votre processeur Grok sur un attribut texte donné plutôt que sur l'attribut `message` par défaut.

Imaginez par exemple un log contenant un attribut `command.line` devant être parsé en tant que key/value. Le parsing de ce log peut se faire comme suit :

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="Parsing de ligne de commande"  style="width:80%;">}}

### Utiliser des règles d'auxiliaires pour factoriser plusieurs règles de parsing

Utilisez le champ **Helper Rules** afin de définir les tokens pour vos règles de parsing. Les règles d'auxiliaires vous aident à factoriser les patterns Grok dans vos règles de parsing, ce qui est utile lorsque plusieurs règles d'un même parser Grok utilisent les mêmes tokens.

Exemple d'un log non structuré standard :

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Utilisez la règle de parsing suivante :

```text
MyParsingRule %{user} %{connection} %{server}
```

Avec les auxiliaires suivants :

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="règles d'auxiliaires"  style="width:80%;">}}

## Scénarios

Voici des exemples d'utilisation des parsers :

* [Key/value ou logfmt](#key-value-ou-logfmt)
* [Parser des dates](#parser-des-dates)
* [Patterns alternatifs](#pattern-alternatif)
* [Attribut facultatif](#attribut-facultatif)
* [JSON imbriqué](#json_imbrique)
* [Expression régulière](#expression-reguliere)
* [Liste et tableaux](#extraire-une-liste-sous-la-forme-de-tableau)
* [Format Glog](#format-glog)
* [XML](#parser-du-xml)
* [CSV](#parser-des-csv)

### Key/value ou logfmt

Le filtre key/value correspond à `keyvalue([separatorStr[, characterWhiteList[, quotingStr[, delimiter]]]])`, où :

* `separatorStr` définit le séparateur entre la clé et les valeurs. Par défaut, `=`.
* `characterWhiteList` définit des caractères supplémentaires non échappés en plus de la valeur par défaut `\\w.\\-_@`. Uniquement utilisé pour les valeurs sans guillemets (par exemple, `key=@valueStr`).
* `quotingStr` : définit des guillemets, ce qui remplace la détection de guillemets par défaut : `<>`, `""`, `''`.
* `delimiter` définit le séparateur entre les différentes paires key/value (par exemple, `|` est le délimiteur dans `key1=value1|key2=value2`). Valeur par défaut : ` ` (espace normale), `,` et `;`.

Utilisez des filtres tels que **keyvalue** pour mapper plus facilement des chaînes à des attributs au format keyvalue ou logfmt :

**Log :**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Règle :**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Exemple de parsing 2"  style="width:80%;">}}

Vous n'avez pas besoin de spécifier le nom de vos paramètres, car ils sont déjà contenus dans le log.
Si vous ajoutez un attribut **d'extraction** `my_attribute` dans votre pattern de règles, vous obtenez :

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Exemple de parsing 2 bis"  style="width:80%;">}}

Si le caractère `=` n'est pas le séparateur par défaut entre votre clé et vos valeurs, ajoutez à votre règle de parsing un paramètre avec un séparateur.

**Log :**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Règle :**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Parser key/value"  style="width:80%;" >}}

Si les logs contiennent des caractères spéciaux dans une valeur d'attribut, tels que `/` dans une URL, ajoutez-les à la liste blanche de la règle de parsing :

**Log :**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Règle :**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="Liste blanche du parser key/value"  style="width:80%;" >}}

Autres exemples :

| **Chaîne brute**               | **Règle de parsing**                                      | **Résultat**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key=\<valueStr>              | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| "key"="valueStr"             | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key:valueStr                 | `%{data::keyvalue(":")}`                              | {"key": "valueStr"}                   |
| key:"/valueStr"              | `%{data::keyvalue(":", "/")}`                         | {"key": "/valueStr"}                  |
| /key:/valueStr               | `%{data::keyvalue(":", "/")}`                         | {"/key": "/valueStr"}                 |
| key:={valueStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"key": "valueStr"}                   |
| key1=value1\|key2=value2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |
| key1="value1"\|key2="value2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |

**Exemple avec plusieurs QuotingString** : lorsque plusieurs QuotingString sont définies, le comportement par défaut est ignoré, et seul le guillemet défini est autorisé.
Le filtre key/value met toujours en correspondance des entrées sans guillemet, peu importe la valeur de `quotingStr`. Lorsque des guillemets sont utilisés, le paramètre `characterWhiteList` est ignoré, puisque tout le contenu entre les guillemets est extrait.

**Log :**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**Règle :**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**Résultat :**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**Remarques** :

* Les valeurs vides (`key=`) ou `null` (`key=null`) ne sont pas affichées dans la sortie JSON.
* Si vous définissez un filtre *keyvalue* sur un objet `data` et qu'aucune valeur ne correspond au filtre, un JSON vide `{}` est renvoyé (par exemple, entrée : `key:=valueStr`, règle de parsing : `rule_test %{data::keyvalue("=")}`, sortie : `{}`).
* Si vous définissez `""` en tant que `quotingStr`, la configuration par défaut des guillemets est conservée.

### Parser des dates

Le matcher de date convertit votre timestamp au format EPOCH (unité de mesure : **millisecondes**).

| **Chaîne brute**                       | **Règle de parsing**                                          | **Résultat**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utilisez le paramètre `timezone` si vous effectuez vos propres localisations et que vos timestamps ne sont _pas_ au fuseau UTC.
Les formats de fuseaux horaires pris en charge sont les suivants :

* `GMT`, `UTC`, `UT` ou `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` ou `-hhmmss`. La plage la plus étendue prise en charge est de +18:00 à -18:00 (inclus).
* Fuseaux horaires commençant par `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` ou `UT-`. La plage la plus étendue prise en charge est de +18:00 à -18:00 (inclus). 
* Les identifiants de fuseaux horaires sont extraits de la base de données TZ. Pour en savoir plus, consultez les [noms de la base de données TZ][2].

**Remarque** : le parsing d'une date ne définit **pas** sa valeur comme la date officielle du log. Pour cela, utilisez le [remappeur de dates de log][3] dans un processeur ultérieur.

### Pattern alternatif

Si vous avez des logs qui se présentent dans deux formats différents, avec un unique attribut comme seule différence, définissez une seule règle en utilisant une alternative avec `(<REGEX_1>|<REGEX_2>)`. Cette règle équivaut à un OR booléen.

**Log** :

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Règle** :
Notez que « id » est un nombre entier et non une chaîne.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats** :

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Exemple de parsing 4"  style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Exemple de parsing 4 bis"  style="width:80%;" >}}

### Attribut facultatif

Certains logs contiennent des valeurs qui n'apparaissent que de temps en temps. Dans ce cas, vous pouvez rendre l'extraction d'attributs facultative avec `()?`.

**Log** :

```text
john 1234 connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Remarque** : la règle ne fonctionnera pas si vous ajoutez une espace après le premier mot dans la section facultative.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Exemple de parsing 5"  style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Exemple de parsing 5 bis"  style="width:80%;" >}}

### JSON imbriqué

Utilisez le filtre `json` pour effectuer le parsing d'un objet JSON imbriqué après un préfixe en texte brut :

**Log** :

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Règle** :

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Exemple de parsing d'objet JSON imbriqué"  style="width:80%;" >}}

### Expression régulière

**Log** :

```text
john_1a2b3c4 connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Exemple de parsing 6"  style="width:80%;" >}}

### Extraire une liste sous la forme de tableau

Utilisez le matcher `array` pour extraire une liste sous la forme d'un tableau dans un attribut unique.

**Log** :

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Règle** :

```text
myParsingRule Users %{data:users:array(“[]“,”,“)} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="Exemple de parsing 6"  style="width:80%;" >}}


**Log** :

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Règle** :

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

### Format Glog

Certains composants Kubernetes génèrent leurs logs au format `glog`. Cet exemple est tiré du composant Kube Scheduler dans la bibliothèque de pipelines.

Exemple de ligne de log :

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

Règles de parsing :

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

JSON extrait :

```json
{
  "level": "W",
  "timestamp": 1587728861605,
  "logger": {
    "thread_id": 1,
    "name": "authorization.go"
  },
  "lineno": 47,
  "msg": "Authorization is disabled"
}
```

### Parser du XML

Le parser de XML permet de transformer des messages au format XML en JSON.

**Log :**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**Règle :**

```text
rule %{data::xml}
```

**Résultat :**

  ```json
{
  "book": {
    "year": "2005",
    "author": "J K. Rowling",
    "category": "CHILDREN",
    "title": {
      "lang": "en",
      "value": "Harry Potter"
    }
  }
}
  ```

**Remarques** :

* Si le XML contient des tags qui ont à la fois un attribut et une valeur de type chaîne entre les deux tags, un attribut `value` est généré. Par exemple : `<title lang="en">Harry Potter</title>` devient `{"title": {"lang": "en", "value": "Harry Potter" } }`.
* Les tags qui se répètent sont automatiquement convertis en tableaux. Par exemple : `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` devient `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parser des CSV

Utilisez le filtre **CSV** pour mapper plus facilement les chaînes de caractères aux attributs lorsqu'elles sont séparées par un caractère donné (`,` par défaut).

Le filtre CSV correspond à `csv(headers[, separator[, quotingcharacter]])`, où :

* `headers` définit le nom des clés séparées par `,`. Les noms des clés doivent commencer par un caractère alphabétique et peuvent contenir n'importe quel caractère alphanumérique en plus de `_`.
* `separator` définit le séparateur utilisé pour séparer les différentes valeurs. Seul un caractère est accepté. Valeur par défaut : `,`. **Remarque** : utilisez `tab` pour représenter le caractère de tabulation.
* `quotingcharacter` définit le caractère des guillemets. Seul un caractère est accepté. Valeur par défaut : `"`.

**Remarques** :

* Les valeurs contenant un séparateur doivent être entourées de guillemets.
* Les valeurs entre guillemets qui contiennent un guillemet doivent être échappées à l'aide de guillemets. Par exemple, dans une valeur entre guillemets, `""` représente `"`.
* Si le log ne contient pas le même nombre de valeurs que le nombre de clés dans l'en-tête, le parser CSV se limitera aux premières.
* Les entiers et les valeurs doubles sont automatiquement convertis lorsque cela est possible.

**Log** :

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**Règle** :

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**Résultat :**

{{< code-block lang="json" >}}
{
  "user": {
    "first_name": "John",
    "name": "Doe",
    "st_nb": 120,
    "st_name": "Jefferson St.",
    "city": "Riverside"
  }
}
{{< /code-block >}}

Autres exemples :

| **Chaîne brute**               | **Règle de parsing**                                                         | **Résultat**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |

### Caractères de contrôle ASCII

Si vos logs contiennent des caractères de contrôle ASCII, ils sont sérialisés lors de l'ingestion. Pour y remédier, échappez explicitement la valeur sérialisée avec votre parser grok.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /fr/logs/log_configuration/processors/#log-date-remapper