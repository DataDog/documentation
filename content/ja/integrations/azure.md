---
"aliases":
- "/guides/azure/"
- "/integrations/azure_storage/"
"categories":
- "azure"
- "cloud"
- "iot"
- "log collection"
- "network"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"description": "Collect metrics from instances and many, many Azure services."
"doc_link": "https://docs.datadoghq.com/integrations/azure/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/"
  "tag": "Blog"
  "text": "Explore Azure App Service with the Datadog Serverless view"
- "link": "https://www.datadoghq.com/blog/how-to-monitor-microsoft-azure-vms/"
  "tag": "Blog"
  "text": "How to Monitor Microsoft Azure VMs"
- "link": "https://www.datadoghq.com/blog/monitor-azure-arm-vms-datadog/"
  "tag": "Blog"
  "text": "Monitor your Microsoft Azure VMs featuring Ampere Altra Arm-based CPUs with Datadog?"
- "link": "https://www.datadoghq.com/blog/monitoring-azure-platform-logs/"
  "tag": "Blog"
  "text": "Best practices for monitoring Microsoft Azure platform logs"
- "link": "https://www.datadoghq.com/blog/azure-service-health-monitoring-datadog/"
  "tag": "Blog"
  "text": "Monitor Azure Service Health events with Datadog"
- "link": "https://www.datadoghq.com/blog/azure-container-apps/"
  "tag": "Blog"
  "text": "Monitor Azure Container Apps with Datadog"
- "link": "https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/"
  "tag": "Blog"
  "text": "Monitor Azure Pipelines with Datadog CI Visibility"
- "link": "https://www.datadoghq.com/blog/azure-government-monitoring-datadog/"
  "tag": "Blog"
  "text": "Monitor Azure Government with Datadog"
- "link": "https://www.datadoghq.com/blog/monitor-enterprise-azure-environments-with-datadog/"
  "tag": "Blog"
  "text": "Enable monitoring for enterprise-scale Azure environments in minutes with Datadog"
- "link": "https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/"
  "tag": "Documentation"
  "text": "Azure Integration Architecture and Configuration"
- "link": "https://docs.datadoghq.com/integrations/guide/azure-portal/"
  "tag": "Documentation"
  "text": "Datadog in the Azure Portal"
- "link": "https://docs.datadoghq.com/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/"
  "tag": "Documentation"
  "text": "Why should I install the Datadog Agent on my cloud instances?"
- "link": "https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/"
  "tag": "Blog"
  "text": "Monitor Azure OpenAI with Datadog"
- "link": "https://www.datadoghq.com/blog/datadog-aks-cluster-extension/"
  "tag": "Blog"
  "text": "Streamline Azure container monitoring with the Datadog AKS cluster extension"
- "link": "https://www.datadoghq.com/blog/azure-integration-configuration/"
  "tag": "Blog"
  "text": "Fine-tune observability configurations for all your Azure integrations in one place"
"git_integration_title": "azure"
"has_logo": true
"integration_id": "azure"
"integration_title": "Microsoft Azure"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"monitors":
  "[Azure App Gateway] Backend Hosts": "assets/monitors/app_gateway_backend_hosts.json"
  "[Azure App Gateway] CPU Utilization": "assets/monitors/app_gateway_cpu_utilization.json"
  "[Azure App Gateway] Failed Requests": "assets/monitors/app_gateway_failed_requests.json"
  "[Azure App Gateway] Response HTTP Status Anomaly": "assets/monitors/app_gateway_http_status_anomalies.json"
  "[Azure App Service] App Service Errors": "assets/monitors/app_service_app_service_errors.json"
  "[Azure App Service] App Service Plan CPU Utilization": "assets/monitors/app_service_cpu.json"
  "[Azure App Service] App Service Plan Memory Utilization": "assets/monitors/app_service_memory.json"
  "[Azure App Service] Connections": "assets/monitors/app_service_connections.json"
  "[Azure App Service] Function App Errors": "assets/monitors/app_service_function_app_errors.json"
  "[Azure App Service] Requests": "assets/monitors/app_service_requests.json"
  "[Azure App Service] Response Time": "assets/monitors/app_service_response_times.json"
  "[Azure SQL Database] CPU Utilization": "assets/monitors/sql_db_cpu_percent.json"
  "[Azure SQL Database] DTU Consumption": "assets/monitors/sql_db_dtu_consumption_percent.json"
  "[Azure SQL Database] Deadlock Anomalies": "assets/monitors/sql_db_deadlock_anomalies.json"
  "[Azure SQL Database] Failed Connections": "assets/monitors/sql_db_connections_failed.json"
  "[Azure SQL Database] Georeplication Link Status ": "assets/monitors/sql_db_replication_links.json"
  "[Azure SQL Database] Storage Utilization": "assets/monitors/sql_db_storage_percent.json"
  "[Azure VM] CPU Utilization Monitor": "assets/monitors/vm_cpu_utilization.json"
  "[Azure VM] Resource Health Status Monitor": "assets/monitors/vm_resource_health_status.json"
  "[Azure] API Rate Limit": "assets/monitors/rate_limits.json"
  "[Azure] Integration Errors": "assets/monitors/integration_errors.json"
  "[Azure] Resource Quotas": "assets/monitors/resource_quotas.json"
  "[Azure] Service Health Events": "assets/monitors/service_health_events.json"
"name": "azure"
"public_title": "Datadog-Microsoft Azure Integration"
"short_description": "Collect metrics from instances and many, many Azure services."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Datadog's Azure integration enables the collection of metrics and logs from your Azure environment. The configuration options are different depending on which Datadog site your organization is using:

**All Sites:** All Datadog sites can use the App Registration credential process for implementing metric collection, and the Event Hub setup for sending Azure Platform Logs. _To the extent that the Azure Integration is used to monitor Azure China, all use of Datadog Services in (or in connection with environments within) mainland China is subject to the disclaimer published in the [Restricted Service Locations][1] section on our website._

**US3:** If your organization is on the Datadog US3 site, use the Azure Native integration to streamline management and data collection for your Azure environment. Datadog recommends using this method when possible. Setup entails creating a Datadog resource in Azure to link your Azure subscriptions to your Datadog organization. This replaces the App Registration credential process for metric collection and Event Hub setup for log forwarding.

Connect to Microsoft Azure to:
- Get metrics from Azure VMs with or without installing the Datadog Agent.
- Collect standard Azure Monitor metrics for all Azure services: Application Gateway, App Service (Web & Mobile), Batch Service, Event Hub, IoT Hub, Logic App, Redis Cache, Server Farm (App Service Plan), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set, and many more.
- Tag your Azure metrics with Azure-specific information about the associated resource, such as region, resource group, and tags defined in your Azure environment.
- Get Datadog generated metrics to provide unique insights into your Azure environment.
- Correlate data from your Azure applications across logs, metrics, APM tracing, user activity, and more within your Datadog organization.

<div class="alert alert-warning">
Datadog's Azure integration is built to collect <a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">all metrics from Azure Monitor</a>. Datadog strives to continually update the docs to show every sub-integration, but cloud services rapidly release new metrics and services so the list of integrations can sometimes lag.<br>The <code>azure.*.status</code> and <code>azure.*.count</code> metrics are generated by Datadog from Azure Resource Health. For more information, see <a href="https://docs.datadoghq.com/integrations/guide/azure-status-metric">Azure Status and Count Metrics</a>.
</div>

| Integration                     | Description                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services][2]          | A service that provides data models in the cloud.                                                         |
| [API Management][3]             | A service to publish, secure, transform, maintain, and monitor APIs.                                      |
| [App Service][4]                | A service for deploying and scaling web, mobile, API and business logic application.                      |
| [App Service Environment][5]    | A service that provides an environment for securely running App Service apps at high scale.               |
| [App Service Plan][6]           | A set of compute resources for a web app to run.                                                          |
| [Application Gateway][7]        | A web traffic load balancer that enables you to manage traffic to your web applications.                  |
| [Automation][8]                 | A service that provides automation and configuration management across your environments.                 |
| [Batch Service][9]              | Managed task scheduler and processor.                                                                     |
| [Cognitive Services][10]         | APIs, SDKs, and services available to help build applications without AI or data science knowledge.       |
| [Container Instances][11]       | A service to deploy containers without the need to provision or manage the underlying infrastructure.     |
| [Container Service][12]         | A production-ready Kubernetes, DC/OS, or Docker Swarm cluster.                                            |
| [Cosmos DB][13]                 | A database service that supports document, key-value, wide-column, and graph databases.                   |
| [Customer Insights][14]         | Enables organizations to bring together data sets to build a 360° view of their customers.                |
| [Data Explorer][15]             | Fast and highly scalable data exploration service.                                                        |
| [Data Factory][16]              | A service to compose data storage, movement, and processing services into automated data pipelines.       |
| [Data Lake Analytics][17]       | An analytics job service that simplifies big data.                                                        |
| [Data Lake Store][18]           | A no limits data lake that powers big data analytics.                                                     |
| [Database for MariaDB][19]      | A service that provides fully managed, enterprise-ready community MariaDB database.                       |
| [Event Grid][20]                | An event routing service that allows for uniform event consumption using a publish-subscribe model.       |
| [Event Hub][21]                 | Large scale data stream managed service.                                                                   |
| [ExpressRoute][22]              | A service to extend your on-premises networks into the cloud.                                             |
| [Firewall][23]                  | Cloud-native network security to protect your Azure Virtual Network resources.                            |
| [Functions][24]                 | A service for running serverless code in response to event triggers.                                      |
| [HDInsights][25]                | A cloud service that processes massive amounts of data.                                                   |
| [IOT Hub][26]                   | Connect, monitor, and manage billions of IOT assets.                                                      |
| [Key Vault][27]                 | A service to safeguard and manage cryptographic keys and secrets used by cloud applications and services. |
| [Load Balancer][28]             | Scale your applications and create high availability for your services.                                   |
| [Logic App][29]                 | Build powerful integration solutions.                                                                     |
| [Machine Learning][30]          | Enterprise-grade machine learning service to build and deploy models faster.                              |
| [Network Interfaces][31]        | Enables VM communication with internet, Azure, and on-premises resources.                                 |
| [Notification Hubs][32]         | A push engine that allows you to send notifications to any platform from any backend.                     |
| [Public IP Address][33]         | A resource that enables inbound communication and outbound connectivity from the Internet.                |
| [Recovery Service Vault][34]    | An entity that stores the backups and recovery points created over time.                                  |
| [Redis Cache][35]               | Managed data cache.                                                                                       |
| [Relay][36]                     | Securely expose services that run in your corporate network to the public cloud.                          |
| [Cognitive Search][37]          | A search-as-a-service cloud solution that provides tools for adding a rich search experience.             |
| Storage                         | Storage for [blobs][38], [files][39], [queues][40], and [tables][41].                                     |
| [Stream Analytics][42]          | An event-processing engine to examine high volumes of data streaming from devices.                        |
| [SQL Database][43]              | Highly scalable relational database in the cloud.                                                         |
| [SQL Database Elastic Pool][44] | Manage the performance of multiple database.                                                              |
| [Synapse Analytics][45]         | An analytics service that brings together data integration, enterprise data warehousing and big data analytics. |
| [Usage and Quotas][46]          | Follow your Azure usage.                                                                                  |
| [Virtual Machine][47]           | Virtual machine management service.                                                                       |
| [Virtual Machine Scale Set][48] | Deploy, manage, and autoscale a set of identical VMs.                                                     |
| [Virtual Network][49]           | Allow Azure resources to securely communicate with each other, the internet, and on-premises networks.    |

## Setup

### Automatic

_All sites:_  
See the [Standard Azure Integration Programmatic Management Guide][50] for instructions on automatically setting up the standard Datadog integration with Azure. You can set up the integration through Terraform or the Azure CLI, deploy the Datadog Agent natively in Azure through the Datadog Azure VM Extension, and run automated scripts to enable log collection.

_US3:_  
See the [Azure Native Integration Programmatic Management Guide][51] for instructions on using Terraform to set up Datadog's Azure Native integration with the Datadog resource in Azure.

### Manual

_All sites:_  
See the [Standard Azure Integration Manual Setup Guide][52] for instructions on manually setting up the Datadog integration with Azure through the Azure portal or CLI, as well as deploying the Datadog Agent directly in Azure with the VM extension or AKS Cluster extension.

_US3:_  
See the [Azure Native Integration Manual Setup Guide][53] for instructions on manually setting up the Azure Native integration with Datadog. This includes creation of the Datadog resource in Azure, deploying the Datadog Agent directly in Azure with the VM extension or AKS Cluster extension, and optional configuration of single sign-on (SSO).

## Log collection

_All sites:_  
See the [Send Azure Logs to Datadog][54] guide for instructions on sending your Azure logs to Datadog. You can choose between an automatic or manual process to enable log collection through the Datadog-Azure function and an Azure Event Hub. You can also use an Azure Blob Storage Function to collect logs from all of your Azure App Services.

_US3:_  
See the [Send Azure Logs with the Datadog Resource][55] guide for instructions on sending your subscription level, Azure resource, and Azure Active Directory logs to Datadog.

## Data Collected

### Metrics

All standard Azure Monitor metrics plus [unique Datadog generated metrics][56].

For a detailed list of metrics, select the appropriate Azure service in the [overview section](#overview).

### Events

The Azure integration automatically collects Azure Service Health events. To view these in Datadog, navigate to the [Event explorer][57] and filter for the `Azure Service Health` namespace.

### Service Checks

The Azure integration does not include any service checks.

### Tags

Azure integration metrics, events, and service checks receive the following tags in addition to tags defined in your Azure environments:

| Integration                             | Namespace                                   | Datadog Tag Keys                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All Azure integrations                  | All                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (if applicable)                                                            |
| Azure VM integrations                   | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Azure App Service Plans                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Azure App Services Web Apps & Functions | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (linux web apps only), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure SQL DB                            | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>For replication Links only:  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Azure Usage and Quota                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

## Troubleshooting

See the [Azure Troubleshooting][58] guide.

Still need help? Contact [Datadog support][59].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/legal/restricted-service-locations/
[2]: https://docs.datadoghq.com/integrations/azure_analysis_services/
[3]: https://docs.datadoghq.com/integrations/azure_api_management/
[4]: https://docs.datadoghq.com/integrations/azure_app_services/
[5]: https://docs.datadoghq.com/integrations/azure_app_service_environment/
[6]: https://docs.datadoghq.com/integrations/azure_app_service_plan/
[7]: https://docs.datadoghq.com/integrations/azure_application_gateway/
[8]: https://docs.datadoghq.com/integrations/azure_automation/
[9]: https://docs.datadoghq.com/integrations/azure_batch/
[10]: https://docs.datadoghq.com/integrations/azure_cognitive_services/
[11]: https://docs.datadoghq.com/integrations/azure_container_instances/
[12]: https://docs.datadoghq.com/integrations/azure_container_service/
[13]: https://docs.datadoghq.com/integrations/azure_cosmosdb/
[14]: https://docs.datadoghq.com/integrations/azure_customer_insights/
[15]: https://docs.datadoghq.com/integrations/azure_data_explorer/
[16]: https://docs.datadoghq.com/integrations/azure_data_factory/
[17]: https://docs.datadoghq.com/integrations/azure_data_lake_analytics/
[18]: https://docs.datadoghq.com/integrations/azure_data_lake_store/
[19]: https://docs.datadoghq.com/integrations/azure_db_for_mariadb/
[20]: https://docs.datadoghq.com/integrations/azure_event_grid/
[21]: https://docs.datadoghq.com/integrations/azure_event_hub/
[22]: https://docs.datadoghq.com/integrations/azure_express_route/
[23]: https://docs.datadoghq.com/integrations/azure_firewall/
[24]: https://docs.datadoghq.com/integrations/azure_functions/
[25]: https://docs.datadoghq.com/integrations/azure_hd_insight/
[26]: https://docs.datadoghq.com/integrations/azure_iot_hub/
[27]: https://docs.datadoghq.com/integrations/azure_key_vault/
[28]: https://docs.datadoghq.com/integrations/azure_load_balancer/
[29]: https://docs.datadoghq.com/integrations/azure_logic_app/
[30]: https://docs.datadoghq.com/integrations/azure_machine_learning_services/
[31]: https://docs.datadoghq.com/integrations/azure_network_interface/
[32]: https://docs.datadoghq.com/integrations/azure_notification_hubs/
[33]: https://docs.datadoghq.com/integrations/azure_public_ip_address/
[34]: https://docs.datadoghq.com/integrations/azure_recovery_service_vault/
[35]: https://docs.datadoghq.com/integrations/azure_redis_cache/
[36]: https://docs.datadoghq.com/integrations/azure_relay/
[37]: https://docs.datadoghq.com/integrations/azure_search/
[38]: https://docs.datadoghq.com/integrations/azure_blob_storage/
[39]: https://docs.datadoghq.com/integrations/azure_file_storage/
[40]: https://docs.datadoghq.com/integrations/azure_queue_storage/
[41]: https://docs.datadoghq.com/integrations/azure_table_storage/
[42]: https://docs.datadoghq.com/integrations/azure_stream_analytics/
[43]: https://docs.datadoghq.com/integrations/azure_sql_database/
[44]: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/
[45]: https://docs.datadoghq.com/integrations/azure_synapse/
[46]: https://docs.datadoghq.com/integrations/azure_usage_and_quotas/
[47]: https://docs.datadoghq.com/integrations/azure_vm/
[48]: https://docs.datadoghq.com/integrations/azure_vm_scale_set/
[49]: https://docs.datadoghq.com/integrations/azure_virtual_networks/
[50]: https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/
[51]: https://docs.datadoghq.com/integrations/guide/azure-native-programmatic-management/
[52]: https://docs.datadoghq.com/integrations/guide/azure-manual-setup/
[53]: https://docs.datadoghq.com/integrations/guide/azure-native-manual-setup/
[54]: https://docs.datadoghq.com/logs/guide/azure-logging-guide/
[55]: https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/
[56]: https://www.datadoghq.com/blog/datadog-generated-metrics-azure/
[57]: https://app.datadoghq.com/event/explorer
[58]: https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/
[59]: https://docs.datadoghq.com/help/

