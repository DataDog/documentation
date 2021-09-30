---
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: "Soyez informé des événements et des alertes Datadog dans Microsoft\_Teams."
doc_link: https://docs.datadoghq.com/integrations/microsoft_teams/
draft: false
git_integration_title: microsoft_teams
has_logo: true
integration_id: ''
integration_title: "Microsoft\_Teams"
is_public: true
kind: integration
manifest_version: '1.0'
name: microsoft_teams
public_title: "Intégration Datadog/Microsoft\_Teams"
short_description: "Soyez informé des événements et des alertes Datadog dans Microsoft\_Teams."
version: '1.0'
---
## Présentation

Intégrez Microsoft Teams pour :

- Soyez informé des événements et des alertes Datadog dans Microsoft Teams.
- Partager des messages et des graphiques avec votre équipe Microsoft Teams

## Configuration

Pour intégrer Datadog à un canal Microsoft Teams :

1. Cliquez sur le bouton `...` en regard du nom du canal dans la liste des canaux, puis choisissez `Connectors`.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1.png" alt="Microsoft Teams (étape 1)" >}}

2. Recherchez Datadog et cliquez sur `Configure`.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2.png" alt="Microsoft Teams (étape 2)" >}}

3. Sur la page `Configure`, copiez l'URL du webhook.
4. Dans l'app Datadog, accédez à [Integrations > Microsoft teams][1].
5. Dans l'onglet Configuration, cliquez sur **Add Channel**, nommez votre canal, puis collez l'URL du webhook.
6. Depuis la page `Configure` de Microsoft, cliquez sur **Save**.

Vous pouvez maintenant utiliser la [syntaxe `@-notification`][2] avec le nom de votre équipe Microsoft.

## Données collectées

### Métriques

L'intégration Microsoft Teams ne fournit aucune métrique.

### Événements

L'intégration Microsoft Teams ne fournit aucun événement.

### Checks de service

L'intégration Microsoft Teams ne fournit aucun check de service.

## Dépannage

### Utilisation de l'authentification unique

Suivez les étapes suivantes pour définir de nouveaux connecteurs pour vos canaux :

1. Connectez-vous à Datadog, puis suivez les étapes 1 et 2 de configuration.

2. Pour l'étape 3, vous devez accéder à Datadog depuis la page Microsoft Teams. Ouvrez un nouvel onglet et connectez-vous à Datadog à l'aide du processus d'authentification unique. Effectuez ensuite l'étape 4 sur une autre page.

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/microsoft-teams
[2]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/fr/help/