---
aliases:
  - /fr/integrations/hipchat/
categories:
  - Collaboration
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog sur le canal Slack de votre équipe.
doc_link: 'https://docs.datadoghq.com/integrations/slack/'
git_integration_title: slack
has_logo: true
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

* Partageant des graphiques avec vos collègues via les canaux privés ou publics de votre équipe.
* Recevant des alertes et des notifications de Datadog au sein de Slack.

## Implémentation
### Installation

Pour installer l'intégration Slack, accédez à son [carré d'intégration][1] dans l'application Datadog.

### Configuration

1. Dans votre compte Slack, accédez à la [page Applications][2] et recherchez Datadog.
2. Cliquez sur *Ajouter la configuration* --> *Add Datadog Integration*, puis copiez l'**URL du Webhook** Slack.
3. Accédez au [carré d'intégration Datadog/Slack][3] dans l'onglet de configuration.
4. Cliquez sur *Add Account*
5. Ajoutez le nom de compte Slack de votre choix dans l'option **Slack Account Name**.
6. Collez l'URL du Webhook dans le champ **Slack Account Hook**.
7. Cliquez sur *Save*.
8. Ajoutez les **canaux Slack à utiliser pour transmettre les informations** :
    {{< img src="integrations/slack/slack_configuration.png" alt="Configuration de Slack" responsive="true">}}
9. Si vous souhaitez être informé pour chaque nouveau commentaire sur un graphique, cochez la case **Transfer all user comments** pour chaque canal. Si vous ne cochez pas cette case, vous devrez utiliser la syntaxe `@slack-<NOM_COMPTE>-<NOM_CANAL>` pour que les commentaires soient publiés sur Slack. Vous devez utiliser `@slack-<NOM_CANAL>` si vous n'utilisez qu'un seul compte ou si vous souhaitez publier les commentaires sur le premier compte uniquement.

Vous pouvez également configurer l'envoi d'alertes vers Slack à partir de [monitors][4] et du [flux d'événements][5].

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
[5]: https://docs.datadoghq.com/fr/graphing/event_stream/#notifications
[6]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}