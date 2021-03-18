---
categories:
  - network
  - log collection
  - security
ddtype: crawler
dependencies: []
description: L'intégration Meraki permet de recueillir des logs d'événement réseau.
doc_link: 'https://docs.datadoghq.com/integrations/meraki/'
draft: false
git_integration_title: meraki
has_logo: true
integration_title: Meraki
is_public: true
kind: integration
manifest_version: '1.0'
name: meraki
public_title: Intégration Datadog/Meraki
short_description: Recueillez des logs d'événement de Meraki.
version: '1.0'
---
## Présentation

Connectez-vous à Meraki pour intégrer vos logs d'événement réseau Meraki au système de gestion de logs Datadog.

## Implémentation

### Installation

1. Ouvrez le carré d'intégration Meraki.
2. Nommez votre compte Meraki.
3. Ajoutez une clé d'API Meraki. Pour découvrir comment générer une clé d'API Meraki, consultez la [documentation dédiée][1] (en anglais).

### Collecte de logs

Pour configurer la collecte de logs d'événements réseau, vous devez utiliser une clé d'API Meraki.

#### Générer la clé d'API Meraki

1. Accédez au dashboard Meraki.
2. Activez l'accès à l'API en accédant à Organization > Settings > Dashboard API access.
3. Accédez à la page My Profile sur le dashboard Meraki afin de générer la clé.

Pour en savoir plus, consultez la [documentation Meraki][2] (en anglais).

## Données collectées

### Métriques

Configurez l'[intégration SNMP][3] avec le [profil Meraki][4] pour recueillir des métriques à partir de vos appareils Meraki.

### Événements

L'intégration Meraki n'inclut aucun événement.

### Checks de service

L'intégration Meraki n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://documentation.meraki.com/zGeneral_Administration/Other_Topics/The_Cisco_Meraki_Dashboard_API
[2]: https://documentation.meraki.com/General_Administration/Other_Topics/Cisco_Meraki_Dashboard_API#Enable_API_access
[3]: https://docs.datadoghq.com/fr/integrations/snmp/
[4]: https://docs.datadoghq.com/fr/integrations/snmp/#cisco-meraki-profile
[5]: https://docs.datadoghq.com/fr/help/