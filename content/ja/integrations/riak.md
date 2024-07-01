---
"app_id": "riak"
"app_uuid": "9f45bc5b-ef21-4336-a44d-7891a7a35cec"
"assets":
  "dashboards":
    "riak": "assets/dashboards/riak_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "riak.memory_processes"
      "metadata_path": "metadata.csv"
      "prefix": "riak."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "50"
    "source_type_name": "Riak"
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
- "https://github.com/DataDog/integrations-core/blob/master/riak/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "riak"
"integration_id": "riak"
"integration_title": "Riak"
"integration_version": "3.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "riak"
"public_title": "Riak"
"short_description": "Track node, vnode and ring performance metrics for RiakKV or RiakTS."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Data Stores"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": "Track node, vnode and ring performance metrics for RiakKV or RiakTS."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Riak"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Riak Graph][1]

## Overview

This check lets you track node, vnode, and ring performance metrics from RiakKV or RiakTS.

## Setup

### Installation

The Riak check is included in the [Datadog Agent][2] package, so you don't need to install anything else on your Riak servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `riak.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample riak.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Riak stats url to connect to.
     #
     - url: http://127.0.0.1:8098/stats
   ```

2. [Restart the Agent][3] to start sending Riak metrics to Datadog.

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `riak.d/conf.yaml` file to start collecting your Riak logs:

   ```yaml
     logs:
       - type: file
         path: /var/log/riak/console.log
         source: riak
         service: "<SERVICE_NAME>"

       - type: file
         path: /var/log/riak/error.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}

       - type: file
         path: /var/log/riak/crash.log
         source: riak
         service: "<SERVICE_NAME>"
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: \d{4}\-\d{2}\-\d{2}
   ```

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/riak/datadog_checks/riak/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `riak`                                 |
| `<INIT_CONFIG>`      | blank or `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"url":"http://%%host%%:8098/stats"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "riak", "service": "riak", "log_processing_rules": {"type": "multi_line", "name": "new_log_Start_with_date", "pattern": "\d{4}\-\d{2}\-\d{2}"}}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `riak` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "riak" >}}


### Events

The Riak check does not include any events.

### Service Checks
{{< get-service-checks-from-git "riak" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/riak/images/riak_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
