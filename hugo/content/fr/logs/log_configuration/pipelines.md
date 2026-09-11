---
aliases:
- /fr/logs/processing/pipelines/
description: Analysez, enrichissez et gérez vos journaux avec les pipelines et processeurs
  Datadog
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
- link: /logs/troubleshooting/
  tag: Documentation
  text: Dépannage des logs
- link: https://learn.datadoghq.com/courses/integration-pipelines
  tag: Centre d'apprentissage
  text: Traiter les logs automatiquement avec les pipelines d'intégration
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Centre d'apprentissage
  text: Créer et gérer des pipelines de logs
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
  text: Normalisez tous les journaux pour Cloud SIEM avec le processeur OCSF de Datadog
- link: https://www.datadoghq.com/blog/internal-monitoring-email-delivery
  tag: Blog
  text: Comment nous utilisons Datadog pour obtenir une visibilité complète et détaillée
    sur notre système de livraison d'emails
title: Pipelines
---
## Aperçu {#overview}

<div class="alert alert-info">Les pipelines et processeurs décrits dans cette documentation sont spécifiques aux environnements de journalisation basés sur le cloud. Pour agréger, traiter et acheminer les journaux sur site, consultez <a href="https://docs.datadoghq.com/observability_pipelines/configuration/set_up_pipelines/">Pipelines d'observabilité</a>.</div>

Datadog analyse automatiquement les journaux au format JSON. Vous pouvez ensuite ajouter de la valeur à tous vos journaux (bruts et JSON) en les envoyant à travers un pipeline de traitement. Les pipelines traitent tous les formats de logs et les convertissent en un format commun dans Datadog. La mise en œuvre d'une stratégie de pipelines et de traitement des journaux est bénéfique, car elle introduit une [convention de nommage des attributs][2] pour votre organisation.

Avec les pipelines, les journaux sont analysés et enrichis en passant séquentiellement par des [processeurs][3]. Cela extrait des informations ou des attributs significatifs à partir d'un texte semi-structuré pour les réutiliser sous forme de [facettes][4]. Chaque journal qui passe par les pipelines est testé contre chaque filtre de pipeline. S'il correspond à un filtre, tous les processeurs sont appliqués séquentiellement avant de passer au pipeline suivant.

Les pipelines et processeurs peuvent être appliqués à tout type de journal. Vous n'avez pas besoin de modifier la configuration de journalisation ou de déployer des changements à des règles de traitement côté serveur. Tout peut être configuré dans la [page de configuration des pipelines][5].

**Remarque** : Pour une utilisation optimale de la solution de gestion des journaux, Datadog recommande d'utiliser au maximum **20 processeurs par pipeline** et **10 règles de parsing** dans un [processeur Grok][6]. Datadog se réserve le droit de désactiver les règles de parsing, les processeurs ou les pipelines moins performants qui pourraient avoir une incidence sur les performances du service de Datadog.

## Permissions des pipelines {#pipeline-permissions}

Les pipelines utilisent le [Contrôle d'Accès Granulaire][7] pour gérer qui peut modifier les configurations de pipeline et de processeur. Cela signifie que des permissions peuvent être attribuées à **des rôles**, **des utilisateurs individuels** et **des équipes**, garantissant un contrôle précis sur les ressources des pipelines. Les pipelines sans aucune restriction sont considérés comme non restreints, ce qui signifie que tout utilisateur ayant la permission `logs_write_pipelines` peut modifier le pipeline et ses processeurs.

{{< img src="/logs/processing/pipelines/pipeline_permissions_grace.png" alt="Configuration des permissions des pipelines dans Datadog" style="width:80%;" >}}

Pour chaque pipeline, les administrateurs peuvent choisir les portées d'édition suivantes :

- **Éditeur** : Seuls les utilisateurs, équipes ou rôles spécifiés peuvent modifier la configuration du pipeline et des processeurs.
- **Éditeur de Processeurs** : Seuls les processeurs (y compris les pipelines imbriqués) peuvent être modifiés par les utilisateurs, équipes ou rôles spécifiés. Personne ne peut modifier les attributs du pipeline, tels que sa requête de filtre ou son ordre dans la liste globale des pipelines.

<div class="alert alert-warning">Accorder à un utilisateur l'accès à la liste des restrictions d'un pipeline n'accorde pas automatiquement les <code>logs_write_pipelines</code> ou <code>logs_write_processors</code> permissions. Les administrateurs doivent accorder ces permissions séparément.</div>

Vous pouvez gérer ces permissions de manière programmatique via [**API**][14] et **Terraform**.

## Prétraitement {#preprocessing}

Le prétraitement des journaux JSON se produit avant que les journaux n'entrent dans le traitement du pipeline. Le prétraitement exécute une série d'opérations basées sur des attributs réservés, tels que `timestamp`, `status`, `host`, `service` et `message`. Si vous avez des noms d'attributs différents dans vos journaux JSON, utilisez le prétraitement pour mapper vos noms d'attributs de journal à ceux de la liste des attributs réservés.

Le prétraitement des journaux JSON est livré avec une configuration par défaut qui fonctionne pour les expéditeurs de journaux standard. Pour modifier cette configuration afin d'adapter des approches d'expédition de journaux personnalisées ou spécifiques :

1. Accédez à [Pipelines][8] dans Datadog et sélectionnez [Prétraitement pour les journaux JSON][9].

    **Remarque :** Le prétraitement des journaux JSON est le seul moyen de définir l'un de vos attributs de journal comme `host` pour vos journaux.

2. Modifier le mappage par défaut en fonction de l'attribut réservé :

{{< tabs >}}
{{% tab "Source" %}}

#### Attribut source {#source-attribute}

Si un fichier journal au format JSON inclut l'attribut `ddsource`, Datadog interprète sa valeur comme la source du journal. Pour utiliser les mêmes noms de source que ceux utilisés par Datadog, consultez la [Bibliothèque de pipeline d'intégration][1].

