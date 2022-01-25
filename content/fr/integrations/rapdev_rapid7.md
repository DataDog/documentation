---
app_id: rapdev-rapid7
app_uuid: 388017a0-e4cc-45ad-b038-c2141abf20c1
assets:
  dashboards:
    RapDev rapid7 Overview: assets/dashboards/rapdev_rapid7_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.rapid7.logs.processed
      metadata_path: metadata.csv
      prefix: rapdev.rapid7.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: "RapDev\_Rapid7"
  logs:
    source: rapid7
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
  - log collection
  - marketplace
  - cloud
  - monitoring
classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Log Collection
  - Category::Marketplace
  - Category::Cloud
  - Category::Monitoring
  - Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_rapid7
integration_id: rapdev-rapid7
integration_title: "RapDev\_Rapid7"
integration_version: ''
is_public: true
kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_rapid7
oauth: {}
pricing:
  - billing_type: flat_fee
    includes_assets: true
    product_id: rapid7
    short_description: Coût unique pour cette intégration
    unit_price: 500
public_title: "RapDev\_Rapid7"
short_description: Surveiller vos logs Rapid7 et l'activité des endpoints
supported_os:
  - linux
  - mac os
  - windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Surveiller vos logs Rapid7 et l'activité des endpoints
  media:
    - caption: Statuts globaux
      image_url: images/rapdev_rapid7_dashboard_.png
      media_type: image
    - caption: Synthèse de l'Agent
      image_url: images/agent_sum.png
      media_type: image
    - caption: Synthèse des processus d'endpoint
      image_url: images/endpoint_process.png
      media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: "RapDev\_Rapid7"
---
## Présentation
Cette intégration utilise l'API Rapid7 REST pour interroger les flux de logs IDR. Elle renvoie tous les logs qui ne sont pas considérés comme des logs de la plateforme Rapid7. Ces logs sont transmis à Datadog et génèrent des coûts supplémentaires en fonction de leur volume. Ils sont généralement composés de synthèses de l'Agent sur les endpoints Rapid7 et de statuts sur leurs processus.

### Métriques
Le nombre de logs traités par check est transmis sous la forme d'une métrique.

### Collecte de logs
Cette intégration appelle l'API de logs Rapid7 afin d'interroger tous les logs disponibles lors du dernier intervalle utilisé. Par défaut, l'intervalle est défini sur une minute. Vous pouvez définir des [ensembles de logs][5] précis afin de ne recueillir que ces logs. Pour en savoir plus, consultez la [documentation sur la recherche de logs][6] de Rapid7 insightIDR (en anglais), 

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez RapDev.io aux coordonnées suivantes :

- Asssistance : datadog-engineering@rapdev.io
- Service commercial : sales@rapdev.io
- Chat : [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Téléphone : 855-857-0222

---
Développé avec ❤️ à Boston

*Ce n'est pas l'intégration que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? [Écrivez à RapDev](mailto:datadog-engineering@rapdev.io) et nous l'ajouterons !*

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici][4] pour l'acheter.

[1]: https://insight.rapid7.com/platform#/apiKeyManagement/organization
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/marketplace/app/rapdev-rapid7/pricing
[5]: https://us.idr.insight.rapid7.com/op/D8A1412BEA86A11F15E5#/search
[6]: https://docs.rapid7.com/insightidr/log-search/