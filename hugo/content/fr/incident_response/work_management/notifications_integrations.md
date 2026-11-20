---
aliases:
- /fr/service_management/case_management/create_notifications_and_third_party_tickets
- /fr/service_management/case_management/notifications_integrations/
- /fr/incident_response/case_management/notifications_integrations/
further_reading:
- link: /incident_response/work_management/troubleshooting
  tag: Documentation
  text: Dépannage des intégrations tierces
- link: https://www.datadoghq.com/blog/servicenow-datadog-incident-response
  tag: Blog
  text: Intégrer ServiceNow ITSM à Datadog pour accélérer la réponse aux incidents
- link: https://www.datadoghq.com/blog/forms-case-management-requests/
  tag: Blog
  text: Simplifiez les flux de demandes avec Datadog Forms et Case Management
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralisez le travail humain et celui effectué par des agents avec Datadog
    Work Management
title: Notifications et intégrations
---
## Présentation {#overview}

Work Management offre la possibilité de créer des intégrations tierces pour générer des notifications ou des tickets automatiquement ou manuellement :
- Automatiquement : chaque fois qu'un nouvel élément de travail est créé, cela génère un nouveau ticket ou une nouvelle notification.
- Manuellement : les utilisateurs choisissent de créer des tickets ou des notifications pour des éléments de travail spécifiques.

En reliant Work Management à des systèmes tiers, vous pouvez intégrer les solutions Datadog à vos workflows et processus existants. Avec les intégrations Jira et ServiceNow, vous pouvez résoudre des éléments de travail en utilisant la télémétrie full-stack dans Datadog tout en conservant un enregistrement dans ces systèmes tiers.


## Notifications {#notifications}

Pour être averti lorsqu'un nouvel élément de travail est créé, créez une vue :
1. Accédez au projet pour lequel vous souhaitez recevoir des notifications.
1. Si vous n'êtes pas déjà membre du projet, cliquez sur **Rejoindre ce projet**.
1. Cliquez sur **Add view**.
1. Donnez un nom à la vue dans le champ **Name**.
1. Dans la zone de recherche, saisissez une requête filtrée pour récupérer les éléments de travail pour lesquels vous souhaitez être averti.
1. Sélectionnez la manière dont vous souhaitez être averti dans le champ des destinataires.
1. Cliquez sur **Enregistrer**.

### Options de notification {#notification-options}

| Integration     | Configuration    |
| --------------- | ---------------- |
| Email           | Sélectionnez une ou plusieurs adresses e-mail. |
| Slack           | Sélectionnez un espace de travail et un canal Slack. |
| Microsoft Teams | Si vous avez connecté des tenants Microsoft Teams à Datadog, sélectionnez un tenant, une équipe et un canal. Sinon, sélectionnez un connecteur.|
| PagerDuty       | Sélectionnez un service. |
| Webhooks        | Sélectionnez le nom d'un webhook. |

## Règles de notification {#notification-rules}

Vous pouvez configurer des règles de notification dans les paramètres de votre projet pour recevoir des alertes sur les mises à jour importantes des éléments de travail. Pour créer une règle de notification :

1. Accédez à [**Project Settings**][1] et cliquez sur un projet pour développer ses paramètres.
1. Dans le menu développé, cliquez sur **Notifications**.
1. Cliquez sur **+ Create Rule** pour ajouter une règle de notification.
1. Dans le champ de requête, saisissez un filtre pour limiter les notifications à des éléments de travail spécifiques. Exemple :
   ```
   priority:P1 OR priority:P2
   ```
   Pour recevoir des notifications pour **tous les éléments de travail**, laissez la requête vide.
1. Sélectionnez les conditions qui enverront une notification. Vous pouvez choisir une ou plusieurs des options suivantes :
   - Création d'élément de travail
   - Transitions de statut
   - Changements de priorité
   - Changements de responsable
   - Nouvelle corrélation d'alerte (pour les éléments de travail de gestion d'événements)
1. Choisissez une destination de notification. Les destinations prises en charge incluent :
   - E-mail
   - Slack
   - Microsoft Teams
   - PagerDuty
   - Webhook
1. Cliquez sur **Save** pour activer la règle.

## Règles de paging On-Call {#on-call-paging-rules}

À partir des éléments de travail, vous pouvez pager manuellement ou automatiquement les utilisateurs avec [Datadog On-Call][4].

Pour déclencher manuellement un pager :
1. Ouvrez les détails de l'élément de travail.
2. Cliquez sur le bouton **Page**.

Pour déclencher automatiquement un pager, configurez des règles de paging automatisées dans les paramètres de votre projet :
1. Accédez à [**Project Settings**][1] et cliquez sur un projet pour développer ses paramètres.
1. Dans le menu développé, cliquez sur **Integrations** > **Datadog On-Call**.
1. Activez **Automatically page work items to On-Call**. Cela ouvre la fenêtre modale Règle d'alerte, où vous pouvez définir votre première règle.
1. Dans la fenêtre modale, saisissez une requête. Si un élément de travail correspond à la requête spécifiée à tout moment de son cycle de vie, Datadog envoie automatiquement une page à l'équipe désignée.
1. Choisissez l'équipe à qui envoyer une page :
   - **Specific Team** : sélectionnez une équipe particulière à recevoir une page systématiquement lorsque la règle est déclenchée.
   - **Dynamic Team Selection** : envoyez automatiquement une page à l'équipe associée à l'élément de travail via l'attribut `Team`.
1. Cliquez sur **Add Rule**.
1. Consultez votre règle sur la page des paramètres Datadog On-Call. Vous pouvez revenir sur cette page pour gérer cette configuration ou ajouter plusieurs règles en cliquant sur **New Paging Rule**.
1. (Facultatif) Activez la possibilité d'assigner automatiquement l'élément de travail à l'utilisateur d'astreinte lorsqu'une page est déclenchée.

## Tickets tiers {#third-party-tickets}
Dans Project Settings, vous pouvez gérer les membres, configurer la fermeture automatique des éléments de travail et définir des intégrations tierces comme Jira et ServiceNow.

