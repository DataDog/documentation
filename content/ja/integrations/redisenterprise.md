---
"app_id": "redisenterprise"
"app_uuid": "a353f8c5-240c-48f9-b2a1-c86d2da0c07e"
"assets":
  "dashboards":
    "Redis Enterprise Active/Active Statistics": assets/dashboards/redis_enterprise_active_active.json
    "Redis Enterprise Cluster Overview": assets/dashboards/redisenterprise_cluster_top_view.json
    "Redis Enterprise Database Overview": assets/dashboards/redisenterprise_overview.json
    "Redis Enterprise Redis on Flash": assets/dashboards/redisenterprise_rof.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": true
    "metrics":
      "check": redisenterprise.total_node_count
      "metadata_path": metadata.csv
      "prefix": redisenterprise.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10190"
    "source_type_name": Redis Enterprise
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Redis
  "sales_email": github@mague.com
  "support_email": github@mague.com
"categories":
- data stores
- caching
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "redisenterprise"
"integration_id": "redisenterprise"
"integration_title": "RedisEnterprise (Deprecated)"
"integration_version": "1.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "redisenterprise"
"public_title": "RedisEnterprise (Deprecated)"
"short_description": "Redis Enterprise Observability"
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
  - "Category::Caching"
  "configuration": "README.md#Setup"
  "description": Redis Enterprise Observability
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": RedisEnterprise (Deprecated)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![img][1]

## Overview

**This integration is will be deprecated starting on September 1, 2024. Please use the latest [Redis Enterprise Datadog Integration][2] going forward. This new integration exposes all of the latest Redis Enterprise metrics and includes updated dashboards.**

This integration provides [Redis Enterprise][3] monitoring and metrics for Datadog.

### What is Redis Enterprise?

[Redis Enterprise][3] is the fully supported enterprise version of Redis. In addition to the core open source Redis feature set, Redis Enterprise adds active-active geo-distribution, multi-model database features, enhanced observability, and easier multi-tenancy management for higher uptimes.

### Redis Enterprise Datadog dashboard

Redis Enterprise's Datadog integration provides a templated view across your clusters and databases allowing for operational insight unavailable in other products. Understand usage patterns and plan for growth armed with the data necessary to make informed decisions.

#### Database overview
![overview][4]

#### Cluster overview
![overview][5]

#### Redis on Flash
![rofdash][6]

#### Active/Active Redis
![rofdash][7]

#### Redis Enterprise events
![events][8]

### Provider

![provider][9]

This integration is provided by Redis Labs.

## Setup

### Installation

If you are using Agent v7.21+ / v6.21+ follow the instructions below to install the RedisEnterprise check on your host. See the dedicated Agent guide for [installing community integrations][10] to install checks with the [Agent prior < v7.21 / v6.21][11] or the [Docker Agent][12]:

1. [Download and launch the Datadog Agent][13].
2. Run the following command to install the integrations wheel with the Agent:

   ```shell
   datadog-agent integration install -t datadog-redisenterprise==<INTEGRATION_VERSION>
   ```
  You can find the latest version on the [Datadog Integrations Release Page][14]

   **Note**: If necessary, prepend `sudo -u dd-agent` to the install command.

3. Configure your integration like [any other packaged integration][15].

### Configuration

Copy the [sample configuration][16] and update the required sections to collect data from your Redis Enterprise cluster

```yml
    ## @param host - string - required
    ## The RedisEnterprise host
    #
    host: myrediscluster.example.com

    ## @param port - integer - optional - default: 9443
    #
    port: 9443

    ## @param user - string - required
    ## The RedisEnterprise API user
    #
    username: redisadmin@example.com

    ## @param password - string - required
    ## The RedisEnterprise API credential
    #
    password: mySecretPassword
```

See the full example file for other optional settings available to match your cluster configuration.

Users can be configured according to the [documentation][17].

## 収集データ

### Metrics
{{< get-metrics-from-git "redisenterprise" >}}


### Service Checks

**`redisenterprise.running`**

The check returns:

- `OK` if the RedisEnterprise cluster API is properly responding to commands
- `CRITICAL` if the API is not properly responding

**`redisenterprise.license_check`**

The check returns:

- `OK` if the cluster license is valid for longer than 1 week.
- `WARNING` if cluster license expires in < 7 days.
- `CRITICAL` if the cluster license has expired.

**Note:** The cluster continues to operate as normal with an expired license, however, no configuration changes can be made during this time. Contact your sales representative for a renewal.

### Events

All [Redis Enterprise events][19] are collected.

## Troubleshooting

Contact the [Redis Field Engineering Team][20].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redis-enterprise.jpg
[2]: https://docs.datadoghq.com/integrations/redis_enterprise/
[3]: http://www.redislabs.com
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/dashboard.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/datadog_cluster_top_view.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/ROF_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/active_active_dashboard.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/events.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/logo-redis.png
[10]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621
[11]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentearlierversions
[12]: https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=docker
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/DataDog/integrations-extras/tags
[15]: https://docs.datadoghq.com/getting_started/integrations/
[16]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/datadog_checks/redisenterprise/data/conf.yaml.example
[17]: https://docs.redislabs.com/latest/rc/security/database-security/passwords-users-roles/
[18]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/metadata.csv
[19]: https://docs.redislabs.com/latest/rs/administering/monitoring-metrics/#cluster-alerts
[20]: mailto:redis.observability@redis.com?subject=Datadog%20Integration%20Support

