---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /fr/logs/parsing/
- /fr/logs/processing/parsing
description: Analyser vos logs à l'aide du processeur Grok
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Contrôler le volume de logs indexés par Datadog
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: Comment étudier un problème de parsing de log ?
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: 'Parsing de log : bonnes pratiques à adopter'
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centre d'apprentissage
  text: Apprenez à créer et modifier des pipelines de logs
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centre d'apprentissage
  text: Débogage des pipelines de logs
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: Blog
  text: 'Comment détecter les abus HTTP/2 dans les logs du serveur web Apache :'
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: Vidéo
  text: 'Conseils et astuces Datadog : utilisez le parsing Grok pour extraire des
    champs des logs'
title: Parsing
---
{{< learning-center-callout header="Essayez le parsing Grok dans le Learning Center" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  Apprenez à créer et à modifier des pipelines de logs, à les gérer avec le Pipeline Scanner et à normaliser les noms d'attributs dans les logs traités pour plus de cohérence.
{{< /learning-center-callout >}}

## Vue d'ensemble {#overview}

Datadog analyse automatiquement les logs au format JSON. Pour les autres formats, Datadog vous permet d'enrichir vos logs à l'aide du Grok Parser.
La syntaxe Grok offre un moyen plus simple d'analyser les logs que les expressions régulières pures. Le Grok Parser vous permet d'extraire des attributs à partir de messages texte semi-structurés.

Grok inclut des modèles réutilisables pour parser des entiers, des adresses IP, des noms de hosts, etc. Ces valeurs doivent être transmises au parser Grok sous forme de chaînes.

Vous pouvez écrire des règles de parsing avec la syntaxe `%{MATCHER:EXTRACT:FILTER}` :

* **Matcher** : une règle (éventuellement une référence à une autre règle de jeton) qui décrit ce à quoi s'attendre (nombre, mot, notSpace, etc.).

* **Extract** (facultatif) : un identifiant représentant la destination de capture pour le morceau de texte correspondant au *Matcher*.

* **Filter** (facultatif) : un post-processeur de la correspondance pour la transformer.

Exemple d'un log non structuré standard :

```text
john connected on 11/08/2017
```

Avec la règle de parsing suivante :

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

Une fois le traitement terminé, le log structuré suivant est généré :

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**Note** :

* Si vous avez plusieurs règles de parsing dans un seul Grok Parser :
  * Une seule peut correspondre à un log donné. La première qui correspond, de haut en bas, est celle qui effectue le parsing.
  * Chaque règle peut référencer des règles de parsing définies au-dessus d'elle dans la liste :
* Vous devez avoir des noms de règle uniques au sein du même Grok Parser.
* Le nom de la règle doit contenir uniquement : des caractères alphanumériques, `_` et `.`. Il doit commencer par un caractère alphanumérique.
* Les propriétés avec des valeurs nulles ou vides ne sont pas affichées.
* Vous devez définir votre règle de parsing pour qu'elle corresponde à l'intégralité de l'entrée de log, car chaque règle s'applique du début à la fin du log.
* Certains logs peuvent produire de grands espaces vides. Utilisez `\n` et `\s+` pour tenir compte des sauts de ligne et des espaces.

### Matcher and Filter {#matcher-and-filter}

<div class="alert alert-danger">Les fonctionnalités de parsing Grok disponibles au moment de <em>la requête</em> (dans le <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) prennent en charge un sous-ensemble limité de matchers (<strong>données</strong>, <strong>entier</strong>, <strong>notSpace</strong>, <strong>nombre</strong> et <strong>mot</strong>) et de filtres (<strong>nombre</strong> et <strong>entier</strong>).<br><br>
L'ensemble complet suivant de correspondances et de filtres est spécifique à la fonctionnalité <em>d'ingestion</em> <a href="/logs/log_configuration/processors/grok_parser/">Grok Parser</a>.</div>

Voici la liste de tous les matchers et de tous les filtres implémentés en natif par Datadog :

{{< tabs >}}
{{% tab "Matchers" %}}

**Matchers au moment de la requête et de l'ingestion :**

Les Matchers suivants sont disponibles à la fois pour le parsing au moment de la requête (Log Explorer) et le parsing au moment de l'ingestion (Grok Parser) :

`word`
: Correspond à un _mot_, qui commence par une limite de mot ; contient des caractères de a-z, A-Z, 0-9, y compris le caractère `_` (underscore) ; et se termine par une limite de mot. Équivalent à `\b\w+\b` en regex.

`notSpace`
: Correspond à n'importe quelle chaîne jusqu'au prochain espace.

`number`
: Correspond à un nombre décimal à virgule flottante et l'analyse comme un nombre à double précision.

`integer`
: Correspond à un nombre entier et l'analyse comme un nombre entier.

`data`
: Correspond à n'importe quelle chaîne, y compris les espaces et les sauts de ligne. Équivalent à `.*` en regex. À utiliser lorsqu'aucun des modèles ci-dessus n'est approprié.

**Correspondances au moment de l'ingestion uniquement :**

Les correspondances suivantes sont uniquement disponibles pour le parsing au moment de l'ingestion avec le processeur Grok Parser et ne peuvent pas être utilisées dans le Log Explorer :

`date("pattern"[, "timezoneId"[, "localeId"]])`
: Correspond à une date avec le modèle spécifié et l'analyse pour produire un horodatage Unix. [Voir les exemples de correspondance de date](#parsing-dates).

`regex("pattern")`
: Correspond à une expression régulière. [Vérifiez les exemples de correspondance d'expression régulière](#regex).

`boolean("truePattern", "falsePattern")`
: Correspond et analyse un booléen, en définissant éventuellement les modèles vrai et faux (par défaut `true` et `false`, en ignorant la casse).

`numberStr`
: Correspond à un nombre décimal à virgule flottante et l'analyse en tant que chaîne.

`numberExtStr`
: Correspond à un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse en tant que chaîne.

`numberExt`
: Correspond à un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse en tant que nombre à double précision.

`integerStr`
: Correspond à un nombre entier et l'analyse en tant que chaîne.

`integerExtStr`
: Correspond à un nombre entier (avec prise en charge de la notation scientifique) et l'analyse en tant que chaîne.

`integerExt`
: Correspond à un nombre entier (avec prise en charge de la notation scientifique) et l'analyse en tant que nombre entier.

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
: Correspond à une adresse IPv4.

`ipv6`
: Correspond à une adresse IPv6.

`ip`
: Correspond à une adresse IP (v4 ou v6).

`hostname`
: Correspond à un nom d'hôte.

`ipOrHost`
: Correspond à un nom d'hôte ou à une adresse IP.

`port`
: Correspond à un numéro de port.

{{% /tab %}}
{{% tab "Filtres" %}}

**Filtres au moment de la requête et au moment de l'ingestion :**

Les filtres suivants sont disponibles à la fois pour le parsing au moment de la requête (Log Explorer) et le parsing au moment de l'ingestion (Grok Parser) :

`number`
: Analyse une correspondance en tant que nombre à double précision.

`integer`
: Analyse une correspondance en tant que nombre entier.

**Filtres uniquement au moment de l'ingestion :**

Les filtres suivants sont uniquement disponibles pour le parsing lors de l'ingestion avec le processeur Grok Parser et ne peuvent pas être utilisés dans le Log Explorer :

`boolean`
: Analyse les chaînes « true » et « false » en tant que booléens, sans tenir compte de la casse.

`nullIf("value")`
: Renvoie null si la correspondance est égale à la valeur fournie.

`json`
: Analyse un JSON correctement formaté .

`rubyhash`
: Analyse un hash Ruby correctement formaté tel que `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}` .

`useragent([decodeuricomponent:true/false])`
: Analyse un agent utilisateur et renvoie un objet JSON contenant l'appareil, le système d'exploitation et le navigateur représentés par l'agent. [Vérifiez le processeur User Agent][1].

`querystring`
: Extrait toutes les paires clé-valeur d'une chaîne de requête URL correspondante (par exemple, `?productId=superproduct&promotionCode=superpromo`) .

`decodeuricomponent`
: Décode les composants d'URI . Par exemple, il transforme `%2Fservice%2Ftest` en `/service/test`.

`lowercase`
: Renvoie la chaîne en minuscules .

`uppercase`
: Renvoie la chaîne en majuscules .

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: Extrait le modèle de valeur clé et renvoie un objet JSON . Consultez les [exemples de filtre clé-valeur](#key-value-or-logfmt).

`xml`
: Analyse le XML correctement formaté . Consultez les [exemples de filtre XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analyse les lignes CSV ou TSV correctement formatées . Consultez les [exemples de filtre CSV](#parsing-csv).

`scale(factor)`
: Multiplie la valeur numérique attendue par le facteur fourni .

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Analyse une séquence de jetons de chaîne et la renvoie sous forme de tableau . Consultez l'exemple [liste vers tableau](#list-to-array).

`url`
: Analyse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON . [Plus d'informations sur la façon d'analyser les URL][2].

[1]: /fr/logs/log_configuration/processors/user_agent_parser/
[2]: /fr/logs/log_configuration/processors/url_parser/
{{% /tab %}}
{{< /tabs >}}

## Paramètres avancés {#advanced-settings}

Utilisez la section {{< ui >}}Advanced Settings{{< /ui >}} en bas de votre processeur Grok pour analyser un attribut spécifique au lieu de l'attribut `message` par défaut, ou pour définir des règles d'assistance qui réutilisent des modèles courants dans plusieurs règles de parsing.

### Parsing d'un attribut de texte spécifique {#parsing-a-specific-text-attribute}

Utilisez le champ {{< ui >}}Extract from{{< /ui >}} pour appliquer votre processeur Grok sur un attribut de texte donné au lieu de l'attribut `message` par défaut.

Par exemple, considérez un log contenant un attribut `command.line` qui doit être analysé comme une paire clé-valeur. Extrayez de `command.line` pour analyser son contenu et créer des attributs structurés à partir des données de commande.

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="Paramètres avancés avec l'exemple d'attribut Extract from command.line" style="width:80%;">}}

### Utilisation de règles d'assistance pour réutiliser des modèles courants {#using-helper-rules-to-reuse-common-patterns}

Utilisez le champ {{< ui >}}Helper Rules{{< /ui >}} pour définir des jetons pour vos règles de parsing. Les règles d'assistance vous permettent de réutiliser des modèles Grok courants dans vos règles de parsing. Ceci est utile lorsque vous avez plusieurs règles dans le même analyseur Grok qui utilisent les mêmes jetons.

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

## Exemples {#examples}

Voici des exemples d'utilisation des parsers :

* [Clé-valeur ou logfmt](#key-value-or-logfmt)
* [Parsing de dates](#parsing-dates)
* [Modèles alternatifs](#alternating-pattern)
* [Attribut optionnel](#optional-attribute)
* [JSON imbriqué](#nested-json)
* [Regex](#regex)
* [Listes et tableaux](#list-to-array)
* [ Format Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Clé-valeur ou logfmt {#key-value-or-logfmt}

Voici le filtre principal clé-valeur : `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` où :

* `separatorStr` : définit le séparateur entre la clé et les valeurs. La valeur par défaut est `=`.
* `characterAllowList` : définit des caractères de valeur non échappés supplémentaires en plus de la valeur par défaut `\\w.\\-_@`. Utilisé uniquement pour les valeurs non entre guillemets (par exemple, `key=@valueStr`).
* `quotingStr` : définit les guillemets, remplaçant la détection des guillemets par défaut : `<>`, `""`, `''`.
* `delimiter` : définit le séparateur entre les différentes paires clé-valeur (par exemple, `|` est le délimiteur dans `key1=value1|key2=value2`). La valeur par défaut est ` ` (espace normal), `,` et `;`.

Utilisez des filtres tels que `keyvalue` pour mapper plus facilement des chaînes vers des attributs pour les formats keyvalue ou logfmt :

**Log :**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Règle :**

```text
rule %{data::keyvalue}
```

Vous n'avez pas besoin de spécifier le nom de vos paramètres car ils sont déjà contenus dans le log.
Si vous ajoutez un attribut **extract** `my_attribute` dans votre modèle de règle, vous verrez :

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

Si `=` n'est pas le séparateur par défaut entre votre clé et vos valeurs, ajoutez un paramètre dans votre règle de parsing avec un séparateur.

**Log :**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Règle :**

```text
rule %{data::keyvalue(": ")}
```

Si les logs contiennent des caractères spéciaux dans une valeur d'attribut, comme `/` dans une URL par exemple, ajoutez-le à la liste d'autorisation dans la règle de parsing :

**Log :**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Règle :**

```text
rule %{data::keyvalue("=","/:")}
```

Autres exemples :

| **Chaîne brute**               | **Règle de parsing**                                      | **Résultat**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| clé=valeurStr                 | `%{data::keyvalue}`                                   | {\"clé\": \"valeurStr\"}                   |
| clé=\\<valeurStr>              | `%{data::keyvalue}`                                   | {\"clé\": \"valeurStr\"}                   |
| \"clé\"=\"valeurStr\"             | `%{data::keyvalue}`                                   | {\"clé\": \"valeurStr\"}                   |
| clé:valeurStr                 | `%{data::keyvalue(":")}`                              | {\"clé\": \"valeurStr\"}                   |
| clé:\"/valeurStr\"              | `%{data::keyvalue(":", "/")}`                         | {\"clé\": \"/valeurStr\"}                  |
| /clé:/valeurStr               | `%{data::keyvalue(":", "/")}`                         | {\"/clé\": \"/valeurStr\"}                 |
| clé:={valeurStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {\"clé\": \"valeurStr\"}                   |
| clé1=valeur1\\|clé2=valeur2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {\"clé1\": \"valeur1\", \"clé2\": \"valeur2\"}  |
| key1=\"value1\"\\|key2=\"value2\" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {\"clé1\": \"valeur1\", \"clé2\": \"valeur2\"}  |

**Exemple de Multiple QuotingString** : Lorsque plusieurs chaînes de citation sont définies, le comportement par défaut est remplacé par un caractère de citation défini.
La paire clé-valeur correspond toujours aux entrées sans aucun caractère de citation, indépendamment de ce qui est spécifié dans `quotingStr`. Lorsque des caractères de citation sont utilisés, le `characterAllowList` est ignoré car tout ce qui se trouve entre les caractères de citation est extrait.

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

**Note** :

* Les valeurs vides (`key=`) ou les valeurs `null` (`key=null`) ne sont pas affichées dans le JSON de sortie.
* Si vous définissez un filtre *clévaleur* sur un objet `data`, et que ce filtre ne correspond pas, alors un JSON `{}` vide est renvoyé (par exemple, entrée : `key:=valueStr`, règle de parsing : `rule_test %{data::keyvalue("=")}`, sortie : `{}`).
* Définir `""` comme `quotingStr` conserve la configuration par défaut pour la citation.

### Parsing des dates {#parsing-dates}

Le moteur de correspondance de date transforme votre horodatage au format EPOCH (unité de mesure **milliseconde**).

| **Chaîne brute**                       | **Règle de parsing**                                          | **Résultat**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {\"date\": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {\"date\": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {\"date\": 1412978400000} |
| Thu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {\"date\": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {\"date\": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {\"date\": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {\"date\": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {\"date\": 1480436496431} |
| 06/fév/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {\"date\": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {\"date\": 1188598942427} |
| Jeu 16 juin 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {\"date\": 1466058543000} |
| Jeu 16 juin 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {\"date\": 1466047743000} |
| Jeu 16 juin 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {\"date\": 1466054943000} |

<sup>1</sup> Utilisez le paramètre `timezone` si vous effectuez vos propres localisations et que vos horodatages _ne sont pas_ en UTC.
Les formats pris en charge pour les fuseaux horaires sont :

* `GMT`, `UTC`, `UT` ou `Z`
* `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`. La plage maximale prise en charge va de +18:00 à -18:00 inclus.
* Fuseaux horaires commençant par `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` ou `UT-`. La plage maximale prise en charge va de +18:00 à -18:00 inclus.
* Identifiants de fuseau horaire extraits de la base de données TZ. Pour plus d'informations, consultez [noms de la base de données TZ][2].

**Remarque** : Le parsing d'une date **ne** définit pas sa valeur comme la date officielle du log. Pour cela, utilisez le [Log Date Remapper][3] dans un processeur ultérieur.

### Modèle alterné {#alternating-pattern}

Si vous avez des logs avec deux formats possibles qui ne diffèrent que par un seul attribut, définissez une règle unique en utilisant l'alternance avec `(<REGEX_1>|<REGEX_2>)`. Cette règle est équivalente à un OU booléen.

**Log :**

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Règle :**
Notez que « id » est un entier et non une chaîne de caractères.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats** :<br>
`%{integer:user.id}`

```json
{
  "user": {
    "id": 12345
  },
  "connect_date": 1510099200000
}
```
`%{word:user.firstname}`

```json
{
  "user": {
    "firstname": "john"
  },
  "connect_date": 1510099200000
}
```

### Attribut facultatif {#optional-attribute}

Certains logs contiennent des valeurs qui n'apparaissent qu'une partie du temps. Dans ce cas, rendez l'extraction d'attribut facultative avec `()?`.

**Log :**

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

**Règle :**

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Note** : Une règle ne correspondra pas si vous incluez un espace après le premier mot dans la section facultative.

**Résultat :**<br>
`(%{integer:user.id} )?`

```json
{
  "user": {
    "firstname": "john",
    "id": 1234
  },
  "connect_date": 1510099200000
}
```

`%{word:user.firstname} (%{integer:user.id} )?`

```json
{
  "user": {
    "firstname": "john",
  },
  "connect_date": 1510099200000
}
```

### JSON imbriqué {#nested-json}

Utilisez le filtre `json` pour analyser un objet JSON imbriqué après un préfixe de texte brut :

**Log :**

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Règle :**

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

**Résultat :**

```json
{
  "timestamp": 1567761218000,
  "vm": "vagrant",
  "app": "program",
  "logger": {
    "thread_id": 123
  },
  "server": "server.1",
  "method": "GET",
  "status_code": 200,
  "url": "https://app.datadoghq.com/logs/pipelines",
  "duration": 123456
}
```

### Regex {#regex}

**Log :**

```text
john_1a2b3c4 connected on 11/08/2017
```

**Règle :**

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

**Résultat :**

```json
{
  "user": {
    "firstname": "john",
    "id": "1a2b3c4"
  }
}
```

### Liste vers tableau {#list-to-array}

Utilisez le filtre `array([[openCloseStr, ] separator][, subRuleOrFilter)` pour extraire une liste dans un tableau au sein d'un seul attribut. Le `subRuleOrFilter` est facultatif et accepte ces [filtres][4].

**Log :**

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Règle :**

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

**Résultat :**

```json
{
  "users": [
    "John",
    " Oliver",
    " Marc",
    " Tom"
  ]
}
```

**Log :**

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Règle :**

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**Règle utilisant `subRuleOrFilter`** :

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### Format Glog {#glog-format}

Les composants Kubernetes se connectent parfois au format `glog` ; cet exemple provient de l'élément Kube Scheduler dans la Pipeline Library.

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

### Parsing XML {#parsing-xml}

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

**Notes**:

* Si le XML contient des balises qui ont à la fois un attribut et une valeur de chaîne entre les deux balises, un attribut `value` est généré. Par exemple : `<title lang="en">Harry Potter</title>` est converti en `{"title": {"lang": "en", "value": "Harry Potter" } }`
* Les balises répétées sont automatiquement converties en tableaux. Par exemple : `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` est converti en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### Parsing CSV {#parsing-csv}

Utilisez le filtre `csv` pour mapper plus facilement les chaînes aux attributs lorsqu'elles sont séparées par un caractère donné (`,` par défaut).

Le filtre CSV est défini comme `csv(headers[, separator[, quotingcharacter]])` où :

* `headers` : Définit le nom des clés séparées par `,`. Les noms des clés doivent commencer par un caractère alphabétique et peuvent contenir n'importe quel caractère alphanumérique en plus de `_`.
* `separator` : Définit les séparateurs utilisés pour séparer les différentes valeurs. Un seul caractère est accepté. Par défaut : `,`. **Remarque** : Utilisez `tab` pour le `separator` afin de représenter le caractère de tabulation pour les TSV.
* `quotingcharacter` : Définit le caractère de citation. Un seul caractère est accepté. Par défaut : `"`

**Note** :

* Les valeurs contenant un caractère séparateur doivent être placées entre guillemets.
* Les valeurs entre guillemets contenant un caractère de citation doivent être échappées avec des caractères de citation. Par exemple, `""` dans une valeur entre guillemets représente `"`.
* Si le log ne contient pas le même nombre de valeurs que le nombre de clés dans l'en-tête, l'analyseur CSV fera correspondre les premières.
* Les entiers et les doubles sont automatiquement convertis si possible.

**Log :**

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**Règle :**

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
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {\"firstname\": \"John\", \"name\":\"Doe\"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {\"firstname\": \"John \\\"Da Man\\\"\", \"name\":\"Doe\"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {\"firstname\": \"John 'Da Man'\", \"name\":\"Doe\"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {\"firstname\": \"John\", \"name\":\"Doe\"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {\"key1\": \"value1\", \"key2\":\"value2\"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {\"key1\": \"value1\", \"key2\":\"value2\"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {\"key1\": \"value1\", \"key3\":\"value3\"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {\"key1\": \"value1\", \"key2\": \"value2\", \"key3\":\"value3\"} |

### Utilisez le comparateur de données pour ignorer le texte inutile {#use-data-matcher-to-discard-unneeded-text}

Si vous avez un log où, après avoir analysé ce qui est nécessaire, vous savez que le texte après ce point peut être ignoré en toute sécurité, vous pouvez utiliser le comparateur de données pour le faire. Pour l'exemple de log suivant, vous pouvez utiliser le comparateur `data` pour ignorer le `%` à la fin.

**Log :**

```
Usage: 24.3%
```

**Règle :**

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**Résultat :**

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

### Caractères de contrôle ASCII {#ascii-control-characters}

Si vos logs contiennent des caractères de contrôle ASCII, ils sont sérialisés lors de l'ingestion. Celles-ci peuvent être traitées en échappant explicitement la valeur sérialisée dans votre analyseur grok.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /fr/logs/log_configuration/processors/log_date_remapper/
[4]: /fr/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter