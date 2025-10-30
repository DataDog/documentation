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

- Akamai CDN
- AWS CloudFront
- AWS CloudTrail
- Amazon VPC Flow Logs
- Cisco ASA
- Cloudflare
- F5
- Fastly
- Fortinet Firewall
- HAProxy Ingress
- Istio Proxy
- Netskope
- NGINX
- Okta
- Palo Alto Firewall
- Windows XML
- ZScaler ZIA DNS
- Zscaler ZIA Firewall
- Zscaler ZIA Tunnel
- Zscaler ZIA Web Logs

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/processors/
[3]: /observability_pipelines/set_up_pipelines/