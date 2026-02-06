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
    - link: "https://www.datadoghq.com/blog/cnm-network-health"
      tag: "Blog"
      text: "Detect, diagnose, and resolve network issues easily with CNM Network Health"
---
<div class="alert alert-info">Network Health is in Preview. Contact your Datadog representative to sign up.
</div>

## Overview

Network Health provides a unified view of your network's most critical issues, automatically detecting and prioritizing problems across DNS, TLS certificates, security groups, and network anomalies. It surfaces actionable insights with clear remediation paths, helping you resolve connectivity issues and reduce incident impact.

This page describes the sections of the Network Health page and the issues and insights surfaced in each.

{{< img src="network_performance_monitoring/network_health/network_health_overview.png" alt="The Network Health page with the collapsible menu open, highlighting Recommended Actions." style="width:100%;">}}

## Prerequisites

- [Cloud Network Monitoring][1] is enabled.
- To view [Security Groups](#security-groups), [resource collection][6] must enabled in your AWS integration.

## Recommended Actions

The **Recommended Actions** section highlights the most critical issues detected in your network. These are prioritized based on:

1. **Severity**: Whether the issue is actively blocking traffic
2. **Impact**: How critical the affected services are to your infrastructure

Each recommended action displays:

- The specific problem detected (for example, "TLS certificate expired _N_ days ago")
- The impacted client service (the service making requests)
- The impacted server service (the service receiving requests)

Hover over a service name to pivot to APM, or click **Remediate** to view remediation steps along with options to create a [New Workflow][2], [Create a Case][3], or [Declare an Incident][4].

   {{< img src="network_performance_monitoring/network_health/recommended_actions_side_panel.png" alt="Recommended actions side panel of an affected service, showing remediation steps." style="width:100%;">}}

## Watchdog Insights

The **Watchdog Insights** section displays anomalous network behavior detected by Watchdog, focusing on spikes in TCP retransmits. An increase in retransmits compared to your baseline (typically the previous week) often indicates an underlying network issue. See the [Watchdog Insights][5] documentation for more information.

Use Watchdog Insights to:
- Detect potential problems early
- Correlate anomalies with specific root causes
- Investigate performance degradation before it impacts users

## TLS certificates

Expired or expiring TLS certificates can block secure connections between services, resulting in dropped traffic. The **TLS Certificates** section lists:

- **Expired certificates**: Certificates that are invalid and blocking traffic
- **Expiring certificates**: Certificates about to expire
- **Impacted services**: The client and server services affected by each certificate issue (note that the client "service" may be an AWS load balancer, such as an Application Load Balancer)

Click an expired certificate to view steps for renewing it in AWS, or to create a [New Workflow][2], [Create a Case][3], or [Declare an Incident][4].

## DNS failures

DNS misconfigurations can route traffic to incorrect destinations, preventing services from communicating. These failures typically result from changes made to DNS routing configurations.

The **DNS Failures** section shows:

- **Failure reason**: The cause of the DNS failure
- **Impacted DNS server**: The DNS server experiencing elevated failure rates
- **Impacted services**: The client and server services affected by the DNS failure

**Failure reasons**:

NXDOMAIN  
: The domain name does not exist, usually due to a misconfiguration or removed domain.

TIMEOUT 
: The DNS query timed out before receiving a response, which may indicate network issues or unresponsive DNS servers.

SERVFAIL
: The DNS server failed to process a query, often due to a server-side problem.

Hover over a service name to pivot to APM, or click on a recommended action to view remediation steps along with options to create a [New workflow][2], [Create a Case][3], or [Declare an Incident][4].

## Security groups

Security groups control traffic flow in cloud environments through allow and deny rules. Because security groups deny traffic by default, accidental rule deletions or modifications can immediately block legitimate traffic between services.

**Note**: Security group monitoring is available only for AWS and requires [EC2 resource collection][6] to be enabled in your AWS integration.

The **Security Groups** section identifies:
- Security group misconfigurations blocking traffic
- The specific services unable to communicate
- Recent changes to security group rules

**Resolution**: 
1. Click on a security group issue to open the side panel.
2. Select **View in AWS** to navigate to the AWS console.
3. Review and modify the inbound and outbound rules.
4. Use the **Infrastructure Change Tracking** data in the side panel to identify when the change occurred and revert it if necessary.

## Filtering

Use the filters at the top of the page to narrow the scope of displayed issues. Available filters include:

- **Service**: View issues affecting a particular service
- **Team**: View issues owned by a specific team

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/setup
[2]: /actions/workflows/build/
[3]: /incident_response/case_management/create_case
[4]: /incident_response/incident_management/declare/
[5]: /watchdog/insights
[6]: /integrations/amazon-web-services/#resource-collection