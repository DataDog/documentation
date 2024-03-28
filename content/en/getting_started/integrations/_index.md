---
title: Introduction to Integrations
kind: documentation
further_reading:
  - link: 'https://learn.datadoghq.com/courses/intro-to-integrations'
    tag: 'Learning Center'
    text: 'Introduction to Integrations'
  - link: '/integrations/'
    tag: 'Documentation'
    text: 'See a list of Datadog integrations'
---

## Overview

This is a guide for using integrations. If you are looking for information about building a new integration, see the [Create a new integration][1] page.

An integration, at the highest level, is when you assemble a unified system from units that are usually considered separately. At Datadog, you can use integrations to bring together all of the metrics and logs from your infrastructure and gain insight into the unified system as a whole—you can see pieces individually and also how individual pieces are impacting the whole.

**Note**: It's best to start collecting metrics on your projects as early in the development process as possible, but you can start at any stage.

Datadog provides three main types of integrations:

- **Agent-based** integrations are installed with the Datadog Agent and use a Python class method called `check` to define the metrics to collect.
- **Authentication (crawler) based** integrations are set up in [Datadog][2] where you provide credentials for obtaining metrics with the API. These include popular integrations like [Slack][3], [AWS][4], [Azure][5], and [PagerDuty][6].
- **Library** integrations use the [Datadog API][7] to allow you to monitor applications based on the language they are written in, like [Node.js][8] or [Python][9].

You can also build a [custom check][10] to define and send metrics to Datadog from your unique in-house system.

## Setting up an integration

The Datadog Agent package includes integrations officially supported by Datadog, in [integrations core][11]. To use those integrations, download the Datadog Agent. Community-based integrations are in [integrations extras][12]. For more information on installing or managing these integrations, see the [integrations management guide][14].

### Permissions

The `manage_integrations` permission is required to interact with an Integration tile. See [RBAC roles][45] for more information.

### API and application keys

To [install the Datadog Agent][15], you need an [API key][16]. If the Agent is already downloaded, make sure to set up the API key in the `datadog.yaml` file. To use most additional Datadog functionality besides submitting metrics and events, you need an [application key][16]. You can manage your accounts API and application keys in the [API Settings page][17].

### Installation

If you want to connect with a crawler or library based integration, navigate to that provider on the [Integrations page][18] for specific instructions on how to connect. For other supported integrations, install the [Datadog Agent][15]. Most integrations are supported for the containerized Agents: [Docker][19] and [Kubernetes][20]. After you've downloaded the Agent, go to the [Integrations page][18] to find specific configuration instructions for individual integrations.

### Configuring Agent integrations

Most configuration parameters are specific to the [individual integration][18]. Configure Agent integrations by navigating to the `conf.d` folder at the root of your Agent's configuration directory. Each integration has a folder named `<INTEGRATION_NAME>.d`, which contains the file `conf.yaml.example`. This example file lists all available configuration options for the particular integration.

To activate a given integration:

1. Rename the `conf.yaml.example` file (in the corresponding `<INTEGRATION_NAME>.d` folder) to `conf.yaml`.
2. Update the required parameters inside the newly created configuration file with the values corresponding to your environment.
3. [Restart the Datadog Agent][21].

**Note**: All configuration files follow the format documented under [@param specification][22].

For example, this is the minimum `conf.yaml` configuration file needed to collect metrics and logs from the [apache integration][23]:

```yaml
init_config:
  service: apache

instances:
    - apache_status_url: http://localhost/server-status?auto

logs:
    - type: file
      path: /var/log/apache2/access.log
      source: apache
      sourcecategory: http_web_access
    - type: file
      path: /var/log/apache2/error.log
      source: apache
      sourcecategory: http_web_access
```

To monitor multiple Apache instances in the same Agent check, add additional instances to the `instances` section:

```yaml
init_config:

instances:
    - apache_status_url: "http://localhost/server-status?auto"
      service: local-apache

    - apache_status_url: "http://<REMOTE_APACHE_ENDPOINT>/server-status?auto"
      service: remote-apache
```

#### Collection interval

The default collection interval for all Datadog standard integrations is 15 seconds. To change the collection interval, use the parameter `min_collection_interval`. For more details, see [Updating the collection interval][24].

### Tagging

Tagging is a key part of filtering and aggregating the data coming into Datadog across many sources. For more information about tagging, see [Getting started with tags][25].

If you define tags in the `datadog.yaml` file, the tags are applied to all of your integrations data. Once you've defined a tag in `datadog.yaml`, all new integrations inherit it.

For example, setting `service` in your config file is the recommended [Agent setup][26] for monitoring separate, independent systems.

To better unify your environment, it is also recommended to configure the `env` tag in the Agent. To learn more, see [Unified Service Tagging][27].

By default, the metrics reported by integrations include tags autodiscovered from the environment. For example, the metrics reported by a Redis check that runs inside a container include tags that refer to the container, such as `image_name`. You can turn this behavior off by setting the `ignore_autodiscovery_tags` parameter to `true`:
```yaml
init_config:

ignore_autodiscovery_tags: true

# Rest of the config here
```

### Validation

