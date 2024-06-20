---
aliases:
- /fr/guides/azure/
- /fr/integrations/azure_storage/
categories:
- azure
- cloud
- iot
- log collection
- network
- notifications
dependencies: []
description: Recueillez des métriques à partir d'instances et de nombreux services
  Azure.
doc_link: https://docs.datadoghq.com/integrations/azure/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
  tag: Blog
  text: Explorer Azure App Service avec la vue Serverless Datadog
- link: https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/
  tag: Blog
  text: Comment surveiller des machines virtuelles Azure Microsoft
- link: https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog/
  tag: Blog
  text: Surveiller vos machines virtuelles Microsoft Azure dotées de processeurs ARM
    Ampere Altra avec Datadog
- link: https://www.datadoghq.com/blog/monitoring-azure-platform-logs/
  tag: Blog
  text: Recommandations pour la surveillance des logs de la plateforme Microsoft Azure
- link: https://www.datadoghq.com/blog/azure-service-health-monitoring-datadog/
  tag: Blog
  text: Surveiller des événements Azure Service Health avec Datadog
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Surveiller Azure Container Apps avec Datadog
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Surveiller des pipelines Azure avec la solution CI Visibility Datadog
- link: https://www.datadoghq.com/blog/azure-government-monitoring-datadog/
  tag: Blog
  text: Surveiller Azure Government avec Datadog
- link: https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/
  tag: Blog
  text: Activer en quelques minutes la surveillance d'environnements Azure professionnels
    avec Datadog
- link: https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/
  tag: Documentation
  text: Architecture et configuration de l'intégration Azure
- link: https://docs.datadoghq.com/integrations/guide/azure-portal/
  tag: Documentation
  text: Datadog sur le portail Azure
- link: https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentation
  text: Pourquoi installer l'Agent Datadog sur mes instances cloud ?
- link: https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/
  tag: Blog
  text: Surveiller Azure OpenAI avec Datadog
- link: https://www.datadoghq.com/blog/datadog-aks-cluster-extension/
  tag: Blog
  text: Simplifier la surveillance des conteneurs Azure grâce à l'extension AKS Cluster
    Datadog
- link: https://www.datadoghq.com/blog/azure-integration-configuration/
  tag: Blog
  text: Personnaliser les configurations d'observabilité de toutes vos intégrations
    Azure depuis une interface unique
git_integration_title: azure
has_logo: true
integration_id: azure
integration_title: Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  '[Azure App Gateway] Backend Hosts': assets/monitors/app_gateway_backend_hosts.json
  '[Azure App Gateway] CPU Utilization': assets/monitors/app_gateway_cpu_utilization.json
  '[Azure App Gateway] Failed Requests': assets/monitors/app_gateway_failed_requests.json
  '[Azure App Gateway] Response HTTP Status Anomaly': assets/monitors/app_gateway_http_status_anomalies.json
  '[Azure App Service] App Service Errors': assets/monitors/app_service_app_service_errors.json
  '[Azure App Service] App Service Plan CPU Utilization': assets/monitors/app_service_cpu.json
  '[Azure App Service] App Service Plan Memory Utilization': assets/monitors/app_service_memory.json
  '[Azure App Service] Connections': assets/monitors/app_service_connections.json
  '[Azure App Service] Function App Errors': assets/monitors/app_service_function_app_errors.json
  '[Azure App Service] Requests': assets/monitors/app_service_requests.json
  '[Azure App Service] Response Time': assets/monitors/app_service_response_times.json
  '[Azure SQL Database] CPU Utilization': assets/monitors/sql_db_cpu_percent.json
  '[Azure SQL Database] DTU Consumption': assets/monitors/sql_db_dtu_consumption_percent.json
  '[Azure SQL Database] Deadlock Anomalies': assets/monitors/sql_db_deadlock_anomalies.json
  '[Azure SQL Database] Failed Connections': assets/monitors/sql_db_connections_failed.json
  '[Azure SQL Database] Georeplication Link Status ': assets/monitors/sql_db_replication_links.json
  '[Azure SQL Database] Storage Utilization': assets/monitors/sql_db_storage_percent.json
  '[Azure VM] CPU Utilization Monitor': assets/monitors/vm_cpu_utilization.json
  '[Azure VM] Resource Health Status Monitor': assets/monitors/vm_resource_health_status.json
  '[Azure] API Rate Limit': assets/monitors/rate_limits.json
  '[Azure] Integration Errors': assets/monitors/integration_errors.json
  '[Azure] Resource Quotas': assets/monitors/resource_quotas.json
  '[Azure] Service Health Events': assets/monitors/service_health_events.json
