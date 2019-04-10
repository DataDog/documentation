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

This is a guide for using integrations, for information about building a new integration, see the [Create a new integration][1] page.

An integration, at the highest level, is when you assemble a unified system from units that are usually considered separately. At Datadog, you can use integrations to bring together all of the units of your infrastructure and gain insight into the unified system as a whole—you can see pieces individually and also how individual pieces are impacting the whole.

* Over 250 Agent integrations are supported in the [integrations core][2].
* Even more Agent integrations have been built by our open source community, in [integrations extras][3].
* Find all available integrations on the [Integrations page in the app][4].
* You can build your own integration using the [Datadog API][5].
* The Agent is [open source][6] and you can [create your own custom check][7].

Datadog provides two main types of integrations:

* Agent-based integrations are installed with the Datadog Agent and use a Python class called `check` to define the metrics to collect.
* Authentication (crawler) based integrations are set up in the [Datadog App][8] where you provide credentials for obtaining metrics with the API.

It's best to start collecting metrics on your projects as early in the development process as possible, but you can start at any stage.

### Key terms

**parameters** - Use the parameters in the `conf.yaml` file to control accesses between your integration data source and the Agent. The individual integrations `conf.yaml.example` file has all of the required and not required parameters listed. Define all of the needed parameters for all of your integrations in a single `conf.yaml` file - if you have more than one file, the Agent only uses the alphabetically first file.

**conf.yaml** - You create the `conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][9]. Use this file to connect integrations to your system, as well as configure their settings. Nonrequired parameters are usually commented out.

**instance** - You define and map the instance of whatever you are monitoring in the `conf.yaml` file. For example, in the [`http_check` integration][10], you're defining the name associated with the instance of the HTTP endpoint you are monitoring up and downtime. You can monitor multiple instances in the same integration, and you do that by defining all of the instances in the `conf.yaml` file.

**metrics** - The list of what is collected from your system by each integration. You can find the metrics for each integration in that integrations `metadata.csv` file. For more information about metrics, see the [Metrics][11] developer page. You can also set up [custom metrics][12], so if the integration doesn't offer a metric out of the box, you can usually add it.

**metadata.csv** - The file that lists and stores the metrics collected by each integration.

**custom check** - If you have a unique system that you want to monitor, or if you're going to expand the metrics already sent by an integration, you can build a [custom check][7] to define and send metrics to Datadog. However, if you want to monitor a generally available application, public service, or an open source project, and we don't have an integration that already exists for it, you should consider [building a new integration][1] instead of a custom check.

**tagging** - [Tags][13] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.

**logging** - If the system you are monitoring has logs, you can customize the logs you are sending to Datadog and use our [Logging Management solution][14] to manage and analyze them.

**event** - Events are informational messages about your system that are consumed by [the events stream][15] so that you can build monitors on them.

**service check** - Service checks are a type of monitor used to track the uptime status of the service. For more information, see the [Service checks guide][16].

## Setting up an integration

The Datadog Agent package includes integrations officially supported by Datadog, in [integrations core][2]. To use the integrations in integrations core, download the Datadog agent. Community-based integrations are in [integrations extras][3], and to use those, you need to download them individually. For more information on installing or managing these integrations, see the [integrations management guide][17].

### API and Application keys

In order to [install the Datadog Agent][6], you need an [API and Application key][18]. You can manage your accounts API and Application keys in the [API Settings page][19] of the UI.

### Installation

If you want to connect with a cloud service provider, navigate to that provider on the [Integrations page][20] for specific instructions on how to connect. For other supported integrations, install the [Datadog Agent][21]. Most integrations are supported on our containerized agents: [Docker][22], and [Kubernetes][23]. After you've downloaded the Agent, go to the [Integrations page][20] section to find specific configuration instructions for individual integrations.

### Configuring Agent integrations

Configurations are specific to [individual integrations][20]. In the `conf.d` folder at the root of your Agent's configuration directory, there is a folder named `<INTEGRATIONS>.d` for each officially supported Agent integration which contains a sample `conf.yaml.example` that lists all available configuration options for this particular integration.

To activate a given integration:

1. Rename the `conf.yaml.example` file (in the corresponding `<INTEGRATIONS>.d` folder) to `conf.yaml`. 
2. Update the required parameters inside the newly created configuration file with the values corresponding to your environment.
3. [Restart the Datadog Agent][24]

**Note**: All configuration files follow the format documented in the [parameters documentation][25].

For example, this is the minimum `conf.yaml` configuration file needed to collect metrics and logs from the [apache integration][26]:

```
init_config:

