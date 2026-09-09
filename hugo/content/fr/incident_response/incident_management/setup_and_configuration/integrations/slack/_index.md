---
aliases:
- /fr/service_management/incident_management/integrations/slack/
- /fr/incident_response/incident_management/integrations/slack/
description: Gérez les incidents Datadog directement depuis Slack.
further_reading:
- link: integrations/slack/
  tag: Documentation
  text: Installez l'intégration Slack
- link: https://www.datadoghq.com/blog/slack-incident-management/
  tag: Blog
  text: Gérez les incidents de manière transparente grâce à l'intégration Datadog
    pour Slack.
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: Blog
  text: Accélérez vos investigations avec l'IA dans Datadog Incident Response.
- link: https://app.datadoghq.com/integrations/slack
  tag: App
  text: Tuile d'intégration Slack dans l'application
title: Intégrez Slack à Datadog Incident Management
---
## Présentation {#overview}

Slack est une plateforme de messagerie et de collaboration largement utilisée par les équipes pour communiquer en temps réel. L'intégration Datadog Slack connecte vos workflows de réponse aux incidents directement à Slack, afin que les équipes puissent déclarer, gérer et résoudre les incidents sans quitter leur environnement de chat.

Avec l'intégration, vous pouvez :

- Répondez plus rapidement en déclarant les incidents Datadog directement depuis Slack.
- Créez automatiquement des canaux Slack pour la collaboration lorsque des incidents Datadog sont déclarés.
- Exécutez votre réponse aux incidents dans Slack. Par exemple, alertez les équipes d'astreinte, assignez des rôles d'intervenant ou mettez à jour la gravité.

La documentation de l'intégration Slack est organisée autour du cycle de vie typique de l'utilisation de Slack avec Incident Management :

