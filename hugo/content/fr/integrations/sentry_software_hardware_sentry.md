---
app_id: hardware-sentry
app_uuid: daade024-2095-4a73-afe5-35afbe9e2b12
assets:
  dashboards:
    Hardware Sentry - Host: assets/dashboards/host.json
    Hardware Sentry - Main: assets/dashboards/main.json
    Hardware Sentry - Site: assets/dashboards/site.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: hardware_sentry.agent.info
      metadata_path: metadata.csv
      prefix: hardware_sentry.
    service_checks:
      metadata_path: service_checks.json
    source_type_name: Hardware Sentry
  logs: {}
  monitors:
    Hardware Sentry - Agent-NoData: assets/monitors/agent-nodata.json
    Hardware Sentry - Connector Failed: assets/monitors/connector-failed.json
    Hardware Sentry - Critical Fan Speed: assets/monitors/critical-fan-speed.json
    Hardware Sentry - Critical Temperature: assets/monitors/critical-temperature.json
    Hardware Sentry - Errors: assets/monitors/errors.json
    Hardware Sentry - High Temperature: assets/monitors/high-temperature.json
    Hardware Sentry - High Voltage: assets/monitors/high-voltage.json
    Hardware Sentry - Intrusion: assets/monitors/intrusion.json
    Hardware Sentry - Link Down: assets/monitors/network-link-down.json
    Hardware Sentry - Low Battery: assets/monitors/low-battery.json
    Hardware Sentry - Low Fan Speed: assets/monitors/low-fan-speed.json
    Hardware Sentry - Low Fan Speed %: assets/monitors/low-fan-speed-percent.json
    Hardware Sentry - Low Voltage: assets/monitors/low-voltage.json
    Hardware Sentry - Lun Multipathing: assets/monitors/lun-multipathing.json
    Hardware Sentry - Missing Device: assets/monitors/missing-device.json
    Hardware Sentry - Network Errors: assets/monitors/errors-network.json
    Hardware Sentry - Power Capacity: assets/monitors/power-capacity.json
    Hardware Sentry - Predicted Failure: assets/monitors/predicted-failure.json
    Hardware Sentry - Status Degraded: assets/monitors/status-degraded.json
    Hardware Sentry - Status Failed: assets/monitors/status-failed.json
    Hardware Sentry - Tape Drive Cleaning: assets/monitors/tape-drive-cleaning.json
author:
  homepage: https://sentrysoftware.com
  name: Sentry Software
  sales_email: datadog@sentrysoftware.com
  support_email: support@sentrysoftware.com
  vendor_id: sentry-software
categories:
- gestion des coûts
- marketplace
- network
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: sentry_software_hardware_sentry
integration_id: hardware-sentry
integration_title: Hardware Sentry
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: sentry_software_hardware_sentry
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: hardware_sentry.host.configured
  product_id: hardware-sentry
  short_description: Le prix de l'abonnement mensuel est basé sur le nombre de hosts
    surveillés avec le Collector OpenTelemetry Hardware Sentry. L'abonnement donne
    accès aux services d'assistance fournis par Sentry Desk.
  tag: host
  unit_label: host surveillé
  unit_price: 8
public_title: Hardware Sentry
short_description: Surveillez vos serveurs, réseaux, systèmes de stockage et leurs
  émissions de carbone
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cost Management
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Surveillez vos serveurs, réseaux, systèmes de stockage et leurs émissions
    de carbone
  media:
  - caption: Le dashboard principal de Hardware Sentry offre une vue d'ensemble de
      la consommation d'énergie et des émissions de carbone de l'ensemble de vos centres
      de données et salles de serveurs. Il s'appuie sur les métriques recueillies
      par le Collector OpenTelemetry Hardware Sentry.
    image_url: images/dashboard-main.png
    media_type: image
  - caption: 'Diagramme de l''architecture : le Collector OpenTelemetry Hardware Sentry
      s''exécute sur site, surveille vos serveurs, switchs et systèmes de stockage,
      et transmet les métriques à votre environnement Datadog.'
    image_url: images/architecture.png
    media_type: image
  - caption: Pour chaque host surveillé, Hardware Sentry surveille ses composants
      électroniques (processeurs, mémoire, disques, cartes réseau, capteurs, etc.),
      sa consommation électrique et ses émissions de carbone.
    image_url: images/dashboard-host.png
    media_type: image
  - caption: Pour chaque site (centre de données ou salle de serveurs), la consommation
      électrique et les émissions de carbone sont estimées sur un jour, un mois et
      un an. La température optimale recommandée est basée sur une prévision des économies
      d'énergie sur une année.
    image_url: images/dashboard-site.png
    media_type: image
  - caption: Tous les problèmes matériels (disques, modules de mémoire, cartes réseau,
      alimentations, etc.) sont surveillés à l'aide de monitors spécifiques, fournissant
      des messages détaillés.
    image_url: images/events-explorer.png
    media_type: image
  - caption: L'intégration Hardware Sentry intègre différents monitors recommandés
      afin de signaler les problèmes matériels dans votre infrastructure.
    image_url: images/triggered-monitors.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Hardware Sentry
  uninstallation: README.md#Uninstallation
