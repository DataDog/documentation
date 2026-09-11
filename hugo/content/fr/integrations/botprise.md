---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/botprise/README.md
display_name: botprise
draft: false
git_integration_title: botprise
guid: bbc51521-f87c-44c1-ba57-9c4e5dc23214
integration_id: botprise
integration_title: Botprise
integration_version: ''
is_public: true
custom_kind: integration
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

L'intégration Datadog/Botprise vous permet d'envoyer des événements générés par [Botprise][1] à Datadog via un Webhook. Cela vous permet de surveiller vos applications et de vous assurer que Botprise fonctionne correctement.

![image-datadog-événements-botprise][2]

## Configuration

Pour utiliser l'intégration Datadog/Botprise, vous devez être un client de Botprise. Pour en savoir plus sur Botprise, consultez le site [https://www.botprise.com/][1].

### Installation


### Configuration
1. Installez l'Agent Datadog sur vos appareils.
2. Une fois l'installation terminée, vos appareils commencent à envoyer des données à Datadog. Consultez ces données depuis la [liste des hosts Datadog][3].
3. Dans Datadog, créez un monitor pour chacun des hosts. Datadog génère des alertes basées sur les règles du monitor.
4. Configurez les [métriques][4] et la valeur seuil correspondante pour chaque monitor.
5. Modifiez la configuration des monitors de façon à créer un ticket [ServiceNow][5] pour chaque alerte entrante.
6. Générez une [clé d'API et une clé d'application][6] pour appeler les API Rest Datadog.


## Données collectées

### Métriques

L'intégration Botprise n'inclut aucune métrique.

### Checks de service

L'intégration Botprise n'inclut aucun check de service.

### Événements

Tous les événements sont transmis au flux d'événements Datadog.

### Configuration
Pour utiliser l'API Datadog, vous devez saisir une [clé d'API et une clé d'application][6].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://www.botprise.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/botprise/images/datadog-botprise-events.png
[3]: https://app.datadoghq.com/infrastructure/map
[4]: https://docs.datadoghq.com/fr/metrics/
[5]: https://developer.servicenow.com/dev.do#!/home
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/fr/help/