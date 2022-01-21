---
title: Page de détails d'un incident
kind: documentation
description: Gérer le contexte et le travail liés à un incident
further_reading:
  - link: dashboards/querying/#incident-management-analytics
    tag: Documentation
    text: Données d'analyse de la gestion des incidents
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La fonctionnalité de gestion des incidents n'est pas disponible pour le site {{< region-param key="dd_site_name" >}} de Datadog.</div>
{{< /site-region >}}

Chaque incident dans Datadog dispose de sa propre page de détails où vous pouvez gérer les champs de propriété, les signaux, les tâches, les documents, les intervenants et les notifications de votre incident. Pour que la page de détails d'un incident soit disponible, vous devez [créer un incident][1]. La page de détails contient un en-tête global permettant d'accéder rapidement aux actions essentielles, tandis que le corps de la page est divisé en différentes sections sous forme d'onglets qui servent à regrouper les données connexes de l'incident. La première de ces sections est Overview.

## En-tête global

{{< img src="monitors/incidents/incident_global_header.jpeg" alt="En-tête global d'un incident" style="width:80%;">}}

L'en-tête global permet d'accéder aux sélecteurs de [statut et gravité][2], ainsi qu'à des liens vers vos [intégrations liées aux incidents][3]. Lorsque le statut d'un incident est défini sur résolu, une option s'affiche dans l'en-tête afin de vous permettre de générer un Notebook d'analyse post-mortem en utilisant un [modèle d'analyse post-mortem][4]. Configurez vos modèles d'analyse post-mortem dans Incident Settings pour prédéfinir la structure et le contenu de vos analyses post-mortem.

## Section Overview

{{< img src="monitors/incidents/incident_overview.jpeg" alt="Section Overview d'un incident" style="width:80%;">}}

Utilisez la section Overview pour indiquer les propriétés d'un incident et définir l'impact sur les clients. 

Par défaut, tous les incidents présentent les propriétés suivantes :

* Root Cause
* Services
* Teams
* Detection Method

Vous pouvez configurer des champs de propriété supplémentaires dans [Incident Settings][5] en utilisant les paires `<CLÉ>:<VALEUR>` transmises dans vos tags de métrique Datadog. Grâce à l'attribution de valeurs aux propriétés d'un incident, il est plus facile de rechercher des sous-ensembles d'incidents sur la [Incident Homepage][6] et de former des requêtes lors de l'utilisation des [données d'analyse de la gestion des incidents][7].

Si votre incident affecte les clients, indiquez les détails de l'impact dans la section Properties sous l'en-tête Impact :

1. Sélectionnez *Yes* pour `Customer Impact`.
2. Indiquez la date et l'heure de début de l'impact.
3. Indiquez la date et l'heure de fin de l'impact ou choisissez `Active` si l'impact est toujours en cours.
4. Décrivez la nature de l'impact sur les clients dans `Scope of impact`.

## Section Timeline

{{< img src="monitors/incidents/incident_timeline.jpeg" alt="Section Timeline d'un incident" style="width:80%;">}}

La section Timeline de l'incident est la principale source d'informations pour le travail effectué pendant un incident. À mesure que des actions sont effectuées, de nouvelles cellules sont ajoutées à la timeline par ordre chronologique afin de refléter les modifications effectuées, par qui et à quel moment. 

### Types de contenu

Les cellules peuvent afficher différents types de contenu différents :

|  Type de contenu      | Description                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Responder Note     | Une note ajoutée manuellement par un intervenant lors de l'incident. Il existe plusieurs sous-types de notes d'intervenant :<br>- *Graphique* : la note contient un ou plusieurs graphiques Datadog<br>- *Lien* : la note contient un hyperlien<br>- *Code* : la note contient des blocs de code incorporés à l'aide de la syntaxe Markdown
| Incident Update    | Toute modification apportée aux propriétés d'un incident (notamment le statut et la gravité) ou à son impact.
| Integration Update | Toute modification effectuée via les [intégrations][3] utilisées pour la gestion des incidents.
| Task               | Toute modification apportée aux tâches liées à l'incident dans la section Remediation de la page de détails d'un incident.
| Notification Sent  | Indique lorsqu'une notification manuelle est envoyée par un intervenant.

Pour ajouter des notes d'intervenant à la timeline directement, utilisez la zone de texte située sous les onglets permettant de passer d'une section à l'autre. Personnalisez le timestamp de la note au moment de la création pour capturer des informations importantes qui étaient pertinentes à un moment antérieur de la timeline. Si vous êtes l'auteur d'une note d'intervenant, vous pouvez modifier son contenu ou son timestamp, ou encore supprimer entièrement la note. Vous pouvez également copier un lien vers une cellule spécifique et le partager avec vos collègues. Il est possible d'[ajouter des notes d'intervenant à la timeline depuis Slack][8].

En ce qui concerne les cellules de graphique, les définitions de graphique sont stockées au moyen d'URL de partage si cette option est activée dans les [paramètres de votre organisation][9]. Lorsqu'une cellule de graphique est ajoutée à la timeline, celle-ci présente les mêmes options d'interactivité que dans les Dashboards, Notebooks et d'autres pages. 24 heures après avoir été ajoutés à la timeline, les graphiques sont remplacés par des images statiques reflétant les informations qu'ils affichaient. Cela permet de s'assurer que les graphiques qui affichent des données à rétention courte restent pertinents même après l'expiration des données en temps réel.

Par défaut, les cellules de la timeline sont affichées selon l'ordre `oldest first`, mais vous pouvez définir cette option sur `newest first` à l'aide du bouton en haut à gauche de la timeline.

## Section Remediation

{{< img src="monitors/incidents/incident_remediation.jpeg" alt="Section Remediation de l'incident" style="width:80%;">}}

