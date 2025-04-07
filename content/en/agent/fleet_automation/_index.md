---
title: Fleet Automation
disable_toc: false
further_reading:
- link: "/agent/remote_config"
  tag: "Documentation"
  text: "Find out more about Remote Configuration"
- link: "/infrastructure/list/#agent-configuration"
  tag: "Documentation"
  text: "Learn about the Agent configuration view"
- link: "https://www.datadoghq.com/blog/fleet-automation/"
  tag: "Blog"
  text: "Centrally govern and remotely manage Datadog Agents at scale with Fleet Automation"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Fleet Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Fleet Automation allows you to centrally govern and remotely manage Datadog Agents at scale to support your evolving observability needs.

{{< img src="agent/fleet_automation/fleet-automation1.png" alt="The fleet automation page" style="width:100%;" >}}

## Use cases

With the Fleet Automation platform, you can:
- View Agent and Agent integration configurations to help confirm deployment changes and ensure configuration consistency.
- Send a flare from within your organization, reducing the time it takes to debug issues on an Agent.
- Ensure your fleet of Agents is using the latest feature enhancements by identifying outdated Agent versions.
- Help rotate API keys and ensure old keys can be disabled with no impact by identifying which Agents, and how many Agents, are using a particular key.

## Observe your fleet

Use the [**Fleet Automation**][1] page to gain insight into unmonitored hosts, Agents that need to be updated, or Agents that have integration issues. For each Agent, you can see:
- The Agent version
- Whether the Agent has any unconfigured or misconfigured integrations
- The services that the Agent is monitoring
- The Agent's Remote Configuration status
- The products that are enabled on the Agent

### Examine an Agent

Selecting an Agent gives you more information about it, including its configuration, connected integrations, and a support tab that you can use to send a remote flare.

{{< img src="agent/fleet_automation/fleet-automation-agent.png" alt="An Agent's integration information" style="width:100%;" >}}

## Remote Agent Management

Remote Agent Management simplifies the process of upgrading your Agent fleet by reducing the need to coordinate with multiple deployment or configuration management tools. For more information, see [Remote Agent Management][6].

## Send a remote flare

After you enable Remote Configuration on an Agent, you can send a flare from Datadog. For instructions on sending a flare, see [Send a flare from the Datadog site][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /agent/configuration/agent-configuration-files/
[3]: /agent/remote_config#enabling-remote-configuration
[4]: /infrastructure/list/#agent-configuration
[5]: https://docs.datadoghq.com/account_management/rbac/
[6]: /agent/fleet_automation/remote_management/
[7]: /agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site