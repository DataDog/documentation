---
aliases:
- /fr/service_management/events/triage_inbox/
further_reading:
- link: /events/ingest/
  tag: doc
  text: Envoyer des événements à Datadog
- link: /events/correlation/
  tag: doc
  text: En savoir plus sur la corrélation d'événements
- link: https://www.datadoghq.com/blog/datadog-event-management/
  tag: Blog
  text: Agrégez, corrélez et agissez sur les alertes plus rapidement grâce à Event
    Management propulsée par AIOps.
site_support_id: case_management
title: Event Management Triage Inbox
---
## Vue d'ensemble {#overview}

La Datadog Event Management [Triage Inbox][4] simplifie la réponse aux incidents en consolidant les événements associés provenant de n'importe quelle source en éléments de travail exploitables. Cette vue centralisée réduit le bruit et aide les équipes à trier, investiguer et collaborer plus efficacement. Grâce aux vues enregistrées personnalisables, vous pouvez rester concentré sur les éléments de travail hautement prioritaires et examiner les alertes corrélées, les changements associés et la télémétrie, le tout au même endroit.

## Tri et investigation des éléments de travail {#triaging-and-investigating-work-items}

Le tri et l'investigation des éléments de travail commencent dans la Triage Inbox, où vous pouvez trier, filtrer et gérer les éléments de travail entrants. Collaborez avec vos coéquipiers, au sein et en dehors de Datadog, pour coordonner les réponses. À partir de là, vous pouvez hiérarchiser, assigner, investiguer et escalader les éléments de travail selon vos besoins pour accélérer la résolution.

{{< img src="/events/triage_inbox/event_mgmt_inbox.mp4" alt="Boîte de réception Event Management, tri par priorité, mise en évidence des capacités de changement de statut et de priorité" video=true >}}

## Mise en route {#getting-started}

1. Accédez à [{{< ui >}}Event Management{{< /ui >}} > {{< ui >}}Triage Inbox{{< /ui >}}][4].
2. Sélectionnez un projet dans le panneau de gauche pour afficher les vues de statut prêtes à l'emploi telles que {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Closed{{< /ui >}} et {{< ui >}}Archived{{< /ui >}}.
3. Utilisez l'icône des paramètres d'affichage pour choisir entre {{< ui >}}split view{{< /ui >}} (pour une investigation détaillée des éléments de travail) ou {{< ui >}}table view{{< /ui >}} (pour une revue en masse des éléments de travail et la configuration des colonnes). Personnalisez le classement de votre boîte de réception avec le menu déroulant {{< ui >}}Sort By{{< /ui >}} ; les options incluent {{< ui >}}Priority{{< /ui >}}, {{< ui >}}Created at{{< /ui >}} ou {{< ui >}}Last Updated{{< /ui >}}. Cliquez sur {{< ui >}}Save{{< /ui >}} pour réutiliser votre boîte de réception personnalisée pour une utilisation future.
5. Mettez à jour le statut, la priorité et l'affectation directement sur les cartes d'éléments de travail lors du triage.
6. Maximisez l'espace d'écran en repliant le panneau de projet d'éléments de travail à gauche et la barre de navigation Datadog.
7. Survolez le nombre d'**alertes** sur la carte d'élément de travail pour prévisualiser les alertes corrélées.

## Prochaines étapes {#next-steps}

Maintenant que vous avez appris à trier et à investiguer les éléments de travail, utilisez ces outils pour [collaborer](#collaborate-and-integrate) avec votre équipe, [agir](#take-action) sur les causes premières et rationaliser les efforts de réponse.

## Collaborer et intégrer {#collaborate-and-integrate}

Sur le panneau latéral droit en vue fractionnée, vous pouvez effectuer les opérations suivantes :

- {{< ui >}}Tag and comment{{< /ui >}} : Collaborez avec vos coéquipiers dans la chronologie de l'élément de travail en taguant des utilisateurs et en ajoutant des notes.
- {{< ui >}}Send notifications{{< /ui >}} : Alertez les parties prenantes via Slack, Microsoft Teams, e-mail ou webhooks.
- {{< ui >}}Escalate issues{{< /ui >}} : Déclenchez un incident ou contactez un intervenant d'astreinte en utilisant [Incident Management][1], [On-Call][2], [Workflow Automation][3] ou des outils tiers.
- {{< ui >}}Sync with external tools{{< /ui >}} : Synchronisez les enregistrements Jira et ServiceNow pour garantir que les parties prenantes externes restent informées.

   {{< img src="/events/triage_inbox/event_mgmt_inbox_right_hand_panel.png" alt="Panneau latéral droit de l'Event Management Inbox, mettant en évidence le menu déroulant Escalate." style="width:100%;" >}}

## Passer à l'action {#take-action}

- {{< ui >}}Mark root cause{{< /ui >}} : Identifiez et marquez un événement associé, tel qu'un changement défectueux, comme cause première.
- {{< ui >}}Run workflows{{< /ui >}} : Exécutez manuellement des runbooks de remédiation ou déclenchez-les de manière conditionnelle avec [Work Item Automation Rules][5].
- {{< ui >}}Merge work items{{< /ui >}} : Combinez les éléments de travail associés pour rationaliser les enquêtes.
- {{< ui >}}Split work items{{< /ui >}} : Séparez les alertes qui nécessitent une enquête individuelle.

**Remarque** : Lorsque toutes les alertes d'un élément de travail sont résolues, le système ferme automatiquement l'élément de travail. Vous pouvez également marquer manuellement un élément de travail comme résolu.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/incident_management/
[2]: /fr/incident_response/on-call/
[3]: /fr/actions/workflows/
[4]: https://app.datadoghq.com/event/correlation
[5]: /fr/incident_response/work_management/automation_rules/