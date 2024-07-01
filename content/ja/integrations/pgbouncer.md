---
"app_id": "pgbouncer"
"app_uuid": "8aabdf7d-2d07-4d77-a76e-0ade64d8e70f"
"assets":
  "dashboards":
    "pgbouncer": "assets/dashboards/pgbouncer_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "pgbouncer.pools.sv_idle"
      "metadata_path": "metadata.csv"
      "prefix": "pgbouncer."
    "process_signatures":
    - "pgbouncer"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "118"
    "source_type_name": "PGBouncer"
  "saved_views":
    "error_warning_status": "assets/saved_views/error_warning_status.json"
    "instance_overview": "assets/saved_views/instance_overview.json"
    "pgbouncer_processes": "assets/saved_views/pgbouncer_processes.json"
    "user_overview": "assets/saved_views/user_overview.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "data stores"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pgbouncer"
"integration_id": "pgbouncer"
"integration_title": "PGBouncer"
"integration_version": "6.2.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "pgbouncer"
"public_title": "PGBouncer"
"short_description": "Track connection pool metrics and monitor traffic to and from your application."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Track connection pool metrics and monitor traffic to and from your application."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "PGBouncer"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

The PgBouncer check tracks connection pool metrics and lets you monitor traffic to and from your application.

## Setup

### Installation

The PgBouncer check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your PgBouncer nodes.

This check needs an associated user to query your PgBouncer instance:

1. Create a Datadog user in your PgBouncer `pgbouncer.ini` file:

   ```ini
   stats_users = datadog
   ```

2. Add an associated password for the `datadog` user in your PgBouncer `userlist.txt` file:

   ```text
   "datadog" "<PASSWORD>"
   ```

3. To verify the credentials, run the following command:

   ```shell
   psql -h localhost -U datadog -p 6432 pgbouncer -c \
   "SHOW VERSION;" \
   && echo -e "\e[0;32mpgBouncer connection - OK\e[0m" \
   || echo -e "\e[0;31mCannot connect to pgBouncer\e[0m"
   ```

   When it prompts for a password, enter the password you added to the `userlist.txt`.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `pgbouncer.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample pgbouncer.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url (ie. "pgbouncer")
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

   **Note**: If your instance of PgBouncer does not have SSL support, replace `sslmode=require` with `sslmode=allow` to avoid server errors. For details, see the Postgres documentation on [SSL support][3].

2. [Restart the Agent][4].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `pgbouncer.d/conf.yaml` file to start collecting your Pgbouncer logs:

   ```yaml
   logs:
     - type: file
       path: /var/log/postgresql/pgbouncer.log
       source: pgbouncer
       service: "<SERVICE_NAME>"
   ```

   Change the `path` and `service` parameter values and configure them for your environment. See the [sample pgbouncer.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][5].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[3]: https://www.postgresql.org/docs/9.1/libpq-ssl.html
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `pgbouncer`                                                                                            |
| `<INIT_CONFIG>`      | blank or `{}`                                                                                          |
| `<INSTANCE_CONFIG>`  | `{"database_url": "postgresql://datadog:<PASSWORD>@%%host%%:%%port%%/<DATABASE_URL>?sslmode=require"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][2] and look for `pgbouncer` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "pgbouncer" >}}


**Note**: Not all metrics are available with all versions of PgBouncer.

### Events

The PgBouncer check does not include any events.

### Service Checks
{{< get-service-checks-from-git "pgbouncer" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
