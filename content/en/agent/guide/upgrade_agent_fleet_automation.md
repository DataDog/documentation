---
title: Upgrade your Datadog Agent
description: Guide for upgrading Datadog Agent versions using Fleet Automation remote management, installation scripts, and configuration management tools.
aliases:
  - /agent/faq/upgrade-between-agent-minor-versions
  - /agent/guide/upgrade-between-agent-minor-versions
  - /agent/versions/upgrade_between_agent_minor_versions/
  - /agent/guide/upgrade_between_minor_versions/
  - /agent/guide/upgrade
further_reading:
  - link: "/agent/troubleshooting/"
    tag: "Documentation"
    text: "Agent Troubleshooting"
  - link: "agent/"
    tag: "Documentation"
    text: "The Datadog Agent" 
---

## Overview
Datadog recommends you update your Datadog Agent with every [minor and patch][6] release. This guide walks you through how to roll out a new Agent version across your hosts in a few clicks.


## Upgrade between minor versions of the Agent
### Upgrade remotely with Fleet Automation

[Fleet Automation][8] enables you to centrally manage your fleet of Datadog Agents. Fleet Automation includes [Remote Agent Management][2], which allows you to remotely upgrade Agents across non-containerized Linux and Windows environments. See [Remote Agent Management: Upgrade your Datadog Agents][7].

### Upgrade with script or configuration management tooling
Follow the [in-app instructions][4] to upgrade Datadog Agents across container, host-based, and Infrastructure as Code (IaC) tool-managed environments. The guided flow generates an Agent installation command tailored to your platform for upgrading the Agent. By default, the command installs the latest version of the Agent. To upgrade to a specific minor version, set `DD_AGENT_MINOR_VERSION=<TARGET_MINOR>` before running the script.


## Upgrade between major versions of the Agent

<div class="alert alert-info">
Agent 7 only supports Python 3 custom checks. <a href="/agent/guide/python-3">Verify if your custom checks are Python 3 compatible</a> before upgrading to Agent 7.
</div>

### Upgrade from Agent 6 to Agent 7

{{< tabs >}}
{{% tab "Linux" %}}

Run the following Agent installation command to upgrade your Agent from version 6 to version 7:

The following command works on Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu, and SUSE:
: `DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. [Download the Datadog Agent installer][1].
2. Run the installer (as **Administrator**) by opening `datadog-agent-7-latest.amd64.msi`.
3. Follow the prompts, accept the license agreement, and enter your [Datadog API key][2].
4. When the install finishes, you are given the option to launch the Datadog Agent Manager.

**Note**: Links to all available versions of the Windows Installer are [provided in JSON format][3].

[1]: https://ddagent-windows-stable.s3.amazonaws.com/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json
{{% /tab %}}
{{% tab "MacOS" %}}

Run the Agent installation command with the environment variable `DD_AGENT_MAJOR_VERSION=7` to upgrade your Agent from version 6 to version 7:

```shell
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY="<DATADOG_API_KEY>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

### Upgrade from Agent 5 to Agent 7

{{< tabs >}}
{{% tab "Linux" %}}

Run the Agent installation command with the environment variable `DD_UPGRADE="true"` to upgrade your Agent from version 5 to version 7. The Agent v7 installer can automatically convert v5 configurations during the upgrade:

The following command works on Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu, and SUSE:
: `DD_UPGRADE="true" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"`

{{% /tab %}}
{{% tab "Windows" %}}

1. Upgrade your Agent to version 6 following the [manual upgrade process][1].
2. Follow the [From Agent v6 to Agent v7](#from-agent-v6-to-agent-v7) upgrade instructions.

[1]: /agent/versions/upgrade_to_agent_v6/?tab=windows#manual-upgrade
{{% /tab %}}
{{% tab "MacOS" %}}

Run the Agent installation command with the environment variable `DD_AGENT_MAJOR_VERSION=7` and `DD_UPGRADE="true"` to upgrade your Agent from version 5 to version 7. The Agent v7 installer can automatically convert v5 configurations during the upgrade:

```shell
DD_UPGRADE="true" DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
```

{{% /tab %}}
{{< /tabs >}}

**Note:** The upgrade process does not automatically move **custom** Agent checks. This is by design as Datadog cannot guarantee full backwards compatibility out of the box. See the [Python 3 Custom Check Migration][1] guide to discover how to migrate your custom check from Python 2 to Python 3.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/python-3/
[2]: /agent/fleet_automation/remote_management
[3]: /agent/fleet_automation/remote_management/#setup
[4]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[5]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/datadog-agent/releases?page=1
[7]: /agent/fleet_automation/remote_management/#upgrade-your-agents
[8]: /agent/fleet_automation/
