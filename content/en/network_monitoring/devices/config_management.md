---
title: Network Device Configuration Management
description: "View and compare device configuration changes in NDM."
further_reading:
  - link: "/network_monitoring/devices/troubleshooting"
    tag: "Documentation"
    text: "NDM Troubleshooting"
---

<div class="alert alert-info">Network Configuration Management is in Preview. Contact your Datadog representative to sign up.</div>

## Overview

Network Configuration Management (NCM) extends [Network Device Monitoring (NDM)][1] to include configuration awareness and change tracking. NCM enables you to monitor, audit, and understand the impact of configuration changes across your network infrastructure.

<!-- Placeholder image -->
{{< img src="/network_device_monitoring/config_mgmt/network_device_config.png" alt="Network Device Management configuration tab" style="width:100%;" >}}

## Prerequisites

- [Network Device Monitoring][2] must be configured on your devices.
- Datadog Agent version `7.74.0` and higher.

## Setup

Enable Network Configuration Management by configuring the following:

1. Create a configuration file at `network_config_management.d/conf.yaml` within the `conf.d` folder at the root of your Agent's configuration directory. 

<div class="alert alert-info">Ensure the namespace matches the namespace used for device monitoring to enable proper correlation.</div>

Example:

   ```yaml
   init_config:
     namespace: 'default'
   instances:
   - ip_address: "1.2.3.4"
     auth:
       username: "user"
       password: "pass"
   ```

2. Restart the Agent to apply the configuration changes.


## AI-powered insights

NCM uses large language models (LLMs) to help you interpret, summarize, and act on configuration changes without manually reviewing entire device configurations.

AI-powered capabilities include:

- **Explain configuration changes** in plain language  
- **Summarize recent changes** across your network within a given time window or scope  
- **Categorize change types**, such as interface, routing, security, or software updates  
- **Recommend remmediations** or generate configuration fixes automatically  
- **Assist in root cause analysis** by correlating configuration changes with performance anomalies

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup#configuration