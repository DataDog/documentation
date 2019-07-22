---
title: Parsing
kind: documentation
description: Analyser vos logs à l'aide du processeur Grok
aliases:
  - /fr/logs/parsing/
further_reading:
  - link: logs/processing/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/faq/how-to-investigate-a-log-parsing-issue
    tag: FAQ
    text: "Comment étudier un problème de parsing de log\_?"
  - link: logs/faq/log-parsing-best-practice
    tag: FAQ
    text: "Parsing de log\_: bonnes pratiques à adopter"
  - link: logs/logging_without_limits
    tag: Documentation
    text: Contrôler le volume de logs indexés par Datadog
---
## Présentation

Si vos logs sont au format JSON, Datadog les analyse automatiquement. Pour les autres formats, Datadog vous permet d'enrichir vos logs à l'aide du parser Grok.
La syntaxe Grok offre un moyen plus simple d'analyser des logs que les expressions régulières pures.
L'utilisation principale d'un parser Grok consiste à extraire des attributs à partir de messages texte semi-structurés.

Grok propose un grand nombre de modèles réutilisables pour extraire des entiers, des adresses IP, des hostnames, etc.

Les règles de parsing peuvent être écrites avec la syntaxe `%{MATCHER:EXTRACT:FILTER}` :

* **Matcher**: règle (éventuellement une référence à une autre règle token) qui décrit à quoi s'attendre (number, word, notSpace, etc.).

* **Extract** (facultatif) : un identifiant représentant la destination d'enregistrement pour le morceau de texte correspondant au MATCHER.

* **Filter** (facultatif) : un post-processeur de la correspondance afin de la transformer.

Exemple pour un log non structuré standard :
```
john connected on 11/08/2017
```

