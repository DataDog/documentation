---
title: Pipelines
kind: documentation
description: Parser vos logs à l'aide du processeur Grok
aliases:
  - /fr/logs/processing/pipelines/
further_reading:
  - link: /logs/processing/processors/
    tag: Documentation
    text: Consulter la liste complète des processeurs disponibles
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: Logging without Limits*
  - link: /logs/explorer/
    tag: Documentation
    text: Apprendre à explorer vos logs
  - link: 'https://learn.datadoghq.com/course/view.php?id=10'
    tag: Centre d'apprentissage
    text: Aller plus loin avec les logs grâce au parsing
---
{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="log d'origine" >}}

## Présentation

Datadog analyse automatiquement les logs au format JSON. Lorsque les logs ne sont pas au format JSON, vous pouvez optimiser leur utilisation en les faisant passer par un pipeline de traitement.

Avec les pipelines, les logs sont analysés et enrichis grâce à un ensemble de [processeurs][1]. Cela vous permet d'extraire des informations ou des attributs utiles à partir de texte semi-structuré pour les réutiliser en tant que [facettes][2].

Chaque log qui passe par les pipelines est testé avec chaque filtre de pipeline. Si l'un des logs correspond à un filtre, tous les processeurs du pipeline sont appliqués de façon séquentielle avant de passer au pipeline suivant.

Ainsi, un pipeline de traitement peut transformer ce log :

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="log d'origine" style="width:50%;">}}

En ce log :

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Log après traitement" style="width:50%;">}}

Avec un seul pipeline :

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="Exemple de pipelines" style="width:75%;">}}

Les pipelines traitent tous les formats de logs et les convertissent en un format commun dans Datadog.

Par exemple, un premier pipeline peut être défini pour extraire le préfixe du log d'application. Chaque équipe est ensuite libre de définir son propre pipeline pour traiter le reste du message du log.

## Filtres de pipeline

Les filtres vous permettent de limiter les types de logs auxquels un pipeline s'applique.

La syntaxe d'un filtre est identique à celle de la [barre de recherche][3].

**Remarque** : les filtres de pipeline sont appliqués avant tout traitement par les processeurs du pipeline. Par conséquent, vous ne pouvez pas appliquer de filtre à partir d'un attribut qui est extrait dans le pipeline.

Le flux de logs affiche les logs auxquels votre pipeline s'applique :

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Filtres de pipeline" style="width:80%;">}}

## Pipelines imbriqués

Les pipelines imbriqués sont des pipelines au sein d'un autre pipeline. Utilisez les pipelines imbriqués pour diviser le traitement en deux étapes. Par exemple, vous pouvez commencer par appliquer un filtre de niveau supérieur tel que l'équipe, puis un deuxième niveau de filtrage basé sur l'intégration, le service ou tout autre tag ou attribut.

Un pipeline peut contenir des pipelines imbriqués et des processeurs, tandis qu'un pipeline imbriqué peut seulement contenir des processeurs.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines imbriqués" style="width:80%;">}}

Il est possible de faire glisser un pipeline vers un autre pipeline pour le transformer en pipeline imbriqué :

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Faire glisser et déposer des pipelines imbriqués" video="true" width="80%" >}}

## Pipelines spéciaux

### Prétraitement de logs JSON

Le prétraitement des logs JSON intervient avant le traitement par le pipeline. Le pré-traitement consiste à effectuer une série d'opérations basées sur des [attributs réservés][4], tels que `timestamp`, `status`, `host`, `service` et `message`. Si les attributs figurant dans vos logs JSON présentent des noms différents, utilisez le pré-traitement pour mapper les noms d'attribut de vos logs à ceux figurant dans la liste d'attributs réservés.

Le prétraitement vous permet d'effectuer les opérations suivantes :

* Déclencher de nouvelles [intégrations de log](#pipelines-des-integrations) selon la [source](#attribut-source) des logs entrants.
* Appliquer des tags [host](#attribut-host) aux logs entrants.
* Appliquer un processeur de remappage d'attribut réservé (tel que le [remappeur de dates](#attribut-date), le [remappeur de statuts](#attribut-status), le [remappeur de services](#attribut-service), le [remappeur de messages](#attribut-message) et le [remappeur d'ID de trace](#attribut-trace-id)) pour les attributs JSON associés de tous les logs JSON entrants.

Par exemple, imaginons un service qui génère le log suivant :

```json
{
  "myhost": "host123",
  "myapp": "test-web-2",
  "logger_severity": "Error",
  "log": "cannot establish connection with /api/v1/test",
  "status_code": 500
}
```

Le prétraitement des logs JSON inclut une configuration par défaut qui prend en charge les redirecteurs de log standard. Vous pouvez modifier cette configuration si vous utilisez une stratégie de transmission des logs personnalisée ou spécifique.

Ouvrez le pipeline **Pre processing for JSON logs** et modifiez les mappages par défaut :

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="Remappage de l'attribut réservé" style="width:70%;">}}

On obtient alors le log suivant :

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="log après remappage" style="width:70%;">}}

**Remarque** : le prétraitement des logs JSON est le seul moyen de définir l'un de vos attributs de log en tant que `host` pour vos logs.

