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
- link: "https://www.datadoghq.com/blog/cloud-siem-flex-logs/"
  tag: "Blog"
  text: "Cloud SIEM and Flex Logs: Enhanced security insights for the cloud"
- link: "/logs/guide/flex_compute"
  tag: "Documentation"
  text: "Monitor Flex Compute Usage"
- link: "/logs/log_configuration/indexes"
  tag: "Documentation"
  text: "Log Indexes"
- link: "/logs/log_configuration/archives"
  tag: "Documentation"
  text: "Log Archives"
- link: "/logs/guide/reduce_data_transfer_fees"
  tag: "Documentation"
  text: "How to send logs to Datadog while reducing data transfer fees"
- link: "https://www.datadoghq.com/blog/optimize-high-volume-logs/"
  tag: "blog"
  text: "How to optimize high-volume log data without compromising visibility"
- link: "https://www.datadoghq.com/blog/monitor-flex-compute-usage/"
  tag: "Blog"
  text: "Monitor and optimize your Flex Logs compute usage"
- link: "https://www.datadoghq.com/blog/flex-logs/"
  tag: "Blog"
  text: "Store and analyze high-volume logs efficiently with Flex Logs"
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

- Standard Indexing for logs that need to be queried frequently and retained short term, such as application logs.
- Flex Logs for logs that need to be retained long-term, but sometimes need to be queried urgently, such as security, transaction, and network logs.
- Archiving for logs that are infrequently queried and need to be stored long-term, such as audit and configuration logs.

