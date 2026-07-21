---
aliases:
- /fr/events/pipelines_and_processors/grok_parser/
description: Créez des règles grok personnalisées pour analyser le message complet
  ou des attributs spécifiques des événements bruts en données structurées
title: Parser Grok
---
## Aperçu {#overview}

Créez des règles grok personnalisées pour analyser le message complet ou un attribut spécifique de votre événement brut. En tant que meilleure pratique, il est recommandé d'utiliser au maximum 10 règles d'analyse dans un processeur grok.


{{< img src="events/grok-parser.png" alt="Exemple d'analyse 1" style="width:80%;">}}


Cliquez sur **Analyser mes événements** pour démarrer un ensemble de trois règles d'analyse pour les événements circulant dans le pipeline sous-jacent. Affinez la nomination des attributs à partir de là, et ajoutez de nouvelles règles pour d'autres types d'événements si nécessaire. Cette fonctionnalité nécessite que les événements correspondants soient indexés et effectivement en cours de traitement ; vous pouvez temporairement désactiver ou réduire les filtres d'exclusion pour que cela fonctionne pour vous.

Cliquez sur un échantillon pour le sélectionner et déclencher son évaluation par rapport à la règle de parsing. Le résultat s'affiche alors en bas de l'écran.

Jusqu'à cinq échantillons peuvent être enregistrés avec le processeur, et chaque échantillon peut avoir jusqu'à 5000 caractères de longueur. Tous les échantillons affichent un statut (correspondance ou non correspondance), ce qui met en évidence si l'une des règles d'analyse du parseur grok correspond à l'échantillon.


### Syntaxe Grok {#grok-syntax}

Le parseur Grok extrait des attributs de messages texte semi-structurés. Grok est livré avec des modèles réutilisables pour analyser des entiers, des adresses IP, des noms d'hôtes, et plus encore. Ces valeurs doivent être envoyées au parseur grok sous forme de chaînes.

Vous pouvez écrire des règles d'analyse avec la syntaxe `%{MATCHER:EXTRACT:FILTER}` :

* **Correspondant** : Une règle (éventuellement une référence à une autre règle de jeton) qui décrit ce à quoi s'attendre (nombre, mot, non espace, etc.).

* **Extraire** (optionnel) : Un identifiant représentant la destination de capture pour le morceau de texte correspondant au *Correspondant*.

* **Filtre** (optionnel) : Un post-traitement de la correspondance pour la transformer.

Exemple pour un événement non structuré classique :

```text
john connected on 11/08/2017
```

Avec la règle de parsing suivante :

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Après traitement, l'événement structuré suivant est généré :

{{< img src="logs/processing/processors/_parser.png" alt="Exemple d'analyse 1" style="width:80%;">}}

**Remarque** :

* Si vous avez plusieurs règles d'analyse dans un seul parseur Grok :
  * Une seule peut correspondre à un événement donné. La première qui correspond, de haut en bas, est celle qui effectue l'analyse.
  * Chaque règle peut référencer des règles d'analyse définies au-dessus d'elle dans la liste.
* Vous devez avoir des noms de règles uniques au sein du même parseur Grok.
* Le nom de la règle doit contenir uniquement : des caractères alphanumériques, `_` et `.`. Il doit commencer par un caractère alphanumérique.
* Les propriétés avec des valeurs nulles ou vides ne sont pas affichées.
* Le matcher regex applique un `^` implicite, pour correspondre au début d'une chaîne, et un `$`, pour correspondre à la fin d'une chaîne.
* Certains événements peuvent produire de grands espaces vides. Utilisez `\n` et `\s+` pour tenir compte des nouvelles lignes et des espaces vides.

### Correspondant et filtre {#matcher-and-filter}

Voici la liste de tous les matchers et de tous les filtres implémentés en natif par Datadog :

