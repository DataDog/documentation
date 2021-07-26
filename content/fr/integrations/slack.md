---
aliases:
  - /fr/integrations/hipchat/
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog sur le canal Slack de votre équipe.
doc_link: 'https://docs.datadoghq.com/integrations/slack/'
draft: false
git_integration_title: slack
has_logo: true
integration_id: ''
integration_title: Slack
is_public: true
kind: integration
manifest_version: '1.0'
name: slack
public_title: Intégration Datadog/Slack
short_description: Envoyez des alertes et des graphiques Datadog sur le canal Slack de votre équipe.
version: '1.0'
---
## Présentation

Associez Slack à Datadog pour permettre à votre équipe de collaborer en :

- partageant des graphiques avec vos collègues via les canaux privés ou publics de votre équipe ;
- recevant des alertes et des notifications de Datadog au sein de Slack.

## Configuration

{{< tabs >}}

{{% tab "Application Slack - États-Unis" %}}

### Installation

Si vous utilisez les États-Unis comme région dans l'application Datadog, installez l'application Slack Datadog dans votre espace de travail Slack :

1. Accédez au [carré de l'intégration][1] Slack sous Integrations dans l'application Datadog. Cliquez sur le bouton **Connect Slack Account** en bas du carré.

2. Vérifiez que votre compte Slack et votre compte Datadog sont associés. **Remarque** : vous aurez peut-être besoin de l'autorisation de l'administrateur de votre espace de travail Datadog pour effectuer cette modification, mais vous n'aurez à le faire qu'une seule fois. 

**Remarque** : l'[intégration avec la liste des applications Slack][2] fonctionne uniquement si vous utilisez la région États-Unis dans l'application Datadog. Pour les autres régions, consultez la documentation relative au [Webhook Slack][3].

## Utilisation de l'application Slack

Une fois installée, l'application Slack peut être invitée sur n'importe quel canal :

```
/invite @Datadog
```

Ensuite, associez votre compte Datadog à votre compte Slack :

```
/datadog accounts
```

Vous avez également la possibilité d'intégrer des composants de Datadog dans Slack à l'aide d'une commande.

```
/datadog dashboard
/datadog slo
```

Vous pouvez également copier et coller n'importe quel widget à partir de Datadog vers Slack en appuyant sur `CMD + C` ou `CTRL + C`, ou en affichant le menu déroulant en haut d'un widget puis en sélectionnant « Copy ». Lorsque vous collez un widget, celui-ci apparaît en-dessous d'un lien une fois envoyé dans un canal.

### Connexion de monitors

Vous pouvez désactiver le déclenchement de monitors dans Slack en un seul clic.

Vous pouvez modifier les monitors à envoyer à partir de l'application Slack de deux façons :

**Mise à jour groupée** : effectuez une mise à jour groupée de tous les monitors à envoyer à partir de l'application Slack et ajoutez les boutons de désactivation en cliquant sur le bouton « Upgrade », situé en haut de la configuration pour chacun de vos comptes Slack dans le carré d'intégration dans Datadog. 

**Méthode manuelle** : si vous souhaitez tester cette fonctionnalité avant de la déployer à toutes vos équipes, ajoutez manuellement les canaux à la nouvelle configuration de compte de l'application dans la configuration de l'intégration Slack. 
**Remarque** : vous devrez peut-être supprimer les références en double vers un même canal.

### Utilisation des incidents Datadog

Déclarez un nouvel incident à partir de l'application Slack avec :

```
/datadog incident 
```

**Remarque** : tous les utilisateurs de votre organisation Slack peuvent déclarer un incident, même s'ils n'ont pas accès à Datadog.

Lorsqu'un nouvel incident est créé, un canal Slack correspondant `#incident-(identifiant unique)` est créé, et un message est envoyé au canal pour vous indiquer le nouveau canal d'incident à utiliser. Le sujet du canal change en fonction de l'incident.

Mettez à jour l'état d'un incident (p. ex. sa gravité) avec :

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
Le canal de mise à jour des incidents permet à votre équipe de bénéficier d'une visibilité totale sur l'ensemble des incidents de l'organisation, le tout depuis votre espace de travail Slack. Sélectionnez le canal de votre espace de travail dans lequel vous souhaitez publier les mises à jour. Des messages seront envoyés pour les événements suivants :

1. Les nouveaux signalements d'incident
2. Les changements de gravité et de statut, accompagnés du nom de la personne responsable de l'incident
3. Des liens vers la page de présentation de l'[incident][4] dans l'application
4. Des liens pour rejoindre les canaux Slack réservés aux incidents

Une fois l'app Slack [installée][5], accédez à la page Incident [Settings][6]. Défilez vers le bas jusqu'à atteindre la section *Incident Updates Channel*, puis effectuez la configuration du canal.

Vous pouvez définir dans l'application Slack le canal qui fera office de canal de mise à jour des incidents.

**Pour configurer ce canal, procédez comme suit :**
1. Accédez à Incidents Settings.
2. Repérez la section *Incident Updates Channel*.
3. Définissez l'espace de travail Slack ainsi que le canal spécifique à utiliser comme canal de mise à jour des incidents.

{{< img src="integrations/slack/incident_updates_channel.png" alt="Canal de mise à jour des incidents" style="width:80%;">}}

#### Gérer des tâches d'incident

Grâce aux actions Slack et aux commandes `/datadog`, vous pouvez créer et gérer des tâches d'incident directement depuis Slack. Les commandes de tâche d'incident doivent être utilisées dans un canal d'incident.

**Actions Slack** : 
Vous pouvez créer des tâches à l'aide des actions Slack. Pour ce faire, passez le curseur sur un message envoyé dans un canal d'incident. Cliquez ensuite sur l'icône représentant trois points située à droite du message, puis sur Add Task to Incident. 

**Commandes disponibles** :

* La commande `/datadog task` crée une tâche pour l'incident. La fenêtre modale qui s'affiche vous permet de décrire la tâche, de l'attribuer à des membres d'équipe et de définir une date d'échéance.
* La commande `/datadog task list` affiche la liste des tâches créées pour l'incident. Cette liste vous permet de rouvrir des tâches ou d'indiquer qu'elles sont terminées.

Vous pouvez également consulter et gérer toutes les tâches créées depuis l['interface Incidents][4], en accédant à l'onglet Remediation de la section Incident Tasks. Consultez la [documentation à ce sujet][7] pour en savoir plus.


[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://www.datadoghq.com/blog/datadog-slack-app/
[3]: https://docs.datadoghq.com/fr/integrations/slack/?tab=slackwebhookeu
[4]: https://app.datadoghq.com/incidents
[5]: https://docs.datadoghq.com/fr/integrations/slack/?tab=slackapplicationus#installation
[6]: https://app.datadoghq.com/incidents/settings
[7]: https://docs.datadoghq.com/fr/monitors/incident_management/#follow-up-and-learn-from-the-incident
{{% /tab %}}

{{% tab "Webhook Slack - Europe" %}}

Utilisez le Webhook Slack si vous utilisez une région hors États-Unis de l'application Datadog.

### Installation

Pour installer l'intégration Slack, accédez à son [carré d'intégration][1] dans l'application Datadog.

### Configuration

1. Dans votre compte Slack, accédez à la [page Applications][2] et recherchez Datadog (Legacy).
2. Cliquez sur _Ajouter à Slack_ --> _Add Datadog Integration_, puis copiez l'**URL du webhook** Slack.
3. Accédez au [carré d'intégration Datadog/Slack][1] dans l'onglet de configuration.
4. Cliquez sur _Add Account_.
5. Ajoutez le nom de compte Slack de votre choix via l'option **Slack Account Name**.
6. Collez l'URL du Webhook dans le champ **Slack Account Hook**.
7. Cliquez sur _Save_.
8. Ajoutez les **canaux Slack à utiliser pour transmettre les informations** :
  {{< img src="integrations/slack/slack_configuration.png" alt="Configuration Slack" >}}
9. Si vous souhaitez être informé pour chaque nouveau commentaire sur un graphique, cochez la case **Transfer all user comments** pour chaque canal. Si vous ne cochez pas cette case, vous devrez utiliser la syntaxe `@slack-<NOM_COMPTE>-<NOM_CANAL>` pour que les commentaires soient publiés sur Slack. Vous devez utiliser `@slack-<NOM_CANAL>` si vous n'utilisez qu'un seul compte ou si vous souhaitez publier les commentaires sur le premier compte uniquement.

Vous pouvez également configurer l'envoi d'alertes vers Slack à partir de [monitors][3] et du [flux d'événements][4].

**Remarque** : si vous utilisez l'application Datadog en dehors des États-Unis et souhaitez profiter de l'[intégration avec la liste des applications Slack][5], [contactez notre équipe d'assistance][6].


[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://slack.com/apps
[3]: https://docs.datadoghq.com/fr/monitors/notifications/?tab=slackintegration#notification
[4]: https://docs.datadoghq.com/fr/events/#notifications
[5]: https://www.datadoghq.com/blog/datadog-slack-app/
[6]: https://docs.datadoghq.com/fr/help/
{{% /tab %}}

{{< /tabs >}}

## Mentions « @ » dans Slack depuis l'alerte d'un monitor

Après avoir configuré l'intégration Slack, saisissez `@slack` dans le message de votre notification pour afficher la liste des canaux auxquels vous pouvez envoyer votre notification :

Ajoutez `< >` de chaque côté de `@nomutilisateur` dans le modèle de message de vos monitors afin de prévenir l'utilisateur défini dans les notifications Slack. Exemple : `@slack-CANAL_SLACK <@NOMUTILISATEUR>`.

**Remarque** : si vous ne parvenez pas à ping une personne, utilisez son `nom d'utilisateur` Slack plutôt que son nom d'affichage. Vous le trouverez dans les [paramètres de compte Slack][1], sous **Nom d'utilisateur**.

Ajoutez la mention **@ici** ou **@canal** en utilisant respectivement `<!ici>` ou `<!canal>`.

Pour les groupes d'utilisateurs, utilisez `<!subteam^ID_GROUPE>`. Pour trouver l'`ID_GROUPE`, [interrogez l'endpoint API de Slack `usergroups.list`][2]. Par exemple, pour un groupe d'utilisateurs avec l'ID `12345`, utilisez la syntaxe suivante :

```text
<!subteam^12345>
```

Remarque : les caractères spéciaux à la fin du nom d'un canal ne sont pas pris en charge pour les notifications « @ » de Slack.
Par exemple, `@----critical_alerts` fonctionne, mais `@--critical_alerts--` ne recevra aucune notification.

### Utilisation des template variables de message pour créer des mentions « @ » dynamiques

Utilisez des template variables de message dans un message de monitor pour créer des **mentions « @ »** dynamiques.

Par exemple, si la variable affichée est configurée en tant que canal dans l'intégration Slack :

- `@slack-{{nom.propriétaire}}` publie un message sur le canal du propriétaire pour ce monitor.

- `@slack-{{host.name}}` publie un message dans le canal #host.name Slack.

Vous pouvez également créer une **mention « @ »** transmise directement à une adresse e-mail spécifique :

- `@team-{{nom.équipe}}@entreprise.com` envoie directement un e-mail à la liste de diffusion de l'équipe.

## Données collectées

### Métriques

L'intégration Slack n'inclut aucune métrique.

### Événements

L'intégration Slack n'inclut aucun événement.

### Checks de service

L'intégration Slack n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: http://slack.com/account/settings
[2]: https://api.slack.com/methods/usergroups.list
[3]: https://docs.datadoghq.com/fr/help/