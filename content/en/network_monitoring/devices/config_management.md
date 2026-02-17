---
title: Network Configuration Management
description: "View and compare device configuration changes in NDM."
further_reading:
  - link: "/network_monitoring/devices/troubleshooting"
    tag: "Documentation"
    text: "NDM Troubleshooting"
site_support_id: network_config_management
---

<div class="alert alert-info">Network Configuration Management is in Preview. To request access and receive the custom Datadog Agent build, contact your Datadog representative.</div>

## Overview

Network Configuration Management (NCM) extends [Network Device Monitoring (NDM)][1] to include configuration awareness and change tracking. NCM allows you to:

- Monitor how device configurations change over time
- Compare two configuration versions side by side
- Use AI-generated summaries to understand changes and their potential impact during incidents

{{< img src="/network_device_monitoring/config_mgmt/network_device_config_redacted.png" alt="Network Device Management configuration tab, showing the most recent configuration and an AI summary of what changed." style="width:100%;" >}}

**Note**: NCM is read-only in Preview. 

## Prerequisites

- [Network Device Monitoring][3] (NDM) must be configured on your devices.
- Install the custom Datadog Agent build provided by your Datadog representative.

## Setup

1. In the Agent's root configuration directory at `conf.d/network_config_management.d/`, create the `conf.yaml` file and configure it as follows:

   ```yaml
     init_config:
       ## @param namespace - string - optional - default: default
       ## The namespace should match namespaces of devices being monitored
       namespace: default
       ## @param min_collection_interval - integer - optional - default: 900 (15 minutes)
       min_collection_interval: 900
       ## @param ssh - object - optional
       ## Global SSH configuration that applies to all device instances unless 
       ## overridden at the device level. 
       ssh:
         ## @param timeout - duration - optional - default: 30 (seconds)
         ## Maximum time for the SSH client to establish a TCP connection.
         timeout: 30
         ## @param known_hosts_path - string - required (unless insecure_skip_verify is true)
         ## Path to the known_hosts file containing public keys of servers to 
         ## verify the identity of remote hosts. Required for secure connections.
         known_hosts_path: /path/to/known_hosts
         ## @param insecure_skip_verify - boolean - optional - default: false
         ## Skip host key verification. This is INSECURE and should only be used
         ## for development/testing purposes.
         insecure_skip_verify: false 
      instances:
        ip_address - string - required
        ## The IP address of the network device to collect configurations from.
        ip_address: <IP_ADDRESS>
        ## @param auth - object - required
        ## Authentication credentials to connect to the network device.
        auth:
          ## @param username - string - required
          ## Username to authenticate to the network device.
          username: <USERNAME>
          ## @param password - string - required (if private_key_file is not provided)
          ## Password to authenticate to the network device.
          ## Used as a fallback after private key authentication if both are provided.
          password: <PASSWORD>
          ## @param private_key_file - string - optional
          ## Path to the SSH private key file for authentication.
          ## At least one of password or private_key_file must be provided.
          private_key_file: /path/to/private_key
   ```

2. Optionally, if your devices require specific SSH algorithms, use the following configuration:

   ```yaml
   init_config:
     ## @param ciphers - list of strings - optional
     ## List of SSH encryption ciphers to use for the connection.
     ## If not specified, the SSH library will use its default ciphers.
     ssh:
       ciphers: [aes128-gcm@openssh.com, aes128-ctr, aes192-ctr]
       key_exchanges: [diffie-hellman-group14-sha256, ecdh-sha2-nistp256]
       host_key_algorithms: [ssh-ed25519]
   ```
   
3. Restart the Agent to apply the configuration changes.

## Viewing configurations

Network Configuration Management is accessible from the device side panel in Network Device Monitoring:

1. Navigate to [Network Device Monitoring][3].
2. Select a device from the device list or from any NDM visualization such as [Device Geomap][4] or the [Device Topology][5] map.
3. Open the **Configuration** tab in the device side panel.

   {{< img src="/network_device_monitoring/config_mgmt/config_tab_redacted.png" alt="Network Device Management side panel, highlighting the Configuration tab." style="width:100%;" >}}

   On the Configuration tab, you can filter what the configuration list displays:
   - **All**: Shows both running and startup configurations
   - **Running**: The active, live configuration running on the device
   - **Startup**: The saved configuration that loads when the device boots

### Time picker and retention

The time controls at the top of the page allow you to select which configuration history to view. You can extend this range to view older versions, up to the retention limit (1 year).

The timeline and configuration version list automatically update based on your selected time range.

**Note**: Configuration history begins when NCM is enabled for your account. Historical data prior to enablement is not available.

### View a configuration at a point in time

Selecting a configuration event from the timeline or list opens a single configuration view showing the state of the device at that moment.

The single-configuration view displays:

- The complete configuration for the selected timestamp
- Device metadata including time and device identity

You can scroll through the configuration to investigate the device state during an incident, or adjust the time range to view configurations from different time periods.

### Compare configuration versions

To see what changed between configuration versions:

1. Select two configurations from the history list or timeline using the checkboxes. 
2. Click **Compare Two Configs** to open the comparison view.

   {{< img src="/network_device_monitoring/config_mgmt/compare_two_configs_2.png" alt="Network Device Management configuration tab, highlighting the Compare Two Configs option." style="width:100%;" >}}

The comparison view shows both configurations side by side with inline diffs that highlight changed lines. You can switch between different configuration pairs without closing the comparison view.

   {{< img src="/network_device_monitoring/config_mgmt/config_screen_split_2.png" alt="Network Device Management configuration tab, comparing two versions in split view" style="width:90%;" >}}

## AI summaries

Network Configuration Management includes an AI-powered summary panel that translates configuration changes into natural language explanations.

When you compare two configuration versions, the AI summary automatically:

- Describes changes in human-readable terms
- Highlights changes that may be relevant for incident investigation or risk analysis

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup#configuration
[3]: https://app.datadoghq.com/devices
[4]: /network_monitoring/devices/geomap
[5]: /network_monitoring/devices/topology
[6]: /network_monitoring/devices/supported_devices#vendor-profiles
[7]: https://github.com/DataDog/datadog-agent/tree/main/cmd/agent/dist/conf.d/network_config_management.d/