Utilisez la section Remediation pour stocker des documents ou ressources pertinents et suivre les tâches clés du processus de remédiation. 

Il est possible d'ajouter un document en collant son URL et en donnant au lien un nom lisible pour y accéder rapidement.

Les tâches liées à l'incident peuvent être créées directement depuis la section Remediation, mais également via l'[intégration Slack][10] de Datadog. 

Dans la section Remediation, saisissez la description de votre tâche dans la zone de texte de création. Pour attribuer une tâche à un utilisateur Datadog, saisissez `@` dans la zone de texte de description ou utilisez la colonne `Assignees` une fois la tâche créée. Veuillez noter que plusieurs personnes peuvent être affectées à une même tâche. Une fois qu'une tâche a été créée, vous pouvez également lui attribuer une date d'échéance. 

À mesure qu'elles sont traitées, les différentes tâches peuvent être marquées comme terminées en cochant la case à gauche de la description de la tâche en question. Si vous avez beaucoup de tâches, vous pouvez les filtrer en recherchant des mots-clés ou en masquant les tâches terminées.

## Section Responders

<div class="alert alert-warning">
Cette fonctionnalité est en version bêta ouverte.
</div>

{{< img src="monitors/incidents/incident_responders.jpeg" alt="Section Responders d'un incident" style="width:80%;">}}

Dans la section Responders, vous pouvez former votre équipe d'intervention en ajoutant d'autres utilisateurs et en leur attribuant les rôles qu'ils doivent tenir dans la résolution d'un incident. Voici les trois rôles par défaut fournis par Datadog :

1. `Incident Commander` : la personne responsable de diriger l'équipe d'intervention
2. `Communications Lead` : la personne responsable de gérer les communications avec les parties prenantes tout au long du cycle de vie de l'incident
3. `Responder` : une personne qui contribue activement à l'analyse d'un incident et à la résolution du problème sous-jacent

**Remarque** : chaque incident doit toujours avoir une personne définie en tant que `Incident Commander`. S'il n'y a qu'un seul intervenant sur un incident, le rôle `Incident Commander` est automatiquement attribué à cette personne. Le rôle `Communications Lead` ou `Responder` peut être attribué à autant de personnes que nécessaire.

Si vous ajoutez une autre personne en tant qu'intervenant, celle-ci est avertie via l'adresse e-mail associée à son compte Datadog. Tout le monde peut modifier le rôle d'un intervenant, mais vous seul pouvez retirer une personne de la liste des intervenants d'un incident si le rôle `Responder` général lui est attribué et qu'elle n'a aucune activité dans l'incident. Si un `Incident Commander` est déjà attribué pour un incident, le fait d'attribuer le rôle `Incident Commander` à une autre personne transfère le rôle à cette dernière. La personne à laquelle le rôle `Incident Commander` a été auparavant attribué se voit réattribuer le rôle `Responder`.

La liste des intervenants enregistre également la date et l'heure auxquelles une personne a été ajoutée pour la première fois à l'équipe d'intervention d'un incident, ainsi que la date et l'heure de la dernière contribution de cette personne à la timeline de l'incident.

## Section Notifications

{{< img src="monitors/incidents/incident_notifications.jpeg" alt="Section Notifications d'un incident" style="width:80%;">}}

Toutes les notifications pour les parties prenantes d'un incident sont réunies dans la section Notifications.
Vous pouvez créer, enregistrer en tant que brouillon et envoyer des notifications manuellement depuis cette page. Les notifications automatisées envoyées au moyen de [règles de notification][11] pour l'incident en question sont également répertoriées dans cette section.

Pour créer une notification manuelle : 

1. Cliquez sur le bouton **+ New Notification** en haut à droite de la section.
2. Saisissez les destinataires de votre choix. Il peut s'agir de n'importe quel handle de notification pris en charge par Datadog, notamment une adresse e-mail, un canal Slack, un handle PagerDuty, un webhook, etc.
3. Sélectionnez un [modèle de message][12].
4. Modifiez le titre et le message de votre notification comme bon vous semble en utilisant la syntaxe Markdown et n'importe quelle template variable d'incident en saisissant `{{`. 
   - Les template variables sont basées sur les propriétés d'un incident. Avant l'envoi du message, toutes les template variables sont remplacées par la valeur correspondante de la propriété qui est disponible pour le message au moment de son envoi.
5. Envoyez votre notification ou enregistrez-la en tant que brouillon.

La section Notifications est divisée en listes : Drafts et Sent.

Les deux listes affichent les éléments suivants :

1. Les destinataires (prévus) d'une notification 
2. Le contenu du message de la notification ainsi que les messages de renvoi de notification
3. La date de la dernière mise à jour de la notification
4. L'auteur de la notification

La liste Sent indique également si une notification a été envoyée manuellement ou automatiquement au moyen d'une règle de notification. Si la notification a été envoyée automatiquement, la règle qui a déclenché la notification est précisée.

## Prise en main

Découvrez un exemple de workflow dans le guide [Débuter avec la Gestion des incidents][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/incident_management/#creating-an-incident
[2]: /fr/monitors/incident_management/#describing-the-incident
[3]: /fr/monitors/incident_management/#integrations
[4]: /fr/monitors/incident_management/incident_settings#postmortem-templates
[5]: https://app.datadoghq.com/incidents/settings#Property-Fields
[6]: https://app.datadoghq.com/incidents
[7]: /fr/monitors/incident_management/analytics
[8]: /fr/integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[9]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[10]: /fr/integrations/slack/?tab=slackapplicationus#manage-incident-tasks
[11]: /fr/monitors/incident_management/incident_settings#rules
[12]: /fr/monitors/incident_management/incident_settings#message-templates
[13]: /fr/getting_started/incident_management