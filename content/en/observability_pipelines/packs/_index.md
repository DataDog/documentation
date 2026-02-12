---
title: Packs
description: Learn more about Observability Pipelines Packs
disable_toc: false
private: true
cascade:
    private: true

further_reading:
  - link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
    tag: Blog
    text: Rehydrate archived logs in any SIEM or logging vendor with Observability Pipelines

---

## Overview

{{< img src="observability_pipelines/packs/packs.png" alt="The packs section of Observability Pipelines" style="width:100%;" >}}

When setting up a pipeline to send logs from a specific source to Observability Pipelines, you often need to decide how to process and manage those logs.

Questions such as the following might come up:

- Which logs from this source are important?
- Which logs can safely be dropped?
- Should repetitive logs be sampled?
- Which fields should be parsed or formatted for the destination?

Making these decisions typically requires coordination across multiple teams and detailed knowledge of each log source.

Observability Pipelines Packs provide predefined configurations to help you make these decisions quickly and consistently. Packs apply Datadog-recommended best practices for specific log sources such as Akamai, AWS CloudTrail, Cloudflare, Fastly, Palo Alto Firewall, and Zscaler.

### What Packs do

Each Pack includes source-specific configurations that defines:

- **Fields that can safely be removed** to reduce payload size
- **Logs that can be dropped**, such as duplicate events or health checks
- **Logs that should be retained or parsed**, such as errors or security detections
- **Formatting and normalization rules** to align logs across different destinations and environments

By using Packs, you can apply consistent parsing, filtering, and routing logic for each log source without creating configurations manually.

### Why use Packs

Packs help teams:

- **Reduce ingestion volume and costs** by filtering or sampling repetitive, low-value events
- **Maintain consistency** in parsing and field mapping across environments and destinations
- **Accelerate setup** by applying ready-to-use configurations for common sources

## Packs

These packs are available:

- [Akamai CDN][4]
- [Amazon VPC Flow Logs][5]
- [AWS Application Load Balancer Logs][6]
- [AWS CloudFront][7]
- [AWS CloudTrail][8]
- [AWS Elastic Load Balancer Logs][9]
- [AWS Network Load Balancer Logs][10]
- [Cisco ASA][11]
- [Cloudflare][12]
- [F5][13]
- [Fastly][14]
- [Fortinet Firewall][15]
- [HAProxy Ingress][16]
- [Istio Proxy][17]
- [Juniper SRX Firewall Traffic Logs][18]
- [Netskope][19]
- [NGINX][20]
- [Okta][21]
- [Palo Alto Firewall][22]
- [Windows XML][23]
- [ZScaler ZIA DNS][24]
- [Zscaler ZIA Firewall][25]
- [Zscaler ZIA Tunnel][26]
- [Zscaler ZIA Web Logs][27]

## Setup

To set up packs:

1. Navigate to the [Pipelines][1] page.
1. Click **Packs**.
1. Click the pack you want to set up.
1. You can either create a new pipeline from the pack or add the pack to an existing pipelines.
    - If you clicked **Add to New Pipeline**, in the new pipeline that was created:
        - Click the processor group that was added to see the individual processors that the pack added and edit them as needed. See [Processors][2] for more information.
        - See [Set Up Pipelines][3] for information on setting up the rest of the pipeline.
    - If you clicked **Add to Existing Pipeline**:
        1. Select the pipeline you want to add the pack to.
        1. Click **Add to Existing Pipeline**.
            1. The pack is added to the last processor group in your pipeline.
            1. Click on the group to review the individual processors and edit them as needed. See [Processors][2] for more information.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/set_up_pipelines/
[4]: /observability_pipelines/packs/akamai_cdn/
[5]: /observability_pipelines/packs/amazon_vpc_flow_logs/
[6]: /observability_pipelines/packs/aws_alb/
[7]: /observability_pipelines/packs/amazon_cloudfront/
[8]: /observability_pipelines/packs/aws_cloudtrail/
[9]: /observability_pipelines/packs/aws_elb/
[10]: /observability_pipelines/packs/aws_nlb/
[11]: /observability_pipelines/packs/cisco_asa/
[12]: /observability_pipelines/packs/cloudflare/
[13]: /observability_pipelines/packs/f5/
[14]: /observability_pipelines/packs/fastly/
[15]: /observability_pipelines/packs/fortinet_firewall/
[16]: /observability_pipelines/packs/haproxy_ingress/
[17]: /observability_pipelines/packs/istio_proxy/
[18]: /observability_pipelines/packs/juniper_srx_traffic/
[19]: /observability_pipelines/packs/netskope/
[20]: /observability_pipelines/packs/nginx/
[21]: /observability_pipelines/packs/okta/
[22]: /observability_pipelines/packs/palo_alto_firewall/
[23]: /observability_pipelines/packs/windows_xml/
[24]: /observability_pipelines/packs/zscaler_zia_dns/
[25]: /observability_pipelines/packs/zscaler_zia_firewall/
[26]: /observability_pipelines/packs/zscaler_zia_tunnel/
[27]: /observability_pipelines/packs/zscaler_zia_web_logs/