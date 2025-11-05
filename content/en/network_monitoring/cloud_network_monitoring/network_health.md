---
title: Network Health
description: Identify network issues and resolve them with actionable insights.
aliases:
- /network_monitoring/cloud_network_monitoring/overview_page
further_reading:
    - link: 'https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/'
      tag: 'Blog'
      text: 'Monitor your cloud architecture and app dependencies with Datadog CNM'
    - link: '/network_monitoring/cloud_network_monitoring/network_analytics'
      tag: 'Documentation'
      text: 'Learn more about Network Analytics'
---
<div class="alert alert-info">Network Health is in Preview. Contact your Datadog representative to sign up.
</div>

## Overview

Network Health helps you identify and resolve network issues without requiring deep networking expertise. Instead of manually analyzing data across multiple views, Network Health surfaces known network problems with deterministic root causes and provides straightforward remediation paths.

Network Health answers three critical questions:
- Is the network the problem?
- If yes, where is the problem?
- How can it be fixed?

The page prioritizes issues based on their impact to your services, ensuring you focus on problems affecting your most important traffic flows.

**PLACEHOLDER SCREENSHOT FROM ORG2**

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="The Network Health page showing recommended actions and root causes" style="width:100%;">}}

## Prerequisites

- [Cloud Network Monitoring][1] enabled
- Agent version 7.33 or later

## Key sections

### Recommended actions

The **Recommended Actions** section appears at the top of the page and highlights the most critical issues detected in your network. These are prioritized based on two factors:

1. **Severity**: Problems that are actively blocking traffic
2. **Impact**: Issues affecting services that are important to your infrastructure

Each recommended action displays:
- The specific problem detected (for example, "TLS certificate expired 5 days ago")
- **Impacted client service**: The service making requests
- **Impacted server service**: The service receiving requests
- A direct path to remediation

Click on a service name to pivot to APM for additional context about the affected service.

### Watchdog Insights

The **Watchdog Insights** section displays anomalous network behavior detected by Watchdog, specifically focusing on TCP retransmits. A spike in TCP retransmits compared to your baseline (typically the previous week) often indicates an underlying network issue.

While Watchdog Insights provide less definitive root cause identification than other sections, they help you:
- Detect potential problems early
- Correlate anomalies with specific root causes listed below
- Investigate performance degradation before it impacts users

### Root causes

Network Health detects three types of root causes that commonly disrupt network connectivity:

#### TLS certificates

TLS certificates that have expired or are about to expire prevent secure connections between services, resulting in dropped traffic. This section lists:

- **Expired certificates**: Certificates that are invalid and blocking traffic
- **Expiring certificates**: Certificates about to expire, allowing you to take preventative action
- **Impacted services**: The client and server services affected by each certificate issue

**Resolution**: Click **Renew Certificate** to initiate the certificate renewal process directly from the Network Health page.

#### Security groups

Security groups control traffic flow in cloud environments (such as AWS) through allow and deny rules. Since security groups deny traffic by default, accidental rule deletions or modifications can immediately block legitimate traffic between services.

This section identifies:
- Security group misconfigurations blocking traffic
- The specific services unable to communicate
- Recent changes to security group rules

**Resolution**: 
1. Click on a security group issue to open the side panel.
2. Select **View in AWS** to navigate to the AWS console.
3. Review and modify the inbound and outbound rules.
4. Use Infrastructure Change Tracking data in the side panel to identify when the problematic change occurred, making it easier to revert specific modifications.

#### DNS failures

DNS server misconfigurations can route traffic to incorrect destinations, preventing services from communicating. DNS failures typically result from changes made to DNS server routing configurations.

This section shows:
- DNS servers experiencing elevated failure rates
- Services impacted by DNS resolution issues
- The timing of DNS failure spikes

**Resolution**:
1. Click on a DNS failure to view details in the side panel.
2. Navigate to your DNS server configuration.
3. Review recent routing changes.
4. Correlate DNS failure timing with Infrastructure Change Tracking to identify and revert problematic changes.

## Filtering

Use the filters at the top of the page to narrow the scope of displayed issues. Available filters include:

- **Data center**: Focus on issues within a specific data center
- **Service**: View problems affecting a particular service
- **Team**: Filter issues by team ownership
- **Environment**: Isolate production, staging, or other environment issues

Filtering is especially useful for large organizations where viewing all network issues at once may be overwhelming.

## Investigating issues

To investigate an issue in detail:

1. Click on any row in the Recommended Actions or root cause sections.
2. A side panel opens with:
   - Additional context about the problem
   - Detailed impact analysis
   - Multiple remediation options
   - Links to related telemetry and logs
3. Take action directly from the side panel or pivot to related tools (APM, AWS console, Infrastructure Change Tracking).

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup
