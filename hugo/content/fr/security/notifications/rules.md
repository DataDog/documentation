---
aliases:
- /fr/security_platform/notification_profiles/
- /fr/security_platform/notification_rules/
- /fr/security_platform/notifications/rules/
- /fr/security/notification_profiles/
- /fr/security/notification_rules/
- /fr/security/upcoming_changes_notification_rules/
description: Créez des règles de notification pour prévenir automatiquement votre
  équipe et envoyer des messages via des intégrations lorsqu'une règle de détection
  se déclenche.
further_reading:
- link: /security/detection_rules/
  tag: Documentation
  text: Explorer les règles de détection
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Règles de notification
---
{{< product-availability >}}

## Présentation {#overview}

Les règles de notification sont des ensembles de conditions prédéfinies qui automatisent le processus d'information de votre équipe concernant les problèmes de sécurité. En utilisant des règles de notification, vous n'avez plus besoin de configurer manuellement les notifications pour chaque règle de détection individuelle. Les règles de notification peuvent être configurées pour couvrir un large éventail de scénarios en spécifiant des paramètres tels que les gravités, les types de règles, les tags de règles, les attributs de signal et les tags de signal.

{{< img src="security/notification-rules-overview-1.png" alt="Page de présentation des règles de notification" style="width:100%;" >}}

## Créer des règles de notification {#create-notification-rules}

Pour créer une règle de notification, spécifiez les conditions dans lesquelles la règle doit être déclenchée. Ces conditions peuvent inclure des critères tels que la gravité, le type de règle de détection, les tags et les attributs. Lorsqu'un problème correspond aux critères définis, la règle envoie automatiquement des notifications aux destinataires désignés.

<div class="alert alert-info">Pendant que vous configurez la règle, un aperçu des problèmes correspondant aux conditions de la règle de notification apparaît sur le panneau <strong>Aperçu des résultats correspondants</strong>. Cet aperçu vous aide à déterminer si votre règle de notification est trop spécifique ou trop large, vous permettant d'ajuster les critères en conséquence pour une couverture optimale.</div>

1. Sur la page [**Règles de notification**][1], cliquez sur {{< ui >}}New Notification Rule{{< /ui >}}.
1. Saisissez un **Nom** pour la règle de notification.
1. Sélectionnez le type de source pour la règle de notification :
    - **Découverte** : Une faille de sécurité potentielle dans votre infrastructure.
    - **Signal** : Activité suspecte qui constitue une menace active contre votre infrastructure.
1. Sélectionnez un ou plusieurs niveaux de gravité.
1. Spécifiez les tags et les attributs qui doivent être présents pour que la règle de notification soit déclenchée.
   <div class="alert alert-tip">Si vous avez sélectionné <strong>Signal</strong> à l'étape 3, vous pouvez recevoir des notifications pour les enquêtes <a href="/bits_ai/bits_security_analyst">Bits Security Analyst</a> terminées en ajoutant le tag <code>@workflow.bits_investigator.state:*</code>.</div>
1. Si vous avez sélectionné **Découverte** à l'étape 3, sélectionnez la fréquence des notifications :
   - **Regrouper les résultats sur** : sélectionnez cette option, puis une période dans la liste, pour ne recevoir qu'une seule notification pour les détections survenues au cours de cette période.
   - **Déclencher immédiatement pour chaque problème individuel répondant aux critères** : sélectionnez cette option pour recevoir une notification pour chaque détection.<br />**Remarque** : la sélection de cette option peut entraîner un grand nombre de notifications.
1. Sous **Destination**, sélectionnez un mode de routage :
    - **Routage manuel** : cliquez sur {{< ui >}}Add Recipient{{< /ui >}} et spécifiez les destinataires que vous souhaitez notifier. Vous pouvez notifier des personnes ou des équipes, créer des tickets Jira, et plus encore. Consultez [Canaux de notification][2] pour plus d'informations.
    - **Routage dynamique** (Aperçu) : acheminez automatiquement les notifications vers l'équipe responsable en fonction du tag `team` sur les résultats. Spécifiez un **Canal de secours** pour les résultats qui ne peuvent pas être acheminés dynamiquement. Consultez [Routage dynamique](#dynamic-routing) pour connaître les prérequis.<br />**Remarque** : le routage dynamique n'est disponible que lorsque **Déclencher immédiatement pour chaque problème individuel répondant aux critères** est sélectionné à l'étape 6.
