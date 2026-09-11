---
categories:
- collaboration
- log collection
- security
dependencies: []
description: Importez vos logs d'audit et de sécurité Google Workspace dans Datadog.
doc_link: https://docs.datadoghq.com/integrations/gsuite/
draft: false
git_integration_title: gsuite
has_logo: true
integration_id: ''
integration_title: Google Workspace
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: gsuite
public_title: Intégration Datadog/Google Workspace
short_description: Importez vos logs d'audit et de sécurité Google Workspace dans
  Datadog.
version: '1.0'
---

## Présentation

Cette intégration permet d'importer vos logs de sécurité Google Workspace dans Datadog. Une fois activée, Datadog commence automatiquement à recueillir les logs à partir des services Google Workspace suivants :

| Service             | Description                                                                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Access Transparency | Les rapports d'activité Access Transparency pour Google Workspace offrent des informations sur les différents types d'événements liés aux activités dans Access Transparency.                                                          |
| Admin               | Les rapports d'activité pour l'application Console d'administration offrent des informations sur les différents types d'événements liés aux activités des administrateurs.                                                        |
| Agenda            | Les rapports d'activité pour l'application Agenda Google offrent des informations sur les différents types d'événements liés aux activités dans Agenda.                                                                             |
| Drive               | Les rapports d'activité pour l'application Google Drive offrent des informations sur les différents types d'événements liés aux activités dans Google Drive. Ces rapports sont uniquement disponibles pour les clients Google Workspace Business. |
| Gplus               | Les rapports d'activité pour l'application Google+ offrent des informations sur les différents événements liés aux activités dans Google+.                                                                                       |
| Groups              | Les rapports d'activité pour l'application Google Groups offrent des informations sur les différents événements liés aux activités dans Google Groups.                                                                                  |
| Groupes Enterprise   | Les rapports d'activité pour les groupes Enterprise offrent des informations sur les différents événements liés aux activités des groupes Enterprise.                                                                      |
| Connexion               | Les rapports d'activité de connexion offrent des informations sur les différents types d'événements liés aux activités de connexion.                                                                |
| Mobile              | Les rapports d'activité pour l'audit des appareils mobiles offrent des informations sur les différents types d'événements liés aux activités d'audit des appareils mobiles.                                                                         |
| Règles               | Les rapports d'activité pour les règles offrent des informations sur les différents types d'événements liés aux règles.                                                                                       |
| Token               | Les rapports d'activité sur les tokens offrent des informations sur les différents types d'événements liés aux activités des tokens.                                                                |
| Comptes utilisateur    | Les rapports d'activité sur les comptes utilisateur offrent des informations sur les différents types d'événements liés aux activités des comptes utilisateur.                                                 |

## Implémentation
### Installation

Suivez les instructions de la section [API Reports : prérequis][1] du SDK Admin Google Workspace (en anglais) avant de configurer l'intégration Datadog/Google Workspace.

**Remarque** : certaines habilitations OAuth peuvent être requises pour la configuration. Consultez la section [Autoriser les requêtes][2] du SDK Admin Google Workspace (en anglais).

Pour configurer l'intégration Datadog/Google Workspace, cliquez sur le bouton *Connect a new Google Workspace domain* dans votre [carré d'intégration Datadog/Google Workspace][3] et autorisez Datadog à accéder à l'API Admin Google Workspace. 

## Données collectées
### Logs

Consultez la [documentation sur le SDK Admin Google Workspace][4] (en anglais) pour obtenir la liste complète des logs recueillis ainsi que leur contenu.

**Remarque** : les logs de sécurité Google Workspace sont indexés toutes les 90 minutes, car Google s'impose une limite de fréquence pour la récupération de ces logs. Les logs de cette intégration sont transmis toutes les 90 à 120 minutes.

### Métriques

L'intégration Google Workspace n'inclut aucune métrique.

### Événements

L'intégration Google Workspace n'inclut aucun événement.

### Checks de service

L'intégration Google Workspace n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites
[2]: https://developers.google.com/admin-sdk/reports/v1/guides/authorizing#OAuth2Authorizing
[3]: https://app.datadoghq.com/account/settings#integrations/gsuite
[4]: https://developers.google.com/admin-sdk/reports/v1/reference/activities/list
[5]: https://docs.datadoghq.com/fr/help/