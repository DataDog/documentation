---
"app_id": "vertica"
"app_uuid": "c5946789-de76-4ec6-9485-db83dd66fd28"
"assets":
  "dashboards":
    "Vertica Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": vertica.connection.active
      "metadata_path": metadata.csv
      "prefix": vertica.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10072"
    "source_type_name": Vertica
  "monitors":
    "[Vertica] Nodes down above K-safety level": assets/monitors/vertica_replication_safety.json
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
- "https://github.com/DataDog/integrations-core/blob/master/vertica/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "vertica"
"integration_id": "vertica"
"integration_title": "Vertica"
"integration_version": "4.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "vertica"
"public_title": "Vertica"
"short_description": "Monitor Vertica projection storage, license usage, and more."
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
  "description": Monitor Vertica projection storage, license usage, and more.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Vertica
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Vertica][1] through the Datadog Agent.

## Setup

### Installation

The Vertica check is included in the [Datadog Agent][2] package. No additional installation is needed on your server.

### Configuration

Edit the `vertica.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your vertica performance data. See the example [vertica.d/conf.yaml][3] for all available configuration options.

#### Enabling SSL

The Vertica integration supports connecting to Vertica through SSL. To enable this, set `use_tls` in `conf.yaml` to `true`. 

**Note**: For Vertica integration versions <=1.9.0, set `tls_verify` to `true` instead. For legacy support, if `tls_verify` is explicitly set to `true`, `use_tls` is set to `true`.

#### Prepare Vertica

Create a database user for the Datadog Agent. From [vsql][4], connect to the database as a superuser. Then run the `CREATE USER` statement.

```text
CREATE USER datadog IDENTIFIED BY '<PASSWORD>';
```

The user used to connect to the database must be granted the [SYSMONITOR][5] role in order to access the monitoring system tables.

```text
GRANT SYSMONITOR TO datadog WITH ADMIN OPTION;
```

As the metrics for current license usage use the values from the most recent [audit][6], Datadog recommends scheduling audits to occur as often as possible. For more information, see the [Vertica audit license guide][7].

[Restart the Agent][8] to start sending Vertica metrics to Datadog.

#### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `vertica.d/conf.yaml` file to start collecting your Vertica logs:

    ```yaml
    logs:
      - source: vertica
        type: file
        path: "/<CATALOG_PATH>/<DATABASE_NAME>/<NODE_NAME>_catalog/vertica.log"
        service: vertica
    ```

3. [Restart the Agent][8].

### Validation

[Run the Agent's status subcommand][9] and look for `vertica` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "vertica" >}}


### Events

Vertica does not include any events.

### Service Checks
{{< get-service-checks-from-git "vertica" >}}


## Troubleshooting

Need help? Contact [Datadog support][12].


[1]: https://www.vertica.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/vertica/datadog_checks/vertica/data/conf.yaml.example
[4]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/Glossary/vsql.htm
[5]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/DBUsersAndPrivileges/Roles/SYSMONITORROLE.htm
[6]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/SQLReferenceManual/Functions/VerticaFunctions/LicenseManagement/AUDIT_LICENSE_SIZE.htm
[7]: https://www.vertica.com/docs/9.2.x/HTML/Content/Authoring/AdministratorsGuide/Licensing/MonitoringDatabaseSizeForLicenseCompliance.htm
[8]: https://docs.datadoghq.com/agent/guide/agent-commands/?#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/agent/guide/agent-commands/?#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/vertica/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/vertica/assets/service_checks.json
[12]: https://docs.datadoghq.com/help/

