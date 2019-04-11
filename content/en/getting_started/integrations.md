---
title: Introduction to Integrations
kind: documentation
further_reading:
- link: "https://learn.datadoghq.com/"
  tag: "Learning Center"
  text: "Introduction to Datadog"
- link: "/integrations/"
  tag: "Integrations"
  text: "Datadog's full list of integrations"
---

This is a guide for using integrations, if you are looking for information about building a new integration, see the [Create a new integration][1] page.

An integration, at the highest level, is when you assemble a unified system from units that are usually considered separately. At Datadog, you can use integrations to bring together all of the units of your infrastructure and gain insight into the unified system as a whole—you can see pieces individually and also how individual pieces are impacting the whole.

* Datadog supports over 250 integrations.
* Even more Agent integrations have been built by our open source community, in [integrations extras][2].
* Find all available integrations on the [Integrations page in the app][3].
* You can build your own integration following the instructions on the [Create a new integration][1] page.
* The Agent is [open source][4] and you can [create your own custom check][5].

Datadog provides three main types of integrations:

* Agent-based integrations are installed with the Datadog Agent and use a Python class called `check` to define the metrics to collect.
* Authentication (crawler) based integrations are set up in the [Datadog App][6] where you provide credentials for obtaining metrics with the API. These include popular integrations like [Slack][7],[AWS][8],[Azure][9], and [PagerDuty][10].
* Library integrations use the [Datadog API][11] to allow you to monitor applications based on the language they are written in, like [Node.js][12], or [Python][13].

You can also build a [custom check][5] to define and send metrics to Datadog. Custom checks are best used for less complex monitoring of unique systems.

It's best to start collecting metrics on your projects as early in the development process as possible, but you can start at any stage.

### Key terms

