---
title: Processing
kind: documentation
description: Parser et enrichir vos logs pour créer des facettes et des métriques dans le logs Explorer.
further_reading:
- link: logs/processing/parsing
  tag: Documentation
  text: En savoir plus sur le parsing
- link: logs/faq/how-to-investigate-a-log-parsing-issue
  tag: FAQ
  text: Comment étudier un problème de traitement de log?
- link: logs/faq/log-parsing-best-practice
  tag: FAQ
  text: Parsing de log - Meilleures pratiques
- link: logs/logging_without_limits
  tag: Documentation
  text: Contrôler le volume de logs indexés par Datadog
---

## Présentation

Pour accéder au volet de processing, utilisez le menu `Logs` à gauche :

{{< img src="logs/processing/processing_panel.png" alt="Pipelines panel" responsive="true" style="width:50%;" >}}

## Pipelines
### But des pipelines

**Un pipeline de processing prend un sous-ensemble filtré de logs entrants et applique sur eux une liste de processors de façon séquentielle.**

Datadog parse automatiquement les logs au format JSON. Lorsque vos logs ne sont pas au format JSON, Datadog vous permet d'y ajouter de la valeur en les traitant dans un pipeline de processing.

Avec les pipelines, vous analysez et enrichissez vos logs grâce à un ensemble de [processors](#processors). Cela vous permet d'extraire des informations ou des attributs utiles d'un texte semi-structuré pour les réutiliser en tant que [facettes][1].

Chaque log qui traverse les pipelines est testé par rapport à chaque filtre de pipeline. Si l'un des logs correspond à un filtre, tous les [processors](#processors) du pipeline sont appliqués de façon séquentielle avant de passer au pipeline suivant.

Ainsi, un pipeline de processing peut transformer ce log :

{{< img src="logs/processing/original_log.png" alt="original log" responsive="true" style="width:50%;">}}

en ce log :

{{< img src="logs/processing/log_post_severity.png" alt=" Log post severity " responsive="true" style="width:50%;">}}

Avec un seul pipeline :

{{< img src="logs/processing/pipeline_example.png" alt="Pipelines example" responsive="true" style="width:75%;">}}

Les pipelines prennent les logs de n'importe quel format et les convertissent en un format commun dans Datadog.

Par exemple, un premier pipeline peut être défini pour extraire le préfixe application log, puis chaque équipe est libre de définir son propre pipeline pour traiter le reste du message du log.

### Filtres de pipeline

Les filtres vous permettent de limiter les types de logs auxquels un pipeline peut s'appliquer.

La syntaxe d'un filtre est la même que celle de la [barre de recherche][2].

**Attention, le filtrage du pipeline est appliqué avant tout traitement dans le pipeline. Par conséquent, vous ne pouvez pas filtrer sur un attribut qui est extrait dans le pipeline lui-même**

Le flux de logs affiche les logs auxquels votre pipeline s'applique :

{{< img src="logs/processing/pipeline_filters.png" alt="Pipelines filters" responsive="true" style="width:80%;">}}

### Pipelines des intégrations

Ces pipelines sont en lecture seule, mais vous pouvez les cloner puis modifier le clone :

{{< img src="logs/processing/cloning_pipeline.png" alt="Cloning pipeline" responsive="true" style="width:80%;">}}

## Processors

Un processor exécute dans un [pipeline](#processing-pipelines) une action de structuration de données sur un log ([Remappage d'un attribut](#attribute-remapper), [Grok parsing](#grok-parser), etc.).

Les différents types de processors sont expliqués ci-dessous.

### Parseur grok

Créez des règles grok personnalisées pour parser le message complet ou un attribut spécifique de votre événement brut :

{{< img src="logs/processing/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}

Apprenez en plus à ce sujet dans la section [parsing][3].

### Log Date Remapper

Lorsque Datadog reçoit des logs, il les timestamp à l'aide des valeurs de l'un de ces attributs par défaut :

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

Si vos logs ont leurs timestamp dans un attribut ne figurant pas dans cette liste, utilisez le processor Log Date Remapper pour définir leur attribut de date comme timestamp officiel pour ce log :

{{< img src="logs/processing/log_date_remapper.png" alt="Log date Remapper" responsive="true" style="width:80%;" >}}

Si vos logs ne contiennent aucun des attributs par défaut et que vous n'avez pas défini votre propre attribut de date, Datadog timestamp les logs avec la date à laquelle ils sont reçus.
Si le timestamp officiel du log provient d'un attribut personnalisé, utilisez un processor [date remapper][4] pour remplacer le timestamp par défaut du log.

### Log Status Remapper

Utilisez ce processor si vous souhaitez appliquer un statut officiel à certains attributs. Entrez simplement le chemin d'attribut dans la fenêtre du processor comme suit :

{{< img src="logs/processing/severity_remapper_processor_tile.png" alt="Severity Remapper processor tile" responsive="true" style="width:80%;" >}}

Il permet de transformer ce log :

{{< img src="logs/processing/log_pre_severity.png" alt=" Log pre severity " responsive="true" style="width:40%;">}}

en ce log :

{{< img src="logs/processing/log_post_severity_bis.png" alt=" Log post severity bis" responsive="true" style="width:40%;" >}}

Cependant, sachez que chaque valeur de statut entrante est mappée comme suit :

* Les entiers de 0 à 7 correspondent aux [normes de sévérité Syslog][5]
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

### Remapper

Ce processor remappe n'importe quel attribut ou tag source vers un attribut ou un tag cible : par exemple, il remappe `user` en `user.firstname`

{{< img src="logs/processing/attribute_remapper_processor_tile.png" alt="Attribute Remapper processor tile" responsive="true" style="width:80%;" >}}

Il permet de transformer ce log :

{{< img src="logs/processing/attribute_pre_remapping.png" alt="attribute pre remapping " responsive="true" style="width:40%;">}}

en ce log :

{{< img src="logs/processing/attribute_post_remapping.png" alt="attribute post remapping " responsive="true" style="width:40%;">}}

Les contraintes relatives au nom des tags et des attributs sont expliquées sur la page [Tags - Meilleures pratiques][6]. Certaines contraintes supplémentaires sont appliquées avec `:`, `/` ou `,` et ne sont pas autorisées dans le nom du tag ou de l'attribut cible.

### URL Parser

Ce processor extrait les paramètres de la requête et d'autres paramètres importants d'une URL. Pour l'utiliser, entrez simplement l'attribut source de votre URL :

Les paramètres suivants :

{{< img src="logs/processing/url_processor_tile.png" alt="Url Processor Tile" responsive="true" style="width:80%;" >}}

Donnent les résultats suivants :

{{< img src="logs/processing/url_processor.png" alt="Url Processor" responsive="true" style="width:80%;" >}}

### Useragent parser

UserAgent parser prend un attribut useragent et essaie d'extraire le système d'exploitation, le navigateur, le dispositif, etc.
Il reconnaît les principaux bots comme Google Bot, Yahoo Slurp, Bing et d'autres.

Si vos logs contiennent des useragents encodés (comme dans les logs IIS par exemple), configurez ce processor de manière à **décoder l'URL** avant de la parser.

Les paramètres suivants :

{{< img src="logs/processing/useragent_processor_tile.png" alt="Useragent processor tile" responsive="true" style="width:80%;" >}}

Donnent les résultats suivants :

{{< img src="logs/processing/useragent_processor.png" alt="Useragent processor" responsive="true" style="width:80%;">}}

### Processor de catégorie

Utilisez le processor de catégorie pour ajouter des attributs (sans espaces ni caractères spéciaux dans le nom du nouvel attribut) à un log correspondant à une recherche donnée.
Les catégories sont très utiles pour créer des groupes logiques, qui peuvent être utilisés dans toutes les vues d'analyse (par ex. : groupes d'URL, groupes de machines, environnements, buckets de temps de réponse, etc.).

Par exemple, aux catégories que votre accès Web loggue en fonction de la plage de valeurs du code d'état (2xx pour un code de réponse entre 200 et 299, 3xx pour un code de réponse entre 300 et 399, etc.), ajoutez ce processor :

{{< img src="logs/processing/category_processor.png" alt="Category processor" responsive="true" style="width:80%;" >}}

Cela produit le résultat suivant :

{{< img src="logs/processing/category_processor_result.png" alt="Category processor result" responsive="true" style="width:80%;" >}}

**Remarque importante** : La requête peut être effectuée pour tous les attributs ou tags de log, qu'il s'agisse ou non d'une facette. Vous pouvez également utiliser des caractères génériques dans votre requête.
Une fois que le log a été mis en correspondance avec l'une des requêtes du processor, il s'interrompt. Vérifiez qu'ils sont bien organisés au cas où un log correspondrait à plusieurs requêtes.

### Log Message Remapper

Le message est un attribut clé dans Datadog. Il est affiché dans la colonne message du log explorer et vous pouvez y effectuer une recherche de texte complète. Utilisez ce processor pour définir certains attributs en tant que message du log : entrez simplement le chemin d'attribut dans la configuration du processor comme suit :

{{< img src="logs/processing/message_processor.png" alt="Message processor" responsive="true" style="width:80%;">}}

## Limites techniques

Pour assurer un fonctionnement optimal de la solution de Log Management, nous avons défini les règles suivantes pour vos logs ainsi que pour certaines fonctionnalités du produit. Ces limites ont été conçues pour que vous ne les atteigniez jamais.

### Limites appliquées aux logs ingérés

* La taille d'un log ne doit pas dépasser 25K octets.
* Les logs peuvent être soumis jusqu'à 6 h dans le passé et 2 h dans le futur.
* Un log converti au format JSON doit contenir moins de 256 attributs. Chacune des clés de l'attribut doit comporter moins de 50 caractères, être imbriquée dans moins de 10 niveaux successifs, et sa valeur respective doit être inférieure à 1 024 caractères si elle doit être promue en tant que facette.
* Un log ne doit pas contenir plus de 100 tags et chaque tag ne doit pas dépasser 256 caractères, soit un maximum de 10 millions de tags uniques par jour.

Les logs qui ne respectent pas ces limites peuvent être transformés ou tronqués par le système. Ils peuvent également ne pas être indexés du tout s'ils sont en dehors de la plage de temps fournie. Cependant, soyez assuré que Datadog essaie toujours de faire de son mieux pour préserver autant que possible les données utilisateur fournies.

### Limites appliquées aux fonctionnalités fournies

* Le nombre maximum de facettes est de 100.
* Le nombre maximum de pipelines de processing sur une plate-forme est de 100.
* Le nombre maximum de processors dans un pipeline est de 20.
* Le nombre maximal de règles de parsing au sein d'un processor grok est de 10. Nous nous réservons le droit de désactiver les règles de parsing sous-performantes qui pourraient affecter les performances de notre service.

Contactez le support de Datadog si vous atteignez l'une de ces limites afin de les augmenter.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/explore/#facets
[2]: /logs/explore/#search-bar
[3]: /logs/processing/parsing
[4]: /logs/processing/#log-date-remapper
[5]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[6]: https://docs.datadoghq.com/getting_started/tagging/#tags-best-practices