{{< tabs >}}
{{% tab "Correspondants" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])`
: Correspond à une date avec le modèle spécifié et l'analyse pour produire un timestamp Unix. [Voir les exemples du Correspondant de date](#parsing-dates).

`regex("pattern")`
: Correspond à une regex. [Vérifiez les exemples du Correspondant regex](#regex).

`notSpace`
: Correspond à toute chaîne jusqu'à l'espace suivant.

`boolean("truePattern", "falsePattern")`
: Correspond et analyse un booléen, définissant éventuellement les modèles vrai et faux (par défaut à `true` et `false`, en ignorant la casse).

`numberStr`
: Correspond à un nombre décimal à virgule flottante et l'analyse comme une chaîne.

`number`
: Correspond à un nombre décimal à virgule flottante et l'analyse comme un nombre à double précision.

`numberExtStr`
: Correspond à un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse comme une chaîne.

`numberExt`
: Correspond à un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse comme un nombre à double précision.

`integerStr`
: Correspond à un nombre entier et l'analyse comme une chaîne.

`integer`
: Correspond à un nombre entier et l'analyse comme un nombre entier.

`integerExtStr`
: Correspond à un nombre entier (avec prise en charge de la notation scientifique) et l'analyse comme une chaîne.

`integerExt`
: Correspond à un nombre entier (avec prise en charge de la notation scientifique) et l'analyse comme un nombre entier.

`word`
: Correspond à des caractères de a-z, A-Z, 0-9, y compris le caractère _ (soulignement).

`doubleQuotedString`
: Correspond à une chaîne entre guillemets doubles.

`singleQuotedString`
: Correspond à une chaîne entre guillemets simples.

`quotedString`
: Correspond à une chaîne entre guillemets doubles ou simples.

`uuid`
: Correspond à un UUID.

`mac`
: Correspond à une adresse MAC.

`ipv4`
: Correspond à un IPV4.

`ipv6`
: Correspond à un IPV6.

`ip`
: Correspond à une IP (v4 ou v6).

`hostname`
: Correspond à un nom d'hôte.

`ipOrHost`
: Correspond à un nom d'hôte ou à une IP.

`port`
: Correspond à un numéro de port.

`data`
: Correspond à toute chaîne, y compris les espaces et les nouvelles lignes. Équivalent à `.*` en regex. Utilisez lorsque aucun des modèles ci-dessus n'est approprié.

{{% /tab %}}
{{% tab "Filtres" %}}

`number`
: Analyse une correspondance en tant que nombre à double précision.

`integer`
: Analyse une correspondance en tant que nombre entier.

`boolean`
: Analyse les chaînes 'true' et 'false' en tant que booléens en ignorant la casse.

`nullIf("value")`
: Renvoie null si la correspondance est égale à la valeur fournie.

`json`
: Analyse le JSON correctement formaté.

`rubyhash`
: Analyse un hash Ruby correctement formaté tel que `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`.

`useragent([decodeuricomponent:true/false])`
: Analyse un agent utilisateur et renvoie un objet JSON contenant l'appareil, le système d'exploitation et le navigateur représentés par l'agent. [Vérifiez le processeur d'agent utilisateur][1].

`querystring`
: Extrait toutes les paires clé-valeur dans une chaîne de requête d'URL correspondante (par exemple, `?productId=superproduct&promotionCode=superpromo`).

`decodeuricomponent`
: Décode les composants URI. Par exemple, il transforme `%2Fservice%2Ftest` en `/service/test`.

`lowercase`
: Renvoie la chaîne en minuscules.

`uppercase`
: Renvoie la chaîne en majuscules.

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: Extrait le motif clé-valeur et renvoie un objet JSON. Voir les [exemples de filtre clé-valeur](#key-value-or-logfmt).

`xml`
: Analyse le XML correctement formaté. Voir les [exemples de filtre XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analyse correctement les lignes CSV ou TSV formatées. Voir les [exemples de filtre CSV](#parsing-csv).

`scale(factor)`
: Multiplie la valeur numérique attendue par le facteur fourni.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Analyse une séquence de chaînes de tokens et la renvoie sous forme de tableau. Voir l'exemple de [liste à tableau](#list-to-array).

`url`
: Analyse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON.
{{% /tab %}}
{{< /tabs >}}

## Paramètres avancés {#advanced-settings}

En bas de vos tuiles de processeur Grok, il y a une section **Paramètres avancés** :

{{< img src="logs/processing/parsing/advanced_settings.png" alt="Paramètres avancés" style="width:80%;">}}

### Analyse d'un attribut de texte spécifique {#parsing-a-specific-text-attribute}

Utilisez le champ **Extraire de** pour appliquer votre processeur Grok sur un attribut de texte donné au lieu de l'attribut par défaut `message`.

Par exemple, considérez un événement contenant un `command.line` attribut qui doit être analysé comme une paire clé-valeur. Vous pourriez analyser cet événement comme suit :

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="Analyse de la ligne de commande" style="width:80%;">}}

### Utilisation de règles d'aide pour factoriser plusieurs règles d'analyse {#using-helper-rules-to-factorize-multiple-parsing-rules}

Utilisez le champ **Règles d'aide** pour définir des tokens pour vos règles d'analyse. Les règles d'aide vous aident à factoriser les motifs Grok à travers vos règles d'analyse. Ceci est utile lorsque vous avez plusieurs règles dans le même parseur Grok qui utilisent les mêmes tokens.

Exemple pour un événement non structuré classique :

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

{{< img src="logs/processing/parsing/helper_rules.png" alt="règles d'aide" style="width:80%;">}}

## Exemples {#examples}

Voici des exemples d'utilisation des parsers :

* [Valeur clé ou logfmt](#key-value-or-logfmt)
* [Analyse des dates](#parsing-dates)
* [Modèles alternés](#alternating-pattern)
* [Attribut optionnel](#optional-attribute)
* [JSON imbriqué](#nested-json)
* [Regex](#regex)
* [Listes et tableaux](#list-to-array)
* [ Format Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Valeur clé ou logfmt {#key-value-or-logfmt}

Ceci est le filtre de base clé-valeur : `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` où :

* `separatorStr` : définit le séparateur entre les clés et les valeurs. Par défaut, c'est `=`.
* `characterAllowList` : définit des caractères de valeur supplémentaires non échappés en plus de la valeur par défaut `\\w.\\-_@`. Utilisé uniquement pour les valeurs non citées (par exemple, `key=@valueStr`).
* `quotingStr` : définit les guillemets, remplaçant la détection par défaut des guillemets : `<>`, `""`, `''`.
* `delimiter` : définit le séparateur entre les différentes paires clé-valeur (par exemple, `|` est le délimiteur dans `key1=value1|key2=value2`). Par défaut, c'est ` ` (espace normal), `,` et `;`.

Utilisez des filtres tels que **keyvalue** pour mapper plus facilement des chaînes à des attributs pour les formats keyvalue ou logfmt :

**Événement :**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Règle :**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="Exemple de parsing 2" style="width:80%;">}}

Vous n'avez pas besoin de spécifier le nom de vos paramètres car ils sont déjà contenus dans l'événement.
Si vous ajoutez un attribut **extract** `my_attribute` dans votre modèle de règle, vous verrez :

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="Exemple de parsing 2 bis" style="width:80%;">}}

Si `=` n'est pas le séparateur par défaut entre vos clés et valeurs, ajoutez un paramètre dans votre règle de parsing avec un séparateur.

**Événement :**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Règle :**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="Analyseur clé-valeur" style="width:80%;" >}}

Si l'événement contient des caractères spéciaux dans une valeur d'attribut, comme `/` dans une URL par exemple, ajoutez-le à la liste blanche dans la règle de parsing :

**Événement :**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Règle :**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_allowlist.png" alt="Liste blanche des clés et valeurs" style="width:80%;" >}}

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

**Exemple de chaîne de citation multiple** : Lorsque plusieurs chaînes de citation sont définies, le comportement par défaut est remplacé par un caractère de citation défini.
La clé-valeur correspond toujours aux entrées sans aucun caractère de citation, quel que soit ce qui est spécifié dans `quotingStr`. Lorsque des caractères de citation sont utilisés, le `characterAllowList` est ignoré car tout ce qui se trouve entre les caractères de citation est extrait.

**Événement :**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**Règle :**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**Résultat :**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**Remarque** :

* Les valeurs vides (`key=`) ou les valeurs `null` (`key=null`) ne sont pas affichées dans le JSON de sortie.
* Si vous définissez un filtre *clévaleur* sur un `data` objet, et que ce filtre n'est pas respecté, alors un JSON vide `{}` est retourné (par exemple, entrée : `key:=valueStr`, règle de parsing : `rule_test %{data::keyvalue("=")}`, sortie : `{}`).
* Définir `""` comme `quotingStr` conserve la configuration par défaut pour la citation.

### Parsing des dates {#parsing-dates}

Le date matcher transforme votre horodatage au format EPOCH (unité de mesure **millisecondes**).

| **Chaîne brute**                       | **Règle de parsing**                                          | **Résultat**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Jeu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Mar Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Jeu 16 juin 2016 08:29:03<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Jeu 16 juin 2016 08:29:03<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Jeu 16 juin 2016 08:29:03<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utilisez le `timezone` paramètre si vous effectuez vos propres localisations et que vos horodatages ne sont _pas_ en UTC.
Les formats pris en charge pour les fuseaux horaires sont :

* `GMT`, `UTC`, `UT` ou `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` ou `-hhmmss`. La plage maximale prise en charge est de +18:00 à -18:00 inclus.
* Les fuseaux horaires commençant par `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` ou `UT-`. La plage maximale prise en charge est de +18:00 à -18:00 inclus.
* Identifiants de fuseaux horaires extraits de la base de données TZ. Pour plus d'informations, consultez [noms de la base de données TZ][2].

**Remarque** : L'analyse d'une date **ne** définit pas sa valeur comme la date officielle de l'événement. Pour cela, utilisez le [Remappeur de date d'événement][3] dans un processeur ultérieur.

### Modèle alternatif {#alternating-pattern}

Si vous avez des événements avec deux formats possibles qui diffèrent par un seul attribut, définissez une règle unique en utilisant l'alternance avec `(<REGEX_1>|<REGEX_2>)`. Cette règle est équivalente à un OU booléen.

**Événement** :

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Règle** :
Notez que "id" est un entier et non une chaîne.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats** :

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="Exemple de parsing 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="Exemple de parsing 4 bis" style="width:80%;" >}}

### Attribut optionnel {#optional-attribute}

Certains événements contiennent des valeurs qui n'apparaissent qu'une partie du temps. Dans ce cas, rendez l'extraction d'attributs optionnelle avec `()?`.

**Événement** :

```text
john 1234 connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Remarque** : Une règle ne correspondra pas si vous incluez un espace après le premier mot dans la section optionnelle.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="Exemple de parsing 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="Exemple de parsing 5 bis" style="width:80%;" >}}

