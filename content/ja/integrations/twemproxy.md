---
"app_id": "twemproxy"
"app_uuid": "34f4e81a-6fd2-48fd-a10c-5bffb75bbd0e"
"assets":
  "dashboards":
    "Twemproxy - Overview": "assets/dashboards/twemproxy_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "twemproxy.total_connections"
      "metadata_path": "metadata.csv"
      "prefix": "twemproxy."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10070"
    "source_type_name": "Twemproxy"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/twemproxy/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "twemproxy"
"integration_id": "twemproxy"
"integration_title": "Twemproxy"
"integration_version": "1.15.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "twemproxy"
"public_title": "Twemproxy"
"short_description": "Visualize twemproxy performance and correlate with the rest of your applications"
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
  "description": "Visualize twemproxy performance and correlate with the rest of your applications"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Twemproxy"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Track overall and per-pool stats on each of your Twemproxy servers. This Agent check collects metrics for client and server connections and errors, request and response rates, bytes in and out of the proxy, and more.

## Setup

### Installation

The Agent's Twemproxy check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your Twemproxy servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `twemproxy.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample twemproxy.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     - host: localhost
       port: 2222
   ```

2. [Restart the Agent][3] to begin sending Twemproxy metrics to Datadog.

##### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, you need to enable it in `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Add this configuration block to your `twemproxy.d/conf.yaml` file to start collecting your Apache Logs:

   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: twemproxy
       service: "<SERVICE_NAME>"
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample twemproxy.d/conf.yaml][2] for all available configuration options.

3. [Restart the Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/twemproxy/datadog_checks/twemproxy/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `twemproxy`                            |
| `<INIT_CONFIG>`      | blank or `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"22222"}` |

##### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes log collection documentation][2].

| Parameter      | Value                                            |
| -------------- | ------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "twemproxy", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

Run the [Agent's status subcommand][2] and look for `twemproxy` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "twemproxy" >}}


### Events

The Twemproxy check does not include any events.

### Service Checks
{{< get-service-checks-from-git "twemproxy" >}}


## Troubleshooting

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
