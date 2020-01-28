---
"categories":
- log collection
- security
"ddtype": crawler
"dependencies": []
"description": Importez vos logs de sécurité et d'audit G Suite dans Datadog.
"doc_link": "https://docs.datadoghq.com/integrations/gsuite/"
"git_integration_title": gsuite
"has_logo": !!bool "true"
"integration_title": G Suite
"is_public": !!bool "true"
"kind": integration
"manifest_version": 1.0
"name": gsuite
"public_title": Intégration Datadog/G Suite
"short_description": Importez vos logs de sécurité et d'audit G Suite dans Datadog.
"version": 1.0
---

## Présentation

Cette intégration permet d'importer vos logs de sécurité G Suite dans Datadog. Une fois activée, Datadog commence automatiquement à recueillir les logs à partir des services G Suite suivants :

| Service G Suite     | Description                                                                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Access Transparency | Les rapports d'activité pour G Suite Access Transparency offrent des informations sur les différents types d'événements liés aux activités dans Access Transparency.                                                          |
| Admin               | Les rapports d'activité pour l'application Console d'administration offrent des informations sur les différents types d'événements liés aux activités des administrateurs.                                                        |
| Calendar            | Les rapports d'activité pour l'application G Suite Agenda offrent des informations sur les différents types d'événements liés aux activités dans Agenda.                                                                             |
| Drive               | Les rapports d'activité pour l'application Google Drive offrent des informations sur les différents types d'événements liés aux activités dans Google Drive. Ces rapports sont uniquement disponibles pour les clients G Suite Business. |
| Gplus               | Les rapports d'activité pour l'application Google+ offrent des informations sur les différents événements liés aux activités dans Google+.                                                                                       |
| Group               | Les rapports d'activité pour l'application Google Groups offrent des informations sur les différents événements liés aux activités dans Google Groups.                                                                                  |
| Groups              | Enterprise : les rapports d'activité pour l'application Enterprise Groups offrent des informations sur les différents événements liés aux activités dans Enterprise Groups.                                                                      |
| Login               | Les rapports d'activité pour l'application G Suite Login offrent des informations sur les différents types d'événements liés aux activités de connexion.                                                                |
| Mobile              | Les rapports d'activité pour l'audit des appareils mobiles G Suite offrent des informations sur les différents types d'événements liés aux activités des appareils mobiles.                                                                         |
| Rules               | Les rapports d'activité pour les règles G Suite offrent des informations sur les différents types d'événements liés aux règles.                                                                                       |
| Token               | Les rapports d'activité pour l'application G Suite Token offrent des informations sur les différents types d'événements liés aux tokens.                                                                |
| Comptes utilisateur       | Les rapports d'activité pour l'application G Suite User Accounts offrent des informations sur les différents types d'événements liés aux comptes utilisateur.                                                 |

## Implémentation
### Installation

Pour configurer l'intégration Datadog/G Suite, cliquez sur le bouton *Connect a new G Suite domain* dans votre [carré d'intégration Datadog/G Suite](https://app.datadoghq.com/account/settings#integrations/gsuite) et autorisez Datadog à accéder à l'API d'administration G Suite.

## Données collectées
### Logs

Consultez la [documentation sur le SDK G Suite Admin](https://developers.google.com/admin-sdk/reports/v1/reference/activities/list) pour obtenir la liste complète des logs recueillis ainsi que leur contenu.

### Métriques

L'intégration G Suite n'inclut aucune métrique.

### Événements

L'intégration G Suite n'inclut aucun événement.

### Checks de service

L'intégration G Suite n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).

