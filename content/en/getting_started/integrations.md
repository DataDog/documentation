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

* Agent based integrations are installed with the Datadog Agent and use a Python class called `check` to define the metrics to collect.
* Authentication (crawler) based integrations are set up in the [Datadog App][8] where you provide credentials for obtaining metrics with the API.

It's best to start collecting metrics on your projects as early in the development process as possible, but you can start at any stage.

### Key terms

**parameters** - Use the parameters in the `conf.yaml` file to control accesses between your integration data source and the Agent. The individual integrations `conf.yaml.example` file has all of the required and not required parameters listed. Define all of the needed parameters for all of your integrations in a single `conf.yaml` file - if you have more than one file, the Agent only uses the alphabetically first file.

**conf.yaml** - You create the `conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][9]. Use this file to connect integrations to your system, as well as configure their settings. Nonrequired parameters are usually commented out.

**instance** - You define and map the instance of whatever you are monitoring in the `conf.yaml` file. For example, in the [`http_check` integration][10], you're defining the name associated with the instance of the HTTP endpoint you are monitoring up and downtime. You can monitor multiple instances in the same integration, and you do that by defining all of the instances in the `conf.yaml` file. For example:

```
instances:

  # this is my first instance
  - url: example.com

  # this is my second instance
  - url: example_2.com
```

**metrics** - The list of what is collected from your system by each integration. You can find the metrics for each integration in that integrations `metadata.csv` file. For more information about metrics, see the [Metrics][11] developer page. You can also set up [custom metrics][12], so if the integration doesn't offer a metric out of the box, you can usually add it.

**metadata.csv** - The file that lists and stores the metrics collected by each integration.

**custom check** - If you have a unique system that you want to monitor, or if you're going to expand the metrics already sent by an integration, you can build a [custom check][7] to define and send metrics to Datadog. However, if you want to monitor a generally available application, public service, or an open source project, and we don't have an integration that already exists for it, you should consider [building a new integration][1] instead of a custom check.

**tagging** - [Tags][13] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.

**logging** - If the system you are monitoring has logs, you can customize the logs you are sending to Datadog and use our [Logging Management solution][14] to manage and analyze them.

**events** - 

**service check** - 

## Setting up an integration

The Datadog Agent package includes integrations officially supported by Datadog, in [integrations core][2]. To use the integrations in integrations core, download the Datadog agent. Community based integrations are in [integrations extras][3], and to use those, you need to download them individually. For more information on installing or managing these integrations, see the [integrations management guide][15].

### API and Application keys

In order to [install the the Datadog Agent][6], you need an [API and Application key][16]. You can manage your accounts API and Application keys in the [API Settings page][17] of the UI.

### Installation

If you want to connect with a cloud service provider, navigate to that provider on the [Integrations page][18] for specific instructions on how to connect. For other supported integrations, install the [Datadog Agent][19]. Most integrations are supported on our containerized agents: [Docker][20], and [Kubernetes][21]. After you've downloaded the Agent, go to the [Integrations page][18] section to find specific configuration instructions for individual integrations.

### Configuration

Configurations are specific to [individual integrations][18]. In the `conf.d` folder at the root of your Agent's configuration directory, there is a file named `<INTEGRATIONS>.d` in each integration folder, and a sample `conf.yaml` that lists all available configuration options. 

To begin configuring, rename `<INTEGRATIONS>.d`to `conf.yaml`to activate the integration. Then update the parameters inside the configuration file. Non-required parameters are commented out. All configuration files follow the format documented in the [parameters documentation][22].

For example, this is a sample `conf.yaml` for the `http_check` integration:

```
init_config:

instances:
  - name: Example website
    url: https://example.com/
    # disable_ssl_validation: false      # default is true, so set false to check SSL validation
    # ca_certs: /path/to/ca/file         # e.g. /etc/ssl/certs/ca-certificates.crt
    # check_certificate_expiration: true # default is true
    # days_warning: 28                   # default 14
    # days_critical: 14                  # default 7
    # timeout: 3                         # in seconds. Default is 10.
  - name: Example website (staging)
    url: http://staging.example.com/
```

### Tagging

Tagging is a key part of filtering and aggregating the data coming into Datadog across many sources. You can assign tags in configuration files, in environment variables, in the UI, or the API, in DogStatsD, and new integrations automatically inherited existing tags. For more information about tagging, see [Getting started with tags][13].

### Validation

To validate your configuration, [run the Agent's `status` subcommand][23], and look for new configuration under the Checks section.

## Installing multiple integrations

Installing more than one integration is a matter of adding the configuration information to your already existing `conf.yaml` file. Look up the required parameters for the new integration, and add it into your already existing `conf.yaml` file, and then follow the same steps to validate your configuration.

## Security practices

For information on how Datadog handles your data, and other security considerations, see our [Security documentation][24].

## What's next?

Now that you have your first integrations set up, you can start [exploring all of the metrics][25] being sent by Datadog to your application, and use these metrics to begin setting up [graphs][26] and [alerts][27] to monitor your data.

Also check out our [Logs management][14], [APM][28], and [Synthetics][29] solutions.

## Troubleshooting

The first step to troubleshooting an integration is to use a plugin in your code editor or use one of the many online tools to verify that the YAML is valid. The next step is to run through all of the [Agent troubleshooting][30] steps.

If you continue to have problems, reach out to [our awesome Support team][31].

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
[15]: agent/guide/integration-management
[16]: /account_management/faq/api-app-key-management
[17]: https://app.datadoghq.com/account/settings#api
[18]: /integrations
[19]: https://app.datadoghq.com/account/settings#agent
[20]: https://app.datadoghq.com/account/settings#agent/docker
[21]: https://app.datadoghq.com/account/settings#agent/kubernetes
[22]: /integrations/new_check_howto/#parameters-documentation
[23]: /agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[24]: /security
[25]: /graphing/metrics/explorer
[26]: /graphing
[27]: /monitors
[28]: /tracing
[29]: /synthetics
[30]: /agent/troubleshooting/?tab=agentv6
[31]: /help