instances:

## @param apache_status_url - string - required
## Status url of your Apache server.
#
- apache_status_url: http://localhost/server-status?auto

# you can also add an optional second instance
## - url: url.com
#
#logs:
#  - type: file
#    path: /var/log/apache2/access.log
#    source: apache
#    sourcecategory: http_web_access
#    service: apache
#  - type: file
#    path: /var/log/apache2/error.log
#    source: apache
#    sourcecategory: http_web_access
```

### Tagging

Tagging is a key part of filtering and aggregating the data coming into Datadog across many sources. You can assign tags in configuration files, in environment variables, in the UI, or the API, and in DogStatsD. If you define tags in the `datadog.yaml` file, the tags are applied to all of your integrations. Once you've defined the tag in `datadog.yaml`, all new integrations inherit it. If you use a tag environment variable, it applies to all integrations. If you define tags in the corresponding integrations configuration file, it only applies to that specific integration. If you use tags in containers, it applies only to that tag. For more information about tagging, see [Getting started with tags][13].

### Validation

To validate your configuration, [run the Agent's `status` subcommand][27], and look for new configuration under the Checks section.

## Installing multiple integrations

Installing more than one integration is a matter of adding the configuration information to your already existing `conf.yaml` file. Look up the required parameters for the new integration, and add it into your already existing `conf.yaml` file, and then follow the same steps to validate your configuration.

## Security practices

For information on how Datadog handles your data, and other security considerations, see our [Security documentation][28].

## What's next?

Now that you have your first integrations set up, you can start [exploring all of the metrics][29] being sent by Datadog to your application, and use these metrics to begin setting up [graphs][30] and [alerts][31] to monitor your data.

Also check out our [Logs management][14], [APM][32], and [Synthetics][33] solutions.

## Troubleshooting

The first step to troubleshooting an integration is to use a plugin in your code editor or use one of the many online tools to verify that the YAML is valid. The next step is to run through all of the [Agent troubleshooting][34] steps.

If you continue to have problems, reach out to [our awesome Support team][35].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
 
[1]: /developers/integrations/new_check_howto
[2]: https://github.com/DataDog/integrations-core
[3]: https://github.com/DataDog/integrations-extras
[4]: https://app.datadoghq.com/account/settings
[5]: /api
[6]: https://github.com/DataDog/dd-agent
[7]: /developers/write_agent_check/?tab=agentv6
[8]: https://app.datadoghq.com/account/settings
[9]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[11]: /developers/metrics
[12]: /developers/metrics/custom_metrics
[13]: /tagging
[14]: /logs
[15]: https://app.datadoghq.com/event/stream
[16]: /monitors/guide/visualize-your-service-check-in-the-datadog-ui
[17]: agent/guide/integration-management
[18]: /account_management/faq/api-app-key-management
[19]: https://app.datadoghq.com/account/settings#api
[20]: /integrations
[21]: https://app.datadoghq.com/account/settings#agent
[22]: https://app.datadoghq.com/account/settings#agent/docker
[23]: https://app.datadoghq.com/account/settings#agent/kubernetes
[24]: /agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[25]: /developers/integrations/new_check_howto/#param-specification
[26]: https://github.com/DataDog/integrations-core/blob/master/apache/datadog_checks/apache/data/conf.yaml.example
[27]: /agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[28]: /security
[29]: /graphing/metrics/explorer
[30]: /graphing
[31]: /monitors
[32]: /tracing
[33]: /synthetics
[34]: /agent/troubleshooting/?tab=agentv6
[35]: /help
