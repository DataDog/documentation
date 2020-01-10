---
title: Processeurs
kind: documentation
description: Analyser vos logs à l'aide du processeur Grok
further_reading:
  - link: logs/processing/pipelines
    tag: Documentation
    text: Découvrir les pipelines de Datadog
  - link: logs/logging_without_limits
    tag: Documentation
    text: Collecte illimitée de logs
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
---
{{< img src="logs/processing/processors/processors_overview.png" alt="log d'origine" >}}

Un processeur exécute dans un [pipeline][1] une action de structuration de données sur un log ([remappage d'un attribut](#remapper), [parsing Grok](#parser-grok), etc.).

Les différents types de processeurs sont expliqués ci-dessous.

## Parser grok

Créez des règles grok personnalisées pour parser l'intégralité du message ou un attribut spécifique de votre événement brut. Pour en savoir plus, consultez la [section sur le parsing][2].

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur Grok depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/parser.png" alt="Parser"  style="width:80%;" >}}


[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser Grok :

```json
{
"type": "grok-parser",
"name": "Parsing du message de log",
"is_enabled": true,
"source": "message",
"samples": [
    "sample log 1",
    "sample log 2"
    ],
"grok": {
    "support_rules": "<RÈGLES_PRISEENCHARGE>",
    "match_rules": "<RÈGLES_CORRESPONDANCE>"
    }
}
```

| Paramètre            | Type             | Obligatoire | Description                                             |
| ------               | -----            | -------- | -----                                                   |
| `type`               | Chaîne           | oui      | Le type du processeur.                                  |
| `name`               | Chaîne           | non       | Le nom du processeur.                                  |
| `is_enabled`         | Booléen          | non       | Indique si les processeurs sont activés ou non. Valeur par défaut : `false`.  |
| `source`             | Chaîne           | oui      | Le nom de l'attribut de log à parser. Valeur par défaut : `message`. |
| `samples`            | Tableau de chaînes | non       | Liste des logs d'échantillon pour ce parser Grok.               | 
| `grok.support_rules` | Chaîne           | oui      | Une liste de règles de prise en charge pour votre parser grok.             |
| `grok.match_rules`   | Chaîne           | oui      | Une liste de règles de correspondance pour votre parser Grok.               |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

Jusqu'à cinq échantillons peuvent être enregistrés avec le processeur. Chaque peut contenir jusqu'à 5 000 caractères.
Tous les échantillons sont dotés d'un statut (`match` or `no match`) qui indique si l'une des règles de parsing du parser Grok correspond à l'échantillon.
Cliquez sur un échantillon pour le sélectionner et déclencher son évaluation par rapport à la règle de parsing. Cela affiche le résultat en bas de l'écran.

## Remappeur de dates de log

Lorsque Datadog reçoit des logs, il leur attribue un timestamp à l'aide des valeurs de l'un de ces attributs par défaut :

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si la date de vos logs est spécifiée dans un attribut ne figurant pas dans cette liste, utilisez le processeur de remappage de dates de logs pour définir leur attribut date comme timestamp officiel pour ces logs :

<div class="alert alert-info">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

**Remarques** :

* Si vos logs ne comprennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut date, Datadog utilise la date de réception des logs comme timestamp.
* Si plusieurs processeurs de remappage de dates de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de dates de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Remappeur de dates de log"  style="width:80%;" >}}

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
| ------       | -----            | -------- | -----                                                 |
| `type`       | Chaîne           | oui      | Le type du processeur.                                |
| `name`       | Chaîne           | non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources`    | Tableau de chaînes | oui      | Tableau des attributs sources.                           |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de statuts de log

Utilisez ce processeur si vous souhaitez définir des attributs en tant que statut officiel. Par exemple, il est possible de transformer ce log :

{{< img src="logs/processing/processors/log_pre_severity.png" alt="Log avant remappage de la sévérité "  style="width:40%;">}}

En ce log :

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Log après remappage de la sévérité bis"  style="width:40%;" >}}

Chaque valeur de statut entrant est mappée comme suit :

* Les entiers de 0 à 7 mappent vers les [normes de sévérité Syslog][3].
* Les chaînes de caractères commençant par **emerg** ou **f** (insensible à la casse) mappent vers **emerg (0)**.
* Les chaînes de caractères commençant par **a** (insensible à la casse) mappent vers **alert (1)**.
* Les chaînes de caractères commençant par **c** (insensible à la casse) mappent vers **critical (2)**.
* Les chaînes de caractères commençant par **err** (insensible à la casse) mappent vers **error (3)**.
* Les chaînes de caractères commençant par **w** (insensible à la casse) mappent vers **warning (4)**.
* Les chaînes de caractères commençant par **n** (insensible à la casse) mappent vers **notice (5)**.
* Les chaînes de caractères commençant par **i** (insensible à la casse) mappent vers **info (6)**.
* Les chaînes de caractères commençant par **d**, **trace** ou **verbose** (insensible à la casse) mappent vers **debug (7)**.
* Les chaînes de caractères commençant par **o** ou correspondant à **OK** ou **Success** (insensible à la casse) mappent vers **OK**.
* Toutes les autres chaînes de caractères mappent vers **info (6)**.

**Remarque** : si plusieurs processeurs de remappage du statut de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de statut de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Carré du processeur de remappage de la sévérité"  style="width:80%;" >}}

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
| ------       | -----            | -------- | -----                                                 |
| `type`       | Chaîne           | oui      | Le type du processeur.                                |
| `name`       | Chaîne           | non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources`    | Tableau de chaînes | oui      | Tableau des attributs sources.                           |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de services

Utilisez ce processeur si vous souhaitez définir au moins un attribut en tant que service officiel.

**Remarque** : si plusieurs processeurs de remappage de services peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de services de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/service_remapper_processor_tile.png" alt="Carré du processeur de remappage de services"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de statut de log :

```json
{
   "type": "service-remapper",
   "name": "Définir <ATTRIBUT_SOURCE> en tant que service de log officiel",
   "is_enabled": true,
   "sources": ["<ATTRIBUT_SOURCE>"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                           |
| ------       | -----            | -------- | -----                                                 |
| `type`       | Chaîne           | oui      | Le type du processeur.                                |
| `name`       | Chaîne           | non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources`    | Tableau de chaînes | oui      | Tableau des attributs sources.                           |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de messages de log

Le message est un attribut clé dans Datadog. Il est affiché dans la colonne de message du Log Explorer et vous permet d'effectuer des recherches en texte intégral. Utilisez ce processeur pour définir un ou plusieurs attributs en tant que message de log officiel.

**Remarque** : si plusieurs processeurs de remappage de messages de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de messages de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/message_processor.png" alt="Processeur de remappage de messages"  style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de messages de log :

```json
{
   "type": "message-remapper",
   "name": "Définir <ATTRIBUT_SOURCE> en tant que message officiel du log",
   "is_enabled": true,
   "sources": ["msg"]
}
```

| Paramètre    | Type             | Obligatoire | Description                                           |
| ------       | -----            | -------- | -----                                                 |
| `type`       | Chaîne           | oui      | Le type du processeur.                                |
| `name`       | Chaîne           | non       | Le nom du processeur.                                |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources`    | Tableau de chaînes | oui      | Tableau des attributs sources. Valeur par défaut : `msg`            |


[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur

Le processeur effectue un remappage de n'importe quel attribut ou tag source vers un autre attribut ou tag cible. Il peut transformer ce log :

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribut avant remappage "  style="width:40%;">}}

En ce log :

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribut après remappage "  style="width:40%;">}}

Les contraintes de nom du tag ou de l'attribut sont expliquées dans les [recommandations relatives aux tags][4]. Certaines contraintes supplémentaires sont appliquées, car les caractères `:` ou `,` ne sont pas autorisés dans le nom du tag ou de l'attribut cible.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage depuis la [page de configuration des logs Datadog][1]. Dans l'exemple ci-dessous, il effectue un remappage de `user` vers `user.firstname`.

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Carré du processeur de remappage d'attribut"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur :

```json
{
    "type": "attribute-remapper",
    "name": "Remapper <ATTRIBUT_SOURCE> en <ATTRIBUT_CIBLE>",
    "is_enabled": true,
    "source_type": "attribute",
    "sources": ["<ATTRIBUT_SOURCE>"],
    "target": "<ATTRIBUT_CIBLE>",
    "target_type": "tag",
    "preserve_source": false,
    "override_on_conflict": false
}
```

| Paramètre              | Type             | Obligatoire | Description                                                                    |
| ------                 | -----            | -------- | -----                                                                          |
| `type`                 | Chaîne           | oui      | Le type du processeur.                                                         |
| `name`                 | Chaîne           | non       | Le nom du processeur.                                                         |
| `is_enabled`           | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                          |
| `source_type`          | Chaîne           | non       | Définit si les sources sont de type `attribute` ou `tag`. Valeur par défaut : `attribute` |
| `sources`              | Tableau de chaînes | oui      | Tableau des tags ou attributs sources.                                             |
| `target`               | Chaîne           | oui      | Le nom de l'attribut ou du tag final pour le remappage des sources.                           |
| `target_type`          | Chaîne           | non       | Définit si la cible est de type `attribute` ou `tag`. Valeur par défaut : `attribute`    |
| `preserve_source`      | Booléen          | non       | Indique si l'élément source remappé doit être préservé ou supprimé. Valeur par défaut : `false`               |
| `override_on_conflict` | Booléen          | non       | Indique si l'élément cible est remplacé ou non si celui-ci est déjà défini. Valeur par défaut : `false`.            |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Parser d'URL

Ce processeur extrait les paramètres de requête et d'autres paramètres importants à partir d'une URL. Une fois configuré, les attributs suivants sont obtenus :

{{< img src="logs/processing/processors/url_processor.png" alt="Processeur d'URL"  style="width:80%;" >}}

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de parsing d'URL depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Carré du processeur d'URL"  style="width:80%;" >}}

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
| ------       | -----            | -------- | -----                                                                                                                |
| `type`       | Chaîne           | oui      | Le type du processeur.                                                                                               |
| `name`       | Chaîne           | non       | Le nom du processeur.                                                                                               |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                                                                |
| `sources`    | Tableau de chaînes | non       | Tableau des attributs sources. Valeur par défaut : `http.url`.                                                                      |
| `target`     | Chaîne           | oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## Parser de user-agent

Le parser de user-agent reçoit un attribut user-agent et extrait le système d'exploitation, le navigateur, l'appareil et d'autres données utilisateur. Il reconnaît les principaux bots comme Google Bot, Yahoo Slurp et Bing. Une fois configuré, les attributs suivants sont obtenus :

{{< img src="logs/processing/processors/useragent_processor.png" alt="Processeur de user-agent"  style="width:80%;">}}

**Remarque** : si vos logs comprennent des user-agents encodés (c'est par exemple le cas des logs IIS), configurez ce processeur de façon à ce qu'il **décode l'URL** avant son parsing.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de user-agent depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Carré du processeur de user-agent"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser de user-agent :

```json
{
    "type": "user-agent-parser",
    "name": "Analyse <ATTRIBUT_SOURCE> pour extraire toutes les informations sur le User-Agent",
    "is_enabled": true,
    "sources": ["http.useragent"],
    "target": "http.useragent_details",
    "is_encoded": false
}
```

| Paramètre       | Type             | Obligatoire | Description                                                                                                                |
| ------          | -----            | -------- | -----                                                                                                                      |
| `type`          | Chaîne           | oui      | Le type du processeur.                                                                                                     |
| `name`          | Chaîne           | non       | Le nom du processeur.                                                                                                     |
| `is_enabled`    | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                      |
| `sources`       | Tableau de chaînes | non       | Tableau des attributs sources. Valeur par défaut : `http.useragent`.                                                                      |
| `target`        | Chaîne           | oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `http.useragent_details`. |
| `is_encoded`    | Booléen          | non       | Définit si l'attribut source est encodé dans une URL ou non. Valeur par défaut : `false`.                                                     |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Processeur de catégories

Utilisez le processeur de catégories pour ajouter un nouvel attribut (sans espace ni caractère spécial dans le nom du nouvel attribut) à un log correspondant à votre requête de recherche.
Utilisez les catégories pour créer des groupes à des fins d'analyse (tels que des groupes d'URL, des groupes de machines, des environnements et des compartiments de temps de réponse).

**Remarques** :

* La syntaxe de la requête est identique à celle de la barre de recherche du [Logs Explorer][5]. La requête peut être effectuée sur n'importe quel tag ou attribut de log, qu'il s'agisse d'une facette ou non. Votre requête peut également contenir des wildcards.
* Une fois que l'une des requêtes du processeur a renvoyé un log, celle-ci s'arrête. Assurez-vous de spécifier les requêtes dans l'ordre adéquat si un log correspond à plusieurs requêtes.
* Les catégories doivent avoir un nom unique.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de catégories depuis la [page de configuration des logs Datadog][1]. Par exemple, pour catégoriser vos logs d'accès Web en fonction de la plage de valeurs du code de statut (2xx pour un code de réponse entre 200 et 299, 3xx pour un code de réponse entre 300 et 399, etc.), ajoutez ce processeur :

{{< img src="logs/processing/processors/category_processor.png" alt="Processeur de catégories"  style="width:80%;" >}}

Cela génère le résultat suivant :

{{< img src="logs/processing/processors/category_processor_result.png" alt="Résultat du processeur de catégories"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de catégories :

```json
{
   "type": "category-processor",
   "name": "Attribuer une valeur personnalisée à l'attribut <ATTRIBUT_CIBLE> ",
   "is_enabled": true,
   "categories": [
      {
         "filter": {
            "query": "<REQUÊTE_1>"
         },
         "name": "<VALEUR_À_ATTRIBUER_1>"
      },
      {
         "filter": {
            "query": "<REQUÊTE_2>"
         },
         "name": "<VALEUR_À_ATTRIBUER_2>"
      }
   ],
   "target": "<ATTRIBUT_CIBLE>"
}
```

| Paramètre    | Type            | Obligatoire | Description                                                                                                |
| ------       | -----           | -------- | -----                                                                                                      |
| `type`       | Chaîne          | oui      | Le type du processeur.                                                                                     |
| `name`       | Chaîne          | non       | Le nom du processeur.                                                                                     |
| `is_enabled` | Booléen         | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                                                      |
| `categories` | Tableau d'objets | oui      | Un tableau de filtres pour inclure ou exclure un log et son attribut `name` correspondant pour attribuer une valeur personnalisée au log. |
| `target`     | Chaîne          | oui      | Nom de l'attribut cible dont la valeur est définie par la catégorie correspondante.                              |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

Une fois le processeur de catégories défini, vous pouvez mapper les catégories au statut de log à l'aide du [remappeur de statuts de log][6].

## Processeur arithmétique

Utilisez le processeur arithmétique pour ajouter un nouvel attribut (sans espace ni caractère spécial dans le nouveau nom de l'attribut) à un log avec le résultat de la formule fournie.
Cela vous permet de remapper différents attributs de temps avec différentes unités vers un seul attribut, ou de calculer des opérations sur des attributs dans le même log.

Cette formule peut utiliser des parenthèses et les opérateurs arithmétiques de base : `-`, `+`, `*` et `/`.

Par défaut, le calcul est ignoré s'il manque un attribut. Sélectionnez « Replace missing attribute by 0 » pour remplacer automatiquement les valeurs d'attribut manquantes par 0 et ainsi garantir la réalisation du calcul.
Un attribut est considéré comme manquant s'il est introuvable dans les attributs de log, ou s'il ne peut pas être converti en chiffre.

**Remarques :**

* L'opérateur `-` doit être séparé par une espace dans la formule, car il peut également être présent dans les noms d'attributs.
* Si l'attribut cible existe déjà, il est remplacé par le résultat de la formule.
* Les résultats sont arrondis à la 9e décimale. Par exemple, si le résultat de la formule est `0.1234567891`, la valeur stockée pour l'attribut est alors `0.123456789`.
* Si vous devez mettre à l'échelle une unité de mesure, consultez la section [Filtre].

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur arithmétique depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/arithmetic_processor.png" alt="Processeur arithmétique"  style="width:80%;">}}


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

| Paramètre            | Type    | Obligatoire | Description                                                                                                                                 |
| ------               | -----   | -------- | -----                                                                                                                                       |
| `type`               | Chaîne  | oui      | Le type du processeur.                                                                                                                      |
| `name`               | Chaîne  | non       | Le nom du processeur.                                                                                                                      |
| `is_enabled`         | Booléen | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                                       |
| `expression`         | Chaîne  | oui      | Opération arithmétique entre un ou plusieurs attributs de log.                                                                                    |
| `target`             | Chaîne  | oui      | Le nom de l'attribut qui contient le résultat de l'opération arithmétique.                                                                 |
| `is_replace_missing` | Booléen | non       | Définir sur `true` pour remplacer tous les attributs manquants dans `expression` par 0. Définir sur `false` pour annuler l'opération si un attribut est manquant. Valeur par défaut : `false`. |


[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Processeur de générateur de chaînes

Utilisez le processeur de générateur de chaînes pour ajouter un nouvel attribut (sans espace ni caractères spéciaux) à un log avec le résultat du modèle fourni.
Cela permet d'agréger différents attributs de chaînes bruts au sein d'un attribut unique.

Le modèle est défini par du texte brut et des blocs, avec la syntaxe `%{chemin_attribut}`.

**Remarques :**

* Le processeur accepte uniquement les attributs avec des valeurs ou un tableau de valeurs dans les blocs (consultez les exemples dans la [section IU](?tab=ui#processeur-de-generateur-de-chaines)).
* Si un attribut ne peut pas être utilisé (s'il s'agit d'un objet ou d'un tableau d'objets), il est remplacé par une chaîne vide ou toute l'opération est ignorée, selon l'option choisie.
* Si l'attribut cible existe déjà, il est remplacé par le résultat du modèle.
* Les résultats du modèle ne peuvent pas comporter plus de 256 caractères.


{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de générateur de chaînes sur la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/stringbuilder_processor.png" alt="Processeur de générateur de chaînes"  style="width:80%;">}}

**Exemple**

Avec le log suivant :

```
{
    "http": {
        "method": "GET",
        "status_code": 200,
        "url": "https://app.datadoghq.com/users"
    },
    "array_ids": [123, 456, 789],
    "array_users": [
    {
            "first_name": "Marie",
            "last_name": "Martin"
        },
        {
            "first_name": "Arnaud",
            "last_name": "Robert"
        }
    ]
}
```

Vous pouvez utiliser le modèle `Request %{http.method} %{http.url} a obtenu la réponse %{http.status_code}`, qui renvoie le résultat suivant :

```
Request GET https://app.datadoghq.com/users a obtenu la réponse 200
```

**Objets** 

Dans l'exemple de log, `http` est un objet et ne peut pas être utilisé dans un bloc (`%{http}` entraîne une erreur), tandis que `%{http.method}`, `%{http.status_code}` ou `%{http.url}` renvoie la valeur correspondante.

**Tableaux**

Des blocs peuvent être utilisés dans des tableaux de valeurs ou un attribut spécifique d'un tableau. Pour notre exemple de log, l'ajout du bloc `%{array_ids}` renvoie ce qui suit :

```
123,456,789
```

À l'inverse, `%{array_users}` ne renvoie aucun résultat, car il s'agit d'une liste d'objets.
Toutefois, `%{arrays_user.first_name}` renvoie la liste des `first_name` contenus dans le tableau :

```
Marie,Arnaud
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

| Paramètre            | Type    | Obligatoire | Description                                                                                                                                 |
| ------               | -----   | -------- | -----                                                                                                                                       |
| `type`               | Chaîne  | Oui      | Le type du processeur.                                                                                                                       |
| `name`               | Chaîne  | Non       | Le nom du processeur.                                                                                                                       |
| `is_enabled`         | Booléen | Non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                                       |
| `template`           | Chaîne  | Oui      | Une formule avec un ou plusieurs attributs et du texte brut.                                                                                           |
| `target`             | Chaîne  | Oui      | Le nom de l'attribut qui contient le résultat du modèle.                                                                             |
| `is_replace_missing` | Booléen | Non       | Si ce paramètre est défini sur `true`, il remplace tous les attributs manquants dans `template` par une chaîne vide. S'il est défini sur `false` (valeur par défaut), l'opération est annulée en cas d'attribut manquant. |


[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Parser GeoIP

Le parser GeoIP reçoit un attribut adresse IP et extrait le continent, le pays, la sous-division ainsi que la ville (si ces informations sont disponibles) dans le chemin de l'attribut cible.

{{< tabs >}}
{{% tab "IU" %}}

{{< img src="logs/processing/processors/geoip_processor.png" alt="Processeur GeoIP"  style="width:80%;">}}

La plupart des éléments contiennent un attribut `name` et `iso_code` (ou `code` pour le continent). L'attribut `subdivision` est le premier niveau de sous-division que le pays utilise, comme les « States » pour les États-Unis ou les « Départements » pour la France.

Un exemple de parser GeoIP se trouve ci-dessous. Il extrait la géolocalisation de l'attribut `network.client.ip` et la stocke dans l'attribut `network.client.geoip` :

{{< img src="logs/processing/processors/geoip_example.png" alt="Exemple de GeoIP"  style="width:60%;">}}

**Remarque** : ce processeur utilise les données GeoLite2 créées par [MaxMind][1].

[1]: https://www.maxmind.com
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser Geo-IP :

```json
{
    "type": "geo-ip-parser",
    "name": "Parser les éléments de géolocalisation depuis l'attribut network.client.ip.",
    "is_enabled": true,
    "sources": ["network.client.ip"],
    "target": "network.client.geoip"
}
```

| Paramètre    | Type             | Obligatoire | Description                                                                                                              |
| ------       | -----            | -------- | -----                                                                                                                    |
| `type`       | Chaîne           | oui      | Le type du processeur.                                                                                                   |
| `name`       | Chaîne           | non       | Le nom du processeur.                                                                                                   |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                                                                    |
| `sources`    | Tableau de chaînes | non       | Un tableau des attributs sources. Valeur par défaut : `network.client.ip`                                                                  |
| `target`     | Chaîne           | oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `network.client.geoip`. |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Processeur de correspondances

Utilisez le Lookup Processor (processeur de correspondances) pour mapper un attribut de log à une valeur lisible enregistrée dans la table de mappage des processeurs.
Il peut par exemple être utilisé pour mapper un ID de service interne à un nom de service plus facilement lisible. 
Vous pouvez également vous en servir pour vérifier si l'adresse MAC qui vient d'essayer de se connecter à votre environnement de production fait partie d'une liste de machines volées.

{{< tabs >}}
{{% tab "IU" %}}

{{< img src="logs/processing/processors/lookup_processor.png" alt="Processeur de correspondances"  style="width:80%;">}}

Le processeur effectue les actions suivantes :

* Vérifie si le log actuel contient l'attribut source.
* Vérifie si l'attribut source est présent dans la table de mappage.
  * S'il est présent, le processeur crée l'attribut source avec la valeur correspondante dans la table.
  * S'il ne parvient pas à trouver la valeur dans la table de mappage, il crée un attribut cible avec la valeur par défaut (facultatif).

Vous pouvez renseigner la table de mappage en ajoutant manuellement une liste de paires `source_key,target_value` ou en important un fichier CSV.

La limite de poids pour la table de mappage est de 100 Ko. Cette limite s'applique à l'ensemble des processeurs de correspondances sur la plateforme.

{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de correspondances :

```json
{
  "type" : "lookup-processor",
  "name" : "<NOM_PROCESSEUR>",
  "is_enabled" : true,
  "source" : "<ATTRIBUT_SOURCE>",
  "target" : "<ATTRIBUT_CIBLE>",
  "lookup_table" : [ "key1,value1", "key2,value2" ],
  "default_lookup" : "<VALEUR_CIBLE_PARDÉFAUT>",
}
```

| Paramètre       | Type             | Obligatoire | Description|
| ------          | -----            | -------- | -----      |
| `type`          | Chaîne           | oui      | Le type du processeur.|
| `name`          | Chaîne           | non       | Le nom du processeur.|
| `is_enabled`    | Booléen          | oui      | Indique si le processeur est activé ou non. Valeur par défaut : `false`|
| `source`        | Chaîne           | oui      | L'attribut source utilisé pour la mise en correspondance. |
| `target`        | Chaîne           | oui      | Le nom de l'attribut qui contient la valeur correspondante dans la liste de mappage ou la valeur `default_lookup` si la valeur correspondante ne figure pas dans la liste de mappage.|
| `lookup_table`  | Tableau de chaînes | oui      | Table de mappage contenant les valeurs des attributs sources et les valeurs des attributs cibles associées. Format : [ "source_key1,target_value1", "source_key2,target_value2" ] |
| `default_lookup`| Chaîne           | non       | Valeur à définir pour l'attribut cible si la valeur source ne figure pas dans la liste.|

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}


## Remappeur de traces

Il existe deux façons d'améliorer la corrélation entre les traces et les logs d'application :

1. Suivez la documentation sur l'[ajout d'un ID de trace dans les logs d'application][8] et sur l'utilisation des intégrations de log par défaut pour prendre en charge le reste de la configuration.

2. Utilisez le processeur de remappage de traces pour définir un attribut de log comme son ID de trace associé.

{{< tabs >}}
{{% tab "IU" %}}

Définissez le processeur de remappage de traces depuis la [page de configuration des logs Datadog][1]. Entrez le chemin de l'attribut ID de trace dans le carré du processeur, comme suit :

{{< img src="logs/processing/processors/trace_processor.png" alt="Processeur d'ID de trace"  style="width:80%;">}}

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
| ------       | -----            | -------- | -----                                                  |
| `type`       | Chaîne           | oui      | Le type du processeur.                                 |
| `name`       | Chaîne           | non       | Le nom du processeur.                                 |
| `is_enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources`    | Tableau de chaînes | non       | Un tableau des attributs sources. Valeur par défaut : `http.useragent`. |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: /fr/logs/processing/pipelines
[2]: /fr/logs/processing/parsing
[3]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[4]: /fr/logs/guide/log-parsing-best-practice
[5]: /fr/logs/explorer/search/#search-syntax
[6]: /fr/logs/processing/processors/?tab=ui#log-status-remapper
[7]: /fr/logs/processing/parsing/?tab=filter#matcher-and-filter
[8]: /fr/tracing/connect_logs_and_traces