{{% collapse-content title="Configuration de Jira" level="h3" expanded=false id="jira" %}}
1. Assurez-vous que l'intégration Jira est configurée.
1. Dans les paramètres du projet Work Management, activez **Jira** pour la création manuelle de demandes Jira depuis le projet.
1. Sélectionnez un compte Jira, un projet dans lequel créer des demandes, et le type de demande souhaité (tel que story, epic, bug ou task).
1. Vous pouvez choisir la création automatique d'une demande Jira pour chaque élément de travail créé dans le projet.
1. Pour les attributs suivants (titre de l'élément de travail, description, responsable, commentaires, statut et priorité), sélectionnez l'une des options ci-dessous :
  | Option                              | Description                                                                                                                                   |
  |-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
  | Une fois vers Jira à la création de l'élément de travail  | Le champ est synchronisé de Work Management vers Jira uniquement au moment de la création de l'élément de travail. Les modifications ultérieures ne sont répercutées d'aucun côté.  |
  | Synchronisation bidirectionnelle       | Les modifications dans Work Management sont répercutées dans Jira, et vice versa                                                                              |
  | Ne pas synchroniser                          | Le champ n'est pas synchronisé vers Jira.                                                                                                              |
1. Pour le statut et la priorité de l'élément de travail, sélectionnez les valeurs auxquelles ils correspondent du côté de Jira.
1. Enregistrez les modifications.

**Remarques** :
- Un élément de travail ne peut être synchronisé qu'avec une seule ressource externe à la fois, par projet. Pour activer la synchronisation Jira, la création et la synchronisation automatiques ServiceNow doivent être désactivées.
- Seuls les éléments de travail utilisant les statuts principaux « Ouvert », « En cours » et « Fermé » peuvent être synchronisés avec Jira.
- La synchronisation bidirectionnelle nécessite [la prise en charge des webhooks][2].
- La création de demandes est disponible pour Jira Cloud et Data Center. La synchronisation des champs n'est disponible que pour Jira Cloud.
{{% /collapse-content %}}

{{% collapse-content title="Configuration de ServiceNow" level="h3" expanded=false id="servicenow" %}}
1. Configurez l'intégration ServiceNow en suivant les [ITOM and ITSM setup instructions][3].
1. Dans les paramètres du projet Work Management, activez ServiceNow pour la création manuelle d'incidents ServiceNow à partir du projet.
1. Sélectionnez une instance ServiceNow et un groupe d'affectation.
1. Vous pouvez choisir la création automatique d'un incident ServiceNow pour chaque élément de travail créé dans le projet.
1. Pour les attributs suivants — statut, commentaires — sélectionnez l'une des options ci-dessous :
  | Option     | Description    |
  | ---  | ----------- |
  |Once to ServiceNow at work item creation|Le champ est synchronisé de Work Management vers ServiceNow uniquement au moment de la création de l'élément de travail. Les modifications ultérieures ne sont répercutées d'aucun côté.|
  |All updates to ServiceNow |Les modifications dans Work Management sont répercutées dans ServiceNow, mais les modifications dans ServiceNow ne sont pas répercutées dans Work Management.|
  |Two-way sync (bi-directional)|Les modifications dans Work Management sont répercutées dans ServiceNow, et vice versa.|
  |Don't sync|Le champ n'est pas synchronisé vers ServiceNow.|
1. Sélectionnez les valeurs d'état ServiceNow auxquelles les valeurs de statut Work Management doivent correspondre.
1. Enregistrez les modifications.

**Remarque** : Un élément de travail ne peut être synchronisé qu'avec une seule ressource externe à la fois, par projet. Pour activer la synchronisation ServiceNow, la création et la synchronisation automatiques de Jira doivent être désactivées. Seuls les éléments de travail utilisant les statuts principaux « Ouvert », « En cours » et « Fermé » peuvent se synchroniser avec ServiceNow.
{{% /collapse-content %}}

{{% collapse-content title="Configuration de Linear" level="h3" expanded=false id="linear" %}}
1. Assurez-vous que l'[intégration Linear][5] est configurée.
1. Dans les paramètres du projet Work Management, activez **Linear** pour la création manuelle de tickets Linear depuis le projet.
1. Sélectionnez un espace de travail et une équipe Linear dans lesquels créer des tickets.
1. Vous pouvez opter pour la création automatique d'un ticket Linear pour chaque élément de travail créé dans le projet.
1. Pour les attributs suivants (titre de l'élément de travail, description, responsable, commentaires, statut et priorité), sélectionnez l'une des options ci-dessous :
  | Option                                  | Description                                                                                                                                    |
  |-----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
  | Envoyé vers Linear lors de la création de l'élément de travail    | Le champ se synchronise de Work Management vers Linear uniquement au moment où l'élément de travail est créé. Les modifications ultérieures ne sont répercutées d'aucun côté.  |
  | Synchronisation bidirectionnelle           | Les modifications dans Work Management sont répercutées dans Linear, et vice versa.                                                                            |
  | Ne pas synchroniser| Le champ ne se synchronise pas avec Linear.                                                                                                             |
1. Pour le statut de l'élément de travail, sélectionnez les états auxquels ils correspondent du côté de Linear.
1. Enregistrez les modifications.

**Remarques** :
- Seuls les éléments de travail utilisant les statuts principaux « Ouvert », « En cours » et « Fermé » peuvent se synchroniser avec Linear.
- La synchronisation bidirectionnelle nécessite la [prise en charge des webhooks][6].
{{% /collapse-content %}}

## Auto-escalade d'incident {#incident-auto-escalation}

La déclaration manuelle d'incidents lors de volumes d'événements élevés peut entraîner des retards et augmenter l'exposition aux risques lors de situations critiques. L'auto-escalade d'incidents depuis Work Management vous permet de déclarer automatiquement des incidents lorsque les éléments de travail correspondent à vos critères définis, éliminant ainsi le besoin d'intervention manuelle.

Accédez à la [page Project Settings][1], cliquez sur **Integrations** > **Datadog Incidents**, et activez **Auto-escalate work items to Incidents**.

Une fois activé, tout élément de travail qui répond à vos critères de requête spécifiés (à tout moment de son cycle de vie) déclenche automatiquement un incident, permettant des temps de réponse plus rapides pour votre équipe.

## Mise en miroir Slack {#slack-mirroring}
Avec l'intégration Slack, les réponses dans les fils de discussion de notification Slack liés à un élément de travail sont automatiquement répliquées dans la chronologie d'activité de l'élément de travail. Cela permet de maintenir le contexte de l'élément de travail à jour sans nécessiter de mises à jour manuelles dans Datadog. La mise en miroir des fils de discussion Slack vers les éléments de travail est prise en charge pour :
- [Notifications Slack][8] générées à partir de Work Management
- Notifications Slack générées à partir de monitors utilisant [case handles][7]
- Fils de discussion Slack pour les éléments de travail créés directement depuis Slack à l'aide de [Slack integration][9]

**Pour configurer la mise en miroir des fils de discussion Slack** :

Assurez-vous que l'[Slack integration][9] est configurée pour votre organisation Datadog.

La mise en miroir des fils de discussion Slack est activée par défaut pour tous les projets Work Management. Pour la désactiver pour un projet spécifique :
1. Accédez à [**Project Settings**][1] et cliquez sur un projet pour développer ses paramètres.
1. Dans le menu développé, cliquez sur **Integrations** > **Slack**.
1. Désactivez **Slack thread mirroring**.

### Fonctionnement {#how-it-works}

- Pour toute notification d'élément de travail envoyée à Slack, l'activité dans le fil de discussion de notification est répercutée sur l'élément de travail.
- L'activité répercutée inclut toutes les réponses textuelles (les pièces jointes ne sont pas prises en charge). Chaque message répercuté affiche le nom de l'utilisateur Slack et Slack comme source.
- Plusieurs fils de discussion Slack peuvent répercuter des commentaires dans un seul élément de travail.
- La mise en miroir est unidirectionnelle : les messages circulent de Slack vers l'élément de travail, et non de l'élément de travail vers Slack.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /fr/integrations/jira/#configure-a-jira-webhook
[3]: /fr/integrations/servicenow/#itom-and-itsm-setup
[4]: /fr/incident_response/on-call/
[5]: /fr/integrations/linear/
[6]: /fr/integrations/linear/#configure-a-linear-webhook
[7]: /fr/incident_response/work_management/create_work_item#automatic-work-item-creation
[8]: /fr/incident_response/work_management/notifications_integrations#notifications
[9]: /fr/integrations/slack/?tab=datadogforslack