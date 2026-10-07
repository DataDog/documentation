---
algolia:
  subcategory: Intégrations du Marketplace
app_id: agentil-software-sap-netweaver
app_uuid: 5b070928-c509-4826-93db-8b5e9206c355
assets:
  dashboards:
    ABAP transactions response times: assets/dashboards/agentil_software_abap_transactions_response_times.json
    SAP ABAP Transactions Details: assets/dashboards/agentil_software_abap_transactions_details.json
    SAP Netweaver overview: assets/dashboards/agentil_software_sap_global_overview.json
    SAP Netweaver system dashboard: assets/dashboards/agentil_software_sap_netweaver_system.json
    SAP System IDOCS: assets/dashboards/agentil_software_system_idocs.json
    SAP System Shortdumps: assets/dashboards/agentil_software_system_shortdumps.json
    SAP jobs details: assets/dashboards/agentil_software_sap_jobs_details.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_netweaver.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: AGENTIL Software SAP NetWeaver
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
git_integration_title: agentil_software_sap_netweaver
integration_id: agentil-software-sap-netweaver
integration_title: SAP S/4HANA et NetWeaver
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_netweaver
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_netweaver.system
  product_id: sap-netweaver
  short_description: Compter une unité de licence par système SAP surveillé (identifié
    par un SID)
  tag: uri
  unit_label: ID système SAP (SID)
  unit_price: 250
public_title: SAP S/4HANA et NetWeaver
short_description: Surveiller les stacks ABAP et J2EE de vos systèmes S/4HANA et NetWeaver
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
  description: Surveiller les stacks ABAP et J2EE de vos systèmes S/4HANA et NetWeaver
  media:
  - caption: Vue d'ensemble de SAP NetWeaver
    image_url: images/dashboard_overview.png
    media_type: image
  - caption: Dashboard de système SAP NetWeaver
    image_url: images/dashboard_netweaver.png
    media_type: image
  - caption: Logs de tâches SAP NetWeaver
    image_url: images/logs_example_jobs.png
    media_type: image
  - caption: Durées des transactions SAP ABAP
    image_url: images/abap_transaction_response_time.png
    media_type: image
  - caption: Détails des transactions SAP ABAP
    image_url: images/abap_transaction_details.png
    media_type: image
  - caption: Messages SAP IDOC
    image_url: images/abap_idocs.png
    media_type: image
  - caption: Tâches en arrière-plan SAP
    image_url: images/abap_background_jobs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: SAP S/4HANA et NetWeaver
  uninstallation: README.md#Uninstallation
---



## Présentation
L'intégration SAP NetWeaver permet de surveiller les stacks ABAP et J2EE des plateformes d'applications SAP **NetWeaver** et **S/4HANA**.

Grâce à l'utilisation d'une connexion à distance **sans Agent** et de modèles de surveillance préconfigurés, cette intégration peut être mise en service en seulement **quelques minutes**

La surveillance s'appuie sur la [plateforme Pro.Monitor][1] d'AGENTIL. Sa configuration par défaut permet de couvrir les modules et transactions les plus utiles pour vos systèmes SAP : **short dumps, tâches SAP, temps de réponse des transactions, processus de travail, etc.**

Cette intégration recueille et analyse en temps réel les données provenant des systèmes et génère des métriques et événements exploitables. Vous pouvez personnaliser les alertes en configurant Pro.Monitor et créer des monitors Datadog directement en fonction des métriques.

### Modules surveillés

- Mémoire de l'instance ABAP
- Temps de réponse de l'instance ABAP
- Verrous ABAP
- Paramètres ABAP
- Short dumps ABAP
- Logs d'application
- Entrées en lot
- Certificats
- Surveillance CCMS personnalisée
- Sauvegardes de bases de données
- Taille de base de données
- Verrous exclusifs de base de données
- Files d'attente de distribution
- Statut et utilisation d'ICM
- Surveillance des échanges d'IDOC
- Disponibilité des instances
- Plages de numéros
- ABAP pour messages PI/XI
- Surveillance de chaînes de processus
- QRFC/TRFC
- Données en temps réel
- Disponibilité des destinations RFC
- Buffers SAP
- Paramètres de modification de clients SAP
- SAPconnect (SCOT/SOST)
- Surveillance de tâches SAP
- Durées des transactions SAP
- Transports SAP
- Utilisateurs SAP
- Spools
- Logs système
- Demandes de mise à jour
- Service de mise à jour
- Processus de travail

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez AGENTIL Software aux coordonnées suivantes :

- E-mail : [support@agentil-software.com][2]

### Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller SAP NetWeaver avec la solution d'Agentil, disponible dans le Marketplace Datadog][5]

*Si vous êtes à la recherche d'un partenaire de confiance pour des intégrations spécifiques avec SAP ou d'autres plateformes, vous êtes au bon endroit. Contactez-nous !*

---
Ce produit a été conçu et développé à Genève, en Suisse. 

[1]: https://www.agentil-software.com
[2]: mailto:support@agentil-software.com
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.agentil-software.com/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-netweaver" target="_blank">Cliquez ici</a> pour l'acheter.