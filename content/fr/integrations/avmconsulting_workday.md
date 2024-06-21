---
app_id: avmconsulting-workday
app_uuid: 72aa287e-21c7-473a-9efd-523d9687f7f1
assets:
  dashboards:
    AVM Consulting Workday Integrations Trends: assets/dashboards/workday_integrations_trends.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: avmconsulting.workday.total_jobs
      metadata_path: metadata.csv
      prefix: avmconsulting.workday.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Workday d'AVM Consulting
  monitors:
    AVM Consulting Workday Connection Status: assets/monitors/workday_connect.json
    AVM Consulting Workday Integration Status: assets/monitors/workday_integrations_monitor.json
author:
  homepage: https://avmconsulting.net/
  name: AVMConsulting
  sales_email: integrations@avmconsulting.net
  support_email: integrations@avmconsulting.net
  vendor_id: avmconsulting
categories:
- marketplace
- log collection
- monitoring
classifier_tags:
- Supported OS::Linux
- Supported OS::Mac OS
- Supported OS::Windows
- Category::Marketplace
- Category::Log Collection
- Category::Monitoring
- Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avmconsulting_workday
integration_id: avmconsulting-workday
integration_title: Workday
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avmconsulting_workday
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avmconsulting.workday
  product_id: workday
  short_description: Tarif Workday par tâche
  tag: job_id
  unit_label: Tâche Workday
  unit_price: 1
public_title: Intégration Workday
short_description: Permet de gagner en visibilité sur le statut des intégrations Workday
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Permet de gagner en visibilité sur le statut des intégrations Workday
  media:
  - caption: Synthèse des intégrations Workday
    image_url: images/Workday_integration_trends.png
    media_type: image
  - caption: Synthèse des intégrations Workday
    image_url: images/Workday_integration_trends_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Intégration Workday
---



## Présentation

L'intégration Datadog/Workday surveille l'état de vos intégrations Workday. Elle fournit des métriques détaillées sur les exécutions de tâches, notamment le nombre total de tâches exécutées, les tâches ayant échoué et la durée de chaque tâche. Cette intégration récupère également les logs relatifs aux exécutions de tâches et propose des monitors qui génèrent des notifications à propos de l'état de chaque intégration.

### Monitors

Cette intégration inclut les monitors suivants, dont l'utilisation est recommandée :

1. Connect to Workday : monitor surveillant votre connexion à Workday
2. Workday Integration Statuts : monitor multiple regroupé par intégration qui vérifie le dernier état d'événement des intégrations Workday

### Dashboards

Cette intégration comprend un dashboard prêt à l'emploi intitulé **Workday Integrations Trends**. Ce dernier fournit une synthèse visuelle des exécutions de tâches Workday, et vous permet de visualiser l'état des monitors configurés pour chaque intégration Workday.

### Collecte de logs

Cette intégration tire profit de l'API Workday pour recueillir des logs relatifs aux exécutions d'intégrations. Elle envoie ces logs à Datadog via l'API REST Datadog. Des tags liés aux exécutions sont attribués de façon dynamique aux logs.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez AVM Consulting aux coordonnées suivantes :

 - E-mail : integrations@avmconsulting.net 
 - Téléphone : 855 286-0555

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/developers/guide/custom-python-package/?tab=linux