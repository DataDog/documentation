---
aliases:
- /fr/logs/processing/pipelines/
description: Parser vos logs à l'aide du processeur Grok
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Consulter la liste complète des processeurs disponibles
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: https://learn.datadoghq.com/courses/going-deeper-with-logs-processing
  tag: Centre d'apprentissage
  text: Des analyses plus poussées grâce au traitement des logs
title: Pipelines
---

## Présentation

Datadog [parse][1] automatiquement les logs JSON. Lorsque les logs ne sont pas au format JSON, vous pouvez enrichir leurs données brutes en les faisant passer par un pipeline de traitement. Les pipelines traitent la grande majorité des formats de logs et les convertissent en un format commun dans Datadog. La mise en œuvre de pipelines de logs et d'une stratégie de traitement vous permet également de bénéficier d'une [convention de nommage des attributs][2] à l'échelle de votre organisation.

Avec les pipelines, les logs sont assemblés de façon séquentielle via des [processeurs][3] afin d'être parsés et enrichis. Cette étape permet d'extraire des informations ou des attributs utiles à partir de texte semi-structuré, afin de les réutiliser sous la forme de [facettes][4]. Lorsqu'un log passe par les pipelines, tous les filtres de pipeline lui sont appliqués. S'il répond aux critères d'un filtre, tous les processeurs associés lui sont appliqués de façon séquentielle. Il passe ensuite au prochain pipeline.

Les pipelines et les processeurs peuvent être appliqués à tout type de log. Vous n'avez pas besoin de modifier la configuration de votre journalisation ni de déployer des modifications dans les règles de traitement côté serveur. Vous pouvez gérer l'ensemble des paramètres depuis la [page de configuration des pipelines][5].

**Remarque** : pour une utilisation optimale de la solution Log Management, Datadog recommande d'utiliser au maximum 20 processeurs par pipeline et 10 règles de parsing dans un [processeur Grok][6]. Datadog se réserve le droit de désactiver les règles de parsing, les processeurs ou les pipelines peu optimisés qui pourraient avoir une incidence sur les performances du service de Datadog.

## Prétraitement

Le prétraitement des logs JSON intervient avant le traitement par le pipeline. Le prétraitement consiste à effectuer une série d'opérations basées sur des attributs réservés, tels que `timestamp`, `status`, `host`, `service` et `message`. Si les attributs figurant dans vos logs JSON présentent des noms différents, utilisez le prétraitement pour mapper les noms d'attribut de vos logs à ceux figurant dans la liste d'attributs réservés.

Le prétraitement des logs JSON inclut une configuration par défaut qui prend en charge les redirecteurs de log standard. Pour modifier cette configuration afin de l'adapter à une stratégie de transmission des logs personnalisée ou spécifique, procédez comme suit :

1. Accédez à la section [Pipelines][7] de l'application Datadog, puis sélectionnez [Preprocessing for JSON logs][8].

    **Remarque** : le prétraitement des logs JSON est le seul moyen de définir l'un de vos attributs de log en tant que `host` pour vos logs.

2. Modifiez le mapping par défaut en fonction de l'attribut réservé :

{{< tabs >}}
{{% tab "Source" %}}

#### Attribut source

Si un fichier de log au format JSON comprend l'attribut `ddsource`, Datadog interprète sa valeur en tant que source du log. Pour utiliser les mêmes noms de source que ceux de Datadog, consultez la [bibliothèque des pipelines d'intégration][1].

**Remarque** : les logs provenant d'un environnement conteneurisé nécessitent l'utilisation d'une [variable d'environnement][2] pour remplacer les valeurs source et service par défaut.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /fr/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Attribut host

Utilisez l'Agent Datadog ou le format RFC 5424 pour définir automatiquement la valeur du host sur vos logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur comme host du log :

* `host`
* `hostname`
* `syslog.hostname`

{{% /tab %}}
{{% tab "Date" %}}

#### Attribut date

Par défaut, Datadog génère un timestamp et l'ajoute à un attribut de date lors de la réception des logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur en tant que date officielle du log :

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour la date d'un log en définissant un [processeur de remappage de dates de log][1].

**Remarque** : Datadog rejette un log si sa date officielle est antérieure de plus de 18 heures.

<div class="alert alert-warning">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO 8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC 3164</a>.
</div>


[1]: /fr/logs/log_configuration/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message" %}}

#### Attribut message

