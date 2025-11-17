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

Network Configuration Management (NCM) extends [Network Device Monitoring (NDM)][1] to include configuration awareness and change tracking.  

NCM enables you to monitor, audit, and understand the impact of configuration changes across your network infrastructure.

<!-- Placeholder image -->

{{< img src="/network_device_monitoring/config_mgmt/config_mgmt.png" alt="Network Device Management configuration tab" style="width:100%;" >}}

Network Configuration Management helps you:

- **Detect and audit configuration changes** across routers, switches, and other network devices.  
- **Understand the impact** of configuration changes on device and application performance.
- **Securely back up and restore** trusted configurations.  
- **Automate repetitive management tasks**, such as pushing config updates. 
- **Simplify toolchains** by consolidating monitoring and configuration management in Datadog.

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