1. [**Installez et connectez Slack**](#setup) : configurez l'intégration entre votre espace de travail Slack et Datadog.
2. [**Déclarer des incidents**](#declaring-incidents-from-slack) : apprenez à démarrer des incidents en utilisant des commandes Slack ou des actions de message.
3. [**Gérer les incidents depuis les canaux d'incident**](#incident-channels) : utilisez des canaux Slack dédiés avec des commandes, la synchronisation et des automatisations.
4. [**Configurer les notifications globales**](#global-slack-notifications) : tenez votre organisation informée grâce à des mises à jour automatiques.
5. **[Référencer les options de configuration Slack](#additional-slack-configurations) et [les commandes Slack](#slack-incident-commands)** : explorez les options de configuration détaillées et consultez la liste complète des commandes Slack disponibles pour adapter et rationaliser vos workflows de réponse aux incidents.

## Prérequis {#prerequisites}

Installez l'intégration via la [Slack Integration tile][1] avec les [OAuth scopes][6] appropriées. Pour plus d'informations, consultez la documentation sur l'[Slack integration][2].

Une fois l'intégration installée, accédez à [**Incidents** > **Settings** > **Integrations**][3] pour activer les fonctionnalités Slack pour Incident Management.

## Déclaration d'incidents depuis Slack {#declaring-incidents-from-slack}

Lorsque vous connectez un espace de travail Slack à une organisation Datadog, les utilisateurs de l'espace de travail peuvent utiliser les raccourcis Slack liés à Incident Management.

Vous pouvez déclarer un incident avec la commande slash suivante :

```
/datadog incident
```

Pour déclarer un incident à partir d'un message Slack, survolez le message, cliquez sur **More actions** (les trois points verticaux), puis sélectionnez **Declare incident**. Datadog publie un message dans le fil du message confirmant la création de l'incident.

Par défaut, seuls les utilisateurs Slack connectés à une organisation Datadog peuvent déclarer des incidents. Les utilisateurs Slack peuvent se connecter à une organisation Datadog en exécutant `/datadog connect`.

Pour permettre à tout utilisateur Slack de l'espace de travail de déclarer des incidents, activez **Allow Slack users to declare incidents without a connected Datadog account** dans les paramètres Incident Management.

## Incident channels {#incident-channels}

Vous pouvez configurer Incident Management pour créer automatiquement un canal Slack dédié pour chaque incident répondant aux critères que vous définissez. Vos intervenants peuvent ensuite gérer l'incident directement dans Slack depuis le canal d'incident.

Pour utiliser les incident channels, accédez à **[Incident Response > Incident Management > Settings > Integrations][3]** et activez **Create Slack channels for incidents**.

Le **channel name template** que vous définissez détermine comment Datadog nomme les canaux d'incident qu'il crée. Pour des descriptions complètes, consultez [Variables available only in channel name templates][7].


### Message syncing (Slack mirroring) {#message-syncing-slack-mirroring}

Après avoir activé la création automatique de canaux, vous pouvez configurer Incident Management pour synchroniser les messages entre un canal Slack d'incident et la chronologie de l'incident dans Datadog.

Pour activer la synchronisation, activez **Push Slack channel messages to the incident timeline** dans les paramètres Incident Management, puis sélectionnez l'une des options suivantes :

* **Mirror all messages in real-time** : Datadog synchronise tous les messages publiés par les utilisateurs Slack dans le canal d'incident.
* **Push message when 📌 is added as a reaction** : Datadog synchronise les messages uniquement lorsque les utilisateurs Slack y réagissent avec des punaises (📌).

Pour les deux options, l'auteur d'un message n'a pas besoin d'être connecté à l'organisation Datadog pour que Datadog synchronise le message. Pour l'épinglage de messages, l'épingleur **doit** être connecté à l'organisation Datadog pour que le message épinglé soit synchronisé.

Dans les organisations avec une facturation d'Incident Management basée sur l'utilisation :

* La rédaction d'un message synchronisé avec Datadog ne fait **pas** de vous un utilisateur facturable pour le mois en cours.
* L'épinglage d'un message qui est ensuite synchronisé **fait** de vous un utilisateur facturable.

Dans les organisations avec une facturation d'Incident Management basée sur le nombre d'utilisateurs :

* Vous n'avez **pas** besoin d'une place pour que Datadog synchronise vos messages vers Incident Management.
* Lorsque vous épinglez un message, vous **devez** disposer d'une place pour que Datadog synchronise le message que vous avez épinglé.

### Commandes Slack dans le canal d'incidents {#slack-commands-in-the-incident-channel}

Dans un canal Slack d'incident, vous pouvez exécuter des commandes Slack pour modifier le statut et la gravité de l'incident, attribuer des rôles d'intervenant, alerter les équipes d'astreinte, et plus encore.

Pour obtenir la liste complète des commandes Slack, consultez les [commandes Slack](#slack-commands).

### Autres options de configuration du canal d'incidents {#other-incident-channel-configuration-options}

Accédez à toutes les options de configuration de Slack dans Incident Management via la page [**Incidents** > **Settings** > **Integrations**][3].

| Fonctionnalité                                                   | Description et remarques                                                                                                                             |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Push incident timeline messages to Slack**              |  Envoie automatiquement les mises à jour de la chronologie d'incident de Datadog vers le canal Slack.<br><br> Permet aux participants du canal de rester synchronisés avec les mises à jour de Datadog. |
| **Add important links to channel bookmarks**              |  Publie les liens liés à l'incident dans les signets du canal Slack. <br><br>Cela permet d'accéder facilement aux ressources.                                     |
| **Add team members automatically**                        |  Lorsqu'une équipe Datadog est associée à l'incident, ses membres sont ajoutés au canal Slack.                                                       |
| **Send incident updates to the Slack channel**            | : Met à jour le sujet du canal avec le statut, la gravité et l'incident commander.                                                                |
| **Send a Slack notification when a meeting starts**       |  Notifie the canal Slack lorsqu'une réunion est lancée, avec des participants et un lien pour y participer.<br><br> Offre un accès pratique aux appels d'incident.     |
| **Activate Bits AI in incident Slack channels**           |  Active les fonctionnalités d'IA qui utilisent le contexte des incidents provenant de Datadog. <br><br>S'applique à tous les types d'incidents dans l'espace de travail Slack sélectionné.                |
| **Automatically archive Slack channels after resolution** |  Archive les canaux Slack dédiés aux incidents une fois ceux-ci résolus. <br><br>Cela permet de réduire l'encombrement des canaux.                                             |
| **Customize incident Slack actions**                       |  Personnalise les actions qui s'affichent dans la barre d'actions des incidents pour chaque statut. <br><br>Cela permet d'améliorer la visibilité des actions courantes.                      |

## Global channel for incident updates {#global-channel-for-incident-updates}

Vous pouvez configurer Incident Management pour publier automatiquement des mises à jour sur les incidents dans un canal Slack sélectionné. Pour activer ceci :

1. Dans Datadog, accédez à **[Incident Response > Incident Management > Settings > Integrations][3]**.
1. Dans la section Slack, activez **Send all incident updates to a global channel**.
1. Sélectionnez l'espace de travail Slack et le canal Slack où vous souhaitez que les mises à jour d'incident soient publiées :

Datadog notifie automatiquement le canal sélectionné de tout nouvel incident déclaré, ainsi que les changements de statut, de gravité et d'incident commander.

En coulisses, cette fonctionnalité est une [incident notification rule][5] intégrée et masquée. Si vous souhaitez personnaliser le message ou ses déclencheurs, désactivez-la et définissez votre propre règle de notification.

## Commandes Slack {#slack-commands}

Vous pouvez consulter la liste complète des commandes Slack disponibles à tout moment en tapant `/datadog` (ou `/dd`) dans Slack pour ouvrir la fenêtre modale de commande afin de parcourir et d'exécuter toute action Datadog, ou `/dd help` pour afficher ces options sous forme de liste. Pour ouvrir le volet d'actions pour les actions courantes de gestion des incidents, tapez `/dd shortcuts`.

### Commandes globales (exécutables partout) {#global-commands-run-anywhere}

| Commande | Description |
| ------- | ----------- |
| `/datadog incident` | Déclarer un nouvel incident. |
| `/datadog incident test` | Déclarer un nouvel incident de test (si les incidents de test sont activés pour le type d'incident). |
| `/datadog incident list` | Lister tous les incidents ouverts (actifs et stables). |

### Commandes du canal d'incident {#incident-channel-commands}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
| Commande | Description |
| ------- | ----------- |
| `/datadog` | Ouvrez la fenêtre modale de commande pour afficher toutes les actions Datadog disponibles. |
| `/datadog shortcuts` | Ouvrez le volet d'actions d'incident pour effectuer des actions courantes. |
| `/datadog help` | Afficher un message éphémère listant toutes les commandes Slack disponibles. |
| `/datadog incident update` | Mettre à jour un attribut pour l'incident, tel que le statut ou la gravité. |
| `/datadog incident notify` | Notifier les `@`-handles concernant l'incident. |
| `/datadog incident private` | Rendre l'incident privé (si les incidents privés sont activés). |
| `/datadog incident public` | Rendre l'incident public. |
| `/datadog incident responders` | Gérer l'équipe d'intervention de l'incident (ajouter des intervenants et attribuer des rôles d'intervention). |
| `/datadog task` | Créer une tâche d'incident. |
| `/datadog task list` | Lister les tâches d'incident existantes. |
| `/datadog followup` | Créer un suivi pour l'incident. |
| `/datadog followup list` | Afficher et gérer les suivis existants pour l'incident. |
| `/datadog incident summary` | Obtenir un résumé de l'incident généré par IA qui n'est visible que par vous. |
{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
| Commande | Description |
| ------- | ----------- |
| `/datadog` | Ouvrez la fenêtre modale de commande pour afficher toutes les actions Datadog disponibles. |
| `/datadog shortcuts` | Ouvrez le volet d'actions d'incident pour effectuer des actions courantes. |
| `/datadog help` | Afficher un message éphémère listant toutes les commandes Slack disponibles. |
| `/datadog incident update` | Mettre à jour un attribut pour l'incident, tel que le statut ou la gravité. |
| `/datadog incident notify` | Notifier les `@`-handles concernant l'incident. |
| `/datadog incident private` | Rendre l'incident privé (si les incidents privés sont activés). |
| `/datadog incident public` | Rendre l'incident public. |
| `/datadog incident responders` | Gérer l'équipe d'intervention de l'incident (ajouter des intervenants et attribuer des rôles d'intervention). |
| `/datadog task` | Créer une tâche d'incident. |
| `/datadog task list` | Lister les tâches d'incident existantes. |
| `/datadog followup` | Créer un suivi pour l'incident. |
| `/datadog followup list` | Afficher et gérer les suivis existants pour l'incident. |
{{< /site-region >}}

### Boutons du volet d’actions {#action-tray-buttons}

Datadog publie le volet d'actions directement dans le canal Slack de l'incident lors des changements de statut, afin que les intervenants puissent effectuer des actions courantes, telles que la mise à jour de la gravité ou du statut, sans avoir à taper une commande. Vous pouvez également ouvrir le volet d'actions en tapant `/dd shortcuts` dans Slack.

Les boutons suivants sont disponibles dans le volet d'actions. Les types d'incidents sont initialisés avec ces boutons par défaut. Pour personnaliser les boutons qui apparaissent et leur ordre pour chaque statut d'incident, accédez à **Incidents** > **Settings** > [**Integrations**][3] > **Slack Settings** et configurez **Incident Slack Actions**.

| Bouton                              | Description                                                             | Par défaut actif | Par défaut stable | Par défaut résolu |
|--------------------------------------|---------------------------------------------------------------------------|:---:|:---:|:---:|
| ⚙️ **Modifier l'incident**                | Mettre à jour le statut, la gravité, l'impact et tous les autres attributs                 | {{< X >}} | {{< X >}} |   |
| 🧑‍🚒 **Modifier les intervenants**             | Assigner des rôles et ajouter des coéquipiers à l'incident                            | {{< X >}} |   |   |
| 🔍 **Voir toutes les actions**             | Ouvrir la liste complète des actions Slack disponibles pour cet incident           | {{< X >}} | {{< X >}} | {{< X >}} |
| 🏠 **View Web App**                 | Ouvrir l'incident dans Datadog Incident Management                          | {{< X >}} | {{< X >}} | {{< X >}} |
| ☎️ **Page On-Call**                 | Alerter une équipe au sujet de l'incident en cours en utilisant votre service préféré       | {{< X >}} |   |   |
| 🔔 **Notify**                       | Notifier les parties prenantes d'un incident par e-mail, notification push ou services    |   | {{< X >}} | {{< X >}} |
| ▶️ **Create/Join Zoom**             | Démarrer une nouvelle réunion, ou la rejoindre si elle existe déjà                        | {{< X >}} |   |   |
| ▶️ **Create/Join Google Meet**      | Démarrer une nouvelle réunion, ou la rejoindre si elle existe déjà                        | {{< X >}} |   |   |
| ▶️ **Run Workflow**                 | Sélectionner et exécuter des workflows prédéfinis pour l'incident                     | {{< X >}} |   |   |
| 🟨 **Set to Stable**                | Marquer l'incident comme stable après avoir atténué l'impact                   | {{< X >}} |   |   |
| ✅ **Resolve Incident**             | Marquer l'incident comme résolu                                              |   | {{< X >}} |   |
| ✨ **Investigate with Bits AI**     | Utiliser Bits AI pour enquêter sur l'incident                                   | {{< X >}} |   |   |
| 📋 **Create Follow-Up**             | Créer des tâches de suivi identifiées lors de la réponse à l'incident            |   | {{< X >}} | {{< X >}} |
| 📋 **List Follow-Ups**              | Afficher et suivre les tâches de suivi pour l'incident                           |   |   | {{< X >}} |
| 📝 **Create/View Postmortem**       | Créer ou voir le post-mortem de l'incident                            |   |   | {{< X >}} |

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /fr/integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /fr/integrations/jira/
[5]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules/
[6]: /fr/integrations/slack/?tab=datadogforslack#permissions
[7]: /fr/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates