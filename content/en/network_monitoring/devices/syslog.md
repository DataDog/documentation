---
title: Syslog 
further_reading:
- link: "/network_monitoring/devices/profiles"
  tag: "Documentation"
  text: "Using Profiles with Network Device Monitoring"
- link: "https://www.datadoghq.com/knowledge-center/network-monitoring/snmp-monitoring/"
  tag: "Knowledge Center"
  text: "SNMP Monitoring Overview"
---

## Overview

Network Device Monitoring (NDM) uses Syslog to provide visibility into the health and performance of your network infrastructure. By integrating your network devices with Datadog through Syslog, you can collect and analyze log data, monitor device behavior, troubleshoot issues, and maintain network stability.

This page outlines how to configure your network devices to send Syslog data to Datadog and how to use this data within NDM.

{{< img src="network_device_monitoring/syslog/ndm_syslog.png" alt="Network Device Monitoring side panel, highlighting the Syslog tab." style="width:100%;" >}}

## Prerequisites

* Datadog Agent version 7.57 or later installed and running on a host that can receive Syslog messages from your network devices.
* Network devices configured to send [Syslog messages][1] either directly to the Datadog Agent or through a proxy that forwards messages to the Datadog Agent.

## Configuration

{{< tabs >}}
{{% tab "Linux" %}}

1. Ensure the following settings are enabled in your `/etc/datadog-agent/datadog.yaml` file:

   ```yaml
   logs_enabled: true # enable logs collection
   logs_config:
     use_sourcehost_tag: true # adds a source_host tags to logs with the source IP
   ```

2. Create a Syslog listener configuration:

   - In `/etc/datadog-agent/conf.d/`, create a directory called `syslog.d/`.
   - Inside `syslog.d/`, create a file named `conf.yaml` with the following:

   ```yaml
   logs:
     - type: syslog
       port: 514
       protocol: udp
       source: syslog
       service: <service> # optional tag
   ```

   * **`port`**: The port the Agent listens on for Syslog messages. Default is 514.
   * **`protocol`**: Set to `udp` or `tcp` based on your device configuration.
   * **`source`**: Custom source name for these logs in Datadog. Use `syslog` to correlate with NDM devices.
   * **`service`**: Optional service name for unified service tagging.

3. [Restart the Datadog Agent][101] to apply the changes.

   ```
   sudo systemctl restart datadog-agent
   ``` 

[101]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Windows" %}}

1. Ensure the following settings are enabled in your `C:\ProgramData\Datadog\datadog.yaml` file:

```
logs_enabled: true # enable logs collection
logs_config:
  use_sourcehost_tag: true # adds a source_host tags to logs with the source IP
```

2. Create a Syslog listener configuration:

   - In `C:\ProgramData\Datadog\conf.d\`, create a directory called `syslog.d/`.
   - Inside `syslog.d/`, create a file named `conf.yaml` with the following:

   ```yaml
   logs:
     - type: syslog
       port: 514
       protocol: udp
       source: syslog
       service: <service> # optional tag
   ```

   * **`port`**: The port the Agent listens on for Syslog messages. Default is 514.
   * **`protocol`**: Set to `udp` or `tcp` based on your device configuration.
   * **`source`**: Custom source name for these logs in Datadog. Use `syslog` to correlate with NDM devices.
   * **`service`**: Optional service name for unified service tagging.

3. [Restart the Datadog Agent][101] service from the Services console to apply the changes.

[101]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker" %}}

1. Ensure the following settings are enabled in your `/etc/datadog-agent/datadog.yaml` file in your Docker volume:

```yaml
logs_enabled: true # enable logs collection
logs_config:
  use_sourcehost_tag: true # adds a source_host tags to logs with the source IP
```

2. Create a Syslog listener configuration:

   - Mount a a volume to `/etc/datadog-agent/conf.d/` and create a directory called `syslog.d/`.
   - Inside `syslog.d/`, create a file named `conf.yaml` with the following:

   ```yaml
   logs:
     - type: syslog
       port: 514
       protocol: udp
       source: syslog
       service: <service> # optional tag
   ```

   * **`port`**: The port the Agent listens on for Syslog messages. Default is 514.
   * **`protocol`**: Set to `udp` or `tcp` based on your device configuration.
   * **`source`**: Custom source name for these logs in Datadog. Use `syslog` to correlate with NDM devices.
   * **`service`**: Optional service name for unified service tagging.

3. Restart the [Docker container][101] to apply the changes.

[101]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

## Verify Syslog messages

After your network devices are configured and the Datadog Agent is running, you can verify that Syslog data is being collected and sent to Datadog:

1. **Navigate to the Log Explorer** in your Datadog account.  
2. **Filter by `source:syslog`** (or whatever source you specified in your `conf.yaml` file).  
3. You should see your network device Syslog messages appearing in the Log Explorer.  
4. **Verify `syslog_ip`:** Ensure that the `syslog_ip` tag is present and correctly populated with the network device's IP address for each relevant log entry.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/