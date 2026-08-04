---
aliases:
- /fr/logs/processing/pipelines/
description: Analysez, enrichissez et gérez vos logs avec les pipelines et processeurs
  Datadog
further_reading:
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centre d'apprentissage
  text: Créer et gérer des pipelines de logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Consulter la liste complète des processeurs disponibles
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits*
- link: /logs/explorer/
  tag: Documentation
  text: Apprendre à explorer vos logs
- link: /logs/troubleshooting/
  tag: Documentation
  text: Dépannage des logs
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centre d'apprentissage
  text: Débogage des pipelines de logs
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centre d'apprentissage
  text: Traiter les logs automatiquement avec les pipelines d'intégration
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Surveiller Cloudflare Zero Trust avec la solution Cloud SIEM de Datadog
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Surveiller 1Password avec la solution Cloud SIEM de Datadog
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normalisez vos données avec le modèle de données commun OCSF dans Datadog
    Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: Blog
  text: Normalisez tous vos logs pour Cloud SIEM avec le processeur OCSF de Datadog
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: Blog
  text: Comment nous utilisons Datadog pour obtenir une visibilité complète et précise
    sur notre système de livraison d'e-mails
title: Pipelines
---
## Présentation {#overview}

<div class="alert alert-info">Les pipelines et processeurs décrits dans cette documentation sont spécifiques aux environnements de logs basés sur le cloud. Pour agréger, traiter et acheminer des logs sur site, consultez <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Observability Pipelines</a>.</div>

Datadog [analyse][1] automatiquement vos logs au format JSON. Vous pouvez ensuite ajouter de la valeur à tous vos logs (bruts et JSON) en les envoyant via un pipeline de traitement. Les pipelines traitent tous les formats de logs et les convertissent en un format commun dans Datadog. La mise en œuvre d'une stratégie de pipelines et de traitement de logs est bénéfique car elle introduit une [convention de nommage des attributs][2] pour votre organisation.

Avec les pipelines, les logs sont analysés et enrichis en les enchaînant séquentiellement via des [processeurs][3]. Cela permet d'extraire des informations ou des attributs significatifs à partir de texte semi-structuré afin de les réutiliser en tant que [facettes][4]. Chaque log qui passe par les pipelines est testé par rapport à chaque filtre de pipeline. S'il correspond à un filtre, tous les processeurs sont appliqués séquentiellement avant de passer au pipeline suivant.

Les pipelines et les processeurs peuvent être appliqués à tout type de log. Vous n'avez pas besoin de modifier la configuration de journalisation ou de déployer des changements sur des règles de traitement côté serveur. Tout peut être configuré depuis la [page de configuration des pipelines][5].

**Remarque** : Pour une utilisation optimale de la solution Log Management, Datadog recommande d'utiliser au maximum **20 processeurs par pipeline** et **10 règles d'analyse** au sein d'un [processeur Grok][6]. Datadog se réserve le droit de désactiver les règles de parsing, les processeurs ou les pipelines moins performants qui pourraient avoir une incidence sur les performances du service de Datadog.

## Autorisations des pipelines {#pipeline-permissions}

Les pipelines utilisent le [Access Control granulaire][7] pour gérer qui peut modifier les configurations des pipelines et des processeurs. Cela signifie que des autorisations peuvent être attribuées à des **rôles**, à des **utilisateurs individuels** et à des **équipes**, garantissant un contrôle précis sur les ressources de pipeline. Les pipelines sans aucune restriction sont considérés comme non restreints, ce qui signifie que tout utilisateur disposant de l'autorisation `logs_write_pipelines` peut modifier le pipeline et ses processeurs.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Configuration des autorisations de pipeline dans Datadog" style="width:80%;" >}}

Pour chaque pipeline, les administrateurs peuvent choisir les étendues de modification suivantes :

- **Éditeur** : Seuls les utilisateurs, équipes ou rôles spécifiés peuvent modifier la configuration et les processeurs du pipeline.
- **Éditeur de processeur** : Seuls les processeurs (y compris les pipelines imbriqués) peuvent être modifiés par les utilisateurs, équipes ou rôles spécifiés. Personne ne peut modifier les attributs du pipeline, tels que sa requête de filtre ou son ordre dans la liste globale des pipelines.

