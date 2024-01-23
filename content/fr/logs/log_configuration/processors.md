---
aliases:
- /fr/logs/processing/processors/
description: Parser vos logs à l'aide du processeur Grok
further_reading:
- link: /logs/log_configuration/pipelines
  tag: Documentation
  text: Découvrir les pipelines de Datadog
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
kind: documentation
title: Processeurs
---

## Présentation

Un processeur s'exécute dans un [pipeline][1] pour effectuer une action de structuration de données et générer des attributs afin d'enrichir vos logs.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Processeurs" style="width:100%" >}}

Dans les [paramètres de configuration des logs][1], vous pouvez configurer des processeurs, tels qu'un [parser Grok](#parser-grok) ou un [remappeur de dates](#remappeur-de-dates) pour faciliter l'extraction, la création et le remappage d'attributs afin d'enrichir vos logs et d'améliorer les recherches basées sur des facettes.

**Remarques** :

- Les logs structurés doivent être envoyés dans un format valide. Si la structure contient des caractères impossibles à parser, il est nécessaire de les supprimer au niveau de l'Agent avec la fonctionnalité [mask_sequences][2].

- Il est conseillé de ne pas utiliser plus de 20 processeurs par pipeline.

## Parser grok

Créez des règles grok personnalisées pour parser l'intégralité du message ou un attribut spécifique de votre événement brut. Pour en savoir plus, consultez la [section Parsing][2]. Il est conseillé de ne pas utiliser plus de 10 règles de parsing par processeur grok.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur Grok depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Parser Grok" style="width:80%;" >}}

Cliquez sur **Parse my logs** pour appliquer un ensemble de trois règles de parsing aux logs qui transitent par le pipeline sous-jacent. Vous pouvez par la suite ajuster le nom des attributs et ajouter d'autres règles pour les autres types de logs en fonction de vos besoins. Cette fonctionnalité nécessite que les logs correspondants soient indexés et qu'ils transitent réellement par le pipeline : vous pouvez désactiver ou ajuster temporairement vos filtres d'exclusion pour répondre à ces exigences.

Cliquez sur un échantillon pour le sélectionner et déclencher son évaluation par rapport à la règle de parsing. Le résultat s'affiche alors en bas de l'écran.

