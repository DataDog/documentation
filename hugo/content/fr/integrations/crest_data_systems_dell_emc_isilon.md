---
app_id: crest-data-systems-dell-emc-isilon
app_uuid: 1c1b7c48-0c7c-46f2-9f0c-f68c74419244
assets:
  dashboards:
    Crest Dell EMC Isilon - Cluster Information: assets/dashboards/dell_emc_isilon_cluster_information.json
    Crest Dell EMC Isilon - File System: assets/dashboards/dell_emc_isilon_file_system.json
    Crest Dell EMC Isilon - Monitors Summary: assets/dashboards/dell_emc_isilon_monitors_summary.json
    Crest Dell EMC Isilon - Node Details: assets/dashboards/dell_emc_isilon_node_details.json
    Crest Dell EMC Isilon - Protocol Details: assets/dashboards/dell_emc_isilon_protocol_details.json
    Crest Dell EMC Isilon - Quota Information: assets/dashboards/dell_emc_isilon_quota_information.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.emc.isilon.cluster_inventory.license_details
      metadata_path: metadata.csv
      prefix: cds.emc.isilon.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: crest_data_systems_dell_emc_isilon
  logs: {}
  monitors:
    '[crest_data_systems_dell_emc_isilon] CPU Usage for each Node of Cluster': assets/recommended_monitors/cds_cpu_usage_for_each_node_and_cluster.json
    '[crest_data_systems_dell_emc_isilon] Disk Usage for each Node of Cluster': assets/recommended_monitors/cds_disk_usage_for_each_node_and_cluster.json
    '[crest_data_systems_dell_emc_isilon] Memory Usage for each Node of Cluster': assets/recommended_monitors/cds_memory_usage_for_each_node_and_cluster.json
author:
  homepage: https://www.crestdatasys.com
  name: Crest Data Systems
  sales_email: sales@crestdatasys.com
  support_email: datadog.integrations@crestdatasys.com
  vendor_id: crest-data-systems
categories:
- marketplace
- data store
- monitoring
classifier_tags:
- Supported OS::Linux
- Supported OS::Mac OS
- Supported OS::Windows
- Category::Marketplace
- Category::Data Store
- Category::Monitoring
- Offering::Integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_dell_emc_isilon
integration_id: crest-data-systems-dell-emc-isilon
integration_title: Dell EMC Isilon
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_dell_emc_isilon
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.dell_emc_isilon
  product_id: dell-emc-isilon
  short_description: Le prix affiché est valable par cluster et par mois.
  tag: cds.emc.isilon.cluster
  unit_label: Cluster Dell EMC Isilon
  unit_price: 995.0
public_title: Dell EMC Isilon
short_description: Surveillez les performances et l'utilisation de vos clusters Dell EMC Isilon
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  configuration: README.md#Setup
  description: Surveillez les performances et l'utilisation de vos clusters Dell EMC Isilon
  media:
  - caption: Dell EMC Isilon - Cluster Information
    image_url: images/cds-dell-emc-isilon-cluster-information.png
    media_type: image
  - caption: Dell EMC Isilon - Node Details
    image_url: images/cds-dell-emc-isilon-node-details.png
    media_type: image
  - caption: Dell EMC Isilon - Protocol Details
    image_url: images/cds-dell-emc-isilon-protocol-details.png
    media_type: image
  - caption: Dell EMC Isilon - File System
    image_url: images/cds-dell-emc-isilon-file-system.png
    media_type: image
  - caption: Dell EMC Isilon - Quota Information
    image_url: images/cds-dell-emc-isilon-quota-information.png
    media_type: image
  - caption: Dell EMC Isilon - Monitors Summary
    image_url: images/cds-dell-emc-isilon-monitors-summary.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Dell EMC Isilon
---

## Présentation

Cette intégration permet de surveiller les performances et l'utilisation d'un cluster Dell EMC Isilon et de ses nœuds. Elle recueille des métriques clés et offre des informations sur l'état et le comportement du cluster Dell EMC Isilon. Vous pouvez utiliser des monitors avec cette intégration afin de générer des alertes sur la mémoire, la charge processeur et l'utilisation du disque de chaque nœud et cluster.

Nom du dashboard | Description
---------------|------------
Cluster Information | Ce dashboard offre des informations sur votre cluster.
Node Details | Ce dashboard offre des informations sur vos nœuds.
Protocol Details | Ce dashboard offre des informations sur les protocoles au sein d'un cluster.
File System | Ce dashboard offre des informations sur le système de fichiers au niveau d'un nœud.
Quota Information | Ce dashboard offre des informations sur vos quotas.
Monitors Summary | Ce dashboard offre une synthèse des monitors pris en charge par cette intégration.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez Crest Data Systems à l'aide des informations suivantes :

 - E-mail : datadog.integrations@crestdatasys.com
 - Site Web : [crestdatasys.com](https://www.crestdatasys.com/)

### Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller Dell EMC Isilon grâce à l'intégration de Crest Data Systems disponible sur le Marketplace Datadog][1]
- [Guide de configuration des monitors Dell EMC Isilon Monitors sur la plateforme Datadog][2]

[1]: https://www.datadoghq.com/blog/dell-emc-isilon-monitoring-crest-data-systems-datadog-marketplace/
[2]: https://www.crestdatasys.com/data_sheet/datadog-setup-monitor/