Avec la règle de parsing suivante :
```
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

On obtient alors ce log structuré :

{{< img src="logs/processing/parsing/parsing_example_1.png" alt="Exemple de parsing 1" responsive="true" style="width:80%;">}}

**Remarque** : si vous cumulez plusieurs règles de parsing dans un seul parser Grok, une seule d'entre elles peut renvoyer un log donné. La première qui correspond en totalité est celle qui effectue le parsing.

### Matcher et filtre

Voici la liste de tous les matchers et de tous les filtres implémentés en natif par Datadog :

{{< tabs >}}
{{% tab "Matcher" %}}

|                                                 |                                                                                                                                    |
| :---                                            | :---                                                                                                                               |
| **Modèle**                                     | **Utilisation**                                                                                                                          |
| `date("pattern"[, "timezoneId"[, "localeId"]])` | Renvoie une date correspondant au modèle et aux valeurs parsées pour produire un timestamp Unix. [Consulter les exemples de Matcher de date](#dates-parsing). |
| `regex("pattern")`                              | Renvoie un regex. [Consulter les exemples de Matcher de regex](#regex).                                                                       |
| `data`                                          | Renvoie n'importe quelle chaîne, espaces et sauts de ligne inclus. Équivaut à `.*`.                                                              |
| `notSpace`                                      | Renvoie n'importe quelle chaîne jusqu'à la prochaine espace.                                                                                           |
| `boolean("truePattern", "falsePattern")`        | Renvoie et analyse une valeur booléenne qui définit de façon facultative les expressions true et false (par défaut 'true' et 'false' en ignorant la casse).       |
| `numberStr`                                     | Renvoie un nombre décimal à virgule flottante et l'analyse en tant que chaîne.                                                                 |
| `number`                                        | Renvoie un nombre décimal à virgule flottante et l'analyse en tant que nombre à double précision.                                                |
| `numberExtStr`                                  | Renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique).                                                                |
| `numberExt`                                     | Renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse en tant que nombre à double précision.                     |
| `integerStr`                                    | Renvoie un nombre entier décimal et l'analyse en tant que chaîne.                                                                        |
| `integer`                                       | Renvoie un nombre entier décimal et l'analyse en tant que nombre entier.                                                               |
| `integerExtStr`                                 | Renvoie un nombre entier (avec prise en charge de la notation scientifique).                                                                      |
| `integerExt`                                    | Renvoie un nombre entier (avec prise en charge de la notation scientifique) et l'analyse en tant que nombre entier.                                   |
| `word`                                          | Renvoie les caractères a à z, A à Z, 0 à 9, y compris le caractère _ (underscore).                                                                                                      |
| `doubleQuotedString`                            | Renvoie une chaîne entre guillemets.                                                                                                    |
| `singleQuotedString`                            | Renvoie une chaîne entre apostrophes.                                                                                                    |
| `quotedString`                                  | Renvoie une chaîne entre guillemets ou entre apostrophes.                                                                                   |
| `uuid`                                          | Renvoie un UUID.                                                                                                                    |
| `mac`                                           | Renvoie une adresse MAC.                                                                                                             |
| `ipv4`                                          | Renvoie une adresse IPV4.                                                                                                                   |
| `ipv6`                                          | Renvoie une adresse IPV6.                                                                                                                   |
| `ip`                                            | Renvoie une adresse IP (v4 ou v6).                                                                                                          |
| `hostname`                                      | Renvoie un hostname.                                                                                                                |
| `ipOrHost`                                      | Renvoie un hostname ou une IP.                                                                                                          |
| `port`                                          | Renvoie un numéro de port.                                                                                                             |


{{% /tab %}}
{{% tab "Filtre" %}}

|                                                                |                                                                                                                                                           |
| :---                                                           | :---                                                                                                                                                      |
| **Modèle**                                                    | **Utilisation**                                                                                                                                                 |
| `number`                                                       | Analyse une correspondance en tant que nombre à double précision.                                                                                                                |
| `integer`                                                      | Analyse une correspondance en tant que nombre entier.                                                                                                                      |
| `boolean`                                                      | Analyse les chaînes 'true' et 'false' en tant que valeurs booléennes ignorant la casse.                                                                                              |
| `date("pattern"[, "timezoneId"[, "localeId"]])`                | Analyse une date avec le modèle précisé pour produire un timestamp Unix. [Consulter les exemples de filtres](#dates-parsing).                                         |
| `nullIf("value")`                                              | Renvoie une valeur null si la correspondance est identique à la valeur fournie.                                                                                                 |
| `json`                                                         | Analyse du JSON correctement formaté.                                                                                                                           |
| `rubyhash`                                                     | Analyse un hash Ruby correctement formaté (par exemple, `{nom=> "John", "poste" => {"entreprise" => "Grosse entreprise", "titre" => "Directeur technique"}}`).                                    |
| `useragent([decodeuricomponent:true/false])`                   | Analyse un user agent et renvoie un objet JSON qui contient l'appareil, le système d'exploitation et le navigateur représenté par l'Agent. [En savoir plus sur le processeur d'user-agent][1]. |
| `querystring`                                                  | Extrait toutes les paires clé/valeur d'une chaîne de requête URL correspondante (par exemple, `?productId=superproduct&promotionCode=superpromo`).                                |
| `decodeuricomponent`                                           | Ce filtre décode les composants d'un URI.                                                                                                                  |
| `lowercase`                                                    | Renvoie la chaîne en minuscules.                                                                                                                           |
| `uppercase`                                                    | Renvoie la chaîne en majuscules.                                                                                                                           |
| `keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` | Extrait une expression clé/valeur et renvoie un objet JSON. [Consulter les exemples de filtres clé/valeur](#cle-valeur).                                                        |
| `scale(factor)`                                                | Multiplie la valeur numérique attendue par le coefficient spécifié.                                                                                           |
| `array([[openCloseStr, ] separator][, subRuleOrFilter)`        | Analyse une séquence de tokens et la renvoie en tant que tableau.                                                                                            |
| `url`                                                          | Analyse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON. [En savoir plus sur l'analyse des URL][2].                |




[1]: /fr/logs/processing/processors/#user-agent-parser
[2]: /fr/logs/processing/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Paramètres avancés

En bas de vos carrés de processeur Grok, vous trouverez une section Advanced Settings :

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Paramètres avancés" responsive="true" style="width:80%;">}}

* Utilisez le champ d'extraction **Extract from** pour appliquer votre processeur Grok sur un attribut donné plutôt que sur l'attribut `message` par défaut.

* Utilisez le champ **Helper Rules** afin de définir les tokens pour vos règles de parsing. Les règles d'auxiliaires vous aident à factoriser les modèles Grok dans vos règles d'analyses, ce qui est utile lorsque plusieurs règles d'un même parser Grok utilisent les mêmes tokens.

Exemple pour un log non structuré standard :

```
john id:12345 connected on 11/08/2017 on server XYZ in production
```

Vous pouvez utiliser la règle de parsing suivante :

```
MyParsingRule %{user} %{connection} %{server}
```

Avec les auxiliaires suivants :

```
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```


{{< img src="logs/processing/parsing/helper_rules.png" alt="règles d'auxiliaires" responsive="true" style="width:80%;">}}

## Exemples
Vous trouverez ci-dessous plusieurs exemples d'utilisations des parsers :

### Key/value

Le filtre key/value correspond à `keyvalue([separatorStr[, characterWhiteList [, quotingStr]])`, où :

* `separatorStr` : définit le séparateur. Par défaut, `=`.
* `characterWhiteList` : définit des caractères supplémentaires non échappés. Par défaut, `\\w.\\-_@`.
* `quotingStr` : définit les guillemets. Le comportement par défaut détecte les guillemets (`<>`, `"\"\""`, etc.). Lorsqu'il est défini, le comportement par défaut est remplacé en autorisant uniquement les caractères de guillemets définis. Par exemple `<>` correspond à *test=<toto sda> test2=test*.

Utilisez des filtres tels que **keyvalue()** pour mapper plus facilement des chaînes à des attributs :

log :

```
user=john connect_date=11/08/2017 id=123 action=click
```

Règle

```
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Exemple de parsing 2" responsive="true" style="width:80%;">}}

Vous n'avez pas besoin de spécifier le nom de vos paramètres, car ils sont déjà contenus dans le log.
Si vous ajoutez un attribut **d'extraction** `my_attribute` dans votre modèle de règles, vous obtenez :

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Exemple de parsing 2 bis" responsive="true" style="width:80%;">}}

Si le caractère `=` n'est pas le séparateur par défaut entre votre clé et vos valeurs, ajoutez à votre règle de parsing un paramètre avec le séparateur souhaité.

log :

```
user: john connect_date: 11/08/2017 id: 123 action: click
```

Règle

```
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Parser key/value" responsive="true" style="width:80%;" >}}

Si le log contient des caractères spéciaux dans une valeur d'attribut, tel que le caractère `/` dans une URL, ajoutez-les à la liste blanche de la règle de parsing :

log :

```
url=https://app.datadoghq.com/event/stream user=john
```

Règle :

```
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="Liste blanche du parser key/value" responsive="true" style="width:80%;" >}}

