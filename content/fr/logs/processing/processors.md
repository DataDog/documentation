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
{{< img src="logs/processing/processors/processors_overview.png" alt="log d'origine" responsive="true">}}

Un processeur exécute dans un [pipeline][1] une action de structuration de données sur un log ([remappage d'un attribut](#remapper), [parsing Grok](#parser-grok), etc.).

Les différents types de processeurs sont expliqués ci-dessous.

## Parser grok

Créez des règles grok personnalisées pour parser l'intégralité du message ou un attribut spécifique de votre événement brut. Pour en savoir plus, consultez la [section sur le parsing][2].

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur Grok depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}


[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser Grok :

```json
{
"type": "grok-parser",
"name": "Parsing du message de log",
"enabled": true,
"source": "message",
"grok": {
    "supportRules": "<RÈGLES_PRISEENCHARGE>",
    "matchRules":"<RÈGLES_CORRESPONDANCE>"
    }
}
```

| Paramètre           | Type             | Obligatoire | Description                                             |
| ------              | -----            | -------- | -----                                                   |
| `type`              | Chaîne           | oui      | Le type du processeur.                                  |
| `name`              | Chaîne           | non       | Le nom du processeur.                                  |
| `enabled`           | Booléen          | non       | Indique si les processeurs sont activés ou non. Valeur par défaut : `false`.  |
| `sources`           | Tableau de chaînes | oui      | Le nom de l'attribut de log à parser. Valeur par défaut : `message`. |
| `grok.supportRules` | Chaîne           | oui      | Une liste de règles de prise en charge pour votre parser grok.             |
| `grok.matchRules`   | Chaîne           | oui      | Une liste de règles de correspondance pour votre parser grok.               |

[1]: /fr/api/?lang=bash#logs-pipelines
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

Si la date de vos logs est spécifiée dans un attribut ne figurant pas dans cette liste, utilisez le processeur de remappage de dates de logs pour définir leur attribut date comme timestamp officiel pour ces logs :

<div class="alert alert-info">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

**Remarque** :

* Si vos logs ne comprennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut date, Datadog utilise la date de réception des logs comme timestamp.
* Si plusieurs processeurs de remappage de dates de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de remappage de dates de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Remappeur de dates de log" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de dates de log :

```json
{
    "type": "date-remapper",
    "name": "Définir <ATTRIBUT_SOURCE> comme date officielle du log",
    "enabled": false,
    "sources": ["<ATTRIBUT_SOURCE_1>"]
}
```

| Paramètre | Type             | Obligatoire | Description                                           |
| ------    | -----            | -------- | -----                                                 |
| `type`    | Chaîne           | oui      | Le type du processeur.                                |
| `name`    | Chaîne           | non       | Le nom du processeur.                                |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources` | Tableau de chaînes | oui      | Un tableau des attributs sources.                           |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de statuts de log

Utilisez ce processeur si vous souhaitez définir des attributs en tant que statut officiel. Par exemple, il est possible de transformer ce log :

{{< img src="logs/processing/processors/log_pre_severity.png" alt="Log avant remappage de la sévérité " responsive="true" style="width:40%;">}}

En ce log :

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Log après remappage de la sévérité bis" responsive="true" style="width:40%;" >}}

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
* Les chaînes de caractères commençant par **o** ou correspondant à **OK** ou **Success** (insensible à la casse) mappent vers **OK**
* Toutes les autres chaînes de caractères mappent vers **info (6)**.

**Remarque** : si plusieurs processeurs de remappage du statut de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de remappage de statut de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Carré du processeur de remappage de la sévérité" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de statuts de log :

```json
{
   "type": "status-remapper",
   "name": "Définir <ATTRIBUT_SOURCE> en tant que statut officiel du log",
   "enabled": true,
   "sources": ["<ATTRIBUT_SOURCE>"]
}
```

| Paramètre | Type             | Obligatoire | Description                                           |
| ------    | -----            | -------- | -----                                                 |
| `type`    | Chaîne           | oui      | Le type du processeur.                                |
| `name`    | Chaîne           | non       | Le nom du processeur.                                |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources` | Tableau de chaînes | oui      | Un tableau des attributs sources.                           |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de services

Utilisez ce processeur si vous souhaitez définir au moins un attribut en tant que service officiel.

**Remarque** : si plusieurs processeurs de remappage du service peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de remappage de services de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/service_remapper_processor_tile.png" alt="Carré du processeur de remappage de services" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de services de log :

```json
{
   "type": "service-remapper",
   "name": "Définir <ATTRIBUT_SOURCE> en tant que service de log officiel",
   "enabled": true,
   "sources": ["<ATTRIBUT_SOURCE>"]
}
```

| Paramètre | Type             | Obligatoire | Description                                           |
| ------    | -----            | -------- | -----                                                 |
| `type`    | Chaîne           | oui      | Le type du processeur.                                |
| `name`    | Chaîne           | non       | Le nom du processeur.                                |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources` | Tableau de chaînes | oui      | Un tableau des attributs sources.                           |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de messages de log

Le message est un attribut clé dans Datadog. Il est affiché dans la colonne de message du Log Explorer et vous permet d'effectuer des recherches en texte intégral. Utilisez ce processeur pour définir au moins un attribut en tant que message de log officiel.

**Remarque** : si plusieurs processeurs de remappage de messages de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de remappage de messages de log depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/message_processor.png" alt="Processeur de remappage de messages" responsive="true" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de services de log :

```json
{
   "type": "message-remapper",
   "name": "Définir <ATTRIBUT_SOURCE> en tant que message officiel du log",
   "enabled": true,
   "sources": ["msg"]
}
```

| Paramètre | Type             | Obligatoire | Description                                           |
| ------    | -----            | -------- | -----                                                 |
| `type`    | Chaîne           | oui      | Le type du processeur.                                |
| `name`    | Chaîne           | non       | Le nom du processeur.                                |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false` |
| `sources` | Tableau de chaînes | oui      | Un tableau des attributs sources. Valeur par défaut : `msg`            |


[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur

Le processeur effectue un remappage de n'importe quel attribut ou tag source vers un autre attribut ou tag cible. Il peut transformer ce log :

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribut avant remappage " responsive="true" style="width:40%;">}}

En ce log :

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribut après remappage " responsive="true" style="width:40%;">}}

Les contraintes de nom du tag ou de l'attribut sont expliquées dans les [recommandations relatives aux tags][4]. Certaines contraintes supplémentaires sont appliquées, car les caractères `:` ou `,` ne sont pas autorisés dans le nom du tag ou de l'attribut cible.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de remappage de message de log depuis la [page de configuration des logs Datadog][1]. Dans l'exemple ci-dessous, il effectue un remappage de `user` vers `user.firstname`

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Carré du processeur de remappage d'attribut" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de statut de log :

```json
{
    "type": "attribute-remapper",
    "name": "Définir <ATTRIBUT_SOURCE> en tant que message officiel du log",
    "enabled": true,
    "sourceType": "attribute",
    "sources": ["<ATTRIBUT_SOURCE>"],
    "target": "<ATTRIBUT_CIBLE",
    "targetType": "tag",
    "preserveSource": false,
    "overrideOnConflict": false
}
```

| Paramètre            | Type             | Obligatoire | Description                                                                    |
| ------               | -----            | -------- | -----                                                                          |
| `type`               | Chaîne           | oui      | Le type du processeur.                                                         |
| `name`               | Chaîne           | non       | Le nom du processeur.                                                         |
| `enabled`            | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                          |
| `sourceType`         | Chaîne           | non       | Définit si les sources sont de type `attribute` ou `tag`. Valeur par défaut : `attribute` |
| `sources`            | Tableau de chaînes | oui      | Un tableau des attributs ou tags sources                                             |
| `target`             | Chaîne           | oui      | Le nom de l'attribut ou du tag final pour le remappage des sources.                           |
| `targetType`         | Chaîne           | non       | Définit si la cible est de type `attribute` ou `tag`. Valeur par défaut : `attribute`    |
| `preserveSource`     | Booléen          | non       | Indique si l'élément source remappé doit être préservé ou supprimé. Valeur par défaut : `false`               |
| `overrideOnConflict` | Booléen          | non       | Indique si l'élément cible est remplacé ou non si celui-ci est déjà défini. Valeur par défaut : `false`            |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Parser d'URL

Ce processeur extrait les paramètres de requête et d'autres paramètres importants à partir d'une URL. Une fois configuré, les attributs suivants sont obtenus :

{{< img src="logs/processing/processors/url_processor.png" alt="Processeur d'URL" responsive="true" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de parsing d'URL depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Carré du processeur d'URL" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
    "type": "url-parser",
    "name": "Parser l'URL depuis l'attribut http.url.",
    "enabled": true,
    "sources": ["http.url"],
    "target": "http.url_details"
}
```

| Paramètre | Type             | Obligatoire | Description                                                                                                          |
| ------    | -----            | -------- | -----                                                                                                                |
| `type`    | Chaîne           | oui      | Le type du processeur.                                                                                               |
| `name`    | Chaîne           | non       | Le nom du processeur.                                                                                               |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                                                                |
| `sources` | Tableau de chaînes | non       | Un tableau des attributs sources. Valeur par défaut : `http.url`                                                                      |
| `target`  | Chaîne           | oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `http.url_details` |

{{% /tab %}}
{{< /tabs >}}

## Parser de user-agent

Le parser de user-agent reçoit un attribut user-agent et extrait le système d'exploitation, le navigateur, l'appareil et d'autres données utilisateur. Il reconnaît les principaux bots comme Google Bot, Yahoo Slurp et Bing. Une fois configuré, les attributs suivants sont obtenus :

{{< img src="logs/processing/processors/useragent_processor.png" alt="Processeur de user-agent" responsive="true" style="width:80%;">}}

**Remarque** : si vos logs comprennent des user-agents encodés (c'est par exemple le cas des logs IIS), configurez ce processeur de façon à ce qu'il **décode l'URL** avant son parsing.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de user-agent depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Carré du processeur de user-agent" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le parser de user-agent :

```json
{
    "type": "user-agent-parser",
    "name": "Parser <ATTRIBUT_SOURCE> pour en extraire toutes les informations sur le user-agent",
    "enabled": true,
    "sources": ["http.useragent"],
    "target": "http.useragent_details",
    "encoded": false
}
```

| Paramètre | Type             | Obligatoire | Description                                                                                                                |
| ------    | -----            | -------- | -----                                                                                                                      |
| `type`    | Chaîne           | oui      | Le type du processeur.                                                                                                     |
| `name`    | Chaîne           | non       | Le nom du processeur.                                                                                                     |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                      |
| `sources` | Tableau de chaînes | non       | Un tableau des attributs sources. Valeur par défaut : `http.useragent`                                                                      |
| `target`  | Chaîne           | oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `http.useragent_details`. |
| `encoded` | Booléen          | non       | Définit si l'attribut source est encodé dans une URL ou non. Valeur par défaut : `false`.                                                     |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Processeur de catégories

Utilisez le processeur de catégories pour ajouter un nouvel attribut (sans espace ni caractère spécial dans le nom du nouvel attribut) à un log correspondant à votre requête de recherche.
Utilisez les catégories pour créer des groupes à des fins d'analyse (tels que des groupes d'URL, des groupes de machines, des environnements et des compartiments de temps de réponse).

**Remarque** : la requête peut être effectuée sur n'importe quel attribut ou tag de log, qu'il s'agisse d'une facette ou non. Votre requête peut également contenir des wildcards.
Une fois que l'une des requêtes du processeur a renvoyé un log, celle-ci s'arrête. Assurez-vous de spécifier les requêtes dans l'ordre adéquat si un log correspond à plusieurs requêtes.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de catégories depuis la [page de configuration des logs Datadog][1]. Par exemple, pour catégoriser vos logs d'accès Web en fonction de la plage de valeurs du code de statut (2xx pour un code de réponse entre 200 et 299, 3xx pour un code de réponse entre 300 et 399, etc.), ajoutez ce processeur :

{{< img src="logs/processing/processors/category_processor.png" alt="Processeur de catégories" responsive="true" style="width:80%;" >}}

Cela génère le résultat suivant :

{{< img src="logs/processing/processors/category_processor_result.png" alt="Résultat du processeur de catégories" responsive="true" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le processeur de catégories :

```json
{
   "type": "category-processor",
   "name": "Assign a custom value to the <ATTRIBUT_CIBLE> attribute",
   "enabled": true,
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
| `enabled`    | Booléen         | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                                                      |
| `categories` | Tableau d'objets | oui      | Un tableau de filtres pour inclure ou exclure un log et son attribut `name` correspondant pour attribuer une valeur personnalisée au log. |
| `target`     | Chaîne          | oui      | Nom de l'attribut cible dont la valeur est définie par la catégorie correspondante.                              |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Processeur arithmétique

Utilisez le processeur arithmétique pour ajouter un nouvel attribut (sans espace ni caractère spécial dans le nouveau nom de l'attribut) à un log avec le résultat de la formule fournie.
Cela vous permet de remapper différents attributs de temps avec différentes unités vers un seul attribut, ou de calculer des opérations sur des attributs dans le même log.

Cette formule peut utiliser des parenthèses et les opérateurs arithmétiques de base : `-`, `+`, `*`, `/`.

Par défaut, le calcul est ignoré s'il manque un attribut. Sélectionnez « Replace missing attribute by 0 » pour remplacer automatiquement les valeurs d'attribut manquantes par 0 et ainsi garantir la réalisation du calcul.
Un attribut est considéré comme manquant s'il est introuvable dans les attributs de log, ou s'il ne peut pas être converti en chiffre.

**Remarques :**

* L'opérateur `-` doit être séparé par une espace dans la formule, car il peut également être présent dans les noms d'attributs.
* Si l'attribut cible existe déjà, il est remplacé par le résultat de la formule.
* Les résultats sont arrondis à la 9e décimale. Par exemple, si le résultat de la formule est `0.1234567891`, la valeur stockée pour l'attribut est alors  `0.123456789`.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur arithmétique depuis la [page de configuration des logs Datadog][1] :

{{< img src="logs/processing/processors/arithmetic_processor.png" alt="Processeur arithmétique" responsive="true" style="width:80%;">}}


[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de traces :

```json
{
    "type": "arithmetic-processor",
    "name": "<NOM_PROCESSEUR>",
    "enabled": true,
    "expression": "<OPÉRATION_ARITHMÉTIQUE>",
    "target": "<ATTRIBUT_CIBLE>",
    "replaceMissing": false
}
```

| Paramètre        | Type    | Obligatoire | Description                                                                                                                                 |
| ------           | -----   | -------- | -----                                                                                                                                       |
| `type`           | Chaîne  | oui      | Le type du processeur.                                                                                                                      |
| `name`           | Chaîne  | non       | Le nom du processeur.                                                                                                                      |
| `enabled`        | Booléen | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`.                                                                                       |
| `expression`     | Chaîne  | oui      | Opération arithmétique entre un ou plusieurs attributs de log.                                                                                    |
| `target`         | Chaîne  | oui      | Le nom de l'attribut qui contient le résultat de l'opération arithmétique.                                                                 |
| `replaceMissing` | Booléen | non       | Définir sur `true` pour remplacer tous les attributs manquants dans `expression` par 0. Définir sur `false` pour annuler l'opération si un attribut est manquant. Valeur par défaut : `false`. |


[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Parser GeoIP

Le parser GeoIP reçoit un attribut adresse IP et extrait le continent, le pays, la sous-division ainsi que la ville (si ces informations sont disponibles) dans le chemin de l'attribut cible.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/processing/processors/geoip_processor.png" alt="Processeur GeoIP" responsive="true" style="width:80%;">}}

La plupart des éléments contiennent un attribut `name` et `iso_code` (ou `code` pour le continent). L'attribut `subdivision` est le premier niveau de division que le pays utilise, comme les « États » pour les États-Unis ou les « Départements » pour la France.

Un exemple de parser GeoIP se trouve ci-dessous. Il extrait la géolocalisation de l'attribut `network.client.ip` et la stocke dans l'attribut `network.client.geoip` :

{{< img src="logs/processing/processors/geoip_example.png" alt="Exemple de GeoIP" responsive="true" style="width:60%;">}}

**Remarque** : ce processeur utilise les données GeoLite2 créées par [MaxMind][1].

[1]: https://www.maxmind.com
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de traces :

```json
{
    "type": "geo-ip-parser",
    "name": "Parser les éléments de géolocalisation depuis l'attribut network.client.ip.",
    "enabled": true,
    "sources": ["network.client.ip"],
    "target": "network.client.geoip"
}
```

| Paramètre | Type             | Obligatoire | Description                                                                                                              |
| ------    | -----            | -------- | -----                                                                                                                    |
| `type`    | Chaîne           | oui      | Le type du processeur.                                                                                                   |
| `name`    | Chaîne           | non       | Le nom du processeur.                                                                                                   |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`                                                                    |
| `sources` | Tableau de chaînes | non       | Un tableau des attributs sources. Valeur par défaut : `network.client.ip`                                                                  |
| `target`  | Chaîne           | oui      | Le nom de l'attribut parent qui contient tous les détails extraits des `sources`. Valeur par défaut : `network.client.geoip` |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Remappeur de traces

Il existe deux façons d'améliorer la corrélation entre les traces et les logs d'application :

1. Suivez la documentation sur l'[ajout d'un ID de trace dans les logs d'application][5] et sur l'utilisation des intégrations de log par défaut pour prendre en charge le reste de la configuration.

2. Utilisez le processeur de remappage de traces pour définir un attribut de log comme son ID de trace associé.

{{< tabs >}}
{{% tab "UI" %}}

Définissez le processeur de remappage de traces depuis la [page de configuration des logs Datadog][1].  Entrez le chemin de l'attribut ID de trace dans le carré du processeur, comme suit :

{{< img src="logs/processing/processors/trace_processor.png" alt="Processeur d'ID de trace" responsive="true" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Utilisez l'[endpoint d'API de pipeline de logs Datadog][1] avec la charge utile JSON suivante pour le remappeur de traces :

```json
{
   "type": "trace-id-remapper",
   "name": "Définir dd.trace_id en tant qu'ID de trace officiel associé à ce log",
   "enabled": true,
   "sources": ["dd.trace_id"]
}
```

| Paramètre | Type             | Obligatoire | Description                                           |
| ------    | -----            | -------- | -----                                                 |
| `type`    | Chaîne           | oui      | Le type du processeur.                                |
| `name`    | Chaîne           | non       | Le nom du processeur.                                |
| `enabled` | Booléen          | non       | Indique si le processeur est activé ou non. Valeur par défaut : `false`. |
| `sources` | Tableau de chaînes | non       | Un tableau des attributs sources. Valeur par défaut : `http.useragent` |

[1]: /fr/api/?lang=bash#logs-pipelines
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: /fr/logs/processing/pipelines
[2]: /fr/logs/processing/parsing
[3]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[4]: /fr/logs/guide/log-parsing-best-practice
[5]: /fr/tracing/advanced/connect_logs_and_traces