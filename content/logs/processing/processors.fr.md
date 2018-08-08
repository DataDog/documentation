---
title: Processors
kind: documentation
description: Transformer vos logs en utilisant le processor Grok
further_reading:
- link: logs/processing/pipelines
  tag: Documentation
  text: Découvrir les Pipelines de Datadog
- link: logs/logging_without_limits
  tag: Documentation
  text: Collecter des logs sans limites
- link: logs/explorer
  tag: Documentation
  text: Apprenez à explorer vos logs
---

{{< img src="logs/processing/processors/processors_overview.png" alt="original log" responsive="true">}}

Un Processor exécute dans un [pipeline][1] une action de structuration de données sur un log ([Remapper un attribute](#remapper), [Grok parsing](#grok-parser)...).

Les différents types de Processors sont expliqués ci-dessous.

## Parseur grok

Créez des règles grok personnalisées pour parser le message complet ou un attribut spécifique de votre événement brut :

{{< img src="logs/processing/processors/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}

Apprenez en plus à ce sujet dans la section [parsing][2].

## Log Date Remapper

Lorsque Datadog reçoit des logs, il les timestamp à l'aide des valeurs de l'un de ces attributs par défaut :

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si vos logs ont leurs timestamp dans un attribut ne figurant pas dans cette liste, utilisez le Processor Log Date Remapper pour définir leur attribut de date comme timestamp officiel pour ce log :

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Log date Remapper" responsive="true" style="width:80%;" >}}

Si vos logs ne contiennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut de date, Datadog timestamp les logs avec la date à laquelle ils sont reçus.

## Log Status Remapper

Utilisez ce Processor si vous souhaitez attribuer des attributs comme statut officiel. Entrez le chemin d'attribut dans la fenêtre du Processor comme suit:

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Severity Remapper Processor tile" responsive="true" style="width:80%;" >}}

Il permet de transformer ce log :

{{< img src="logs/processing/processors/log_pre_severity.png" alt=" Log pre severity " responsive="true" style="width:40%;">}}

en ce log :

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt=" Log post severity bis" responsive="true" style="width:40%;" >}}

Cependant, sachez que chaque valeur de statut entrante est mappée comme suit :

* Les entiers de 0 à 7 correspondent aux [normes de sévérité Syslog][3]
* Les chaînes de caractères commençant par **emerg** ou **f** (insensible à la casse) mappent vers **emerg (0)**
* Les chaînes de caractères commençant par **a** (insensible à la casse) mappent vers **alert (1)**
* Les chaînes de caractères commençant par **c** (insensible à la casse) mappent vers **critical (2)**
* Les chaînes de caractères commençant par **err** (insensible à la casse) mappent vers **error (3)**
* Les chaînes de caractères commençant par **w** (insensible à la casse) mappent vers **warning (4)**
* Les chaînes de caractères commençant par **n** (insensible à la casse) mappent vers **notice (5)**
* Les chaînes de caractères commençant par **i** (insensible à la casse) mappent vers **info (6)**
* Les chaînes de caractères commençant par **d**, **trace** ou **verbose** (insensible à la casse) mappent vers **debug (7)**
* Les chaînes de caractères correspondant à **OK** ou **Sucess** (insensible à la casse) mappent vers **OK**
* Toutes les autres chaînes de caractères mappent vers **info (6)**

## Remapper

Ce Processor remappe n'importe quel attribut ou tag source vers un attribut ou un tag cible : par exemple, il remappe `user` en `user.firstname`

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Attribute Remapper Processor tile" responsive="true" style="width:80%;" >}}

Il permet de transformer ce log :

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribute pre remapping " responsive="true" style="width:40%;">}}

en ce log :

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribute post remapping " responsive="true" style="width:40%;">}}

Les contraintes relatives au nom des tags et des attributs sont expliquées sur la page [Tags - Meilleures pratiques][4]. Certaines contraintes supplémentaires sont appliquées avec `:`, `/` ou `,` et ne sont pas autorisées dans le nom du tag ou de l'attribut cible.

## URL Parser

Ce Processor extrait les paramètres de la requête et d'autres paramètres importants d'une URL. Pour l'utiliser, entrez simplement l'attribut source de votre URL :

Les paramètres suivants :

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Url Processor Tile" responsive="true" style="width:80%;" >}}

Donnent les résultats suivants :

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor" responsive="true" style="width:80%;" >}}

## Useragent parser

UserAgent parser prend un attribut useragent et essaie d'extraire le système d'exploitation, le navigateur, le dispositif, etc.
Il reconnaît les principaux bots comme Google Bot, Yahoo Slurp, Bing et d'autres.

Si vos logs contiennent des useragents encodés (comme dans les logs IIS par exemple), configurez ce Processor de manière à **décoder l'URL** avant de la parser.

Les paramètres suivants :

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Useragent Processor tile" responsive="true" style="width:80%;" >}}

Donnent les résultats suivants :

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent Processor" responsive="true" style="width:80%;">}}

## Processor de catégorie

Utilisez le processor de catégorie pour ajouter des attributs (sans espaces ni caractères spéciaux dans le nom du nouvel attribut) à un log correspondant à une recherche donnée.
Les catégories sont très utiles pour créer des groupes logiques, qui peuvent être utilisés dans toutes les vues d'analyse (par ex. : groupes d'URL, groupes de machines, environnements, buckets de temps de réponse, etc.).

Par exemple, aux catégories que votre accès Web loggue en fonction de la plage de valeurs du code d'état (2xx pour un code de réponse entre 200 et 299, 3xx pour un code de réponse entre 300 et 399, etc.), ajoutez ce Processor :

{{< img src="logs/processing/processors/category_processor.png" alt="Category Processor" responsive="true" style="width:80%;" >}}

Cela produit le résultat suivant :

{{< img src="logs/processing/processors/category_processor_result.png" alt="Category Processor result" responsive="true" style="width:80%;" >}}

**Remarque importante** : La requête peut être effectuée pour tous les attributs ou tags de log, qu'il s'agisse ou non d'une facette. Vous pouvez également utiliser des caractères génériques dans votre requête.
Une fois que le log a été mis en correspondance avec l'une des requêtes du Processor, il s'interrompt. Vérifiez qu'ils sont bien organisés au cas où un log correspondrait à plusieurs requêtes.

## Log Message Remapper

Le message est un attribut clé dans Datadog. Il est affiché dans la colonne message du log explorer et vous pouvez y effectuer une recherche de texte complète. Utilisez ce processeur pour définir certains attributs en tant que message du log: entrez simplement le chemin d'attribut dans la configuration du processeur comme suit:

{{< img src="logs/processing/processors/message_processor.png" alt="Message Processor" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines
[2]: /logs/processing/parsing
[3]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[4]: /tagging/#tags-best-practices