<div class="alert alert-warning">Accorder à un utilisateur l'accès à la liste de restriction d'un pipeline ne lui accorde pas automatiquement les droits correspondants. <code>logs_write_pipelines</code> ou <code>logs_write_processors</code> autorisations. Les administrateurs doivent accorder ces autorisations séparément.</div>

Vous pouvez gérer ces autorisations par programmation via [**API**][14] et [**Terraform**].

## Prétraitement {#preprocessing}

Le prétraitement des logs JSON a lieu avant que les logs n'entrent dans le traitement du pipeline. Le prétraitement exécute une série d'opérations basées sur des attributs réservés, tels que `timestamp`, `status`, `host`, `service` et `message`. Si vous avez des noms d'attributs différents dans vos logs JSON, utilisez le prétraitement pour mapper vos noms d'attributs de log à ceux de la liste des attributs réservés.

Le prétraitement des logs JSON est fourni avec une configuration par défaut qui fonctionne pour les expéditeurs de logs standard. Pour modifier cette configuration afin d'adapter des approches transfert de journaux personnalisées ou spécifiques :

1. Accédez à [Pipelines][8] dans Datadog et sélectionnez [{{< ui >}}Preprocessing for JSON logs{{< /ui >}}][9].

    **Remarque :** Le prétraitement des logs JSON est le seul moyen de définir l'un de vos attributs de log comme `host` pour vos logs.

2. Modifiez le mappage par défaut en fonction de l'attribut réservé :

{{< tabs >}}
{{% tab "Source" %}}

#### Attribut source {#source-attribute}

Si un fichier de log au format JSON inclut l'attribut `ddsource`, Datadog interprète sa valeur comme la source du log. Pour utiliser les mêmes noms de source que Datadog, consultez la [Bibliothèque de pipelines d'intégration][1].

**Remarque :** les logs provenant d'un environnement conteneurisé nécessitent l'utilisation d'une [variable d'environnement][2] pour remplacer les valeurs par défaut de la source et du service.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /fr/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Attribut host {#host-attribute}

L'utilisation de Datadog Agent ou du format RFC5424 définit automatiquement la valeur de le host sur vos logs. Cependant, si un fichier de log au format JSON inclut l'attribut suivant, Datadog interprète sa valeur comme le host du log :

* `host`
* `hostname`
* `syslog.hostname`

**Remarque :** dans Kubernetes, si un log JSON ingéré par le Datadog Agent contient un attribut de clé `host`, `hostname` ou `syslog.hostname`, cette valeur remplace le nom d'hôte par défaut de l'Agent pour ce log. Par conséquent, le log n'hérite pas des tags au niveau de le host attendus, lesquels sont définis pour l'hôte approprié. Dans ce cas, Datadog recommande de supprimer ces attributs pour garantir que vos logs puissent être attribués aux bons hôtes.

{{% /tab %}}
{{% tab "Date" %}}

#### Attribut date {#date-attribute}

Par défaut, Datadog génère un horodatage et l'ajoute dans un attribut date lorsque les logs sont reçus. Cependant, si un fichier de log au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur comme la date officielle du log :

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour la date d'un log en définissant un [processeur de remappage de dates de log][1].

**Remarque**: Datadog rejette une entrée de log si sa date officielle remonte à plus de 18 heures.

<div class="alert alert-danger">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a> et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /fr/logs/log_configuration/processors/log_date_remapper/
{{% /tab %}}
{{% tab "Message" %}}

#### Attribut message {#message-attribute}

Par défaut, Datadog ingère la valeur du message en tant que corps de l'entrée de log. Cette valeur est ensuite mise en évidence et affichée dans le [Log Explorer][1], où elle est indexée pour la [recherche plein texte][2]. Cependant, si un fichier de log au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur comme le message officiel du log :

* `message`
* `msg`
* `log`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le message d'un log en définissant un [processeur de remappage de messages de log][3].


[1]: /fr/logs/explorer/
[2]: /fr/logs/explorer/#filters-logs
[3]: /fr/logs/log_configuration/processors/log_message_remapper/
{{% /tab %}}
{{% tab "Status" %}}

#### Attribut de statut {#status-attribute}

Chaque entrée de journal peut spécifier un niveau de statut qui est rendu disponible pour la recherche à facettes dans Datadog. Cependant, si un fichier journal au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur comme le statut officiel du journal :

* `status`
* `severity`
* `level`
* `syslog.severity`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le statut d'un log en définissant un [processeur de remappage de statut de log][1].

[1]: /fr/logs/log_configuration/processors/log_status_remapper/
{{% /tab %}}
{{% tab "Service" %}}

#### Attribut de service {#service-attribute}

L'utilisation de le Datadog Agent ou du format RFC5424 définit automatiquement la valeur de service sur vos journaux. Cependant, si un fichier journal au format JSON inclut l'attribut suivant, Datadog interprète sa valeur comme le service du journal :

* `service`
* `syslog.appname`
* `dd.service`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le service d'un log en définissant un [processeur de remappage de services de log][1].


[1]: /fr/logs/log_configuration/processors/service_remapper/
{{% /tab %}}
{{% tab "Trace ID" %}}

#### Attribut de Trace ID{#trace-id-attribute}

Par défaut, [les SDK Datadog peuvent injecter automatiquement des ID de trace et de span dans vos journaux][1]. Cependant, si un fichier journal au format JSON inclut les attributs suivants, Datadog interprète sa valeur comme le `trace_id` du journal :

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le Trace ID d'un log en définissant un [processeur de remappage d'ID de trace][2].


