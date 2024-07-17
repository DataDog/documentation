---
title: Flex Logs
description: Cost effective live query capabilities over long term retention of Logs
aliases:
  - /logs/log_configuration/flex_log/
further_reading:
- link: "https://www.datadoghq.com/blog/flex-logging"
  tag: "Blog"
  text: "Store and analyze high-volume logs efficiently with Flex Logs"
- link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
  tag: "Blog"
  text: "Monitor DNS logs for network and security analysis"
- link: "/logs/log_configuration/indexes"
  tag: "Documentation"
  text: "Log Indexes"
- link: "/logs/log_configuration/archives"
  tag: "Documentation"
  text: "Log Archives"
---

## Overview

As your organization scales, the volume of logs collected from your infrastructure and applications grows along with it. The use cases for your logs increase in complexity as well. For example, you might be collecting logs from your infrastructure, applications, security tools, network, and so forth. All of these use cases have varying retention and querying needs.

With Flex Logs, your teams can determine the query capacity they need to meet their use case, whether it's a time-critical incident, a security investigation, or a compliance audit. By decoupling storage from compute costs, Flex Logs provides cost-effective, long-term retention of your logs.

Some example use cases for Flex storage include:

- Retaining logs for long term auditing.
- Retaining logs for compliance and legal reasons.
- Need all logs for security investigations.
- Need to query logs for reporting and analytics for high cardinality data over long time periods.

## When to use Flex Logs

Datadog Log Management provides the following solutions:

- Standard Indexing for logs that you need to query frequently and only need to be retained short-term, such as application logs.
- Flex Logs for logs that need to be retained long-term, but sometimes need to be queried urgently, such as security, transaction, and network logs.
- Archiving for logs that are infrequently queried and need to be stored long-term, such as audit and configuration logs.

