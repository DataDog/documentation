---
algolia:
  subcategory: Intégrations du Marketplace
app_id: ioconnect-mulesoft-anypoint
app_uuid: fdb057e7-9be6-459f-ab3e-e745766e9158
assets:
  dashboards:
    'IO Connect Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
      metadata_path: metadata.csv
      prefix: ioconnect.mulesoft.anypoint.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: IO Connect MuleSoft Anypoint
  monitors:
    Servers status: assets/monitors/server_disconnected_monitor.json
    '[CloudHub] Apps status': assets/monitors/cloudhub_app_stopped_monitor.json
    '[CloudHub] CPU load': assets/monitors/cloudhub_cpu_load_monitor.json
    '[CloudHub] Memory usage': assets/monitors/cloudhub_memory_usage_monitor.json
    '[CloudHub] Overload queue': assets/monitors/cloudhub_queue_overload_monitor.json
    '[On-Prem] Apps errors': assets/monitors/onpremise_app_error_monitor.json
    '[On-Prem] Apps status': assets/monitors/onpremise_app_stopped_monitor.json
    '[On-Prem] CPU load': assets/monitors/onpremise_cpu_load_monitor.json
    '[On-Prem] Memory usage': assets/monitors/onpremise_memory_usage_monitor.json
author:
  homepage: https://www.ioconnectservices.com/
  name: IO Connect Services
  sales_email: dmi@ioconnectservices.com
  support_email: support_ddp@ioconnectservices.com
  vendor_id: ioconnect
categories:
- cloud
- marketplace
- network
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mulesoft_anypoint
integration_id: ioconnect-mulesoft-anypoint
integration_title: Mule®
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/EULA - IO Connect Services.pdf
manifest_version: 2.0.0
name: mulesoft_anypoint
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.ioconnect.mulesoft_anypoint
  product_id: mulesoft-anypoint
  short_description: Prix unitaire par Production vCore
  tag: vcoreid
  unit_label: production vCore
  unit_price: 200
public_title: Mule®
short_description: Recueillez des métriques à partir de vos produits MuleSoft et envoyez-les
  à Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Marketplace
  - Category::Network
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Recueillez des métriques à partir de vos produits MuleSoft et envoyez-les
    à Datadog
  media:
  - caption: 'Dashboard Operations: APIs'
    image_url: images/dmi_ops_apis.png
    media_type: image
  - caption: 'Dashboard Operations: Infrastructure'
    image_url: images/dmi_ops_infra.png
    media_type: image
  - caption: 'Dashboard Operations: Resources allocation and usage'
    image_url: images/dmi_ops_allocation.png
    media_type: image
  - caption: 'Dashboard Development: Optimizations'
    image_url: images/dmi_dev_optimization.png
    media_type: image
  - caption: 'Dashboard Executives: Cost optimization'
    image_url: images/dmi_exec_cost_optimization.png
    media_type: image
  - caption: Connecteur Datadog pour Mule 4
    image_url: images/dmi_mule_connector.png
    media_type: image
  - caption: APM Datadog
    image_url: images/dmi_apm_traces.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mule®
  uninstallation: README.md#Uninstallation
---



## Présentation

L'intégration Datadog/Mule® utilise l'Agent pour recueillir des métriques à partir de vos produits MuleSoft et les envoyer à Datadog.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_bundle.png" alt="Intégration Datadog/Mule®" >}}

Vous pouvez utiliser ces métriques pour tirer parti des dashboards et monitors prêts à l'emploi ou créer vos propres visualisations.

### **La visibilité dont vous avez besoin sur vos applications Mule**

#### Opérations (_Dashboards dédiés à l'infrastructure, aux API, aux alertes et à l'allocation des ressources_) 

- Surveillez la santé de vos serveurs, API et applications Mule ainsi que d'autres composants de votre infrastructure IT
- Recevez et visualisez des alertes sur votre infrastructure Mule
- Analysez l'allocation des ressources Anypoint Platform de votre organisation

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_infra.png" alt="Dashboard Operations: Infrastructure" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_apis.png" alt="Dashboard Operations: APIs" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_allocation.png" alt="Dashboard Operations: Resources allocation and usage" >}}

#### Développement (_Dashboard d'optimisation_) 

- Identifiez rapidement les problèmes liés à la mémoire, au CPU et au réseau au sein de vos applications Mule
- Identifiez les goulots d'étranglement dans vos applications Mule pour optimiser ses performances
- Instrumentez vos applications Mule avec le connecteur Datadog pour Mule 4 à des fins de dépannage

{{< img src="marketplace/mulesoft_anypoint/images/dmi_dev_optimization.png" alt="Dashboard Development: Optimizations" >}}

#### Direction (_Dashboard d'optimisation des coûts et d'analyse des downtimes_) 

- Analysez et anticipez votre retour sur investissement en fonction des ressources utilisées et non utilisées
- Visualisez des données sur l'uptime système de votre investissement Mule

{{< img src="marketplace/mulesoft_anypoint/images/dmi_exec_cost_optimization.png" alt="Dashboard Executives: Cost optimization" >}}

#### Les métriques sont recueillies à partir des produits MuleSoft suivants :

- Runtime Mule pour serveurs CloudHub et serveurs physiques autonomes
- Anypoint API Manager et API Analytics
- Anypoint Exchange 
- Anypoint Access Management 
- Object Store v2 

### **Instrumentez vos applications Mule avec le connecteur Datadog pour Mule 4**

{{< img src="marketplace/mulesoft_anypoint/images/dmi_mule_connector.png" alt="Connecteur Datadog pour Mule 4" >}}

Utilisez le connecteur Datadog pour Mule 4 avec les données de tracing de l'APM Datadog pour profiter d'une visibilité inégalée grâce aux dashboards de performance intégrés.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_apm_traces.png" alt="APM Datadog" >}}

Mesurez les performances de vos opérations au niveau de granularité de votre choix grâce aux spans.

Enfin, mettez en corrélation les logs générés durant une transaction dans une trace unique pour affiner le contexte lors d'une optimisation des performances ou d'un dépannage.

### **Dépannage**

Besoin d'aide ? Contactez [support_ddp@ioconnectservices.com][9].

## Données collectées

### Métriques
{{< get-metrics-from-git "mulesoft_anypoint" >}}


### Checks de service

Le check mulesoft_anypoint inclut les checks de service suivants :

1. MuleSoft Anypoint. Ce check de service indique si les métriques ont bien été recueillies à partir de MuleSoft Anypoint.
2. Licence d'intégration MuleSoft. Ce check de service permet de vérifier si la licence de cette intégration MuleSoft pour Datadog est valide.

### Événements

L'intégration Datadog/Mule® n'inclut aucun événement.

## Assistance

Pour toute demande d'assistance, contactez l'assistance IO Connect Services à l'adresse [support_ddp@ioconnectservices.com][9].

## À propos de IO Connect Services

IO Connect Services est une société spécialisée dans les services de conseil en technologies de l'information. Nos domaines d'expertise comprennent les technologies cloud, l'intégration système, le big data, la cybersécurité et le génie logiciel. Nous assurons nos services dans toute l'Amérique du Nord, l'Europe et l'Amérique latine. Notre siège social est situé à New York, et nous avons également des bureaux à Guadalajara, au Mexique, et à Madrid, en Espagne.

Rendez-vous sur [https://www.ioconnectservices.com][10]

[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/datadog_checks/mulesoft_anypoint/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/metadata.csv
[7]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/fr/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: https://www.ioconnectservices.com

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/ioconnect-mulesoft-anypoint" target="_blank">Cliquez ici</a> pour l'acheter.