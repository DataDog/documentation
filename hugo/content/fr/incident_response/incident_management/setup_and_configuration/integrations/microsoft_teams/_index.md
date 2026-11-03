---
aliases:
- /fr/service_management/incident_management/integrations/microsoft_teams/
- /fr/incident_response/incident_management/integrations/microsoft_teams/
description: Intégrez Microsoft Teams à Datadog Incident Management pour automatiser
  la création de canaux d'incident, synchroniser les messages et collaborer avec votre
  équipe directement dans Microsoft Teams.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: Documentation
  text: Paramètres des intégrations d'incident
- link: /integrations/microsoft-teams
  tag: Documentation
  text: Intégration Microsoft Teams
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: Blog
  text: Accélérez vos investigations avec l'IA dans Datadog Incident Response.
title: Intégrez Microsoft Teams à Datadog Incident Management
---
## Présentation {#overview}

L'intégration Microsoft Teams pour Datadog Incident Management vous permet de déclarer et de gérer des incidents, de créer automatiquement des canaux d'incident, de synchroniser les messages avec les chronologies et de tenir votre équipe informée, le tout depuis Microsoft Teams.

## Prérequis {#prerequisites}

Pour utiliser les fonctionnalités Microsoft Teams d'Incident Management, vous devez d'abord [installer l'intégration Microsoft Teams pour Datadog][1] et connecter votre compte Microsoft Teams à votre compte Datadog.

Après l'installation, accédez à **[Incident Response > Incident Management > Settings > Integrations][2]** pour configurer les fonctionnalités Microsoft Teams pour Incident Management.

## Canaux d'incident {#incident-channels}

### Création automatique de canal {#automatic-channel-creation}

Vous pouvez configurer Incident Management pour créer automatiquement un canal Microsoft Teams d'incident pour chaque incident ou pour les incidents répondant à des critères que vous définissez. Pour configurer la création automatique de canaux d'incident :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Microsoft Teams**.
2. Dans le menu déroulant **Tenant**, sélectionnez votre tenant Microsoft Teams connecté.
3. Activez **Automatically create a Microsoft Teams channel for every incident**.
4. Sélectionnez l'équipe dans laquelle vous souhaitez créer automatiquement de nouveaux canaux.
5. Enregistrez vos paramètres.

Une fois cette automatisation activée, vous pouvez définir un **modèle de nom de canal** que Datadog devra suivre lors de la création du canal. Pour des descriptions complètes, consultez [Variables disponibles uniquement dans les modèles de noms de canaux][6].

### Synchronisation des messages de canal {#channel-message-syncing}

Vous pouvez configurer Incident Management pour envoyer tous les messages du canal Microsoft Teams d'incident vers la chronologie de l'incident. Pour activer cette option, activez **Automatically push Microsoft Teams channel messages to the incident timeline**.

L'auteur d'un message synchronisé n'a pas besoin d'une licence Incident Management ou Incident Response pour que le message soit enregistré. Dans les organisations utilisant une facturation basée sur l'utilisation pour Incident Management, l'auteur n'est pas comptabilisé comme un utilisateur actif mensuel.

### Archivage automatique des canaux {#automatic-channel-archiving}

Vous pouvez configurer Incident Management pour archiver automatiquement un canal d'incident une fois l'incident résolu.

## Canal global pour les mises à jour des incidents {#global-channel-for-incident-updates}

Utilisez un canal de mise à jour des incidents pour offrir à vos parties prenantes une visibilité à l'échelle de l'organisation sur le statut de tous les incidents, directement depuis Microsoft Teams.
1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Microsoft Teams**.
1. Dans l'intégration Microsoft Teams, activez **Send all incident updates to a global channel**.
1. Sélectionnez l'équipe et le canal où vous souhaitez que les mises à jour d'incident soient publiées.

Datadog notifie automatiquement le canal sélectionné de tout incident nouvellement déclaré, ainsi que des changements d'état, de gravité et d'affectation des responsables d'incident.

Pour personnaliser ce comportement, désactivez ce paramètre et [définissez une règle de notification][4] à la place.

## Cibles de notification Microsoft Teams {#microsoft-teams-notification-targets}

Les [règles de notification][4] ciblent un canal Microsoft Teams avec un identifiant `@teams-<channel>`, ce qui notifie le canal spécifique nommé dans l'identifiant. Utilisez ceci pour notifier un canal permanent, tel que le canal global de mise à jour des incidents.

Incident Management ne fournit pas d'identifiant qui renvoie au canal automatiquement créé pour un incident. Les règles de notification Slack peuvent utiliser `@incident-slack-channel` pour notifier le canal Slack de l'incident, mais Microsoft Teams ne possède pas d'identifiant équivalent. Par conséquent, une règle de notification qui inclut `@-mentions` les envoie au canal nommé dans l'identifiant `@teams-`, et non au canal propre à l'incident.

Pour tenir les intervenants informés dans le canal propre à un incident, utilisez l'onglet Datadog et les commandes `@Datadog` au sein de ce canal. Vous pouvez également publier des mises à jour sur la chronologie de l'incident, qui se synchronise avec le canal lorsque la [synchronisation des messages du canal](#channel-message-syncing) est activée.

## Réunions Microsoft Teams {#microsoft-teams-meetings}

### Création de réunion en un clic {#one-click-meeting-creation}

Des autorisations déléguées sont requises pour la création de réunions Microsoft Teams en un clic. Pour activer les réunions Microsoft Teams en un clic pour les incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Microsoft Teams**.
2. Dans Microsoft Teams, sélectionnez votre tenant Microsoft Teams connecté.
3. Activez **Enable meeting creation**.
4. Enregistrez vos paramètres.

Après avoir activé les réunions Microsoft Teams en un clic, démarrez une réunion en cliquant sur **Start Teams Meeting** depuis l'en-tête de l'incident. Vous êtes redirigé pour rejoindre instantanément la réunion via le navigateur.

### Création automatique de réunion {#automatic-meeting-creation}

Des autorisations déléguées sont requises pour les réunions Microsoft Teams automatiques basées sur des critères. Pour activer les réunions Microsoft Teams automatiques basées sur des critères pour les incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Microsoft Teams**.
2. Dans Microsoft Teams, sélectionnez votre tenant Microsoft Teams connecté.
3. Activez **Enable meeting creation**.
   1. Activez **Automatically create Microsoft Teams meetings**.
   2. (Facultatif) Spécifiez les critères d'incident qui créent une réunion Microsoft Teams. Si laissé vide, toute modification apportée à un incident sans réunion Microsoft Teams existante créera une réunion Microsoft Teams.
4. Enregistrez vos paramètres.

### Synchronisation des messages de réunion {#meeting-message-sync}
Vous pouvez configurer Incident Management pour envoyer tous les messages de réunion Microsoft Teams de l'incident vers la chronologie de l'incident. Pour activer, activez **Sync meeting chat to incident timeline**.

L'auteur d'un message synchronisé n'a pas besoin d'une licence Incident Management ou Incident Response pour que le message soit enregistré. Dans les organisations utilisant une facturation basée sur l'utilisation pour Incident Management, l'auteur n'est pas comptabilisé comme un utilisateur actif mensuel.

### Résumés de réunion {#meeting-summaries}

Activez les résumés de réunion générés par IA pour résumer automatiquement les réunions Microsoft Teams liées aux incidents. Pendant une réunion, des résumés en direct sont périodiquement publiés sur la chronologie de l'incident et dans le canal de discussion de l'incident. Lorsque la réunion se termine, un résumé final post-réunion est publié.

<div class="alert alert-info">Lorsque les résumés de réunion sont activés, l'audio de la réunion est enregistré et transcrit par un <a href="https://www.datadoghq.com/legal/subprocessors/">sous-traitant</a> Datadog. Après une période de rétention de 7 jours, toutes les données sont automatiquement supprimées.</div>

Pour activer les résumés de réunion pour les réunions Microsoft Teams liées aux incidents :

1. Accédez à [**Settings > Integrations**][2] et sélectionnez **Microsoft Teams**.
2. Dans Microsoft Teams, sélectionnez votre tenant Microsoft Teams connecté.
3. Activez **Enable meeting creation**.
4. Activez **Generate AI meeting summaries**.
5. (Facultatif) Ajoutez des conditions pour empêcher la génération de résumés pour des incidents spécifiques. Par défaut, les réunions pour les incidents privés ne sont pas résumées.
6. Enregistrez vos paramètres.

Des résumés de réunion sont générés pour les réunions Microsoft Teams associées à un incident. Lorsqu'une réunion démarre, un transcripteur Datadog tente de rejoindre la réunion Microsoft Teams. Cela peut prendre de 10 à 30 secondes. Un participant à la réunion doit admettre le transcripteur Datadog depuis la salle d'attente de la réunion avant que la transcription puisse commencer. Une fois le transcripteur Datadog admis, des résumés en direct sont périodiquement publiés aux emplacements suivants pendant la réunion :

- La **chronologie de l'incident**, sous une entrée **Meeting Summary**.
- Le **canal de discussion d'incident**, à la fois dans le fil de discussion de la carte de réunion et sous forme de message dans le canal.

Lorsque la réunion se termine, un résumé final post-réunion est publié aux mêmes emplacements.

## Utilisation de l'onglet Datadog dans Microsoft Teams {#using-the-datadog-tab-in-microsoft-teams}

Dans un canal d'incident (un canal créé spécifiquement pour un incident), l'onglet Datadog affiche les informations de cet incident spécifique et vous permet de le gérer. Dans les canaux qui ne sont pas liés à un incident, vous pouvez uniquement déclarer de nouveaux incidents.

### Déclaration et gestion des incidents {#declaring-and-managing-incidents}

Pour déclarer un incident depuis une équipe spécifique :
1. [Add the Datadog application][3] to the team.
1. Dans n'importe quel canal **qui n'est pas lié à un incident**, cliquez sur l'onglet **Datadog**.
1. Remplissez les détails de l'incident et cliquez sur **Déclarer l'incident**.

Pour gérer un incident depuis une équipe spécifique :
1. Dans un **canal d'incident**, cliquez sur l'onglet **Datadog**.
1. Modifiez les détails et les attributs de l'incident.

### Envoi de messages vers la chronologie {#sending-messages-to-the-timeline}

Utilisez le menu « Plus d'actions » sur n'importe quel message dans une équipe d'incident, à l'extrême droite, pour envoyer ce message vers la chronologie de l'incident.

## Commandes Microsoft Teams {#microsoft-teams-commands}

Pour une liste complète des commandes `@Datadog` disponibles, consultez la [documentation sur l'intégration de Microsoft Teams][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/microsoft-teams/?tab=datadogapprecommended
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /fr/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[4]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules
[5]: /fr/integrations/microsoft-teams/#datadog-incident-management-in-microsoft-teams
[6]: /fr/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates