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

Network Health provides a unified view of your network's most critical issues, automatically detecting and prioritizing problems across DNS, TLS certificates, security groups, and network anomalies. It surfaces actionable insights with clear remediation paths, helping you resolve connectivity issues and reduce incident impact.

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="The Network Health page with the collapsible menu open, highlighting Recommended Actions." style="width:100%;">}}

## Prerequisites

- [Cloud Network Monitoring][1] enabled

## Recommended actions

The **Recommended Actions** section highlights the most critical issues detected in your network. These are prioritized based on two factors:

1. **Severity**: Problems that are actively blocking traffic.
2. **Impact**: Issues affecting services that are important to your infrastructure.

Each recommended action displays:

- The specific problem detected (for example, "TLS certificate expired _N_ days ago").
- **Impacted client service**: The service making requests.
- **Impacted server service**: The service receiving requests.

Hover over a service name to pivot to APM, or click on a recommended action to view remediation steps along with options to create a [New workflow,][2] [Create a Case][3], or [Declare an Incident][4].

   {{< img src="network_performance_monitoring/network_health/recommended_actions_side_panel.png" alt="Recommended actions side panel of an affected service, showing remediation steps." style="width:100%;">}}

## Watchdog Insights

The **Watchdog Insights** section displays anomalous network behavior detected by Watchdog, specifically focusing on TCP retransmits. A spike in TCP retransmits compared to your baseline (typically the previous week) often indicates an underlying network issue.

Watchdog Insights help you:
- Detect potential problems early.
- Correlate anomalies with specific root causes.
- Investigate performance degradation before it impacts users.

## TLS certificates

TLS certificates that have expired or are about to expire prevent secure connections between services, resulting in dropped traffic. This section lists:

- **Expired certificates**: Certificates that are invalid and blocking traffic.
- **Expiring certificates**: Certificates about to expire, allowing you to take preventative action.
- **Impacted services**: The client and server services affected by each certificate issue.

Click on an expired certificate to view remediation steps for renewing it in AWS, along with options to create a [New workflow,][2] [Create a Case][3], or [Declare an Incident][4].

## DNS failures

DNS server misconfigurations can route traffic to incorrect destinations, preventing services from communicating. DNS failures typically result from changes made to DNS server routing configurations.

This section shows:

- DNS failure reason.
- **DNS servers** experiencing elevated failure rates.
- **Impacted services**: The client and server services affected by each DNS failure issue.

**Failure reasons**:

NXDOMAIN  
: The domain name does not exist. This typically indicates a misconfiguration or the domain has been removed.

TIMEOUT 
: The DNS query timed out before receiving a response. This may indicate network issues or unresponsive DNS servers.

SERVFAIL
: The DNS server failed to process a query, often due to a server-side problem.

Hover over a service name to pivot to APM, or click on a recommended action to view remediation steps along with options to create a [New workflow,][2] [Create a Case][3], or [Declare an Incident][4].

## Security groups

Security groups control traffic flow in cloud environments (such as AWS) through allow and deny rules. Since security groups deny traffic by default, accidental rule deletions or modifications can immediately block legitimate traffic between services.

This section identifies:
- Security group misconfigurations blocking traffic.
- The specific services unable to communicate.
- Recent changes to security group rules.

**Resolution**: 
1. Click on a security group issue to open the side panel.
2. Select **View in AWS** to navigate to the AWS console.
3. Review and modify the inbound and outbound rules.
4. Use the **Infrastructure Change Tracking** data in the side panel to identify when the problematic change occurred, making it easier to revert specific modifications.

## Filtering

Use the filters at the top of the page to narrow the scope of displayed issues. Available filters include:

- **Service**: View problems affecting a particular service.
- **Team**: Filter issues by team ownership.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup
[2]: /service_management/case_management/create_case
[3]: /actions/workflows/build/
[4]: /service_management/incident_management/declare/