#### Attribut source

Si un fichier de log au format JSON comprend l'attribut `ddsource`, Datadog interprète sa valeur en tant que source du log. Pour utiliser les mêmes noms de source que ceux de Datadog, consultez la [bibliothèque des pipelines d'intégration][5].

**Remarque** : les logs provenant d'un environnement conteneurisé nécessitent l'utilisation d'une [variable d'environnement][6] pour remplacer les valeurs source et service par défaut.

#### Attribut host

Utilisez l'Agent Datadog ou le format RFC 5424 pour définir automatiquement la valeur du host sur vos logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur comme host du log :

* `host`
* `hostname`
* `syslog.hostname`

#### Attribut date

Par défaut, Datadog génère un timestamp et l'ajoute à un attribut de date lors de la réception des logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur en que date officielle du log :

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour la date d'un log en définissant un [processeur de remappage de dates de logs][7].

**Remarque** : Datadog rejette un log si sa date officielle est antérieure de plus de 18 heures.

<div class="alert alert-warning">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC 3164</a>.
</div>

#### Attribut message

Par défaut, Datadog ingère la valeur du message comme corps de l'entrée du log. Cette valeur est alors mise en évidence et affichée dans le [flux de logs][8], où elle est indexée pour d'éventuelles [recherches plein texte][9].

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le message d'un log en définissant un [processeur de remappage de messages de logs][10].

#### Attribut status

Chaque entrée de log peut spécifier un niveau de statut. Celui-ci peut est disponible pour la recherche à facettes au sein de Datadog. Cependant, si un fichier de log au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur en tant que statut officiel du log :

* `status`
* `severity`
* `level`
* `syslog.severity`

Pour remapper un statut existant dans l'attribut `status`, utilisez le [remappeur de statuts de log][11].

#### Attribut service

Utilisez l'Agent Datadog ou le format RFC 5424 pour définir automatiquement la valeur du service sur vos logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur comme service du log :

* `service`
* `syslog.appname`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le service d'un log en définissant un [processeur de remappage de services de log][12].

#### Attribut Trace ID

Par défaut, [les traceurs de Datadog peuvent automatiquement injecter les ID de trace et de span dans les logs][13]. Cependant, si un log au format JSON comprend les attributs suivants, Datadog interprète sa valeur en tant que `trace_id` du log :

* `dd.trace_id`
* `contextMap.dd.trace_id`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour l'ID de trace d'un log en définissant un [processeur de remappage d'ID de trace de logs][14].

### Pipelines d'intégration

<div class="alert alert-info">
Consultez la <a href="/integrations/#cat-log-collection">liste des intégrations prises en charge disponibles</a>.
</div>

Les pipelines de traitement d'intégration sont disponibles pour certaines sources lorsqu'elles sont configurées pour recueillir les logs. Un pipeline d'intégration est automatiquement installé pour les logs d'intégration, afin de prendre en charge leur parsing et d'ajouter la facette correspondante dans Log Explorer.

Ces pipelines sont en mode **lecture seule** et analysent vos logs en s'adaptant à chaque source. Pour modifier le pipeline d'intégration, clonez-le, puis modifiez le clone :

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="cloner un pipeline" style="width:80%;">}}

Consultez l'exemple de logs ELB ci-dessous :

{{< img src="logs/processing/elb_log_post_processing.png" alt="Post traitement de logs ELB" style="width:70%;">}}

### Bibliothèque de pipelines d'intégration

Pour afficher la liste complète des pipelines d'intégration proposés par Datadog, consultez la [Bibliothèque de pipelines d'intégration][5]. La Bibliothèque de pipelines indique comment Datadog traite les différents formats de log par défaut.

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="Bibliothèque de pipelines d'intégration" style="width:80%;">}}

Pour utiliser un pipeline d'intégration, nous vous conseillons d'installer l'intégration en configurant la `source` de log correspondante. Lorsque Datadog reçoit le premier log avec cette source, l'installation se déclenche automatiquement et le pipeline d'intégration est ajouté à la liste des pipelines de traitement. Pour configurer la source de log, consultez la [documentation relative à l'intégration][15] correspondante.

Il est également possible de copier un pipeline d'intégration à l'aide du bouton Copy.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="Cloner un pipeline à partir de la bibliothèque" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /fr/logs/processing/processors/
[2]: /fr/logs/explorer/facets/
[3]: /fr/logs/explorer/search/
[4]: /fr/logs/processing/pipelines/#source-attribute
[5]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[6]: /fr/agent/docker/log/?tab=containerinstallation#examples
[7]: /fr/logs/processing/processors/#log-date-remapper
[8]: /fr/logs/explorer/
[9]: /fr/logs/explorer/#filters-logs
[10]: /fr/logs/processing/processors/?tab=ui#log-message-remapper
[11]: /fr/logs/processing/processors/#log-status-remapper
[12]: /fr/logs/processing/processors/?tab=ui#service-remapper
[13]: /fr/tracing/connect_logs_and_traces/
[14]: /fr/logs/processing/processors/?tab=ui#trace-remapper
[15]: /fr/integrations/#cat-log-collection
