---
title: Parsing
kind: documentation
description: Parser vos logs à l'aide du processeur Grok
aliases:
  - /fr/logs/parsing/
further_reading:
  - link: logs/processing/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/faq/how-to-investigate-a-log-parsing-issue
    tag: FAQ
    text: "Comment étudier un problème de parsing de log\_?"
  - link: /logs/guide/log-parsing-best-practice/
    tag: FAQ
    text: "Parsing de log\_: bonnes pratiques à adopter"
  - link: logs/logging_without_limits
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

{{< img src="logs/processing/parsing/parsing_example_1.png" alt="Exemple de parsing 1"  style="width:80%;">}}

**Remarque** :

* Si vous cumulez plusieurs règles de parsing dans un seul parser Grok :
  * Une seule d'entre elles peut renvoyer un log donné. La première qui correspond en totalité est celle qui effectue le parsing.
  * Chaque règle peut se référer à des règles de parsing définies en amont dans la liste.
* Les noms des règles au sein d'un même parser Grok doivent être uniques.
* Les noms des règles doivent contenir uniquement des caractères alphanumériques, ainsi que les caractères `_` et `.`. Ils doivent commencer par un caractère alphanumérique.
* Les propriétés avec des valeurs null ou vides ne sont pas affichées.

### Matcher et filtre

Voici la liste de tous les matchers et de tous les filtres implémentés en natif par Datadog :

{{< tabs >}}
{{% tab "Matcher" %}}