Par défaut, Datadog ingère la valeur du message comme corps de l'entrée du log. Cette valeur est alors mise en évidence et affichée dans le [Log Explorer][1], où elle est indexée pour d'éventuelles [recherches en texte intégral][2].

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le message d'un log en définissant un [processeur de remappage de messages de log][3].


[1]: /fr/logs/explorer/
[2]: /fr/logs/explorer/#filters-logs
[3]: /fr/logs/log_configuration/processors/#log-message-remapper
{{% /tab %}}
{{% tab "Status" %}}

#### Attribut status

Chaque entrée de log peut spécifier un niveau de statut. Celui-ci peut est disponible pour la recherche à facettes au sein de Datadog. Cependant, si un fichier de log au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur en tant que statut officiel du log :

* `status`
* `severity`
* `level`
* `syslog.severity`

Pour remapper un statut existant dans l'attribut `status`, utilisez le [remappeur de statuts de log][1].

[1]: /fr/logs/log_configuration/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service" %}}

#### Attribut service

Utilisez l'Agent Datadog ou le format RFC 5424 pour définir automatiquement la valeur du service sur vos logs. Cependant, si un fichier de log au format JSON comprend l'un des attributs suivants, Datadog interprète sa valeur comme service du log :

* `service`
* `syslog.appname`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le service d'un log en définissant un [processeur de remappage de services de log][1].


[1]: /fr/logs/log_configuration/processors/#service-remapper
{{% /tab %}}
{{% tab "Trace ID" %}}

#### Attribut Trace ID

Par défaut, [les traceurs de Datadog peuvent automatiquement injecter les ID de trace et de span dans les logs][1]. Cependant, si un log JSON comprend les attributs suivants, Datadog interprète sa valeur en tant que `trace_id` du log :

* `dd.trace_id`
* `contextMap.dd.trace_id`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour l'ID de trace d'un log en définissant un [processeur de remappage d'ID de trace][2].


[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[2]: /fr/logs/log_configuration/processors/#trace-remapper
{{% /tab %}}
{{< /tabs >}}

## Créer un pipeline

1. Accédez à la section [Pipelines][7] de l'application Datadog.
2. Sélectionnez **New Pipeline**.
3. Sélectionnez un log dans l'aperçu Live Tail pour appliquer un filtre, ou utilisez votre propre filtre. Choisissez un filtre dans le menu déroulant ou créez votre propre requête de filtre avec l'icône **</>**. Les filtres vous permettent de limiter les types de logs qui passent par un pipeline.

    **Remarque** : les filtres de pipeline sont appliqués avant tout traitement par les processeurs du pipeline. Par conséquent, vous ne pouvez pas appliquer un filtre basé sur un attribut qui est extrait dans le pipeline.

4. Donnez un nom à votre pipeline.
5. (Facultatif) Accordez un accès en modification aux processeurs dans le pipeline.
6. (Facultatif) Ajoutez des tags et une description au pipeline. La description peut être utilisée pour indiquer l'objectif du pipeline et l'équipe qui en est propriétaire.
7. Sélectionnez **Save**.

Voici un exemple de log converti par un pipeline :

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Un exemple de log converti par un pipeline" style="width:50%;">}}

### Pipelines d'intégration

<div class="alert alert-info">
Consultez la <a href="/integrations/#cat-log-collection">liste des intégrations prises en charge disponibles</a>.
</div>

Les pipelines de traitement d'intégration sont disponibles pour certaines sources lorsqu'elles sont configurées pour recueillir les logs. Ces pipelines disposent d'un accès en **lecture seule** et effectuent le parsing de vos logs en tenant compte de la source en question. Un pipeline d'intégration est automatiquement installé pour les logs d'intégration, afin de prendre en charge leur parsing et d'ajouter la facette correspondante dans Log Explorer.

Pour afficher un pipeline d'intégration, accédez à la page [Pipelines][5]. Pour modifier un pipeline d'intégration, clonez-le, puis modifiez le doublon :

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="cloner un pipeline" style="width:80%;">}}

Consultez l'exemple de logs ELB ci-dessous :

{{< img src="logs/processing/elb_log_post_processing.png" alt="Post traitement de logs ELB" style="width:70%;">}}

### Bibliothèque de pipelines d'intégration

Pour afficher la liste complète des pipelines d'intégration proposés par Datadog, consultez la [bibliothèque de pipelines d'intégration][7]. Cette bibliothèque indique également comment Datadog traite les différents formats de log par défaut.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Bibliothèque de pipelines d'intégration" video=true style="width:80%;">}}

Pour utiliser un pipeline d'intégration, Datadog vous conseille d'installer l'intégration en configurant la `source` de logs correspondante. Lorsque Datadog reçoit le premier log avec cette source, l'installation se déclenche automatiquement et le pipeline d'intégration est ajouté à la liste des pipelines de traitement. Pour configurer la source de logs, consultez la [documentation de l'intégration][9] correspondante.

Il est également possible de copier un pipeline d'intégration à l'aide du bouton Clone.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Cloner un pipeline à partir de la bibliothèque" video=true style="width:80%;">}}

## Ajouter un processeur ou un pipeline imbriqué

1. Accédez à la section [Pipelines][7] de l'application Datadog.
2. Passez le curseur sur un pipeline, puis cliquez sur la flèche en regard du pipeline pour développer la section relative aux processeurs pipelines imbriqués.
3. Sélectionnez **Add Processor** ou **Add Nested Pipeline**.

### Processeurs

Un processeur s'exécute dans un pipeline afin d'effectuer une action de structuration de données. Consultez la [documentation relative aux processeurs][3] pour découvrir comment ajouter et configurer chaque type de processeur, que ce soit dans l'application ou avec l'API.

### Pipelines imbriqués

Les pipelines imbriqués sont des pipelines au sein d'un autre pipeline. Utilisez les pipelines imbriqués pour diviser le traitement en deux étapes. Par exemple, vous pouvez commencer par appliquer un filtre de niveau supérieur basé par exemple sur l'équipe, puis un deuxième niveau de filtrage basé sur l'intégration, le service ou tout autre tag ou attribut.

Un pipeline peut inclure des pipelines imbriqués et des processeurs, tandis qu'un pipeline imbriqué peut seulement contenir des processeurs.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines imbriqués" style="width:80%;">}}

Il est possible de déplacer un pipeline vers un autre pipeline pour le transformer en pipeline imbriqué :

{{< img src="logs/processing/pipelines/move_to_pipeline.mp4" alt="Faire glisser et déposer des pipelines imbriqués" video="true"  width="80%" >}}

## Gérer vos pipelines

Déterminez à quel moment un pipeline ou un processeur a été modifié pour la dernière fois et l'utilisateur qui est à l'origine de la modification en utilisant les informations sur les modifications du pipeline. Filtrez vos pipelines à l'aide de ces informations et d'autres propriétés utilisables comme facettes, par exemple si le pipeline est activé ou en lecture seule.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Comment gérer vos pipelines avec la recherche à facettes, les informations sur les modifications de pipeline et la fenêtre de réorganisation" style="width:50%;">}}

Réorganisez vos pipelines avec précision à l'aide de l'option `Move to` dans le volet d'options glissant. Faites défiler l'écran, puis cliquez sur la position exacte vers laquelle déplacer le pipeline sélectionné à l'aide de la fenêtre `Move to`. Il n'est pas possible de déplacer des pipelines vers d'autres pipelines en lecture seule. Les pipelines contenant des pipelines imbriqués peuvent uniquement être déplacés vers une position supérieure. Ils ne peuvent pas être déplacés vers d'autres pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Comment réorganiser vos pipelines avec précision à l'aide de la fenêtre Move to" style="width:50%;">}}

## Métriques d'estimation d'utilisation

Les métriques d'estimation d'utilisation fournissent des données propres à un pipeline. Elles indiquent le volume et le nombre de logs ingérés et modifiés par chaque pipeline. Vous disposez également d'un lien vers le [dashboard d'estimation de l'utilisation des logs][10] prêt à l'emploi pour chaque pipeline. Ce dashboard présente les métriques d'utilisation d'un pipeline à l'aide de graphiques détaillés.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="Comment consulter une vue d'ensemble des métriques d'utilisation de vos pipelines" style="width:50%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/log_configuration/parsing/
[2]: /fr/logs/log_collection/?tab=host#attributes-and-tags
[3]: /fr/logs/log_configuration/processors/
[4]: /fr/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /fr/logs/log_configuration/processors/?tab=ui#grok-parser
[7]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[8]: https://app.datadoghq.com/logs/pipelines/remapping
[9]: /fr/integrations/#cat-log-collection
[10]: https://app.datadoghq.com/dash/integration/logs_estimated_usage