[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[2]: /fr/logs/log_configuration/processors/trace_remapper/
{{% /tab %}}

{{% tab "ID de span" %}}

#### Attribut d'ID de span {#span-id-attribute}

Par défaut, les SDK Datadog peuvent [injecter automatiquement des ID de span dans vos journaux][1]. Cependant, si un fichier journal au format JSON inclut les attributs suivants, Datadog interprète sa valeur comme le `span_id` du journal :

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## Créer un pipeline {#create-a-pipeline}

1. Accédez à [Pipelines][8] dans Datadog.
2. Sélectionnez {{< ui >}}New Pipeline{{< /ui >}}.
3. Sélectionnez un journal dans l'aperçu du live tail pour appliquer un filtre, ou appliquez votre propre filtre. Choisissez un filtre dans le menu déroulant ou créez votre propre requête de filtre en sélectionnant l'icône {{< ui >}}</>{{< /ui >}}. Les filtres vous permettent de limiter les types de logs auxquels un pipeline s'applique.

    **Remarque**: Le filtrage du pipeline est appliqué avant tous les processeurs du pipeline. Pour cette raison, vous ne pouvez pas filtrer sur un attribut qui est extrait dans le pipeline lui-même.

4. Nommez votre pipeline.
5. (Facultatif) Ajoutez une description et des tags au pipeline pour indiquer son objectif et son propriétaire. Les tags de pipeline n'affectent pas les logs, mais peuvent être utilisés pour filtrer et effectuer des recherches sur la [page Pipelines][8].
6. Appuyez sur {{< ui >}}Create{{< /ui >}}.

Voici un exemple de log transformé par un pipeline :

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Exemple d'un log transformé par un pipeline" style="width:50%;">}}

### Pipelines d'intégration {#integration-pipelines}

<div class="alert alert-info">
Consultez la <a href="/integrations/#cat-log-collection">liste des intégrations prises en charge</a>.
</div>

Des pipelines de traitement d'intégration sont disponibles pour certaines sources lorsqu'elles sont configurées pour collecter des logs. Ces pipelines sont **en lecture seule** et analysent vos logs de manière adaptée à la source concernée. Pour les logs d'intégration, un pipeline d'intégration est automatiquement installé ; il se charge d'analyser vos logs et ajoute la facettes correspondante dans votre Log Explorer.

Pour afficher un pipeline d'intégration, accédez à la page [Pipelines][8]. Pour modifier un pipeline d'intégration, clonez-le, puis modifiez le clone :

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Clonage de pipeline" style="width:80%;">}}

Consultez l'exemple de logs ELB ci-dessous :

{{< img src="logs/processing/elb_log_post_processing.png" alt="Post-traitement des logs ELB" style="width:70%;">}}

**Remarque** : les pipelines d'intégration ne peuvent pas être supprimés, seulement désactivés.

### Bibliothèque de pipelines d'intégration {#integration-pipeline-library}

Pour consulter la liste complète des pipelines d'intégration proposés par Datadog, parcourez la [bibliothèque de pipelines d'intégration][10]. La bibliothèque de pipelines montre comment Datadog traite les différents formats de logs par défaut.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Bibliothèque de pipelines d'intégration" video=true style="width:80%;">}}

