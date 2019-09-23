---
categories:
  - Collaboration
ddtype: crawler
dependencies: []
description: Envoyez des alertes et des graphiques Datadog au groupe DingTalk de votre équipe.
doc_link: 'https://docs.datadoghq.com/integrations/dingtalk/'
git_integration_title: dingtalk
has_logo: true
integration_title: DingTalk
is_public: true
kind: integration
manifest_version: 1
name: dingtalk
public_title: Intégration Datadog/DingTalk
short_description: Envoyez des alertes et des graphiques Datadog au groupe DingTalk de votre équipe.
version: 1
---
## Présentation

Intégrez DingTalk à Datadog pour :

* Être informé des événements et des alertes Datadog dans DingTalk
* Partager des messages et des graphiques avec votre groupe DingTalk

## Installation

Pour installer l'intégration DingTalk, accédez à son [carré d'intégration][3] dans l'application Datadog.

## Implémentation

Pour intégrer Datadog à votre groupe DingTalk :

1. Dans l'application DingTalk, accédez à *Messages*. Cliquez ensuite sur le groupe auquel vous souhaitez ajouter une intégration Datadog.
2. Dans le coin supérieur droit, cliquez sur l'icône *Group Settings* (qui ressemble à une ellipse) et sélectionnez *Group Robot*.
3. Dans le menu Group Robot, sélectionnez Datadog et cliquez sur `Add`.
4. Saisissez un nom pour le robot et cliquez sur `Finished`. Vous obtenez alors une adresse de webhook.
5. Copiez l'adresse de webhook et cliquez sur `Finished`.
6. Dans le [carré d'intégration][3] DingTalk, indiquez le groupe DingTalk auquel vous avez ajouté l'intégration Datadog dans le champ *Group Name* et copiez l'adresse de webhook dans le champ *Group Robot Webhook*. Les noms de groupe peuvent contenir des lettres, des chiffres et des underscores.
7. Cliquez sur *Install Configuration* (ou sur *Update Configuration*).

Après avoir installé et mis à jour l'intégration, vous pouvez utiliser la fonction [`@-notification`][1] avec le nom de votre groupe DingTalk.

## Données collectées
### Métriques

L'intégration DingTalk ne fournit aucune métrique.

### Événements

L'intégration DingTalk n'inclut aucun événement.

### Checks de service

L'intégration DingTalk n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://docs.datadoghq.com/fr/developers/faq/what-do-notifications-do-in-datadog
[2]: https://docs.datadoghq.com/fr/help
[3]: https://app.datadoghq.com/account/settings#integrations/dingtalk


{{< get-dependencies >}}