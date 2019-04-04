---
title: Getting started with Integrations
kind: documentation
aliases:
  - /getting-started-integrations/
  - /guides/getting-started-integrations/
  - /guides/integrations/
further_reading:
- link: "https://learn.datadoghq.com/course/view.php?id=2"
  tag: "Learning Center"
  text: "Introduction to Datadog"
- link: "/integrations/"
  tag: "Integrations"
  text: "Datadog's full list of integrations"
- link: "/graphing/"
  tag: "Graphing"
  text: "Now that you have your integrations set up, build graphs to visualize your data"
- link: "/monitors/"
  tag: "Alerts"
  text: "Set up alerts on your data"
---

An integration, at the highest level, is when you assemble a unified system from units that are usually considered separately. At Datadog, you can use integrations to bring together all of the units of your infrastructure and gain insight into the unified system as a whole—you can see pieces individually and also how individual pieces are impacting the whole. Datadog's integrations use a Python class called `check` to define the typical metrics most people would want to monitor for that system.

* Over 250 integrations are [officially listed][1], and supported in the [integrations core][2] (and more are always being added).
* Even more integrations have been built by our open source community, in [integrations extras][3].
* You can build your own integration using [Datadog API][4].
* The Agent is [open source][5] and you can instrument your own if you'd like.
* All incoming data is treated the same throughout Datadog.

Whether you're beginning development on a new project today, or you've been developing for decades, it's never too early or too late to start monitoring.

### Key terms

**parameters** - Use the parameters in the `conf.yaml` file to control accesses between your integration data source and the Agent. The individual integrations `conf.yaml.example` file has all of the required and not required parameters listed. Define all of the needed parameters for all of your integrations in a single `conf.yaml` file - if you have more than one file, the Agent only uses the alphabetically first file.

**conf.yaml** - You can find the `conf.yaml` in the `conf.d/` folder at the root of your [Agent's configuration directory][6]. Use this file to connect integrations to your system, as well as configure their settings. Nonrequired parameters are usually commented out.

**instance** - You define and map the instance of whatever you are monitoring in the `conf.yaml` file. For example, in the [`http_check` integration][7], you're defining the name associated with the instance of the HTTP endpoint you are monitoring up and downtime. You can monitor multiple instances in the same integration, and you do that by defining all of the instances in the `conf.yaml` file.

**metrics** - The list of what is collected from your system by each integration. You can find the metrics for each integration in that integrations `metadata.csv` file. For more information about metrics, see the [Metrics][8] developer page. You can also set up [custom metrics][9], so if the integration doesn't offer a metric out of the box, you can usually add it.

**metadata.csv** - The file that lists and stores the metrics collected by each integration.

**custom check** - If you have a unique system that you want to monitor, or if you're going to expand the metrics already sent by an integration, you can build a [custom check][10] to define and send metrics to Datadog. However, if you want to monitor a generally available application, public service, or an open source project, and we don't have an integration that already exists for it, you should consider [building a new integration][11] instead of a custom check.

**tagging** - [Tags][12] are a way to add customization to metrics so that you can filter and visualize them in the most useful way to you.

**logging** - If the system you are monitoring has logs, you can customize the logs you are sending to Datadog and use our [Logging Management solution][13] to manage and analyze them.

## Setting up an integration

The Datadog Agent package includes most integrations, so you don't need to download each individually.

### API and Application keys

In order to download the the Datadog Agent package, you need an [API and Application key][14]. You can manage your accounts API and Application keys in the [API Settings page][15] of the UI.

### Installation

If you want to connect with a cloud service provider, navigate to that provider on the [Integrations page][16] for specific instructions on how to connect. For most other integrations, start by installing the [Datadog Agent][17]. We also have containerized agents: [docker][18], and [kuberneties][19]. After you've downloaded the Agent, go to the [Integrations page][16] section to find specific configuration instructions for individual integrations.

### Configuration

Configurations are more specifc to [individual integrations][16]. Configure most integrations by editing the `conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory. Most integration have a sample `conf.yaml` that lists all available configuration options.

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

### Validation

To validate your configuration, [run the Agent's `status` subcommand][20], and look for new configuration under the Checks section.

### Tagging

Tagging is a key part of filtering and aggregating the data coming into Datadog across many sources. You can assign tags in configuration files, in environment variables, in the UI, or the API, in DogStatsD, and new integrations automatically inherited existing tags. For more information about tagging, see [Getting started with tags][12].

## Installing multiple integrations

Installing more than one integration is a matter of adding the configuration information to your already existing `conf.yaml` file. Look up the required parameters for the new integration, and add it into your already existing `conf.yaml` file, and then follow the same steps to validate your configuration.

## Security practices

For information on how Datadog handles your data, and other security considerations, see our [Security documentation][21].

## What's next?

Now that you have your first integrations set up, you can start [exploring all of the metrics][22] being sent by Datadog to your application, and use these metrics to begin setting up [graphs][23] and [alerts][24] to monitor your data.

Also check out our [Logs management][13], [APM][25], and [Synthetics][26] solutions.

## Troubleshooting

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
 
[1]: http://www.datadoghq.com/integrations
[2]: https://github.com/DataDog/integrations-core
[3]: https://github.com/DataDog/integrations-extras
[4]: /api
[5]: https://github.com/DataDog/dd-agent
[6]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example#L13
[8]: /developers/metrics
[9]: /developers/metrics/custom_metrics
[10]: /developers/write_agent_check/?tab=agentv6
[11]: /developers/integrations/new_check_howto
[12]: /tagging
[13]: /logs
[14]: /account_management/faq/api-app-key-management
[15]: https://app.datadoghq.com/account/settings#api
[16]: /integrations
[17]: https://app.datadoghq.com/account/settings#agent
[18]: https://app.datadoghq.com/account/settings#agent/docker
[19]: https://app.datadoghq.com/account/settings#agent/kubernetes
[20]: /agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[21]: /security
[22]: /graphing/metrics/explorer
[23]: /graphing
[24]: /monitors
[25]: /tracing
[26]: /synthetics
