---
title: Linux
platform: Linux
aliases:
    - /guides/basic_agent_usage/amazonlinux/
    - /guides/basic_agent_usage/centos/
    - /guides/basic_agent_usage/deb/
    - /agent/basic_agent_usage/install_debian_5/
    - /guides/basic_agent_usage/fedora/
    - /guides/basic_agent_usage/redhat/
    - /guides/basic_agent_usage/suse/
    - /guides/basic_agent_usage/ubuntu/
    - /agent/basic_agent_usage/alma/
    - /agent/basic_agent_usage/amazonlinux/
    - /agent/basic_agent_usage/centos/
    - /agent/basic_agent_usage/deb/
    - /agent/basic_agent_usage/fedora/
    - /agent/basic_agent_usage/oracle/
    - /agent/basic_agent_usage/redhat/
    - /agent/basic_agent_usage/ubuntu/
    - /agent/basic_agent_usage/suse/
    - /agent/basic_agent_usage/rocky/
    - /agent/basic_agent_usage/linux/
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

This page outlines the basic features of the Datadog Agent for Linux environments. See the [Supported Platforms][5] documentation for the complete list of supported Linux distributions and versions.

## Install the Agent
To install the Agent on Linux, follow the [in-app instructions in Fleet Automation][6], and run the generated script on your hosts.

{{< img src="/agent/basic_agent_usage/linux_img_july_25.png" alt="In-app installation steps for the Datadog Agent on a Linux host." style="width:90%;">}}


## Configure the Agent
The Datadog Agent configuration file is located in `/etc/datadog-agent/datadog.yaml`. This YAML file holds the host-wide connection details used to send data to Datadog including:
- `api_key`: Your organization's [Datadog API key][7]
- `site`: Target Datadog region (for example `datadoghq.com`, `datadoghq.eu`, `ddog-gov.com`)
- `proxy`: HTTP/HTTPS proxy endpoints for outbound traffic (see [Datadog Agent Proxy Configuration][8])
- Default tags, log level, and Datadog configurations

A fully commented reference file, located in `/etc/datadog-agent/datadog.yaml.example`, lists every available option for comparison or to copy and paste. Alternatively, see the sample `config_template.yaml` file for all available configuration options.

### Integration files
Configuration files for integrations live in `/etc/datadog-agent/conf.d/`. Each integration has its own sub-directory, `<INTEGRATION>.d/`, that contains:
- `conf.yaml`: The active configuration controlling how the integration gathers metrics and logs
- `conf.yaml.example`: A sample illustrating supported keys and defaults


## Commands

| Description   | Command               |
|---------------|-----------------------|
| Start Agent as a service           | `sudo systemctl start datadog-agent`                   |
| Stop Agent running as a service    | `sudo systemctl stop datadog-agent`                    |
| Restart Agent running as a service | `sudo systemctl restart datadog-agent`                 |
| Status of Agent service            | `sudo systemctl status datadog-agent`                  |
| Status page of running Agent       | `sudo datadog-agent status`                            |
| Send flare                         | `sudo datadog-agent flare`                             |
| Display command usage              | `sudo datadog-agent --help`                            |
| Run a check                        | `sudo -u dd-agent -- datadog-agent check <CHECK_NAME>` |

**Note**: For upstart-based systems, such as `CentOS/RHEL 6` or `SUSE 11`, swap `systemctl <action>` with `<action>`. For example, when starting an Agent as a service on a `SUSE 11` system, use `sudo start datadog-agent`.


## Uninstall the Agent

To uninstall the Agent, run the command for the appropriate Linux environment:


### For CentOS, Rocky, AlmaLinux, Amazon Linux, Oracle Linux, and Red Hat

```shell
sudo yum remove datadog-agent
```

### For Debian, Ubuntu
```shell
sudo apt-get remove datadog-agent -y
```

### For SUSE
```shell
sudo zypper remove datadog-agent
```

<div class="alert alert-info">

**The above commands remove the Agent, but do not remove**:
* The `datadog.yaml` configuration file
* User-created files in the `/etc/datadog-agent` configuration folder
* User-created files in the `/opt/datadog-agent` folder
* The `dd-agent` user
* Datadog log files

**To remove these elements, run this command after removing the Agent:**
```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```

To uninstall remaining Agent artifacts for `Debian` and `Ubuntu` run:

```shell
sudo apt-get remove --purge datadog-agent -y
```

</div>


### Uninstall Single Step APM Instrumentation
If you installed the Agent with Single Step APM Instrumentation and want to uninstall it, you need to [run additional commands][9] to remove APM Instrumentation. Follow the steps for your [specific environment][10].


## Troubleshooting

For detailed steps, see [Agent Troubleshooting][2].

## Working with the embedded Agent

The Agent contains an embedded Python environment at `/opt/datadog-agent/embedded/`. Common binaries such as `python` and `pip` are contained within `/opt/datadog-agent/embedded/bin/`.

See the instructions on how to [add packages to the embedded Agent][3] for more information.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[2]: /agent/troubleshooting/
[3]: /developers/guide/custom-python-package/
[4]: /integrations/
[5]: /agent/supported_platforms/?tab=linux
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://docs.datadoghq.com/agent/configuration/proxy/
[9]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
[10]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/linux
