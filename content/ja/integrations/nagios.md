---
"app_id": "nagios"
"app_uuid": "7e61b923-1847-4c43-85cf-5f4c49ff4806"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "nagios.host.rta"
      "metadata_path": "metadata.csv"
      "prefix": "nagios."
    "process_signatures":
    - "nagios"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "3"
    "source_type_name": "Nagios"
  "saved_views":
    "nagios_processes": "assets/saved_views/nagios_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "notifications"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/nagios/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "nagios"
"integration_id": "nagios"
"integration_title": "Nagios"
"integration_version": "1.13.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "nagios"
"public_title": "Nagios"
"short_description": "Send Nagios service flaps, host alerts, and more to your Datadog event stream."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Category::Notifications"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Send Nagios service flaps, host alerts, and more to your Datadog event stream."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Nagios"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Send events from your Nagios-monitored infrastructure to Datadog for richer alerting and to help correlate Nagios events with metrics from your Datadog-monitored infrastructure.

This check watches your Nagios server's logs and sends events to Datadog for the following:

- Service flaps
- Host state changes
- Passive service checks
- Host and service downtimes

This check can also send Nagios performance data as metrics to Datadog.

## Setup

### Installation

The Nagios check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your Nagios servers.

### Configuration

Follow the instructions below to configure this check for an Agent running on a host. For containerized environments, see the [Containerized](#containerized) section.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

1. Edit the `nagios.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample nagios.d/conf.yaml][2] for all available configuration options.

2. [Restart the Agent][3] to start sending Nagios events and (optionally) performance data metrics to Datadog.

**Note**: The Nagios check can potentially emit [custom metrics][4], which may impact your [billing][5].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `nagios`                                     |
| `<INIT_CONFIG>`      | blank or `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"nagios_conf": "/etc/nagios3/nagios.cfg"}` |

**Note**: The containerized Agent should be able to access the `/etc/nagios3/nagios.cfg` file to enable the Datadog-Nagios integration.

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][2] and look for `nagios` under the Checks section.

## Data Collected

### Metrics

With the default configuration, the Nagios check doesn't collect any metrics. But if you set `collect_host_performance_data` and/or `collect_service_performance_data` to `True`, the check watches for Nagios performance data and submits it as gauge metrics to Datadog.

### Log collection

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

    ```yaml
    logs_enabled: true
    ```

2. Add this configuration block to your `nagios.d/conf.yaml` file to start collecting your Nagios logs:

    ```yaml
    logs:
      - type: file
        path: /opt/nagios/var/log/nagios.log
        source: nagios
    ```

    Change the `path` parameter value based on your environment, see `log_file` value in your nagios configuration file. See the [sample nagios.d/conf.yaml][3] for all available configuration options.

3. [Restart the Agent][4].

### Events

The check watches the Nagios events log for log lines containing these strings, emitting an event for each line:

- SERVICE FLAPPING ALERT
- ACKNOWLEDGE_SVC_PROBLEM
- SERVICE ALERT
- HOST ALERT
- ACKNOWLEDGE_HOST_PROBLEM
- SERVICE NOTIFICATION
- HOST DOWNTIME ALERT
- PROCESS_SERVICE_CHECK_RESULT
- SERVICE DOWNTIME ALERT

### Service Checks

The Nagios check does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][5].

## Further Reading

- [Understand your Nagios alerts with Datadog][6]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://github.com/DataDog/integrations-core/blob/master/nagios/datadog_checks/nagios/data/conf.yaml.example
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/help/
[6]: https://www.datadoghq.com/blog/nagios-monitoring
