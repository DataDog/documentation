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

## Prerequisites

* Datadog Agent version 7.57 or later installed and running on a host that can receive Syslog messages from your network devices.
* Network devices configured to send [Syslog messages][1] either directly to the Datadog Agent, or through a proxy that forwards messages to the Datadog Agent.

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
   - In `syslog.d/`, create a file named `conf.yaml` with the following:

      ```yaml
      logs:
        - type: udp
          port: 514
          protocol: udp
          source: syslog
          service: <service> # optional tag
      ```

      - **`type`**: Set to `udp` or `tcp` based on your device configuration.
      - **`port`**: The port the Agent listens on for Syslog messages. Default is 514.
      - **`protocol`**: Should match `type`, set to `udp` or `tcp` based on your device configuration.
      - **`source`**: Custom source name for these logs in Datadog. Use `syslog` to correlate with NDM devices.
      - **`service`**: Optional service name for unified service tagging.

3. [Restart the Datadog Agent][101] to apply the changes.

   ```
   sudo systemctl restart datadog-agent
   ``` 

[101]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Windows" %}}

1. Ensure the following settings are enabled in your `C:\ProgramData\Datadog\datadog.yaml` file:

   ```yaml
   logs_enabled: true # enable logs collection
   logs_config:
     use_sourcehost_tag: true # adds a source_host tags to logs with the source IP
   ```

2. Create a Syslog listener configuration:

   - In `C:\ProgramData\Datadog\conf.d\`, create a directory called `syslog.d/`.
   - In `syslog.d/`, create a file named `conf.yaml` with the following:

      ```yaml
      logs:
        - type: udp
          port: 514
          protocol: udp
          source: syslog
          service: <service> # optional tag
       ```
       - **`type`**: Set to `udp` or `tcp` based on your device configuration.
       - **`port`**: The port the Agent listens on for Syslog messages. Default is 514.
       - **`protocol`**: Should match `type`, set to `udp` or `tcp` based on your device configuration.
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

   - Mount a volume to `/etc/datadog-agent/conf.d/` and create a directory called `syslog.d/`.
   - In `syslog.d/`, create a file named `conf.yaml` with the following:

      ```yaml
      logs:
        - type: udp
          port: 514
          protocol: udp
          source: syslog
          service: <service> # optional tag
      ```

      - **`type`**: Set to `udp` or `tcp` based on your device configuration.
      - **`port`**: The port the Agent listens on for Syslog messages. Default is 514.
      - **`protocol`**: Should match `type`, set to `udp` or `tcp` based on your device configuration.
      - **`source`**: Custom source name for these logs in Datadog. Use `syslog` to correlate with NDM devices.
      - **`service`**: Optional service name for unified service tagging.

3. Restart the [Docker container][101] where the Agent is installed to apply the changes.

[101]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{< /tabs >}}

### Log parsing

After you complete the above steps, Syslog can start sending log data to Datadog. To ensure NDM correctly associates these logs with your monitored network devices, set up a custom log parsing pipeline that populates the `syslog_ip` tag with each device's source IP address.

**Note**: NDM associates logs with devices when `source:syslog` **AND** the `syslog_ip` tag matches one of the device's IP addresses.

Choose the appropriate scenario based on your network configuration:

{{< tabs >}}
{{% tab "Direct connection (no proxy)" %}}

When network devices send Syslog messages directly to the Datadog Agent, the Agent's `use_sourcehost_tag: true` setting automatically adds a `source_host` tag containing the sender's IP address.

To create the `syslog_ip` tag, remap the `source_host` tag using a Log Processing Pipeline:

1. In Datadog, navigate to **[Logs > Log Configuration > Pipelines][3]**.
2. Create a pipeline or select an existing one.
3. Add a **Log Remapper** processor with the following configuration:
   * Source of the tag: `source_host`
   * Target tag: `syslog_ip`

[3]: https://app.datadoghq.com/logs/pipelines

{{% /tab %}}
{{% tab "Using a Syslog proxy" %}}

When network devices send Syslog through a proxy (such as rsyslog or syslog-ng), the `source_host` tag reflects the proxy's IP address instead of the original device's IP.

To create the `syslog_ip` tag:

1. **Configure the proxy** to include the original source IP in the Syslog message payload.
   * **rsyslog example:** Use a template like `$template CustomFormat,"%fromhost-ip% %msg%\n"` to prepend the source IP to each message.
2. **Create a Log Processing Pipeline** to extract and map the IP address:
   1. In Datadog, navigate to [**Logs > Log Configuration > Pipelines**][3].
   2. Create a pipeline or select an existing one.
   3. Add a **Grok Parser** processor to extract the IP address from the message into a temporary attribute (for example, `@temp_ip`).
   4. Add a **Log Remapper** processor with the following configuration:
      * Source of the attribute: `@temp_ip` (or your chosen attribute name)
      * Target tag: `syslog_ip`
      * Preserve source attribute: Uncheck this option to remove the temporary attribute

[3]: https://app.datadoghq.com/logs/pipelines

{{% /tab %}}
{{< /tabs >}}

For more information, see the [Datadog Log Pipelines documentation][2].

## Verify Syslog messages

After your network devices are configured and the Datadog Agent is running, you can verify that Syslog data is being collected and sent to Datadog:

1. Navigate to the **[Log Explorer][4]** in your Datadog account.
2. In the search bar, filter by `source:syslog` (or whatever source you specified in your `conf.yaml` file).
   You should see your network device Syslog messages appearing in the Log Explorer.
3. Verify `syslog_ip`: Ensure that the `syslog_ip` tag is present and correctly populated with the network device's IP address for each relevant log entry.

   {{< img src="network_device_monitoring/syslog/log_explorer_syslog.png" alt="Log explorer, filtering by `source:syslog`, highlighting the `syslog_ip` tag on the side panel." style="width:100%;" >}}

4. Optionally, to observe Syslog messages in NDM, navigate to [**Infrastructure > Network Devices**][5].
    - Select a device that is configured to send Syslog messages.
    - In the device side panel, click the **Syslog** tab to view your Syslog messages:

    {{< img src="network_device_monitoring/syslog/syslog_tab.png" alt="Network Device Monitoring side panel, highlighting the Syslog tab." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
[2]: /logs/log_configuration/pipelines/
[4]: https://app.datadoghq.com/logs
[5]: https://app.datadoghq.com/devices