### JSON imbriqué {#nested-json}

Utilisez le filtre `json` pour analyser un objet JSON imbriqué après un préfixe de texte brut :

**Événement** :

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Règle** :

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="Exemple de parsing de JSON imbriqué" style="width:80%;" >}}

### Regex {#regex}

**Événement** :

```text
john_1a2b3c4 connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="Exemple de parsing 6" style="width:80%;" >}}

### Liste en tableau {#list-to-array}

Utilisez le filtre `array([[openCloseStr, ] separator][, subRuleOrFilter)` pour extraire une liste dans un tableau dans un seul attribut. Le `subRuleOrFilter` est optionnel et accepte ces [filtres][4].

**Événement** :

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Règle** :

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="Exemple de parsing 6" style="width:80%;" >}}

**Événement** :

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Règle** :

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**Règle utilisant `subRuleOrFilter`** :

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### Format Glog {#glog-format}

Les composants Kubernetes enregistrent parfois au format `glog` ; cet exemple provient de l'élément Kube Scheduler dans la bibliothèque Pipeline.

Exemple d'événement :

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

### Analyse XML {#parsing-xml}

Le parser de XML permet de transformer des messages au format XML en JSON.

**Événement :**

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

**Notes** :

* Si le XML contient des balises ayant à la fois un attribut et une valeur de chaîne entre les deux balises, un attribut `value` est généré. Par exemple : `<title lang="en">Harry Potter</title>` est converti en `{"title": {"lang": "en", "value": "Harry Potter" } }`.
* Les balises répétées sont automatiquement converties en tableaux. Par exemple : `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` est converti en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`.

### Parsing CSV {#parsing-csv}

Utilisez le filtre **CSV** pour associer plus facilement les chaînes aux attributs lorsqu'elles sont séparées par un caractère donné (`,` par défaut).

Le filtre CSV est défini comme `csv(headers[, separator[, quotingcharacter]])` où :

* `headers` : Définit les noms de clés séparés par `,`. Les noms de clés doivent commencer par un caractère alphabétique et peuvent contenir tout caractère alphanumérique en plus de `_`.
* `separator` : Définit les séparateurs utilisés pour séparer les différentes valeurs. Un seul caractère est accepté. Par défaut : `,`. **Remarque** : Utilisez `tab` pour le `separator` afin de représenter le caractère de tabulation pour les TSV.
* `quotingcharacter` : Définit le caractère de citation. Un seul caractère est accepté. Par défaut : `"`

**Remarque** :

* Les valeurs contenant un caractère séparateur doivent être citées.
* Les valeurs entre guillemets contenant un caractère de citation doivent être échappées avec un caractère de citation. Par exemple, `""` dans une valeur citée représente `"`.
* Si l'événement ne contient pas le même nombre de valeurs que le nombre de clés dans l'en-tête, le parseur CSV associera les premières.
* Les entiers et les doubles sont automatiquement convertis si possible.

**Événement** :

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**Règle** :

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**Résultat :**

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
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### Utilisez le data matcher pour éliminer le texte inutile {#use-data-matcher-to-discard-unneeded-text}

Si vous avez un événement où, après avoir analysé ce qui est nécessaire et sachant que le texte après ce point peut être éliminé, vous pouvez utiliser le data matcher pour le faire. Pour l'exemple d'événement suivant, vous pouvez utiliser le `data` matcher pour éliminer le `%` à la fin.

**Événement** :

```
Usage: 24.3%
```

**Règle** :

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**Résultat** :

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

### Caractères de contrôle ASCII {#ascii-control-characters}

Si vos événements contiennent des caractères de contrôle ASCII, ils sont sérialisés lors de l'ingestion. Ceci peut être géré en échappant explicitement la valeur sérialisée dans votre parseur grok.


[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /fr/events/pipelines_and_processors/date_remapper
[4]: /fr/events/pipelines_and_processors/grok_parser/?tab=filters&tabs=filters#matcher-and-filter