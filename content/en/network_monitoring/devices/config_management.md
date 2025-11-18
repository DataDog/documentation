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

Network Configuration Management helps you:

- **Detect and audit configuration changes** across routers, switches, and other network devices.  
- **Understand the impact** of configuration changes on device and application performance.
- **Securely back up and restore** trusted configurations.  
- **Automate repetitive management tasks**, such as pushing config updates. 
- **Simplify toolchains** by consolidating monitoring and configuration management in Datadog.

## Prerequisites

- [Network Device Monitoring][2] must be configured on your devices.
- Datadog Agent version `7.74.0` and higher.

## Setup

Enable Network Configuration Management by configuring the following:

1. Add the config file in `network_config_management.d/conf.yaml` within the `conf.d` folder at the root of your Agent's configuration directory.
- **Namespace configuration**: The namespace must match the namespace used for device monitoring to ensure proper correlation.


See the example configuration below:

```yaml
init_config:
  namespace: 'default'
instances:
- ip_address: "1.2.3.4"
  auth:
    username: "user"
    password: "pass"
```
2. Restart the Agent after adding the configuration.

Adding new instances
An entry has to be added for connecting to device via SSH to be monitored (only SSH is supported right now)
Device profiles
There is only support for default profiles and they should be packaged with the agent and visible via the network_config_management.d directory that the conf.yaml lives in (default_profiles folder)




NCM is designed to complement specialized configuration tools by providing configuration management capabilities within the Datadog platform.

# Key capabilities

| Capability | Description |
|-------------|--------------|
| **Configuration monitoring and change tracking** | Automatically discover, store, and version network device configurations. View side-by-side diffs, and detect configuration changes in real time. |
| **Configuration backup and automation** | Schedule backups and automate configuration rollbacks to the last trusted version. Push configuration updates to devices from Datadog. |
| **Correlate impacts of configuration changes** | Link configuration changes to network health, device metrics, and application performance for faster root cause analysis. |
| **Vulnerability management** | Identify firmware vulnerabilities, view impacted devices, and mitigate issues with remote updates. |
| **Compliance enforcement** | Detect and remediate configuration policy violations to meet standards such as PCI, HIPAA, CIS, and SOX. |

---

## AI-powered insights

NCM uses large language models (LLMs) to help you interpret, summarize, and act on configuration changes without manually reviewing entire device configurations.

AI-powered capabilities include:

- **Explain configuration changes** in plain language  
- **Summarize recent changes** across your network within a given time window or scope  
- **Categorize change types**, such as interface, routing, security, or software updates  
- **Recommend remediations** or generate configuration fixes automatically  
- **Assist in root cause analysis** by correlating configuration changes with performance anomalies

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/devices/
[2]: /network_monitoring/devices/setup#configuration