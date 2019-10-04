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

Créez des règles grok personnalisées pour analyser l'intégralité du message ou un attribut spécifique de votre événement brut :

{{< img src="logs/processing/processors/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}

Consultez la [section relative au parsing][2] pour obtenir davantage d'informations à ce sujet.

## Remappeur de dates de log

Lorsque Datadog reçoit des logs, il leur attribue un timestamp à l'aide des valeurs de l'un de ces attributs par défaut :

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si la date de vos logs est spécifiée dans un attribut ne figurant pas dans cette liste, utilisez le processeur du remappeur de dates de logs pour définir leur attribut de date comme timestamp officiel pour ces logs :

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Remappeur de dates de log" responsive="true" style="width:80%;" >}}

Si vos logs ne comprennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut de date, Datadog marque d'un timestamp les logs avec la date de réception.

<div class="alert alert-info">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

**Remarque** : si plusieurs processeurs de remappage de dates de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

## Remappeur de statuts de log

Utilisez ce processeur si vous souhaitez définir des attributs en tant que statut officiel. Entrez simplement le chemin de l'attribut dans le carré du processeur comme suit :

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Carré du processeur de remappage de la sévérité" responsive="true" style="width:80%;" >}}

Il permet de transformer ce log :

{{< img src="logs/processing/processors/log_pre_severity.png" alt="Log avant remappage de la sévérité " responsive="true" style="width:40%;">}}

En ce log :

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Log après remappage de la sévérité bis" responsive="true" style="width:40%;" >}}

Il convient toutefois de noter que chaque valeur de statut entrant est mappée comme suit :

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

## Remappeur de services

Utilisez ce processeur si vous souhaitez définir au moins un attribut en tant que service officiel. Définissez le ou les attributs dans le carré du processeur comme suit :

{{< img src="logs/processing/processors/service_remapper_processor_tile.png" alt="Carré du processeur de remappage de service" responsive="true" style="width:80%;" >}}

**Remarque** : si plusieurs processeurs de remappage du service peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

## Remappeur de messages de log

Le message est un attribut clé dans Datadog. Il est affiché dans la colonne de message du Log Explorer et vous permet d'effectuer des recherches en texte intégral. Utilisez ce processeur pour définir au moins un attribut en tant que message de log officiel. Définissez le ou les attributs dans le carré du processeur comme suit :

{{< img src="logs/processing/processors/message_processor.png" alt="Processeur de remappage de message" responsive="true" style="width:80%;">}}

**Remarque** : si plusieurs processeurs de remappage de message de log peuvent être appliqués à un log donné, seul le premier (selon la séquence des pipelines) est pris en compte.

## Remappeur

Ce processeur effectue un remappage de n'importe quel attribut ou tag source vers un autre attribut ou tag cible. Par exemple, ici, il effectue le remappage de `user` vers `user.firstname` :

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Carré du processeur de remappage d'attribut" responsive="true" style="width:80%;" >}}

Il permet de transformer ce log :

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribut avant remappage " responsive="true" style="width:40%;">}}

En ce log :

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribut après remappage " responsive="true" style="width:40%;">}}

Les contraintes de nom du tag ou de l'attribut sont expliquées dans les [recommandations relatives aux tags][4]. Certaines contraintes supplémentaires sont appliquées, car les caractères `:` ou `,` ne sont pas autorisés dans le nom du tag ou de l'attribut cible.

## Parser d'URL

Ce processeur extrait les paramètres de requête et d'autres paramètres importants à partir d'une URL. Pour l'utiliser, il vous suffit de saisir l'attribut source de votre URL :

Les paramètres suivants :

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Carré du processeur d'URL" responsive="true" style="width:80%;" >}}

Vous permettent d'obtenir les résultats suivants :

{{< img src="logs/processing/processors/url_processor.png" alt="Processeur d'URL" responsive="true" style="width:80%;" >}}

## Parser de user-agent

Le parser de user-agent reçoit un attribut user-agent et tente d'extraire le système d'exploitation, le navigateur, l'appareil, etc.
Il reconnaît les bots majeurs comme le Google Bot, Yahoo Slurp, Bing et autres.

Si vos logs comprennent des user-agents encodés (comme pour les logs IIS, par exemple), activez l'option **Apply a URL decode first** afin de décoder l'URL avant son parsing.

Les paramètres suivants :

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Carré du processeur de user-agent" responsive="true" style="width:80%;" >}}

Vous permettent d'obtenir les résultats suivants :

{{< img src="logs/processing/processors/useragent_processor.png" alt="Processeur de user-agent" responsive="true" style="width:80%;">}}

## Processeur de catégories

Utilisez le processeur de catégories pour ajouter un nouvel attribut (sans espace ni caractère spécial dans le nouveau nom de l'attribut) à un log correspondant à votre requête de recherche.
Les catégories sont idéales pour créer des groupes utiles et faciliter l'analyse des informations (exemples : groupes d'URL, groupes de machines, environnements, compartiments de temps de réponse, etc.).

Par exemple, pour catégoriser vos logs d'accès Web en fonction de la plage de valeurs du code de statut (2xx pour un code de réponse entre 200 et 299, 3xx pour un code de réponse entre 300 et 399, etc.), ajoutez ce processeur :

{{< img src="logs/processing/processors/category_processor.png" alt="Processeur de catégories" responsive="true" style="width:80%;" >}}

Cela génère le résultat suivant :

{{< img src="logs/processing/processors/category_processor_result.png" alt="Résultat du processeur de catégories" responsive="true" style="width:80%;" >}}

**Remarque importante** : la requête peut être effectuée sur n'importe quel attribut de log ou tag, qu'il s'agisse d'une facette ou non. Votre requête peut également contenir des wildcards.
Une fois que l'une des requêtes du processeur a renvoyé un log, celle-ci s'arrête. Assurez-vous de spécifier les requêtes dans l'ordre adéquat si un log correspond à plusieurs requêtes.

## Processeur arithmétique

Utilisez le processeur arithmétique pour ajouter un nouvel attribut (sans espace ni caractère spécial dans le nouveau nom de l'attribut) à un log avec le résultat de la formule fournie.
Cela vous permet de remapper différents attributs de temps avec différentes unités vers un seul attribut, ou de calculer des opérations sur des attributs dans le même log.

Cette formule peut utiliser des parenthèses et les opérateurs arithmétiques de base : `-`, `+`, `*`, `/`.

Exemple :

{{< img src="logs/processing/processors/arithmetic_processor.png" alt="Processeur arithmétique" responsive="true" style="width:80%;">}}

Par défaut, le calcul est ignoré s'il manque un attribut. Sélectionnez « Replace missing attribute by 0 » pour remplacer automatiquement les valeurs d'attribut manquantes par 0 et ainsi garantir la réalisation du calcul.
Un attribut est considéré comme manquant s'il est introuvable dans les attributs de log, ou s'il ne peut pas être converti en chiffre.

**Remarques :**

* L'opérateur `-` doit être séparé par une espace dans la formule, car il peut également être présent dans les noms d'attributs.
* Si l'attribut cible existe déjà, il est remplacé par le résultat de la formule.
* Les résultats sont arrondis à la 9e décimale. Par exemple, si le résultat de la formule est `0,1234567891`, la valeur stockée pour l'attribut est alors  `0,123456789`.

## Remappeur de traces

Il existe deux façons d'améliorer la corrélation entre les traces et les logs d'application :

1. Suivez la documentation sur l'[ajout d'un ID de trace dans les logs d'application][5] et sur l'utilisation des intégrations de log par défaut pour prendre en charge le reste de la configuration.

2. Utilisez le processeur de remappage de trace pour définir un attribut de log comme étant son ID de trace associé. Pour ce faire, entrez le chemin de l'attribut dans le carré du processeur comme suit :

{{< img src="logs/processing/processors/trace_processor.png" alt="Processeur d'ID de trace" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/pipelines
[2]: /fr/logs/processing/parsing
[3]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[4]: /fr/tagging/#tags-best-practices
[5]: /fr/tracing/advanced/connect_logs_and_traces/?tab=java