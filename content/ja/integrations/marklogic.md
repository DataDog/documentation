---
"app_id": "marklogic"
"app_uuid": "92342b09-db9a-4542-b442-76bb9b7f716e"
"assets":
  "dashboards":
    "MarkLogic - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": marklogic.hosts.total_hosts
      "metadata_path": metadata.csv
      "prefix": marklogic.
    "process_signatures":
    - MarkLogic
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10124"
    "source_type_name": MarkLogic
  "monitors":
    "Marklogic high load": assets/monitors/marklogic_high_load.json
    "Marklogic long requests": assets/monitors/marklogic_long_requests.json
    "Marklogic low cache": assets/monitors/marklogic_low_cache.json
  "saved_views":
    "marklogic_processes": assets/saved_views/marklogic_processes.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- data stores
- log collection
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/marklogic/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "marklogic"
"integration_id": "marklogic"
"integration_title": "MarkLogic"
"integration_version": "4.2.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "marklogic"
"public_title": "MarkLogic"
"short_description": "Tracks metrics about MarkLogic databases, forests, hosts and servers."
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
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Tracks metrics about MarkLogic databases, forests, hosts and servers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": MarkLogic
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [MarkLogic][1] through the Datadog Agent. MarkLogic Server is a multi-model database designed to be a data hub for operational and analytical data.

## Setup

Follow the instructions below to install and configure this check for an Agent running on a host. For containerized environments, see the [Autodiscovery Integration Templates][2] for guidance on applying these instructions.

### Installation

The MarkLogic check is included in the [Datadog Agent][3] package.
No additional installation is needed on your server.

#### Prepare MarkLogic

Using the API or the Admin interface, create a user for the Datadog Agent with the [`manage-user`][4] role permissions at minimum.
If you plan to use the `enable_health_service_checks` configuration, give the Datadog MarkLogic user at least the [`manage-admin`][5] role.

##### API

1. Create the Datadog user by modifying this request with your specific values:
    ```shell
    curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
    ```
    Use the correct `<ADMIN_USER>` and `<ADMIN_PASSWORD>`, and replace `<USER>` and `<PASSWORD>` with the username and password that the Datadog Agent uses.
    For more details, see the MarkLogic documentation: [POST /manage/v2/users][6].

2. To verify the user was created with enough permissions:
    ```shell
    curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
    ```

##### Admin interface

1. Log into the QConsole with an admin account. By default, the QConsole is available at `http://<HOSTNAME>:8000/qconsole`.

2. Select `Security` as Database and `XQuery` as query type.

3. Run this query, replacing `<USER>` and `<PASSWORD>` with the ones that the Datadog Agent uses:
    ```
    xquery version "1.0-ml";
    import module namespace sec="http://marklogic.com/xdmp/security" at 
        "/MarkLogic/security.xqy";

    sec:create-user(
        "<USER>",
        "Datadog Agent user",
        "<PASSWORD>",
        "manage-user",
        (xdmp:permission("security", "read")),
        ("http://marklogic.com/dev_modules"))

    ```
   For more details, see the MarkLogic documentation: [sec:create-user][7].

4. To verify that the user was created with enough permissions, use `<USER>` and `<PASSWORD>` to authenticate at `http://<HOSTNAME>:8002` (default port).

### Configuration

#### Host

1. Edit the `marklogic.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your MarkLogic performance data. See the [sample `marklogic.d/conf.yaml` file][8] for all available configuration options. For user-related settings in the config file, use the Datadog Agent user you created.

2. [Restart the Agent][9].

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `marklogic.d/conf.yaml` file to start collecting your MarkLogic logs:

   ```yaml
     logs:
       - type: file
         path: /var/opt/MarkLogic/Logs/ErrorLog.txt
         source: marklogic
       - type: file
         path: /var/opt/MarkLogic/Logs/80002_AccessLog.txt
         source: marklogic
   ```

    Change the `path` value and configure it for your environment. See the [sample `marklogic.d/conf.yaml` file][8] for all available configuration options.

3. [Restart the Agent][9].

### Validation

Run the [Agent's status subcommand][10] and look for `marklogic` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "marklogic" >}}


### Events

MarkLogic does not include any events.

### Service Checks
{{< get-service-checks-from-git "marklogic" >}}


## Troubleshooting

Need help? Contact [Datadog support][13].


[1]: https://www.marklogic.com
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197
[5]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243
[6]: https://docs.marklogic.com/REST/POST/manage/v2/users
[7]: https://docs.marklogic.com/sec:create-user
[8]: https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/marklogic/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/marklogic/assets/service_checks.json
[13]: https://docs.datadoghq.com/help