name: azure
public_title: Intégration Datadog/Microsoft Azure
short_description: Recueillez des métriques à partir d'instances et de nombreux services
  Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

L'intégration Azure de Datadog permet de recueillir des métriques et des logs à partir de votre environnement Azure. Les options de configuration disponibles varient selon le site Datadog que votre organisation utilise :

**Tous les sites** : tous les sites Datadog peuvent utiliser le processus d'inscription d'application afin de mettre en place la collecte des métriques. Ils peuvent également tous configurer un Event Hub de façon à envoyer les logs de la plateforme Azure. _Dans la mesure où l'intégration Azure permet de surveiller la région chinoise d'Azure, toute utilisation des services Datadog en Chine occidentale (ou en connexion avec des environnements se situant au sein de la Chine occidentale) est sujette à l'avertissement figurant à la section [Emplacements de service restreints][1] (en anglais) de notre site Web._ 

**US3** : si votre organisation utilise le site Datadog US3, vous pouvez tirer profit de l'intégration native Azure pour simplifier la gestion et la collecte des données de votre environnement Azure. Il est recommandé d'utiliser dès que possible cette méthode. Il vous suffit de créer une ressource Datadog dans Azure afin d'associer vos abonnements Azure à votre organisation Datadog. Il n'est alors pas nécessaire d'utiliser le processus d'inscription d'application pour la collecte des métriques ni de configurer un Event Hub pour l'envoi des logs.

Associez Microsoft Azure pour :
- Obtenir des métriques sur des machines virtuelles Azure sans avoir nécessairement à installer l'Agent Datadog
- Recueillir des métriques Azure Monitor standard pour tous les services Azure : Application Gateway, App Service (Web et mobile), Batch Service, Event Hubs, IoT Hub, Logic App, Redis Cache, Server Farm (plan App Service), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set, et bien d'autres encore
- Ajouter à vos métriques Azure des tags contenant des informations à propos de la ressource associée, comme la région, le groupe de ressources et les tags définis dans votre environnement Azure
- Récupérer des métriques générées par Datadog, afin d'obtenir des informations exploitables uniques sur votre environnement Azure
- Mettre en corrélation des données de vos applications Azure au sein de votre organisation Datadogpour vos logs, vos métriques, le tracing APM ou encore l'activité utilisateur

<div class="alert alert-warning">
L'intégration Azure de Datadog est conçue pour recueillir <a href="https://docs.microsoft.com/fr-fr/azure/azure-monitor/platform/metrics-supported">toutes les métriques en provenance d'Azure Monitor</a>. Datadog s'efforce de mettre régulièrement à jour sa documentation afin d'inclure chaque sous-intégration. Toutefois, les métriques et les services proposés par les différents services cloud étant en permanente évolution, il est possible que la liste ne soit pas actuelle.<br>Les métriques <code>azure.*.status</code> et <code>azure.*.count</code> sont générées par Datadog à partir d'Azure Resource Health. Pour en savoir plus, consultez la section <a href="https://docs.datadoghq.com/integrations/guide/azure-status-metric">Métrique count et status Azure</a>.
</div>