**Remarque** : Les journaux provenant d'un environnement conteneurisé nécessitent l'utilisation d'une [variable d'environnement][2] pour remplacer les valeurs par défaut de source et de service.


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /fr/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### Attribut hôte {#host-attribute}

L'utilisation de l'Agent Datadog ou du format RFC5424 définit automatiquement la valeur de l'hôte dans vos journaux. Cependant, si un fichier journal au format JSON inclut l'attribut suivant, Datadog interprète sa valeur comme l'hôte du journal :

* `host`
* `hostname`
* `syslog.hostname`

**Remarque** : Dans Kubernetes, si un journal JSON ingéré par l'Agent Datadog contient une clé d'attribut `host`, `hostname` ou `syslog.hostname`, cette valeur remplace le nom d'hôte par défaut de l'Agent pour ce journal. En conséquence, le journal n'hérite pas des balises de niveau hôte attendues, qui sont définies au niveau de l'hôte, du bon hôte. Dans ce cas, Datadog recommande de supprimer ces attributs pour s'assurer que vos journaux peuvent être attribués aux bons hôtes.

{{% /tab %}}
{{% tab "Date" %}}

#### Attribut date {#date-attribute}

Par défaut, Datadog génère un horodatage et l'ajoute dans un attribut de date lorsque les journaux sont reçus. Cependant, si un fichier journal au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur comme la date officielle du journal :

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour la date d'un log en définissant un [processeur de remappage de dates de log][1].

**Remarque** : Datadog rejette une entrée de journal si sa date officielle est antérieure de plus de 18 heures.

<div class="alert alert-danger">
Les formats de date reconnus sont : <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (le format EPOCH en millisecondes)</a>, et <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


[1]: /fr/logs/log_configuration/processors/log_date_remapper/
{{% /tab %}}
{{% tab "Message" %}}

#### Attribut message {#message-attribute}

Par défaut, Datadog ingère la valeur du message comme le corps de l'entrée du journal. Cette valeur est ensuite mise en évidence et affichée dans le [Log Explorer][1], où elle est indexée pour [la recherche en texte intégral][2]. Cependant, si un fichier journal au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur comme le message officiel du journal :

* `message`
* `msg`
* `log`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le message d'un log en définissant un [processeur de remappage de messages de log][3].


[1]: /fr/logs/explorer/
[2]: /fr/logs/explorer/#filters-logs
[3]: /fr/logs/log_configuration/processors/log_message_remapper/
{{% /tab %}}
{{% tab "Status" %}}

#### Attribut statut {#status-attribute}

Chaque entrée de journal peut spécifier un niveau de statut qui est disponible pour la recherche facettée dans Datadog. Cependant, si un fichier journal au format JSON inclut l'un des attributs suivants, Datadog interprète sa valeur comme le statut officiel du journal :

* `status`
* `severity`
* `level`
* `syslog.severity`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le statut d'un log en définissant un [processeur de remappage de statut de log][1].

[1]: /fr/logs/log_configuration/processors/log_status_remapper/
{{% /tab %}}
{{% tab "Service" %}}

#### Attribut de service {#service-attribute}