To validate your Agent and integrations configuration, [run the Agent's `status` subcommand][28], and look for new configuration under the Checks section.

## Installing multiple integrations

Installing more than one integration is a matter of adding the configuration information to a new `conf.yaml` file in the corresponding `<INTEGRATIONS>.d` folder. Look up the required parameters for the new integration from the `conf.yaml.example` file, add it into the new `conf.yaml` file, and then follow the same steps to validate your configuration.

## Autodetected integrations

If you set up [process collection][29], Datadog autodetects technologies running on your hosts. This identifies Datadog integrations that can help you monitor these technologies. These auto-detected integrations are displayed in the [Integrations search][2]:

{{< img src="getting_started/integrations/ad_integrations_1.png" alt="Autodetected integrations" >}}

Each integration has one of three status types:

- **Detected**: The technology is running on a host, but the integration has not been installed or configured and only partial metrics are being collected. Configure the integration for full coverage. To find a list of hosts that are running an autodetected technology, open the integrations tile and select the **Hosts** tab.
- **Installed**: This integration is installed and configured on a host.
- **Available**: All integrations that do not fall into the **Installed** and **Detected** categories.

## Security practices

For information on how Datadog handles your data, and other security considerations, see the [Security documentation][30].

## What's next?

After your first integration is set up, [explore all of the metrics][31] being sent to Datadog by your application, and use these metrics to begin setting up [dashboards][32] and [alerts][33] to monitor your data.

Also check out Datadog [Logs management][34], [APM][35], and [Synthetic Monitoring][36] solutions.

## Troubleshooting

The first step to troubleshooting an integration is to use a plugin in your code editor or use one of the many online tools to verify that the YAML is valid. The next step is to run through all of the [Agent troubleshooting][37] steps.

If you continue to have problems, contact [Datadog support][38].

## Key terms

`conf.yaml`
: You create the `conf.yaml` in the `conf.d/<INTEGRATION_NAME>.d` folder at the root of your [Agent's configuration directory][39]. Use this file to connect integrations to your system, as well as configure their settings.

custom check
: If you have a unique system that you want to monitor, or if you're going to expand the metrics already sent by an integration, you can build a [custom check][10] to define and send metrics to Datadog. However, if you want to monitor a generally available application, public service, or an open source project and the integration doesn't exist, consider [building a new integration][1] instead of a custom check.

`datadog.yaml`
: This is the main configuration file where you're defining how the Agent as a whole interacts with its own integrations and with your system. Use this file to update API keys, proxies, host tags, and other global settings.

event
: Events are informational messages about your system that are consumed by [the events explorer][40] so that you can build monitors on them.

instance
: You define and map the instance of whatever you are monitoring in the `conf.yaml` file. For example, in the [`http_check` integration][41], you're defining the name associated with the instance of the HTTP endpoint you are monitoring up and downtime. You can monitor **multiple instances** in the same integration, and you do that by defining all of the instances in the `conf.yaml` file.

`<INTEGRATION_NAME>.d`
: If you have a complex configuration, you can break it down into multiple `YAML` files, and then store them all in the `<INTEGRATION_NAME>.d` folder to define the configuration. The Agent loads any valid `YAML` file in the `<INTEGRATION_NAME>.d` folder.

logging
: If the system you are monitoring has logs, customize the logs you are sending to Datadog by using the [Log Management solution][34].

`metadata.csv`
: The file that lists and stores the metrics collected by each integration.

metrics
: The list of what is collected from your system by each integration. You can find the metrics for each integration in that integration's `metadata.csv` file. For more information about metrics, see the [Metrics][42] developer page. You can also set up [custom metrics][43], so if the integration doesn't offer a metric out of the box, you can usually add it.

parameters
: Use the parameters in the `conf.yaml` file to control accesses between your integration data source and the Agent. The individual integrations `conf.yaml.example` file has all of the required and not required parameters listed.

service check
: Service checks are a type of monitor used to track the uptime status of the service. For more information, see the [Service checks guide][44].

tagging
: [Tags][25] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/agent_integration/
[2]: https://app.datadoghq.com/account/settings
[3]: /integrations/slack/
[4]: /integrations/amazon_web_services/
[5]: /integrations/azure/
[6]: /integrations/pagerduty/
[7]: /api/
[8]: /integrations/node/
[9]: /integrations/python/
[10]: /developers/custom_checks/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[14]: /agent/guide/integration-management/
[15]: https://app.datadoghq.com/account/settings/agent/latest
[16]: /account_management/api-app-keys/
[17]: https://app.datadoghq.com/organization-settings/api-keys
[18]: /integrations/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[20]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[21]: /agent/guide/agent-commands/#restart-the-agent
[22]: /developers/integrations/check_references/#param-specification
[23]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[24]: /developers/custom_checks/write_agent_check/#updating-the-collection-interval
[25]: /getting_started/tagging/
[26]: /getting_started/agent/#setup
[27]: /getting_started/tagging/unified_service_tagging/
[28]: /agent/guide/agent-commands/#agent-status-and-information
[29]: /infrastructure/process/
[30]: /data_security/
[31]: /metrics/explorer/
[32]: /dashboards/
[33]: /monitors/
[34]: /logs/
[35]: /tracing/
[36]: /synthetics/
[37]: /agent/troubleshooting/
[38]: /help/
[39]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[40]: https://app.datadoghq.com/event/explorer
[41]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[42]: /metrics/
[43]: /metrics/custom_metrics/
[44]: /monitors/guide/visualize-your-service-check-in-the-datadog-ui/
[45]: /account_management/rbac/permissions/#integrations