| Term         | Description |
| ------------ | ----------- |
|**parameters** | Use the parameters in the `conf.yaml` file to control accesses between your integration data source and the Agent. The individual integrations `conf.yaml.example` file has all of the required and not required parameters listed. |
|**conf.yaml** | You create the `conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][14]. Use this file to connect integrations to your system, as well as configure their settings. Nonrequired parameters are commented out.|
|**integration_name.d**| If you have a complex configuration, you can break it down into multiple `YAML` files, and then store them all in the `<INTEGRATIONS_NAME>.d` folder to define the configuration. The Agent loads any valid `YAML` file in the `<INTEGRATIONS_NAME>.d` folder. |
|**instance** | You define and map the instance of whatever you are monitoring in the `conf.yaml` file. For example, in the [`http_check` integration][15], you're defining the name associated with the instance of the HTTP endpoint you are monitoring up and downtime. You can monitor **multiple instances** in the same integration, and you do that by defining all of the instances in the `conf.yaml` file. |
|**metrics** | The list of what is collected from your system by each integration. You can find the metrics for each integration in that integrations `metadata.csv` file. For more information about metrics, see the [Metrics][16] developer page. You can also set up [custom metrics][17], so if the integration doesn't offer a metric out of the box, you can usually add it.|
|**metadata.csv** | The file that lists and stores the metrics collected by each integration.|
|**custom check** | If you have a unique system that you want to monitor, or if you're going to expand the metrics already sent by an integration, you can build a [custom check][5] to define and send metrics to Datadog. However, if you want to monitor a generally available application, public service, or an open source project, and we don't have an integration that already exists for it, you should consider [building a new integration][1] instead of a custom check. |
|**tagging** | [Tags][18] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.|
|**logging** | If the system you are monitoring has logs, you can customize the logs you are sending to Datadog and use our [Logging Management solution][19] to manage and analyze them.|
|**event** | Events are informational messages about your system that are consumed by [the events stream][20] so that you can build monitors on them.|
|**service check** | Service checks are a type of monitor used to track the uptime status of the service. For more information, see the [Service checks guide][21].|
|**datadog.yaml** | This is the main configuration file where you're defining how the Agent as a whole interacts with its own integrations and with your system. Use this file to update API keys, Proxys, host tags, and other global settings.|

## Setting up an integration

The Datadog Agent package includes integrations officially supported by Datadog, in [integrations core][22]. To use the integrations in integrations core, download the Datadog agent. Community-based integrations are in [integrations extras][2], and to use those, you need to download the [developer toolkit][23]. For more information on installing or managing these integrations, see the [integrations management guide][24].

### API and Application keys

In order to [install the Datadog Agent][4], you need an [API key][25]. To use most additional Datadog functionality besides submitting metrics and events, you need an [application key][25]. You can manage your accounts API and application keys in the [API Settings page][26] of the UI.

### Installation

If you want to connect with a crawler or library based integration, navigate to that provider on the [Integrations page][27] for specific instructions on how to connect. For other supported integrations, install the [Datadog Agent][28]. Most integrations are supported on our containerized agents: [Docker][29], and [Kubernetes][30]. After you've downloaded the Agent, go to the [Integrations page][27] section to find specific configuration instructions for individual integrations.

### Configuring Agent integrations

Configurations are specific to [individual integrations][27]. In the `conf.d` folder at the root of your Agent's configuration directory, there is a folder named `<INTEGRATIONS_NAME>.d` for each officially supported Agent integration which contains a sample `conf.yaml.example` that lists all available configuration options for this particular integration.

To activate a given integration:

1. Rename the `conf.yaml.example` file (in the corresponding `<INTEGRATIONS>.d` folder) to `conf.yaml`. 
2. Update the required parameters inside the newly created configuration file with the values corresponding to your environment.
3. [Restart the Datadog Agent][31]

**Note**: All configuration files follow the format documented in the [parameters documentation][32].

For example, this is the minimum `conf.yaml` configuration file needed to collect metrics and logs from the [apache integration][33]:

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

Tagging is a key part of filtering and aggregating the data coming into Datadog across many sources. You can assign tags in configuration files, in environment variables, in the UI, or the API, and in DogStatsD. If you define tags in the `datadog.yaml` file, the tags are applied to all of your integrations. Once you've defined the tag in `datadog.yaml`, all new integrations inherit it. If you use a tag environment variable, it applies to all integrations. If you define tags in the corresponding integrations configuration file, it only applies to that specific integration. If you use tags in containers, it applies only to that container. For more information about tagging, see [Getting started with tags][18].

### Validation

To validate your configuration, [run the Agent's `status` subcommand][34], and look for new configuration under the Checks section.

## Installing multiple integrations

Installing more than one integration is a matter of adding the configuration information to a new `conf.yaml` file in the corresponding `<INTEGRATIONS>.d` folder. Look up the required parameters for the new integration from the `conf.yaml.example` file, add it into the new `conf.yaml` file, and then follow the same steps to validate your configuration.

## Security practices

For information on how Datadog handles your data, and other security considerations, see our [Security documentation][35].

## What's next?

Now that you have your first integrations set up, you can start [exploring all of the metrics][36] being sent by Datadog to your application, and use these metrics to begin setting up [graphs][37] and [alerts][38] to monitor your data.

Also check out our [Logs management][19], [APM][39], and [Synthetics][40] solutions.

## Troubleshooting

The first step to troubleshooting an integration is to use a plugin in your code editor or use one of the many online tools to verify that the YAML is valid. The next step is to run through all of the [Agent troubleshooting][41] steps.

If you continue to have problems, reach out to [our awesome Support team][42].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
 
[1]: /developers/integrations/new_check_howto
[2]: https://github.com/DataDog/integrations-extras
[3]: https://app.datadoghq.com/account/settings
[4]: https://github.com/DataDog/dd-agent
[5]: /developers/write_agent_check/?tab=agentv6
[6]: https://app.datadoghq.com/account/settings
[7]: /integrations/slack
[8]: /integrations/amazon_web_services
[9]: /integrations/azure
[10]: /integrations/pagerduty
[11]: /api
[12]: /integrations/node
[13]: /integrations/python
[14]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[15]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[16]: /developers/metrics
[17]: /developers/metrics/custom_metrics
[18]: /tagging
[19]: /logs
[20]: https://app.datadoghq.com/event/stream
[21]: /monitors/guide/visualize-your-service-check-in-the-datadog-ui
[22]: https://github.com/DataDog/integrations-core
[23]: /developers/integrations/new_check_howto/#developer-toolkit
[24]: agent/guide/integration-management
[25]: /account_management/faq/api-app-key-management
[26]: https://app.datadoghq.com/account/settings#api
[27]: /integrations
[28]: https://app.datadoghq.com/account/settings#agent
[29]: https://app.datadoghq.com/account/settings#agent/docker
[30]: https://app.datadoghq.com/account/settings#agent/kubernetes
[31]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[32]: /developers/integrations/new_check_howto/#param-specification
[33]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[34]: /agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[35]: /security
[36]: /graphing/metrics/explorer
[37]: /graphing
[38]: /monitors
[39]: /tracing
[40]: /synthetics
[41]: /agent/troubleshooting/?tab=agentv6
[42]: /help