---



## Présentation

**[Hardware Sentry][1]** est un agent spécialisé dans la surveillance des composants matériels de n'importe quel serveur, switch réseau ou système de stockage dans votre centre de données. Il intègre une collection de dashboards et de monitors pour Datadog.

### Surveillance de matériel

**Hardware Sentry** est un agent de surveillance capable de signaler les problèmes relatifs à l'intégrité physique des serveurs, switchs réseau et systèmes de stockage. Il recueille des métriques à intervalles réguliers afin de signaler l'état de chaque processeur, contrôleur, disque ou alimentation, ainsi que les températures, la vitesse des ventilateurs, l'état du lien et le débit des cartes réseau, etc.

* **À distance** : un seul agent permet de surveiller des centaines de systèmes via SNMP, WBEM, WMI, SSH, IPMI, API REST, etc.
* **Multi-platforme** : plus de 100 plateformes déjà prises en charge avec plus de 250 connecteurs (Cisco, Dell EMC, HP, Huawei, IBM, Lenovo, NetApp, Oracle, Pure, etc. Pour obtenir la liste complète des plateformes prises en charge, consultez la [documentation sur Hardware Sentry][2].
* **Simple** : la surveillance d'un système requiert un effort de configuration minime consistant à indiquer le hostname ou l'adresse IP et les identifiants. **Hardware Sentry** détectera automatiquement l'instrumentation disponible et commencera immédiatement la surveillance.
* **Normalisé** : toutes les informations nécessaires sont signalées par le biais de métriques standardisées dans Datadog. Par exemple, la même métrique `hw.temperature` est utilisée pour représenter la température dans un filer NetApp, un BladeSystem HP, un PowerEdge Dell sous Windows, un UCS Cisco sous Linux ou dans n'importe quelle autre plateforme. Ces métriques respectent les [conventions sémantiques d'OpenTelemetry][3].

**Hardware Sentry** intègre des monitors prédéfinis afin de détecter et même prévoir les défaillances des processeurs, des modules de mémoire, des disques, des cartes réseau, des contrôleurs, des alimentations, des ventilateurs, des sondes de température, etc.

### Rapports de consommation d'énergie et d'empreinte carbone

En plus de surveiller la santé physique, **Hardware Sentry** signale la consommation d'énergie de chaque système qu'il surveille. Aux métriques représentant le coût en électricité et la densité de carbone s'ajoutent les dashboards fournis indiquant la consommation d'électricité de votre infrastructure en kWh et son empreinte carbone en tonnes de CO2.

**100 % logiciel** : aucun PDU intelligent n'est requis, même pour les systèmes qui ne sont pas pourvus d'un capteur d'alimentation interne !

### Dashboards

Cette intégration est accompagnée d'un ensemble de dashboards qui tirent parti des métriques recueillies par le **[Collector OpenTelemetry Hardware Sentry][4]** :

| Dashboard | Description |
|---|---|
| Hardware Sentry - Vue principale | Vue d'ensemble de tous les hosts surveillés, axée sur la durabilité |
| Hardware Sentry - Site | Métriques associées à un *site* (un centre de données ou une salle de serveurs) et ses *hosts* surveillés |
| Hardware Sentry - Host | Métriques associées à un *host* et ses périphériques internes |

## Assistance

Abonnez-vous à **Hardware Sentry** via le Marketplace Datadog pour accéder à l'ensemble des services fournis par [Sentry Desk][12] :

* Assistance technique via [Jira Service Management][13]
* Base de connaissances
* Patchs

Lors de la souscription, votre organisation recevra une invitation à gérer votre compte *Sentry Desk*.

### Pour aller plus loin :

Documentation, liens et articles supplémentaires utiles :

- [Suivez votre empreinte carbone avec la solution Hardware Sentry sur le Marketplace Datadog][14]

[1]: https://www.sentrysoftware.com/products/hardware-sentry.html
[2]: https://www.sentrysoftware.com/docs/hws-doc/latest/platform-requirements.html
[3]: https://opentelemetry.io/docs/reference/specification/metrics/semantic_conventions/hardware-metrics/
[4]: https://www.sentrysoftware.com/products/hardware-sentry-opentelemetry-collector.html
[5]: https://www.sentrysoftware.com/docs/hws-doc/latest/integration/datadog.html
[6]: https://www.sentrysoftware.com/downloads/products-for-opentelemetry.html
[7]: https://www.sentrysoftware.com/products/hardware-sentry.html
[8]: https://www.sentrysoftware.com/docs/hws-doc/latest/install.html
[9]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[10]: https://www.sentrysoftware.com/docs/hws-doc/latest/configuration/configure-agent.html
[11]: https://www.sentrysoftware.com/docs/hws-otel-collector/latest/install.html
[12]: https://www.sentrysoftware.com/desk
[13]: https://sentrydesk.atlassian.net/servicedesk/customer/portals
[14]: https://www.datadoghq.com/blog/sustainability-monitoring-carbon-footprint-hardware-sentry-datadog/
---
Cette application est mise à disposition via le Marketplace et est prise en charge par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/hardware-sentry" target="_blank">Cliquez ici</a> pour l'acheter.