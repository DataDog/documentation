---
algolia:
  tags:
  - follow ups
  - follow-up
  - follow up
aliases:
- /fr/service_management/incident_management/follow-ups/
- /fr/incident_response/incident_management/follow-ups
description: Gérez les tâches de suivi définies au cours de votre processus de réponse
  aux incidents.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: Documentation
  text: Paramètres d'incident
- link: /service_management/incident_management/integrations/slack/
  tag: Documentation
  text: Intégrez Slack à Datadog Incident Management
title: Suivis d'incident
---
## Vue d'ensemble {#overview}

Les suivis d'incident sont des tâches effectuées après la résolution d'un incident. Lors d'une enquête sur un incident, votre équipe peut identifier des problèmes nécessitant une attention particulière mais qui ne sont pas directement liés à la résolution du problème immédiat. Plutôt que de perdre la trace de ces éléments dans la précipitation pour rétablir le service, vous pouvez les capturer en tant que suivis à traiter une fois l'incident résolu.

Voici des exemples courants de création de suivis :

- **Améliorations de l'infrastructure** : logs mal configurés, alertes manquantes ou couverture de surveillance inadéquate découverte pendant l'incident
- **Dette technique** : code nécessitant une refactorisation, systèmes fragiles à renforcer ou documentation à mettre à jour
- **Améliorations des processus** : lacunes dans les runbooks, chemins d'escalade flous ou autorisations d'accès manquantes
- **Correctifs de cause racine** : problèmes sous-jacents nécessitant plus de temps pour être traités que l'atténuation immédiate

En consignant ces éléments en tant que suivis, votre équipe peut rester concentrée sur la résolution de l'incident tout en s'assurant que les améliorations importantes ne sont pas oubliées.

## Tâches de suivi suggérées par l'IA {#ai-suggested-follow-up-tasks}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Les tâches de suivi suggérées par l'IA ne sont pas prises en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Une fois un incident résolu, Incident AI scanne le canal de l'incident à la recherche de tâches de suivi mentionnées par les intervenants pendant l'incident. Ensuite, Incident AI vous invite à les examiner et à les créer en un seul clic. Les tâches enregistrées de cette manière apparaissent en tant que Incident Follow-ups dans Datadog Incident Management.

Pour afficher les tâches de suivi suggérées par l'IA :
1. Accédez à l'incident concerné dans Datadog.
1. Ouvrez l'onglet **Post-Incident** pour afficher une liste de toutes les tâches de suivi enregistrées depuis Slack.

## Créer et gérer des suivis {#create-and-manage-follow-ups}

Les suivis peuvent être créés à tout moment pendant un incident (même avant sa résolution), ce qui permet aux intervenants de documenter le travail nécessaire au fur et à mesure qu'ils le découvrent. Après la résolution, vous pouvez [exporter les suivis](#export-follow-ups) vers Jira ou Work Management pour les intégrer aux workflows existants de votre équipe.

**Depuis Datadog** : Accédez à l'onglet **Post-Incident** de l'incident pour générer une vue, créer, modifier et suivre tous les suivis associés à l'incident.

**Depuis Slack** : Dans le canal de l'incident, exécutez `/datadog followup` pour créer un nouveau suivi ou `/datadog followup list` pour générer une vue et gérer les suivis existants. Pour plus de commandes Slack, consultez [Integrate Slack with Datadog Incident Management][5].

## Suivis dans les carnets de post-mortem {#follow-ups-in-postmortem-notebooks}

Vous pouvez afficher les suivis directement dans un notebook post-mortem en utilisant lavariable de modèle `{{incident.follow-ups}}`. Lorsqu'elle est ajoutée à un modèle de post-mortem de Datadog Notebooks, cette variable affiche une liste d'éléments de suivi. Depuis la vue en liste de Datadog Notebooks, vous pouvez définir des dates d'échéance, attribuer des éléments ou créer de nouveaux éléments de suivi. Pour plus d'informations, consultez [Incident Postmortems][6].

## Exporter les suivis {#export-follow-ups}

Vous pouvez exporter les suivis depuis Incident Management vers Work Management ou Jira, ce qui vous permet de les suivre et de les gérer au sein des workflows existants de votre équipe. Vous pouvez exporter les suivis manuellement ou configurer Incident Management pour exporter automatiquement tous les suivis vers un projet Work Management ou Jira sélectionné.

Pour exporter les suivis :
1. Accédez à [**Incident Management settings > Follow-Ups**][1].
1. Ajoutez ou définissez un **export template** Un export template décrit la manière dont Datadog peut exporter et synchroniser un suivi.
1. Les types d'export template suivants sont pris en charge :
   1. [Work Management](#work-management-exports)
   1. [Jira](#jira-exports)
1. Lors de la définition d'un export template, vous pouvez configurer la manière dont Datadog doit définir les champs sur l'élément de travail Datadog ou le ticket Jira résultant, en utilisant les variables fournies par le suivi et son incident. Exemple :
   * `{{ title }}` représente le titre de l'incident
   * `{{ severity }}` représente la gravité de l'incident
   * `{{ follow_up_description }}` représente la description du suivi
   * `{{ follow_up_due_date }}` représente la date d'échéance du suivi
1. (Facultatif) Vous pouvez définir comment le statut est mappé entre les plateformes pour garantir que les changements de statut restent synchronisés sur les deux plateformes. Les suivis ont deux statuts : **Ouvert** et **Terminé**.

### Exportations manuelles et automatiques {#manual-and-automatic-exports}

Après avoir défini un export template, vous disposez de deux options :

| Export Option      | Description                                                                                      | When to Use                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Manual export**  | Exportez des suivis individuels à la demande depuis l'onglet Post-Incident de l'incident.                      | Utilisez cette option si vous préférez exporter sélectivement uniquement certains suivis.                            |
| **Automatic export** | Configurez Incident Management pour exporter automatiquement tous les suivis à l'aide de l'export template dès leur création. | Choisissez cette option si vous souhaitez que tous les suivis soient suivis par défaut dans votre système externe.         |

### Work Management exports {#work-management-exports}

Lorsque vous exportez vos suivis vers [Work Management][2], vous pouvez gérer, suivre et analyser vos suivis directement dans Datadog. Vous pouvez par exemple :

* Créer une vue de tous les éléments de suivi ouverts assignés à un utilisateur particulier dans Datadog
* Créer un dashboard Datadog qui affiche les éléments de suivi par équipe
* Synchroniser automatiquement ces éléments avec toute application externe avec laquelle Work Management s'intègre, y compris Jira et ServiceNow

Lorsque Datadog exporte un suivi d'incident vers Work Management, il crée un élément de travail pour le suivi dans le projet que vous avez sélectionné dans le modèle d'exportation.

**Status syncing:** Datadog synchronise le statut entre le suivi et l'élément de travail **dans les deux sens**, en suivant le mappage que vous avez défini dans l'export template.

**Assignee syncing:** Datadog synchronise le responsable entre le suivi et l'élément de travail **dans les deux sens**. Comme un élément de travail ne peut avoir qu'un seul responsable, seul le premier responsable du suivi y est ajouté.


### Jira exports {#jira-exports}

Pour exporter des suivis vers Jira, vous devez d'abord installer l'intégration Jira. Pour plus d'informations, consultez [Integrate Jira with Datadog Incident Management][4].

Lorsque Datadog exporte un suivi d'incident vers Jira, il crée un ticket Jira pour le suivi dans le projet que vous avez sélectionné dans l'export template.

**Status syncing:** Lorsque vous fermez ou ouvrez un suivi d'incident, Datadog synchronise automatiquement le statut du ticket Jira associé en fonction du mappage que vous avez défini dans l'export template. **Il s'agit d'une synchronisation unidirectionnelle.**

Les organisations qui ont besoin d'une synchronisation bidirectionnelle doivent exporter vers un projet Work Management configuré pour une synchronisation bidirectionnelle avec un projet Jira.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=follow-ups
[2]: /fr/service_management/case_management
[4]: /fr/integrations/jira/
[5]: /fr/service_management/incident_management/integrations/slack/#slack-commands
[6]: /fr/incident_response/incident_management/post_incident/postmortems