Pour utiliser un pipeline d'intégration, Datadog recommande d'installer l'intégration en configurant le log correspondant `source`. Une fois que Datadog reçoit le premier log avec cette source, l'installation est automatiquement déclenchée et le pipeline d'intégration est ajouté à la liste des pipelines de traitement. Pour configurer la source de log, consultez la [documentation d'intégration][11] correspondante.

Il est également possible de copier un pipeline d'intégration à l'aide du bouton Clone.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Clonage du pipeline depuis la bibliothèque" video=true style="width:80%;">}}

## Ajouter un processeur ou un pipeline imbriqué {#add-a-processor-or-nested-pipeline}

1. Accédez à [Pipelines][8] dans Datadog.
2. Survolez un pipeline et cliquez sur la flèche à côté pour développer les processeurs et les pipelines imbriqués.
3. Sélectionnez {{< ui >}}Add Processor{{< /ui >}} ou {{< ui >}}Add Nested Pipeline{{< /ui >}}.

### Processeurs {#processors}

Un processeur s'exécute au sein d'un pipeline pour effectuer une action de structuration de données. Consultez la [documentation des processeurs][3] pour savoir comment ajouter et configurer un processeur par type de processeur, dans l'application ou avec l'API.

Consultez [Analyse des dates][12] pour en savoir plus sur les formats de date et d'heure personnalisés et sur le paramètre `timezone` requis pour les horodatages non UTC.

### Priorité des attributs lorsque plusieurs processeurs correspondent {#attribute-precedence}

Lorsque plusieurs processeurs au sein de pipelines correspondants définissent le même attribut, le résultat dépend du type de processeur. Il existe trois comportements :

| Comportement | Description | Processeurs |
| --- | --- | --- |
| La dernière écriture l'emporte | La valeur définie par le processeur suivant (plus bas dans l'ordre) remplace la valeur précédente. | Analyseur Grok, processeur Catégorie, processeur Arithmétique, processeur Générateur de chaînes, processeur de recherche, analyseur d'URL, analyseur User-Agent, analyseur GeoIP, processeur Décodeur |
| Dépend de `override_on_conflict` | Suit le paramètre `override_on_conflict`. Par défaut (`false`), l'élément cible n'est pas remplacé s'il est déjà défini. | Remappeur, processeur de mappage de tableau |
| La première écriture l'emporte | Seul le premier processeur est appliqué (à l'exception du remappeur de date de journal, qui utilise le dernier). Au sein d'un même pipeline, la valeur du premier processeur est utilisée ; parmi plusieurs pipelines correspondants, le premier rencontré est appliqué. | Remappeur de statut de journal, Remappeur de service, Remappeur de message de journal, Remappeur de trace, Remappeur de span |

Pour plus de détails sur chaque processeur, consultez [Processeurs][3] .

### Pipelines imbriqués {#nested-pipelines}

Les pipelines imbriqués sont des pipelines au sein d'un pipeline. Utilisez des pipelines imbriqués pour diviser le traitement en deux étapes. Par exemple, utilisez d'abord un filtre de haut niveau tel que l'équipe, puis un second niveau de filtrage basé sur l'intégration, le service ou tout autre tag ou attribut.

Un pipeline peut inclure des pipelines imbriqués et des processeurs, tandis qu'un pipeline imbriqué peut seulement contenir des processeurs.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines imbriqués" style="width:80%;">}}

Déplacez un pipeline dans un autre pipeline pour le transformer en pipeline imbriqué :

1. Survolez le pipeline que vous souhaitez déplacer et cliquez sur l'icône {{< ui >}}Move to{{< /ui >}}.
1. Sélectionnez le pipeline dans lequel vous souhaitez déplacer le pipeline d'origine. **Remarque** : Les pipelines contenant des pipelines imbriqués ne peuvent être déplacés que vers une autre position de niveau supérieur. Ils ne peuvent pas être déplacés dans un autre pipeline.
1. Cliquez sur {{< ui >}}Move{{< /ui >}}.

