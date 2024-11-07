---
categories:
- event management
- security
dependencies: []
description: JumpCloud
doc_link: https://docs.datadoghq.com/integrations/jumpcloud/
draft: false
git_integration_title: jumpcloud
has_logo: true
integration_id: ''
integration_title: JumpCloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: jumpcloud
public_title: JumpCloud
short_description: Recueille des logs à partir de JumpCloud.
team: web-integrations
version: '1.0'
---

## Présentation

L'intégration JumpCloud vous permet de consulter les événements suivants :

- Événements sur les répertoires : logs à propos des activités dans le portail, notamment en ce qui concerne les modifications des répertoires
  effectuées par des administrateurs et les authentifications des administrateurs/utilisateurs sur le portail.

- Événements SAML : logs à propos des authentifications des utilisateurs sur des applications SAML.

- Événements RADIUS : logs à propos des authentifications des utilisateurs sur le service RADIUS utilisé pour les connexions Wi-Fi et VPN.

- Événements macOS, Windows et Linux : logs à propos des authentifications des utilisateurs sur les systèmes,
  y compris les événements liés à un Agent lors du verrouillage, les modifications de mot de passe et les modifications
  de clé de chiffrement du disque de fichiers.

- Événements LDAP : logs à propos des authentifications des utilisateurs sur LDAP, y compris les événements liés aux liaisons LDAP
  et aux recherches.

- Événements MDM : logs à propos des résultats des commandes MDM.

Pour en savoir plus, consultez la [référence relative à l'API Insights][1].

## Implémentation

### Installation

Aucune installation n'est requise.

### Configuration

Consultez le carré de l'intégration pour obtenir des instructions détaillées. Une clé d'API provenant du portail d'administration de JumpCloud est requise.

## Données collectées

### Logs

Les logs sont recueillis à partir d'un seul endpoint d'API. Consultez la documentation relative à l'[API Insight][1] (en anglais).

### Métriques

L'intégration JumpCloud n'inclut aucune métrique.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][2].

[1]: https://docs.jumpcloud.com/api/insights/directory/1.0/index.html
[2]: https://docs.datadoghq.com/fr/help/