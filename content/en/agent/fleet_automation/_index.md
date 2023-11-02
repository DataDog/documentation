---
title: Fleet Automation
kind: documentation
disable_toc: false
further_reading:
- link: "/agent/remote_config"
  tag: "Documentation"
  text: "Some text"
---

{{< callout btn_hidden="true">}}Fleet Automation is in beta.{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">Fleet Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Fleet Automation allows you to gain visibility into your fleet of Agents to ensure they are set up correctly and optimized to meet your evolving observability needs.

With Fleet Automation, you can:
- Reduce the time it takes to debug an issue by sending a remote flare straight from the [Fleet Automation][1] page.
- Ensure you're running up-to-date Agents with the latest security fixes and feature enhancements by identifying outdated Agent versions.
- Identify which Agents are using a particular API Key so you can safely rotate keys and disable old keys without impact.
- View Agent and Agent integration configurations to help confirm deployment changes and troubleshoot any configuration related issues.

To access Fleet Automation, click **Integrations** > [**Fleet Automation**][1].

{{< img src="agent/fleet_automation/fleet_automation.png" alt="The fleet automation tab." style="width:100%;" >}}

## Configuring Fleet Automation

To ensure you have access to all Fleet Automation features, upgrade your Agent to version 7.49/6.49 or later.

Alternatively:
- To enable **Agent configurations** on Agents before 7.47/6.47, set the value of `inventories_configuration_enabled` in your [Agent configuration file][2] to `true`. You can also use the environment variable `DD_INVENTORIES_CONFIGURATION_ENABLED`.
- To enable **Agent integration configurations** on Agents before 7.49/6.49, set the value of `inventories_checks_configuration_enabled` in your [Agent configuration file][2] to `true`. You can also use the environment variable `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED`.

Datadog recommends upgrading your Agents regularly to make sure you have access to the latest features and security updates.

## Send a flare

Remotely send flares (instructions and couple sentences to address any FAQ / setup)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/configuration/agent-configuration-files/