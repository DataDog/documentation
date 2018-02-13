---
title: Agent
kind: documentation
description: Install & configure the Agent to collect data
aliases:
    - /guides/basic_agent_usage/
    - /agent/faq/where-is-the-configuration-file-for-the-agent/
    - /agent/faq/log-location
---

## What is the Agent?

The Datadog Agent is a piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on
your behalf so that you can do something useful with your monitoring and performance data. The Datadog Agent is open-sourced, consult its code on github for [Agent v5](https://github.com/DataDog/dd-agent) and [Agent v6](https://github.com/DataDog/datadog-agent). To see all changes between Agent v5 and v6, [consult our dedicated changes documentation](https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md).

{{< partial name="platforms/platforms.html" >}}

## Configuration file

The configuration file for the Agent is located at:

{{% table responsive="true" %}}
|OS |Agent v5 | Agent v6 |
|:-------|:--------|:--------|
|[Mac OS X](/agent/basic_agent_usage/osx)|`~/.datadog-agent/datadog.conf`|`~/.datadog-agent/datadog.yaml`|
|[Linux](/agent/basic_agent_usage/ubuntu)|`/etc/dd-agent/datadog.conf`||
|SmartOS|`/opt/local/datadog/agent/datadog.conf`||
|[Source](/agent/basic_agent_usage/source)|`~/.datadog-agent/agent/datadog.conf`||
|[Windows Server 2008, Vista and newer](/agent/basic_agent_usage/windows)|`\\ProgramData\Datadog\datadog.conf`||
|[Windows Server 2003, XP or older](/agent/basic_agent_usage/windows)|`\\Documents and Settings\All Users\Application Data\Datadog\datadog.conf`||
{{% /table %}}

## Log location

For linux, Mac OSx Agent logs are located in the `/var/log/datadog/` directory.  
For Windows, logs are located in  the `c:\programdata\Datadog\logs` directory.  
The Datadog logs does rollover every 10MB. When rollover occurs, one backup is kept (e.g. `agent.log.1`). If a previous backup exists, it is overwritten on rollover.

## Configuration management tools

Manage the Datadog agent and [integrations](/integrations) using configuration management tools:

### Chef
* [Chef Github project](https://github.com/DataDog/chef-datadog)
* [Chef installation](https://app.datadoghq.com/account/settings#integrations/chef)
* [Chef documentation](/integrations/chef)

### Puppet
* [Puppet Github project](https://github.com/DataDog/puppet-datadog-agent)
* [Puppet installation](https://app.datadoghq.com/account/settings#integrations/puppet)
* [Puppet documentation](/integrations/puppet)

### Ansible
* [Ansible Github project](https://github.com/DataDog/ansible-datadog)
* [Ansible installation](https://app.datadoghq.com/account/settings#agent/ansible)
* [Ansible documentation](/integrations/ansible/)

Chef, Puppet, and Ansible [integrations](/integrations) using our public APIs so if you're interested in using another automation tool, the above could be leveraged as examples to get you started.

There is also community support for Saltstack:

* Saltstack Formula - https://github.com/DataDog/datadog-formula

## Agent Troubleshooting

If you ended up at this page and have not yet installed the Datadog Agent, go [to the dedicated agent integration page](https://app.datadoghq.com/account/settings#agent) for installation instructions. If you just installed the Agent, it might take a few moments before you start seeing metrics appear. The first place you should check for metrics is the [Metrics Explorer](https://app.datadoghq.com/metric/explorer).

If you think you might be experiencing issues, the first thing to do is [run the info command](/agent/faq/agent-status-and-information) and check the [Agent logs](/agent/#log-locations).

If nothing obvious pops out reach out to [Datadog support team](/help) along with [a flare](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command) of your agent

### FAQ 

####  Why should I install the agent on my AWS instances?

If you use AWS CloudWatch or another cloud-based metrics provider, you may already be getting some metrics for your hosts. However, installing the Datadog Agent on these hosts gives you a number of benefits, including:

* **Better resolution** - CloudWatch observes what's happening from the outside by sampling hosts every ~5-25 minutes, whereas Datadog's agent is capturing performance stats every 15 seconds to provide a more realistic understanding of what's happening from the hosts' perspective.

* **Exposed metrics** - AWS only exposes 10+ metrics for EC2 instances so you'll miss critical KPI's such as memory, disk utilization, swap, network errors, etc. Datadog has over 50 metrics enabled by default and can push this further with our many application-specific integrations.

* **Integrations** - These make it simple to extend our agent beyond the native metrics so you easily monitor application health, process utilization, and more.

* **Custom metrics with DogStatsD** - With the Datadog agent on board, use the built-in statsd client to send custom metrics from your application, making it easier to correlate what’s happening with your application, your users and your system.
{{< img src="agent/faq/Agent_VS_AWSA.jpg" alt="Agent vs AWSA" responsive="true" popup="true">}}

The Datadog agent is lightweight and fully open source, so you can review the code and even contribute by making a pull request.

Also reference this article if you suspect you're seeing [latency reporting AWS metrics](/integrations/faq/are-my-aws-cloudwatch-metrics-delayed).