| Intégration                     | Description                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][2]          | Un service qui fournit des modèles de données dans le cloud.                                                         |
| [Gestion des API][3]             | Un service pour publier, sécuriser, transformer, maintenir et surveiller les API.                                      |
| [App Service][4]                | Un service de déploiement et de mise à l'échelle d'applications Web, mobiles, API et de logique métier.                      |
| [App Service Environment][5]    | Un service qui fournit un environnement pour l'exécution sécurisée de vos applications App Service à grande échelle.               |
| [Plan App Service][6]           | Un ensemble de ressources de calcul nécessaires à l'exécution d'une application Web.                                                          |
| [Application Gateway][7]        | Un équilibreur de charge du trafic Web qui vous permet de gérer le trafic vers vos applications Web.                  |
| [Automation][8]                 | Un service conçu pour faciliter la gestion de la configuration et l'automatisation au sein de vos environnements.                 |
| [Batch Service][9]              | Un planificateur et processeur de tâches gérés.                                                                     |
| [Cognitive Services][10]         | Un ensemble d'API, de SDK et de services mis à votre disposition pour vous permettre de créer des applications sans connaissances en intelligence artificielle ou en science des données.       |
| [Container Instances][11]       | Un service qui vous permet de déployer des conteneurs sans avoir à provisionner ou gérer l'infrastructure sous-jacente.     |
| [Container Service][12]         | Un cluster Kubernetes, DC/OS ou Docker Swarm prêt pour la production.                                            |
| [Cosmos DB][13]                 | Un service de base de données qui prend en charge les bases de données clé-valeur, de documents, en colonnes et graphiques.                   |
| [Customer Insights][14]         | Permet aux organisations de consolider divers jeux de données pour bénéficier d'une vue globale sur leurs clients.                |
| [Data Explorer][15]             | Un service d'exploration de données rapide et hautement évolutif.                                                        |
| [Data Factory][16]              | Un service qui permet de composer des services de stockage, de déplacement et de traitement des données au sein de pipelines de données automatisés.       |
| [Data Lake Analytics][17]       | Un service d'analyse qui simplifie le traitement des tâches de Big Data.                                                        |
| [Data Lake Store][18]           | Une solution Data Lake sans limites qui améliore l'analytique Big Data.                                                     |
| [Database for MariaDB][19]      | Un service qui fournit une version communautaire entièrement gérée et prête à l'emploi de MariaDB.                       |
| [Event Grid][20]                | Un service pour gérer le routage des événements qui permet une consommation d'événements uniforme à l'aide d'un modèle pub/sub.       |
| [Event Hubs][21]                 | Un service géré de flux de données à grande échelle.                                                                   |
| [ExpressRoute][22]              | Un service pour étendre vos réseaux sur site dans le cloud.                                             |
| [Pare-feu][23]                  | Un service de sécurité réseau basé sur le cloud pour protéger les ressources de votre réseau virtuel Azure.                            |
| [Functions][24]                 | Un service conçu pour exécuter du code sans serveur en réponse à un événement.                                      |
| [HDInsights][25]                | Un service cloud conçu pour traiter d'importants volumes de données.                                                   |
| [IoT Hub][26]                   | Connexion, surveillance et gestion de milliards de ressources IoT.                                                      |
| [Key Vault][27]                 | Un service conçu pour protéger et gérer les clés de chiffrement et les secrets utilisés par les services et applications cloud. |
| [Load Balancer][28]             | Mise à l'échelle de vos applications et haute disponibilité pour vos services.                                   |
| [Logic Apps][29]                 | Conception de solutions d'intégration puissantes.                                                                     |
| [Machine Learning][30]          | Service de machine learning pour l'entreprise permettant d'accélérer la création et le déploiement de modèles                              |
| [Network Interfaces][31]        | Permet à une machine virtuelle de communiquer avec des ressources Internet, Azure et locales.                                 |
| [Notification Hubs][32]         | Un moteur de notifications Push qui vous permet d'envoyer des notifications vers n'importe quelle plateforme depuis n'importe quel backend.                     |
| [Adresse IP publique][33]         | Une ressource qui permet d'assurer une connectivité entrante et une connectivité sortante à partir d'Internet.                |
| [Coffre Recovery Services][34]    | Une entité qui stocke les sauvegardes et les points de récupération créés au fil du temps.                                  |
| [Redis Cache][35]               | Cache de données géré.                                                                                       |
| [Relay][36]                     | Permet l'exposition sécurisée des services exécutés dans votre réseau d'entreprise sur le cloud public.                          |
| [Recherche cognitive][37]          | Un service de recherche basé sur le cloud qui fournit des outils permettant d'ajouter une expérience de recherche riche.             |
| Stockage                         | Stockage d'[objets blob][38], de [fichiers][39], de [files d'attente][40] et de [tables][41].                                     |
| [Stream Analytics][42]          | Un moteur de traitement d'événements pour analyser d'importants volumes de données diffusées à partir d'appareils.                        |
| [SQL Database][43]              | Base de données relationnelle fortement évolutive dans le cloud.                                                         |
| [Pool élastique SQL Database][44] | Gestion des performances de plusieurs bases de données.                                                              |
| [Synapse Analytics][45]         | Service d'analyse proposant à la fois des fonctionnalités d'intégration de données, d'entreposage de données à l'échelle de votre entreprise et d'analyse Big Data. |
| [Utilisation et quotas][46]          | Surveillance de votre utilisation d'Azure.                                                                                  |
| [Machine virtuelle][47]           | Service de gestion de machines virtuelles.                                                                       |
| [Groupe de machines virtuelles identiques][48] | Déploiement, gestion et mise à l'échelle automatique d'un groupe de machines virtuelles identiques.                                                     |
| [Réseau virtuel][49]           | Permet aux ressources Azure de communiquer entre elles, avec Internet et avec les réseaux sur site en toute sécurité.    |

