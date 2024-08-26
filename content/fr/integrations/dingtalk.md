---
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog au groupe DingTalk de votre équipe.
doc_link: https://docs.datadoghq.com/integrations/dingtalk/
draft: false
git_integration_title: dingtalk
has_logo: true
integration_id: dingtalk
integration_title: DingTalk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: dingtalk
public_title: Intégration Datadog/DingTalk
short_description: Envoyez des alertes et des graphiques Datadog au groupe DingTalk de votre équipe.
version: '1.0'
---
## Présentation

Intégrez DingTalk à Datadog pour :

-   Être informé des événements et des alertes Datadog dans DingTalk
-   Partager des messages et des graphiques avec votre groupe DingTalk

## Installation

L'intégration DingTalk s'installe à l'aide du [carré d'intégration Datadog/DingTalk][1].

## Configuration

Pour intégrer Datadog à votre groupe DingTalk :

1. Dans l'application DingTalk, accédez à _Messages_. Cliquez ensuite sur le groupe auquel vous souhaitez ajouter une intégration Datadog.
2. Dans le coin supérieur droit, cliquez sur l'icône _Group Settings_ (qui ressemble à une ellipse) et sélectionnez _Group Robot_.
3. Dans le menu Group Robot, sélectionnez Datadog et cliquez sur `Add`.
4. Saisissez un nom pour le robot et cliquez sur `Finished`. Vous obtenez alors une adresse de webhook.
5. Copiez l'adresse de webhook et cliquez sur `Finished`.
6. Dans le [carré d'intégration][1] DingTalk, indiquez le groupe DingTalk auquel vous avez ajouté l'intégration Datadog dans le champ _Group Name_ et copiez l'adresse de webhook dans le champ _Group Robot Webhook_. Les noms de groupe peuvent contenir des lettres, des chiffres et des underscores.
7. Cliquez sur _Install Configuration_ (ou sur _Update Configuration_).

Après avoir installé et mis à jour l'intégration, vous pouvez utiliser la fonction [`@-notification`][2] avec le nom de votre groupe DingTalk.

## Données collectées

### Métriques

L'intégration DingTalk ne fournit aucune métrique.

### Événements

L'intégration DingTalk n'inclut aucun événement.

### Checks de service

L'intégration DingTalk n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/dingtalk
[2]: https://docs.datadoghq.com/fr/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/fr/help/