L'utilisation de l'Agent Datadog ou du format RFC5424 définit automatiquement la valeur de service dans vos journaux. Cependant, si un fichier journal au format JSON inclut l'attribut suivant, Datadog interprète sa valeur comme le service du journal :

* `service`
* `syslog.appname`
* `dd.service`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour le service d'un log en définissant un [processeur de remappage de services de log][1].


[1]: /fr/logs/log_configuration/processors/service_remapper/
{{% /tab %}}
{{% tab "ID de trace" %}}

#### Attribut ID de trace {#trace-id-attribute}

Par défaut, [les SDK Datadog peuvent automatiquement injecter des ID de trace et de span dans vos journaux][1]. Cependant, si un journal au format JSON inclut les attributs suivants, Datadog interprète leur valeur comme le `trace_id`Span ID du journal :

* `dd.trace_id`
* `contextMap.dd.trace_id`
* `named_tags.dd.trace_id`
* `trace_id`

Vous pouvez préciser des attributs alternatifs à utiliser comme source pour l'ID de trace d'un log en définissant un [processeur de remappage d'ID de trace][2].


[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[2]: /fr/logs/log_configuration/processors/trace_remapper/
{{% /tab %}}

{{% tab "ID de span" %}}

#### Attribut ID de span {#span-id-attribute}

Par défaut, les SDK Datadog peuvent [automatiquement injecter des ID de span dans vos journaux][1]. Cependant, si un journal au format JSON inclut les attributs suivants, Datadog interprète leur valeur comme le `span_id`Span ID du journal :

* `dd.span_id`
* `contextMap.dd.span_id`
* `named_tags.dd.span_id`
* `span_id`

[1]: /fr/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}

{{< /tabs >}}

## Créer un pipeline {#create-a-pipeline}

1. Accédez à [Pipelines][8] dans Datadog.
2. Sélectionnez **Nouveau Pipeline**.
3. Sélectionnez un journal dans l'aperçu en temps réel pour appliquer un filtre, ou appliquez votre propre filtre. Choisissez un filtre dans le menu déroulant ou créez votre propre requête de filtre en sélectionnant l'icône ****. Les filtres vous permettent de limiter les types de logs auxquels un pipeline s'applique.

    **Remarque** : Le filtrage des pipelines est appliqué avant tout processeur du pipeline. Pour cette raison, vous ne pouvez pas filtrer sur un attribut qui est extrait dans le pipeline lui-même.

4. Nommez votre pipeline.
5. (Optionnel) Ajoutez une description et des étiquettes au pipeline pour indiquer son objectif et sa propriété. Les étiquettes de pipeline n'affectent pas les journaux, mais peuvent être utilisées pour filtrer et rechercher dans la [page des Pipelines][8].
6. Appuyez sur **Créer**.

Voici un exemple de log transformé par un pipeline :

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="Un exemple de journal transformé par un pipeline." style="width:50%;">}}

### Pipelines d'intégration {#integration-pipelines}

<div class="alert alert-info">
Voir la <a href="/integrations/#cat-log-collection">liste des intégrations prises en charge</a>.
</div>

Les pipelines de traitement d'intégration sont disponibles pour certaines sources lorsqu'elles sont configurées pour collecter des journaux. Ces pipelines sont **en lecture seule** et analysent vos journaux de manière appropriée pour la source particulière. Pour les journaux d'intégration, un pipeline d'intégration est automatiquement installé pour s'occuper de l'analyse de vos journaux et ajoute la facette correspondante dans votre Explorateur de Journaux.

Pour voir un pipeline d'intégration, naviguez vers la page [Pipelines][8]. Pour modifier un pipeline d'intégration, clonez-le puis modifiez le clone :

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Clonage de pipeline" style="width:80%;">}}

Consultez l'exemple de logs ELB ci-dessous :

{{< img src="logs/processing/elb_log_post_processing.png" alt="Post-traitement des journaux ELB" style="width:70%;">}}

**Remarque** : Les pipelines d'intégration ne peuvent pas être supprimés, seulement désactivés.

### Bibliothèque de pipelines d'intégration {#integration-pipeline-library}

Pour voir la liste complète des pipelines d'intégration que Datadog propose, parcourez la [bibliothèque de pipelines d'intégration][10]. La bibliothèque de pipelines montre comment Datadog traite différents formats de journaux par défaut.

{{< img src="logs/processing/pipelines/integration-pipeline-library.mp4" alt="Bibliothèque de pipelines d'intégration" video=true style="width:80%;">}}

