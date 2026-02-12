---
title: How to send logs to Datadog while reducing data transfer fees
further_reading:
- link: "https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/"
  tag: "Architecture Center"
  text: "Using Cross-Region AWS PrivateLink to Send Telemetry to Datadog"
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

As your organization grows, the amount of data you transfer between cloud providers to Datadog can also increase. Cloud providers charge a *data transfer* fee or *data egress* fee to move that data from cloud storage over public IP addresses. This can easily become one of the largest line items in your organization’s cloud cost bill. 

Send data over a private network to avoid the public internet and reduce your data transfer fees. As an example of how private links reduce your costs, in the US East AWS Regions, it costs $0.09 to transfer 1GB, but with AWS PrivateLink, the cost to transfer data goes down to $0.01 per GB.

## Supported cloud providers

<div class="alert alert-danger">Make sure the selected Datadog site {{< region-param key="dd_site_name" code="true" >}} is correct. Cloud specific private links are not available for all Datadog sites.</div>

{{< whatsnext desc="Connect to Datadog over:" >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us" >}}US1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap1" >}}AP1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap2" >}}AP2 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}US3 - Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}US5 - Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## Additional tools 

After you switch to private links, you can use the following to monitor your usage and have more control over your data costs:
- Datadog's [Cloud Network Monitoring][1] identifies your organization's highest throughput applications.
- [Cloud Cost Management][2] tools can verify and monitor the reduction in your cloud costs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /network_monitoring/cloud_network_monitoring/
[2]: /cloud_cost_management/
[3]: /agent/guide/private-link/
[4]: /agent/guide/azure-private-link/
[5]: /agent/guide/gcp-private-service-connect/
