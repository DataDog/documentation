---
title: Traitement
kind: documentation
description: Analysez et enrichissez vos logs pour créer des facettes et des métriques pertinentes dans le Log Explorer.
further_reading:
  - link: logs/processing/pipelines
    tag: Documentation
    text: Découvrir les pipelines de Datadog
  - link: logs/processing/processors
    tag: Documentation
    text: Consultez la liste complète des processeurs disponibles.
  - link: logs/processing/attributes_naming_convention
    tag: Documentation
    text: Comment nommer les attributs des logs Datadog
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
---
{{< img src="logs/processing/processing.png" alt="Traitement" >}}

## Présentation

Pour accéder au volet de configuration, ouvrez le menu `Logs` à gauche, puis le sous-menu de configuration.

La page de configuration des logs offre un contrôle total du traitement de vos logs avec les [pipelines][1] et les [processeurs][2] Datadog.

* Un [pipeline][1] prend un sous-ensemble filtré de logs entrants et applique une liste de processeurs de façon séquentielle.
* Un [processeur][2] exécute dans un [pipeline][1] une action de structuration de données sur un log ([remappage d'un attribut][3], [parsing Grok][4], etc.).

Les [pipelines][1] et les [processeurs][2] peuvent être appliqués à n'importe quel type de log :

* [Les logs d'intégration](#integration-logs)
* [Les logs JSON/Syslog/plein texte personnalisés](#custom-logs)

Par conséquent, vous n'avez pas besoin de modifier votre journalisation ni de déployer des changements dans les règles de traitement côté serveur. Vous pouvez gérer l'ensemble des paramètres depuis la [page de traitement Datadog][5].

La mise en place d'une stratégie de traitement de logs vous permet également d'implémenter une [convention de nommage d'attributs][6] pour votre organisation.

## Traitement de logs

### Logs d'intégration

Un [pipeline d'intégration][7] est automatiquement installé pour les logs d'intégration, afin de prendre en charge leur parsing et d'ajouter la facette correspondante dans Log Explorer. Consultez l'exemple de logs ELB ci-dessous :

{{< img src="logs/processing/elb_log_post_processing.png" alt="Post traitement de logs ELB"  style="width:70%;">}}

<div class="alert alert-info">
Consultez la liste <a href="/integrations/#collecte-de-logs-cat">actuelle des intégrations prises en charge disponibles</a>.
</div>

### Logs personnalisés

Les formats de logs peuvent être totalement personnalisés. Vous pouvez ainsi définir des règles de traitement personnalisées. Utilisez n'importe quelle syntaxe de log pour extraire tous vos attributs et, au besoin, les remapper pour qu'ils soient plus globaux et canoniques.

Par exemple, avec des règles de traitement personnalisées, vous pouvez transformer ce log :

{{< img src="logs/processing/log_pre_processing.png" alt="Prétraitement de logs"  style="width:50%;">}}

En celui ci :

{{< img src="logs/processing/log_post_processing.png" alt="Post traitement de logs"  style="width:50%;">}}

Consultez la [page Pipelines][1] pour découvrir comment effectuer des actions uniquement sur certains sous-ensembles de logs avec les [filtres de pipelines][8].

Pour accéder à la liste complète des processeurs disponibles, consultez la [page Processeurs][2].

Si vous souhaitez en savoir plus sur les possibilités de parsing pur de l'application Datadog, suivez le [guide d'entraînement au parsing][9]. Vous pouvez également consulter le guide des [recommandations de parsing][10] et du [dépannage de parsing][11].

## Attributs réservés

Si vos logs sont au format JSON, sachez que certains attributs sont réservés à Datadog :

### Attribut *date*

Par défaut, Datadog génère un timestamp et l'ajoute à un attribut de date lors de la réception des logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur en que date officielle du log :

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Vous pouvez également préciser des attributs alternatifs à utiliser comme source pour la date d'un log en définissant un [processeur de remappage de dates de log][12].

**Remarque** : Datadog rejette un log si sa date officielle est antérieure de plus de 6 heures.

<div class="alert alert-warning">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC 3164</a>.
</div>

### Attribut *message*

Par défaut, Datadog ingère la valeur du message comme corps de l'entrée du log. Cette valeur est alors mise en évidence et affichée dans le [flux de logs][13], où elle est indexée pour d'éventuelles [recherches plein texte][14].

### Attribut *status*

Chaque entrée de log peut spécifier un niveau de statut. Celui-ci peut est disponible pour la recherche à facettes au sein de Datadog. Cependant, si un fichier de log au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur en tant que statut officiel du log :

* `status`
* `severity`
* `level`
* `syslog.severity`

Si vous souhaitez remapper un statut existant dans l'attribut `status`, vous pouvez le faire avec le [remappeur de statuts de log][15]

### Attribut *host*

Utilisez l'Agent Datadog ou le format RFC 5424 pour définir automatiquement la valeur du host sur vos logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur comme host du log :

* `host`
* `hostname`
* `syslog.hostname`

### Attribut *source*
Si un fichier de log au format JSON comprend l'attribut `ddsource`, Datadog interprète sa valeur en tant que source du log. Pour utiliser les mêmes noms de source que ceux de Datadog, consultez la [référence du pipeline d'intégration][16].

### Attribut *service*

Utilisez l'Agent Datadog ou le format RFC 5424 pour définir automatiquement la valeur du service sur vos logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur comme service du log :

* `service`
* `syslog.appname`

### Attribut *trace_id*

Par défaut, [les traceurs de Datadog peuvent automatiquement injecter les ID de trace et de span dans les logs][17]. Cependant, si un log au format JSON comprend les attributs suivants, Datadog interprète sa valeur en que `trace_id` du log :

* `dd.trace_id`
* `contextMap.dd.trace_id`

### Modifier des attributs réservés

Vous pouvez désormais contrôler le hostname global, le service, le timestamp et le mappage principal du statut qui sont appliqués avant les pipelines de traitement. Cela s'avère utile lorsque des logs sont envoyés au format JSON ou à partir d'un Agent externe.

{{< img src="logs/processing/reserved_attribute.png" alt="Attributs réservés"  style="width:80%;">}}

Pour modifier les valeurs par défaut de chaque attribut réservé, accédez à la [page Configuration][5] et modifiez le champ `Reserved Attribute mapping` :

{{< img src="logs/processing/reserved_attribute_tile.png" alt="Carré d'attributs réservés"  style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/processing/pipelines
[2]: /fr/logs/processing/processors
[3]: /fr/logs/processing/processors/#attribute-remapper
[4]: /fr/logs/processing/processors/#grok-parser
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /fr/logs/processing/attributes_naming_convention
[7]: /fr/logs/processing/pipelines/#integration-pipelines
[8]: /fr/logs/processing/pipelines/#pipeline-filters
[9]: /fr/logs/processing/parsing
[10]: /fr/logs/faq/log-parsing-best-practice
[11]: /fr/logs/faq/how-to-investigate-a-log-parsing-issue
[12]: /fr/logs/processing/processors/#log-date-remapper
[13]: /fr/logs/explorer/?tab=logstream#visualization
[14]: /fr/logs/explorer/search
[15]: /fr/logs/processing/processors/#log-status-remapper
[16]: /fr/logs/faq/integration-pipeline-reference
[17]: /fr/tracing/connect_logs_and_traces/?tab=java