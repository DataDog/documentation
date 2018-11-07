---
title: Azure DB for PostgreSQL
kind: documentation
---

## Overview

Connect to Microsoft Azure in order to:

* Get metrics from Azure VMs with or without installing the Agent
* Tag your Azure VMs with Azure-specific information (e.g. location)
* Get metrics for other services: Application Gateway, App Service (Web & Mobile), Batch Service, Event Hub, IOT Hub, Logic App, Redis Cache, Server Farm (App Service Plan), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set, and many more.

Related integrations include:

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| [App Service][7] | easy-to-use service for deploying and scaling web, mobile, API and business logic applications |
| [Batch Service][8] | managed task scheduler and processor |
| [Event Hub][9] | large scale data stream managed service |
| [IOT Hub][10] | connect, monitor, and manage billions of IOT assets |
| [Logic App][11] | quickly build powerful integration solutions |
| [Redis Cache][12] | managed data cache |
| [Storage][13] | blob, file, queue, and table storage |
| [SQL Database][14] | highly scalable relational database in the cloud |
| [SQL Database Elastic Pool][15] | manage the performance of multiple databases |
| [Virtual Machine][16] | virtual machine management service |
| [Virtual Machine Scale Set][17] | deploy, manage, and autoscale a set of identical VMs |

## Setup
### Installation

You can integrate your Microsoft Azure account with Datadog using the Azure CLI tool or the Azure portal. This integration method works automatically for all Azure Clouds: Public, China, German, and Government. Simply follow the instructions below and Datadog will detect which Cloud you are using and complete the integration. 

Refer to the [primary Azure integration][1] for more information.

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| **azure.dbforpostgresql_servers.active_connections** <br/> (count) | Total active connections |
| **azure.dbforpostgresql_servers.compute_consumption_percent** <br/> (gauge) | Compute Unit percentage <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.compute_limit** <br/> (count) | Compute Unit limit |
| **azure.dbforpostgresql_servers.connections_failed** <br/> (count) | Total failed connections |
| **azure.dbforpostgresql_servers.cpu_percent** <br/> (gauge) | CPU percent <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.io_consumption_percent** <br/> (gauge) | IO percent <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.memory_percent** <br/> (gauge) | Memory percent <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.storage_limit** <br/> (gauge) | Storage limit <br/> *shown as byte* |
| **azure.dbforpostgresql_servers.storage_percent** <br/> (gauge) | Storage percentage <br/> *shown as percent* |
| **azure.dbforpostgresql_servers.storage_used** <br/> (gauge) | Storage used <br/> *shown as byte* |

[1]: /integrations/azure
[7]: https://docs.datadoghq.com/integrations/azure_app_services
[8]: https://docs.datadoghq.com/integrations/azure_batch
[9]: https://docs.datadoghq.com/integrations/azure_event_hub
[10]: https://docs.datadoghq.com/integrations/azure_iot_hub
[11]: https://docs.datadoghq.com/integrations/azure_logic_app
[12]: https://docs.datadoghq.com/integrations/azure_redis_cache
[13]: https://docs.datadoghq.com/integrations/azure_storage
[14]: https://docs.datadoghq.com/integrations/azure_sql_database
[15]: https://docs.datadoghq.com/integrations/azure_sql_elastic_pool
[16]: https://docs.datadoghq.com/integrations/azure_vm
[17]: https://docs.datadoghq.com/integrations/azure_vm_scale_set