---
title: macOS
platform: OS X
os: osx
aliases:
    - /guides/basic_agent_usage/osx/
    - /agent/basic_agent_usage/osx/
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
- link: "/agent/architecture/#agent-architecture"
  tag: "Documentation"
  text: "Find out more about the Agent's architecture"
- link: "/agent/configuration/network#configure-ports"
  tag: "Documentation"
  text: "Configure inbound ports"
algolia:
  tags: ['uninstall', 'uninstalling']
---

## Overview

This page outlines the basic features of the Datadog Agent for macOS. See the [Supported Platforms][5] documentation for the complete list of supported macOS distributions and versions.

## Install the Agent
To install the Agent on macOS, follow the [in-app instructions in Fleet Automation][6], and run the generated script on your hosts.

{{< img src="/agent/basic_agent_usage/macos_img_installation.png" alt="In-app installation steps for the Datadog Agent on a MacOS host." style="width:90%;">}}

<div class="alert alert-info">
By default, the Agent is installed in a sandbox located at <code>/opt/datadog-agent</code>. You can move this folder anywhere; however, this documentation assumes a default installation location.
</div>


## Commands

The `launchctl` service manager controls the Agent lifecycle, while other commands can be executed through the Agent binary, systray app, or web GUI.


| Description          | Command          |
|----------------------|------------------|
| Start Agent as a service           | `launchctl start com.datadoghq.agent` or systray app |
| Stop Agent running as a service    | `launchctl stop com.datadoghq.agent` or systray app  |
| Restart Agent running as a service | Stop and then start the Agent with:<br>`launchctl stop com.datadoghq.agent`<br>`launchctl start com.datadoghq.agent`<br>Or use the systray app |
| Status of Agent service            | `launchctl list com.datadoghq.agent` or systray app  |
| Status page of running Agent       | `datadog-agent status` or web GUI                    |
| Send flare                         | `datadog-agent flare` or web GUI                     |
| Display command usage              | `datadog-agent --help`                               |
| Run a check                        | `datadog-agent check <CHECK_NAME>`                   |


## Configuration

The [Datadog Agent configuration file][7] is located in `/opt/datadog-agent`. This YAML file holds the host-wide connection details used to send data to Datadog including:

- `api_key`: your organization's [Datadog API key][8]
- `site`: target Datadog region (for example `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`)
- `proxy`: HTTP/HTTPS proxy endpoints for outbound traffic (see [Datadog Agent Proxy Configuration][9])
- Default tags, log levels, and Datadog configurations.

A fully commented reference file, located in `/etc/datadog-agent/datadog.yaml.example`, lists every available option for comparison or copy-paste. Alternatively, see the [sample config_template.yaml file][10] for all available configuration options.

### Integration files
Configuration files for integrations are found in `/etc/datadog-agent/conf.d/`. Each integration has its own sub-directory, `<INTEGRATION>.d/`, which contains:
- `conf.yaml`: the active configuration controlling how the integration gathers metrics and logs
-  `conf.yaml.example`: a sample illustrating supported keys and defaults



## Uninstall the Agent

To uninstall the Agent, run the following command:

### Single user installation

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

### System-wide LaunchDaemon installation

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

See the [Agent Troubleshooting documentation][2] for troubleshooting steps.

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][3] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=macos
[2]: /agent/troubleshooting/
[3]: /developers/guide/custom-python-package/
[4]: /integrations/
[5]: https://docs.datadoghq.com/agent/supported_platforms/?tab=macos
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=macos
[7]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
