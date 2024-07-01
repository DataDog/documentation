---
"app_id": "lighttpd"
"app_uuid": "3d7ace6a-9efd-4d21-b4e6-a9956512a875"
"assets":
  "dashboards":
    "lighttpd": "assets/dashboards/lighttpd_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "lighttpd.performance.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "lighttpd."
    "process_signatures":
    - "lighttpd"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "58"
    "source_type_name": "Lighttpd"
  "saved_views":
    "lighttpd_processes": "assets/saved_views/lighttpd_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "lighttpd"
"integration_id": "lighttpd"
"integration_title": "Lighttpd"
"integration_version": "3.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "lighttpd"
"public_title": "Lighttpd"
"short_description": "Track uptime, bytes served, requests per second, response codes, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track uptime, bytes served, requests per second, response codes, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Lighttpd"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Lighttpd Dashboard][1]

## Overview

The Agent's lighttpd check tracks uptime, bytes served, requests per second, response codes, and more.

## Setup

### Installation

The Lighttpd check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Lighttpd servers.

In addition, install `mod_status` on your Lighttpd servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `lighttpd.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample lighttpd.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param lighttpd_status_url - string - required
     ## Status url of your Lighttpd server.
     #
     - lighttpd_status_url: http://localhost/server-status?auto
   ```

2. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                           |
| -------------------- | --------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `lighttpd`                                                      |
| `<INIT_CONFIG>`      | blank or `{}`                                                   |
| `<INSTANCE_CONFIG>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `lighttpd.d/conf.yaml` file to start collecting your lighttpd Logs:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: lighttpd
   ```

   Change the `path` parameter value and configure it for your environment.
   See the [sample lighttpd.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

### Validation

[Run the Agent's `status` subcommand][5] and look for `lighttpd` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "lighttpd" >}}


### Events

The Lighttpd check does not include any events.

### Service Checks
{{< get-service-checks-from-git "lighttpd" >}}


## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

- [Monitor Lighttpd web server metrics with Datadog][7].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard_2.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics
