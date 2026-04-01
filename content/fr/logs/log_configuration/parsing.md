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
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centre d'apprentissage
  text: Apprenez à créer et modifier des pipelines de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Apprendre à traiter vos logs
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: Video
  text: 'Conseils et astuces Datadog : Utilisez l''analyse Grok pour extraire des
    champs des journaux'
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: Comment étudier un problème de traitement de log ?
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: 'Parsing de log : bonnes pratiques à adopter'
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Contrôler le volume de logs indexés par Datadog
title: Parsing
---
{{< learning-center-callout header="Essayez l'analyse Grok dans le Centre d'apprentissage" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  Apprenez à construire et à modifier des pipelines de journaux, à les gérer avec le Scanner de pipelines, et à standardiser les noms d'attributs dans les journaux traités pour garantir la cohérence.
{{< /learning-center-callout >}}

## Aperçu

Datadog analyse automatiquement les journaux au format JSON. Pour d'autres formats, Datadog vous permet d'enrichir vos journaux avec l'aide du Parseur Grok.
La syntaxe Grok offre un moyen plus simple d'analyser les journaux que les expressions régulières pures. Le Parseur Grok vous permet d'extraire des attributs de messages texte semi-structurés.

Grok inclut des modèles réutilisables pour parser des entiers, des adresses IP, des noms de hosts, etc. Ces valeurs doivent être transmises au parser Grok sous forme de chaînes.

Vous pouvez écrire des règles d'analyse avec la syntaxe `%{MATCHER:EXTRACT:FILTER}` :

* **Matcher** : Une règle (éventuellement une référence à une autre règle de token) qui décrit ce à quoi s'attendre (nombre, mot, nonEspace, etc.).

* **Extraire** (optionnel) : Un identifiant représentant la destination de capture pour le morceau de texte correspondant au *Matcher*.

* **Filtrer** (optionnel) : Un post-traitement de la correspondance pour la transformer.

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

**Remarque** :

* Si vous avez plusieurs règles d'analyse dans un seul parseur Grok :
  * Une seule peut correspondre à un journal donné. La première qui correspond, de haut en bas, est celle qui effectue l'analyse.
  * Chaque règle peut référencer des règles d'analyse définies au-dessus d'elle dans la liste.
* Les noms des règles au sein d'un même parser Grok doivent être uniques.
* Le nom de la règle ne doit contenir que : des caractères alphanumériques, `_`, et `.`. Il doit commencer par un caractère alphanumérique.
* Les propriétés avec des valeurs nulles ou vides ne sont pas affichées.
* Vous devez définir votre règle de parsing de manière à ce qu'elle corresponde à l'entrée de log dans son intégralité, car chaque règle s'applique du début à la fin du log.
* Certains journaux peuvent produire de grands espaces vides. Utilisez `\n` et `\s+` pour tenir compte des sauts de ligne et des espaces.

### Matcher et filtre

Les fonctionnalités de parsing Grok disponibles au moment de <em>la requête</em> (dans le <a href="/logs/explorer/calculated_fields/">Log Explorer</a>) prennent en charge un sous-ensemble limité de matchers (<strong>données</strong>, <strong>entier</strong>, <strong>notSpace</strong>, <strong>nombre</strong> et <strong>mot</strong>) et de filtres (<strong>nombre</strong> et <strong>entier</strong>).<br><br>
L'ensemble complet suivant de matchers et de filtres est spécifique à <em>l'ingestion</em> <a href="/logs/log_configuration/processors/?tab=ui#grok-parser">des fonctionnalités du Grok Parser</a>.</div>

Voici la liste de tous les matchers et de tous les filtres implémentés en natif par Datadog :

{{< tabs >}}
{{% tab "Matchers" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])`
: Correspond à une date avec le modèle spécifié et analyse pour produire un horodatage Unix. [Voir les exemples de matchers de date](#parsing-dates).

`regex("pattern")`
: Correspond à une expression régulière. [Vérifiez les exemples de matchers regex](#regex).

`notSpace`
: Correspond à toute chaîne jusqu'à l'espace suivant.

`boolean("truePattern", "falsePattern")`
: Correspond et analyse un booléen, définissant éventuellement les modèles vrai et faux (par défaut `true` et `false`, en ignorant la casse).

`numberStr`
: Correspond à un nombre à virgule flottante décimal et l'analyse en tant que chaîne.

`number`
: Correspond à un nombre à virgule flottante décimal et l'analyse en tant que nombre à double précision.

`numberExtStr`
: Correspond à un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse en tant que chaîne.

`numberExt`
: Correspond à un nombre à virgule flottante (avec prise en charge de la notation scientifique) et l'analyse en tant que nombre à double précision.

`integerStr`
: Correspond à un nombre entier et l'analyse en tant que chaîne.

`integer`
: Correspond à un nombre entier et l'analyse en tant que nombre entier.

`integerExtStr`
: Correspond à un nombre entier (avec prise en charge de la notation scientifique) et l'analyse en tant que chaîne.

`integerExt`
: Correspond à un nombre entier (avec prise en charge de la notation scientifique) et l'analyse en tant que nombre entier.

`word`
: Correspond à un _mot_, qui commence par une frontière de mot ; contient des caractères de a-z, A-Z, 0-9, y compris le `_` (caractère de soulignement) ; et se termine par une frontière de mot. Équivalent à `\b\w+\b` en regex.

`doubleQuotedString`
: Correspond à une chaîne de caractères entre guillemets doubles.

`singleQuotedString`
: Correspond à une chaîne de caractères entre guillemets simples.

`quotedString`
: Correspond à une chaîne de caractères entre guillemets doubles ou simples.

`uuid`
: Correspond à un UUID.

`mac`
: Correspond à une adresse MAC.

`ipv4`
: Correspond à un IPV4.

`ipv6`
: Correspond à un IPV6.

`ip`
: Correspond à une adresse IP (v4 ou v6).

`hostname`
: Correspond à un nom d'hôte.

`ipOrHost`
: Correspond à un nom d'hôte ou à une IP.

`port`
: Correspond à un numéro de port.

`data`
: Correspond à toute chaîne y compris les espaces et les nouvelles lignes. Équivalent à `.*` en regex. À utiliser lorsque aucun des modèles ci-dessus n'est approprié.

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
: Analyse un JSON correctement formaté.

`rubyhash`
: Analyse un hash Ruby correctement formaté tel que `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

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
: Extrait le motif de valeur clé et renvoie un objet JSON. Voir les [exemples de filtre clé-valeur](#key-value-or-logfmt).

`xml`
: Analyse un XML correctement formaté. Voir les [exemples de filtre XML](#parsing-xml).

`csv(headers[, separator[, quotingcharacter]])`
: Analyse des lignes CSV ou TSV correctement formatées. Voir les [exemples de filtre CSV](#parsing-csv).

`scale(factor)`
: Multiplie la valeur numérique attendue par le facteur fourni.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: Analyse une séquence de chaînes de jetons et la renvoie sous forme de tableau. Voir l'exemple [liste à tableau](#list-to-array).

`url`
: Analyse une URL et renvoie tous les membres tokenisés (domaine, paramètres de requête, port, etc.) dans un objet JSON. [Plus d'infos sur la façon d'analyser les URL][2].

[1]: /fr/logs/log_configuration/processors/#user-agent-parser
[2]: /fr/logs/log_configuration/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## Paramètres avancés

Utilisez la section **Paramètres avancés** en bas de votre processeur Grok pour analyser un attribut spécifique au lieu de l'attribut par défaut `message`, ou pour définir des règles d'aide qui réutilisent des motifs communs à travers plusieurs règles d'analyse.

### Parsing d'un attribut spécifique

Utilisez le champ **Extraire de** pour appliquer votre processeur Grok sur un attribut de texte donné au lieu de l'attribut par défaut `message`.

Par exemple, considérez un journal contenant un attribut `command.line` qui doit être analysé comme une paire clé-valeur. Extraire de `command.line` pour analyser son contenu et créer des attributs structurés à partir des données de commande.

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="Paramètres avancés avec exemple d'extraction de l'attribut command.line" style="width:80%;">}}

### Utilisation de règles d'aide pour réutiliser des modèles communs

Utilisez le champ **Règles d'aide** pour définir des jetons pour vos règles d'analyse. Les règles d'aide vous permettent de réutiliser des modèles Grok communs dans vos règles d'analyse. Ceci est utile lorsque vous avez plusieurs règles dans le même analyseur Grok qui utilisent les mêmes jetons.

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

## Exemples

Voici des exemples d'utilisation des parsers :

* [Clé valeur ou logfmt](#key-value-or-logfmt)
* [Analyse des dates](#parsing-dates)
* [Modèles alternés](#alternating-pattern)
* [Attribut optionnel](#optional-attribute)
* [JSON imbriqué](#nested-json)
* [Regex](#regex)
* [Listes et tableaux](#list-to-array)
* [Format Glog](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### Clé valeur ou logfmt

Ceci est le filtre de base clé-valeur : `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` où :

* `separatorStr` : définit le séparateur entre les clés et les valeurs. Par défaut, c'est `=`.
* `characterAllowList` : définit des caractères de valeur supplémentaires non échappés en plus de la valeur par défaut `\\w.\\-_@`. Utilisé uniquement pour les valeurs non citées (par exemple, `key=@valueStr`).
* `quotingStr` : définit les guillemets, remplaçant la détection par défaut des guillemets : `<>`, `""`, `''`.
* `delimiter` : définit le séparateur entre les différentes paires de valeurs clés (par exemple, `|` est le délimiteur dans `key1=value1|key2=value2`). Par défaut, c'est ` ` (espace normal), `,` et `;`.

Utilisez des filtres tels que **keyvalue** pour mapper plus facilement des chaînes à des attributs pour les formats keyvalue ou logfmt :

**Journal :**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**Règle :**

```text
rule %{data::keyvalue}
```

Vous n'avez pas besoin de spécifier le nom de vos paramètres car ils sont déjà contenus dans le journal.
Si vous ajoutez un attribut **extract** `my_attribute` dans votre modèle de règle, vous verrez :

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

Si `=` n'est pas le séparateur par défaut entre vos clés et vos valeurs, ajoutez un paramètre dans votre règle d'analyse avec un séparateur.

**Journal :**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**Règle :**

```text
rule %{data::keyvalue(": ")}
```

Si les journaux contiennent des caractères spéciaux dans une valeur d'attribut, comme `/` dans une URL par exemple, ajoutez-le à la liste blanche dans la règle d'analyse :

**Journal :**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**Règle :**

```text
rule %{data::keyvalue("=","/:")}
```

Autres exemples :

| **Chaîne brute**               | **Règle d'analyse**                                      | **Résultat**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key=\<valueStr>              | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| "key"="valueStr"             | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| clé:valeurStr                 | `%{data::keyvalue(":")}`                              | {"clé": "valeurStr"}                   |
| clé:"/valeurStr"              | `%{data::keyvalue(":", "/")}`                         | {"clé": "/valeurStr"}                  |
| /clé:/valeurStr               | `%{data::keyvalue(":", "/")}`                         | {"/clé": "/valeurStr"}                 |
| clé:={valeurStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"clé": "valeurStr"}                   |
| clé1=valeur1\|clé2=valeur2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"clé1": "valeur1", "clé2": "valeur2"}  |
| clé1="valeur1"\|clé2="valeur2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"clé1": "valeur1", "clé2": "valeur2"}  |

**Exemple de chaîne de citation multiple**: Lorsque plusieurs chaînes de citation sont définies, le comportement par défaut est remplacé par un caractère de citation défini.
La clé-valeur correspond toujours aux entrées sans aucun caractère de citation, peu importe ce qui est spécifié dans `quotingStr`. Lorsque des caractères de citation sont utilisés, le `characterAllowList` est ignoré car tout ce qui se trouve entre les caractères de citation est extrait.

**Journal:**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**Règle :**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**Résultat:**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**Remarque** :

* Les valeurs vides (`key=`) ou `null` valeurs (`key=null`) ne sont pas affichées dans le JSON de sortie.
* Si vous définissez un filtre *clévaleur* sur un `data` objet, et que ce filtre n'est pas respecté, alors un JSON vide `{}` est retourné (par exemple, entrée : `key:=valueStr`, règle d'analyse : `rule_test %{data::keyvalue("=")}`, sortie : `{}`).
* Définir `""` comme `quotingStr` conserve la configuration par défaut pour la citation.

### Parsing de dates

Le correspondance de date transforme votre horodatage au format EPOCH (unité de mesure **milliseconde**).

| **Chaîne brute**                       | **Règle d'analyse**                                          | **Résultat**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Jeu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Mar Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Fév/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Jeu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Jeu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Jeu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> Utilisez le `timezone` paramètre si vous effectuez vos propres localisations et que vos horodatages ne sont _pas_ en UTC.
Le format pris en charge pour les fuseaux horaires est :

* `GMT`, `UTC`, `UT` ou `Z`
* `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`. La plage maximale prise en charge est de +18:00 à -18:00 inclusivement.
* Les fuseaux horaires commençant par `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` ou `UT-`. La plage maximale prise en charge est de +18:00 à -18:00 inclusivement.
* Les identifiants de fuseaux horaires extraits de la base de données TZ. Pour plus d'informations, voir [noms de la base de données TZ][2].

**Remarque** : L'analyse d'une date **ne** définit pas sa valeur comme la date officielle du journal. Pour cela, utilisez le [Remappeur de date de journal][3] dans un processeur ultérieur.

### Modèle avec alternative

Si vous avez des journaux avec deux formats possibles qui diffèrent par un seul attribut, définissez une règle unique en alternant avec `(<REGEX_1>|<REGEX_2>)`. Cette règle est équivalente à un OU booléen.

**Journal** :

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**Règle** :
Notez que "id" est un entier et non une chaîne de caractères.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**Résultats** :<br>
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

### Attribut optionnel

Certains journaux contiennent des valeurs qui n'apparaissent qu'une partie du temps. Dans ce cas, rendez l'extraction d'attributs optionnelle avec `()?`.

**Journal** :

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Note** : Une règle ne correspondra pas si vous incluez un espace après le premier mot dans la section optionnelle.

**Résultat** :<br>
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

### JSON imbriqué

Utilisez le filtre `json` pour analyser un objet JSON imbriqué après un préfixe de texte brut :

**Journal** :

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**Règle** :

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

**Résultat** :

```json
{
  "timestamp": 1567761218000,
  "vm": "vagrant",
  "app": "program",
  "logger": {
    "thread_id": 123
  }
}
```

### Regex

**Journal** :

```text
john_1a2b3c4 connected on 11/08/2017
```

**Règle** :

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

**Résultat** :

```json
{
  "user": {
    "firstname": "john",
    "id": "1a2b3c4"
  }
}
```

### Liste en tableau

Utilisez le filtre `array([[openCloseStr, ] separator][, subRuleOrFilter)` pour extraire une liste dans un tableau dans un seul attribut. Le `subRuleOrFilter` est optionnel et accepte ces [filtres][4].

**Journal** :

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**Règle** :

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

**Résultat** :

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

**Journal** :

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**Règle** :

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**Règle utilisant `subRuleOrFilter`** :

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

###Format Glog

Les composants Kubernetes enregistrent parfois au format `glog` ; cet exemple provient de l'élément Kube Scheduler dans la bibliothèque Pipeline.

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

###Analyse XML

Le parser de XML permet de transformer des messages au format XML en JSON.

**Journal :**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**Règle :**

```text
rule %{data::xml}
```

**Résultat:**

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

**Notes** :

* Si le XML contient des balises ayant à la fois un attribut et une valeur de chaîne entre les deux balises, un attribut `value` est généré. Par exemple : `<title lang="en">Harry Potter</title>` est converti en `{"title": {"lang": "en", "value": "Harry Potter" } }`
* Les balises répétées sont automatiquement converties en tableaux. Par exemple : `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` est converti en `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

###Analyse CSV

Utilisez le filtre **CSV** pour mapper plus facilement les chaînes aux attributs lorsqu'elles sont séparées par un caractère donné (`,` par défaut).

Le filtre CSV est défini comme `csv(headers[, separator[, quotingcharacter]])` où :

* `headers` : Définit les noms des clés séparés par `,`. Les noms des clés doivent commencer par un caractère alphabétique et peuvent contenir tout caractère alphanumérique en plus de `_`.
* `separator` : Définit les séparateurs utilisés pour séparer les différentes valeurs. Un seul caractère est accepté. Par défaut : `,`. **Note** : Utilisez `tab` pour le `separator` afin de représenter le caractère de tabulation pour les TSV.
* `quotingcharacter` : Définit le caractère de citation. Un seul caractère est accepté. Par défaut : `"`

**Note** :

* Les valeurs contenant un caractère séparateur doivent être citées.
* Les valeurs citées contenant un caractère de citation doivent être échappées avec des caractères de citation. Par exemple, `""` dans une valeur citée représente `"`.
* Si le log ne contient pas le même nombre de valeurs que le nombre de clés dans l'en-tête, le parser CSV se limitera aux premières.
* Les entiers et les doubles sont automatiquement convertis si possible.

**Journal** :

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**Règle** :

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**Résultat:**

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

| **Chaîne brute**               | **Règle d'analyse**                                                         | **Résultat**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"prenom": "John", "nom":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"prenom": "John \"Da Man\"", "nom":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"prenom": "John 'Da Man'", "nom":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;prenom,nom&quot;,&quot;&#124;&quot;)}</code> | {"prenom": "John", "nom":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"cle1": "valeur1", "cle2":"valeur2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"cle1": "valeur1", "cle2":"valeur2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"cle1": "valeur1", "cle3":"valeur3"}             |
| <code>Valeur1&nbsp;&nbsp;&nbsp;&nbsp;Valeur2&nbsp;&nbsp;&nbsp;&nbsp;Valeur3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"cle1": "valeur1", "cle2": "valeur2", "cle3":"valeur3"} |

### Utilisez le filtre de données pour éliminer le texte inutile

Si vous avez un journal où, après avoir analysé ce qui est nécessaire et que vous savez que le texte après ce point peut être éliminé, vous pouvez utiliser le filtre de données pour le faire. Pour l'exemple de journal suivant, vous pouvez utiliser le `data` filtre pour éliminer le `%` à la fin.

**Journal** :

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

### Caractères de contrôle ASCII

Si vos journaux contiennent des caractères de contrôle ASCII, ils sont sérialisés lors de l'ingestion. Ceci peut être géré en échappant explicitement la valeur sérialisée dans votre analyseur grok.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /fr/logs/log_configuration/processors/#log-date-remapper
[4]: /fr/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter