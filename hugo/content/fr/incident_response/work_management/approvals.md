---
aliases:
- /fr/incident_response/case_management/approvals/
further_reading:
- link: /incident_response/work_management/automation_rules
  tag: Documentation
  text: Règles d'automatisation des éléments de travail
- link: /incident_response/work_management
  tag: Documentation
  text: Work Management
title: Approbations d'éléments de travail
---
## Présentation {#overview}

Les approbations d'éléments de travail vous permettent de demander l'approbation d'un ou plusieurs membres de l'équipe avant d'agir sur un élément de travail, soutenant les flux de travail de gestion des changements. Cette fonctionnalité est disponible sur tous les types d'éléments de travail standard et personnalisés. Toute activité d'approbation est suivie dans le journal d'activité de l'élément de travail.

## Demander des approbations {#requesting-approvals}

Pour demander une approbation sur un élément de travail :
1. À partir d'un élément de travail, cliquez sur l'icône **More Options** sur le côté droit.
1. Sélectionnez **Request approval**.
1. Utilisez la liste déroulante **Add reviewer** pour sélectionner un ou plusieurs utilisateurs.
1. (Facultatif) Saisissez un message dans le champ **Describe your request**.
1. Cliquez sur **Request**.

**Remarque** : La demande ne peut pas être modifiée après qu'un examinateur a répondu.

Après avoir demandé une approbation, une section **Reviewers** apparaît dans le panneau des détails de l'élément de travail. Le nom et le statut actuel (Demandé, Approuvé ou Refusé) de chaque examinateur sont affichés. Pour modifier la liste des examinateurs, cliquez sur l'icône de modification à côté de **Reviewers**. Tous les événements d'approbation sont enregistrés dans le journal d'activité de l'élément de travail.

### Notifications {#notifications}

- Les examinateurs sont avertis par e-mail lorsque leur approbation est demandée.
- Le requérant est averti chaque fois qu'une approbation ou un refus est reçu.

### Autorisations{#permissions}

| Action | Required permission |
|---|---|
| Request approval on a work item | Cases Write |
| Be added as an approver on a work item | Cases Read |
| Approve or decline a work item | Cases Read |

Pour en savoir plus, consultez la section [Autorisations des rôles Datadog][2].

## Règles d'automatisation {#automation-rules}

Vous pouvez déclencher des règles d'automatisation d'éléments de travail en fonction des événements d'approbation. Par exemple, vous pouvez déclencher un workflow pour mettre à jour automatiquement le statut d'un élément de travail une fois que toutes les approbations sont reçues.

Les déclencheurs disponibles comprennent :
- La première, chaque ou toutes les approbations qu'un élément de travail reçoit
- Le premier ou chaque refus qu'un élément de travail reçoit

Consultez [Work item automation rules][1] pour les instructions de configuration.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/work_management/automation_rules
[2]: /fr/account_management/rbac/permissions/#case-and-incident-management