Pour utiliser un pipeline d'intégration, Datadog recommande d'installer l'intégration en configurant le journal correspondant `source`. Après que Datadog ait reçu le premier journal avec cette source, l'installation est automatiquement déclenchée et le pipeline d'intégration est ajouté à la liste des pipelines de traitement. Pour configurer la source de journal, consultez la [documentation d'intégration correspondante][11].

Il est également possible de copier un pipeline d'intégration à l'aide du bouton Clone.

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.mp4" alt="Clonage de pipeline depuis la bibliothèque" video=true style="width:80%;">}}

## Ajoutez un processeur ou un pipeline imbriqué {#add-a-processor-or-nested-pipeline}

1. Naviguez vers [Pipelines][8] dans Datadog.
2. Survolez un pipeline et cliquez sur la flèche à côté pour développer les processeurs et les pipelines imbriqués.
3. Sélectionnez **Ajouter un processeur** ou **Ajouter un pipeline imbriqué**.

### Processeurs {#processors}

Un processeur s'exécute au sein d'un pipeline pour réaliser une action de structuration des données. Consultez la [documentation des processeurs][3] pour apprendre à ajouter et configurer un processeur par type de processeur, dans l'application ou via l'API.

Consultez [Analyse des dates][12] pour en savoir plus sur les formats de date et d'heure personnalise9s et le parame8tre `timezone` requis pour les horodatages non-UTC.

### Pipelines imbriqués {#nested-pipelines}

Les pipelines imbriqués sont des pipelines à l'intérieur d'un pipeline. Utilisez des pipelines imbriqués pour diviser le traitement en deux étapes. Par exemple, utilisez d'abord un filtre de haut niveau tel que l'équipe, puis un second niveau de filtrage basé sur l'intégration, le service ou tout autre tag ou attribut.

Un pipeline peut inclure des pipelines imbriqués et des processeurs, tandis qu'un pipeline imbriqué peut seulement contenir des processeurs.

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Pipelines imbriqués" style="width:80%;">}}

Déplacez un pipeline dans un autre pipeline pour le transformer en pipeline imbriqué :

1. Survolez le pipeline que vous souhaitez déplacer et cliquez sur l'icône **Déplacer vers**.
1. Sélectionnez le pipeline dans lequel vous souhaitez déplacer le pipeline d'origine. **Remarque** : Les pipelines contenant des pipelines imbrique9s ne peuvent eatre de9place9s qu'e0 une autre position de niveau supe9rieur. Ils ne peuvent pas être déplacés dans un autre pipeline.
1. Cliquez sur **Déplacer**.

## Gérez vos pipelines {#manage-your-pipelines}

Identifiez quand le dernier changement a été apporté à un pipeline ou à un processeur et quel utilisateur a effectué le changement en utilisant les informations de modification sur le pipeline. Filtrez vos pipelines en utilisant ces informations de modification, ainsi que d'autres propriétés facettées telles que si le pipeline est activé ou en lecture seule.

{{< img src="logs/processing/pipelines/log_pipeline_management.png" alt="Comment gérer vos pipelines avec la recherche facettée, les informations de modification de pipeline et la modalité de réorganisation" style="width:50%;">}}

Réorganisez les pipelines précisément avec l'option `Move to` dans le panneau d'options glissantes. Faites défiler et cliquez sur la position exacte pour déplacer le pipeline sélectionné à l'aide de la fenêtre modale `Move to`. Les pipelines ne peuvent pas être déplacés dans d'autres pipelines en lecture seule. Les pipelines contenant des pipelines imbriqués ne peuvent être déplacés qu'à d'autres positions de niveau supérieur. Ils ne peuvent pas être déplacés dans d'autres pipelines.

{{< img src="logs/processing/pipelines/log_pipeline_move_to.png" alt="Comment réorganiser vos pipelines précisément en utilisant la fenêtre modale de déplacement" style="width:50%;">}}

Clonez des pipelines pour réutiliser des règles et des processeurs existants sans avoir à recommencer. Lorsque vous clonez un pipeline, Datadog désactive automatiquement le pipeline que vous avez cloné. Cliquez sur le bouton pour activer.

## Métriques d'utilisation estimées {#estimated-usage-metrics}

Les métriques d'utilisation estimées sont affichées pour chaque pipeline. Cela montre le volume et le nombre de journaux étant ingérés et modifiés par chaque pipeline. Chaque pipeline inclut un lien vers le tableau de bord [Métriques d'utilisation estimées des journaux][13] prêt à l'emploi. Ce tableau de bord offre des graphiques détaillés des métriques d'utilisation du pipeline.

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