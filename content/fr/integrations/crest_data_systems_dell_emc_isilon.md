---
"app_id": "crest-data-systems-dell-emc-isilon"
"app_uuid": "1c1b7c48-0c7c-46f2-9f0c-f68c74419244"
"assets":
  "dashboards":
    "Crest Dell EMC Isilon - Cluster Information": assets/dashboards/dell_emc_isilon_cluster_information.json
    "Crest Dell EMC Isilon - File System": assets/dashboards/dell_emc_isilon_file_system.json
    "Crest Dell EMC Isilon - Node Details": assets/dashboards/dell_emc_isilon_node_details.json
    "Crest Dell EMC Isilon - Protocol Details": assets/dashboards/dell_emc_isilon_protocol_details.json
    "Crest Dell EMC Isilon - Quota Information": assets/dashboards/dell_emc_isilon_quota_information.json
  "integration":
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": cds.emc.isilon.cluster_inventory.license_details
      "metadata_path": metadata.csv
      "prefix": cds.emc.isilon.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_name": crest_data_systems_dell_emc_isilon
  "logs": {}
"author":
  "homepage": "https://www.crestdatasys.com"
  "name": Crest Data Systems
  "sales_email": sales@crestdatasys.com
  "support_email": datadog.integrations@crestdatasys.com
  "vendor_id": crest-data-systems
"categories":
- marketplace
- data store
- monitoring
"classifier_tags":
- "Supported OS::Linux"
- "Supported OS::Mac OS"
- "Supported OS::Windows"
- "Category::Marketplace"
- "Category::Data Store"
- "Category::Monitoring"
- "Offering::Integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "crest_data_systems_dell_emc_isilon"
"integration_id": "crest-data-systems-dell-emc-isilon"
"integration_title": "Dell EMC Isilon"
"integration_version": ""
"is_public": true
"kind": "integration"
"legal_terms":
  "eula": assets/EULA.pdf
"manifest_version": "2.0.0"
"name": "crest_data_systems_dell_emc_isilon"
"oauth": {}
"pricing":
- "billing_type": tag_count
  "includes_assets": true
  "metric": datadog.marketplace.crest_data_systems.dell_emc_isilon
  "product_id": dell-emc-isilon
  "short_description": Le prix affiché est valable par cluster et par mois.
  "tag": cds.emc.isilon.cluster
  "unit_label": Cluster Dell EMC Isilon
  "unit_price": !!float "995.0"
"public_title": "Dell EMC Isilon"
"short_description": "Surveillez les performances et l'utilisation de vos clusters Dell EMC Isilon"
"supported_os":
- linux
- mac os
- windows
"tile":
  "changelog": CHANGELOG.md
  "configuration": "README.md#Setup"
  "description": Surveillez les performances et l'utilisation de vos clusters Dell EMC Isilon
  "media":
  - "caption": Dell EMC Isilon - Détails du cluster
    "image_url": images/cds-dell-emc-isilon-cluster-information.png
    "media_type": image
  - "caption": Dell EMC Isilon - Détails du nœud
    "image_url": images/cds-dell-emc-isilon-node-details.png
    "media_type": image
  - "caption": Dell EMC Isilon - Détails du protocole
    "image_url": images/cds-dell-emc-isilon-protocol-details.png
    "media_type": image
  - "caption": Dell EMC Isilon - Système de fichiers
    "image_url": images/cds-dell-emc-isilon-file-system.png
    "media_type": image
  - "caption": Dell EMC Isilon - Informations sur le quota
    "image_url": images/cds-dell-emc-isilon-quota-information.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Dell EMC Isilon
---

## Présentation

Cette intégration permet de surveiller les performances et l'utilisation d'un cluster Dell EMC Isilon et de ses nœuds. Elle recueille des métriques clés et offre des informations sur l'état et le comportement du cluster Dell EMC Isilon.

Nom du dashboard | Description
---------------|------------
Cluster Information | Ce dashboard offre des informations sur votre cluster.
Node Details | Ce dashboard offre des informations sur vos nœuds.
Protocol Details | Ce dashboard offre des informations sur les protocoles au sein d'un cluster.
File System | Ce dashboard offre des informations sur le système de fichiers au niveau d'un nœud.
Quota Information | Ce dashboard offre des informations sur vos quotas.

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez crestdatasys.com aux coordonnées suivantes :

 - E-mail : datadog.integrations@crestdatasys.com
