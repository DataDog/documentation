---
categories:
  - exceptions
ddtype: crawler
dependencies: []
description: 'Affichez, recherchez et échangez sur des exceptions Honeybadger dans votre flux d''événements.'
doc_link: 'https://docs.datadoghq.com/integrations/honeybadger/'
draft: false
git_integration_title: honeybadger
has_logo: true
integration_title: Honeybadger
is_public: true
kind: integration
manifest_version: '1.0'
name: honeybadger
public_title: Intégration Datadog/Honeybadger
short_description: 'Affichez, recherchez et échangez sur des exceptions Honeybadger dans votre flux d''événements.'
version: '1.0'
---
{{< img src="integrations/honeybadger/honeybadgerevent.png" alt="Événement Honeybadger" popup="true">}}

## Présentation

Associez Honeybadger à Datadog pour :

- Consulter les erreurs dans le flux d'événements en temps réel
- Chercher des erreurs sur vos graphiques
- Discuter des erreurs avec votre équipe
- Faire un excellent travail

## Configuration

### Installation

Pour enregistrer des erreurs depuis Honeybadger :

1. Ouvrez votre [liste de projets][1] Honeybadger.
2. Cliquez sur Settings pour le projet à surveiller.
3. Cliquez sur « Alerts & Integrations ».
4. Sélectionnez Datadog comme nouvelle intégration.
5. Ajoutez votre [clé d'API][2].
6. Enregistrez l'intégration.
7. Cliquez sur le bouton **Install Integration** sur le [carré d'intégration Honeybadger][3].

## Données collectées

### Métriques

L'intégration Honeybadger n'inclut aucune métrique.

### Événements

L'intégration Honeybadger n'inclut aucun événement.

### Checks de service

L'intégration Honeybadger n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.honeybadger.io/users/sign_in
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://app.datadoghq.com/account/settings#integrations/honeybadger
[4]: https://docs.datadoghq.com/fr/help/