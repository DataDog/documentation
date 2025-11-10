---
title: Packs
description: Learn more about Observability Pipelines Packs
disable_toc: false
private: true
cascade:
    private: true
---

## Overview

{{< img src="observability_pipelines/packs/packs.png" alt="The packs section of Observability Pipelines" style="width:100%;" >}}

When you set up a pipeline to send logs from a specific source to Observability Pipelines, you might have questions such as:

- Which logs from this source are important?
- Which logs from this source should be dropped?
- Which logs should be retained?
- Should logs be sampled?
- Should quotas be added?

Often, you need to consult with different teams to answer these questions.

Use Observability Pipelines Packs to help you set up and optimize Observability Pipelines without extensive manual configuration. Packs contain predefined configurations that are specific to a source and identify:

- Log fields that can safely be removed
- Logs that can be dropped, such as duplicated logs
- Logs that need to be parsed
- Logs that need to be formatted for the destination

## Packs

These packs are available:

- [Akamai CDN][4]
- [Amazon VPC Flow Logs][5]
- [AWS CloudFront][6]
- [AWS CloudTrail][7]
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

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/set_up_pipelines/
[4]: /observability_pipelines/packs/akamai_cdn/
[5]: /observability_pipelines/packs/amazon_vpc_flow_logs/
[6]: /observability_pipelines/packs/amazon_cloudfront/
[7]: /observability_pipelines/packs/aws_cloudtrail/
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