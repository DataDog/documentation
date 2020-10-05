---
assets:
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md'
display_name: botprise
git_integration_title: botprise
guid: bbc51521-f87c-44c1-ba57-9c4e5dc23214
integration_id: botprise
integration_title: Botprise
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: botprise.
metric_to_check: ''
name: botprise
public_title: Intégration Datadog/Botprise
short_description: Intégration Botprise pour surveiller les événements générés
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration Datadog/Botprise vous permet d'envoyer des événements [Botprise][1] au flux d'événements de Datadog. Les événements Datadog sont envoyés par e-mail dans le système.

## Configuration


### Installation


### Configuration
1. Installez l'Agent Datadog sur vos appareils de laboratoire.
2. Une fois l'installation terminée, vos appareils commencent à envoyer des données à Datadog. Consultez les données dans la [liste des hosts Datadog][2].
3. Dans Datadog, créez un monitor pour chacun des hosts. Datadog génère des alertes basées sur les règles de monitor.
4. Configurez les [métriques][3] et la valeur seuil correspondante pour chaque monitor.
5. Modifiez la configuration des monitors de façon à créer un ticket [ServiceNow][4] pour chaque alerte entrante.
6. Générez une [clé d'API et une clé d'application][5] pour appeler les API Rest Datadog.


## Données collectées

### Métriques

L'intégration Botprise n'inclut aucune métrique.

### Checks de service

L'intégration Botprise n'inclut aucun check de service.

### Événements

Tous les événements sont transmis au flux d'événements Datadog.

### Configuration
Pour utiliser l'API Datadog, vous devez saisir une [clé d'API et une clé d'application][5] :

Indiquez une clé d'API Datadog []:xxxx9232ad913d1a864828a2df15xxxx
Indiquez une clé d'application Datadog []:xxxxcb1798718f7a2da141071e7305599d60xxxx

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.botprise.com/
[2]: https://app.datadoghq.com/infrastructure/map
[3]: https://docs.datadoghq.com/fr/metrics/
[4]: https://dev83528.service-now.com/navpage.do
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[6]: https://docs.datadoghq.com/fr/help/