## Configuration

### Configuration automatique

_Tous les sites :_  
Consultez le [guide sur la gestion automatisée de l'intégration Azure standard][50] pour découvrir comment configurer automatiquement l'intégration Datadog standard avec Azure. Vous pouvez configurer cette intégration via Terraform ou avec la CLI Azure, déployer l'Agent Datadog en natif dans Azure à l'aide de l'extension Datadog Azure VM et exécuter des scripts automatisés afin d'activer la collecte de logs.

_US3 :_  
Consultez le [guide sur la gestion automatisée de l'intégration Azure native][51] pour découvrir comment utiliser Terraform afin de configurer l'intégration Azure native de Datadog à l'aide de la ressource Datadog dans Azure. 

### Configuration manuelle

_Tous les sites :_  
Consultez le [guide sur la configuration manuelle de l'intégration Azure standard][52] pour découvrir comment configurer manuellement l'intégration Datadog avec Azure via le portail Azure ou avec la CLI Azure, et comment déployer directement l'Agent Datadog dans Azure avec l'extension VM ou l'extension AKS Cluster.

_US3 :_  
Consultez le [guide sur la configuration manuelle de l'intégration Azure native][53] pour découvrir comment configurer manuellement l'intégration Azure native avec Datadog. Pour ce faire, vous devez créer la ressource Datadog dans Azure, déployer directement l'Agent Datadog dans Azure avec l'extension VM ou l'extension AKS Cluster, puis, si vous le souhaitez, configurer l'authentification SSO.

## Collecte de logs

_Tous les sites :_  
Consultez la section [Envoyer des logs Azure à Datadog][54] pour découvrir comment envoyer vos logs Azure à Datadog. Vous pouvez choisir d'activer manuellement ou automatiquement la collecte de logs à l'aide de la fonction Datadog/Azure et d'un Event Hub Azure. Il est également possible d'utiliser une fonction de stockage de blob Azure pour recueillir les logs provenant de tous vos App Services Azure.

_US3 :_  
Consultez la section [Envoyer des logs Azure avec la ressource Datadog][55] pour découvrir comment envoyer à Datadog les logs relatifs au niveau d'abonnement, à la ressource Azure et à Azure Active Directory.

## Données collectées

### Métriques

Toutes les métriques Azure Monitor standard, ainsi que des [métriques uniques générées par Datadog][56], sont recueillies.

Pour obtenir la liste détaillée des métriques, sélectionnez le service Azure pertinent dans la [section Présentation](#presentation).

### Événements

L'intégration Azure recueille automatiquement les événements Azure Service Health. Pour les visualiser dans Datadog, accédez à l'[Events Explorer][57] et appliquez un filtre basé sur l'espace de nommage `Azure Service Health`.

### Checks de service

L'intégration Azure n'inclut aucun check de service.

### Tags

En plus des tags définis dans vos environnements Azure, les tags suivants sont appliqués aux métriques, événements et checks de service de l'intégration Azure :

| Intégration                             | Espace de nommage                                   | Clés de tag Datadog                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes les intégrations Azure                  | Tous                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (le cas échéant)                                                            |
| Intégrations VM Azure                   | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Plans Azure App Service                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Applications Web et Fonctions Azure App Services | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (applications web Linux uniquement), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure SQL Database                            | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>Pour les liens de réplication uniquement :  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Utilisation et quotas Azure                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

## Dépannage

Consultez la section [Dépannage Azure][58].

Besoin d'aide ? Contactez l'[assistance Datadog][59].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/legal/restricted-service-locations/
[2]: https://docs.datadoghq.com/fr/integrations/azure_analysis_services/
[3]: https://docs.datadoghq.com/fr/integrations/azure_api_management/
[4]: https://docs.datadoghq.com/fr/integrations/azure_app_services/
[5]: https://docs.datadoghq.com/fr/integrations/azure_app_service_environment/
[6]: https://docs.datadoghq.com/fr/integrations/azure_app_service_plan/
[7]: https://docs.datadoghq.com/fr/integrations/azure_application_gateway/
[8]: https://docs.datadoghq.com/fr/integrations/azure_automation/
[9]: https://docs.datadoghq.com/fr/integrations/azure_batch/
[10]: https://docs.datadoghq.com/fr/integrations/azure_cognitive_services/
[11]: https://docs.datadoghq.com/fr/integrations/azure_container_instances/
[12]: https://docs.datadoghq.com/fr/integrations/azure_container_service/
[13]: https://docs.datadoghq.com/fr/integrations/azure_cosmosdb/
[14]: https://docs.datadoghq.com/fr/integrations/azure_customer_insights/
[15]: https://docs.datadoghq.com/fr/integrations/azure_data_explorer/
[16]: https://docs.datadoghq.com/fr/integrations/azure_data_factory/
[17]: https://docs.datadoghq.com/fr/integrations/azure_data_lake_analytics/
[18]: https://docs.datadoghq.com/fr/integrations/azure_data_lake_store/
[19]: https://docs.datadoghq.com/fr/integrations/azure_db_for_mariadb/
[20]: https://docs.datadoghq.com/fr/integrations/azure_event_grid/
[21]: https://docs.datadoghq.com/fr/integrations/azure_event_hub/
[22]: https://docs.datadoghq.com/fr/integrations/azure_express_route/
[23]: https://docs.datadoghq.com/fr/integrations/azure_firewall/
[24]: https://docs.datadoghq.com/fr/integrations/azure_functions/
[25]: https://docs.datadoghq.com/fr/integrations/azure_hd_insight/
[26]: https://docs.datadoghq.com/fr/integrations/azure_iot_hub/
[27]: https://docs.datadoghq.com/fr/integrations/azure_key_vault/
[28]: https://docs.datadoghq.com/fr/integrations/azure_load_balancer/
[29]: https://docs.datadoghq.com/fr/integrations/azure_logic_app/
[30]: https://docs.datadoghq.com/fr/integrations/azure_machine_learning_services/
[31]: https://docs.datadoghq.com/fr/integrations/azure_network_interface/
[32]: https://docs.datadoghq.com/fr/integrations/azure_notification_hubs/
[33]: https://docs.datadoghq.com/fr/integrations/azure_public_ip_address/
[34]: https://docs.datadoghq.com/fr/integrations/azure_recovery_service_vault/
[35]: https://docs.datadoghq.com/fr/integrations/azure_redis_cache/
[36]: https://docs.datadoghq.com/fr/integrations/azure_relay/
[37]: https://docs.datadoghq.com/fr/integrations/azure_search/
[38]: https://docs.datadoghq.com/fr/integrations/azure_blob_storage/
[39]: https://docs.datadoghq.com/fr/integrations/azure_file_storage/
[40]: https://docs.datadoghq.com/fr/integrations/azure_queue_storage/
[41]: https://docs.datadoghq.com/fr/integrations/azure_table_storage/
[42]: https://docs.datadoghq.com/fr/integrations/azure_stream_analytics/
[43]: https://docs.datadoghq.com/fr/integrations/azure_sql_database/
[44]: https://docs.datadoghq.com/fr/integrations/azure_sql_elastic_pool/
[45]: https://docs.datadoghq.com/fr/integrations/azure_synapse/
[46]: https://docs.datadoghq.com/fr/integrations/azure_usage_and_quotas/
[47]: https://docs.datadoghq.com/fr/integrations/azure_vm/
[48]: https://docs.datadoghq.com/fr/integrations/azure_vm_scale_set/
[49]: https://docs.datadoghq.com/fr/integrations/azure_virtual_networks/
[50]: https://docs.datadoghq.com/fr/integrations/guide/azure-programmatic-management/
[51]: https://docs.datadoghq.com/fr/integrations/guide/azure-native-programmatic-management/
[52]: https://docs.datadoghq.com/fr/integrations/guide/azure-manual-setup/
[53]: https://docs.datadoghq.com/fr/integrations/guide/azure-native-manual-setup/
[54]: https://docs.datadoghq.com/fr/logs/guide/azure-logging-guide/
[55]: https://docs.datadoghq.com/fr/logs/guide/azure-native-logging-guide/
[56]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[57]: https://app.datadoghq.com/event/explorer
[58]: https://docs.datadoghq.com/fr/integrations/guide/azure-troubleshooting/
[59]: https://docs.datadoghq.com/fr/help/