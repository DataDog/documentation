---
aliases:
- /fr/integrations/hipchat/
categories:
- collaboration
- notification
dependencies: []
description: Envoyez des alertes et des graphiques Datadog sur le canal Slack de votre
  équipe.
doc_link: https://docs.datadoghq.com/integrations/slack/
draft: false
git_integration_title: slack
has_logo: true
integration_id: ''
integration_title: Slack
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: slack
public_title: Intégration Datadog/Slack
short_description: Envoyez des alertes et des graphiques Datadog sur le canal Slack
  de votre équipe.
version: '1.0'
---

## Présentation

Associez Slack à Datadog pour optimiser la collaboration au sein de votre équipe :

- Partagez des graphiques avec vos collègues via les canaux privés ou publics de votre équipe
- Recevez des alertes et des notifications de Datadog via Slack
- Désactivez les monitors qui se sont déclenchés et déclarez des incidents Datadog depuis Slack

## Configuration

{{< tabs >}}

{{% tab "Application Slack" %}}

### Configurer l'Agent Datadog pour l'APM

Si vous utilisez le [site][1] US1, US3, US5 ou EU1 Datadog, installez l'app Datadog pour Slack dans votre espace de travail Slack :

1. Accédez au [carré de l'intégration][2] Slack sous Integrations sur le site Datadog. Cliquez sur le bouton **Connect Slack Account** en bas du carré.

2. Vérifiez que votre compte Slack et votre compte Datadog sont associés. L'administrateur de votre espace de travail Datadog devra potentiellement approuver cette modification s'il s'agit de la première fois.

L'[intégration Datadog proposée sur le Slack App Directory][3] fonctionne uniquement si vous utilisez le [site][1] US1, US3, US5 ou EU1 Datadog. Pour les autres régions, consultez la documentation relative au [Webhook Slack][4].

## Utilisation

Une fois installée, l'application Slack peut être invitée sur n'importe quel canal :

```
/invite @Datadog
```

Utilisez la commande suivant pour visualiser toutes les commandes disponibles sur Slack :

```
/datadog help
```

<div class="alert alert-info">
`/dd` peut être utilisé comme alias pour toutes les commandes `/datadog`.
</div>

Vous pouvez également copier et coller n'importe quel widget à partir de Datadog vers Slack à l'aide du raccourci `CMD + C` ou `CTRL + C`, ou en affichant le menu déroulant en haut d'un widget puis en sélectionnant **Copy**. Lorsque vous collez un widget, celui-ci apparaît en dessous d'un lien une fois envoyé dans un canal.

### Connexion de monitors

Vous pouvez désactiver le déclenchement de monitors dans Slack en un seul clic.

Vous pouvez modifier les monitors à envoyer à partir de l'application Slack de deux façons :

**Mise à jour groupée** : effectuez une mise à jour groupée de tous les monitors à envoyer à partir de l'application Slack et ajoutez les boutons de désactivation en cliquant sur le bouton « Upgrade », situé en haut de la configuration pour chacun de vos comptes Slack dans le carré d'intégration dans Datadog.

**Méthode manuelle** : si vous souhaitez tester cette fonctionnalité avant de la déployer à toutes vos équipes, ajoutez manuellement les canaux à la nouvelle configuration de compte de l'application dans la configuration de l'intégration Slack. Vous devrez peut-être supprimer les références en double vers un même canal.

### Utilisation des incidents Datadog

Déclarez un nouvel incident à partir de l'application Slack avec :

```
/datadog incident 
```

Tous les utilisateurs de votre organisation Slack peuvent déclarer un incident, même s'ils n'ont pas accès à Datadog.

Lorsqu'un nouvel incident est créé, un canal Slack correspondant `#incident-(identifiant unique)` est créé, et un message est envoyé au canal pour vous indiquer le nouveau canal d'incident à utiliser. Le sujet du canal change en fonction de l'incident.

Modifiez l'état d'un incident (comme sa gravité) avec la commande suivante :

```
/datadog incident update
```

Répertoriez tous les incidents ouverts (actifs et stables) avec :

```
/datadog incident lists
```

Utilisez le menu des actions sur un message (les trois points qui s'affichent lorsque vous passez le curseur sur un message envoyé dans le canal #incident tout à droite) pour ajouter le message à la chronologie des événements pour cet incident dans l'application.

{{< img src="integrations/slack/incidents2.png" alt="Configuration de Slack" style="width:80%;">}}

#### Canal de mise à jour des incidents
Le canal de mise à jour des incidents permet à votre équipe de bénéficier d'une visibilité totale sur l'ensemble des incidents de l'organisation, le tout depuis votre espace de travail Slack. Sélectionnez le canal de votre espace de travail dans lequel vous souhaitez publier les mises à jour. Des messages seront envoyés pour :

1. Les nouveaux signalements d'incident
2. Les changements de gravité et de statut, accompagnés du nom de la personne responsable de l'incident
3. Les liens vers la page de présentation de l'[incident][5] dans l'application
4. Les liens pour rejoindre les canaux Slack réservés aux incidents

Une fois l'app Slack [installée][6], accédez à la page [Incident Settings][7]. Défilez vers le bas jusqu'à atteindre la section *Incident Updates Channel*, puis effectuez la configuration du canal.

Ouvrez l'app Slack, puis définissez le canal dans lequel vous souhaitez publier les mises à jour des incidents.

**Pour configurer ce canal, procédez comme suit :**
1. Accédez à Incidents Settings.
2. Repérez la section *Incident Updates Channel*.
3. Définissez l'espace de travail Slack et le canal spécifique à utiliser pour les mises à jour des incidents.

{{< img src="integrations/slack/incident_updates_channel.png" alt="Canal de mise à jour des incidents" style="width:80%;">}}

#### Gérer des tâches d'incident

Grâce aux actions Slack et aux commandes `/datadog`, vous pouvez créer et gérer des tâches d'incident directement depuis Slack. Les commandes de tâche d'incident doivent être utilisées dans un canal d'incident.

**Actions Slack** : 
Vous pouvez créer des tâches à l'aide des actions Slack. Pour ce faire, passez le curseur sur un message envoyé dans un canal d'incident. Cliquez ensuite sur l'icône représentant trois points située à droite du message, puis sur Add Task to Incident.

**Commandes disponibles** :

* La commande `/datadog task` crée une tâche pour l'incident. La fenêtre modale qui s'affiche vous permet de décrire la tâche, de l'attribuer à des membres d'équipe et de définir une date d'échéance.
* La commande `/datadog task list` affiche la liste des tâches créées pour l'incident. Cette liste vous permet de rouvrir des tâches ou d'indiquer qu'elles sont terminées.

Vous pouvez gérer toutes les tâches créées depuis l'[interface Incidents][5] en accédant à l'onglet **Remediation** de la section **Incident Tasks**. Consultez la [documentation à ce sujet][8] pour en savoir plus.

[1]: https://docs.datadoghq.com/fr/getting_started/site/
[2]: https://app.datadoghq.com/account/settings#integrations/slack
[3]: https://www.datadoghq.com/blog/datadog-slack-app/
[4]: https://docs.datadoghq.com/fr/integrations/slack/?tab=slackwebhooklegacy
[5]: https://app.datadoghq.com/incidents
[6]: https://docs.datadoghq.com/fr/integrations/slack/?tab=slackapplicationus#installation
[7]: https://app.datadoghq.com/incidents/settings
[8]: https://docs.datadoghq.com/fr/monitors/incident_management/#follow-up-and-learn-from-the-incident
{{% /tab %}}

{{% tab "Webhook Slack (ancienne version)" %}}

Utilisez le webhook Slack si vous êtes sur le [site][1] US5 ou US1-FED de Datadog.

### Installation

Pour installer l'intégration Slack, accédez à son [carré d'intégration][2] sur le site de Datadog.

### Configuration

1. Dans votre compte Slack, accédez à l'[application Datadog (Legacy)][3].
2. Cliquez sur _Ajouter à Slack_ --> _Add Datadog Integration_, puis copiez l'**URL du webhook** Slack.
3. Accédez au [carré d'intégration Datadog/Slack][2] dans l'onglet de configuration.
4. Cliquez sur _Add Account_.
5. Ajoutez le nom de compte Slack de votre choix via l'option **Slack Account Name**.
6. Collez l'URL du Webhook dans le champ **Slack Account Hook**.
7. Cliquez sur _Save_.
8. Ajoutez les **canaux Slack à utiliser pour transmettre les informations** :
  {{< img src="integrations/slack/slack_configuration.png" alt="Configuration Slack" >}}
9. Si vous souhaitez être informé pour chaque nouveau commentaire sur un graphique, cochez la case **Transfer all user comments** pour chaque canal. Si vous ne cochez pas cette case, vous devrez utiliser la syntaxe `@slack-<NOM_COMPTE>-<NOM_CANAL>` pour que les commentaires soient publiés sur Slack. Vous devez utiliser `@slack-<NOM_CANAL>` si vous n'utilisez qu'un seul compte ou si vous souhaitez publier les commentaires sur le premier compte uniquement.

Vous pouvez également configurer l'envoi d'alertes vers Slack à partir de [monitors][4] et du [flux d'événements][5].


[1]: https://docs.datadoghq.com/fr/getting_started/site/
[2]: https://app.datadoghq.com/account/settings#integrations/slack
[3]: https://slack.com/apps/A0F7XDT7F-datadog-legacy
[4]: https://docs.datadoghq.com/fr/monitors/notifications/?tab=slackintegration#notification
[5]: https://docs.datadoghq.com/fr/events/#notifications
{{% /tab %}}
{{< /tabs >}}

## Mentions `@` dans Slack depuis l'alerte d'un monitor

Après avoir configuré l'intégration Slack, saisissez `@slack` dans le message de votre notification pour afficher la liste des canaux auxquels vous pouvez envoyer votre notification.

Ajoutez `< >` de chaque côté de `@nomutilisateur` dans le modèle de message de votre monitor afin de prévenir l'utilisateur défini dans les notifications Slack. Exemple : `@slack-CANAL_SLACK <@NOMUTILISATEUR>` ou `@slack-COMPTE_SLACK-CANAL_SLACK <@NOMUTILISATEUR>`.

Si vous ne parvenez pas à ping une personne, utilisez son `nom d'utilisateur` Slack plutôt que son nom d'affichage. Vous le trouverez dans les [paramètres de compte Slack][1], sous **Nom d'utilisateur**.

Ajoutez la mention **@ici** ou **@canal** en utilisant respectivement `<!ici>` ou `<!canal>`.

Pour les groupes d'utilisateurs, utilisez `<!subteam^ID_GROUPE>`. Pour trouver l'`ID_GROUPE`, [interrogez l'endpoint API de Slack `usergroups.list`][2]. Par exemple, pour un groupe d'utilisateurs avec l'ID `12345`, utilisez la syntaxe suivante :

```text
<!subteam^12345>
```

Utilisez les mêmes règles, template variables, tags et conditions que pour les [notifications][3] Datadog standard. Par exemple, la notification suivante envoie une alerte à une sous-équipe dans le canal `infrastructure` en cas de renvoi d'une notification :

```
La charge CPU a dépassé {{warn_threshold}} sur {{ @machine_id.name }}.
{{#is_renotify}}
Attention @slack-infrastructure <!subteam^12345>
{{/is_renotify}}
```

Les caractères spéciaux à la fin du nom d'un canal ne sont pas pris en charge pour les @notifications « @ » de Slack. Par exemple, `@----critical_alerts` fonctionne, mais `@--critical_alerts--` ne reçoit aucune notification.

### Utilisation des template variables de message pour créer des mentions « @ » dynamiques

Utilisez des template variables de message dans un message de monitor pour créer des **mentions « @ »** dynamiques.

Par exemple, si la variable affichée est configurée en tant que canal dans l'intégration Slack :

- `@slack-{{nom.propriétaire}}` publie un message sur le canal du propriétaire pour ce monitor.

- `@slack-{{host.name}}` publie un message Slack dans le canal #host.name.

Vous pouvez également créer une **mention « @ »** transmise directement à une adresse e-mail spécifique :

- `@team-{{nom.équipe}}@entreprise.com` envoie directement un e-mail à la liste de diffusion de l'équipe.

### Contrôler tous les aspects de vos notifications Slack

Les alertes de monitor publiées dans votre canal Slack comprennent plusieurs champs :
* Le **message**
* Un **snapshot** (graphique) de la requête qui a déclenché le monitor
* Les **tags** associés
* Les personnes **notifiées**

Vous pouvez activer ou désactiver chacun de ces champs depuis le carré de l'intégration Slack. Pour chaque canal, cochez la case en regard des champs que vous souhaitez inclure dans les notifications. Les cases des autres champs doivent être décochées.

{{< img src="integrations/slack/slack_notifications_config.png" alt="Configuration des notifications Slack" style="width:80%;">}}

## Données collectées

### Métriques

L'intégration Slack n'inclut aucune métrique.

### Événements

L'intégration Slack n'inclut aucun événement.

### Checks de service

L'intégration Slack n'inclut aucun check de service.

## Autorisations

L'app Datadog pour Slack nécessite les portées OAuth suivantes. Pour en savoir plus, consultez la [documentation relative aux portées d'autorisations Slack][4] (en anglais). 

### Portées des tokens du bot

| Portées                   | Motif de la requête                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `channels:join`          | Rejoindre automatiquement les canaux publics configurés via le carré de l'intégration Slack dans Datadog.                        |
| `channels:manage`        | Créer des canaux dédiés à la gestion et à la remédiation des incidents avec la solution Incident Management de Datadog.                           |
| `channels:read`          | Activer les suggestions de nom de canal lors de la saisie dans le carré de l'intégration Slack sur Datadog.                      |
| `chat:write`             | Recevoir des alertes et des notifications Datadog dans les canaux et les conversations approuvés.                               |
| `commands`               | Activer la commande /datadog et son alias /dd pour effectuer des actions dans Datadog.                                |
| `groups:read`            | Activer les suggestions de nom de canal lors de la saisie pour les canaux privés dans le carré de l'intégration Slack sur Datadog. |
| `im:history`             | Autoriser Datadog à vous envoyer des messages dans l'onglet Messages, tels que des instructions d'utilisation.              |
| `im:read`                | Activer la commande /datadog et son alias /dd pour effectuer des actions dans Datadog à partir des messages directs.               |
| `im:write`               | Recevoir des messages, des demandes et des erreurs de la part du bot Datadog concernant votre compte Datadog.                    |
| `links:read`             | Afficher un aperçu des liens Datadog dans les conversations, avec des informations supplémentaires comme des graphiques et des exemples de log.                |
| `links:write`            | Afficher un aperçu des liens Datadog dans les conversations, avec des informations supplémentaires comme des graphiques et des exemples de log.                |
| `mpim:read`              | Activer la commande /datadog et son alias /dd pour effectuer des actions dans Datadog à partir des messages directs de groupe.         |
| `reactions:write`        | Ajouter un emoji de réaction aux messages qui ont été ajoutés à la timeline d'un incident via un raccourci.                   |
| `team:read`              | Permet de mettre à jour votre espace de travail dans le carré de l'intégration Slack dans Datadog.                        |
| `users:read`             | Utiliser des réponses adaptées à votre fuseau horaire.                                                                |
| `users:read.email`       | Ajouter des messages et des utilisateurs pour les incidents créés en dehors de Slack dans Datadog.                                  |
| `workflow.steps:execute` | Envoyer automatiquement des messages avec les widgets de dashboard Datadog depuis une étape de workflow Slack.                         |

### Portées des tokens utilisateur

| Portées           | Motif de la requête                                                            |
|------------------|---------------------------------------------------------------------------|
| `identity.basic` | Effectuer des actions dans Datadog depuis Slack en connectant votre compte Datadog. |

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: http://slack.com/account/settings
[2]: https://api.slack.com/methods/usergroups.list
[3]: https://docs.datadoghq.com/fr/monitors/notifications/
[4]: https://api.slack.com/scopes
[5]: https://docs.datadoghq.com/fr/help/