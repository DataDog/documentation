---
"app_id": "gearman"
"app_uuid": "7e1b6c42-8f40-4f4c-8d58-a3f7f39cb3e5"
"assets":
  "dashboards":
    "gearman": "assets/dashboards/gearman_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "gearman.unique_tasks"
      "metadata_path": "metadata.csv"
      "prefix": "gearman."
    "process_signatures":
    - "gearmand"
    - "gearman"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "52"
    "source_type_name": "Gearman"
  "saved_views":
    "gearman_processes": "assets/saved_views/gearman_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "gearmand"
"integration_id": "gearman"
"integration_title": "Gearman"
"integration_version": "3.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "gearmand"
"public_title": "Gearman"
"short_description": "Track the number of jobs queued and running - in total or by task."
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track the number of jobs queued and running - in total or by task."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Gearman"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Collect Gearman metrics to:

- Visualize Gearman performance.
- Know how many tasks are queued or running.
- Correlate Gearman performance with the rest of your applications.

## Setup

### Installation

The Gearman check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your Gearman job servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `gearmand.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your Gearman performance data. See the [sample gearmand.d/conf.yaml][2] for all available configuration options.

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

2. [Restart the Agent][3]

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `gearmand`                             |
| `<INIT_CONFIG>`      | blank or `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server":"%%host%%", "port":"4730"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `gearmand.d/conf.yaml` file to start collecting your Gearman logs:

    ```yaml
    logs:
      - type: file
        path: /var/log/gearmand.log
        source: gearman
    ```

    Change the `path` parameter value based on your environment. See the [sample gearmand.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

See [Kubernetes Log Collection][4] for information on configuring the Agent for log collection in Kubernetes environments.

### Validation

[Run the Agent's `status` subcommand][5] and look for `gearmand` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "gearmand" >}}


### Events

The Gearman check does not include any events.

### Service Checks
{{< get-service-checks-from-git "gearmand" >}}


## Troubleshooting

Need help? Contact [Datadog support][6].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/kubernetes/log/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/help/