Use the spectrum of log types shown in the image below to determine when to use the Flex Logs tier. Any high volume, infrequent access, or long term retention log sources are good candidates. You can also retain logs in Standard Indexing first and then extend them using Flex Logs; this is a perfect solution for application logs that you need to retain for longer. See [Potential sources for sending directly to the Flex Logs tier](#potential-sources-for-sending-directly-to-flex-logs) for more information.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Logs indexing and access frequency spectrum graph" style="width:100%;" >}}

**Notes**:
- Monitors are not supported in Flex Logs.
- Watchdog is not supported in Flex Logs.
- Dashboards are supported in Flex Logs; however, make sure to consider these dashboard queries when you choose your compute size.

## Compute sizes

Compute is the querying capacity to run queries for Flex Logs. It is used when querying logs in the Flex Logs tier. It is not used for ingestion or when only searching Standard Indexing logs. The available compute tiers are:

<div class="alert alert-danger">The compute sizes available for US3, US5, AP1, AP2, and US1-FED are Starter, XS and S.</div>

- Starter
- Extra small (XS)
- Small (S)
- Medium (M)
- Large (L)

Each compute tier is approximately 2X the query performance and capacity of the previous tier. The compute size is constrained by two factors: the number of concurrent queries and the [fair use limit](#fair-use-limit).

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
| Size                                      | Volume (cumulative events stored)   |
| ----------------------------------------- | ------------------------ |
| Starter                                   | < 10 billion             |
| Extra Small (XS)                          | 10 - 50 billion          |
| Small (S)                                 | 50 - 200 billion         |
| Medium (M)                                | 200 - 500 billion        |
| Large (L)                                 | 500 billion - 1 trillion |
| Contact your [Customer Success Manager][7]| 1T+                      |

Scalable (XS, S, M, L) compute tiers are billed at a flat rate. Flex Logs Starter is billed at a bundled storage+compute rate. See the [pricing page][6] for more information.

## Enable and disable Flex Logs

You can enable or disable Flex Logs at the organization level. You must have the [`flex_logs_config_write`][8] permission.

If Flex Logs is part of your contract, the compute options available on your contract is shown in the UI.

If Flex Logs is not in your contract, you can enable Flex Logs Starter through the self-serve onboarding option.

To enable Flex Logs:
1. Navigate to the [Flex Logs Control][5] page.
1. Select **Compute Type**.
    - Datadog recommends the **Starter** compute size for organizations with less than 10B logs stored.
    - Datadog recommends the scalable compute options (For example, XS, S, M, and L) for organizations with greater than 10B (or 2-3B per month) of logs stored.
1. Select the compute size you want. See [Determine the compute size that you need](#determine-the-compute-size-that-you-need) for more information.
1. Click **Enable Flex Logs**.

### Offboard from self-serve Flex Logs

To disable Flex Logs:

1. Remove Flex Storage from each index where Flex Logs is enabled.
1. Navigate back to the [Flex Logs Control][5] page.
1. Click the gear icon and select **Disable Flex Logs**.

## Upgrade and downgrade Flex Logs compute

If you select one of the scalable compute options for Flex Logs (for example, XS, S, M, or L), you can upgrade or downgrade your compute size on the [Flex Logs Control][5] page.

**Notes**:
- Only compute options on your contract are made available. Upgrading from Flex Starter to a scalable compute option does not apply the change automatically. To enable the new size, go to the [Flex Logs Controls][5] page, select the desired compute option, then click **Save**.
- A compute instance can be upgraded at any time.
- A compute instance can be downgraded once per 15 days.

## Configure storage tiers

Flex Logs is set up within log index configurations. [Index filters][1] that apply to that index also apply to Flex Logs. With Flex Logs Starter, you can store logs for 3, 6, 12, or 15 months. With a scalable compute option, you can store logs for 30-450 days. 

Configure Flex Tier in the [Flex Logs Controls][5] page:

1. Click [Indexes Configuration][2].
2. Edit the index you wish to enable with Flex Logs or create a new index.
3. Select **Flex Tier** and set the retention under *Configure Storage Tier and Retention*.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Options for the Flex tier storage within the index configuration" style="width:100%;" >}}

**Note**: If both tiers are selected, logs are stored in the Standard Tier until the end of the configured retention period, before they are stored in the Flex Tier. For example, if you select Standard Tier with a retention of 3 days and Flex Tier with a retention of 90 days: logs in that index are first stored in the Standard Tier for 3 days and then stored in the Flex Tier for the remaining 87 days.

The following table explains the impact of adding or removing different storage tiers to an index.

<table>
  <tr align="center">
    <td colspan="2"><strong>Existing Index Configuration</strong></td>
    <td rowspan="2"><strong>Action</strong></td>
    <td rowspan="2"><strong>Result</strong></td>
  </tr>
<tr align="center">
  <td><strong>Standard Tier</strong></td>
  <td><strong>Flex Tier</strong></td>
</tr>
<tr>
  <td align="center">Enabled</td>
  <td align="center">Disabled</td>
  <td>Enable Flex Tier.</td>
  <td>The retention for both pre-existing and new logs are extended.</td>
</tr>
<tr>
  <td align="center">Disabled</td>
  <td align="center">Enabled</td>
  <td>Enable Standard Tier.</td>
  <td>Pre-existing logs in Flex Tier are not changed. New logs are retained in the Standard and Flex Tiers.</td>
</tr>
<tr>
  <td align="center">Enabled</td>
  <td align="center">Disabled</td>
  <td>Enable Flex Tier and remove Standard Tier.</td>
  <td>Logs are no longer queryable in monitors or in Watchdog Insights.</td>
</tr>
</table>

## Search Flex Logs tier

{{< img src="logs/log_configuration/flex_logging/flex_toggle_explorer.png" alt="Enable Flex Logging on the Log Explorer page by toggling the option" style="width:100%;" >}}

In the Log Explorer, toggle the **Include Flex Logs** option to include Flex Tier logs in your search query results. Find this option next to the time picker.

[Search][3] by typing in queries in the search bar or by selecting the relevant facet in the facet panel.

You can add Flex Log queries to dashboards, but make sure to consider these dashboard queries when you choose your compute size.

**Note**: Monitor queries are not supported for Flex Logs.

## Additional information

### Potential sources for sending directly to Flex Logs

The following list is an example of log sources that are good candidates for sending logs directly to the Flex Tier, without being stored in Standard Indexing first. This is not an exhaustive list and is meant to give you an idea about the types of logs that are suitable for this configuration. Other log sources (for example, application logs) can still be sent to the Flex Tier after going to Standard Indexing first for live troubleshooting, alerting, and debugging use cases. Your use cases for these sources could vary, which is important to consider when making the decision to skip Standard Indexing.

**Note**: These examples are a sample for each category. There are many more categories, and services, tools, and technologies that you may want to send directly to the Flex Tier.

| Technology            | Examples                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| Artifact management   | JFrog Artifactory, Archiva, Sonatype Nexus                                                 |
| Audit logs            | Amazon Cloudtrail, Kubernetes audit logs, Microsoft 365 audit                              |
| CDN services          | Akamai, Cloudflare, Fastly, CloudFront                                                     |
| CI/CD services        | GitLab, GitHub Actions, Argo CD, Jenkins, CircleCI, TeamCity                                |
| DNS services          | Route53, Cloudflare, Akamai (Edge), NS1                                                    |
| Identity services     | Cisco ISE, Okta, OneLogin, Workday User Activity Logs                                      |
| Loadbalancers         | AWS ELB, ALB, NLB (GCP and Azure flavors), F5, NGINX                                       |
| Network appliances    | Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda                                   |
| Network services      | WAF, Amazon VPC Flow Logs, AWS ELB, pfSense, Tailscale                                     |
| Service meshes        | Anthos, Istio, proxyv2, consul, Linkerd, Kong                                              |

### Flex Logs for multiple-organization accounts

<div class="alert alert-danger">Each organization can only use one compute size at a time. Compute sizes cannot be shared across organizations, and starter and scalable compute cannot be used simultaneously within the same organization.</div>

For each organization where you want to use Flex Logs, you must enable a compute size. Datadog recommends Flex Logs scalable compute sizes (XS, S, M, and L) for organizations with large log volumes. In a multi-organization setup, there are often many organizations with lower log volumes, so for these organizations, Datadog recommends the Starter compute size for Flex Logs.

### When the concurrent query limit is reached

When your organization reaches the concurrent query limit, you may experience slower queries because queries continue to retry until capacity is available. If a query retries multiple times, it may fail to run. In such situations, there is an error message that says Flex Logs compute capacity is constrained and you should contact your admin.

### Fair use limit

Each Flex Logs compute tier enforces a per-query fair use limit on the number of **addressable logs**. Addressable logs are the total number of logs (stored inside and outside of the Flex tier) that match a query's time range and index scope. This count includes all logs in matching indexes for that time range, regardless of other search filters such as tags or keywords.

The addressable logs for a query are determined as follows:
- If the query specifies an index (for example, `index:my-index`), only logs in that index within the query's time range count toward the limit.
- If no index is specified, logs across all indexes within the query's time range count toward the limit.

Each compute tier has a different maximum threshold for addressable logs per query. If a query exceeds this limit, it is rejected and not automatically retried. The error message indicates that the query request exceeds the maximum query size limit of your Flex compute tier.

To reduce the number of addressable logs and avoid reaching this limit:
- **Narrow the query's time range** to target a smaller window of logs.
- **Scope the query to a specific index** using `index:<name>` to reduce the number of addressable logs counted by the query.
- **Upgrade to a larger compute size** if queries regularly reach the limit. See [Determine the compute size that you need](#determine-the-compute-size-that-you-need) for guidance.

To track rejected queries and identify usage patterns, see [Monitor Flex Compute Usage][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
[4]: https://jfrog.com/help/r/jfrog-platform-administration-documentation/monitoring-and-logging
[5]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[6]: https://www.datadoghq.com/pricing/?product=log-management#products
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/account_management/rbac/permissions/#log-management
[9]: /logs/guide/flex_compute/