## Prévisualiser les modifications du pipeline {#preview-pipeline-changes}

Lors de la création ou de la modification d'un pipeline ou de ses processeurs, vous pouvez prévisualiser l'impact de vos modifications sur les journaux avant de les appliquer. La prévisualisation utilise un suivi en temps réel de vos journaux, traités avec vos modifications proposées.

{{< img src="logs/processing/pipelines/pipeline_simulation.png" alt="La vue de simulation du pipeline montrant les processeurs du pipeline à gauche et la différence d'un journal sélectionné à droite" >}}

Pour chaque journal, comparez ses états avant et après. Sélectionnez la modification à comparer :

- **Vos modifications** : compare la version déployée actuelle du pipeline à la version avec vos modifications.
- **Pipeline entier** : compare le journal entrant dans le pipeline au journal après l'exécution de tout le pipeline.

Pour restreindre la liste des journaux, utilisez le filtre de requête ou filtrez par impact :

- **Tous les logs** : chaque log dans le suivi en direct.
- **Logs impactés** : uniquement les logs modifiés par vos modifications au cours de cette session.
- **Logs non impactés** : uniquement les logs que vos modifications laissent inchangés.

## Gérer vos pipelines {#manage-your-pipelines}

Identifiez quand la dernière modification d'un pipeline ou d'un processeur a été effectuée et quel utilisateur a effectué cette modification en utilisant les informations de modification sur le pipeline. Filtrez vos pipelines en utilisant ces informations de modification, ainsi que d'autres propriétés à facettes telles que si le pipeline est activé ou en lecture seule.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Comment gérer vos pipelines avec la recherche à facettes, les informations de modification de pipeline et la fenêtre modale de réorganisation" style="width:50%;">}}

Réorganisez les pipelines avec précision grâce à l'option {{< ui >}}Move to{{< /ui >}} dans le panneau d'options coulissant. Faites défiler et cliquez sur la position exacte pour déplacer le pipeline sélectionné à l'aide de la fenêtre modale {{< ui >}}Move to{{< /ui >}}. Les pipelines ne peuvent pas être déplacés dans d'autres pipelines en lecture seule. Les pipelines contenant des pipelines imbriqués ne peuvent être déplacés que vers d'autres positions de niveau supérieur. Ils ne peuvent pas être déplacés dans d'autres pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Comment réorganiser vos pipelines avec précision à l'aide de la fenêtre modale de déplacement" style="width:50%;">}}

Clonez des pipelines pour réutiliser les règles et processeurs existants sans avoir à recommencer. Lorsque vous clonez un pipeline, Datadog désactive automatiquement le pipeline que vous avez cloné. Cliquez sur le bouton bascule pour l'activer.

## Métriques d'utilisation estimées {#estimated-usage-metrics}

Les métriques d'utilisation estimées sont affichées pour chaque pipeline. Ceci indique le volume et le nombre de logs ingérés et modifiés par chaque pipeline. Chaque pipeline inclut un lien vers le [Dashboard d'utilisation estimée des logs][13] prêt à l'emploi. Ce tableau de bord propose des graphiques détaillés des métriques d'utilisation du pipeline.

{{< img src="logs/processing/pipelines/log_pipeline_statistics.png" alt="Comment obtenir une vue rapide des métriques d'utilisation de vos pipelines" style="width:50%;">}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/log_configuration/parsing/
[2]: /fr/logs/log_collection/?tab=host#attributes-and-tags
[3]: /fr/logs/log_configuration/processors/
[4]: /fr/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /fr/logs/log_configuration/processors/grok_parser/
[7]: /fr/account_management/rbac/granular_access/
[8]: https://app.datadoghq.com/logs/pipelines
[9]: https://app.datadoghq.com/logs/pipelines/remapping
[10]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[11]: /fr/integrations/#cat-log-collection
[12]: /fr/logs/log_configuration/parsing/?tab=matchers#parsing-dates
[13]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[14]: /fr/api/latest/restriction-policies/