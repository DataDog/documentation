---
aliases:
  - /fr/integrations/hipchat/
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog sur la chaîne Slack de votre équipe.
doc_link: 'https://docs.datadoghq.com/integrations/slack/'
git_integration_title: slack
has_logo: true
integration_title: Slack
is_public: true
kind: integration
manifest_version: '1.0'
name: slack
public_title: Intégration Datadog/Slack
short_description: Envoyez des alertes et des graphiques Datadog sur la chaîne Slack de votre équipe.
version: '1.0'
---
## Présentation

Associez Slack à Datadog pour permettre à votre équipe de collaborer en :

- Partageant des graphiques avec vos collègues via les canaux privés ou publics de votre équipe.
- Recevant des alertes et des notifications de Datadog au sein de Slack.

## Implémentation

### Installation

Pour installer l'intégration Slack, accédez à son [carré d'intégration][1] dans l'application Datadog.

### Configuration

1. Dans votre compte Slack, accédez à la [page Applications][2] et recherchez Datadog.
2. Cliquez sur _Ajouter à Slack_ --> _Add Datadog Integration_, puis copiez l'**URL du webhook** Slack.
3. Accédez au [carré d'intégration Datadog/Slack][3] dans l'onglet de configuration.
4. Cliquez sur _Add Account_.
5. Ajoutez le nom de compte Slack de votre choix dans l'option **Slack Account Name**.
6. Collez l'URL du Webhook dans le champ **Slack Account Hook**.
7. Cliquez sur _Save_.
8. Ajoutez les **canaux Slack à utiliser pour transmettre les informations** :
   {{< img src="integrations/slack/slack_configuration.png" alt="Configuration Slack" >}}
9. Si vous souhaitez être informé pour chaque nouveau commentaire sur un graphique, cochez la case **Transfer all user comments** pour chaque chaîne. Si vous ne cochez pas cette case, vous devrez utiliser la syntaxe `@slack-<NOM_COMPTE>-<NOM_CHAÎNE>` pour que les commentaires soient publiés sur Slack. Vous devez utiliser `@slack-<NOM_CHAÎNE>` si vous n'utilisez qu'un seul compte ou si vous souhaitez publier les commentaires sur le premier compte uniquement.

Vous pouvez également configurer l'envoi d'alertes vers Slack à partir de [monitors][4] et du [flux d'événements][5].

## Mentions « @ » dans Slack depuis l'alerte d'un monitor

Après avoir configuré l'intégration Slack, saisissez `@slack` dans le message de votre notification pour afficher la liste des canaux auxquels vous pouvez envoyer votre notification :

Ajoutez `< >` de chaque côté de `@nomutilisateur` dans le modèle de message de vos monitors afin de prévenir l'utilisateur défini dans les notifications Slack. Exemple : `@slack-CANAL_SLACK <@NOMUTILISATEUR>`.

**Remarque** : si vous ne parvenez pas à ping une personne, utilisez son `nom d'utilisateur` Slack plutôt que son nom d'affichage. Vous le trouverez dans les [paramètres de compte Slack](http://slack.com/account/settings), sous **Nom d'utilisateur**.

Ajoutez la mention **@ici** ou **@canal** en utilisant respectivement `<!ici>` ou `<!canal>`.

Pour les groupes d'utilisateurs, utilisez `<!subteam^ID_GROUPE|NOM_GROUPE>`. Pour trouver l'`ID_GROUPE`, [interrogez l'endpoint API de Slack `usergroups.list`](https://api.slack.com/methods/usergroups.list). Par exemple, pour un groupe d'utilisateurs `testers`, utilisez la syntaxe suivante :

```text
<!subteam^12345|testers>
```

Remarque : les caractères spéciaux à la fin du nom d'un canal ne sont pas pris en charge pour les notifications « @ » de Slack.
Par exemple, `@----critical_alerts` fonctionne, mais `@--critical_alerts--` ne recevra aucune notification.

### Utilisation des template variables de message pour créer des mentions « @ » dynamiques

Utilisez des template variables de message dans un message de monitor pour créer des **mentions « @ »** dynamiques.

Par exemple, si la variable affichée est configurée en tant que chaîne dans l'intégration Slack :

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

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://slack.com/apps
[3]: https://app.datadoghq.com/account/settings#integrations/slack
[4]: https://docs.datadoghq.com/fr/monitors/notifications/?tab=slackintegration#notification
[5]: https://docs.datadoghq.com/fr/events/#notifications
[6]: https://docs.datadoghq.com/fr/help