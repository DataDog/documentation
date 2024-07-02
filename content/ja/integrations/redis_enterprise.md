---
"app_id": "redis-enterprise"
"app_uuid": "b569beaa-dbf6-4c40-a640-fab0ea2b9cab"
"assets":
  "dashboards":
    "redis-enterprise-database": assets/dashboards/redis_enterprise_database.json
    "redis-enterprise-node": assets/dashboards/redis_enterprise_node.json
    "redis-enterprise-overview": assets/dashboards/redis_enterprise_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": rdse.bdb_conns
      "metadata_path": metadata.csv
      "prefix": rdse
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "7769393"
    "source_type_name": Redis Enterprise V2
  "logs": {}
"author":
  "homepage": "https://redis.com/redis-enterprise-software/overview"
  "name": Redis, Inc.
  "sales_email": press@redis.com
  "support_email": support@redis.com
"categories":
- ai/ml
- caching
- data stores
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "redis_enterprise"
"integration_id": "redis-enterprise"
"integration_title": "Redis Enterprise"
"integration_version": "1.0.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "redis_enterprise"
"public_title": "Redis Enterprise"
"short_description": "Redis Enterprise Datadog Integration"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::AI/ML"
  - "Category::Caching"
  - "Category::Data Stores"
  - "Offering::Integration"
  - "Queried Data Type::Metrics"
  - "Submitted Data Type::Metrics"
  "configuration": "README.md#Setup"
  "description": Redis Enterprise Datadog Integration
  "media":
  - "caption": graph of node CPU usage
    "image_url": images/datadog-detail-node-cpu.png
    "media_type": image
  - "caption": graph of node memory usage
    "image_url": images/datadog-detail-node-memory.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Redis Enterprise
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

Redis is a fast, versatile data store that supports a variety of data structures, including strings, hashes, lists, sets, streams, and more. It also offers programmability, extensibility, persistence, clustering, and high availability. The community edition of Redis adds additional data models and capabilities, which include vector search, probabilistic data structures, JSON support, and full-text search.

This integration works with on-premsises and private cloud installations of [Redis Enterprise][1].
The integration provides metrics for three critical cluster components: databases, nodes, and shards. This allows you to monitor database throughput, memory utilization, CPU usage, connection counts, replication health, and a variety of additional metrics within Datadog.
You can use this information to understand the overall health of your Redis Enterprise clusters, diagnose application performance issues, and prevent downtime.

For a full list of supported metrics, see the **Metrics** section below.

## Setup

### Installation

1. Run the following command to install the Agent integration:
   ```shell
   datadog-agent integration install -t datadog-redis_enterprise==1.0.0
   ```

2. Configure the integration by setting the `openmetrics_endpoint` to your cluster's master node. See [Integration][2] for further information.

3. [Restart][3] the agent.


### Configuration

Set the `openmetrics_endpoint` to point to your cluster. See the [example][4].


### Validation

1. Ensure you can ping the machine, particularly in a cloud environment. Run `wget --no-check-certificate <endpoint>` or `curl -k <endpoint>` to ensure that you can receive metrics.

2. Check the [status][5] of the Datadog agent.


## 収集データ

The current release gathers all metrics for databases, nodes, and shards.


### Metrics
{{< get-metrics-from-git "redis_enterprise" >}}



### Service Checks

Redis Enterprise does not include any service checks.


### Events

Redis Enterprise does not include any events.


## Troubleshooting

Need help? Please contact [Redis Support][7].

[1]: https://redis.com/redis-enterprise-software/overview/
[2]: https://docs.datadoghq.com/getting_started/integrations/
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/datadog_checks/redis_enterprise/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/metadata.csv
[7]: https://redis.io/support/