Use the spectrum of log types shown in the image below to determine when to use the Flex Logs tier. Any high volume, infrequent access, or long term retention log sources are good candidates. You can also retain logs in Standard Indexing first and then extend them using Flex Logs; this is a perfect solution for application logs that you need to retain for longer. See [Potential sources for sending directly to the Flex Logs tier](#potential-sources-for-sending-directly-to-the-flex-logs) for more information.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Logs indexing and access frequency spectrum graph" style="width:100%;" >}}

**Notes**:
- Monitors are not supported in Flex Logs.
- Watchdog is not supported in Flex Logs.
- Dashboards are supported in Flex Logs; however, make sure to consider these dashboard queries when you choose your compute size.

## Compute sizes

Compute is the querying capacity to run queries for Flex Logs. It is used when querying logs in the Flex Logs tier. It is not used for ingestion or when only searching Standard Indexing logs. The available compute tiers are:

<div class="alert alert-warning">The compute sizes available for US3, US5, AP1, US1-FED are XS and S.</div>

- Extra small (XS)
- Small (S)
- Medium (M)
- Large (L)

Each compute tier is approximately 2X the query performance and capacity of the previous tier. The compute size is constrained by the CPU, number of concurrent queries, and the maximum limit on how many logs can be scanned per query

### Determine the compute size that you need

The query performance of a compute tier depends on several factors:

- Volume: The amount of data stored in the Flex tier.
- Time window: The query's timespace, for example a 15-minute window compared to a 1-month window of logs.
- Complexity: The type of query you run, for example, whether it is performing multiple levels of aggregation, using multiple filters, and so on.
- Concurrency: The number of users concurrently querying Flex Logs.

Consider the following factors when deciding on a compute tier:

- Your daily log volume and the number of logs stored in the Flex tier.
- The number of users regularly querying Flex tier logs.
- The frequency and types of queries you run. For example, the query time windows you typically use to query your logs.

The number of logs stored in the Flex tier has the largest impact on the size needed to performantly query the data. Datadog recommends the following compute sizes based on log volume:
| Size                                      | Volume (events stored)   |
| ----------------------------------------- | ------------------------ |
| Extra Small (XS)                          | 20 - 50 billion          |
| Small (S)                                 | 50 - 200 billion         |
| Medium (M)                                | 200 - 500 billion        |
| Large (L)                                 | 500 billion - 1 trillion |
| Contact your [Customer Success Manager][7]| 1T+                      |

**Note**: The recommended number of users is not the number of concurrent queries. However, it is more likely for queries to run concurrently as the number of users increases. Therefore, the available concurrency is higher for queries run on larger compute instances than on smaller instances.

Queries that push the limits of the concurrency of a compute tier, slows down the return of the query results and can also cause other concurrent queries to slow down. See the [When the compute limit is reached](#when-the-compute-limit-is-reached) section.

Compute tiers are billed at a flat rate. See the [pricing page][6] for more information.

## Enable and disable Flex Logs

You can enable or disable Flex Logs at the organization level. You must have the `flex_logs_config_write` permission to do so.

If Flex Logs is part of your contract, the compute options available on your contract is shown in the UI.

If Flex Logs is not in your contract, you can enable Flex Logs through the self-serve onboarding option. For self-serve Flex Logs, choose from the following compute sizes:

- Starter
- Extra Small
- Small

To enable Flex Logs:
1. Navigate to the [Flex Logs Control][5] page.
1. Select **Compute Type**.
    - Datadog recommends the **Starter** compute size for organizations with less than 10B logs stored.
    - Datadog recommends the scalable compute options (For example, XS, S, M, and L) for organizations with greater than 10B logs stored.
1. Select the compute size you want. See [Determine the compute size that you need](#determine-the-compute-size-that-you-need) for more information.
1. Click **Enable Flex Logs**.

### Offboard from self-serve Flex Logs

To disable Flex Logs:

1. Remove Flex Storage from each index where Flex Logs is enabled.
1. Navigate back to the [Flex Logs Control][5] page.
1. Click **Disable Flex Logs**.

## Upgrade and downgrade Flex Logs compute

If you select one of the scalable compute options for Flex Logs (for example, XS, S, M, or L), you can upgrade or downgrade your compute size on the [Flex Logs Control][5] page.

**Notes**:
- Only compute options on your contract are made available. If Flex Logs is not in your contract, select between the XS and S compute options.
- A compute instance can be upgraded at any time.
- A compute instance can be downgraded once per 15 days.

## Configure storage tiers

Flex Logs is set up within log index configurations. [Index filters][1] that apply to that index also apply to Flex logs.

Configure Flex Tier in the [Logs Index Configuration][2] page:

1. Navigate to the [Indexes][2] page.
2. Edit the index you wish to enable with Flex Logs or create a new index.
3. Select **Flex Tier** and set the retention under *Configure Storage Tier and Retention*.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Options for the Flex tier storage within the index configuration" style="width:100%;" >}}

**Notes**:
- If both are selected, logs are stored in the Standard Tier until the end of the configured retention period before they are stored in the Flex Tier. For example, you select Standard Tier with a retention of 3 days and Flex Tier with a retention of 90 days. The logs in that index are first stored in the Standard Tier for 3 days and then stored in the Flex Tier for the remaining 87 days totalling a 90 day retention.
- Adding the Standard Tier to a Flex index applies to new logs, not pre-existing logs in the Flex index.
- If you are already indexing logs, adding the Flex Tier extends the retention of all logs currently stored in the index and the new logs that are going into the index.
- If you want to remove Standard Indexing and add the Flex Tier, make the changes and save it as one action.
- If you remove Standard Indexing, the logs are no longer queryable in monitors or in Watchdog Insights.
- If you add back Standard Indexing to an index that only has Flex Tier, only the new logs going into the index are stored in Standard Indexing.

## Search Flex indexes

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Enable Flex Logging on the Log Explorer page by toggling the option" style="width:100%;" >}}

In the Log Explorer, toggle the **Include Flex Logs** option to include Flex Tier logs in your search query results. Find this option next to the time picker.

[Search][3] by typing in queries in the search bar or by selecting the relevant facet in the facet panel.

You can add Flex Log queries to dashboards, but make sure to consider these dashboard queries when you choose your compute size.

**Note**: Monitor queries are not supported for Flex Logs.

## Additional information

### Potential sources for sending directly to the Flex Logs

The following list is an example of log sources that are potentially good candidates for sending logs directly to the Flex Tier, therefore not going to Standard Indexing first. This is not an exhaustive list and is meant to give you an idea about the types of logs that are suitable for this configuration. Other log sources (for example, application logs) can still be sent to the Flex Tier after going to Standard indexing first for live troubleshooting, alerting, and debugging use cases. Your use cases for these sources could vary, and that is important to consider when making the decision to skip Standard Indexing.

**Note**: These examples are just a sample for each category. There are many more services, tools, and technologies available for each category that you might want to send to the Flex Tier.

| Technology                             | Examples                                                                                   |
|----------------------------------------|--------------------------------------------------------------------------------------------|
| CDN services                           | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| DNS services                           | Route53, Cloudflare, Akamai (Edge), NS1                                                    |
| Firewall logs and Firewall appliances  | AWS Web Application Firewall (WAF), Barracuda WAF, pfSense, Checkpoint, Sophos, FortiNet   |
| Cloud network services                 | AWS VPC, Direct Connect, PrivateLink, AWS NAT Gateway, Azure Basition, Virtual WAN         |
| Loadbalancers                          | AWS ELB, ALB, NLB (GCP and Azure flavors), F5, NGINX                                       |
| Artifact repository management         | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| Identity services and tools            | Cisco ISE, Okta, OneLogin, Workday User Activity Logs                                      |
| Audit logs                             | Cloud Provider Audit Logs (e.g., CloudTrail), Kubernetes audit, Microsoft 365 audit        |
| Physical network appliances            | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| Network Flow logs                      | Cisco NetFlow, IPFIX, sFlow, AWS VPC FlowLogs                                              |
| VPN services                           | AWS, GCP, and Azure VPN, Tailscale, Twingate, OpenVPN, ZeroTier, WireGuard                 |
| CI/CD services and tools               | GitLab, GitHub Actions, ArgoCD, Jenkins, CircleCI, TeamCity, AWS CodePipeline              |
| Service mesh                           | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |
| Caching                                | Varnish, Memcached, Redis                                                                  |

- **CDN services examples**
  - Akamai, Cloudflare, Fastly, and CloudFront.
- **DNS services examples**
  - Route53, Cloudflare, Akamai (Edge),and NS1.
- **Firewall logs and Firewall appliances examples**
  - AWS Web Application Firewall (WAF), Barracuda WAF, pfSense, Checkpoint, Sophos, and FortiNet.
- **Cloud network services (VPC, Gateways, NAT, and WAN) examples**
  - AWS VPC, Direct Connect, PrivateLink, AWS NAT Gateway, Azure Basition, and Virtual WAN.
- **Loadbalancers examples**
  - AWS ELB, ALB, NLB (GCP and Azure flavors), F5, and NGINX.
- **Artifact repository management examples**
  - [JFrog Artifactory][4], Archiva, Sonatype Nexus
- **Identity services and tools examples**
  - Cisco ISE, Okta, OneLogin, and Workday User Activity Logs.
- **Audit logs examples**
  - Cloud Provider Audit Logs (for example, CloudTrail), Kubernetes audit, and Microsoft 365 audit.
- **Physical network appliances examples**
  - Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, and Barracuda.
- **Network Flow logs examples**
  - Cisco NetFlow, IPFIX, sFlow, and AWS VPC FlowLogs.
- **VPN services examples**
  - AWS, GCP, and Azure VPN, Tailscale, Twingate, OpenVPN, ZeroTier, and WireGuard.
- **CI/CD services and tools examples**
  - GitLab, GitHub Actions, ArgoCD, Jenkins, CircleCI, TeamCity, and AWS CodePipeline.
- **Service mesh examples**
  - Anthos, Istio, proxyv2, consul, Linkerd, and Kong.
- **Caching examples**
  - Varnish, Memcached, and Redis.

### Flex Logs for multiple-organization accounts

For each organization in which you want Flex Logs, you must enable a compute instance for each organization. Compute instances cannot be shared across organizations.

Datadog generally recommends Flex Logs scalable compute sizes (XS, S, M, and L) for organizations with large log volumes. In a multi-organization setup, there are often many organizations with lower log volumes, so for these organizations Datadog recommends using Standard Indexing for shorter retentions and Flex Logs Starter for longer retentions.

### When the compute limit is reached

When your organization reaches the compute limit in terms of concurrent queries, you many experience slower queries because queries continue to retry until capacity is available. If a query retries multiple times, it may fail to run. In such situations, there is an error message that says Flex Logs compute capacity is constrained and you should contact your admin.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com
