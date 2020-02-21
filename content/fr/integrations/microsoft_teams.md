---
categories:
  - Collaboration
ddtype: crawler
dependencies: []
description: "Soyez informé des événements et des alertes Datadog dans Microsoft\_Teams."
doc_link: 'https://docs.datadoghq.com/integrations/microsoft_teams/'
git_integration_title: microsoft_teams
has_logo: true
integration_title: "Microsoft\_Teams"
is_public: true
kind: integration
manifest_version: 1
name: microsoft_teams
public_title: "Intégration Datadog/Microsoft\_Teams"
short_description: "Soyez informé des événements et des alertes Datadog dans Microsoft\_Teams."
version: 1
---
## Présentation

Intégrez Microsoft Teams pour :

* Être informé des événements et des alertes Datadog dans Microsoft Teams
* Partager des messages et des graphiques avec votre équipe Microsoft Teams

## Implémentation
Pour intégrer Datadog à un canal Microsoft Teams :

1. Cliquez sur le bouton `...` en regard du nom du canal dans la liste des canaux, puis choisissez `Connectors`.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1.png" alt="Microsoft Teams (étape 1)" >}}

2. Recherchez Datadog et cliquez sur `Configure`.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2.png" alt="Microsoft Teams (étape 2)" >}}

3. Si vous disposez d'un sous-domaine, saisissez le sous-domaine de votre compte. Dans le cas contraire, saisissez `app`. Cliquez sur **Visit site to install** pour être redirigé vers Datadog.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_3.png" alt="Microsoft Teams (étape 3)" >}}

4. Dans l'onglet de configuration du carré d'intégration de Microsoft Teams, cliquez sur le bouton `Connect to Office 365` pour effectuer l'installation.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_4.png" alt="Microsoft Teams (étape 4)" >}}

5. Remplacez le nom de l'équipe `auto-generated` par le nom de votre choix.

    {{< img src="integrations/microsoft_teams/microsoft_team_step_5.png" alt="Microsoft Teams (étape 5)" >}}

Vous pouvez maintenant utiliser la [syntaxe `@-notification`][1] avec le nom de votre équipe Microsoft.

## Données collectées
### Métriques

L'intégration Microsoft Teams ne fournit aucune métrique.

### Événements

L'intégration Microsoft Teams ne fournit aucun événement.

### Checks de service
L'intégration Microsoft Teams ne fournit aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[2]: https://docs.datadoghq.com/fr/help