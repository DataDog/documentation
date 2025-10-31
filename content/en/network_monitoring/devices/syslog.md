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

Datadog's Network Device Monitoring (NDM) leverages Syslog to provide comprehensive visibility into the health and performance of your network infrastructure. By integrating your network devices with Datadog via Syslog, you can collect and analyze critical log data, gain insights into device behavior, troubleshoot issues, and ensure the overall stability of your network.

This documentation page outlines how to configure your network devices to send Syslog data to Datadog and how to effectively utilize this data within the NDM product.

## Prerequisites

Before you begin, ensure you have the following:

* **Datadog Agent (7.57+) installed and running** on a host that can receive Syslog messages from your network devices.  
* **Network devices configured** to send Syslog messages either directly to the Datadog Agent or via a proxy which then forwards to the Datadog Agent.

## Configuration Steps

### Configure the Datadog Agent for Syslog Collection

To enable Syslog collection, you need to modify the Datadog Agent's configuration files.

1. **Modify `datadog.yaml`:**  
   * Locate your main `datadog.yaml` configuration file.  
     * **Linux:** `/etc/datadog-agent/datadog.yaml`  
     * **Windows:** `C:\ProgramData\Datadog\datadog.yaml`  
     * **Docker:** In your Docker volume for `/etc/datadog-agent/datadog.yaml`  
   * Ensure the following settings are enabled:

```
logs_enabled: true # enable logs collection
logs_config:
  use_sourcehost_tag: true # adds a source_host tags to logs with the source IP
```

2. **Create a Syslog listener configuration:**  
   * Navigate to the Agent's configuration directory:  
     * **Linux:** `/etc/datadog-agent/conf.d/`  
     * **Windows:** `C:\ProgramData\Datadog\conf.d\`  
     * **Docker:** Mount a volume to `/conf.d/`  
   * Create a new directory `syslog.d/` inside `conf.d/`.  
   * Inside `syslog.d/`, create a file named `conf.yaml` with the following content:

```
logs:
  - type: syslog
    port: 514
    protocol: udp
    source: syslog
    service: <service> # optional tag
```

* **`port`**: The UDP or TCP port the Agent will listen on for Syslog messages. The standard Syslog port is 514\.  
  * **`protocol`**: Specify `udp` or `tcp` depending on how your devices send Syslog.  
  * **`source`**: A custom source name that will appear in Datadog for these logs. Use `syslog` here to correlate with NDM devices.  
  * **`service`**: A service name to associate with these logs, which can be used for unified service tagging in Datadog.  
3. **Restart the Datadog Agent** to apply the changes.  
   * **Linux:** `sudo systemctl restart datadog-agent`  
   * **Windows:** Restart the Datadog Agent service from the Services console.  
   * **Docker:** Restart the Docker container.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}