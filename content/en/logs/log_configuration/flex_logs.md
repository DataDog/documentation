---
title: Flex Logs
kind: documentation
description: Cost effective live query capabilities over long term retention of Logs
aliases:
  - /logs/log_configuration/flex_log/
further_reading:
- link: "https://www.datadoghq.com/blog/flex-logging"
  tag: "Blog"
  text: "Store and analyze high-volume logs efficiently with Flex Logs"
- link: "/logs/log_configuration/indexes"
  tag: "Documentation"
  text: "Log Indexes"
- link: "/logs/log_configuration/archives"
  tag: "Documentation"
  text: "Log Archives"
---

{{< callout url="https://docs.google.com/forms/d/15FJG6RTFMmp7c7aRE8bcTy6B1Tt8ia4OmiesQa_zkZ4/viewform?edit_requested=true" btn_hidden="false" header="Request Access!">}}
Flex Logs is in Limited Availability, but you can request access! Use this form to submit your request today.
{{< /callout >}}

## Overview

Flex Logs decouples log storage and log query compute. This allows you to store all your logs and have more flexibility to choose which use cases you want to serve. You can keep high-volume logs for long periods of time and store all your logs with Datadog, across all use cases and budgets.

Security, compliance, and engineering teams often need to query logs over large time windows. Security breaches are often detected after weeks, if not months, of an incident and legal compliance reviews and audit processes may require logs dating back more than a year. Long term analysis requirements are not limited to security teams. Engineering teams conducting high cardinality, year-over-year, long term analysis on millions of entities like users, hosts, and IP addresses are better served with logs over straight metrics.

This overview highlights the main features of Flex Tier storage, the differences between Standard, Flex storage options for your log data, and the use cases for Flex Tier storage.

## Configure storage tiers

Flex Logs is set up within log index configurations. [Index filters][1] that apply to that index also apply to Flex logs.

Configure Flex Tier in the [Logs Index Configuration][2] page:

1. Go to [**Logs > Configuration > Indexes**][2].
2. Edit the index you wish to enable with Flex Logs or create a new index.
3. Select **Flex Tier** and set the retention under *Configure Storage Tier and Retention*.

{{< img src="logs/log_configuration/flex_logging/flex_configuration.png" alt="Options for the Flex tier storage within the index configuration" style="width:100%;" >}}

**Notes**:
- If both are selected, logs are stored in the Standard Tier until the end of the configured retention period before they are stored in the Flex Tier. For example, you select Standard Tier with a retention of 3 days and Flex Tier with a retention of 90 days. The logs in that index are first stored in the Standard Tier for 3 days and then stored in the Flex Tier for the remaining 87 days totalling a 90 day retention.
- Adding the Standard Tier to a Flex index applies to new logs, not pre-existing logs in the Flex index.

## Search Flex indexes

{{< img src="logs/log_configuration/flex_logging/flex_toggle_search.png" alt="Enable Flex Logging on the Log Explorer page by toggling the option" style="width:100%;" >}}

In the Log Explorer, toggle the **Include Flex Indexes** option to include Flex index logs in your search query results. Find this option next to the time picker. 

[Search][3] by typing in queries in the search bar or by selecting the relevant facet in the facet panel.

## Use cases for Flex storage

Flex Tier storage is useful for storing logs where long running security/audit investigations, data completeness and compliance requirements are more important than sub-second response times. Some example use cases for Flex storage include:
- Retaining logs for long term auditing.
- Retaining logs for compliance and legal reasons.
- Need all logs for security investigations.
- Need to query logs for reporting and analytics for high cardinality data over long time periods.

## Potential sources for direct to Flex Logs indexing tier

These are potential sources which are good candidates for sending direct to the Flex Tier, that is not going to Standard Indexing first. This is not an exhaustive list and is meant to give an idea about the types of logs that tend to be good targets for this configuration. Other log sources (e.g. Application logs) can still be sent to the Flex tier after going to Standard Indexing for live troubleshooting, alerting, and debugging use cases. Your use cases for these sources can vary, and those matters very much when making the decision to skip Standard Indexing.

- CDN services
  - e.g. Akamai, Cloudflare, Fastly, CloudFront, etc
- DNS services
  - e.g. Route53, Cloudflare, Akamai (Edge), NS1, etc
- Firewall logs / Firewall appliances / Web Application Firewalls (WAF)
  - e.g. AWS WAF, Barracuda WAF, pfSense, Checkpoint, Sophos, WatchGuard, FortiNet, etc
- Cloud network services / VPC / Gateways / NAT / WAN
  - e.g. AWS VPC, Azure Virtual Network (VNet), GCP VPC
  - e.g. AWS NAT Gateway, PrivateLink, Direct Connect, VPN, etc
  - e.g. GCP Cloud NAT, Azure ExpressRoute, Virtual WANs, Azure Bastion, etc
- Loadbalancers
  - e.g. AWS ELB / ALB / NLB (GCP/Azure flavors), F5, Nginx, etc
- Identity tools
  - e.g. Cisco ISE, Okta, OneLogin, Workday User Activity Logs, etc
- Audit logs
  - e.g. Cloud Provider Audit Logs (e.g. CloudTrail), k8s audit logs, Microsoft 365 audit logs, etc
- Physical network appliances, i.e. Switches, Routers, Access Points, Network gear, etc
  - e.g. Cisco, Meraki, Juniper, Arbua, HPE, Palo Alto, Barracuda, etc
- Network Flow logs
  - e.g. Cisco NetFlow, IPFIX, sFlow, AWS VPC FlowLogs, etc
- VPN services
  - AWS/GCP/Azure VPN, Tailscale, Twingate, OpenVPN, ZeroTier, WireGuard, etc
- CI/CD services
  - e.g. GitLab, GitHub Actions, ArgoCD, Jenkins, CircleCI, TravisCI, TeamCity, AWS CodePieline, Azure DevOps, Bamboo, etc
- Service mesh
  - e.g. Anthos, Istio, proxyv2, consul, Linkerd, Kong, etc
- Caching services/tools
  - e.g. Varnish, Memcached, Redis, etc

You can use this spectrum of logs types to help rationalize about when to use the Flex Logs tier. Any high volume, infrequent access, long term retention log sources are good candidates, this includes extending Standard Tier (e.g. application logs) logs into the Flex Tier as well.

{{< img src="logs/log_configuration/flex_logging/logs-spectrum.png" alt="Logs indexing and access frequency spectrum graph" style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /logs/log_configuration/indexes/#indexes-filters
[2]: https://app.datadoghq.com/logs/pipelines/indexes
[3]: https://app.datadoghq.com/logs
