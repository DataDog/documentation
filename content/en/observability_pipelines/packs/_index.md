---
title: Packs
description: Learn more about Observability Pipelines Packs
disable_toc: false
---

## Overview

When you setup a pipeline to send a logs from a specific source to Observability Pipelines, you likely have to think about questions such as:

- Which logs from this source are important?
- Which logs from this source should I drop?
- Which logs should I retain?
- Should I sample logs?
- Should I add quotas?

Oftentimes you also have to talk to different teams to find answers to these questions.

Observability Pipelines Packs are predefined configurations that help you set up and optimize Observability Pipelines without extensive manual configuration. Each pack is specific to a source and identifies:

- Log fields that can safely be removed from the logs.
- Logs that can be dropped, such as duplicated logs.
- Logs that need to be parsed.
- Logs that need to be formatted for the destination.

## Setup

To set up packs:

1. Navigate to the [Pipelines][1] page.
1. Click **Packs**.
1. Click the pack you want to set up.
1. You can either create a new pipeline from the pack or add the pack to an existing pipelines.
- If you clicked **Add to New Pipeline**, the pack is added to a new pipeline.
    - Click the processor group that was added to see the individual processors the pack added and edit them as needed. See [Processors][2] for more information.
    - See [Set Up Pipelines][3] for information on setting up the pipeline.
- If you clicked **Add to Existing Pipeline**:
	1. Select the pipeline you want to add the pack to.
	1. Click **Add to Existing Pipeline**.
    - The pack is added to the last processor group in your pipeline.
    - Click on the group to review the individual processors and edit them as needed. See [Processors][2] for more information.

## Packs

These are the available packs:

- [Akamai CDN][4]
- [AWS CloudFront][5]
- [AWS CloudTrail][6]
- [Amazon VPC Flow Logs][7]
- [Cisco ASA][8]
- [Cloudflare][9]
- [F5][10]
- [Fastly][11]
- [Fortinet Firewall][12]
- [HAProxy Ingress][13]
- [Istio Proxy][14]
- [Netskope][15]
- [NGINX][16]
- [Okta][17]
- [Palo Alto Firewall][18]
- [Windows XML][19]
- [ZScaler ZIA DNS][20]
- [Zscaler ZIA Firewall][21]
- [Zscaler ZIA Tunnel][22]
- [Zscaler ZIA Web Logs][23]

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/set_up_pipelines/
[4]: /observability_pipelines/packs/akamai_cdn/
[5]: /observability_pipelines/packs/amazon_cloudfront/
[6]: /observability_pipelines/packs/aws_cloudtrail/
[7]: /observability_pipelines/packs/amazon_vpc_flow_logs/
[8]: /observability_pipelines/packs/cisco_asa/
[9]: /observability_pipelines/packs/cloudflare/
[10]: /observability_pipelines/packs/f5/
[11]: /observability_pipelines/packs/fastly/
[12]: /observability_pipelines/packs/fortinet_firewall/
[13]: /observability_pipelines/packs/haproxy_ingress/
[14]: /observability_pipelines/packs/istio_proxy/
[15]: /observability_pipelines/packs/netskope/
[16]: /observability_pipelines/packs/nginx/
[17]: /observability_pipelines/packs/okta/
[18]: /observability_pipelines/packs/palo_alto_firewall/
[19]: /observability_pipelines/packs/windows_xml/
[20]: /observability_pipelines/packs/zscaler_zia_dns/
[21]: /observability_pipelines/packs/zscaler_zia_firewall/
[22]: /observability_pipelines/packs/zscaler_zia_tunnel/
[23]: /observability_pipelines/packs/zscaler_zia_web_logs/