---
app_id: agentil-software-sap-businessobjects
app_uuid: cac9d777-3bd1-40a1-aef3-28a8141804f1
assets:
  dashboards:
    SAP BusinessObjects overview: assets/dashboards/agentil_software_sap_businessobjects_global_overview.json
    SAP BusinessObjects system dashboard: assets/dashboards/agentil_software_sap_businessobjects_system.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: AGENTIL Software SAP BusinessObjects
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_businessobjects
integration_id: agentil-software-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: Prix par système SAP unique surveillé (identifié par un SID)
  tag: uri
  unit_label: Instance SAP BusinessObjects
  unit_price: 160
public_title: SAP BusinessObjects
short_description: Surveillez vos systèmes SAP BusinessObjects
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Surveillez vos systèmes SAP BusinessObjects
  media:
  - caption: Vue d'ensemble de SAP BusinessObjects
    image_url: images/sap_businessobjects_global_overview_dashboard.png
    media_type: image
  - caption: Vue d'ensemble du système SAP BusinessObjects
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP BusinessObjects
  uninstallation: README.md#Uninstallation
---



## Présentation
L'intégration SAP BusinessObjects permet de surveiller les systèmes **BusinessObjects** SAP.

Cette intégration utilise une connexion à distance sans Agent et des modèles de surveillance préconfigurés, ce qui vous permet de vous lancer en seulement quelques minutes.

La surveillance s'appuie sur la plateforme [Pro.Monitor](https://www.agentil-software.com) d'AGENTIL Software. Sa configuration par défaut permet de couvrir les modules et transactions les plus utiles pour vos systèmes SAP : **connexions**, **services**, **rapports**, **planifications**, **avertissements d'audit**, etc.

Cette intégration recueille et analyse en temps réel les données provenant des systèmes et génère des métriques et événements exploitables. Vous pouvez créer des alertes personnalisées sur ces données en configurant Pro.Monitor ou en créant des monitors Datadog directement en fonction des métriques.

### Modules surveillés

- Statut du serveur
- Utilisateurs simultanés
- Métriques serveur
- Propriétés serveur
- Planifications et rapports
- CMC et avertissements d'audit

## Assistance
Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez AGENTIL Software à l'adresse support@agentil-software.com

*Si vous êtes à la recherche d'un partenaire de confiance pour des intégrations spécifiques avec SAP ou d'autres plateformes, vous êtes au bon endroit. Contactez-nous !*

---
Ce produit a été conçu et développé à Genève, en Suisse. 


---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-businessobjects" target="_blank">Cliquez ici</a> pour l'acheter.