---
title: Introduction to Integrations
kind: documentation
aliases:
- "/getting_started/integrations"
further_reading:
- link: "https://learn.datadoghq.com/"
  tag: "Learning Center"
  text: "Introduction to Datadog"
- link: "/integrations/"
  tag: "Integrations"
  text: "Datadog's full list of integrations"
---
* [Setting up an integration](#setting-up-an-integration)
  * [API and Application keys](#api-and-application-keys)
  * [Installation](#installation)
  * [Configuring Agent integrations](#configuring-agent-integrations)
  * [Tagging](#tagging)
  * [Validation](#validation)
* [Installing multiple integrations](#installing-multiple-integrations)
* [Security practices](#security-practices)
* [What's next?](#whats-next)
* [Troubleshooting](#troubleshooting)
* [Key terms](#key-terms)
* [Further Reading](#further-reading)

This is a guide for using integrations, if you are looking for information about building a new integration, see the [Create a new integration][1] page.

An integration, at the highest level, is when you assemble a unified system from units that are usually considered separately. At Datadog, you can use integrations to bring together all of the metrics and logs from your infrastructure and gain insight into the unified system as a whole — you can see pieces individually and also how individual pieces are impacting the whole.

**Note**: It's best to start collecting metrics on your projects as early in the development process as possible, but you can start at any stage.

Datadog provides three main types of integrations:

* **Agent-based integrations** are installed with the Datadog Agent and use a Python class method called `check` to define the metrics to collect.
* **Authentication (crawler) based integrations** are set up in the [Datadog App][2] where you provide credentials for obtaining metrics with the API. These include popular integrations like [Slack][3],[AWS][4],[Azure][5], and [PagerDuty][6].
* **Library integrations** use the [Datadog API][7] to allow you to monitor applications based on the language they are written in, like [Node.js][8], or [Python][9].

You can also build a [custom check][10] to define and send metrics to Datadog from your unique in-house system.

## Setting up an integration

The Datadog Agent package includes integrations officially supported by Datadog, in [integrations core][11]. To use the integrations in integrations core, download the Datadog agent. Community-based integrations are in [integrations extras][12], and to use those, you need to download the [developer toolkit][13]. For more information on installing or managing these integrations, see the [integrations management guide][14].

### API and Application keys

In order to [install the Datadog Agent][15], you need an [API key][16]. If the Agent is already downloaded, make sure to set up the API key in the `datadog.yaml` file. To use most additional Datadog functionality besides submitting metrics and events, you need an [application key][16]. You can manage your accounts API and application keys in the [API Settings page][17] of the UI.

### Installation

If you want to connect with a crawler or library based integration, navigate to that provider on the [Integrations page][18] for specific instructions on how to connect. For other supported integrations, install the [Datadog Agent][19]. Most integrations are supported on our containerized agents: [Docker][20], and [Kubernetes][21]. After you've downloaded the Agent, go to the [Integrations page][18] section to find specific configuration instructions for individual integrations.

### Configuring Agent integrations

Configurations are specific to [individual integrations][18]. In the `conf.d/<INTEGRATION_NAME>.d` folder at the root of your Agent's configuration directory, there is a folder named `<INTEGRATION_NAME>.d` for each officially supported Agent integration which contains a sample `conf.yaml.example` that lists all available configuration options for this particular integration.

To activate a given integration:

1. Rename the `conf.yaml.example` file (in the corresponding `<INTEGRATION_NAME>.d` folder) to `conf.yaml`.
2. Update the required parameters inside the newly created configuration file with the values corresponding to your environment.
3. [Restart the Datadog Agent][22].

**Note**: All configuration files follow the format documented in the [parameters documentation][23].

For example, this is the minimum `conf.yaml` configuration file needed to collect metrics and logs from the [apache integration][24]:

```
init_config:

instances:

  - apache_status_url: http://localhost/server-status?auto

logs:
  - type: file
    path: /var/log/apache2/access.log
    source: apache
    sourcecategory: http_web_access
    service: apache
  - type: file
    path: /var/log/apache2/error.log
    source: apache
    sourcecategory: http_web_access
```

To create multiple instances in the same Agent check to monitor two Apache services, create a new instance with a `-` in the `instances:` section:

```
init_config:

instances:

  - apache_status_url: http://localhost/server-status?auto

  - apache_status_url: http://<REMOTE_APACHE_ENDPOINT>/server-status?auto
```

### Tagging

Tagging is a key part of filtering and aggregating the data coming into Datadog across many sources. You can assign tags in configuration files, in environment variables, in the UI, the API, and in DogStatsD. If you define tags in the `datadog.yaml` file, the tags are applied to all of your integrations data. Once you've defined the tag in `datadog.yaml`, all new integrations inherit it. If you use a tag environment variable, it applies to all integrations. If you define tags in the corresponding integrations configuration file, it only applies to that specific integration. If you use tags in containers, it applies only to that container. For more information about tagging, see [Getting started with tags][25].

### Validation

To validate your Agent and integrations configuration, [run the Agent's `status` subcommand][26], and look for new configuration under the Checks section.

## Installing multiple integrations

Installing more than one integration is a matter of adding the configuration information to a new `conf.yaml` file in the corresponding `<INTEGRATIONS>.d` folder. Look up the required parameters for the new integration from the `conf.yaml.example` file, add it into the new `conf.yaml` file, and then follow the same steps to validate your configuration.

## Security practices

For information on how Datadog handles your data, and other security considerations, see our [Security documentation][27].

## What's next?

Now that you have your first integrations set up, you can start [exploring all of the metrics][28] being sent by Datadog to your application, and use these metrics to begin setting up [graphs][29] and [alerts][30] to monitor your data.

Also check out our [Logs management][31], [APM][32], and [Synthetics][33] solutions.

## Troubleshooting

The first step to troubleshooting an integration is to use a plugin in your code editor or use one of the many online tools to verify that the YAML is valid. The next step is to run through all of the [Agent troubleshooting][34] steps.

If you continue to have problems, reach out to [our awesome Support team][35].

## Key terms

| Term                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **conf.yaml**          | You create the `conf.yaml` in the `conf.d/<INTEGRATION_NAME>.d` folder at the root of your [Agent's configuration directory][36]. Use this file to connect integrations to your system, as well as configure their settings.                                                                                                                                                                                                                                       |
| **custom check**       | If you have a unique system that you want to monitor, or if you're going to expand the metrics already sent by an integration, you can build a [custom check][10] to define and send metrics to Datadog. However, if you want to monitor a generally available application, public service, or an open source project, and we don't have an integration that already exists for it, you should consider [building a new integration][1] instead of a custom check. |
| **datadog.yaml**       | This is the main configuration file where you're defining how the Agent as a whole interacts with its own integrations and with your system. Use this file to update API keys, Proxys, host tags, and other global settings.                                                                                                                                                                                                                                       |
| **event**              | Events are informational messages about your system that are consumed by [the events stream][37] so that you can build monitors on them.                                                                                                                                                                                                                                                                                                                           |
| **instance**           | You define and map the instance of whatever you are monitoring in the `conf.yaml` file. For example, in the [`http_check` integration][38], you're defining the name associated with the instance of the HTTP endpoint you are monitoring up and downtime. You can monitor **multiple instances** in the same integration, and you do that by defining all of the instances in the `conf.yaml` file.                                                               |
| **integration_name.d** | If you have a complex configuration, you can break it down into multiple `YAML` files, and then store them all in the `<INTEGRATION_NAME>.d` folder to define the configuration. The Agent loads any valid `YAML` file in the `<INTEGRATION_NAME>.d` folder.                                                                                                                                                                                                       |
| **logging**            | If the system you are monitoring has logs, you can customize the logs you are sending to Datadog and use our [Logging Management solution][31] to manage and analyze them.                                                                                                                                                                                                                                                                                         |
| **metadata.csv**       | The file that lists and stores the metrics collected by each integration.                                                                                                                                                                                                                                                                                                                                                                                          |
| **metrics**            | The list of what is collected from your system by each integration. You can find the metrics for each integration in that integrations `metadata.csv` file. For more information about metrics, see the [Metrics][39] developer page. You can also set up [custom metrics][40], so if the integration doesn't offer a metric out of the box, you can usually add it.                                                                                               |
| **parameters**         | Use the parameters in the `conf.yaml` file to control accesses between your integration data source and the Agent. The individual integrations `conf.yaml.example` file has all of the required and not required parameters listed.                                                                                                                                                                                                                                |
| **service check**      | Service checks are a type of monitor used to track the uptime status of the service. For more information, see the [Service checks guide][41].                                                                                                                                                                                                                                                                                                                     |
| **tagging**            | [Tags][25] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.                                                                                                                                                                                                                                                                                                                                      |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/integrations/new_check_howto
[2]: https://app.datadoghq.com/account/settings
[3]: /integrations/slack
[4]: /integrations/amazon_web_services
[5]: /integrations/azure
[6]: /integrations/pagerduty
[7]: /api
[8]: /integrations/node
[9]: /integrations/python
[10]: /developers/write_agent_check/
[11]: https://github.com/DataDog/integrations-core
[12]: https://github.com/DataDog/integrations-extras
[13]: /developers/integrations/new_check_howto/#developer-toolkit
[14]: /agent/guide/integration-management
[15]: https://github.com/DataDog/dd-agent
[16]: /account_management/api-app-keys
[17]: https://app.datadoghq.com/account/settings#api
[18]: /integrations
[19]: https://app.datadoghq.com/account/settings#agent
[20]: https://app.datadoghq.com/account/settings#agent/docker
[21]: https://app.datadoghq.com/account/settings#agent/kubernetes
[22]: /agent/guide/agent-commands/#restart-the-agent
[23]: /developers/integrations/new_check_howto/#param-specification
[24]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[25]: /tagging
[26]: /agent/guide/agent-commands/#agent-status-and-information
[27]: /security
[28]: /graphing/metrics/explorer
[29]: /graphing
[30]: /monitors
[31]: /logs
[32]: /tracing
[33]: /synthetics
[34]: /agent/troubleshooting/
[35]: /help
[36]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[37]: https://app.datadoghq.com/event/stream
[38]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[39]: /developers/metrics
[40]: /developers/metrics/custom_metrics
[41]: /monitors/guide/visualize-your-service-check-in-the-datadog-ui
