---
"app_id": "squid"
"app_uuid": "de18c581-69ee-48cf-ba23-7794bfb7a4bd"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "squid.cachemgr.cpu_time"
      "metadata_path": "metadata.csv"
      "prefix": "squid."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10022"
    "source_type_name": "Squid"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/squid/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "squid"
"integration_id": "squid"
"integration_title": "Squid"
"integration_version": "2.5.1"
"is_public": true
"manifest_version": "2.0.0"
"name": "squid"
"public_title": "Squid"
"short_description": "Track metrics from your squid-cache servers with Datadog"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track metrics from your squid-cache servers with Datadog"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Squid"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors [Squid][1] metrics from the Cache Manager through the Datadog Agent.

## Setup

### Installation

The Agent's Squid check is included in the [Datadog Agent][2] package. No additional installation is needed on your Squid server.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `squid.d/conf.yaml`, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample squid.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit this configuration block at the bottom of your `squid.d/conf.yaml` file:

   ```yaml
   logs:
     - type: file
       path: /var/log/squid/cache.log
       service: "<SERVICE-NAME>"
       source: squid
     - type: file
       path: /var/log/squid/access.log
       service: "<SERVICE-NAME>"
       source: squid
   ```

    Change the `path` and `service` parameter values and configure them for your environment.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/squid/datadog_checks/squid/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

##### Metric collection

| Parameter            | Value                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `squid`                                                                |
| `<INIT_CONFIG>`      | blank or `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"name": "<SQUID_INSTANCE_NAME>", "host": "%%host%%", "port":"3128"}` |

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][2].

| Parameter      | Value                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "squid", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][3] and look for `squid` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "squid" >}}


### Events

The Squid check does not include any events.

### Service Checks
{{< get-service-checks-from-git "squid" >}}


## Troubleshooting

Need help? Contact [Datadog support][4].



[1]: http://www.squid-cache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
