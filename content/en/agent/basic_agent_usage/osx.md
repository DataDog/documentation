---
title: Basic Agent Usage for macOS
platform: OS X
os: osx
aliases:
    - /guides/basic_agent_usage/osx/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "/infrastructure/process/"
  tag: "Documentation"
  text: "Collect your processes"
- link: "/tracing/"
  tag: "Documentation"
  text: "Collect your traces"
- link: "/agent/basic_agent_usage/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
algolia:
  tags: ['uninstall', 'uninstalling']
---

## Overview

This page outlines the basic features of the Datadog Agent for macOS. If you haven't installed the Agent yet, instructions can be found in the [Datadog Agent Integration][1] documentation.

By default, the Agent is installed in a sandbox located at `/opt/datadog-agent`. You can move this folder anywhere; however, this documentation assumes a default installation location.

## Supported macOS versions

| macOS version       | Supported Agent versions                                            |
|---------------------|---------------------------------------------------------------------|
| macOS 10.10 & 10.11 | Agent v5                                                            |
| macOS 10.12         | Agent v5, Agent v6 until v6.34.0, Agent v7 until v7.34.0            |
| macOS 10.13         | Agent v5, Agent v6 until v6.38.2, Agent v7 until v7.38.2            |
| macOS 10.14+        | Agent v5, Agent v6, Agent v7                                        |

## Commands

In Agent v6 and v7, the `launchctl` service manager provided by the operating system is responsible for the Agent lifecycle, while other commands must be run through the Agent binary directly. Alternatively, lifecycle commands can also be managed through the systray app, and other commands can be executed with the web GUI.

| Description                        | Command                                              |
|------------------------------------|------------------------------------------------------|
| Start Agent as a service           | `launchctl start com.datadoghq.agent` or systray app |
| Stop Agent running as a service    | `launchctl stop com.datadoghq.agent` or systray app  |
| Restart Agent running as a service | Stop and then start the Agent with:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>Or use the systray app |
| Status of Agent service            | `launchctl list com.datadoghq.agent` or systray app  |
| Status page of running Agent       | `datadog-agent status` or web GUI                    |
| Send flare                         | `datadog-agent flare` or web GUI                     |
| Display command usage              | `datadog-agent --help`                               |
| Run a check                        | `datadog-agent check <CHECK_NAME>`                   |

## Configuration

The configuration files and folders for the Agent are located in:

* `~/.datadog-agent/datadog.yaml`

Configuration files for [Integrations][4]:

* `~/.datadog-agent/conf.d/`

## Uninstall the Agent

To uninstall the Agent, run the following command:

**Single user installation**

To remove the Agent and all Agent configuration files:
1. Stop and close the Datadog Agent with the bone icon in the tray.
2. Drag the Datadog application from the application folder to the trash bin.
3. Run the following commands:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. Reboot your machine for the changes to take effect.

**System-wide LaunchDaemon installation**

To remove the Agent and all Agent configuration files:
1. Drag the Datadog application from the application folder to the trash bin.
2. To remove remaining files, run the following:
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo launchctl unload /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. Reboot your machine for the changes to take effect.

## Troubleshooting

See the [Agent Troubleshooting documentation][2].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /agent/troubleshooting/
[3]: /developers/guide/custom-python-package/
[4]: /integrations/