|                                                 |                                                                                                                                    |
|:------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| **Pattern**                                     | **Utilisation**                                                                                                                          |
| `date("pattern"[, "timezoneId"[, "localeId"]])` | Renvoie une date correspondant au pattern et aux valeurs parsées pour produire un timestamp Unix. [Consulter les exemples de Matcher de date](#dates-parsing). |
| `regex("pattern")`                              | Renvoie un regex. [Consulter les exemples de Matcher de regex](#regex).                                                                       |
| `data`                                          | Renvoie n'importe quelle chaîne, espaces et sauts de ligne inclus. Équivaut à `.*`.                                                              |
| `notSpace`                                      | Renvoie n'importe quelle chaîne jusqu'à la prochaine espace.                                                                                           |
| `boolean("patternTrue", "patternFalse")`        | Renvoie et parse une valeur booléenne qui définit de façon facultative les patterns true et false (par défaut, `true` et `false` en ignorant la casse).     |
| `numberStr`                                     | Renvoie un nombre décimal à virgule flottante et le parse en tant que chaîne.                                                                 |
| `number`                                        | Renvoie un nombre décimal à virgule flottante et le parse en tant que nombre à double précision.                                                |
| `numberExtStr`                                  | Renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique) et le parse en tant que chaîne.                                      |
| `numberExt`                                     | Renvoie un nombre à virgule flottante (avec prise en charge de la notation scientifique) et le parse en tant que nombre à double précision.                     |
| `integerStr`                                    | Renvoie un nombre entier et le parse en tant que chaîne.                                                                               |
| `integer`                                       | Renvoie un nombre entier et le parse en tant que nombre entier.                                                                      |
| `integerExtStr`                                 | Renvoie un nombre entier (avec prise en charge de la notation scientifique) et le parse en tant que chaîne.                                            |
| `integerExt`                                    | Renvoie un nombre entier (avec prise en charge de la notation scientifique) et le parse en tant que nombre entier.                                   |
| `word`                                          | Renvoie les caractères a à z, A à Z, 0 à 9, y compris le caractère _ (underscore).                                                     |
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

|                                                                |                                                                                                                                                            |
|:---------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Pattern**                                                    | **Utilisation**                                                                                                                                                  |
| `number`                                                       | Parse une correspondance en tant que nombre à double précision.                                                                                                                 |
| `integer`                                                      | Parse une correspondance en tant que nombre entier.                                                                                                                       |
| `boolean`                                                      | Parse les chaînes 'true' et 'false' en tant que valeurs booléennes ignorant la casse.                                                                                               |
| `nullIf("value")`                                              | Renvoie une valeur null si la correspondance est identique à la valeur fournie.                                                                                                  |
| `json`                                                         | Parse du JSON correctement formaté.                                                                                                                            |
| `rubyhash`                                                     | Parse un hash Ruby correctement formaté (par exemple, `{nom=> "John", "poste" => {"entreprise" => "Grosse entreprise", "titre" => "Directeur technique"}}`).                                    |
| `useragent([decodeuricomponent:true/false])`                   | Parse un user agent et renvoie un objet JSON qui contient l'appareil, le système d'exploitation et le navigateur représenté par l'Agent. [En savoir plus sur le processeur d'user-agent][1]. |
| `querystring`                                                  | Extrait toutes les paires key/value d'une chaîne de requête URL correspondante (par exemple, `?productId=superproduct&promotionCode=superpromo`).                                 |
| `decodeuricomponent`                                           | Ce filtre décode les composants d'un URI. Par exemple, il permet de transformer `%2Fservice%2Ftest` en `/service/test`.                                                              |
| `lowercase`                                                    | Renvoie la chaîne en minuscules.                                                                                                                            |
| `uppercase`                                                    | Renvoie la chaîne en majuscules.                                                                                                                            |
| `keyvalue([separatorStr[, characterWhiteList[, quotingStr]]])` | Extrait un pattern key/value et renvoie un objet JSON. [Consulter les exemples de filtres clé/valeur](#cle-valeur).                                                         |
| `scale(facteur)`                                                | Multiplie la valeur numérique attendue par le coefficient spécifié.                                                                                            |
| `array([[openCloseStr, ] separator][, subRuleOrFilter)`        | Parse une séquence de tokens et la renvoie en tant que tableau.                                                                                             |
| `url`                                                          | Parse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON. [En savoir plus sur le parsing d'URL][2].               |

[1]: /fr/logs/processing/processors/#user-agent-parser
[2]: /fr/logs/processing/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Paramètres avancés

En bas de vos carrés de processeur Grok, vous trouverez une section Advanced Settings :

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Paramètres avancés"  style="width:80%;">}}

* Utilisez le champ **Extract from** pour appliquer votre processeur Grok sur un attribut donné plutôt que sur l'attribut `message` par défaut.

* Utilisez le champ **Helper Rules** afin de définir les tokens pour vos règles de parsing. Les règles d'auxiliaires vous aident à factoriser les patterns Grok dans vos règles de parsing, ce qui est utile lorsque plusieurs règles d'un même parser Grok utilisent les mêmes tokens.

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

## Exemples

Voici des exemples d'utilisation des parsers :

* [Key/value](#key-value)
* [Parsing de dates](#parsing-dates)
* [Patterns conditionnels](#conditional-pattern)
* [Attribut facultatif](#optional-attribute)
* [JSON imbriqué](#nested-json)
* [Regex](#regex)

### Key/value

Le filtre key/value correspond à `keyvalue([separatorStr[, characterWhiteList[, quotingStr]]])`, où :

* `separatorStr` définit le séparateur. Valeur par défaut : `=`.
* `characterWhiteList` : définit des caractères supplémentaires non échappés en plus de la valeur par défaut `\\w.\\-_@`. Uniquement utilisé pour les valeurs sans guillemets (par exemple, `key=@valueStr`).
* `quotingStr` : définit des guillemets, ce qui remplace la détection de guillemets par défaut : `<>`, `""`, `''`.

**Remarques** :

* Les valeurs vides (`key=`) ou `null` (`key=null`) ne sont pas affichées dans la sortie JSON.
* Si vous définissez un filtre *keyvalue* sur un objet `data` et que ce filtre n'est pas mis en correspondance, un JSON vide `{}` est renvoyé (par exemple, entrée : `key:=valueStr`, règle de parsing : `rule_test %{data::keyvalue("=")}`, sortie : `{}`).

Utilisez des filtres tels que **keyvalue** pour mapper plus facilement des chaînes à des attributs :

Log :

```text
user=john connect_date=11/08/2017 id=123 action=click
```

Règle :

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Exemple de parsing 2"  style="width:80%;">}}

Vous n'avez pas besoin de spécifier le nom de vos paramètres, car ils sont déjà contenus dans le log.
Si vous ajoutez un attribut **d'extraction** `my_attribute` dans votre pattern de règles, vous obtenez :

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Exemple de parsing 2 bis"  style="width:80%;">}}

Si le caractère `=` n'est pas le séparateur par défaut entre votre clé et vos valeurs, ajoutez à votre règle de parsing un paramètre avec un séparateur.

Log :

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

Règle :

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Parser key/value"  style="width:80%;" >}}

Si les logs contiennent des caractères spéciaux dans une valeur d'attribut, tels que `/` dans une URL, ajoutez-les à la liste blanche de la règle de parsing :

Log :

```text
url=https://app.datadoghq.com/event/stream user=john
```

Règle :

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="Liste blanche du parser key/value"  style="width:80%;" >}}

Autres exemples :

| **Chaîne brute**  | **Règle de parsing**                    | **Résultat**           |
|:----------------|:------------------------------------|:---------------------|
| key=valueStr    | `%{data::keyvalue}`                 | {"key": "valueStr}   |
| key=\<valueStr> | `%{data::keyvalue}`                 | {"key": "valueStr"}  |
| key:valueStr    | `%{data::keyvalue(":")}`            | {"key": "valueStr"}  |
| key:"/valueStr" | `%{data::keyvalue(":", "/")}`       | {"key": "/valueStr"} |
| key:={valueStr} | `%{data::keyvalue(":=", "", "{}")}` | {"key": "valueStr"}  |

**Exemple avec plusieurs QuotingString** : lorsque plusieurs QuotingString sont définies, le comportement par défaut est ignoré, et seul le guillemet défini est autorisé.
Le filtre key/value met toujours en correspondance des entrées sans guillemet, peu importe la valeur de `quotingStr`. Lorsque des guillemets sont utilisés, le paramètre `characterWhiteList` est ignoré, puisque tout le contenu entre les guillemets est extrait.

Log :

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

Règle :

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

Résultat :

  ```json
  {
    "key1": "valueStr",
    "key2": "/valueStr2"
  }
  ```

### Parsing de dates

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
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |

<sup>1</sup> Utilisez ce format si vous effectuez vos propres localisations et que vos timestamps ne sont _pas_ au fuseau UTC. Les identifiants de fuseaux horaires sont extraits de la base de données TZ. Pour en savoir plus, consultez les [noms de la base de données TZ][1].

**Remarque** : le parsing d'une date ne définit **pas** sa valeur comme étant la date officielle du log. Pour cela, utilisez le [remappeur de dates de log][2] dans un processeur ultérieur.

### Pattern conditionnel

Si vous avez des logs qui se présentent dans deux formats différents, avec un unique attribut comme seule différence, définissez une seule règle en utilisant des instructions conditionnelles avec `(<REGEX_1>|<REGEX_2>)`.

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

### Regex

Utilisez le matcher regex pour identifier une sous-chaîne de votre message de log.

**Log** :

```text
john_1a2b3c4 connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Exemple de parsing 6"  style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[2]: /fr/logs/processing/processors/#log-date-remapper