1. Pour envoyer des notifications de test pour cette règle, cliquez sur {{< ui >}}Test Notifications{{< /ui >}}.
  1. Dans la fenêtre modale, sélectionnez les produits de sécurité que vous souhaitez tester.
  1. Cliquez sur {{< ui >}}Run Test{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Gérer les règles de notification {#manage-notification-rules}

### Activer ou désactiver une règle de notification {#enable-or-disable-a-notification-rule}

Pour activer ou désactiver une règle de notification, basculez l'interrupteur sur la carte de la règle de notification.

### Modifier une règle de notification {#edit-a-notification-rule}

Pour modifier une règle de notification, cliquez sur la carte de la règle de notification. Une fois vos modifications terminées, cliquez sur {{< ui >}}Save{{< /ui >}}.

### Cloner une règle de notification {#clone-a-notification-rule}

Pour cloner une règle de notification, cliquez sur le menu à trois points verticaux sur la carte de la règle de notification et sélectionnez {{< ui >}}Clone{{< /ui >}}.

### Supprimer une règle de notification {#delete-a-notification-rule}

Pour supprimer une règle de notification, cliquez sur le menu à trois points verticaux sur la carte de la règle de notification et sélectionnez {{< ui >}}Delete{{< /ui >}}.

## Routage dynamique {#dynamic-routing}

{{< callout url="https://www.datadoghq.com/product-preview/dynamic-routing-for-security-notifications/" >}}
Le routage dynamique pour les règles de notification est en aperçu et n'est disponible que pour les notifications de résultats non agrégées.
{{< /callout >}}

Le routage dynamique envoie automatiquement les notifications de découvertes à l'équipe responsable de la remédiation, en fonction du tag `team` associé à la découverte. Cela élimine la nécessité de configurer manuellement les destinataires pour chaque règle et évite ainsi l'utilisation de canaux de notification génériques.

Le routage dynamique n'est disponible que lorsque **Déclencher immédiatement pour chaque problème individuel répondant aux critères** est sélectionné comme fréquence de notification, et n'est pas disponible pour les notifications de signal.

### Fonctionnement du routage {#how-routing-works}

Lorsqu'une découverte déclenche une notification, le système vérifie toutes les conditions suivantes. Si toutes les conditions sont remplies, la notification est envoyée au canal Slack ou Microsoft Teams de l'équipe. Si une condition n'est pas remplie, la notification est envoyée au canal de secours que vous avez configuré.

| Condition                                         | Description                                                                                                              |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Équipe configurée**                               | L'équipe référencée par le tag `team` de la découverte doit exister dans [Datadog Teams][3].                                        |
| **Canal Slack ou Microsoft Teams de l'équipe défini** | Un [canal de notification][4] Slack ou Microsoft Teams doit être configuré pour l'équipe dans Datadog Teams. Les autres cibles de notification ne sont pas utilisées pour le routage dynamique. |
| **Tag d'équipe sur la découverte**                           | La découverte de sécurité doit avoir exactement un tag `team` associé.                                                          |

Si une équipe a configuré à la fois un canal Slack ou Microsoft Teams et d'autres cibles de notification, la notification est envoyée uniquement au canal Slack ou Microsoft Teams.

### Canal de secours {#fallback-channel}

Lorsque vous activez le routage dynamique, vous devez spécifier un canal de secours. Le canal de secours reçoit les notifications dans l'un des cas suivants :

- La découverte n'a aucun tag `team` ou plus d'un tag `team`.
- L'équipe n'existe pas dans Datadog Teams.
- L'équipe n'a aucun canal de notification Slack ou Microsoft Teams configuré.

Le canal de secours est également utilisé pour les notifications de test.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/notification-rules
[2]: /fr/security/notifications/#notification-channels
[3]: /fr/account_management/teams/
[4]: /fr/account_management/teams/#send-notifications-to-a-specific-communication-channel