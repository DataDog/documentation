---
"app_id": "neo4j"
"app_uuid": "f2657bb8-ded4-48f3-8095-f703cc203149"
"assets":
  "dashboards":
    "Neo4j V4 Dashboard": assets/dashboards/Neo4j4.xDefaultDashboard.json
    "Neo4j V5 Cluster Dashboard": assets/dashboards/Neo4j5ClusterDashboard.json
    "Neo4j V5 Dashboard": assets/dashboards/Neo4j5DefaultDashboard.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": neo4j.dbms.page_cache.hits
      "metadata_path": metadata.csv
      "prefix": neo4j.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10202"
    "source_type_name": Neo4j
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Neo4j
  "sales_email": support@neotechnology.com
  "support_email": support@neotechnology.com
"categories":
- data stores
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "neo4j"
"integration_id": "neo4j"
"integration_title": "Neo4j"
"integration_version": "3.0.3"
"is_public": true
"manifest_version": "2.0.0"
"name": "neo4j"
"public_title": "Neo4j"
"short_description": "Gathers Neo4j metrics"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  "configuration": "README.md#Setup"
  "description": Gathers Neo4j metrics
  "media":
  - "caption": Neo4j 5 Dashboard
    "image_url": images/Neo4j_5_Dashboard.png
    "media_type": image
  - "caption": Neo4j 5 Database
    "image_url": images/neo4j_graph.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Neo4j
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Neo4j][1] is an enterprise-strength graph database that combines native graph storage, advanced security, scalable speed-optimized architecture, and ACID compliance to ensure predictability and integrity of relationship-based queries. Neo4j stores and manages data in its more natural, connected state, maintaining data relationships that deliver lightning-fast queries, deeper context for analytics, and a pain-free modifiable data model.

Neo4j metrics enable database administrators to monitor their Neo4j deployments. DBAs want to understand the memory usage (heap and page cache), number of transactions, cluster status, database size (including number of nodes, relationsihps and properties), and query performance. 

With this integration, visualize important Neo4j metrics in our out-of-the-box dashboards and enable your DBAs to troubleshoot and monitor the health of your Neo4j databases.


## セットアップ

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### インストール

To install the neo4j check on your host:

1. Download and install the [Datadog Agent][3].
2. To install the neo4j check on your host:

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

### 構成

1. Edit the `neo4j.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your neo4j performance data. See the [sample neo4j.d/conf.yaml][4] for all available configuration options.

2. Datadog listens on port 5000 for the dogstatsd_stats_port and expvar_port. In your neo4j.conf file, you will need to change the server.discovery.listen_address and the server.discovery.advertised_address to use a port other than 5000.

3. [Restart the Agent][5].

### Validation

[Run the Agent's status subcommand][6] and look for `neo4j` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "neo4j" >}}


### サービスチェック

Service check `neo4j.prometheus.health` is submitted in the base check

### イベント

Neo4j does not include any events.


## トラブルシューティング

Need help? Contact [Neo4j support][10].

[1]: https://neo4j.com/
[2]: https://docs.datadoghq.com/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://neo4j.com/docs/operations-manual/4.4/monitoring/metrics/reference/
[8]: https://neo4j.com/docs/operations-manual/5/monitoring/metrics/reference/
[9]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[10]: mailto:support@neo4j.com

