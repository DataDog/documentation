---
assets:
  dashboards:
    'IO Connect Development: Optimizations': assets/dashboards/development_optimizations.json
    'IO Connect Execs: Cost Optimization': assets/dashboards/execs_cost_optimization.json
    'IO Connect Operations: APIs': assets/dashboards/operations_apis.json
    'IO Connect Operations: Infrastructure': assets/dashboards/operations_infrastructure.json
    'IO Connect Operations: Resources allocation': assets/dashboards/operations_resources_allocation_and_usage.json
  metrics_metadata: metadata.csv
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
  saved_views: {}
  service_checks: assets/service_checks.json
author:
  homepage: 'https://www.ioconnectservices.com/'
  name: IO Connect Services
categories:
  - marketplace
  - cloud
  - collaboration
creates_events: false
ddtype: check
dependencies: []
display_name: IO Connect MuleSoft Anypoint
draft: false
git_integration_title: mulesoft_anypoint
guid: dd29d25b-8c20-4b11-b24f-91a2adbc8f73
integration_id: ioconnect-mulesoft-anypoint
integration_title: Mule®
is_public: true
kind: integration
maintainer: support_ddp@ioconnectservices.com
manifest_version: 1.0.0
metric_prefix: ioconnect.mulesoft.anypoint.
metric_to_check: ioconnect.mulesoft.anypoint.access_management.organization.entitlements.vcores_production.assigned
name: mulesoft_anypoint
pricing:
  - billing_type: tag_count
    metric: datadog.marketplace.ioconnect.mulesoft_anypoint
    tag: vcoreid
    unit_label: production vCore
    unit_price: 350
public_title: Intégration Mule®
short_description: Recueillez des métriques à partir de vos produits MuleSoft et transférez-les à Datadog.
support: partner
supported_os:
  - linux
  - mac_os
  - windows
terms:
  eula: assets/EULA - IO Connect Services.pdf
  legal_email: dmi@ioconnectservices.com
---
## Présentation

L'intégration Datadog/Mule® utilise l'Agent pour recueillir des métriques à partir de vos produits MuleSoft et les transférer à Datadog.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_bundle.png" alt="Intégration Datadog/Mule®" >}}

Vous pouvez utiliser ces métriques pour tirer parti des dashboards et monitors prêts à l'emploi ou créer vos propres visualisations.

### **La visibilité dont vous avez besoin sur vos applications Mule**

#### Opérations (_Dashboards dédiés à l'infrastructure, aux API, aux alertes et à l'allocation des ressources_) 

- Surveillez la santé de vos serveurs, API et applications Mule ainsi que d'autres composants de votre infrastructure IT
- Recevez et visualisez des alertes sur votre infrastructure Mule
- Analysez l'allocation des ressources Anypoint Platform de votre organisation

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_infra.png" alt="Opérations : dashboard d'infrastructure" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_apis.png" alt="Opérations : dashboard d'infrastructure" >}}

{{< img src="marketplace/mulesoft_anypoint/images/dmi_ops_allocation.png" alt="Opérations : dashboard d'allocation et d'utilisation des ressources" >}}

#### Développement (_Dashboard d'optimisation_) 

- Identifiez rapidement les problèmes liés à la mémoire, au CPU et au réseau au sein de vos applications Mule
- Identifiez les goulots d'étranglement dans vos applications Mule pour optimiser ses performances
- Instrumentez vos applications Mule avec le connecteur Datadog pour Mule 4 à des fins de dépannage

{{< img src="marketplace/mulesoft_anypoint/images/dmi_dev_optimization.png" alt="Développement : dashboard d'optimisation" >}}

#### Direction (_Dashboard d'optimisation des coûts et d'analyse des downtimes_) 

- Analysez et anticipez votre retour sur investissement en fonction des ressources utilisées et non utilisées
- Visualisez des données sur l'uptime système de votre investissement Mule

{{< img src="marketplace/mulesoft_anypoint/images/dmi_exec_cost_optimization.png" alt="Direction: dashboard d'optimisation des coûts" >}}

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

{{< img src="marketplace/mulesoft_anypoint/images/dmi_apm_trace.png" alt="APM Datadog" >}}

Enfin, mettez en corrélation les logs générés durant une transaction dans une trace unique pour affiner le contexte lors d'une optimisation des performances ou d'un dépannage.

{{< img src="marketplace/mulesoft_anypoint/images/dmi_apm_logs.png" alt="APM Datadog" >}}

### **Dépannage**

Besoin d'aide ? Contactez-nous : [support_ddp@ioconnectservices.com][9].

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

Pour toute demande d'assistance contactez-nous à l'adresse [support_ddp@ioconnectservices.com][9].

---
Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici][13] pour l'acheter.

## Contrat de licence destiné à l'utilisateur final

Le contrat de licence à destination de l'utilisateur final est disponible dans le fichier [EULA - IO Connect Services.pdf][10]

## À propos de IO Connect Services

IO Connect Services est une société spécialisée dans les services de conseil en technologies de l'information. Nos domaines d'expertise comprennent les technologies cloud, l'intégration système, le big data, la cybersécurité et le génie logiciel. Nous assurons nos services dans toute l'Amérique du Nord, l'Europe et l'Amérique latine. Notre siège social est situé à New York, et nous avons également des bureaux à Guadalajara, au Mexique, et à Madrid, en Espagne.

Rendez-vous sur [https://www.ioconnectservices.com][11]

[1]: https://www.ioconnectservices.com
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/datadog_checks/mulesoft_anypoint/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://github.com/DataDog/integrations-core/blob/master/mulesoft_anypoint/metadata.csv
[7]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/?tab=configurationfile#installing
[8]: https://docs.datadoghq.com/fr/developers/guide/custom-python-package/?tab=linux
[9]: mailto:support_ddp@ioconnectservices.com
[10]: assets/EULA%20-%20IO%20Connect%20Services.pdf
[11]: https://www.ioconnectservices.com
[12]: mailto:dmi@ioconnectservices.com
[13]: https://app.datadoghq.com/marketplace/app/ioconnect-mulesoft-anypoint/pricing