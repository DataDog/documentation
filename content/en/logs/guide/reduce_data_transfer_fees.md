---
title: How to send logs to Datadog while reducing data transfer fees
further_reading:
- link: "https://aws.amazon.com/solutions/case-studies/textnow-privatelink-case-study/"
  tag: "AWS Case Study"
  text: "TextNow Saves 93% on Data Transfer Fees Using AWS PrivateLink"
- link: "/logs/log_configuration/flex_logs/#potential-sources-for-sending-directly-to-flex-logs"
  tag: "Documentation"
  text: "Potential Sources for Sending Directly to Flex Logs"
algolia:
  tags: ["data transfer", "data egress", "private link", "PrivateLink", "Private Service Connect"]
---

## Overview

As your organization grows, the amount of data you transfer between cloud providers to Datadog can also increase.  Cloud providers charge a *data transfer* fee or *data egress* fee to move that data from cloud storage over public IP addresses. This can easily become one of the largest line items in your organization’s cloud cost bill. 

Send data over a private network to avoid the public internet and reduce your data transfer fees. As an example of how private links reduce your costs, in the US East AWS Regions, it costs $0.09 to transfer 1GB, but with AWS PrivateLink, the cost to transfer data goes down to $0.01 per GB.

Use Datadog's [Network Performance Monitoring][1] to identify your organization’s highest throughput applications. Connect to Datadog over [supported private connections](#supported-cloud-providers). After you switch to private links, use Datadog’s [Cloud Cost Management][2] tools to verify the impact and monitor the reduction in your cloud costs.

## Supported cloud providers

<div class="alert alert-warning">Make sure the selected Datadog site {{< region-param key="dd_site_name" code="true" >}} is correct. Cloud specific private links are not available for all Datadog sites.</div>

{{< whatsnext desc="Connect to Datadog over:" >}}
    {{< nextlink href="/agent/guide/private-link/" >}}AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/performance/
[2]: /cloud_cost_management/
[3]: /agent/guide/private-link/
[4]: /agent/guide/azure-private-link/
[5]: /agent/guide/gcp-private-service-connect/