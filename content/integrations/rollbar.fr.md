---
categories:
- notification
- issue tracking
- exceptions
ddtype: crawler
description: Envoyer des exceptions, erreurs et déploiements de code dans votre flux d'événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/rollbar/
git_integration_title: rollbar
has_logo: true
integration_title: Rollbar
is_public: true
kind: integration
manifest_version: '1.0'
name: rollbar
public_title: Intégration Datadog-Rollbar
short_description: Envoyer les exceptions, erreurs et déploiements de code dans votre flux d'événements Datadog.
  stream.
version: '1.0'
---

{{< img src="integrations/rollbar/rollbar_error.png" alt="Rollbar error event" responsive="true" >}}

## Aperçu

Rollbar aide les développeurs à construire de meilleurs logiciels, plus rapidement. Avec Rollbar, les développeurs peuvent voir les exceptions de tous leurs frameworks, plates-formes et environnements en un seul endroit.

Connecter Rollbar à Datadog pour:

* Etre averti des exceptions, erreurs et déploiements de code dans votre flux d'événements Datadog.
* Filtrer des notifications par sévérité, environnement, host, user et bien plus.
* Rechercher des exceptions sur vos graphiques.
* Discuter des exceptions avec votre équipe.
* Passer moins de temps à debugger des problèmes.

## Implémentation
### Installation

Aucune installation n'est requise.

### Configuration

La configuration et par projet dans Rollbar

* Dans Rollbar, Allez sur la page Notification settings pour un projet: **Dashboard** → **Settings** → **Notifications** → **Datadog**

* Dans Datadog, [allez sur la page d'API](https://app.datadoghq.com/account/settings#api) afin d'obtenir votre clé d'API.

* Ajoutez votre clé d'API Datadog dans Rollbar

* Cliquez sur [Enable Datadog Integration](https://app.datadoghq.com/account/settings#integrations/rollbar)

A chaque fois qu'une nouvelle exception survient, elle apparaitra dans votre flux d'événements.

## Données collectées
### Métriques

L'intégration Redmine n'inclut aucune métrique pour le moment.

### Evénements

L'intégration Redmine va envoyer comme des événements dans Datadog, les exceptions, erreurs et déploiements de code. 

### Checks de Service
L'intégration Redmine n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