Autres exemples :

| **Chaîne brute**          | **Règle de parsing**                    | **Résultat**                     |
| :---                    | :----                               | :----                          |
| key=valueStr            | `%{data::keyvalue}`                 | {"key": "valueStr}             |
| key=\<valueStr>         | `%{data::keyvalue}`                 | {"key": "valueStr"}            |
| key:valueStr            | `%{data::keyvalue(":")}`            | {"key": "valueStr"}            |
| key:"/valueStr"         | `%{data::keyvalue(":", "/")}`       | {"key": "/valueStr"}           |
| key:={valueStr}         | `%{data::keyvalue(":=", "", "{}")}` | {"key": "valueStr"}            |
| key:=valueStr           | `%{data::keyvalue(":=", "")}`       | {"key": "valueStr"}            |

### Parsing de dates

Le matcher de date convertit votre timestamp au format EPOCH.

| **Chaîne brute**                           | **Règle de parsing**                                          | **Résultat**              |
| :---                                     | :----                                                     | :----                   |
| 14:20:15                                 | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 11/10/2014                               | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016                 | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016                  | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900               | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000             | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00            | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655                 | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| 2007-08-31 19:22:22.427 ADT              | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188675889244} |

<sup>1</sup> Utilisez ce format si vous effectuez vos propres localisations et que vos timestamps ne sont _pas_ au fuseau UTC. Les identifiants de fuseaux horaires sont extraits de la base de données TZ. Pour en savoir plus, consultez les [noms des bases de données TZ][1].

**Remarque** : le parsing d'une date ne définit **pas** sa valeur comme étant la date officielle du log. Pour cela, utilisez le [remappeur de dates de log][2] dans un processeur ultérieur.

### Modèle conditionnel

Il arrive que vos logs se présentent dans deux formats différents, avec un unique attribut comme seule différence. Ces cas peuvent être traités avec une seule règle, en utilisant des instructions conditionnelles avec `|`.

**Log** :
```
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Règle** :
Notez que « id » est un nombre entier et non une chaîne grâce au matcher « integer » de la règle.

```
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats** :

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Exemple de parsing 4" responsive="true" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Exemple de parsing 4 bis" responsive="true" style="width:80%;" >}}

### Attribut facultatif

Certains logs contiennent des valeurs qui n'apparaissent que de temps en temps. Dans ce cas, vous pouvez rendre l'extraction d'attribut facultative avec `()?` afin de l'extraire uniquement lorsque l'attribut est présent dans votre logs.

**Log** :
```
john 1234 connected on 11/08/2017
```

**Règle** :
```
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Remarque** : vous devrez généralement inclure l'espace dans la partie facultative afin de ne pas obtenir deux espaces, ce qui empêcherait la règle de fonctionner.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Exemple de parsing 5" responsive="true" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Exemple de parsing 5 bis" responsive="true" style="width:80%;" >}}

### Regex
Utilisez le matcher regex pour identifier une sous-chaîne de votre message de log en fonction de règles littérales regex.

**Log** :

```
john_1a2b3c4 connected on 11/08/2017
```

**Règle** :
Nous cherchons ici l'ID à extraire.
```
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Exemple de parsing 6" responsive="true" style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[2]: /fr/logs/processing/processors/#log-date-remapper