---
aliases:
- /fr/service_management/incident_management/incident_settings/notification_rules/
- /fr/incident_response/incident_management/incident_settings/notification_rules/
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: Documentation
  text: Personnaliser les modèles de message
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: Documentation
  text: Référence des variables d'incident
title: Règles de notification
---
## Présentation {#overview}

Les règles de notification automatisées garantissent que les bonnes parties prenantes sont alertées de vos incidents en fonction de critères que vous définissez. Cela décharge les intervenants en cas d'incident et garantit l'implication rapide des bonnes personnes, accélérant ainsi le processus de résolution. Par exemple, vous pouvez définir une règle de notification pour avertir automatiquement les parties prenantes de l'équipe chaque fois qu'un incident SEV-1 ou SEV-2 pour `service:web-store` ET `application:purchasing` est déclaré et lorsque cet incident passe par différents états de progression.

Utilisez les règles de notification pour :
 - Garantir que les principales parties prenantes sont toujours informées des incidents hautement prioritaires
 - Notifier des intervenants spécifiques lorsqu'un service ou une équipe particulier rencontre un incident
 - Déclencher des automatisations à l'aide de [webhooks][6] ou de [Datadog Workflows][5]

## Création d'une règle de notification {#creating-a-notification-rule}

Pour créer et modifier des règles de notification, vous devez disposer de l'autorisation `Incident Notification Settings Write`.

Vous pouvez gérer les règles de notification dans [Incident Settings Notification Rules][1], où vous pouvez rechercher, supprimer, copier, activer/désactiver et créer des règles. 

### Déclencheurs et conditions {#triggers-and-conditions}

Sous **Lorsqu'un incident est...**, sélectionnez un déclencheur et définissez les conditions de la règle :

| Condition                              | Quand la règle envoie une notification                                                                                                                                                                                                                     |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Declared`                           | Envoie une notification lorsqu'un incident est déclaré et remplit les conditions définies. Si aucune condition n'est définie, elle envoie une notification pour chaque déclaration d'incident.                                                                              |
| `Declared or attributes are updated` | Envoie une notification lorsqu'un incident est déclaré ou mis à jour de manière à remplir les conditions. Envoie également une notification lorsque l'un des champs listés sous **Notifier à nouveau lors des mises à jour sur...** est modifié et que l'incident remplit déjà les conditions. Les conditions sont jointes par `AND` entre les champs et `OR` au sein de chaque champ. |




Par exemple, considérez une règle qui comporte les conditions `severity:SEV-1`, `severity:SEV-2` et `team:shopping`. La règle est également configurée pour renvoyer une notification en cas de modification des champs `state` et `service`. Cette règle envoie une notification lorsque vous :

* Ajoutez l'équipe `shopping` au champ `teams` de l'incident.
* Modifiez le `severity` de l'incident en `SEV-1` ou `SEV-2` d'une autre gravité.
* Modifiez le champ `state` **si** l'incident a déjà l'équipe `shopping` **et** est soit `SEV-1`, soit `SEV-2`.
* Modifiez le champ `service` **si** l'incident a déjà l'équipe `shopping` **et** est soit `SEV-1`, soit `SEV-2`.

### Destinataires de la notification {#notification-recipients}

Lors de la définition des destinataires d'une règle de notification, vous pouvez utiliser des identifiants `@` pour n'importe laquelle des [intégrations de notification prises en charge][2] par Datadog. Cela vous permet de définir des règles de notification qui avertissent de nombreux types de cibles, notamment :

| Type de notification      | Identifiant                         | Comment utiliser :|
|------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **E-mails**             | `@<email>`                     | Saisissez `@` suivi de toute adresse e-mail valide. S'il s'agit de l'e-mail d'un utilisateur Datadog, l'utilisateur est automatiquement ajouté en tant qu'intervenant lorsque la règle envoie une notification. Pour les incidents privés, l'utilisateur obtient l'accès.                            |
| **Appareils mobiles**     | *(Sélectionnés depuis l'interface utilisateur)*           | Sélectionnez le nom de l'utilisateur avec **(Notification push mobile)**. L'utilisateur doit avoir activé les notifications dans l'[application mobile Datadog][3] pour que cette option apparaisse.                                                                                                      |
| **Canaux Slack**     | `@slack-<channel>`<br>`@incident-slack-channel`            | Utilisez un identifiant `@slack-`. Pour avertir le canal Slack de l'incident, utilisez `@incident-slack-channel`.                                                                                                                                                |
| **Équipes On-Call**      | `@oncall-<team>`               | Utilisez un identifiant `@oncall-` pour contacter une [équipe d'astreinte Datadog][7].                                                                                                                                                                                            |
| **Microsoft Teams**    | `@teams-<channel>`             | Utilisez un identifiant `@teams-` pour notifier un canal Microsoft Teams. Il n'existe aucun équivalent Microsoft Teams pour `@incident-slack-channel`, donc un identifiant `@teams-` ne peut pas cibler le canal créé automatiquement pour un incident. Consultez [Cibles de notification Microsoft Teams][8].                                                                                                                                                                                 |
| **Webhooks**           | `@webhook-<name>`              | Utilisez un identifiant `@webhook-` pour déclencher un [webhook][6]. Vous devez définir le webhook avec un type de charge utile **incident**.                                                                                                                          |
| **Workflows**          | `@workflows-<workflow_name>`   | Utilisez un identifiant `@workflows-` pour déclencher un [Datadog Workflow][5]. Vous devez publier le workflow avec un type de déclencheur **incident**.                                                                                                             |


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /fr/monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /fr/mobile/
[4]: /fr/incident_response/on-call/
[5]: /fr/actions/workflows/
[6]: /fr/integrations/webhooks/
[7]: /fr/incident_response/on-call/
[8]: /fr/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#notification-targets