Jusqu'à cinq échantillons peuvent être enregistrés avec le processeur, chacun pouvant contenir jusqu'à 5 000 caractères. Tous les échantillons affichent un statut (`match` ou `no match`) qui indique si l'une des règles de parsing du parser grok correspond à l'échantillon.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser Grok :

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<RÈGLES_SUPPORT>", "match_rules": "<RÈGLES_CORRESPONDANCE>"}
}
```

| Paramètre            | Type             | Obligatoire | Description                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | Chaîne           | Oui      | Le type de processeur.                                  |
| `name`               | Chaîne           | Non       | Le nom du processeur.                                  |
| `is_enabled`         | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.  |
| `source`             | Chaîne           | Oui      | Le nom de l'attribut de log à parser. Valeur par défaut : `message`. |
| `samples`            | Tableau de chaînes | Non       | Liste d'exemples de log (5 maximum) pour ce parser grok.     |
| `grok.support_rules` | Chaîne           | Oui      | Une liste de règles de prise en charge pour votre parser grok.             |
| `grok.match_rules`   | Chaîne           | Oui      | Une liste de règles de correspondance pour votre parser Grok.               |


[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de dates de log

Lorsque Datadog reçoit des logs, il leur attribue un timestamp à l'aide des valeurs de l'un de ces attributs par défaut :

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si la date de vos logs est spécifiée dans un attribut ne figurant pas dans cette liste, utilisez le processeur de remappage de dates de log pour définir leur attribut de date comme timestamp officiel pour ces logs :

<div class="alert alert-info">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

Si vos logs n'incluent pas de timestamp dans l'un des formats ci-dessus, utilisez le processeur grok pour extraire l'heure epoch depuis le timestamp et l'ajouter dans un nouvel attribut. Le remappeur de dates utilise le nouvel attribut défini.

Pour découvrir comment un format personnalisé de date et d'heure peut être parsé dans Datadog, consultez la rubrique [Parser des dates][3].

**Remarques** :

* Les événements de log peuvent être envoyés jusqu'à 18 heures avant ou deux heures après la réalisation de l'événement.
* Depuis l'introduction de la norme ISO 8601-1:2019, le format de base est `T[hh][mm][ss]` et le format étendu est `T[hh]:[mm]:[ss]`. Les versions antérieures ne contenaient pas le T (représentant l'heure) dans les deux formats.
* Si vos logs ne comprennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut date, Datadog utilise la date de réception des logs comme timestamp.
* Si plusieurs processeurs de remappage de dates de log sont appliqués à un log donné dans le pipeline, le dernier (selon la séquence du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de remappage de dates de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Définir un attribut de date" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Date et heure dans le volet latéral du Log Explorer" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de dates de log :

```json
{
  "type": "date-remapper",
  "name": "Définir <ATTRIBUT_SOURCE> comme date officielle du log",
  "is_enabled": false,
  "sources": ["<ATTRIBUT_SOURCE_1>"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                |
| `name`       | Chaîne           | no       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | no       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau des attributs sources.                           |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de statuts de log

Utilisez le processeur de remappage de statuts pour définir des attributs en tant que statut officiel de vos logs. Par exemple, le remappeur de statuts vous permet d'ajouter à vos logs un niveau de gravité.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Gravité des logs après remappage" style="width:40%;" >}}

Chaque valeur de statut entrant est mappée comme suit :

* Les entiers de 0 à 7 mappent vers les [normes de gravité Syslog][4].
* Les chaînes de caractères commençant par **emerg** ou **f** (insensible à la casse) mappent vers **emerg (0)**.
* Les chaînes de caractères commençant par **a** (insensible à la casse) mappent vers **alert (1)**.
* Les chaînes de caractères commençant par **c** (insensible à la casse) mappent vers **critical (2)**.
* Les chaînes de caractères commençant par **e** (insensible à la casse) et ne correspondant pas à `emerg` mappent vers **error (3)**.
* Les chaînes de caractères commençant par **w** (insensible à la casse) mappent vers **warning (4)**.
* Les chaînes de caractères commençant par **n** (insensible à la casse) mappent vers **notice (5)**.
* Les chaînes de caractères commençant par **i** (insensible à la casse) mappent vers **info (6)**.
* Les chaînes de caractères commençant par **d**, **trace** ou **verbose** (insensible à la casse) mappent vers **debug (7)**.
* Les chaînes de caractères commençant par **o** ou **s**, ou correspondant à **OK** ou **Success** (insensible à la casse) mappent vers **OK**
* Toutes les autres chaînes de caractères mappent vers **info (6)**.

**Remarque** : si plusieurs processeurs de remappage de statuts de log sont appliqués à un log donné dans le pipeline, seul le premier (selon la séquence du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de remappage de statuts de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Remappage de la gravité des logs" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de statuts de log :

```json
{
  "type": "status-remapper",
  "name": "Définir <ATTRIBUT_SOURCE> en tant que statut officiel du log",
  "is_enabled": true,
  "sources": ["<ATTRIBUT_SOURCE>"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau des attributs sources.                           |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de services

Le processeur de remappage de services définit pour vos logs un ou plusieurs attributs en tant que service officiel.

**Remarque** : si plusieurs processeurs de remappage de services sont appliqués à un log donné dans le pipeline, seul le premier (selon la séquence du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de remappage de services de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Processeur de remappage de services" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de services de log :

```json
{
  "type": "service-remapper",
  "name": "Définir <ATTRIBUT_SOURCE> en tant que service de log officiel",
  "is_enabled": true,
  "sources": ["<ATTRIBUT_SOURCE>"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau des attributs sources.                           |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de messages de log

`message` est un attribut clé dans Datadog. Sa valeur est affichée dans la colonne **Content** du Log Explorer et sert à contextualiser vos logs. Vous pouvez utiliser la barre de recherche pour trouver un log en fonction de son message.

Utilisez le processeur de remappage de messages de log pour définir un ou plusieurs attributs en tant que message officiel pour vos logs. Définissez plusieurs attributs afin d'utiliser un autre attribut disponible si jamais le premier n'existe pas. Par exemple, si les attributs de message définis sont `attribute1`, `attribute2` et `attribute3`, et que `attribute1` n'existe pas, alors `attribute2` est utilisé. De même, si `attribute2` n'existe pas, `attribute3` est utilisé.

Pour définir des attributs de message, commencez par utiliser le [processeur de générateur de chaînes](#processeur-de-generateur-de-chaines) pour créer un nouvel attribut de chaîne pour chacun des attributs que vous voulez utiliser. Utilisez ensuite le remappeur de messages de log pour remapper les attributs de chaîne comme message.

**Remarque** : si plusieurs processeurs de remappage de messages de log sont appliqués à un log donné dans le pipeline, seul le premier (selon la séquence du pipeline) est pris en compte.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de remappage de messages de log depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Processeur de remappage de messages" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint de l'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de messages de log :

```json
{
  "type": "message-remapper",
  "name": "Définir <ATTRIBUT_SOURCE> en tant que message officiel du log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources`    | Tableau de chaînes | Oui      | Tableau des attributs sources. Valeur par défaut : `msg`.            |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur

Le processeur effectue un remappage de n'importe quel attribut ou tag source vers un autre attribut ou tag cible. Vous pouvez par exemple remapper `user` vers `firstname` pour cibler vos logs dans le Log Explorer : 

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="Attribut après remappage" style="width:60%;">}}

Les contraintes de nom du tag ou de l'attribut sont expliquées dans la [documentation relative aux tags et aux attributs][5]. Certaines contraintes supplémentaires s'appliquent, car les caractères `:` ou `,` ne sont pas autorisés dans le nom du tag ou de l'attribut cible.

Si la cible du remappeur est un attribut, le remappeur peut également tenter de convertir l'attribut en un attribut d'un autre type (`String`, `Integer` ou `Double`). Si la conversion est impossible, le type d'attribut reste le même.

**Remarque** : pour le type `Double`, vous devez utiliser le caractère `.` pour séparer les décimales.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de remappage depuis la [page **Pipelines**][1]. Dans l'exemple ci-dessous, un remappage est effectué depuis `user` vers `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Processeur de remappage d'attributs" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur :

```json
{
  "type": "attribute-remapper",
  "name": "Convertir <ATTRIBUT_SOURCE> en <ATTRIBUT_CIBLE>",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<ATTRIBUT_SOURCE>"],
  "target": "<ATTRIBUT_CIBLE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Paramètre              | Type             | Obligatoire | Description                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | Chaîne           | Oui      | Le type de processeur.                                                         |
| `name`                 | Chaîne           | Non      | Le nom du processeur.                                                         |
| `is_enabled`           | Booléen          | Non      | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                          |
| `source_type`          | Chaîne           | Non      | Définit si les sources sont de type `attribute` ou `tag`. Valeur par défaut : `attribute`. |
| `sources`              | Tableau de chaînes | Oui      | Tableau des tags ou attributs sources.                                             |
| `target`               | Chaîne           | Oui      | Le nom final de l'attribut ou du tag pour le remappage des sources.                           |
| `target_type`          | Chaîne           | Non      | Définit si la cible est de type `attribute` ou `tag`. Valeur par défaut : `attribute`.    |
| `target_format`        | Chaîne           | Non      | Définit si la valeur de l'attribut doit être convertie en valeur d'un autre type. Valeurs possibles : `auto`, `string` ou `integer`. Valeur par défaut : `auto`. Lorsque ce paramètre est défini sur `auto`, aucune conversion n'est effectuée.  |
| `preserve_source`      | Booléen          | Non      | Indique si l'élément source remappé doit être préservé ou supprimé. Valeur par défaut : `false`.               |
| `override_on_conflict` | Booléen          | Non      | Indique si l'élément cible est remplacé ou non si celui-ci est déjà défini. Valeur par défaut : `false`.            |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Parser d'URL

Le parser d'URL extrait les paramètres de requête et d'autres paramètres importants à partir d'une URL. Une fois ce processeur configuré, il génère les attributs suivants :

{{< img src="logs/processing/processors/url_processor.png" alt="Processeur d'URL" style="width:80%;" >}}

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de parsing d'URL depuis la [page **Pipelines**][1] :

{{< img src="logs/processing/processors/url_processor.png" alt="Carré du processeur d'URL" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Parser l'URL depuis l'attribut http.url.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Paramètre    | Type             | Obligatoire | Description                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                                                                               |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                                                                               |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                |
| `sources`    | Tableau de chaînes | Non       | Tableau des attributs sources. Valeur par défaut : `http.url`.                                                                      |
| `target`     | Chaîne           | Oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## Parser de user-agent

Le parser de user-agent reçoit un attribut `useragent` et extrait le système d'exploitation, le navigateur, l'appareil et d'autres données utilisateur. Une fois ce processeur configuré, il génère les attributs suivants :

{{< img src="logs/processing/processors/useragent_processor.png" alt="Processeur de user-agent" style="width:80%;">}}

**Remarque** : si vos logs comprennent des user-agents encodés (c'est par exemple le cas des logs IIS), configurez ce processeur de façon à ce qu'il **décode l'URL** avant son parsing.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de user-agent depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Carré du processeur de user-agent" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser de user-agent :

```json
{
  "type": "user-agent-parser",
  "name": "Parse <ATTRIBUT_SOURCE> pour en extraire toutes les informations sur le User-Agent",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Paramètre    | Type             | Obligatoire | Description                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                                                                                      |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                                                                                      |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                      |
| `sources`    | Tableau de chaînes | Non       | Tableau des attributs sources. Valeur par défaut : `http.useragent`.                                                                      |
| `target`     | Chaîne           | Oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `http.useragent_details`. |
| `is_encoded` | Booléen          | Non       | Définit si l'attribut source est encodé dans une URL ou non. Valeur par défaut  : `false`.                                                     |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur de catégories

Utilisez le processeur de catégories pour ajouter un nouvel attribut (sans espace ni caractère spécial dans son nom) à un log correspondant à votre requête de recherche.
Les catégories vous permettent également de créer des groupes à des fins d'analyse (tels que des groupes d'URL, des groupes de machines, des environnements et des compartiments de temps de réponse).

**Remarques** :

* La syntaxe de la requête est identique à celle de la barre de recherche du [Log Explorer][6]. La requête peut s'appliquer à n'importe quel tag ou attribut de log, qu'il s'agisse ou non d'une facette. Votre requête peut également contenir des wildcards.
* Une fois que l'une des requêtes du processeur a renvoyé un log, celle-ci s'arrête. Assurez-vous de spécifier les requêtes dans l'ordre adéquat si un log peut potentiellement correspondre à plusieurs requêtes.
* Les catégories doivent avoir un nom unique.
* Une fois le processeur de catégories défini, vous pouvez mapper des catégories à des statuts de log à l'aide du [remappeur de statuts de log](#remappeur-de-statuts-de-log).

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de catégories depuis la [page **Pipelines**][1]. Par exemple, pour catégoriser vos logs d'accès Web en fonction de la plage de valeurs du code de statut (« OK » pour un code de réponse entre 200 et 299, « Notice » pour un code de réponse entre 300 et 399, etc.), ajoutez le processeur suivant :

{{< img src="logs/log_configuration/processor/category_processor.png" alt="Processeur de catégories" style="width:80%;" >}}

Vous obtenez alors le résultat suivant :

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="Résultat du processeur de catégories" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de catégories :

```json
{
  "type": "category-processor",
  "name": "Attribuer une valeur personnalisée à l'attribut <ATTRIBUT_CIBLE>",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<REQUÊTE_1>"}, "name": "<VALEUR_À_ATTRIBUER_1>"},
    {"filter": {"query": "<REQUÊTE_2>"}, "name": "<VALEUR_À_ATTRIBUER_2>"}
  ],
  "target": "<ATTRIBUT_CIBLE>"
}
```

| Paramètre    | Type            | Obligatoire | Description                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne          | Oui      | Le type de processeur.                                                                                     |
| `name`       | Chaîne          | Non       | Le nom du processeur.                                                                                     |
| `is_enabled` | Booléen         | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                      |
| `categories` | Tableau d'objets | Oui      | Un tableau de filtres pour inclure ou exclure un log et son attribut `name` correspondant pour attribuer une valeur personnalisée au log. |
| `target`     | Chaîne          | Oui      | Le nom de l'attribut cible dont la valeur est définie par la catégorie correspondante.                              |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur arithmétique

Utilisez le processeur arithmétique pour ajouter un nouvel attribut (sans espace ni caractère spécial dans son nom) à un log avec le résultat de la formule fournie. Cela vous permet de remapper différents attributs de temps avec différentes unités vers un seul attribut, ou d'effectuer des opérations sur des attributs dans le même log.

La formule du processeur arithmétique peut inclure des parenthèses et les opérateurs arithmétiques de base : `-`, `+`, `*` et `/`.

Par défaut, le calcul est ignoré s'il manque un attribut. Sélectionnez *Replace missing attribute by 0* pour remplacer automatiquement les valeurs d'attribut manquantes par « 0 » et ainsi garantir la réalisation du calcul.

**Remarques** :

* Un attribut est considéré comme manquant s'il est introuvable dans les attributs du log, ou s'il ne peut pas être converti en nombre.
* L'opérateur `-` doit être séparé par une espace dans la formule, car il peut également être présent dans les noms d'attributs.
* Si l'attribut cible existe déjà, il est remplacé par le résultat de la formule.
* Les résultats sont arrondis à la 9e décimale. Par exemple, si le résultat de la formule est `0.1234567891`, la valeur stockée pour l'attribut est alors `0.123456789`.
* Si vous souhaitez modifier l'échelle d'une unité de mesure, utilisez le filtre scale.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur arithmétique depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Processeur arithmétique" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur arithmétique :

```json
{
  "type": "arithmetic-processor",
  "name": "<NOM_PROCESSEUR>",
  "is_enabled": true,
  "expression": "<OPÉRATION_ARITHMÉTIQUE>",
  "target": "<ATTRIBUT_CIBLE>",
  "is_replace_missing": false
}
```

| Paramètre            | Type    | Obligatoire | Description                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Chaîne  | Oui      | Le type de processeur.                                                                                                                       |
| `name`               | Chaîne  | Non       | Le nom du processeur.                                                                                                                       |
| `is_enabled`         | Booléen | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                                       |
| `expression`         | Chaîne  | Oui      | Une opération arithmétique entre un ou plusieurs attributs de log.                                                                                     |
| `target`             | Chaîne  | Oui      | Le nom de l'attribut qui contient le résultat de l'opération arithmétique.                                                                  |
| `is_replace_missing` | Booléen | Non       | Définir sur `true` pour remplacer tous les attributs manquants dans `expression` par 0. Définir sur `false` pour annuler l'opération si un attribut est manquant. Valeur par défaut : `false`. |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur de générateur de chaînes

Utilisez le processeur de générateur de chaînes pour ajouter un nouvel attribut (sans espace ni caractères spéciaux) à un log avec le résultat du modèle fourni. Cela permet d'agréger différents attributs ou chaînes brutes au sein d'un attribut unique.

Le modèle est défini par du texte brut et des blocs, avec la syntaxe `%{attribute_path}`.

**Remarques** :

* Ce processeur accepte uniquement les attributs avec des valeurs ou un tableau de valeurs dans le bloc (voir les exemples de la rubrique Interface utilisateur ci-dessous).
* Si un attribut ne peut pas être utilisé (s'il s'agit d'un objet ou d'un tableau d'objets), il est remplacé par une chaîne vide ou toute l'opération est ignorée, selon l'option choisie.
* Si l'attribut cible existe déjà, il est remplacé par le résultat du modèle.
* Les résultats d'un modèle ne peuvent pas comporter plus de 256 caractères.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de générateur de chaînes depuis la [page **Pipelines**][1] :

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="Processeur de générateur de chaînes" style="width:80%;">}}

Pour le log suivant, utilisez le modèle `Request %{http.method} %{http.url} was answered with response %{http.status_code}` pour renvoyer un résultat. Exemple :


```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "Marie", "last_name": "Martin"},
    {"first_name": "Arnaud", "last_name": "Robert"}
  ]
}
```

Cela renvoie le résultat suivant :

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Remarque** : `http` est un objet et ne peut pas être utilisé dans un bloc (`%{http}` fails), tandis que `%{http.method}`, `%{http.status_code}` ou `%{http.url}` renvoie la valeur correspondante. Des blocs peuvent être utilisés dans des tableaux de valeurs ou dans un attribut spécifique d'un tableau.

* Par exemple, l'ajout du bloc `%{array_ids}` renvoie ce qui suit :

   ```text
   123,456,789
   ```

* `%{array_users}` ne renvoie aucun résultat, car il s'agit d'une liste d'objets. Toutefois, `%{array_users.first_name}` renvoie la liste des `first_name` contenus dans le tableau :

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de générateur de chaînes :

```json
{
  "type": "string-builder-processor",
  "name": "<NOM_PROCESSEUR>",
  "is_enabled": true,
  "template": "<MODÈLE_GÉNÉRATEUR_CHAÎNES>",
  "target": "<ATTRIBUT_CIBLE>",
  "is_replace_missing": true
}
```

| Paramètre            | Type    | Obligatoire | Description                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | Chaîne  | Oui      | Le type de processeur.                                                                                                                            |
| `name`               | Chaîne  | Non       | Le nom du processeur.                                                                                                                            |
| `is_enabled`         | Booléen | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                                          |
| `template`           | Chaîne  | Oui      | Une formule avec un ou plusieurs attributs et du texte brut.                                                                                               |
| `target`             | Chaîne  | Oui      | Le nom de l'attribut qui contient le résultat du modèle.                                                                               |
| `is_replace_missing` | Booléen | Non       | Si ce paramètre est défini sur `true`, il remplace tous les attributs manquants dans `template` par une chaîne vide. S'il est défini sur `false`, l'opération est annulée en cas d'attribut manquant. Valeur par défaut : `false`. |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Parser GeoIP

Le parser GeoIP reçoit un attribut d'adresse IP et extrait des informations sur le continent, le pays, la sous-division ou la ville (le cas échéant) dans le chemin de l'attribut cible.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="Processeur GeoIP" style="width:80%;">}}

La plupart des éléments contiennent un attribut `name` et `iso_code` (ou `code` pour le continent). L'attribut `subdivision` est le premier niveau de sous-division que le pays utilise, comme les États pour les États-Unis ou les départements pour la France.

Par exemple, le parseur geoIP extrait la localisation à partir de l'attribut `network.client.ip` et la stocke dans l'attribut `network.client.geoip` :

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="Exemple de GeoIP" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser GeoIP :

```json
{
  "type": "geo-ip-parser",
  "name": "Parser les éléments de géolocalisation depuis l'attribut network.client.ip.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| Paramètre    | Type             | Obligatoire | Description                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                                                                                    |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                                                                                    |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                     |
| `sources`    | Tableau de chaînes | Non       | Tableau des attributs sources. Valeur par défaut : `network.client.ip`.                                                                  |
| `target`     | Chaîne           | Oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `network.client.geoip`.  |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Processeur de correspondances

Utilisez le processeur de correspondances pour définir un mappage entre un attribut de log et une valeur lisible. Ce mappage est enregistré dans une [table de référence][7] ou dans le tableau de mappage des processeurs.

Ce processus vous permet par exemple de mapper un ID de service interne à un nom de service plus facilement lisible. Vous pouvez également vous en servir pour vérifier si l'adresse MAC qui vient d'essayer de se connecter à votre environnement de production fait partie d'une liste de machines volées.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Le processeur de correspondances effectue les opérations suivantes :

* Il vérifie si le log actuel contient l'attribut source.
* Il vérifie si l'attribut source est présent dans la table de mappage.
  * S'il est présent, le processeur crée l'attribut source avec la valeur correspondante dans la table.
  * S'il ne parvient pas à trouver la valeur dans la table de mappage, il crée un attribut cible avec la valeur par défaut définie dans le champ `fallbackValue` (facultatif). Vous pouvez saisir manuellement une liste de paires `source_key,target_value` pairs ou importer un fichier CSV dans l'onglet **Manual Mapping**. 

    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Processeur de correspondances" style="width:80%;">}}

    La limite de poids de la table de mappage est de 100 Ko. Cette limite s'applique à l'ensemble des processeurs de correspondances sur la plateforme. Les tables de référence prennent toutefois en charge des fichiers plus volumineux.

  * Si le processeur ne parvient pas à trouver la valeur dans la table de mappage, il crée un attribut cible avec la valeur de la table de référence (facultatif). Vous pouvez sélectionner une valeur pour une [table de référence][101] dans l'onglet **Reference Table**.

    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Processeur de correspondances" 
    style="width:80%;">}}


[101]: /fr/integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de correspondances :

```json
{
  "type": "lookup-processor",
  "name": "<NOM_PROCESSEUR>",
  "is_enabled": true,
  "source": "<ATTRIBUT_SOURCE>",
  "target": "<ATTRIBUT_CIBLE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<VALEUR_CIBLE_PARDÉFAUT>"
}
```

| Paramètre        | Type             | Obligatoire | Description                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | Chaîne           | Oui      | Le type de processeur.                                                                                                                                                   |
| `name`           | Chaîne           | Non       | Le nom du processeur.                                                                                                                                                   |
| `is_enabled`     | Booléen          | Oui      | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                                                                     |
| `source`         | Chaîne           | Oui      | L'attribut source utilisé pour la mise en correspondance.                                                                                                                             |
| `target`         | Chaîne           | Oui      | Le nom de l'attribut qui contient la valeur correspondante dans la liste de mappage ou la valeur `default_lookup` si la valeur correspondante ne figure pas dans la liste de mappage.                                |
| `lookup_table`   | Tableau de chaînes | Oui      | Table de mappage contenant les valeurs des attributs sources et les valeurs des attributs cibles associées. Format :  [ "source_key1,target_value1", "source_key2,target_value2" ]. |
| `default_lookup` | Chaîne           | Non       | Valeur à définir pour l'attribut cible si la valeur source ne figure pas dans la liste.                                                                                          |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remappeur de traces

Il existe deux façons d'améliorer la corrélation entre les traces et les logs d'application :

1. Consultez la documentation relative à l'[injection d'un ID de trace dans les logs d'application][8]. Par défaut, les intégrations de log gèrent toutes les autres étapes de configuration.

2. Utilisez le processeur de remappage de traces pour définir un attribut de log comme son ID de trace associé.

{{< tabs >}}
{{% tab "Interface utilisateur" %}}

Définissez le processeur de remappage de traces depuis la [page **Pipelines**][1]. Saisissez le chemin de l'attribut d'ID de trace dans le carré du processeur, comme suit :

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Processeur d'ID de trace" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de traces :

```json
{
  "type": "trace-id-remapper",
  "name": "Définir dd.trace_id en tant qu'ID de trace officiel associé à ce log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | Chaîne           | Oui      | Le type de processeur.                                 |
| `name`       | Chaîne           | Non       | Le nom du processeur.                                 |
| `is_enabled` | Booléen          | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources`    | Tableau de chaînes | Non       | Tableau des attributs sources. Valeur par défaut : `dd.trace_id`.    |

[1]: /fr/api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/log_configuration/pipelines/
[2]: /fr/logs/log_configuration/parsing/
[3]: /fr/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /fr/logs/log_collection/?tab=host#attributes-and-tags
[6]: /fr/logs/search_syntax/
[7]: /fr/integrations/guide/reference-tables/
[8]: /fr/tracing/other_telemetry/connect_logs_and_traces/