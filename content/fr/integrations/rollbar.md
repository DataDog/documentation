---
categories:
  - notification
  - issue tracking
  - exceptions
ddtype: crawler
dependencies: []
description: 'Envoyez les exceptions, erreurs et déploiements de code vers votre flux d''événements Datadog.'
doc_link: 'https://docs.datadoghq.com/integrations/rollbar/'
draft: false
git_integration_title: rollbar
has_logo: true
integration_title: Rollbar
is_public: true
kind: integration
manifest_version: '1.0'
name: rollbar
public_title: Intégration Datadog/Rollbar
short_description: 'Envoyez les exceptions, erreurs et déploiements de code vers votre flux d''événements Datadog.'
version: '1.0'
---
{{< img src="integrations/rollbar/rollbar_error.png" alt="Événement d'erreur Rollbar" popup="true">}}

## Présentation

Rollbar aide les développeurs à concevoir de meilleurs logiciels, plus rapidement. Avec Rollbar, les développeurs peuvent consulter les exceptions de l'ensemble de leurs frameworks, plates-formes et environnements depuis un endroit unique.

Connecter Rollbar à Datadog pour :

- Recevoir une notification pour les exceptions, erreurs et déploiements de code dans votre flux d'événements
- Filtrez des notifications par gravité, environnement, host, utilisateur, et bien plus encore.
- Rechercher des exceptions sur vos graphiques
- Discuter des exceptions avec votre équipe
- Passer moins de temps à déboguer des problèmes

## Configuration

### Installation

Aucune installation n'est requise.

### Configuration

La configuration s'effectue par projet dans Rollbar.

1. Dans Rollbar, accédez à la page Notification settings pour un projet : **Dashboard** → **Settings** → **Notifications** → **Datadog**.
2. Dans Datadog, [accédez à la page des API][1] pour obtenir votre clé d'API (copiez-la dans votre presse-papiers) : **Integrations** → **APIs**.
3. Ajoutez votre clé d'API Datadog dans Rollbar.
4. Cliquez sur [Enable Datadog Integration][2].

Votre configuration est terminée. Lorsqu'une exception se produit, elle apparaît désormais dans votre flux d'événements.

## Données collectées

### Métriques

L'intégration Rollbar n'inclut aucune métrique.

### Événements

L'intégration Rollbar envoie des exceptions, erreurs et déploiements de code à Datadog sous la forme d'événements.

### Checks de service

L'intégration Rollbar n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://app.datadoghq.com/account/settings#integrations/rollbar
[3]: https://docs.datadoghq.com/fr/help/