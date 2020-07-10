---
title: IoT Agent
kind: documentation
beta: true
further_reading:
  - link: "/getting_started/agent/"
    tag: "Documentation"
    text: "Getting Started with the Agent"
---

## Overview

The Datadog IoT Agent is a version of the Agent optimized for monitoring IoT devices and embedded applications. Customers use the IoT Agent to monitor a wide variety of devices from digital displays to security devices running image detection algorithms.

<div class="alert alert-warning">
The IoT Agent is currently available for private beta. Request access by completing the <a href="https://www.datadoghq.com/">form</a>.
</div>

## Capabilities

The IoT Agent includes the following system checks. Configuration is identical to the full Agent.

- [System][1] (includes CPU, IO, load, memory, swap, and uptime)
- [Disk][2]
- [Network][3]
- [Systemd][4]
- [NTP][5]

The IoT Agent also supports:

- Custom metric collection using an embedded [DogStatsD][6] server
- Log collection using [tailing files][7], [TCP/UDP][8], and [journald][9]

The IoT Agent does not include the Python interpreter and other integrations pre-packaged with the full Agent. It also doesn’t support tracing for APM, live process monitoring, or network performance monitoring.

## Setup

### Requirements

The IoT Agent is available as DEB and RPM packages for Linux devices running on x64, arm64 (ARMv8), and ARMv7 architectures.

#### Resources

IoT devices are typically more resource constrained than cloud infrastructure hosts. The IoT Agent is built to have a minimal footprint and consume minimal network bandwidth.

Exact resource requirements depend on usage. Datadog found the following when testing the IoT Agent (v7.20) internally:

- CPU: 0.5% (on a VM with 2 Intel Xeon VCPUs)
- Memory: 36 MB
- Network bandwidth: 237 bps up / 79 bps down
- Disk: 63 MB

### Installation

#### Automatic

To automatically download and install the correct IoT Agent for your operating system and chipset architecture, use the following command:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_AGENT_MAJOR_VERSION=7 DD_AGENT_FLAVOR=iot-agent bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

#### Manual

{{< tabs >}}
{{% tab "DEB" %}}

To manually install the IoT Agent on Debian-based operating systems, run the following commands:

1. Update `apt` and install `apt-transport-https` to download through https:
    ```bash
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Set up the Datadog deb repo on your system and import Datadog's apt key:
    ```bash
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

3. Update `apt` and install the IoT Agent:
    ```bash
    sudo apt-get update
    sudo apt-get install datadog-iot-agent
    ```

4. Copy the example config and plug in your API key:
    ```bash
    DD_API_KEY=<YOUR_DD_API_KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Start the IoT Agent:
    ```bash
    sudo systemctl restart datadog-agent.service
    ```

{{% /tab %}}
{{% tab "RPM" %}}

To manually install the IoT Agent on RPM-based operating systems, run the following commands:

1. On an x86_64 host, set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/7/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. On an arm64 host, set up Datadog's Yum repo on your system by creating `/etc/yum.repos.d/datadog.repo` with the contents:
    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/7/aarch64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

3. Update your local yum repo and install the Agent:
    ```
    sudo yum makecache
    sudo yum install datadog-iot-agent
    ```

4. Copy the example config and plug in your API key
    ```bash
    DD_API_KEY=<YOUR KEY> ; sudo sh -c "sed 's/api_key:.*/api_key:$DD_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Start the IoT Agent:
    ```bash
    sudo systemctl restart datadog-agent.service
    ```

{{% /tab %}}
{{< /tabs >}}

## CLI

The IoT Agent supports the same [CLI commands][10] as the full Agent.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/system
[2]: /integrations/disk
[3]: /integrations/network
[4]: /integrations/systemd
[5]: /integrations/ntp
[6]: /developers/dogstatsd
[7]: /agent/logs/?tab=tailfiles#custom-log-collection
[8]: /agent/logs/?tab=tcpudp#custom-log-collection
[9]: /agent/logs/?tab=journald#custom-log-collection
[10]: /agent/basic_agent_usage/#cli
